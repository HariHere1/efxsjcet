import { useEffect, useState } from 'react';
import asmeLogo from './assets/images/asme-efx-logo.png';
import sjcetLogo from './assets/images/SJCET NEW LOGO.png';
import { Dock } from './components/Dock';
import { LoadingScreen } from './components/LoadingScreen';
import { BookingPage } from './pages/BookingPage';
import { ExploreKeralaPage } from './pages/ExploreKeralaPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { EventsPage, EventDetailPage } from './pages/EventsPage';
import { SchedulePage } from './pages/SchedulePage';
import { UpdatesPage } from './pages/UpdatesPage';
import { X } from 'lucide-react';

export type RouteType =
  | 'home'
  | 'events'
  | 'event-detail'
  | 'schedule'
  | 'updates'
  | 'explore'
  | 'accommodation'
  | 'booking'
  | 'not-found';

export interface RouteInfo {
  type: RouteType;
  id?: string;
}

export function parseRoute(): RouteInfo {
  const hash = window.location.hash || '';
  const path = window.location.pathname || '';

  // 1. Event detail route: #events/xyz, #event/xyz, /events/xyz
  const hashDetail = hash.match(/^#(?:events|event)\/(.+)$/);
  if (hashDetail && hashDetail[1]) {
    return { type: 'event-detail', id: hashDetail[1] };
  }
  if (path.startsWith('/events/') && path.length > '/events/'.length) {
    return { type: 'event-detail', id: path.slice('/events/'.length) };
  }

  // 2. Events list route: #events, #event, /events
  if (hash === '#events' || hash === '#event' || path === '/events') {
    return { type: 'events' };
  }

  // 3. Schedule route: #schedule, /schedule
  if (hash === '#schedule' || path === '/schedule') {
    return { type: 'schedule' };
  }

  // 4. Updates route: #updates, /updates
  if (hash === '#updates' || path === '/updates') {
    return { type: 'updates' };
  }

  // 5. Explore Kerala route: #explore-kerala
  if (hash === '#explore-kerala') {
    return { type: 'explore' };
  }

  // 6. Accommodation route: #accommodation
  if (hash === '#accommodation') {
    return { type: 'accommodation' };
  }

  // 7. Booking / stay route: #booking..., #stay
  if (hash.startsWith('#booking') || hash === '#stay') {
    return { type: 'booking' };
  }

  // 8. Legacy competition routes: #competition/...
  if (/^#competition\/.+$/.test(hash)) {
    return { type: 'not-found' };
  }

  return { type: 'home' };
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState<RouteInfo>(parseRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setRouteInfo(parseRoute());
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <div className="site-shell">
      <Dock
        activeRoute={routeInfo.type}
        onNavClick={() => {
          // Handled via hashchange/popstate
        }}
      />

      {routeInfo.type === 'events' ? (
        <EventsPage />
      ) : routeInfo.type === 'event-detail' && routeInfo.id ? (
        <EventDetailPage id={routeInfo.id} />
      ) : routeInfo.type === 'schedule' ? (
        <SchedulePage />
      ) : routeInfo.type === 'updates' ? (
        <UpdatesPage />
      ) : routeInfo.type === 'explore' ? (
        <ExploreKeralaPage />
      ) : routeInfo.type === 'accommodation' ? (
        <BookingPage />
      ) : routeInfo.type === 'booking' ? (
        <BookingPage />
      ) : routeInfo.type === 'not-found' ? (
        <NotFoundPage />
      ) : (
        <HomePage />
      )}

      <footer className="footer">
        <div className="footer-brand">
          <img className="asme-logo" src={asmeLogo} alt="ASME EFx" />
          <span className="brand-rule" aria-hidden="true">|</span>
          <span className="sjcet-logo-wrap">
            <img className="sjcet-logo" src={sjcetLogo} alt="SJCET Palai" />
          </span>
        </div>
        <div className="footer-social-group">
          <span className="footer-social-label">Follow us on</span>
          <div className="footer-social" aria-label="Follow EFx India 2027 on social media">
          <a
            href="https://www.instagram.com/asme_sjcet/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/asme-sjcet-student-chapter/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://x.com/ASMESJCETX"
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter"
          >
            <X aria-hidden="true" size={20} />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=asmesjcet@gmail.com" aria-label="Email">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
