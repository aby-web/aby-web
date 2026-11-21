import { BTN, TEXT } from './ui';

// The homepage's short introduction to Ammar, with his portrait.
export default function About() {
  return (
    <section id="about" className="bg-[#F4EFE6] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-center">
        <img
          loading="lazy"
          src="/images/about.webp"
          alt="Portrait of Ammar Bass, yoga teacher in London, smiling in a white T-shirt"
          width="1200"
          height="1200"
          className="w-full max-w-md aspect-square object-cover rounded-lg"
        />
        <div>
          <p className={`${TEXT.eyebrow} mb-4`}>About</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6 leading-snug">
            I'm Ammar. I teach strong, precise yoga in London.
          </h2>
          <p className={`${TEXT.body} mb-4`}>
            My classes are strong, precise and quiet. People come to get stronger, to learn skills like handstands and arm balances, and to build a practice they can keep for decades.
          </p>
          <p className={`${TEXT.body} mb-8`}>
            I came to teaching through a serious personal practice, not the other way around. That shapes everything: the sequencing, the cues, the standards I hold in the room.
          </p>
          <a href="/about" className={BTN.secondary}>More about me</a>
        </div>
      </div>
    </section>
  );
}
