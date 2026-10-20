import { useEffect, useMemo, useState } from 'react';
import { schedule, type Day } from '../data/schedule';

const tracks = [
  'All tracks',
  'E-HPVC',
  'SDC',
  'IAM3D',
  'FOOD & SOCIAL',
  'CHECK-INS',
  'CEREMONY',
  'IMPROMPTU EVENTS',
  'PAPER PRESENTATION',
  'TRANSPORT',
  'IDEATHON',
  'EVALUATIONS',
];

const trackClass = (track: string) => track.toLowerCase().replace(/[^a-z]+/g, '-');
const eventDates: Record<Day, string> = {
  day0: '2027-01-21',
  day1: '2027-01-22',
  day2: '2027-01-23',
  day3: '2027-01-24',
};
const timeToMinutes = (value: string) => {
  const match = value.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') hours += 12;
  return hours * 60 + Number(match[2]);
};

const dayLabels: Array<{ id: Day; label: string }> = [
  { id: 'day0', label: 'Day 0 · Arrival' },
  { id: 'day1', label: 'Day 1' },
  { id: 'day2', label: 'Day 2' },
  { id: 'day3', label: 'Day 3' },
];

export function SchedulePage() {
  const [day, setDay] = useState<Day>('day0');
  const [track, setTrack] = useState('All tracks');
  const [hideLogistics, setHideLogistics] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(
    () =>
      schedule[day].filter(
        (item) =>
          (track === 'All tracks' || item.tag === track) &&
          (!hideLogistics || !['FOOD & SOCIAL', 'TRANSPORT'].includes(item.tag))
      ),
    [day, track, hideLogistics]
  );

  const groupedByTime = items.reduce<Record<string, typeof items>>((result, item) => {
    (result[item.time] ??= []).push(item);
    return result;
  }, {});

  const spotlight = useMemo(() => {
    if (!items.length) return null;

    const eventDate = new Date(`${eventDates[day]}T00:00:00`);
    const isEventDay =
      now.getFullYear() === eventDate.getFullYear() &&
      now.getMonth() === eventDate.getMonth() &&
      now.getDate() === eventDate.getDate();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const active = isEventDay
      ? items.find((item) => {
          const start = timeToMinutes(item.time);
          const endMatch = item.time.match(/–\s*(\d+):(\d+)\s*(AM|PM)/i);
          if (!endMatch) return start <= currentMinutes;
          let endHours = Number(endMatch[1]) % 12;
          if (endMatch[3].toUpperCase() === 'PM') endHours += 12;
          return start <= currentMinutes && currentMinutes <= endHours * 60 + Number(endMatch[2]);
        })
      : undefined;
    const next = items.find((item) => timeToMinutes(item.time) > currentMinutes) ?? items[0];
    return { label: active ? 'Now' : 'Next up', item: active ?? next };
  }, [day, items, now]);

  return (
    <main className="listing-page schedule-page">
      <section className="listing-hero section-grid">
        <div className="section-kicker">/ FULL SCHEDULE</div>
        <div className="listing-hero-copy">
          <h1>
            Every track, <em>in view.</em>
          </h1>
          <p>
            Filter the official agenda by day and track. On smaller screens, use the track filter to focus your view.
          </p>
        </div>
      </section>

      <section className="full-schedule section-grid">
        <div className="section-kicker">/ AGENDA</div>
        <div className="full-schedule-content">
          <div className="schedule-controls">
            <div className="day-tabs">
              {dayLabels.map((item) => (
                <button
                  key={item.id}
                  className={`day-tab ${day === item.id ? 'active' : ''}`}
                  onClick={() => setDay(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={hideLogistics}
                onChange={(event) => setHideLogistics(event.target.checked)}
              />
              <span>Hide meals &amp; buses</span>
            </label>
          </div>

          <div className="track-chips">
            {tracks.map((item) => (
              <button
                key={item}
                className={`filter-chip ${track === item ? 'active' : ''}`}
                onClick={() => setTrack(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="track-select-label">
            <span>TRACK</span>
            <select value={track} onChange={(event) => setTrack(event.target.value)}>
              {tracks.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          {spotlight ? (
            <aside className={`schedule-spotlight ${spotlight.label === 'Now' ? 'is-now' : ''}`}>
              <span className="spotlight-label">{spotlight.label}</span>
              <div>
                <strong>{spotlight.item.title}</strong>
                <span>{spotlight.item.time} · {spotlight.item.place}</span>
              </div>
              <span className={`track-badge track-${trackClass(spotlight.item.tag)}`}>{spotlight.item.tag}</span>
            </aside>
          ) : null}

          <div className="schedule-timeline">
            {Object.keys(groupedByTime).length === 0 ? (
              <p className="no-events-notice">No events scheduled for this track filter.</p>
            ) : (
              Object.entries(groupedByTime)
                .sort(([first], [second]) => timeToMinutes(first) - timeToMinutes(second))
                .map(([time, timeItems]) => (
                <div className="timeline-row" key={time}>
                  <time>{time}</time>
                  <div className="timeline-events">
                    {timeItems.map((item) => (
                      <article className={`timeline-card track-${trackClass(item.tag)}`} key={`${item.time}-${item.title}`}>
                        <span className={`track-badge track-${trackClass(item.tag)}`}>{item.tag}</span>
                        <strong>{item.title}</strong>
                        <span>{item.place}</span>
                      </article>
                    ))}
                  </div>
                </div>
                ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
