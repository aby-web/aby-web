export default function USPStrip() {
  const uspItems = [
    { label: 'Specialisation', value: 'Handstands & arm balances' },
    { label: 'Approach', value: 'Strength-first, technically precise' },
    { label: 'Teaching at', value: 'Indaba · Flo · Triyoga · BXR' },
  ];

  return (
    <section className="bg-[#EAE0CF] border-t border-b border-[#C9B99A]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {uspItems.map((item, index) => (
          <div
            key={index}
            className={`px-8 md:px-10 py-7 text-center ${
              index < uspItems.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#C9B99A]' : ''
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9C7F5C] mb-2">
              {item.label}
            </p>
            <p className="text-xl font-normal text-[#1C1410]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
