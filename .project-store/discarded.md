# Discarded ideas for Pièces Auto Colomiers

> Things tried and rejected, with the reason. Keeps the team from
> re-proposing the same dead ends. If the owner confirms "never
> again", the corresponding AI-tell or banned pattern also lands
> in `blacklisted.md`.
>
> Entry template (ISO dates):
>
>     ## <Idea (one line)>
>     - tried on      : YYYY-MM-DD
>     - why rejected  : the actual constraint that killed it
>     - alternative   : what we did instead, or pointer to the
>                       decisions.md ADR / knowledge.md T-ID
>     - revisit if    : (optional) condition to reconsider

---

## V1 ideas formally discarded (for reference — do not re-propose)

## Yellow as CTA primary / brand-dominant colour
- tried on      : 2026-05-03 (D4 during V1 DA pass)
- why rejected  : 2026-05-04 owner feedback. Logo carries yellow
                  only as a thin decorative arc (~2% pixel count);
                  elevating it to CTA primary inverts brand
                  hierarchy. The site reads "yellow-heavy" to the
                  owner, not marine.
- alternative   : ADR-001 palette reset — marine + sky-blue +
                  white dominant, yellow reduced to micro-accent
                  only (focus rings, optional warn badge).
- revisit if    : owner or client explicitly asks for a yellow
                  CTA re-introduction in a later iteration.

## Synthesised / placeholder testimonials (D32 hybrid pattern)
- tried on      : 2026-05-03 (D32 during V1 build)
- why rejected  : 2026-05-04 owner feedback. Google reviews exist
                  with good scores — a real surface we can link to.
                  Synthesising or placeholder-ing testimonials
                  adds noise and a low-trust signal.
- alternative   : ADR-002 — testimonials section links out to the
                  real Google Business reviews surface via a
                  "Voir tous nos avis Google" button. No on-site
                  invented content. Optional: embed a live
                  rating badge via Google Place Details at runtime
                  (evaluated in Phase 5).
- revisit if    : the client actively collects long-form written
                  testimonials in-store (with consent) — then
                  on-site cards become fair game again.

## Embedding TikTok via iframe (Q14 round 2)
- tried on      : 2026-05-03 round 2 consideration
- why rejected  : 200+ KB JS tier, third-party cookies, RGPD
                  surface, no control over UX, possibly
                  rate-limited.
- alternative   : D38 — download via `yt-dlp`, self-host MP4s
                  under `public/assets/tiktoks/` with posters,
                  render via `TikTokGrid.tsx` island with sound
                  toggle. Stays.

## Clone of Motrio red/white identity
- tried on      : 2026-05-03 (D5 consideration)
- why rejected  : client is an independent, not a Renault network
                  franchise. Visual identity confusion with a
                  regulated brand.
- alternative   : DA extracted from the actual client logo —
                  marine + sky + (micro-)yellow per ADR-001.

## Homepage video hero (auto-playing)
- tried on      : 2026-05-03 V1 consideration
- why rejected  : asset weight, LCP hit, perf budget breach on
                  mobile; owner did not confirm a product reel.
- alternative   : static hero image (storefront) + subtle
                  `fade-up` animation respecting
                  `prefers-reduced-motion`.
- revisit if    : client provides a ~10-15 s brand reel ≤ 1 MB
                  H.264 / AV1, and the LCP analysis shows it
                  under the 2.5 s budget on mobile.

## Chatbot IA (as "not V1")
- tried on      : 2026-05-03 initial rejection in V1 plan
- why rejected at V1  : "pas de valeur réelle pour un vitrine
                  local" — correct call for a launch-day vitrine.
- alternative   : UN-DISCARDED for V2 per 2026-05-04 owner
                  feedback. See `decisions.md` ADR-004 for the
                  architecture (rules-first + optional AI
                  fallback) and `knowledge.md` T-pac-chatbot-tree
                  for the Q&A structure.

## Recherche par plaque d'immatriculation (V1 verrouillage D2)
- tried on      : 2026-05-03 initial verrouillage
- why rejected at V1  : explicit client instruction "site vitrine
                  pour l'instant, pas d'implémentation plaque
                  immatriculation". Fully respected in V1.
- alternative   : UN-DISCARDED for V2 per 2026-05-04 owner
                  feedback. See `decisions.md` ADR-005 for the
                  strategy (graceful format-validation on free
                  tier; optional paid SIV lookup behind a
                  greenlit budget).

## V2 ideas discarded at planning stage

## Using API.gouv `ants/extrait_immatriculation_vehicule` for a
   public "type the plate, see the vehicle" form
- tried on      : 2026-05-04 (considered after owner asked for
                  API.gouv plate flow)
- why rejected  : that API REQUIRES FranceConnect + the vehicle
                  owner's own authentication. A casual visitor
                  typing their plate into our form has no way to
                  authenticate as the vehicle's registered owner
                  at that moment. The API is designed for "I am
                  the owner, give me MY registration" flows, not
                  for a merchant-side plate-to-vehicle lookup.
- alternative   : ADR-005 proposes either (a) format validation
                  only (free, no enrichment), or (b) a paid
                  commercial SIV API (apiplaqueimmatriculation.com
                  ~€59/mo) called server-side. Owner picks the
                  strategy; both paths are documented.
- revisit if    : the government opens a merchant-authorised
                  channel without FranceConnect auth. No such
                  channel is announced for 2025-2026.

## LLM-backed chatbot that auto-answers part references
- tried on      : 2026-05-04 chatbot architecture discussion
- why rejected  : a model hallucinating OEM references, prices,
                  or compatibility statements is a liability
                  (returns, bad reviews, owner trust). Small
                  local shop, no part-compatibility DB on hand.
- alternative   : ADR-004 — rules-based tree for FAQ-class
                  questions (hours, address, services, devis
                  process, WhatsApp, Mondial Relay) + explicit
                  hand-off to devis form / WhatsApp / phone
                  whenever a part reference is involved.
- revisit if    : the client provides a structured parts
                  compatibility DB with canonical cross-refs.
                  Only then does AI assistance on part queries
                  become safe.

## Shipping the chatbot script on every page globally
- tried on      : 2026-05-04 integration pass
- why rejected  : even a small rules widget is ~15 KB gzipped,
                  loaded on every pageview, including SEO-critical
                  landing pages where it brings no value and taxes
                  the perf budget.
- alternative   : lazy-load the widget on first user intent
                  (floating button render only, script on click).
                  `knowledge.md` T-pac-chatbot-tree captures the
                  loader pattern.
