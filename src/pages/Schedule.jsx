import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import BookCallButton from '../components/BookCallButton';
import { SaturdayCard, WeekByDay, StudioLinks } from '../components/WeekSchedule';
import { BTN, TEXT } from '../components/ui';

// /schedule — every weekly class, by day. Ammar's own Saturday class comes
// first and looks different from the studio classes; each studio has one
// booking link. The timetable itself is in src/data/classes.js.
export default function Schedule() {
  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <PageMeta path="/schedule" />
      <Nav theme="light" />
      <VacationBanner />

      <main>
        <section className="pt-28 md:pt-32 pb-12 px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            <p className={`${TEXT.eyebrow} mb-5`}>Weekly schedule</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-[#1C1410] mb-6">
              Weekly yoga class schedule
            </h1>
            <p className={`${TEXT.body} max-w-2xl`}>
              My own class on Saturdays in Marylebone, and weekly classes at HOME Wellness, Flo, BXR and Yogarise. Studio classes are booked with each studio.
            </p>
          </div>
        </section>

        <section className="px-8 md:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <SaturdayCard />
          </div>
        </section>

        <section className="bg-[#EAE0CF] px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8">The week, day by day</h2>
            <WeekByDay />
          </div>
        </section>

        <section className="px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-3">Book a studio class</h2>
            <p className={`${TEXT.body} mb-8`}>Each studio takes its own bookings. One link for each:</p>
            <StudioLinks />
          </div>
        </section>

        <section className="bg-[#1C1410] px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-[#F4EFE6] mb-4">New to yoga, or want one-to-one?</h2>
            <p className={`${TEXT.bodyOnDark} mb-8 max-w-2xl`}>
              My group classes are designed for people with some yoga experience. If you're completely new, a private session is the best place to start.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <BookCallButton position="page_end" variant="primaryOnDark" />
              <a href="/private-sessions" className={BTN.secondaryOnDark}>About private sessions</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
