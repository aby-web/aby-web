# ammarbass.com — website review and staged improvement plan

Nov 21, 2026 · @Project Yogami

## Verdict

The site looks calm and well made, but it does not yet do its two jobs: winning private clients and filling your Saturday class. I reviewed all nine pages at phone width (390px) on 21 November 2026.

Five findings matter more than everything else:

1. **Search engines and chatbots receive an empty page.** Every URL returns about 3KB of HTML with an empty `<div id="root">`. All your wording, prices, FAQ answers and schema are added afterwards by JavaScript. Google can cope with that; ChatGPT, Claude and Perplexity crawlers do not run JavaScript, so to them the site has titles and nothing else. This is the main reason chatbot visibility is low, and no amount of rewording fixes it.
2. **Nothing in the first three screens says "established teacher".** No studio names, no training, no students, no reviews. The only testimonials are three anonymous class reviews at the bottom of the About page. There is not one photo of you teaching another person anywhere on the site.
3. **The private offer is split across two pages that repeat each other.** The price table appears twice word for word, the three "Assessment / Progression / Results" steps appear twice, and the beginner reassurance appears five times. On the main private page the first button is about 4,000px down a 5,100px page.
4. **The Saturday class has no page of its own.** It exists as a small note under the hero, a card in the schedule and a button in the menu. There is no price, no level, no venue, no photo and no link you can share that explains it. It starts on 5 December.
5. **Several facts on the site are wrong or contradict each other**, including the discovery call length, a page the FAQ points to that does not exist, and a "Coming Soon" video card. Each one chips at trust.

The order to fix it: correct the facts and launch a Saturday class page before 5 December, then make the site readable to crawlers, then rebuild the private journey and homepage, then the trust and design layer, then the off-site work. The staged plan at the end has a paste-ready Claude Code prompt for each.

## First impression on a phone

A new visitor learns that you are fit and the photo is beautiful, and not much else. You want them to think two things: "established teacher I can trust" and "he offers private sessions and his own class". The first screen currently delivers neither clearly.

**What the first screen shows.** A tiny "LONDON · YOGA TEACHER" label, the headline "Strong, structured yoga.", a paragraph laid across your body in the photo, then three stacked buttons with a "NEW" note wedged between them. Three calls to action is two too many, and the Saturday class reads as a footnote.

**What is missing from it.** Your name as a teacher (it is only the logo), where you are, who you teach, and any proof: studios, training, years, a student's words.

**The photo.** Seated, shirtless, eyes closed, alone at the Barbican. It says model or athlete. It does not say teacher, because nobody is being taught. It also puts body text over your torso on a phone, which makes both harder to read.

**The scroll.** The homepage is about 8,000px tall on a phone, roughly nine and a half screens.

| Screens down | What appears | Problem |
| --- | --- | --- |
| 1 | Hero | Three buttons, no proof |
| 2–3 | Private sessions teaser, photo of an empty room, three numbered steps | Same copy as the private page; the room looks like a spare room |
| 3–5 | Find a class: Saturday card, then 9 studio class rows | Your own class is styled like a studio listing; studio classes send people away from your site |
| 5–6 | About teaser and portrait | The warmest photo on the site is buried here |
| 7 | One free video | Fine, low priority |
| 8 | Six Instagram thumbnails about 36px wide | Too small to see |
| 9 | Newsletter form, footer | Footer is thin |

**What a first-time visitor is never shown on the homepage:** a testimonial, a credential, a price, a photo of you with a student, or the next 120 Power and Norfolk retreat.

## Page-by-page findings

The Norfolk retreat page is the best page on the site and the model for the rest: specific, warm, full of photos, prices and a clear next step. The pages that matter most for your two priorities are the weakest.

### Home (/)

- Keep: the logo, the cream and espresso palette, the portrait in the About teaser, the schedule data.
- The private teaser repeats the private page almost word for word. Replace it with one short offer card.
- The Saturday card says "Marylebone, venue confirmed in the WhatsApp group." That reads as uncertain. No price, level or description.
- The four HOME Wellness "Book" buttons do not all go to the same place: one goes to the booking page, another to the plain `http://` homepage. The BXR button goes to the BXR homepage, not a booking page.
- Flo is labelled "Hampstead"; it is in West Hampstead. It also has a class called "Flo", which needs checking.
- "View All Practice Videos" leads to a page with one video.
- The Instagram strip is six thumbnails too small to read. Show six at a tappable size or remove it.
- The newsletter form asks for a full name. First name and email is enough.

### Private sessions (/private-sessions)

- The opening screen is a centred headline and paragraph with no photo and no button. A ready-to-book visitor has to scroll past four screens to find one.
- No photo of you. No photo of anyone being taught. No testimonial from a private client.
- The beginner section is good and true to how you work. Keep the substance, shorten it.
- "If the studio doesn't suit you" frames your own studio as a possible problem.
- Body paragraphs are centred, which is tiring to read beyond two lines.
- Two equal buttons at the end ("Book discovery call", "Send message"). Pick one primary.
- The page says the discovery call is 15 minutes. The Calendly link it opens is named `/30min`.
- Prices shown: £80 for 60 minutes, £90 for 75 minutes. Please confirm these are current (see open questions).

### How privates work (/how-privates-work)

- This page exists because the private page does not answer practical questions. Fold it into the private page and redirect the URL.
- The price table is an exact copy of the one on the private page.
- The "what a session looks like" paragraph and the three formats (studio, online, your home) are the clearest writing about privates on the site. Move them across.
- "Privates" is teacher shorthand. Clients search for "private yoga", and in everyday British English the word has another meaning. Use "private sessions" everywhere.

### About (/about)

- The headline is "The practice requires effort. Physical & mental." It is about the practice, not about you, and it is stern for a first meeting.
- There is no photo until about two screens down.
- No credentials are listed. "I have spent time at Sivananda Kutir in the Himalayas" undersells a 200-hour teacher training. Your Rocket, alignment and assists trainings, and your work assisting Stewart Gilchrist, are absent.
- No list of where you teach or have taught, although the Events page shows Triyoga Camden, MoreYoga Camden and Ikigai Hong Kong.
- The three testimonials are anonymous, all about group classes, and one has a typo ("The class flew smoothly"). One is labelled Indaba, which closes this month.

### Events (/events)

- Events load after the page does ("Loading events..."), so a crawler sees none of them.
- Each event opens in a pop-up with no address of its own. You cannot share a link to 120 Power on 31 January, and Google cannot index it.
- "Click for details" should be "Details" on a phone.
- The page label is "Workshops & Retreats". You have said 120 Power is an event, not a workshop; the FAQ has a whole "Workshops" section describing 2–3 hour skill workshops.
- The past events list is a trust asset. Keep it.

### Norfolk retreat (/norfolk-retreat)

- Strong. It is not in the menu, the footer or the homepage.
- Add it to the homepage and the footer. Add a short testimonial from a past retreat guest if you have one.

### Online (/practice)

- The menu says "Online", which suggests online classes. The page is free videos. Rename to "Free videos" and move it to the footer.
- Remove the "Coming Soon / Currently in production" card until the second video exists. Placeholder content makes a site look unfinished.
- This page uses a brown rectangular button and Title Case headings; the rest of the site uses black pill buttons and sentence case.
- The video thumbnail is a 952KB PNG.

### FAQ (/faq)

- "Check the Classes page for detailed descriptions." There is no Classes page.
- "All classes are booked through the individual studio systems or via Mindbody." Your Saturday class is booked through WhatsApp.
- "Most studios provide mats and props." The Saturday class is bring-your-own.
- "I have an injury. Can I still attend?" is answered "Maybe." That is abrupt.
- "I can be strict in classes" will put off exactly the nervous beginner the private page is trying to welcome.
- "Most students see significant progress in 8–12 sessions" and "10–15 sessions" for a handstand are promises you may not want in writing.
- The six private-session questions belong on the private page, where the decision is made.

### New client form (/onboard)

- Clear and well structured. No changes needed beyond the type size and contrast notes in the design section.

## New structure

Five menu items, ordered by what you want people to do, with one page per offer. Today the menu has six items, two of them about privates, and your own class is not among them.

### Menu

| Now | Proposed | Why |
| --- | --- | --- |
| About | Private sessions | Priority one goes first |
| Private | Saturday class | Priority two gets its own page and menu slot |
| How privates work | Schedule | Was last; studio classes still matter for trust |
| Events | Events & retreats | Says what is inside |
| Online | About | People read it after they are interested |
| Schedule | (button) Book a free call | One primary action, always visible |

FAQ, free videos and Yorigam move to the footer.

### Pages and addresses

| Page | Address | Change |
| --- | --- | --- |
| Home | `/` | Rebuilt in the order below |
| Private sessions | `/private-sessions` | Absorbs How privates work and the private FAQs |
| How privates work | `/how-privates-work` | Permanent redirect to `/private-sessions#how-it-works` |
| Saturday class | `/saturday-class` | New |
| Schedule | `/schedule` | New page; the homepage shows a short version |
| Events & retreats | `/events` | Each event gets its own address, e.g. `/events/120-power-january-2027` |
| Norfolk retreat | `/norfolk-retreat` | Unchanged; linked from home and footer |
| About | `/about` | Rewritten with credentials and photos |
| FAQ | `/faq` | Class and general questions only |
| Free videos | `/practice` | Unchanged address; footer link |
| New client form | `/onboard` | Unchanged |
| Anything else |  | A real "page not found" page |

### Homepage order

1. **Hero.** Who you are, where, the two offers, one primary button and one secondary.
2. **Proof strip.** "Teaching for over five years. About 12 classes a week." Then the studios you teach at, your training, one short quote, and the full-class photo.
3. **Two offer cards side by side in meaning, stacked on a phone.** Private sessions (from £80, West Hampstead, online or your home). Saturday class (11:30–13:00, Marylebone, from 5 December).
4. **Two or three named testimonials.**
5. **About teaser** with the portrait, moved up from screen five.
6. **This week's classes**, listed by day, your Saturday class first and marked as yours. Link to the full schedule.
7. **Next events.** 120 Power on 31 January 2027 and the Norfolk retreat, 6–9 May 2027.
8. **One free video.**
9. **Newsletter.**

That cuts the page to about six screens and puts proof before the ask.

### Private sessions page order

1. Hero with a photo of you teaching, a one-line offer with the starting price, the booking button, and a secondary "Message me on WhatsApp" button.
2. Who it is for: new to yoga, working towards a skill, wanting individual attention.
3. How it works, in four steps: free call, short form, first session, your plan. Give this section the id `how-it-works`.
4. Where: the loft studio, online, your home.
5. Prices, once.
6. Two or three private-client testimonials.
7. Private-session questions, moved from the FAQ.
8. Final booking button.

### Phone-only booking bar

A slim bar fixed to the bottom of the screen on the private and Saturday pages: "Book a free call" on one, "Join the WhatsApp group" on the other. On a phone this matters because the button is never off screen.

### Footer

The current footer has six links, an email address and a one-line credit. Make it the place where everything can be found:

- **Practise with me:** Private sessions, Saturday class, Weekly schedule, Events & retreats, Norfolk retreat 2027, Free videos.
- **About:** About Ammar, FAQ, New client form.
- **Connect:** Saturday WhatsApp group, Instagram, email, newsletter sign-up field.
- **Where:** "Private studio in West Hampstead, London NW6. Saturday class in Marylebone." Search engines and chatbots use this line to place you.
- **Yorigam:** a small block with the logo and one sentence, replacing the faint credit line.

### Where Yorigam belongs

In the footer block above and in one short paragraph on the About page. It should not sit on the homepage or in the menu: it is for teachers, and your visitors are students. On the About page it earns trust ("he built the booking system he uses"). In the footer it gives yorigam.com a link from every page.

## Copy

The site speaks in two voices that pull against each other: stern on the homepage, About and FAQ ("Discipline. Effort.", "requires effort", "I can be strict"), and gentle on the private pages ("complete beginners are very welcome"). Pick one: demanding in the practice, warm towards the person. Everything below is written that way, in UK English.

### Repeated wording to cut

| Wording | Where it appears | Action |
| --- | --- | --- |
| "structured" and "progressive" | Hero, private teaser, private page (twice), About teaser, FAQ, and the footer on every page | Keep in the hero and once on the private page |
| "01 Assessment / 02 Progression / 03 Results" | Home and private page, same text | One version, on the private page, as "How it works" |
| The price table | Private page and How privates work, identical | Once |
| "Simple and transparent." | Above both price tables | Replace with "Prices" |
| "No distractions, no drop-ins." | Home and private page | Once |
| Beginners welcome | Private page, How privates work (twice), FAQ (twice) | One section on the private page, one FAQ answer |
| "actually" | "actually moves you forward" (twice), "actually changes how your body works" | Delete; it implies other teaching does not |
| "Same structure, same attention" | Private page and How privates work | Once |

### Wording that undersells you

| Now | Replace with |
| --- | --- |
| "I teach because I enjoy it. Applied correctly, this practice benefits most people — and that gives me great pleasure." | "My classes are strong, precise and quiet. People come to get stronger, to learn skills like handstands and arm balances, and to build a practice they can keep for decades." |
| "I have spent time at Sivananda Kutir in the Himalayas." | "I trained at Sivananda Kutir in the Himalayas (200-hour teacher training, 2022) and have since trained in Rocket with David Kyle and in alignment and assists with Stewart Gilchrist, whose classes I assist. I also study with Emi Tull, a Dharma teacher." |
| "I see abilities in people beyond what they perceive in themselves." | "I will often see that you can do more than you think, and I will show you how to get there safely." |
| "I can be strict in classes, but it's to help students maintain focus and concentration." | "I keep the room quiet and focused, so you can concentrate on your own practice." |
| "I have an injury. Can I still attend?" — "Maybe." | "Usually, yes. Tell me before class and I will give you alternatives. For anything ongoing, a private session is the better place to start." |
| "If the studio doesn't suit you, I also teach online, or at your home" | "Prefer to practise elsewhere? I also teach online and at your home." |
| "Marylebone, venue confirmed in the WhatsApp group." | "Marylebone, W1. The exact address is shared in the WhatsApp group." |
| "Structured, progressive training that actually moves you forward — not just a good class, a plan." | "You leave each session with one or two things to practise and a plan for the next." |
| "Get first access to new classes, workshops, and international retreats before they fill up." | "One email a month: new classes, 120 Power dates and retreat places before they go public." |
| "Coming Soon — Currently in production" | Remove |
| "Click for details" | "Details" |
| "Private" / "How privates work" | "Private sessions" |

### Spelling

The verb is spelt the American way in several places: "a great way to practice with me at home", "Do I need to practice between sessions?", "practicing 3-4 times per week". The structured data also has "specializing" and "personalized". Change to practise, practising, specialising, personalised.

### New copy: homepage hero

> **Ammar Bass · Yoga teacher, London**
>
> **Strong, structured yoga.**
>
> Private sessions in my West Hampstead studio, and my own Saturday class in Marylebone. I also teach weekly at HOME Wellness, BXR, Flo and Yogarise.
>
> &#91;Book a free 15-minute call\] \[Join the Saturday class\]

Your headline stays. The line above it now carries your name and trade as real text, and the paragraph names both offers and four studios in two sentences.

### New copy: private sessions hero

> **Private yoga sessions in West Hampstead**
>
> One-to-one in my loft studio in NW6, online, or at your home. Whether you have never stepped on a mat or you are working towards a handstand, we build the session around you. From £80. Free parking.
>
> &#91;Book a free 15-minute call\]

### New copy: how it works

> 1. **A free 15-minute call.** Tell me where you are and what you would like to work on. I will tell you honestly how I can help. No pressure to book.
> 2. **A short form.** A few minutes on your experience, your goals and any injuries, so I can plan for you.
> 3. **Your first session.** We talk briefly, then practise at your pace with clear cues and plenty of explanation.
> 4. **A plan.** You leave with one or two things to practise before we next meet.

### New copy: Saturday class page

Square brackets are facts I need from you.

> **Saturday yoga class in Marylebone**
>
> Saturdays, 11:30–13:00, from 5 December 2026. \[Venue\], Marylebone. £15 drop-in.
>
> This is the class I taught at Indaba on Saturday mornings \[for X years\]. Indaba has closed, so the class now runs independently: same time, same teacher, and a longer 90-minute practice.
>
> **What to expect.** A strong vinyasa class with time for arm balances and inversions, taught without music. Suitable if you have some yoga experience. New to yoga? Start with a private session.
>
> **How to join.** Join the WhatsApp group. I post the address, how to book and any changes there.
>
> **Bring** your own mat and water. Doors open at 11:15.
>
> &#91;Join the WhatsApp group\]

### New copy: About opening

> **I'm Ammar. I teach strong, precise yoga in London.**
>
> I came to yoga as a competitive swimmer and powerlifter, so I teach the way an athlete trains: specific skills, clear progressions, steady effort. Two ten-day Vipassana courses changed what I think the effort is for. The work is physical; the point is a calm, attentive mind.

Follow it with a short credentials list, the studios you teach at, and a "Beyond the mat" paragraph for Yorigam.

### New copy: footer line

> Ammar Bass is a yoga teacher in London. Private sessions in West Hampstead (NW6), a Saturday class in Marylebone, and weekly classes at HOME Wellness, BXR, Flo and Yogarise.

## Design

The palette and typeface are right for you and should stay. The gaps are photographs of you teaching, text that is too light and small on a phone, and a layout that treats every section the same.

### Imagery

This is the largest visual problem. Across the pages I reviewed, no image shows you teaching a student.

| Shot needed | Used for | Note |
| --- | --- | --- |
| You adjusting or cueing one student in the loft studio | Private page hero, home offer card | The single most useful image you can add |
| A full room mid-class, from the back or side | Saturday page, home proof strip | Your last Indaba Saturday is 28 November; about 30 people is exactly the proof you need. Ask the room's permission |
| You teaching from the front, clothed, eyes open | Home hero or About | Reads as "teacher" |
| The loft studio, tidy, in daylight, with a person on a mat | Private page | The current photo shows sockets, scattered props and an empty room |
| The Saturday venue | Saturday page | Once confirmed |

The Barbican photo is striking and worth keeping, but lower down or on About. If it stays as the hero, crop it for phones so the text sits on the dark upper area and not across your body. The smiling portrait currently at screen five is the most trustworthy image you have; move it up.

### Type

- Body text is Plus Jakarta Sans at 13–15px in the light weight (300), brown on beige. It measures about 5:1 contrast, which passes the accessibility minimum, but thin letters at that size look faint on a phone outdoors.
- Set body text to 16–17px at regular weight (400) and darken it one step.
- Labels such as "ONE TO ONE" and the studio locations are 10–11px. Raise to 12px minimum.
- Left-align paragraphs. Centred text is fine for a headline and a single line beneath it, nothing longer.
- The page requests five font families from Google. On the About page, where I measured, only Plus Jakarta Sans is used. Have Claude Code confirm across the site and remove the unused ones (Cormorant Garamond, DM Sans, Playfair Display, Open Sans).

### Colour

- Keep cream, beige and espresso.
- Adjacent sections alternate between two beiges that are nearly the same, so the page reads as one long column. Use the dark espresso for one or two full-width sections (proof strip, final call to action) to create rhythm.
- Buttons come in three styles: black pill, outlined pill and a brown rectangle on the videos page. Use one filled style for the primary action and one outlined style for secondary, everywhere.
- The gold used for "NEW" and the small labels is a good accent. Use it for links and labels only.

### Layout

- One primary button per screen. The hero has three.
- Show the schedule by day, not by studio. A visitor asks "when can I come?", not "which studio?".
- Give your own Saturday class a different card from the studio rows, with a photo.
- Cards for studio classes do not need a "Book" button each. One "Book at HOME Wellness" link per studio halves the height of the list.
- Testimonials as a swipeable row on a phone, with first name and context (first name, "private client since 2025").
- Make the footer taller and more useful, as specified in the structure section.

## SEO and AI chatbot visibility

The site is a single-page React app that builds every page in the visitor's browser, and that is the first thing to fix. The page titles and descriptions are well written and already in the HTML; almost nothing else is.

### Technical findings

| Finding | Evidence | Fix |
| --- | --- | --- |
| Pages are empty until JavaScript runs | Every route returns about 3KB of HTML whose body is `<div id="root"></div>`; zero words of body text | Pre-render every route to static HTML at build time |
| Structured data is invisible without JavaScript | 0 JSON-LD blocks in the raw HTML of any page; 3 appear on the homepage after scripts run | Put JSON-LD in the pre-rendered HTML |
| Missing pages return "OK" | `/classes`, `/llms.txt` and a made-up address all return status 200 with the homepage shell | Real 404 page and status |
| Events are fetched after load | Events page shows "Loading events..." first; event details live in a pop-up with no address | Build event pages at build time, one address each |
| Structured data is vague or wrong | Location is the generic centre of London (51.5074, -0.1278); telephone and email are empty strings; West Hampstead is not in the areas served; no prices; training listed as "200hr Registered Yoga Teacher Training" with no school | Rewrite as specified in the stage 2 prompt |
| Sitemap is stale | Five of seven entries dated 1 April 2026; `/practice` missing | Generate at build time with real dates |
| No `llms.txt` | The address returns the homepage shell | Add a plain-text summary of who you are, what you offer, prices and links |
| Heavy images | Hero 700KB; video thumbnail 952KB PNG; no lazy loading | Hero under 150KB, thumbnail to WebP under 100KB, lazy-load below the fold |
| Large script | One 740KB bundle (198KB compressed) loads on every page | Split by route once pre-rendering is in place |
| Generic alt text | Logo, portrait: "Ammar Bass" | Describe the image: "Ammar Bass teaching a private yoga session in his West Hampstead studio" |

Why the first row matters for chatbots: Vercel's analysis of crawler traffic found that OpenAI's and Anthropic's crawlers fetch pages without executing JavaScript, so content built in the browser is not read ([Vercel, The rise of the AI crawler](https://vercel.com/blog/the-rise-of-the-ai-crawler)). Google does render JavaScript, which is why your site can rank there today.

### What each page should be found for

| Page | Main search | Also |
| --- | --- | --- |
| Private sessions | private yoga West Hampstead | private yoga teacher NW6, one-to-one yoga north west London, yoga for beginners private lessons |
| Saturday class | Saturday yoga class Marylebone | vinyasa class Marylebone weekend, yoga near Marylebone station |
| Home | yoga teacher London | strong vinyasa, handstands, arm balances |
| About | Ammar Bass yoga |  |
| Events | 120 Power yoga London | yoga retreat Norfolk May 2027 |
| A new page, later | handstand coaching London | private handstand lessons, learn to handstand London |

The title and first heading of each page should contain its main search in natural words. I ran one search for "private yoga teacher West Hampstead": the results were mostly directories (Bark, Superprof, tutor listings) and a few individual teachers. Your site was not among them. That is one search, not a ranking audit, but it suggests a well-built local page has room to rank.

### Writing for chatbots

Chatbots quote sentences that state facts plainly. Give them some.

- State the offer in one sentence near the top of each page: "Ammar Bass teaches private yoga sessions in West Hampstead, London NW6, from £80."
- Use questions as headings and answer in the first sentence. Your FAQ already does this; it only needs to be in the HTML.
- Keep facts identical everywhere: prices, session lengths, areas, class times. If your site, Instagram bio and studio profiles disagree, a chatbot is less likely to repeat any of them.
- Add "Last updated" dates to the schedule and prices.
- Add FAQ, Person, LocalBusiness, Service-with-price and Event structured data.

### Off the site

These carry as much weight as the site itself for local search and for chatbot answers.

- **Google Business Profile.** If you do not have one, set it up as a service business with West Hampstead as the area and the street address hidden, category "Yoga instructor", linked to the private sessions page. Then ask every private client and Saturday regular for a review. Reviews are the strongest local signal you do not yet have.
- **Links from studios.** Ask HOME Wellness, BXR, Flo and Yogarise to link your teacher profile to ammarbass.com. MoreYoga still has a teacher page for you; ask them to add the link too.
- **Consistent profiles.** Same one-line description, area and link on Instagram, the WhatsApp group description, and any directory you choose to join.
- **Test monthly.** Ask ChatGPT, Claude, Perplexity and Google: "Who teaches private yoga in West Hampstead?" and "Saturday yoga class in Marylebone". Note whether you appear and what they say.

## Staged plan

Five stages, each small enough to hand to Claude Code in one sitting and check on your phone before moving on. Stage 1 has a deadline: the Saturday class starts on 5 December.

| Stage | Outcome | When | Needs from you |
| --- | --- | --- | --- |
| 1. Fix and launch | Facts correct; Saturday class page live; menu renamed | Before 5 Dec | Price, venue wording, confirmed private prices |
| 2. Readable by crawlers | Every page is real HTML with structured data | Week of 7 Dec | Nothing |
| 3. Private journey and homepage | One private page, new homepage order, new footer, booking bar | Mid December | Answers to the open questions |
| 4. Trust and design | Credentials, named testimonials, new photos, type and buttons | January | Photos, testimonials, permissions |
| 5. Off-site and measurement | Google profile, reviews, studio links, tracking | January onwards | About an hour, then ten minutes a month |

**Before you start:** export this doc as Markdown and save it in the site repo as `docs/site-review.md`. Every prompt below tells Claude Code to read it, so the copy and specifications travel with the prompt.

**This week, away from the keyboard:** get a photo of the full room at your last Indaba Saturday on 28 November, and ask three private clients and three Saturday regulars for two sentences you can quote with their first name.

### Stage 1 prompt: fix and launch

```text
Read docs/site-review.md first. Do only Stage 1. Make a branch, show me a plan before editing, and run the site locally at 390px width to check each change.

1. Facts and wording
- Rename the menu items "Private" and "How privates work" to a single item "Private sessions". Replace the word "privates" everywhere in visible text with "private sessions".
- Remove the "Coming Soon / Currently in production" card from /practice. Change the homepage button "View All Practice Videos" to "Watch the class".
- FAQ: remove the sentence that points to a "Classes page"; rewrite the booking, mats and injury answers using the replacements in the Copy section; apply every row of the "Wording that undersells you" table whose current wording appears on the FAQ.
- Fix UK spelling: practise/practising as verbs, specialising, personalised (visible text and JSON-LD).
- Make every HOME Wellness "Book" button use https://homewellness.uk/book-yoga/. List any other booking link that goes to a studio homepage, not a booking page, and ask me for the right URL.
- The discovery call is described as 15 minutes but links to a Calendly event named 30min. The call is 15 minutes. I am changing the Calendly event; ask me for the new link and use it everywhere.
- Apply the newsletter and Saturday card wording from the Copy section.
- Change the Flo location label from Hampstead to West Hampstead (visible text and JSON-LD). Leave the BXR booking link as it is.
- Private sessions page: add a secondary "Message me on WhatsApp" button beside the discovery call button (ask me for the link), and add the line "About 15 minutes' walk from West Hampstead station. Free parking." to the studio section.
- Saturday class price is a £15 drop-in. Booking is through the WhatsApp group for now; build the button so I can later switch it to a booking URL in one place.

2. Saturday class page
- Create /saturday-class using the "New copy: Saturday class page" block. Leave the bracketed facts as clearly marked TODOs and ask me for them.
- Title: "Saturday Yoga Class in Marylebone | Ammar Bass". One h1. Open Graph image and description so the link previews well in WhatsApp and Instagram.
- Add Event JSON-LD: weekly, Saturdays 11:30-13:00 from 2026-12-05, location Marylebone London, organiser Ammar Bass. Add price and venue only when I give them.
- Add "Saturday class" to the menu and footer. Point the homepage hero note and schedule card to this page, keeping the WhatsApp button as the action on the page itself.
- Add the page to the sitemap.

Finish with a list of what changed and what you need from me.
```

### Stage 2 prompt: readable by crawlers

```text
Read docs/site-review.md first. Do only Stage 2. Goal: every public route must return complete HTML, including all visible text and JSON-LD, without JavaScript.

1. Inspect the build (it looks like Vite + React with client-side routing and Supabase for events). Propose the least disruptive way to pre-render all routes to static HTML at build time, and wait for my approval. Options to weigh: vite-react-ssg or a similar static generation plugin, or a build-time prerender step. Do not migrate framework unless you can show it is less work.
2. Events: fetch events from Supabase at build time and generate one static page per event at /events/<slug>, plus the list. Keep the pop-up if you like, but each event needs its own URL, title, description and Event JSON-LD. Tell me how to trigger a rebuild when I add an event.
3. Return a real 404 status and page for unknown routes. Add a permanent redirect only where the review specifies one.
4. JSON-LD, in the static HTML:
- Person: Ammar Bass, yoga teacher, London; sameAs Instagram; knowsAbout as now.
- LocalBusiness (or a more specific subtype you can justify): service area West Hampstead, London NW6 and Marylebone; remove the empty telephone and email fields; remove the generic central London coordinates unless I give real ones; real prices as Offers on the private sessions page.
- FAQPage on every page that shows questions and answers.
- Event on the Saturday class, each event page and the Norfolk retreat.
5. Generate sitemap.xml at build time with every public route and real last-modified dates. Add /llms.txt: a short plain-text summary of who Ammar is, the two main offers with prices, where, how to book, and links to the main pages. Keep robots.txt permissive.
6. Performance: compress the hero image to under 150KB with a phone-sized variant; convert the video thumbnail to WebP under 100KB; lazy-load images below the first screen; remove Google Font families that no component uses; split the JavaScript bundle by route.
7. Write descriptive alt text for every image.

Prove it: for each route, show me the output of fetching the built HTML with curl and counting the words of body text, and the JSON-LD types found.
```

### Stage 3 prompt: private journey, homepage, footer

```text
Read docs/site-review.md first. Do only Stage 3, following the "New structure" and "Copy" sections exactly. Design for a 390px-wide phone first; check desktop after.

1. Private sessions page: rebuild /private-sessions in the order given under "Private sessions page order", using the new hero and "how it works" copy. Prices appear once. Move the private-session questions from /faq to this page. Permanently redirect /how-privates-work to /private-sessions#how-it-works and remove it from the menu and sitemap.
2. Homepage: rebuild in the nine-step "Homepage order". Use the new hero copy with one primary button ("Book a free 15-minute call") and one secondary ("Join the Saturday class"). Leave clearly marked placeholders for the proof strip facts and testimonials I have not supplied yet; do not invent any.
3. Schedule: create /schedule listing classes by day of the week, my Saturday class first and visually distinct. One booking link per studio. The homepage shows a short version with a link to the full page.
4. Menu: Private sessions, Saturday class, Schedule, Events & retreats, About, plus a "Book a free call" button.
5. Phone-only booking bar fixed to the bottom of /private-sessions and /saturday-class, as specified. It must not cover the footer or cookie notices.
6. Footer: rebuild with the five blocks under "Footer", including the Yorigam block and the "Where" line.
7. Remove duplicated wording listed in the "Repeated wording to cut" table.

Show me before and after screenshots of each page at 390px.
```

### Stage 4 prompt: trust and design

```text
Read docs/site-review.md first. Do only Stage 4, following the "Design" section.

1. Type: body text 16-17px at weight 400 with a darker text colour; labels at least 12px; left-align paragraphs longer than two lines. Check contrast is at least 4.5:1 everywhere.
2. Buttons: one filled style and one outlined style across the whole site, including /practice.
3. Section rhythm: use the dark espresso background for the proof strip and the final call to action on each page.
4. About page: new opening from the Copy section; a credentials list; a "Where I teach and have taught" list; a short "Beyond the mat" paragraph about Yorigam with a link. Portrait at the top.
5. Testimonials: a reusable component showing quote, first name and context, swipeable on phones. Use it on the homepage, private sessions and Saturday class pages. I will supply the quotes; do not write any.
6. Images: I will add new photos to public/images. Replace the hero and private-page images as I name them, with phone and desktop crops, and keep text off faces and bodies.
7. Instagram strip: show six images at a tappable size, or remove it if that cannot be done cleanly.

Show me screenshots at 390px for every page.
```

### Stage 5: off-site and measurement

- [ ] Create or claim a Google Business Profile as described in the SEO section.
- [ ] Ask private clients and Saturday regulars for Google reviews; aim for ten.
- [ ] Ask HOME Wellness, BXR, Flo, Yogarise and MoreYoga to link your teacher profile to ammarbass.com.
- [ ] Align the one-line description on Instagram and the WhatsApp group with the footer line.
- [ ] Verify the site in Google Search Console and submit the new sitemap.
- [ ] Ask Claude Code to add analytics events for three actions: discovery call button, WhatsApp group button, new client form submitted.
- [ ] On the first of each month, run the two test questions in the SEO section in each chatbot and note the answers.

## Open questions

Most questions were answered on 21 November. Nothing left open blocks Stage 1 or Stage 2.

### Decided on 21 November

- **Private prices** stay as the site shows: £80 for 60 minutes, £90 for 75 minutes, 15% off a pre-paid pack of five.
- **Discovery call** is 15 minutes. Ammar changes the Calendly event; the site then takes the new link.
- **Saturday class** is a £15 drop-in. The site sends people to the WhatsApp group for now. When the Yorigam booking page is built, the button on `/saturday-class` changes to "Book your place" and WhatsApp becomes the secondary link.
- **Flo** is in West Hampstead. **BXR** is booked through the BXR website, so that link stays.
- **Proof strip:** teaching for over five years, about 12 classes a week.
- **Names approved for the About page:** Stewart Gilchrist, David Kyle, Sivananda, and Emi Tull.
- **Testimonials:** every private client is happy to be quoted by first name. Recent reviews on Superprof are the first source.
- **WhatsApp for private enquiries:** yes. Secondary button on the private sessions page and in the phone booking bar.
- **Google Business Profile:** none yet. Create one; this can start now, it does not depend on the site.
- **The studio** is about a 15-minute walk from West Hampstead station, with free parking. Lead with the parking.
- **Yorigam:** footer block and an About paragraph.
- **Full-class photos:** two supplied. The low-lunge photo (packed room, Ammar in the centre) goes in the homepage proof strip and on the Saturday class page. The savasana photo is the second image on the Saturday class page.

### Still open

- [ ] Saturday class: the venue name once the school confirms, the level to state, and how long the class ran at Indaba.
- [ ] Is the Monday class at Flo really called "Flo"?
- [ ] The WhatsApp number or link to use for private enquiries.
- [ ] The Superprof profile link, or the review text pasted in.
- [ ] Consent from students whose faces are clear in the low-lunge photo, or a crop that avoids them.
- [ ] One photo of you teaching a single student in the loft studio. This is still the main gap.
- [ ] A date for the second free video.
