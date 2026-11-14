import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Spring Yoga Immersion 2027, from the pre-launch brochure (Google Drive:
// Yoga/Retreats/Norfolk 2027). Images are cropped from the brochure pages,
// so they top out around 400–1360px wide; swap in the originals if they turn up.

const IMG = '/images/norfolk-2027';
const BOOK_EMAIL = 'mailto:ammar@ammarbass.com?subject=Spring%20Yoga%20Immersion%202027';

const TITLE = 'Spring Yoga Immersion 2027 — Norfolk Yoga Retreat | Ammar Bass';
const DESCRIPTION =
  'A three-night yoga retreat near Norwich, 6–9 May 2027, with Ina and Ammar. 11 hours of practice, home-cooked vegetarian food, sauna, ice bath and hot tub. Only 10 places.';

const stats = [
  ['3', 'nights away from the city'],
  ['11 h', 'of practice: 6 classes, 2 workshops'],
  ['2', 'teachers, one small group'],
  ['6', 'home-cooked meals, plus snacks'],
];

const practice = [
  ['Morning practice', 'With Ina. Starting the day with meditation and a breath-led vinyasa flow.'],
  ['Afternoon workshop', "With Ina and Ammar. Two hours of technique, breakdown and drills. Workshops are focused on inversions and backbends. They're built step by step so you leave with skills for your own practice."],
  ['Evening practice', 'With Ammar. Challenging practice, cultivating heat with a focus on the mind.'],
];

const day = [
  ['From 7:30', 'Optional self-serve light breakfast'],
  ['9:00–10:15', <><strong className="font-medium text-[#1C1410]">Morning practice</strong> · Ina</>],
  ['10:30', 'Wholesome vegetarian brunch*'],
  ['11:30–14:00', 'Free time: sauna, hot tub, ice bath, garden, walks, rest'],
  ['14:00–16:00', <><strong className="font-medium text-[#1C1410]">Workshop</strong> · Ina and Ammar</>],
  ['16:00–18:00', 'Free time and snacks'],
  ['18:00–19:15', <><strong className="font-medium text-[#1C1410]">Evening practice</strong> · Ammar</>],
  ['19:30', 'Delicious vegetarian dinner'],
  ['21:00', 'Socialising and board games'],
];

const food = [
  ['energy-balls', 'Homemade energy balls'],
  ['tapioca', 'Coconut tapioca pudding'],
  ['hummus', 'Hummus'],
  ['pancakes', 'Banana pancakes with blueberries'],
  ['curry', 'Vegetable and tofu curry'],
  ['quinoa-salad', 'Roasted vegetable quinoa salad'],
  ['pasta', 'Penne in tomato sauce'],
  ['omelette', 'Omelette with salad leaves'],
  ['greek-salad', 'Greek salad'],
];

const house = [
  ['studio', 'The studio'],
  ['lounge', 'The lounge'],
  ['dining', 'The dining table'],
  ['hot-tub', 'The hot tub'],
  ['bedroom', 'A bedroom'],
  ['bathroom', 'A bathroom'],
];

const rooms = [
  { name: 'Triple', detail: '3 single beds, shared bathroom', price: '£625', unit: 'pp' },
  { name: 'Twin', detail: '2 single beds, shared bathroom', price: '£725', unit: 'pp' },
  { name: 'Ensuite twin', detail: 'Your own shower room · 2 rooms', price: '£825', unit: 'pp' },
  { name: 'The Cabin', detail: 'Private garden cabin, king bed, ensuite · for 1 or 2', price: '£1,195', unit: 'for one', note: 'or £795 each for two', highlight: true },
];

const included = [
  '3 nights at The House of Bohème',
  '11 hours of yoga: 6 classes, 2 workshops',
  '6 meals cooked by Ina + home-made snacks & granola',
  'Tea, coffee and mocktails',
  'Sauna, ice bath and hot tub',
  'Mats, props, towels and toiletries',
];

const Eyebrow = ({ children }) => (
  <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-3">{children}</p>
);

const Photo = ({ name, alt, caption, className = '' }) => (
  <figure>
    <img src={`${IMG}/${name}.webp`} alt={alt} loading="lazy" className={`w-full object-cover rounded-lg ${className}`} />
    {caption && <figcaption className="text-sm text-[#6B5740] mt-2">{caption}</figcaption>}
  </figure>
);

export default function NorfolkRetreat() {
  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/norfolk-retreat" />
        <meta property="og:image" content="https://ammarbass.com/images/og-norfolk-wide.jpg" />
        <link rel="canonical" href="https://ammarbass.com/norfolk-retreat" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Spring Yoga Immersion 2027",
            "description": DESCRIPTION,
            "startDate": "2027-05-06T15:00:00+01:00",
            "endDate": "2027-05-09T12:00:00+01:00",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "The House of Bohème",
              "address": { "@type": "PostalAddress", "addressLocality": "Near Norwich", "addressRegion": "Norfolk", "addressCountry": "GB" }
            },
            "image": "https://ammarbass.com/images/og-norfolk-wide.jpg",
            "organizer": { "@type": "Person", "name": "Ammar Bass", "url": "https://ammarbass.com" },
            "performer": [
              { "@type": "Person", "name": "Ina" },
              { "@type": "Person", "name": "Ammar Bass" }
            ],
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "625",
              "highPrice": "1195",
              "priceCurrency": "GBP",
              "availability": "https://schema.org/LimitedAvailability",
              "url": "https://ammarbass.com/norfolk-retreat"
            }
          })}
        </script>
      </Helmet>

      <Nav theme="light" />

      {/* Intro */}
      <section className="px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>UK retreat · Norfolk · Ina and Ammar</Eyebrow>
          <h1 className="text-5xl md:text-6xl font-light text-[#1C1410] leading-tight mb-6">
            Spring Yoga Immersion
          </h1>
          <p className="text-lg md:text-xl text-[#6B5740] max-w-2xl mb-10">
            Three days of practice, learning and good company. A beautiful space in the English countryside.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10">
            <Photo name="ina-ammar" alt="Ina and Ammar in triangle pose in a forest" caption="Ina and Ammar" className="aspect-[19/20]" />
            <Photo name="studio-wide" alt="The retreat studio with meditation cushions and a gong" caption="The space" className="aspect-[19/20]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              ['6–9 May 2027', 'Thursday to Sunday, 3 nights', false],
              ['Norfolk, UK', '2 hours away from London', false],
              ['Only 10 places', 'First come, first served', true],
            ].map(([head, sub, accent]) => (
              <div key={head} className="border-t border-[#1C1410]/70 pt-3">
                <p className={`text-lg ${accent ? 'text-[#785E3D]' : 'text-[#1C1410]'}`}>{head}</p>
                <p className="text-sm text-[#6B5740]">{sub}</p>
              </div>
            ))}
          </div>

          <p className="text-[17px] text-[#6B5740] leading-relaxed max-w-3xl mb-10">
            Our next retreat brings together strong practice, workshops and home-cooked food. A small group of lovely people sharing a garden, sauna, ice bath and wood-fired hot tub.
          </p>

          <a href="#book" className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide">
            Book your place
          </a>
        </div>
      </section>

      {/* Why */}
      <section className="bg-[#EAE0CF] px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>Why we're doing this</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6 max-w-3xl leading-snug">
            A weekend of yoga practice, workshops, good food and good company
          </h2>
          <div className="space-y-4 text-[17px] text-[#6B5740] leading-relaxed max-w-3xl mb-10">
            <p>
              Our favourite part of every retreat has been the people — conversations over dinner, practising side by side, walks in the garden, games, laughter and the friendships that carry on long after.
            </p>
            <p>
              This weekend is a chance to step out of a busy world and spend time together: yoga, good food, a lot of learning, board games, quality time and the space to take from it whatever you need.
            </p>
          </div>
          <Photo name="group-class" alt="Ammar and Ina leading a full yoga class in a London studio" caption="Leading 120 Power in London" className="aspect-[2/1] mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(([n, label]) => (
              <div key={n} className="border-t border-[#1C1410]/70 pt-3">
                <p className="text-3xl font-light text-[#1C1410] mb-1">{n}</p>
                <p className="text-sm text-[#6B5740]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>The practice</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8">Strong practice, side by side</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {practice.map(([head, text]) => (
              <div key={head} className="bg-white border border-[#C9B99A] rounded-lg p-6">
                <p className="text-[#1C1410] font-medium mb-2">{head}</p>
                <p className="text-[15px] text-[#6B5740] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <Photo name="practice-handstand" alt="Students practising handstands on an outdoor deck" className="aspect-[4/5]" />
            <Photo name="group-mountains" alt="A retreat group jumping for a photo in the mountains" className="aspect-[4/5]" />
            <Photo name="practice-deck" alt="Students in warrior pose on an outdoor deck among trees" className="aspect-[4/5]" />
          </div>
          <p className="text-sm text-[#6B5740] mt-4">Recommended for students who have yoga experience.</p>
        </div>
      </section>

      {/* Day on retreat */}
      <section className="bg-[#EAE0CF] px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-baseline justify-between border-b border-[#1C1410] pb-3 mb-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D]">A day on retreat</p>
            <p className="text-sm text-[#6B5740]">Friday and Saturday</p>
          </div>
          <dl className="divide-y divide-[#C9B99A] mb-3">
            {day.map(([time, what]) => (
              <div key={time} className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-3">
                <dt className="text-[15px] text-[#6B5740]">{time}</dt>
                <dd className="text-[15px] text-[#1C1410]">{what}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-[#6B5740] mb-8">* Suitable for vegans</p>
          <div className="space-y-3 text-[16px] text-[#6B5740] leading-relaxed mb-10">
            <p><strong className="font-medium text-[#1C1410]">Thursday</strong> · Arrive from 15:00, opening circle at 17:00, opening vinyasa with Ammar, then dinner.</p>
            <p><strong className="font-medium text-[#1C1410]">Sunday</strong> · Closing practice and circle at 9:00, then a farewell brunch.</p>
          </div>
          <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-lg p-6">
            <p className="text-[#1C1410] font-medium mb-2">Getting there</p>
            <p className="text-[15px] text-[#6B5740] leading-relaxed">
              Liverpool Street to Norwich in about 1½ hours, then a 20-minute taxi. Parking on site, and we'll help you share lifts.
            </p>
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>The food</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">Meals cooked by Ina</h2>
          <div className="space-y-4 text-[17px] text-[#6B5740] leading-relaxed max-w-3xl mb-10">
            <p>
              Nourishing, seasonal food made with care by a former professional chef: homemade granola and snacks, generous brunches, and long shared dinners around one table.
            </p>
            <p>Vegetarian, with vegan options. Tell us about any dietary needs when you book.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {food.map(([name, alt]) => (
              <Photo key={name} name={`food-${name}`} alt={alt} className="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      {/* House */}
      <section className="bg-[#EAE0CF] px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>The house</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">A calm, private home for the weekend</h2>
          <p className="text-[17px] text-[#6B5740] leading-relaxed max-w-3xl mb-10">
            The House of Bohème, near Norwich, is our home for three nights. A bright studio, a lounge with a wood burner, a long table for meals, and 1.5 acres of garden with a{' '}
            <strong className="font-medium text-[#1C1410]">sauna, ice bath and wood-fired hot tub</strong>, yours to use in the free time each day.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {house.map(([name, caption]) => (
              <Photo key={name} name={`house-${name}`} alt={caption} caption={caption} className="aspect-[3/4]" />
            ))}
          </div>
        </div>
      </section>

      {/* Rooms and prices */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>Rooms and prices</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6 pb-4 border-b border-[#1C1410]">
            Three nights, everything included
          </h2>
          <div className="divide-y divide-[#C9B99A] border-b border-[#C9B99A] mb-4">
            {rooms.map((r) => (
              <div key={r.name} className="flex justify-between items-start gap-6 py-5">
                <div>
                  <p className={`text-lg ${r.highlight ? 'text-[#785E3D]' : 'text-[#1C1410]'}`}>{r.name}</p>
                  <p className="text-[15px] text-[#6B5740]">{r.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl text-[#1C1410]">{r.price} <span className="text-sm text-[#6B5740]">{r.unit}</span></p>
                  {r.note && <p className="text-sm text-[#6B5740]">{r.note}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#6B5740] mb-8">Coming alone? We'll pair you thoughtfully.</p>
          <div className="bg-white border border-[#C9B99A] rounded-lg p-6">
            <p className="text-[#1C1410] font-medium mb-3">Included</p>
            <ul className="space-y-2 mb-5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#6B5740]">
                  <span className="text-[#785E3D]">—</span>{item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-[#6B5740] pt-4 border-t border-[#C9B99A]">
              <strong className="font-medium text-[#1C1410]">Not included</strong> · Travel
            </p>
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="bg-[#EAE0CF] px-6 md:px-12 py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>Book</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">How to book your place</h2>
          <ol className="border-t border-[#1C1410] mb-6">
            {[
              <>Message us with your room choice.</>,
              <>Pay a <strong className="font-medium text-[#1C1410]">£300 deposit</strong> by bank transfer to hold your place.</>,
              <>Pay the balance by <strong className="font-medium text-[#1C1410]">31 March 2027</strong>. Payment plans possible.</>,
            ].map((step, i) => (
              <li key={i} className="flex gap-6 py-5 border-b border-[#1C1410]/70">
                <span className="text-2xl font-light text-[#785E3D] w-6 shrink-0">{i + 1}</span>
                <span className="text-[17px] text-[#6B5740] leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <div className="bg-[#F4EFE6] rounded-lg p-5 mb-10 text-[15px] text-[#6B5740]">
            <strong className="font-medium text-[#1C1410]">Only 10 places.</strong> Rooms are allocated in the order bookings are received. The deposit is non-refundable.
          </div>
          <a href={BOOK_EMAIL} className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide mb-16">
            Email to book
          </a>

          <Eyebrow>Who's teaching</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-2xl font-light text-[#1C1410] mb-2">Ina</p>
              <p className="text-[15px] text-[#6B5740]"><a href="mailto:me@inayoga.co.uk" className="hover:text-[#1C1410]">me@inayoga.co.uk</a></p>
              <p className="text-[15px] text-[#6B5740]">
                <a href="https://instagram.com/inayo.ga" className="hover:text-[#1C1410]">@inayo.ga</a> ·{' '}
                <a href="https://inayoga.co.uk" className="hover:text-[#1C1410]">inayoga.co.uk</a>
              </p>
            </div>
            <div>
              <p className="text-2xl font-light text-[#1C1410] mb-2">Ammar</p>
              <p className="text-[15px] text-[#6B5740]"><a href="mailto:ammar@ammarbass.com" className="hover:text-[#1C1410]">ammar@ammarbass.com</a></p>
              <p className="text-[15px] text-[#6B5740]">
                <a href="https://instagram.com/ammarbass" className="hover:text-[#1C1410]">@ammarbass</a> ·{' '}
                <a href="/" className="hover:text-[#1C1410]">ammarbass.com</a>
              </p>
            </div>
          </div>
          <Photo name="ina-ammar-partner" alt="Ina and Ammar in a partner backbend on a mat" className="aspect-[5/2]" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
