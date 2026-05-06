/**
 * chatbot — guided conversation tree for the support bot.
 *
 * The bot is NOT an LLM. It's a deterministic finite-state machine driven
 * by `INTENTS[]` : each node has an id, a user-facing label (the quick-reply
 * chip), a bot answer (markdown-style plain text with inline links), and
 * optional follow-ups (child intent ids).
 *
 * Why no LLM :
 *   - Zero latency, zero cost, zero hallucination risk
 *   - Predictable CX aligned with owner F8 ("conseil humain")
 *   - Fully auditable — every path a user can reach is visible in this file
 *   - RGPD-safe (no cross-border API call, no prompt injection surface)
 *
 * Escalation strategy :
 *   - Every leaf offers a way out : WhatsApp / devis / phone / magasin
 *   - "Aucune de ces options" → escalation chip shown after 2 consecutive
 *     unhelpful branches (state.missCount >= 2) — handled in `Chatbot.tsx`
 *
 * Cf. plan.md §4.8 (chatbot guidé) et ADR Chatbot (D-chatbot-v1).
 */

import { STORE, telUrl, whatsappUrl } from './store.js';

/**
 * Bot greeting — shown when the panel opens for the first time.
 * The greeting is personalised if `opening-status` (same badge used in the
 * header) returns "open" — we say "Bonjour, on est là".
 */
export const GREETING = {
  text: "Bonjour ! Je suis l'assistant Pièces Auto Colomiers. Je peux vous aiguiller sur nos pièces, services, horaires, et comment nous contacter.",
  prompt: 'Que cherchez-vous ?',
};

/**
 * Root-level intents shown at the start of the conversation.
 * IDs must be unique across the whole tree (including children).
 */
export const ROOT_INTENTS = [
  'find-part',
  'quote',
  'delivery',
  'hours',
  'where',
  'pro',
];

/**
 * Intent dictionary — each node is reachable by its id.
 * Shape :
 *   {
 *     id: string,
 *     label: string,          // chip label (user-facing)
 *     answer: string,         // bot response (Markdown-lite)
 *     links?: Array<{ href, label, kind }>,   // CTAs appended to answer
 *     children?: string[],    // follow-up chip ids
 *   }
 *
 * `kind` on a link is one of : 'primary' | 'secondary' | 'whatsapp' | 'tel'
 */
export const INTENTS = {
  // =========================================================================
  // ROOT
  // =========================================================================
  'find-part': {
    id: 'find-part',
    label: 'Trouver une pièce',
    answer:
      "On tient des pièces neuves multi-marques : freinage, moteur, suspension, éclairage, filtration, échappement, électrique, habillage… Plus de 47 catégories au catalogue.",
    links: [
      { href: '/catalogue', label: 'Parcourir le catalogue', kind: 'primary' },
      { href: '/contact#devis', label: 'Demander un devis', kind: 'secondary' },
    ],
    children: ['find-part-brake', 'find-part-engine', 'find-part-other', 'quote'],
  },
  'find-part-brake': {
    id: 'find-part-brake',
    label: 'Freinage',
    answer:
      "Plaquettes, disques, étriers, flexibles, capteurs ABS — multi-marques (Brembo, Bosch, TRW, Ferodo, Valeo). Les fiches catégorie listent les véhicules compatibles.",
    links: [
      { href: '/catalogue/plaquettes-de-frein', label: 'Plaquettes de frein', kind: 'primary' },
      { href: '/catalogue/disques-de-frein', label: 'Disques de frein', kind: 'secondary' },
    ],
    children: ['quote', 'where'],
  },
  'find-part-engine': {
    id: 'find-part-engine',
    label: 'Moteur / filtration',
    answer:
      "Courroies, galets, kits de distribution, filtres (air/huile/habitacle/gasoil), bougies, démarreurs, alternateurs. Équipementiers : Bosch, NGK, MANN, Valeo, Continental.",
    links: [
      { href: '/catalogue/kits-de-distribution', label: 'Kit distribution', kind: 'primary' },
      { href: '/catalogue/filtres', label: 'Filtres', kind: 'secondary' },
    ],
    children: ['quote', 'pro'],
  },
  'find-part-other': {
    id: 'find-part-other',
    label: 'Autre catégorie',
    answer:
      "Pare-chocs, optiques, rétros, batteries, amortisseurs, échappement, kits embrayage, pompes à eau… tout est au catalogue. Si vous ne trouvez pas, envoyez-nous la référence OEM ou le VIN et on cherche avec vous.",
    links: [
      { href: '/catalogue', label: 'Voir toutes les catégories', kind: 'primary' },
      { href: '/contact#devis', label: 'Devis avec référence', kind: 'secondary' },
    ],
    children: ['quote'],
  },

  // =========================================================================
  'quote': {
    id: 'quote',
    label: 'Demander un devis',
    answer:
      "Trois façons de nous contacter pour un devis — réponse sous 24 h ouvrées :",
    links: [
      { href: whatsappUrl(), label: 'WhatsApp Business', kind: 'whatsapp' },
      { href: '/contact#devis', label: 'Formulaire devis', kind: 'primary' },
      { href: telUrl(), label: STORE.contact.telDisplay, kind: 'tel' },
    ],
    children: ['find-part', 'delivery'],
  },

  // =========================================================================
  'delivery': {
    id: 'delivery',
    label: 'Livraison & retrait',
    answer:
      "Deux options : **retrait gratuit** dans notre magasin à Colomiers, ou **expédition Mondial Relay** dans toute la France (point relais). Les délais dépendent de la dispo pièce — en général 24 à 72 h ouvrées.",
    links: [
      { href: '/services#livraison', label: 'Détails livraison', kind: 'primary' },
      { href: '/notre-magasin', label: 'Où nous trouver', kind: 'secondary' },
    ],
    children: ['where', 'hours', 'quote'],
  },

  // =========================================================================
  'hours': {
    id: 'hours',
    label: 'Horaires',
    answer:
      "Ouvert du **lundi au vendredi 8h30-12h / 14h-18h**, samedi 9h-13h. Fermé dimanche et jours fériés. WhatsApp répond aussi en dehors des heures.",
    links: [
      { href: whatsappUrl(), label: 'Écrire sur WhatsApp', kind: 'whatsapp' },
      { href: telUrl(), label: STORE.contact.telDisplay, kind: 'tel' },
    ],
    children: ['where', 'quote'],
  },

  // =========================================================================
  'where': {
    id: 'where',
    label: 'Où êtes-vous ?',
    answer: `${STORE.adresse.rue}, ${STORE.adresse.cp} ${STORE.adresse.ville}. Parking gratuit sur place. Accès facile depuis Toulouse, Plaisance-du-Touch, Tournefeuille, Blagnac, Cugnaux.`,
    links: [
      {
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.adresse.full)}`,
        label: 'Itinéraire Google Maps',
        kind: 'primary',
      },
      { href: '/notre-magasin', label: 'Notre magasin', kind: 'secondary' },
    ],
    children: ['hours', 'quote'],
  },

  // =========================================================================
  'pro': {
    id: 'pro',
    label: 'Je suis un pro',
    answer:
      "Garages, ateliers, flottes : on propose des tarifs revendeurs sur commande. Envoyez-nous vos besoins avec RCS/SIRET et on vous rappelle dans la journée.",
    links: [
      { href: '/contact?audience=pro#devis', label: 'Devis B2B', kind: 'primary' },
      { href: '/services#compte-pro', label: 'Services pro', kind: 'secondary' },
      { href: whatsappUrl('Bonjour, je suis un professionnel et je souhaite ouvrir un compte revendeur.'), label: 'WhatsApp B2B', kind: 'whatsapp' },
    ],
    children: ['find-part', 'delivery'],
  },
};

/** Short, human-readable labels used when building chip descendants. */
export const ROOT_LABELS = ROOT_INTENTS.map((id) => ({
  id,
  label: INTENTS[id]?.label ?? id,
}));
