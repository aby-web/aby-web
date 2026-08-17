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

// Default share image for the main site — a 1200x630 crop of the hero.
const OG_HOME = `${SITE}/images/og-home.jpg`;
const OG_HOME_ALT = 'Ammar Bass seated in meditation at the Barbican, London';

const ROUTES = [
  {
    // The homepage. `path: ''` writes dist/index.html itself.
    path: '',
    title: 'Ammar Bass | Yoga Teacher London | Vinyasa, Handstands & Arm Balances',
    description:
      'London yoga teacher specialising in strong vinyasa, handstands and arm balances. Classes at HOME Wellness, Indaba, BXR, Yogarise and Flo. Workshops and retreats.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
  },
  {
    path: 'about',
    title: 'About Ammar Bass | London Yoga Teacher | Strength & Alignment Focus',
    description:
      'Vipassana meditation practitioner with a competitive swimming and powerlifting background. Teaching alignment-focused vinyasa across London, specialising in arm balances, inversions and biomechanics.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
  },
  {
    path: 'private-sessions',
    title: 'Private Yoga Sessions in West Hampstead | Ammar Bass',
    description:
      'One-to-one yoga in West Hampstead, London. Build strong foundations or work toward handstands and arm balances — sessions designed around you. Free 15-min discovery call.',
    image: `${SITE}/images/og-private.jpg`,
    imageAlt: 'Ammar Bass, yoga teacher in West Hampstead, London',
  },
  {
    path: 'events',
    title: 'Yoga Workshops & Retreats London | Ammar Bass Events',
    description:
      'Yoga workshops, arm balance intensives and retreats in London. Deepen your practice with events focused on alignment, inversions and strength.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
  },
  {
    path: 'practice',
    title: 'Free Practice Videos | Ammar Bass Yoga',
    description:
      'Free full-length yoga classes with Ammar Bass. Practice strength-based vinyasa flows, arm balances and mindful movement from home.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
  },
  {
    path: 'faq',
    title: 'FAQ | Ammar Bass Yoga | Common Questions Answered',
    description:
      'Questions about classes, private sessions, workshops and practice philosophy — everything worth knowing before training with Ammar Bass in London.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
  },
  {
    path: 'bootcamp',
    title: 'Yoga Intensive Bootcamp — Bulgaria 2026 | Ammar Bass',
    description:
      '5-day yoga intensive in Varna, Bulgaria. 4–9 September 2026. Forest setting, minutes from the beach. Progressive flow, workshops and immersive practice.',
    image: `${SITE}/images/og-bootcamp.jpg`,
    imageAlt: 'Forest cabins at the retreat venue near Varna, Bulgaria',
  },
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
  {
    path: 'coaching',
    title: 'Coaching for Founders & Senior Operators | London | Ammar Bass',
    description:
      'One-to-one coaching in London for founders and senior operators, taught through physical practice, by someone who spent years in finance first. Programmes of 7–10 sessions.',
    image: `${SITE}/images/og-private.jpg`,
    imageAlt: 'Ammar Bass, coaching and private sessions in London',
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
  const isHome = r.path === '';
  const url = isHome ? `${SITE}/` : `${SITE}/${r.path}`;

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

  // The homepage overwrites dist/index.html; every other route gets its own
  // directory so Vercel can serve it as a static file.
  let outFile;
  if (isHome) {
    outFile = join(DIST, 'index.html');
  } else {
    const outDir = join(DIST, r.path);
    mkdirSync(outDir, { recursive: true });
    outFile = join(outDir, 'index.html');
  }
  writeFileSync(outFile, html, 'utf8');

  written += 1;
  console.log(`  prerendered meta → /${r.path || ''}${isHome ? 'index.html' : '/index.html'}`);
}

console.log(`✓ meta pre-render complete (${written} route${written === 1 ? '' : 's'})`);
