import { SectionHeader, Callout } from '../SharedComponents';

const accent = 'oklch(56% 0.1 38)';

export default function SectionFundamentals() {
  const fundamentals = [
    {
      num: '01',
      name: 'Forearms & Hands',
      key: 'Forearms parallel, shoulder-width. Press through the whole forearm — wrist, heel of the hand, and index-finger knuckles.',
      detail:
        'The forearm is your new foundation — spread the load along its entire length rather than dumping into the elbows. Keep the forearms truly parallel (not a V). Fingers spread and alive, actively gripping the floor to steer balance. Pressing the index-knuckle and thumb side counters the tendency to roll onto the outer wrist.',
    },
    {
      num: '02',
      name: 'Elbows',
      key: 'Shoulder-width apart and fixed there. Elbows must never splay wider than the shoulders.',
      detail:
        'This is the defining challenge of Pincha. As you kick up, tight shoulders drive the elbows outward, collapsing the base. Hug the forearms toward the midline and stack elbow directly under shoulder. If they drift wide, the whole structure loses its stack and the shoulders take the strain.',
    },
    {
      num: '03',
      name: 'Gaze',
      key: 'Softly forward, just past the fingertips — not down at the floor between the hands.',
      detail:
        'A fixed, still gaze slightly ahead of the hands lengthens the neck and keeps the chest open without arching. Dropping the head or staring straight down rounds the neck and tips you off balance. Keep the eyes quiet — a wandering gaze is a wandering balance.',
    },
    {
      num: '04',
      name: 'Shoulders',
      key: 'Full flexion with external rotation. Push away from the floor from the serratus — stack shoulders over elbows.',
      detail:
        'Reach the shoulders away from the ears and rotate the upper arms outward (pinkies pressing, biceps facing forward). The push comes from the serratus anterior and lower traps, not the deltoids. Limited shoulder flexion is the number-one reason Pincha turns into a banana — mobility here is non-negotiable.',
    },
    {
      num: '05',
      name: 'Chest & Upper Back',
      key: 'Ribs drawn down and in. Lengthen through the mid-back — no dumping into the lower spine.',
      detail:
        'The classic Pincha fault is the "banana back": ribs flaring and the lumbar spine collapsing to compensate for tight shoulders. Instead, knit the front ribs in and create axial extension — a long, stacked spine. This lets the shoulders open over the base rather than throwing the belly and legs forward.',
    },
    {
      num: '06',
      name: 'Core & Breath',
      key: 'Deep core firm, ribs locked, tailbone tucked. Breathe into the chest with the abdomen quiet.',
      detail:
        'Work the deeper layers — TVA, obliques, lower abs — to lock the ribs to the pelvis so the two halves of the body move as one column. Belly breathing shifts your centre of gravity and kills balance; breathe into the chest with a still abdomen. You should be able to speak while holding the pose.',
    },
    {
      num: '07',
      name: 'Hips & Legs',
      key: 'Posterior pelvic tilt — tailbone tucked. Stack hips over shoulders. Legs together, toes pointed.',
      detail:
        'Tuck the tailbone, engage the glutes, and reach up through the inner thighs so the hips stack over the shoulders — not behind them. Squeeze the legs to the midline with a slight external rotation and point from the base of the big toe. A long line from wrist to toe means the skeleton carries the load, not the muscles.',
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
        number="02"
        title="The 7 Fundamentals"
        subtitle="Start from the forearms and work your way to the toes. Learn these at the wall before attempting freestanding."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {fundamentals.map((f, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '0 32px',
              padding: '28px 0',
              borderTop: '1px solid oklch(90% 0.015 78)',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 52,
                  fontWeight: 300,
                  color: 'oklch(88% 0.02 78)',
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {f.num}
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 24,
                  fontWeight: 400,
                  margin: '0 0 6px',
                  color: 'oklch(17% 0.015 55)',
                  letterSpacing: '-0.01em',
                }}
              >
                {f.name}
              </h3>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: accent,
                  margin: '0 0 8px',
                  lineHeight: 1.5,
                }}
              >
                {f.key}
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13.5,
                  lineHeight: 1.75,
                  color: 'oklch(42% 0.012 65)',
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {f.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Callout>
        Learn these at the wall, one at a time, until each becomes automatic. The shape is the sum of small,
        well-drilled habits — not a single heroic kick-up.
      </Callout>
    </section>
  );
}
