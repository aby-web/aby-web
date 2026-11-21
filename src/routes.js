import { lazy } from 'react';
import { matchPath } from 'react-router-dom';

/*
 * The route table. Each page is its own JavaScript file ("chunk"), fetched
 * only when its address is visited, so a visitor to the homepage does not
 * download the admin portal or the guides.
 *
 * `file` is the page's source path; scripts/prerender.js uses it to find the
 * page's built chunk and tell the browser to fetch it early.
 *
 * Every route also needs an entry in src/data/pages.js.
 *
 * /how-privates-work was folded into /private-sessions and redirects there.
 * /coaching is parked: see the note at the top of src/pages/Coaching.jsx.
 * The old Yorigam page was deleted; its address redirects to yorigam.com
 * (see "redirects" in vercel.json).
 */
export const routes = [
  { path: '/', file: 'src/pages/Home.jsx', load: () => import('./pages/Home.jsx') },
  { path: '/events', file: 'src/pages/Events.jsx', load: () => import('./pages/Events.jsx') },
  { path: '/events/:slug', file: 'src/pages/EventPage.jsx', load: () => import('./pages/EventPage.jsx') },
  { path: '/about', file: 'src/pages/About.jsx', load: () => import('./pages/About.jsx') },
  { path: '/practice', file: 'src/pages/Practice.jsx', load: () => import('./pages/Practice.jsx') },
  { path: '/handstandguide', file: 'src/pages/Guide.jsx', load: () => import('./pages/Guide.jsx') },
  { path: '/pinchaguide', file: 'src/pages/PinchaGuide.jsx', load: () => import('./pages/PinchaGuide.jsx') },
  { path: '/private-sessions', file: 'src/pages/PrivateSessions.jsx', load: () => import('./pages/PrivateSessions.jsx') },
  { path: '/schedule', file: 'src/pages/Schedule.jsx', load: () => import('./pages/Schedule.jsx') },
  { path: '/saturday-class', file: 'src/pages/SaturdayClass.jsx', load: () => import('./pages/SaturdayClass.jsx') },
  { path: '/faq', file: 'src/pages/FAQ.jsx', load: () => import('./pages/FAQ.jsx') },
  { path: '/admin', file: 'src/pages/Admin.jsx', load: () => import('./pages/Admin.jsx') },
  { path: '/join', file: 'src/pages/Join.jsx', load: () => import('./pages/Join.jsx') },
  { path: '/bootcamp', file: 'src/pages/Bootcamp.jsx', load: () => import('./pages/Bootcamp.jsx') },
  { path: '/norfolk-retreat', file: 'src/pages/NorfolkRetreat.jsx', load: () => import('./pages/NorfolkRetreat.jsx') },
  { path: '/onboard', file: 'src/pages/NewClientIntake.jsx', load: () => import('./pages/NewClientIntake.jsx') },
  { path: '/cv', file: 'src/pages/CV.jsx', load: () => import('./pages/CV.jsx') },
  { path: '/story', file: 'src/pages/Story.jsx', load: () => import('./pages/Story.jsx') },
  // Anything else: the "page not found" page.
  { path: '*', file: 'src/pages/NotFound.jsx', load: () => import('./pages/NotFound.jsx') },
];

// The route a pathname lands on (the last entry, "*", if nothing else matches).
export function routeFor(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return (
    routes.find((r) => r.path !== '*' && matchPath({ path: r.path, end: true }, clean)) ??
    routes[routes.length - 1]
  );
}

// Pages whose code has already been fetched, by route path.
const ready = new Map();

// Fetch one page's code before rendering it. The browser does this for the
// page it lands on, so the first render is complete and matches the
// pre-rendered HTML exactly (no flash of an empty page).
export async function preloadRoute(pathname) {
  const route = routeFor(pathname);
  if (!ready.has(route.path)) ready.set(route.path, (await route.load()).default);
}

// Fetch every page's code. Used at build time, where everything is rendered.
export async function preloadAllRoutes() {
  await Promise.all(
    routes.map(async (route) => {
      if (!ready.has(route.path)) ready.set(route.path, (await route.load()).default);
    })
  );
}

// One stable component per route: the real page once its code is here,
// otherwise a lazy stand-in that fetches it on first render.
const lazyPages = new Map(routes.map((route) => [route.path, lazy(route.load)]));
export const pageFor = (route) => ready.get(route.path) ?? lazyPages.get(route.path);
