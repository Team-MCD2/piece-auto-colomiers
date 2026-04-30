/**
 * scripts/fetch-images.mjs
 * ----------------------------------------------------------------------
 * Récupère 1 photo HD libre de droits par catégorie pour le catalogue (J3).
 *
 * Source : Pexels API (gratuit, clé requise) ou fallback Picsum (placeholder).
 *
 * Préparation Pexels (recommandé) :
 *   1. Créer un compte sur https://www.pexels.com/api/
 *   2. Récupérer la clé API
 *   3. Créer un fichier `.env.local` à la racine :
 *      PEXELS_API_KEY=votre_clé_ici
 *
 * Sans clé : le script utilise picsum.photos (images aléatoires, pas thématiques).
 * Pour V1 propre, il vaut mieux configurer Pexels.
 *
 * Sorties :
 *   - public/assets/categories/<slug>.jpg     (1200×900, q80)
 *   - src/data/credits.json                    (attribution Pexels par image)
 *
 * Exécution : `node scripts/fetch-images.mjs`
 *
 * Idempotent : skip les images déjà présentes (relancer pour les manquantes).
 *
 * Cf. plan.md §6 (catalogue) et §13.4 (credits attribution).
 */

import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'assets', 'categories');
const CREDITS_FILE = join(ROOT, 'src', 'data', 'credits.json');

// Lecture .env.local minimal (pas de package dotenv pour cette tâche one-shot)
async function loadEnv() {
  try {
    const txt = await readFile(join(ROOT, '.env.local'), 'utf8');
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch { /* pas de .env.local — OK, on passe en fallback Picsum */ }
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

/**
 * Importe dynamiquement les catégories depuis src/data/categories.js.
 * Comme c'est un .js ESM avec exports, on peut l'importer directement.
 */
async function loadCategories() {
  const mod = await import(`file:///${join(ROOT, 'src', 'data', 'categories.js').replace(/\\/g, '/')}`);
  return mod.CATEGORIES;
}

/**
 * Cherche une photo Pexels via mots-clés.
 * Retourne { url, photographer, photographer_url, src_url } ou null.
 */
async function searchPexels(query, apiKey) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: apiKey, 'User-Agent': 'pieces-auto-colomiers/1.0' },
  });
  if (!res.ok) {
    if (res.status === 429) console.warn('    ⚠ Pexels rate limit — pause 60 s');
    return null;
  }
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) return null;
  return {
    url: photo.src.large,         // ~1200w
    photographer: photo.photographer,
    photographer_url: photo.photographer_url,
    src_url: photo.url,
    pexels_id: photo.id,
  };
}

/**
 * Fallback : image générique via picsum.photos (signed seed = stable par slug).
 */
function picsumFallback(slug) {
  const seed = slug.replace(/[^a-z0-9]/gi, '').slice(0, 16) || 'piece';
  return {
    url: `https://picsum.photos/seed/${seed}/1200/900`,
    photographer: 'Picsum (placeholder)',
    photographer_url: 'https://picsum.photos/',
    src_url: 'https://picsum.photos/',
    pexels_id: null,
  };
}

async function downloadImage(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

/**
 * Décide s'il faut (re)télécharger une catégorie.
 * Règles :
 *   - force=true                      → toujours re-fetch
 *   - fichier absent                  → fetch
 *   - existant source=pexels          → skip (déjà optimal)
 *   - existant source=picsum + apiKey → upgrade (re-fetch Pexels)
 *   - existant source=picsum sans key → skip (pas de downgrade possible)
 *   - existant sans credits           → traité comme picsum (legacy)
 */
function shouldFetch({ fileExists, existingCredit, apiKey, force }) {
  if (force) return { fetch: true, reason: 'force' };
  if (!fileExists) return { fetch: true, reason: 'new' };
  const source = existingCredit?.source || 'picsum'; // legacy = picsum
  if (source === 'pexels') return { fetch: false, reason: 'pexels-already' };
  if (source === 'picsum' && apiKey) return { fetch: true, reason: 'upgrade' };
  return { fetch: false, reason: 'no-upgrade-path' };
}

async function processCategory(cat, apiKey, existingCredit, force) {
  const dest = join(OUT_DIR, `${cat.slug}.jpg`);
  const fileExists = await exists(dest);
  const decision = shouldFetch({ fileExists, existingCredit, apiKey, force });

  if (!decision.fetch) {
    return { slug: cat.slug, status: 'skipped', reason: decision.reason, credit: null };
  }

  // Préfixe différent selon le contexte
  const prefix =
    decision.reason === 'upgrade' ? '  ↑' :
    decision.reason === 'force'   ? '  ↻' :
                                     '  ⬇';
  process.stdout.write(`${prefix} ${cat.slug.padEnd(28)} `);

  let credit = null;
  if (apiKey) {
    // Stratégie : essai 1 = label fr, essai 2 = mots-clés EN génériques
    const queries = [cat.label, `car ${cat.slug.replace(/-/g, ' ')} part`];
    for (const q of queries) {
      const photo = await searchPexels(q, apiKey);
      if (photo) { credit = photo; break; }
    }
  }

  if (!credit) {
    credit = picsumFallback(cat.slug);
    process.stdout.write('(picsum) ');
  } else if (decision.reason === 'upgrade') {
    process.stdout.write('(pexels) ');
  }

  try {
    const size = await downloadImage(credit.url, dest);
    process.stdout.write(`✓ ${(size / 1024).toFixed(0)} KB\n`);
    return { slug: cat.slug, status: 'downloaded', reason: decision.reason, credit };
  } catch (err) {
    process.stdout.write(`✗ ${err.message}\n`);
    return { slug: cat.slug, status: 'failed', reason: decision.reason, credit: null };
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
  console.log('  Fetch images catégories — Pexels (ou Picsum fallback)');
  if (force) console.log('  Mode : --force (re-fetch complet)');
  console.log('═══════════════════════════════════════════════════════════════');

  await loadEnv();
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.warn('⚠ PEXELS_API_KEY non défini — fallback Picsum (placeholders).');
    console.warn('  Pour V1 propre : ajoutez PEXELS_API_KEY=… dans .env.local');
  } else {
    console.log('🔑 Pexels API configurée');
  }

  await mkdir(OUT_DIR, { recursive: true });

  const categories = await loadCategories();
  const existing = await loadExistingCredits();

  // Compter combien d'upgrades sont prévus pour le user
  const picsumCount = Object.values(existing).filter((c) => c?.source === 'picsum').length;
  if (apiKey && picsumCount > 0 && !force) {
    console.log(`🔁 ${picsumCount} placeholder(s) Picsum détecté(s) — upgrade Pexels automatique`);
  }
  console.log(`📦 ${categories.length} catégories à traiter\n`);

  const credits = { ...existing };
  const results = [];

  for (const cat of categories) {
    const r = await processCategory(cat, apiKey, existing[cat.slug], force);
    results.push(r);
    if (r.credit) {
      credits[r.slug] = {
        photographer: r.credit.photographer,
        photographer_url: r.credit.photographer_url,
        src_url: r.credit.src_url,
        source: r.credit.pexels_id ? 'pexels' : 'picsum',
        fetched_at: new Date().toISOString(),
      };
    }
    // Petite pause pour éviter rate-limit Pexels (200 req/h sur le plan free)
    if (apiKey && r.status === 'downloaded') await new Promise((r) => setTimeout(r, 250));
  }

  await writeFile(CREDITS_FILE, JSON.stringify(credits, null, 2) + '\n', 'utf8');

  const downloaded = results.filter((r) => r.status === 'downloaded').length;
  const upgraded = results.filter((r) => r.status === 'downloaded' && r.reason === 'upgrade').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  const failed = results.filter((r) => r.status === 'failed').length;

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`✅ ${downloaded} téléchargées (dont ${upgraded} upgrade picsum→pexels) · ${skipped} skip · ${failed} échec`);
  console.log(`   Credits écrits : ${CREDITS_FILE}`);
  if (failed > 0) {
    console.log('   ⚠ Certaines catégories ont échoué. Relancez le script pour réessayer.');
  }
  console.log('═══════════════════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('✗ Erreur fatale :', err);
  process.exit(1);
});
