import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/sjcet-logo.png';
import { EventCard } from '../components/EventCard';
import { schedule, type Day } from '../data/schedule';
import { CountdownTimer } from '../components/CountdownTimer';
import { Particles } from "@/components/ui/particles"
import { StatsBand } from '../components/StatsBand';
import { ScrollVelocityMarquee } from '../components/ScrollVelocityMarquee';

export function HomePage() {
  const [day, setDay] = useState<Day>('day1');

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

          <div className="location-line">
            <MapPin />
            <span>
              <small>Location</small>
              SJCET Palai, Kerala
            </span>
          </div>
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
      <section className="home-highlights" id="events">
        <div className="highlights-copy">
          <h2>Event Highlights</h2>
          <p>Explore the key aspects of EFx India 2027</p>
        </div>
        <section className="event-countdown" id="countdown">
          <p className="section-kicker">/ 00 &nbsp; SAVE THE DATE</p>
          <h2 className="countdown-heading">
            21—24 <span>January 2027</span>
          </h2>
          <CountdownTimer />
          <p className="countdown-caption">The countdown to EFx India 2027 begins—get ready to experience engineering, innovation, and extraordinary possibilities.</p>
        </section>
        <div className="highlight-cards">
          <article>
            <span>01</span>
            <strong>Competitions</strong>
            <p>Put your engineering skills to the test.</p>
          </article>

          <article>
            <span>02</span>
            <strong>Workshops</strong>
            <p>Learn from industry and academic leaders.</p>
          </article>

          <article>
            <span>03</span>
            <strong>Networking</strong>
            <p>Connect with the next generation of makers.</p>
          </article>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────── */}
      <section className="intro section-grid">
        <div className="section-kicker">/ 01 &nbsp; THE PROGRAMME</div>

        <div className="intro-content">
          <h2>
            Where ideas
            <br />
            <span>gain momentum.</span>
          </h2>

          <p>
            EFx brings the ASME community together to test limits, share
            knowledge, and make the future tangible. Find your challenge, meet
            your people, and leave with something built.
          </p>

          <a className="arrow-link" href="#events-grid">
            See all experiences <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* ── EVENT GRID ───────────────────────────────────────────────── */}
      <section className="event-grid" id="events-grid">
        <EventCard
          href="#competition/e-hpvc"
          tone="event-large"
          number="01"
          type="COMPETITION"
          title={
            <>
              e-
              <br />
              <em>HPVC</em>
            </>
          }
          text="Innovate under pressure. Design, build, and race a sustainable, high-efficiency hybrid vehicle on the track."
        />

        <EventCard
          href="#competition/iam-3d"
          tone="event-teal"
          number="02"
          type="WORKSHOP"
          title={
            <>
              IAM
              <br />
              3D
            </>
          }
          text="Hands-on sessions led by the people moving industry forward."
        />

        <EventCard
          href="#competition/sdc"
          tone="event-dark"
          number="03"
          type="CONVERSATION"
          title={<>SDC</>}
          text="Big questions. Clear thinking. A room full of new perspectives."
        />
      </section>

      {/* ── SCHEDULE ─────────────────────────────────────────────────── */}
      <section className="schedule section-grid" id="schedule">
        <div className="section-kicker">/ 02 &nbsp; YOUR THREE DAYS</div>

        <div className="schedule-content">
          <div className="schedule-heading">
            <h2>
              Make a
              <br />
              <span>day of it.</span>
            </h2>

            <div className="day-tabs" role="tablist">
              {(['day1', 'day2', 'day3'] as Day[]).map((item, index) => (
                <button
                  className={`day-tab ${day === item ? 'active' : ''}`}
                  onClick={() => setDay(item)}
                  key={item}
                >
                  {12 + index} MAR{' '}
                  <small>{['FRI', 'SAT', 'SUN'][index]}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="schedule-list">
            {schedule[day].map((item, index) => (
              <div
                className={`schedule-item ${
                  index === 1 || (day !== 'day1' && index === 0)
                    ? 'featured'
                    : ''
                }`}
                key={item.time}
              >
                <time>{item.time}</time>

                <div>
                  <strong>{item.title}</strong>
                  <span>{item.place}</span>
                </div>

                <b>{item.tag}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT BAND ───────────────────────────────────────────────── */}
      <section className="split-band" id="stay">
        <div className="stay-block">
          <div className="section-kicker">/ 03 &nbsp; PLAN YOUR VISIT</div>

          <h2>
            Come curious.
            <br />
            <em>Stay comfortable.</em>
          </h2>

          <p>
            Everything you need for a smooth arrival, from campus accommodation
            to getting around Palai.
          </p>

          <div className="plan-links">
            <a href="#stay">
              Accommodation <ArrowUpRight />
            </a>
            <a href="#stay">
              Registration fees <ArrowUpRight />
            </a>
            <a href="#stay">
              Getting here <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="kerala-block" id="explore-kerala">
          <div className="mini-label">BEYOND THE VENUE</div>

          <h2>
            Take the
            <br />
            <span>scenic route.</span>
          </h2>

          <p>
            Tea country, quiet backwaters, and a little more time in God's Own
            Country.
          </p>

          <a className="button button-light" href="#explore-kerala">
            Explore Kerala <ArrowUpRight />
          </a>
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

          {[
            'Registrations are now open for EFx India 2027',
            'Meet the first wave of workshop mentors',
            'Five things to know before you arrive in Palai',
          ].map((news, index) => (
            <a className="news-item" href="#updates" key={news}>
              <time>
                {['18.08.26', '04.08.26', '21.07.26'][index]}
              </time>
              <strong>{news}</strong>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}