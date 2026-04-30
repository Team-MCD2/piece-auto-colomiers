/**
 * Tailwind config — Pièces Auto Colomiers
 * DA verrouillée par le logo client (D4) : marine + bleu ciel + jaune signalétique.
 *
 * Tokens dérivés de :
 *  - #0F2C5A → marine.800 (couleur dominante de l'écusson, fond du badge)
 *  - #5BA8D9 → sky.400   (bleu ciel accent, partie haute du badge)
 *  - #F5C518 → signal.400 (jaune signalétique, trait courbe + accents)
 *  - #F4F6F9 → offwhite   (fond clair par défaut, jamais blanc pur)
 *
 * Cf. plan.md §6 (DA tokens) et synthesis.md §6 (analyse formelle du logo).
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
        // Jaune signalétique — CTA primaire, accents, trait courbe du logo
        signal: {
          50:  '#FEF9E0',
          100: '#FCF1B6',
          200: '#F9E682',
          300: '#F7DC4F',
          400: '#F5C518', // BASE BRAND — extrait du logo
          500: '#D9A906',
          600: '#B98A02',
          700: '#956C03',
          800: '#6F5005',
          900: '#4A3506',
        },
        // Off-white — fond clair par défaut (jamais blanc pur, fatigue oculaire)
        offwhite: {
          DEFAULT: '#F4F6F9',
          50:  '#FAFBFD',
          100: '#F4F6F9',
          200: '#E8ECF2',
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
        'cta':        '0 4px 0 0 #B98A02, 0 8px 16px -4px rgba(245,197,24,.4)',
        'cta-hover':  '0 2px 0 0 #B98A02, 0 4px 8px -2px rgba(245,197,24,.5)',
        'inset-line': 'inset 0 -1px 0 rgba(15,44,90,.08)',
      },
      backgroundImage: {
        // Lignes diagonales subtiles (séparateurs sections, D35)
        'diagonal-stripe': 'repeating-linear-gradient(135deg, transparent 0 24px, rgba(245,197,24,.08) 24px 25px)',
        // Hex pattern subtle (sections foncées, 4% opacité — D35)
        'hex-pattern': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='46' viewBox='0 0 40 46'><polygon points='20,2 38,12 38,34 20,44 2,34 2,12' fill='none' stroke='%23F5C518' stroke-opacity='0.04' stroke-width='1'/></svg>\")",
        // Dégradé hero (marine → marine-700)
        'gradient-hero': 'linear-gradient(135deg, #0F2C5A 0%, #152E58 50%, #1F3D6E 100%)',
      },
      animation: {
        'marquee':  'marquee 32s linear infinite',
        'fade-up':  'fade-up 0.6s cubic-bezier(.2,.8,.2,1) both',
        'fade-in':  'fade-in 0.4s ease-out both',
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
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(.2,.8,.2,1)',
      },
    },
  },
  plugins: [],
};
