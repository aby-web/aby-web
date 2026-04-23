import { SectionHeader, Callout } from './SharedComponents';

const accent = 'oklch(56% 0.1 38)';

export default function SectionFundamentals() {
  const fundamentals = [
    {
      num: '01',
      name: 'Hands',
      key: 'Weight through centre of palm, push down through base knuckles of index and middle fingers.',
      detail:
        'Fingers spread naturally — alive and responsive, making micro-adjustments for balance. Shoulder-width apart, index fingers pointing forward. Avoid weight falling back into the wrist: thumb side is bone-on-bone (stable), pinky side is cartilaginous (vulnerable).',
    },
    {
      num: '02',
      name: 'Gaze',
      key: '2cm behind the hands, looking through the centre line of the thumbs.',
      detail:
        'Eyes fixed and not moving. Neck long and relaxed. Looking forward arches the back; looking through the hands causes a fall forward; moving the eyes causes loss of balance. The gaze anchors the entire system.',
    },
    {
      num: '03',
      name: 'Shoulders',
      key: 'Push to 80% from the serratus anterior — NOT from the deltoids.',
      detail:
        'Elevate, then lock and hold. Shoulders long and away from ears. The push comes from the back of the shoulder blade (like using glutes in a squat, not quads). Upper traps engaged but not jamming into the neck.',
    },
    {
      num: '04',
      name: 'Chest Compression',
      key: 'Ribs pulled down and in. Chest drawn back. Slight upper back rounding.',
      detail:
        'This creates axial extension — an elongated spine. Not flat, not arched. The rounding allows the scapula to sit properly on the ribcage. This is the same shoulder position as downward dog — use that pose to condition it.',
    },
    {
      num: '05',
      name: 'Core',
      key: 'Deep core firm (TVA, obliques). Front abs relatively soft. Abdomen does not move.',
      detail:
        'Working the deeper layers: TVA, psoas, obliques — eccentric contraction, not crunching. Think of a finger trap: pull out while drawing in, everything locks. Balance lives here. A moving belly makes balance impossible.',
    },
    {
      num: '06',
      name: 'Breathing',
      key: 'Breathe into the chest while keeping the abdomen completely locked.',
      detail:
        'Belly breathing shifts your centre of gravity — no balance is possible. The diaphragm pulls down and in. Breathe in through the nose, out through the mouth. You should be able to speak while holding a handstand.',
    },
    {
      num: '07',
      name: 'Hips & Toes',
      key: 'Always posterior pelvic tilt — tailbone tucked. Point from the base of the big toe.',
      detail:
        'Never anterior tilt. Tuck the tailbone, pull up into the groin, engage the glutes. For the toe point: push the toe knuckle forward, calf engages, toe relaxes. Slight external rotation of the leg. Energy line runs from groin through midline of thigh through the big toe.',
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
        subtitle="Start from the hands and work your way to the toes. Learn these at the wall before attempting freestanding."
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
        A detailed breakdown of each fundamental — including specific drills, progressions, and corrections
        tailored to your body — is available through private coaching.
      </Callout>
    </section>
  );
}
