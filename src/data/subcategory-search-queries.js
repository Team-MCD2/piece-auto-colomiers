/**
 * SUBCATEGORY_SEARCH_QUERIES — requêtes Pexels curées par slug L2.
 *
 * Pendant L2 de `category-search-queries.js`. Même rationale :
 *   utiliser des termes auto-mécanique EN spécifiques pour éviter les
 *   homonymes FR (cf. memory `D-2026-05-13d image fix`).
 *
 * Couvre les 51 L2 définies dans `src/data/subcategories.js`.
 *
 * Cf. Phase 7.1 (L2 retrofit shipped 2026-05-13c) + L2 image pass
 *     D-2026-05-13d (this file).
 */

export const SUBCATEGORY_SEARCH_QUERIES = {
  // Freinage
  'plaquettes-avant': 'front brake pad car',
  'plaquettes-arriere': 'rear brake pad car',
  'temoins-usure-plaquettes': 'brake pad wear sensor',
  'disques-avant': 'front brake disc rotor',
  'disques-arriere': 'rear brake disc rotor',
  'etriers-avant': 'front brake caliper',
  'etriers-arriere': 'rear brake caliper',

  // Moteur
  'bougies-allumage-essence': 'spark plug gasoline engine',
  'bougies-prechauffage-diesel': 'diesel glow plug',
  'injecteurs-essence': 'gasoline fuel injector',
  'injecteurs-diesel': 'diesel injector common rail',
  'huile-5w30': 'motor oil bottle 5w30',
  'huile-5w40': 'motor oil bottle 5w40',
  'huile-0w20': 'synthetic motor oil bottle',
  'huile-10w40': 'semi synthetic motor oil',
  'filtre-cartouche': 'oil filter paper cartridge',
  'filtre-visse': 'spin on oil filter',

  // Distribution
  'kit-distribution': 'timing belt kit pulleys',
  'kit-distribution-pompe-eau': 'timing belt water pump kit',

  // Embrayage
  'disque-embrayage': 'clutch disc plate',
  'mecanisme-embrayage': 'clutch pressure plate',
  'butee-embrayage': 'clutch release bearing',
  'kit-3-pieces': 'clutch kit assembly',
  'kit-bimasse': 'dual mass flywheel',

  // Démarrage
  'batterie-tourisme': 'car battery 12v',
  'batterie-stop-start': 'agm car battery',
  'batterie-utilitaire': 'heavy duty truck battery',

  // Éclairage
  'phare-avant-droit': 'car headlight right side',
  'phare-avant-gauche': 'car headlight left side',
  'ampoules-h7': 'h7 halogen bulb car',
  'ampoules-h4': 'h4 halogen headlight bulb',
  'ampoules-h1': 'h1 halogen bulb car',
  'ampoules-led-retrofit': 'led car headlight bulb',

  // Échappement
  'silencieux-arriere': 'rear exhaust muffler',
  'silencieux-intermediaire': 'exhaust pipe middle',

  // Suspension
  'amortisseurs-avant': 'front shock absorber strut',
  'amortisseurs-arriere': 'rear shock absorber',
  'rotule-direction': 'tie rod end steering',
  'rotule-suspension': 'suspension ball joint car',
  'roulement-avant': 'front wheel hub bearing',
  'roulement-arriere': 'rear wheel hub bearing',

  // Direction
  'cardan-cote-roue': 'cv axle outer joint',
  'cardan-cote-boite': 'cv axle inner joint',

  // Habitacle
  'retroviseur-droit': 'car side mirror right',
  'retroviseur-gauche': 'car side mirror left',
  'balais-essuie-glaces-avant': 'windshield wiper blade close up',
  'balais-essuie-glaces-arriere': 'rear windshield wiper',

  // Carrosserie
  'pare-chocs-avant': 'front car bumper',
  'pare-chocs-arriere': 'rear car bumper',
  'attelage-fixe': 'fixed tow bar hitch',
  'attelage-demontable': 'detachable tow bar',
};

export function getSubcategoryCuratedQuery(slug) {
  return SUBCATEGORY_SEARCH_QUERIES[slug] ?? null;
}
