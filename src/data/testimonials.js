/**
 * TESTIMONIALS — Avis Google réels uniquement.
 *
 * Source : Google Business Profile (copie manuelle).
 * Chaque entrée renvoie vers STORE.avis.googleBusinessUrl.
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
  },
];
