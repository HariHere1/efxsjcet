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
  const content = (
    <>
      <div className="card-top">
        <span>{number} / {type}</span>
        <ArrowUpRight className="card-top-arrow" />
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="card-foot">
        <span>View competition</span>
        <ArrowUpRight className="card-arrow" />
      </div>
    </>
  );
  return href ? (
    <a className={`event-card ${tone}`} href={href}>
      {content}
    </a>
  ) : (
    <article className={`event-card ${tone}`}>{content}</article>
  );
}
