import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PRACTICE_VIDEOS = [
  {
    id: 1,
    title: 'Dynamic Vinyasa Flow',
    description: 'A powerful practice focusing on strength, alignment and breath. Build heat and challenge yourself through dynamic sequences.',
    duration: '90 min',
    level: 'All Levels',
    thumbnail: '/images/hero.webp',
    comingSoon: true,
  },
  {
    id: 2,
    title: 'Open Level Vinyasa',
    description: 'An accessible yet engaging practice suitable for all levels. Explore mindful movement and breath awareness.',
    duration: '75 min',
    level: 'Open Level',
    thumbnail: '/images/about.webp',
    comingSoon: true,
  },
];

export default function PracticeVideos() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, exists
  const [message, setMessage] = useState('');

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

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
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

        {/* Email Notification Form */}
        <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-light mb-3 text-[#3D3D3D]">
            Be the first to know
          </h3>
          <p className="text-[#666666] mb-6">
            Get notified when these free practice videos go live.
          </p>

          {status === 'success' || status === 'exists' ? (
            <div className="text-[#785E3D] text-lg mb-4 py-3">
              {message} ✓
            </div>
          ) : (
            <form onSubmit={handleNotifyMe} className="mb-4">
              <div className="flex items-center border border-[#C9B99A] rounded-full overflow-hidden max-w-md mx-auto bg-white">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-6 py-3 bg-transparent outline-none text-[#1C1410] placeholder-[#6B5740] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-[#785E3D] text-[#F4EFE6] rounded-full hover:bg-[#665033] transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {status === 'loading' ? 'Joining...' : 'Notify Me'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-red-600 text-sm mt-2">{message}</p>
              )}
            </form>
          )}

          <p className="text-xs text-[#785E3D]">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}
