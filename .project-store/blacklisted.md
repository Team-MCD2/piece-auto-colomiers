# Blacklisted for Pièces Auto Colomiers

> Patterns, libraries, idioms, or outputs that we do NOT want here —
> typically because the owner / client has rejected them, or they
> conflict with project constraints (DA, budget, RGPD, perf).
>
> The cross-project bans in `db_store\blacklisted.md` apply on top of
> this file. Entries here are project-SPECIFIC extensions.

---

## Banned design / brand patterns

- **Yellow as a CTA primary / brand-dominant colour.** Logo carries
  yellow only as a thin decorative arc under the crossed wrench +
  piston (~2% pixel count). Elevating it to CTA primary inverts the
  brand's own visual hierarchy. See `decisions.md` ADR-001. Allowed
  micro-use: focus rings of the signal/warn variety only; never
  fills, never primary CTA. Supersedes D4.
- **Palette that reads "yellow-heavy".** Any section where the
  dominant or secondary colour is yellow is a bug. Marine +
  sky-blue + white is the brand trio; yellow enters only as a
  sparse, quickly-justifiable accent.
- **WhatsApp icon tinted into the site palette.** Every WhatsApp
  CTA uses the official brand green `#25D366` on white (or the
  inverse) with the official glyph. No marine / sky / yellow
  tint on WhatsApp surfaces. See `decisions.md` ADR-006.
- **"Jeune, moderne, épurée" violations.** Heavy patterns
  (hex-pattern over-use, marquee USP bars, dense decorative
  stripes, grunge separators) — all read "atelier vintage" and
  violate the V2 design canon. See `decisions.md` ADR-007 and
  `knowledge.md` T-pac-design-canon.

## Banned content patterns

- **Fake / placeholder testimonials.** Even labelled as
  placeholders (D32's "Témoignage de premier client" badge was
  not enough). Owner: Google reviews exist with good scores;
  the site links to the real Google surface. No invented authors,
  no synthesised text passing as a review.
- **Synthesised quotes from real Google reviews.** A
  "synthesised fair summary" of an actual Google review (what
  V1's `google-1` entry did) is still authoring words the
  customer did not write. Link to the Google Business URL; do
  not transcribe / rewrite their reviews on-site.
- **Hardcoded business facts outside `src/data/`.** Phone, email,
  address, hours, SIREN, prices, brand list — always via `STORE`
  or the matching data module. Any literal that matches a
  business fact in a page file is a bug. See `db.md` L-2026-05-03-019.

## Banned UX patterns

- **Plate-lookup UI that promises `API.gouv` but cannot deliver
  the owner's described flow.** `particulier.api.gouv.fr`'s
  `ants/extrait_immatriculation_vehicule` requires FranceConnect
  + the vehicle owner's own authentication. Unsuitable for a
  "type the plate, see the vehicle" public form. If we ship
  plate lookup, we use a paid commercial SIV API server-side
  (see `decisions.md` ADR-005) and name the data source in
  `mentions-legales`. Never claim "API.gouv" when the backing
  API is commercial.
- **Chatbot that pretends to be a human or that returns
  hallucinated part references.** Any chatbot (rules-based or
  LLM-backed) MUST badge itself as automated and MUST hand off
  to the human contact path (phone / WhatsApp / devis form)
  whenever confidence is low. No fabricated OEM references
  from a model. See `decisions.md` ADR-004.
- **Embedded third-party chat widgets that drop cookies without
  consent.** Any chat solution that sets cookies or contacts
  a third-party server before the user opens the widget is
  banned. Lazy-load the widget script on first open; if
  cookies are set, consent banner gates the load.

## Banned libraries

- _(none project-specific beyond `db_store\db.md` W03 BANNED BY
  DEFAULT and `db_store\blacklisted.md` cross-project list.
  Added if a library is evaluated and rejected during V2 work.)_

## AI-tells to remove on sight

- _(project-specific AI-tells absorbed from `db_store\blacklisted.md`
  — no project-specific additions yet. If a pattern surfaces in
  our own V1 output that reads AI-generated, record it here.)_
