const scale = (name) => [
  `var(--fs-${name})`,
  { lineHeight: `var(--lh-${name})`, letterSpacing: `var(--ls-${name})` },
];

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#102B50',
        teal: '#13A6A6',
        'teal-dark': '#0B7A7A',
        rose: '#E9A3AF',
        bg: '#FAFBFD',
        'light-blue': '#F0F6FA',
        ink: '#263445',
        // #718096 fails WCAG AA for body text on white (~4:1); this darker muted token passes.
        muted: '#5A6678',
      },
      // Typography is defined once, as CSS variables, in src/index.css (:root).
      // Manrope = font-heading (headings, navigation, buttons, UI labels); Inter = font-sans (body, forms, articles).
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-body)'],
      },
      // Semantic type scale. Sizes, line-heights and tracking switch per breakpoint via the variables in index.css.
      fontSize: {
        display: scale('display'),
        h1: scale('h1'),
        h2: scale('h2'),
        h3: scale('h3'),
        lead: scale('lead'),
        body: scale('body'),
        small: scale('small'),
        caption: scale('caption'),
        ui: scale('ui'),
      },
      boxShadow: { soft: '0 1px 2px rgba(16,43,80,.06), 0 8px 24px rgba(16,43,80,.06)' },
    },
  },
  plugins: [],
};
