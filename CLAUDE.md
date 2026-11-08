# aby-web — ammarbass.com

React 19 + Vite 8 SPA. Supabase backend, deployed on Vercel. UK English in all site copy.

- Routes: `src/App.jsx` (17 routes, `BrowserRouter`)
- Page copy: lives in JSX components, not a CMS
- Head tags: `react-helmet-async` per page, **plus** `scripts/prerender-meta.js` which runs
  after `vite build` and writes a static `index.html` per route with meta tags baked in.
  Its `ROUTES` array is the source of truth — add a route there and nothing else needs changing.
- Build: `npm run build` (= `vite build` + the prerender script). Dev: `npm run dev`.

---

## ⚠️ WORK IN PROGRESS — SEO overhaul, paused 14 Oct 2026

**If the user starts a session (even just "run the dev server"), tell them this work is
parked.** The two open questions below were **answered on 8 Nov 2026** — see `SEO_TASKS.md`
Phase 3 note. Prices and session formats now live in `src/data/privateSessions.js`.

We are working through `SEO_TASKS.md` (in this repo) phase by phase, committing after each
phase. **Status: exploration done, Phase 1 planned, NO CODE CHANGED YET.**

### The goal

Site renders client-side only, so AI crawlers and non-JS crawlers see a blank `<body>`.
Phase 1 fixes that with real pre-rendering. Business goal: more private clients for the
West Hampstead loft studio.

### Phase 1 plan (agreed approach, not yet started)

Extend `scripts/prerender-meta.js` into a real SSR prerender rather than adopting
`vite-react-ssg` (which would mean restructuring `App.jsx` and all 17 pages — too large a
diff on a working site). Steps:

1. Add `src/entry-server.jsx` exporting a render fn using `StaticRouter` + `HelmetProvider`.
2. Add an SSR build (`vite build --ssr`) producing a Node-loadable bundle.
3. Rewrite `prerender-meta.js` to import it, render each route, inject markup **and** head tags.
4. Switch `src/main.jsx` from `createRoot` to `hydrateRoot`.
5. `/events` pulls from Supabase — fetch at build time, inline as `window.__EVENTS__`,
   keep the `useEffect` fetch so it still updates live.

Known risks: components touching `window`/`localStorage`/Calendly at module or render time
will throw under `renderToString` and need guarding; hydration mismatches likely in
`VacationBanner` and `Testimonials` (both fetch on mount) — render their loading state server-side.

### ✅ Answered 8 Nov 2026 — beginners welcome privately (recommended start); studio, online
(WhatsApp video), at-home (travel fee may apply) and small groups (price on request) all offered;
no couples/duo; £80/60 min, £90/75 min. Original questions kept below for history.

1. **Are complete beginners welcome in private sessions?** The new copy says yes
   ("whether you've never practised"), but the current FAQ says the opposite for *classes*
   ("start with 3-4 beginner classes elsewhere... comfortable in downward dog, hold plank
   for 30 seconds"). Is the intent that beginners are fine one-to-one but group classes
   assume experience? `SEO_TASKS.md` Phase 3 explicitly requires confirming this before shipping.
2. **Are online and at-your-home sessions still offered?** The new Phase 5 copy drops both
   and sets pricing at 60/75 min for £70/£80, duo only, studio-based. The current FAQ says
   60/90 min, price on request, small groups up to 3, plus online and at-home options.
   Tell us which is current and whether to keep the dropped options.

### Findings from exploration (saves redoing it)

URLs found in the codebase:

| Value | Status |
| --- | --- |
| Instagram | `https://instagram.com/ammarbass` (Footer, Home, InstagramFeed) |
| Discovery call | Calendly popup, `https://calendly.com/ammar-ammarbass/30min` (PrivateSessions, Coaching) |
| Facebook | **Does not exist** — leave out per the brief |
| Google Business Profile | **Does not exist** — leave a `TODO` comment |

Corrections to the audit in `SEO_TASKS.md` (it was written 12 Oct and is partly stale):

- `prerender-meta.js` already covers **9 routes**, not 2 — including `/private-sessions` and
  `/about`, both with their own title, description, canonical and OG tags. The audit's
  "falls back to a generic title" finding predates this script, or the deployed build is
  older than `main`. **Check what's actually live on ammarbass.com before trusting the audit.**
- `og:site_name="Chef Ina"` is one hardcoded line in the shared tag block, so it is wrong on
  **all 9** routes, not just `/` and `/faq`. One-line fix.
- `/private-sessions`' description already mentions West Hampstead; it is **`/about`'s** that
  is stale. No page mentions Triyoga anywhere in `src`.
- The FAQ accordion keeps all answers mounted and hides them with CSS (`max-h-0 opacity-0`),
  not conditional rendering — so Phase 5's "answers in the HTML on load" requirement is
  **already satisfied** by the component as written.
- Nav has 5 desktop links with room for a 6th, so `/handstand-coaching` (Phase 4) can go in
  the nav rather than the footer.
- Only `/events`, `/yogami`, `Testimonials`, `EventsStrip` and `VacationBanner` fetch from
  Supabase at runtime.

Baseline confirmed by running `npm run build`: build passes, every `dist/**/index.html` has
correct head tags but a body of just `<div id="root"></div>`, and `grep -ril "chef ina" dist`
hits all 9 route files plus the JS bundle.

### Note on SEO_TASKS.md

The original lived at `~/Desktop/Yoga Business SEO Tasks.md` but **disappeared from the
Desktop** on 14 Oct (Google Drive sync appears to have moved it). The copy in this repo was
written from the contents read on 12 Oct and is now the only one — keep it in git.
