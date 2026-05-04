# Project Log — Pièces Auto Colomiers

> Append-only. One entry per working session. Full project-scoped detail
> lives here; the cross-project `db_store\db.md` M09 only carries a
> 1-line pointer to this file.

---

## D-2026-05-04  Store creation + V1 feedback capture + V2 scope opened

- **context**  : V1 was shipped (J1→J5) on the prior session. Owner
                 (Jayce) sent structured V1 feedback covering
                 failures/successes/must-haves for V2. Session goal:
                 bootstrap `.project-store\` per M08, port the
                 archived dossier, reconcile against live repo, and
                 translate chat feedback into ADRs + roadmap items.
                 `.project-store\` did not exist yet — per M01 PROTOCOL,
                 creating it was the mandatory first action.
- **actions** :
  * Read `db_store\db.md`, `blacklisted.md`, `discarded.md` end-to-end.
  * Read `db_store\archived\db-pre-rewrite-2026-05-03.md` (archived
    dossier for P-pieces-auto-colomiers, pre-rewrite snapshot).
  * Scanned live repo: `package.json`, `astro.config.mjs`,
    `tailwind.config.mjs`, `README.md`, `UserGudie.md`,
    `src\data\store.js`, `src\data\brands.js`, `src\data\testimonials.js`,
    `src\components\Logo.astro`, `src\pages\contact.astro`,
    `plan\synthesis.md`, `plan\cascade-plan.md`, `plan\progress.txt`.
  * Viewed `images\logo.jpg` directly — confirmed yellow IS in the
    logo but only as a thin decorative arc under the crossed
    wrench + piston, not as a dominant colour. Owner's "no yellow"
    is a fair perceptual read; D4's elevation of that arc to CTA
    primary is the actual design miss.
  * Research pass: Oscaro vehicle-selector UX (plate + VIN/carte-grise
    + brand/family/model + "Mon garage"); French plate APIs
    (api.gouv ants requires FranceConnect + vehicle owner, not
    usable for our form; commercial options like
    apiplaqueimmatriculation.com from €59/mo); chatbot architectures
    (Typebot self-host vs vanilla-JS rules widget).
  * Created `.project-store\` with 9 files per M08 schema.
  * Captured V1 feedback verbatim into `owner-feedback.md` (per
    owner's explicit "focus on this chat" delegation, which lifts
    the default rule from `db_store\discarded.md`).
  * Wrote ADR-001..ADR-008 in `decisions.md`, SUPERSEDING V1
    decisions D4, D23, D32, and lifting the V1 verrouillages on
    plate lookup (D2) and chatbot ("pas V1").
  * Wrote 5-phase roadmap covering palette reset → form overhaul
    → chatbot → plate integration → Oscaro-grade polish.
- **learnings** :
  * DA sampling from a logo must respect visual HIERARCHY of the
    source, not just "what hex values exist". A 2% pixel count of
    yellow is not brand-dominant; elevating it to CTA primary
    inverts the owner's visual intent. Promotion candidate for
    `db.md` W04.3 ARTISTIC as a new T- tip.
  * French plate-to-vehicle lookup has no FREE path for a public
    form. API.gouv is owner-auth-gated. Commercial SIV aggregators
    (~€59/mo) are the only realistic shelf. Candidate `db.md`
    W04.2 BUSINESS-DATA addition.
  * An "archived dossier + live repo + fresh owner feedback"
    reconciliation is strictly faster than re-deriving. Confirms
    `db_store\discarded.md` option-C doctrine.
- **next session** :
  * Get owner green-light on ADR-001 (palette reset) and ADR-005
    (plate API budget).
  * Phase 1 execute: palette reset in `tailwind.config.mjs` +
    `globals.css` + `Logo.astro` text colour + all `signal-*` uses
    across the codebase.
  * Then Phase 2: devis form overhaul (marque dropdown + annee
    dropdown + multi-select pieces + WA brand green).
