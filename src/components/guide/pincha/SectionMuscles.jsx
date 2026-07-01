import { SectionHeader } from '../SharedComponents';

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
      <div className="movement-pairs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
      note: 'The main brake on overhead reach. Tight lats pull the arms out of full flexion and force the back to arch.',
    },
    {
      name: 'Pectoralis Major & Minor',
      location: 'Chest / front of shoulder',
      note: 'Pull the arm into internal rotation and round the shoulders forward, robbing you of the flexion Pincha needs.',
    },
    {
      name: 'Teres Major',
      location: 'Back of shoulder / armpit area',
      note: 'Works with the lats to limit overhead motion and external rotation.',
    },
    {
      name: 'Upper Trapezius',
      location: 'Top of the shoulder into the neck',
      note: 'Often over-tight. Pain here while balancing distracts from everything else — address it as a priority.',
    },
  ];

  const pushers = [
    {
      name: 'Serratus Anterior',
      location: 'Wraps around the ribs from the shoulder blade',
      note: 'Where you push from — reaching the floor away. Keeps the shoulders elevated and the blades flat on the ribs.',
    },
    {
      name: 'Deltoids',
      location: 'Cap of the shoulder',
      note: 'Carry much of the load in the forearm line. The more shoulder flexion you have, the less they must work.',
    },
    {
      name: 'Rotator Cuff',
      location: 'Infraspinatus, Teres Minor, Supraspinatus, Subscapularis',
      note: 'Fine stabilisers that hold the shoulder centred. External rotators here keep the elbows from splaying.',
    },
  ];

  const pullers = [
    {
      name: 'Lower & Mid Trapezius, Rhomboids',
      location: 'Between and below the shoulder blades',
      note: 'Create the opposing tension that stabilises the shoulder while it pushes. One dedicated pulling session per week is transformative.',
    },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .muscles-stretch-develop {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .movement-pairs {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
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
        number="03"
        title="Biomechanics & Key Muscles"
        subtitle="In forearm stand the shoulder is the first joint that leaves the floor — so shoulder position all but determines the pose. Understand what to release and what to develop, and the rest of the body can almost stay quiet."
      />

      {/* Shoulder-first principle */}
      <div
        style={{
          background: 'oklch(95% 0.03 38)',
          borderLeft: `3px solid ${accent}`,
          borderRadius: 6,
          padding: '20px 24px',
          marginBottom: 40,
        }}
      >
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            lineHeight: 1.75,
            color: 'oklch(24% 0.015 55)',
            margin: 0,
            fontWeight: 300,
          }}
        >
          <strong style={{ fontWeight: 500 }}>The shoulder is everything.</strong> Wrists and elbows rest on the
          floor; the shoulder is the first joint that must stabilise itself in the air. Pincha asks for near-180°
          flexion <em>with</em> external rotation — more external rotation than most shoulders naturally have
          overhead. The closer you get to a straight line through the shoulders, the less the rest of the body has
          to fight.
        </p>
      </div>

      {/* Stretch vs Develop */}
      <div className="muscles-stretch-develop" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
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
            These internally rotate the shoulder and restrict overhead range. Chances are only one or two are your
            real limiter — find it.
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
            Pushers and pullers working in balance create a stable shoulder in the forearm line.
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

      {/* Why 180 matters / planche */}
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
          Why 180° Shoulder Flexion Matters
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
          When the shoulders close to less than 180°, the trunk drifts toward a planche — and a planche demands far
          more shoulder strength than a balance ever should. It also shifts your centre of mass away from the
          forearms. The body compensates the only way it can: by arching. That is the banana back, and it is almost
          always a shoulder-flexion problem, not a core problem.
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
          Stack shoulder over elbow over wrist. Aligned joints hold themselves up — misaligned joints burn muscle
          to stay there.
        </p>
      </div>

      {/* Core: inner vs outer unit */}
      <div
        style={{
          border: '1px solid oklch(88% 0.018 78)',
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
          The Core — Inner Unit vs Outer Unit
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
          Core means both the abdominal <em>and</em> the back. Because a balance involves almost no movement, it is
          the <strong style={{ fontWeight: 500 }}>inner unit</strong> — diaphragm, transversus abdominis,
          multifidus, pelvic floor — that does the real work, holding the spine as one integrated column. The outer
          unit (the movement muscles) can stay comparatively quiet. Abdominal strength matters, but usually far
          less than people think — a stable shoulder is worth more than a stronger six-pack.
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
          Two things quietly shape your demand for core strength: a flatter lower back (less lordosis) balances
          more easily, and heavier hips and legs ask more of the abdominals to hold a straight line.
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
                  action: 'Reaching the floor away',
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
                  action: 'Lift shoulders away from floor',
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
              In Pincha you <strong style={{ fontWeight: 500, color: 'oklch(30% 0.015 55)' }}>protract and elevate</strong> — pressing the floor away and lifting out of the shoulders. Retraction and depression provide the counter-tension that keeps the structure from collapsing.
            </>
          }
        />
      </div>

      {/* Humeral movements */}
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
          Humeral Movements — Quick Reference
        </p>
        <MovementPairCards
          pairs={[
            {
              label: 'Pair 1 — Rotation',
              moves: [
                {
                  name: 'External Rotation',
                  action: 'Turn upper arms outward',
                  muscle: 'Infraspinatus, Teres Minor',
                  goal: true,
                },
                {
                  name: 'Internal Rotation',
                  action: 'Turn arms inward, elbows splay',
                  muscle: 'Lats, Pecs, Subscapularis',
                  goal: false,
                },
              ],
            },
            {
              label: 'Pair 2 — Plane of Motion',
              moves: [
                {
                  name: 'Flexion',
                  action: 'Arms overhead toward 180°',
                  muscle: 'Anterior Deltoid, Serratus',
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
              Pincha needs <strong style={{ fontWeight: 500, color: 'oklch(30% 0.015 55)' }}>flexion toward 180° combined with external rotation</strong>. Tight internal rotators (lats, pecs) both limit flexion and drive the elbows wide — the two faults are the same fault.
            </>
          }
        />
      </div>

      {/* Pelvic movements */}
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
          Pelvic & Ankle Movements — Quick Reference
        </p>
        <MovementPairCards
          pairs={[
            {
              label: 'Pelvic Tilt',
              moves: [
                {
                  name: 'Posterior Tilt',
                  action: 'Tailbone tucked, ribs knit in',
                  muscle: 'Glutes, Lower Abdominals',
                  goal: true,
                },
                {
                  name: 'Anterior Tilt',
                  action: 'Tailbone out, lower back arches',
                  muscle: 'Hip Flexors, Erector Spinae',
                  goal: false,
                },
              ],
            },
            {
              label: 'Ankle & Toe',
              moves: [
                {
                  name: 'Plantar Flexion',
                  action: 'Point from base of big toe',
                  muscle: 'Gastrocnemius, Soleus',
                  goal: true,
                },
                {
                  name: 'Dorsiflexion',
                  action: 'Flexed foot, toes toward shin',
                  muscle: 'Tibialis Anterior',
                  goal: false,
                },
              ],
            },
          ]}
          note={
            <>
              In Pincha you <strong style={{ fontWeight: 500, color: 'oklch(30% 0.015 55)' }}>always use posterior tilt and plantar flexion</strong> — tailbone tucked, glutes firing to stack the hips over the shoulders, toes pointed to complete the line.
            </>
          }
        />
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
            ['Can you hold Dolphin for 2 minutes in good form?', 'Ready to start forearm-balance training'],
            ['Do you have a steady headstand?', 'Useful base — inversion tolerance established'],
            ['Can you reach ~180° overhead, arms by ears, without arching?', 'Adequate shoulder flexion'],
            ['Do your elbows stay shoulder-width when you kick up?', 'External rotation is holding — good'],
            ['Does your lower back arch into a banana at the wall?', 'Shoulder flexion, not core, is the limiter'],
            ['Can you breathe into the chest with ribs locked?', 'Inner-unit control achieved'],
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
    </>
  );
}
