export default function Credentials() {
  const credentials = [
    {
      title: "200hr Yoga Teacher Training",
      organization: "Registered Yoga Teacher (RYT-200)",
      description: "Advanced vinyasa and alignment-based training"
    },
    {
      title: "Vipassana Meditation",
      organization: "Sivananda Kutir, Himalayas",
      description: "10-day silent retreat and intensive practice"
    },
    {
      title: "Competitive Swimming",
      organization: "Hong Kong Regional Team",
      description: "National-level competition experience"
    },
    {
      title: "Powerlifting & Strength Training",
      organization: "Certified Coach",
      description: "Biomechanics and progressive overload methodology"
    }
  ];

  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            Experience & Training
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
            Credentials
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {credentials.map((credential, index) => (
            <div
              key={index}
              className="bg-[#EAE0CF] border border-[#C9B99A] rounded-md p-6 hover:border-[#785E3D] transition-colors"
            >
              <h3 className="text-xl font-light text-[#1C1410] mb-2">
                {credential.title}
              </h3>
              <p className="text-sm uppercase tracking-wide text-[#785E3D] mb-3">
                {credential.organization}
              </p>
              <p className="text-[15px] text-[#6B5740] leading-relaxed">
                {credential.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
