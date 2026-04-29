import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const PRACTICE_VIDEOS = [
  {
    id: 1,
    title: 'Dynamic Vinyasa Flow',
    description: 'A powerful 75-minute practice focusing on strength, alignment and breath. This class will challenge you while maintaining mindful awareness throughout. Build heat through dynamic sequences and explore the relationship between movement and breath.',
    duration: '75 min',
    level: 'All Levels',
    thumbnail: '/images/video1_thumb.png',
    focus: ['Strength', 'Alignment', 'Breath Work'],
    youtubeId: 'jdQFOMM0Hsw',
    comingSoon: false,
  },
  {
    id: 2,
    title: 'Open Level Vinyasa',
    description: 'An accessible yet engaging 75-minute practice suitable for all levels. Explore mindful movement and breath awareness through thoughtfully sequenced flows. Perfect for building consistency in your practice.',
    duration: '75 min',
    level: 'Open Level',
    thumbnail: '/images/about.webp',
    focus: ['Mindfulness', 'Foundations', 'Flow'],
    comingSoon: true,
  },
];

export default function Practice() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, exists
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNotifyMe = async (e) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      // Check if email already exists
      const { data: existing, error: checkError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existing) {
        setStatus('exists');
        setMessage('You are already subscribed!');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }

      // Insert new subscriber with video notification flag
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{
          email: email.toLowerCase(),
          source: 'practice_videos'
        }]);

      if (insertError) throw insertError;

      setStatus('success');
      setMessage('Perfect! We will notify you when videos are live.');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Practice Videos | Ammar Bass Yoga</title>
        <meta name="description" content="Free full-length yoga classes with Ammar Bass. Practice strength-based vinyasa flows, arm balances, and mindful movement from home." />
        <meta name="keywords" content="free yoga videos, vinyasa flow online, yoga practice videos, strength yoga at home, online yoga classes" />

        <meta property="og:title" content="Free Practice Videos | Ammar Bass Yoga" />
        <meta property="og:description" content="Free full-length yoga classes. Practice strength-based vinyasa flows from home." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/practice" />

        <link rel="canonical" href="https://ammarbass.com/practice" />
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      <main className="pt-32 pb-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-[#3D3D3D]">
              Practice With Me
            </h1>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Free full-length classes to support your practice at home. Each class is thoughtfully sequenced
              to help you build strength, refine alignment, and deepen your connection to breath and movement.
            </p>
          </div>

          {/* Video Grid */}
          <div className="space-y-12">
            {PRACTICE_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Video Player / Thumbnail */}
                  <div className="md:col-span-3">
                    <div className="relative aspect-video bg-black">
                      {video.comingSoon ? (
                        <div className="relative w-full h-full">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <div className="text-center px-8">
                              <div className="text-white text-3xl md:text-4xl font-light mb-3">
                                Coming Soon
                              </div>
                              <div className="text-white/80 text-lg mb-4">
                                Currently in production
                              </div>
                              <div className="text-white/60 text-sm">
                                {video.duration} practice
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        selectedVideo === video.id ? (
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div
                            className="relative w-full h-full cursor-pointer group"
                            onClick={() => setSelectedVideo(video.id)}
                          >
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                              <div className="w-20 h-20 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-200">
                                <svg className="w-10 h-10 text-[#785E3D] ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded text-sm font-medium">
                              {video.duration}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="md:col-span-2 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-medium px-3 py-1 bg-[#785E3D]/10 text-[#785E3D] rounded">
                        {video.level}
                      </span>
                      <span className="text-sm text-[#666666]">{video.duration}</span>
                    </div>

                    <h2 className="text-2xl font-medium mb-4 text-[#3D3D3D]">
                      {video.title}
                    </h2>

                    <p className="text-[#666666] mb-6 leading-relaxed">
                      {video.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-[#3D3D3D] mb-2">Focus Areas:</h3>
                      <div className="flex flex-wrap gap-2">
                        {video.focus.map((area) => (
                          <span
                            key={area}
                            className="text-xs px-3 py-1 bg-[#F4EFE6] text-[#785E3D] rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {!video.comingSoon && selectedVideo !== video.id && (
                      <button
                        onClick={() => setSelectedVideo(video.id)}
                        className="w-full px-6 py-3 bg-[#785E3D] text-[#F4EFE6] rounded hover:bg-[#665033] transition-colors duration-200 font-medium"
                      >
                        Practice Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Private Sessions CTA */}
          <div className="mt-12 text-center bg-[#F4EFE6] rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-light mb-4 text-[#3D3D3D]">
              Want More Personalised Guidance?
            </h2>
            <p className="text-[#666666] mb-6 max-w-2xl mx-auto">
              These free classes are a great way to practice with me at home.
              For personalised instruction tailored to your goals, consider booking a private session.
            </p>
            <a
              href="/private-sessions"
              className="inline-block px-8 py-4 bg-[#785E3D] text-[#F4EFE6] rounded hover:bg-[#665033] transition-colors duration-200 font-medium"
            >
              Book Private Session
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
