import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { events, type EventCategory } from '../data/events';
import type { Day } from '../data/schedule';

const days: Array<{ id: Day | 'all'; label: string }> = [
  { id: 'all', label: 'All days' },
  { id: 'day0', label: 'Day 0' },
  { id: 'day1', label: 'Day 1' },
  { id: 'day2', label: 'Day 2' },
  { id: 'day3', label: 'Day 3' },
];

const categories: Array<EventCategory | 'All categories'> = [
  'All categories',
  'Competition',
  'Challenge',
  'Presentation',
  'Ideathon',
  'Impromptu Events',
];

export function EventsPage() {
  const [day, setDay] = useState<Day | 'all'>('all');
  const [category, setCategory] = useState<EventCategory | 'All categories'>('All categories');

  const filtered = useMemo(
    () =>
      events.filter(
        (event) =>
          (day === 'all' || event.days.includes(day)) &&
          (category === 'All categories' || event.category === category)
      ),
    [day, category]
  );

  return (
    <main className="listing-page events-page">
      <section className="listing-hero section-grid">
        <div className="section-kicker">/ EVENTS</div>
        <div className="listing-hero-copy">
          <h1>
            Find your <em>challenge.</em>
          </h1>
          <p>
            Eight ways to take part in EFx India 2027, from arrival-day ideas to the final showcase.
          </p>
        </div>
      </section>

      <section className="event-listing section-grid">
        <div className="filter-bar">
          <div className="filter-group">
            <span className="filter-label">DAY</span>
            <div className="filter-chips-wrap">
              <select
                value={day}
                className="filter-select"
                onChange={(event) => setDay(event.target.value as Day | 'all')}
              >
                {days.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">CATEGORY</span>
            <div className="filter-chips-wrap">
              <select
                value={category}
                className="filter-select"
                onChange={(event) => setCategory(event.target.value as EventCategory | 'All categories')}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="event-list">
          {filtered.length === 0 ? (
            <p className="no-events-notice">No competitions or events match the selected filters.</p>
          ) : (
            filtered.map((event, index) => (
              <a className="event-list-row" href={`#events/${event.id}`} key={event.id}>
                <span className="event-list-number">0{index + 1}</span>
                <div className="event-list-main">
                  <span className="event-list-category">{event.category}</span>
                  <h2>{event.name}</h2>
                  <p>{event.plainEnglishLine}</p>
                </div>
                <span className="event-list-days">
                  {event.days.length
                    ? event.days.map((item) => item.replace('day', 'Day ')).join(' · ')
                    : 'Schedule TBA'}
                </span>
                <ArrowUpRight className="event-list-arrow" />
              </a>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export function EventDetailPage({ id }: { id: string }) {
  const event = events.find((item) => item.id === id);
  if (!event) {
    return (
      <main className="listing-page section-grid">
        <div className="section-kicker">/ 404</div>
        <div className="listing-hero-copy">
          <h1 style={{ color: '#ffffff', margin: '20px 0' }}>Event not found.</h1>
          <a className="button" href="#events">
            Back to events
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="listing-page detail-page">
      <section className="detail-hero section-grid">
        <div className="section-kicker">/ {event.category.toUpperCase()}</div>
        <div className="detail-hero-content">
          <a className="back-link" href="#events">
            ← All events
          </a>
          <h1>{event.name}</h1>
          <p>
            {event.plainEnglishLine}
          </p>
        </div>
      </section>

      <section className="detail-content section-grid">
        <div className="section-kicker">/ DETAILS &amp; SCHEDULE</div>
        <div className="detail-grid">
          <div className="detail-main">
            <div className="detail-section-heading">
              <span className="detail-eyebrow">01 / TIMING</span>
              <h2>When it happens</h2>
            </div>
            {event.slots.length ? (
              <div className="detail-slots">
                {event.slots.map((slot) => (
                  <div className="detail-slot" key={`${slot.day}-${slot.time}-${slot.title}`}>
                    <strong>{slot.day.replace('day', 'Day ')}</strong>
                    <span className="detail-slot-time">{slot.time}</span>
                    <b className="detail-slot-title">{slot.title}</b>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events-notice">Schedule to be announced.</p>
            )}
            {event.ruleHighlights?.length ? (
              <div className="detail-rules">
                <div className="detail-section-heading">
                  <span className="detail-eyebrow">02 / THE BRIEF</span>
                  <h2>How to compete</h2>
                </div>
                <div className="rule-cards">
                  {event.ruleHighlights.map((rule, index) => (
                    <div className="rule-card" key={rule}>
                      <span className="rule-card-number">{String(index + 1).padStart(2, '0')}</span>
                      <p>{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="detail-rulebook">
              <div className="detail-section-heading">
                <span className="detail-eyebrow">OFFICIAL RULEBOOK</span>
                <h2>Download rulebook</h2>
              </div>
              {event.rulesLink.startsWith('/') || event.rulesLink.startsWith('http') ? (
                <a
                  className="button detail-rules-btn"
                  href={event.rulesLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download rule book <ArrowUpRight />
                </a>
              ) : (
                <p className="detail-rules-coming-soon">Rulebook coming soon.</p>
              )}
              {event.rulesSource ? (
                <p className="detail-source-note">{event.rulesSource}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
