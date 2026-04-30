/**
 * scripts/download-fonts.mjs
 * ----------------------------------------------------------------------
 * Télécharge Oswald + Inter en woff2 self-hosted (D11 — pas de Google Fonts CDN,
 * leçon Mon Boum V3 où le CDN a cassé en offline).
 *
 * Source : Bunny Fonts (https://fonts.bunny.net) — mirror privacy-friendly de
 * Google Fonts, sans tracking, CC0 / SIL OFL.
 *
 * Sorties :
 *   - public/fonts/oswald-{400,500,600,700}.woff2
 *   - public/fonts/inter-{400,500,600,700}.woff2
 *
 * Exécution : `node scripts/download-fonts.mjs`
 * À lancer une fois après scaffold (ou dans `postinstall` plus tard).
 *
 * Idempotent : skip les fichiers déjà présents.
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_FONTS = join(__dirname, '..', 'public', 'fonts');

// URLs Bunny Fonts. Ces endpoints servent les fichiers woff2 latin subsets
// directement (pas de CSS @font-face wrapper).
//
// Pattern : https://fonts.bunny.net/<family>/files/<family>-latin-<weight>-normal.woff2
//
// Ex Oswald 600 latin : https://fonts.bunny.net/oswald/files/oswald-latin-600-normal.woff2
// Ex Inter 400 latin  : https://fonts.bunny.net/inter/files/inter-latin-400-normal.woff2
//
// Vérification : ces URLs sont les fichiers réellement servis par Bunny Fonts
// quand on demande `?display=swap&family=Oswald:wght@600` puis on regarde le
// contenu de @font-face src.

const FONTS = [
  // Oswald — display
  { family: 'oswald', weight: 400, file: 'oswald-400.woff2' },
  { family: 'oswald', weight: 500, file: 'oswald-500.woff2' },
  { family: 'oswald', weight: 600, file: 'oswald-600.woff2' },
  { family: 'oswald', weight: 700, file: 'oswald-700.woff2' },
  // Inter — body
  { family: 'inter', weight: 400, file: 'inter-400.woff2' },
  { family: 'inter', weight: 500, file: 'inter-500.woff2' },
  { family: 'inter', weight: 600, file: 'inter-600.woff2' },
  { family: 'inter', weight: 700, file: 'inter-700.woff2' },
];

function bunnyUrl(family, weight) {
  return `https://fonts.bunny.net/${family}/files/${family}-latin-${weight}-normal.woff2`;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function downloadFont(font) {
  const dest = join(PUBLIC_FONTS, font.file);
  if (await exists(dest)) {
    console.log(`  ↷ ${font.file} déjà présent — skip`);
    return;
  }
  const url = bunnyUrl(font.family, font.weight);
  process.stdout.write(`  ⬇ ${font.file}…`);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'pieces-auto-colomiers/1.0 (+font self-host setup)' },
  });
  if (!res.ok) {
    process.stdout.write(` ✗ HTTP ${res.status}\n`);
    throw new Error(`Bunny Fonts ${res.status} pour ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  process.stdout.write(` ✓ (${(buf.length / 1024).toFixed(1)} KB)\n`);
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  Self-host fonts — Oswald + Inter via Bunny Fonts');
  console.log('═══════════════════════════════════════════════════════════════');

  await mkdir(PUBLIC_FONTS, { recursive: true });

  for (const font of FONTS) {
    try {
      await downloadFont(font);
    } catch (err) {
      console.warn(`    ⚠ ${err.message}`);
      console.warn(`    ↪ Le site fonctionnera quand même (fallback system-ui).`);
    }
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('✅ Fonts téléchargées dans /public/fonts/');
  console.log('   Si 4xx / 5xx récurrents, alternative : télécharger manuellement');
  console.log('   depuis https://fonts.google.com (Oswald + Inter, latin subset)');
  console.log('   et placer les fichiers .woff2 dans /public/fonts/.');
  console.log('═══════════════════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('✗ Erreur fatale :', err);
  process.exit(1);
});
