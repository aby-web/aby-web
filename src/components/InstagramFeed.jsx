import { useEffect } from 'react';

export default function InstagramFeed() {
  useEffect(() => {
    // Load Behold widget script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://w.behold.so/widget.js';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        {/* CTA Button */}
        <div className="text-center mb-8">
          <a
            href="https://www.instagram.com/ammarbass"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 rounded-full bg-transparent border border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6] transition-colors text-xs uppercase tracking-wide"
          >
            Follow on Instagram
          </a>
        </div>

        {/* Instagram Feed */}
        <div className="w-full mb-6">
          <behold-widget feed-id="igJ41xmtcsA0FYlR8XAQ"></behold-widget>
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-sm text-[#6B5740] max-w-2xl mx-auto">
            Movement, practice, and training insights from classes and sessions.
          </p>
        </div>
      </div>
    </section>
  );
}
