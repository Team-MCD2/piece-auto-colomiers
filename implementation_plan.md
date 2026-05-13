# Phase 6 — Oscaro-Grade Upgrade: Full Overhaul

> [!NOTE]
> The `contact.astro` escaping bug (`\\'` in `CROSS_SELL_DATA`) has been **fixed** and verified with a clean `npm run build`.

---

## Decisions Locked In (from user feedback)

- **Google Reviews**: Copy manually into `testimonials.js` — no scraping, no iframe.
- **3D / Video**: No 3D source available. Use YouTube tutorial/explainer videos for ALL sections. Find relevant videos per category. Sections without YouTube matches get generated imagery.
- **Partner SVGs**: Refurbish ALL existing 15 SVGs to match real official logos. Add 1-2 more brands with real SVGs. Mobile = full color; Desktop = grayscale → color on hover.
- **"Prospection / diagnostic"**: Same as "Demander un devis". All pages must lead to devis.
- **Year data**: Confirmed OK (goes up to 2026). No bug.

---

## Proposed Changes

### A. Dynamic Contact Form — Car-Specific Piece Dropdown + Multi-Select (CRITICAL)

> [!IMPORTANT]
> The "pieces" field in the contact form must be a **dropdown** whose options are **strictly tailored to the selected car model**. A 2014 Honda must only show pieces for a 2014 Honda. This is an information coherence requirement across the entire website.

#### [MODIFY] [contact.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/contact.astro)

**What changes:**
1. Replace the free-text `message` textarea with a **multi-select piece picker**:
   - After user selects marque + modèle + année → populate a `<select>` with compatible categories (filtered by `CATEGORIES[].vehicles` matching the car type).
   - Selected pieces appear as **tag chips** with an `×` button to deselect.
   - Multiple pieces can be selected at once (like search filters).
   - Keep a small `<textarea>` below for free-text notes.
2. **Cross-sell suggestions** (Smart Devis) also rendered as **tag chips** with `×` — same UI pattern.
3. When arriving from a category page via `?cat=`, auto-add that category as a pre-selected tag.
4. If vehicle is in `localStorage`, auto-fill marque/modèle/année AND show the vehicle banner.

#### [NEW] [src/data/category-vehicle-map.js](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/data/category-vehicle-map.js)
- Maps `VEHICLE_TYPES` → compatible `CATEGORIES` slugs for the dynamic filtering.
- Used by contact form JS to populate the piece dropdown based on car type.

---

### B. Contact Page Layout Fix

#### [MODIFY] [contact.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/contact.astro)
- Widen the sidebar: change `lg:col-span-4` → `lg:col-span-5` and form `lg:col-span-8` → `lg:col-span-7`.
- Ensure email address doesn't text-wrap: add `break-all` → `break-words` or increase font sizing.

---

### C. Partner Logo SVGs — Hover & Mobile Color + Accuracy Audit

#### [MODIFY] [index.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/index.astro)
- ✅ **Already done**: Changed `grayscale group-hover:grayscale-0` → `md:grayscale md:group-hover:grayscale-0` (mobile = full color, desktop = grayscale → color on hover).

#### [MODIFY] Brand SVG Files (14 files in `/public/assets/brands/`)
- Audit each SVG to ensure they depict the ACTUAL logos of the companies.
- Fix `fill` values to use official brand colors (not monochrome black).
- Files to audit: `ate.svg` (952B — suspiciously small), `trw.svg`, `mobil-1.svg`, `hella.svg`, `bosch.svg`.
- Add 1-2 more brands with proper SVGs (e.g., Denso, LuK).

---

### D. Contextual WhatsApp Messages + Universal Diagnostic CTA

#### [MODIFY] Every page — WhatsApp CTAs
- When user clicks WhatsApp "Send" from a specific piece page, the pre-filled text must reflect:
  - The specific category/piece they were viewing.
  - Their saved vehicle (from `localStorage`).
- This already partially works via `wa-enhance` script — needs to be extended to ALL pages.

#### [MODIFY] [notre-magasin.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/notre-magasin.astro)
- Add marine-bg CTA section at bottom: "Besoin d'un diagnostic ?" with devis + WhatsApp + tel buttons.

#### [MODIFY] [catalogue/index.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/catalogue/index.astro)
- Add bottom CTA section (same pattern as homepage final CTA).

#### [MODIFY] [services.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/services.astro)
- Verify final CTA exists and links to devis. Add if missing.

---

### E. Educational FAQs — Every Page + Per Category (Problem/Solution)

#### [NEW] [src/data/category-faqs.js](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/data/category-faqs.js)
- Problem/solution format FAQs mapped to category slugs.
- Examples:
  - `plaquettes-de-frein`: "Vos freins grincent au freinage ?" → Pad wear explanation.
  - `courroie-de-distribution`: "Quand faut-il changer sa courroie ?" → Timing belt intervals.
  - `amortisseurs`: "Votre voiture rebondit ou tire d'un côté ?" → Worn shock signs.
  - `batterie`: "Votre voiture a du mal à démarrer le matin ?" → Battery diagnostics.

#### [MODIFY] [catalogue/[slug].astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/catalogue/%5Bslug%5D.astro)
- Add FAQ accordion section below piece description, above CTA footer.
- Include FAQs in JSON-LD schema for SEO.

#### [MODIFY] [services.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/services.astro)
- Add service-specific FAQ section.

#### [MODIFY] [notre-magasin.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/notre-magasin.astro)
- Add store/logistics FAQ section (parking, horaires, paiement).

#### [MODIFY] [catalogue/index.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/catalogue/index.astro)
- Add general catalogue FAQ section.

---

### F. Real Google Reviews — Replace All Placeholders

#### [MODIFY] [src/data/testimonials.js](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/data/testimonials.js)
- Remove ALL placeholder testimonials (`placeholder: true`).
- Keep the 1 real Google review.
- Since there's only 1 real review, duplicate the AvisWidget "card" variant linking to Google for social proof.
- All testimonials must have `verified: true, source: 'Google'` and link to `STORE.avis.googleBusinessUrl`.

#### [MODIFY] [index.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/index.astro) — Testimonials section
- Remove placeholder badges entirely.
- Add prominent "Laisser un avis sur Google →" CTA button.

#### [MODIFY] [AvisWidget.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/components/AvisWidget.astro)
- Ensure real score and count are displayed (already using `STORE.avis.google`).
- The 5-star button must link directly to `STORE.avis.googleBusinessUrl`.

---

### G. Category Hero Enhancement + YouTube Videos

#### [MODIFY] [src/data/categories.js](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/data/categories.js)
- Add optional `video: string` (YouTube embed URL) to each category.
- ALL categories must have at least a relevant video.
- Source: search YouTube for "[category name] tutoriel remplacement" and pick the best French-language tutorial.

#### [MODIFY] [catalogue/[slug].astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/catalogue/%5Bslug%5D.astro)
- Add video embed section below the piece description when `cat.video` is present.
- Responsive 16:9 iframe with rounded corners and shadow.

---

### H. Remove ALL Placeholder / Generic Text (CRITICAL)

#### Audit every page:
- [index.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/index.astro) — Remove placeholder testimonial badges.
- [testimonials.js](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/data/testimonials.js) — Remove all `placeholder: true` entries.
- [contact.astro](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/pages/contact.astro) — Remove "adresse provisoire — à venir" badge if email still placeholder.
- [store.js](file:///c:/Users/Mommy%20Jayce/Desktop/Microdidact/Pièces_auto_Colomiers/src/data/store.js) — Check `emailIsPlaceholder` flag.
- All pages — grep for "placeholder", "provisoire", "à venir", "bientôt", "exemple" and remove/replace.

---

## Execution Order

| # | Task | Files | Est. |
|---|------|-------|------|
| 1 | Contact card sizing fix | `contact.astro` | 5 min |
| 2 | Remove placeholder testimonials | `testimonials.js`, `index.astro` | 10 min |
| 3 | AvisWidget real score + link fix | `AvisWidget.astro` | 5 min |
| 4 | Brand SVG audit + mobile color | SVG files, `brands.js` | 20 min |
| 5 | Category FAQs data file | `category-faqs.js` (NEW) | 20 min |
| 6 | FAQs on every page | `[slug].astro`, `services.astro`, `notre-magasin.astro`, `catalogue/index.astro` | 30 min |
| 7 | YouTube videos for all categories | `categories.js`, `[slug].astro` | 25 min |
| 8 | Universal diagnostic CTA | `notre-magasin.astro`, `catalogue/index.astro` | 15 min |
| 9 | Dynamic piece multi-select form | `contact.astro` (major rewrite of form section) | 45 min |
| 10 | Remove all placeholder text | All files | 10 min |
| 11 | Build verification | `npm run build` | 5 min |

---

## Verification Plan

### Automated Tests
- `npm run build` — must pass cleanly with 0 errors.
- `grep -r "placeholder" src/` — must return 0 user-visible placeholder text.

### Code Verification
- Contact form: selecting a car must filter the piece dropdown to compatible categories only.
- Multi-select: selected pieces render as tag chips with `×` deselect.
- `?cat=` param: auto-adds the category as a pre-selected tag.
- Every page has a FAQ section.
- Every page has a diagnostic/devis CTA.
- Brand logos: mobile = full color, desktop = grayscale → color hover.
- All testimonials are real (no placeholder badges).
- AvisWidget links to real Google Business page.
