import { useEffect, useState } from 'react';
import { CircleHelp, Menu, X } from 'lucide-react';
import asmeLogo from './assets/images/asme-efx-logo.png';
import sjcetLogo from './assets/images/sjcet-logo.png';
import { navItems } from './data/navItems';
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
  const [menuOpen, setMenuOpen] = useState(false);
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
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="ASME EFx India 2027 home">
          <img className="asme-logo" src={asmeLogo} alt="ASME EFx" />
          <span className="brand-rule">|</span>
          <img className="sjcet-logo" src={sjcetLogo} alt="St. Joseph's College of Engineering and Technology, Palai" />
        </a>
        <nav className={`main-nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a
              className={(index === 0 && !activeCompetition && !explorePage) || (item === 'Explore Kerala' && explorePage) ? 'active' : ''}
              href={item === 'Explore Kerala' ? '#explore-kerala' : index === 0 ? '#top' : `#${item.toLowerCase().replace(/ /g, '-')}`}
              key={item}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Help"><CircleHelp /></button>
          <button className="menu-button icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {activeCompetition ? <CompetitionPage competition={activeCompetition} /> : explorePage ? <ExploreKeralaPage /> : <HomePage />}

      <footer className="footer">
        <div className="footer-brand">
          <img className="asme-logo" src={asmeLogo} alt="ASME EFx" />
          <span className="brand-rule">|</span>
          <img className="sjcet-logo" src={sjcetLogo} alt="SJCET Palai" />
        </div>
        <div className="footer-meta">
          <span>12—14 MARCH 2027</span>
          <span>PALAI, KERALA, INDIA</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
