import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SectionFoundation,
  SectionFundamentals,
  SectionMuscles,
  SectionBlueprint,
  SectionCoaching,
} from '../components/guide';

const accent = 'oklch(56% 0.1 38)';

// Sticky Header Component
function GuideHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoFilter = scrolled ? 'none' : 'brightness(0) invert(1)';

  return (
    <header
      className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 transition-all duration-300"
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
          style={{ height: '22px', filter: logoFilter }}
        />
      </a>
      <button
        onClick={() => window.print()}
        className="transition-all duration-200"
        style={{
          padding: '10px 20px',
          background: 'transparent',
          border: `1px solid ${accent}`,
          borderRadius: 6,
          color: accent,
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          letterSpacing: '0.03em',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = accent;
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = accent;
        }}
      >
        Download PDF
      </button>
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
        padding: '80px 48px',
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
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: accent,
            margin: '0 0 32px',
          }}
        >
          Ammar Bass · 2026
        </p>
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
            margin: '0 0 48px',
          }}
        >
          A structured approach to building
          <br />
          your inversion practice
        </p>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'oklch(55% 0.012 65)',
            margin: 0,
          }}
        >
          ammar@ammarbass.com &nbsp;·&nbsp; @ammarbass
        </p>
      </div>
    </section>
  );
}

export default function Guide() {
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
      `}</style>

      <GuideHeader />

      <main>
        <Cover />

        <div className="max-w-[860px] mx-auto px-10">
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
