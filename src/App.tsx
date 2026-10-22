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

export type RouteType =
  | 'home'
  | 'events'
  | 'event-detail'
  | 'schedule'
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

  // 4. Explore Kerala route: #explore-kerala
  if (hash === '#explore-kerala') {
    return { type: 'explore' };
  }

  // 5. Accommodation route: #accommodation
  if (hash === '#accommodation') {
    return { type: 'accommodation' };
  }

  // 6. Booking / stay route: #booking..., #stay
  if (hash.startsWith('#booking') || hash === '#stay') {
    return { type: 'booking' };
  }

  // 7. Legacy competition routes: #competition/...
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
        <div className="footer-meta">
          <span>21-24 JANUARY 2027</span>
          <span>PALAI, KERALA, INDIA</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
