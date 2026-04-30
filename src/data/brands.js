/**
 * BRANDS — équipementiers fournis par le magasin (logos affichés V1, D28).
 *
 * Logos : récupérés depuis Wikipedia (officiel SVG/PNG, fair-use marque article L713-6 CPI).
 * Fichiers placés dans /public/assets/brands/<id>.svg (à fournir par le script
 * `npm run fetch:images` ou ajout manuel J3).
 *
 * Disclaimer fair-use à afficher dans /mentions-legales.
 */

export const BRANDS = [
  {
    id: 'bosch',
    name: 'Bosch',
    logo: '/assets/brands/bosch.svg',
    tagline: 'Allumage, freinage, électronique embarquée',
    families: ['demarrage', 'freinage', 'electrique', 'moteur'],
  },
  {
    id: 'valeo',
    name: 'Valeo',
    logo: '/assets/brands/valeo.svg',
    tagline: 'Embrayage, éclairage, alternateurs',
    families: ['embrayage', 'eclairage', 'demarrage'],
  },
  {
    id: 'ngk',
    name: 'NGK',
    logo: '/assets/brands/ngk.svg',
    tagline: 'Bougies allumage et préchauffage',
    families: ['moteur'],
  },
  {
    id: 'brembo',
    name: 'Brembo',
    logo: '/assets/brands/brembo.svg',
    tagline: 'Système de freinage haute performance',
    families: ['freinage'],
  },
  {
    id: 'mann-filter',
    name: 'MANN-FILTER',
    logo: '/assets/brands/mann-filter.svg',
    tagline: 'Filtres à air, huile, carburant, habitacle',
    families: ['moteur'],
  },
  {
    id: 'continental',
    name: 'Continental',
    logo: '/assets/brands/continental.svg',
    tagline: 'Distribution, électronique, capteurs',
    families: ['distribution', 'electrique'],
  },
  {
    id: 'febi-bilstein',
    name: 'Febi Bilstein',
    logo: '/assets/brands/febi-bilstein.svg',
    tagline: 'Pièces de châssis et suspension',
    families: ['suspension', 'direction'],
  },
  {
    id: 'ate',
    name: 'ATE',
    logo: '/assets/brands/ate.svg',
    tagline: 'Disques, plaquettes et systèmes hydrauliques',
    families: ['freinage'],
  },
  {
    id: 'sachs',
    name: 'Sachs',
    logo: '/assets/brands/sachs.svg',
    tagline: 'Embrayage et amortisseurs',
    families: ['embrayage', 'suspension'],
  },
  {
    id: 'skf',
    name: 'SKF',
    logo: '/assets/brands/skf.svg',
    tagline: 'Roulements et kits transmission',
    families: ['suspension', 'distribution'],
  },
  {
    id: 'hella',
    name: 'Hella',
    logo: '/assets/brands/hella.svg',
    tagline: 'Éclairage automobile et électronique',
    families: ['eclairage', 'electrique'],
  },
  {
    id: 'trw',
    name: 'TRW',
    logo: '/assets/brands/trw.svg',
    tagline: 'Direction, freinage et suspension',
    families: ['direction', 'freinage', 'suspension'],
  },
  {
    id: 'castrol',
    name: 'Castrol',
    logo: '/assets/brands/castrol.svg',
    tagline: 'Lubrifiants moteur',
    families: ['moteur'],
  },
  {
    id: 'totalenergies',
    name: 'TotalEnergies',
    logo: '/assets/brands/totalenergies.svg',
    tagline: 'Lubrifiants moteur et industriels',
    families: ['moteur'],
  },
  {
    id: 'mobil-1',
    name: 'Mobil 1',
    logo: '/assets/brands/mobil-1.svg',
    tagline: 'Lubrifiants synthétiques haute performance',
    families: ['moteur'],
  },
];
