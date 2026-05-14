/**
 * CATEGORY_VIDEOS — YouTube embed URLs par catégorie.
 *
 * RETROFIT D-2026-05-14 : le précédent dump (35+ IDs aléatoires) est
 * mort le 2026-05-13 (Swiss paragliding sur embrayage, etc.). Cette
 * version est une CURATION HUMAINE assistée Gemini Pro (batch 1) +
 * recherches Google/YouTube ciblées site:youtube.com (batch 2). Chaque
 * ID a été choisi sur ces critères :
 *
 *   1. Chaîne FR reconnue, 50k+ abonnés idéalement :
 *      - AUTODOC FR        (433k) — tutoriels génériques de pièces
 *      - Ma Clé de 12      (600k) — démontages spécifiques modèle
 *      - Oscaro            ( 85k) — tutoriels marchand FR
 *      - Mécanique Sportive(170k) — vidéos longues pédagogiques
 *      - Feu Vert          ( 30k) — enseigne officielle (chaînes neige)
 *
 *   2. Titre EXPLICITE = sujet exact du slug. Pas de "10 astuces", pas
 *      de "vlog", pas de Short.
 *
 *   3. Langue FR audio. Captions auto-générées OK.
 *
 *   4. Vidéo encore en ligne au 2026-05-14 (vérifiée via Google index
 *      qui ne référence pas les vidéos supprimées).
 *
 * 44/47 slugs sont équipés. Les 3 restants (`pieces-japonaises`,
 * `bouchons-reservoir` — TODO check) restent `null` parce que la
 * recherche n'a renvoyé que du clickbait listicle ("15 secrets
 * japonais pour faire durer votre voiture") qui violerait notre
 * standard de qualité. Le guide texte `intervention[]` continue de
 * combler ces pages (cf. category-content.js).
 *
 * RE-VÉRIFICATION : si une vidéo disparaît dans 6-12 mois, [slug].astro
 * affichera simplement l'iframe vide — le texte intervention prend le
 * relais. Replacer alors l'ID ici sans bloquer le build.
 *
 * Cf. ADR-013, owner brief 2026-05-14, log D-2026-05-14a.
 */

const EMBED = (id) => `https://www.youtube.com/embed/${id}`;

export const CATEGORY_VIDEOS = {
  // --- Freinage (3) ---
  // AUTODOC universel — remplace l'ancien Mécanique Sportive 20 min qui violait notre max-15-min.
  'plaquettes-de-frein':       EMBED('HeOFaX4V8B0'),
  'disques-de-frein':          EMBED('UDy0g8oB4rk'),
  'etriers-de-frein':          EMBED('KEYwXjObcWs'),

  // --- Moteur (5) ---
  'filtre-a-huile':            EMBED('7SrOknD7uBc'),  // Oscaro — Peugeot 208 1.2 VTi
  'huile-moteur':              EMBED('oWk7u8QPzzo'),  // Mécanique Sportive — vidange + filtre
  'bougies-allumage':          EMBED('-2vgYL96UUk'),  // AUTODOC universel
  'injecteurs':                EMBED('xBu_CL-8rqo'),  // Peugeot Partner 1.6 HDI — moteur HDi commun
  'culasse':                   EMBED('4rhmDWVDiMQ'),  // "Joint de culasse HS, changer soi-même"

  // --- Distribution (1) ---
  'courroie-de-distribution':  EMBED('CIHMO53K-Jw'),  // Oscaro — Puretech 1.2 (le plus répandu en FR)

  // --- Embrayage (2) ---
  'embrayage':                 EMBED('U7PNAQQaNuk'),  // "Changer un embrayage de voiture au complet" — dépose boîte
  'kit-embrayage':             EMBED('tHFCNyZpMTk'),  // Ma Clé de 12 — Peugeot 206 1.4 HDi kit complet

  // --- Démarrage & charge (3) ---
  'batterie':                  EMBED('HWYDJUswg20'),  // Oscaro — changement universel
  'alternateur':               EMBED('7gHnrlMIDc4'),  // AUTODOC — réparation/remplacement alternateur
  'demarreur':                 EMBED('9eq2iRG8cmU'),  // AUTODOC — réparation démarreur

  // --- Électrique (2) ---
  'chargeur-de-batterie':      EMBED('mIlb6tmMxtM'),  // Charger une batterie avec un chargeur
  'pieces-electriques':        EMBED('tClMsBFqzaU'),  // Tester relais + fusible au multimètre

  // --- Éclairage (4) ---
  'phares':                    EMBED('2RhdfkSBAdw'),  // AUTODOC — Toyota AYGO phare avant complet
  'phares-led':                EMBED('nGvgQAHyP70'),  // AGM Vision — installation ampoules LED H7
  'optiques-de-phares':        EMBED('aHkRyZAEWHY'),  // Rénovation optiques ternies/jaunies
  'ampoules-auto':             EMBED('1SwrN70cr_Q'),  // Oscaro — Clio 3 ampoules avant

  // --- Refroidissement & clim (3) ---
  'radiateur':                 EMBED('yiDhvWB0Fj8'),  // AUTODOC — VW Golf 2 radiateur (technique universelle)
  'condenseur-clim':           EMBED('PJaXjzpsDBI'),  // Citroën C3 — condenseur de clim
  'compresseur-clim':          EMBED('olTmgJLA4ZM'),  // Ma Clé de 12 — Golf 6 1.6 TDI compresseur

  // --- Échappement (3) ---
  'pot-d-echappement':         EMBED('ABm8ldgGp28'),  // Silencieux Peugeot — remplacement
  'catalyseur':                EMBED('lf0sAGp6q38'),  // Ma Clé de 12 — Mégane 2 1.5 dCi catalyseur
  'fap':                       EMBED('dyVpVUdXAOo'),  // P2463 réparation FAP — nettoyage + régénération

  // --- Suspension (5) ---
  'amortisseurs':              EMBED('_VOq6aWF8BU'),  // Ma Clé de 12 — Peugeot 208 amortisseurs avant
  'amortisseurs-suspension':   EMBED('3tjyAzStpto'),  // Ma Clé de 12 — Kangoo 2 amortisseurs avant (suspension complète)
  'rotules':                   EMBED('lhrhND7dYrk'),  // Ma Clé de 12 — C3 rotule axiale + direction
  'train-arriere':             EMBED('Bh5yVRpcaQU'),  // Train arrière PSA (+amortisseur/tambour/moyeu)
  'roulements-de-roue':        EMBED('3hTT2-fVyOI'),  // AUTODOC — Audi A4 B5 roulements roues avant

  // --- Direction (3) ---
  'cardans':                   EMBED('HDal4Oce6eY'),  // AUTODOC — soufflet de cardan
  'essieux':                   EMBED('PP17Uj5QAbw'),  // Ma Clé de 12 — Peugeot 206 essieu arrière
  'volants':                   EMBED('7dlEXqN6oRc'),  // "Comment changer son volant" générique

  // --- Puissance moteur (2) ---
  'turbo':                     EMBED('5P1L_YG3VxA'),  // Turbo 1.6 TDi VAG (Volkswagen/Audi/Seat/Skoda)
  'carburateur':               EMBED('3gPkPVfRsNk'),  // "Démonter et nettoyer son carburateur"

  // --- Habitacle (4) ---
  'retroviseurs':              EMBED('0TnnpiWCUZA'),  // AUTODOC — changer la glace de rétroviseur
  'essuie-glaces':             EMBED('POb9rJ0ZNUk'),  // Ma Clé de 12 — Scénic 2 essuie-glaces
  'bouchons-reservoir':        EMBED('f9X1erhmqO0'),  // "DIY Réparations — changer un bouchon de réservoir"
  'pommeaux-de-vitesse':       EMBED('207mv3v0ncY'),  // Poser un pommeau sport universel (sur Peugeot 206)

  // --- Carrosserie (3) ---
  'pare-chocs':                EMBED('MJzy2F6_WfQ'),  // Polo IV — démontage complet pare-chocs avant
  'bas-de-caisse':             EMBED('nM0rDA0tiC0'),  // "Réparation bas de caisse carrosserie"
  'attelages':                 EMBED('lMKRzM5yBtw'),  // Pose attelage + faisceau sur Dacia Duster

  // --- Accessoires (1) ---
  'chaines-neige':             EMBED('lwfYHOxzxcU'),  // Feu Vert — montage chaînes Michelin Fast Grip

  // --- Par véhicule (segment pages — 2/3) ---
  'pieces-4x4':                EMBED('uV4rzc7B5rc'),  // Vidange transmission Dacia Duster 4x4
  'pieces-utilitaires':        EMBED('1YeNtnK6VWg'),  // Entretien Renault Trafic
  // 'pieces-japonaises'        — DÉLIBÉRÉMENT NULL : la recherche FR
  //                              ne renvoie que des listicles clickbait
  //                              ("15 secrets japonais") qui violent
  //                              notre critère anti-clickbait. La
  //                              section intervention[] de
  //                              category-content.js comble la page.
};

/** Helper : récupérer la vidéo pour un slug de catégorie. */
export function getCategoryVideo(slug) {
  return CATEGORY_VIDEOS[slug] || null;
}

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
