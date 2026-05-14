/**
 * CATEGORY_VIDEOS — YouTube embed URLs par catégorie.
 *
 * ⚠️  TOUTES LES VIDÉOS SONT DÉSACTIVÉES (D-2026-05-13d).
 *
 * Constat owner (screenshots D-2026-05-13d) : sur les 35+ entrées qui
 * peuplaient cette table, ABSOLUMENT TOUTES rendaient soit "Video
 * unavailable" (vidéos supprimées par leurs auteurs ou rendues privées)
 * soit du contenu hors-sujet (le pire : `dLBJA8SlH2w` censé être un
 * tutoriel embrayage → en fait un parapente suisse qui se crashe).
 *
 * Root cause : les IDs YouTube avaient été choisis sans vérification
 * humaine. Personne n'a ouvert chaque URL pour confirmer qu'elle joue
 * encore et qu'elle est pertinente. Les IDs YouTube survivent rarement
 * plus de 6-12 mois sur des chaînes amateur.
 *
 * Décision (Phase 5.x, ADR-013) :
 *   1. Désactiver toutes les entrées en attendant une curation humaine.
 *   2. [slug].astro respecte `null` et ne rend pas la section "Comment
 *      ça se passe ?" quand la vidéo est absente.
 *   3. La section pédagogique est désormais remplacée par un guide
 *      texte par slug (cf. `data/category-content.js` → `intervention[]`).
 *   4. Pour réactiver une vidéo : VISITER l'URL dans un navigateur
 *      neuf (incognito), confirmer qu'elle joue + qu'elle est en
 *      français + qu'elle correspond au slug, PUIS la remettre ici.
 *      Si possible privilégier des chaînes garage pro long-running
 *      (Garage AVD, Le Cardan, Mécanique Pro, etc.) plutôt que des
 *      vidéos amateur isolées.
 *
 * Cf. ADR-013, owner brief 2026-05-14, log D-2026-05-13d.
 */

export const CATEGORY_VIDEOS = {
  // Toutes les entrées commentées ci-dessous étaient cassées au
  // 2026-05-14. Le format est conservé pour ré-activation rapide
  // quand un humain aura vérifié les URLs.
  //
  // 'plaquettes-de-frein':       'https://www.youtube.com/embed/<VERIFY>',
  // 'disques-de-frein':          'https://www.youtube.com/embed/<VERIFY>',
  // 'etriers-de-frein':          'https://www.youtube.com/embed/<VERIFY>',
  // ... (cf. git history pour le full set précédent)
};

/* Anciennes entrées désactivées (D-2026-05-13d) — référence git history.
const LEGACY_BROKEN_VIDEOS = {
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
*/

/** Helper : récupérer la vidéo pour un slug de catégorie. */
export function getCategoryVideo(slug) {
  return CATEGORY_VIDEOS[slug] || null;
}
