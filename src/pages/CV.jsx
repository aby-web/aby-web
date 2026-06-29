import { Helmet } from 'react-helmet-async';

export default function CV() {
  return (
    <>
      <Helmet>
        <title>Ammar Bass — Yoga Teacher CV</title>
        <meta name="description" content="Curriculum vitae of Ammar Bass, yoga teacher in London — teaching philosophy, certifications, and experience." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <style>{`
        .cv-page {
          --cv-dark: #2A1F14;
          --cv-muted: #7A6450;
          --cv-accent: #8A6C48;
          --cv-bg: #F0EAE0;
          --cv-surface: #E8E0D2;
          --cv-border: #CFC0A8;
          --cv-header-bg: #3D2E1E;
          --cv-header-text: #F0EAE0;
          --cv-header-sub: #B09070;

          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--cv-bg);
          color: var(--cv-dark);
          min-height: 100vh;
          padding: 48px 24px;
        }
        .cv-page * { margin: 0; padding: 0; box-sizing: border-box; }

        .cv-page .page {
          max-width: 840px;
          margin: 0 auto;
          background: #FDFAF6;
          border: 1px solid var(--cv-border);
          box-shadow: 0 4px 40px rgba(44,31,20,0.08);
          display: grid;
          grid-template-columns: 1fr 210px;
          grid-template-rows: auto 1fr;
        }

        .cv-page .header-text {
          grid-column: 1;
          grid-row: 1;
          background: var(--cv-header-bg);
          padding: 40px 44px 36px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 220px;
        }

        .cv-page .title {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--cv-header-sub);
          margin-bottom: 10px;
        }

        .cv-page .name {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--cv-header-text);
          line-height: 1;
          margin-bottom: 22px;
        }

        .cv-page .contact-row {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .cv-page .contact-item {
          font-size: 11.5px;
          color: var(--cv-header-sub);
          font-weight: 400;
        }

        .cv-page .contact-item a {
          color: var(--cv-header-sub);
          text-decoration: none;
        }

        .cv-page .photo-wrap {
          grid-column: 2;
          grid-row: 1;
          overflow: hidden;
          min-height: 220px;
        }

        .cv-page .photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .cv-page .main {
          grid-column: 1;
          grid-row: 2;
          padding: 44px;
          border-right: 1px solid var(--cv-border);
        }

        .cv-page .sidebar {
          grid-column: 2;
          grid-row: 2;
          padding: 44px 28px 40px;
          background: var(--cv-surface);
        }

        .cv-page .section { margin-bottom: 30px; }
        .cv-page .section:last-child { margin-bottom: 0; }

        .cv-page .section-label {
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--cv-accent);
          border-bottom: 1px solid var(--cv-border);
          padding-bottom: 7px;
          margin-bottom: 16px;
        }

        .cv-page .philosophy p, .cv-page .profile p {
          font-size: 13px;
          line-height: 1.78;
          color: var(--cv-dark);
          margin-bottom: 11px;
        }

        .cv-page .philosophy p:last-child, .cv-page .profile p:last-child {
          margin-bottom: 0;
        }

        .cv-page .teaching-block {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cv-page .teaching-row {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 12px;
          align-items: baseline;
        }

        .cv-page .teaching-type {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--cv-accent);
          padding-top: 1px;
        }

        .cv-page .teaching-detail {
          font-size: 12.5px;
          color: var(--cv-dark);
          line-height: 1.65;
        }

        .cv-page .cert-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cv-page .cert-item {
          border-left: 2px solid var(--cv-accent);
          padding-left: 11px;
        }

        .cv-page .cert-name {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--cv-dark);
          line-height: 1.4;
          margin-bottom: 3px;
        }

        .cv-page .cert-meta {
          font-size: 10.5px;
          color: var(--cv-muted);
          line-height: 1.4;
        }

        .cv-page .testimonial-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .cv-page .testimonial-quote {
          font-size: 12px;
          line-height: 1.65;
          color: var(--cv-dark);
          font-style: italic;
          margin-bottom: 6px;
        }

        .cv-page .testimonial-source {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--cv-muted);
        }

        @media (max-width: 640px) {
          .cv-page { padding: 0; }
          .cv-page .page {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto auto;
          }
          .cv-page .header-text { grid-column: 1; grid-row: 1; }
          .cv-page .photo-wrap { grid-column: 1; grid-row: 2; min-height: 280px; }
          .cv-page .main { grid-column: 1; grid-row: 3; border-right: none; }
          .cv-page .sidebar { grid-column: 1; grid-row: 4; }
        }

        @media print {
          .cv-page { padding: 0; background: white; }
          .cv-page .page { border: none; box-shadow: none; max-width: 100%; }
        }
      `}</style>

      <div className="cv-page">
        <div className="page">
          <div className="header-text">
            <div className="title">Yoga Teacher</div>
            <div className="name">Ammar Bass</div>
            <div className="contact-row">
              <span className="contact-item"><a href="tel:+447877786632">+44 7877 786 632</a></span>
              <span className="contact-item"><a href="mailto:ammar@ammarbass.com">ammar@ammarbass.com</a></span>
              <span className="contact-item"><a href="https://ammarbass.com">ammarbass.com</a></span>
              <span className="contact-item">@ammarbass</span>
              <span className="contact-item">West Hampstead, London</span>
            </div>
          </div>

          <div className="photo-wrap">
            <img src="/images/ammar-cv.jpg" alt="Ammar Bass" />
          </div>

          <div className="main">
            {/* TEACHING PHILOSOPHY — leads the CV */}
            <div className="section philosophy">
              <div className="section-label">Teaching Philosophy</div>
              <p>My classes have evolved deliberately. I now teach mostly without music, slower and stronger, with more space for attention. The practice is still physically demanding, but the deeper work is in the mind: observation, sustained focus, noticing change within the body. In a world of increasing distraction and noise, I think these skills matter more than ever. Informed by two 10-day Vipassana courses and a sustained personal practice, this is not philosophy but lived experience.</p>
              <p>I place particular emphasis on hands-on adjustments, reading each student individually, consistently seeing capabilities in them beyond what they perceive in themselves. I work to move people outside their comfort zones, safely. I teach as though my students cannot see me. Every cue is verbal, precise and sufficient on its own. It protects their drishti and keeps attention where it belongs, inward.</p>
            </div>

            {/* PROFILE */}
            <div className="section profile">
              <div className="section-label">Profile</div>
              <p>I came to teaching through practice, not through a plan. During the pandemic I began teaching colleagues out of a clear need for grounded, accessible movement. When restrictions lifted I formalised my training, completing my 200-hour teacher training in the Himalayas, then continued to deepen my practice under Stewart Gilchrist and Emi Tull. The certification was a deepening, not a beginning.</p>
              <p>My background is in competitive swimming and powerlifting. That shapes how I teach: technically precise, biomechanics-led, and built around what the body can sustain long term. Strength, for me, is not the goal. It is what makes everything else possible.</p>
            </div>

            {/* TEACHING */}
            <div className="section">
              <div className="section-label">Teaching</div>
              <div className="teaching-block">
                <div className="teaching-row">
                  <span className="teaching-type">Studio</span>
                  <span className="teaching-detail">HOME Wellness &nbsp;&middot;&nbsp; Indaba &nbsp;&middot;&nbsp; BXR &nbsp;&middot;&nbsp; Yogarise &nbsp;&middot;&nbsp; Flo Yoga</span>
                </div>

                <div className="teaching-row">
                  <span className="teaching-type">Events</span>
                  <span className="teaching-detail">120 Power is a co-taught 2-hour practice bringing students from across London studios together around a shared passion for movement. Powerful transitions, arm balances, inversions and deep binds, and more than anything, new friendships and meaningful connections.</span>
                </div>

                <div className="teaching-row">
                  <span className="teaching-type">Workshops</span>
                  <span className="teaching-detail">Arm balance masterclasses, inversions workshops and collaborative sessions with other teachers across London studios</span>
                </div>

                <div className="teaching-row">
                  <span className="teaching-type">Retreats</span>
                  <span className="teaching-detail">Taking like-minded people overseas to connect with each other and themselves in nature</span>
                </div>

                <div className="teaching-row">
                  <span className="teaching-type">Private</span>
                  <span className="teaching-detail">One-to-one and small group sessions from a private home studio in West Hampstead</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="section">
              <div className="section-label">Certifications</div>
              <div className="cert-list">
                <div className="cert-item">
                  <div className="cert-name">Alignment, Assists &amp; Adjusts | 40h</div>
                  <div className="cert-meta">Stewart Gilchrist<br />London, 2025</div>
                </div>
                <div className="cert-item">
                  <div className="cert-name">Rocket Level 1 | 50h</div>
                  <div className="cert-meta">David Kyle<br />London, 2024</div>
                </div>
                <div className="cert-item">
                  <div className="cert-name">Moving Backwards to Go Forward | 20h</div>
                  <div className="cert-meta">Rebecca Hannah &amp; Alex Hammer<br />London, 2024</div>
                </div>
                <div className="cert-item">
                  <div className="cert-name">Sound Healer Facilitator | 50h</div>
                  <div className="cert-meta">Maria Lodetoft<br />London, 2024</div>
                </div>
                <div className="cert-item">
                  <div className="cert-name">Hatha Yoga Teacher Training | 200h</div>
                  <div className="cert-meta">Sivananda Kutir<br />India, 2022</div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-label">Courses</div>
              <div className="cert-list">
                <div className="cert-item">
                  <div className="cert-name">Vipassana Meditation | 10 days &times;2</div>
                  <div className="cert-meta">Dhamma Dippa<br />Gloucestershire, 2022 &amp; 2025</div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-label">What Students Say</div>
              <div className="testimonial-list">
                <div className="testimonial">
                  <div className="testimonial-quote">
                    <span style={{ color: 'var(--cv-accent)', fontSize: '16px', lineHeight: 0, verticalAlign: '-4px', marginRight: '2px' }}>&#x201C;</span>
                    He struck a really good balance between the meditative and physical. His adjustments were thoughtful and well informed.
                  </div>
                  <div className="testimonial-source">Flo Yoga student</div>
                </div>
                <div className="testimonial">
                  <div className="testimonial-quote">
                    <span style={{ color: 'var(--cv-accent)', fontSize: '16px', lineHeight: 0, verticalAlign: '-4px', marginRight: '2px' }}>&#x201C;</span>
                    Ammar's cues and hypnotic voice keep me focused on my practice. I like how there is no music — it took some time to get used to but I leave with a sense of clarity and calmness.
                  </div>
                  <div className="testimonial-source">HOME Wellness student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
