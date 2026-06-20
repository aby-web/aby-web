import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const EDGE_FUNCTION_URL = 'https://aojtgezagxnoszzqwabe.supabase.co/functions/v1/new-client-intake';
const INTAKE_SECRET = import.meta.env.VITE_INTAKE_SECRET;

const STUDIO_ADDRESS = 'To be shared upon booking confirmation';

export default function NewClientIntake() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    injuries: '',
    disclaimer_agreed: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.disclaimer_agreed) {
      setError('Please agree to the disclaimer to continue.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-intake-secret': INTAKE_SECRET,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
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
            Please fill in the form below before your first session. This helps me understand
            your background and ensures we can work together safely and effectively.
          </p>

          {submitted ? (
            <div className="bg-white border border-[#C9B99A] rounded-lg p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-light text-[#1C1410] mb-3">All done</h2>
              <p className="text-[#6B5740] text-base">
                Your details have been received. I'll be in touch shortly to confirm your first session.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Personal details */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6 space-y-5">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D]">Your details</h2>

                <div>
                  <label className="block text-sm text-[#1C1410] mb-1">Full name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F4EFE6] text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#9C8770] text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#1C1410] mb-1">Email address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F4EFE6] text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#9C8770] text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#1C1410] mb-1">Phone number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F4EFE6] text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#9C8770] text-sm"
                    placeholder="+44 7700 000000"
                  />
                </div>
              </div>

              {/* Health */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6 space-y-5">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D]">Health &amp; injuries</h2>
                <p className="text-sm text-[#6B5740]">
                  Please share any injuries, chronic pain, medical conditions, or physical limitations I should be aware of.
                  Leave blank if none.
                </p>
                <textarea
                  name="injuries"
                  value={form.injuries}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F4EFE6] text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#9C8770] text-sm resize-none"
                  placeholder="e.g. lower back disc issue, right knee surgery 2022, currently no injuries..."
                />
              </div>

              {/* Location */}
              <div className="bg-white border border-[#C9B99A] rounded-lg p-6">
                <h2 className="text-sm uppercase tracking-[0.15em] text-[#785E3D] mb-3">Session location</h2>
                <p className="text-sm text-[#6B5740] leading-relaxed">
                  {STUDIO_ADDRESS}
                </p>
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
                <p className="text-red-700 text-sm">{error}</p>
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
