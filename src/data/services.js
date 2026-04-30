/**
 * SERVICES — proposés par le magasin.
 * Cf. plan.md §7 (page services) et §4.5 (Services strip home).
 *
 * Les services marqués `usp: true` reçoivent un traitement visuel mis en avant
 * (le Mondial Relay est notre USP majeur — D17).
 */

export const SERVICES = [
  {
    slug: 'devis-personnalise',
    label: 'Devis sous 24 h',
    short: 'Réponse rapide à toute demande de pièce.',
    desc: 'Décrivez votre véhicule (marque, modèle, année, code moteur ou référence OEM) et la pièce recherchée. Nous vous répondons sous 24 heures ouvrées avec un devis détaillé : disponibilité, délai, prix net.',
    icon: 'FileText',
    badge: 'Réactif',
    cta: { label: 'Demander un devis', href: '/contact#devis' },
    usp: false,
  },
  {
    slug: 'mondial-relay',
    label: 'Expédition Mondial Relay',
    short: 'Recevez votre pièce dans le point relais le plus proche.',
    desc: 'Pas le temps de passer en magasin ? Expédiez votre commande dans n\'importe quel point relais Mondial Relay en France métropolitaine. Tarif compétitif, suivi colis, retrait sous 5 jours ouvrés.',
    icon: 'Truck',
    badge: 'Toulouse Ouest et au-delà',
    cta: { label: 'Demander une expédition', href: '/contact#devis' },
    usp: true, // USP majeur (D17)
  },
  {
    slug: 'retrait-magasin',
    label: 'Retrait magasin',
    short: 'Préparez, payez, récupérez sur place.',
    desc: 'Vous habitez à Colomiers, Toulouse, Tournefeuille ou Plaisance-du-Touch ? Réservez votre pièce et récupérez-la directement au 16 allée de l\'Adour. Aucun frais de port. Conseil pro à la remise.',
    icon: 'Package',
    badge: 'Gratuit',
    cta: { label: 'Réserver le retrait', href: '/contact#devis' },
    usp: true,
  },
  {
    slug: 'conseil-pro',
    label: 'Conseil pro',
    short: 'Une équipe humaine, joignable au téléphone.',
    desc: 'Un doute sur la référence ? Un véhicule atypique (4×4, japonaise, utilitaire) ? Appelez-nous. Notre équipe a la mécanique dans le sang et vous oriente vers la pièce qui convient — sans bullshit.',
    icon: 'PhoneCall',
    badge: '05 64 72 37 26',
    cta: { label: 'Nous appeler', href: 'tel:+33564723726' },
    usp: false,
  },
  {
    slug: 'commande-oem',
    label: 'Commande sur référence OEM',
    short: 'Référence constructeur ? On la trouve.',
    desc: 'Vous avez le numéro OEM (constructeur) ou le VIN du véhicule ? Nous interrogeons les catalogues équipementiers (Bosch, Valeo, NGK, Brembo, MANN-FILTER, etc.) pour vous proposer la pièce d\'origine ou son équivalent qualité.',
    icon: 'Search',
    badge: 'Précision',
    cta: { label: 'Communiquer une référence', href: '/contact#devis' },
    usp: false,
  },
  {
    slug: 'pour-pros',
    label: 'Pour les professionnels',
    short: 'Garages, ateliers, flottes : tarif revendeur sur devis.',
    desc: 'Vous gérez un garage indépendant, un atelier, une flotte d\'utilitaires ? Nous proposons des tarifs revendeur, des délais de paiement, et un interlocuteur dédié. Contactez-nous pour ouvrir un compte pro.',
    icon: 'Briefcase',
    badge: 'B2B',
    cta: { label: 'Devis professionnel', href: '/contact?audience=pro#devis' },
    usp: false,
    audience: 'pro',
  },
];
