// Shared components used across guide sections

export function SectionHeader({ number, title, subtitle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'oklch(60% 0.015 65)',
          margin: '0 0 8px',
        }}
      >
        {number}
      </p>
      <h2
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 400,
          fontSize: 'clamp(32px, 5vw, 48px)',
          margin: '0 0 12px',
          letterSpacing: '-0.01em',
          color: 'oklch(17% 0.015 55)',
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: 16,
            color: 'oklch(45% 0.015 65)',
            margin: 0,
            lineHeight: 1.65,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Callout({ children }) {
  return (
    <div
      style={{
        background: 'oklch(93% 0.018 78)',
        borderLeft: '3px solid oklch(72% 0.03 68)',
        padding: '20px 24px',
        borderRadius: '0 6px 6px 0',
        marginTop: 24,
      }}
    >
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 14,
          lineHeight: 1.7,
          margin: 0,
          color: 'oklch(22% 0.015 55)',
        }}
      >
        {children}
      </p>
    </div>
  );
}
