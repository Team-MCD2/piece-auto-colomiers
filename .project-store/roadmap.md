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

## Phase 5 — Oscaro-grade UX polish  [STATUS: planned · after Phases 1-4]

**Definition of done**

- [ ] `src\lib\my-vehicle.ts` — shared "Mon véhicule" state
      provider. Reads / writes localStorage under
      `pac-last-vehicle`. Exposes `useMyVehicle()` React hook
      + Astro helper.
- [ ] `src\components\VehicleChip.tsx` — compact header chip
      rendering "🚘 Ma Clio IV 2018" with a pencil icon to
      edit and an × to clear. Lazy-loaded (`client:idle`)
      on every page.
- [ ] `src\pages\catalogue\[slug].astro` — top-of-page
      "Compatible avec votre véhicule" banner reads from the
      shared provider; when present, sorts / filters the
      brand-equipementiers grid to prioritise ones matching
      the vehicle's family (requires a new
      `src\data\vehicle-family-fitment.js` mapping, seeded
      coarsely by `modele → family` where obvious).
- [ ] Trust strip rewritten from marquee to static
      5-icon strip (Mondial Relay · Retrait magasin · Devis
      24 h · Paiement magasin sécurisé · Multi-marques).
      Per ADR-007 design canon.
- [ ] Footer re-layout in 5 columns per ADR-008 pattern
      (Catégories / Services / Entreprise / Mentions / Contact).
- [ ] Google Place Details live rating embed on home
      testimonials section (build-time fetch → cached
      JSON; optional Edge Function if we need daily refresh).
      Fallback if the Place Details key is absent : static
      rating badge as shipped in Phase 2.
- [ ] `npx astro check`, `npm run build`, `npm run dev` clean.

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
