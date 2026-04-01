import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Classes() {
  const classTypes = [
    {
      name: "Vinyasa Flow",
      studios: ["BXR London", "Flo Yoga"],
      duration: "60 minutes",
      level: "Intermediate to Advanced",
      description: "Dynamic, flowing sequences linking breath with movement. Expect sun salutations, standing sequences, and time dedicated to arm balances and inversions. The pace is steady but not rushed — there's space to understand alignment while keeping the heat up.",
      whatToExpect: [
        "15 min warm-up with breath work and mobilization",
        "30 min flowing sequences with standing poses",
        "10 min arm balance or inversion work",
        "5 min cool down and savasana"
      ],
      whoItsFor: "You're comfortable with chaturanga, can hold plank for 45+ seconds, and want to work towards more advanced poses."
    },
    {
      name: "Strength & Inversions",
      studios: ["BXR London"],
      duration: "75 minutes",
      level: "Advanced",
      description: "This is where we spend serious time on handstands, forearm stands, and complex arm balances. Longer holds, detailed breakdowns, and progressions you won't find in a regular class. Strength-focused with purpose — every drill builds towards something specific.",
      whatToExpect: [
        "20 min conditioning and mobility prep",
        "40 min inversion drills and progressions",
        "10 min arm balance variations",
        "5 min cool down"
      ],
      whoItsFor: "You can hold crow pose for 10+ seconds and are ready to commit to the process of learning handstands and forearm balances."
    },
    {
      name: "Alignment & Technique",
      studios: ["Flo Yoga"],
      duration: "60 minutes",
      level: "All Levels (with experience)",
      description: "Slower-paced but no less challenging. Focus on precise alignment, understanding biomechanics, and building the foundations that allow you to progress safely. Expect detailed cues, time to find correct positioning, and strengthening work that targets weaknesses.",
      whatToExpect: [
        "10 min grounding and breath awareness",
        "35 min alignment-focused standing and balancing poses",
        "10 min core and hip strengthening",
        "5 min guided savasana"
      ],
      whoItsFor: "You want to understand the mechanics behind poses, refine your technique, or rebuild after injury."
    }
  ];

  const whatToBring = [
    {
      title: "Mat",
      desc: "Studios provide these, but bring your own if you prefer."
    },
    {
      title: "Water",
      desc: "You'll be working. Stay hydrated."
    },
    {
      title: "Towel",
      desc: "Optional but useful if you sweat easily."
    },
    {
      title: "Open mind",
      desc: "Expect to be challenged. That's the point."
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Yoga Classes London | Ammar Bass | Vinyasa, Strength & Inversions</title>
        <meta name="description" content="Vinyasa flow, strength & inversions, and alignment-focused yoga classes in London. Teaching at BXR and Flo Yoga. Intermediate to advanced levels. Strong, structured practice." />
        <meta name="keywords" content="yoga classes London, vinyasa classes, inversion classes, handstand classes, arm balance yoga, strength yoga London, BXR yoga, Flo Yoga classes" />

        {/* Open Graph */}
        <meta property="og:title" content="Yoga Classes London | Ammar Bass" />
        <meta property="og:description" content="Vinyasa flow, strength & inversions, and alignment classes at BXR and Flo Yoga in London." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/classes" />
        <meta property="og:image" content="https://ammarbass.com/images/about.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yoga Classes London | Ammar Bass" />
        <meta name="twitter:description" content="Strong, structured yoga classes in London. Vinyasa, inversions, and alignment-focused training." />
        <meta name="twitter:image" content="https://ammarbass.com/images/about.webp" />

        <link rel="canonical" href="https://ammarbass.com/classes" />
      </Helmet>

      <Nav theme="light" />

      {/* Hero Section */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
            Class Types
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            What to expect in my classes
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Strong, structured practice designed to build real capacity. Every class has intention — you're here to progress, not just move.
          </p>
        </div>
      </section>

      {/* Class Types */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {classTypes.map((classType, index) => (
            <div
              key={index}
              className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-8 md:p-10"
            >
              {/* Header */}
              <div className="mb-6 pb-6 border-b border-[#C9B99A]">
                <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-3">
                  {classType.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-[#6B5740]">
                  <span className="flex items-center gap-2">
                    <span className="text-[#785E3D]">●</span>
                    {classType.studios.join(', ')}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[#785E3D]">●</span>
                    {classType.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[#785E3D]">●</span>
                    {classType.level}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[15px] leading-relaxed text-[#6B5740] mb-8">
                {classType.description}
              </p>

              {/* What to Expect */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-[#1C1410] mb-4">
                  Typical Structure:
                </h3>
                <ul className="space-y-2">
                  {classType.whatToExpect.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[15px] text-[#6B5740]">
                      <span className="text-[#785E3D] mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who It's For */}
              <div className="bg-[#EAE0CF] border border-[#C9B99A] rounded-md p-6">
                <h3 className="text-sm uppercase tracking-wide text-[#785E3D] mb-2">
                  Who this is for:
                </h3>
                <p className="text-[15px] text-[#6B5740]">
                  {classType.whoItsFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to Bring */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
              What to bring
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToBring.map((item, index) => (
              <div
                key={index}
                className="bg-[#EAE0CF] border border-[#C9B99A] rounded-md p-6 text-center"
              >
                <h3 className="text-xl font-light text-[#1C1410] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B5740]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Etiquette */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
              A few things to know
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-6">
              <h3 className="text-lg font-medium text-[#1C1410] mb-2">
                Arrive 5 minutes early
              </h3>
              <p className="text-[15px] text-[#6B5740]">
                Give yourself time to settle in. Late arrivals disrupt the class and you miss the warm-up, which matters.
              </p>
            </div>

            <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-6">
              <h3 className="text-lg font-medium text-[#1C1410] mb-2">
                Tell me about injuries
              </h3>
              <p className="text-[15px] text-[#6B5740]">
                Before class starts, let me know if you're dealing with anything. I'll give you modifications. Don't tough it out — that's how small issues become big ones.
              </p>
            </div>

            <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-6">
              <h3 className="text-lg font-medium text-[#1C1410] mb-2">
                Take modifications when needed
              </h3>
              <p className="text-[15px] text-[#6B5740]">
                There's no prize for forcing your way through. Use the progressions and modifications — that's how you build properly.
              </p>
            </div>

            <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-6">
              <h3 className="text-lg font-medium text-[#1C1410] mb-2">
                Stay for savasana
              </h3>
              <p className="text-[15px] text-[#6B5740]">
                It's not optional. You've just worked hard — give your nervous system time to integrate. Rushing out defeats the purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-8">
            Ready to train?
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
              Book Private Session
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
