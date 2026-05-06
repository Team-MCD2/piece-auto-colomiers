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
  /**
   * Col 2 — "Le site" : pages navigationnelles principales uniquement.
   * Les mentions légales ont migré dans la col "Entreprise" (Oscaro 5-col).
   */
  pages: [
    { href: '/', label: 'Accueil' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/services', label: 'Services' },
    { href: '/notre-magasin', label: 'Notre magasin' },
    { href: '/contact', label: 'Contact' },
  ],
  /**
   * Col 3 — "Entreprise" : about, légal, RGPD, avis.
   * Pattern Oscaro-style — séparation claire pages produit / pages corporate.
   */
  entreprise: [
    { href: '/notre-magasin', label: 'À propos' },
    { href: '/services', label: 'Nos services' },
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/mentions-legales#rgpd', label: 'RGPD' },
    { href: '/mentions-legales#cookies', label: 'Cookies' },
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
