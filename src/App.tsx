import { useEffect, useState } from 'react';
import asmeLogo from './assets/images/asme-efx-logo.png';
import sjcetLogo from './assets/images/sjcet-logo.png';
import { Dock } from './components/Dock';
import { CompetitionPage } from './pages/CompetitionPage';
import { ExploreKeralaPage } from './pages/ExploreKeralaPage';
import { HomePage } from './pages/HomePage';
import { getCompetitionById } from './data/competitions';

function parseCompetitionId(hash: string) {
  // expects '#competition/e-hpvc'
  const match = hash.match(/^#competition\/(.+)$/);
  return match ? match[1] : null;
}

function App() {
  const [competitionId, setCompetitionId] = useState(parseCompetitionId(window.location.hash));
  const [explorePage, setExplorePage] = useState(window.location.hash === '#explore-kerala');

  useEffect(() => {
    const handleHashChange = () => {
      setCompetitionId(parseCompetitionId(window.location.hash));
      setExplorePage(window.location.hash === '#explore-kerala');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeCompetition = competitionId ? getCompetitionById(competitionId) : undefined;

  return (
    <div className="site-shell">
      <Dock
        activeCompetition={!!activeCompetition}
        explorePage={explorePage}
        onNavClick={() => {
          // hashchange will handle state; close any open mobile menu via Dock internally
        }}
      />

      {activeCompetition ? (
        <CompetitionPage competition={activeCompetition} />
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
