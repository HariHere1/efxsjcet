import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/SJCET NEW LOGO.png';
import { CountdownTimer } from '../components/CountdownTimer';
import { Particles } from "@/components/ui/particles"
import { StatsBand } from '../components/StatsBand';
import { ScrollVelocityMarquee } from '../components/ScrollVelocityMarquee';
import { LocationsAccordion } from '../components/LocationsAccordion';
import { VenueLocation } from '../components/VenueLocation';

export function HomePage() {
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
          <h1>
            ASME EFx
            <br />
            India <em>2027</em>
          </h1>

          <p className="hero-intro">
            Experience the convergence of mechanical engineering excellence and
            vibrant cultural hospitality. Hosted in the heart of Kerala,
            bringing together the brightest minds.
          </p>
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

      {/* ── STATS BAND ───────────────────────────────────────────────── */}
      <StatsBand />
    </div>
      {/* ── SCROLL VELOCITY MARQUEE ───────────────────────────────────── */}
      <ScrollVelocityMarquee />

      {/* ── EVENT HIGHLIGHTS ─────────────────────────────────────────── */}
        <section className="event-countdown" id="countdown">
          <p className="section-kicker">/ 00 &nbsp; SAVE THE DATE</p>
          <h2 className="countdown-heading">
            21—24 <span>January 2027</span>
          </h2>
          <CountdownTimer />
          <p className="countdown-caption">The countdown to EFx India 2027 begins—get ready to experience engineering, innovation, and extraordinary possibilities.</p>
        </section>

      {/* ── PLAN YOUR VISIT ──────────────────────────────────────────── */}
      <section className="updates stay-section section-grid" id="stay">
        <div className="section-kicker">PLAN YOUR VISIT</div>

        <div className="updates-content">
          <div className="updates-heading">
            <h2>
              Come curious.
              <br />
              <span>Stay comfortable.</span>
            </h2>

            <a className="arrow-link" href="#booking">
              Book a stay <ArrowUpRight />
            </a>
          </div>

          {['Accommodation'].map((link) => (
            <a className="news-item" href="#booking" key={link}>
              <time>01</time>
              <strong>{link}</strong>
              <ArrowUpRight />
            </a>
          ))}
          
          {['Rules and Regulations'].map((link) => (
            <a className="news-item" href="#booking" key={link}>
              <time>02</time>
              <strong>{link}</strong>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>

      {/* ── UPDATES ──────────────────────────────────────────────────── */}
      <section className="updates section-grid" id="updates">
        <div className="section-kicker">/ 04 &nbsp; FROM THE NEWSROOM</div>

        <div className="updates-content">
          <div className="updates-heading">
            <h2>
              Keep
              <br />
              <span>moving.</span>
            </h2>

            <a className="arrow-link" href="#updates">
              All updates <ArrowUpRight />
            </a>
          </div>

          {['Registrations are now open for EFx India 2027'].map((news) => (
            <a className="news-item" href="https://konfhub.com/efxindia2027" key={news}>
              <time>18.08.26</time>
              <strong>{news}</strong>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>

      <LocationsAccordion />

      <VenueLocation />
    </main>
  );
}
