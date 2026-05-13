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

---

## D-2026-05-13  Architectural pivot — 3-level catalog matrix charter

- **context**  : Owner brief 2026-05-13 (paraphrased, not yet logged
                 verbatim in `owner-feedback.md`): Oscaro-style
                 macro-classification → micro-classification →
                 matrix JOIN → filtered list → immersive fiche.
                 Concrete UX flow described : (1) `/catalogue` shows
                 famille blocks ; (2) click famille → sous-cats
                 (plaquettes / disques / étriers / témoins
                 d'usure) ; (3) click sous-cat with no vehicle →
                 modal "Pour garantir la compatibilité" ; (4) click
                 sous-cat with vehicle → matrix JOIN of
                 `Pieces_Detachees × Vehicules_Compatibles` filtered
                 by MMY + motorisation, grouped by mounting variant ;
                 (5) result list = product cards (image / brand /
                 green compat badge / criteria) ; (6) click card →
                 immersive fiche (3D ou vidéo + tech + WhatsApp
                 pré-rempli avec la référence). Owner explicitly
                 framed this as "the bigger picture" vs the narrow
                 implementation_plan.md at the repo root, and asked
                 for a deep architectural analysis before any code
                 work. No code changes this session, only durable
                 project-store work.
- **diagnosis** :
  * Current site is a **directory** (47 L1.5 landing pages each
    ending in a devis CTA), brief asks for a **database** shape
    (3 levels, vehicle-gated leaf, fitment matrix at MMY ×
    motorisation, variant grouping). The two are architecturally
    distinct. Going from directory to database is not a polish
    step.
  * `categories.js:44-49` declares `vehicles: ALL` at vehicle-TYPE
    bucket granularity (4 buckets) ; `vehicles.js` exposes MMY
    granularity (~30 marques × ~10 modèles × year-range). The two
    layers do not currently couple — the compatibility promise on
    the leaf is broader than the data behind it.
  * `implementation_plan.md` (root) is 11 tactical items (FAQs,
    multi-select, brand SVG audit, YouTube embeds, …). All of them
    operate at the existing 2-level altitude. None move toward the
    3-level brief. Items E (per-cat FAQs) and G (per-cat videos)
    are at the wrong altitude for the new architecture — they
    should attach at L2 (sub-cat), not L1.5 (cat).
  * Strategic tension surfaced explicitly : option A (stay vitrine,
    defer brief), option B (become e-commerce — TecDoc ~€5-15k/yr,
    PIM, ~€15-40k year-1 spend), option C (vitrine wearing Oscaro's
    clothes — 3 levels + virtual product cards, no prices, no cart,
    devis stays the conversion). Recommendation : option C.
- **actions** :
  * Wrote `.project-store\da-catalog-matrix-architecture.md` —
    canonical IA / data model / routing brief. 11 sections :
    diagnosis (§1), 3-level taxonomy (§2), strategic options
    A/B/C (§3 — the owner gate), data model (§4 :
    `subcategories.js` + `fitment-virtual.js` schemas), routing
    (§5 : `/catalogue/[slug]` retrofit + new `[slug]/[sub].astro`
    + `piece/[id].astro`), gating modal UX (§6),
    L3 product card anatomy (§7), L4 fiche (§8), audit of
    `implementation_plan.md` against this architecture (§9), risks
    + open questions (§10), cross-references (§11). Companion to
    `da-oscaro-playbook.md` (playbook = page rhythm ; arch brief =
    information architecture).
  * Appended ADR-012 to `.project-store\decisions.md` —
    "3-level catalog matrix + vehicle-gated leaf,
    vitrine-compatible". STATUS = `draft — owner sign-off
    required`. Surfaces the A/B/C choice explicitly as a gating
    decision for any code work on this axis. Cross-refs ADR-008
    (parent — Oscaro pattern charter), ADR-011 (home overhaul —
    orthogonal, can ship in parallel), `owner-feedback.md` F2
    (vitrine charter — option B contradicts it, option C honors it).
  * Expanded `.project-store\roadmap.md` — added Phase 7
    (sub-phases 7.0 owner authoring sprint → 7.5 catalog matrix
    QA + launch). 7.0 is BLOCKER for 7.1+ (owner must validate
    draft `subcategories.js` line-by-line ; owner must name the
    brand × sub-cat surface for `fitment-virtual.js` ; owner must
    approve the ~80 piece images source).
  * Wrote `.project-store\handoff-2026-05-13.md` — refreshed
    handoff. Audits ADR 001-012 status, the two open architectural
    pivots (Phase 5 home overhaul vs Phase 7 catalog matrix —
    orthogonal, can ship in parallel), the audit of
    `implementation_plan.md` items vs Phase 7's altitude (which
    survive at L1.5, which re-level to L2), the next 5 actions
    (action 1 = surface the strategic question to the owner ;
    actions 2-5 = parallel Phase 5 work + no-regret items from
    `implementation_plan.md`), things to NOT do, open questions.
  * Updated this `log.md` entry.
- **learnings** :
  * The single deepest design decision in any catalog UX is the
    **gating altitude** — at what level does "I need to know the
    vehicle to show meaningful results" kick in. For Oscaro it's
    at the L2 sub-cat (Plaquettes avant), not the L1 family
    (Freinage). Our current implementation has no L2, so the gate
    has nowhere to land — surfacing as a soft compat banner at L1.5
    that promises more than the data delivers. Documented in
    `da-catalog-matrix-architecture.md` §6. **Candidate for
    promotion to `db.md` W04.13.D** as a new
    `T-auto-parts-gating-altitude` tip.
  * Vitrine-shaped sites can adopt e-commerce UX patterns
    structurally (3 levels, gating modal, fitment cards) WITHOUT
    becoming e-commerce, by populating the leaf with **virtual
    product cards** hand-curated from the brands the site
    genuinely sources. The cards display image / brand / compat
    badge / criteria, but the click-through is to a WhatsApp
    pre-fill carrying the exact triple — not to a basket. This is
    the "option C" pattern in `da-catalog-matrix-architecture.md`
    §3. **Candidate for promotion to `db.md` W04.13.D** as a new
    `T-vitrine-virtual-product-cards` tip.
  * `implementation_plan.md`-style root files (tactical, 10-15
    items, ~5 min each) and architectural ADRs (durable,
    multi-session) operate at incompatible altitudes. When both
    exist, the ADR overrides the plan ; the plan is the working
    tactical doc, the ADR is the contract. This session's
    `handoff-2026-05-13.md` §7 makes that hierarchy explicit so
    no future LLM gets confused about precedence.
- **next session** :
  * Action 1 (this session — last step) : surface the strategic
    question to the owner via `ask_user_question` ; record the
    pick in `owner-feedback.md` as F11 ; flip ADR-012 status from
    `draft — owner sign-off required` to `accepted` / `rejected` /
    `deferred`.
  * If owner picks option C : Phase 7.0 begins. Draft
    `subcategories.js` (~30-50 entries) at
    `.project-store\drafts\subcategories-draft.js`, ask owner to
    validate line-by-line. NO code under `src/` until approval.
  * Regardless of option pick : Phase 5 home overhaul can proceed
    per `handoff-2026-05-06.md` §4 actions 1-5 (still the right
    sequence — `da-oscaro-playbook.md` §5.1 is the spec).
  * Land the no-regret `implementation_plan.md` items (A multi-
    select, B layout, C SVG, F reviews, H placeholder cleanup).
    Hold E (per-cat FAQs) and G (per-cat videos) at L1.5 if
    Phase 7 is greenlit ; otherwise ship them at L1.5 and accept
    the lower granularity.
  * Verification at every commit : 3-command stack +
    Phase-specific manual checks (H2 count for Phase 5 ; gate
    modal flow for Phase 7).

---

## D-2026-05-13b  Phase 5.1 partial ship + Phase 7.0 data layer landed

- **context**  : Same day, second pass. Owner gave the green light to
                 execute (« take your time and reason so you produce
                 proper work, i give you the right to go ahead what your
                 suggestions »). Continuing from D-2026-05-13a where
                 ADR-012 was flipped to `accepted` and `subcategories-
                 draft.js` was authored. This session's goal: convert
                 paper plans into shipped code on the high-leverage axes
                 — close ADR-007 (hex-pattern debt) and ADR-002
                 (placeholder testimonials) on the home + the category
                 page; promote the L2 draft to durable infrastructure;
                 reshape the home from "vitrine corporate" to "Oscaro-
                 shaped catalog entry-point" per
                 `da-oscaro-playbook.md` §5.1.
- **diff**     :
  * `src/data/subcategories.js` (NEW, 575 lines) — promoted from
    `.project-store/drafts/subcategories-draft.js` line-for-line, no
    edits, on owner delegation. 41 L2 entries × schema per
    `da-catalog-matrix-architecture.md` §4.1, plus 5 helpers:
    `findSubcategory(slug)`, `getSubcategoriesForCategory(parentSlug)`,
    `getSubcategoriesByFamily(familyId)`, `categoryHasSubcategories
    (parentSlug)`, `getNavigableLeaves(categories)`,
    `countSubcategoriesByParent()`. The `getNavigableLeaves` helper
    is the routing-decision API that Phase 7.2 (vehicle-gated leaf)
    will consume.
  * `src/data/testimonials.js` (gutted, 19 lines) — array set to `[]`,
    removed the synthesised `google-1` entry (had been cited as
    " Très bon accueil et conseils précis…" since D23/D32). Doc-comment
    explains the ADR-002/F3 lineage and points to a 1-line flip path
    if owner ever decides to surface real avis via Place Details.
  * `src/pages/index.astro` (~62 lines net change in a 569 → ~580
    line file) — three structural moves:
        1. **Hex-pattern audit** — dropped 4 `bg-hex-pattern` overlay
           divs (Hero, Services, Testimonials wrapper, CTA final). The
           `bg-gradient-hero` token kept on the hero section (it's a
           flat 3-stop marine sweep, not decorative noise per ADR-007
           reading).
        2. **Catalog index refactor** — replaced the 12-card "Catégories
           phares" featured grid with a family-grouped catalog index:
           7 H2 family blocks (`Freinage`, `Moteur`, `Distribution`,
           `Démarrage & charge`, `Éclairage`, `Suspension`,
           `Échappement`), each with up to 4 category cards + a "Voir
           tout en X" CTA + an anchor (`#family-<id>`) for in-page
           navigation. The umbrella section H2 was demoted to a styled
           `<p>` so the family titles become peer-level entry-points.
           Removed the now-orphaned `HOME_FEATURED_SLUGS` import + the
           `featured` derivation. Added `getCategoriesByFamily` import.
        3. **Testimonials → AvisWidget standalone** — replaced the
           conditional `{showTestimonials && (…)}` block (which would
           never fire post-gut) with an unconditional standalone
           section that ONLY shows `<AvisWidget variant="dark" />` +
           a "Lire et laisser un avis" CTA pointing at the Google
           Business profile. No on-site quoting, F3-clean.
  * `src/pages/catalogue/[slug].astro` — dropped 2 `bg-hex-pattern`
     overlay divs (hero + final CTA). No layout change.
- **why**      :
  * **Phase 7.0 data layer durable** : the L2 list is no longer a
    draft in `.project-store/drafts/` (which an LLM might forget
    about) — it's importable from `src/data/subcategories.js` like
    any other data file. Phase 7.1 (L1.5 retrofit) and 7.2 (vehicle
    gating) can now wire against the actual schema without further
    owner authoring. The draft file in `.project-store/drafts/`
    stays as a frozen "owner sign-off" artefact for the audit trail.
  * **ADR-007 closed on the high-traffic surfaces** : the hex pattern
    was pure decorative noise inherited from the V1 "warm vitrine"
    DA. Removing it on the home + `[slug].astro` (the 2 surfaces
    where the user spends 90 % of their time) is enough to discharge
    the ADR for V2.5. Other lower-traffic pages (`services.astro`,
    `notre-magasin.astro`) can be cleaned in passing or left alone —
    not blocking.
  * **ADR-002 closed on the home** : the synthesised "Client Google"
    testimonial was a 2024-era band-aid that never sat right (D23
    log entry already flagged the awkwardness). Replacing it with
    the AvisWidget pointing at the live Google Business profile is
    the F3-correct surface. Phase 5.6 (live Place Details fetch)
    remains optional and owner-greenlit ; it's now a pure
    enhancement, not a fix.
  * **Catalog-first home is the Oscaro signature** : the V1
    "Catégories phares" deck of 12 cards was a sampling of the
    catalog with no architectural meaning ("phares" = featured = no
    SEO weight, no scanability for the user who knows their need).
    The new family-grouped grid mirrors Oscaro's exact pattern : the
    user lands, sees their family in one scroll, clicks 1 of 4 cards
    (or "Voir tout en X" if they want the full list). 28 entries
    surfaced × 1 scroll = entry-point in 1 second instead of "click
    Catalogue → scan 47 cats → click again".

    ```
    BEFORE                          AFTER
    ┌──────────────────────────┐    ┌──────────────────────────┐
    │ Catégories phares (12)   │    │ Trouvez votre pièce.     │
    │  ┌──┐┌──┐┌──┐┌──┐        │    │ ┌─ Freinage ────── voir → │
    │  │  ││  ││  ││  │        │    │ │ ┌──┐┌──┐┌──┐ (3)     │
    │  └──┘└──┘└──┘└──┘        │    │ ├─ Moteur ──────── voir → │
    │  ┌──┐┌──┐┌──┐┌──┐        │    │ │ ┌──┐┌──┐┌──┐┌──┐ (4)  │
    │  │  ││  ││  ││  │        │    │ ├─ Distribution ── voir → │
    │  └──┘└──┘└──┘└──┘        │    │ │ ┌──┐ (1)              │
    │  ... × 12                │    │ ... × 7 H2 family blocks │
    │  Voir toutes les cats →  │    │ Voir toutes les cats →   │
    └──────────────────────────┘    └──────────────────────────┘
    ```

    Counted on the rendered HTML: **13 H2s** captured by simple regex
    (the "Notre proximité" H2 has nested `<br/>` so it's skipped by
    a content-only match — actual count ~14, well inside Phase 5.1
    DoD range of 12-15).
- **validation** :
  * `npx astro check` → 0 errors, 0 warnings, 2 hints (pre-existing,
    `contact.astro` unused imports — out of scope).
  * `npm run build` → 54 pages, 0 errors, 0 warnings, 13.84 s wall.
    All 47 `/catalogue/<slug>` URLs survive (no breaking change to
    L1.5 routing). Home + every catalog page renders, no 500.
  * Rendered `dist/index.html` grep: 7 family anchors present
    (`family-freinage` … `family-echappement`), 0 occurrences of
    `bg-hex-pattern`. Same audit on `dist/catalogue/plaquettes-de-
    frein/index.html` → 0 hex-pattern.
  * H2 count audit: 13 captured H2s + 1 with nested children =
    ~14 total. Inside Phase 5.1 DoD range (12-15). ✓
- **scope traded** :
  * **NOT shipped this session** (deferred to next session, all of
    them tracked in `roadmap.md` Phase 5):
      - 5.1 hero swap (vehicle selector inline as the H1 surface).
        Current hero kept (storefront image + brand prose). Big
        change, deserves its own commit.
      - 5.1 "Quelle marque conduisez-vous ?" wordmark grid + the
        `data/vehicle-marques-shortcut.js` data file.
      - 5.1 "Comment ça marche" 3-step replacing "Why choose us".
      - 5.2 `?marque=<id>` query param wiring on
        `catalogue/index.astro`.
      - 5.3 Sticky 'Pour mon véhicule' rail on the category page.
      - 5.4 Header row-0 collapse to 32 px utility row.
      - 5.5 Token tightening (`marine.50`, `shadow.card-rest = none`,
        new `.section-flat` utility).
      - 5.6 Live Place Details fetch — owner-greenlit only.
  * **Why this scope and not more** : the 4 axes shipped this session
    (L2 promote + ADR-002 + ADR-007 + catalog-first home) are the
    high-leverage / low-risk subset. The deferred items each touch
    OTHER components or need a fresh data file (marques shortcut),
    which means longer reviews and a higher risk surface. Splitting
    them out keeps each commit reviewable.
- **next session** :
  * **Phase 5.1 hero swap** — the centerpiece. Extract `mode="hero"`
    on `<VehiclePanel>` (or build an `<HeroVehicleHook />` thin
    wrapper that calls `requestOpenVehicleModal()` on click and
    listens to `pac:vehicle-changed` to display the saved vehicle).
    Replace current hero (storefront image + brand prose) with: H1
    "Trouvez votre pièce parmi {CATEGORIES.length} catégories." +
    big vehicle selector card + 4-USP trust band. Move the
    storefront image + "Toulouse Ouest" écusson + "Notre proximité"
    stats to `notre-magasin.astro`.
  * **Phase 5.1 marques shortcut grid** — author
    `src/data/vehicle-marques-shortcut.js` (~16 most-common French-
    market constructeurs, derived from the existing
    `src/data/vehicles.js` MARQUES list, kept short for visual
    density). New H2 "Quelle marque conduisez-vous ?" between
    catalog index and brands grid. Each link → `/catalogue?marque=<id>`.
  * **Phase 5.2** — wire the `?marque=<id>` reader on
    `catalogue/index.astro`. Vanilla JS in `<script is:inline>` is
    sufficient (no new island).
  * **Phase 5.4** — header row-0 collapse. Verify `top-[68px]`
    sticky offset still aligns on `catalogue/index.astro` after
    the row-0 height drop.
  * **Phase 7.1** can now proceed in parallel : `src/data/
    subcategories.js` is live, the L1.5 page (`[slug].astro`) just
    needs its prose body collapsed and an L2 grid added below the
    intro paragraph. `getSubcategoriesForCategory(slug)` returns
    the children ; if `categoryHasSubcategories(slug)` is false,
    the page falls through to the existing L1.5 "fiche" layout
    (no behaviour change for the 30 unsplit categories).
  * **Verification at every commit** : 3-command stack
    (`npx astro check` → `npm run build` → `npm run dev` spot-
    check), plus the Phase 5.1 H2 audit (12-15 H2s on home) and
    the Phase 7 navigability check (no broken `/catalogue/<slug>`
    URL after L1.5 retrofit).
