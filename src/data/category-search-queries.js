/**
 * CATEGORY_SEARCH_QUERIES — requêtes Pexels curées par slug.
 *
 * Pourquoi ce fichier existe :
 *   La v1 de `scripts/fetch-images.mjs` cherchait Pexels avec le label FR
 *   de chaque catégorie (`cat.label`). Mauvaise idée — homonymes français
 *   désastreux côté Pexels (entraîné EN) :
 *     - "bougie" → bougie décorative (collier doré)
 *     - "phare" → phare maritime (Bretagne)
 *     - "pot d'échappement" → pot de fleur
 *     - "volant" → volant de badminton
 *     - "rotule" → bracelet à boules
 *     - "train arrière" → roue de train de fer
 *     - "attelage" → cheval attelé
 *     - "chocs" → chocolats
 *   etc. — 22 images sur 47 étaient sémantiquement fausses.
 *
 * Stratégie :
 *   Map explicite slug → requête anglaise mécanique/auto.
 *   - Première requête : terme spécifique (« spark plug close up »)
 *   - `fetch-images.mjs` fallback : « car {query} » pour résultats plus larges
 *   - Si Pexels ne trouve rien : fallback Picsum (à éviter par construction).
 *
 * Source design : termes auto EN issus de glossaires standards
 *   (RockAuto, Bosch B2B catalog, Pexels titles existants déjà bons).
 *
 * Maintenance :
 *   Ajouter une entrée par nouveau slug dans `src/data/categories.js`.
 *   Si un slug n'est pas mappé ici, le script retombe sur l'ancienne stratégie
 *   (label FR puis fallback générique).
 *
 * Cf. F-2026-05-13d (owner-feedback "lot of inaccurate images") et
 *     log.md D-2026-05-13d.
 */

export const CATEGORY_SEARCH_QUERIES = {
  // Freinage — anciennes images déjà correctes mais on standardise
  'plaquettes-de-frein': 'brake pad close up',
  'disques-de-frein': 'brake disc rotor automotive',
  'etriers-de-frein': 'brake caliper red',

  // Moteur
  'filtre-a-huile': 'oil filter cartridge engine',
  'huile-moteur': 'engine oil pouring',
  'bougies-allumage': 'spark plug close up',
  'injecteurs': 'fuel injector close up',
  'culasse': 'engine cylinder head',

  // Distribution
  'courroie-de-distribution': 'timing belt engine',

  // Embrayage
  'embrayage': 'clutch disc automotive',
  'kit-embrayage': 'clutch kit assembly',

  // Démarrage & charge
  'batterie': 'car battery automotive',
  'alternateur': 'car alternator',
  'demarreur': 'starter motor automotive',

  // Électrique
  'chargeur-de-batterie': 'car battery charger',
  'pieces-electriques': 'automotive wiring harness',

  // Éclairage
  'phares': 'car headlight close up',
  'phares-led': 'led headlight automotive',
  'optiques-de-phares': 'car headlight assembly',
  'ampoules-auto': 'halogen bulb h7 automotive',

  // Refroidissement & clim
  'radiateur': 'car radiator engine',
  'condenseur-clim': 'air conditioning condenser automotive',
  'compresseur-clim': 'ac compressor automotive',

  // Échappement
  'pot-d-echappement': 'exhaust pipe automotive',
  'catalyseur': 'catalytic converter automotive',
  'fap': 'diesel particulate filter exhaust',

  // Suspension
  'amortisseurs': 'shock absorber suspension',
  'amortisseurs-suspension': 'suspension strut coil spring',
  'rotules': 'suspension ball joint mechanic',
  'train-arriere': 'rear axle suspension automotive',
  'roulements-de-roue': 'wheel hub bearing',

  // Direction
  'cardans': 'cv axle joint',
  'essieux': 'axle automotive component',
  'volants': 'steering wheel interior car',

  // Puissance moteur
  'turbo': 'turbocharger engine',
  'carburateur': 'carburetor engine',

  // Habitacle
  'retroviseurs': 'car side mirror',
  'essuie-glaces': 'windshield wiper blade',
  'bouchons-reservoir': 'fuel cap automotive',
  'pommeaux-de-vitesse': 'gear shift knob',

  // Carrosserie
  'pare-chocs': 'car bumper',
  'bas-de-caisse': 'side skirt car body',
  'attelages': 'tow hitch ball trailer',

  // Accessoires
  'chaines-neige': 'tire snow chains',

  // Par véhicule (segments)
  'pieces-4x4': 'off road 4x4 suv',
  'pieces-japonaises': 'japanese car workshop',
  'pieces-utilitaires': 'utility van workshop',
};

/**
 * Helper : retourne la requête curée pour un slug, ou null si non mappé.
 */
export function getCuratedQuery(slug) {
  return CATEGORY_SEARCH_QUERIES[slug] ?? null;
}
