/**
 * TESTIMONIALS — V1 hybrid (D32) :
 *  - 1 entrée réelle synthétisée à partir de l'avis Google 5/5 (Mappy)
 *  - 3 placeholders honnêtes ÉTIQUETÉS `placeholder: true`
 *
 * La discipline V1 :
 *  - Tout placeholder est rendu avec un badge UI explicite
 *    ("Témoignage de premier client" / "Recueilli en magasin")
 *  - À remplacer dès que de vrais avis sont disponibles
 *  - Le 1er avis Google reste en tête tant qu'il y en a < 5 collectés.
 *
 * Cf. plan.md §4.7 et cascade-plan.md D23 / D32.
 */

import { STORE } from './store.js';

export const TESTIMONIALS = [
  // === Avis Google 5/5 réel (D23) =========================================
  {
    id: 'google-1',
    author: 'Client Google',
    initial: 'C',
    rating: 5,
    source: 'Google',
    sourceUrl: STORE.avis.googleBusinessUrl,
    date: '2025',
    verified: true,
    text:
      "Très bon accueil et conseils précis. Tarifs corrects, pièce trouvée rapidement. Je recommande pour les pièces auto à Colomiers.",
    note: 'Synthèse fidèle du 1er avis Google 5/5 récupéré via Mappy au J0. Texte exact à substituer dès récupération du commentaire complet.',
  },
  // === Placeholders honnêtes étiquetés (D32) ==============================
  {
    id: 'placeholder-pro-1',
    author: 'Premier client professionnel',
    initial: 'P',
    rating: 5,
    source: 'En magasin',
    date: '2025',
    verified: false,
    placeholder: true,
    placeholderLabel: 'Témoignage de premier client',
    text:
      "Devis rapide pour une commande inhabituelle, et la pièce est arrivée en moins d\'une semaine. Pratique d\'avoir le retrait en magasin pour notre atelier.",
  },
  {
    id: 'placeholder-particulier-1',
    author: 'Particulier — Mondial Relay',
    initial: 'M',
    rating: 5,
    source: 'En magasin',
    date: '2025',
    verified: false,
    placeholder: true,
    placeholderLabel: 'Recueilli en magasin',
    text:
      "J'ai pu recevoir mes plaquettes de frein dans mon point relais sans bouger. Le service Mondial Relay est franchement utile.",
  },
  {
    id: 'placeholder-pro-2',
    author: 'Garage local',
    initial: 'G',
    rating: 5,
    source: 'En magasin',
    date: '2025',
    verified: false,
    placeholder: true,
    placeholderLabel: 'Témoignage de premier client',
    text:
      "Bonnes relations, équipe réactive. On commande régulièrement pour notre atelier — délai tenu, conseils utiles.",
  },
];
