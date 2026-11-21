import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import FaqList from '../components/FaqList';
import { BTN, TEXT } from '../components/ui';
import { classFaqs } from '../data/faqs';
import { faqPage } from '../data/schema';

// Class and general questions. Questions about private sessions live on the
// private sessions page (src/data/faqs.js holds both lists).
export default function FAQ() {
  return (
    <div className="min-h-screen">
      <PageMeta path="/faq" />
      <Helmet>
        <meta name="keywords" content="yoga FAQ, yoga questions, beginner yoga London, yoga workshop questions, arm balance training, yoga class questions" />
        <script type="application/ld+json">
          {JSON.stringify(faqPage(classFaqs))}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-12 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className={`${TEXT.eyebrow} mb-6`}>Questions</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6">
            Frequently asked questions
          </h1>
          <p className={`${TEXT.body} max-w-2xl`}>
            Classes, events and how I teach. Questions about one-to-one sessions are answered on the{' '}
            <a href="/private-sessions#questions" className={TEXT.link}>private sessions page</a>.
          </p>
        </div>
      </section>

      <section className="bg-[#EAE0CF] px-8 md:px-12 py-18">
        <div className="max-w-4xl mx-auto">
          <FaqList groups={classFaqs} />
        </div>
      </section>

      <section className="bg-[#2A1E16] px-8 md:px-12 py-18">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-[#F4EFE6] mb-4">Still have questions?</h2>
          <p className={`${TEXT.bodyOnDark} mb-8`}>Get in touch and I'll respond within 24 hours.</p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
            <a href="/private-sessions#contact" className={BTN.primaryOnDark}>Send a message</a>
            <a href="/schedule" className={BTN.secondaryOnDark}>View the schedule</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
