import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SectionFoundation,
  SectionFundamentals,
  SectionMuscles,
  SectionBlueprint,
  SectionCoaching,
} from '../components/guide';
import PasswordGate from '../components/guide/PasswordGate';
import EmailGate from '../components/guide/EmailGate';
import { supabase } from '../lib/supabase';

const accent = 'oklch(56% 0.1 38)';

// Sticky Header Component
function GuideHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300"
      style={{
        background: scrolled ? 'oklch(97% 0.012 78)' : 'transparent',
        borderBottom: scrolled ? '1px solid oklch(88% 0.018 78)' : '1px solid transparent',
      }}
    >
      <a href="/" className="flex items-center">
        <img
          src="/images/logo.png"
          alt="Ammar Bass"
          className="w-auto transition-all duration-300"
          style={{ height: '22px' }}
        />
      </a>
    </header>
  );
}

// Cover Section
function Cover() {
  return (
    <section
      className="flex flex-col justify-center items-center text-center min-h-screen"
      style={{
        background: 'oklch(93% 0.025 78)',
        padding: '80px 24px',
        pageBreakAfter: 'always',
        breakAfter: 'page',
      }}
    >
      <div
        style={{
          borderTop: `1px solid ${accent}`,
          borderBottom: `1px solid ${accent}`,
          padding: '52px 0',
          maxWidth: 520,
          width: '100%',
        }}
      >
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(48px, 8vw, 80px)',
            lineHeight: 1.05,
            margin: '0 0 24px',
            letterSpacing: '-0.01em',
            color: 'oklch(17% 0.015 55)',
          }}
        >
          Handstand
          <br />
          Fundamentals
          <br />
          <em style={{ fontStyle: 'italic' }}>Guide</em>
        </h1>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: 15,
            lineHeight: 1.7,
            color: 'oklch(45% 0.012 65)',
            margin: 0,
          }}
        >
          A structured approach to building
          <br />
          your inversion practice
        </p>
      </div>
    </section>
  );
}

export default function Guide() {
  const [hasAccess, setHasAccess] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [viewRecorded, setViewRecorded] = useState(false);

  useEffect(() => {
    // Check if user has already been granted access in this session
    const access = sessionStorage.getItem('guide_access');
    const emailStatus = sessionStorage.getItem('guide_email_captured');

    if (access === 'granted') {
      setHasAccess(true);
    }

    if (emailStatus === 'true' || emailStatus === 'skipped') {
      setEmailCaptured(true);
    }
  }, []);

  useEffect(() => {
    // Record a view when user has access and email gate is complete
    if (hasAccess && emailCaptured && !viewRecorded) {
      recordGuideView();
      setViewRecorded(true);
    }
  }, [hasAccess, emailCaptured, viewRecorded]);

  const recordGuideView = async () => {
    try {
      // Check if view already recorded in this session
      const viewRecorded = sessionStorage.getItem('guide_view_recorded');
      if (viewRecorded) return;

      await supabase.from('guide_views').insert([
        {
          guide_slug: 'handstandguide',
          viewed_at: new Date().toISOString(),
        },
      ]);

      sessionStorage.setItem('guide_view_recorded', 'true');
    } catch (error) {
      console.error('Error recording guide view:', error);
      // Fail silently - don't block user from viewing guide
    }
  };

  // Show password gate first
  if (!hasAccess) {
    return <PasswordGate onSuccess={() => setHasAccess(true)} />;
  }

  // Then show email gate (if not already captured)
  if (!emailCaptured) {
    return <EmailGate onContinue={() => setEmailCaptured(true)} />;
  }

  return (
    <div style={{ background: 'oklch(97% 0.012 78)' }}>
      <Helmet>
        <title>Handstand Fundamentals Guide | Ammar Bass</title>
        <meta
          name="description"
          content="A structured approach to building your handstand practice. Learn the foundations, fundamentals, and key muscles for sustainable handstand training."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <style>{`
        @media print {
          @page { size: A4; margin: 1.5cm 1.8cm; }
          .no-print { display: none !important; }
          body { background: white !important; }
          section { break-inside: avoid; }
        }
        @media (max-width: 768px) {
          section {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }
        }
      `}</style>

      <GuideHeader />

      <main>
        <Cover />

        <div className="max-w-[860px] mx-auto px-6 md:px-10">
          <SectionFoundation />
          <SectionFundamentals />
          <SectionMuscles />
          <SectionBlueprint />
          <SectionCoaching />
        </div>
      </main>
    </div>
  );
}
