export default function StudioPartners() {
  const studios = [
    {
      name: "BXR London",
      role: "Resident Yoga Instructor",
      description: "Teaching strength-based vinyasa at London's premier boxing and fitness club"
    },
    {
      name: "Flo Yoga",
      role: "Lead Teacher",
      description: "Alignment-focused classes and arm balance workshops in Clapham"
    }
  ];

  return (
    <section className="bg-[#EAE0CF] px-8 md:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            Where I Teach
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410]">
            Teaching at London's Premier Studios
          </h2>
        </div>

        {/* Studios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studios.map((studio, index) => (
            <div
              key={index}
              className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-8 text-center"
            >
              <h3 className="text-2xl font-light text-[#1C1410] mb-2">
                {studio.name}
              </h3>
              <p className="text-sm uppercase tracking-wide text-[#785E3D] mb-4">
                {studio.role}
              </p>
              <p className="text-[15px] text-[#6B5740] leading-relaxed">
                {studio.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
