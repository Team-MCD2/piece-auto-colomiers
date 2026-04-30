/**
 * STORE — source de vérité statique pour SARL Pièces Auto Colomiers.
 *
 * Cf. plan.md §12 et cascade-plan.md §1 pour la traçabilité des décisions.
 * Toute modification de ce fichier doit être reflétée dans les schemas JSON-LD
 * (Layout.astro) et dans les composants Header/Footer/Contact.
 *
 * Ne pas committer de secrets ici. Les credentials EmailJS vivent dans .env.
 */

export const STORE = Object.freeze({
  // === Identité légale (D14, D39 — source : Pappers SIREN 944254036) ============
  raisonSociale: 'SARL Pièces Auto Colomiers',
  nomCommercial: 'Pièces Auto Colomiers',
  siren: '944254036',
  sirenDisplay: '944 254 036',
  rcs: 'Toulouse',
  formeJuridique: 'SARL',
  capital: '4 000 €',
  capitalDisplay: '4 000 €',
  dateCreation: '2025-05-08', // BODACC A n°20250114, annonce n°1076
  // Gérants connus mais non exposés en V1 sans accord client (D40, RGPD)
  // Pour V1, narratif anonymisé : "deux co-gérants entrepreneurs locaux"
  gerantsPrivate: ['Kais Amri', 'Salah Amri'],

  // === Adresse =============================================================
  adresse: {
    rue: "16 allée de l'Adour",
    cp: '31770',
    ville: 'Colomiers',
    region: 'Haute-Garonne',
    pays: 'France',
    full: "16 allée de l'Adour, 31770 Colomiers",
  },
  // Coordonnées géographiques approximatives — à raffiner par Nominatim au build
  coords: { lat: 43.6072, lng: 1.336 },

  // === Contact (D15, D16, D29) =============================================
  contact: {
    tel: '+33564723726', // E.164 pour tel: et JSON-LD telephone
    telDisplay: '05 64 72 37 26', // pour affichage humain
    email: 'contact@piecesauto-colomiers.fr', // PLACEHOLDER — à remplacer
    emailIsPlaceholder: true, // Drive UI : badge "à venir" sur les liens email
    whatsappE164: '33564723726', // sans + pour wa.me
  },

  // === Horaires (source : Mappy) ===========================================
  horaires: [
    { jour: 'lundi',    open: '08:30', mid: ['12:00', '14:00'], close: '18:00' },
    { jour: 'mardi',    open: '08:30', mid: ['12:00', '14:00'], close: '18:00' },
    { jour: 'mercredi', open: '08:30', mid: ['12:00', '14:00'], close: '18:00' },
    { jour: 'jeudi',    open: '08:30', mid: ['12:00', '14:00'], close: '18:00' },
    { jour: 'vendredi', open: '08:30', mid: ['12:00', '14:30'], close: '18:00' },
    { jour: 'samedi',   open: '09:00', close: '13:00' },
    { jour: 'dimanche', closed: true },
  ],

  // === Paiements acceptés (source : Mappy) ================================
  paiement: ['Espèces', 'CB', 'Visa', 'Mastercard', 'Apple Pay', 'Google Pay'],

  // === Zone de chalandise (SEO local) =====================================
  zoneChalandise: [
    'Colomiers',
    'Toulouse',
    'Tournefeuille',
    'Plaisance-du-Touch',
    'Pibrac',
    'Cugnaux',
    'Blagnac',
    "L'Union",
    'Balma',
  ],

  // === Spécialités catalogue ==============================================
  specialites: ['Multi-marques européennes', '4×4 / SUV', 'Utilitaires', 'Japonaises'],

  // === Services activés (D17 — Mondial Relay USP majeur) ==================
  servicesAvail: {
    mondialRelay: true,    // CONFIRMÉ via Mappy — USP majeur (D17)
    relaisColis: true,     // CONFIRMÉ via Mappy
    retraitMagasin: true,  // CONFIRMÉ via Mappy
    livraisonLocale: false, // À confirmer client (V1.5)
    commandeOEM: true,     // hypothèse forte — à confirmer client
    conseilTel: true,      // hypothèse forte
    devisRapide: true,     // CONFIRMÉ — sous 24h ouvrées
  },

  // === Avis (D32 — réel + placeholders étiquetés) =========================
  avis: {
    google: { count: 1, average: 5 },
    googleBusinessUrl: 'https://share.google/BGVy4jSC0uqq323oG',
  },

  // === Réseaux sociaux (D29, D30, D31, D36, D37) ==========================
  social: {
    tiktok: 'https://www.tiktok.com/@pieces.auto.colomiers',  // CONFIRMÉ (D30)
    tiktokHandle: '@pieces.auto.colomiers',
    instagram: null, // J0.5 round 3 : confirmé absent (D36)
    facebook: null,  // J0.5 round 3 : confirmé absent (D37)
    whatsapp: 'https://wa.me/33564723726', // CTA WA Business (D29)
    // Message pré-rempli pour le CTA WhatsApp (URL-encoded au runtime)
    whatsappPrefill: 'Bonjour, je souhaite un devis pour une pièce auto.',
  },

  // === Mentions légales (footer + page dédiée) ============================
  hebergeur: {
    nom: 'Vercel Inc.',
    adresse: '440 N Barranca Ave #4133, Covina, CA 91723, USA',
    site: 'https://vercel.com/',
  },
});

/**
 * Helper : retourne le `wa.me` URL avec message pré-rempli.
 */
export function whatsappUrl(message = STORE.social.whatsappPrefill) {
  const base = STORE.social.whatsapp;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper : retourne le `tel:` URL.
 */
export function telUrl() {
  return `tel:${STORE.contact.tel}`;
}

/**
 * Helper : "Ouvert maintenant" — retourne true si l'horaire courant
 * est dans une plage d'ouverture. Calculé côté client (timezone Europe/Paris).
 */
export function isOpenNow(now = new Date()) {
  const dayMap = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const day = dayMap[now.getDay()];
  const today = STORE.horaires.find((h) => h.jour === day);
  if (!today || today.closed) return false;
  const cur = now.getHours() * 60 + now.getMinutes();
  const toMin = (s) => {
    const [h, m] = s.split(':').map(Number);
    return h * 60 + m;
  };
  if (today.mid) {
    const [pauseStart, pauseEnd] = today.mid;
    return (
      cur >= toMin(today.open) && cur < toMin(pauseStart) ||
      cur >= toMin(pauseEnd) && cur < toMin(today.close)
    );
  }
  return cur >= toMin(today.open) && cur < toMin(today.close);
}
