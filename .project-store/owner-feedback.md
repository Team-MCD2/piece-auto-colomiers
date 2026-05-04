# Owner feedback register — Pièces Auto Colomiers

> Raw feedback from the owner (Jayce). Each entry MUST translate
> into at least one concrete rule, code change, lesson, or
> blacklisted/discarded entry before the session closes.
>
> Default per `db_store\discarded.md`: owner writes entries here
> themselves. This project has an explicit owner delegation for
> the 2026-05-04 entry ("focus on this chat as it contains
> failures, success, tip, how to, must have and should haves"),
> which authorises Cascade to transcribe directly from the chat.
> Every subsequent entry reverts to owner-written by default.

---

## 2026-05-04  V1 feedback → V2 scope

- **verbatim (transcribed from chat by Cascade, per owner delegation)** :

  > 1. yes - however, you should focus on this chat as it contains,
  >    falures, success, tip, how to, must have and should haves
  >    for v2, here's the feedback form v1 first:
  >
  > les avis googe existent deja sur google, donc no need for fake
  > ones - button aussi qui renvoie vers les avis google (they have
  > a multitude and have good scores) -
  >
  > sur le devis, le champs marque vehicule doit etre une liste
  > deroulant, si la marque n'est pas dans la liste, 'ultilisateur
  > choisi 'autre' et un champs s'affiche (gracefully) pour qu'il
  > entre sa marque de vehicule
  >
  > le champs, le Annee, doit etre une liste deroulante aussi
  >
  > ajouter un chatbot. - little icon, which helps answer basic
  > questions, redirects, to contact (and much more  - all i say are
  > just ideas that you must feed on to make more suggestions that go
  > in the same light -)
  >
  > All whatsapp instances should be in green (in their original icon
  > color)
  >
  > pour les plaques d'imatriculation, API.gouv. l'utilsateurs entre,
  > c'est verifie (checked to make sure an instance exists) - as he
  > types (only towards the end or when he's done), the suggestion
  > pops up and he can choose it. - ponder deeply and how many
  > different ways we can use the plaque d'immatriculation here
  >
  > liste de pieces voulu dans le formulaire (liste deroulante - peu
  > en choisir plusieurs -)
  >
  > the current website's color doesn't fit their logo at ALL!
  > There're no instance of yellow in their logo, poor work from you
  > on this aspect.
  >
  > le design doit etre jeune moderne épurée - il faut correctement
  > canaliser cette phrase sinon tu risque de ne pas faire du bon
  > travail -
  >
  > l'exemple numero 1, c'est https://www.oscaro.com/ . dig this
  > website and get all its qualities all what makes it great,
  > better, more easy to understand and use - and just all its
  > functionalities and the display, so we can integrate the good
  > stuff -
  >
  > the base is good, the content is nice, but there's still much
  > work to be done

- **translated to (one rule per feedback item, cross-referenced)** :

  | # | Feedback item                              | Target                              |
  |---|--------------------------------------------|-------------------------------------|
  | F1 | Google reviews exist, drop fakes, add link | ADR-002 (avis source), blacklisted.md (no fake testimonials), roadmap Phase 2 |
  | F2 | Marque = dropdown + "Autre" reveal         | ADR-003 (form overhaul), knowledge.md T-pac-marque-dropdown, roadmap Phase 2 |
  | F3 | Annee = dropdown                           | ADR-003, knowledge.md T-pac-annee-dropdown, roadmap Phase 2 |
  | F4 | Chatbot + Cascade proactive proposals      | ADR-004 (chatbot architecture), roadmap Phase 3, knowledge.md T-pac-chatbot-tree |
  | F5 | WhatsApp icons in brand green              | ADR-006 (WA brand colour), blacklisted.md (WA tinted non-brand), roadmap Phase 1 |
  | F6 | Plate lookup + brainstorm uses             | ADR-005 (plate strategy), roadmap Phase 4, knowledge.md T-pac-plate-uses (brainstorm) |
  | F7 | Pieces = multi-select                      | ADR-003, knowledge.md T-pac-pieces-multiselect, roadmap Phase 2 |
  | F8 | Yellow NOT in logo — palette mismatch      | ADR-001 (palette reset, SUPERSEDES V1 D4), blacklisted.md (yellow as CTA), roadmap Phase 1 |
  | F9 | Design = "jeune, moderne, épurée"          | ADR-007 (design principles V2), knowledge.md T-pac-design-canon |
  | F10 | Oscaro = reference #1, integrate good stuff | ADR-008 (Oscaro-grade UX), knowledge.md T-pac-oscaro-patterns, roadmap Phase 5 |
  | F11 | "Base good, content nice, much work left" | Acknowledged; roadmap reflects continued iteration |

- **status** : addressed at planning level; execution scheduled
  across roadmap Phases 1-5. No code change applied yet; pending
  owner green-light on ADR-001 (palette) and ADR-005 (plate
  budget).

- **explicit contradictions with V1 decisions (flagged per M01 #4)** :
  * F8 contradicts D4 (DA sampled #F5C518 from logo) →
    resolved by ADR-001 SUPERSEDES D4, keeps yellow as micro-
    accent only, dominates marine + sky + white.
  * F1 contradicts D23 + D32 (1 real + 3 placeholders) →
    resolved by ADR-002 SUPERSEDES D23/D32, drops placeholders
    and routes to Google Reviews surface.
  * F4 contradicts prior rejection "chatbot pas V1 — pas de valeur
    pour un vitrine local" → V2 lifts the V1 rejection. Documented
    in ADR-004 and in `discarded.md` as "not discarded anymore".
  * F6 contradicts D2 (pas de plaque V1 — verrouillage client) →
    V2 explicitly unlocks. Documented in ADR-005.

---

_(future owner-written entries go below this line)_
