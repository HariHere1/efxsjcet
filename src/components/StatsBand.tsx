import { NumberTicker } from './NumberTicker';

const STATS = [
  { value: 10,   suffix: '',   label: 'COMPETITIONS'          },
  { value: 500, suffix: '+',  label: 'EXPECTED PARTICIPANTS' },
  { value: 40,  suffix: '+',  label: 'COLLEGES REPRESENTED'  },
  { value: 24,  suffix: 'H',  label: 'WORKSHOP HOURS'        },
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
