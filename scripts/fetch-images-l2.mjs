/**
 * scripts/fetch-images-l2.mjs
 * ----------------------------------------------------------------------
 * Récupère 1 photo HD libre de droits par L2 (sous-catégorie) — Phase 7.1
 * follow-up post D-2026-05-13c.
 *
 * Pendant strict de `fetch-images.mjs` côté L2 :
 *   - Lit `src/data/subcategories.js` (51 entries)
 *   - Utilise `src/data/subcategory-search-queries.js` pour les requêtes EN
 *   - Écrit `public/assets/subcategories/<slug>.jpg` (1200×900, q80)
 *   - Maintient `src/data/credits-l2.json` (attribution Pexels par image)
 *
 * Idempotent + `--force` (cf. fetch-images.mjs pour la sémantique).
 *
 * Exécution : `node scripts/fetch-images-l2.mjs [--force]`
 *
 * Cf. plan.md §6, ADR-012, da-catalog-matrix-architecture.md.
 */

import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'assets', 'subcategories');
const CREDITS_FILE = join(ROOT, 'src', 'data', 'credits-l2.json');

async function loadEnv() {
  try {
    const txt = await readFile(join(ROOT, '.env.local'), 'utf8');
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch { /* OK — fallback Picsum */ }
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function loadSubcategories() {
  const mod = await import(`file:///${join(ROOT, 'src', 'data', 'subcategories.js').replace(/\\/g, '/')}`);
  return mod.SUBCATEGORIES;
}

async function loadCuratedQueries() {
  try {
    const mod = await import(`file:///${join(ROOT, 'src', 'data', 'subcategory-search-queries.js').replace(/\\/g, '/')}`);
    return mod.SUBCATEGORY_SEARCH_QUERIES || {};
  } catch {
    return {};
  }
}

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
    url: photo.src.large,
    photographer: photo.photographer,
    photographer_url: photo.photographer_url,
    src_url: photo.url,
    pexels_id: photo.id,
  };
}

function picsumFallback(slug) {
  const seed = slug.replace(/[^a-z0-9]/gi, '').slice(0, 16) || 'subcat';
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

function shouldFetch({ fileExists, existingCredit, apiKey, force }) {
  if (force) return { fetch: true, reason: 'force' };
  if (!fileExists) return { fetch: true, reason: 'new' };
  const source = existingCredit?.source || 'picsum';
  if (source === 'pexels') return { fetch: false, reason: 'pexels-already' };
  if (source === 'picsum' && apiKey) return { fetch: true, reason: 'upgrade' };
  return { fetch: false, reason: 'no-upgrade-path' };
}

async function processSubcategory(sc, apiKey, existingCredit, force, curatedQueries) {
  const dest = join(OUT_DIR, `${sc.slug}.jpg`);
  const fileExists = await exists(dest);
  const decision = shouldFetch({ fileExists, existingCredit, apiKey, force });

  if (!decision.fetch) {
    return { slug: sc.slug, status: 'skipped', reason: decision.reason, credit: null };
  }

  const prefix =
    decision.reason === 'upgrade' ? '  ↑' :
    decision.reason === 'force'   ? '  ↻' :
                                     '  ⬇';
  process.stdout.write(`${prefix} ${sc.slug.padEnd(32)} `);

  let credit = null;
  if (apiKey) {
    const curated = curatedQueries?.[sc.slug];
    const queries = curated
      ? [curated, `${curated} automotive`, sc.label, `car ${sc.slug.replace(/-/g, ' ')} part`]
      : [sc.label, `car ${sc.slug.replace(/-/g, ' ')} part`];
    for (const q of queries) {
      const photo = await searchPexels(q, apiKey);
      if (photo) { credit = photo; break; }
    }
  }

  if (!credit) {
    credit = picsumFallback(sc.slug);
    process.stdout.write('(picsum) ');
  } else if (decision.reason === 'upgrade') {
    process.stdout.write('(pexels) ');
  }

  try {
    const size = await downloadImage(credit.url, dest);
    process.stdout.write(`✓ ${(size / 1024).toFixed(0)} KB\n`);
    return { slug: sc.slug, status: 'downloaded', reason: decision.reason, credit };
  } catch (err) {
    process.stdout.write(`✗ ${err.message}\n`);
    return { slug: sc.slug, status: 'failed', reason: decision.reason, credit: null };
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
  console.log('  Fetch images L2 (sous-catégories) — Pexels (ou Picsum fallback)');
  if (force) console.log('  Mode : --force (re-fetch complet)');
  console.log('═══════════════════════════════════════════════════════════════');

  await loadEnv();
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.warn('⚠ PEXELS_API_KEY non défini — fallback Picsum (placeholders).');
  } else {
    console.log('🔑 Pexels API configurée');
  }

  await mkdir(OUT_DIR, { recursive: true });

  const subcategories = await loadSubcategories();
  const existing = await loadExistingCredits();
  const curatedQueries = await loadCuratedQueries();
  const curatedCount = Object.keys(curatedQueries).length;
  if (curatedCount > 0) {
    console.log(`🎯 ${curatedCount} requêtes Pexels curées L2 chargées.`);
  }
  console.log(`📦 ${subcategories.length} sous-catégories à traiter\n`);

  const credits = { ...existing };
  const results = [];

  for (const sc of subcategories) {
    const r = await processSubcategory(sc, apiKey, existing[sc.slug], force, curatedQueries);
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
    if (apiKey && r.status === 'downloaded') await new Promise((r) => setTimeout(r, 250));
  }

  await writeFile(CREDITS_FILE, JSON.stringify(credits, null, 2) + '\n', 'utf8');

  const downloaded = results.filter((r) => r.status === 'downloaded').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  const failed = results.filter((r) => r.status === 'failed').length;

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`✅ ${downloaded} téléchargées · ${skipped} skip · ${failed} échec`);
  console.log(`   Credits écrits : ${CREDITS_FILE}`);
  console.log('═══════════════════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('✗ Erreur fatale :', err);
  process.exit(1);
});
