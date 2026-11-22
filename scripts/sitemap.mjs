// Generates public/sitemap.xml from the slugs in src/data/content.ts. Runs before every build.
import { readFileSync, writeFileSync } from 'node:fs';
const site = (process.env.VITE_SITE_URL ?? 'https://karishma.personal.clinic').replace(/\/$/, '');
const src = readFileSync('src/data/content.ts', 'utf8');
const slugs = [...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const specs = slugs.slice(0, 8).map((s) => `/specialities/${s}`);
const posts = slugs.slice(8).map((s) => `/patient-education/${s}`);
const urls = [
  '/',
  '/about',
  '/specialities',
  '/patient-education',
  '/contact',
  '/visiting-card',
  '/privacy-policy',
  '/medical-disclaimer',
  ...specs,
  ...posts,
];
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n')}\n</urlset>\n`,
);
console.log(`sitemap: ${urls.length} urls`);
