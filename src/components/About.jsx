import { BTN, TEXT } from './ui';

// The homepage's short introduction to Ammar, with his portrait.
export default function About() {
  return (
    <section id="about" className="bg-[#F4EFE6] px-8 md:px-12 py-12 md:py-18">
      {/* Phones: a small portrait beside the heading, the text underneath.
          Tablet and up: the portrait on the left, all the text on the right. */}
      <div className="max-w-6xl mx-auto grid grid-cols-[6rem_minmax(0,1fr)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-5 gap-y-6 md:gap-16 items-center">
        <img
          loading="lazy"
          src="/images/about.webp"
          alt="Portrait of Ammar Bass, yoga teacher in London, smiling in a white T-shirt"
          width="1200"
          height="1200"
          className="w-full md:max-w-md aspect-square object-cover rounded-lg"
        />
        <div className="contents md:block">
          <div>
            <p className={`${TEXT.eyebrow} mb-2 md:mb-4`}>About</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#1C1410] md:mb-6 leading-snug">
              I'm Ammar. I teach strong, precise yoga in London.
            </h2>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className={`${TEXT.body} mb-4`}>
              My classes are strong, precise and quiet. People come to get stronger, to learn skills like handstands and arm balances, and to build a practice they can keep for decades.
            </p>
            <p className={`${TEXT.body} mb-7 md:mb-8`}>
              I came to teaching through a serious personal practice, not the other way around. That shapes everything: the sequencing, the cues, the standards I hold in the room.
            </p>
            <a href="/about" className={BTN.secondary}>More about me</a>
          </div>
        </div>
      </div>
    </section>
  );
}
