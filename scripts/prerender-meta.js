/*
 * Build-time meta pre-rendering.
 *
 * This site is a client-side SPA, so link-preview crawlers (WhatsApp, iMessage,
 * Slack, Facebook, X) never run the JavaScript that sets per-page <title> and
 * og: tags via Helmet. They read the raw HTML and stop there — which means every
 * shared link previews with the default homepage title.
 *
 * This script runs after `vite build` and writes a real static HTML file for
 * each route listed below, with that route's meta tags baked into the markup.
 * Vercel serves the static file when one exists, so crawlers get correct tags
 * while browsers still boot the same SPA and behave exactly as before.
 *
 * To add a route: add an entry to ROUTES. Nothing else needs changing.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE = 'https://ammarbass.com';

const ROUTES = [
  {
    path: 'chefina',
    title: 'Chef Ina | Retreat Catering for Yoga & Wellness Retreats',
    description:
      'Private retreat chef for yoga and wellness retreats across the UK and Europe. Culinary-trained, yoga-teacher-led cooking that works with the rhythm of your retreat day.',
    image:
      'https://images.unsplash.com/photo-1681657687044-9bde75edb38e?w=1200&q=80',
    imageAlt: 'A long table set for a shared meal',
    // Draft page — keep it out of search results.
    noindex: true,
  },
];

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

let written = 0;

for (const r of ROUTES) {
  const url = `${SITE}/${r.path}`;

  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    r.noindex ? `<meta name="robots" content="noindex, nofollow" />` : '',
    `<link rel="canonical" href="${url}" />`,
    // Open Graph — WhatsApp, iMessage, Facebook, LinkedIn, Slack
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Chef Ina" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:image" content="${esc(r.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="675" />`,
    `<meta property="og:image:alt" content="${esc(r.imageAlt)}" />`,
    // Twitter/X
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${esc(r.image)}" />`,
  ]
    .filter(Boolean)
    .join('\n    ');

  // Drop the template's own <title> and description so they cannot win.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/i, '');

  html = html.replace(/<\/head>/i, `    ${tags}\n  </head>`);

  const outDir = join(DIST, r.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf8');

  written += 1;
  console.log(`  prerendered meta → /${r.path}/index.html`);
}

console.log(`✓ meta pre-render complete (${written} route${written === 1 ? '' : 's'})`);
