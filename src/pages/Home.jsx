import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Hero from '../components/Hero';
import PracticeVideos from '../components/PracticeVideos';
import About from '../components/About';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import { SaturdayCard, NextClasses } from '../components/WeekSchedule';
import { BTN, TEXT } from '../components/ui';
import { PRICE_60 } from '../data/privateSessions';
import { SATURDAY_PAGE, SATURDAY_PRICE, SATURDAY_START, longDate } from '../data/classes';
import { eventPath, useEvents } from '../lib/events';
import useToday from '../lib/useToday';
import { person, business } from '../data/schema';

// Proof, before the ask: how long, how much, and where Ammar teaches.
function ProofStrip() {
  return (
    <section className="bg-[#2A1E16]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 md:items-center">
        <img
          loading="lazy"
          src="/images/saturday/class-low-lunge.webp"
          alt="A full room of students in a low lunge in one of Ammar's classes, with Ammar demonstrating in the centre"
          width="1200"
          height="800"
          className="w-full h-48 md:h-[420px] object-cover"
        />
        <div className="px-8 md:px-12 py-9 md:py-12">
          <p className="text-2xl md:text-3xl font-light leading-snug text-[#F4EFE6] mb-5 md:mb-6">
            Teaching for over five years. About 12 classes a week.
          </p>
          <p className={`${TEXT.eyebrowOnDark} mb-3`}>Teaching weekly at</p>
          <p className="text-[17px] leading-relaxed text-[#E5D5B7]">HOME Wellness · BXR · Flo · Yogarise</p>
        </div>
      </div>
    </section>
  );
}

// One offer: photo, what it is, one link. On phones the photo is a small
// square beside the title, to keep the page short; from tablet width up it is
// a banner across the top of the card.
function OfferCard({ href, image, alt, width, height, eyebrow, title, look, label, children }) {
  return (
    <a
      href={href}
      className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 p-5 md:flex md:flex-col md:items-stretch md:gap-0 md:p-0 border border-[#C9B99A] rounded-lg overflow-hidden hover:border-[#785E3D] transition-colors"
    >
      <img
        loading="lazy"
        src={image}
        alt={alt}
        width={width}
        height={height}
        className="w-full aspect-square md:aspect-auto md:h-56 object-cover rounded-md md:rounded-none"
      />
      <div className="contents md:flex md:flex-col md:flex-1 md:p-7">
        <div>
          <p className={`${TEXT.eyebrow} mb-2 md:mb-3`}>{eyebrow}</p>
          <h2 className="text-[28px] md:text-3xl font-light leading-tight text-[#1C1410] md:mb-3">{title}</h2>
        </div>
        <div className="col-span-2 md:flex md:flex-col md:flex-1">
          <p className={`${TEXT.body} mb-5 md:mb-6`}>{children}</p>
          <span className={`${look} md:mt-auto md:self-start`}>{label}</span>
        </div>
      </div>
    </a>
  );
}

// The two things on offer, each with one link.
function Offers() {
  const startsLater = useToday() < SATURDAY_START;
  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-12 md:py-18">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 md:gap-8">
        <OfferCard
          href="/private-sessions"
          image="/images/homestudio1.webp"
          alt="Ammar's loft yoga studio in West Hampstead: two mats, blocks and towels laid out under the skylights"
          width="1200"
          height="953"
          eyebrow="One to one"
          title="Private sessions"
          look={BTN.primary}
          label="About private sessions"
        >
          From £{PRICE_60}. In my loft studio in West Hampstead, online, or at your home. Complete beginners welcome.
        </OfferCard>
        <OfferCard
          href={SATURDAY_PAGE}
          image="/images/saturday/class-savasana.webp"
          alt="Students resting in savasana at the end of class while Ammar sits at the front of the room"
          width="1086"
          height="724"
          eyebrow="My own class"
          title="Saturday class"
          look={BTN.secondary}
          label="About the Saturday class"
        >
          Saturdays, 11:30–13:00 in Marylebone{startsLater ? `, from ${longDate(SATURDAY_START, false)}` : ''}. £{SATURDAY_PRICE} drop-in.
        </OfferCard>
      </div>
    </section>
  );
}

// The next three days of classes, with a link to the full schedule.
function NextClassesSection() {
  return (
    <section id="schedule" className="bg-[#EAE0CF] px-8 md:px-12 py-12 md:py-18 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <p className={`${TEXT.eyebrow} mb-4`}>Weekly schedule</p>
        <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8">Next classes</h2>
        <NextClasses />
        <div className="mt-8">
          <SaturdayCard photo={false} />
        </div>
        <a href="/schedule" className={`${BTN.secondary} mt-8`}>See the full schedule</a>
      </div>
    </section>
  );
}

// The next events, from the events list (built in, then refreshed on load).
function NextEvents() {
  const { events } = useEvents();
  const today = useToday();
  const upcoming = (events || []).filter((e) => e.date >= today).slice(0, 3);
  if (upcoming.length === 0) return null;

  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-12 md:py-18">
      <div className="max-w-4xl mx-auto">
        <p className={`${TEXT.eyebrow} mb-4`}>Events & retreats</p>
        <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8 md:mb-10">Coming up</h2>
        <ul className="border-t border-[#C9B99A]">
          {upcoming.map((event) => (
            <li key={event.id} className="border-b border-[#C9B99A]">
              <a href={eventPath(event)} className="flex items-center justify-between gap-6 py-5 group">
                <span>
                  <span className="block text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-1">{longDate(event.date)}</span>
                  <span className="block text-2xl font-light text-[#1C1410] group-hover:text-[#785E3D] transition-colors">{event.title}</span>
                  <span className="block text-[16px] text-[#5C4A36]">{event.location}</span>
                </span>
                <span aria-hidden="true" className="text-[#785E3D]">→</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="/events" className={`${BTN.secondary} mt-8 md:mt-10`}>All events and retreats</a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <PageMeta path="/" />
      <Helmet>
        <meta name="keywords" content="yoga teacher London, vinyasa yoga London, strength yoga, arm balances, inversions, private yoga sessions London, yoga HOME Wellness Primrose Hill, Saturday yoga class Marylebone, yoga BXR, Yogarise Queens Park, Flo Yoga West Hampstead" />

        {/* Who Ammar is and what the business offers: src/data/schema.js */}
        <script type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", "@graph": [person, business] })}
        </script>

      </Helmet>

      <Nav />
      <VacationBanner />
      <main>
        <Hero />
        <ProofStrip />
        <Offers />
        <Testimonials page="home" heading="What students say" />
        <About />
        <NextClassesSection />
        <NextEvents />
        <PracticeVideos />
      </main>
      <Footer />
    </div>
  );
}
