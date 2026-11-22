# Dr. Karishma Prajapat – Clinic Website

React + Vite + TypeScript + Tailwind (v3) + Framer Motion + React Router. Frontend-only: no backend, database or secrets.

## Run locally

```bash
npm install
cp .env.example .env      # optional: set VITE_SITE_URL
npm run dev
```

Add the real doctor photo as `public/doctor.webp` (about 960×1200, WebP). Until then a labelled placeholder is shown.

## Quality commands

`npm run typecheck` · `npm run lint` · `npm run format` · `npm test` (Vitest + Testing Library) · `npm run build` · `npm run e2e` (Playwright + axe; run `npx playwright install chromium` first)

## Typography

Manrope (headings, logo, navigation, buttons, uppercase labels) and Inter (body, forms, articles), loaded from Google Fonts in `index.html`. Everything is defined once as CSS variables at the top of `src/index.css` (`--font-heading`, `--font-body`, and the `--fs-*` / `--lh-*` / `--ls-*` scale for mobile, tablet ≥640px and desktop ≥1024px); `tailwind.config.js` reads them. Use `font-heading` for Manrope and the `text-display | h1 | h2 | h3 | lead | small | caption | ui` size tokens. Plain `h1`–`h3` elements pick up the scale automatically. Use `.eyebrow` for uppercase labels and `.reading` for long-form text.

## Deploy (Netlify / Vercel / Cloudflare Pages)

Build command `npm run build`, publish directory `dist`. `public/_redirects` handles SPA routes on Netlify; on Vercel add a rewrite of `/(.*)` to `/index.html`. Set `VITE_SITE_URL` to the final domain before building so the sitemap, canonical links and QR code use it.

## Where things live

- `src/config/clinic.ts` – the only place for clinic facts (phone, address, links). Timings are intentionally "to be confirmed".
- `src/data/content.ts` – specialities and articles (shaped for a future CMS/API).
- `src/lib/faq.ts` – deterministic chatbot; swap `answerQuestion` for a call to a backend proxy later (never put an AI key in the frontend).
- `src/lib/whatsapp.ts`, `src/lib/validate.ts` – enquiry flow.

## Needs clinic confirmation

Doctor photo and biography, consultation timings, final domain, second phone number (earlier brief listed one), Google Maps pin, clinic photos, and review of all educational text by the doctor.
