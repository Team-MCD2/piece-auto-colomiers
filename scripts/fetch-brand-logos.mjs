/**
 * scripts/fetch-brand-logos.mjs
 * ----------------------------------------------------------------------
 * Récupère les logos officiels SVG des équipementiers depuis Wikimedia Commons.
 *
 * Source : Wikimedia Commons API (publique, sans clé requise).
 * Licence : tous les logos officiels sont publiés sur Commons sous license
 *           "trademarked" — usage informatif fair-use autorisé en France
 *           (article L713-6 CPI). Disclaimer dans /mentions-legales.
 *
 * Sorties :
 *   - public/assets/brands/<id>.svg              (logo officiel)
 *   - src/data/brand-credits.json                (URL Commons + licence)
 *
 * Exécution :
 *   node scripts/fetch-brand-logos.mjs           # idempotent (skip existants)
 *   node scripts/fetch-brand-logos.mjs --force   # re-fetch tous les logos
 *
 * Stratégie :
 *   1) Pour chaque brand, on essaye une liste de candidats Commons
 *      (variations de nommage : "Bosch_logo.svg", "Bosch-logotype.svg", …)
 *   2) On interroge l'API Commons → si un candidat existe et est SVG, on le DL
 *   3) Si aucun candidat ne marche → log warning, skip (UI fallback typo OK)
 *
 * Cf. plan.md §4.6 (brands grid) et data/brands.js.
 */

import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'assets', 'brands');
const CREDITS_FILE = join(ROOT, 'src', 'data', 'brand-credits.json');

// Candidats Commons par brand id (kebab-case).
// L'ordre compte : on prend le premier qui existe.
// Sources vérifiées au 2026-05 — peuvent évoluer si Commons réorganise.
const CANDIDATES = {
  bosch: ['Bosch-logotype.svg', 'Bosch_logo.svg', 'Bosch-symbol.svg'],
  valeo: ['Valeo_Logo.svg', 'Logo_Valeo.svg', 'Valeo_logo.svg'],
  ngk: ['NGK_Spark_Plug_logo.svg', 'NGK_logo.svg', 'NGK-Logo.svg'],
  brembo: ['Brembo_logo.svg', 'Brembo.svg', 'Logo_Brembo.svg'],
  'mann-filter': ['Mann-filter-logo.svg', 'MANN+HUMMEL_Logo.svg', 'Mann_Hummel_logo.svg'],
  continental: ['Continental_AG_logo.svg', 'Continental-Logo.svg', 'Continental_logo.svg'],
  'febi-bilstein': ['Febi_bilstein_logo.svg', 'Febi-bilstein.svg', 'Logo_Febi_bilstein.svg'],
  ate: ['ATE_logo.svg', 'ATE_Bremsen_Logo.svg', 'Logo_ATE.svg'],
  sachs: ['Sachs_logo.svg', 'ZF_Sachs_logo.svg', 'Sachs-Logo.svg'],
  skf: ['SKF_logo.svg', 'SKF-Logo.svg', 'Logo_SKF.svg'],
  hella: ['Hella_2011_logo.svg', 'Hella_Logo.svg', 'Hella-Logo.svg'],
  trw: ['TRW_Automotive_logo.svg', 'TRW_Logo.svg', 'Trw-logo.svg'],
  castrol: ['Castrol_logo.svg', 'Castrol-logo.svg', 'Logo_Castrol.svg'],
  totalenergies: ['Logo_TotalEnergies.svg', 'TotalEnergies_logo.svg', 'TotalEnergies.svg'],
  'mobil-1': ['Mobil_1_logo.svg', 'Mobil-1-logo.svg', 'Mobil1_logo.svg'],
};

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const USER_AGENT = 'pieces-auto-colomiers/1.0 (https://piecesauto-colomiers.fr; contact@piecesauto-colomiers.fr)';

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadBrands() {
  const mod = await import(`file:///${join(ROOT, 'src', 'data', 'brands.js').replace(/\\/g, '/')}`);
  return mod.BRANDS;
}

/**
 * Interroge l'API Commons pour un fichier donné.
 * Retourne { url, descriptionUrl, license } ou null si absent.
 */
async function queryCommons(filename) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|mime',
    titles: `File:${filename}`,
    origin: '*',
  });
  const url = `${COMMONS_API}?${params.toString()}`;

  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    const page = Object.values(pages)[0];
    if (!page || page.missing !== undefined) return null;
    const info = page.imageinfo?.[0];
    if (!info?.url) return null;
    if (info.mime && !info.mime.includes('svg')) return null; // SVG only
    return {
      url: info.url,
      descriptionUrl: info.descriptionurl ?? `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`,
      license: info.extmetadata?.LicenseShortName?.value ?? 'Unknown',
      filename,
    };
  } catch {
    return null;
  }
}

/**
 * Cherche le premier candidat qui existe sur Commons.
 */
async function findLogo(brandId) {
  const candidates = CANDIDATES[brandId] ?? [];
  for (const filename of candidates) {
    const result = await queryCommons(filename);
    if (result) return result;
    // Pause anti rate-limit (Commons tolère ~10 req/s mais on est conservateur)
    await new Promise((r) => setTimeout(r, 150));
  }
  return null;
}

async function downloadSvg(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  // Validation minimale : doit contenir <svg
  if (!text.includes('<svg')) throw new Error('Réponse non-SVG');
  await writeFile(dest, text, 'utf8');
  return text.length;
}

async function processBrand(brand, force, existingCredits) {
  const dest = join(OUT_DIR, `${brand.id}.svg`);
  const fileExists = await exists(dest);

  if (fileExists && !force) {
    return { id: brand.id, status: 'skipped', reason: 'already-present' };
  }

  process.stdout.write(`  ${force && fileExists ? '↻' : '⬇'} ${brand.id.padEnd(16)} `);

  const result = await findLogo(brand.id);
  if (!result) {
    process.stdout.write('✗ aucun candidat Commons trouvé\n');
    return { id: brand.id, status: 'not-found', reason: 'no-candidate' };
  }

  try {
    const size = await downloadSvg(result.url, dest);
    process.stdout.write(`✓ ${(size / 1024).toFixed(1)} KB  (${result.filename})\n`);
    return {
      id: brand.id,
      status: 'downloaded',
      credit: {
        commons_filename: result.filename,
        commons_url: result.descriptionUrl,
        license: result.license,
        fetched_at: new Date().toISOString(),
      },
    };
  } catch (err) {
    process.stdout.write(`✗ ${err.message}\n`);
    return { id: brand.id, status: 'failed', reason: err.message };
  }
}

async function loadExistingCredits() {
  try {
    const txt = await readFile(CREDITS_FILE, 'utf8');
    return JSON.parse(txt);
  } catch {
    return {};
  }
}

async function main() {
  const force = process.argv.includes('--force') || process.argv.includes('-f');

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  Fetch brand logos — Wikimedia Commons (SVG officiel)');
  if (force) console.log('  Mode : --force (re-fetch complet)');
  console.log('═══════════════════════════════════════════════════════════════');

  await mkdir(OUT_DIR, { recursive: true });
  const brands = await loadBrands();
  const existingCredits = await loadExistingCredits();

  console.log(`📦 ${brands.length} brands à traiter\n`);

  const credits = { ...existingCredits };
  const results = [];

  for (const brand of brands) {
    const r = await processBrand(brand, force, existingCredits);
    results.push(r);
    if (r.status === 'downloaded' && r.credit) {
      credits[r.id] = r.credit;
    }
  }

  await writeFile(CREDITS_FILE, JSON.stringify(credits, null, 2) + '\n', 'utf8');

  const downloaded = results.filter((r) => r.status === 'downloaded').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  const notFound = results.filter((r) => r.status === 'not-found').length;
  const failed = results.filter((r) => r.status === 'failed').length;

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`✅ ${downloaded} téléchargés · ${skipped} skip · ${notFound} introuvables · ${failed} échec`);
  console.log(`   Credits écrits : ${CREDITS_FILE}`);
  if (notFound > 0) {
    console.log('\n   ⚠ Brands sans logo Commons :');
    results
      .filter((r) => r.status === 'not-found')
      .forEach((r) => console.log(`      - ${r.id} (vérifier candidates dans le script)`));
    console.log('   → Vous pouvez ajouter manuellement le SVG dans /public/assets/brands/<id>.svg');
  }
  if (failed > 0) {
    console.log('\n   ⚠ Erreurs HTTP — relancez le script pour réessayer.');
  }
  console.log('═══════════════════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('✗ Erreur fatale :', err);
  process.exit(1);
});
