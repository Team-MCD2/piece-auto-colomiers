/**
 * Tailwind config — Pièces Auto Colomiers
 * V2 DA per `.project-store\decisions.md` ADR-001 (palette reset),
 * ADR-006 (WhatsApp brand green), ADR-007 (épurée canon).
 *
 * Tokens reflect the logo's DOMINANT trio (marine + sky + white) ;
 * yellow demoted to micro-accent (focus-ring on dark backgrounds +
 * optional warn / attention badge). It is NEVER a CTA fill, eyebrow
 * default, separator stripe, shadow tint, or background gradient.
 *
 *  - #0F2C5A → marine.800 (BASE BRAND — dominant fill, headers, hero)
 *  - #5BA8D9 → sky.400    (BASE BRAND — accents, links, eyebrow)
 *  - #F4F6F9 → offwhite   (section background, never pure white)
 *  - #25D366 → brand.whatsapp (third-party brand colour, never tinted)
 *
 * Phase 1 D-2026-05-13d : yellow `signal-*` retiré des classes Tailwind
 * publiques. Conservé sous `colors.accent.signal.*` (deep path) pour qu'une
 * éventuelle réintroduction décorative ne soit qu'une ligne de migration.
 * Aucune classe Tailwind raccourcie `signal-*` n'est plus possible.
 *
 * Cf. `.project-store\decisions.md` ADR-001..008 for the full V2 canon.
 * V1 D4 sampling kept (hex tokens unchanged) ; only USAGE rules pivot.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class', // pas activé V1, mais classe prête
  theme: {
    extend: {
      colors: {
        // Marine — fond dominant, headers, footer, hero, sections "trust"
        marine: {
          50:  '#E6EBF3',
          100: '#C2CDDF',
          200: '#9AAAC8',
          300: '#7388B0',
          400: '#4F6A99',
          500: '#2E4F82',
          600: '#1F3D6E',
          700: '#152E58',
          800: '#0F2C5A', // BASE BRAND — extrait du logo
          900: '#0A1F44',
          950: '#06122A',
        },
        // Bleu ciel — liens, accents secondaires, sky-stripe sous hero
        sky: {
          50:  '#EBF4FB',
          100: '#CCE3F4',
          200: '#A3CDE9',
          300: '#7AB7DE',
          400: '#5BA8D9', // BASE BRAND — extrait du logo
          500: '#3F90C5',
          600: '#3076A8',
          700: '#235A85',
          800: '#173E60',
          900: '#0C233A',
        },
        // accent.signal — ARCHIVÉ. Owner F8 (2026-05-04) : "stick only to the
        // colors on the logo". L'UI publique est strictement marine + sky +
        // white + WhatsApp-green. Le jaune logo reste sous ce deep path pour
        // qu'une réintroduction décorative future soit `text-accent-signal-400`
        // (long, intentionnel, audit-friendly). Aucune classe `signal-*` racc.
        // ne doit réapparaître. Cf. Phase 1 DoD (D-2026-05-13d).
        accent: {
          signal: {
            50:  '#FEF9E0',
            100: '#FCF1B6',
            200: '#F9E682',
            300: '#F7DC4F',
            400: '#F5C518',
            500: '#D9A906',
            600: '#B98A02',
            700: '#956C03',
            800: '#6F5005',
            900: '#4A3506',
          },
        },
        // Off-white — fond clair par défaut (jamais blanc pur, fatigue oculaire)
        offwhite: {
          DEFAULT: '#F4F6F9',
          50:  '#FAFBFD',
          100: '#F4F6F9',
          200: '#E8ECF2',
        },
        // Brand third-party — jamais teinté dans la palette du site (ADR-006).
        brand: {
          whatsapp:      '#25D366', // WhatsApp brand green
          'whatsapp-dark': '#128C7E', // WhatsApp hover / active
        },
        // Charcoal — textes principaux et secondaires sur fond clair
        charcoal: {
          50:  '#F2F4F7',
          100: '#D9DEE6',
          200: '#B0B9C8',
          300: '#8794A8',
          400: '#5F6E86',
          500: '#3F4B5F',
          600: '#2C3547',
          700: '#1E2532',
          800: '#13181F',
          900: '#080A0E',
        },
      },
      fontFamily: {
        // Oswald — display (lettering proche du logo, condensé bold)
        display: ['Oswald', 'system-ui', 'sans-serif'],
        // Inter — body (lisibilité optimale, accents FR)
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.05', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', fontWeight: '700' }],
        'h2': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.25', fontWeight: '600' }],
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '600', textTransform: 'uppercase' }],
      },
      spacing: {
        'section': 'clamp(3rem, 8vw, 6rem)',
        'section-sm': 'clamp(2rem, 5vw, 3.5rem)',
      },
      maxWidth: {
        'prose': '68ch',
        'container': '1200px',
        'narrow': '880px',
      },
      borderRadius: {
        'card': '14px',
        'pill': '9999px',
      },
      boxShadow: {
        'card':       '0 1px 2px rgba(15,44,90,.04), 0 8px 24px -8px rgba(15,44,90,.08)',
        'card-hover': '0 4px 8px rgba(15,44,90,.06), 0 16px 40px -8px rgba(15,44,90,.16)',
        // V2 (ADR-001) — CTA shadow tinted marine, plus de jaune.
        'cta':        '0 4px 0 0 #0A1F44, 0 8px 16px -4px rgba(15,44,90,.32)',
        'cta-hover':  '0 2px 0 0 #0A1F44, 0 4px 8px -2px rgba(15,44,90,.42)',
        'inset-line': 'inset 0 -1px 0 rgba(15,44,90,.08)',
      },
      backgroundImage: {
        // Phase 1 D-2026-05-13d (ADR-007 épurée canon) : suppression de
        // `diagonal-stripe` et `hex-pattern`. La synthesis §6 mentionnait un
        // motif hex 4% opacité, mais le pivot Oscaro impose le silence
        // graphique — fonds plats marine/offwhite, accents par typo et
        // `title-accent` (trait courbe sky) uniquement.
        // Dégradé hero (marine → marine-700) — seul backgroundImage retenu.
        'gradient-hero': 'linear-gradient(135deg, #0F2C5A 0%, #152E58 50%, #1F3D6E 100%)',
      },
      animation: {
        // Legacy — kept pour compat
        'marquee':         'marquee 32s linear infinite',
        'fade-up':         'fade-up 0.6s cubic-bezier(.2,.8,.2,1) both',
        'fade-in':         'fade-in 0.4s ease-out both',
        // V2 motion primitives (ADR-007 épurée — "subtle, not flashy")
        'fade-up-sm':      'fade-up-sm 0.5s cubic-bezier(.2,.8,.2,1) both',
        'fade-down':       'fade-down 0.4s cubic-bezier(.2,.8,.2,1) both',
        'scale-in':        'scale-in 0.4s cubic-bezier(.2,.8,.2,1) both',
        'slide-in-right':  'slide-in-right 0.35s cubic-bezier(.2,.8,.2,1) both',
        'slide-in-bottom': 'slide-in-bottom 0.35s cubic-bezier(.2,.8,.2,1) both',
        'shimmer':         'shimmer 1.8s linear infinite',
        'pulse-soft':      'pulse-soft 2.4s cubic-bezier(.4,0,.6,1) infinite',
        'draw-stroke':     'draw-stroke 0.9s cubic-bezier(.2,.8,.2,1) both',
        'bounce-soft':     'bounce-soft 1.6s cubic-bezier(.4,0,.6,1) infinite',
        'count-up':        'fade-up-sm 0.6s cubic-bezier(.2,.8,.2,1) both',
      },
      keyframes: {
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up-sm': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-bottom': {
          '0%':   { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '.55' },
        },
        // SVG stroke reveal — used by `.title-accent` when data-reveal="true"
        'draw-stroke': {
          '0%':   { strokeDashoffset: '112' },
          '100%': { strokeDashoffset: '0' },
        },
        'bounce-soft': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-3px)' },
        },
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(.2,.8,.2,1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      // Background sizes used by shimmer skeletons
      backgroundSize: {
        'shimmer': '200% 100%',
      },
    },
  },
  plugins: [],
};
