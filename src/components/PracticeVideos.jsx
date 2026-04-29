import { Link } from 'react-router-dom';

const PRACTICE_VIDEOS = [
  {
    id: 1,
    title: 'Dynamic Vinyasa Flow',
    description: 'A powerful practice focusing on strength, alignment and breath. Build heat and challenge yourself through dynamic sequences.',
    duration: '75 min',
    level: 'All Levels',
    thumbnail: '/images/video1_thumb.png',
    youtubeId: 'jdQFOMM0Hsw',
    comingSoon: false,
  },
];

export default function PracticeVideos() {
  return (
    <section id="practice" className="py-24 bg-[#F4EFE6]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-[#3D3D3D]">
            Practice With Me
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Free full-length classes to deepen your practice at home.
            Follow along with complete flows designed to build strength,
            flexibility and mindfulness.
          </p>
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          {PRACTICE_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-[#785E3D]/10">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {video.comingSoon && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-2xl font-light mb-2">Coming Soon</div>
                      <div className="text-white/80 text-sm">{video.duration}</div>
                    </div>
                  </div>
                )}
                {!video.comingSoon && (
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-[#785E3D]/10 text-[#785E3D] rounded">
                    {video.level}
                  </span>
                </div>
                <h3 className="text-xl font-medium mb-2 text-[#3D3D3D]">
                  {video.title}
                </h3>
                <p className="text-[#666666] text-sm mb-4">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to full practice page */}
        <div className="text-center mt-8">
          <Link
            to="/practice"
            className="inline-block px-8 py-4 bg-[#785E3D] text-[#F4EFE6] rounded hover:bg-[#665033] transition-colors duration-200 font-medium"
          >
            View All Practice Videos
          </Link>
        </div>
      </div>
    </section>
  );
}
