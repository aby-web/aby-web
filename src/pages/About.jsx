import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen">
      <Nav theme="light" />

      {/* Hero Section */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
            The practice requires effort.
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="space-y-6">
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                I specialise in alignment, arm balances and inversions with a focus on building strength through intelligent practice. My teaching is grounded through Vipassana meditation — emphasising observation of both mind and body, creating classes that are calm and present while challenging you physically and mentally.
              </p>
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                With a background in competitive swimming and powerlifting, I bring an athlete's understanding of movement progression. My interest in biomechanics means I weave anatomy and science into my teaching in accessible ways — helping you understand the why behind each cue, not just the what.
              </p>
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                I see abilities in people beyond what they perceive in themselves. I will consistently encourage you to move outside your comfort zone, safely.
              </p>
              <p className="text-[15px] font-light leading-loose text-[#6B5740]">
                Of Indian descent and raised in Hong Kong, I have spent time at Sivananda Kutir in the Himalayas. My classes blend technical precision with meditative depth — expect to work hard whilst staying grounded.
              </p>
            </div>

            {/* Photo */}
            <div className="h-[500px] bg-[#EAE0CF] border border-[#C9B99A] rounded-md overflow-hidden">
              <img
                src="/images/about.webp"
                alt="Ammar Bass"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-8">
            Ready to start?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#schedule"
              className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide"
            >
              View Schedule
            </a>
            <a
              href="/private-sessions"
              className="inline-block px-8 py-4 rounded-full bg-transparent border-2 border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6] transition-colors text-sm uppercase tracking-wide"
            >
              Work with me privately
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
