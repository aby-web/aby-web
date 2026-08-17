import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DRAFT / CONCEPT PAGE — Story
 * ─────────────────────────────────────────────────────────────────────────────
 * The long version of who Ammar is, as distinct from /about (which is yoga-
 * teaching-facing) and /cv (which is a teaching CV). Written at full candour at
 * Ammar's explicit instruction: "very privileged, I used to hide it, no more."
 *
 * EVERYTHING HERE IS AMMAR'S OWN ACCOUNT, restated. Nothing is invented — but
 * nothing has been fact-checked either, and several passages concern living
 * relatives and a family business involving firearms and violent deaths. Read
 * DRAFT_NOTES at the foot of this file before this page goes anywhere.
 *
 * DELIBERATE SEPARATION: this material stays OFF /coaching. A corporate buyer
 * expensing sessions does not need the arms-trade history or the ayahuasca
 * ceremony; both invite questions that have nothing to do with why they hire
 * him. /coaching links here only if Ammar decides it should.
 *
 * Site palette, same as /coaching:
 *   #F4EFE6 cream · #1C1410 near-black · #785E3D brown · #6B5740 body
 *   #EAE0CF alt section · #C9B99A rule · #C9A87C light accent on dark
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Unsplash — free for commercial use. Each URL was fetched AND VIEWED; each
// returns a real JPEG. Chosen for place and texture rather than for depicting
// any specific event described here — see DRAFT_NOTES on why that distinction
// matters on a page of true personal history.
const IMG = {
  // Ama Dablam, Nepali Himalaya — snow, rock and cloud. Chosen over the obvious
  // options (Hong Kong skyline, container ports) because those each belong to a
  // single chapter and would over-weight it; this page spans Hong Kong, Yemen,
  // Pakistan, Bristol, Bangalore, Latin America and the Himalayas. The range is
  // the subject. Mountains also carry BOTH ends of the story — the foothills his
  // mother's family come from, and the solo hike years later — without claiming
  // to document either. NOT the /coaching hero, which was a placeholder here.
  hero: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=2000&q=80',
};

// The spine of the page. Each is Ammar's own material, in his framing.
const CHAPTERS = [
  {
    k: 'Origin',
    h: 'Trunks, and the people of the trunks',
    body: [
      'My great-grandfathers left India by ship. They went to Yemen, then on to Hong Kong, and became merchants, successful ones, selling trunks. The family name was once Petiwala: peti, the trunks; wala, the people of. You were named for the thing you sold.',
      'My father built on that and then went well beyond it. He has traded almost everything, from second-hand railroad track at one point, and at another he was among the largest importers of mangoes anywhere. I grew up watching someone treat commerce as something close to an art form.',
    ],
  },
  {
    k: 'The other side',
    h: 'Bandookwala',
    body: [
      'My mother\'s family come from the foothills of the Himalayas in Pakistan, and they are known as bandookwala, the people of the gun. They manufactured firearms and ammunition.',
      'That has largely stopped, and I am glad it has. It is dangerous work in a dangerous place, and the danger did not stay theoretical: people in my mother\'s family were murdered. Not by anything they made. They were killed because others wanted supply for free, and because of rivalry over the business.',
      'It does not sit easily with me and I am not going to pretend otherwise. But times were genuinely different, and I am not in a position to sit in judgement on people making a living in a place I did not have to survive.',
      'I put it here because leaving it out would make this a brochure rather than an account. Both sides of my family made things and sold things. One side sold trunks. The other sold guns.',
    ],
  },
  {
    k: 'Upbringing',
    h: 'Hong Kong, then England',
    body: [
      'I grew up in Hong Kong, a financial hub, and about as concentrated a lesson in money as a city can offer. I was privately educated there at German Swiss International School, and later in the UK at Eltham College.',
      'I read Economics at Bristol and stayed on for a masters in finance. Then I qualified as a chartered accountant. Every step of that was a step further into a life that had been laid out clearly in front of me, and that I was well equipped to want.',
    ],
  },
  {
    k: 'The turn',
    h: 'I was good at it. I left anyway.',
    body: [
      'I never made it to McKinsey or JP Morgan, and I want to be accurate about that. This is not a story about walking away from the summit. I got far enough in to see the shape of it clearly, including in Bangalore, working in the startup scene there.',
      'I left because it did not suit my personality. Not burnout. Nearly everyone I know eventually burned out, and I could see it coming far enough ahead to get out of the way. There was no crisis and no dramatic hinge. I could see the next thirty years and I did not want them, and I was fortunate enough to be able to say so.',
      'The privilege in that sentence is the point. Being able to leave is not a virtue. It is a circumstance, and for a long time I preferred to keep quiet about it. I have stopped doing that, because pretending otherwise makes the story less true and less useful to anyone hearing it.',
    ],
  },
  {
    k: 'The part I am least comfortable writing',
    h: 'I was prescribed productivity, and got addicted to it',
    body: [
      'At one point during my corporate life I was diagnosed with ADHD and prescribed medication. The stated purpose, as I understood it and as I wanted it, was to make me more productive.',
      'What it actually did was get me addicted to stimulants. It interfered with my ability to eat. It interfered with my ability to urinate. I was, on paper, performing well.',
      'I am not making an argument about anyone else\'s diagnosis or anyone else\'s medication. Plenty of people are helped enormously, and I am not qualified to have a general opinion. I am describing what happened to me, in a context where the problem being solved was my output rather than my life.',
      'This is the clearest answer I have to why I left before I burned out. I could already see what I was willing to do to myself to keep up, because I had done it.',
    ],
  },
  {
    k: 'Range',
    h: 'From no electricity to considerable wealth',
    body: [
      'I have lived in communities in Latin America where there was no electricity. I have also lived at the other end of things entirely. Across quite a wide spectrum, I have watched how people organise a life and what they turn out to need.',
      'That range is the most genuinely useful thing I have. Not the qualifications. What matters is that I have sat with people at both ends and found the difference between them smaller than anyone expects.',
    ],
  },
];

// A spine for the page. Deliberately sparse: DATES ARE MOSTLY MISSING because
// Ammar has not given them, and inventing a chronology on a page of true
// personal history would be the worst kind of error. Entries marked `year: null`
// render as a marked gap rather than a guess. This is the structure to bulk the
// page out against — see DRAFT_NOTES.
const TIMELINE = [
  { year: null, what: 'Born; childhood in Hong Kong', note: 'German Swiss International School' },
  { year: null, what: 'Boarding in the UK', note: 'Eltham College' },
  { year: null, what: 'Economics at Bristol', note: 'Where he met Julius' },
  { year: null, what: 'MSc Finance' },
  { year: null, what: 'Qualified as a chartered accountant' },
  { year: null, what: 'Corporate finance, London' },
  { year: null, what: 'ADHD diagnosis and prescription', note: 'The stimulant years' },
  { year: null, what: 'Bangalore', note: 'The startup scene' },
  { year: null, what: 'Latin America', note: 'Communities without electricity' },
  { year: null, what: 'Left finance' },
  { year: '2022', what: 'First Vipassana course', note: 'Dhamma Dippa, 10 days' },
  { year: '2022', what: '200h Hatha teacher training', note: 'Sivananda Kutir, Himalayas' },
  { year: null, what: 'Solo hike, Nepali Himalayas' },
  { year: null, what: 'Ayahuasca ceremony, Wales', note: '3–4 days' },
  { year: '2024', what: 'Rocket L1 with David Kyle' },
  { year: '2025', what: 'Second Vipassana course', note: 'Dhamma Dippa' },
  { year: '2026', what: 'Teaching across London; this page' },
];

// Formative experiences, recent-era. Ammar's own list.
const FORMATIVE = [
  {
    t: 'Two Vipassana courses',
    d: 'Ten days each, in silence, at Dhamma Dippa, in 2022 and 2025. Not a retreat in any restful sense. The single most useful thing I have done for my capacity to pay attention.',
  },
  {
    t: 'A month at Sivananda Kutir',
    d: 'An ashram in the Himalayas, where I also completed 200 hours of teacher training. Living the schedule rather than visiting it.',
  },
  {
    t: 'Solo through the Nepali Himalayas',
    d: 'A long hike, alone. Sustained physical difficulty with nobody to perform for is a specific kind of information about yourself.',
  },
  {
    t: 'Ayahuasca in Wales',
    d: 'Three to four days of ceremony. I am not evangelical about it and I would not recommend it casually, but leaving it off a page about how I got here would be dishonest.',
  },
];

export default function Story() {
  const [showDraftBanner, setShowDraftBanner] = useState(true);

  return (
    <div
      className="min-h-screen bg-[#F4EFE6] overflow-x-hidden"
      style={{ paddingBottom: showDraftBanner ? '5.5rem' : 0 }}
    >
      <Helmet>
        <title>Story | Ammar Bass</title>
        <meta
          name="description"
          content="The longer version. Hong Kong, a merchant family, finance, and the decision to leave it. Ammar Bass."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </Helmet>

      {/* dark: the hero is a dark photograph. */}
      <Nav theme="dark" />

      {/* ── DRAFT BANNER ───────────────────────────────────────────────── */}
      {showDraftBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#B35C2E] text-white px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-lg">
          <p className="text-[12px] sm:text-[13px] leading-snug sm:leading-relaxed">
            <strong className="font-semibold">Draft.</strong>{' '}
            <span className="sm:hidden">
              Your own account, unedited by anyone else. Not published.
            </span>
            <span className="hidden sm:inline">
              Not published or linked from anywhere on the site. This is your own
              account restated. Read it for accuracy, and for how much of it you
              actually want public.
            </span>
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

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center">
        <img
          src={IMG.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1410]/94 via-[#1C1410]/80 to-[#1C1410]/45" />

        <div className="relative max-w-6xl mx-auto px-8 md:px-12 w-full pt-28 pb-20">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#C9A87C] mb-8">
              The longer version
            </p>
            <h1 className="text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl font-light text-white mb-8">
              I used to leave
              <br />
              most of this out.
            </h1>
            <p className="text-[17px] md:text-lg font-light leading-relaxed text-white/85 max-w-xl">
              For years this website said one thing about me: yoga teacher, London.
              That was true, and it was also a considerable edit. Here is the rest of
              it: where I came from, what I trained in, and why I left.
            </p>
          </div>
        </div>
      </section>

      {/* ── OPENING ────────────────────────────────────────────────────── */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-[17px] md:text-[19px] font-light leading-[1.75] text-[#1C1410]">
            <p>
              I kept this site streamlined for a long time, deliberately. Yoga and
              movement, nothing else. It seemed cleaner, and I think I was also slightly
              embarrassed about the rest, because a privileged background is not the sort
              of thing you volunteer.
            </p>
            <p className="text-[#6B5740]">
              I have changed my mind. Not because the background makes me better at
              anything, but because leaving it out makes me a stock photograph of a yoga
              teacher, and I am not that. The range is the interesting part, and hiding
              it was costing more than it saved.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHAPTERS ───────────────────────────────────────────────────── */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-24">
        <div className="max-w-4xl mx-auto space-y-20">
          {CHAPTERS.map((c) => (
            <article key={c.k}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-5">
                {c.k}
              </p>
              <h2 className="text-2xl md:text-4xl font-light text-[#1C1410] mb-7 leading-snug">
                {c.h}
              </h2>
              <div className="space-y-5 max-w-2xl">
                {c.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-[16px] md:text-[17px] font-light leading-[1.75] text-[#6B5740]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ───────────────────────────────────────────────────── */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
            The order it happened in
          </p>
          <h2 className="text-2xl md:text-4xl font-light text-[#1C1410] mb-6 leading-snug">
            A spine to hang the rest on.
          </h2>
          <p className="text-[15px] font-light leading-relaxed text-[#6B5740] mb-12 max-w-xl">
            Most of the dates are missing because I have not given them yet. Filling
            them in is the fastest way to turn this page from a set of themes into an
            actual account.
          </p>

          <ol className="relative border-l border-[#C9B99A] ml-2">
            {TIMELINE.map((t, i) => (
              <li key={i} className="relative pl-8 pb-9 last:pb-0">
                <span
                  className={`absolute -left-[5px] top-[7px] w-[9px] h-[9px] rounded-full ${
                    t.year ? 'bg-[#785E3D]' : 'bg-[#C9B99A]'
                  }`}
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {t.year ? (
                    <span className="text-[13px] tracking-wider text-[#785E3D] tabular-nums">
                      {t.year}
                    </span>
                  ) : (
                    <span className="text-[11px] uppercase tracking-wider text-[#B35C2E] border border-dashed border-[#B35C2E]/60 px-1.5 py-0.5 rounded">
                      date?
                    </span>
                  )}
                  <span className="text-[16px] md:text-[17px] font-light text-[#1C1410]">
                    {t.what}
                  </span>
                </div>
                {t.note && (
                  <p className="text-[14px] font-light text-[#6B5740] mt-1.5">{t.note}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FORMATIVE ──────────────────────────────────────────────────────
          Deliberately NO photograph here. This section lists four distinct
          experiences (Vipassana, an ashram, a solo hike, an ayahuasca ceremony);
          any single stock image privileges one and, worse, sits beside a true
          first-person account and reads as documentation of it. Runs on type. */}
      <section className="bg-[#1C1410] px-8 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A87C] mb-6">
            What actually shaped it
          </p>
          <h2 className="text-2xl md:text-4xl font-light text-white mb-14 leading-snug max-w-2xl">
            The more recent ones. There are others, from when I was younger.
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {FORMATIVE.map((f) => (
              <div key={f.t} className="border-t border-white/15 pt-6">
                <h3 className="text-[17px] text-white mb-3">{f.t}</h3>
                <p className="text-[15px] font-light leading-relaxed text-white/60">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JULIUS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
            Julius
          </p>
          <h2 className="text-2xl md:text-4xl font-light text-[#1C1410] mb-8 leading-snug">
            Most of the courage in this story is his.
          </h2>
          <div className="space-y-6 text-[16px] md:text-[17px] font-light leading-[1.75] text-[#6B5740] max-w-2xl">
            <p>
              Julius was one of my closest friends at university. He had a theory he
              held with total conviction: that by our early twenties we had already
              accumulated enough common sense and practical skill that we would never
              end up homeless. We would always, somehow, find a way. And if that was
              true, if the actual floor was really that far below us, then there
              was no sensible reason to hold back.
            </p>
            <p>
              I have tested that theory more or less continuously since, and it has
              held every time. Leaving a career I had spent years qualifying for was
              only thinkable because he had already convinced me the downside was
              survivable.
            </p>
            <p className="text-[#1C1410]">
              He died. Almost every risk I have taken since traces back to him, and I
              would rather say that plainly than let it sit unspoken underneath
              everything else on this page.
            </p>
          </div>

          {/* Mexico is still unwritten — Ammar mentioned "his link to Mexico"
              without explaining it. Do not invent this. */}
          <div className="mt-10 border-2 border-dashed border-[#B35C2E] bg-[#B35C2E]/8 px-6 py-5 rounded-md max-w-2xl">
            <p className="text-[12px] uppercase tracking-wider font-semibold text-[#8A4620] mb-2">
              Still missing, your words
            </p>
            <p className="text-[14px] leading-relaxed text-[#6B5740]">
              You mentioned &ldquo;his link to Mexico&rdquo; and I still do not know
              what that refers to. Also worth deciding: whether to use his surname,
              and whether his family should see this page before it is public.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHERE IT LEADS ─────────────────────────────────────────────── */}
      <section className="bg-[#1C1410] px-8 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A87C] mb-8">
            Where this is going
          </p>
          <div className="space-y-6 text-[17px] md:text-[19px] font-light leading-[1.75] text-white/85">
            <p>
              I am less interested than I used to be in teaching postures, and more
              interested in what happens to people when you take away the things they
              use to avoid themselves.
            </p>
            <p className="text-white/60">
              Some of that is one-to-one work. Some of it is heading somewhere else
              entirely. Time in wilderness, without phones, with fire and cooking
              and actual conversation. That is next year&rsquo;s problem, and it is the
              one I am most interested in.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DRAFT_NOTES — read before this page goes anywhere
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * NOTHING ON THIS PAGE IS INVENTED — but nothing is verified either. Every
 * passage is Ammar's own account, restated in his framing. It still needs a
 * careful read for accuracy, because several claims are specific:
 *   · Petiwala etymology (peti = trunks, wala = people of)
 *   · The Yemen → Hong Kong migration route, and that it was by ship
 *   · "largest importer of mangoes" — Ammar said "at one point the largest";
 *     confirm the scope (largest in Hong Kong? in a region?) before publishing
 *   · German Swiss International School / Eltham College / Bristol / MSc
 *   · Chartered accountant — confirm how he wants it stated (ACA? ACCA?)
 *
 * THE PARTS THAT NEED A DECISION, NOT JUST A PROOFREAD:
 *   · BANDOOKWALA. Written at full candour at Ammar's instruction. CORRECTED
 *     13 Aug: an earlier draft implied the murders involved guns the family
 *     made. They did not. Members of his mother's family were MURDERED — killed
 *     by people who wanted supply for free, and over commercial rivalry. They
 *     were the victims. Do not let this drift back.
 *     Still concerns LIVING RELATIVES who cannot consent here. Is anyone still
 *     in Pakistan for whom a public, searchable account creates risk? Answer
 *     before publishing; the question is not rhetorical.
 *   · ADHD DIAGNOSIS AND STIMULANT ADDICTION. Ammar's own account: prescribed
 *     in a corporate context to raise productivity, became an addiction, and
 *     affected his ability to eat and to urinate. It is the concrete mechanism
 *     behind "I left before I burned out", which is why it earns its place.
 *     Two cautions kept in the copy deliberately: it makes NO general claim
 *     about ADHD, diagnosis or medication for anyone else, and it does not name
 *     a drug, a prescriber or an employer. Keep all three constraints.
 *     This is a health disclosure that will be permanently searchable against
 *     his name, and corporate clients will read it if /coaching ever links here.
 *     That is a decision for Ammar, made deliberately — not a default.
 *   · AYAHUASCA. Fine on a story page, and deliberately kept off /coaching —
 *     a corporate buyer expensing sessions does not need it and it invites a
 *     question unrelated to why they hire him.
 *   · "very privileged" is stated plainly rather than softened, per Ammar's
 *     "I used to hide it, no more." If that ever starts to feel like too much,
 *     the fix is to cut it — not to hedge it into meaninglessness.
 *
 * MISSING:
 *   · JULIUS — now written from Ammar's account: university friend; his theory
 *     that by their early twenties they had enough common sense never to end up
 *     homeless, so there was no reason to hold back; Ammar credits his risk
 *     appetite to him; he died. STILL UNKNOWN: the "link to Mexico" Ammar
 *     mentioned — not invented, flagged on the page. Also undecided: whether to
 *     use a surname, and whether his family should see this before it is public.
 *     Do not publish a passage about a dead friend without that last one settled.
 *   · TIMELINE DATES. The timeline is deliberately full of "date?" markers.
 *     Only the yoga-era dates are known (from /cv). Everything before it —
 *     school years, Bristol, qualifying, Bangalore, Latin America, leaving
 *     finance, the ADHD years — needs Ammar. DO NOT INFER OR INTERPOLATE THESE.
 *   · The earlier formative experiences he alluded to ("there are others I've
 *     had when younger") — currently gestured at, not described.
 *   · Ammar's own note: "my story will need a lot of bulking out as we get into
 *     it more." The timeline is the structure to bulk it out against.
 *
 * IMAGERY (revised 13 Aug):
 *   · ONE image on this page: Ama Dablam (Nepali Himalaya) as the hero. Verified
 *     as a real JPEG at full resolution.
 *   · The hero previously reused the /coaching studio photo — a placeholder, and
 *     wrong: the two pages must not open on the same image.
 *   · Considered and rejected for the hero: Hong Kong skyline (postcard, and it
 *     over-weights one chapter), container ports (modern freight, not a family
 *     arriving by ship), Scottish Highlands mislabelled as Himalaya (a lie next
 *     to true Himalayan material), Shanghai skyline mistaken for Hong Kong (a
 *     factual error on a page about growing up there).
 *   · The formative section now has NO image, deliberately. It lists four
 *     distinct experiences; any single stock photo privileges one and, beside a
 *     true first-person account, reads as documentation of it. It runs on type.
 *   · REMAINING RISK: the hero is still stock. A mountain beside a true account
 *     of a solo Himalayan hike is suggestive even when it claims nothing.
 *     Ammar's own photograph would remove the ambiguity entirely.
 *
 * RELATIONSHIP TO OTHER PAGES:
 *   · /about stays as it is — yoga-facing, and it should remain the front door.
 *   · /coaching does NOT link here yet and does not carry any of this material
 *     beyond the credential band. Deliberate. Decide separately.
 *   · noindex/nofollow is ON. If publishing: remove it, add to ROUTES in
 *     scripts/prerender-meta.js, and add to the vercel.json rewrite exclusions.
 * ─────────────────────────────────────────────────────────────────────────────
 */
