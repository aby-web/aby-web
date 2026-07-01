const accent = 'oklch(56% 0.1 38)';

export default function SectionCoaching() {
  return (
    <section style={{ padding: '72px 0 88px', breakBefore: 'page' }}>
      <div
        style={{
          borderTop: '1px solid oklch(88% 0.018 78)',
          paddingTop: 40,
          maxWidth: 560,
        }}
      >
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 15,
            lineHeight: 1.8,
            color: 'oklch(40% 0.012 65)',
            margin: '0 0 16px',
            fontWeight: 300,
          }}
        >
          This guide is the framework. Everyone's limiter is different — usually just one or two things — and the
          fastest way to find yours is a trained eye on your practice.
        </p>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            lineHeight: 1.7,
            color: 'oklch(50% 0.012 65)',
            margin: 0,
            fontWeight: 300,
          }}
        >
          If you'd like that, I offer private coaching —{' '}
          <a
            href="mailto:ammar@ammarbass.com"
            style={{ color: accent, textDecoration: 'none', fontWeight: 500 }}
          >
            get in touch
          </a>
          .
        </p>
      </div>
    </section>
  );
}
