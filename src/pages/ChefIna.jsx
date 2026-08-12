import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DRAFT / CONCEPT PAGE — Chef Ina retreat catering
 * ─────────────────────────────────────────────────────────────────────────────
 * Every factual claim marked DRAFT below is PLACEHOLDER and must be verified
 * with Ina before this page goes anywhere near a live domain. See DRAFT_NOTES
 * at the bottom of this file for the full list.
 *
 * The enquiry form is intentionally NON-FUNCTIONAL. It validates and shows a
 * success state, but sends nothing anywhere. Wire to Supabase or an email
 * service before launch.
 *
 * Palette derived from inayoga.co.uk's own stylesheet:
 *   #334d3f  primary forest green (her brand colour)
 *   #2a4135  deep green
 *   #456654  mid green
 *   #6f8b7b  muted sage
 *   #80b89a  light green
 *   #bec5fa  periwinkle accent (used sparingly, as she does)
 *   #f0f2f1 / #e5eae7  off-whites
 * Warmed toward food with terracotta #c1734a and cream #faf7f2.
 * Fonts: Playfair Display + Open Sans — both taken from her existing site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Unsplash photos — free to use commercially, no attribution required
// (attribution included anyway as good practice). Swap for real photos of
// Ina's food before launch; these are placeholders for layout only.
// Each URL below was fetched and confirmed to return a real JPEG.
const IMG = {
  // Group around a table eating — Bohdan
  hero: 'https://images.unsplash.com/photo-1681657687044-9bde75edb38e?w=2000&q=80',
  // Woman chopping vegetables at a board — Douglas Fehr
  chef: 'https://images.unsplash.com/photo-1636647511729-6703539ba71f?w=1200&q=80',
  // Overhead vegan salad bowl — Anna Pelzer
  food1: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
  // Berries, nuts and granola — Dan Counsell
  food2: 'https://images.unsplash.com/photo-1504708706948-13d6cbba4062?w=1200&q=80',
  // Middle Eastern spread across a table — Zion C
  food3: 'https://images.unsplash.com/photo-1785734290864-eca98549d0b6?w=1200&q=80',
  // Carrots and leeks at a market in Nice — Peter Wendt
  produce: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1600&q=80',
  // Patio table with a valley view — Flo P
  retreat: 'https://images.unsplash.com/photo-1653228410470-9915c4cfca67?w=1600&q=80',
  // Hands plating food — Sebastian Coman Photography
  hands: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=1200&q=80',
};

const CREDS = [
  { figure: '15+', label: 'years cooking professionally' },
  { figure: '40', label: 'covers cooked solo at events' },
  { figure: '2', label: 'culinary trainings — Bulgaria & San Diego' },
  { figure: 'UK + EU', label: 'available to travel' },
];

const INCLUDED = [
  {
    title: 'Three meals a day',
    body: 'Breakfast laid out before morning practice, a relaxed lunch, and a proper sit-down dinner. Timed around your schedule, not mine.',
  },
  {
    title: 'Snacks and drinks between',
    body: 'Fruit, something baked, herbal teas and infusions kept topped up through the day. Guests never go looking for the kitchen.',
  },
  {
    title: 'Shopping and sourcing',
    body: 'I plan the menus, source locally wherever the venue allows, and handle every trip to the market. You approve the menu and forget about it.',
  },
  {
    title: 'Service and clean-down',
    body: 'Food served, table cleared, kitchen left clean after every meal. You will not find me leaving the washing up for your assistant.',
  },
];

const MENU = [
  {
    meal: 'On waking',
    time: '7:00',
    items: ['Lemon and ginger infusion', 'Seasonal fruit', 'Toasted nuts and seeds'],
  },
  {
    meal: 'Breakfast',
    time: '9:30 — after practice',
    items: [
      'Slow-cooked oats, roasted plum, tahini and honey',
      'Herbed scrambled eggs or turmeric chickpea scramble',
      'Sourdough, cultured butter, preserves',
      'Coffee, and a tea table',
    ],
  },
  {
    meal: 'Lunch',
    time: '13:00',
    items: [
      'Roasted squash, freekeh, pomegranate and mint',
      'Charred broccoli, almond and lemon',
      'Warm flatbread, whipped feta or cashew labneh',
      'Leaves from the market that morning',
    ],
  },
  {
    meal: 'Afternoon',
    time: '16:00',
    items: ['Olive oil and orange cake', 'Fresh mint tea'],
  },
  {
    meal: 'Dinner',
    time: '19:30',
    items: [
      'Butter bean and fennel braise, salsa verde',
      'Slow-roasted aubergine, walnut and dill',
      'Saffron rice, toasted pine nuts',
      'Poached pear, cardamom, pistachio',
    ],
  },
];

const DIETARY = [
  'Vegan',
  'Vegetarian',
  'Gluten-free',
  'Dairy-free',
  'Nut allergies',
  'Ayurvedic principles',
  'Low FODMAP',
  'Pescatarian',
];

const PRICING_VARS = [
  'Number of guests, and whether teachers and staff eat too',
  'Length of the retreat and how many meals each day',
  'Where you are — travel and accommodation for me',
  'The venue kitchen, and whether I need a second pair of hands',
  'Dietary spread across the group',
  'Anything extra — welcome grazing table, celebration dinner, cooking demo',
];

const FIT = [
  { label: 'Group size', value: '8 – 30 guests' },
  { label: 'Retreat length', value: '2 – 10 days' },
  { label: 'Where', value: 'UK and Europe' },
  { label: 'Notice', value: 'Ideally 3 months, but do ask' },
  { label: 'Kitchen', value: "I work in the venue's kitchen" },
  { label: 'Service', value: 'Catering only — I do not teach on retreats I cook for' },
];

// DRAFT — placeholder testimonials. Replace with real ones or delete entirely.
const TESTIMONIALS = [
  {
    quote:
      'Ina fed twenty-two people for six days and I did not think about food once. That is the whole review. I got to teach my retreat instead of counting bread rolls.',
    name: 'DRAFT — retreat organiser',
    detail: 'Placeholder',
  },
  {
    quote:
      'Three of my guests had serious allergies and one was coeliac. Ina handled it so quietly that nobody at the table felt singled out. Everyone ate the same beautiful food.',
    name: 'DRAFT — retreat organiser',
    detail: 'Placeholder',
  },
  {
    quote:
      'She understands the rhythm of a retreat day — that you cannot serve a heavy lunch before an afternoon practice. That knowledge is rarer than it sounds.',
    name: 'DRAFT — yoga teacher',
    detail: 'Placeholder',
  },
];

const FAQ = [
  {
    q: 'Do you cater for the teachers and staff as well as guests?',
    a: 'Yes, and please count them when you tell me numbers. It is the single most common thing organisers forget, and it changes the quote.',
  },
  {
    q: 'What do you need from the venue kitchen?',
    a: 'An oven, four rings, a fridge with real space, and running hot water. I have cooked in far less. If you send me photographs of the kitchen I will tell you honestly whether it works, and whether I need a second pair of hands.',
  },
  {
    q: 'What is not included?',
    a: 'I do not provide crockery, glassware, linens or furniture — venues almost always have these. I do not do deep cleans of the venue at the end of the week, though I always leave the kitchen as I found it. Alcohol is not included but I am happy to advise.',
  },
  {
    q: 'Can you do a cooking demonstration or workshop?',
    a: 'Yes, and guests tend to love it. A ferment or flatbread session sits well on a rest afternoon. Tell me if you want one built into the week.',
  },
  {
    q: 'Do you teach yoga on retreats too?',
    a: 'Not on retreats I cook for. Doing both properly is not possible, and the food is what you are hiring me for. I do teach separately.',
  },
  {
    q: 'How do we hold a date?',
    a: 'Send the enquiry form with your dates and I will tell you within a couple of days whether I am free. A deposit holds the week properly.',
  },
];

export default function ChefIna() {
  const [showDraftBanner, setShowDraftBanner] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    retreatName: '',
    dates: '',
    location: '',
    guests: '',
    dietary: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // NON-FUNCTIONAL: draft only. Sends nothing.
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const field =
    'w-full px-4 py-3 bg-white text-[#22312a] border border-[#cbd6cf] rounded-sm outline-none focus:border-[#334d3f] transition-colors placeholder-[#96a89e] text-[15px]';
  const label = 'block text-[12px] uppercase tracking-[0.14em] text-[#6f8b7b] mb-2';

  return (
    <div className="min-h-screen bg-[#faf7f2]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Helmet>
        <title>Chef Ina | Retreat Catering for Yoga & Wellness Retreats — UK & Europe</title>
        <meta
          name="description"
          content="Private retreat chef for yoga and wellness retreats across the UK and Europe. Culinary-trained, yoga-teacher-led cooking that works with the rhythm of your retreat day."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
        />
      </Helmet>

      {/* ── DRAFT BANNER ───────────────────────────────────────────────── */}
      {showDraftBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#c1734a] text-white px-5 py-3 flex items-start sm:items-center justify-between gap-4 shadow-lg">
          <p className="text-[13px] leading-relaxed">
            <strong className="font-semibold">Draft concept.</strong> Credentials,
            numbers and testimonials on this page are placeholders and not yet
            true. The enquiry form does not send anywhere.
          </p>
          <button
            onClick={() => setShowDraftBanner(false)}
            className="text-white/80 hover:text-white text-xl leading-none shrink-0"
            aria-label="Dismiss draft notice"
          >
            ×
          </button>
        </div>
      )}

      {/* ── NAV ────────────────────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-2">
            <span
              className="text-[22px] text-white tracking-wide"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ina
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">
              Retreat Chef
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[
              ['The food', '#food'],
              ['A day of eating', '#menu'],
              ['How it works', '#included'],
              ['Cost', '#pricing'],
            ].map(([t, h]) => (
              <a
                key={h}
                href={h}
                className="text-[13px] text-white/80 hover:text-white transition-colors tracking-wide"
              >
                {t}
              </a>
            ))}
          </div>
          <a
            href="#enquire"
            className="text-[12px] uppercase tracking-[0.14em] px-5 py-2.5 border border-white/50 text-white hover:bg-white hover:text-[#334d3f] transition-colors rounded-full"
          >
            Enquire
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section id="top" className="relative h-[92vh] min-h-[600px] flex items-center">
        <img
          src={IMG.hero}
          alt="A long table set for a shared meal outdoors"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a4135]/75 via-[#2a4135]/55 to-[#2a4135]/85" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#bec5fa] mb-6">
              Retreat catering · UK &amp; Europe
            </p>
            <h1
              className="text-[42px] md:text-[64px] leading-[1.05] text-white mb-7"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Do you need a chef for your&nbsp;retreat?
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 font-light">
              I cook for yoga and wellness retreats across the UK and Europe — three
              meals a day, every dietary requirement in the room, and a kitchen you
              never have to think about. So you can teach your retreat instead of
              running it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#enquire"
                className="inline-block text-center px-8 py-4 bg-[#faf7f2] text-[#2a4135] rounded-full text-[13px] uppercase tracking-[0.14em] hover:bg-white transition-colors"
              >
                Check my availability
              </a>
              <a
                href="#menu"
                className="inline-block text-center px-8 py-4 border border-white/50 text-white rounded-full text-[13px] uppercase tracking-[0.14em] hover:bg-white/10 transition-colors"
              >
                See a day of eating
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY BAR ────────────────────────────────────────────── */}
      <section className="bg-[#334d3f] px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {CREDS.map((c) => (
            <div key={c.label}>
              <p
                className="text-[32px] md:text-[38px] text-[#bec5fa] leading-none mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {c.figure}
              </p>
              <p className="text-[13px] text-white/70 leading-snug">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE HOOK: chef + yoga teacher ──────────────────────────────── */}
      <section id="food" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-6">
              Why me
            </p>
            <h2
              className="text-[34px] md:text-[44px] leading-[1.15] text-[#22312a] mb-7"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              I have been on your side of the retreat.
            </h2>
            <div className="space-y-5 text-[16px] leading-[1.75] text-[#4a5a52]">
              <p>
                I am a yoga teacher. I teach fifteen classes a week, I have run my own
                workshops, and I have eaten a lot of retreat food — some of it lovely,
                a lot of it an afterthought.
              </p>
              <p>
                So I know things a chef arriving cold does not. That a heavy lunch
                before an afternoon practice is a mistake. That people are ravenous
                after a strong morning class and need to eat within twenty minutes, not
                an hour. That the last night wants a bit of ceremony. That someone
                always arrives with a dietary requirement they forgot to mention.
              </p>
              <p>
                And I cook properly — trained in Bulgaria and later in San Diego, then
                years in hotel kitchens where forty covers is a normal Tuesday. Warmth
                without competence is a nice idea that falls apart on day three.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={IMG.chef}
              alt="A chef preparing food in a kitchen filled with natural light"
              className="w-full h-[420px] md:h-[560px] object-cover rounded-sm"
            />
            <p className="mt-3 text-[11px] text-[#96a89e] italic">
              Placeholder image — replace with a photo of Ina
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOD PILLARS ───────────────────────────────────────────────── */}
      <section className="bg-[#e5eae7] px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-5">
              The food
            </p>
            <h2
              className="text-[34px] md:text-[44px] leading-[1.15] text-[#22312a] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Vegetable-led, generous, and built for the week ahead.
            </h2>
            <p className="text-[16px] leading-[1.75] text-[#4a5a52]">
              Mostly plants, cooked with real technique. Nothing austere, nothing
              punishing, no tiny portions in the name of wellness. Food people talk
              about on the drive home.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              [IMG.food1, 'A colourful vegetable bowl'],
              [IMG.food2, 'A breakfast spread in natural light'],
              [IMG.food3, 'Shared plates on a table'],
            ].map(([src, alt]) => (
              <img
                key={src}
                src={src}
                alt={alt}
                className="w-full h-[260px] md:h-[320px] object-cover rounded-sm"
              />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-14">
            {[
              {
                t: 'Seasonal and local',
                b: 'Menus are written after I know where we are. What is good at the market that week beats what looked good on a plan in February.',
              },
              {
                t: 'Built around the schedule',
                b: 'Light before practice, substantial after. Meals land when your timetable needs them, not when the kitchen happens to be ready.',
              },
              {
                t: 'Everyone eats the same meal',
                b: 'I would rather adapt one dish for the whole table than serve someone a sad separate plate. Nobody should feel like an inconvenience.',
              },
            ].map((p) => (
              <div key={p.t}>
                <h3
                  className="text-[21px] text-[#22312a] mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {p.t}
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#4a5a52]">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE MENU ────────────────────────────────────────────────── */}
      <section id="menu" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-5">
              Sample menu
            </p>
            <h2
              className="text-[34px] md:text-[44px] leading-[1.15] text-[#22312a] mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              One day on a retreat
            </h2>
            <p className="text-[16px] leading-[1.75] text-[#4a5a52] max-w-xl mx-auto">
              An autumn day in a European villa. Yours would be written for your
              venue, your season and your schedule.
            </p>
          </div>

          <div className="space-y-px bg-[#dbe3de] rounded-sm overflow-hidden">
            {MENU.map((m) => (
              <div
                key={m.meal}
                className="bg-[#faf7f2] px-6 md:px-10 py-8 grid md:grid-cols-[220px_1fr] gap-4 md:gap-10"
              >
                <div>
                  <h3
                    className="text-[22px] text-[#334d3f]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {m.meal}
                  </h3>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-[#96a89e] mt-1">
                    {m.time}
                  </p>
                </div>
                <ul className="space-y-2.5 self-center">
                  {m.items.map((i) => (
                    <li
                      key={i}
                      className="text-[15px] leading-[1.6] text-[#4a5a52] flex gap-3"
                    >
                      <span className="text-[#80b89a] shrink-0 mt-[2px]">—</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIETARY ────────────────────────────────────────────────────── */}
      <section className="relative px-6 md:px-12 py-20 md:py-24 overflow-hidden">
        <img
          src={IMG.produce}
          alt="Fresh seasonal produce"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2a4135]/88" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#bec5fa] mb-5">
            Dietary requirements
          </p>
          <h2
            className="text-[32px] md:text-[42px] leading-[1.15] text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
          >
            Send me the list. All of it.
          </h2>
          <p className="text-[16px] leading-[1.75] text-white/80 max-w-2xl mx-auto mb-12">
            Every retreat has a coeliac, a vegan, someone off dairy and someone with a
            nut allergy. This is normal and it is not a problem — it is most of the
            job. Yoga students in particular arrive with every way of eating there is,
            and I would far rather know in advance than improvise on the night.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {DIETARY.map((d) => (
              <span
                key={d}
                className="px-5 py-2.5 border border-white/25 rounded-full text-[13px] text-white/85"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ────────────────────────────────────────────── */}
      <section id="included" className="bg-[#e5eae7] px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-5">
                How it works
              </p>
              <h2
                className="text-[34px] md:text-[44px] leading-[1.15] text-[#22312a] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
              >
                What you are actually hiring.
              </h2>
              <p className="text-[16px] leading-[1.75] text-[#4a5a52]">
                Not just someone who cooks. Someone who takes the entire food
                question off your plate for the length of the retreat.
              </p>
            </div>
            <img
              src={IMG.hands}
              alt="Hands plating a dish"
              className="w-full h-[280px] md:h-[340px] object-cover rounded-sm"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-11">
            {INCLUDED.map((item, i) => (
              <div key={item.title} className="flex gap-5">
                <span
                  className="text-[15px] text-[#80b89a] shrink-0 pt-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="text-[21px] text-[#22312a] mb-2.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#4a5a52]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────── */}
      <section id="pricing" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-5">
              Cost
            </p>
            <h2
              className="text-[34px] md:text-[44px] leading-[1.15] text-[#22312a] mb-7"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              How I quote.
            </h2>
            <div className="space-y-5 text-[16px] leading-[1.75] text-[#4a5a52]">
              <p>
                Every retreat is quoted individually, and I split it into two clear
                parts so you can see exactly what you are paying for:
              </p>
              <div className="border-l-2 border-[#80b89a] pl-5 space-y-3">
                <p>
                  <strong className="text-[#22312a] font-semibold">My fee</strong> — a
                  daily rate for cooking, planning and service.
                </p>
                <p>
                  <strong className="text-[#22312a] font-semibold">Food costs</strong> —
                  billed at cost, with receipts. I do not hide a margin in your grocery
                  bill.
                </p>
              </div>
              <p>
                For context, retreat chefs in the UK and Europe generally work out
                between{' '}
                <strong className="text-[#22312a] font-semibold">
                  £75 and £150 per guest per day
                </strong>{' '}
                all in. Where you land depends on the things listed here.
              </p>
              <p className="text-[15px] text-[#6f8b7b]">
                Travel and accommodation are additional for retreats outside London. A
                deposit holds your dates.
              </p>
            </div>
          </div>
          <div className="bg-[#e5eae7] p-8 md:p-10 rounded-sm self-start">
            <h3 className="text-[12px] uppercase tracking-[0.16em] text-[#6f8b7b] mb-6">
              What changes the number
            </h3>
            <ul className="space-y-4">
              {PRICING_VARS.map((v) => (
                <li key={v} className="text-[15px] leading-[1.6] text-[#4a5a52] flex gap-3">
                  <span className="text-[#80b89a] shrink-0">·</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FIT / LOGISTICS ────────────────────────────────────────────── */}
      <section className="bg-[#334d3f] px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#bec5fa] mb-5">
              Practical
            </p>
            <h2
              className="text-[34px] md:text-[42px] leading-[1.15] text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Whether I am the right fit.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {FIT.map((f) => (
              <div key={f.label} className="border-t border-white/15 pt-5">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#80b89a] mb-2">
                  {f.label}
                </p>
                <p className="text-[16px] text-white/90 leading-snug">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-5">
              From retreat organisers
            </p>
            <h2
              className="text-[34px] md:text-[42px] leading-[1.15] text-[#22312a]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              What it is like to work with me.
            </h2>
            <p className="mt-5 inline-block text-[12px] text-[#c1734a] border border-[#c1734a]/40 bg-[#c1734a]/5 rounded-full px-4 py-1.5">
              Placeholder quotes — to be replaced with real ones
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <figure key={t.quote} className="bg-[#e5eae7] p-8 rounded-sm flex flex-col">
                <blockquote
                  className="text-[16px] leading-[1.75] text-[#3d4f46] mb-6 flex-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  “{t.quote}”
                </blockquote>
                <figcaption className="text-[13px] text-[#6f8b7b]">
                  <span className="block text-[#22312a]">{t.name}</span>
                  {t.detail}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="bg-[#e5eae7] px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-5">
              Questions
            </p>
            <h2
              className="text-[34px] md:text-[42px] leading-[1.15] text-[#22312a]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              The things organisers ask.
            </h2>
          </div>
          <div className="divide-y divide-[#cbd6cf]">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex justify-between items-start gap-6 cursor-pointer list-none">
                  <span className="text-[17px] text-[#22312a] leading-snug">{f.q}</span>
                  <span className="text-[#80b89a] text-xl leading-none shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#4a5a52] pr-10">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY ────────────────────────────────────────────────────── */}
      <section id="enquire" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-14 md:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6f8b7b] mb-5">
              Enquire
            </p>
            <h2
              className="text-[34px] md:text-[44px] leading-[1.15] text-[#22312a] mb-7"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Tell me about your retreat.
            </h2>
            <p className="text-[16px] leading-[1.75] text-[#4a5a52] mb-8">
              The more you tell me now, the more useful my first reply will be. Dates
              and guest numbers are the two I really need — everything else we can work
              out together.
            </p>
            <img
              src={IMG.retreat}
              alt="A stone villa among trees, the kind of place retreats happen"
              className="w-full h-[220px] object-cover rounded-sm"
            />
          </div>

          <div className="bg-[#e5eae7] p-7 md:p-9 rounded-sm">
            {submitted ? (
              <div className="py-14 text-center">
                <p
                  className="text-[26px] text-[#334d3f] mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Thank you.
                </p>
                <p className="text-[15px] text-[#4a5a52] leading-relaxed">
                  I will come back to you within two days with availability and a
                  rough quote.
                </p>
                <p className="mt-6 text-[12px] text-[#c1734a]">
                  (Draft — nothing was actually sent)
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={label} htmlFor="ci-name">Your name</label>
                    <input
                      id="ci-name"
                      className={field}
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="ci-email">Email</label>
                    <input
                      id="ci-email"
                      type="email"
                      className={field}
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className={label} htmlFor="ci-retreat">Retreat name</label>
                  <input
                    id="ci-retreat"
                    className={field}
                    value={form.retreatName}
                    onChange={(e) => setForm({ ...form, retreatName: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={label} htmlFor="ci-dates">Dates</label>
                    <input
                      id="ci-dates"
                      className={field}
                      placeholder="e.g. 12–18 May"
                      required
                      value={form.dates}
                      onChange={(e) => setForm({ ...form, dates: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="ci-location">Location</label>
                    <input
                      id="ci-location"
                      className={field}
                      placeholder="Town, country"
                      required
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className={label} htmlFor="ci-guests">
                    Numbers — guests, plus teachers and staff
                  </label>
                  <input
                    id="ci-guests"
                    className={field}
                    placeholder="e.g. 18 guests + 2 teachers"
                    required
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  />
                </div>

                <div>
                  <label className={label} htmlFor="ci-dietary">
                    Dietary requirements you know of
                  </label>
                  <input
                    id="ci-dietary"
                    className={field}
                    placeholder="e.g. 4 vegan, 1 coeliac, 1 nut allergy"
                    value={form.dietary}
                    onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                  />
                </div>

                <div>
                  <label className={label} htmlFor="ci-message">
                    Anything else — the venue, the schedule, what you are hoping for
                  </label>
                  <textarea
                    id="ci-message"
                    rows="4"
                    className={field}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#334d3f] text-white rounded-full text-[13px] uppercase tracking-[0.14em] hover:bg-[#2a4135] transition-colors"
                >
                  Send enquiry
                </button>
                <p className="text-[12px] text-[#96a89e] text-center leading-relaxed">
                  Draft form — this does not send anywhere yet.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#2a4135] px-6 md:px-12 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <p
                className="text-[24px] text-white mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Ina
              </p>
              <p className="text-[14px] leading-[1.7] text-white/60">
                Retreat chef and yoga teacher. Cooking for yoga and wellness retreats
                across the UK and Europe.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#80b89a] mb-4">
                On this page
              </h4>
              <nav className="grid gap-2.5">
                {[
                  ['The food', '#food'],
                  ['A day of eating', '#menu'],
                  ['How it works', '#included'],
                  ['Cost', '#pricing'],
                  ['Enquire', '#enquire'],
                ].map(([t, h]) => (
                  <a
                    key={h}
                    href={h}
                    className="text-[14px] text-white/60 hover:text-white transition-colors"
                  >
                    {t}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#80b89a] mb-4">
                Get in touch
              </h4>
              <p className="text-[14px] text-white/60 leading-relaxed">
                London, UK
                <br />
                Available UK &amp; Europe
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-3">
            <p className="text-[12px] text-white/40">© 2026 Ina — draft concept</p>
            <p className="text-[12px] text-[#c1734a] leading-relaxed max-w-3xl">
              <strong>Draft notice.</strong> This page is a working concept. The
              credentials, statistics, testimonials and menus are placeholders written
              to show the layout, and are not verified facts. Photographs are stock
              images from Unsplash, not Ina's food. The enquiry form does not send
              anywhere. All of this needs replacing before the page is published.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DRAFT_NOTES — everything that must be verified or replaced before launch
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * FACTUAL CLAIMS THAT ARE CURRENTLY INVENTED:
 *   · "15+ years cooking professionally"      — need real figure
 *   · "40 covers cooked solo at events"       — based on your note, confirm
 *   · "trained in Bulgaria and San Diego"     — need school names + qualification
 *   · "years in hotel kitchens"               — need which, how long
 *   · "I teach fifteen classes a week"        — taken from her yoga site, confirm
 *   · All three testimonials                  — entirely fabricated placeholders
 *   · "£75–£150 per guest per day"            — real market range from research,
 *                                               but confirm Ina is happy to show it
 *   · Group size / length / notice in FIT     — assumptions, confirm with her
 *
 * ALSO OUTSTANDING:
 *   · Food hygiene certificate + public liability insurance — organisers ask.
 *     Worth adding a line once confirmed.
 *   · Contact email / phone — deliberately omitted rather than invented.
 *   · Enquiry form sends nowhere. Wire to Supabase (a `catering_enquiries`
 *     table) or an email service.
 *   · All photography is Unsplash stock. Replace with real photos of Ina's food
 *     — this offering lives or dies on that.
 *   · Page is set to noindex/nofollow while it is a draft.
 * ─────────────────────────────────────────────────────────────────────────────
 */
