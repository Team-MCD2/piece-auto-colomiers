/**
 * SUBCATEGORIES — L2 leaves of the 3-level catalog matrix (Phase 7).
 *
 * Architecture context :
 *   - L1   = FAMILIES        (16 in `categories.js`, ex. "freinage")
 *   - L1.5 = CATEGORIES      (47 in `categories.js`, ex. "plaquettes-de-frein")
 *   - L2   = SUBCATEGORIES   (this file — variants of an L1.5 keyed on
 *                             position / system / format / fitment / use)
 *
 * Owner-validated set (ADR-012 Option C, F12, 2026-05-13). The draft
 * authored at `.project-store/drafts/subcategories-draft.js` was
 * promoted here line-for-line with no edits, on owner delegation
 * ("take your time and reason so you produce proper work, i give you
 * the right to go ahead what your suggestions"). 41 L2 entries across
 * 17 of the 47 L1.5 categories. The remaining 30 categories stay as
 * L1.5 leaves (single-SKU-per-car: alternateur, démarreur, radiateur,
 * turbo, FAP, etc.) — see `getNavigableLeaves()`.
 *
 * Schema :
 *   - slug      : URL fragment, kebab-case, no accents — UNIQUE per L2
 *   - parent    : the L1.5 slug from `categories.js` (1 → many)
 *   - family    : the L1 family id from `categories.js` (denormalised
 *                 for fast filter without a join)
 *   - label     : FR display, ≤ 4 words
 *   - desc      : 1-line preview shown on the L2 card
 *   - image     : `/assets/subcategories/<slug>.jpg` — to be sourced
 *                 in Phase 7.0.C (owner authoring sprint)
 *   - criteria  : decision-tree axes shown on the L2 card preview and
 *                 as filter pills on the L3 listing. ≤ 3 axes per L2.
 *   - brands    : brand whitelist for fitment matrix (Phase 7.0.B)
 *   - faqIds    : FAQ entries to surface on the L3 listing
 *   - videoId   : optional short demo / explainer
 *
 * Cf. ADR-012, da-catalog-matrix-architecture.md, roadmap.md Phase 7.
 */

export const SUBCATEGORIES = [
  // ============================================================
  // FAMILLE : FREINAGE
  // ============================================================

  // parent = plaquettes-de-frein
  {
    slug: 'plaquettes-avant',
    parent: 'plaquettes-de-frein',
    family: 'freinage',
    label: 'Plaquettes avant',
    desc: 'Plaquettes de frein avant — variantes ABS / non-ABS, épaisseurs 16-20 mm.',
    image: '/assets/subcategories/plaquettes-avant.jpg',
    criteria: [
      { key: 'position', value: 'avant', label: 'Position' },
      { key: 'system', options: ['ABS', 'sans-ABS'], label: 'Système' },
    ],
    brands: [],
    faqIds: [],
    videoId: '',
  },
  {
    slug: 'plaquettes-arriere',
    parent: 'plaquettes-de-frein',
    family: 'freinage',
    label: 'Plaquettes arrière',
    desc: 'Plaquettes de frein arrière — variantes tambour / disque selon montage.',
    image: '/assets/subcategories/plaquettes-arriere.jpg',
    criteria: [
      { key: 'position', value: 'arriere', label: 'Position' },
      { key: 'system', options: ['ABS', 'sans-ABS'], label: 'Système' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'temoins-usure-plaquettes',
    parent: 'plaquettes-de-frein',
    family: 'freinage',
    label: "Témoins d'usure plaquettes",
    desc: "Capteurs / témoins d'usure plaquettes — déclenchent le voyant frein.",
    image: '/assets/subcategories/temoins-usure-plaquettes.jpg',
    criteria: [
      { key: 'position', options: ['avant', 'arriere'], label: 'Position' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = disques-de-frein
  {
    slug: 'disques-avant',
    parent: 'disques-de-frein',
    family: 'freinage',
    label: 'Disques avant',
    desc: 'Disques de frein avant — pleins, ventilés ou rainurés-percés.',
    image: '/assets/subcategories/disques-avant.jpg',
    criteria: [
      { key: 'position', value: 'avant', label: 'Position' },
      { key: 'type', options: ['plein', 'ventile', 'raine-perce'], label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'disques-arriere',
    parent: 'disques-de-frein',
    family: 'freinage',
    label: 'Disques arrière',
    desc: 'Disques de frein arrière — pleins ou ventilés selon véhicule.',
    image: '/assets/subcategories/disques-arriere.jpg',
    criteria: [
      { key: 'position', value: 'arriere', label: 'Position' },
      { key: 'type', options: ['plein', 'ventile'], label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = etriers-de-frein
  {
    slug: 'etriers-avant',
    parent: 'etriers-de-frein',
    family: 'freinage',
    label: 'Étriers avant',
    desc: 'Étriers de frein avant — fixes ou flottants, neufs ou refabriqués.',
    image: '/assets/subcategories/etriers-avant.jpg',
    criteria: [
      { key: 'position', value: 'avant', label: 'Position' },
      { key: 'type', options: ['fixe', 'flottant'], label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'etriers-arriere',
    parent: 'etriers-de-frein',
    family: 'freinage',
    label: 'Étriers arrière',
    desc: 'Étriers de frein arrière — modèles avec et sans frein de stationnement intégré.',
    image: '/assets/subcategories/etriers-arriere.jpg',
    criteria: [
      { key: 'position', value: 'arriere', label: 'Position' },
      { key: 'type', options: ['fixe', 'flottant'], label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : MOTEUR
  // ============================================================

  // parent = bougies-allumage
  {
    slug: 'bougies-allumage-essence',
    parent: 'bougies-allumage',
    family: 'moteur',
    label: 'Bougies allumage essence',
    desc: "Bougies d'allumage essence — culot, écartement, indice thermique selon moteur.",
    image: '/assets/subcategories/bougies-allumage-essence.jpg',
    criteria: [
      { key: 'fuel', value: 'essence', label: 'Carburant' },
      { key: 'electrode', options: ['standard', 'iridium', 'platine'], label: 'Électrode' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'bougies-prechauffage-diesel',
    parent: 'bougies-allumage',
    family: 'moteur',
    label: 'Bougies préchauffage diesel',
    desc: 'Bougies de préchauffage diesel — éléments crayon, métal-céramique selon technologie.',
    image: '/assets/subcategories/bougies-prechauffage-diesel.jpg',
    criteria: [
      { key: 'fuel', value: 'diesel', label: 'Carburant' },
      { key: 'tech', options: ['metal', 'ceramique'], label: 'Technologie' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = injecteurs
  {
    slug: 'injecteurs-essence',
    parent: 'injecteurs',
    family: 'moteur',
    label: 'Injecteurs essence',
    desc: 'Injecteurs essence — multipoint ou injection directe selon technologie moteur.',
    image: '/assets/subcategories/injecteurs-essence.jpg',
    criteria: [
      { key: 'fuel', value: 'essence', label: 'Carburant' },
      { key: 'type', options: ['multipoint', 'directe'], label: 'Injection' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'injecteurs-diesel',
    parent: 'injecteurs',
    family: 'moteur',
    label: 'Injecteurs diesel',
    desc: 'Injecteurs diesel common-rail ou pompe-injecteurs — neufs ou refabriqués.',
    image: '/assets/subcategories/injecteurs-diesel.jpg',
    criteria: [
      { key: 'fuel', value: 'diesel', label: 'Carburant' },
      { key: 'type', options: ['common-rail', 'pompe-injecteur'], label: 'Système' },
      { key: 'condition', options: ['neuf', 'echange-standard'], label: 'État' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : DISTRIBUTION
  // ============================================================

  // parent = courroie-de-distribution
  {
    slug: 'kit-distribution',
    parent: 'courroie-de-distribution',
    family: 'distribution',
    label: 'Kit distribution',
    desc: 'Kit complet courroie + galets + tendeur — la base recommandée.',
    image: '/assets/subcategories/kit-distribution.jpg',
    criteria: [
      { key: 'compose', value: 'courroie+galets+tendeur', label: 'Composition' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'kit-distribution-pompe-eau',
    parent: 'courroie-de-distribution',
    family: 'distribution',
    label: 'Kit distribution + pompe à eau',
    desc: 'Kit distribution complet incluant la pompe à eau — entretien combiné recommandé.',
    image: '/assets/subcategories/kit-distribution-pompe-eau.jpg',
    criteria: [
      { key: 'compose', value: 'kit-complet+pompe', label: 'Composition' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : EMBRAYAGE
  // ============================================================

  // parent = embrayage  (the generic L1.5 — keep for cases where customer
  // doesn't know if they need a single piece or a full kit; the L2 splits
  // are the single-piece options)
  {
    slug: 'disque-embrayage',
    parent: 'embrayage',
    family: 'embrayage',
    label: "Disque d'embrayage",
    desc: "Disque d'embrayage seul — quand seul le disque est usé.",
    image: '/assets/subcategories/disque-embrayage.jpg',
    criteria: [],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'mecanisme-embrayage',
    parent: 'embrayage',
    family: 'embrayage',
    label: "Mécanisme d'embrayage",
    desc: "Mécanisme d'embrayage seul — quand le diaphragme ou la cloche est défaillant.",
    image: '/assets/subcategories/mecanisme-embrayage.jpg',
    criteria: [],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'butee-embrayage',
    parent: 'embrayage',
    family: 'embrayage',
    label: "Butée d'embrayage",
    desc: "Butée d'embrayage hydraulique ou mécanique selon véhicule.",
    image: '/assets/subcategories/butee-embrayage.jpg',
    criteria: [
      { key: 'type', options: ['hydraulique', 'mecanique'], label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = kit-embrayage (the kit form — already a "sub-cat" semantically,
  // but we give it L2 children to distinguish 3-pieces vs bimasse)
  {
    slug: 'kit-3-pieces',
    parent: 'kit-embrayage',
    family: 'embrayage',
    label: 'Kit 3 pièces',
    desc: 'Kit embrayage standard : disque + mécanisme + butée.',
    image: '/assets/subcategories/kit-3-pieces.jpg',
    criteria: [],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'kit-bimasse',
    parent: 'kit-embrayage',
    family: 'embrayage',
    label: 'Kit avec bimasse',
    desc: 'Kit embrayage incluant volant moteur bi-masse — diesels modernes.',
    image: '/assets/subcategories/kit-bimasse.jpg',
    criteria: [],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : DÉMARRAGE & CHARGE
  // ============================================================

  // parent = batterie
  {
    slug: 'batterie-tourisme',
    parent: 'batterie',
    family: 'demarrage',
    label: 'Batterie tourisme',
    desc: 'Batterie auto standard — capacités 45-75 Ah, démarrage classique.',
    image: '/assets/subcategories/batterie-tourisme.jpg',
    criteria: [
      { key: 'capacite', unit: 'Ah', range: [45, 75], label: 'Capacité' },
      { key: 'tech', value: 'standard', label: 'Technologie' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'batterie-stop-start',
    parent: 'batterie',
    family: 'demarrage',
    label: 'Batterie Start-Stop (AGM/EFB)',
    desc: 'Batterie AGM ou EFB pour véhicules Start-Stop — cyclage renforcé.',
    image: '/assets/subcategories/batterie-stop-start.jpg',
    criteria: [
      { key: 'tech', options: ['AGM', 'EFB'], label: 'Technologie' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'batterie-utilitaire',
    parent: 'batterie',
    family: 'demarrage',
    label: 'Batterie utilitaire / 4×4',
    desc: 'Batterie haute capacité (75-100 Ah) pour utilitaires et 4×4.',
    image: '/assets/subcategories/batterie-utilitaire.jpg',
    criteria: [
      { key: 'capacite', unit: 'Ah', range: [75, 110], label: 'Capacité' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : ÉCLAIRAGE
  // ============================================================

  // parent = phares (couvre les phares avant complets)
  {
    slug: 'phare-avant-droit',
    parent: 'phares',
    family: 'eclairage',
    label: 'Phare avant droit',
    desc: 'Phare avant droit complet — halogène ou xénon selon montage origine.',
    image: '/assets/subcategories/phare-avant-droit.jpg',
    criteria: [
      { key: 'cote', value: 'droit', label: 'Côté' },
      { key: 'tech', options: ['halogene', 'xenon', 'led'], label: 'Technologie' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'phare-avant-gauche',
    parent: 'phares',
    family: 'eclairage',
    label: 'Phare avant gauche',
    desc: 'Phare avant gauche complet — halogène ou xénon selon montage origine.',
    image: '/assets/subcategories/phare-avant-gauche.jpg',
    criteria: [
      { key: 'cote', value: 'gauche', label: 'Côté' },
      { key: 'tech', options: ['halogene', 'xenon', 'led'], label: 'Technologie' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = ampoules-auto (le plus typique des splits utiles : la bonne
  // ampoule = la bonne référence)
  {
    slug: 'ampoules-h7',
    parent: 'ampoules-auto',
    family: 'eclairage',
    label: 'Ampoules H7',
    desc: 'Ampoules H7 standard ou longue durée — feux principaux.',
    image: '/assets/subcategories/ampoules-h7.jpg',
    criteria: [
      { key: 'culot', value: 'H7', label: 'Culot' },
      { key: 'gamme', options: ['standard', 'longue-duree', 'plus-vision'], label: 'Gamme' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'ampoules-h4',
    parent: 'ampoules-auto',
    family: 'eclairage',
    label: 'Ampoules H4',
    desc: "Ampoules H4 (croisement + route en un culot) — véhicules d'avant ~2010.",
    image: '/assets/subcategories/ampoules-h4.jpg',
    criteria: [
      { key: 'culot', value: 'H4', label: 'Culot' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'ampoules-h1',
    parent: 'ampoules-auto',
    family: 'eclairage',
    label: 'Ampoules H1',
    desc: 'Ampoules H1 — feux longue portée, antibrouillards.',
    image: '/assets/subcategories/ampoules-h1.jpg',
    criteria: [
      { key: 'culot', value: 'H1', label: 'Culot' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'ampoules-led-retrofit',
    parent: 'ampoules-auto',
    family: 'eclairage',
    label: 'Ampoules LED retrofit',
    desc: 'Ampoules LED retrofit homologuées — remplacement halogène par LED.',
    image: '/assets/subcategories/ampoules-led-retrofit.jpg',
    criteria: [
      { key: 'tech', value: 'led', label: 'Technologie' },
      { key: 'homologue', value: true, label: 'Homologuée' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : ÉCHAPPEMENT
  // ============================================================

  // parent = pot-d-echappement
  {
    slug: 'silencieux-arriere',
    parent: 'pot-d-echappement',
    family: 'echappement',
    label: 'Silencieux arrière',
    desc: "Silencieux arrière (pot terminal) — la pièce d'échappement la plus changée.",
    image: '/assets/subcategories/silencieux-arriere.jpg',
    criteria: [],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'silencieux-intermediaire',
    parent: 'pot-d-echappement',
    family: 'echappement',
    label: 'Silencieux intermédiaire',
    desc: 'Silencieux intermédiaire — entre catalyseur et silencieux arrière.',
    image: '/assets/subcategories/silencieux-intermediaire.jpg',
    criteria: [],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : SUSPENSION
  // ============================================================

  // parent = amortisseurs
  {
    slug: 'amortisseurs-avant',
    parent: 'amortisseurs',
    family: 'suspension',
    label: 'Amortisseurs avant',
    desc: 'Amortisseurs avant — gaz ou huile selon châssis.',
    image: '/assets/subcategories/amortisseurs-avant.jpg',
    criteria: [
      { key: 'position', value: 'avant', label: 'Position' },
      { key: 'tech', options: ['gaz', 'huile'], label: 'Technologie' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'amortisseurs-arriere',
    parent: 'amortisseurs',
    family: 'suspension',
    label: 'Amortisseurs arrière',
    desc: 'Amortisseurs arrière — modèles renforcés disponibles pour utilitaires.',
    image: '/assets/subcategories/amortisseurs-arriere.jpg',
    criteria: [
      { key: 'position', value: 'arriere', label: 'Position' },
      { key: 'tech', options: ['gaz', 'huile'], label: 'Technologie' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = rotules
  {
    slug: 'rotule-direction',
    parent: 'rotules',
    family: 'suspension',
    label: 'Rotules de direction',
    desc: 'Rotules de direction — usure typique sur véhicules > 100 000 km.',
    image: '/assets/subcategories/rotule-direction.jpg',
    criteria: [
      { key: 'usage', value: 'direction', label: 'Usage' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'rotule-suspension',
    parent: 'rotules',
    family: 'suspension',
    label: 'Rotules de suspension',
    desc: 'Rotules de suspension (triangle) — bruits et jeu sur essieu avant.',
    image: '/assets/subcategories/rotule-suspension.jpg',
    criteria: [
      { key: 'usage', value: 'suspension', label: 'Usage' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = roulements-de-roue
  {
    slug: 'roulement-avant',
    parent: 'roulements-de-roue',
    family: 'suspension',
    label: 'Roulement avant',
    desc: 'Roulement de roue avant — kit complet avec moyeu sur véhicules récents.',
    image: '/assets/subcategories/roulement-avant.jpg',
    criteria: [
      { key: 'position', value: 'avant', label: 'Position' },
      { key: 'compose', options: ['roulement-seul', 'kit-moyeu'], label: 'Composition' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'roulement-arriere',
    parent: 'roulements-de-roue',
    family: 'suspension',
    label: 'Roulement arrière',
    desc: 'Roulement de roue arrière — durée typique 150-200 000 km.',
    image: '/assets/subcategories/roulement-arriere.jpg',
    criteria: [
      { key: 'position', value: 'arriere', label: 'Position' },
      { key: 'compose', options: ['roulement-seul', 'kit-moyeu'], label: 'Composition' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : DIRECTION
  // ============================================================

  // parent = cardans
  {
    slug: 'cardan-cote-roue',
    parent: 'cardans',
    family: 'direction',
    label: 'Cardan côté roue',
    desc: 'Cardan complet côté roue (joint extérieur) — cliquetis en braquage.',
    image: '/assets/subcategories/cardan-cote-roue.jpg',
    criteria: [
      { key: 'cote', value: 'roue', label: 'Côté' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'cardan-cote-boite',
    parent: 'cardans',
    family: 'direction',
    label: 'Cardan côté boîte',
    desc: 'Cardan complet côté boîte (joint intérieur) — vibrations en accélération.',
    image: '/assets/subcategories/cardan-cote-boite.jpg',
    criteria: [
      { key: 'cote', value: 'boite', label: 'Côté' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : HABITACLE
  // ============================================================

  // parent = retroviseurs
  {
    slug: 'retroviseur-droit',
    parent: 'retroviseurs',
    family: 'habitacle',
    label: 'Rétroviseur droit',
    desc: 'Rétroviseur extérieur droit complet — manuel, électrique, dégivrant.',
    image: '/assets/subcategories/retroviseur-droit.jpg',
    criteria: [
      { key: 'cote', value: 'droit', label: 'Côté' },
      { key: 'options', options: ['manuel', 'electrique', 'degivrant'], label: 'Options' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'retroviseur-gauche',
    parent: 'retroviseurs',
    family: 'habitacle',
    label: 'Rétroviseur gauche',
    desc: 'Rétroviseur extérieur gauche complet — manuel, électrique, dégivrant.',
    image: '/assets/subcategories/retroviseur-gauche.jpg',
    criteria: [
      { key: 'cote', value: 'gauche', label: 'Côté' },
      { key: 'options', options: ['manuel', 'electrique', 'degivrant'], label: 'Options' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = essuie-glaces
  {
    slug: 'balais-essuie-glaces-avant',
    parent: 'essuie-glaces',
    family: 'habitacle',
    label: 'Balais essuie-glaces avant',
    desc: 'Balais essuie-glaces avant — variantes flat-blade, classique, hybride.',
    image: '/assets/subcategories/balais-essuie-glaces-avant.jpg',
    criteria: [
      { key: 'position', value: 'avant', label: 'Position' },
      { key: 'type', options: ['flat-blade', 'classique', 'hybride'], label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'balais-essuie-glaces-arriere',
    parent: 'essuie-glaces',
    family: 'habitacle',
    label: 'Balai essuie-glace arrière',
    desc: 'Balai essuie-glace arrière (lunette) — typiquement bras moulé.',
    image: '/assets/subcategories/balais-essuie-glaces-arriere.jpg',
    criteria: [
      { key: 'position', value: 'arriere', label: 'Position' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // ============================================================
  // FAMILLE : CARROSSERIE
  // ============================================================

  // parent = pare-chocs
  {
    slug: 'pare-chocs-avant',
    parent: 'pare-chocs',
    family: 'carrosserie',
    label: 'Pare-chocs avant',
    desc: 'Pare-chocs avant — apprêté ou peint, avec ou sans capteurs / radars.',
    image: '/assets/subcategories/pare-chocs-avant.jpg',
    criteria: [
      { key: 'position', value: 'avant', label: 'Position' },
      { key: 'finition', options: ['apprete', 'peint'], label: 'Finition' },
      { key: 'options', options: ['avec-radar', 'sans-radar'], label: 'Capteurs' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'pare-chocs-arriere',
    parent: 'pare-chocs',
    family: 'carrosserie',
    label: 'Pare-chocs arrière',
    desc: 'Pare-chocs arrière — apprêté ou peint, avec ou sans capteurs.',
    image: '/assets/subcategories/pare-chocs-arriere.jpg',
    criteria: [
      { key: 'position', value: 'arriere', label: 'Position' },
      { key: 'finition', options: ['apprete', 'peint'], label: 'Finition' },
    ],
    brands: [], faqIds: [], videoId: '',
  },

  // parent = attelages
  {
    slug: 'attelage-fixe',
    parent: 'attelages',
    family: 'carrosserie',
    label: 'Attelage col de cygne fixe',
    desc: 'Attelage à col de cygne fixe — solution la plus économique.',
    image: '/assets/subcategories/attelage-fixe.jpg',
    criteria: [
      { key: 'type', value: 'fixe', label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
  {
    slug: 'attelage-demontable',
    parent: 'attelages',
    family: 'carrosserie',
    label: 'Attelage démontable',
    desc: 'Attelage à rotule démontable — démontage sans outil pour usage occasionnel.',
    image: '/assets/subcategories/attelage-demontable.jpg',
    criteria: [
      { key: 'type', value: 'demontable', label: 'Type' },
    ],
    brands: [], faqIds: [], videoId: '',
  },
];

// =====================================================================
// Helpers
// =====================================================================

/** Find one L2 subcategory by its slug. Returns `undefined` if not found. */
export function findSubcategory(slug) {
  return SUBCATEGORIES.find((sc) => sc.slug === slug);
}

/**
 * Return all L2 subcategories whose parent is the given L1.5 category slug.
 * Empty array if the category has no L2 split (the category is itself a leaf).
 */
export function getSubcategoriesForCategory(parentSlug) {
  return SUBCATEGORIES.filter((sc) => sc.parent === parentSlug);
}

/** Return all L2 subcategories belonging to the given L1 family. */
export function getSubcategoriesByFamily(familyId) {
  return SUBCATEGORIES.filter((sc) => sc.family === familyId);
}

/**
 * Boolean : does this L1.5 category have at least one L2 child ?
 * Used by routing to decide whether `/catalogue/[slug]` should render
 * an L2 list or the L3 product fiche directly.
 */
export function categoryHasSubcategories(parentSlug) {
  return SUBCATEGORIES.some((sc) => sc.parent === parentSlug);
}

/**
 * Build the full pool of "navigable leaves" — i.e. the L1.5 + L2 nodes
 * the user can actually click into and where the vehicle-gating modal
 * may need to fire.
 *
 * Returns an array of `{ kind, slug, parent?, family, label }` records.
 *   - kind = 'L2'      → the leaf is a subcategory ; `parent` is its L1.5
 *   - kind = 'L1.5'    → the leaf is a category with no L2 split
 *
 * Pass the CATEGORIES array as argument to avoid a circular import.
 *
 * @example
 *   import { CATEGORIES } from './categories.js';
 *   import { getNavigableLeaves } from './subcategories.js';
 *   const leaves = getNavigableLeaves(CATEGORIES);
 *   // leaves.length === 41 (L2) + 30 (L1.5 unsplit) = 71
 */
export function getNavigableLeaves(categories) {
  const l2Leaves = SUBCATEGORIES.map((sc) => ({
    kind: 'L2',
    slug: sc.slug,
    parent: sc.parent,
    family: sc.family,
    label: sc.label,
  }));
  const splitParentSlugs = new Set(SUBCATEGORIES.map((sc) => sc.parent));
  const l15Leaves = categories
    .filter((c) => !splitParentSlugs.has(c.slug))
    .map((c) => ({
      kind: 'L1.5',
      slug: c.slug,
      family: c.family,
      label: c.label,
    }));
  return [...l2Leaves, ...l15Leaves];
}

/**
 * Number of L2 splits per L1.5 — useful for badges on L1.5 cards
 * ("3 sous-catégories").
 */
export function countSubcategoriesByParent() {
  const counts = {};
  for (const sc of SUBCATEGORIES) {
    counts[sc.parent] = (counts[sc.parent] ?? 0) + 1;
  }
  return counts;
}
