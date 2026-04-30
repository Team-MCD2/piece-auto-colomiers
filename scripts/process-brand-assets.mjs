/**
 * scripts/process-brand-assets.mjs
 * ----------------------------------------------------------------------
 * Génère les assets brand depuis le logo source.
 *
 * Entrée :
 *   - images/logo.jpg          (logo source fourni par le client)
 *   - images/Front_image.jpg   (storefront, copié tel quel)
 *
 * Sorties :
 *   - public/assets/logos/logo.png         (logo plein, 320×320, PNG)
 *   - public/assets/logos/logo-mark.png    (carré recadré, 256×256)
 *   - public/assets/store/storefront.jpg   (1600px wide, qualité 80)
 *   - public/favicon-16.png, favicon-32.png
 *   - public/apple-touch-icon.png (180×180)
 *   - public/icon-192.png, icon-512.png, icon-maskable-512.png
 *   - public/og-image.jpg (1200×630, logo + tagline overlay)
 *   - public/favicon.ico (placeholder — ICO conversion non triviale en JS pur,
 *                         on copie le 32×32 PNG et on documente la limitation)
 *
 * Exécution : `npm run assets:brand`
 *
 * Discipline : fichiers sortants regenerable, listés dans .gitignore (sauf logo
 * de référence qu'on commit). Idempotent.
 */

import sharp from 'sharp';
import { mkdir, copyFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SRC_LOGO = join(ROOT, 'images', 'logo.jpg');
const SRC_FRONT = join(ROOT, 'images', 'Front_image.jpg');
const PUBLIC = join(ROOT, 'public');

// Tokens DA (synchroniser avec tailwind.config.mjs)
const COLORS = {
  marine: '#0F2C5A',
  signal: '#F5C518',
  offwhite: '#F4F6F9',
};

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function processLogos() {
  console.log('🎨 Processing logos…');

  if (!(await exists(SRC_LOGO))) {
    console.error(`✗ Logo source introuvable : ${SRC_LOGO}`);
    console.error(`  Placez le logo client dans /images/logo.jpg avant de relancer.`);
    return false;
  }

  await ensureDir(join(PUBLIC, 'assets', 'logos'));

  // Logo principal — 320×320 PNG
  await sharp(SRC_LOGO)
    .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(PUBLIC, 'assets', 'logos', 'logo.png'));

  // Logo mark carré — 256×256 (pour favicons / icon source)
  await sharp(SRC_LOGO)
    .resize(256, 256, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, 'assets', 'logos', 'logo-mark.png'));

  console.log('  ✓ /assets/logos/logo.png');
  console.log('  ✓ /assets/logos/logo-mark.png');
  return true;
}

async function processFavicons() {
  console.log('🔖 Processing favicons…');
  const source = join(PUBLIC, 'assets', 'logos', 'logo-mark.png');

  const sizes = [
    { out: 'favicon-16.png', size: 16 },
    { out: 'favicon-32.png', size: 32 },
    { out: 'apple-touch-icon.png', size: 180 },
    { out: 'icon-192.png', size: 192 },
    { out: 'icon-512.png', size: 512 },
  ];

  for (const { out, size } of sizes) {
    await sharp(source)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(join(PUBLIC, out));
    console.log(`  ✓ /${out} (${size}×${size})`);
  }

  // Maskable icon — padding ~10% pour zone safe (iOS/Android adaptive icons)
  await sharp(source)
    .resize(410, 410, { fit: 'cover' })
    .extend({ top: 51, bottom: 51, left: 51, right: 51, background: COLORS.marine })
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, 'icon-maskable-512.png'));
  console.log('  ✓ /icon-maskable-512.png (avec safe zone)');

  // favicon.ico — sharp ne génère pas l'ICO multi-size en JS pur.
  // Workaround : on copie le 32×32 PNG sous le nom favicon.ico (les navigateurs modernes l'acceptent).
  await copyFile(join(PUBLIC, 'favicon-32.png'), join(PUBLIC, 'favicon.ico'));
  console.log('  ✓ /favicon.ico (32×32 PNG renommé — limitation sharp)');
}

async function processOgImage() {
  console.log('🖼️  Processing og-image…');
  const logoBuf = await sharp(join(PUBLIC, 'assets', 'logos', 'logo-mark.png'))
    .resize(220, 220, { fit: 'contain' })
    .png()
    .toBuffer();

  // SVG overlay : tagline + URL
  const overlaySvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${COLORS.marine}"/>
          <stop offset="100%" stop-color="#152E58"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <text x="600" y="380" font-family="Oswald, Arial, sans-serif" font-size="64" font-weight="700"
            fill="#FFFFFF" text-anchor="middle" letter-spacing="-1">
        Pièces Auto Colomiers
      </text>
      <text x="600" y="450" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500"
            fill="${COLORS.signal}" text-anchor="middle">
        Pièces neuves multi-marques · Mondial Relay · Devis 24 h
      </text>
      <rect x="0" y="610" width="1200" height="20" fill="${COLORS.signal}"/>
    </svg>
  `;

  await sharp(Buffer.from(overlaySvg))
    .composite([{ input: logoBuf, top: 100, left: 490 }])
    .jpeg({ quality: 85, progressive: true })
    .toFile(join(PUBLIC, 'og-image.jpg'));

  console.log('  ✓ /og-image.jpg (1200×630)');
}

async function processStorefront() {
  console.log('🏪 Processing storefront…');
  if (!(await exists(SRC_FRONT))) {
    console.warn(`⚠ Storefront introuvable : ${SRC_FRONT} — skip.`);
    return;
  }
  await ensureDir(join(PUBLIC, 'assets', 'store'));
  await sharp(SRC_FRONT)
    .resize(1600, null, { withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(join(PUBLIC, 'assets', 'store', 'storefront.jpg'));
  console.log('  ✓ /assets/store/storefront.jpg (1600w, q80)');
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  Pièces Auto Colomiers — Build des assets brand');
  console.log('═══════════════════════════════════════════════════════════════');

  const ok = await processLogos();
  if (!ok) process.exit(1);

  await processFavicons();
  await processOgImage();
  await processStorefront();

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('✅ Build assets brand terminé.');
  console.log('═══════════════════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('✗ Erreur :', err);
  process.exit(1);
});
