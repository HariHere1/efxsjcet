import { NumberTicker } from './NumberTicker';

const STATS = [
  { value: 8,   suffix: '',   label: 'FEATURED EVENTS'          },
  { value: 800, suffix: '+',  label: 'EXPECTED PARTICIPANTS' },
  { value: 40,  suffix: '+',  label: 'COLLEGES REPRESENTED'  },
] as const;

export function StatsBand() {
  return (
    <section className="stats-band" aria-label="Event statistics">
      {STATS.map(({ value, suffix, label }) => (
        <div className="stats-band-item" key={label}>
          <div className="stats-band-value">
            <NumberTicker value={value} suffix={suffix} duration={1400} />
          </div>
          <span className="stats-band-label">{label}</span>
        </div>
      ))}
    </section>
  );
}
