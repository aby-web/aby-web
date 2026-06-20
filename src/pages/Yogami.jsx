import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const features = [
  {
    number: '01',
    title: 'Private Clients',
    description: 'Track every client — sessions, packages, payment status, and notes — all in one place. No spreadsheets.',
  },
  {
    number: '02',
    title: 'Invoicing',
    description: 'Generate professional invoices in seconds, download as PDF, and send directly to clients by email.',
  },
  {
    number: '03',
    title: 'Scheduling & Emails',
    description: 'Schedule sessions and automatically send confirmation emails with a calendar invite. Reminders go out 24 hours before.',
  },
  {
    number: '04',
    title: 'Dashboard',
    description: 'See your income at a glance — monthly and year-to-date — broken down by source. Know exactly where your business stands.',
  },
  {
    number: '05',
    title: 'Studio Management',
    description: 'Manage studio relationships, class schedules, and studio invoices separately from private clients.',
  },
  {
    number: '06',
    title: 'Built for teachers',
    description: 'Designed around how yoga teachers actually work — not adapted from generic invoicing or CRM software.',
  },
];

export default function Yogami() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.from('yogami_interest').insert([{
        name: formData.name,
        email: formData.email.toLowerCase(),
        message: formData.message || null,
      }]);
    } catch { /* silent */ }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Yogami — Business tools for yoga teachers</title>
        <meta name="description" content="Yogami is a management app built specifically for yoga teachers. Clients, invoicing, scheduling, and income tracking — all in one place." />
        <link rel="canonical" href="https://ammarbass.com/yogami" />
      </Helmet>

      <Nav theme="light" />

      {/* Hero */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-16 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
            Built by a teacher, for teachers
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            Yogami
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto mb-4">
            A management app built specifically for yoga teachers. Track clients, send invoices, schedule sessions, and see your income — without the noise of generic business software.
          </p>
          <p className="text-sm text-[#8B7355]">
            Currently in private use. Interested in early access? Register below.
          </p>
        </div>
      </section>

      {/* Screenshot placeholder */}
      <section className="bg-white px-8 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-[#E8E0D5] shadow-lg bg-[#F9F6F2] aspect-[16/9] flex items-center justify-center">
            <div className="text-center text-[#B8A898]">
              <div className="text-5xl mb-4">📊</div>
              <p className="text-sm tracking-wide uppercase">Screenshot coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4 text-center">
            What it does
          </p>
          <h2 className="text-4xl font-light text-[#1C1410] text-center mb-16">
            Everything in one place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((f) => (
              <div key={f.number}>
                <p className="text-sm uppercase tracking-[0.2em] text-[#785E3D] mb-3 font-medium">
                  {f.number}
                </p>
                <h3 className="text-xl font-light text-[#1C1410] mb-3">{f.title}</h3>
                <p className="text-[#6B5740] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second screenshot placeholder */}
      <section className="bg-white px-8 md:px-12 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Client view', 'Invoice view'].map((label) => (
            <div
              key={label}
              className="rounded-xl overflow-hidden border border-[#E8E0D5] shadow bg-[#F9F6F2] aspect-[4/3] flex items-center justify-center"
            >
              <div className="text-center text-[#B8A898]">
                <div className="text-3xl mb-3">🖼</div>
                <p className="text-xs tracking-wide uppercase">{label} — coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / story */}
      <section className="bg-[#1C1410] text-white px-8 md:px-12 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A574] mb-6">
            The story
          </p>
          <p className="text-xl font-light leading-relaxed text-white/90 mb-6">
            I built Yogami because nothing else fit how I actually work. I needed to track private clients, send invoices, and understand my monthly income — without paying for bloated software designed for accountants or gym chains.
          </p>
          <p className="text-base font-light leading-relaxed text-white/70">
            It started as a personal tool. It's grown into something I think could be genuinely useful for other teachers running a similar practice.
          </p>
          <p className="text-sm text-[#D4A574] mt-6">— Ammar Bass</p>
        </div>
      </section>

      {/* Interest / waitlist form */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20" id="waitlist">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            Early access
          </p>
          <h2 className="text-4xl font-light text-[#1C1410] mb-4">
            Interested?
          </h2>
          <p className="text-[#6B5740] mb-10">
            Yogami is currently in private use. If you're a yoga teacher and would like to know when it opens up, leave your details and I'll be in touch.
          </p>

          {submitted ? (
            <div className="bg-white rounded-xl p-8 border border-[#E8E0D5]">
              <p className="text-[#1C1410] font-light text-lg">Thanks — I'll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#785E3D] mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full border border-[#D4C4B0] rounded-lg px-4 py-3 text-[#1C1410] bg-white focus:outline-none focus:border-[#8B9D77] text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#785E3D] mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full border border-[#D4C4B0] rounded-lg px-4 py-3 text-[#1C1410] bg-white focus:outline-none focus:border-[#8B9D77] text-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#785E3D] mb-2">Anything to add? <span className="normal-case text-[#B8A898]">(optional)</span></label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full border border-[#D4C4B0] rounded-lg px-4 py-3 text-[#1C1410] bg-white focus:outline-none focus:border-[#8B9D77] text-sm resize-none"
                  placeholder="What does your current setup look like? What's missing?"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1C1410] text-white py-3 rounded-lg text-sm uppercase tracking-[0.15em] hover:bg-[#2C2218] transition-colors disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Register Interest'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
