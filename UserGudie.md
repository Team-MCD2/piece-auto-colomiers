# Pièces Auto Colomiers — Site V1

Site vitrine pour **Pièces Auto Colomiers** (SARL, RCS Toulouse 950 624 175), magasin
de pièces auto neuves multi-marques basé au 22 rue Gustave Eiffel, 31770 Colomiers.

V1 = site informationnel + lead-gen (devis 24 h, WhatsApp Business). Pas d'e-commerce.

---

## ⚡ Quick start

Pré-requis : **Node 20+** et **npm 10+**.

```powershell
# 1. Installation des dépendances
npm install

# 2. Téléchargement des fonts self-hosted (Oswald + Inter)
npm run fonts:install

# 3. Génération des assets brand (favicons, og-image)
#    Nécessite que /images/logo.jpg existe.
npm run assets:brand

# 4. Démarrage du dev server (http://localhost:4321)
npm run dev
```

Le site est désormais **100% fonctionnel en local** avec sa charte graphique, son
catalogue (47 catégories), ses 6 services, sa FAQ et ses pages légales.

---

## 🏗️ Stack

| Couche | Choix | Raison |
|---|---|---|
| Framework | **Astro 4** (statique) | Performance max, JS minimal |
| Styles | **Tailwind CSS 3** + tokens custom | Vélocité + cohérence DA |
| Interactivité | **React 18** islands ponctuels | Carrousels, lightbox (J3+) |
| Icônes | **lucide-react** + SVG inline | Tree-shaking + zéro dépendance pour les SVG critiques |
| Hébergement | **Vercel** (free tier) | CDN edge, déploiement Git |
| Fonts | **Bunny Fonts** mirror, self-hosted | Pas de Google Fonts CDN (lesson Mon Boum V3) |
| Images | **sharp** + Pexels API | Pipeline build local, attribution propre |
| Vidéo | **yt-dlp + ffmpeg** | Auto-host TikTok MP4 (D31, D34) |

---

## 📁 Structure projet

```
Pièces_auto_Colomiers/
├── images/                       # Assets sources fournis par le client (logo, storefront)
│   ├── logo.jpg                  # ← logo source (input scripts)
│   └── Front_image.jpg           # ← façade magasin
├── plan/                         # Documentation de planification (synthesis, plan.md, quickref, decisions)
├── public/                       # Assets servis tels quels par Astro
│   ├── assets/
│   │   ├── logos/                # Sortie process-brand-assets
│   │   ├── store/                # storefront.jpg optimisé
│   │   ├── categories/           # 47 photos (Pexels) — fetch-images
│   │   ├── tiktoks/              # MP4 + posters — tiktok-download
│   │   └── icons/                # SVG sociaux (tiktok, etc.)
│   ├── fonts/                    # woff2 self-hosted — download-fonts
│   ├── favicon-*.png, icon-*.png, og-image.jpg, manifest.webmanifest, robots.txt
├── scripts/                      # Pipeline build local
│   ├── process-brand-assets.mjs
│   ├── download-fonts.mjs
│   ├── tiktok-download.mjs       # Nécessite yt-dlp + ffmpeg dans PATH
│   └── fetch-images.mjs          # Nécessite PEXELS_API_KEY (sinon Picsum fallback)
├── src/
│   ├── components/               # Header, Footer, StickyBar, Logo (Astro components)
│   ├── data/                     # Source de vérité contenu (store, categories, services, faq, etc.)
│   ├── layouts/Layout.astro      # Shell HTML maître + JSON-LD
│   ├── pages/                    # 7 pages : index, catalogue, services, notre-magasin, contact, mentions-legales, 404
│   └── styles/globals.css        # Variables CSS, @font-face, utilitaires sémantiques
├── astro.config.mjs
├── tailwind.config.mjs           # Tokens DA (marine, signal, charcoal, offwhite, sky)
├── postcss.config.cjs
├── package.json
├── tsconfig.json
└── README.md (ce fichier)
```

---

## 🎨 Charte graphique

| Token | Valeur | Usage |
|---|---|---|
| `marine-800` | `#0F2C5A` | Fond principal, header, footer |
| `signal-400` | `#F5C518` | CTA primaire (jaune signalétique) |
| `sky-400` | `#3FA9F5` | Accents secondaires, badges B2B |
| `offwhite-50` | `#F4F6F9` | Fond doux des sections claires |
| `charcoal-800` | `#1F2933` | Texte principal |
| Display font | **Oswald** (500-700) | H1-H3, eyebrow, CTAs |
| Body font | **Inter** (400-600) | Paragraphes, formulaires, badges |

Tous les tokens sont déclarés dans `tailwind.config.mjs` et utilisables via les
classes `bg-marine-800`, `text-signal-400`, etc. Voir aussi `src/styles/globals.css`
pour les utilitaires sémantiques (`btn-primary`, `card-interactive`, `container-tight`).

---

## 🛠️ Scripts npm

```powershell
npm run dev               # Serveur dev (Astro, port 4321)
npm run build             # Build prod statique (output: dist/)
npm run preview           # Preview du build local
npm run fonts:install     # Télécharge Oswald + Inter dans public/fonts
npm run assets:brand      # Régénère favicons + og-image depuis images/logo.jpg
npm run assets:tiktok     # Télécharge top N TikToks (yt-dlp requis)
npm run assets:images     # Récupère photos catégories depuis Pexels
npm run assets:all        # Lance les 4 scripts d'assets en série
```

---

## 🔧 Setup avancé

### Pexels API (recommandé pour les visuels catalogue)

1. Inscription gratuite sur <https://www.pexels.com/api/>
2. Créer `.env.local` à la racine :
   ```
   PEXELS_API_KEY=votre_clé_ici
   PUBLIC_SITE_URL=https://pieces-auto-colomiers.vercel.app
   ```
3. Lancer `npm run assets:images`

Sans clé : le script utilise `picsum.photos` (placeholders aléatoires, OK pour dev mais à remplacer avant prod).

### TikTok auto-host (J2+)

Pour récupérer les vidéos `@pieces.auto.colomiers` en MP4 self-hosted :

1. Installer **yt-dlp** : <https://github.com/yt-dlp/yt-dlp/releases> (mettre dans PATH)
2. Installer **ffmpeg** : <https://ffmpeg.org/download.html> (mettre dans PATH)
3. Vérifier : `yt-dlp --version` et `ffmpeg -version`
4. Lancer `npm run assets:tiktok`

Les MP4 (~5 MB chacun) atterrissent dans `public/assets/tiktoks/` et `src/data/tiktoks.js` est régénéré automatiquement avec les métadonnées.

### Logo source

Placez le logo client dans `images/logo.jpg` (carré ou ratio proche). Le script
`process-brand-assets.mjs` génère :

- `public/assets/logos/logo.png` (320×320)
- `public/assets/logos/logo-mark.png` (256×256, pour favicons)
- 5 favicons + apple-touch-icon + 3 icons PWA + og-image (1200×630)

---

## 🚀 Déploiement Vercel

1. `git push` vers le repo lié à Vercel
2. Vercel détecte Astro automatiquement (framework preset)
3. Variables d'env à définir côté Vercel :
   - `PUBLIC_SITE_URL` = `https://pieces-auto-colomiers.vercel.app` (ou domaine custom)
   - `PEXELS_API_KEY` = (optionnel, pour ré-fetch images en CI)

Le `npm run build` génère un site statique pur dans `dist/` — pas de runtime serveur
nécessaire, donc compatible avec n'importe quel hébergeur statique (Netlify, Cloudflare
Pages, GitHub Pages, etc.).

---

## 🗺️ Roadmap V1 (J1 → J5)

| Jour | Livrables |
|---|---|
| **J1** ✅ | Scaffold complet, charte, Layout/Header/Footer/StickyBar, 7 pages stub fonctionnelles, 4 scripts pipeline, 8 modules data |
| **J2** | Home enrichie (8 sections), photos catégories réelles, témoignages slider, "Why us" section, marques fournisseurs grid |
| **J3** | Catalogue avec filtres pills (véhicule, famille), 47 fiches catégorie individuelles, search anchors |
| **J4** | DevisForm fonctionnel (EmailJS + photos upload), StoreMap Leaflet sur /notre-magasin, page services enrichie |
| **J5** | TikTokGrid sur home + /notre-magasin, polish a11y (Lighthouse 95+), perf audit, rédaction finale, déploiement Vercel |

---

## 📜 Mentions légales & RGPD

- **Source données entreprise** : Pappers (consultation publique, D14)
- **Discipline V1** : narratif anonymisé pour les co-gérants (D40) — RCS et SIREN exposés (obligation légale L123-1), noms personnels non publiés sans accord explicite
- **Logos équipementiers** (Bosch, Valeo, NGK, etc.) : usage informationnel sous L713-6 CPI (fair-use marque) — voir `/mentions-legales`
- **Photos catégories** : Pexels (licence libre avec attribution dans `src/data/credits.json`)

---

## 🤝 Contribution

Le projet suit les conventions documentées dans `plan/quickref.md` (round 3).
Décisions clés et leçons (Mon Boum V3 → V1 PAC) consignées dans `plan/cascade-plan.md` et `plan/synthesis.md`.

**Avant tout commit** :

1. Vérifier `npm run build` passe sans warning
2. Tester le rendu mobile (375px) ET desktop (1280px)
3. Vérifier les ancres et liens internes (Header, Footer, breadcrumbs)
4. Garder les fichiers data (`src/data/*.js`) comme **source de vérité unique** — pas de hardcode dans les pages

---

## 🆘 Support

- Téléphone : **05 31 22 34 94** (Lun-Ven 8h30-18h, Sam 9h-13h)
- Adresse : 22 rue Gustave Eiffel, 31770 Colomiers
- WhatsApp : voir lien dans le footer
- Issues techniques : ouvrir un ticket dans le repo Git
