import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Testimonials from '../components/Testimonials';
import BookCallButton from '../components/BookCallButton';
import Footer from '../components/Footer';
import { BTN, TEXT } from '../components/ui';
import { person } from '../data/schema';
import { YORIGAM_URL } from '../data/classes';

/*
 * /about — who Ammar is, his training and where he teaches.
 *
 * The opening is the "New copy: About opening" from docs/site-review.md. The
 * training list uses only the names Ammar approved (21 Nov 2026). The lists
 * of studios come from the schedule and the past events on the site.
 *
 * Each fact appears once: the swimming, powerlifting and Vipassana background
 * is in the opening only (22 Nov 2026).
 */

const TRAINING = [
  '200-hour teacher training at Sivananda Kutir in the Himalayas (2022)',
  'Rocket, with David Kyle',
  'Alignment and assists, with Stewart Gilchrist, whose classes I assist',
  'Ongoing study with Emi Tull, a Dharma teacher',
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <PageMeta path="/about" />
      <Helmet>
        <meta name="keywords" content="Ammar Bass, yoga teacher background, Vipassana meditation, powerlifting yoga, biomechanics yoga, London yoga instructor, arm balance specialist, inversion training" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "url": "https://ammarbass.com/about",
            "mainEntity": { ...person, "image": "https://ammarbass.com/images/about.webp" }
          })}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      <main>
        {/* Portrait and opening. Phones: a small portrait above the heading, so the
            heading runs the full width; tablet and up: portrait left, text right. */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-8 md:px-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-5 md:gap-16 items-center">
            <img
              src="/images/about.webp"
              alt="Portrait of Ammar Bass, yoga teacher in London, smiling in a white T-shirt"
              width="1200"
              height="1200"
              className="w-[120px] md:w-full md:max-w-md aspect-square object-cover rounded-lg"
            />
            <div>
              <p className={`${TEXT.eyebrow} mb-2 md:mb-5`}>About</p>
              <h1 className="text-[32px] md:text-5xl font-light leading-tight text-[#1C1410] mb-5 md:mb-6">
                I'm Ammar. I teach strong, precise yoga in London.
              </h1>
              <p className={TEXT.body}>
                I came to yoga as a competitive swimmer and powerlifter, so I teach the way an athlete trains: specific skills, clear progressions, steady effort. Two ten-day Vipassana courses changed what I think the effort is for. The work is physical; the point is a calm, attentive mind.
              </p>
            </div>
          </div>
        </section>

        {/* How I teach */}
        <section className="bg-[#EAE0CF] px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 md:gap-16 items-start">
            <div>
              <p className={`${TEXT.eyebrow} mb-4`}>How I teach</p>
              <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">Demanding in the practice, warm towards the person</h2>
              <div className={`space-y-5 ${TEXT.body}`}>
                <p>
                  I specialise in alignment, arm balances and inversions, with a focus on building strength through intelligent practice.
                </p>
                <p>
                  We train specific skills with discipline and structure, not for performance, but for longevity. My interest in biomechanics means I weave anatomy and science into teaching in accessible ways, helping you understand how to build capacity that lasts.
                </p>
                <p>
                  I will often see that you can do more than you think, and I will show you how to get there safely.
                </p>
              </div>
            </div>
            <img
              loading="lazy"
              src="/images/about-teaching.webp"
              alt="Ammar Bass balancing in a side crow with one leg behind his head, on a stone balustrade"
              width="1200"
              height="1605"
              className="w-full aspect-[4/3] md:aspect-[3/4] object-cover object-[50%_45%] rounded-lg"
            />
          </div>
        </section>

        {/* Training, and where */}
        <section className="px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <p className={`${TEXT.eyebrow} mb-4`}>Training</p>
              <h2 className="text-3xl font-light text-[#1C1410] mb-6">Where I trained</h2>
              <p className={`${TEXT.body} mb-6`}>
                I am of Indian descent and was raised in Hong Kong.
              </p>
              <ul className="border-t border-[#C9B99A]">
                {TRAINING.map((item) => (
                  <li key={item} className="py-3 border-b border-[#C9B99A] text-[17px] text-[#1C1410]">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${TEXT.eyebrow} mb-4`}>Teaching</p>
              <h2 className="text-3xl font-light text-[#1C1410] mb-6">Where I teach</h2>
              <p className={`${TEXT.body} mb-4`}>
                Every week: my own Saturday class in Marylebone, private sessions in my West Hampstead studio, and classes at HOME Wellness, BXR, Flo and Yogarise.
              </p>
              <p className={TEXT.body}>
                Previously, and as a guest: Indaba in Marylebone (to November 2026), Triyoga and MoreYoga in Camden, and Ikigai in Hong Kong.
              </p>

              {/* The one paragraph about Yorigam (the footer has the other mention). */}
              <h3 className={`${TEXT.eyebrow} mt-8 md:mt-10 mb-3`}>Beyond the mat</h3>
              <p className={TEXT.body}>
                I built{' '}
                <a href={YORIGAM_URL} target="_blank" rel="noopener noreferrer" className={TEXT.link}>Yorigam</a>
                , an app for yoga teachers, because nothing else fit how I work. My own bookings and invoicing run on it.
              </p>
            </div>
          </div>
        </section>

        <Testimonials page="about" />

        {/* Final call to action */}
        <section className="bg-[#1C1410] px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-[#F4EFE6] mb-8">Practise with me</h2>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <BookCallButton position="page_end" variant="primaryOnDark" />
              <a href="/schedule" className={BTN.secondaryOnDark}>See the schedule</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
