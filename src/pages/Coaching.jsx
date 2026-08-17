import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DRAFT / CONCEPT PAGE — Coaching (corporate-billed one-to-one work)
 * ─────────────────────────────────────────────────────────────────────────────
 * Positions Ammar's existing private work for a buyer who expenses it through
 * a company. This is a REFRAME of what he already does, not a new product.
 *
 * POSITIONING (revised 14 Aug, at Ammar's direction): the page ASSERTS rather
 * than disclaims. An earlier draft opened "I'm not a coach. That's rather the
 * point." and stacked up what he is not (not a therapist, no accreditation).
 * His objection, and it is correct: coach is not a protected title like doctor,
 * he does this work and has helped people, and opening on a list of negatives
 * gives away his own value for the sake of a punchy line.
 *
 * The distinctive thing is the BRIDGE. He worked in finance, so he knows the
 * terrain and speaks the language; he then spent years in meditation, ashrams,
 * therapy and a hard physical discipline. Clients do not have to go and do any
 * of that themselves. He carries what is useful across into their terms.
 *
 * STILL TRUE: claim no accreditation he does not hold. But do not list the CV
 * either — his own read is that as executive CVs go it is unremarkable, and
 * itemising it invites a comparison he loses.
 *
 * The client testimonial is a FICTIONAL PLACEHOLDER (Elena Marchetti) with a
 * stock portrait, marked as such in the visible UI. The real candidate is a
 * private client who asked to be invoiced through her company; she has NOT
 * been asked for consent. See DRAFT_NOTES at the foot of this file.
 *
 * Deliberately NOT linked from /private-sessions, and vice versa. That page
 * publishes a £70–80 rate card aimed at individuals; one click between the two
 * would reprice this offering instantly. Same person, two doors.
 *
 * Uses the site's own Nav/Footer and palette (unlike /chefina) because this is
 * Ammar's own offering.
 *   #F4EFE6  cream          #1C1410  near-black
 *   #785E3D  brown accent   #6B5740  body brown
 *   #EAE0CF  alt section    #C9B99A  rule
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Unsplash — free for commercial use. Every URL below was fetched AND VIEWED
// at build time; each returns a real JPEG. Most Unsplash yoga stock is sunset-
// silhouette wellness imagery, which actively fights this page's positioning —
// these were chosen for effort and seriousness, not serenity. Replace with real
// photography of Ammar's own studio work before launch.
const IMG = {
  // B&W, downward dog, visible muscular effort, empty studio — Karl Solano
  hero: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=2000&q=80',
  // Woman in blazer by an office window — Christina @ wocintechchat
  clientElena: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
  // Studio headshot, white tee, plain background — Sarah Cervantes
  clientSecond: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
  // B&W, folded forward, face down, hands spread — complete inward attention.
  // Replaced a team-around-a-table stock photo, which illustrated the client's
  // DAY JOB rather than the work, and implied sessions happen in offices. This
  // section is about judgement and attention, so the image is stillness rather
  // than exertion — deliberately different from the hero's visible effort.
  attention: 'https://images.unsplash.com/photo-1593810450967-f9c42742e326?w=1600&q=80',
  // Bracing against a wall, plain gym, no branding — Gabin Vallet
  effort: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=1200&q=80',
};

// What the physical practice actually trains, stated as capability rather than
// wellness benefit. This is the load-bearing section of the page.
//
// The mechanism is difficulty under attention — NOT handstands. An earlier draft
// leaned on the handstand in every item, which pigeonholed the offering into one
// skill. It now appears once, as an example among several. Breath, strength,
// balance and long holds all produce the same effect; the right vehicle depends
// on the person. Keep it that way.
const TRANSFERS = [
  {
    n: '01',
    physical: 'Progress that refuses to be a straight line',
    transfer:
      'It behaves like a market rather than a plan. Weeks of apparently nothing, a sharp gain you did not earn that day, then a stretch where you go backwards because your life got harder. Stay in it long enough and the direction is unmistakable. Learning to read that curve without panicking at every dip is the same skill as holding a strategy through a bad quarter.',
  },
  {
    n: '02',
    physical: 'Wins and losses that both teach you something',
    transfer:
      'Some sessions you do a thing you could not do a month ago. Some sessions you cannot do the thing you managed last week, and the interesting question is why. Sleep, travel, an argument, the fourth week of a hard push. The body gives you an honest account of how you are actually living, usually before you have admitted it to yourself.',
  },
  {
    n: '03',
    physical: 'Attention with immediate physical consequences',
    transfer:
      'A wandering mind is usually an abstraction. Mid balance, mid lift, or twenty minutes into a hold it is not, because the position simply goes. There is no faking presence and no checking a phone. For most clients this is the only hour in the week where inattention costs something instantly.',
  },
  {
    n: '04',
    physical: 'Progress that shows up somewhere you were not looking',
    transfer:
      'Sometimes it arrives as the posture. More often it arrives as a change in how you approach the thing, how you talk to yourself when it is not working, what you do with frustration. People frequently get the second kind long before the first, and it is worth more.',
  },
];

// Deliberately no prices. The tier this page addresses does not publish them,
// and a rate card here would read as a yoga rate card. See DRAFT_NOTES.
const FORMAT = [
  { k: 'Structure', v: 'A programme of 7–10 sessions, not drop-ins. The work is cumulative and does not compress.' },
  { k: 'Session', v: '75 or 90 minutes, one to one. West Hampstead studio, your office, or online.' },
  { k: 'Cadence', v: 'Usually weekly or fortnightly, scheduled around a working diary rather than a class timetable.' },
  { k: 'Billing', v: 'Invoiced to you or to your company, whichever is easier. Happy to work with however your finance team needs it handled.' },
  { k: 'Rates', v: 'Corporate and self-funded rates differ. Both quoted on enquiry.' },
];

export default function Coaching() {
  const [showDraftBanner, setShowDraftBanner] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // NON-FUNCTIONAL: draft only. Validates and shows a success state, sends nothing.
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-[#F4EFE6] overflow-x-hidden"
      style={{ paddingBottom: showDraftBanner ? '5.5rem' : 0 }}
    >
      <Helmet>
        <title>Coaching | Ammar Bass</title>
        <meta
          name="description"
          content="One-to-one coaching for founders and senior operators, taught through physical practice, by someone who spent years in finance first. Programmes of 7–10 sessions in London."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </Helmet>

      {/* dark, not light: the hero is a dark photograph, and theme="light"
          renders near-black nav links that vanish against it until scroll. */}
      <Nav theme="dark" />

      {/* ── DRAFT BANNER ───────────────────────────────────────────────── */}
      {showDraftBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#B35C2E] text-white px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-lg">
          <p className="text-[12px] sm:text-[13px] leading-snug sm:leading-relaxed">
            <strong className="font-semibold">Draft concept.</strong>{' '}
            <span className="sm:hidden">
              Client stories are invented placeholders. Form does not send.
            </span>
            <span className="hidden sm:inline">
              Not published or linked from anywhere on the site. Both client stories are
              invented placeholders with stock portraits, not real clients. The enquiry
              form does not send anywhere.
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
      <section className="relative min-h-[92vh] flex items-center">
        <img
          src={IMG.hero}
          alt="A practitioner bearing weight through both hands in an empty studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1410]/92 via-[#1C1410]/75 to-[#1C1410]/40" />

        <div className="relative max-w-6xl mx-auto px-8 md:px-12 w-full pt-28 pb-20">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#C9A87C] mb-8">
              One to one · London
            </p>
            {/* The H1 asserts rather than denies. An earlier draft ran "I'm not a
                coach. That's rather the point." Ammar's objection was sound: coach
                is not a protected title like doctor, he does the work, and opening
                on a list of things he is not gives away his own value. */}
            <h1 className="text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl font-light text-white mb-8">
              Two worlds,
              <br />
              one conversation.
            </h1>
            <p className="text-[17px] md:text-lg font-light leading-relaxed text-white/85 mb-6 max-w-xl">
              Executive clients come to me to get better at something physical and
              difficult. What they end up practising is progression, setbacks,
              frustration tolerance and sustained attention, under conditions where you
              cannot fake competence.
            </p>
            <p className="text-[15px] font-light leading-relaxed text-white/60 mb-9 max-w-xl">
              No framework and no assessment. A physical practice that turns out to be
              an unusually honest mirror, taught by someone who has worked where you
              work.
            </p>

            {/* NOT a CV listing. An earlier draft itemised the qualifications here
                (ACA, Bristol, MSc, Bangalore) and Ammar's own read was right: as
                executive CVs go it is unremarkable, and listing it invites exactly
                the comparison he loses. What is actually distinctive is the pairing
                of the two worlds, so the band states the bridge and leaves the
                credentials to be asked about. */}
            <div className="border-l border-white/25 pl-5 mb-10 max-w-xl">
              <p className="text-[14px] md:text-[15px] font-light leading-relaxed text-white/70">
                Years in finance before I taught anything, and years since spent in
                meditation halls, ashrams and a demanding physical practice.
                <span className="text-white/90"> I work at the join between the two.</span>
              </p>
            </div>
            <a
              href="#enquire"
              className="inline-block px-8 py-4 rounded-full bg-[#F4EFE6] text-[#1C1410] hover:bg-white transition-colors text-sm uppercase tracking-wide"
            >
              Enquire
            </a>
          </div>
        </div>
      </section>

      {/* ── THE PREMISE ────────────────────────────────────────────────── */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-8">
            The premise
          </p>
          <div className="space-y-6 text-[17px] md:text-[19px] font-light leading-[1.75] text-[#1C1410]">
            <p>
              A client of mine, a founder, asked to be invoiced through her company
              rather than personally, and to have it described as coaching rather than
              yoga.
            </p>
            <p>
              I thought about whether that was a stretch. It isn&rsquo;t. She books in
              weekly to attempt something difficult in front of another person. Some
              weeks it goes well and some weeks it does not, and which one you get has
              as much to do with how she has slept and what is happening at work as with
              anything either of us does in the room. She is not doing it for her
              hamstrings.
            </p>
            <p className="text-[#6B5740]">
              I spent years working in finance before I taught anything, so I know that
              world from the inside. I am not offering a view on your numbers. What it
              means is that I understand the terrain and I speak the language, so you do
              not have to translate yourself before we begin.
            </p>
            <p className="text-[#6B5740]">
              What I bring to it is everything I went and did afterwards. Long silent
              meditation courses. A month living in an ashram. Years inside a demanding
              physical discipline, and a long stretch of therapy spent trying to
              understand my own mind. I am not suggesting you go and do any of that. Most
              people have neither the time nor the inclination, and they should not need
              to. My job is to carry what is useful in it across into a life that looks
              nothing like a month in the mountains, and to make it land in terms that
              are actually relevant to you.
            </p>
            <p className="text-[#6B5740]">
              That is the whole offer. I have been in the world you are in, I have spent a
              long time in a very different one, and I can move between the two.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT THE PRACTICE TRAINS ───────────────────────────────────── */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
              What it actually trains
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] leading-snug">
              The body is the method. It is never the point.
            </h2>
          </div>

          <div className="space-y-12">
            {TRANSFERS.map((t) => (
              <div
                key={t.n}
                className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-10 pb-12 border-b border-[#C9B99A] last:border-0 last:pb-0"
              >
                <span className="text-[13px] font-light text-[#785E3D] pt-1 tracking-widest">
                  {t.n}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-light text-[#1C1410] mb-4 leading-snug">
                    {t.physical}
                  </h3>
                  <p className="text-[15px] md:text-base font-light leading-relaxed text-[#6B5740] max-w-2xl">
                    {t.transfer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT STORY — FICTIONAL PLACEHOLDER ───────────────────────── */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Unmissable in the UI, not just in code — this must never be mistaken
              for a real endorsement if the page is shown to anyone. */}
          <div className="mb-10 border-2 border-dashed border-[#B35C2E] bg-[#B35C2E]/8 px-5 py-4 rounded-md">
            <p className="text-[12px] leading-relaxed text-[#8A4620]">
              <strong className="font-semibold uppercase tracking-wider">
                Placeholder, invented
              </strong>
              <br />
              Both people below are fictional and the portraits are stock photography. They
              illustrate the shape of a real client story; nobody has said these words.
              Replace with a consented client, or delete this section entirely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {/* Client one. flex-col + mt-auto on the caption keeps both cards'
                attributions aligned at the foot despite unequal quote lengths. */}
            <figure className="bg-[#EAE0CF] p-8 md:p-10 rounded-lg flex flex-col">
              <blockquote className="text-[17px] md:text-lg font-light leading-relaxed text-[#1C1410] mb-8">
                &ldquo;I came in wanting to fix my back and left doing something I
                can&rsquo;t really explain to my board. I spent the first month furious,
                because I run a company and I am not accustomed to being bad at things
                for four consecutive weeks. That turned out to be the whole lesson, and it
                followed me straight back into how I handle a product that isn&rsquo;t
                landing.&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4 mt-auto">
                <img
                  src={IMG.clientElena}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover object-top grayscale"
                />
                <div>
                  <p className="text-[15px] text-[#1C1410]">Elena Marchetti</p>
                  <p className="text-[13px] text-[#785E3D]">
                    Co-founder &amp; Creative Director
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-[#B35C2E] mt-1">
                    Fictional placeholder
                  </p>
                </div>
              </figcaption>
            </figure>

            {/* Client two */}
            <figure className="bg-[#EAE0CF] p-8 md:p-10 rounded-lg flex flex-col">
              <blockquote className="text-[17px] md:text-lg font-light leading-relaxed text-[#1C1410] mb-8">
                &ldquo;My team noticed before I did. I stopped answering a question while
                still reading the message. An hour a week where you physically cannot
                multitask turns out to reset something.&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4 mt-auto">
                <img
                  src={IMG.clientSecond}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover object-top grayscale"
                />
                <div>
                  <p className="text-[15px] text-[#1C1410]">Hannah Reeve</p>
                  <p className="text-[13px] text-[#785E3D]">
                    VP Engineering
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-[#B35C2E] mt-1">
                    Fictional placeholder
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── WHO IT IS FOR ──────────────────────────────────────────────── */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[380px] md:min-h-[560px]">
            <img
              src={IMG.attention}
              alt="A person folded forward on a mat, face down, hands spread"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#1C1410] px-8 md:px-14 py-20 flex items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A87C] mb-6">
                Who this suits
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8 leading-snug">
                People whose job is mostly judgement under load.
              </h2>
              <div className="space-y-5 text-[15px] font-light leading-relaxed text-white/70">
                <p>
                  Founders, partners and senior operators. Typically people who
                  already train in some form, already know that sitting still is not their
                  problem, and are sceptical of anything that arrives described as
                  wellness.
                </p>
                <p>
                  It suits people who want a measurable physical goal to organise the work
                  around. What that goal is depends on you: a handstand, a first
                  pull-up, a spine that tolerates a long-haul flight, twenty minutes of
                  sitting still without reaching for a phone. It is not a metaphor I have
                  imposed. It is an actual thing you will actually be trying to do, and
                  either you are closer to it in eight weeks or you are not.
                </p>
                <p className="text-white/50">
                  It does not suit anyone looking for relaxation, recovery or a gentle
                  reset. That is a genuinely good thing to want and I am not the person to
                  provide it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMAT ─────────────────────────────────────────────────────── */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
              How it runs
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] leading-snug">
              Structured like an engagement, not a class pass.
            </h2>
          </div>

          <dl className="divide-y divide-[#C9B99A]">
            {FORMAT.map((f) => (
              <div key={f.k} className="grid sm:grid-cols-[190px_1fr] gap-2 sm:gap-8 py-6">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-[#785E3D] pt-1">
                  {f.k}
                </dt>
                <dd className="text-[15px] md:text-base font-light leading-relaxed text-[#1C1410]">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── EXPENSING ──────────────────────────────────────────────────── */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src={IMG.effort}
              alt="Bearing weight through both hands against a plain wall"
              className="w-full h-[420px] object-cover rounded-lg grayscale"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
              Putting it through the company
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8 leading-snug">
              Most clients expense this.
            </h2>
            <div className="space-y-5 text-[15px] font-light leading-relaxed text-[#6B5740]">
              <p>
                Invoices describe the engagement in terms of performance and development
                outcomes, because that is what it is. If your finance team needs it
                structured a particular way, whether that is a reference, a purchase order or a
                different billing schedule, say so and I will work with it.
              </p>
              <p>
                Whether it is deductible is a matter for your accountant and depends on
                your circumstances. I don&rsquo;t give tax advice and won&rsquo;t pretend
                otherwise, but I will make the paperwork straightforward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRE ────────────────────────────────────────────────────── */}
      <section id="enquire" className="bg-[#1C1410] px-8 md:px-12 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-5">
              Start with a conversation
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-white/60">
              A short call, no charge, to work out whether this is a fit. If it
              isn&rsquo;t, I will say so, and usually point you somewhere better.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 border border-white/15 rounded-lg">
              <p className="text-[#C9A87C] text-lg mb-2">Thanks, noted.</p>
              <p className="text-white/40 text-[13px]">
                (Draft page: this form does not send anywhere.)
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/5 text-white border border-white/20 rounded-md outline-none focus:border-[#C9A87C] placeholder-white/40 text-[15px]"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/5 text-white border border-white/20 rounded-md outline-none focus:border-[#C9A87C] placeholder-white/40 text-[15px]"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 text-white border border-white/20 rounded-md outline-none focus:border-[#C9A87C] placeholder-white/40 text-[15px]"
              />
              <textarea
                required
                rows="5"
                placeholder="What's prompting this?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 text-white border border-white/20 rounded-md outline-none focus:border-[#C9A87C] placeholder-white/40 text-[15px]"
              />
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-full bg-[#F4EFE6] text-[#1C1410] hover:bg-white transition-colors text-sm uppercase tracking-wide"
              >
                Send enquiry
              </button>
              <p className="text-center text-[12px] text-white/30 pt-2">
                Draft page. This form does not send anywhere yet.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DRAFT_NOTES — settle before this goes anywhere near a live domain
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * INVENTED / PLACEHOLDER CONTENT:
 *   · "Elena Marchetti, Co-founder & Creative Director"  — entirely fictional
 *   · "Hannah Reeve, VP Engineering"                     — entirely fictional
 *     Both quotes are written, not collected. Both portraits are stock. Marked
 *     as placeholders in the visible UI as well as here — keep it that way
 *     until replaced, so the page can be shown to someone without misleading.
 *   · "Startups in Bangalore, corporate finance in London" — CHECK THE WORDING.
 *     Ammar's own summary was "worked in India (Bangalore) in the startup scene"
 *     and that he left finance by choice, explicitly NOT via McKinsey or JP
 *     Morgan. Do not let this drift into implying a bulge-bracket CV.
 *   · "Chartered accountant" — confirm the qualification is current//how he
 *     wants it stated (ACA vs ACCA vs "trained as").
 *   · BILLING WORDING WAS PULLED BACK 13 Aug. An earlier draft asserted invoices
 *     come "from a limited company", carry PO numbers, and that annual/quarterly
 *     invoicing was available — none of which Ammar had confirmed, and the
 *     limited-company framing was a stretch. It now says billing can go to the
 *     person or the company and that he will work with what finance needs.
 *     Do not re-add specific commitments he has not agreed to.
 *   · "two ten-day silent meditation courses", "a month living in an ashram",
 *     "a long stretch of therapy" — all true per his own account, and the
 *     ayahuasca ceremony is deliberately NOT named here (it belongs on /story).
 *     Confirm he is comfortable with the therapy reference being public.
 *
 * DECISIONS TAKEN (13 Aug 2026), so they don't get relitigated:
 *   · H1 leads on the honest gap, with the business credential immediately
 *     BENEATH it rather than in it. The credentials are real (ACA, Economics at
 *     Bristol, MSc Finance, Bangalore startups, corporate finance) — they were
 *     stripped from the site earlier to keep it yoga-focused. Leading with them
 *     would turn this into an executive-coaching page competing on credentials
 *     against people who hold coaching accreditations. Leading with the refusal
 *     and then showing the CV is stronger: he qualified, and left.
 *   · The HANDSTAND IS AN EXAMPLE, NOT THE MECHANISM. An earlier draft made it
 *     the organising idea of every section, which pigeonholed the offering into
 *     one skill. The mechanism is difficulty under sustained attention; asana,
 *     strength, breath and long holds all deliver it. If you edit this page,
 *     do not let the handstand creep back into the H1 or the section headings.
 *   · Route is /coaching, not /executive.
 *   · NO published prices. The £500+/hr tier publishes nothing; publishing at
 *     £70–150 is precisely what marks the lower tier. Corporate/self-funded
 *     split is stated as a fact, unpriced.
 *   · /private-sessions keeps its £70–80 rate card and is NOT cross-linked.
 *     Two buyers, two doors. Do not add a link between these pages.
 *
 * STILL OPEN:
 *   · The real client (the founder who prompted this) has NOT been asked whether
 *     she can be named. Named + role + company is the strongest proof available.
 *     Fallback if she declines: "a founder and creative director I work with."
 *   · Actual corporate rate. Research comparables: Voyager £250 SME / £500
 *     corporate for 60 mins; Henley corporate ~2x self-funded; 90 mins as exec
 *     coaching £350–500. Current personal rate is £70–80.
 *   · Whether to capture "executive coaching" as a search term somewhere on the
 *     page. Currently the phrase appears nowhere, which is honest but costs the
 *     search intent the research identified. The meta description carries
 *     "coaching" only.
 *   · Enquiry form sends nowhere. Wire to Supabase — /private-sessions uses a
 *     `private_enquiries` table; this wants its own, with the company field.
 *   · All photography is Unsplash stock, and deliberately not sunset-silhouette
 *     wellness imagery. Replace with real photographs of Ammar's studio work —
 *     a page arguing for seriousness cannot run on stock.
 *   · noindex/nofollow is ON. Remove when publishing, and only then add the
 *     route to ROUTES in scripts/prerender-meta.js and to the vercel.json
 *     rewrite exclusion list for link previews.
 * ─────────────────────────────────────────────────────────────────────────────
 */
