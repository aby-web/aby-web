import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import WhatsAppGroupButton from '../components/WhatsAppGroupButton';
import {
  SATURDAY_AREA,
  SATURDAY_BOOKING_URL,
  SATURDAY_PRICE,
  SATURDAY_START,
  SATURDAY_VENUE_NAME,
  INDABA_LAST_DAY,
  longDate,
} from '../data/classes';
import useToday from '../lib/useToday';

/*
 * /saturday-class — Ammar's own Saturday class in Marylebone.
 *
 * Copy is from "New copy: Saturday class page" in docs/site-review.md.
 * The facts (venue, price, start date, booking link) come from
 * src/data/classes.js, so they change in one place.
 *
 * Still to confirm with Ammar (search for TODO):
 *   - the venue name (SATURDAY_VENUE_NAME in classes.js; null for now)
 *   - the level wording below ("Suitable if you have some yoga experience.")
 *   - a booking page address (SATURDAY_BOOKING_URL in classes.js; null for now)
 * How long the class ran at Indaba is deliberately left out.
 */

const PAGE_URL = 'https://ammarbass.com/saturday-class';
const OG_IMAGE = 'https://ammarbass.com/images/og-saturday-class.jpg';

const PRIMARY_BUTTON =
  'inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide';

// The page's action. Booking is through the WhatsApp group until
// SATURDAY_BOOKING_URL is set in classes.js; then it becomes "Book your place"
// with the WhatsApp group as the second link.
function JoinButtons() {
  if (SATURDAY_BOOKING_URL) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <a href={SATURDAY_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={PRIMARY_BUTTON}>
          Book your place
        </a>
        <WhatsAppGroupButton variant="outlineDark" className="min-h-[48px] px-8 text-sm" />
      </div>
    );
  }
  return <WhatsAppGroupButton className="w-full sm:w-auto min-h-[48px] px-8 text-sm" />;
}

export default function SaturdayClass() {
  const today = useToday();
  const notStartedYet = today < SATURDAY_START;
  const indabaStillOpen = today <= INDABA_LAST_DAY;
  const where = SATURDAY_VENUE_NAME ? `${SATURDAY_VENUE_NAME}, ${SATURDAY_AREA}` : SATURDAY_AREA;

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <PageMeta path="/saturday-class" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Saturday yoga class in Marylebone",
            "description": "A strong 90-minute vinyasa class with time for arm balances and inversions, taught by Ammar Bass. Weekly on Saturdays, 11:30–13:00. Bring your own mat.",
            "url": PAGE_URL,
            "image": OG_IMAGE,
            "startDate": `${SATURDAY_START}T11:30:00+00:00`,
            "endDate": `${SATURDAY_START}T13:00:00+00:00`,
            "eventSchedule": {
              "@type": "Schedule",
              "repeatFrequency": "P1W",
              "byDay": "https://schema.org/Saturday",
              "startDate": SATURDAY_START,
              "startTime": "11:30",
              "endTime": "13:00",
              "scheduleTimezone": "Europe/London"
            },
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            // The venue name and street address are added once SATURDAY_VENUE_NAME is set.
            "location": {
              "@type": "Place",
              "name": SATURDAY_VENUE_NAME || "Marylebone, London",
              "address": { "@type": "PostalAddress", "addressLocality": "London", "addressCountry": "GB" }
            },
            "organizer": { "@type": "Person", "name": "Ammar Bass", "url": "https://ammarbass.com" },
            "performer": { "@type": "Person", "name": "Ammar Bass" },
            "offers": {
              "@type": "Offer",
              "name": "Drop-in",
              "price": String(SATURDAY_PRICE),
              "priceCurrency": "GBP",
              "url": SATURDAY_BOOKING_URL || PAGE_URL,
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 px-8 md:px-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
              Ammar's Saturday class
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-[#1C1410] mb-6">
              Saturday yoga class in Marylebone
            </h1>
            <p className="text-lg text-[#1C1410] leading-relaxed mb-8">
              Saturdays, 11:30–13:00{notStartedYet ? `, from ${longDate(SATURDAY_START)}` : ''}. {where}. £{SATURDAY_PRICE} drop-in.
            </p>
            <JoinButtons />
          </div>
        </section>

        {/* Main photo */}
        <section className="px-8 md:px-12">
          <div className="max-w-3xl mx-auto">
            <img
              src="/images/saturday/class-low-lunge.webp"
              alt="A full room of students in a low lunge in one of Ammar's classes, with Ammar demonstrating in the centre"
              width="1200"
              height="800"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>

        {/* About the class */}
        <section className="px-8 md:px-12 py-16">
          <div className="max-w-3xl mx-auto space-y-10 text-[17px] text-[#6B5740] leading-relaxed">
            <p>
              This is the class I taught at Indaba on Saturday mornings.{' '}
              {indabaStillOpen
                ? `Indaba closes at the end of November, so from ${longDate(SATURDAY_START, false)} the class runs independently:`
                : 'Indaba has closed, so the class now runs independently:'}{' '}
              same time, same teacher, and a longer 90-minute practice.
            </p>

            <div>
              <h2 className="text-2xl md:text-[28px] font-light text-[#1C1410] mb-3">What to expect</h2>
              {/* TODO(Ammar): confirm the level wording ("some yoga experience"). */}
              <p>
                A strong vinyasa class with time for arm balances and inversions, taught without music. Suitable if you have some yoga experience. New to yoga?{' '}
                <a href="/private-sessions" className="text-[#785E3D] underline underline-offset-4 hover:text-[#1C1410]">
                  Start with a private session
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-[28px] font-light text-[#1C1410] mb-3">How to join</h2>
              <p>
                {SATURDAY_BOOKING_URL
                  ? 'Book your place online, then join the WhatsApp group. I post the address and any changes there.'
                  : 'Join the WhatsApp group. I post the address, how to book and any changes there.'}
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-[28px] font-light text-[#1C1410] mb-3">What to bring</h2>
              <p>Bring your own mat and water. Doors open at 11:15.</p>
            </div>
          </div>
        </section>

        {/* Second photo */}
        <section className="px-8 md:px-12">
          <div className="max-w-3xl mx-auto">
            <img
              src="/images/saturday/class-savasana.webp"
              alt="Students resting in savasana at the end of class while Ammar sits at the front of the room"
              width="1086"
              height="724"
              loading="lazy"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>

        <Testimonials page="saturday-class" heading="What students say" />

        {/* Final call to action */}
        <section className="bg-[#EAE0CF] px-8 md:px-12 py-18">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-4">Come on Saturday</h2>
            <p className="text-[17px] text-[#6B5740] leading-relaxed mb-8">
              Saturdays, 11:30–13:00 in {SATURDAY_AREA}. £{SATURDAY_PRICE} drop-in.
            </p>
            <JoinButtons />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
