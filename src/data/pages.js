/*
 * Every page on the site: its address, title, description and share image,
 * and whether it is public.
 *
 * This is the single source for:
 *   - the <title>, description, canonical and share (Open Graph) tags, through
 *     <PageMeta path="..." /> on each page
 *   - which pages are pre-rendered to full HTML at build time
 *     (scripts/prerender.js)
 *   - which pages search engines may index
 *
 * Flags:
 *   prerender – true: the build writes the page's full content into its HTML
 *               file, so crawlers that don't run JavaScript can read it.
 *               false: served as an empty, noindex shell and built in the
 *               browser. Use false for anything private, client-specific or
 *               that depends on the visitor (admin, forms, gated guides).
 *   index     – false adds <meta name="robots" content="noindex, nofollow">.
 *   sitemap   – true lists the page in the sitemap. Never true unless index
 *               and prerender are both true.
 *   updated   – the date the page's CONTENT last changed ('YYYY-MM-DD'). It is
 *               the sitemap's "last modified" date, so change it by hand when
 *               you change what a page says, and only then.
 *
 * To add a page: add its route in src/App.jsx, an entry here, and
 * <PageMeta path="/your-path" /> in the page component. A private page
 * (prerender: false) also needs its path in the shell rewrite in vercel.json,
 * or its address will show the "page not found" page.
 */

export const SITE = 'https://ammarbass.com';

// Default share image — a 1200x630 crop of the hero.
const OG_HOME = `${SITE}/images/og-home.jpg`;
const OG_HOME_ALT = 'Ammar Bass seated in meditation at the Barbican, London';
const OG_PRIVATE = `${SITE}/images/og-private.jpg`;

const PUBLIC = { prerender: true, index: true, sitemap: true };
// Public pages kept out of search results: pre-rendered, but noindex.
const HIDDEN = { prerender: true, index: false, sitemap: false };
// Private, client-specific or visitor-dependent: never pre-rendered or indexed.
const PRIVATE = { prerender: false, index: false, sitemap: false };

export const pages = [
  {
    path: '/',
    updated: '2026-11-21',
    title: 'Ammar Bass | Yoga Teacher London | Vinyasa, Handstands & Arm Balances',
    description:
      'London yoga teacher specialising in strong vinyasa, handstands and arm balances. Classes at HOME Wellness, BXR, Yogarise, Flo and my own Saturday class in Marylebone. Events and retreats.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
    ...PUBLIC,
  },
  {
    path: '/about',
    updated: '2026-11-21',
    title: 'About Ammar Bass | London Yoga Teacher | Strength & Alignment Focus',
    description:
      'Vipassana meditation practitioner with a competitive swimming and powerlifting background. Teaching alignment-focused vinyasa across London, specialising in arm balances, inversions and biomechanics.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
    ...PUBLIC,
  },
  {
    path: '/private-sessions',
    updated: '2026-11-21',
    title: 'Private Yoga Sessions in West Hampstead | Ammar Bass',
    description:
      'One-to-one yoga in West Hampstead, London. Build strong foundations or work towards handstands and arm balances — sessions designed around you. Free 15-min discovery call.',
    image: OG_PRIVATE,
    imageAlt: 'Ammar Bass, yoga teacher in West Hampstead, London',
    ...PUBLIC,
  },
  {
    path: '/how-privates-work',
    updated: '2026-11-21',
    title: 'How Private Yoga Works in West Hampstead | Ammar Bass',
    description:
      'How private yoga in West Hampstead works: prices, a free 15-minute discovery call, a short form before your first session, and what a one-to-one session looks like.',
    image: OG_PRIVATE,
    imageAlt: 'Ammar Bass, yoga teacher in West Hampstead, London',
    ...PUBLIC,
  },
  {
    path: '/saturday-class',
    updated: '2026-11-21',
    title: 'Saturday Yoga Class in Marylebone | Ammar Bass',
    description:
      'A strong 90-minute vinyasa class with Ammar Bass in Marylebone, London. Saturdays 11:30–13:00, from 5 December 2026. £15 drop-in. Join the WhatsApp group to come.',
    image: `${SITE}/images/og-saturday-class.jpg`,
    imageAlt: 'Students resting at the end of a yoga class while Ammar Bass sits at the front of the room',
    ...PUBLIC,
  },
  {
    path: '/events',
    updated: '2026-11-21',
    title: 'Yoga Workshops & Retreats London | Ammar Bass Events',
    description:
      'Yoga workshops, arm balance intensives and retreats in London. Deepen your practice with events focused on alignment, inversions and strength.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
    ...PUBLIC,
  },
  {
    path: '/practice',
    updated: '2026-11-21',
    title: 'Free Practice Videos | Ammar Bass Yoga',
    description:
      'Free full-length yoga classes with Ammar Bass. Practise strength-based vinyasa flows, arm balances and mindful movement from home.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
    ...PUBLIC,
  },
  {
    path: '/faq',
    updated: '2026-11-21',
    title: 'FAQ | Ammar Bass Yoga | Common Questions Answered',
    description:
      'Questions about classes, private sessions, workshops and practice philosophy — everything worth knowing before training with Ammar Bass in London.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
    ...PUBLIC,
  },
  {
    path: '/norfolk-retreat',
    updated: '2026-11-20',
    title: 'Spring Yoga Immersion 2027 — Norfolk Yoga Retreat | Ammar Bass',
    description:
      'A three-night yoga retreat near Norwich, 6–9 May 2027, with Ina and Ammar. 11 hours of practice, home-cooked vegetarian food, sauna, ice bath and hot tub. Only 10 places.',
    image: `${SITE}/images/og-norfolk-2027.jpg`,
    imageAlt: 'Ina and Ammar in triangle pose in a forest',
    ...PUBLIC,
  },

  // ── Public, but noindex and not in the menu or the sitemap ───────────────
  // /bootcamp ran in September 2026. Stage 3 of docs/site-review.md turns it
  // into a past-event page; until then it stays up but out of search.
  {
    path: '/bootcamp',
    title: 'Yoga Intensive Bootcamp — Bulgaria 2026 | Ammar Bass',
    description:
      '5-day yoga intensive in Varna, Bulgaria. 4–9 September 2026. Forest setting, minutes from the beach. Progressive flow, workshops and immersive practice.',
    image: `${SITE}/images/og-bootcamp.jpg`,
    imageAlt: 'Forest cabins at the retreat venue near Varna, Bulgaria',
    ...HIDDEN,
  },
  {
    path: '/join',
    title: 'Join the Mailing List | Ammar Bass',
    description:
      'One email a month from Ammar Bass: new classes, 120 Power dates and retreat places before they go public.',
    image: OG_HOME,
    imageAlt: OG_HOME_ALT,
    ...HIDDEN,
  },

  // ── Private, client-specific or gated: empty noindex shell only ──────────
  {
    path: '/onboard',
    title: 'New Client Sign-Up | Ammar Bass',
    ...PRIVATE,
  },
  {
    path: '/cv',
    title: 'Ammar Bass — Yoga Teacher CV',
    description:
      'Curriculum vitae of Ammar Bass, yoga teacher in London — teaching philosophy, certifications, and experience.',
    ...PRIVATE,
  },
  {
    path: '/story',
    title: 'Story | Ammar Bass',
    description:
      'The longer version. Hong Kong, a merchant family, finance, and the decision to leave it. Ammar Bass.',
    ...PRIVATE,
  },
  {
    path: '/handstandguide',
    title: 'Handstand Fundamentals Guide | Ammar Bass',
    description:
      'A structured approach to building your handstand practice. Learn the foundations, fundamentals, and key muscles for sustainable handstand training.',
    ...PRIVATE,
  },
  {
    path: '/pinchaguide',
    title: 'Pincha Mayurasana (Forearm Stand) Fundamentals Guide | Ammar Bass',
    description:
      'A structured approach to building your Pincha Mayurasana (forearm stand) practice. Learn the biomechanics, fundamentals, and key muscles for a sustainable forearm balance.',
    ...PRIVATE,
  },
  {
    path: '/admin',
    title: 'Admin | Ammar Bass',
    ...PRIVATE,
  },

  // ── The "page not found" page ────────────────────────────────────────────
  // Written to dist/404.html; Vercel serves it with a 404 status for any
  // address that has no page. It has no address of its own, so no canonical.
  {
    path: '/404',
    file: '404.html',
    title: 'Page Not Found | Ammar Bass',
    canonical: false,
    ...HIDDEN,
  },
];

export const pageMeta = (path) => pages.find((p) => p.path === path);
export const pageUrl = (path) => (path === '/' ? `${SITE}/` : `${SITE}${path}`);
