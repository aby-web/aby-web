export default function PrivateSessionsTeaser() {
  const points = [
    { label: '01 / Assessment', text: 'We start by understanding where you are, what you want, and what is holding you back.' },
    { label: '02 / Progression', text: 'Every session is built around your goals — handstands, arm balances, strength or flexibility.' },
    { label: '03 / Results', text: 'Structured, progressive training that actually moves you forward — not just a good class, a plan.' },
  ];

  return (
    <section className="bg-[#EAE0CF] px-8 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img
              src="/images/homestudio1.webp"
              alt="Private home studio — West Hampstead"
              className="w-full h-[420px] object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">One to one</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-6 leading-tight">
              Private sessions in my home studio
            </h2>
            <p className="text-[15px] text-[#6B5740] leading-relaxed mb-8">
              One-to-one sessions for students who want focused, progressive guidance — in a quiet, dedicated space in West Hampstead. No distractions, no drop-ins.
            </p>
            <a
              href="/private-sessions"
              className="inline-block px-7 py-3 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide"
            >
              Book a Private Session
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#C9B99A] pt-12">
          {points.map((p) => (
            <div key={p.label}>
              <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-4">{p.label}</p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
