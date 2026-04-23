import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Ammar Bass | London Yoga Teacher | Strength & Alignment Focus</title>
        <meta name="description" content="Vipassana meditation practitioner with competitive swimming and powerlifting background. Teaching alignment-focused vinyasa at BXR and Flo Yoga in London. Specializing in arm balances, inversions, and biomechanics." />
        <meta name="keywords" content="Ammar Bass, yoga teacher background, Vipassana meditation, powerlifting yoga, biomechanics yoga, London yoga instructor, arm balance specialist, inversion training" />

        {/* Open Graph */}
        <meta property="og:title" content="About Ammar Bass | London Yoga Teacher" />
        <meta property="og:description" content="Vipassana meditation practitioner with an athlete's understanding of movement. Teaching strength-based vinyasa that blends technical precision with meditative depth." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://ammarbass.com/about" />
        <meta property="og:image" content="https://ammarbass.com/images/about-teaching.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Ammar Bass | London Yoga Teacher" />
        <meta name="twitter:description" content="Vipassana meditation practitioner with an athlete's understanding of movement. Teaching strength-based vinyasa in London." />
        <meta name="twitter:image" content="https://ammarbass.com/images/about-teaching.jpg" />

        <link rel="canonical" href="https://ammarbass.com/about" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "name": "Ammar Bass",
              "jobTitle": "Yoga Instructor & Movement Coach",
              "description": "Vipassana meditation practitioner with competitive swimming and powerlifting background. Teaching alignment-focused vinyasa in London.",
              "url": "https://ammarbass.com/about",
              "image": "https://ammarbass.com/images/about-teaching.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "London",
                "addressCountry": "GB"
              },
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "200hr Registered Yoga Teacher (RYT-200)"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "training",
                  "name": "Vipassana Meditation - Sivananda Kutir, Himalayas"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "Powerlifting & Strength Training Certified Coach"
                }
              ],
              "knowsAbout": [
                "Vinyasa Yoga",
                "Arm Balances",
                "Inversions",
                "Vipassana Meditation",
                "Biomechanics",
                "Progressive Movement",
                "Strength Training",
                "Competitive Swimming",
                "Powerlifting"
              ],
              "nationality": "Indian",
              "birthPlace": "Hong Kong"
            }
          })}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      {/* Hero Section */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
            The practice requires effort. Physical & mental.
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="space-y-6">
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                I specialise in alignment, arm balances and inversions with a focus on building strength through intelligent practice. My teaching is grounded through Vipassana meditation — emphasising observation of both mind and body, creating classes that are calm and present while challenging you physically and mentally.
              </p>
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                With a background in competitive swimming and powerlifting, I bring an athlete's understanding of movement progression — but everything is in service of a sustainable lifelong practice. We train specific skills with discipline and structure, not for performance, but for longevity. My interest in biomechanics means I weave anatomy and science into teaching in accessible ways, helping you understand how to build capacity that lasts.
              </p>
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                I see abilities in people beyond what they perceive in themselves. I will consistently encourage you to move outside your comfort zone, safely.
              </p>
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                Of Indian descent and raised in Hong Kong, I have spent time at Sivananda Kutir in the Himalayas. My classes blend technical precision with meditative depth — expect to work hard whilst staying grounded.
              </p>
            </div>

            {/* Photo */}
            <div className="h-[500px] bg-[#EAE0CF] border border-[#C9B99A] rounded-md overflow-hidden">
              <img
                src="/images/about-teaching.jpg"
                alt="Ammar Bass demonstrating leg behind head side crow pose"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-8">
            Practice with me.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#schedule"
              className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide"
            >
              Join a Class
            </a>
            <a
              href="/private-sessions"
              className="inline-block px-8 py-4 rounded-full bg-transparent border-2 border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6] transition-colors text-sm uppercase tracking-wide"
            >
              Book Private Session
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
