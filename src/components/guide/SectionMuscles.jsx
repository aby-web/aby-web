import { SectionHeader } from './SharedComponents';

const accent = 'oklch(56% 0.1 38)';
const accentSage = 'oklch(52% 0.07 148)';

function MuscleRow({ m, dotColor }) {
  return (
    <div style={{ padding: '14px 0', borderTop: '1px solid oklch(90% 0.015 78)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: dotColor,
            flexShrink: 0,
          }}
        />
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            margin: 0,
            color: 'oklch(20% 0.015 55)',
          }}
        >
          {m.name}
        </p>
      </div>
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 12,
          color: 'oklch(55% 0.012 65)',
          margin: '0 0 3px 18px',
          fontWeight: 300,
        }}
      >
        {m.location}
      </p>
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13,
          color: 'oklch(40% 0.012 65)',
          margin: '0 0 0 18px',
          lineHeight: 1.55,
          fontWeight: 300,
        }}
      >
        {m.note}
      </p>
    </div>
  );
}

function MovementPairCards({ pairs, note }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {pairs.map((pair, pi) => (
          <div
            key={pi}
            style={{
              border: '1px solid oklch(88% 0.018 78)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                background: 'oklch(93% 0.018 78)',
                borderBottom: '1px solid oklch(88% 0.018 78)',
              }}
            >
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'oklch(48% 0.012 65)',
                  margin: 0,
                }}
              >
                {pair.label}
              </p>
            </div>
            {pair.moves.map((m, mi) => (
              <div
                key={mi}
                style={{
                  padding: '14px 16px',
                  background: m.goal ? 'oklch(95% 0.03 38)' : 'oklch(99% 0.006 75)',
                  borderBottom: mi === 0 ? '1px solid oklch(90% 0.015 78)' : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    marginTop: 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: m.goal ? accent : 'oklch(88% 0.02 78)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {m.goal && (
                    <span style={{ color: 'white', fontSize: 11, lineHeight: 1 }}>↑</span>
                  )}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 13.5,
                      fontWeight: 500,
                      margin: '0 0 3px',
                      color: m.goal ? accent : 'oklch(42% 0.012 65)',
                    }}
                  >
                    {m.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 12,
                      fontWeight: 300,
                      margin: '0 0 2px',
                      color: 'oklch(42% 0.012 65)',
                    }}
                  >
                    {m.action}
                  </p>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 11.5,
                      fontWeight: 300,
                      margin: 0,
                      color: 'oklch(58% 0.012 65)',
                    }}
                  >
                    {m.muscle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {note && (
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12.5,
            fontWeight: 300,
            color: 'oklch(50% 0.012 65)',
            margin: '12px 0 0',
            lineHeight: 1.6,
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

export default function SectionMuscles() {
  const stretch = [
    {
      name: 'Latissimus Dorsi',
      location: 'Large wing muscles on sides of back',
      note: 'Most commonly tight. Restricts overhead reach.',
    },
    {
      name: 'Pectoralis Major',
      location: 'Chest muscles',
      note: 'Pulls arm into internal rotation, restricts overhead range.',
    },
    {
      name: 'Teres Major',
      location: 'Back of shoulder / armpit area',
      note: 'Works with lats to restrict overhead motion.',
    },
    {
      name: 'Subscapularis',
      location: 'Underneath the shoulder blade',
      note: 'Part of the rotator cuff — very difficult to access directly.',
    },
  ];

  const pushers = [
    {
      name: 'Serratus Anterior',
      location: 'Wraps around ribs from shoulder blade',
      note: 'The most important muscle in handstand. This is where you push from — not the deltoids.',
    },
    {
      name: 'Rotator Cuff',
      location: 'Infraspinatus, Teres Minor, Supraspinatus',
      note: 'Fine stabilisers. Think of fingers gripping a gear stick — subtle but essential.',
    },
    {
      name: 'Trapezius',
      location: 'Upper, middle and lower portions',
      note: 'Upper traps elevate; lower traps pull the blade down and back for stability.',
    },
  ];

  const pullers = [
    {
      name: 'Rhomboids',
      location: 'Between spine and shoulder blades',
      note: 'Creates the opposing force that stabilises the shoulder during pushing. One pulling session per week is transformative.',
    },
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
        number="03"
        title="Key Muscles & Movements"
        subtitle="Understanding which muscles to release and which to develop is the foundation of intelligent practice."
      />

      {/* Stretch vs Develop */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
        <div>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'oklch(60% 0.015 65)',
              margin: '0 0 4px',
              fontWeight: 500,
            }}
          >
            If Shoulders Are Tight — Stretch
          </p>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              color: 'oklch(55% 0.012 65)',
              margin: '0 0 8px',
              fontWeight: 300,
            }}
          >
            These internally rotate the shoulder and restrict overhead range.
          </p>
          {stretch.map((m, i) => (
            <MuscleRow key={i} m={m} dotColor={accentSage} />
          ))}
        </div>
        <div>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: accent,
              margin: '0 0 4px',
              fontWeight: 500,
            }}
          >
            If Unstable — Develop These
          </p>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              color: 'oklch(55% 0.012 65)',
              margin: '0 0 8px',
              fontWeight: 300,
            }}
          >
            Pushers and pullers working in balance create a stable shoulder.
          </p>
          <div style={{ marginBottom: 8 }}>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: accent,
                margin: '12px 0 0',
                padding: '6px 0 0',
                borderTop: '1px solid oklch(90% 0.015 78)',
              }}
            >
              Pushers
            </p>
            {pushers.map((m, i) => (
              <MuscleRow key={i} m={m} dotColor={accent} />
            ))}
          </div>
          <div>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: accentSage,
                margin: '12px 0 0',
                padding: '6px 0 0',
                borderTop: '1px solid oklch(90% 0.015 78)',
              }}
            >
              Pullers
            </p>
            {pullers.map((m, i) => (
              <MuscleRow key={i} m={m} dotColor={accentSage} />
            ))}
          </div>
        </div>
      </div>

      {/* Joint Stacking */}
      <div
        style={{
          background: 'oklch(93% 0.018 78)',
          borderRadius: 8,
          padding: '24px 28px',
          marginBottom: 40,
        }}
      >
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'oklch(55% 0.012 65)',
            margin: '0 0 10px',
            fontWeight: 500,
          }}
        >
          Joint Stacking — Why Alignment Matters
        </p>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            lineHeight: 1.75,
            color: 'oklch(28% 0.015 55)',
            margin: '0 0 12px',
            fontWeight: 300,
          }}
        >
          Properly aligned joints require significantly less muscular effort to maintain. Shoulder stacked over
          elbow, elbow over wrist, wrist over the centre of the palm — this is joint stacking. When joints are
          misaligned, muscles must work harder to compensate, leading to faster fatigue and greater injury risk.
        </p>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13.5,
            color: 'oklch(45% 0.012 65)',
            margin: 0,
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          Think of it like standing upright vs. leaning at an angle — one requires almost no effort, the other is
          exhausting to maintain.
        </p>
      </div>

      {/* Scapular movements */}
      <div style={{ marginBottom: 32 }}>
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
          Scapular Movements — Quick Reference
        </p>
        <MovementPairCards
          pairs={[
            {
              label: 'Pair 1 — Forward / Back',
              moves: [
                {
                  name: 'Protraction',
                  action: 'Reaching forward',
                  muscle: 'Serratus Anterior',
                  goal: true,
                },
                {
                  name: 'Retraction',
                  action: 'Squeeze blades together',
                  muscle: 'Rhomboids, Mid Traps',
                  goal: false,
                },
              ],
            },
            {
              label: 'Pair 2 — Up / Down',
              moves: [
                {
                  name: 'Elevation',
                  action: 'Lift shoulders up',
                  muscle: 'Upper Trapezius',
                  goal: true,
                },
                {
                  name: 'Depression',
                  action: 'Pull shoulders down',
                  muscle: 'Lower Trapezius',
                  goal: false,
                },
              ],
            },
          ]}
          note={
            <>
              In handstand you <strong style={{ fontWeight: 500, color: 'oklch(30% 0.015 55)' }}>protract and elevate</strong> — reaching forward and long. Retraction and depression provide the counter-tension that stabilises the whole structure.
            </>
          }
        />
      </div>

      {/* Humeral movements */}
      <div style={{ marginBottom: 40 }}>
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
          Humeral Movements — Quick Reference
        </p>
        <MovementPairCards
          pairs={[
            {
              label: 'Pair 1 — Rotation',
              moves: [
                {
                  name: 'External Rotation',
                  action: 'Turn arm outward',
                  muscle: 'Infraspinatus, Teres Minor',
                  goal: true,
                },
                {
                  name: 'Internal Rotation',
                  action: 'Turn arm inward',
                  muscle: 'Lats, Pec Major, Subscapularis',
                  goal: false,
                },
              ],
            },
            {
              label: 'Pair 2 — Plane of Motion',
              moves: [
                {
                  name: 'Flexion',
                  action: 'Arm overhead (180°)',
                  muscle: 'Anterior Deltoid, Biceps',
                  goal: true,
                },
                {
                  name: 'Extension',
                  action: 'Arm behind body',
                  muscle: 'Posterior Deltoid, Lats',
                  goal: false,
                },
              ],
            },
          ]}
          note={
            <>
              In handstand you need <strong style={{ fontWeight: 500, color: 'oklch(30% 0.015 55)' }}>full flexion (180°) with external rotation</strong>. Tight internal rotators (lats, pecs) limit flexion and force compensations like the arched back.
            </>
          }
        />
      </div>

      {/* Muscle quick reference table */}
      <div style={{ marginBottom: 40 }}>
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
          Muscle Quick Reference
        </p>
        <div
          style={{
            border: '1px solid oklch(88% 0.018 78)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              background: 'oklch(93% 0.018 78)',
              padding: '10px 16px',
              borderBottom: '1px solid oklch(88% 0.018 78)',
            }}
          >
            {['Muscle', 'Primary Role', 'In Handstand'].map((h) => (
              <p
                key={h}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'oklch(45% 0.012 65)',
                  margin: 0,
                }}
              >
                {h}
              </p>
            ))}
          </div>
          {[
            ['Serratus Anterior', 'Protraction', 'Where you push from', false],
            ['Infraspinatus', 'External rotation', 'Stabilise shoulder joint', false],
            ['Teres Minor', 'External rotation', 'Works with infraspinatus', false],
            ['Upper Trapezius', 'Elevation', 'Engaged but not dominant', false],
            ['Lower Trapezius', 'Depression', 'Pulls blade down and back', false],
            ['Rhomboids', 'Retraction', 'Stabilises during push', false],
            ['Latissimus Dorsi', 'Internal rotation', 'Can restrict if tight', false],
            ['Pectoralis Major', 'Internal rotation', 'Can restrict if tight', false],
          ].map(([muscle, role, hs, highlight], i, arr) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '11px 16px',
                background: highlight
                  ? 'oklch(95% 0.03 38)'
                  : i % 2 === 0
                  ? 'oklch(99% 0.006 75)'
                  : 'oklch(97% 0.012 78)',
                borderBottom: i < arr.length - 1 ? '1px solid oklch(91% 0.015 78)' : 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: highlight ? 500 : 400,
                  margin: 0,
                  color: highlight ? accent : 'oklch(22% 0.015 55)',
                }}
              >
                {muscle}
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 300,
                  margin: 0,
                  color: 'oklch(42% 0.012 65)',
                }}
              >
                {role}
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: highlight ? 500 : 300,
                  margin: 0,
                  color: highlight ? accent : 'oklch(42% 0.012 65)',
                }}
              >
                {hs}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Self-assessment */}
      <div>
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
          Self-Assessment
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Can you hold 30+ seconds at the wall?', 'Ready for alignment refinement'],
            ['Can you reach 180° overhead (arms by ears)?', 'Adequate shoulder mobility'],
            ['Feel engagement in back of shoulder blade?', 'Pushing from serratus — correct'],
            ['Feel it only in deltoids / top of shoulder?', 'Learn the correct push pattern first'],
            ['Can you breathe while core is locked?', 'Proper core compression achieved'],
            ['Is your tailbone tucked in standing poses?', 'Posterior tilt pattern established'],
          ].map(([q, a], i) => (
            <div
              key={i}
              style={{
                background: 'oklch(99% 0.006 75)',
                border: '1px solid oklch(88% 0.018 78)',
                borderRadius: 6,
                padding: '14px 16px',
              }}
            >
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12.5,
                  margin: '0 0 5px',
                  color: 'oklch(25% 0.015 55)',
                  lineHeight: 1.5,
                }}
              >
                {q}
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  margin: 0,
                  color: accent,
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                → {a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
