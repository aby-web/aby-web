import { SectionHeader } from '../SharedComponents';

const accent = 'oklch(56% 0.1 38)';

export default function SectionBlueprint() {
  const daily = [
    {
      time: '5–10 min',
      phase: 'Warm-Up',
      desc: 'Wrists, forearms and thoracic spine. Open shoulders into flexion and external rotation. Fire up the serratus.',
    },
    {
      time: '2 min',
      phase: 'Dolphin Hold',
      desc: 'Your foundation drill. Build toward a comfortable two-minute hold in clean form — this is the entry ticket to forearm balance.',
    },
    {
      time: '15–20 min',
      phase: 'Wall Work',
      desc: 'Calibrated kick-ups to the wall, then hold and switch drills. Build endurance and groove the forearm line.',
    },
    {
      time: '10–15 min',
      phase: 'Strength & Conditioning',
      desc: 'Target your specific limiter — pulling work, external-rotation and serratus strength, hip-flexor and lat mobility.',
    },
    {
      time: '5 min',
      phase: 'Cool-Down',
      desc: 'Stretch lats and pecs. Nerve flossing if tingling is present.',
    },
  ];

  const drills = [
    {
      name: 'Calibrated Wall Kick-Up',
      desc: 'Forearms parallel, kick up until your big toe or the ball of the foot just grazes the wall. Hold 2 seconds without moving the second leg, then lower in the slowest possible way. Aim for 7+ clean reps out of 10, three sets, before moving on.',
    },
    {
      name: 'Forearm Balance Switches',
      desc: 'From one foot on the wall in a small straddle, switch the legs — first with both feet touching, then switching in the air, then switching in the air with a 2-second hold each time. This builds the balance point without a full commitment.',
    },
    {
      name: 'Progressions (after a 30s hold)',
      desc: 'Once your freestanding hold is consistent, explore tuck → straddle → straight-line entries, uneven forearm stands, and palms-up transitions. Working the progressions is often what finally solidifies the standard pose.',
    },
  ];

  const pitfalls = [
    'Chasing the balance before you can hold Dolphin comfortably for two minutes',
    'Letting the elbows splay wider than the shoulders as you kick up',
    'Arching into a banana back to compensate for limited shoulder flexion',
    'Not reaching the wall — usually tight top-leg hip flexors, under-firing glutes, or lifting the bottom leg too soon',
    'Leaning on the wall so long it becomes a crutch rather than a tool',
    'Over-training abs while neglecting the shoulder stability that actually limits you',
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
        subtitle="A general framework built toward a 30-second freestanding hold. Adjust the emphasis to whatever your own practice needs most."
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
          Session Structure
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

      {/* Key drills */}
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
          Key Wall Drills
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          {drills.map((d, i) => (
            <div
              key={i}
              style={{
                background: 'oklch(99% 0.006 75)',
                border: '1px solid oklch(88% 0.018 78)',
                borderRadius: 8,
                padding: '18px 22px',
              }}
            >
              <h4
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 20,
                  fontWeight: 400,
                  margin: '0 0 6px',
                  color: 'oklch(17% 0.015 55)',
                }}
              >
                {d.name}
              </h4>
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
          "Get the shoulders to the line and the legs can almost stay dormant. Fix the shape at the shoulders, and
          balance stops being a fight."
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
          Build the shoulder position and the endurance first. Balance follows.
        </p>
      </div>
    </section>
  );
}
