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

---

## D-2026-05-06  Sticky-fix + Oscaro deep-research + DA refresh charter

- **context**  : Phases 1-4 mostly shipped between D-2026-05-04 and
                 D-2026-05-05 (palette reset, devis overhaul, chatbot,
                 VehiclePanel). Owner re-iterated F10 (`oscaro.com =
                 exemple n°1, dig the qualities`) + F9 (jeune /
                 moderne / épurée) and asked for a comprehensive
                 last-credits handoff so the next session can execute
                 the Oscaro-grade home overhaul without re-deriving
                 context. Two infra items also surfaced: the sticky
                 main bar was broken (header sticky child not
                 promoting to sticky on the document flow) and the
                 catalogue filter bar mispositioned.
- **actions** :
  * Sticky-fix shipped : `<header class="contents">` so the row-2
    inner `sticky top-0` works inside body flow; catalogue filter
    bar `top-[68px]` (matches sticky height) + `bg-marine-700/80
    backdrop-blur` + `z-30`.  Build green, 54 pages.
  * Oscaro scrape : direct fetch CF-blocked (challenge page returns
    5.4 KB). Pulled real `200 OK` snapshot via Wayback CDX API
    (`web.archive.org/web/20240212200310/https://www.oscaro.com/`,
    280 KB raw). Stripped scripts/styles/comments → 73 KB
    audit-ready text saved at
    `.project-store\references\oscaro-snapshot-2024-02-12.html`.
  * Confirmed Oscaro structural facts (audit-grade): ONE H1
    (`Toutes les pièces auto`), 22 H2s (19 catalog families +
    `Constructeurs les plus recherchés` + `Nos équipementiers` +
    `Inscrivez-vous à notre newsletter`), hero IS the vehicle
    selector (`<form class="plate">` + 2-tab toggle), trust band
    repeated under hero AND near footer, constructeur grid (24
    wordmarks), équipementier grid (15 logos).
  * Wrote `.project-store\da-oscaro-playbook.md` — canonical
    Oscaro analysis + section-by-section refactor map. Includes:
    methodology (§1), linear hero→footer dissection (§2), the 7
    patterns to lift (§3), the 5 patterns NOT to port (§4),
    file-by-file refactor map (§5 — `index.astro`,
    `catalogue/index.astro`, `[slug].astro`, `Header.astro`,
    `Footer.astro`, `tailwind.config.mjs`, `globals.css`), the
    visual rhythm cheat-sheet (§6), the first-paint UX rule (§7),
    the Oscaro-vocab glossary (§8).
  * Wrote `.project-store\handoff-2026-05-06.md` — concise
    next-LLM checkpoint. Audits ADR 001-011 status, infra fixes
    landed this session, the 5 next actions in order (audit
    `bg-hex-pattern` → gut testimonials → rebuild
    `index.astro` → tighten Header → wire `?marque=` query
    param), the things to NOT do, the verification ritual.
  * Appended ADR-011 to `.project-store\decisions.md` —
    Oscaro-grade home overhaul charter. Anchors the playbook;
    closes ADR-007 (`bg-hex-pattern` debt) and ADR-002
    (testimonials placeholders) in its commit set.
  * Expanded `.project-store\roadmap.md` Phase 5 — sub-phases
    5.1 (home rebuild) → 5.6 (Avis Google live rating), each with
    concrete DoD checklists tied to specific repo files.
  * Updated this `log.md` entry.
- **learnings** :
  * Cloudflare bot protection on auto-parts pure-players is
    universal (Oscaro, Mister-Auto, Carter-Cash, Auto-Doc all
    blocked the Cascade fetcher). Wayback CDX API is the
    audit-ready fallback. Workflow:
    `curl https://web.archive.org/cdx/search/cdx?url=<host>&filter=statuscode:200&output=json`
    → pick a recent timestamp → fetch
    `https://web.archive.org/web/<ts>/<url>` directly. **Candidate
    for promotion to `db.md` W05** as a new
    `T-fetch-cf-blocked-via-wayback` tip.
  * Oscaro's homepage is structurally a 22-H2 catalog index, NOT
    a brand vitrine. The "vehicle selector IS the hero" pattern
    is the single most important takeaway. Documented in
    `da-oscaro-playbook.md` §7 ("first paint UX rule"). **Candidate
    for promotion to `db.md` W04.13.D** automotive recipe section
    as a new `T-auto-parts-home-catalog-first` tip.
  * V1 → V2 home reality check: the home currently has 7 H2s and
    a full-screen brand hero. Oscaro reference has 22 H2s, no
    image hero. This is a 3× density gap that ADR-011 closes.
- **next session** :
  * Execute `handoff-2026-05-06.md` §4 Action 1 (audit + remove
    `bg-hex-pattern` from `index.astro:104, 314, 470, 557` and
    `catalogue/[slug].astro` hero). Single commit, ADR-007
    closure.
  * Then Action 2 (gut `testimonials.js` to `[]`, replace home
    slider with standalone `AvisWidget`). ADR-002 closure.
  * Then Action 3 (rebuild `index.astro` per playbook §5.1). The
    big one — extract `mode="inline"` for `VehiclePanel` if
    needed; create `vehicle-marques-shortcut.js`; restructure to
    11 sections / 12-15 H2s.
  * Then Action 4 (Header reshuffle, playbook §5.4) + Action 5
    (catalogue `?marque=` query-param wiring).
  * Verification at every step: 3-command stack + manual H2 count.
  * Owner preview review before merging the home rebuild to
    `main`.
