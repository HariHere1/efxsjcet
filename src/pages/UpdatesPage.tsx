import { ArrowUpRight } from 'lucide-react';

const updates = [
  {
    date: '18.08.26',
    title: 'Registrations are now open for EFx India 2027',
    description: 'Reserve your place and get ready for four days of engineering, ideas, and community.',
    href: 'https://konfhub.com/efxindia2027',
  },
  {
    date: 'COMING SOON',
    title: 'More event announcements are on the way',
    description: 'We will share competition details, venue information, and helpful updates here.',
    href: '#events',
  },
];

export function UpdatesPage() {
  return (
    <main className="listing-page updates-page">
      <section className="listing-hero section-grid">
        <div className="section-kicker">/ UPDATES</div>
        <div className="listing-hero-copy">
          <h1>
            What&apos;s <em>new.</em>
          </h1>
          <p>News and announcements from the EFx India 2027 team.</p>
        </div>
      </section>

      <section className="updates-listing section-grid">
        <div className="section-kicker">/ NEWSROOM</div>
        <div className="updates-list">
          {updates.map((update) => (
            <a
              className="update-row"
              href={update.href}
              key={update.title}
              target={update.href.startsWith('http') ? '_blank' : undefined}
              rel={update.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <time>{update.date}</time>
              <div>
                <h2>{update.title}</h2>
                <p>{update.description}</p>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
