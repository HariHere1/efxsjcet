import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { events, type EventCategory } from '../data/events';
import type { Day } from '../data/schedule';

const days: Array<{ id: Day | 'all'; label: string }> = [
  { id: 'all', label: 'All days' }, { id: 'day0', label: 'Day 0' }, { id: 'day1', label: 'Day 1' },
  { id: 'day2', label: 'Day 2' }, { id: 'day3', label: 'Day 3' },
];
const categories: Array<EventCategory | 'All categories'> = ['All categories', 'Competition', 'Challenge', 'Presentation', 'Ideathon', 'Impromptu Events'];

export function EventsPage() {
  const [day, setDay] = useState<Day | 'all'>('all');
  const [category, setCategory] = useState<EventCategory | 'All categories'>('All categories');
  const filtered = useMemo(() => events.filter((event) =>
    (day === 'all' || event.days.includes(day)) &&
    (category === 'All categories' || event.category === category)
  ), [day, category]);

  return <main className="listing-page">
    <section className="listing-hero section-grid">
      <div className="section-kicker">/ EVENTS</div>
      <h1>Find your <em>challenge.</em></h1>
      <p>Eight ways to take part in EFx India 2027, from arrival-day ideas to the final showcase.</p>
    </section>
    <section className="event-listing section-grid">
      <div className="filter-bar">
        <div><span className="filter-label">DAY</span>{days.map((item) => <button className={day === item.id ? 'filter-chip active' : 'filter-chip'} onClick={() => setDay(item.id)} key={item.id}>{item.label}</button>)}</div>
        <div><span className="filter-label">CATEGORY</span>{categories.map((item) => <button className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      </div>
      <div className="event-list">
        {filtered.map((event, index) => <a className="event-list-row" href={`/events/${event.id}`} key={event.id}>
          <span className="event-list-number">0{index + 1}</span>
          <div><span className="event-list-category">{event.category}</span><h2>{event.name}</h2><p>{event.plainEnglishLine}</p></div>
          <span className="event-list-days">{event.days.length ? event.days.map((item) => item.replace('day', 'Day ')).join(' · ') : 'Schedule to be announced'}</span>
          <ArrowUpRight />
        </a>)}
      </div>
    </section>
  </main>;
}

export function EventDetailPage({ id }: { id: string }) {
  const event = events.find((item) => item.id === id);
  if (!event) return <main className="listing-page section-grid"><h1>Event not found.</h1><a className="button" href="/events">Back to events</a></main>;
  return <main className="listing-page">
    <section className="detail-hero section-grid"><a className="back-link" href="/events">← All events</a><div className="section-kicker">/ {event.category.toUpperCase()}</div><h1>{event.name}</h1><p>{event.plainEnglishLine}</p></section>
    <section className="detail-grid section-grid">
      <div className="detail-main"><h2>When it happens</h2>{event.slots.length ? event.slots.map((slot) => <div className="detail-slot" key={`${slot.day}-${slot.time}-${slot.title}`}><strong>{slot.day.replace('day', 'Day ')}</strong><span>{slot.time}</span><b>{slot.title}</b></div>) : <p>Schedule to be announced.</p>}</div>
      <aside className="detail-facts"><h2>Event details</h2>{[['Who it’s for', event.whoItsFor], ['Team size', event.teamSize], ['Eligibility', event.eligibility], ['Fee', event.fee], ['Contact', event.contact]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}<a className="button" href={event.rulesLink.startsWith('Mock details') ? '#top' : event.rulesLink}>Rules & guidelines <ArrowUpRight /></a></aside>
    </section>
  </main>;
}
