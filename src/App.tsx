import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  CircleHelp,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import asmeLogo from '../asme efx logo.png';
import sjcetLogo from '../sjcet logo.png';
import pineForest from '../pine forest.jpg';
import vagamonLake from '../vagamon lake.png';
import illickalKalluImg from '../illickal kallu img.png';
import waterfallImg from '../Waterfall.png';
import ilaveezhapoonchiraImg from '../ilvzpnchra.png';

type Day = 'day1' | 'day2' | 'day3';

type ScheduleItem = {
  time: string;
  title: string;
  place: string;
  tag: string;
};

const schedule: Record<Day, ScheduleItem[]> = {
  day1: [
    {
      time: '09:00',
      title: 'Doors open + welcome coffee',
      place: 'Central Courtyard',
      tag: 'ALL',
    },
    {
      time: '10:30',
      title: 'Opening ceremony',
      place: "St. Joseph's Auditorium",
      tag: 'MAIN',
    },
    {
      time: '13:00',
      title: 'Design Challenge: round one',
      place: 'Innovation Block',
      tag: 'TEAMS',
    },
    {
      time: '18:30',
      title: 'Welcome to Kerala',
      place: 'Open-air amphitheatre',
      tag: 'ALL',
    },
  ],
  day2: [
    {
      time: '09:30',
      title: 'Make Lab: rapid prototyping',
      place: 'Mechanical Workshop',
      tag: 'LAB',
    },
    {
      time: '12:30',
      title: 'Lunch + chapter meetups',
      place: 'Student Commons',
      tag: 'ALL',
    },
    {
      time: '15:00',
      title: 'Future Forum: beyond the blueprint',
      place: "St. Joseph's Auditorium",
      tag: 'MAIN',
    },
  ],
  day3: [
    {
      time: '10:00',
      title: 'Design Challenge: final showcase',
      place: 'Central Courtyard',
      tag: 'TEAMS',
    },
    {
      time: '14:00',
      title: 'Awards + closing ceremony',
      place: "St. Joseph's Auditorium",
      tag: 'ALL',
    },
  ],
};

const navItems = [
  'Home',
  'Events',
  'Schedule',
  'Stay & Payment',
  'Explore Kerala',
  'Updates',
];

function App() {
  const [day, setDay] = useState<Day>('day1');
  const [menuOpen, setMenuOpen] = useState(false);
  const [competitionPage, setCompetitionPage] = useState(
    window.location.hash === '#competition'
  );
  const [explorePage, setExplorePage] = useState(
    window.location.hash === '#explore-kerala'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCompetitionPage(window.location.hash === '#competition');
      setExplorePage(window.location.hash === '#explore-kerala');
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a
          className="brand-lockup"
          href="#top"
          aria-label="ASME EFx India 2027 home"
        >
          <img className="asme-logo" src={asmeLogo} alt="ASME EFx" />
          <span className="brand-rule">|</span>
          <img
            className="sjcet-logo"
            src={sjcetLogo}
            alt="St. Joseph's College of Engineering and Technology, Palai"
          />
        </a>

        <nav
          className={`main-nav ${menuOpen ? 'mobile-open' : ''}`}
          aria-label="Main navigation"
        >
          {navItems.map((item, index) => (
            <a
              className={
                (index === 0 && !competitionPage && !explorePage) ||
                (item === 'Explore Kerala' && explorePage)
                  ? 'active'
                  : ''
              }
              href={
                item === 'Explore Kerala'
                  ? '#explore-kerala'
                  : index === 0
                  ? '#top'
                  : `#${item.toLowerCase().replace(/ /g, '-')}`
              }
              key={item}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Help">
            <CircleHelp />
          </button>

          <button
            className="menu-button icon-button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {competitionPage ? (
        <CompetitionPage />
      ) : explorePage ? (
        <ExploreKeralaPage />
      ) : (
        <main id="top">
          <section className="hero section-grid">
            <div className="hero-copy reveal">
              <div className="date-chip">
                <CalendarDays /> JANUARY 21-24, 2027
              </div>

              <h1>
                ASME EFx
                <br />
                India <em>2027</em>
              </h1>

              <p className="hero-intro">
                Experience the convergence of mechanical engineering excellence
                and vibrant cultural hospitality. Hosted in the heart of Kerala,
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

                <img
                  className="hero-sjcet-logo"
                  src={sjcetLogo}
                  alt="St. Joseph's College of Engineering and Technology, Palai"
                />
              </div>
            </div>
          </section>

          <section className="home-highlights" id="events">
            <div className="highlights-copy">
              <h2>Event Highlights</h2>
              <p>Explore the key aspects of EFx India 2027</p>
            </div>

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

          <section className="intro section-grid">
            <div className="section-kicker">
              / 01 &nbsp; THE PROGRAMME
            </div>

            <div className="intro-content">
              <h2>
                Where ideas
                <br />
                <span>gain momentum.</span>
              </h2>

              <p>
                EFx brings the ASME community together to test limits, share
                knowledge, and make the future tangible. Find your challenge,
                meet your people, and leave with something built.
              </p>

              <a className="arrow-link" href="#events-grid">
                See all experiences <ArrowUpRight />
              </a>
            </div>
          </section>

          <section className="event-grid" id="events-grid">
            <EventCard
              href="#competition"
              tone="event-large"
              number="01"
              type="COMPETITION"
              title={
                <>
                  Design
                  <br />
                  <em>Challenge</em>
                </>
              }
              text="Prototype under pressure. Solve a real-world brief with your crew."
            />

            <EventCard
              tone="event-teal"
              number="02"
              type="WORKSHOP"
              title={
                <>
                  Make
                  <br />
                  Lab
                </>
              }
              text="Hands-on sessions led by the people moving industry forward."
            />

            <EventCard
              tone="event-dark"
              number="03"
              type="CONVERSATION"
              title={
                <>
                  Future
                  <br />
                  <em>Forum</em>
                </>
              }
              text="Big questions. Clear thinking. A room full of new perspectives."
            />
          </section>

          <section className="schedule section-grid" id="schedule">
            <div className="section-kicker">
              / 02 &nbsp; YOUR THREE DAYS
            </div>

            <div className="schedule-content">
              <div className="schedule-heading">
                <h2>
                  Make a
                  <br />
                  <span>day of it.</span>
                </h2>

                <div className="day-tabs" role="tablist">
                  {(['day1', 'day2', 'day3'] as Day[]).map(
                    (item, index) => (
                      <button
                        className={`day-tab ${
                          day === item ? 'active' : ''
                        }`}
                        onClick={() => setDay(item)}
                        key={item}
                      >
                        {12 + index} MAR{' '}
                        <small>{['FRI', 'SAT', 'SUN'][index]}</small>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="schedule-list">
                {schedule[day].map((item, index) => (
                  <div
                    className={`schedule-item ${
                      index === 1 ||
                      (day !== 'day1' && index === 0)
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

          <section className="split-band" id="stay">
            <div className="stay-block">
              <div className="section-kicker">
                / 03 &nbsp; PLAN YOUR VISIT
              </div>

              <h2>
                Come curious.
                <br />
                <em>Stay comfortable.</em>
              </h2>

              <p>
                Everything you need for a smooth arrival, from campus
                accommodation to getting around Palai.
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
                Tea country, quiet backwaters, and a little more time in God's
                Own Country.
              </p>

              <a
                className="button button-light"
                href="#explore-kerala"
              >
                Explore Kerala <ArrowUpRight />
              </a>
            </div>
          </section>

          <section className="updates section-grid" id="updates">
            <div className="section-kicker">
              / 04 &nbsp; FROM THE NEWSROOM
            </div>

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
                <a
                  className="news-item"
                  href="#updates"
                  key={news}
                >
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
      )}

      <footer className="footer">
        <div className="footer-brand">
          <img
            className="asme-logo"
            src={asmeLogo}
            alt="ASME EFx"
          />

          <span className="brand-rule">|</span>

          <img
            className="sjcet-logo"
            src={sjcetLogo}
            alt="SJCET Palai"
          />
        </div>

        <div className="footer-meta">
          <span>12—14 MARCH 2027</span>
          <span>PALAI, KERALA, INDIA</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

function ExploreKeralaPage() {
  const places = [
    ['VAGAMON', 'Rolling hills & adventure', pineForest],
    ['ILLICKAL KALLU', 'Mountains & panoramic views', illickalKalluImg],
    ['MARMALA WATERFALL', 'Hidden waterfall experience', waterfallImg],
    ['KUMARAKOM', 'Backwaters & bird sanctuary', vagamonLake],
    ['ILAVEEZHAPOONCHIRA', 'Hills & open landscapes', ilaveezhapoonchiraImg],
    ['POONJAR', 'Heritage & history', pineForest],
  ];

  return (
    <main className="explore-page">
      <section className="explore-page-hero">
        <div className="explore-hero-copy">
          <a className="back-link" href="#top"><ArrowUpRight /> Back to EFx India 2027</a>
          <p className="section-kicker">/ EXPLORE KERALA</p>
          <h1>God's Own<br /><em>Country.</em></h1>
          <p>Take a slower route through the hills, waterfalls, backwaters, and living history that surround Palai.</p>
        </div>
        <div className="explore-hero-image"><img src={vagamonLake} alt="Vagamon lake surrounded by tea gardens" /></div>
      </section>
      <section className="explore-places">
        <div className="explore-places-heading"><p className="section-kicker">/ CURATED DESTINATIONS</p><h2>Go beyond<br /><em>the venue.</em></h2><p>Build a little time into your EFx visit for the landscapes and stories of central Kerala.</p></div>
        <div className="places-grid">{places.map(([name, description, image], index) => <a className={`place-card place-card-${index + 1}`} href="#explore-kerala" key={name}><img src={image.startsWith('http') ? `${image}?auto=format&fit=crop&w=900&q=85` : image} alt={name} /><div><span>0{index + 1}</span><h3>{name}</h3><p>{description}</p></div></a>)}</div>
      </section>
    </main>
  );
}

function CompetitionPage() {
  return (
    <main className="competition-page">
      <section className="competition-hero">
        <div>
          <a className="back-link" href="#top">
            <ArrowUpRight /> Back to EFx India 2027
          </a>

          <p className="section-kicker">
            / 01 &nbsp; COMPETITION
          </p>

          <h1>
            Design
            <br />
            <em>Challenge.</em>
          </h1>

          <p className="competition-lede">
            Build a useful idea for a real-world brief, then defend it with
            the clarity and craft of an engineer.
          </p>

          <a
            className="button competition-button"
            href="#register"
          >
            Register your team <ArrowUpRight />
          </a>
        </div>

        <div className="brief-stamp">
          <span>EFx INDIA 2027</span>

          <strong>
            MAKE
            <br />
            IT
            <br />
            <em>REAL.</em>
          </strong>

          <small>12—14 MAR / PALAI</small>
        </div>
      </section>

      <section className="competition-content">
        <div className="competition-brief">
          <p className="section-kicker">THE BRIEF</p>

          <h2>Prototype under pressure.</h2>

          <p>
            Teams will receive a practical challenge inspired by everyday life
            and the communities around us. Research, sketch, prototype, test,
            and present one thoughtful solution.
          </p>

          <div className="competition-facts">
            <div>
              <span>TEAM SIZE</span>
              <strong>2—4 makers</strong>
            </div>

            <div>
              <span>FORMAT</span>
              <strong>Live prototype</strong>
            </div>

            <div>
              <span>LEVEL</span>
              <strong>Open to all</strong>
            </div>
          </div>
        </div>

        <div className="criteria-panel">
          <p className="section-kicker">HOW IT'S JUDGED</p>

          {[
            ['01', 'The idea', 'Is the problem worth solving?'],
            [
              '02',
              'The build',
              'Does the prototype make it tangible?',
            ],
            [
              '03',
              'The story',
              'Can the team make us believe?',
            ],
          ].map(([number, title, text]) => (
            <div className="criteria-row" key={number}>
              <span>{number}</span>

              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="competition-footer" id="register">
        <div>
          <p className="section-kicker">READY TO BUILD?</p>

          <h2>
            Bring your
            <br />
            <em>best thinking.</em>
          </h2>
        </div>

        <div>
          <p>
            Registration includes the full challenge kit, workspace, mentor
            check-ins, and a place on the final showcase floor.
          </p>

          <a
            className="button"
            href="mailto:efx@sjcetpalai.ac.in"
          >
            Register a team <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  );
}

function EventCard({
  href,
  tone,
  number,
  type,
  title,
  text,
}: {
  href?: string;
  tone: string;
  number: string;
  type: string;
  title: React.ReactNode;
  text: string;
}) {
  return (
    <article className={`event-card ${tone}`}>
      <div className="card-top">
        <span>
          {number} / {type}
        </span>

        <ArrowUpRight />
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      {href ? (
        <a className="card-foot" href={href}>
          <span>View competition</span>
          <span className="card-arrow">↗</span>
        </a>
      ) : (
        <div className="card-foot">
          <span>Open to all</span>
          <span className="card-arrow">↗</span>
        </div>
      )}
    </article>
  );
}

export default App;