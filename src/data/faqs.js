import { priceSummary } from './privateSessions';

/*
 * Questions and answers.
 *
 *   classFaqs    – the FAQ page (/faq): classes and general questions.
 *   privateFaqs  – shown on the private sessions page, where the decision to
 *                  book is made.
 *
 * Both lists also feed the FAQPage structured data on their page.
 */

export const classFaqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: "I'm new to yoga. Are your classes suitable for beginners?",
        a: "My group classes are designed for people with some yoga experience. If you're completely new, I'd recommend starting with a few private sessions. We go at your pace and build the foundations properly, so when you do come to a class you'll feel at home rather than thrown in at the deep end.",
      },
      {
        q: 'What should I bring to class?',
        a: 'The studios provide mats and props. For my Saturday class in Marylebone, bring your own mat. Either way, bring water and a towel, and wear comfortable athletic clothing. Avoid anything too loose that will flip over your head in inversions.',
      },
      {
        q: "What if I can't do arm balances or inversions?",
        a: "That's exactly why you're here. Every class includes progressions and modifications. You'll work on the strength and technique needed to eventually get there. No one arrives knowing how to handstand.",
      },
    ],
  },
  {
    category: 'Classes & Schedule',
    questions: [
      {
        q: 'How do I book a class?',
        a: "Studio classes are booked on each studio's own website; the links are on the schedule page. My Saturday class in Marylebone is booked through its WhatsApp group.",
      },
      {
        q: "What's the cancellation policy?",
        a: "This varies by studio — typically between 6-12 hours notice. Please refer to the individual studio's cancellation policy when booking.",
      },
      {
        q: 'Do you offer drop-ins or do I need a membership?',
        a: "All studios offer drop-in options and membership packages. Drop-ins are great for trying a class. If you're planning to come regularly, memberships work out more cost-effective.",
      },
      {
        q: "What's the difference between your class types?",
        a: 'All my classes are vinyasa-based with a focus on strength and alignment. The main difference is intensity level and time spent on arm balances/inversions.',
      },
    ],
  },
  {
    category: 'Events & retreats',
    questions: [
      {
        q: 'How are events different from regular classes?',
        a: 'Events are longer than a regular class, so there is time to go further. 120 Power is a strong two-hour practice taught by two teachers, with arm balances, inversions and deep binds. Retreats run over several days, with practice every day.',
      },
      {
        q: 'What level do I need to be for an event?',
        a: "It depends on the event, so check its page. 120 Power, for example, is for people with an established practice. If you're not sure whether an event is right for you, get in touch before you book.",
      },
      {
        q: 'How do I hear about new events and retreats?',
        a: 'Join the mailing list, using the sign-up field at the bottom of any page. I send one email a month with new events, retreats and classes. Everything coming up is also on the events page.',
      },
    ],
  },
  {
    category: 'Practice & Philosophy',
    questions: [
      {
        q: 'Your classes sound intense. Is it all about strength?',
        a: "Strength is a tool, not the goal. The practice is about building control, understanding your body, and developing focus. Yes, you'll work hard physically, but the challenge is as much mental as it is physical.",
      },
      {
        q: 'Do you teach meditation or breathwork?',
        a: 'Yes, but not in isolation. Vipassana meditation principles are woven throughout — observing sensations, staying present, working with discomfort. Pranayama (breathwork) is integrated where it serves the practice.',
      },
      {
        q: 'I have an injury. Can I still attend?',
        a: 'Usually, yes. Tell me before class and I will give you alternatives. For anything ongoing, a private session is the better place to start.',
      },
      {
        q: 'How is your approach different from other yoga teachers?',
        a: 'I approach yoga as a holistic practice centred around longevity. We train specific skills with discipline, but always in service of a sustainable lifelong practice. We develop strength in neglected areas of the body, touch on the importance of mindfulness, and treat the practice as a way to train both mind and body for meditation. I keep the room quiet and focused, so you can concentrate on your own practice. The practice requires great effort, but it\'s effort directed towards something that lasts.',
      },
    ],
  },
];

export const privateFaqs = [
  {
    category: 'Private sessions',
    questions: [
      {
        q: 'How much do private sessions cost?',
        a: `Private sessions are ${priceSummary}. Online sessions are the same price, and at-home sessions are too, though a travel fee may apply. Small groups are priced on request, and the 15-minute discovery call is free.`,
      },
      {
        q: 'Where do private sessions take place?',
        a: "Mostly in my loft studio in West Hampstead, NW6 — the address is sent when you book. I also teach online, or at your home if you have room for a mat. We'll find what suits you on the discovery call.",
      },
      {
        q: 'Can I book a session with friends or colleagues?',
        a: "If you have friends or colleagues who practise at a similar level, I'm happy to put together a small group session — get in touch for a price. I don't run couples sessions: sessions work best when everyone's at a similar stage, so I keep things one-to-one or in small groups of people who are.",
      },
      {
        q: 'How many sessions will I need?',
        a: 'It depends on your goal. Most students see significant progress in 8-12 sessions. Some specific goals (like a solid handstand) typically take 10-15 sessions with consistent practice between sessions. Book a discovery call to discuss your specific goals and create a plan.',
      },
      {
        q: 'Do I need to practise between sessions?',
        a: "It helps, but it's not essential — it depends on your goals and available time. Private sessions give you the technique and progression plan. If you're working towards a specific skill, practising 3-4 times per week will accelerate progress. I'll give you exercises to work on at your own pace.",
      },
    ],
  },
];
