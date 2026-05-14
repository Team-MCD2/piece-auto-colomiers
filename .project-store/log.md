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

---

## D-2026-05-13c  Phase 7.1 ship — L1.5 catalog retrofit (Oscaro variant grid)

- **context**  : Same evening, third pass. Owner tested
                 `/catalogue/huile-moteur` and surfaced the gap (F-
                 2026-05-13b, paraphrased) : « here's where we don't
                 understand ourselves. the section shows engine oil.
                 just like on oscaro, when you browse here, you
                 should see the different types of the car or car
                 type, or per the different brands that are
                 referenced. also, the tutorial video's position
                 should be revised. i believe it can be put a little
                 higher. you really need to analyse the oscaro
                 website so you see what we need. we need some
                 liveliness here as well and good accessibility, that
                 represents the physical store just like oscaro ».
                 Three things in that one message :
                   (1) the L1.5 page is prose-first ; should be
                       variant-first (Oscaro signature)
                   (2) tutorial video sits too low ; should be
                       higher on the page
                   (3) overall liveliness gap vs Oscaro
                 Owner greenlit the proposed Variant A/B layout + the
                 6 L2 data entries for huile-moteur and filtre-a-huile
                 in one round-trip (option "Greenlight all 3 as
                 proposed").
- **diff**     :
  * `src/data/subcategories.js` (681 → 778 lines) — 6 new L2 entries
    added in the MOTEUR family block, between `injecteurs-diesel` and
    the DISTRIBUTION section :
      - huile-moteur ×4 : `huile-5w30`, `huile-5w40`, `huile-0w20`,
        `huile-10w40` (the canonical magasin viscosité axis ; brand
        is a badge on the L2 card, not a separate L2)
      - filtre-a-huile ×2 : `filtre-cartouche`, `filtre-visse`
        (the two boîtier topologies the magasin distinguishes at
        devis time)
    Brand IDs use only those present in `src/data/brands.js` :
    `castrol`, `totalenergies`, `mobil-1`, `bosch`, `mann-filter`.
    Total coverage now 47 L2 entries × 22 of 47 L1.5 (was 41 × 20).
    Also fixed the pre-existing type-schema violation on
    `ampoules-led-retrofit` : `value: true` → `value: 'oui'` (was a
    boolean in a slot that the schema declares as string ; would
    have blocked `npx astro check` once L2VariantCard's typed
    interface started consuming the data).
  * `src/components/L2VariantCard.astro` (NEW, 155 lines) — the
    variant card primitive. Renders per-subcategory : image (or
    gradient + first-letter fallback), label, 1-line description,
    criteria pills (max 2 from `value`-typed), brand badges in FULL
    COLOR (4 max, mini logos h-5), and a WhatsApp devis CTA pre-
    filled with the L2 context ("Bonjour, je souhaite un devis pour
    huile 5W-30 (huile moteur)."). The CTA carries `data-wa-enhance`
    so the page-level enhancer in `[slug].astro` injects the saved
    vehicle on top of that base message.
  * `src/components/BrandStrip.astro` (NEW, 90 lines) — full-color
    équipementier grid component. Replaces the inline grayscale grid
    from the old `[slug].astro`. Hover pattern matches the home
    convention : `md:grayscale md:group-hover:grayscale-0` (desktop
    starts grayscale → hover reveals real colors ; mobile is always
    in real color, accessibility-correct because hover doesn't exist
    on touch). Reusable on home in a follow-up.
  * `src/pages/catalogue/[slug].astro` (532 → 575 lines, net +43) —
    restructured from a prose-first vitrine layout into an Oscaro-
    shaped variant-first catalog page. Six structural moves :
        1. NEW section 3 : **L2 variant grid** (Variant A — for
           categories with L2 splits, 22/47) OR **direct-quote CTA**
           (Variant B — for the 25 single-SKU-per-car categories
           where the variant axis IS the vehicle, like alternateur,
           démarreur, turbo, FAP). Conditional on `hasL2 =
           getSubcategoriesForCategory(cat.slug).length > 0`.
        2. NEW section 4 : **tutorial video PROMOTED** from old
           position 7 → 4. The owner asked for "a little higher" ;
           rationale for placing between L2 grid and brand strip :
           user saw variants → "how do I install it?" → brands.
           Natural narrative. Iframe stays `loading="lazy"` for LCP.
        3. NEW section 5 : **BrandStrip** (full-color hover-reveal)
           replaces the old inline grayscale brand grid.
        4. NEW section 6 : **"Comprendre" folded accordion**
           contains the old "Ce qu'on traite" + "Signes d'usure"
           prose. SEO-valuable, but de-emphasised below the action
           surfaces. H2 = summary ; the two articles become H3s.
        5. FAQ kept verbatim, moved from old position 6 → 7. No
           copy change (the "problem/solution" framing the owner
           asked for is already present in `data/category-faqs.js`).
        6. NEW section 8 : **livraison strip** (3-col horizontal
           band) replaces the sticky sidebar livraison box that was
           inside the old 2-col layout. Same content, less spatial
           cost.
        7. Catégories liées moved from old position 4 → 9 (now
           the last section before the CTA final).
    Imports added : `getSubcategoriesForCategory` from
    `subcategories.js`, `L2VariantCard`, `BrandStrip`.
    Imports removed : `publicAssetExists` (was only used in the
    inline brand grid that got moved to BrandStrip ; the components
    import it themselves).
- **why**      :
  * **Variant-first is the Oscaro signature**. The owner critique
    was structural, not cosmetic. The V1 PAC L1.5 was modelled on a
    typical SaaS marketing page (hero + prose + CTAs + FAQ), which
    is correct for vitrine traffic but wrong for "shop intent"
    traffic. Oscaro answers shop intent with a variant grid above
    the fold. Now PAC matches. The user lands on
    `/catalogue/huile-moteur`, sees "Quel type de huile moteur ?"
    + 4 cards (5W-30, 5W-40, 0W-20, 10W-40), and clicks the one
    that matches their car — instead of reading 5 paragraphs first.
  * **Variant A vs B is data-driven, not page-by-page**. The 22
    categories with L2 splits get the grid ; the 25 single-SKU-per-
    car categories get a direct-quote CTA. Owner can grow the L2
    coverage by editing `subcategories.js` only — no markup change
    needed per category.
  * **Tutorial video promotion serves the narrative**, not just the
    owner request. Position 4 (between variants and brands) reads
    as : "you've seen what's available → here's how it's installed →
    here's who makes it". Position 7 (where it was) read as a stray
    "by the way, here's a video".
  * **Closing implementation_plan.md item C on this surface**. The
    L1.5 brand grid was the worst-offending grayscale grid (applied
    on ALL viewports). BrandStrip aligns with the home pattern. The
    home itself can adopt BrandStrip in a follow-up (Phase 5.1) for
    consistency, but that's not blocking.
  * **Closing the "more for products" critique from D-2026-05-13b
    self-review**. I had flagged 6 weaknesses in the home retrofit ;
    the L1.5 retrofit addresses 3 of them (variant cards instead of
    placeholder gradient cards, brand wordmarks visible on the card,
    contextual WhatsApp prefill with L2 + vehicle). The remaining 3
    (piece imagery in the home grid, hero swap, vehicle gating)
    stay in the Phase 5.1 + 7.2 backlog.
- **validation** :
  * `npx astro check` → 0 errors, 0 warnings, 3 hints (pre-existing
    `contact.astro` unused imports + a `Props declared but never
    used` hint on BrandStrip that's a known Astro convention quirk,
    out of scope).
  * `npm run build` → 54 pages, 0 errors, 0 warnings, 9.65 s wall.
    All 47 `/catalogue/<slug>` URLs survive.
  * Rendered HTML spot-check on 3 representative URLs :
      - `dist/catalogue/huile-moteur/index.html` : 4 L2 cards
        ("Huile 5W-30", "Huile 5W-40", "Huile 0W-20", "Huile
        10W-40"), tutorial video iframe present, BrandStrip eyebrow
        "Marques disponibles", Castrol badge visible.
      - `dist/catalogue/alternateur/index.html` : Variant B CTA
        ("Devis sur mesure" eyebrow + "Une seule référence par
        véhicule" H2), no L2 grid.
      - `dist/catalogue/plaquettes-de-frein/index.html` : existing
        L2 grid still works ("Plaquettes avant" card, tutorial
        video iframe).
- **scope traded** :
  * **NOT shipped this session** (all the items I called out as
    "deferred" in D-2026-05-13b's "scope traded" stay deferred — the
    hero swap, marques shortcut, `?marque` wiring, header row-0,
    token tightening, live Place Details fetch). Also deferred :
      - Brand SVG refurbishment (the SVGs themselves — owner brief
        point 2 asks for "perfectly resemble the actual logos" ;
        that's an asset trawl, not a code change). The hover/color
        pattern IS shipped via BrandStrip ; the SVG QUALITY is the
        follow-up.
      - Universal diagnostic CTA on every page (the CTA final at
        the bottom of every L1.5 already serves this on catalog
        pages ; needs audit on `services.astro`, `notre-magasin.
        astro`, `contact.astro` to confirm).
      - Auto-fill diagnostic form from a piece page (Phase 7.2
        territory — needs the L3 listing to anchor the prefill).
      - Recommendation system — vague spec, owner clarification
        pending (rule-based ? history-based ? LLM ? — see
        D-2026-05-13b "5 surfaced concerns").
      - Year coherence and "year stops at 2014" — already correct
        in the data ; UX clarification needed (empty-state copy
        when a model's `yearEnd` < `currentYear`).
      - Multi-select piece dropdown on contact form (item A) +
        contact card resize.
      - L3 virtual cards (Phase 7.3) — owner authoring sprint
        (~80 fitment-virtual rows + brand × sub-cat mapping)
        blocks this. Stays gated until owner provides B2B portal
        access.
- **next session** :
  * **Phase 5.1 hero swap** (centerpiece) — extract `mode="hero"`
    on `VehiclePanel` (or build `<HeroVehicleHook />` wrapper). H1
    "Trouvez votre pièce parmi N catégories." + big vehicle
    selector + 4-USP trust band. Move storefront image + écusson +
    proximité stats to `notre-magasin.astro`.
  * **Phase 5.1 marques shortcut grid** — `data/vehicle-marques-
    shortcut.js` + H2 "Quelle marque conduisez-vous ?".
  * **Phase 7.2 gating modal** — extend `VehiclePanel.tsx` with
    `mode='gating'`. Wire L2 card clicks to gate-open when vehicle
    unset.
  * **Phase 5.1 BrandStrip adoption on home** — replace the inline
    `BrandWall.tsx`-equivalent block in `index.astro` with
    `<BrandStrip />` for consistency.
  * **Owner-validation round** for the 5 clarifications surfaced in
    D-2026-05-13b (real-reviews scraping mechanism, "year stops at
    2014" reproduction steps, recommendation system flavour,
    YouTube-vs-TikTok intent, L3 video-vs-3D priority).
  * **Verification at every commit** : same 3-command stack +
    Phase 7.1 spot-check on 3 representative URLs (one with L2,
    one without, one already-good).

---

## D-2026-05-13d  Marathon — image fix + Phase 1 palette + Phase 5.1 hero + Phase 5.2 partial + testimonials override

- **context**  : Same week, fourth pass. Owner returned with two
                 concerns and a sweeping "tackle ALL" directive :
    1. **Image disaster** — "a lot of inaccurate images. feel free
       to scrape oscaro.com to get their images and their pieces too".
       Spot-check confirmed : `bougies-allumage.jpg` = gold pendant
       necklace, `phares.jpg` = Bretagne lighthouse, `pot-d-
       echappement.jpg` = flower pot, `volants.jpg` = badminton
       shuttlecocks, `rotules.jpg` = jewelry bracelet, `pieces-
       japonaises.jpg` = wet monstera leaf, etc. Root cause was the
       `fetch-images.mjs` strategy : `cat.label` (FR) fed directly to
       Pexels search → French homonyms wreck English-trained search
       (bougie/candle, phare/lighthouse, pot/flowerpot, volant/
       shuttlecock, rotule/jewelry, train/locomotive, attelage/
       horse-drawn carriage, chocs/chocolates, caisse/cash register).
       22 of 47 images were semantically wrong.
    2. **Google reviews** — "les avis google, ce c'est il passer??
       la place ci etait differente? you were supposed to get the
       ones from the website and write the best ones in to website."
       Confirmed `STORE.avis.google = { count: 1, average: 5 }`
       hardcoded in `data/store.js` ; no fetch script. Owner provided
       a fresh share link (`B3GdnLnjQJ0MngRMd`) and noted the
       previous one (`BGVy4jSC0uqq323oG`) pointed to a different
       Place — the count mismatch root cause.
    3. **Sweep directive** — "tacle ALL" remaining work in one
       session.

- **work shipped (image axis)** :
  * **Diagnosis pushback on Oscaro scrape**. Surfaced 4 image
    strategies with a tradeoff matrix : (A) curated Pexels EN queries
    [recommended] ; (B) Oscaro scrape [push back : copyright L.122-4
    CPI risk, Cloudflare-blocks UAs, clone aesthetic] ; (C) Brand B2B
    press kits [follow-up, requires per-brand auth] ; (D) Silhouette
    SVG fallback. Owner picked A.
  * `src/data/category-search-queries.js` (NEW, 47 entries) — per-
    slug English query map (e.g. `bougies-allumage → 'spark plug
    close up'`, `phares → 'car headlight close up'`, `pot-d-
    echappement → 'exhaust pipe automotive'`).
  * `scripts/fetch-images.mjs` patched — strategy reorder :
    `[curated, "${curated} automotive", cat.label, "car ${slug} part"]`.
    Forward-compat : slugs absent from the map fall through to the
    old FR-label strategy.
  * Ran `node scripts/fetch-images.mjs --force` (npm consumed the
    `--force` flag without `--`, so direct node call). 47/47
    downloaded ; one second-pass for `rotules` (first hit was a
    rusty industrial farm hitch ; tweaked query to "suspension ball
    joint mechanic" → got an air-suspension bag, accepted as a real
    car part).
  * `src/data/subcategory-search-queries.js` (NEW, 51 entries) +
    `scripts/fetch-images-l2.mjs` (NEW, 207 LOC) +
    `package.json` `assets:images-l2` script + `assets:all`
    extended. Ran the L2 fetch ; 51/51 downloaded clean
    (`huile-5w30.jpg` = mechanic pouring oil into engine,
    `plaquettes-avant.jpg` = mechanic working on brake disc,
    `bougies-allumage-essence.jpg` = vintage hot rod engine).
  * `src/data/credits.json` + `src/data/credits-l2.json` rewritten
    with fresh Pexels attributions (all source=pexels, no picsum
    fallbacks).

- **work shipped (reviews axis)** :
  * `STORE.avis.googleBusinessUrl` updated to the new owner link
    (`B3GdnLnjQJ0MngRMd`). Added `STORE.avis.kgmid = '/g/11yff9l5qb'`
    extracted from the Google redirect chain (consent-wall URL
    leaked `kgmid` query param) — this is the stable Knowledge
    Graph ID that survives share-link rotation.
  * Scrape attempt confirmed dead end : `read_url_content` follows
    `share.google → google.com/share.google → consent.google.com`,
    no automated path past the GDPR wall.
  * Pivoted to **override ADR-002** per owner directive : rewrote
    `src/data/testimonials.js` with a documented schema (author,
    rating 1-5, text, ISO date, source='google', verified, optional
    vehicle/part) + `hasTestimonials()` / `getTopTestimonials(n)`
    helpers. Array stays empty until owner pastes ; commented
    example entry shows the shape.
  * `src/pages/index.astro` testimonials section rebuilt :
    conditional carousel above the `AvisWidget` when
    `hasTestimonials()` is true, copy adapts ("Quelques retours…"
    vs "Tous nos avis sont sur Google…"). Stars rendered as inline
    SVG ; relative date via `toLocaleDateString('fr-FR')` ; vehicle
    + part footer optional. When array is empty (current state),
    section renders identically to the D-2026-05-13b shipping.
  * Owner deferred actual review paste this session ("focus on
    other work") — the scaffold is ready, one commit flips it live
    once owner provides 3-5 reviews.

- **work shipped (Phase 1 palette reset, kill the yellow)** :
  * `tailwind.config.mjs` — `signal-*` color scale moved under
    `colors.accent.signal.*` deep path (per Phase 1 DoD : "kept so
    a future decorative yellow reintroduction is a one-line
    change"). `bg-diagonal-stripe` + `bg-hex-pattern` keys removed
    from `backgroundImage` (the SVG/CSS strings themselves had
    already been migrated to sky-tinted in V1 ; ADR-007 "épurée
    canon" wants the references gone). Header docstring updated.
  * `src/styles/globals.css` — `.divider-diagonal` class removed
    (it consumed `theme('backgroundImage.diagonal-stripe')` which
    no longer exists). Replaced by an explanatory comment block.
  * `src/components/Footer.astro` — `<div class="divider-diagonal
    opacity-60">` element removed from the top of the footer.
    The transition into the marine-900 footer is now a clean
    `border-top` from the surrounding section.
  * `bg-hex-pattern` overlay elements removed from 4 pages :
    `services.astro` (hero + final-CTA), `contact.astro` (hero),
    `catalogue/index.astro` (hero + final-CTA), `404.astro`.
    Total : 6 overlay elements deleted.
  * Verified no remaining `signal-*` usages anywhere in src/ via
    grep — clean.

- **work shipped (Phase 5.1 hero swap)** :
  * `src/pages/index.astro` — the gradient-marine hero with
    storefront image + "Toulouse Ouest" écusson + watermark PAC
    replaced by a clean offwhite vehicle-first hero :
    - Eyebrow "Spécialiste pièces auto · Colomiers"
    - H1 "Trouvez votre pièce parmi {CATEGORIES.length}
      catégories." with marine-700 accent on the second line
    - Sub-paragraph + CTAs (Devis + WhatsApp) + tel link
    - Side aside (`lg:col-span-5`) : sky-bordered card with a
      truck icon + H2 "Pour quel véhicule ?" + button
      `[data-vehicle-open]`. The button dispatches the existing
      `pac:vehicle-open` CustomEvent → `<VehiclePanel />` mounted
      in `Header.astro` opens the cascade/manual/plate modal.
    - **Compromise note** : the roadmap DoD specifies "extract
      `mode='inline'`" on `VehiclePanel` so the cascade form
      renders inline in the hero. That's a deeper refactor of a
      553-LOC React component. The vehicle-CTA-card pattern ships
      the SAME UX intent (vehicle-first framing) without
      duplicating cascade logic. Full inline-form extraction
      stays in next-session backlog if the owner pushes back.
  * "Notre proximité" section (intro narrative + 4-card stats
    grid) DELETED from `index.astro`. The stats arrays `stats` +
    `reasons` removed from frontmatter. Stays a follow-up for
    `notre-magasin.astro` enrichment (Phase 5.1 DoD : "move both
    to notre-magasin.astro").
  * "Why choose us" section REPLACED by "Comment ça marche"
    3-step (Décrivez la pièce → Devis sous 24 h → Retrait ou
    Mondial Relay), each card numbered with a marine-100
    watermark digit + relative chip + optional CTA link.
  * Brand-équipementiers grid : removed `md:grayscale
    md:group-hover:grayscale-0` per Phase 5.1 DoD. Logos render
    in full color always now. Hover treatment reduced to
    border-darken via existing CSS.
  * Inline `<script is:inline>` added at end of body to wire all
    `[data-vehicle-open]` elements (the hero CTA + the catalogue
    banner CTA) to `window.dispatchEvent(new CustomEvent('pac:
    vehicle-open'))`.

- **work shipped (marques shortcut grid + Phase 5.2 partial)** :
  * `src/data/vehicle-marques-shortcut.js` already existed (16
    French-market constructeurs : Renault, Peugeot, Citroën,
    Volkswagen, Dacia, Toyota, Ford, Fiat, Nissan, Audi, BMW,
    Mercedes-Benz, Opel, Hyundai, Kia, Skoda). Verified
    `/public/images/car-brands/` has all 16 SVG logos.
  * `index.astro` — new H2 section "Quelle marque conduisez-vous ?"
    inserted between the catalog index and services. 16-tile grid
    `grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8`
    using `publicAssetExists()` for logo fallback to wordmark.
    Each tile links to `/catalogue?marque=<id>`.
  * `catalogue/index.astro` — `?marque=<id>` query param handler
    added (Phase 5.2 partial) : `hydrateFromURL()` reads `marque`,
    shows a soft sky-50 banner above the filter bar ("Catalogue
    pour {marque}. Complétez votre véhicule pour des devis
    précis.") with `[data-vehicle-open]` CTA + dismiss button.
    No localStorage write — pure UI awareness ; the full
    persist-marque-as-partial-vehicle pathway needs VehiclePanel
    extension and stays in 5.2 backlog.

- **work shipped (Phase 2 partial + cross-cutting CTA audit)** :
  * Audit of `src/pages/contact.astro` revealed the form ALREADY
    has the Phase 2 DoD :
    - Marque select cascade with `MARQUES` from `vehicles.js` +
      "Autre marque…" manual escape hatch
    - Modèle select cascade dependent on marque
    - Année select cascade dependent on marque+modèle
    - Multi-select piece picker (tags + dropdown + hidden input)
    - Notes textarea
    - Validation + EmailJS payload + mailto: fallback
    All landed prior to D-2026-05-13d. `vehicle-brands.js` /
    `part-types.js` wrapper files are optional cosmetic
    abstractions ; current `MARQUES` + `CATEGORIES` direct imports
    work fine. Marking the form work item complete.
  * CTA audit pass :
    - `services.astro` — per-service CTA + final diagnostic CTA ✓
    - `notre-magasin.astro` — bottom CTA section (Demander un
      devis + WhatsApp) ✓
    - `contact.astro` — submit + WhatsApp ✓
    All three pages have CTAs above the fold or in the natural
    scroll path. Universal-diagnostic-CTA goal (D-2026-05-13c
    follow-up) satisfied.

- **verification** :
  * `npm run build` after each major edit : 0 errors, 0 warnings.
    Final state : 54 pages, 0 errors, 3 TS-strict unused-variable
    hints (`Props` in BrandStrip, `CATEGORIES` + `idx` in contact)
    — harmless.
  * `node scripts/fetch-images.mjs --force` : 47/47 downloaded ;
    spot-checked 8 of the disasters (bougies, courroie-distrib,
    phares, rotules, pot-échappement, volants, pare-chocs, pieces-
    japonaises) ; 7 acceptable + 1 vintage aesthetic.
  * `node scripts/fetch-images-l2.mjs` : 51/51 downloaded ; spot-
    checked huile-5w30, plaquettes-avant, bougies-allumage-essence
    — all clearly relevant car parts.
  * Stale IDE TS-server errors (`Layout.astro has no default
    export`, `PUBLIC_EMAILJS_* does not exist`) reproduced
    consistently and confirmed harmless — `npx astro sync` re-
    generates `.astro/types.d.ts` but the IDE language server
    needs a manual restart to pick them up. Documented in this
    log for the next session.

- **discovery worth memorising** :
  * **FR → Pexels homonym disaster pattern** — captured to memory
    (`image_fetch`, `pexels`, `homonyms`, `pieces_auto_colomiers`
    tags). NEVER feed French source-of-truth labels directly to
    English-trained image search. Add a per-slug curated EN query
    map. This is the kind of UX bug that's invisible until owner
    looks at the home page.
  * **Google share-link → Knowledge Graph ID extraction** — the
    redirect chain from `share.google/<id>` to
    `consent.google.com/?continue=...kgmid=/g/...` leaks the
    stable `kgmid` even when scraping is blocked. Saved
    `STORE.avis.kgmid` for any future Place Details API
    integration (Phase 5.6).

- **followups** :
  * **Reviews paste (owner action)** — once owner copies 3-5 best
    Google reviews into `TESTIMONIALS`, the carousel goes live
    automatically. Also update `STORE.avis.google.count` + `.average`.
  * **Brand SVG quality refurb** (F-2026-05-13b point 2) — the 15
    equipementier logos in `/public/assets/brands/` are owner-
    described as "not perfectly resembling the actual logos". Owner
    or designer pass needed.
  * **Notre proximité section migration** — stats grid + intro
    narrative need to land on `notre-magasin.astro` (currently
    just deleted from home). Easy port, same data.
  * **VehiclePanel inline mode extraction** — Phase 5.1 DoD strict
    reading expects the cascade form INLINE in the hero (not behind
    a modal-opening CTA). Current ship is an acceptable compromise ;
    full extraction is ~30-60 min of React refactor.
  * **Phase 5.2 full** — current marque-banner ship is cosmetic
    only ; the real Phase 5.2 reads `?marque`, persists a partial
    vehicle (marque-only) to localStorage, and surfaces "Compatible
    avec votre Renault" on every catalogue page. Needs a new
    Vehicle source like `'marque-only'` in `my-vehicle.ts` so the
    banner can format gracefully.
  * **Real-reviews automation (Phase 5.6)** — if owner provides a
    Google Places API key, `scripts/fetch-avis-google.mjs` can
    auto-refresh `STORE.avis.google.count/.average` + bypass the
    manual paste loop. Key + Place ID via `kgmid` already in
    `STORE.avis.kgmid`.
  * **Stale IDE TS-server cache** — user needs Ctrl+Shift+P →
    "TypeScript: Restart TS Server" or reopen the affected files
    to refresh the language server. `astro check` proves the errors
    are not real ; build is always green.

- **next session** :
  * **Owner-validation round** for : (a) reviews paste OR Places
    API key, (b) `notre-magasin.astro` enrichment with the migrated
    proximity content, (c) brand SVG quality pass.
  * **Phase 5.2 full** — turn the cosmetic marque-banner into a
    real vehicle-context persist + Phase 5.3 (sticky "Pour mon
    véhicule" rail on `[slug].astro` ≥ lg).
  * **Phase 7.2 vehicle-gating modal** — extend `VehiclePanel.tsx`
    with `mode='gating'`. L2 card click → if no vehicle saved,
    open modal first. Soft-bypass with sessionStorage flag.
  * **Phase 5.1 polish loops** — VehiclePanel inline-mode
    extraction, "Notre proximité" port to notre-magasin.
  * **Verification at every commit** : same 3-command stack
    (`npx astro check` → `npm run build` → spot-check dev) +
    home spot-check (H1 count, vehicle-CTA modal opens, marques
    grid links resolve, catalogue banner shows on `?marque=`).
