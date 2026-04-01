export default function Achievements() {
  const achievements = [
    {
      metric: "First Handstand",
      description: "Students achieving unassisted handstands within 12 weeks"
    },
    {
      metric: "Arm Balances",
      description: "From crow pose to flying pigeon and side crow progressions"
    },
    {
      metric: "Injury Recovery",
      description: "Returning to full practice after chronic pain or injuries"
    },
    {
      metric: "Competition Prep",
      description: "Athletes improving flexibility and recovery for their sport"
    }
  ];

  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            Results
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            What my students achieve
          </h2>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Structured training delivers measurable progress. Here's what students commonly work towards in private sessions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-[#EAE0CF] border border-[#C9B99A] rounded-md p-6 text-center hover:border-[#785E3D] transition-colors"
            >
              <h3 className="text-xl font-light text-[#1C1410] mb-3">
                {achievement.metric}
              </h3>
              <p className="text-sm text-[#6B5740] leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
