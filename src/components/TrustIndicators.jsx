export default function TrustIndicators() {
  return (
    <section className="bg-[#1C1410] px-8 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-light text-[#C9A878] mb-2">
              10+
            </p>
            <p className="text-[13px] uppercase tracking-wide text-white/60">
              Years Teaching
            </p>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-light text-[#C9A878] mb-2">
              500+
            </p>
            <p className="text-[13px] uppercase tracking-wide text-white/60">
              Students Trained
            </p>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-light text-[#C9A878] mb-2">
              200hr
            </p>
            <p className="text-[13px] uppercase tracking-wide text-white/60">
              Certified RYT
            </p>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-light text-[#C9A878] mb-2">
              2
            </p>
            <p className="text-[13px] uppercase tracking-wide text-white/60">
              Premier Studios
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
