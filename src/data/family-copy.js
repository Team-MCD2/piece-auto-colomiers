/**
 * FAMILY COPY — contenu générique par famille pour les fiches catégorie V1.
 *
 * Stratégie V1 : pas de prose éditée par catégorie individuelle (47 textes).
 * À la place, contenu générique par famille (16 textes) — partagé entre les
 * catégories d'une même famille. Fait la diff visuelle SEO sans coût rédaction.
 *
 * V2 (J5+) : prose éditée main pour les catégories priority=1 — override par slug.
 *
 * Cf. plan.md §5.2.
 */

export const FAMILY_COPY = {
  freinage: {
    handle: [
      'Plaquettes et disques toutes marques (avant/arrière).',
      'Étriers fixes ou flottants, neufs ou refabriqués.',
      'Liquide de frein DOT 4/5.1 et accessoires de purge.',
    ],
    signs: ['Bruit métallique au freinage.', 'Vibrations dans la pédale.', 'Distance de freinage allongée.'],
  },
  moteur: {
    handle: [
      'Filtration complète (huile, air, carburant, habitacle).',
      'Lubrifiants Castrol, TotalEnergies, Mobil 1.',
      'Injection, allumage, accessoires moteur.',
    ],
    signs: ['Voyant moteur allumé.', 'Démarrage difficile.', 'Consommation anormale.'],
  },
  distribution: {
    handle: [
      'Kits complets (courroie + galets + tendeur).',
      'Pompes à eau associées si recommandé constructeur.',
      'Conseil intervalle constructeur (km/temps).',
    ],
    signs: ['Bruit de claquement moteur.', 'Échéance constructeur dépassée.', 'Fuite huile carter de distribution.'],
  },
  embrayage: {
    handle: [
      'Kits 3 pièces (disque + mécanisme + butée).',
      'Volants moteurs bi-masse pour véhicules récents.',
      'Embrayages renforcés pour utilitaires lourds.',
    ],
    signs: ['Pédale dure ou patinante.', 'Difficulté à passer les vitesses.', 'Odeur de brûlé.'],
  },
  demarrage: {
    handle: [
      'Batteries voiture, utilitaire, 4×4 (Bosch, Varta, Yuasa).',
      'Alternateurs et démarreurs neufs ou échange standard.',
      'Test gratuit batterie sur place sur RDV.',
    ],
    signs: ['Démarrage poussif au froid.', 'Voyant batterie au tableau.', 'Phares qui faiblissent au ralenti.'],
  },
  electrique: {
    handle: [
      'Capteurs (ABS, vilebrequin, oxygène).',
      'Faisceaux, fusibles, relais.',
      'Chargeurs et mainteneurs de charge.',
    ],
    signs: ['Voyant tableau de bord.', 'Fonctions intermittentes.', 'Décharge nocturne.'],
  },
  eclairage: {
    handle: [
      'Phares complets, optiques, ampoules H1/H4/H7.',
      'Kits LED homologués CE.',
      'Feux arrière, antibrouillards, feux de jour.',
    ],
    signs: ['Phare opacifié ou jauni.', 'Faisceau dévié au contrôle technique.', 'Ampoule grillée récurrente.'],
  },
  refroidissement: {
    handle: [
      'Radiateurs moteur et de climatisation.',
      'Compresseurs et condenseurs clim.',
      'Recharge fluide R134a / R1234yf sur site partenaire.',
    ],
    signs: ['Température moteur instable.', 'Clim qui souffle tiède.', 'Fuite liquide sous le véhicule.'],
  },
  echappement: {
    handle: [
      'Pots, lignes complètes, silencieux.',
      'Catalyseurs et FAP homologués.',
      'Sondes lambda et capteurs pression.',
    ],
    signs: ['Bruit de souffle.', 'Voyant moteur allumé.', 'Contre-visite échappement au CT.'],
  },
  suspension: {
    handle: [
      'Amortisseurs gaz ou huile, kits suspension complets.',
      'Rotules, biellettes, silentblocs.',
      'Roulements de roue SKF / FAG.',
    ],
    signs: ['Tenue de route dégradée.', "Bruit en passage de dos d'âne.", 'Usure pneus irrégulière.'],
  },
  direction: {
    handle: [
      'Cardans complets et soufflets.',
      'Pompes de direction assistée.',
      'Volants origine ou sport.',
    ],
    signs: ['Claquement en virage.', 'Direction dure.', 'Vibrations dans le volant.'],
  },
  'puissance-moteur': {
    handle: [
      'Turbocompresseurs neufs ou échange standard.',
      'Carburateurs (anciens véhicules) rénovés ou neufs.',
      'Vannes EGR et accessoires admission.',
    ],
    signs: ['Perte de puissance.', 'Mode dégradé activé.', 'Sifflement turbo.'],
  },
  habitacle: {
    handle: [
      'Rétroviseurs intérieurs et extérieurs.',
      'Essuie-glaces avant/arrière toutes longueurs.',
      'Petits accessoires (bouchons, pommeaux, joints).',
    ],
    signs: ["Bruit d'essuie-glace.", 'Rétroviseur cassé.', 'Joint de fenêtre dégradé.'],
  },
  carrosserie: {
    handle: [
      'Pare-chocs avant/arrière peints ou bruts.',
      'Bas de caisse et habillages.',
      'Attelages remorque démontables ou fixes.',
    ],
    signs: ['Choc, fissure, déformation.', 'Peinture qui cloche.', 'Attelage à dimensionner pour la charge.'],
  },
  accessoires: {
    handle: [
      'Chaînes neige métal ou textile, toutes tailles.',
      'Petits équipements et consommables.',
      'Conseil compatibilité véhicule.',
    ],
    signs: ['Période hivernale en altitude.', "Obligation B58 dans certaines communes.", 'Pneus 4 saisons à compléter.'],
  },
  segment: {
    handle: [
      'Catalogue complet adapté au segment véhicule.',
      'Sourcing OEM ou équivalent qualité.',
      'Conseil sur les spécificités constructeur.',
    ],
    signs: ['Pièce introuvable en généraliste.', 'Modèle import ou récent.', 'Référence OEM exigée par le garage.'],
  },
};

/** Helper : retourne le copy d'une famille, ou un fallback générique. */
export function getFamilyCopy(familyId) {
  return FAMILY_COPY[familyId] ?? {
    handle: ['Pièces neuves multi-marques sourcées chez nos équipementiers de référence.'],
    signs: ['Doute sur la pièce ? Contactez-nous, on vous aide à identifier.'],
  };
}
