/**
 * public-asset — utilitaires build-time pour vérifier la présence d'assets
 * dans /public sans causer de 404 réseau si manquants.
 *
 * Pourquoi ?
 *   `import.meta.glob` ne fonctionne que sur /src. Pour /public, on doit
 *   lire le filesystem au build time depuis le frontmatter Astro.
 *
 * Usage :
 *   import { publicAssetExists } from '../lib/public-asset';
 *   const hasLogo = publicAssetExists(b.logo);
 *   {hasLogo ? <img src={b.logo} /> : <span>{b.name}</span>}
 */

import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const PUBLIC_DIR = resolve('./public');

/**
 * Retourne true si le fichier existe dans /public.
 * @param relPath chemin relatif depuis /public (ex: "/assets/brands/bosch.svg")
 *                ou avec ou sans leading slash.
 */
export function publicAssetExists(relPath?: string | null): boolean {
  if (!relPath) return false;
  // Normalise les leading slashes
  const clean = relPath.replace(/^\/+/, '');
  const abs = join(PUBLIC_DIR, clean);
  try {
    return existsSync(abs);
  } catch {
    return false;
  }
}
