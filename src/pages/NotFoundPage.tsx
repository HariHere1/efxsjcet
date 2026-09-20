import { ArrowUpRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-content">
        <h1><em>404</em> <br/>Page Not Found</h1>
        <p>
          This competition page is coming soon. Check back as EFx India 2027
          takes shape.
        </p>
        <a className="back-link" href="#top">
          Back to homepage <ArrowUpRight />
        </a>
      </section>
    </main>
  );
}
