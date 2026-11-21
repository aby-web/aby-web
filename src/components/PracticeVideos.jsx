import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BTN, TEXT } from './ui';

// The homepage's one free video, with a link to the videos page.
const VIDEO = {
  title: 'Dynamic Vinyasa Flow',
  description: 'A powerful practice focusing on strength, alignment and breath. Build heat and challenge yourself through dynamic sequences.',
  duration: '75 min',
  level: 'All Levels',
  thumbnail: '/images/video1_thumb.webp',
  thumbnailAlt: 'Ammar Bass in a side-angle lunge on a mat in his loft studio, from the Dynamic Vinyasa Flow class',
  youtubeId: 'jdQFOMM0Hsw',
};

export default function PracticeVideos() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="practice" className="bg-[#EAE0CF] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className={`${TEXT.eyebrow} mb-4`}>Free video</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">Practise with me at home</h2>
          <p className={`${TEXT.body} mb-3`}>
            A free full-length class to follow along with: {VIDEO.title}, {VIDEO.duration}, {VIDEO.level.toLowerCase()}.
          </p>
          <p className={`${TEXT.body} mb-8`}>{VIDEO.description}</p>
          <Link to="/practice" className={BTN.secondary}>Watch the class</Link>
        </div>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${VIDEO.youtubeId}?autoplay=1`}
              title={VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${VIDEO.title}`}
              className="group absolute inset-0 w-full h-full cursor-pointer"
            >
              <img
                src={VIDEO.thumbnail}
                loading="lazy"
                alt={VIDEO.thumbnailAlt}
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <span className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center">
                  <svg aria-hidden="true" className="w-7 h-7 text-[#1C1410] ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </span>
              </span>
              <span className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 rounded text-sm">{VIDEO.duration}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
