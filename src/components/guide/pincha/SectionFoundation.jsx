import { SectionHeader } from '../SharedComponents';

const accent = 'oklch(56% 0.1 38)';

export default function SectionFoundation() {
  const pillars = [
    {
      label: 'Endurance',
      desc: 'Build the capacity to hold the shape long enough to apply technique. The forearms and shoulders must earn the time before balance is possible.',
    },
    {
      label: 'Alignment',
      desc: 'Stack the structure once endurance is established — forearms, elbows and shoulders in one vertical line. Each feeds the other.',
    },
    {
      label: 'Balance',
      desc: 'The natural outcome — not the starting point, but the result of endurance and alignment combined over a stable base.',
    },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .foundation-pillars {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .foundation-text {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
      <section
        style={{
          padding: '80px 0',
          borderBottom: '1px solid oklch(88% 0.018 78)',
          breakAfter: 'page',
        }}
      >
      <SectionHeader
        number="01"
        title="The Foundation"
        subtitle="Pincha Mayurasana rests on three interconnected pillars that feed each other cyclically — the same principles as any inversion, applied to a wider, forearm-based foundation."
      />

      <div className="foundation-pillars" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
        {pillars.map((p, i) => (
          <div
            key={i}
            style={{
              background: 'oklch(99% 0.006 75)',
              border: '1px solid oklch(88% 0.018 78)',
              borderRadius: 8,
              padding: '28px 24px',
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: accent,
                margin: '0 0 10px',
                fontWeight: 500,
              }}
            >
              0{i + 1}
            </p>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 26,
                fontWeight: 400,
                margin: '0 0 10px',
                color: 'oklch(17% 0.015 55)',
              }}
            >
              {p.label}
            </h3>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13.5,
                lineHeight: 1.7,
                color: 'oklch(42% 0.012 65)',
                margin: 0,
                fontWeight: 300,
              }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="foundation-text" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <h4
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 20,
              fontWeight: 400,
              margin: '0 0 10px',
              color: 'oklch(17% 0.015 55)',
            }}
          >
            Consistency Over Intensity
          </h4>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              lineHeight: 1.75,
              color: 'oklch(40% 0.012 65)',
              margin: 0,
              fontWeight: 300,
            }}
          >
            Daily, consistent practice outperforms occasional intensive sessions. Forearm balance is methodical —
            like learning a language, it requires regular, incremental exposure. The shoulders and mid-back adapt
            slowly, and there are no shortcuts.
          </p>
        </div>
        <div>
          <h4
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 20,
              fontWeight: 400,
              margin: '0 0 10px',
              color: 'oklch(17% 0.015 55)',
            }}
          >
            Your Timeline
          </h4>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              lineHeight: 1.75,
              color: 'oklch(40% 0.012 65)',
              margin: 0,
              fontWeight: 300,
            }}
          >
            Progress can come quickly or take longer — it depends on your shoulder mobility, your history, your
            consistency, and countless other factors. What matters is that all progressions are valid.
          </p>
        </div>
      </div>

      <div
        style={{
          background: 'oklch(93% 0.018 78)',
          borderLeft: '3px solid oklch(72% 0.03 68)',
          padding: '20px 24px',
          borderRadius: '6px',
          marginTop: 24,
        }}
      >
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, lineHeight: 1.7, margin: 0, color: 'oklch(22% 0.015 55)' }}>
          <strong>Master Dolphin first, then the wall.</strong> Dolphin pose is to Pincha what downward dog is to
          handstand — it teaches the exact shoulder position and builds the endurance you need. Learn every
          fundamental against the wall before attempting freestanding. This removes the balance variable so you
          can build the correct patterns without compensation.
        </p>
      </div>
      </section>
    </>
  );
}
