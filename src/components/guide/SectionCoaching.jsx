const accent = 'oklch(56% 0.1 38)';

export default function SectionCoaching() {
  return (
    <section style={{ padding: '80px 0', breakBefore: 'page' }}>
      <div style={{ borderTop: `2px solid ${accent}`, paddingTop: 48, marginBottom: 48 }}>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: accent,
            margin: '0 0 20px',
            fontWeight: 500,
          }}
        >
          05 · Private Coaching
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(32px, 4vw, 50px)',
                margin: '0 0 20px',
                lineHeight: 1.1,
                color: 'oklch(17% 0.015 55)',
                letterSpacing: '-0.01em',
              }}
            >
              Every body is different.
              <br />
              <em style={{ fontStyle: 'italic' }}>
                Your practice
                <br />
                should be too.
              </em>
            </h2>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 300,
                fontSize: 14.5,
                lineHeight: 1.8,
                color: 'oklch(42% 0.012 65)',
                margin: 0,
              }}
            >
              This guide gives you the framework. Private coaching identifies exactly what your body needs — your
              specific restrictions, strengths, and movement history — and creates a targeted plan built around
              you.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                title: 'Live 1-2-1 Sessions',
                desc: 'A tailored session built around a practice blueprint — around 60 minutes. I observe your movement in real time, identify restrictions, and guide corrections as we go.',
              },
              {
                title: 'Video Analysis & Programming',
                desc: 'I share a structured programme with you. You send me regular video snippets of the things I ask you to work on — I evaluate, give feedback, and update the programme as you progress.',
              },
            ].map((o, i) => (
              <div
                key={i}
                style={{
                  background: 'oklch(93% 0.018 78)',
                  borderRadius: 8,
                  padding: '24px 24px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 22,
                    fontWeight: 400,
                    margin: '0 0 10px',
                    color: 'oklch(17% 0.015 55)',
                  }}
                >
                  {o.title}
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
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'oklch(93% 0.018 78)',
          border: '1px solid oklch(88% 0.018 78)',
          borderRadius: 8,
          padding: '32px 36px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 24,
            fontWeight: 400,
            margin: '0 0 12px',
            color: 'oklch(17% 0.015 55)',
          }}
        >
          Ready to go deeper?
        </p>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            color: 'oklch(42% 0.012 65)',
            margin: '0 0 20px',
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          Get in touch to discuss how private coaching can accelerate your progress.
        </p>
        <a
          href="mailto:ammar@ammarbass.com"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            color: accent,
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ammar@ammarbass.com
        </a>
      </div>
    </section>
  );
}
