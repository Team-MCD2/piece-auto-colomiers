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

// D-2026-05-13d : queries révisées suite aux failures owner screenshots.
// Le bare term "diesel" matche train/locomotive sur Pexels. "Clutch
// release bearing" matche un sac YSL. "Clutch kit assembly" matche des
// pneus jouet. Stratégie nouvelle : forcer le contexte automotive +
// éviter les termes ambigus (diesel/release/kit) seuls.
export const SUBCATEGORY_SEARCH_QUERIES = {
  // Freinage
  'plaquettes-avant': 'car brake pad mechanic',
  'plaquettes-arriere': 'rear car brake pad workshop',
  'temoins-usure-plaquettes': 'brake pad sensor automotive',
  'disques-avant': 'car brake rotor disc front',
  'disques-arriere': 'rear brake disc automotive',
  'etriers-avant': 'red brake caliper car wheel',
  'etriers-arriere': 'rear brake caliper automotive',

  // Moteur — éviter "diesel" seul (matche locomotive)
  'bougies-allumage-essence': 'spark plug engine close up',
  'bougies-prechauffage-diesel': 'glow plug automotive part',
  'injecteurs-essence': 'fuel injector engine bay',
  'injecteurs-diesel': 'common rail fuel injector engine',
  // Huile : varier le contexte visuel pour éviter "all the same"
  'huile-5w30': 'motor oil bottle garage',
  'huile-5w40': 'engine oil pouring close up',
  'huile-0w20': 'synthetic engine oil black',
  'huile-10w40': 'oil change mechanic workshop',
  'filtre-cartouche': 'engine oil filter paper element',
  'filtre-visse': 'spin on oil filter car',

  // Distribution
  'kit-distribution': 'timing belt engine pulleys',
  'kit-distribution-pompe-eau': 'timing belt water pump kit engine',

  // Embrayage — "clutch release bearing" matchait un sac YSL
  'disque-embrayage': 'clutch friction disc automotive',
  'mecanisme-embrayage': 'clutch pressure plate cover',
  'butee-embrayage': 'clutch throwout bearing automotive',
  'kit-3-pieces': 'car clutch kit components',
  'kit-bimasse': 'dual mass flywheel engine',

  // Démarrage — batteries
  'batterie-tourisme': 'car battery under hood',
  'batterie-stop-start': 'agm car battery automotive',
  'batterie-utilitaire': 'heavy duty truck battery engine bay',

  // Éclairage — différencier droit / gauche / culots
  'phare-avant-droit': 'car headlight right close up',
  'phare-avant-gauche': 'car headlight left close up',
  'ampoules-h7': 'halogen bulb hand replacement',
  'ampoules-h4': 'h4 headlight bulb car',
  'ampoules-h1': 'automotive halogen bulb',
  'ampoules-led-retrofit': 'led car bulb retrofit',

  // Échappement
  'silencieux-arriere': 'rear exhaust muffler chrome',
  'silencieux-intermediaire': 'exhaust pipe under car',

  // Suspension
  'amortisseurs-avant': 'front shock absorber strut car',
  'amortisseurs-arriere': 'rear shock absorber automotive',
  'rotule-direction': 'tie rod end steering car',
  'rotule-suspension': 'ball joint suspension automotive',
  'roulement-avant': 'wheel hub bearing front car',
  'roulement-arriere': 'rear wheel bearing automotive',

  // Direction
  'cardan-cote-roue': 'cv axle drive shaft car',
  'cardan-cote-boite': 'cv joint inner automotive',

  // Habitacle
  'retroviseur-droit': 'car side mirror right closeup',
  'retroviseur-gauche': 'car side mirror left closeup',
  'balais-essuie-glaces-avant': 'windshield wiper blade car',
  'balais-essuie-glaces-arriere': 'rear windshield wiper car',

  // Carrosserie
  'pare-chocs-avant': 'car front bumper white',
  'pare-chocs-arriere': 'car rear bumper close up',
  'attelage-fixe': 'tow hitch trailer car',
  'attelage-demontable': 'detachable tow bar car',
};

export function getSubcategoryCuratedQuery(slug) {
  return SUBCATEGORY_SEARCH_QUERIES[slug] ?? null;
}
