# Overnight report — night of 21 November 2026

Everything you asked for is live except two database changes, which are written and waiting for your test. Nothing was rolled back. Every stage passed the same checks before and after going live: every page at 390px and 1280px with no hydration warnings or console errors, the no-JavaScript proof, and the menu, Calendly, WhatsApp buttons, booking bar and `/admin` login screen.

## What I need from you

1. **Test `/admin`, then tell me to apply the security change.** The seven checks are under "What to test in /admin" below.
2. **Add the Vercel deploy hook.** `VERCEL_DEPLOY_HOOK_URL` is still not in Supabase, so saving an event does not rebuild the site and the nightly rebuild does nothing. The steps are in my earlier message.
3. **Check two things I could not.** I did not log in to `/admin` (I don't use your password), and I did not submit the newsletter, contact or new-client forms, to avoid junk records and emails. I checked that each one renders and opens. Please send one test through each.

## Rollback tags

| Stage | Went live as | To undo, go back to tag |
|---|---|---|
| Security (admin tab removed) | `835584f` | `pre-overnight-security` |
| Stage 3 | `faf93c3` | `pre-stage-3` |
| Stage 4 | `08fcb20` | `pre-stage-4` |

Tell me "roll back to pre-stage-4" (or whichever) and I will do it. Before-and-after screenshots at 390px are in `docs/screenshots/stage-3/` and `docs/screenshots/stage-4/`.

## Security

- **Sign-ups:** switched off. A sign-up attempt with the public key is now refused ("Signups not allowed for this instance").
- **Accounts and sign-ins:** none, ever. The database holds 0 users, 0 identities, 0 sessions and 0 audit entries, and its sign-in counter has never been used. The platform logs go back to 23 August 2026 (about 90 days). In those 11,050 log lines the only requests to the sign-in service are my own two test sign-ups last night, both refused.
- **Admin password:** stored as a bcrypt hash in the `admin_settings` table. Change it in `/admin` → Settings.
- **Guide passwords:** stored as bcrypt hashes in the `guides` table. Change them in `/admin` → Guides.
- **Old fallback password:** an `ADMIN_PASSWORD` value still sits in your local `.env` file and in the Supabase function secrets. It is only used if the database row is missing. Once you have changed the password in `/admin`, delete both.
- **"Yorigam Interest" tab:** removed and live.

Two things I noticed and did not touch:
- `/pinchaguide` has no password row in the database (only the handstand guide does), so nobody can get past its gate.
- The `SUPABASE_ACCESS_TOKEN` in `.env` is a long-lived account token. Delete it at supabase.com when this work is finished.

## What is live, page by page

- **Home:**
  - New hero with your name, both offers, "Book a free 15-minute call" and "Join the Saturday class". On phones the photo sits above the text.
  - A dark strip: "Teaching for over five years. About 12 classes a week.", the four studios and the full-class photo.
  - Two cards: private sessions (from £80) and the Saturday class (£15).
  - Suj, Tim and Luciano, then your portrait and a short introduction.
  - This week's classes by day, then the next events, one video and the newsletter.
- **Private sessions:** one page in the reviewed order: hero, who it is for, how it works in four steps, where, prices once, four testimonials, five questions, final booking button. Phones get a booking bar with "Book a free call" and WhatsApp.
- **`/how-privates-work`:** redirects permanently to the "how it works" part of the private sessions page.
- **Saturday class:** same copy, with the booking bar on phones and a dark closing section.
- **Schedule (new, `/schedule`):** your Saturday class as a card with a photo, the week day by day, and one booking link per studio.
- **Events:** each card links to its own page. Events at HOME Wellness show 7 Erskine Road, Primrose Hill, NW3 3AJ.
- **Bootcamp:** a past-event page. It says it ran 4–9 September 2026, has no prices or booking, links to the Norfolk retreat, and is indexable and in the sitemap again.
- **About:** portrait first, the new opening, how you teach, your training (the four approved names plus the two Vipassana courses), where you teach and have taught, and a paragraph on Yorigam.
- **FAQ:** class and general questions only, 14 of them.
- **Free videos:** restyled to match the rest of the site.
- **Menu:** Private sessions, Saturday class, Schedule, Events & retreats, About, plus "Book a free call".
- **Footer:** five blocks, with a newsletter field and a Yorigam block.
- **Design, all public pages:** body text 16–17px in a darker brown, no label under 12px, no centred paragraph over two lines, every text colour at 4.5:1 or better, one filled and one outlined button style, and a dark closing section on each page.
- **Norfolk retreat:** layout unchanged; only text size and colour.

## Decisions I made for you

| Decision | Alternative I did not take |
|---|---|
| Phone hero: photo above the text, so no words run across your body | Keep the text over the photo |
| Phone menu ends with "Book a free call"; the Saturday WhatsApp button moved to the footer, the Saturday page and its booking bar | Keep the WhatsApp button in the menu as well |
| Top-bar "Book a free call" button is hidden on phones (no room beside the logo); it is in the menu and the booking bars | Shrink the logo to fit it |
| Full menu shows from 1180px wide; narrower screens get the phone menu | Smaller menu text from 1024px |
| Proof strip has the facts line, studios and photo only | Add your training or a quote (you listed only the line and studios) |
| Private sessions keeps all four testimonials, now after the prices as Stage 3 specifies | Keep them above the prices |
| Dropped the question "I've never done yoga. Can I book a private session?" when moving questions; the page already says it | Keep it and repeat the beginner message |
| Contact form kept as a small "Send me a message here" link | Remove it |
| Instagram strip removed: it is a third-party widget whose thumbnail size is set in its own dashboard | Leave the 36px thumbnails |
| Homepage shows the whole week compactly | Show only the next few days |
| Bootcamp: prices and deposit removed; body copy left in its original tense under a clear "this ran in September 2026" notice | Rewrite the whole page in the past tense |
| Past events whose link points to your own site show "More about this event" | Hide every link once an event has passed |
| Events page label is now "Events & retreats"; its search title and the FAQ's "Workshops & Events" section still say "workshops" | Reword those too |
| About keeps "I am of Indian descent and was raised in Hong Kong" from the old text | Drop it |
| About lists Indaba under "previously" as "(to November 2026)" | List it as current until 30 November |
| "Have taught" list is Indaba, Triyoga Camden, MoreYoga Camden and Ikigai Hong Kong, taken from your past events | Add Self Retreat Studio as well |
| Yorigam footer sentence: "Bookings and invoicing run on Yorigam, the app I built for yoga teachers", from your old product page | The shorter line with no "I built" |
| Norfolk's booking section left beige, as the review calls the page the model for the rest | Turn it dark like the other closing sections |
| Newsletter asks for first name; the footer field asks for email only | Keep "Full name" |
| CV, Story and the two guides not restyled: they are private and have their own designs | Apply the new type sizes there too |
| Search data still lists only the Sivananda training | Add Rocket and the Gilchrist training |
| Pending database files were dry-run inside a transaction and rolled back, to prove they run | Leave them untested |

## Left out because a photo or fact was missing

- **One-to-one teaching photo:** the private sessions hero uses the studio photo.
- **A photo of you teaching from the front:** the homepage keeps the Barbican photo.
- **Saturday venue:** still "Marylebone"; no venue name, venue photo or booking link.
- **Saturday level wording:** unchanged ("some yoga experience").
- **Yorigam logo:** no logo file in the repo, so the footer block shows the name in text.
- **Testimonial context:** only "Private client", "Handstand student", "Class student"; nothing like "since 2025".
- **Second free video:** none.
- **Event photo descriptions:** generic ("Photo for 120 Power at HOME Wellness…"), because I can't see what you upload.
- **Automatic rebuild:** not running until the deploy hook is added.

Flagged by the review but in no stage prompt, so unchanged:
- The "8–12 sessions" and "10–15 sessions" answers.
- The FAQ's workshops section.
- "Last updated" dates on the schedule and prices.

## What to test in /admin

**Before I apply `supabase/pending/remove_signed_in_trust.sql`**, check that each of these works:

1. Log out and log back in.
2. The Subscribers tab loads.
3. The Private Enquiries tab loads; tick and untick "followed up" on one.
4. The New Clients tab loads.
5. The Guides tab loads and shows view counts.
6. In a private window, open `/handstandguide` and get in with the guide password.
7. Send yourself a message through the form on `/private-sessions` and see it arrive in Private Enquiries.

The file removes the rules that let any signed-in Supabase user read enquiries and subscribers, change the admin login and guides, and write event photos. It also stops anyone writing to the old, unused testimonials table. The site does not use those rules, so nothing should change for you; the test is to be sure.

**`supabase/pending/drop_old_interest_table.sql`** drops the empty sign-up table from the old product page. It needs no test, and it refuses to run if the table has gained a row.

## Skipped or rolled back

- **Rolled back:** nothing.
- **Skipped, Stage 4 item 6 (new photos):** none supplied.
- **Skipped, Stage 5:** off-site work for you (Google Business Profile, reviews, studio links).
- **Still open from earlier:** two database triggers may send each enquiry email twice, and `VITE_INTAKE_SECRET` is unused and can be removed from Vercel and `.env`.
