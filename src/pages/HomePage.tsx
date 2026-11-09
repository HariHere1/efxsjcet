import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MapPin, Bus, Train } from 'lucide-react';
import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/SJCET NEW LOGO.png';
import aruvikkachal from '../assets/images/aruvikkachal.png';
import ilaveezhapoonchira from '../assets/images/ilaveezhapoonchira.png';
import illickalKallu from '../assets/images/illickal-kallu.png';
import kumarakom from '../assets/images/kumarakom.png';
import pineForest from '../assets/images/pine-forest.jpg';
import { Particles } from "@/components/ui/particles"
import ButtonWithIconDemo from "@/components/ui/button-witn-icon";
import { RulesModal } from './BookingPage';

export function HomePage() {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [openPlace, setOpenPlace] = useState(0);
  const places = [
    { name: 'Ilaveezhapoonchira', description: 'Rolling hills and wide-open views', image: ilaveezhapoonchira },
    { name: 'Illickal Kallu', description: 'A dramatic Western Ghats viewpoint', image: illickalKallu },
    { name: 'Vagamon', description: 'Pine forests, meadows, and misty hills', image: pineForest },
    { name: 'Kumarakom', description: 'Quiet backwaters and bird sanctuary', image: kumarakom },
    { name: 'Aruvikkachal', description: 'A peaceful waterfall escape', image: aruvikkachal },
  ];

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
          <h1 className="hero-heading">
            <span>Accommodation</span>
            <span>Suggestions |</span>
            <span>Book Your Stay</span>
            <span>for EFx India</span>
            <span><em>2027</em></span>
          </h1>

          <p className="hero-intro">
            Suggested accommodation options for EFx India 2027 participants.
            These are suggestions only, and you are free to choose whether to
            book them or any other hotel nearby.
          </p>
          <ButtonWithIconDemo
            href="#booking"
            label="View accommodation options"
            className="hero-cta"
          />
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
      <section className="updates section-grid" id="updates">
        <div className="section-kicker">CAMPUS UPDATES</div>

        <div className="updates-content">
          <div className="updates-heading">
            <h2>
              Campus
              <br />
              <span>updates.</span>
            </h2>

            <a className="arrow-link" href="#updates">
              All updates <ArrowUpRight />
            </a>
          </div>

          {[
            { title: 'Registrations are now open for EFx India 2027', href: 'https://bit.ly/efxindia2027', external: true },
          ].map((news, index) => (
            <a
              className="news-item"
              href={news.href}
              key={news.title}
              target={news.external ? '_blank' : undefined}
              rel={news.external ? 'noreferrer' : undefined}
            >
              <time>{['18.08.26', '04.08.26', '21.07.26'][index]}</time>
              <strong>{news.title}</strong>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>

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

      <section className="locations section-grid" id="locations">
        <div className="locations-heading">
          <div className="section-kicker">AROUND PALAI</div>
          <h2>Tourist Destinations near SJCET</h2>
          <p>Take a break outside the venue gates and discover hills, waterfalls, and backwaters within easy reach of SJCET.</p>
        </div>
        <div className="locations-accordion">
          {places.map((place, index) => {
            const isOpen = index === openPlace;
            return (
              <div className={`location-item ${isOpen ? 'open' : ''}`} key={place.name}>
                <button
                  type="button"
                  className="location-item-header"
                  aria-expanded={isOpen}
                  onClick={() => setOpenPlace(isOpen ? -1 : index)}
                >
                  <span className="location-item-index">0{index + 1}</span>
                  <span className="location-item-name">{place.name}</span>
                  <span className="location-item-tagline">{place.description}</span>
                  <span className="location-item-indicator" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="location-item-body">
                  <div className="location-item-inner">
                    <img src={place.image} alt={place.name} />
                    <p>{place.description}. A popular side trip from Palai — plan a half-day around your EFx India 2027 schedule.</p>
                    <a className="location-item-link" href="#locations">Explore this destination <ArrowUpRight /></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="venue section-grid" id="venue">
        <div className="venue-copy">
          <p className="section-kicker">THE VENUE</p>
          <h2>Find us in<br /><em>Palai.</em></h2>
          <p>St. Joseph's College of Engineering and Technology, Palai — nestled between the Meenachil river and the Western Ghats foothills in the heart of Kottayam district.</p>
          <address className="venue-address">
            <MapPin /><span>SJCET Palai, Kottayam, Kerala 686579, India</span>
          </address>
          <ul className="venue-facts">
            <li><Train /> Kottayam railway station · ~1:30 hr</li>
            <li><Bus /> Palai KSRTC bus stand · ~10 min</li>
          </ul>
          <a className="venue-directions" href="https://maps.google.com/?q=St.+Joseph's+College+of+Engineering+and+Technology+Palai" target="_blank" rel="noreferrer">
            Get directions <ArrowUpRight />
          </a>
        </div>
        <div className="venue-map">
          <iframe
            title="SJCET Palai location map"
            src="https://www.google.com/maps?q=St.+Joseph's+College+of+Engineering+and+Technology+Palai&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {isRulesModalOpen && <RulesModal onClose={() => setIsRulesModalOpen(false)} />}
    </main>
  );
}
