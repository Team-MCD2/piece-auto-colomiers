# Project Knowledge — Pièces Auto Colomiers

> Source of truth for THIS project's tips, conventions, and
> project-scoped lessons. Distilled insight that GENERALISES beyond
> this project gets PROMOTED to `db_store\db.md` (W04 / W05 / W06)
> via the M08 PROMOTION RULES. This file is the staging ground.

---

## Conventions (project-specific, extends `db.md` W01)

- **File naming** : kebab-case for `.astro`, `.js`, `.ts`,
  `.json`; PascalCase for React components (`.tsx`). Match the V1
  convention inherited from Mon Boum V3.
- **Data modules** : every business fact lives under `src\data\`,
  frozen with `Object.freeze(...)` where sensible, exported named
  (not default). No hardcoded literals in pages / components — if
  you find a magic string, extract it.
- **Island directives** : `client:only="react"` for anything that
  touches `window` at import (Leaflet, react-leaflet).
  `client:visible` or `client:idle` for interactive islands that
  can SSR-render a static placeholder. `client:load` avoided
  unless first-contentful interaction demands it.
- **Build discipline** : every session closes with the 3-command
  stack — `npx astro check` → `npm run build` → `npm run dev` —
  all green, per J1-J5 post-mortems in `plan\progress.txt`.
- **French content, English code** : UI copy, SEO, JSON-LD
  in French. Identifiers, comments, git history in English.
- **One data source per concept** : if two files hold the same
  list of brands or part types, one of them is wrong. Collapse
  before adding new work.

## Tips (T-pac-* IDs, project-scoped)

### T-pac-palette-v2  V2 palette application rules

- **what**    : ADR-001 in action. Marine + sky + white dominant;
                yellow reduced to focus-ring / warn-badge accent.
- **tokens**  :
    * Primary surface / header / footer / hero : `bg-marine-800`
      (`#0F2C5A`)
    * Secondary surface / cards on light pages : `bg-white`
    * Section background : `bg-offwhite-50` (`#F4F6F9`)
    * Primary CTA fill on light : `bg-marine-800 text-white
      hover:bg-marine-700`
    * Primary CTA fill on marine : `bg-white text-marine-900
      hover:bg-offwhite-100`
    * Secondary CTA  : `border-2 border-marine-800 text-marine-800
      hover:bg-marine-800 hover:text-white`
    * Text default   : `text-charcoal-800` on light ; `text-white`
      on marine.
    * Accent text / eyebrow : `text-sky-600` on light ;
      `text-sky-300` on marine (avoid `text-signal-*` outside
      focus-ring / warn badge).
    * WhatsApp CTA   : `bg-brand-whatsapp text-white
      hover:bg-brand-whatsapp-dark` (token added in Phase 1).
    * Focus ring     : `focus-visible:ring-2
      focus-visible:ring-sky-400` on light ; `ring-signal-400` on
      marine (micro-use of yellow — intentional, visibility win).
- **how to migrate V1 → V2** : grep the codebase for all
  `signal-*` references + the `#F5C518` hex literal; each hit
  audited to one of {remove, swap to sky / marine, kept as
  focus-ring or warn-badge}. Lessons-learned item L-2026-05-03-019
  applies — no hardcoded colour literals; always token.
- **why**     : aligns palette application with the logo's
  dominant trio + owner's verbatim feedback.
- **cross-ref** : `decisions.md` ADR-001, `blacklisted.md` yellow-
  as-CTA ban, `db.md` W04.3 T-colors-contrast-check.

### T-pac-design-canon  "Jeune, moderne, épurée" V2 canon

- **jeune (young)** :
    * Spacing : generous. `spacing.section` = `clamp(3rem, 8vw,
      6rem)` minimum between major sections.
    * Radii : cards `rounded-card` (14 px), pills `rounded-pill`
      (9999 px), buttons `rounded-lg` (8 px).
    * Case  : eyebrows + logo = UPPERCASE ; CTAs + body +
      headings = Sentence case ("Demander un devis", not
      "DEMANDER UN DEVIS").
    * Weight : H1-H2 `font-bold`, H3 `font-semibold`, body
      `font-normal`. Avoid `font-black`.
- **moderne (modern)** :
    * Cards-first : flows read as a vertical stack of cards
      ( image / product / service / category ) separated by
      generous padding. No dense bullet walls.
    * Typography : Inter for body + most headings; Oswald
      reserved for H1 / eyebrow / logo-adjacent copy.
    * Motion : `animation-fade-up` at 8-12 px (not 16), 400-
      500 ms, respecting `prefers-reduced-motion`.
    * No scroll-hijack, no parallax, no marquee in V2.
- **épurée (clean / minimalist)** :
    * Remove : `bg-hex-pattern`, `bg-diagonal-stripe`, marquee
      USP bar (replaced by static 5-icon trust strip per
      ADR-007 + roadmap Phase 5).
    * Keep  : micro-separators (1 px `bg-charcoal-100` / or
      transparent section background change) ; avoid heavy
      fill separators.
    * Content density : ≤ 2 primary CTAs per section ; ≤ 1
      decorative image per section above the fold.
- **cross-ref** : ADR-007, `db.md` W04.3 ARTISTIC.

### T-pac-marque-dropdown  Marque-véhicule dropdown + "Autre" reveal

- **data**    : `src\data\vehicle-brands.js`, 80-120 brands, each
    `{ id: 'kebab-case', name: 'Display Name' }`. Alphabetical.
    Final sentinel `{ id: 'autre', name: 'Autre' }`.
- **UI pattern** :
    ```astro
    <label>
      <span>Marque véhicule</span>
      <select name="marque" id="marque-select" required>
        <option value="" disabled selected>— Sélectionnez —</option>
        {brands.map(b => <option value={b.id}>{b.name}</option>)}
      </select>
    </label>
    <label data-conditional="marque=autre" class="hidden">
      <span>Précisez la marque</span>
      <input type="text" name="marque_autre" />
    </label>
    ```
    JS handler toggles `hidden` + `required` on the conditional
    field when `autre` is selected. Respect `prefers-reduced-
    motion` on the reveal animation.
- **submit**  : the field `marque_final` resolves to either the
    dropdown value's `name` or the custom text.
- **gotchas** :
    * Make the list exhaustive for the French + European market
      (Renault, Peugeot, Citroën, Dacia, Opel, VW, Audi, Seat,
      Škoda, BMW, Mercedes, Toyota, Nissan, Honda, Kia, Hyundai,
      Mazda, Suzuki, Mitsubishi, Ford, Fiat, Alfa Romeo, Jeep,
      Land Rover, Volvo, Mini, Tesla, Iveco, Renault Trucks,
      DAF, Man, etc.). Under-listing forces too many "Autre"
      taps.
    * "Autre" is a legitimate path for niche imports, not a
      fallback for our laziness — if > 10% of devis use it,
      re-audit the list.
- **cross-ref** : ADR-003, `db.md` W04.5 FORMS + W04.9 A11Y.

### T-pac-annee-dropdown  Année-véhicule select

- **range**   : (new Date().getFullYear() + 1) down to 1980,
                descending. Under 1980 is vintage / collector
                territory — not our market; force "contactez-
                nous" via the general message if needed.
- **UI**      : a single `<select>` with a `— Année —`
                placeholder, no free-text escape. Validation
                requires a concrete year.
- **gotchas** : on a new year, `new Date().getFullYear()` does
                not auto-change the pre-rendered options because
                Astro SSRs once at build. Acceptable : a year of
                staleness is worth nothing compared to a rebuild
                every 1 Jan. Owner-flag : redeploy annually ;
                else add a tiny build-time script.
- **cross-ref** : ADR-003.

### T-pac-pieces-multiselect  Part-types multi-select

- **data**    : `src\data\part-types.js`, ~25 common items
                derived from `src\data\categories.js` top-level
                families (7) crossed with top sub-items.
- **UI pattern** : fieldset of checkboxes grouped by family
                (`<fieldset><legend>Freinage</legend>
                plaquettes / disques / étriers / flexibles</fieldset>`).
                Selected items render as removable chips above
                the fieldset.
- **search**  : a small text filter on top of the fieldset that
                hides rows not matching — client-side, zero
                debounce needed on 25 items.
- **a11y**    : checkboxes are the gold standard for multi-select
                accessibility. Each has a visible label. Chips
                region has `aria-live="polite"` so screen readers
                announce additions / removals.
- **submit**  : `pieces_selected` EmailJS param = joined-by-comma
                chip labels.
- **cross-ref** : ADR-003, `db.md` W04.5 FORMS.

### T-pac-whatsapp-colour  WhatsApp brand surfaces must use brand green

- **rule**    : ADR-006. Official palette : fill `#25D366`, hover
                `#128C7E`, glyph white (or green on white).
- **where**   : `src\components\StickyBar.astro`, `contact.astro`
                contact cards, `Header.astro` desktop CTA if one,
                any future CTA in category pages.
- **antidote** : V1 `contact.astro:87` renders on `bg-sky-400` —
                must migrate. Phase 1 audit catches it.
- **cross-ref** : ADR-006, `db.md` W04.3 (tokens / brand colour
                guidance generalises — candidate promotion to
                `db.md` W04.3 if repeated on two projects).

### T-pac-chatbot-tree  Chatbot intent tree structure

- **shape**   :
    ```ts
    type ChatNode = {
      id: string;
      prompt?: string;        // bot-spoken line, optional
      buttons?: Array<{ label: string; goto?: string; action?: ChatAction }>;
      end?: boolean;          // leaf
    };
    type ChatAction =
      | { kind: 'link'; href: string; newTab?: boolean }
      | { kind: 'tel'; number: string }
      | { kind: 'wa'; prefill: string }
      | { kind: 'devis'; prefill?: Record<string, string> }
      | { kind: 'close' };
    ```
- **minimum 15 intents** (per roadmap Phase 3 DoD) :
    1. **welcome** → "Bonjour ! Je suis un assistant automatique
       — posez-moi une question rapide ou choisissez un thème."
    2. **horaires** → reads from `STORE.horaires`, formats, offers
       "appelez-nous" + "itinéraire".
    3. **adresse** → reads `STORE.adresse.full`, map link,
       directions.
    4. **services** → list of 6 services, link to `/services`.
    5. **mondial-relay** → short explainer of the USP +
       link to devis.
    6. **retrait-magasin** → short explainer + horaires link.
    7. **devis** → explains flow + CTA "ouvrir le formulaire".
    8. **wa** → `wa.me/...` deep link with welcome prefill.
    9. **tel** → `tel:` click-to-call.
    10. **piece-specifique** → "Je ne peux pas chercher une
        pièce précise ici. Pour un devis rapide, [ouvrir le
        formulaire]." — hand-off, no part-ref guessing.
    11. **paiements** → list from `STORE.paiement`.
    12. **marques** → top-8 brand names + "Voir le catalogue" link.
    13. **tiktok** → `STORE.social.tiktok` link.
    14. **avis-google** → `STORE.avis.googleBusinessUrl` link.
    15. **mentions-legales** → internal link.
- **fallback** : any unmatched user text routes to a single
                "Je n'ai pas compris — voici des options"
                node listing devis + WhatsApp + appel.
- **cross-ref** : ADR-004, `blacklisted.md` "no hallucinated
                part refs", `db.md` W04.5 (chatbot concerns
                forms UX).

### T-pac-plate-uses  Plate d'immatriculation — V2 uses catalogue

- **a. Auto-fill devis form** : the primary win. Plate → marque /
     modele / annee / motorisation. User can edit any field.
- **b. "Mon véhicule" persistence** : localStorage key
     `pac-last-vehicle`. Header chip, category page "compatible"
     indicator.
- **c. Category → devis prefill** : "Demander un devis pour ma
     [marque] [modele] [annee]" CTA per category page, plate
     auto-included when available.
- **d. WhatsApp deep link prefill** : `Bonjour, pour mon
     [marque] [modele] [annee] motorisation [motor], je cherche
     [catégorie]`.
- **e. Mentions légales disclosure** : data-source + RGPD.
- **f. Progressive UX** : as user types `AA-123-`, the input mask
     advances, a small loader shows once the 3rd group is filled,
     the result card reveals with a fade-up.
- **g. Debounced lookup** : 500 ms after last keypress when the
     masked value matches the canonical regex.
- **h. V3 — "Mon garage" account** : Oscaro-style saved vehicles
     tied to Supabase auth. Out of V2 scope.
- **UX caution** : the plate is PII-adjacent. Always show a
     transparent "nous ne conservons pas votre plaque" micro-
     note next to the input. Server logs hash only.
- **cross-ref** : ADR-005, `db.md` W04.13.D automotive recipe.

### T-pac-oscaro-patterns  Patterns lifted from oscaro.com for V2

> **2026-05-06 update** : this short summary is **superseded by**
> `da-oscaro-playbook.md` for granularity. Read the playbook first.
> What follows is the bullet-list cheat-sheet only; the playbook
> has the audit-grade dissection (22 H2s, file-by-file refactor,
> rhythm targets, etc.).

- **vehicle-selector first** : every page carries a compact
    vehicle selector. Unset → inline "Renseignez votre véhicule"
    chip. Set → "Pour votre Clio IV 2018 • modifier" chip.
    **Hero IS the selector** on the home, not a brand image
    (playbook §2.4 + §7).
- **four ID paths** (Oscaro FAQ "Demande de conseil") :
    1. plate (ADR-005)
    2. VIN / carte grise (deferred V3 — requires OCR or a
       paid VIN decoder API)
    3. MMY cascade (marque dropdown → modèle → année → moteur)
    4. "Mon garage" (V3)
- **card-first layout** : image top + title + 1-line benefit +
    single CTA. No price on cards (we are vitrine). **Flat at
    rest** : no shadow, ~6 px radius, hover = border-darken not
    lift (playbook §6).
- **one search bar** on the catalogue index (free text), plus
    pills for family filters. Complex filters collapse behind a
    "Filtrer" / "Affiner" button on mobile.
- **trust strip icons** : Mondial Relay · Retrait · Devis 24 h ·
    Conseil pro. No marquee. **Repeated twice** on the home —
    once under hero, once near the footer (Oscaro pattern P6).
- **footer depth** : 5-6 columns — Catégories · Services ·
    Entreprise · Mentions · Contact — with a condensed
    sitemap-style list each.
- **typography tightening** : 1-2 weights per page max, generous
    line-height (1.55-1.7 body).
- **catalog density** : the home is a CATALOG INDEX, not a
    brochure. Oscaro shows 22 H2s on the homepage; we target
    12-15 H2s on ours (playbook §6 rhythm rule).
- **what NOT to port** : Oscaro's red/orange brand palette, their
    shopping cart, their pricing blocks, their newsletter
    section, their app banner. V2 stays marine + sky + white,
    vitrine, no checkout (playbook §4).
- **cross-ref** : ADR-008 (charter), ADR-011 (execution),
    `da-oscaro-playbook.md` (canonical), roadmap Phase 5.

### T-pac-fetch-cf-via-wayback  Fetching CF-blocked sites via Wayback CDX

- **why**     : Cloudflare / Akamai bot protection blocks the
    Cascade `read_url_content` fetcher on most auto-parts
    pure-players (Oscaro, Mister-Auto, Auto-Doc, Carter-Cash all
    return a "Just a moment…" challenge stub of ~5 KB instead
    of the real page). Same problem with `curl` + a real UA
    (CF challenges JS, not just UA fingerprints).
- **fix**     : the Internet Archive proxies the real content
    via its Wayback Machine. Two-step :
    1. Query the CDX API for a recent `200 OK` snapshot:
       ```
       curl "https://web.archive.org/cdx/search/cdx
         ?url=<host>
         &from=20240101&to=20260101
         &limit=10
         &output=json
         &filter=statuscode:200
         &filter=mimetype:text/html"
       ```
       The response is `[[fields...], [row...], …]`. Pick a row's
       `timestamp` (column 1) and `original` URL (column 2).
    2. Fetch the snapshot directly :
       ```
       curl -sL --compressed --max-time 60 \
         -A "Mozilla/5.0 ..." \
         "https://web.archive.org/web/<timestamp>/<original>" \
         -o snapshot.html
       ```
       Returns the full HTML the visitor would have seen on
       `<timestamp>`. ~ 280 KB raw for Oscaro home; ~ 73 KB once
       `<script>` / `<style>` / `<!--…-->` are stripped.
- **caveats** :
    * Wayback can be 503 (`No server is available`) on the CDX
      endpoint sporadically — retry a few times.
    * Snapshots are stale by design. For UX patterns this is
      fine (UI rhythm changes slowly); for live data (prices,
      promo banners) use a different source.
    * The snapshot HTML carries a `<script>` injection from
      `web.archive.org` (the wombat banner) — strip it before
      analysis.
- **what we did 2026-05-06** : pulled
    `web.archive.org/web/20240212200310/https://www.oscaro.com/`,
    saved the stripped output at
    `.project-store\references\oscaro-snapshot-2024-02-12.html`,
    confirmed structural facts (22 H2s, vehicle-selector hero,
    trust band repeat) — basis of `da-oscaro-playbook.md`.
- **cross-ref** : `log.md` D-2026-05-06,
    `da-oscaro-playbook.md` §1 (methodology), `db_store\db.md`
    W05 candidate promotion as `T-fetch-cf-blocked-via-wayback`.

### T-pac-verification-stack  The 3-command close-out

- **command 1** : `npx astro check` — TypeScript + Astro
    frontmatter + props. Catches type regressions.
- **command 2** : `npm run build` — full production build.
    Catches PostCSS / Tailwind invalid utilities (V1 J2 lost a
    day to `hover:bg-marine-800/8` — Tailwind has no `/8` step)
    and SSR-time module evaluation errors (Leaflet at top level).
- **command 3** : `npm run dev` — runtime. Catches parser errors,
    React hydration mismatches, UX visual regressions.
- **rule**    : every session closes with all three green. No
    exceptions. ~2 min total.
- **cross-ref** : `plan\progress.txt` J1-J5 post-mortems,
    `db.md` W05 PB-web-verification-stack.

### T-pac-asset-fallback  Brand logos + image fallback pipeline

- **rule**    : V1 already implements the fallback (14/15 brand
    logos committed; ATE falls back to a typographic badge). The
    pattern must survive V2. See `src\lib\public-asset.ts` +
    conditional render in `index.astro` / `[slug].astro`.
- **refresh** : `npm run assets:brand-logos` on any new brand
    added to `src\data\brands.js`. Idempotent — skips already-
    present SVGs.
- **cross-ref** : `db.md` L-2026-05-03-018, W04.6 T-asset-fallback
    + T-asset-build-check.

### T-pac-email-placeholder  Email address placeholder handling

- **state**   : `STORE.contact.email` is a placeholder
    (`contact@piecesauto-colomiers.fr`) flagged with
    `emailIsPlaceholder: true`. The contact page renders a
    "(adresse provisoire — à venir)" micro-note.
- **flip**    : when the client supplies the real email, update
    `STORE.contact.email` + flip `emailIsPlaceholder` to `false`.
    Audit : EmailJS template recipient too (`PUBLIC_EMAILJS_TO_EMAIL`
    env var).
- **gotcha**  : do not remove the flag mechanism entirely when
    flipping — keep the code path. Future clients may need the
    same bootstrapping affordance.

## Lessons (L-YYYY-MM-DD-NNN) — project-scoped

### L-2026-05-04-001  [owner-feedback, DA, palette]

- **symptom**       : Owner perceives V1 as "yellow-heavy" and
                      misaligned with the logo, despite the palette
                      having been DERIVED from the logo (D4).
- **root cause**    : V1 D4 sampled every dominant hex the logo
                      contains — including a ~2% pixel count
                      decorative yellow arc — then applied them
                      at EQUAL hierarchy (CTA primary = the
                      yellow). The sampling was faithful; the
                      APPLICATION inverted the hierarchy visible
                      to a human.
- **wrong assumption** : "every hex in the logo is a brand-dominant
                      candidate". In reality, visual area / weight
                      / contrast choose what reads as brand, not
                      raw presence.
- **fix**           : ADR-001 palette reset — yellow micro-only ;
                      marine + sky + white dominant.
- **verification**  : visual side-by-side of logo vs V2 palette
                      renders during Phase 1 + owner sign-off.
- **prevention rule** : when sampling a palette from a logo, weight
                      each colour by its proportional area in the
                      source and by its presence in the brand's
                      dominant reading (e.g. skim-thumbnail test).
                      Reject any colour with < 10% area as a
                      primary / CTA candidate. **Candidate for
                      promotion to `db.md` W04.3 ARTISTIC** as a
                      new T-palette-sampling-hierarchy tip.

### L-2026-05-04-002  [owner-feedback, social proof]

- **symptom**       : V1 shipped 3 labelled placeholder
                      testimonials alongside 1 synthesised-from-
                      Google one — owner flatly rejects any on-
                      site invented or synthesised review
                      content.
- **root cause**    : D32 tried to "bootstrap" the social-proof
                      section with invented content, even
                      transparently labelled. Labels are not
                      enough — the presence of invented words
                      is itself the problem.
- **fix**           : ADR-002 — link to real Google reviews,
                      never transcribe / rewrite them.
- **prevention rule** : NEVER ship invented social proof, even
                      with explicit placeholder badging. Real
                      review surfaces are either linked or
                      live-embedded. **Candidate for promotion
                      to `db.md` W04.13 GENERIC PATTERNS**.

### L-2026-05-04-003  [api, france, plate, rgpd]

- **symptom**       : An owner-friendly description of a
                      "type the plate, get the vehicle" form,
                      tagged "API.gouv", cannot be built against
                      API.gouv at all.
- **root cause**    : `particulier.api.gouv.fr`'s
                      `ants/extrait_immatriculation_vehicule`
                      API REQUIRES FranceConnect + the vehicle
                      OWNER's own authentication. It is a
                      citizen-facing "give me MY data" API,
                      not a merchant plate-lookup API. SIV
                      lookups for the general public are
                      commercial — ~€59/mo shelf.
- **fix**           : ADR-005 — two-stage strategy (free format-
                      validation first, paid SIV gated on
                      budget). Transparent disclosure in
                      mentions-legales when the paid lookup
                      ships.
- **prevention rule** : before promising an "API.gouv" flow,
                      read the API's authentication spec end-to-
                      end. "It's a .gouv.fr URL" does not mean
                      "it's usable for merchants without
                      owner-auth". **Candidate for promotion to
                      `db.md` W04.2 BUSINESS-DATA** as a new
                      T-plate-api-auth-gates tip.
- **verbatim evidence (2026-05-04 deep research)** :
  From `particulier.api.gouv.fr/catalogue/ants/extrait_immatriculation_vehicule`:
  * *"à destination exclusive des collectivités dans la cadre
    de la tarification du stationnement résidentiel"*
  * *"Modalité d'appel — FranceConnect + Identifiant de
    l'immatriculation du véhicule"*
  * CGU API Particulier — *"ne pas commercialiser les données
    reçues et à ne pas les communiquer à des tiers en dehors
    des cas prévus par la loi"*
  Adjacent paths : Habilitation SIV (R.322-1 Code route) is
  for carte-grise pros doing registration writes, not B2C
  reads. API Entreprise is for administrations. CADA Avis
  20165168 (09/02/2017, Défavorable) confirms SIV commercial
  reuse is licence-gated. **No free api.gouv.fr B2C plate-
  lookup channel exists** for a SARL retailer. Citations are
  audit-ready in `decisions.md` ADR-005 Evidence subsection.

### T-pac-cascade-without-plate  Replace plate lookup with marque/modèle/année cascade (Oscaro pattern)

- **what**    : if ADR-005 option (c) is picked (plate lookup
                dropped, recommended absent SIV budget), the
                devis form delivers ~80 % of the same UX via a
                cascade : marque (ADR-003 dropdown) → modèle
                (depends on marque) → année (ADR-003 select) →
                motorisation (text or picker). Same downstream
                result : an enriched devis with vehicle data.
- **data**    : `src\data\vehicle-models.js` — keyed by marque
                id, each entry an array of common modèles.
                Don't try to be exhaustive ; a "Autre" entry on
                each level is the escape hatch.
- **why this is fine** : Oscaro itself offers cascade as a
                co-equal alternative to plate. Mister-Auto, Yakarouler,
                Pièces Discount all do too. Plate lookup is a
                "delight" feature, not table stakes.
- **savings** : zero API budget, zero PII surface, zero rate-
                limit, zero RGPD disclosure (the plate is the
                PII-adjacent piece, not the marque/modèle).
- **antidote to feature regret** : keep an optional free-text
                "Plaque (facultatif)" input on the devis form,
                no validation, just captured for the team to
                cross-check against the cascade. Owner can
                upgrade to plate lookup later without form
                rework.
- **cross-ref** : ADR-005 Evidence option (c), ADR-003 cascade,
                ADR-008 Oscaro patterns.

## Open loops (known gaps, deferred work)

1. **Real Google reviews count + average** — owner supplies, or
   we fetch once via a Place Details one-shot (requires a key).
2. **Real contact email** — client to supply.
3. **EmailJS credentials** — client to create the account + fill
   the 3 env vars.
4. **SIV API budget greenlight** — ADR-005 Phase 4.1 gate.
5. **Last brand SVG** (ATE) — optional, text badge fallback
   acceptable per V1 fallback pattern.
6. **Custom domain decision** — pre-launch owner call.
7. **Client direct feedback** — to capture in `boss-feedback.md`
   after the V2 preview is shared with Kais / Salah.
8. **Dark mode** (proactive proposal #4) — owner pick-n-choose.
9. **Newsletter** (proactive proposal #6) — owner pick-n-choose.
10. **PWA install prompt** (proactive proposal #5) — owner pick-
    n-choose.
