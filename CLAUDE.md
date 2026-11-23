# aby-web — ammarbass.com

React 19 + Vite 8 SPA. Supabase backend, deployed on Vercel. UK English in all site copy.

- Routes: the table is `src/routes.js` (one lazily loaded chunk per page; the browser preloads
  the current page's chunk before rendering). `src/App.jsx` renders it; `src/main.jsx` wraps it
  in `BrowserRouter`, `src/entry-server.jsx` in `StaticRouter`. Import pages only through
  `routes.js`, or their code lands in the main bundle.
- Page copy: lives in JSX components, not a CMS
- **`src/data/pages.js` is the single source** for every page's title, description, share image,
  and whether it is public (`prerender`, `index`, `sitemap` flags). Pages render those tags with
  `<PageMeta path="..." />`; a page's own `<Helmet>` holds only keywords and JSON-LD.
- Build: `npm run build` = `vite build` (→ `dist/`) + `vite build --ssr src/entry-server.jsx`
  (→ `dist-ssr/`, not published) + `node scripts/prerender.js`, which writes each public page's
  full HTML into `dist/<path>/index.html`. Private pages (`prerender: false`: `/admin`,
  `/onboard`, `/cv`, `/story`, the gated guides) get `dist/shell.html`, an empty noindex page,
  via the rewrite in `vercel.json`. Any other unknown address gets `dist/404.html`
  (`src/pages/NotFound.jsx`) with a real 404 status. The build fails rather than publish an
  empty or odd page.
- Adding a page: route in `routes.js`, entry in `pages.js`, `<PageMeta>` in the component, and (if
  private) its path in the shell rewrite in `vercel.json`.
- Parked on 21 Nov 2026 (file kept, not routed): `src/pages/Coaching.jsx` (`/coaching` now 404s).
  `/bootcamp` and `/join` are live but noindex; Stage 3 turns `/bootcamp` into a past-event page.
- **The app is called Yorigam (yorigam.com). Its old name must not appear in anything visible or
  crawlable.** The old product page was deleted; the one place the old spelling is allowed is the
  permanent redirect in `vercel.json`. The old sign-up table was dropped from the database on
  22 Nov 2026. The build fails if the old name appears in any generated page.
- Pre-rendered pages are **hydrated**, so the first browser render must match the built HTML.
  Anything that depends on today's date goes through `src/lib/useToday.js`; format dates with
  the helpers in `src/data/classes.js`, never `toLocaleDateString`. Don't read `window`,
  `localStorage` or the clock during render.
- **Events** live in the Supabase `events` table. The build fetches them (anon key, public
  columns only, via `src/lib/events.jsx`) and writes `/events` plus one page per event at
  `/events/<slug>`; **if that fetch fails or is empty the build fails** so the live site stays up.
  `slug` is set once by a database trigger on insert and never changes. An event added after the
  last build is served the shell and loads in the browser until the rebuild finishes.
- **Rebuilds**: the `rebuild-site` Edge Function holds the Vercel deploy hook in its environment
  (`VERCEL_DEPLOY_HOOK_URL`; never in the repo or client code). It runs for a logged-in admin
  (automatically when an event is saved or deleted in `/admin`, or the "Rebuild website" button)
  and for the nightly `pg_cron` job `nightly-site-rebuild` (00:10 UTC), which authenticates with
  `REBUILD_CRON_SECRET` (function env + Supabase Vault).
- **Admin writes** to `events`, `vacations` and the `event-images` bucket go through the
  `admin-data` Edge Function (admin login required). The old "anyone can write" policies on
  those were removed on 21 Nov 2026; the public key can only read them.
- **Event photos (22 Nov 2026)**: the admin event form sends `image_url` only when the photo
  changes (a new upload, or `null` from the "Remove photo" control). `admin-data` also drops a
  blank `image_url` on update, so only an explicit `null` takes a photo off. Deleting an event
  does not delete its file from the `event-images` bucket.
- **Admin login and guide gates** show their own messages under the form ("Wrong username or
  password." / "Couldn't reach the server. Try again."); `login()` in `src/lib/adminAuth.js`
  returns `'ok' | 'refused' | 'error'`. With no `admin_username` row the username is the
  function's default.
- **Guides tab (22 Nov 2026)**: `admin-data` never returns a guide's stored password, only
  `has_password`; view counts come from its `guide-views` action (counted in the database).
  Both guides have a row in `guides`; an empty password means "not set" and the gate refuses
  everyone. Passwords are set only by Ammar in `/admin` > Guides.
- **Analytics events (22 Nov 2026)**: `src/lib/analytics.js` `track(name, position)` sends
  `book_call_click`, `whatsapp_enquiry_click`, `whatsapp_group_click` and
  `new_client_form_submit` through gtag with two parameters only (`page_path`,
  `button_position`); never from `/admin`, never personal data. `BookCallButton` and the
  WhatsApp buttons take a `position` prop; give every new one a position.
- **Bookings-opened dates** (`offers.validFrom` in Event data) are in
  `src/data/bookingsOpened.js`, given by Ammar; an event without an entry has no `validFrom`.
- **Private pages send nothing to Google**: Analytics is not started on them (the
  `privatePaths` list in `index.html`). The one exception is a saved `/onboard` form, which
  starts it without a page view to send `new_client_form_submit`. The build fails if a `prerender: false` page is missing from that list.
- **Keys (22 Nov 2026)**: no database function holds a key in its body. The enquiry trigger
  reads the Vault secret `notify_enquiry_key`; the nightly rebuild reads `rebuild_cron_secret`.
  The `ADMIN_PASSWORD` fallback is gone from `.env` and the function secrets (admin-login still
  reads the variable, which is now unset; the stored hash is the only password).
  The project's `default` secret key is ALSO what every Edge Function receives as
  `SUPABASE_SERVICE_ROLE_KEY`: deleting it would break all of them. Rotating it needs a plan.
- Dev: `npm run dev` (no pre-rendering; pages build in the browser).

---

## Still open (as of 22 Nov 2026)

1. **Retire the `default` Supabase secret key.** Its value was shown in a Claude session on
   22 Nov 2026, so it should be replaced. It cannot simply be deleted: every Edge Function
   receives it as `SUPABASE_SERVICE_ROLE_KEY`, so deleting it would break admin login, the
   admin tabs, newsletter sign-up, the guide gates and `/onboard`. The plan: Ammar creates a
   second secret key for the functions; every function that uses the key (7 of the 12
   deployed; search for `SUPABASE_SERVICE_ROLE_KEY`) is changed to read that key by name
   from `SUPABASE_SECRET_KEYS` and redeployed; the logs are checked until nothing presents
   `default`; only then does Ammar delete it. The enquiry trigger is already off it (it uses
   the `enquiry_trigger` key, held in the Vault as `notify_enquiry_key`). Do this as its own
   job, with Ammar testing `/admin` straight after.
2. **Saturday class venue name and booking link.** `SATURDAY_VENUE_NAME` and
   `SATURDAY_BOOKING_URL` in `src/data/classes.js` are still `null`, so the page says
   "Marylebone" and booking is through the WhatsApp group. Waiting for Ammar. The level
   wording ("some yoga experience") is also unconfirmed.
3. **A one-to-one teaching photo for `/private-sessions`.** The hero uses the studio photo
   until Ammar supplies one.

Smaller things also waiting on Ammar: delete
the long-lived `SUPABASE_ACCESS_TOKEN` from `.env` and supabase.com when Claude's database work
is finished; a Yorigam logo for the footer; a bookings-opened date for each new event
(`src/data/bookingsOpened.js`); seven old unused files in the `event-images` bucket were left
in place on purpose.

## Site review and staged plan (21 Nov 2026)

`docs/site-review.md` is the current plan: five stages, each with its own prompt.
**Stages 1 and 2 shipped 21 Nov 2026; Stage 3 (one private-sessions page, new homepage order,
`/schedule`, new menu and footer, phone booking bar) and Stage 4 (type, colour, buttons, About
page, swipeable testimonials) shipped overnight 21–22 Nov 2026.** Stage 5 is off-site work for
Ammar. Design rules now in force: body text 16–17px at normal weight in `#5C4A36`; labels never
under 12px; no centred paragraph longer than two lines; contrast at least 4.5:1; each page ends
with a dark (`#1C1410`) call-to-action section; buttons only from `ui.js`.
`docs/overnight-report.md` records what was decided that night and what is still missing.
Polish round, 22 Nov 2026: on phones the homepage hero keeps its headline, paragraph and first
button on the first screen (the photo takes the height that is left); the homepage shows the
next three days of classes (`nextClassDays` in `classes.js`), not the whole week; each photo is
used once per page; the standalone newsletter block was removed from the homepage because the
footer has the sign-up field; the free video block was removed from the homepage too (the footer
links to `/practice`); sections are `py-12 md:py-18`. Lengths at 390px: home about 5,700px
(Ammar: stop trimming there), About about 4,600px. On phones the About portrait sits above the
heading at 120px, so the heading runs the full width. Wording: 120 Power and the like are "events", never "workshops"
(the Norfolk retreat's own afternoon workshops are the exception).
Database, 22 Nov 2026: the "any signed-in user" policies and the old interest table are gone
(migrations `20261122092000` and `20261122092500`); the duplicate enquiry-email trigger was
removed (`20261122140000`), leaving `on_private_enquiry_insert`. `supabase/pending/` holds changes that are
written and dry-run but NOT applied; never apply one without Ammar saying so.
Stage 2 superseded the paused Phase 1 plan further down, which is kept only for history.

Where things live after Stage 3:
- `src/components/ui.js`: the two button looks (`btn(look, size)`, `BTN`) and text styles
  (`TEXT`). Use them; don't hand-write button classes, and pick a size rather than overriding one.
- `src/components/BookCallButton.jsx` + `src/lib/calendly.js`: the "book a free call" action
  (Calendly loads on first click). `BookingBar.jsx`: the phone-only bar on `/private-sessions`
  and `/saturday-class`.
- `src/components/WeekSchedule.jsx`: Saturday card, week by day, one booking link per studio.
- `src/data/faqs.js`: `classFaqs` (the FAQ page) and `privateFaqs` (the private sessions page).
- `/how-privates-work` redirects to `/private-sessions#how-it-works`; `/bootcamp` is a past-event
  page. Shared structured data is in `src/data/schema.js`; `llms.txt` comes from
  `src/data/llms.js`; a page's sitemap date is its `updated` field in `pages.js` (change it by
  hand when the page's content changes).
Agreed rules: the Vercel deploy hook URL is a secret (server-side env var only, called from a
function that checks admin auth, never in client code); build-time Supabase access uses only the
anon key and only already-public data; if the events fetch fails, the build must fail.

Where things are set, each in one place:

- `src/data/classes.js`: weekly schedule; Saturday class price, start date, venue name
  (`SATURDAY_VENUE_NAME`, null until confirmed), booking link (`SATURDAY_BOOKING_URL`, null =
  book through WhatsApp), WhatsApp group link.
- `src/data/privateSessions.js`: private prices, Calendly link (a 15-minute event; only the
  address says "30min"), WhatsApp number for private enquiries.
- `src/data/testimonials.js`: named testimonials and which pages show them. Quotes are verbatim;
  do not edit the wording. The Admin tab for the old Supabase `testimonials` table was removed
  on 21 Nov 2026; the table itself still exists but nothing reads it.

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
  **all 9** routes, not just `/` and `/faq`. One-line fix. **Fixed 21 Nov 2026** (now "Ammar Bass"); the /chefina draft page was deleted the same day.
- `/private-sessions`' description already mentions West Hampstead; it is **`/about`'s** that
  is stale. No page mentions Triyoga anywhere in `src`.
- The FAQ accordion keeps all answers mounted and hides them with CSS (`max-h-0 opacity-0`),
  not conditional rendering — so Phase 5's "answers in the HTML on load" requirement is
  **already satisfied** by the component as written.
- Nav has 5 desktop links with room for a 6th, so `/handstand-coaching` (Phase 4) can go in
  the nav rather than the footer.
- Only `/events`, `Testimonials`, `EventsStrip` and `VacationBanner` fetch from
  Supabase at runtime.

Baseline confirmed by running `npm run build`: build passes, every `dist/**/index.html` has
correct head tags but a body of just `<div id="root"></div>`, and `grep -ril "chef ina" dist`
hits all 9 route files plus the JS bundle.

### Note on SEO_TASKS.md

The original lived at `~/Desktop/Yoga Business SEO Tasks.md` but **disappeared from the
Desktop** on 14 Oct (Google Drive sync appears to have moved it). The copy in this repo was
written from the contents read on 12 Oct and is now the only one — keep it in git.
