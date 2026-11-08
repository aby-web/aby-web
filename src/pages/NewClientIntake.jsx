import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { honeypotProps, useFormTimer } from '../lib/botCheck';

// Posts to this site's own Supabase project, like the other forms. The
// new-client-intake function does the validation and bot checks and holds
// the service-role key; the anon key here only routes the request.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const EXPERIENCE_OPTIONS = [
  { value: 'complete_beginner', label: "Complete beginner — I've never done yoga, or only once or twice" },
  { value: 'some', label: 'Some experience — a few classes, or on and off over the years' },
  { value: 'regular', label: 'I practise regularly' },
  { value: 'experienced', label: "Experienced — several years, and I'm working on advanced skills" },
];

const FORMAT_OPTIONS = [
  { value: 'studio', label: 'In your studio in West Hampstead' },
  { value: 'online', label: 'Online, over WhatsApp video' },
  { value: 'home', label: 'At my home' },
];

const LOCATION_TEXT = {
  studio: "My loft studio in West Hampstead, NW6, a few minutes from West Hampstead station. I'll send you the full address when I confirm your first session. Mats and props are provided.",
  online: "I'll send you a WhatsApp video call at the time of your session. Find a quiet spot with room for a mat, and set your phone or laptop up so I can see your whole body.",
  home: "I'll come to you. You'll need enough room to lie down with your arms stretched out. Same prices as the studio; a travel fee may apply depending on where you are, and I'll confirm it before we book.",
};

const inputClass =
  'w-full px-4 py-3 bg-[#F4EFE6] text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#9C8770] text-sm';

export default function NewClientIntake() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    goals: '',
    experience: '',
    availability: '',
    format: '',
    home_area: '',
    health_notes: '',
    health_consent: false,
    disclaimer_agreed: false,
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const timer = useFormTimer();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.experience) return setError('Please choose your experience level.');
    if (!form.format) return setError('Please choose where you would like to practise.');
    if (form.health_notes.trim() && !form.health_consent) {
      return setError('Please tick the box so I can store your health notes.');
    }
    if (!form.disclaimer_agreed) return setError('Please agree to the disclaimer to continue.');

    setSubmitting(true);
    setError('');

    const elapsedMs = timer.elapsedMs();
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/new-client-intake`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          ...form,
          home_area: form.format === 'home' ? form.home_area : '',
          honeypot,
          ...(Number.isFinite(elapsedMs) ? { elapsedMs } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please email me directly.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please email me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>New Client Sign-Up | Ammar Bass</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Nav theme="light" />

      <section className="bg-[#F4EFE6] pt-32 pb-20 px-8 md:px-12">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            Private sessions
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            Welcome
          </h1>
          <p className="text-base text-[#6B5740] mb-10 leading-relaxed">
            Please fill this in before your first session. It helps me understand where you're
            starting from and what you'd like to work on, so I can plan a session that suits you
            and keep you safe.
          </p>

          {submitted ? (
            <div className="bg-white border border-[#C9B99A] rounded-lg p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-light text-[#1C1410] mb-3">All done</h2>
              <p className="text-[#6B5740] text-base">
                Thank you. I've got your details and I'll be in touch shortly to confirm your first session.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input {...honeypotProps} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />

              {/* Personal details */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6 space-y-5">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D]">Your details</h2>

                <div>
                  <label htmlFor="name" className="block text-sm text-[#1C1410] mb-1">Full name *</label>
                  <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required maxLength={200} className={inputClass} placeholder="Your full name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-[#1C1410] mb-1">Email address *</label>
                  <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required maxLength={320} className={inputClass} placeholder="your@email.com" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm text-[#1C1410] mb-1">Phone number</label>
                  <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} maxLength={50} className={inputClass} placeholder="+44 7700 000000" />
                </div>
              </div>

              {/* Goals and experience */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6 space-y-5">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D]">Your practice</h2>

                <div>
                  <label htmlFor="goals" className="block text-sm text-[#1C1410] mb-1">What would you like to work on? *</label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={form.goals}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="e.g. learn the basics with confidence, ease a stiff back, build strength, work towards a handstand..."
                  />
                </div>

                <fieldset>
                  <legend className="block text-sm text-[#1C1410] mb-2">Your yoga or movement experience *</legend>
                  <div className="space-y-2">
                    {EXPERIENCE_OPTIONS.map((o) => (
                      <label key={o.value} className="flex items-start gap-3 cursor-pointer text-sm text-[#1C1410]">
                        <input
                          type="radio"
                          name="experience"
                          value={o.value}
                          checked={form.experience === o.value}
                          onChange={handleChange}
                          className="mt-0.5 h-4 w-4 accent-[#785E3D] flex-shrink-0"
                        />
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-[#9C8770] mt-2">
                    Complete beginners are very welcome. Mention any other sport or movement you do in your goals above.
                  </p>
                </fieldset>
              </div>

              {/* Format and location */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6 space-y-5">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D]">Where and when</h2>

                <fieldset>
                  <legend className="block text-sm text-[#1C1410] mb-2">Where would you like to practise? *</legend>
                  <div className="space-y-2">
                    {FORMAT_OPTIONS.map((o) => (
                      <label key={o.value} className="flex items-start gap-3 cursor-pointer text-sm text-[#1C1410]">
                        <input
                          type="radio"
                          name="format"
                          value={o.value}
                          checked={form.format === o.value}
                          onChange={handleChange}
                          className="mt-0.5 h-4 w-4 accent-[#785E3D] flex-shrink-0"
                        />
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {form.format && (
                  <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#785E3D] mb-2">Session location</p>
                    <p className="text-sm text-[#6B5740] leading-relaxed">{LOCATION_TEXT[form.format]}</p>
                  </div>
                )}

                {form.format === 'home' && (
                  <div>
                    <label htmlFor="home_area" className="block text-sm text-[#1C1410] mb-1">Your area or postcode</label>
                    <input id="home_area" type="text" name="home_area" value={form.home_area} onChange={handleChange} maxLength={200} className={inputClass} placeholder="e.g. NW3, or Kilburn" />
                    <p className="text-xs text-[#9C8770] mt-1">So I can let you know about any travel fee. No need for your full address yet.</p>
                  </div>
                )}

                <div>
                  <label htmlFor="availability" className="block text-sm text-[#1C1410] mb-1">When are you usually free? *</label>
                  <textarea
                    id="availability"
                    name="availability"
                    value={form.availability}
                    onChange={handleChange}
                    required
                    maxLength={1000}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="e.g. weekday mornings before 9, Tuesday and Thursday evenings, Saturday late morning..."
                  />
                </div>
              </div>

              {/* Health */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6 space-y-5">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D]">Health &amp; injuries</h2>
                <p className="text-sm text-[#6B5740]">
                  Please share any injuries, chronic pain, medical conditions, pregnancy or physical limitations I should be aware of.
                  Leave blank if none.
                </p>
                <textarea
                  name="health_notes"
                  aria-label="Health and injuries"
                  value={form.health_notes}
                  onChange={handleChange}
                  maxLength={2000}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="e.g. lower back disc issue, right knee surgery 2022, currently no injuries..."
                />
                {form.health_notes.trim() && (
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="health_consent"
                      checked={form.health_consent}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 accent-[#785E3D] flex-shrink-0"
                    />
                    <span className="text-sm text-[#1C1410]">
                      I agree to Ammar storing these health details securely, to plan my sessions safely. They won't be shared with anyone. *
                    </span>
                  </label>
                )}
              </div>

              {/* Disclaimer */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D] mb-3">Disclaimer</h2>
                <div className="text-sm text-[#6B5740] leading-relaxed mb-5 space-y-2">
                  <p>
                    I understand that yoga and movement practice involves physical activity and carries an inherent risk of injury.
                    I confirm that I am voluntarily participating in sessions with Ammar Bass and that I have disclosed
                    any relevant health conditions or injuries above.
                  </p>
                  <p>
                    I agree that Ammar Bass shall not be liable for any injury, loss, or damage arising from my participation,
                    provided that reasonable care has been taken.
                  </p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="disclaimer_agreed"
                    checked={form.disclaimer_agreed}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 accent-[#785E3D] flex-shrink-0"
                  />
                  <span className="text-sm text-[#1C1410]">
                    I have read and agree to the above disclaimer *
                  </span>
                </label>
              </div>

              {error && (
                <p className="text-red-700 text-sm" role="alert">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide disabled:opacity-50"
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>

              <p className="text-xs text-[#9C8770] text-center">
                Your information is stored securely and will only be used in connection with your sessions.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
