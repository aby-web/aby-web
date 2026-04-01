import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "I'm new to yoga. Are your classes suitable for beginners?",
          a: "My classes are designed for people with some yoga experience. If you're completely new, I recommend starting with 3-4 beginner classes elsewhere to learn basic poses and breathing. Once you're comfortable in downward dog and can hold plank for 30 seconds, you're ready for my classes."
        },
        {
          q: "What should I bring to class?",
          a: "Most studios provide mats and props. Just bring water, a towel, and wear comfortable athletic clothing. Avoid anything too loose that will flip over your head in inversions."
        },
        {
          q: "What if I can't do arm balances or inversions?",
          a: "That's exactly why you're here. Every class includes progressions and modifications. You'll work on the strength and technique needed to eventually get there. No one arrives knowing how to handstand."
        }
      ]
    },
    {
      category: "Classes & Schedule",
      questions: [
        {
          q: "How do I book a class?",
          a: "All classes are booked through the individual studio systems or via Mindbody. Booking links are provided in the schedule section of the homepage."
        },
        {
          q: "What's the cancellation policy?",
          a: "This varies by studio — typically between 6-12 hours notice. Please refer to the individual studio's cancellation policy when booking."
        },
        {
          q: "Do you offer drop-ins or do I need a membership?",
          a: "All studios offer drop-in options and membership packages. Drop-ins are great for trying a class. If you're planning to come regularly, memberships work out more cost-effective."
        },
        {
          q: "What's the difference between your class types?",
          a: "All my classes are vinyasa-based with a focus on strength and alignment. The main difference is intensity level and time spent on arm balances/inversions. Check the Classes page for detailed descriptions."
        }
      ]
    },
    {
      category: "Private Sessions",
      questions: [
        {
          q: "How much do private sessions cost?",
          a: "Rates vary based on session length (60 or 90 minutes) and whether it's one-on-one or small group (up to 3 people). Get in touch via the contact form and I'll send you the current pricing."
        },
        {
          q: "Where do private sessions take place?",
          a: "Sessions can be at my studio space, online via video call, or at your home if you have space and a mat. We'll discuss the best option for your needs during the discovery call."
        },
        {
          q: "How many sessions will I need?",
          a: "It depends on your goal. Most students see significant progress in 8-12 sessions. Some specific goals (like a solid handstand) typically take 10-15 sessions with consistent practice between sessions. Book a discovery call to discuss your specific goals and create a plan."
        },
        {
          q: "Do I need to practice between sessions?",
          a: "It helps, but it's not essential — it depends on your goals and available time. Private sessions give you the technique and progression plan. If you're working toward a specific skill, practicing 3-4 times per week will accelerate progress. I'll give you exercises to work on at your own pace."
        }
      ]
    },
    {
      category: "Workshops & Events",
      questions: [
        {
          q: "How are workshops different from regular classes?",
          a: "Workshops are 2-3 hours focused on one specific skill (like arm balances or inversions). You get detailed breakdowns, individual feedback, and time to practice progressions you wouldn't cover in a regular class."
        },
        {
          q: "What level do I need to be for workshops?",
          a: "It depends on the workshop. Some are open to all levels with experience modifications. Others specify prerequisites (e.g., 'must be able to hold crow pose for 10 seconds'). Check the event description."
        },
        {
          q: "How do I stay updated on upcoming workshops?",
          a: "Join the mailing list at the bottom of the homepage. I send updates about new workshops, retreats, and special events about once a month."
        }
      ]
    },
    {
      category: "Practice & Philosophy",
      questions: [
        {
          q: "Your classes sound intense. Is it all about strength?",
          a: "Strength is a tool, not the goal. The practice is about building control, understanding your body, and developing focus. Yes, you'll work hard physically, but the challenge is as much mental as it is physical."
        },
        {
          q: "Do you teach meditation or breathwork?",
          a: "Yes, but not in isolation. Vipassana meditation principles are woven throughout — observing sensations, staying present, working with discomfort. Pranayama (breathwork) is integrated where it serves the practice."
        },
        {
          q: "I have an injury. Can I still attend?",
          a: "Maybe. Tell me about it before class or book a private session where we can work around limitations. For ongoing injuries, I recommend working one-on-one so I can give you proper modifications."
        },
        {
          q: "How is your approach different from other yoga teachers?",
          a: "I approach yoga as a holistic practice centred around longevity. Everything we do is structured and progressive — we train specific skills with discipline, but always in service of a sustainable lifelong practice. We develop strength in neglected areas of the body, touch on the importance of mindfulness, and treat the practice as a way to train both mind and body for meditation. I can be strict in classes, but it's to help students maintain focus and concentration. The practice requires great effort, but it's effort directed toward something that lasts."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>FAQ | Ammar Bass Yoga | Common Questions Answered</title>
        <meta name="description" content="Frequently asked questions about yoga classes, private sessions, workshops, and practice philosophy. Everything you need to know before training with Ammar Bass in London." />
        <meta name="keywords" content="yoga FAQ, yoga questions, beginner yoga London, private yoga sessions, yoga workshop questions, arm balance training, yoga class questions" />

        {/* Open Graph */}
        <meta property="og:title" content="FAQ | Ammar Bass Yoga" />
        <meta property="og:description" content="Common questions about classes, private sessions, and training approach answered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/faq" />
        <meta property="og:image" content="https://ammarbass.com/images/about.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ | Ammar Bass Yoga" />
        <meta name="twitter:description" content="Common questions about classes, private sessions, and training approach answered." />
        <meta name="twitter:image" content="https://ammarbass.com/images/about.webp" />

        <link rel="canonical" href="https://ammarbass.com/faq" />
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      {/* Hero Section */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
            Questions
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Everything you need to know about classes, private sessions, and training with me.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Title */}
              <h2 className="text-3xl font-light text-[#1C1410] mb-6 pb-3 border-b border-[#C9B99A]">
                {category.category}
              </h2>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                  return (
                    <div
                      key={questionIndex}
                      className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[#EAE0CF] transition-colors"
                      >
                        <span className="text-lg font-light text-[#1C1410] pr-4">
                          {faq.q}
                        </span>
                        <span className={`text-2xl text-[#785E3D] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </button>

                      {/* Answer */}
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-[15px] leading-relaxed text-[#6B5740]">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-[#6B5740] mb-8">
            Get in touch and I'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/private-sessions#contact"
              className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide"
            >
              Send a Message
            </a>
            <a
              href="/#schedule"
              className="inline-block px-8 py-4 rounded-full bg-transparent border-2 border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6] transition-colors text-sm uppercase tracking-wide"
            >
              View Schedule
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
