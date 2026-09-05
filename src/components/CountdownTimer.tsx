import { useEffect, useState } from 'react';

const EVENT_DATE = new Date('2027-01-21T00:00:00+05:30');

function getTimeLeft() {
  const diff = Math.max(EVENT_DATE.getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    ['DAYS', time.days],
    ['HOURS', time.hours],
    ['MINUTES', time.minutes],
    ['SECONDS', time.seconds],
  ];

  return (
    <div className="countdown-row">
      {units.map(([label, value], index) => (
        <div className="countdown-unit" key={label}>
          {index > 0 && <span className="countdown-sep">:</span>}
          <div className="countdown-figure">
            <span className="countdown-value">{String(value).padStart(2, '0')}</span>
            <span className="countdown-label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}