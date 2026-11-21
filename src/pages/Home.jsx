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
import { person, business } from '../data/schema';

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
