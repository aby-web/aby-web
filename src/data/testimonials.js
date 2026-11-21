// Testimonials, in students' own words. Do not edit the wording of a quote.
//
// `pages` lists where each one shows; the order on a page is the order here.
// Page keys: 'private-sessions', 'saturday-class', 'about'.
// (The homepage gets testimonials in Stage 3 of docs/site-review.md.)
export const testimonials = [
  {
    quote: "I had one-to-one yoga lessons with Ammar because I wanted to learn the foundations of yoga and eventually feel confident practising independently. That's exactly what he helped me achieve!",
    name: 'Suj',
    context: 'Private client',
    pages: ['private-sessions'],
  },
  {
    quote: "There's nothing like a one-to-one with Ammar, who's a passionate and demanding instructor and a warm, balanced person.",
    name: 'Anne',
    context: 'Private client',
    pages: ['private-sessions', 'about'],
  },
  {
    quote: 'His deep knowledge of bio-mechanics… led to a big leap in the quality of my practice… I can only strongly recommend Ammar and his 1to1 teaching!',
    name: 'Philippe',
    context: 'Private client',
    pages: ['private-sessions'],
  },
  {
    quote: 'I had never attempted a handstand before, and at 50, I wanted to progress steadily without injury… Every week I progressed in one area or another.',
    name: 'Tim',
    context: 'Handstand student',
    pages: ['private-sessions'],
  },
  {
    quote: 'His classes are the perfect combination of challenging, energising and deeply grounding.',
    name: 'Luciano',
    context: 'Class student',
    pages: ['saturday-class'],
  },
  {
    quote: 'He creates a unique atmosphere that encourages me to try new things and improve, while staying calm and relaxed.',
    name: 'Michael',
    context: 'Class student',
    pages: ['saturday-class', 'about'],
  },
];

export const testimonialsFor = (page) => testimonials.filter((t) => t.pages.includes(page));
