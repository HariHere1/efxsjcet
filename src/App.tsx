import { useEffect, useState } from 'react';
import asmeLogo from './assets/images/asme-efx-logo.png';
import sjcetLogo from './assets/images/SJCET LOGO.png';
import { Dock } from './components/Dock';
import { AccommodationPage } from './pages/AccommodationPage';
import { BookingPage } from './pages/BookingPage';
import { ExploreKeralaPage } from './pages/ExploreKeralaPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

function isCompetitionRoute(hash: string) {
  return /^#competition\/.+$/.test(hash);
}

function App() {
  const [competitionPage, setCompetitionPage] = useState(isCompetitionRoute(window.location.hash));
  const [explorePage, setExplorePage] = useState(window.location.hash === '#explore-kerala');
  const [accommodationPage, setAccommodationPage] = useState(window.location.hash === '#accommodation');
  const [bookingPage, setBookingPage] = useState(window.location.hash === '#booking');

  useEffect(() => {
    const handleHashChange = () => {
      setCompetitionPage(isCompetitionRoute(window.location.hash));
      setExplorePage(window.location.hash === '#explore-kerala');
      setAccommodationPage(window.location.hash === '#accommodation');
      setBookingPage(window.location.hash === '#booking');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="site-shell">
      <Dock
        activeCompetition={competitionPage}
        explorePage={explorePage}
        accommodationPage={accommodationPage}
        bookingPage={bookingPage}
        onNavClick={() => {
          // hashchange will handle state; close any open mobile menu via Dock internally
        }}
      />

      {competitionPage ? (
        <NotFoundPage />
      ) : explorePage ? (
        <ExploreKeralaPage />
      ) : accommodationPage ? (
        <AccommodationPage />
      ) : bookingPage ? (
        <BookingPage />
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
          <span>21-24 MARCH 2027</span>
          <span>PALAI, KERALA, INDIA</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
