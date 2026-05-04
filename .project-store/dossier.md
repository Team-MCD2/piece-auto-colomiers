# Project Dossier — Pièces Auto Colomiers

> The 5+ page big-picture document. Updated, not re-written.
> Ported from `db_store\archived\db-pre-rewrite-2026-05-03.md`
> (lines 773-835) + reconciled 2026-05-04 against the live repo
> at `c:\Users\Mommy Jayce\Desktop\Microdidact\Pièces_auto_Colomiers`.
> V1 planning detail lives in the in-repo `plan\` folder
> (`synthesis.md`, `plan.md`, `cascade-plan.md`, `progress.txt`,
> `quickref.md`) — cross-referenced rather than copied to keep
> this file the top-level picture.

---

## 1. Identity

| Field                  | Value                                                 |
|------------------------|-------------------------------------------------------|
| Internal project slug  | `P-pieces-auto-colomiers`                             |
| Display name           | Pièces Auto Colomiers                                 |
| Owner (dev)            | Mommy Jayce (Microdidact)                             |
| Client                 | SARL Pièces Auto Colomiers                            |
| Client legal           | SARL, capital 4 000 €, RCS Toulouse, SIREN 944 254 036 |
| Client gérants (privé) | Kais Amri · Salah Amri (not publicly exposed per V1 D40) |
| Client address         | 16 allée de l'Adour, 31770 Colomiers, France          |
| Client phone           | +33 5 64 72 37 26                                     |
| Client email           | `contact@piecesauto-colomiers.fr` (PLACEHOLDER per D16) |
| Client Google review   | `https://share.google/BGVy4jSC0uqq323oG`              |
| Client TikTok          | `@pieces.auto.colomiers`                              |
| Client Instagram       | absent (confirmed 2026-05-03 round 3 per D36)         |
| Client Facebook        | absent (confirmed 2026-05-03 round 3 per D37)         |
| Repo path              | `c:\Users\Mommy Jayce\Desktop\Microdidact\Pièces_auto_Colomiers` |
| Repo npm name          | `pieces-auto-colomiers` (kebab-case per V1 D26)       |
| Live URL (V1)          | `https://pieces-auto-colomiers.vercel.app` (no custom domain, per D18) |
| Custom domain          | not decided — pre-launch V2 owner call                |
| Status (as of 2026-05-04) | **V1 shipped, V2 ACTIVE** — owner lifted the V1 pause with a structured feedback list. See `owner-feedback.md` 2026-05-04. |
| Risk (homonymy)        | "COLOMIERS PIECES AUTO" SAS (SIREN 339 774 721, ZI En Jacca) is a DIFFERENT company. Never confuse. Never mention. |

## 2. Architecture

### 2.1 Site shape

- **Type**  : static vitrine site (no e-commerce, no backend
              persistence, no user accounts).
- **Pages** : 7 static routes + 47 dynamic catalogue fiches
              generated at build time via `getStaticPaths()` →
              54 pages total (confirmed in `plan\progress.txt` J5).

### 2.2 Stack

| Layer                  | Choice                                       |
|------------------------|----------------------------------------------|
| Framework              | Astro 5.1.1 (`"astro": "^5.1.1"`)            |
| Styling                | Tailwind CSS 3.4.17 + custom tokens          |
| UI islands             | React 18.2.0 (pinned, per V1 D12)            |
| Forms                  | `@emailjs/browser` 4.4.1                     |
| Maps                   | Leaflet 1.9.4 + `react-leaflet` 4.2.1, SSR-safe via `client:only="react"` (per V1 D16 Leaflet SSR lesson) |
| Icons                  | `lucide-react` 0.469.0 + custom server-rendered `LucideIcon.astro` + `src\icons\tiktok.svg` (CC0) |
| Images                 | `sharp` 0.33.5 (build-time pipeline)         |
| Fonts                  | Oswald + Inter, **self-hosted woff2** (no Google Fonts CDN, per V1 D11) |
| Sitemap                | `@astrojs/sitemap` 3.2.1                     |
| Type check             | `@astrojs/check` 0.9.4 + TypeScript 5.7.2    |
| Formatter              | Prettier 3.4.2 + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` |
| Hosting                | Vercel (static output)                       |
| Node engine            | `>=20.0.0` (see `package.json` + `.nvmrc`)   |

### 2.3 Island / rendering strategy

- Astro static output (`output: 'static'`) — 100% SSG. No runtime server.
- `client:only="react"` on `StoreMap.tsx` (Leaflet window touch).
- `client:visible` on `TikTokGrid.tsx` (lightbox grid, intersection
  observer).
- Vanilla TS mounted via `<script>` blocks on the catalogue index
  (filter pills + URL sync) and the devis form (validation + EmailJS).
- Planned V2 : `ChatbotWidget.tsx` (`client:idle`, rules-based),
  `PlateInput.tsx` (`client:idle`), `VehicleChip.tsx` (`client:idle`).

### 2.4 Feature-first folder layout

```
src\
  components\
    Footer.astro  Header.astro  Logo.astro  StickyBar.astro
    LucideIcon.astro  StoreMap.tsx  TikTokGrid.tsx
  data\
    brand-credits.json     # Wikimedia attribution per fetched logo
    brands.js              # 15 équipementiers
    categories.js          # 47 catégories × 7 familles × 4 véhicules
    credits.json           # Pexels + Unsplash image credits
    family-copy.js         # rédactionnel par famille
    faq.js                 # 12 Q&R (5 sur home)
    menu.js                # MAIN_NAV, FOOTER_NAV, breadcrumb helper
    services.js            # 6 services V1
    store.js               # identité légale, contact, horaires, avis, social
    testimonials.js        # [V1 shape — to be emptied per ADR-002]
    tiktoks.js             # stub — régénéré par scripts\tiktok-download.mjs
  icons\                   # SVG inline (tiktok)
  layouts\Layout.astro     # HTML shell + JSON-LD AutoPartsStore
  lib\public-asset.ts      # publicAssetExists() helper (build-time)
  pages\
    index.astro            # home 9 sections
    404.astro
    catalogue\index.astro       # 47 catégories groupées, filtres pills
    catalogue\[slug].astro      # fiche catégorie dynamique + Product JSON-LD
    contact.astro          # sidebar + devis + StoreMap
    mentions-legales.astro
    notre-magasin.astro
    services.astro
  styles\globals.css       # tokens + @font-face + utilitaires sémantiques
public\
  assets\
    brands\     # 14 SVG équipementiers (1 en fallback typographique)
    categories\ # 47 photos Pexels (vide par défaut, rempli par script)
    logos\      # généré par process-brand-assets depuis images\logo.jpg
    store\      # photo storefront (vide par défaut)
  fonts\        # Oswald + Inter woff2
  apple-touch-icon.png favicon-16.png favicon-32.png favicon.ico
  icon-192.png icon-512.png icon-maskable-512.png
  manifest.webmanifest og-image.jpg robots.txt
images\                    # sources client (gitignored ? check)
  logo.jpg                 # écusson marine / sky / blanc + micro-arc jaune
  Front_image.jpg          # storefront 16 allée de l'Adour
plan\
  base_instruction.md  cascade-plan.md  plan.md  progress.txt
  quickref.md  synthesis.md
scripts\
  download-fonts.mjs           # Oswald + Inter via Bunny Fonts mirror
  fetch-brand-logos.mjs        # Wikimedia Commons → public\assets\brands
  fetch-images.mjs             # Pexels → public\assets\categories
  process-brand-assets.mjs     # logo.jpg → favicons + og-image + icons PWA
  tiktok-download.mjs          # yt-dlp + ffmpeg → public\assets\tiktoks
astro.config.mjs  tailwind.config.mjs  postcss.config.cjs
package.json  tsconfig.json  .gitignore  .prettierrc  .nvmrc  .env.example
README.md  UserGudie.md
.project-store\                # this folder (created 2026-05-04)
```

### 2.5 Boundaries

- **Data / UI separation** : every business fact lives under
  `src\data\`. No hardcoded literals in pages or components.
  Violation of this invariant caught V1's hardcoded phone
  (L-2026-05-03-019) and is blacklisted for V2.
- **Feature deletability** : any future `src\features\<name>\`
  folder (V2 may introduce for chatbot / plate) must be
  self-contained — `rm -rf` removes 100 % of its code.

## 3. Environment contract

| Variable                         | Scope    | Purpose                                     |
|----------------------------------|----------|---------------------------------------------|
| `SITE_URL`                       | build    | Astro `site:` canonical override            |
| `PUBLIC_SITE_URL`                | client   | public canonical URL (used in JSON-LD, og)  |
| `PUBLIC_EMAILJS_SERVICE_ID`      | client   | EmailJS service — devis form                |
| `PUBLIC_EMAILJS_TEMPLATE_ID`     | client   | EmailJS template — devis form               |
| `PUBLIC_EMAILJS_PUBLIC_KEY`      | client   | EmailJS public key — devis form             |
| `PUBLIC_EMAILJS_TO_EMAIL`        | client   | Recipient email (placeholder V1)            |
| `PEXELS_API_KEY`                 | build    | Optional, for `scripts\fetch-images.mjs`    |
| `TIKTOK_USERNAME`                | build    | Default `pieces.auto.colomiers`             |
| `TIKTOK_TOP_N`                   | build    | Default 6                                   |
| `NOMINATIM_CONTACT_EMAIL`        | build    | Optional, OSM politeness for geocoding      |

### 3.1 V2 additions (roadmap-gated)

| Variable                         | Scope    | Phase | Purpose                         |
|----------------------------------|----------|-------|---------------------------------|
| `PUBLIC_CHATBOT_ENABLED`         | client   | P3    | Feature flag (default true)     |
| `PUBLIC_PLATE_LOOKUP_ENABLED`    | client   | P4.1  | Feature flag (default false)    |
| `SIV_API_KEY`                    | server   | P4.1  | Paid SIV API key (never public) |
| `PUBLIC_GOOGLE_PLACE_ID`         | build    | P5    | For optional live Place Details |
| `GOOGLE_PLACES_API_KEY`          | build    | P5    | Build-time reviews fetch        |

### 3.2 Env hygiene rules (inherited)

- `.trim()` every read at module boot (see `db.md` W04.1 T-env-boot-validate).
- Throw loudly on missing / malformed. No silent defaults.
- Re-paste each value in the Vercel UI (Save → Edit → re-Save) to
  purge trailing newlines (ref L-2026-05-03-008).
- `.env.example` lists names only, always committed. `.env`, `.env.local`,
  `.env.production`, `.env.development` gitignored.

## 4. Data map (source-of-truth modules under `src\data\`)

| Module              | Shape                                      | Cardinality     |
|---------------------|--------------------------------------------|-----------------|
| `store.js`          | Single `STORE` object, frozen. Identity, contact, hours, payments, avis, social, hebergeur. | 1 entity |
| `categories.js`     | 47 catégories, each `{ id, label, family, vehiculeTypes[], slug, synonyms }` | 47 items, 7 familles |
| `brands.js`         | 15 équipementiers, each `{ id, name, logo, tagline, families[] }` | 15 items (14 SVG + 1 fallback) |
| `services.js`       | 6 services, `{ id, title, badge, excerpt, bullets[], usp? }` | 6 |
| `faq.js`            | 12 Q&R, `{ id, q, a, onHome? }`            | 12 (5 on home)  |
| `testimonials.js`   | **V1**: 1 synthesised + 3 placeholders (to be emptied per ADR-002) | 4 → 0 in V2 |
| `tiktoks.js`        | Up to N videos, `{ id, views, duration, file, poster }` | ≤ 6 |
| `menu.js`           | `MAIN_NAV`, `FOOTER_NAV`, `breadcrumbLabel()` | — |
| `family-copy.js`    | Rédactionnel par famille (SEO + UX text)   | 7               |
| `brand-credits.json`| Wikimedia attribution per fetched logo     | 14              |
| `credits.json`      | Pexels / Unsplash credits for photos       | ≥ 47            |

### 4.1 V2 new modules

| Module                  | Shape                              | Rationale       |
|-------------------------|------------------------------------|-----------------|
| `vehicle-brands.js`     | 80-120 `{id, name}`                | ADR-003 marque dropdown |
| `part-types.js`         | ~25 grouped by family              | ADR-003 multi-select |
| `chatbot-tree.js`       | Tree of intents + nodes            | ADR-004 chatbot |
| `vehicle-family-fitment.js` (Phase 5) | mapping `marque/modele → familles compatibles` | Oscaro-grade compatibility indicator |

### 4.2 JSON-LD schema map

| Page                    | Schema types                                              |
|-------------------------|-----------------------------------------------------------|
| `index.astro`           | `AutoPartsStore` (global) + `FAQPage` (home FAQ) + `Organization` (footer) |
| `catalogue\index.astro` | `BreadcrumbList` + `ItemList`                             |
| `catalogue\[slug].astro`| `Product` + `Offer` + `BreadcrumbList` + `AutoPartsStore` (inherited) |
| `services.astro`        | `Service` per item + `FAQPage` (services FAQ inline)      |
| `notre-magasin.astro`   | `AutoPartsStore` + geo + openingHoursSpecification        |
| `contact.astro`         | `AutoPartsStore` + `ContactPoint`                         |
| `mentions-legales.astro`| `Organization` (legal)                                    |

### 4.3 Assets

- **Logos équipementiers** : 14 / 15 SVG via `fetch-brand-logos.mjs`
  (Wikimedia Commons), attribution in `brand-credits.json`. ATE
  falls back to typographic badge per `publicAssetExists()` gate.
- **Photos catégories** : Pexels + Picsum fallback via
  `fetch-images.mjs`, attribution in `credits.json`.
- **TikTok videos** : self-hosted MP4 + posters via
  `tiktok-download.mjs` (yt-dlp + ffmpeg external deps).
  Section auto-hidden if zero MP4s present on disk (build-time
  check via `publicAssetExists()`).
- **Brand** : `images\logo.jpg` + `images\Front_image.jpg` are
  client-provided; `process-brand-assets.mjs` derives favicons,
  apple-touch-icon, maskable icons, og-image 1200×630.

## 5. Deployment runbook

### 5.1 Branches

- `main` — deployable, matches prod on Vercel.
- `feat/<slug>` — features (V2 Phases 1-5 all live here, one per phase).
- `fix/<slug>` — V1 / V2 bug fixes.
- Squash-merge to `main`. Preview Vercel URL auto-generated per branch.

### 5.2 Pre-deploy checklist (V2 cadence)

1. `npx astro check` — 0 errors.
2. `npm run build` — 0 errors, 54 pages (± V2 additions).
3. `npm run dev` — spot check home + catalogue index + 1 fiche +
   contact + 404 + chatbot (V2).
4. `git log --all -p -- "*.env*"` — confirm no env file committed.
5. `grep -n "#F5C518\|signal-\(300\|400\|500\|600\|700\)" src\` — after
   Phase 1, only focus-ring / warn-badge hits remain.
6. Lighthouse mobile : Performance ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95.
7. Vercel env vars — Production AND Preview set; re-paste values
   to purge trailing newline (T-env-vercel-retrim from `db.md`).
8. Legal pages rendered and linked (mentions-legales + privacy +
   cookies). Google Business link tested.

### 5.3 Rollback

- Vercel Dashboard → Deployments → pick last-good → "Promote to
  Production". < 30 s. Data is static → no migration reversal.
- V2 keeps V1 rollback intact : each Phase ships as its own
  Vercel preview first; owner greenlights promotion.

### 5.4 Asset pipeline (one-time per content change)

- `npm run fonts:install` — Oswald + Inter woff2 subset, self-hosted.
- `npm run assets:brand` — favicons + og-image from `images\logo.jpg`.
- `npm run assets:brand-logos` — Wikimedia SVGs into `public\assets\brands`.
- `npm run assets:images` — Pexels photos into `public\assets\categories`.
- `npm run assets:tiktok` — yt-dlp + ffmpeg → `public\assets\tiktoks` +
  regenerates `src\data\tiktoks.js`.
- `npm run assets:all` — runs the four above sequentially.

## 6. Role matrix

Not applicable : public vitrine, no authentication, no roles.
The closest concept is the `audience` form field (`particulier`
vs `pro`) which prefills and drives the EmailJS subject / routing.
V3 candidate : auth + roles if "Mon garage" ever ships.

## 7. SEO baseline (V1 snapshot + V2 deltas)

- **Titles / meta** : unique per page, French, 50-60 chars title,
  140-160 chars description. Brand at end of title.
- **Canonical** : `PUBLIC_SITE_URL` or per-page canonical tag.
- **OG / Twitter** : 1200×630 og-image (generic V1); per-page
  dynamic og-image via `/api/og` Edge Function candidate for
  Phase 5.
- **Sitemap** : generated by `@astrojs/sitemap`, excludes 404.
- **robots.txt** : allow all + sitemap reference.
- **JSON-LD** : see §4.2 — schema types per page.
- **`lang="fr"`** : always.
- **`og:locale=fr_FR`** : in Layout.
- **Hreflang** : none (single language; V3 if multilingual).
- **Local SEO** : Mondial Relay + retrait magasin as featured USPs ;
  city / service long-tail landing pages candidate for V1.5
  (pièces 4x4 Colomiers, pièces japonaises Toulouse).

**V2 deltas affecting SEO**
- ADR-002 testimonials change does not touch JSON-LD (Organization
  + AutoPartsStore unaffected). If Phase 5 lands Place Details
  live embed, add `AggregateRating` to `AutoPartsStore` schema.
- ADR-007 "épurée" canon keeps text content intact ; regression
  risk is zero on SEO signal.
- Phase 5 Oscaro-pattern "compatible avec votre véhicule" on
  category pages adds internal links to devis with prefills —
  marginally positive for dwell time.

## 8. Observability

- **Runtime** : no runtime server — zero backend logs. EmailJS
  errors surface client-side with structured `console.error(err)`
  per `db.md` M06 (already implemented in `contact.astro:611`).
- **Build logs** : Vercel build log inspected for Tailwind invalid
  utilities, Astro type errors, missing env vars. Any warning
  escalated to "fail the build" in CI per `db.md` W04.11.
- **Analytics** : not implemented in V1. Phase 5 candidate is
  Vercel Web Analytics (adapter-injected — never manually per
  L-2026-05-03-003) OR Plausible self-host. Consent banner
  gates analytics tags.
- **Error sink** : none for V1 (static site, low blast radius).
  Consider `window.addEventListener('error' / 'unhandledrejection')`
  + a tiny `/api/client-error` Edge Function in Phase 5 if the
  chatbot / plate UX starts catching issues in the wild.
- **Client log-level rules** : structured `console.error(err, { context })`
  on every caught error (devis form fallback, chatbot tree node
  misses, plate lookup failures).

## 9. Open loops and risks

### 9.1 Open loops (dated, tracked)

| #   | Loop                                            | Owner    | ETA       |
|-----|-------------------------------------------------|----------|-----------|
| L01 | Real email address for `STORE.contact.email`    | Client   | V2 launch |
| L02 | EmailJS account + 3 env var values              | Client   | V2 launch |
| L03 | Real Google reviews count + average (for ADR-002) | Client / Cascade (Place Details one-shot) | Phase 2 |
| L04 | SIV API budget (~€59/mo) greenlight (ADR-005)   | Owner    | Phase 4.1 |
| L05 | Last brand SVG (ATE) or keep fallback           | Cascade  | Phase 5 or V3 |
| L06 | Custom domain decision                          | Owner    | pre-cutover |
| L07 | Client direct feedback on preview               | Client   | post-Phase 5 preview |
| L08 | Dark mode (proactive proposal #4)               | Owner    | decision needed |
| L09 | Newsletter (proactive proposal #6)              | Owner    | decision needed |
| L10 | PWA install prompt (proactive proposal #5)      | Owner    | decision needed |
| L11 | Verify V1 actual Vercel deploy URL + date       | Owner    | any time  |
| L12 | Palette greenlight on ADR-001 before Phase 1    | Owner    | immediate |
| L13 | Plaque format regex — validate old vs new plate formats on real samples | Cascade | Phase 4.0 |
| L14 | Chatbot intent tree — owner wording review pass | Owner    | Phase 3   |
| L15 | Remove legacy `testimonials.js` fabricated entries (ADR-002) | Cascade | Phase 2 |
| L16 | Reconcile `STORE.avis.google.count = 1` with "multitude" per feedback | Owner / Cascade | Phase 2 |

### 9.2 Risks

| Risk                                             | Impact        | Mitigation |
|--------------------------------------------------|---------------|------------|
| Homonym confusion "COLOMIERS PIECES AUTO" SAS    | legal / reputational | SIREN 944 254 036 hardcoded in `STORE`; no mention of the other entity; legal review when mentions-legales edited |
| Palette sweep leaves hex `#F5C518` in code       | inconsistent UI | grep-based pre-merge check (Phase 1 DoD) |
| SIV API spam / abuse                             | budget + PII risk | Edge Function rate-limit 10 req/IP/min + hashed rate-limit logs + `PUBLIC_PLATE_LOOKUP_ENABLED` kill-switch |
| Chatbot answers part references wrongly          | trust loss    | ADR-004 hard-gates to human hand-off; no LLM in V2.0 |
| Google Place Details quota exhausted             | live rating missing | build-time fetch + 24 h cache + static fallback rating |
| Client forgets to update EmailJS template vars   | form 400s     | form already falls back to mailto:; prominent README section on required env vars |
| Windows accented path `Pièces_auto_Colomiers`    | tool incompat | V1 D26 recommended kebab rename; deferred — tooling has held up so far; track |
| Client supplies new logo that no longer reads "marine + sky + white" | palette invalidated | ADR-001 scoped to APPLICATION, not the logo itself. New logo triggers a new ADR. |

## 10. KPIs

Baseline to measure pre/post V2 (set in Phase 6):

- **Time-to-first-devis** — event from home landing → devis submitted.
  V2 target : reduce by ~30 % vs V1 (dropdowns + chatbot redirect).
- **Devis form completion rate** — started / finished ratio.
  V2 target : ≥ 40 % (baseline unknown — collect from EmailJS
  template tag + Vercel analytics).
- **WhatsApp CTA click-through** — unchanged from V1 in absolute
  (same number), better attribution (brand green = higher CTR).
- **Lighthouse mobile** — Performance ≥ 90, A11y ≥ 95, BP ≥ 95,
  SEO ≥ 95. Hold through every Phase.
- **Bundle size per page** — hold or reduce vs V1 (palette simpli-
  fication + fewer decorative utilities should reduce CSS).
- **Google Reviews count / average** — upwards signal only ; not
  actively driven from the site, but the "voir nos avis" link +
  in-store encouragement should compound.
- **Chatbot deflection rate** (Phase 3+) — % of sessions where
  the chatbot closed without routing to devis / WhatsApp / tel.
  Healthy band : 20-40 %. Too low = tree gaps ; too high = users
  not reaching a human path for things that need one.

## 11. Cross-references

- **Cross-project manual** : `c:\Users\Mommy Jayce\db_store\db.md`
  (FATHER file — Part A / W00-W07 applies).
- **Archived pre-rewrite snapshot** : `db_store\archived\db-pre-rewrite-2026-05-03.md`
  lines 773-835 (this project's thin entry at rewrite time).
- **In-repo V1 planning** : `plan\synthesis.md` (why), `plan.md` (what),
  `cascade-plan.md` (where-we-were), `progress.txt` (J1-J5 trail),
  `quickref.md` (exec scan).
- **V2 decisions** : `.project-store\decisions.md` (ADR-001..008).
- **V2 roadmap** : `.project-store\roadmap.md` (Phases 1-6 + proactive proposals).
- **V2 project knowledge** : `.project-store\knowledge.md` (T-pac-* tips + L-2026-05-04-* lessons).
- **Feedback registers** : `.project-store\owner-feedback.md` + `.project-store\boss-feedback.md`.
- **Local bans / dead-ends** : `.project-store\blacklisted.md` + `.project-store\discarded.md`.
- **V1 identity sources** : Mappy POI, Pappers (944254036), Le Figaro
  Entreprises, Société.com, annuaire-entreprises.data.gouv.fr.

## 12. Changelog

| Date        | Who     | Change                                                                         |
|-------------|---------|--------------------------------------------------------------------------------|
| 2026-05-03  | Cascade | V1 scaffolded J1-J5 under previous planning (`plan\` docs). V1 shipped.        |
| 2026-05-03  | Owner   | Paused V2 (V1 entered production state).                                       |
| 2026-05-03  | Cascade | Pre-rewrite snapshot archived at `db_store\archived\db-pre-rewrite-2026-05-03.md` before `db.md` FATHER-file restructure. |
| 2026-05-04  | Owner   | V2 resumed with structured feedback (F1-F11) captured verbatim in `owner-feedback.md`. |
| 2026-05-04  | Cascade | `.project-store\` bootstrapped per M08. ADR-001..008 landed. Roadmap Phases 1-6 drafted. |
| 2026-05-04  | Cascade | 3 promotion-candidate lessons staged (L-2026-05-04-001..003) — proposal to append to `db.md` pending owner greenlight (`db_store\` edits are in M05's ask-first list). |
