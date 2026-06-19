import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Bootcamp() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Yoga Intensive Bootcamp — Bulgaria 2026 | Ammar Bass</title>
        <meta name="description" content="5-day yoga intensive bootcamp in Varna, Bulgaria. 4–9 September 2026. Forest setting, minutes from the beach. Progressive flow, workshops, and immersive practice with Ammar Bass and Ina." />
        <link rel="canonical" href="https://ammarbass.com/bootcamp" />
      </Helmet>

      <Nav theme="dark" />

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[480px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/d.jpeg"
          alt="Bulgaria sunset beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Fallback: swap to /images/retreat-beach.jpg if sunset colours don't work */}
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-8 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6">
            September 4–9, 2026 &nbsp;·&nbsp; Varna, Bulgaria
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-white leading-tight mb-6">
            Yoga Intensive Bootcamp
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Five days of practice in a forest, minutes from some of Bulgaria's most beautiful beaches. Immersive, progressive, and intentional — with a small group of people who love to practice.
          </p>
          <a
            href="mailto:ammar@ammarbass.com"
            className="inline-block px-8 py-4 bg-white text-[#1C1410] rounded-full hover:bg-[#EAE0CF] transition-colors text-sm uppercase tracking-wide"
          >
            Secure your spot
          </a>
        </div>
      </section>

      {/* Pricing banner */}
      <section className="bg-[#785E3D] px-8 md:px-12 py-5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F4EFE6] text-sm tracking-wide">
            Early pricing available until <strong>15 July 2026</strong> — spaces limited to 12
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3 text-center">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-10 text-center">What's included</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Double Room */}
            <div className="bg-white border border-[#C9B99A] rounded-lg p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-2">Double Room</p>
              <p className="text-4xl font-light text-[#1C1410] mb-1">£890</p>
              <p className="text-sm text-[#6B5740]">Sharing a room with one other person. You can choose who, or be paired with someone new.</p>
            </div>

            {/* Single Room */}
            <div className="bg-white border border-[#C9B99A] rounded-lg p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-2">Single Room</p>
              <p className="text-4xl font-light text-[#1C1410] mb-1">£1,090</p>
              <p className="text-sm text-[#6B5740]">Your own private room for the duration of the retreat.</p>
            </div>
          </div>

          {/* What's included */}
          <div className="bg-[#EAE0CF] rounded-lg p-8 mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">Included</p>
            <ul className="space-y-3">
              {[
                '5 hours of yoga and workshops daily',
                '5 nights at Blue Summer Eco Houses',
                'All meals — breakfast, lunch, dinner, and one coffee',
                'Transfer to and from Varna airport',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#6B5740] text-sm">
                  <span className="text-[#785E3D] mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#EAE0CF] rounded-lg p-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">Not included</p>
            <ul className="space-y-3">
              {[
                'Flights — direct Wizz Air from Luton to Varna costs £150–£250',
                'Additional food and drinks from the restaurant',
                'Alcohol is not permitted during the stay',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#6B5740] text-sm">
                  <span className="text-[#785E3D] mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <img
              src="/images/retreat-cabin.jpg"
              alt="Accommodation at Blue Summer Eco Houses"
              className="w-full rounded-lg object-cover h-56"
            />
            <img
              src="/images/retreat-forest.jpg"
              alt="Forest dining area"
              className="w-full rounded-lg object-cover h-56"
            />
          </div>

          <p className="text-xs text-[#C9B99A] mt-4 text-center">
            A £200 non-refundable deposit is required to secure your spot.
          </p>
        </div>
      </section>

      {/* What's the plan */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">The programme</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8">What's the plan?</h2>

          <p className="text-[#6B5740] mb-8 leading-relaxed">
            Each day includes 5 hours of yoga — a morning practice, a focused workshop, and an evening practice. The structure stays flexible, adapting to the group's energy and needs, but the goal is a well-rounded, immersive experience.
          </p>

          <img
            src="/images/b.jpeg"
            alt="Yoga practice on podium"
            className="w-full rounded-lg object-cover h-64 md:h-80 mb-8"
            style={{ objectPosition: 'center bottom' }}
          />

          <div className="space-y-6">
            <div className="border-t border-[#C9B99A] pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-2">Progressive flow</p>
              <p className="text-[#6B5740] text-sm leading-relaxed">We build a base vinyasa sequence across the week, adding transitions, variations, and new layers as we go.</p>
            </div>
            <div className="border-t border-[#C9B99A] pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-2">Workshops</p>
              <p className="text-[#6B5740] text-sm leading-relaxed">Focused on key areas: inversions, arm balances, binds, backbends, and splits — with mobility training and techniques to help you explore poses safely and with confidence.</p>
            </div>
            <div className="border-t border-[#C9B99A] pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-2">Beyond the physical</p>
              <p className="text-[#6B5740] text-sm leading-relaxed">Philosophy, breathwork, meditation, partner work, and Thai massage woven throughout the week.</p>
            </div>
            <div className="border-t border-[#C9B99A] pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-2">Free time</p>
              <p className="text-[#6B5740] text-sm leading-relaxed">Beaches at Chernomorets and Pasha Dere, forest hikes, and time to connect with the group.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">Who is it for?</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">This is an intensive, not a holiday</h2>
          <p className="text-[#6B5740] leading-relaxed mb-6">
            This bootcamp is open to those who practice with us regularly. It's an intensive yoga program designed to deepen your practice — not a retreat for beginners. You'll gain new skills and tools, approach challenging poses with confidence, and connect with yoga beyond just the physical.
          </p>
          <p className="text-[#6B5740] leading-relaxed mb-8">
            That said, it's not all hard work. There's time to relax, connect with others, and enjoy the setting.
          </p>
          <img
            src="/images/retreat-practice.jpg"
            alt="Group yoga practice"
            className="w-full rounded-lg object-cover h-64 md:h-80"
          />
        </div>
      </section>

      {/* Weather & Flights */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">Practical info</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-10">Getting there</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">Weather</p>
              <p className="text-[#6B5740] text-sm leading-relaxed">Early September in Varna: 23–25°C days, 15–18°C evenings. Sea temperature around 22–23°C. Minimal rainfall and clear skies.</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">Flights</p>
              <p className="text-[#6B5740] text-sm leading-relaxed">Direct Wizz Air from Luton to Varna. Outbound 8:25am Sep 4, inbound 5:55am Sep 9. Airport transfers included.</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">Yoga mat</p>
              <p className="text-[#6B5740] text-sm leading-relaxed">Bring a full-size grippy mat. Mats can go in checked luggage or as carry-on with priority boarding and 2 cabin bags.</p>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/TZUXHb9K1W3rhCg87"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-10 group"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/c.jpeg"
                alt="Blue Summer Eco Houses location"
                className="w-full object-cover h-56 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="bg-white/90 text-[#1C1410] text-xs uppercase tracking-widest px-4 py-2 rounded-full">View on Google Maps</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Teachers */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">Who's teaching</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-10">Your teachers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <img
                src="/images/ammar.jpg"
                alt="Ammar Bass"
                className="w-full h-72 object-cover object-top rounded-lg mb-5"
              />
              <p className="text-lg font-light text-[#1C1410] mb-1">Ammar Bass</p>
              <p className="text-sm text-[#785E3D] mb-3">@ammarbass</p>
              <p className="text-sm text-[#6B5740] leading-relaxed mb-3">
                London-based yoga teacher specialising in strength, inversions, and arm balances.
              </p>
              <a href="https://www.ammarbass.com" className="text-sm text-[#785E3D] underline">ammarbass.com</a>
            </div>
            <div>
              <img
                src="/images/ina.jpg"
                alt="Ina Yordanova"
                className="w-full h-72 object-cover object-top rounded-lg mb-5"
              />
              <p className="text-lg font-light text-[#1C1410] mb-1">Ina Yordanova</p>
              <p className="text-sm text-[#785E3D] mb-3">@inayo.ga</p>
              <p className="text-sm text-[#6B5740] leading-relaxed mb-3">
                Yoga teacher and movement specialist based in London.
              </p>
              <a href="https://www.inayoga.co.uk" className="text-sm text-[#785E3D] underline">inayoga.co.uk</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img
          src="/images/a.jpeg"
          alt="Bulgaria beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-8 md:px-12 py-24 max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/80 mb-4">Limited to 12 spaces</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Ready to join?</h2>
          <p className="text-white mb-10">
            Get in touch to ask questions or secure your spot with a £200 deposit.
          </p>
          <a
            href="mailto:ammar@ammarbass.com"
            className="inline-block px-10 py-4 bg-white text-[#1C1410] rounded-full hover:bg-[#EAE0CF] transition-colors text-sm uppercase tracking-wide"
          >
            Get in touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
