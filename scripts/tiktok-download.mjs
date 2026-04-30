/**
 * scripts/tiktok-download.mjs
 * ----------------------------------------------------------------------
 * Télécharge les TikToks de @pieces.auto.colomiers via yt-dlp pour les
 * auto-héberger en MP4 (D31, D34 — pas d'iframe TikTok pour V1).
 *
 * Pré-requis (installation manuelle hors npm) :
 *   - yt-dlp : https://github.com/yt-dlp/yt-dlp/releases (binaire dans le PATH)
 *   - ffmpeg : https://ffmpeg.org/download.html (extraction posters)
 *
 * Vérifier avec : `yt-dlp --version` et `ffmpeg -version`.
 *
 * Workflow :
 *   1. Liste les vidéos du profil (yt-dlp --flat-playlist)
 *   2. Trie par view_count desc
 *   3. Télécharge les TOP_N premières en MP4 (limite taille ~5 MB chacune)
 *   4. Extrait poster à 1.0s pour chaque (ffmpeg)
 *   5. Régénère src/data/tiktoks.js avec métadonnées réelles
 *
 * Sorties :
 *   - public/assets/tiktoks/<id>.mp4
 *   - public/assets/tiktoks/<id>-poster.jpg
 *   - src/data/tiktoks.js (réécrit avec données réelles)
 *
 * Exécution : `node scripts/tiktok-download.mjs`
 *
 * Idempotent : skip les vidéos déjà téléchargées.
 *
 * Cf. plan.md §22 (TikTok pivot D31).
 */

import { spawn } from 'node:child_process';
import { mkdir, writeFile, access, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'assets', 'tiktoks');
const DATA_FILE = join(ROOT, 'src', 'data', 'tiktoks.js');

const PROFILE_URL = 'https://www.tiktok.com/@pieces.auto.colomiers';
const TOP_N = 6;             // nombre de vidéos à télécharger
const MAX_HEIGHT = 720;      // qualité max (compromis taille / qualité)

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

/**
 * Exécute une commande et retourne stdout. Throws si exit != 0.
 */
function exec(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], ...opts });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`${cmd} exit ${code}\n${stderr}`));
    });
  });
}

async function checkBinary(name, args = ['--version']) {
  try {
    await exec(name, args);
    return true;
  } catch (err) {
    return false;
  }
}

async function listVideos() {
  console.log(`📋 Listing vidéos de ${PROFILE_URL}…`);
  // yt-dlp --flat-playlist --dump-single-json renvoie un JSON unique avec entries[]
  const json = await exec('yt-dlp', [
    '--flat-playlist',
    '--dump-single-json',
    '--quiet',
    '--no-warnings',
    PROFILE_URL,
  ]);
  const data = JSON.parse(json);
  const entries = (data.entries || []).map((e) => ({
    id: e.id,
    url: e.url || `https://www.tiktok.com/@pieces.auto.colomiers/video/${e.id}`,
    title: e.title || '',
    view_count: e.view_count || 0,
    duration: e.duration || 0,
  }));
  console.log(`  ✓ ${entries.length} vidéos trouvées`);
  return entries.sort((a, b) => b.view_count - a.view_count).slice(0, TOP_N);
}

async function downloadVideo(video) {
  const mp4 = join(OUT_DIR, `${video.id}.mp4`);
  const poster = join(OUT_DIR, `${video.id}-poster.jpg`);

  if ((await exists(mp4)) && (await exists(poster))) {
    console.log(`  ↷ ${video.id} déjà téléchargée — skip`);
    return { ...video, mp4: `/assets/tiktoks/${video.id}.mp4`, poster: `/assets/tiktoks/${video.id}-poster.jpg` };
  }

  process.stdout.write(`  ⬇ ${video.id} (${video.view_count} vues)…`);

  // Téléchargement vidéo MP4
  await exec('yt-dlp', [
    '-f', `best[height<=${MAX_HEIGHT}][ext=mp4]/best[ext=mp4]/best`,
    '--quiet',
    '--no-warnings',
    '-o', mp4,
    video.url,
  ]);

  // Extraction poster à 1.0s
  await exec('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-ss', '1.0',
    '-i', mp4,
    '-frames:v', '1',
    '-q:v', '3',
    poster,
  ]);

  process.stdout.write(' ✓\n');
  return { ...video, mp4: `/assets/tiktoks/${video.id}.mp4`, poster: `/assets/tiktoks/${video.id}-poster.jpg` };
}

function generateTikToksFile(videos) {
  const lines = [
    `/**`,
    ` * data/tiktoks.js — généré automatiquement par scripts/tiktok-download.mjs`,
    ` * Ne pas éditer à la main, ré-exécuter le script si besoin.`,
    ` */`,
    ``,
    `export const TIKTOK_PROFILE = '@pieces.auto.colomiers';`,
    `export const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@pieces.auto.colomiers';`,
    ``,
    `export const TIKTOKS = ${JSON.stringify(
      videos.map((v) => ({
        id: v.id,
        url: v.url,
        mp4: v.mp4,
        poster: v.poster,
        title: v.title,
        viewCount: v.view_count,
        duration: v.duration,
      })),
      null,
      2,
    )};`,
    ``,
    `export const TIKTOK_AVAILABLE = TIKTOKS.length > 0;`,
    ``,
  ];
  return lines.join('\n');
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  TikTok download — @pieces.auto.colomiers');
  console.log('═══════════════════════════════════════════════════════════════');

  const hasYtDlp = await checkBinary('yt-dlp');
  const hasFfmpeg = await checkBinary('ffmpeg', ['-version']);

  if (!hasYtDlp || !hasFfmpeg) {
    console.error('✗ Binaires manquants :');
    if (!hasYtDlp) console.error('  - yt-dlp : https://github.com/yt-dlp/yt-dlp/releases');
    if (!hasFfmpeg) console.error('  - ffmpeg : https://ffmpeg.org/download.html');
    console.error('  Installez-les et ajoutez-les au PATH, puis relancez.');
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  let videos;
  try {
    videos = await listVideos();
  } catch (err) {
    console.error('✗ Échec listing vidéos :', err.message);
    console.error('  Cause possible : profil inaccessible, réseau, ou yt-dlp obsolète.');
    console.error('  Mise à jour : `pip install -U yt-dlp` ou télécharger la release.');
    process.exit(1);
  }

  if (videos.length === 0) {
    console.warn('⚠ Aucune vidéo trouvée. tiktoks.js conservera son fallback vide.');
    return;
  }

  const downloaded = [];
  for (const v of videos) {
    try {
      downloaded.push(await downloadVideo(v));
    } catch (err) {
      console.warn(`    ⚠ ${v.id} échoué : ${err.message.split('\n')[0]}`);
    }
  }

  if (downloaded.length === 0) {
    console.error('✗ Aucun téléchargement réussi. tiktoks.js non modifié.');
    process.exit(1);
  }

  await writeFile(DATA_FILE, generateTikToksFile(downloaded), 'utf8');
  console.log(`  ✓ ${DATA_FILE} régénéré avec ${downloaded.length} vidéos`);

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`✅ ${downloaded.length} TikTok(s) prêtes en self-host MP4.`);
  console.log('═══════════════════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('✗ Erreur fatale :', err);
  process.exit(1);
});
