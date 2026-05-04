# Architecture Decision Records — Pièces Auto Colomiers

> Each decision is small, numbered, dated. Record context, decision,
> consequences. Never rewrite a decision — if superseded, add a new
> ADR that references the old. V1 carried a D1..D40 decision log in
> `plan\cascade-plan.md`; those remain the V1 record and are
> referenced here when V2 supersedes or amends them.

---

## ADR-001  Palette reset — yellow demoted to micro-accent    [STATUS: active · SUPERSEDES V1 D4]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) — "the current
                      website's color doesn't fit their logo at ALL!
                      There're no instance of yellow in their logo,
                      poor work from you on this aspect."
                      Direct review of `images\logo.jpg` confirms
                      yellow is present but as a THIN decorative arc
                      under the crossed wrench + piston (~2% pixel
                      count). V1 D4 sampled `#F5C518` from that arc
                      and promoted it to `signal-400`, the primary
                      CTA fill + eyebrow + accent colour — which
                      owner correctly perceives as "yellow-heavy"
                      vs the logo's dominant marine + sky-blue +
                      white trio.
- **decision**      :
    1. Demote yellow from brand / CTA primary to MICRO-accent only.
       Allowed usages after ADR-001: focus rings (on dark
       backgrounds only), optional warn / attention badge.
       Disallowed usages: CTA fills, eyebrow text by default,
       separator stripes, shadow tints, background gradients.
    2. Elevate `sky` (the sky-blue already extracted from the
       logo interior, `#5BA8D9`) to secondary / accent primary —
       the dominant non-marine colour on light sections.
    3. Primary CTA fill moves to `marine-800` (`#0F2C5A`) on
       light backgrounds and white on marine backgrounds, with
       hover transitions to `marine-700` / `sky-300`.
    4. New `offwhite-50` (`#F4F6F9`) remains the section
       background. `marine-800` remains the header / footer /
       hero fill. Hex-pattern, diagonal-stripe, marquee USPs
       — re-evaluated for removal per ADR-007 (design canon).
- **consequences** :
  * positive : palette alignment with the owner's perception of
    the logo; modern / clean reading per F9 "jeune moderne
    épurée"; less visual noise on CTAs; Oscaro / modern auto
    parts brand feel closer.
  * negative : full sweep required across `tailwind.config.mjs`,
    `src\styles\globals.css`, `src\components\Logo.astro` (text
    colour `text-signal-400` on "Colomiers"), every `signal-*`
    Tailwind class in pages / components, shadow tokens
    (`shadow-cta` references yellow), background utilities
    (`bg-diagonal-stripe`, `bg-hex-pattern`). Scoped in
    roadmap Phase 1.
  * trade-off: the D4-era identity is lost. Rollback is a
    one-line tailwind change + commit revert, acceptable.

---

## ADR-002  Testimonials source of truth = Google Business only  [STATUS: active · SUPERSEDES V1 D23 + D32]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) — "les avis
                      googe existent deja sur google, donc no need
                      for fake ones - button aussi qui renvoie vers
                      les avis google (they have a multitude and
                      have good scores)". V1 shipped 1 real
                      synthesised Google entry + 3 placeholder
                      entries with "placeholder: true" flag and
                      explicit UI badges (D32 "hybrid"). Owner
                      rejects all on-site invented / synthesised
                      content; Google is the canonical surface.
- **decision**      :
    1. `src\data\testimonials.js` is emptied of fabricated /
       synthesised entries in V2. The `TESTIMONIALS` export
       either becomes `[]` or is removed entirely (callers must
       tolerate empty — they already do per D32 conditional
       render).
    2. Testimonials section on home renders a "Voir nos avis
       Google" surface : short copy + aggregate rating badge
       (hardcoded from `STORE.avis.google` if known, else
       generic) + large CTA button linking to
       `STORE.avis.googleBusinessUrl`. Opens in new tab with
       `rel="noopener noreferrer"`.
    3. `STORE.avis.google.count` and `.average` updated to
       reflect the current true numbers (owner to supply —
       see open loops in `dossier.md`).
    4. Optional Phase 5 enhancement: live Google Place Details
       fetch at build time (or via a `/api/reviews` Edge
       Function if we move off pure static) to display the
       latest N reviews dynamically. Gated by an explicit ADR
       amendment once the pricing and rate-limit is validated.
- **consequences** :
  * positive : zero fabricated content; trust signal points at
    a verifiable third-party source; aligns with `db.md` W04.13
    GENERIC PATTERNS "Review surface: link to Google /
    Trustpilot".
  * negative : fewer words on the home testimonial section in
    V2.0 until the Place Details live embed ships; CTR out to
    Google (small SEO consideration — acceptable, cost of
    honesty).

---

## ADR-003  Devis form overhaul — marque dropdown + annee select + pieces multi-select  [STATUS: active · extends V1 D24]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) on devis form
                      (see `src\pages\contact.astro` lines 167-177
                      for current V1 state). Marque is a free
                      `<input type="text">`, annee is a plain
                      `<input type="number">`, pieces are expressed
                      only in a free-text `<textarea>`. V1 D24
                      already DECIDED a dropdown for marque sourced
                      from Marno's brand list — never implemented.
                      Owner now restates + extends.
- **decision**      :
    1. **Marque véhicule** becomes a `<select>` populated from a
       new `src\data\vehicle-brands.js` source-of-truth module
       (~80-120 common European + Asian brands, alphabetical,
       with a leading "— Sélectionnez —" placeholder and a
       trailing "Autre" option). When "Autre" is chosen, a
       conditional `<input type="text" name="marque_autre">`
       field reveals inline with smooth transition (respecting
       `prefers-reduced-motion`). Submit uses the custom value
       when "Autre" is selected, dropdown value otherwise.
    2. **Annee** becomes a `<select>` listing years from the
       current year + 1 (new vehicles) down to 1980, descending.
       A leading "— Année —" placeholder. No free-text fallback
       (40+ years covers 99% of the real fleet).
    3. **Pieces recherchées** gains a multi-select alongside the
       free `<textarea>`. Multi-select pattern per `db.md` W04.5
       ACCESSIBILITY norms: a visible `<fieldset>` with checkbox
       group for the ~25 most common part types (derived from
       the existing `src\data\categories.js` 7 families ×
       top-items), searchable in-place, selections render as
       removable "chips" above the list. The `<textarea>`
       remains for specifics (OEM ref, dimensions, photos of
       the wear point).
    4. **Validation** : at least one of {multi-select has 1+
       item, textarea length ≥ 10} must be truthy. Error
       surfaces inline per W04.5.
    5. EmailJS template parameters extended: `pieces_selected`
       (comma-joined) + `marque_final` (the resolved value,
       custom or dropdown). `.env.example` updated in sync.
    6. Audit: every hardcoded list of brands in components is
       replaced by an import from `vehicle-brands.js`.
- **consequences** :
  * positive : reduced friction, fewer typos, faster devis
    replies for the SARL, data normalisation for analytics,
    accessibility upgrade (select + checkboxes beat free text
    for screen readers in this shape).
  * negative : ~120-line data addition, ~60 lines extra form
    logic, small bundle increase (<5 KB gzipped). All within
    the perf budget.

---

## ADR-004  Chatbot architecture — rules-first floating widget, lazy-loaded, no third-party cookies  [STATUS: active · un-discards V1 "no chatbot" rejection]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) — "ajouter un
                      chatbot. - little icon, which helps answer
                      basic questions, redirects, to contact (and
                      much more  - all i say are just ideas that
                      you must feed on to make more suggestions
                      that go in the same light -)". Research
                      surfaced : Typebot (fair-source,
                      self-hostable, visual builder, ~100 KB
                      embed), custom vanilla-JS rules widget
                      (~15 KB gzipped, zero-dep), hosted SaaS
                      (Crisp/Tidio/Intercom — per-message cost,
                      third-party cookies, RGPD surface).
- **decision**      :
    1. Build a **custom rules-based floating widget** in vanilla
       TS, rendered as a React island in `client:idle` mode.
       ~15-20 KB gzipped target. Lazy-loaded : only the
       floating button renders on first paint; the conversation
       panel loads on first click.
    2. Tree lives in `src\data\chatbot-tree.js` — branches by
       intent (horaires, adresse, services, devis, Mondial
       Relay, retrait magasin, WhatsApp, pièce spécifique).
       Each leaf offers up to 3 actions : next step in the
       tree, open the devis form (URL with prefill), deep-
       link to WhatsApp with pre-filled message, tel:
       click-to-call.
    3. For any "pièce spécifique" intent, the bot does NOT
       attempt to resolve OEM references — it routes directly
       to the devis form (with the intent text pre-filled)
       or WhatsApp. No hallucinated part numbers (see
       `blacklisted.md`).
    4. All bot-emitted messages carry a persistent "Assistant
       automatique — pour une réponse humaine, appelez ou
       WhatsApp" micro-footer. The widget headline says
       "Assistant rapide — pas un humain".
    5. No third-party cookies. No external API calls for V2.0.
       Telemetry: ship `window.plausible('chatbot-open', ...)`
       events if Plausible is added in Phase 5 (decisions
       deferred until analytics is in).
    6. Optional V2.5 : add an OpenAI-backed fallback ONLY for
       questions that fail all rule matches, gated by an env
       var `PUBLIC_CHATBOT_AI_ENABLED`, with an allow-list of
       categories (no part-ref answering, no pricing, no
       inventory claims). Off by default.
- **consequences** :
  * positive : zero vendor lock-in; RGPD-clean; matches "jeune,
    moderne, épurée" design intent (widget theme uses ADR-001
    palette); owner keeps full content control.
  * negative : implementation effort (~1 day) vs plugging
    in a SaaS (~1 hour). Offset by lower TCO and perfect fit.

---

## ADR-005  Plate immatriculation strategy — format-validate on free tier, paid SIV behind budget gate  [STATUS: active · un-locks V1 D2]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) — "pour les
                      plaques d'imatriculation, API.gouv.
                      l'utilsateurs entre, c'est verifie (checked
                      to make sure an instance exists) - as he
                      types (only towards the end or when he's
                      done), the suggestion pops up and he can
                      choose it. - ponder deeply and how many
                      different ways we can use the plaque
                      d'immatriculation here".
                      Research : api.gouv's
                      `ants/extrait_immatriculation_vehicule`
                      requires FranceConnect + vehicle OWNER's
                      auth — unusable for a merchant-side form.
                      Commercial SIV aggregators (e.g.
                      apiplaqueimmatriculation.com from ~€59/mo)
                      deliver the described flow but cost money.
- **decision**      :
    1. **Phase-4 V2.0 default (no budget)** : format-validation
       ONLY, client-side. Input is mask-formatted in the
       modern French pattern `AA-123-AA` (+ tolerant to the
       old `1234 AB 56` format). Validation happens on blur
       and on submit; an invalid pattern surfaces an inline
       error. No SIV lookup, no vehicle enrichment. The
       user still fills marque / annee (via ADR-003
       dropdowns).
    2. **Phase-4 V2.x (budget greenlit)** : server-side SIV
       lookup via `apiplaqueimmatriculation.com` (or
       equivalent audited alternative). Called from a Vercel
       Edge Function `/api/plate/:plate` that the client
       debounces at ~500ms after the user finishes typing the
       3rd group. Response : `{marque, modele, annee,
       motorisation}` — used to pre-fill the corresponding
       form fields, which remain editable. The API key lives
       in Vercel env only (never exposed client-side). Rate-
       limited per-IP in the edge function (10 req/min).
       Disclosed in `mentions-legales` with the data-source
       name.
    3. **Uses of the plate data once available (brainstorm,
       captured in `knowledge.md` T-pac-plate-uses)** :
         a. auto-fill devis form (marque / modele / annee /
            motorisation) at type-time — the primary UX win.
         b. save the last-entered plate in localStorage under
            a `pac-last-vehicle` key, surface as "Mon véhicule"
            chip in the header → devis form prefills when
            clicked.
         c. from a category page, a "Pour mon véhicule" CTA
            pre-fills devis + pre-selects compatible brand
            logos (where the brand-to-family mapping in
            `src\data\brands.js` and a future
            `vehicle-family-fitment.js` allows).
         d. WhatsApp deep link template "Devis pour [marque]
            [modele] [annee] [motorisation] — pièce : [cat]",
            with the plate optionally appended.
         e. mentions-legales page : data-source disclosure +
            RGPD note.
         f. suggestions pop-up : as the user types "AA-123-",
            the UX progressively reveals "continuer" → lookup
            → suggestion card — the flow the owner described.
         g. V3 candidate : "Mon garage" account feature
            mirroring Oscaro, tied to Supabase auth. Out of
            V2 scope.
    4. **Non-user-data paths** : the plate itself is considered
       PII-adjacent under RGPD (lookup reveals marque / annee
       of a vehicle tied to an owner). Decision : do NOT store
       server-side without explicit user consent; localStorage
       only for the user's own convenience. Server-side
       logging : HASHED plate + timestamp only (for rate
       limiting + abuse monitoring). Cleared after 30 days.
- **consequences** :
  * positive : staged delivery; format validation is free and
    ships immediately; SIV lookup adds real UX value when
    funded; legal exposure scoped.
  * negative : two passes (format-only then SIV) mean
    duplicated QA work. Mitigation : format validation stays
    even when SIV is on (SIV only pre-fills fields — user
    always can override).
  * open question : **budget greenlight for SIV API (~€59/mo
    ≈ €708/yr)** — owner / client to decide. Deferred to
    `dossier.md` open loops.

### Evidence (added 2026-05-04 — deep research pass after owner pushback)

The single api.gouv.fr endpoint exposing SIV data —
`particulier.api.gouv.fr/catalogue/ants/extrait_immatriculation_vehicule`
— cannot serve a merchant-side plate-lookup form. Three
constraints from the official catalogue page, **verbatim**:

> *"à destination exclusive des collectivités dans la cadre de
> la tarification du stationnement résidentiel. Elle ne peut
> être utilisée pour contrôler a posteriori le droit de
> stationnement."*

> *"Modalité d'appel — FranceConnect + Identifiant de
> l'immatriculation du véhicule"* — and the API only concerns
> particuliers who are **propriétaire / co-titulaire / locataire
> longue durée** of the vehicle. Not company vehicles, not
> non-owners.

> CGU API Particulier — *"ne pas commercialiser les données
> reçues et à ne pas les communiquer à des tiers en dehors
> des cas prévus par la loi"*

Adjacent paths reviewed and rejected for the same use case :

- **Habilitation au SIV** (Code de la route, Article R.322-1)
  is reserved for "professionnels de l'automobile" who
  télétransmettent registration acts (carte grise dealers,
  agréés). Pièces Auto Colomiers sells parts; out of scope.
  Even when granted, it provides WRITE access for registration
  events — not a B2C plate-lookup endpoint.
- **API Entreprise** (`entreprise.api.gouv.fr`) is restricted
  to administrations, not private SARL.
- **CADA Avis 20165168 (séance 09/02/2017, Défavorable)** —
  confirms commercial reuse of SIV data is restricted; the only
  legal path for a merchant is via private contract with an
  aggregator that itself holds the licence.

**Conclusion**: there is no free, lawful api.gouv.fr endpoint
for merchant-side plate-to-vehicle lookup. The two-stage
strategy in this ADR stands. **Owner choice required**:
  - **(a)** Phase-4 V2.0 only — free format-validation, no
    enrichment. User still fills marque / année / modèle from
    the ADR-003 dropdowns.
  - **(b)** Phase-4 V2.x — paid commercial SIV (~€59/mo) behind
    a Vercel Edge Function (server-side, key never exposed).
    Delivers the "type the plate, see the car" UX.
  - **(c)** Drop plate lookup entirely — replace the plate flow
    with the **marque / modèle / année / motorisation cascade**
    from ADR-003 + Oscaro pattern from ADR-008. Delivers ~80 %
    of the UX win with zero API cost, zero PII surface, zero
    rate-limit. **RECOMMENDED** if (b) budget is not greenlit:
    Oscaro itself offers cascade as a co-equal alternative to
    plate, so this is industry-standard, not a downgrade.

If owner picks (c), a fresh ADR-009 is added to lock that
choice and the plate field is removed from the devis form
(replaced with an optional free-text "Plaque (facultatif)" line
that is captured but not validated against any DB).

---

## ADR-006  WhatsApp brand green (#25D366) — never tinted into site palette  [STATUS: active]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) — "All whatsapp
                      instances should be in green (in their
                      original icon color)". V1 renders the
                      WhatsApp icon on `bg-sky-400` (see
                      `src\pages\contact.astro:87`). Brand green
                      is the universally recognised WhatsApp
                      colour; tinting undermines recognisability.
- **decision**      :
    1. All WhatsApp surfaces (icon background, pill CTA, sticky
       bar WhatsApp segment, chatbot "contact via WhatsApp"
       leaf) use the official WhatsApp brand green
       `#25D366` (or the darker `#128C7E` on hover) with a
       white glyph. On marine backgrounds, the brand green on
       white pill, with green glyph inside a white circle, is
       acceptable — but never a marine / sky / yellow-tinted
       WhatsApp mark.
    2. Token : add `whatsapp: '#25D366'` + `whatsapp-dark:
       '#128C7E'` to `tailwind.config.mjs` `colors.brand`
       sub-scope. Utility classes `bg-brand-whatsapp`,
       `text-brand-whatsapp`, `hover:bg-brand-whatsapp-dark`.
    3. Audit V1 — replace every WhatsApp CTA / icon background
       that is not brand-green.
- **consequences** :
  * positive : users recognise the CTA instantly; respects
    Meta's brand guidelines for the glyph; improves CTR on
    the WhatsApp path.
  * negative : introduces a colour token outside the brand
    trio — accepted because it is a third-party brand not ours.

---

## ADR-007  V2 design canon — "jeune, moderne, épurée"  [STATUS: active]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) — "le design
                      doit etre jeune moderne épurée - il faut
                      correctement canaliser cette phrase sinon
                      tu risque de ne pas faire du bon travail".
                      V1 leaned into "atelier pro" visual tropes
                      (marquee USPs, hex pattern, diagonal-stripe
                      separators, heavy display type). V2 pivots.
- **decision**      : The V2 visual canon is captured in
                      `knowledge.md` T-pac-design-canon. Summary :
    * **jeune (young)**   : generous whitespace; soft radii
                            (14-16 px on cards, 9999 px on
                            pills); bright `sky` accents on
                            otherwise mostly-white sections;
                            avoid all-caps blocks outside
                            eyebrows + logo; prefer sentence
                            case for body + CTAs.
    * **moderne (modern)** : card-first layout patterns borrowed
                            from Oscaro (see ADR-008 +
                            T-pac-oscaro-patterns); typography
                            system tightened (remove Oswald from
                            body paths where Inter suffices);
                            subtle motion (`fade-up` at 8-12 px
                            amplitude, not 16 px); no marquee; no
                            scroll-hijack.
    * **épurée (clean / minimalist)** : remove `bg-hex-pattern`
                            from all pages; remove
                            `bg-diagonal-stripe` from section
                            separators; keep page background
                            offwhite, sections alternate solid
                            `offwhite-50` vs `white`; max 2
                            font weights per page; fewer CTAs
                            per section (hero: 1 primary + 1
                            tertiary, not 2 primary).
- **consequences** :
  * positive : aligns with owner intent; closer to Oscaro's
    perceived quality bar; simpler CSS; better LCP.
  * negative : a chunk of V1 visual identity goes (hex pattern,
    stripes, marquee USPs). Mitigation : port the "trust
    strip" (Mondial Relay · Retrait · Devis 24h) from marquee
    to a static 3-icon strip — preserves the USP, loses the
    motion.

---

## ADR-008  Oscaro as V2 reference #1 — patterns to port, identity to avoid  [STATUS: active]

- **date**          : 2026-05-04
- **context**       : Owner feedback (2026-05-04) — "l'exemple
                      numero 1, c'est https://www.oscaro.com/ . dig
                      this website and get all its qualities all
                      what makes it great, better, more easy to
                      understand and use - and just all its
                      functionalities and the display, so we can
                      integrate the good stuff". Research :
                      Oscaro's FAQ confirms 4 vehicle-selection
                      paths (plate, VIN/carte grise, MMY cascade,
                      "Mon garage"). Site is a transactional
                      e-commerce pure-player; we are a vitrine
                      V2. Port UX patterns, never visual identity.
- **decision**      : Patterns LOCKED IN for V2 (detailed in
                      `knowledge.md` T-pac-oscaro-patterns) :
    1. **Persistent vehicle selector** at the top of every page
       once a vehicle is chosen (saved in localStorage as
       "Mon véhicule"). Appears as a compact chip in the
       header — click to edit, swap, or clear.
    2. **Entry points to vehicle ID** : plate (ADR-005) + MMY
       cascade (marque → modèle → année → motorisation) + a
       "Saisir manuellement" escape hatch. The "Mon garage"
       concept is V3 (requires auth).
    3. **Category pages** : break the current dense grid into
       a top-of-page vehicle selector + a compatibility
       indicator ("Compatible avec votre véhicule" /
       "Renseignez votre véhicule pour affiner") + the
       catalogue.
    4. **Card pattern** : image + title + a short benefit
       line + "Demander un devis pour mon véhicule" CTA. No
       prices (we are a vitrine, not a shop).
    5. **Trust strip** : simple, icon-led (Mondial Relay ·
       Retrait magasin · Devis 24h · Paiement sécurisé en
       magasin · Multi-marques), no marquee.
    6. **Search / catalogue filters** : a single search bar
       on the catalogue index + family pills; filters on
       category pages fold away on mobile behind a "Filtrer"
       button.
    7. **Footer depth** : Oscaro's footer is a 5-column
       organised index (Produits / Aide / Entreprise /
       Sécurité / Langue). Port the pattern but scoped to our
       reality (catégories / services / entreprise /
       mentions-légales / contact).
    8. DO NOT port : Oscaro's red/orange identity, their
       pricing blocks, their cart flow. We stay vitrine
       marine + sky + white.
- **consequences** :
  * positive : UX quality bar lifts substantially; "Mon
    véhicule" is an independent V2 feature that composes with
    ADR-003 form and ADR-005 plate.
  * negative : moderate engineering — localStorage state +
    header chip + category-page compatibility indicator are
    new surfaces. Scoped to roadmap Phase 5.

---

## Supersedes / amends register (cross-reference)

| This ADR | Supersedes / amends                | Nature                    |
|----------|------------------------------------|---------------------------|
| ADR-001  | V1 D4                              | palette downgrade         |
| ADR-002  | V1 D23, V1 D32                     | testimonials strategy     |
| ADR-003  | Extends V1 D24 (dropdown marque)   | adds year + pieces multi  |
| ADR-004  | Un-discards "chatbot pas V1"       | V2 lifts V1 rejection     |
| ADR-005  | Un-locks V1 D2 ("pas de plaque")   | V2 lifts V1 verrouillage  |
| ADR-006  | Refines V1 D29                     | adds strict brand colour  |
| ADR-007  | Amends V1 D35 (séparateurs)        | drops stripes + pattern   |
| ADR-008  | New                                | V2 reference bench        |
