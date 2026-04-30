/**
 * Structure de navigation — header + footer.
 * Cf. plan.md §3.2 (header) et §3.3 (footer).
 */

export const MAIN_NAV = [
  { href: '/catalogue', label: 'Catalogue', desc: 'Toutes nos catégories de pièces' },
  { href: '/services', label: 'Services', desc: 'Devis, conseil, livraison' },
  { href: '/notre-magasin', label: 'Notre magasin', desc: 'Atelier à Colomiers' },
  { href: '/contact', label: 'Contact', desc: 'Devis, téléphone, plan d\'accès' },
];

export const FOOTER_NAV = {
  pages: [
    { href: '/', label: 'Accueil' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/services', label: 'Services' },
    { href: '/notre-magasin', label: 'Notre magasin' },
    { href: '/contact', label: 'Contact' },
    { href: '/mentions-legales', label: 'Mentions légales' },
  ],
};

/**
 * Top catégories à mettre en footer col 3 (8 max — éditorialement choisies).
 * Les slugs doivent matcher `src/data/categories.js`.
 */
export const FOOTER_TOP_CATEGORIES = [
  'plaquettes-de-frein',
  'disques-de-frein',
  'batterie',
  'alternateur',
  'embrayage',
  'amortisseurs',
  'phares',
  'pieces-4x4',
];
