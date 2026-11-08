# SEO & AI search tasks for ammarbass.com

Instructions for Claude Code. Work through the phases in order. Commit after each phase with a clear message. UK English throughout.

## Context

- Site: ammarbass.com, React + Vite, Supabase backend, hosted on Vercel.
- Owner: Ammar Bass, yoga teacher. Goal: win more **private clients** for his home loft studio in **West Hampstead, London NW6**.
- Audit (12 Oct 2026), fetching raw HTML as a non-JS crawler would:
  - Every page returns head tags but **no body text** (client-side rendering only). AI crawlers that don't run JS see blank pages.
  - `/` and `/faq` have their own title/description/canonical/OG tags. `/private-sessions` and `/about` fall back to a generic title and an **outdated description** (mentions Triyoga; omits HOME Wellness and Yogarise), with no canonical and no OG tags.
  - `og:site_name` is `Chef Ina` on `/` and `/faq` — wrong.
  - No JSON-LD structured data anywhere.
  - `sitemap.xml` lists `/`, `/about`, `/events`, `/private-sessions`, `/faq`, all with `lastmod` 2026-04-01.
  - `robots.txt` is fine.

## Before you start

1. Explore the repo: router setup, how head tags are currently set on `/` and `/faq`, where page copy lives (components vs Supabase), build and deploy config.
2. Find these values in the existing code; if any are missing, **ask me** rather than inventing them:
   - Instagram URL
   - Discovery call booking URL
   - Facebook page URL (may not exist yet — leave out if so)
   - Google Business Profile URL (doesn't exist yet — leave a `TODO` comment)
3. Tell me your plan for Phase 1 in a few lines before changing anything.

## Phase 1 — Pre-render every page (most important)

- Make every route ship as full static HTML with its body text in the source. Pick the least disruptive option for this codebase, e.g. `vite-react-ssg`, `vite-plugin-prerender`, or a Puppeteer-based post-build prerender. Keep it compatible with Vercel.
- If any page content comes from Supabase (e.g. events), fetch it at build time so it's in the HTML; keep client-side hydration so it still updates live.
- **Acceptance:** run the production build, then for each route check the built HTML file (not the browser) contains its real heading and paragraph text. Show me the check output.

## Phase 2 — Head tags per page

Use `react-helmet-async` or the SSG's head API so each route has its own tags. Every page gets: `<title>`, meta description, canonical, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, Twitter card tags.

- Set `og:site_name` to `Ammar Bass Yoga` everywhere. Remove every trace of `Chef Ina`.
- Update the fallback description in `index.html`:
  `London yoga teacher offering private sessions in West Hampstead, plus strong vinyasa, handstand and arm balance classes at HOME Wellness, Indaba, Flo, Yogarise and BXR.`

| Route | Title | Meta description |
| --- | --- | --- |
| `/` | keep current | keep current, but replace with the fallback above if it lacks West Hampstead |
| `/private-sessions` | Private Yoga Classes in West Hampstead, NW6 \| Ammar Bass | One-to-one yoga in a private loft studio in West Hampstead. Strength-focused vinyasa, handstands and arm balances, for all levels, beginners welcome. From £80. Free discovery call. |
| `/handstand-coaching` (new) | Private Handstand & Arm Balance Coaching, London \| Ammar Bass | One-to-one handstand, inversion and arm balance coaching in West Hampstead, London. Progressive, strength-based training from a specialist yoga teacher. |
| `/about` | About Ammar Bass \| Yoga Teacher, West Hampstead, London | Write one in the same style from the page content (under 160 characters, mention West Hampstead and private sessions). |
| `/faq` | keep current | keep current |
| `/events` | Workshops & Events \| Ammar Bass Yoga, London | Write one from the page content (under 160 characters). |

## Phase 3 — Private sessions page copy

Replace the copy on `/private-sessions` with the text below. Keep the site's existing design, components and booking buttons — only change words and structure. Use one `<h1>` and `<h2>`s for the sections.

> **CONFIRMED 8 Nov 2026:** complete beginners are very welcome privately, and Ammar recommends starting there (group classes assume some experience). Make it a clear selling point. Session types: studio (main), online over WhatsApp video (same prices), at your home (same prices, "travel fee may apply"), small groups of friends/colleagues at a similar level (price on request). **No couples/duo sessions** — if mentioned, say warmly that sessions work best when everyone is at a similar level.

---

**H1:** Private yoga in West Hampstead

One-to-one sessions in a dedicated loft studio in West Hampstead, London NW6, or online and at your home. Each session is built around you: your body, your goals and the pace that suits you.

[Button: Book a free 15-minute discovery call]

**H2: Who it's for**

- **Complete beginners and newer practitioners** who want to learn the foundations properly. Group classes assume some experience and can feel daunting; a private is the most comfortable place to start.
- **Regular class-goers** who want precise feedback on alignment and breath that a group setting can't give.
- **People working towards handstands, arm balances and inversions** who need a structured, progressive plan. (Link "handstands, arm balances and inversions" to `/handstand-coaching`.)
- **Anyone returning to practice** after time away, who wants to rebuild strength sustainably.

**H2: What a session looks like**

We start with a short conversation about how you're feeling and what you're working on. The practice is technically precise and strength-focused, with clear cueing and hands-on adjustments where you're comfortable with them. There's no music, so your attention stays on breath and focus. You leave with one or two things to practise before we next meet.

**H2: The studio**

A quiet, dedicated loft studio in West Hampstead, close to West Hampstead's Jubilee line, Overground and Thameslink stations. All mats and props are provided. The full address is sent when you book.

Can't make it to the studio? Sessions also run online over WhatsApp video, or at your home (same prices; a travel fee may apply). Small groups of friends or colleagues at a similar level are welcome, price on request.

**H2: About Ammar**

Ammar teaches strong vinyasa at HOME Wellness, Indaba, Flo, Yogarise and BXR, where his classes are among the busiest on the timetable. He trained at Sivananda Kutir in India and has since trained in alignment and assists with Stewart Gilchrist, whom he assists in teaching, and in arm balances with David Kyle. A former competitive swimmer and powerlifter, he brings an athlete's understanding of strength and progression to every session.

**H2: Pricing**

| Session | Price |
| --- | --- |
| 60 minutes | £80 |
| 75 minutes | £90 |
| 5-session pack, prepaid | 15% off |
| Online (WhatsApp video) | Same prices |
| At your home | Same prices, travel fee may apply |
| Small group | Price on request |

(Already live from `src/data/privateSessions.js` — render from there, don't retype.)

**H2: How to book**

1. Book a free 15-minute discovery call, or message on Instagram.
2. We agree on your goals and a time that suits you.
3. Fill in the new client form at `/onboard`, then come to the studio (address sent on booking), join online, or I come to you.

[Button: Book a free discovery call]

**H2: Questions** — include FAQs 1, 2, 3, 5 and 7 from Phase 5 here.

---

## Phase 4 — New page: `/handstand-coaching`

Create the route using the same layout and components as `/private-sessions`. Add it to the nav (or footer, if the nav is full) as "Handstand coaching".

---

**H1:** Private handstand and arm balance coaching in London

Learn to handstand, press up and hold arm balances with a clear, progressive plan. One-to-one coaching in a private studio in West Hampstead, NW6.

[Button: Book a free 15-minute discovery call]

**H2: Why private coaching works for inversions**

In a group class there's rarely time to break a handstand down. In a private session we work out what's actually limiting you, which is usually shoulder mobility and strength rather than balance, and build the drills to fix it.

**H2: What we work on**

- Handstands: kick-ups, wall work and freestanding holds
- Arm balances: crow, side crow, eight-angle, flying pigeon and more
- Forearm stand and headstand, with safe set-up and exits
- Presses and transitions for experienced students
- Shoulder and core conditioning to make progress last

**H2: How progress works**

Most people need a few sessions to set the foundations, then practise between sessions. Muscles adapt in weeks, but tendons and wrists need months, so the plan builds load gradually to keep you injury-free. Many students book a 5-session pack and come every week or two.

**H2: Your coach**

Ammar specialises in arm balances, inversions and handstands, and is Rocket Level 1 trained with David Kyle. He teaches some of the busiest strong vinyasa classes in north London and brings a competitive swimming and powerlifting background to his coaching.

**H2: Pricing**

Same rates as private sessions: £80 for 60 minutes, £90 for 75 minutes, 15% off a prepaid 5-session pack. (Link "private sessions" to `/private-sessions`.)

**H2: Questions** — include FAQ 4 from Phase 5.

[Button: Book a free 15-minute discovery call]

---

## Phase 5 — FAQs

Add these to `/faq` (keep any existing FAQs that don't duplicate them). Question as heading or `<summary>`, answer as text. **The answer text must be visible in the HTML on load** — if the FAQ uses accordions, the answers must still be in the pre-rendered HTML, not injected on click.

1. **How much does a private yoga class cost in West Hampstead?**
   Private sessions with Ammar cost £80 for 60 minutes or £90 for 75 minutes. A prepaid pack of five is 15% off. Online sessions are the same price; at-home sessions too, though a travel fee may apply. Small groups are priced on request.
2. **Where are sessions held?**
   Mostly in a private loft studio in West Hampstead, London NW6, close to West Hampstead station; the full address is sent when you book. Sessions are also available online over WhatsApp video, or at your home.
3. **Do I need any yoga experience?**
   No — complete beginners are very welcome, and a private is the best place to start. Group classes assume some experience; one-to-one, you learn the foundations at your own pace.
4. **Can I learn to do a handstand in private sessions?**
   Yes. Handstands, arm balances and inversions are Ammar's specialism. Most people need several sessions plus practice in between; progress depends on your shoulder strength and mobility.
5. **Can I book a session with friends or colleagues?**
   Yes, as a small group if you're at a similar level — price on request. There are no couples sessions: sessions work best when everyone is at a similar stage.
6. **What should I bring?**
   Comfortable clothes you can move in. Mats and props are provided.
7. **How do I book?**
   Book a free 15-minute discovery call through the website, or send a message on Instagram.
8. **What style of yoga do you teach?**
   Technically precise, strength-focused vinyasa with clear cueing, hands-on adjustments and no music, so the focus stays on breath and attention.

Store the FAQs in **one data file** (e.g. `src/data/faqs.ts`) and render both the visible FAQs and the FAQ schema (Phase 6) from it, so they can never drift apart.

## Phase 6 — Structured data (JSON-LD)

Inject as `<script type="application/ld+json">` in the head, in the pre-rendered HTML.

**On `/` and `/private-sessions`:**

```json
{
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Ammar Bass Yoga",
  "url": "https://ammarbass.com/private-sessions",
  "image": "https://ammarbass.com/images/og-home.jpg",
  "description": "Private yoga, handstand and arm balance coaching in a loft studio in West Hampstead, London NW6.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "West Hampstead, London",
    "postalCode": "NW6",
    "addressCountry": "GB"
  },
  "areaServed": ["West Hampstead", "Hampstead", "Kilburn", "Swiss Cottage", "Queen's Park", "Belsize Park"],
  "priceRange": "£80–£90",
  "founder": {
    "@type": "Person",
    "name": "Ammar Bass",
    "jobTitle": "Yoga teacher",
    "knowsAbout": ["Vinyasa yoga", "Handstands", "Arm balances", "Inversions"],
    "sameAs": ["INSTAGRAM_URL"]
  },
  "makesOffer": [
    {"@type": "Offer", "name": "Private yoga session, 60 minutes", "price": "80", "priceCurrency": "GBP"},
    {"@type": "Offer", "name": "Private yoga session, 75 minutes", "price": "90", "priceCurrency": "GBP"}
  ],
  "sameAs": ["INSTAGRAM_URL"]
}
```

Replace `INSTAGRAM_URL` with the real URL. Add the Facebook and Google Business Profile URLs to the top-level `sameAs` once they exist (leave a `TODO` comment).

**On `/handstand-coaching`:** a `Service` object with `name` "Private handstand and arm balance coaching", `provider` referencing the business above, `areaServed` London, and the same two offers.

**On `/faq`:** a `FAQPage` generated from `src/data/faqs.ts` (all 8 questions).

**On `/about`:** a `Person` object for Ammar Bass with `jobTitle`, `knowsAbout`, `sameAs`, and `worksFor` listing HOME Wellness, Indaba, Flo, Yogarise and BXR as `Organization`s.

## Phase 7 — Site-wide details

- **Footer on every page:** `Private yoga studio · West Hampstead, London NW6` plus a "Book a discovery call" link.
- **Image alt text:** audit every `<img>`. Write specific alt text describing the photo (e.g. "Ammar Bass in a handstand in his West Hampstead studio"). Decorative images get `alt=""`.
- **Internal links:** home page links to `/private-sessions` and `/handstand-coaching` with descriptive text, not "click here".
- **`sitemap.xml`:** add `/handstand-coaching`. Generate the sitemap at build time from the route list so `lastmod` reflects the build date and new pages are never forgotten.
- **`robots.txt`:** leave as is.
- **`llms.txt`:** add `/llms.txt` at the site root — a short plain-text summary for AI tools: who Ammar is, location (West Hampstead, London NW6), what he offers, prices, and links to the key pages. Generate it from the same data where possible.

## Phase 8 — Verify and report

1. Production build passes with no errors.
2. For every route, show that the built HTML contains: the page's own `<title>`, meta description, canonical, `og:site_name` = `Ammar Bass Yoga`, the H1 text, and its JSON-LD.
3. Validate every JSON-LD block parses as JSON (write a small script that extracts and `JSON.parse`s them from the built files).
4. Confirm `grep -ri "chef ina"` over the built output returns nothing.
5. Confirm `sitemap.xml` includes `/handstand-coaching`.
6. Give me a short summary of what changed, anything you couldn't do, and the placeholders still needing my input.

Then remind me to deploy, and after deploying to:
- run the home, private sessions and FAQ URLs through Google's Rich Results Test;
- submit the sitemap in Google Search Console and Bing Webmaster Tools, and request indexing of `/private-sessions` and `/handstand-coaching`.
