import { useMemo, useState } from 'react';
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

  const items = useMemo(
    () =>
      schedule[day].filter(
        (item) =>
          (track === 'All tracks' || item.tag === track) &&
          (!hideLogistics || !['FOOD & SOCIAL', 'TRANSPORT'].includes(item.tag))
      ),
    [day, track, hideLogistics]
  );

  const grouped = items.reduce<Record<string, typeof items>>((result, item) => {
    (result[item.tag] ??= []).push(item);
    return result;
  }, {});

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

          <div className="track-columns">
            {Object.keys(grouped).length === 0 ? (
              <p className="no-events-notice">No events scheduled for this track filter.</p>
            ) : (
              Object.entries(grouped).map(([name, trackItems]) => (
                <div className={`track-column track-${trackClass(name)}`} key={name}>
                  <h2>{name}</h2>
                  {trackItems.map((item) => (
                    <article className="track-item" key={`${item.time}-${item.title}`}>
                      <time>{item.time}</time>
                      <strong>{item.place}</strong>
                      <span>{item.title}</span>
                    </article>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
