/**
 * CATEGORIES — taxonomie produit officielle (47 catégories source Mappy/PJ).
 *
 * Cf. plan.md §5 (catalogue) et synthesis.md §1 pour la liste source.
 * Cette taxonomie est la source de vérité du catalogue V1. Pas d'invention au-delà.
 *
 * Schema d'une entrée :
 *   - slug:       URL fragment, kebab-case sans accent
 *   - label:      affichage humain (FR, accents conservés)
 *   - family:     groupement (cf. FAMILIES ci-dessous)
 *   - vehicles:   compatibilités (cf. VEHICLE_TYPES)
 *   - image:      chemin /assets/categories/<slug>.jpg (fourni par fetch:images en J3)
 *   - desc:       1 ligne 80-120 chars pour la card V1
 *   - priority:   1 = page éditoriale prioritaire V1 (intro + signesUsure rédigés J3)
 *   - synonyms:   mots-clés alternatifs SEO (optionnel)
 */

export const VEHICLE_TYPES = [
  { id: 'tourisme',    label: 'Tourisme' },
  { id: '4x4',         label: '4×4 / SUV' },
  { id: 'utilitaires', label: 'Utilitaires' },
  { id: 'japonaises',  label: 'Japonaises' },
];

export const FAMILIES = [
  { id: 'freinage',         label: 'Freinage',           icon: 'Disc' },
  { id: 'moteur',           label: 'Moteur',             icon: 'Cog' },
  { id: 'distribution',     label: 'Distribution',       icon: 'GitBranch' },
  { id: 'embrayage',        label: 'Embrayage',          icon: 'CircleDot' },
  { id: 'demarrage',        label: 'Démarrage & charge', icon: 'BatteryCharging' },
  { id: 'electrique',       label: 'Électrique',         icon: 'Zap' },
  { id: 'eclairage',        label: 'Éclairage',          icon: 'Lightbulb' },
  { id: 'refroidissement',  label: 'Refroid. & clim',    icon: 'Thermometer' },
  { id: 'echappement',      label: 'Échappement',        icon: 'Wind' },
  { id: 'suspension',       label: 'Suspension',         icon: 'Spline' },
  { id: 'direction',        label: 'Direction',          icon: 'Compass' },
  { id: 'puissance-moteur', label: 'Puissance moteur',   icon: 'Gauge' },
  { id: 'habitacle',        label: 'Habitacle',          icon: 'Armchair' },
  { id: 'carrosserie',      label: 'Carrosserie',        icon: 'Car' },
  { id: 'accessoires',      label: 'Accessoires',        icon: 'Package' },
  { id: 'segment',          label: 'Par véhicule',       icon: 'Truck' },
];

const ALL = ['tourisme', '4x4', 'utilitaires', 'japonaises'];
const HEAVY = ['4x4', 'utilitaires'];

export const CATEGORIES = [
  // Freinage (3)
  { slug: 'plaquettes-de-frein',     label: 'Plaquettes de frein',         family: 'freinage', vehicles: ALL, image: '/assets/categories/plaquettes-de-frein.jpg',     desc: 'Plaquettes avant et arrière, toutes marques.', priority: 1 },
  { slug: 'disques-de-frein',        label: 'Disques de frein',            family: 'freinage', vehicles: ALL, image: '/assets/categories/disques-de-frein.jpg',        desc: 'Disques pleins, ventilés ou rainurés multi-marques.', priority: 1 },
  { slug: 'etriers-de-frein',        label: 'Étriers de frein',            family: 'freinage', vehicles: ALL, image: '/assets/categories/etriers-de-frein.jpg',        desc: "Étriers fixes ou flottants, neuf ou refabriqués.", synonyms: ['frein'] },

  // Moteur (5)
  { slug: 'filtre-a-huile',          label: 'Filtre à huile',              family: 'moteur',   vehicles: ALL, image: '/assets/categories/filtre-a-huile.jpg',          desc: "Filtres à huile pour entretien moteur courant." },
  { slug: 'huile-moteur',            label: 'Huile moteur',                family: 'moteur',   vehicles: ALL, image: '/assets/categories/huile-moteur.jpg',            desc: "Lubrifiants Castrol, TotalEnergies, Mobil 1." },
  { slug: 'bougies-allumage',        label: 'Bougies d\'allumage',         family: 'moteur',   vehicles: ALL, image: '/assets/categories/bougies-allumage.jpg',        desc: "Bougies NGK / Bosch / Denso. Allumage et préchauffage.", synonyms: ['bougie'] },
  { slug: 'injecteurs',              label: 'Injecteurs',                  family: 'moteur',   vehicles: ALL, image: '/assets/categories/injecteurs.jpg',              desc: "Injecteurs essence ou diesel, neufs ou refabriqués.", synonyms: ['injecteur'] },
  { slug: 'culasse',                 label: 'Culasse',                     family: 'moteur',   vehicles: ALL, image: '/assets/categories/culasse.jpg',                 desc: "Culasses neuves ou échange standard, toutes motorisations." },

  // Distribution (1)
  { slug: 'courroie-de-distribution', label: 'Courroie de distribution',   family: 'distribution', vehicles: ALL, image: '/assets/categories/courroie-de-distribution.jpg', desc: "Kit complet courroie + galets + tendeur.", priority: 1, synonyms: ['kit de distribution'] },

  // Embrayage (2)
  { slug: 'embrayage',               label: 'Embrayage',                   family: 'embrayage', vehicles: ALL, image: '/assets/categories/embrayage.jpg',               desc: "Disques, mécanismes, butées d'embrayage.", priority: 1 },
  { slug: 'kit-embrayage',           label: 'Kit embrayage',               family: 'embrayage', vehicles: ALL, image: '/assets/categories/kit-embrayage.jpg',           desc: "Kit complet (disque + mécanisme + butée)." },

  // Démarrage & charge (3)
  { slug: 'batterie',                label: 'Batterie',                    family: 'demarrage', vehicles: ALL, image: '/assets/categories/batterie.jpg',                desc: "Batteries voiture, utilitaire, 4×4. Bosch, Varta, Yuasa.", priority: 1 },
  { slug: 'alternateur',             label: 'Alternateur',                 family: 'demarrage', vehicles: ALL, image: '/assets/categories/alternateur.jpg',             desc: "Alternateurs neufs ou échange standard, toutes marques.", priority: 1 },
  { slug: 'demarreur',               label: 'Démarreur',                   family: 'demarrage', vehicles: ALL, image: '/assets/categories/demarreur.jpg',               desc: "Démarreurs neufs ou refabriqués, multi-marques.", priority: 1 },

  // Électrique (2)
  { slug: 'chargeur-de-batterie',    label: 'Chargeur de batterie',        family: 'electrique', vehicles: ALL, image: '/assets/categories/chargeur-de-batterie.jpg',   desc: "Chargeurs et mainteneurs de charge automobile." },
  { slug: 'pieces-electriques',      label: 'Pièces électriques',          family: 'electrique', vehicles: ALL, image: '/assets/categories/pieces-electriques.jpg',     desc: "Capteurs, faisceaux, relais, fusibles.", synonyms: ['pièce électrique'] },

  // Éclairage (4)
  { slug: 'phares',                  label: 'Phares',                      family: 'eclairage', vehicles: ALL, image: '/assets/categories/phares.jpg',                  desc: "Phares avant complets, halogène ou xénon.", priority: 1 },
  { slug: 'phares-led',              label: 'Phares LED',                  family: 'eclairage', vehicles: ALL, image: '/assets/categories/phares-led.jpg',              desc: "Phares LED de remplacement, kits homologués." },
  { slug: 'optiques-de-phares',      label: 'Optiques de phares',          family: 'eclairage', vehicles: ALL, image: '/assets/categories/optiques-de-phares.jpg',      desc: "Optiques de remplacement, vitres et coques.", synonyms: ['optique'] },
  { slug: 'ampoules-auto',           label: 'Ampoules auto',               family: 'eclairage', vehicles: ALL, image: '/assets/categories/ampoules-auto.jpg',           desc: "H1, H4, H7, LED, xénon — toutes ampoules auto.", synonyms: ['ampoule'] },

  // Refroidissement & clim (3)
  { slug: 'radiateur',               label: 'Radiateur moteur',            family: 'refroidissement', vehicles: ALL, image: '/assets/categories/radiateur.jpg',          desc: "Radiateurs de refroidissement, multi-marques." },
  { slug: 'condenseur-clim',         label: 'Condenseur de climatisation', family: 'refroidissement', vehicles: ALL, image: '/assets/categories/condenseur-clim.jpg',   desc: "Condenseurs de clim de remplacement.", synonyms: ['condenseur'] },
  { slug: 'compresseur-clim',        label: 'Compresseur de climatisation', family: 'refroidissement', vehicles: ALL, image: '/assets/categories/compresseur-clim.jpg', desc: "Compresseurs de clim, neufs ou refabriqués.", synonyms: ['compresseur'] },

  // Échappement (3)
  { slug: 'pot-d-echappement',       label: "Pot d'échappement",           family: 'echappement', vehicles: ALL, image: '/assets/categories/pot-d-echappement.jpg',    desc: "Pots, lignes complètes, silencieux." },
  { slug: 'catalyseur',              label: 'Catalyseur',                  family: 'echappement', vehicles: ALL, image: '/assets/categories/catalyseur.jpg',            desc: "Catalyseurs homologués CE, multi-marques." },
  { slug: 'fap',                     label: 'Filtre à particules (FAP)',   family: 'echappement', vehicles: ALL, image: '/assets/categories/fap.jpg',                   desc: "FAP de remplacement diesel.", synonyms: ['filtre à particule'] },

  // Suspension (5)
  { slug: 'amortisseurs',            label: 'Amortisseurs',                family: 'suspension', vehicles: ALL, image: '/assets/categories/amortisseurs.jpg',           desc: "Amortisseurs avant et arrière, gaz ou huile.", priority: 1, synonyms: ['amortisseur'] },
  { slug: 'amortisseurs-suspension', label: 'Suspension complète',         family: 'suspension', vehicles: ALL, image: '/assets/categories/amortisseurs-suspension.jpg', desc: "Kits complets suspension : amortisseurs, ressorts, butées.", synonyms: ['amortisseur de suspension'] },
  { slug: 'rotules',                 label: 'Rotules',                     family: 'suspension', vehicles: ALL, image: '/assets/categories/rotules.jpg',                desc: "Rotules de suspension et de direction.", synonyms: ['rotule'] },
  { slug: 'train-arriere',           label: 'Train arrière',               family: 'suspension', vehicles: ALL, image: '/assets/categories/train-arriere.jpg',          desc: "Trains arrière complets ou pièces détachées." },
  { slug: 'roulements-de-roue',      label: 'Roulements de roue',          family: 'suspension', vehicles: ALL, image: '/assets/categories/roulements-de-roue.jpg',     desc: "Roulements et kits moyeux SKF / FAG.", synonyms: ['plaque de roulement'] },

  // Direction (3)
  { slug: 'cardans',                 label: 'Cardans',                     family: 'direction', vehicles: ALL, image: '/assets/categories/cardans.jpg',                desc: "Cardans complets, soufflets, joints homocinétiques.", synonyms: ['cardan'] },
  { slug: 'essieux',                 label: 'Essieux',                     family: 'direction', vehicles: ALL, image: '/assets/categories/essieux.jpg',                desc: "Essieux avant et arrière, toutes marques.", synonyms: ['essieu'] },
  { slug: 'volants',                 label: 'Volants',                     family: 'direction', vehicles: ALL, image: '/assets/categories/volants.jpg',                desc: "Volants de remplacement et accessoires.", synonyms: ['volant'] },

  // Puissance moteur (2)
  { slug: 'turbo',                   label: 'Turbo',                       family: 'puissance-moteur', vehicles: ALL, image: '/assets/categories/turbo.jpg',           desc: "Turbocompresseurs neufs ou échange standard." },
  { slug: 'carburateur',             label: 'Carburateur',                 family: 'puissance-moteur', vehicles: ALL, image: '/assets/categories/carburateur.jpg',     desc: "Carburateurs neufs ou rénovés (anciens véhicules)." },

  // Habitacle (4)
  { slug: 'retroviseurs',            label: 'Rétroviseurs',                family: 'habitacle', vehicles: ALL, image: '/assets/categories/retroviseurs.jpg',           desc: "Rétroviseurs extérieurs et intérieurs.", synonyms: ['rétroviseur'] },
  { slug: 'essuie-glaces',           label: 'Essuie-glaces',               family: 'habitacle', vehicles: ALL, image: '/assets/categories/essuie-glaces.jpg',          desc: "Balais et bras d'essuie-glaces, multi-marques.", synonyms: ['essuie-glace'] },
  { slug: 'bouchons-reservoir',      label: 'Bouchons de réservoir',       family: 'habitacle', vehicles: ALL, image: '/assets/categories/bouchons-reservoir.jpg',    desc: "Bouchons à clé ou sans clé, tous diamètres.", synonyms: ['bouchon de réservoir'] },
  { slug: 'pommeaux-de-vitesse',     label: 'Pommeaux de vitesse',         family: 'habitacle', vehicles: ALL, image: '/assets/categories/pommeaux-de-vitesse.jpg',   desc: "Pommeaux de levier de vitesse, sport ou origine.", synonyms: ['pommeau de vitesse'] },

  // Carrosserie (3)
  { slug: 'pare-chocs',              label: 'Pare-chocs',                  family: 'carrosserie', vehicles: ALL, image: '/assets/categories/pare-chocs.jpg',           desc: "Pare-chocs avant et arrière, peints ou bruts.", synonyms: ['pare-choc'] },
  { slug: 'bas-de-caisse',           label: 'Bas de caisse',               family: 'carrosserie', vehicles: ALL, image: '/assets/categories/bas-de-caisse.jpg',        desc: "Bas de caisse de remplacement et habillage." },
  { slug: 'attelages',               label: 'Attelages',                   family: 'carrosserie', vehicles: HEAVY.concat(['tourisme']), image: '/assets/categories/attelages.jpg', desc: "Attelages remorque démontables ou fixes.", synonyms: ['attelage'] },

  // Accessoires (1)
  { slug: 'chaines-neige',           label: 'Chaînes neige',               family: 'accessoires', vehicles: ALL, image: '/assets/categories/chaines-neige.jpg',         desc: "Chaînes neige métal ou textile, toutes tailles.", synonyms: ['chaîne neige'] },

  // Par véhicule (3 — pages segment)
  { slug: 'pieces-4x4',              label: 'Pièces 4×4',                  family: 'segment',    vehicles: ['4x4'],         image: '/assets/categories/pieces-4x4.jpg',         desc: "Spécialiste 4×4 / SUV : freinage, suspension, transmission.", priority: 1, synonyms: ['pièce 4x4'] },
  { slug: 'pieces-japonaises',       label: 'Pièces japonaises',           family: 'segment',    vehicles: ['japonaises'],  image: '/assets/categories/pieces-japonaises.jpg', desc: "Toyota, Honda, Mazda, Subaru, Nissan, Mitsubishi.", priority: 1, synonyms: ['pièce japonaise'] },
  { slug: 'pieces-utilitaires',      label: 'Pièces utilitaires',          family: 'segment',    vehicles: ['utilitaires'], image: '/assets/categories/pieces-utilitaires.jpg', desc: "Renault Trafic, Citroën Jumpy, Iveco Daily, Fiat Ducato…", priority: 1, synonyms: ['pièce utilitaire'] },
];

/** Helper : récupérer une catégorie par slug. */
export function findCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Helper : récupérer toutes les catégories prioritaires (pages V1 éditées main). */
export function getPriorityCategories() {
  return CATEGORIES.filter((c) => c.priority === 1);
}

/** Helper : récupérer les catégories d'une famille donnée. */
export function getCategoriesByFamily(familyId) {
  return CATEGORIES.filter((c) => c.family === familyId);
}

/**
 * 12 catégories phares de la home (ordre éditorial — cf. plan §4.4).
 * Mix : 3 freinage + 4 mécanique chaude (embrayage, distrib, démarrage) +
 *       2 suspension/direction + 1 éclairage + 1 échappement + 1 segment 4×4.
 */
export const HOME_FEATURED_SLUGS = [
  'plaquettes-de-frein',
  'disques-de-frein',
  'embrayage',
  'courroie-de-distribution',
  'batterie',
  'alternateur',
  'demarreur',
  'amortisseurs',
  'phares',
  'pot-d-echappement',
  'pieces-4x4',
  'huile-moteur',
];
