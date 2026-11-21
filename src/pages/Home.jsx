import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import PrivateSessionsTeaser from '../components/PrivateSessionsTeaser';
import PracticeVideos from '../components/PracticeVideos';
import About from '../components/About';
import InstagramFeed from '../components/InstagramFeed';
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <PageMeta path="/" />
      <Helmet>
        <meta name="keywords" content="yoga teacher London, vinyasa yoga London, strength yoga, arm balances, inversions, private yoga sessions London, yoga HOME Wellness Primrose Hill, Saturday yoga class Marylebone, yoga BXR, Yogarise Queens Park, Flo Yoga West Hampstead" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ammar Bass",
            "jobTitle": "Yoga Instructor",
            "description": "London-based yoga teacher specialising in alignment, arm balances and inversions. Strong, structured vinyasa practice.",
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
                "url": "https://homewellness.uk/"
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
            "description": "Professional yoga instruction specialising in strength-based vinyasa, arm balances, and inversions in London.",
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
              { "@type": "Place", "name": "West Hampstead, London" }
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
                    "description": "Strength-based vinyasa yoga classes at HOME Wellness (Primrose Hill), BXR (Marylebone), Yogarise (Queens Park) and Flo Yoga (West Hampstead), plus Ammar's own Saturday class in Marylebone"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Private Yoga Sessions",
                    "description": "One-to-one personalised yoga training focusing on specific goals"
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
        <PrivateSessionsTeaser />
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
