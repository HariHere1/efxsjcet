import { ArrowUpRight } from 'lucide-react';
import { Competition } from '../data/competitions';

type CompetitionPageProps = {
  competition: Competition;
};

export function CompetitionPage({ competition }: CompetitionPageProps) {
  const { kickerNumber, prefix, emphasis, lede, dateLabel, briefHeading, briefText, facts, criteria } = competition;

  return (
    <main className={`competition-page`}>
      <section className="competition-hero">
        <div>
          <a className="back-link" href="#top">
            <ArrowUpRight /> Back to EFx India 2027
          </a>

          <p className="section-kicker">/ {kickerNumber} &nbsp; COMPETITION</p>

          <h1>
            {prefix}
            <br />
            <em>{emphasis}</em>
          </h1>

          <p className="competition-lede">{lede}</p>
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
          <small>{dateLabel}</small>
        </div>
      </section>

      <section className="competition-content">
        <div className="competition-brief">
          <p className="section-kicker">THE BRIEF</p>
          <h2>{briefHeading}</h2>
          <p>{briefText}</p>

          <div className="competition-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="criteria-panel">
          <p className="section-kicker">HOW IT'S JUDGED</p>
          {criteria.map(([number, title, text]) => (
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
      </section>
    </main>
  );
}