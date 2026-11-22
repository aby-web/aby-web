import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import { BTN, TEXT } from '../components/ui';

const PRACTICE_VIDEOS = [
  {
    id: 1,
    title: 'Dynamic Vinyasa Flow',
    description: 'A powerful 75-minute practice focusing on strength, alignment and breath. This class will challenge you while maintaining mindful awareness throughout. Build heat through dynamic sequences and explore the relationship between movement and breath.',
    duration: '75 min',
    level: 'All Levels',
    thumbnail: '/images/video1_thumb.webp',
    thumbnailAlt: 'Ammar Bass in a side-angle lunge on a mat in his loft studio, from the Dynamic Vinyasa Flow class',
    focus: ['Strength', 'Alignment', 'Breath Work'],
    youtubeId: 'jdQFOMM0Hsw',
    comingSoon: false,
  },
];

export default function Practice() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <PageMeta path="/practice" />
      <Helmet>
        <meta name="keywords" content="free yoga videos, vinyasa flow online, yoga practice videos, strength yoga at home, online yoga classes" />
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      <main className="pt-28 md:pt-32 bg-[#F4EFE6]">
        <div className="max-w-5xl mx-auto px-8 md:px-12 pb-18">
          {/* Header */}
          <div className="mb-12 max-w-2xl">
            <p className={`${TEXT.eyebrow} mb-5`}>Free videos</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-[#1C1410] mb-6">
              Practise with me
            </h1>
            <p className={TEXT.body}>
              Free full-length classes to support your practice at home. Each class is thoughtfully sequenced to help you build strength, refine alignment, and deepen your connection to breath and movement.
            </p>
          </div>

          {/* Videos */}
          <div className="space-y-12">
            {PRACTICE_VIDEOS.map((video) => (
              <div key={video.id} className="border border-[#C9B99A] rounded-lg overflow-hidden grid md:grid-cols-5">
                {/* Player / thumbnail */}
                <div className="md:col-span-3">
                  <div className="relative aspect-video bg-black">
                    {selectedVideo === video.id ? (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(video.id)}
                        aria-label={`Play ${video.title}`}
                        className="group absolute inset-0 w-full h-full cursor-pointer"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.thumbnailAlt || video.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                          <span className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center">
                            <svg aria-hidden="true" className="w-7 h-7 text-[#1C1410] ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </span>
                        </span>
                        <span className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 rounded text-sm">
                          {video.duration}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-2 p-7 flex flex-col">
                  <p className={`${TEXT.eyebrow} mb-3`}>{video.level} · {video.duration}</p>
                  <h2 className="text-2xl md:text-3xl font-light text-[#1C1410] mb-4">{video.title}</h2>
                  <p className="text-[16px] leading-relaxed text-[#5C4A36] mb-5">{video.description}</p>
                  <p className="text-[16px] text-[#5C4A36] mb-6">
                    <span className="text-[#1C1410]">Focus:</span> {video.focus.join(', ')}
                  </p>
                  {selectedVideo !== video.id && (
                    <button type="button" onClick={() => setSelectedVideo(video.id)} className={`${BTN.primary} mt-auto self-start`}>
                      Play the class
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final call to action */}
        <section className="bg-[#1C1410] px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-[#F4EFE6] mb-4">Want more personalised guidance?</h2>
            <p className={`${TEXT.bodyOnDark} mb-8`}>
              These free classes are a great way to practise with me at home. For personalised instruction tailored to your goals, consider booking a private session.
            </p>
            <a href="/private-sessions" className={BTN.primaryOnDark}>About private sessions</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
