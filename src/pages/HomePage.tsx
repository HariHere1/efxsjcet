import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/SJCET NEW LOGO.png';
import { Particles } from "@/components/ui/particles"
import { RulesModal } from './BookingPage';

export function HomePage() {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  return (
    <main id="top">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="hero-stats-wrap">
        <div className="particles-container">
            <Particles className="particles-canvas" />
        </div>
      <section className="hero section-grid">
        {/* Animated ambient particle field */}
        
   

        <div className="hero-copy reveal">
          <p className="section-kicker hero-kicker">ACCOMMODATION SUGGESTIONS</p>
          <h1 className="hero-heading">
            <span>Book Your Stay</span>
            <span>for EFx India <em>2027</em></span>
          </h1>

          <p className="hero-intro">
            Suggested accommodation options for EFx India 2027 participants.
            These are suggestions only, and you are free to choose whether to book.
          </p>
          <a className="button" href="#booking">View accommodation options <ArrowUpRight /></a>
        </div>

        <div className="hero-visual reveal reveal-delay">
          <div className="hero-host-lockup">
            <span className="host-label">ASME EFx INDIA 2027</span>
            <img
              className="hero-asme-logo"
              src={asmeLogo}
              alt="ASME EFx India 2027"
            />
            <div className="host-divider" />
            <span className="host-label">HOSTED BY</span>
            <span className="sjcet-logo-wrap">
              <img
                className="hero-sjcet-logo"
                src={sjcetLogo}
                alt="St. Joseph's College of Engineering and Technology, Palai"
              />
            </span>
          </div>
        </div>
      </section>

    </div>
      <section className="updates stay-section section-grid" id="stay">
        <div className="section-kicker">SUGGESTED STAYS</div>

        <div className="updates-content">
          <div className="updates-heading">
            <h2>
              Stay
              <br />
              <span>comfortable.</span>
            </h2>

            <a className="arrow-link" href="#booking">
              Book a stay <ArrowUpRight />
            </a>
          </div>

          {['Accommodation options'].map((link) => (
            <a className="news-item" href="#booking" key={link}>
              <time>01</time>
              <strong>{link}</strong>
              <ArrowUpRight />
            </a>
          ))}
          
          <a
            className="news-item"
            href="#rules"
            onClick={(event) => {
              event.preventDefault();
              setIsRulesModalOpen(true);
            }}
          >
              <time>02</time>
              <strong>Rules and Regulations</strong>
              <ArrowUpRight />
          </a>
        </div>
      </section>

      {isRulesModalOpen && <RulesModal onClose={() => setIsRulesModalOpen(false)} />}
    </main>
  );
}
