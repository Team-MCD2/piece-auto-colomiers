# Roadmap — Pièces Auto Colomiers (V2)

> Phased plan. Each phase has status, definition-of-done, and the
> next deploy gate. Phases are sequential unless explicitly marked
> parallel-safe. Items are scoped so any phase fits a single working
> session. All V2 decisions that drive this are in `decisions.md`.
>
> **Guiding doctrine (carry-over from V1, promoted)** : every phase
> closes with the 3-command verification stack
> (`npx astro check` → `npm run build` → `npm run dev`). No phase
> is "done" if any of the 3 emits an error. See
> `plan\progress.txt` J1-J5 post-mortems.

---

## 0. Current state (V1 snapshot, 2026-05-04)

- **live**     : 54 pages generated, build green at V1 handoff
                 (J5). Vercel preview URL unclaimed; no custom
                 domain; EmailJS placeholders in `.env.local`.
- **blockers** : owner green-lights required on ADR-001 palette
                 reset and ADR-005 plate budget before Phase 1
                 and Phase 4 execute respectively.
- **unmerged V1 open loops** :
    * `npm run assets:brand-logos` not yet run on the deploy host
      — 14/15 brand SVGs committed, 1 (ATE fallback) renders as
      text badge. See `L-2026-05-03-018` cross-project lesson.
    * EmailJS env vars still placeholders — form falls back to
      mailto:. To resolve via client.
    * `emailIsPlaceholder: true` on `STORE.contact.email` — real
      email to be supplied by client.

---

## Phase 1 — Palette reset  [STATUS: planned · gated on ADR-001 greenlight]

**Definition of done**

- [ ] `tailwind.config.mjs` : `signal` scale removed from public
      surfaces; kept under a `colors.accent.signal` deep path so
      a future "decorative yellow" reintroduction is a one-line
      change. `sky` scale extended with a 300 tint for hover
      states. WhatsApp tokens added per ADR-006
      (`colors.brand.whatsapp` + `.whatsappDark`).
- [ ] `src\styles\globals.css` : `@layer utilities` audited for
      every `bg-signal-*`, `text-signal-*`, `ring-signal-*`,
      `shadow-cta` reference — each downgraded to sky / marine
      or removed. `bg-diagonal-stripe` + `bg-hex-pattern`
      removed per ADR-007.
- [ ] `src\components\Logo.astro` : `<span class="text-signal-400">`
      on "Colomiers" → `text-sky-300` (or white if contrast
      requires, on marine backgrounds).
- [ ] `src\components\Header.astro`, `Footer.astro`, `StickyBar.astro` :
      every `bg-signal-*` CTA / accent stripped. Primary CTAs
      become marine-800 on light / white on marine.
- [ ] `src\pages\index.astro`, `services.astro`, `catalogue/index.astro`,
      `catalogue/[slug].astro`, `contact.astro`, `notre-magasin.astro`,
      `mentions-legales.astro`, `404.astro` : global search-and-replace
      of yellow accents per ADR-001 + ADR-007.
- [ ] Favicon + og-image regenerated only if the source logo does
      not change (it does not — decision is about palette APPLICATION,
      not logo modification).
- [ ] `npx astro check` : 0 errors. `npm run build` : 0 errors, 54
      pages. `npm run dev` : spot-checked home, catalogue index, one
      category, contact, 404.
- [ ] Lighthouse mobile performance not regressed vs V1 (cache).

**Artefacts updated** : `decisions.md` ADR-001 status logged ;
`log.md` Phase 1 session entry ; no db.md write.

**Deploy gate** : push a Vercel preview branch; owner reviews on
mobile + desktop before merge to `main`.

---

## Phase 2 — Devis form overhaul + testimonials source of truth  [STATUS: planned · parallel-safe with Phase 1]

**Definition of done**

- [ ] `src\data\vehicle-brands.js` created — alphabetical list of
      80-120 common French-market brands (cite source : seeded
      from Marno's public brand list per V1 D24, normalised to
      PascalCase). Includes a trailing `{ id: 'autre', name: 'Autre' }`
      sentinel.
- [ ] `src\data\part-types.js` created — the ~25 most common
      part types derived from `src\data\categories.js`, grouped
      by family for the multi-select UI.
- [ ] `src\pages\contact.astro` :
    * Marque input → `<select>` populated from `vehicle-brands`,
      with `onChange` revealing the `marque_autre` text field
      when `autre` is selected.
    * Annee input → `<select>` listing (currentYear + 1) down to
      1980.
    * New "Pièces recherchées" multi-select fieldset (checkbox
      group) with selected-chips summary + searchable input.
    * Submit validation requires marque-filled + annee-filled +
      (multi-select ≥ 1 OR textarea ≥ 10 chars).
    * EmailJS params extended : `marque_final`, `pieces_selected`.
    * Accessibility : `aria-describedby` on invalid fields,
      `aria-live` on chips region, keyboard-navigable multi-select.
- [ ] `.env.example` updated with any new template variables.
- [ ] `src\data\testimonials.js` emptied of fabricated entries.
- [ ] `src\pages\index.astro` testimonials section rewritten :
      short intro + Google aggregate badge (`count` + `average`
      sourced from `STORE.avis.google`) + primary CTA "Voir nos
      avis Google" opening `STORE.avis.googleBusinessUrl`.
- [ ] `STORE.avis.google.count` + `.average` updated to reflect
      current reality (owner supplies).
- [ ] `npx astro check`, `npm run build`, `npm run dev` — all
      clean.

**Deploy gate** : Vercel preview; owner QA the form on a real
phone (fat-finger test the multi-select); flag if the chip UX
feels clumsy.

---

## Phase 3 — Chatbot V2.0 (rules-based, lazy-loaded)  [STATUS: planned · gated on Phase 1 palette]

**Definition of done**

- [ ] `src\data\chatbot-tree.js` — source-of-truth intent tree.
      ≥ 15 intents covering : horaires / adresse / services /
      Mondial Relay / retrait magasin / devis / WhatsApp /
      appel / "je cherche une pièce spécifique" (→ devis) /
      paiements acceptés / compatible marques / équivalent OEM
      (→ devis) / TikTok / avis Google / mentions légales.
      Each leaf emits 1-3 actions (next step, link, tel,
      mailto, wa.me, internal route).
- [ ] `src\components\ChatbotWidget.tsx` — React island
      (`client:idle`). Floating 56 px button on the bottom-right
      (left-aligned on RTL locales — not our concern yet).
      Panel opens with slide-in (`prefers-reduced-motion`
      respected), 360 × 520 on desktop, full-bottom-sheet on
      mobile. Keyboard accessible (Escape closes, focus trap,
      focus returned on close).
- [ ] First-paint cost : only the button + bubble SVG ship. The
      tree + panel JS chunk-split via dynamic import triggered
      on button click.
- [ ] Branding : widget uses ADR-001 palette; bot bubbles are
      `bg-offwhite-100` marine text; user bubbles are
      `bg-marine-800` white text; CTAs in primary marine.
      Persistent micro-footer "Assistant automatique — pour un
      humain, appelez ou WhatsApp".
- [ ] Telemetry : emit `pac:chatbot:open` + `pac:chatbot:intent`
      events via `window.dispatchEvent(new CustomEvent(...))`.
      Analytics integration is Phase 5.
- [ ] Accessibility : the floating button has
      `aria-label="Assistant automatique — posez une question"`,
      the panel has `role="dialog"` + `aria-modal="true"` +
      `aria-labelledby`, dismiss button has a visible focus ring
      and `aria-label="Fermer l'assistant"`.
- [ ] Feature flag : `PUBLIC_CHATBOT_ENABLED` env, default true
      in prod, overridable to false for debugging.
- [ ] `npx astro check`, `npm run build`, `npm run dev` clean.

**Deploy gate** : Vercel preview; owner walks all 15 intents on
mobile; client (Kais / Salah) gets the URL and gives real
feedback on the wording (can be captured in `boss-feedback.md`
then).

---

## Phase 4 — Plate immatriculation integration  [STATUS: planned · two-stage gating]

### 4.0 — Format-validation only (no budget gate)

**Definition of done**

- [ ] `src\lib\plate.ts` — pure-TS module with
    * `normalisePlate(input)` → `"AA-123-AA"` canonical OR
      `"1234 AB 56"` legacy, whichever matches; else `null`.
    * `isValidPlate(input)` → boolean.
    * `formatPlateMask(input)` → progressive mask helper for
      controlled input UI.
- [ ] `src\components\PlateInput.tsx` — React island with
      debounced mask + inline validation indicator (idle /
      valid / invalid) + explicit "Ce format n'est pas reconnu"
      micro-error.
- [ ] Integrated into the devis form as an OPTIONAL field above
      marque / annee. Its value is recorded as `plate` in the
      EmailJS params (empty if not supplied).
- [ ] localStorage `pac-last-vehicle` — writes the last
      user-entered plate + resolved marque / modele / annee /
      motorisation, read on later visits to prefill the form.
      Controlled by a subtle "Se souvenir de mon véhicule
      (stocké localement)" checkbox, default ON.

### 4.1 — SIV lookup (budget gate : owner-greenlit ADR-005 ≈ €59/mo)

**Definition of done**

- [ ] Vercel Edge Function `api/plate/[plate].ts` — takes a
      normalised plate, calls apiplaqueimmatriculation.com (or
      audited alternative) with the SIV key from env
      (`SIV_API_KEY` server-side, never exposed). Rate-limit :
      10 req / IP / minute via Vercel KV or edge memory.
- [ ] Edge Function response shape :
      `{ marque, modele, annee, motorisation, source }`.
- [ ] Client : `PlateInput.tsx` fetches `/api/plate/...` after
      the mask reports valid; success pre-fills form fields;
      failure (404 / 5xx) silently degrades to format-only
      behaviour with a discrete "Impossible de récupérer les
      données — remplissez manuellement" toast.
- [ ] `STORE` gains a `plateLookupEnabled` boolean (sourced from
      `PUBLIC_PLATE_LOOKUP_ENABLED` env).
- [ ] `mentions-legales` updated to disclose the data-source
      (SIV via apiplaqueimmatriculation.com) + the RGPD posture
      (plate considered PII-adjacent, no server-side retention
      beyond hashed rate-limit logs for 30 days).
- [ ] Documentation of all plate USES per ADR-005 item 3 (see
      `knowledge.md` T-pac-plate-uses) cross-referenced from
      the decisions log.
- [ ] `npx astro check`, `npm run build`, `npm run dev` clean.
      For the Edge Function, `vercel dev` used locally to
      exercise the route.

**Deploy gate** : two separate previews (4.0 then 4.1) so each
can be rolled back independently without reverting the other.

---

## Phase 5 — Oscaro-grade UX polish  [STATUS: in progress · ADR-011 charter active · 5.1 partial-shipped 2026-05-13b]

> Detailed in `da-oscaro-playbook.md` (audit-grade Oscaro analysis +
> per-file refactor map, written 2026-05-06 from a Wayback CDX
> snapshot). Anchoring decision: ADR-011. This phase also DISCHARGES
> ADR-007 (design canon — `bg-hex-pattern` debt) and ADR-002
> (testimonials — placeholder cards still rendered).

**Already shipped before this phase opened**
- [x] `src\lib\my-vehicle.ts` — `useMyVehicle()` hook + Astro helper.
- [x] `src\components\VehiclePanel.tsx` — Oscaro-style cascade modal,
      portal-rendered to `document.body`, persisted via
      `my-vehicle.ts`.
- [x] `Header.astro` row 1.5 — VehiclePanel chip (currently below the
      USP bandeau; Phase 5.4 reshuffles).
- [x] `Footer.astro` 5-column re-layout (Catégories / Services /
      Entreprise / Mentions / Contact).
- [x] `OpeningBadge.astro` — live "Ouvert maintenant" pill from
      `STORE.horaires`.
- [x] `AvisWidget.astro` — Google reviews CTA card (currently nested
      inside testimonials slider header; Phase 5.1 promotes it to
      its own section).
- [x] (Infra, 2026-05-06) Sticky main bar fix (`<header
      class="contents">`) + catalogue filter bar `top-[68px]`.

### 5.1 — Home page rebuild (`src\pages\index.astro`)

**Definition of done**
- [ ] Hero is the vehicle selector (~ 360-400 px tall, white bg).
      `VehiclePanel` rendered inline (extract `mode="inline"` if the
      current chip-trigger render is not flexible enough). No
      storefront image, no full-screen brand prose.
- [ ] Trust band §2 — 4 USPs in a flat row, no gradient backgrounds,
      no decorative SVG circles around the icons.
- [ ] H1 `Trouvez votre pièce parmi {CATEGORIES.length} catégories.`
      on a clean offwhite section. Single H1 of the page.
- [x] Catalog index — 7 H2 family blocks, each with 4-6 sub-cat
      cards (image + label + chevron link) + "Voir toutes les
      [famille]" CTA. Source data: `src\data\categories.js`
      family grouping. *(Shipped 2026-05-13b: 7 H2 blocks for
      `freinage`, `moteur`, `distribution`, `demarrage`, `eclairage`,
      `suspension`, `echappement` ; up to 4 cards per family ; bottom
      CTA links to `/catalogue` for the 9 remaining families. The 47
      categories are reachable in 2 clicks max from the home.)*
- [ ] NEW H2 `Quelle marque conduisez-vous ?` — wordmark grid of
      ~16 most-common French-market constructeurs. Data lives in
      NEW `src\data\vehicle-marques-shortcut.js`. Each link →
      `/catalogue?marque=<id>`.
- [ ] H2 `Nos équipementiers` — keep existing grid, REMOVE
      `grayscale` filter, reduce hover treatment to border-darken
      only.
- [ ] H2 `Comment ça marche` — 3-step (Décrivez la pièce → Devis
      sous 24 h → Mondial Relay ou retrait magasin). Replaces
      "Why choose us" 3 reasons.
- [x] Standalone `<AvisWidget variant="dark" />` section (before
      FAQ). *(Shipped 2026-05-13b ; the conditional `{showTestimonials
      && …}` block was replaced by an unconditional section ; the
      synthesised `google-1` testimonial removed from
      `data/testimonials.js`.)*
- [ ] TikTok grid kept (conditional on disk).
- [ ] FAQ kept (5 home questions, `<details>` accordion).
- [x] Final CTA: flat marine-900 background. NO `bg-hex-pattern`
      overlay. Card with single CTA + tel. *(Shipped 2026-05-13b ;
      4 hex-pattern overlays dropped on the home, 2 on
      `[slug].astro`.)*
- [ ] Sections REMOVED from current home: storefront image hero,
      "Toulouse Ouest" écusson, "Notre proximité" stats grid (move
      both to `notre-magasin.astro`), "Why choose us" (subsumed),
      placeholder testimonials slider.
- [ ] Visual rhythm DoD: H2 count between 12-15; section vertical
      padding 48-80 px; 0 decorative patterns; no full-screen hero.

### 5.2 — Catalogue index (`src\pages\catalogue\index.astro`)

**Definition of done**
- [ ] Read `?marque=<id>` query param on first paint (vanilla JS in
      a tiny `<script is:inline>` or in the existing reveal script).
      Look up the matching pill, set `aria-pressed="true"`, apply
      the filter. No new data needed.
- [ ] Mobile "Affiner" collapse — filters in a bottom-sheet drawer
      on `< md`, not always-visible. Existing pills are reused;
      only the wrapper changes.
- [ ] `npm run build` clean (test the query-param case in dev:
      `?marque=renault`, `?marque=peugeot`).

### 5.3 — Category fiche (`src\pages\catalogue\[slug].astro`)

**Definition of done**
- [ ] Drop `bg-hex-pattern` from the hero wrapper.
- [ ] Tighten card padding (`p-6` → `p-4`), drop `shadow-card`
      hover, replace with `border-marine-700` on hover.
- [ ] Sticky 'Pour mon véhicule' rail on desktop ≥ lg. Reads from
      `useMyVehicle()`. When unset, shows an inline VehiclePanel
      trigger.
- [ ] (Optional, lower-priority) `src\data\vehicle-family-fitment.js`
      — coarse `modele → family` mapping. When `useMyVehicle()` is
      set and the rail-card vehicle has a recognisable family,
      sort the brand-equipementiers grid to prioritise ones
      matching that family. Skip if the data is too sparse to be
      useful.

### 5.4 — Header reshuffle (`src\components\Header.astro`)

**Definition of done**
- [ ] Row 0 (current USP bandeau) collapsed to a thin 32 px
      utility row: Aide / Mon véhicule chip / Tel only. The 4
      USPs leave the header (they live on the home, §5.1).
- [ ] Row 1.5 (vehicle panel chip) made the primary visual focus
      of the top of the page. When unset, copy =
      "🚘 Renseignez votre véhicule pour des devis personnalisés".
      When set, copy = "🚘 Pour votre {marque} {modele} {annee}
      · modifier · ✕".
- [ ] Row 2 (sticky main bar) unchanged in height (h-68 px). After
      the row-0 collapse, re-verify `top-[68px]` on
      `catalogue\index.astro` filter bar still aligns. If
      something shifted, update the offset constant.

### 5.5 — Token tightening (`tailwind.config.mjs` + `globals.css`)

**Definition of done**
- [ ] Add `colors.marine.50: #EAF1F8` (near-white tint for selected
      states on light surfaces).
- [ ] `shadow.card-rest` = `none`; `shadow.card-hover` = `0 4px
      12px rgba(15,44,90,0.08)`. Update `.card` and
      `.card-interactive` consumers in `globals.css` accordingly.
- [ ] New `.section-flat` utility — `py-12 md:py-16 lg:py-20`
      (vs current `.section-y` `py-16 md:py-24 lg:py-32`). The
      catalog index sections use `.section-flat`; brand-narrative
      sections (storefront, services hero) keep `.section-y`.

### 5.6 — Avis Google live rating (optional, owner-greenlight)

**Definition of done**
- [ ] Build-time Place Details fetch script in `scripts\fetch-avis-google.mjs`
      that writes `src\data\avis-google.json` with
      `{ count, average, fetchedAt }`. Re-run on every build (or
      cached for 24 h via `Vercel KV` if quota becomes an issue).
- [ ] `AvisWidget.astro` reads the JSON if present, falls back to
      `STORE.avis.google` static values otherwise.
- [ ] Add `GOOGLE_PLACES_API_KEY` to `.env.example`. Owner supplies
      the key. Document the place ID resolution
      (`STORE.avis.googleBusinessUrl` resolves to `kgmid /g/11yff9l5qb`).

### Verification gate (every Phase 5 sub-step)
- [ ] `npx astro check` → 0 errors
- [ ] `npm run build` → 54 pages, 0 errors, 0 warnings
- [ ] `npm run dev` → spot-check home + /catalogue + /catalogue/freinage
      + /contact + /notre-magasin
- [ ] Manual H2 count on home → between 12-15
- [ ] Visual diff against `references\oscaro-snapshot-2024-02-12.html`
      (open in browser, side-by-side check that the structural
      rhythm matches without porting the red identity).

---

## Phase 6 — Cross-cutting polish + launch  [STATUS: planned · after Phase 5]

**Definition of done**

- [ ] Re-run `PB-web-qa-pre-deploy-review` end-to-end (from
      `db.md` W05). 27 checks must pass or be explicitly waived
      in this file.
- [ ] Run `PB-pre-deploy-security` (from `db.md` W05).
- [ ] Walk `db.md` W04.15 MUST-HAVES — every item either
      shipped or waived here with a one-line reason.
- [ ] Lighthouse mobile : Performance ≥ 90, Accessibility ≥ 95,
      Best Practices ≥ 95, SEO ≥ 95. Regressions vs V1 flagged
      and addressed.
- [ ] README + UserGudie.md updated (V2 features section, new
      env vars, new scripts if any, palette migration notes).
- [ ] Client (Kais / Salah) reviews the Vercel preview on mobile;
      feedback collected in `boss-feedback.md`.
- [ ] Custom domain decision (optional — owner call) before
      full cutover.
- [ ] Promote preview → prod; write the release note + D-ID
      entry in `log.md`.

---

## Phase 7 — 3-level catalog matrix + vehicle-gated leaf  [STATUS: 7.0 partial · ADR-012 accepted (F12) · 7.1+ ready to begin]

> Anchored by ADR-012 in `decisions.md`. Detailed in
> `da-catalog-matrix-architecture.md` (companion to
> `da-oscaro-playbook.md` — playbook = page rhythm; arch brief =
> information architecture / data model / routing).
>
> **Gate**: this phase does NOT begin until the owner explicitly picks
> option C in `da-catalog-matrix-architecture.md` §3 (vitrine wearing
> Oscaro's clothes — 3 levels + virtual product cards, no prices, no
> cart) AND validates the L2 sub-cat list line-by-line (see 7.1 below).
> The default if no greenlight is option A: silent acknowledgement of
> the brief, no code work on this axis. Phase 5 (home overhaul) can
> ship in parallel either way.
>
> **Re-leveling**: this phase pulls items E (per-category FAQs) and G
> (per-category videos) from `implementation_plan.md` (root) DOWN one
> level — they attach at L2 (sub-cat) instead of L1.5 (cat). The other
> 9 items in `implementation_plan.md` survive at their current
> altitude.

### 7.0 — Owner authoring sprint  (BLOCKER for 7.1+)

**Definition of done**
- [x] Owner picks option A / B / C in `da-catalog-matrix-architecture.md`
      §3, recorded in `owner-feedback.md`. *(Shipped 2026-05-13a: F12,
      option C ; ADR-012 status flipped to `accepted`.)*
- [x] If C, owner reviews a draft `subcategories.js` list (~30-50
      entries) and validates which L2 sub-cats actually map to
      magasin reality (what gets quoted weekly vs what is theoretical).
      *(Shipped 2026-05-13b: 41 L2 entries authored at
      `.project-store/drafts/subcategories-draft.js`, owner delegated
      sign-off (« take your time and reason... go ahead with your
      suggestions »), promoted to `src/data/subcategories.js` line-for-
      line. The draft file is the audit-trail artefact ; if reality
      shifts, edit `src/data/subcategories.js` directly — the draft
      stays frozen.)*
- [ ] Owner picks the brand × sub-cat surface for `fitment-virtual.js`
      (~80 rows): for each of the 30-50 L2 sub-cats, which 2-4 brands
      will the magasin commit to quoting on without research.
- [ ] Owner provides or approves the ~80 piece images (brand B2B
      portals are the typical source; fallback to silhouette
      placeholders is acceptable for V2.5 launch).

### 7.1 — L2 taxonomy + L1.5 retrofit

**Definition of done**
- [ ] `src/data/subcategories.js` (NEW) — schema per
      `da-catalog-matrix-architecture.md` §4.1, populated with the
      owner-validated list from 7.0.
- [ ] `src/pages/catalogue/[slug].astro` retrofitted: prose body
      (current `Notre offre` + `Signes d'usure` blocks) collapses
      to a single intro paragraph; the rest of the page becomes a
      grid of L2 sub-cat cards (image + label + criteria preview +
      brand count).
- [ ] All existing `/catalogue/<slug>` URLs survive (no 301, no
      404). H1 is preserved; H2s gain the L2 labels (additive SEO).
- [ ] FAQ block on `[slug].astro` keeps the L1 fallback if no L2
      FAQ exists yet, but each L2 with `faqIds` populated supersedes
      the L1 FAQ when the user navigates into it.
- [ ] `npm run build` clean; H1/H2 audit on a sample of 5 retrofitted
      pages.

### 7.2 — Vehicle-gating modal

**Definition of done**
- [ ] `src/components/VehiclePanel.tsx` extended with `mode='gating'`
      prop + `gating: { subcategory, subcategoryLabel }` context. The
      modal in gating mode disables the close button and surfaces
      sub-cat-specific copy ("Pour garantir la compatibilité de vos
      `<subcategoryLabel>`…").
- [ ] `src/lib/my-vehicle.ts` extended with
      `requestOpenVehicleModal({ reason, context })` API. Existing
      `pac:vehicle-open` event keeps backward compat.
- [ ] L1.5 page (`[slug].astro`) — L2 sub-cat card click handler:
        * vehicle SET → direct `<a href>` nav.
        * vehicle UNSET → `event.preventDefault()` +
          `requestOpenVehicleModal({ reason: 'gating', context })` +
          one-shot listener on `pac:vehicle-changed` to nav after.
- [ ] Soft-bypass link "Continuer sans véhicule" on the modal sets a
      session flag `pac-bypass-fitment-gate` (sessionStorage, expires
      on tab close) so further L2 → L3 nav doesn't re-trigger the
      modal.
- [ ] A11y: focus trap, ESC closes the modal (only via the bypass
      route, not silent), screen-reader copy adapts to context.

### 7.3 — Virtual L3 listing

**Definition of done**
- [ ] `src/data/fitment-virtual.js` (NEW) — schema per
      `da-catalog-matrix-architecture.md` §4.2, populated with the
      owner-validated rows from 7.0.
- [ ] `src/pages/catalogue/[slug]/[sub].astro` (NEW) — L3 product
      listing page. `getStaticPaths()` enumerates the cartesian
      product of `subcategories.js` entries; renders a grid of
      product cards from `fitment-virtual.js` filtered by `subcategory`.
- [ ] `src/lib/fitment-check.ts` (NEW) — pure
      `checkCompat(piece, vehicle): 'compatible' | 'unverified' | 'unknown'`
      function. Drives the green/yellow/grey badge state.
- [ ] Card anatomy per `da-catalog-matrix-architecture.md` §7:
      image · brand wordmark · compat badge · 1-line criteria ·
      Devis WhatsApp + Détails CTAs. Flat at rest, border-darken
      hover (per `da-oscaro-playbook.md` §6).
- [ ] WhatsApp pre-fill on every L3 card uses the `data-wa-base`
      pattern + `data-wa-enhance` enrichment (existing infra) and
      includes the `(brand × subcategory × MMY)` triple in the
      `devisHint` field.
- [ ] Empty-state when `fitment-virtual.js` has no entries for a
      sub-cat: the page redirects to a "Demandez-nous" devis form
      pre-filled with the sub-cat label.

### 7.4 — Vitrine-grade L4 fiche

**Definition of done**
- [ ] `src/pages/piece/[id].astro` (NEW) — single template,
      `getStaticPaths()` from `fitment-virtual.js` enumerating
      `(brand × subcategory)` pairs (~80 static pages).
- [ ] Sections per `da-catalog-matrix-architecture.md` §8:
      breadcrumb · hero · caractéristiques techniques · compat MMY
      table · YouTube tutorial (from `subcategories.videoId`) ·
      pièces complémentaires (cross-sell) · FAQ (from `subcategories.faqIds`)
      · CTA final.
- [ ] NO price field, NO add-to-cart, NO basket icon anywhere on
      the fiche. The conversion remains WhatsApp / formulaire devis.
- [ ] JSON-LD `Product` schema (no `offers`, no `price`) — same
      pattern as the current `[slug].astro` schema at lines 67-88.
- [ ] Sitemap regenerated with the ~80 new fiche URLs.

### 7.5 — Catalog matrix QA + launch

**Definition of done**
- [ ] Manual gate test: from a fresh browser (no localStorage),
      navigate L1 → L1.5 → L2 → click L2 card → modal fires →
      submit cascade → green badges on L3 → click card → fiche.
- [ ] Soft-bypass test: same flow, but click "Continuer sans véhicule"
      on the modal → L3 loads with yellow ⚠ badges + sticky banner
      "Sans véhicule sélectionné…".
- [ ] WhatsApp pre-fill test: every L3 card and every L4 fiche →
      WhatsApp opens with the correct `(brand × sub-cat × MMY)`
      string.
- [ ] SEO regression test: 47 retrofitted L1.5 pages still rank for
      their primary keyword (post-launch, week +2).
- [ ] Owner walks the full L1 → L4 flow on the Vercel preview
      before merge to `main`.

---

## Proactive proposals beyond owner feedback  [NOT-SCHEDULED · owner to pick-n-choose]

Owner instruction : "all i say are just ideas that you must feed on
to make more suggestions that go in the same light". Each entry
below is a candidate for inclusion in a phase; decision deferred
until owner signals yes/no/defer.

1. **"Mon devis en 3 étapes"** — progress-indicator wizard that
   sequences vehicle → pièce → contact, replacing the current
   single-page form for the main flow. The full form stays as
   the "Expert mode" tab. Increases completion on mobile.
2. **WhatsApp template per category** — "J'aimerais un devis pour
   [catégorie] pour ma [marque] [modele] [annee]" pre-filled into
   `wa.me` links on every category page CTA.
3. **Category "wear signs" mini-guides** — for the 10 highest-
   traffic categories (freins, amortisseurs, batterie, alternateur,
   démarreur, embrayage, filtres, bougies, pneus, courroie
   distribution), a short "Comment reconnaître l'usure ?" block
   with 3-5 bullet points and a photo. SEO long-tail + education.
4. **Dark-mode support** — `tailwind.config` already has
   `darkMode: 'class'` primed; wire it to `prefers-color-scheme`
   with a manual toggle in the footer. Palette : marine-900
   backgrounds with marine-800 cards and offwhite-50 text.
5. **PWA install prompt** — manifest is already shipped (V1).
   Add a deferred install prompt + "Installer" button in the
   header once the user has been on 2+ pages.
6. **Newsletter (double opt-in)** — single-field signup in footer.
   Handled by Brevo (free tier 300/day) — keeps stack RGPD-
   friendly. Copy : "Nouveautés catalogue + conseils
   saisonniers (pneus hiver, révision avant vacances)".
7. **Opening-hours live banner** in the header : "Ouvert
   maintenant · ferme à 18h" / "Fermé · rouvre demain 8h30"
   — the `isOpenNow()` helper already exists in `STORE`.
8. **Itinerary deep-link** — on the map + address, offer
   "Itinéraire Google Maps / Waze" buttons (currently only
   Google Maps). Waze is a free non-cookie deep link.
9. **Devis photo shortcut (mobile)** — a floating camera FAB on
   mobile that opens the devis form with the file input focused
   and the camera permission pre-prompted. Useful for walk-in
   users in a parking lot.
10. **Brand logo "compatible avec"** mini-badge — on category
    pages, show the ~4 brands the category serves with a hover
    tooltip explaining the specialism (fair-use per D28).
11. **Service-worker cache of the catalogue index** — the
    catalogue index page and key data are cached for offline
    re-consultation (PWA). No offline form submit (EmailJS
    requires network).
12. **"Demander la même pièce qu'avant"** — if "Mon véhicule"
    is set and the user has submitted a devis before (cookie),
    the devis form shows a "Renouveler ma dernière demande"
    chip that pre-fills.
13. **Structured FAQ expansion** — current 12 Q&A grows to 20,
    covering : garantie, délais Mondial Relay par zone, retour
    produit, retour particulier vs pro, paiement facturé,
    conditions B2B, pièces adaptable vs OEM, FAP régénéré vs
    neuf, pneus été vs hiver vs 4 saisons, prêt de pièce pour
    diagnostic. SEO long-tail + support deflection.
14. **"Recently viewed"** chips on the catalogue — localStorage-
    backed, 4 chips max, below the main filter row.
15. **Share-this-page** meta (Open Graph dynamic image via
    Vercel `/api/og` Edge Function with page title + logo +
    brand trio). Currently static og-image.

---

## Cross-phase risks + mitigations

| Risk                                           | Impact         | Mitigation                          |
|------------------------------------------------|----------------|-------------------------------------|
| Palette sweep misses a hardcoded `#F5C518`     | inconsistent   | grep for hex literal pre-merge      |
| Multi-select UX feels cramped on small phones  | form drop-off  | mobile QA on 320 / 375 / 414 px     |
| Chatbot tree drifts from reality (hours,       | trust loss     | single source `src\data\chatbot-   |
| services) when store updates its facts         |                | tree.js` reads from `STORE`         |
| SIV API burns €59/mo with low usage            | budget sink    | disable flag + feature-gate UI      |
| Google Place Details daily quota exhausted     | missing data   | build-time fetch + 24 h cache       |
| Plate-lookup edge-function returns PII in logs | RGPD breach    | hash-only plate in rate-limit logs  |

---

## Deferred (V3+) — explicitly out of V2 scope

- Authenticated "Mon garage" (Supabase auth + saved vehicles)
- Transactional e-commerce / prices / cart / stripe
- Multi-language (EN / ES for Toulouse Aerospace expats)
- TecDoc / TecAlliance fitment data (paid, deep integration)
- Blog / articles SEO (V1.5 concept, cadenced post-launch)
