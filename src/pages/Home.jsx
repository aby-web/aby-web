import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import EventsStrip from '../components/EventsStrip';
import PracticeVideos from '../components/PracticeVideos';
import About from '../components/About';
import InstagramFeed from '../components/InstagramFeed';
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Ammar Bass | Yoga Teacher London | Strength-Based Vinyasa Classes</title>
        <meta name="description" content="London-based yoga teacher specializing in alignment, arm balances and inversions. Strong, structured practice for people who take their training seriously. Classes at HOME Wellness, Indaba, BXR, Yogarise and Flo Yoga." />
        <meta name="keywords" content="yoga teacher London, vinyasa yoga London, strength yoga, arm balances, inversions, private yoga sessions London, yoga HOME Wellness Primrose Hill, Indaba Marylebone, yoga BXR, Yogarise Queens Park, Flo Yoga Hampstead" />

        {/* Open Graph */}
        <meta property="og:title" content="Ammar Bass | Yoga Teacher London" />
        <meta property="og:description" content="Strong, structured yoga practice for people who take their training seriously. Specializing in alignment, arm balances and inversions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com" />
        <meta property="og:image" content="https://ammarbass.com/images/about.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ammar Bass | Yoga Teacher London" />
        <meta name="twitter:description" content="Strong, structured yoga practice for people who take their training seriously." />
        <meta name="twitter:image" content="https://ammarbass.com/images/about.webp" />

        <link rel="canonical" href="https://ammarbass.com" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ammar Bass",
            "jobTitle": "Yoga Instructor",
            "description": "London-based yoga teacher specializing in alignment, arm balances and inversions. Strong, structured vinyasa practice.",
            "url": "https://ammarbass.com",
            "image": "https://ammarbass.com/images/about.webp",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "London",
              "addressCountry": "GB"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "200hr Registered Yoga Teacher Training"
            },
            "knowsAbout": [
              "Vinyasa Yoga",
              "Arm Balances",
              "Inversions",
              "Handstands",
              "Vipassana Meditation",
              "Biomechanics",
              "Strength Training"
            ],
            "worksFor": [
              {
                "@type": "Organization",
                "name": "HOME Wellness",
                "url": "http://homewellness.uk/"
              },
              {
                "@type": "Organization",
                "name": "Indaba Yoga",
                "url": "https://indabayoga.com/"
              },
              {
                "@type": "Organization",
                "name": "BXR London",
                "url": "https://www.bxrlondon.com/"
              },
              {
                "@type": "Organization",
                "name": "Yogarise",
                "url": "https://yogarise.london/"
              },
              {
                "@type": "Organization",
                "name": "Flo Yoga",
                "url": "https://www.floyogastudio.co.uk/"
              }
            ],
            "sameAs": [
              "https://www.instagram.com/ammarbass"
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Ammar Bass Yoga",
            "description": "Professional yoga instruction specializing in strength-based vinyasa, arm balances, and inversions in London.",
            "url": "https://ammarbass.com",
            "telephone": "",
            "email": "",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "London",
              "addressCountry": "GB"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "51.5074",
              "longitude": "-0.1278"
            },
            "priceRange": "££",
            "image": "https://ammarbass.com/images/about.webp",
            "areaServed": [
              { "@type": "City", "name": "London" },
              { "@type": "Place", "name": "Primrose Hill, London" },
              { "@type": "Place", "name": "Marylebone, London" },
              { "@type": "Place", "name": "Queens Park, London" },
              { "@type": "Place", "name": "Hampstead, London" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Yoga Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Group Vinyasa Classes",
                    "description": "Strength-based vinyasa yoga classes at HOME Wellness (Primrose Hill), Indaba (Marylebone), BXR (Marylebone), Yogarise (Queens Park) and Flo Yoga (Hampstead)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Private Yoga Sessions",
                    "description": "One-to-one personalized yoga training focusing on specific goals"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Yoga Workshops",
                    "description": "Intensive workshops on arm balances, inversions, and strength"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <Nav />
      <VacationBanner />
      <main>
        <Hero />
        <EventsStrip />
        <Schedule />
        <About />
        <PracticeVideos />
        <InstagramFeed />
        <EmailCapture />
      </main>
      <Footer />
    </div>
  );
}
