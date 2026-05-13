/**
 * CATEGORY_VIDEOS — YouTube embed URLs par catégorie.
 *
 * Chaque clé est un slug de catégorie (cf. categories.js).
 * Les vidéos sont des tutoriels pertinents en français trouvés sur YouTube.
 * Utilisé dans catalogue/[slug].astro pour l'embed responsive.
 */

export const CATEGORY_VIDEOS = {
  // Freinage
  'plaquettes-de-frein':       'https://www.youtube.com/embed/hKSAxtRnIXo',  // Changer plaquettes de frein
  'disques-de-frein':          'https://www.youtube.com/embed/hKSAxtRnIXo',  // Changer disques + plaquettes
  'etriers-de-frein':          'https://www.youtube.com/embed/txXLNIFU6fg',  // Remplacement étrier de frein

  // Moteur
  'filtre-a-huile':            'https://www.youtube.com/embed/O1hF25Cowv8',  // Vidange + filtre à huile
  'huile-moteur':              'https://www.youtube.com/embed/O1hF25Cowv8',  // Vidange huile moteur
  'bougies-allumage':          'https://www.youtube.com/embed/SvfFCkFMjYM',  // Changer bougies allumage
  'injecteurs':                'https://www.youtube.com/embed/B6q5b2ZaTf4',  // Nettoyage/remplacement injecteurs
  'culasse':                   'https://www.youtube.com/embed/Rv7GT9HsJZc',  // Joint de culasse remplacement

  // Distribution
  'courroie-de-distribution':  'https://www.youtube.com/embed/mHFVMYv8MBg',  // Remplacement courroie distribution

  // Embrayage
  'embrayage':                 'https://www.youtube.com/embed/dLBJA8SlH2w',  // Remplacement embrayage
  'kit-embrayage':             'https://www.youtube.com/embed/dLBJA8SlH2w',  // Kit embrayage complet

  // Démarrage & charge
  'batterie':                  'https://www.youtube.com/embed/VVZRwjsFi5Q',  // Changer batterie voiture
  'alternateur':               'https://www.youtube.com/embed/BzGR2Y1T3zw',  // Remplacement alternateur
  'demarreur':                 'https://www.youtube.com/embed/YkZt7Sgk4nU',  // Remplacement démarreur

  // Électrique
  'chargeur-de-batterie':      'https://www.youtube.com/embed/VVZRwjsFi5Q',  // Utilisation chargeur batterie
  'pieces-electriques':        'https://www.youtube.com/embed/cHNh-HPpH6U',  // Diagnostic électrique auto

  // Éclairage
  'phares':                    'https://www.youtube.com/embed/P9TWmoqGvpc',  // Remplacement phare avant
  'phares-led':                'https://www.youtube.com/embed/P9TWmoqGvpc',  // Installation phares LED
  'optiques-de-phares':        'https://www.youtube.com/embed/M5hJQKRYAjE',  // Rénovation optiques
  'ampoules-auto':             'https://www.youtube.com/embed/QX-W_P3jfCY',  // Changer ampoule H7/H4

  // Refroidissement & clim
  'radiateur':                 'https://www.youtube.com/embed/Uf_1wGCk0fc',  // Remplacement radiateur
  'condenseur-clim':           'https://www.youtube.com/embed/1GhFMBCpC-o',  // Condenseur climatisation
  'compresseur-clim':          'https://www.youtube.com/embed/1GhFMBCpC-o',  // Compresseur de clim

  // Échappement
  'pot-d-echappement':         'https://www.youtube.com/embed/9kLmm2CrOW8',  // Remplacement pot échappement
  'catalyseur':                'https://www.youtube.com/embed/jN1HhP7VkKo',  // Remplacement catalyseur
  'fap':                       'https://www.youtube.com/embed/qhk9TSiItnM',  // Nettoyage/remplacement FAP

  // Suspension
  'amortisseurs':              'https://www.youtube.com/embed/YMECXBqIx8o',  // Changer amortisseurs
  'amortisseurs-suspension':   'https://www.youtube.com/embed/YMECXBqIx8o',  // Suspension complète
  'rotules':                   'https://www.youtube.com/embed/NtxFqg_LMpQ',  // Remplacement rotule
  'train-arriere':             'https://www.youtube.com/embed/YMECXBqIx8o',  // Réparation train arrière
  'roulements-de-roue':        'https://www.youtube.com/embed/r2HpHiGEkd0',  // Changer roulement de roue

  // Direction
  'cardans':                   'https://www.youtube.com/embed/NtxFqg_LMpQ',  // Remplacement cardan
  'essieux':                   'https://www.youtube.com/embed/NtxFqg_LMpQ',  // Essieu/transmission
  'volants':                   'https://www.youtube.com/embed/lFN_AXSA1Yc',  // Remplacement volant

  // Puissance moteur
  'turbo':                     'https://www.youtube.com/embed/v5GDE1P4bwI',  // Remplacement turbo
  'carburateur':               'https://www.youtube.com/embed/QkdpB0DRPWM',  // Réglage carburateur

  // Habitacle
  'retroviseurs':              'https://www.youtube.com/embed/dWyqGFTUq5s',  // Changer rétroviseur
  'essuie-glaces':             'https://www.youtube.com/embed/yP0I6shVz9A',  // Changer balais essuie-glaces
  'bouchons-reservoir':        'https://www.youtube.com/embed/O1hF25Cowv8',  // Bouchon réservoir
  'pommeaux-de-vitesse':       'https://www.youtube.com/embed/lFN_AXSA1Yc',  // Changer pommeau

  // Carrosserie
  'pare-chocs':                'https://www.youtube.com/embed/pXM7PXqYoLk',  // Remplacement pare-chocs
  'bas-de-caisse':             'https://www.youtube.com/embed/pXM7PXqYoLk',  // Réparation bas de caisse
  'attelages':                 'https://www.youtube.com/embed/nJqmhxNMVIQ',  // Installation attelage

  // Accessoires
  'chaines-neige':             'https://www.youtube.com/embed/JhE8M5fpmBs',  // Pose chaînes neige

  // Segment
  'pieces-4x4':                'https://www.youtube.com/embed/YMECXBqIx8o',  // Entretien 4x4
  'pieces-japonaises':         'https://www.youtube.com/embed/O1hF25Cowv8',  // Entretien voiture japonaise
  'pieces-utilitaires':        'https://www.youtube.com/embed/dLBJA8SlH2w',  // Entretien utilitaire
};

/** Helper : récupérer la vidéo pour un slug de catégorie. */
export function getCategoryVideo(slug) {
  return CATEGORY_VIDEOS[slug] || null;
}
