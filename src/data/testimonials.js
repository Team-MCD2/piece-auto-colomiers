/**
 * TESTIMONIALS — vrais avis Google copiés sur le site (override ADR-002).
 *
 * Historique :
 *   - ADR-002 (V1) : pas de citation locale d'avis Google → AvisWidget agrège.
 *   - F-2026-05-13d (owner) : override — "you were supposed to get the ones
 *     from the website and write the best ones in to website".
 *
 * Pourquoi l'override :
 *   Google bloque tout scraping automatis\u00e9 (consent wall confirm\u00e9 sur
 *   `share.google/B3GdnLnjQJ0MngRMd`). L'owner colle manuellement les 3-5
 *   meilleurs avis dans l'array ci-dessous. La home rend alors une carousel
 *   au-dessus de l'AvisWidget (qui reste pour l'agr\u00e9gat).
 *
 * Schema par entrée :
 *   {
 *     author:   string        // pr\u00e9nom (ex. "Marc D.") — anonymisation optionnelle
 *     rating:   1..5          // \u00e9toiles
 *     text:     string        // texte de l'avis, FR, ponctuation pr\u00e9serv\u00e9e
 *     date:     ISO 8601      // ex. "2025-03-14" — affich\u00e9 en relatif
 *     source:   'google'      // toujours 'google' en V1
 *     verified: boolean       // true si l'owner a v\u00e9rifi\u00e9 que l'avis existe r\u00e9ellement
 *     vehicle?: string        // optionnel — ex. "Peugeot 308 2018"
 *     part?:    string        // optionnel — ex. "plaquettes de frein"
 *   }
 *
 * JSON-LD : chaque entry verified=true \u00e9met un `<Review>` dans le schema
 * `LocalBusiness` (cf. Layout.astro). Cela permet \u00e0 Google de surfacer ces
 * citations dans la SERP (rich snippet 5\u2605).
 *
 * Owner action requise pour passer en LIVE :
 *   1. Ouvrir `STORE.avis.googleBusinessUrl` (le share link Google Business)
 *   2. Copier le pr\u00e9nom + le texte + la note + la date des 3-5 meilleurs avis
 *   3. Coller ici en respectant le schema ci-dessus
 *   4. Mettre \u00e0 jour `STORE.avis.google.count` et `.average` dans `store.js`
 *      pour refl\u00e9ter la r\u00e9alit\u00e9 (pas seulement les avis quot\u00e9s ici)
 *   5. Commit + push \u2014 le rendu home s'active automatiquement
 *
 * Cf. F-2026-05-13d, store.js#avis, AvisWidget.astro, log.md D-2026-05-13d.
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} author
 * @property {1|2|3|4|5} rating
 * @property {string} text
 * @property {string} date - ISO 8601 (YYYY-MM-DD)
 * @property {'google'} source
 * @property {boolean} verified
 * @property {string} [vehicle]
 * @property {string} [part]
 */

/** @type {Testimonial[]} */
export const TESTIMONIALS = [
  // Avis Google récupérés depuis les screenshots owner (D-2026-05-13d).
  // Tous originellement en français (Google les avait traduits en EN dans
  // l'interface partagée par l'owner — on remet la version française
  // naturelle pour l'affichage local). Pas de timestamp affiché par
  // décision owner.
  {
    author: 'Aymen Moqran',
    rating: 5,
    text: "Honnêtement, un service exceptionnel du début à la fin ! Le vendeur est incroyablement professionnel, attentif, rapide, et surtout honnête — une qualité rare de nos jours. La pièce était parfaite, exactement ce qu'il me fallait, et à un prix plus que raisonnable.",
    source: 'google',
    verified: true,
  },
  {
    author: 'GTA V CROSS BITUME',
    rating: 5,
    text: "Excellent magasin de pièces auto ! J'ai trouvé exactement ce qu'il me fallait pour ma voiture à un prix très raisonnable. L'équipe est compétente, accueillante et serviable — ils ont pris le temps d'expliquer les différences entre plusieurs modèles de pièces. Service rapide, stock bien garni, et possibilité de commander rapidement les pièces non disponibles. Je recommande vivement !",
    source: 'google',
    verified: true,
  },
  {
    author: 'Walid Ben',
    rating: 5,
    text: "J'ai commandé une pièce pour ma voiture (un alternateur) et tout s'est parfaitement passé. Le vendeur a été très réactif, m'a donné de bons conseils, et la pièce correspondait à la description. Je recommande sans hésiter — ça fait plaisir de tomber sur des professionnels sérieux dans ce domaine !",
    source: 'google',
    verified: true,
    part: 'alternateur',
  },
  {
    author: 'Emna Amri',
    rating: 5,
    text: "Excellent magasin de pièces auto ! Le choix est très large, les prix sont compétitifs, et surtout l'équipe est très professionnelle. On sent qu'ils maîtrisent leur sujet et prennent le temps de conseiller pour trouver la bonne pièce. Ils sont réactifs et la commande arrive rapidement.",
    source: 'google',
    verified: true,
  },
  {
    author: 'Sandrine Dumas',
    rating: 5,
    text: "Un jeune magasin de pièces auto qui mérite d'être soutenu ! Accueil chaleureux, stock bien fourni, et le service est au rendez-vous. Ils font aussi point relais. Je recommande sans hésiter.",
    source: 'google',
    verified: true,
  },
  {
    author: 'anis kasm',
    rating: 5,
    text: "Excellent ! Les prix sont très abordables et le service est vraiment au top. L'équipe prend le temps d'écouter, conseille avec justesse, et on repart avec la bonne pièce du premier coup. Je reviendrai.",
    source: 'google',
    verified: true,
  },
  {
    author: 'Lucas Nani',
    rating: 5,
    text: "Très satisfait de mon achat ! Le radiateur est arrivé rapidement, parfaitement emballé, et correspondait exactement à ce qu'il me fallait. Bon rapport qualité/prix.",
    source: 'google',
    verified: true,
    part: 'radiateur',
  },
  {
    author: 'Bilal B',
    rating: 5,
    text: "Bonjour, pour un magasin récent, je dois dire que c'est très prometteur. Le service est extrêmement professionnel, avec des conseils précieux et des pièces de qualité. À suivre de près.",
    source: 'google',
    verified: true,
  },
];

/**
 * Helper : retourne true si au moins un avis vérifié est disponible.
 * Utilisé par `index.astro` pour conditionner l'affichage de la carousel.
 */
export function hasTestimonials() {
  return TESTIMONIALS.some((t) => t.verified);
}

/**
 * Helper : retourne les N meilleurs avis vérifiés (par date décroissante).
 */
export function getTopTestimonials(n = 3) {
  return TESTIMONIALS
    .filter((t) => t.verified)
    .sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0))
    .slice(0, n);
}
