// Guide content sections — loaded by Handstand Guide.html

const { useState } = React;

function Cover({ accent }) {
  return (
    <section data-screen-label="Cover" style={{
      background: 'oklch(93% 0.025 78)',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', padding: '80px 48px',
      pageBreakAfter: 'always', breakAfter: 'page',
    }}>
      <div style={{ borderTop: `1px solid ${accent}`, borderBottom: `1px solid ${accent}`, padding: '52px 0', maxWidth: 520, width: '100%' }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: accent, margin: '0 0 32px' }}>
          Ammar Bass · 2026
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontWeight: 300, fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1.05, margin: '0 0 24px', letterSpacing: '-0.01em', color: 'oklch(17% 0.015 55)' }}>
          Handstand<br />Fundamentals<br />
          <em style={{ fontStyle: 'italic' }}>Guide</em>
        </h1>
        <p style={{ fontFamily: 'DM Sans', fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: 'oklch(45% 0.012 65)', margin: '0 0 48px' }}>
          A structured approach to building<br />your inversion practice
        </p>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(55% 0.012 65)', margin: 0 }}>
          ammar@ammarbass.com &nbsp;·&nbsp; @ammarbass
        </p>
      </div>
    </section>
  );
}

function SectionHeader({ number, title, subtitle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 8px' }}>
        {number}
      </p>
      <h2 style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400, fontSize: 'clamp(32px, 5vw, 48px)', margin: '0 0 12px', letterSpacing: '-0.01em', color: 'oklch(17% 0.015 55)', lineHeight: 1.1 }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontFamily: 'DM Sans', fontWeight: 300, fontSize: 16, color: 'oklch(45% 0.015 65)', margin: 0, lineHeight: 1.65 }}>{subtitle}</p>}
    </div>
  );
}

function Callout({ children }) {
  return (
    <div style={{ background: 'oklch(93% 0.018 78)', borderLeft: '3px solid oklch(72% 0.03 68)', padding: '20px 24px', borderRadius: '0 6px 6px 0', marginTop: 24 }}>
      <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.7, margin: 0, color: 'oklch(22% 0.015 55)' }}>{children}</p>
    </div>
  );
}

function SectionFoundation({ accent }) {
  const pillars = [
    { label: 'Endurance', desc: 'Build the capacity to hold positions long enough to apply technique. Without it, no other work is possible.' },
    { label: 'Alignment', desc: 'Refine position and joint structure once endurance is established. Each feeds the other.' },
    { label: 'Balance', desc: 'The natural outcome — not the starting point, but the result of endurance and alignment combined.' },
  ];
  return (
    <section data-screen-label="The Foundation" style={{ padding: '80px 0', borderBottom: '1px solid oklch(88% 0.018 78)', breakAfter: 'page' }}>
      <SectionHeader number="01" title="The Foundation" subtitle="Your handstand practice is built on three interconnected pillars that feed each other cyclically." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
        {pillars.map((p, i) => (
          <div key={i} style={{ background: 'oklch(99% 0.006 75)', border: '1px solid oklch(88% 0.018 78)', borderRadius: 8, padding: '28px 24px' }}>
            <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, margin: '0 0 10px', fontWeight: 500 }}>0{i + 1}</p>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontWeight: 400, margin: '0 0 10px', color: 'oklch(17% 0.015 55)' }}>{p.label}</h3>
            <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, lineHeight: 1.7, color: 'oklch(42% 0.012 65)', margin: 0, fontWeight: 300 }}>{p.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 400, margin: '0 0 10px', color: 'oklch(17% 0.015 55)' }}>Consistency Over Intensity</h4>
          <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.75, color: 'oklch(40% 0.012 65)', margin: 0, fontWeight: 300 }}>
            Daily, consistent practice outperforms occasional intensive sessions. Handstand progression is methodical — like learning a language, it requires regular, incremental exposure. There are no shortcuts.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 400, margin: '0 0 10px', color: 'oklch(17% 0.015 55)' }}>Your Timeline</h4>
          <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.75, color: 'oklch(40% 0.012 65)', margin: 0, fontWeight: 300 }}>
            Progress can come quickly or take longer — it depends on your history, your body, your consistency, and countless other factors. What matters is that all progressions are valid.
          </p>
        </div>
      </div>
      <div style={{ background: 'oklch(93% 0.018 78)', borderLeft: '3px solid oklch(72% 0.03 68)', padding: '20px 24px', borderRadius: '0 6px 6px 0', marginTop: 24 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.7, margin: 0, color: 'oklch(22% 0.015 55)' }}><strong>Start at the wall.</strong> Learn every fundamental position against the wall before attempting freestanding practice. This removes the balance variable and allows you to build the correct patterns without compensation.</p>
      </div>
    </section>
  );
}

function SectionFundamentals({ accent }) {
  const fundamentals = [
    {
      num: '01', name: 'Hands',
      key: 'Weight through centre of palm, push down through base knuckles of index and middle fingers.',
      detail: 'Fingers spread naturally — alive and responsive, making micro-adjustments for balance. Shoulder-width apart, index fingers pointing forward. Avoid weight falling back into the wrist: thumb side is bone-on-bone (stable), pinky side is cartilaginous (vulnerable).',
    },
    {
      num: '02', name: 'Gaze',
      key: '2cm behind the hands, looking through the centre line of the thumbs.',
      detail: 'Eyes fixed and not moving. Neck long and relaxed. Looking forward arches the back; looking through the hands causes a fall forward; moving the eyes causes loss of balance. The gaze anchors the entire system.',
    },
    {
      num: '03', name: 'Shoulders',
      key: 'Push to 80% from the serratus anterior — NOT from the deltoids.',
      detail: 'Elevate, then lock and hold. Shoulders long and away from ears. The push comes from the back of the shoulder blade (like using glutes in a squat, not quads). Upper traps engaged but not jamming into the neck.',
    },
    {
      num: '04', name: 'Chest Compression',
      key: 'Ribs pulled down and in. Chest drawn back. Slight upper back rounding.',
      detail: 'This creates axial extension — an elongated spine. Not flat, not arched. The rounding allows the scapula to sit properly on the ribcage. This is the same shoulder position as downward dog — use that pose to condition it.',
    },
    {
      num: '05', name: 'Core',
      key: 'Deep core firm (TVA, obliques). Front abs relatively soft. Abdomen does not move.',
      detail: 'Working the deeper layers: TVA, psoas, obliques — eccentric contraction, not crunching. Think of a finger trap: pull out while drawing in, everything locks. Balance lives here. A moving belly makes balance impossible.',
    },
    {
      num: '06', name: 'Breathing',
      key: 'Breathe into the chest while keeping the abdomen completely locked.',
      detail: 'Belly breathing shifts your centre of gravity — no balance is possible. The diaphragm pulls down and in. Breathe in through the nose, out through the mouth. You should be able to speak while holding a handstand.',
    },
    {
      num: '07', name: 'Hips & Toes',
      key: 'Always posterior pelvic tilt — tailbone tucked. Point from the base of the big toe.',
      detail: 'Never anterior tilt. Tuck the tailbone, pull up into the groin, engage the glutes. For the toe point: push the toe knuckle forward, calf engages, toe relaxes. Slight external rotation of the leg. Energy line runs from groin through midline of thigh through the big toe.',
    },
  ];

  return (
    <section data-screen-label="The 7 Fundamentals" style={{ padding: '80px 0', borderBottom: '1px solid oklch(88% 0.018 78)', breakAfter: 'page' }}>
      <SectionHeader number="02" title="The 7 Fundamentals" subtitle="Start from the hands and work your way to the toes. Learn these at the wall before attempting freestanding." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {fundamentals.map((f, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '72px 1fr',
            gap: '0 32px', padding: '28px 0',
            borderTop: '1px solid oklch(90% 0.015 78)',
          }}>
            <div>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 52, fontWeight: 300, color: 'oklch(88% 0.02 78)', margin: 0, lineHeight: 1 }}>{f.num}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 24, fontWeight: 400, margin: '0 0 6px', color: 'oklch(17% 0.015 55)', letterSpacing: '-0.01em' }}>
                {f.name}
              </h3>
              <p style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 500, color: accent, margin: '0 0 8px', lineHeight: 1.5 }}>
                {f.key}
              </p>
              <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, lineHeight: 1.75, color: 'oklch(42% 0.012 65)', margin: 0, fontWeight: 300 }}>
                {f.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Callout>
        A detailed breakdown of each fundamental — including specific drills, progressions, and corrections tailored to your body — is available through private coaching.
      </Callout>
    </section>
  );
}

function SectionMuscles({ accent }) {
  const stretch = [
    { name: 'Latissimus Dorsi', location: 'Large wing muscles on sides of back', note: 'Most commonly tight. Restricts overhead reach.' },
    { name: 'Pectoralis Major', location: 'Chest muscles', note: 'Pulls arm into internal rotation, restricts overhead range.' },
    { name: 'Teres Major', location: 'Back of shoulder / armpit area', note: 'Works with lats to restrict overhead motion.' },
    { name: 'Subscapularis', location: 'Underneath the shoulder blade', note: 'Part of the rotator cuff — very difficult to access directly.' },
  ];
  const pushers = [
    { name: 'Serratus Anterior', location: 'Wraps around ribs from shoulder blade', note: 'The most important muscle in handstand. This is where you push from — not the deltoids.' },
    { name: 'Rotator Cuff', location: 'Infraspinatus, Teres Minor, Supraspinatus', note: 'Fine stabilisers. Think of fingers gripping a gear stick — subtle but essential.' },
    { name: 'Trapezius', location: 'Upper, middle and lower portions', note: 'Upper traps elevate; lower traps pull the blade down and back for stability.' },
  ];
  const pullers = [
    { name: 'Rhomboids', location: 'Between spine and shoulder blades', note: 'Creates the opposing force that stabilises the shoulder during pushing. One pulling session per week is transformative.' },
  ];

  function MuscleRow({ m, dotColor }) {
    return (
      <div style={{ padding: '14px 0', borderTop: '1px solid oklch(90% 0.015 78)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
          <p style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 500, margin: 0, color: 'oklch(20% 0.015 55)' }}>{m.name}</p>
        </div>
        <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'oklch(55% 0.012 65)', margin: '0 0 3px 18px', fontWeight: 300 }}>{m.location}</p>
        <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'oklch(40% 0.012 65)', margin: '0 0 0 18px', lineHeight: 1.55, fontWeight: 300 }}>{m.note}</p>
      </div>
    );
  }

  function MovementPairCards({ pairs, note }) {
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {pairs.map((pair, pi) => (
            <div key={pi} style={{ border: '1px solid oklch(88% 0.018 78)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '10px 16px', background: 'oklch(93% 0.018 78)', borderBottom: '1px solid oklch(88% 0.018 78)' }}>
                <p style={{ fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'oklch(48% 0.012 65)', margin: 0 }}>{pair.label}</p>
              </div>
              {pair.moves.map((m, mi) => (
                <div key={mi} style={{
                  padding: '14px 16px',
                  background: m.goal ? `oklch(95% 0.03 38)` : 'oklch(99% 0.006 75)',
                  borderBottom: mi === 0 ? '1px solid oklch(90% 0.015 78)' : 'none',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                }}>
                  <div style={{
                    marginTop: 2, width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: m.goal ? accent : 'oklch(88% 0.02 78)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {m.goal && <span style={{ color: 'white', fontSize: 11, lineHeight: 1 }}>↑</span>}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, fontWeight: 500, margin: '0 0 3px', color: m.goal ? accent : 'oklch(42% 0.012 65)' }}>{m.name}</p>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 12, fontWeight: 300, margin: '0 0 2px', color: 'oklch(42% 0.012 65)' }}>{m.action}</p>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 11.5, fontWeight: 300, margin: 0, color: 'oklch(58% 0.012 65)' }}>{m.muscle}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {note && <p style={{ fontFamily: 'DM Sans', fontSize: 12.5, fontWeight: 300, color: 'oklch(50% 0.012 65)', margin: '12px 0 0', lineHeight: 1.6 }}>{note}</p>}
      </div>
    );
  }

  return (
    <section data-screen-label="Key Muscles" style={{ padding: '80px 0', borderBottom: '1px solid oklch(88% 0.018 78)', breakAfter: 'page' }}>
      <SectionHeader number="03" title="Key Muscles & Movements" subtitle="Understanding which muscles to release and which to develop is the foundation of intelligent practice." />

      {/* Stretch vs Develop */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
        <div>
          <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 4px', fontWeight: 500 }}>
            If Shoulders Are Tight — Stretch
          </p>
          <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'oklch(55% 0.012 65)', margin: '0 0 8px', fontWeight: 300 }}>These internally rotate the shoulder and restrict overhead range.</p>
          {stretch.map((m, i) => <MuscleRow key={i} m={m} dotColor="oklch(52% 0.07 148)" />)}
        </div>
        <div>
          <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, margin: '0 0 4px', fontWeight: 500 }}>
            If Unstable — Develop These
          </p>
          <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'oklch(55% 0.012 65)', margin: '0 0 8px', fontWeight: 300 }}>Pushers and pullers working in balance create a stable shoulder.</p>
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: 'DM Sans', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, margin: '12px 0 0', padding: '6px 0 0', borderTop: '1px solid oklch(90% 0.015 78)' }}>Pushers</p>
            {pushers.map((m, i) => <MuscleRow key={i} m={m} dotColor={accent} />)}
          </div>
          <div>
            <p style={{ fontFamily: 'DM Sans', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'oklch(52% 0.07 148)', margin: '12px 0 0', padding: '6px 0 0', borderTop: '1px solid oklch(90% 0.015 78)' }}>Pullers</p>
            {pullers.map((m, i) => <MuscleRow key={i} m={m} dotColor="oklch(52% 0.07 148)" />)}
          </div>
        </div>
      </div>

      {/* Joint Stacking */}
      <div style={{ background: 'oklch(93% 0.018 78)', borderRadius: 8, padding: '24px 28px', marginBottom: 40 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(55% 0.012 65)', margin: '0 0 10px', fontWeight: 500 }}>Joint Stacking — Why Alignment Matters</p>
        <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.75, color: 'oklch(28% 0.015 55)', margin: '0 0 12px', fontWeight: 300 }}>
          Properly aligned joints require significantly less muscular effort to maintain. Shoulder stacked over elbow, elbow over wrist, wrist over the centre of the palm — this is joint stacking. When joints are misaligned, muscles must work harder to compensate, leading to faster fatigue and greater injury risk.
        </p>
        <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, color: 'oklch(45% 0.012 65)', margin: 0, fontWeight: 300, fontStyle: 'italic' }}>
          Think of it like standing upright vs. leaning at an angle — one requires almost no effort, the other is exhausting to maintain.
        </p>
      </div>

      {/* Scapular movements */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 16px', fontWeight: 500 }}>
          Scapular Movements — Quick Reference
        </p>
        <MovementPairCards
          pairs={[
            { label: 'Pair 1 — Forward / Back', moves: [
              { name: 'Protraction', action: 'Reaching forward', muscle: 'Serratus Anterior', goal: true },
              { name: 'Retraction', action: 'Squeeze blades together', muscle: 'Rhomboids, Mid Traps', goal: false },
            ]},
            { label: 'Pair 2 — Up / Down', moves: [
              { name: 'Elevation', action: 'Lift shoulders up', muscle: 'Upper Trapezius', goal: true },
              { name: 'Depression', action: 'Pull shoulders down', muscle: 'Lower Trapezius', goal: false },
            ]},
          ]}
          note={<>In handstand you <strong style={{ fontWeight: 500, color: 'oklch(30% 0.015 55)' }}>protract and elevate</strong> — reaching forward and long. Retraction and depression provide the counter-tension that stabilises the whole structure.</>}
        />
      </div>

      {/* Humeral movements */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 16px', fontWeight: 500 }}>
          Humeral Movements — Quick Reference
        </p>
        <MovementPairCards
          pairs={[
            { label: 'Pair 1 — Rotation', moves: [
              { name: 'External Rotation', action: 'Turn arm outward', muscle: 'Infraspinatus, Teres Minor', goal: true },
              { name: 'Internal Rotation', action: 'Turn arm inward', muscle: 'Lats, Pec Major, Subscapularis', goal: false },
            ]},
            { label: 'Pair 2 — Plane of Motion', moves: [
              { name: 'Flexion', action: 'Arm overhead (180°)', muscle: 'Anterior Deltoid, Biceps', goal: true },
              { name: 'Extension', action: 'Arm behind body', muscle: 'Posterior Deltoid, Lats', goal: false },
            ]},
          ]}
          note={<>In handstand you need <strong style={{ fontWeight: 500, color: 'oklch(30% 0.015 55)' }}>full flexion (180°) with external rotation</strong>. Tight internal rotators (lats, pecs) limit flexion and force compensations like the arched back.</>}
        />
      </div>

      {/* Muscle quick reference table */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 16px', fontWeight: 500 }}>
          Muscle Quick Reference
        </p>
        <div style={{ border: '1px solid oklch(88% 0.018 78)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'oklch(93% 0.018 78)', padding: '10px 16px', borderBottom: '1px solid oklch(88% 0.018 78)' }}>
            {['Muscle', 'Primary Role', 'In Handstand'].map(h => (
              <p key={h} style={{ fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'oklch(45% 0.012 65)', margin: 0 }}>{h}</p>
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
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '11px 16px',
              background: highlight ? `oklch(95% 0.03 38)` : i % 2 === 0 ? 'oklch(99% 0.006 75)' : 'oklch(97% 0.012 78)',
              borderBottom: i < arr.length - 1 ? '1px solid oklch(91% 0.015 78)' : 'none',
            }}>
              <p style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: highlight ? 500 : 400, margin: 0, color: highlight ? accent : 'oklch(22% 0.015 55)' }}>{muscle}</p>
              <p style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: 300, margin: 0, color: 'oklch(42% 0.012 65)' }}>{role}</p>
              <p style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: highlight ? 500 : 300, margin: 0, color: highlight ? accent : 'oklch(42% 0.012 65)' }}>{hs}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Self-assessment */}
      <div>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 16px', fontWeight: 500 }}>
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
            <div key={i} style={{ background: 'oklch(99% 0.006 75)', border: '1px solid oklch(88% 0.018 78)', borderRadius: 6, padding: '14px 16px' }}>
              <p style={{ fontFamily: 'DM Sans', fontSize: 12.5, margin: '0 0 5px', color: 'oklch(25% 0.015 55)', lineHeight: 1.5 }}>{q}</p>
              <p style={{ fontFamily: 'DM Sans', fontSize: 12, margin: 0, color: accent, fontWeight: 500, lineHeight: 1.4 }}>→ {a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function SectionBlueprint({ accent }) {
  const daily = [
    { time: '5–10 min', phase: 'Warm-Up', desc: 'Wrists, shoulders, thoracic spine. Hamstring stretches. Activate serratus anterior.' },
    { time: '15–20 min', phase: 'Wall Work', desc: 'Fundamental positions, holds, drills. Build endurance and refine alignment.' },
    { time: '10–15 min', phase: 'Strength & Conditioning', desc: 'Targeted exercises for weak areas. Pulling work, core conditioning, straight-arm holds.' },
    { time: '5 min', phase: 'Cool-Down', desc: 'Stretch lats and pecs. Nerve flossing if tingling is present.' },
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
    <section data-screen-label="Practice Blueprint" style={{ padding: '80px 0', borderBottom: '1px solid oklch(88% 0.018 78)', breakAfter: 'page' }}>
      <SectionHeader number="04" title="Your Practice Blueprint" subtitle="A general framework. Individual programming creates significantly faster, safer progress." />

      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 20px', fontWeight: 500 }}>
          Daily Structure — 30 to 45 Minutes
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {daily.map((d, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '100px 1fr',
              gap: '0 24px', padding: '20px 0',
              borderTop: '1px solid oklch(90% 0.015 78)',
            }}>
              <div>
                <p style={{ fontFamily: 'DM Sans', fontSize: 11, color: accent, margin: '0 0 4px', fontWeight: 500, letterSpacing: '0.05em' }}>{d.time}</p>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, fontWeight: 400, margin: 0, color: 'oklch(17% 0.015 55)' }}>{d.phase}</p>
              </div>
              <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, lineHeight: 1.7, color: 'oklch(42% 0.012 65)', margin: 'auto 0', fontWeight: 300 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>


      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(60% 0.015 65)', margin: '0 0 16px', fontWeight: 500 }}>Common Pitfalls</p>
        {pitfalls.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid oklch(90% 0.015 78)', alignItems: 'flex-start' }}>
            <span style={{ color: 'oklch(62% 0.03 68)', fontSize: 14, flexShrink: 0, marginTop: 1 }}>×</span>
            <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, lineHeight: 1.6, color: 'oklch(40% 0.012 65)', margin: 0, fontWeight: 300 }}>{p}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'oklch(93% 0.018 78)', borderRadius: 8, padding: '28px 32px' }}>
        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontStyle: 'italic', fontWeight: 400, color: 'oklch(17% 0.015 55)', margin: '0 0 8px', lineHeight: 1.4 }}>
          "If you can't hold yourself up, I can give you all the technique in the world — you cannot apply it."
        </p>
        <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'oklch(55% 0.012 65)', margin: 0, fontWeight: 300 }}>Build the time window first. Technique follows endurance.</p>
      </div>
    </section>
  );
}

function SectionCoaching({ accent }) {
  return (
    <section data-screen-label="Private Coaching" style={{ padding: '80px 0', breakBefore: 'page' }}>
      <div style={{ borderTop: `2px solid ${accent}`, paddingTop: 48, marginBottom: 48 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, margin: '0 0 20px', fontWeight: 500 }}>
          05 · Private Coaching
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 50px)', margin: '0 0 20px', lineHeight: 1.1, color: 'oklch(17% 0.015 55)', letterSpacing: '-0.01em' }}>
              Every body is different.<br /><em style={{ fontStyle: 'italic' }}>Your practice<br />should be too.</em>
            </h2>
            <p style={{ fontFamily: 'DM Sans', fontWeight: 300, fontSize: 14.5, lineHeight: 1.8, color: 'oklch(42% 0.012 65)', margin: 0 }}>
              This guide gives you the framework. Private coaching identifies exactly what your body needs — your specific restrictions, strengths, and movement history — and creates a targeted plan built around you.
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
              <div key={i} style={{ background: 'oklch(93% 0.018 78)', borderRadius: 8, padding: '24px 24px' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 400, margin: '0 0 10px', color: 'oklch(17% 0.015 55)' }}>{o.title}</h3>
                <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, lineHeight: 1.7, color: 'oklch(42% 0.012 65)', margin: 0, fontWeight: 300 }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: `oklch(95% 0.03 ${accent.match(/\d+(?=%)/)?.[0] || 38})`, borderRadius: 10, padding: '32px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 400, margin: '0 0 4px', color: 'oklch(17% 0.015 55)' }}>Ready to go deeper?</p>
          <p style={{ fontFamily: 'DM Sans', fontSize: 13.5, color: 'oklch(42% 0.012 65)', margin: 0, fontWeight: 300 }}>Get in touch to discuss how private coaching can accelerate your progress.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <a href="mailto:ammar@ammarbass.com" style={{ fontFamily: 'DM Sans', fontSize: 14, color: accent, textDecoration: 'none', fontWeight: 500 }}>ammar@ammarbass.com</a>
          <a href="https://www.ammarbass.com" target="_blank" rel="noreferrer" style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'oklch(50% 0.012 65)', textDecoration: 'none', fontWeight: 300 }}>ammarbass.com · @ammarbass</a>
        </div>
      </div>
    </section>
  );
}

// Export all to window for use in main file
Object.assign(window, { Cover, SectionFoundation, SectionFundamentals, SectionMuscles, SectionBlueprint, SectionCoaching });
