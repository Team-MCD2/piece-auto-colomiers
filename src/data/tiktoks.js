/**
 * TIKTOKS — vidéos TikTok du compte client, téléchargées localement (D38).
 *
 * Pattern : MP4 local + lecteur custom avec sound toggle (carry-over Mon Boum V3).
 * Pas d'iframe TikTok (raisons : LCP/CLS, RGPD cookies tiers, dépendance runtime).
 *
 * Ce fichier est REGÉNÉRÉ par `npm run sync:tiktok` qui :
 *  1. Liste les vidéos publiques de @pieces.auto.colomiers via yt-dlp
 *  2. Trie par vues décroissantes, garde TIKTOK_TOP_N (default 6)
 *  3. Télécharge MP4 H.264 ≤ 720p dans /public/tiktoks/
 *  4. Extrait posters JPG via ffmpeg dans /public/tiktoks/posters/
 *  5. Réécrit ce fichier avec les métadonnées
 *
 * Cf. plan.md §22 (spec complet du composant TikTokGrid).
 */

/** @type {Array<{
 *   id: string;            // ID TikTok (ex: '7611527215808859414')
 *   title: string;         // Titre court (≤ 80 chars)
 *   url: string;           // URL TikTok originale (CTA "Voir sur TikTok")
 *   mp4: string;           // Chemin local du MP4 (/tiktoks/<id>.mp4)
 *   poster: string;        // Chemin local du poster (/tiktoks/posters/<id>.jpg)
 *   views: number;         // Nombre de vues au moment du sync
 *   durationSec: number;   // Durée en secondes
 *   uploadedAt: string;    // ISO 8601
 *   width: number;         // px (typiquement 720 ou 1080)
 *   height: number;        // px (typiquement 1280 ou 1920, ratio 9:16)
 * }> } */
export const TIKTOKS = [
  // Placeholder — 1 entrée témoin connue (URL fournie par l'utilisateur).
  // Le vrai contenu sera populé par `npm run sync:tiktok` au scaffold J1.
  {
    id: '7611527215808859414',
    title: 'Pièces Auto Colomiers — vidéo référence',
    url: 'https://www.tiktok.com/@pieces.auto.colomiers/video/7611527215808859414',
    mp4: '/tiktoks/7611527215808859414.mp4',
    poster: '/tiktoks/posters/7611527215808859414.jpg',
    views: 0,
    durationSec: 30,
    uploadedAt: '2025-01-01',
    width: 1080,
    height: 1920,
  },
];

/** Drapeau : true si la liste contient des données réelles (post-sync). */
export const TIKTOKS_SYNCED = false;

/** Username TikTok officiel. */
export const TIKTOK_USERNAME = 'pieces.auto.colomiers';

/** URL profil TikTok. */
export const TIKTOK_PROFILE_URL = `https://www.tiktok.com/@${TIKTOK_USERNAME}`;
