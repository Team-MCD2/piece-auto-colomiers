/**
 * TESTIMONIALS — vide par décision (ADR-002, F3).
 *
 * Le pivot owner-feedback F3 (« pas d'avis inventés ») a été appliqué
 * sur le rendu de la home (D-2026-05-13b) : la section témoignages est
 * désormais remplacée par le composant <AvisWidget /> qui pointe
 * directement sur la fiche Google Business — pas de copie locale du
 * texte, pas de citation hors-ligne synthétisée par nous.
 *
 * Le fichier est conservé (vide) plutôt que supprimé pour deux raisons :
 *   1) Si l'on souhaite à terme afficher de vrais avis Google via
 *      Place Details (Phase 5 DoD), un seul flip d'array suffira.
 *   2) Le bloc `{showTestimonials && …}` dans `index.astro` continue
 *      de fonctionner sans crash — il no-op naturellement.
 *
 * Cf. ADR-002, owner-feedback.md F3, log.md D-2026-05-13b.
 */

export const TESTIMONIALS = [];
