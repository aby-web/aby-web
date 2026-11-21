/*
 * Build-time pre-rendering.
 *
 * The site is a React app. Left alone, every address returns the same nearly
 * empty HTML file and the browser builds the page with JavaScript — so
 * crawlers that don't run JavaScript (ChatGPT, Claude, Perplexity, WhatsApp
 * link previews) see no content at all.
 *
 * This script runs after the two Vite builds (see "build" in package.json):
 *
 *   vite build                              → dist/        the site itself
 *   vite build --ssr src/entry-server.jsx   → dist-ssr/    a Node version of the
 *                                                          pages (not published)
 *   node scripts/prerender.js               → writes each public page's full
 *                                             HTML into dist/<path>/index.html
 *
 * Which pages are pre-rendered, and their titles and descriptions, is decided
 * in ONE place: src/data/pages.js. Private pages (prerender: false there) are
 * not rendered; they are served dist/shell.html, an empty noindex page that
 * builds itself in the browser exactly as the whole site used to.
 *
 * The build fails, leaving the current live site up, if a page comes out
 * empty, without exactly one <title>, or containing anything key-like.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const { render, pages, londonToday } = await import(
  pathToFileURL(join(ROOT, 'dist-ssr', 'entry-server.js')).href
);

const fail = (msg) => {
  console.error(`\n✗ prerender failed: ${msg}\n`);
  process.exit(1);
};

// The Vite-built page: fonts, analytics, stylesheet and script tags, and an
// empty <div id="root">.
const template = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) fail('dist/index.html has no empty <div id="root">');

// Template with its default <title> and description removed; each
// pre-rendered page brings its own.
const bare = template
  .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
  .replace(/<meta\s+name="description"[^>]*>\s*/i, '');

// ── 1. The shell for private pages ──────────────────────────────────────────
// Served (via the rewrite in vercel.json) for /admin, /onboard, the gated
// guides and any other address without a pre-rendered file. Never indexed.
writeFileSync(
  join(DIST, 'shell.html'),
  template.replace(/<\/head>/i, '  <meta name="robots" content="noindex, nofollow" />\n  </head>'),
  'utf8'
);

// ── 2. Pre-render the public pages ──────────────────────────────────────────
// React puts the head tags a page renders at the very front of its output.
const HEAD_TAG = /^(?:<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/;

function splitHead(html) {
  const tags = [];
  let rest = html;
  for (let m = rest.match(HEAD_TAG); m; m = rest.match(HEAD_TAG)) {
    tags.push(m[0]);
    rest = rest.slice(m[0].length);
  }
  return { tags, body: rest };
}

const words = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

// The date the pages were built for. The browser starts from this date so its
// first render matches the built HTML (see src/lib/useToday.js).
const buildDate = londonToday();

const report = [];

for (const page of pages.filter((p) => p.prerender)) {
  const { tags, body } = splitHead(render(page.path));

  const titles = tags.filter((t) => t.startsWith('<title'));
  if (titles.length !== 1) fail(`${page.path} rendered ${titles.length} <title> tags (expected 1)`);
  const wordCount = words(body);
  if (wordCount < 15) fail(`${page.path} rendered only ${wordCount} words`);
  const h1s = (body.match(/<h1\b/g) || []).length;
  if (h1s !== 1) fail(`${page.path} has ${h1s} <h1> headings (expected 1)`);
  if (!page.index !== tags.some((t) => /name="robots"[^>]*noindex/.test(t))) {
    fail(`${page.path}: robots tag does not match its "index" flag in src/data/pages.js`);
  }

  const head = [
    `<script>window.__PRERENDER_DATE__=${JSON.stringify(buildDate)}</script>`,
    ...tags,
  ].join('\n    ');

  const html = bare
    .replace(/<\/head>/i, `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${page.path}">${body}</div>`);

  // Nothing key-like may ever reach the published HTML. (The site's public
  // Supabase key lives in the JavaScript bundle, as it always has; it has no
  // business in a page. Service keys and tokens are never available here.)
  if (/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}|sb_secret_|sbp_[a-z0-9]{20,}|service_role/i.test(html)) {
    fail(`${page.path} contains something that looks like a key or token`);
  }

  const outFile =
    page.path === '/' ? join(DIST, 'index.html') : join(DIST, page.path, 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html, 'utf8');

  const jsonLd = (body.match(/application\/ld\+json/g) || []).length;
  report.push({ path: page.path, words: wordCount, jsonLd, index: page.index });
}

for (const r of report) {
  console.log(
    `  prerendered ${r.path.padEnd(20)} ${String(r.words).padStart(5)} words  ${r.jsonLd} JSON-LD${r.index ? '' : '  (noindex)'}`
  );
}
const skipped = pages.filter((p) => !p.prerender).map((p) => p.path);
console.log(`  shell only  ${skipped.join(' ')}`);
console.log(`✓ pre-render complete (${report.length} pages, built for ${buildDate})`);

// The Supabase client created when the pages were loaded can keep Node alive.
process.exit(0);
