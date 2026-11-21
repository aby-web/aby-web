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
 */

const TRAINING = [
  '200-hour teacher training at Sivananda Kutir in the Himalayas (2022)',
  'Rocket, with David Kyle',
  'Alignment and assists, with Stewart Gilchrist, whose classes I assist',
  'Ongoing study with Emi Tull, a Dharma teacher',
  'Two ten-day Vipassana meditation courses',
];

const TEACH_NOW = [
  'My own Saturday class, Marylebone',
  'Private sessions in my studio, West Hampstead',
  'HOME Wellness, Primrose Hill',
  'BXR, Marylebone',
  'Flo, West Hampstead',
  'Yogarise, Queens Park',
];

const TAUGHT = [
  'Indaba, Marylebone (to November 2026)',
  'Triyoga, Camden',
  'MoreYoga, Camden',
  'Ikigai, Hong Kong',
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
        {/* Portrait and opening */}
        <section className="pt-28 md:pt-32 pb-16 px-8 md:px-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-center">
            <img
              src="/images/about.webp"
              alt="Portrait of Ammar Bass, yoga teacher in London, smiling in a white T-shirt"
              width="1200"
              height="1200"
              className="w-full max-w-md aspect-square object-cover rounded-lg"
            />
            <div>
              <p className={`${TEXT.eyebrow} mb-5`}>About</p>
              <h1 className="text-4xl sm:text-5xl font-light leading-tight text-[#1C1410] mb-6">
                I'm Ammar. I teach strong, precise yoga in London.
              </h1>
              <p className={TEXT.body}>
                I came to yoga as a competitive swimmer and powerlifter, so I teach the way an athlete trains: specific skills, clear progressions, steady effort. Two ten-day Vipassana courses changed what I think the effort is for. The work is physical; the point is a calm, attentive mind.
              </p>
            </div>
          </div>
        </section>

        {/* How I teach */}
        <section className="bg-[#EAE0CF] px-8 md:px-12 py-18">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 md:gap-16 items-start">
            <div>
              <p className={`${TEXT.eyebrow} mb-4`}>How I teach</p>
              <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">Demanding in the practice, warm towards the person</h2>
              <div className={`space-y-5 ${TEXT.body}`}>
                <p>
                  I specialise in alignment, arm balances and inversions with a focus on building strength through intelligent practice. My teaching is grounded through Vipassana meditation — emphasising observation of both mind and body, creating classes that are calm and present while challenging you physically and mentally.
                </p>
                <p>
                  With a background in competitive swimming and powerlifting, I bring an athlete's understanding of movement progression — but everything is in service of a sustainable lifelong practice. We train specific skills with discipline and structure, not for performance, but for longevity. My interest in biomechanics means I weave anatomy and science into teaching in accessible ways, helping you understand how to build capacity that lasts.
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
              className="w-full aspect-[3/4] object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Training, and where */}
        <section className="px-8 md:px-12 py-18">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className={`${TEXT.eyebrow} mb-4`}>Training</p>
              <h2 className="text-3xl font-light text-[#1C1410] mb-6">Where I trained</h2>
              <p className={`${TEXT.body} mb-6`}>
                I am of Indian descent and was raised in Hong Kong. I trained at Sivananda Kutir in the Himalayas (200-hour teacher training, 2022) and have since trained in Rocket with David Kyle and in alignment and assists with Stewart Gilchrist, whose classes I assist. I also study with Emi Tull, a Dharma teacher.
              </p>
              <ul className="border-t border-[#C9B99A]">
                {TRAINING.map((item) => (
                  <li key={item} className="py-3 border-b border-[#C9B99A] text-[17px] text-[#1C1410]">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${TEXT.eyebrow} mb-4`}>Teaching</p>
              <h2 className="text-3xl font-light text-[#1C1410] mb-6">Where I teach and have taught</h2>
              <h3 className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-2">Every week</h3>
              <ul className="border-t border-[#C9B99A] mb-8">
                {TEACH_NOW.map((item) => (
                  <li key={item} className="py-3 border-b border-[#C9B99A] text-[17px] text-[#1C1410]">{item}</li>
                ))}
              </ul>
              <h3 className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-2">Previously, and as a guest</h3>
              <ul className="border-t border-[#C9B99A] mb-6">
                {TAUGHT.map((item) => (
                  <li key={item} className="py-3 border-b border-[#C9B99A] text-[17px] text-[#1C1410]">{item}</li>
                ))}
              </ul>
              <a href="/schedule" className={TEXT.link}>See this week's schedule</a>
            </div>
          </div>
        </section>

        {/* Beyond the mat */}
        <section className="bg-[#EAE0CF] px-8 md:px-12 py-18">
          <div className="max-w-3xl mx-auto">
            <p className={`${TEXT.eyebrow} mb-4`}>Beyond the mat</p>
            <h2 className="text-3xl font-light text-[#1C1410] mb-6">Yorigam</h2>
            <p className={TEXT.body}>
              I built{' '}
              <a href={YORIGAM_URL} target="_blank" rel="noopener noreferrer" className={TEXT.link}>Yorigam</a>
              , an app for yoga teachers, because nothing else fit how I work: I needed to track private clients, send invoices and understand my monthly income. My own bookings and invoicing run on it.
            </p>
          </div>
        </section>

        <Testimonials page="about" />

        {/* Final call to action */}
        <section className="bg-[#1C1410] px-8 md:px-12 py-18">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-[#F4EFE6] mb-8">Practise with me</h2>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <BookCallButton variant="primaryOnDark" />
              <a href="/schedule" className={BTN.secondaryOnDark}>See the schedule</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
