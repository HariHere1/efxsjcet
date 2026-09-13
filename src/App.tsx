import { useEffect, useState } from 'react';
import asmeLogo from './assets/images/asme-efx-logo.png';
import sjcetLogo from './assets/images/SJCET LOGO.png';
import { Dock } from './components/Dock';
import { ExploreKeralaPage } from './pages/ExploreKeralaPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

function isCompetitionRoute(hash: string) {
  return /^#competition\/.+$/.test(hash);
}

function App() {
  const [competitionPage, setCompetitionPage] = useState(isCompetitionRoute(window.location.hash));
  const [explorePage, setExplorePage] = useState(window.location.hash === '#explore-kerala');

  useEffect(() => {
    const handleHashChange = () => {
      setCompetitionPage(isCompetitionRoute(window.location.hash));
      setExplorePage(window.location.hash === '#explore-kerala');
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
        onNavClick={() => {
          // hashchange will handle state; close any open mobile menu via Dock internally
        }}
      />

      {competitionPage ? (
        <NotFoundPage />
      ) : explorePage ? (
        <ExploreKeralaPage />
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
