/**
 * FAQ — questions fréquentes affichées sur la home (top 5) et la page services (toutes).
 * Sert également de source pour le JSON-LD `FAQPage` (Layout.astro inject).
 *
 * Cf. plan.md §13 (JSON-LD) et §16 (FAQPage SEO).
 */

export const FAQ = [
  {
    q: 'Êtes-vous un magasin physique ?',
    a: "Oui. Retrouvez-nous au 16 allée de l'Adour à Colomiers (31770). Du lundi au vendredi 8h30-12h et 14h-18h, samedi 9h-13h. Fermé le dimanche.",
    home: true,
  },
  {
    q: "Vendez-vous des pièces neuves ou d'occasion ?",
    a: "Exclusivement des pièces neuves multi-marques (Bosch, Valeo, NGK, Brembo, MANN-FILTER, Continental, etc.). Pour de l'occasion certifiée, nous orientons vers nos confrères locaux.",
    home: true,
  },
  {
    q: 'Comment obtenir un devis ?',
    a: "Trois options : par notre formulaire en ligne (réponse sous 24 h ouvrées), par téléphone au 05 64 72 37 26, ou directement en magasin. Plus la marque, le modèle et l'année du véhicule sont précis, plus le devis est rapide.",
    home: true,
  },
  {
    q: 'Livrez-vous les pièces ?',
    a: "Oui. Vous pouvez choisir l'expédition Mondial Relay (point relais à proximité de chez vous, en France métropolitaine) ou le retrait gratuit en magasin à Colomiers.",
    home: true,
  },
  {
    q: 'Acceptez-vous les paiements en plusieurs fois ?',
    a: "Pour le moment, paiement en une fois (CB, Visa, Mastercard, Apple Pay, Google Pay, espèces). Nous étudions le 3× sans frais selon vos besoins — n'hésitez pas à nous demander.",
  },
  {
    q: 'Faites-vous des prix professionnels ?',
    a: "Oui. Nous fournissons garages, ateliers et flottes de Toulouse Ouest. Tarifs revendeur sur devis, délais de paiement possibles. Contactez-nous au 05 64 72 37 26 ou via le formulaire pros.",
    home: true,
  },
  {
    q: 'Pouvez-vous commander une référence constructeur précise ?',
    a: "Oui. Indiquez-nous la référence OEM (constructeur) ou le numéro VIN du véhicule. Nous recherchons la pièce dans les catalogues équipementiers et vous confirmons disponibilité et délai.",
  },
  {
    q: 'Pouvez-vous identifier la pièce avec une photo ?',
    a: "Oui. Joignez 1 à 4 photos via le formulaire de devis (vue d'ensemble, marquages, références gravées). Plus c'est lisible, plus c'est précis.",
  },
  {
    q: 'Travaillez-vous sur véhicules 4×4, japonaises, utilitaires ?',
    a: "C'est même une de nos spécialités. Multi-marques européennes, asiatiques (Toyota, Honda, Mazda, Subaru, Mitsubishi, Nissan, etc.), utilitaires légers Renault / Citroën / Peugeot / Iveco / Fiat.",
  },
];
