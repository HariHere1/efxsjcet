import { ArrowUpRight } from 'lucide-react';

type EventCardProps = {
  href?: string;
  tone: string;
  number: string;
  type: string;
  title: React.ReactNode;
  text: string;
};

export function EventCard({ href, tone, number, type, title, text }: EventCardProps) {
  return (
    <article className={`event-card ${tone}`}>
      <div className="card-top">
        <span>{number} / {type}</span>
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
