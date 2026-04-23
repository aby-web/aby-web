import { SectionHeader } from './SharedComponents';

const accent = 'oklch(56% 0.1 38)';

export default function SectionBlueprint() {
  const daily = [
    {
      time: '5–10 min',
      phase: 'Warm-Up',
      desc: 'Wrists, shoulders, thoracic spine. Hamstring stretches. Activate serratus anterior.',
    },
    {
      time: '15–20 min',
      phase: 'Wall Work',
      desc: 'Fundamental positions, holds, drills. Build endurance and refine alignment.',
    },
    {
      time: '10–15 min',
      phase: 'Strength & Conditioning',
      desc: 'Targeted exercises for weak areas. Pulling work, core conditioning, straight-arm holds.',
    },
    {
      time: '5 min',
      phase: 'Cool-Down',
      desc: 'Stretch lats and pecs. Nerve flossing if tingling is present.',
    },
  ];

  const pitfalls = [
    'Skipping wall work to attempt freestanding too early',
    'Not building adequate endurance (20–30 second holds minimum before technique work)',
    'Breathing into the belly instead of the chest',
    'Pushing from deltoids instead of serratus anterior',
    'Progressing too fast without building joint strength',
    'Judging yourself on bad days — show up anyway',
  ];

  return (
    <section
      style={{
        padding: '80px 0',
        borderBottom: '1px solid oklch(88% 0.018 78)',
        breakAfter: 'page',
      }}
    >
      <SectionHeader
        number="04"
        title="Your Practice Blueprint"
        subtitle="A general framework. Individual programming creates significantly faster, safer progress."
      />

      <div style={{ marginBottom: 48 }}>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'oklch(60% 0.015 65)',
            margin: '0 0 20px',
            fontWeight: 500,
          }}
        >
          Daily Structure — 30 to 45 Minutes
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {daily.map((d, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '0 24px',
                padding: '20px 0',
                borderTop: '1px solid oklch(90% 0.015 78)',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 11,
                    color: accent,
                    margin: '0 0 4px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                  }}
                >
                  {d.time}
                </p>
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 18,
                    fontWeight: 400,
                    margin: 0,
                    color: 'oklch(17% 0.015 55)',
                  }}
                >
                  {d.phase}
                </p>
              </div>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: 'oklch(42% 0.012 65)',
                  margin: 'auto 0',
                  fontWeight: 300,
                }}
              >
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'oklch(60% 0.015 65)',
            margin: '0 0 16px',
            fontWeight: 500,
          }}
        >
          Common Pitfalls
        </p>
        {pitfalls.map((p, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 12,
              padding: '10px 0',
              borderTop: '1px solid oklch(90% 0.015 78)',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                color: 'oklch(62% 0.03 68)',
                fontSize: 14,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              ×
            </span>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13.5,
                lineHeight: 1.6,
                color: 'oklch(40% 0.012 65)',
                margin: 0,
                fontWeight: 300,
              }}
            >
              {p}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'oklch(93% 0.018 78)',
          borderRadius: 8,
          padding: '28px 32px',
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 22,
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'oklch(17% 0.015 55)',
            margin: '0 0 8px',
            lineHeight: 1.4,
          }}
        >
          "If you can't hold yourself up, I can give you all the technique in the world — you cannot apply it."
        </p>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            color: 'oklch(55% 0.012 65)',
            margin: 0,
            fontWeight: 300,
          }}
        >
          Build the time window first. Technique follows endurance.
        </p>
      </div>
    </section>
  );
}
