import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/SJCET LOGO.png';
import { navItems } from '../data/navItems';

type NavbarProps = {
  activeCompetition: boolean;
  explorePage: boolean;
  accommodationPage: boolean;
  bookingPage: boolean;
  onNavClick: () => void;
};

function navHref(item: string): string {
  if (item === 'Explore Kerala') return '#explore-kerala';
  if (item === 'Stay') return '#booking';
  if (item == 'Home') return '#top';
  return `#competition/${item.toLowerCase().replace(/ /g, '-')}`;
}

function isActive(
  item: string,
  index: number,
  activeCompetition: boolean,
  explorePage: boolean,
  accommodationPage: boolean,
  bookingPage: boolean,
): boolean {
  if (item === 'Explore Kerala') return explorePage;
  if (item === 'Stay') return bookingPage;
  if (item === 'Home') return !activeCompetition && !explorePage && !accommodationPage && !bookingPage;
  if (index === 0) return !activeCompetition && !explorePage && !accommodationPage && !bookingPage;
  return false;
}

interface MobileDockIconProps {
  item: string;
  active: boolean;
  onClick: () => void;
}

function MobileDockIcon({ item, active, onClick }: MobileDockIconProps) {
  return (
    <a
      className={`mobile-dock-icon ${active ? 'active' : ''}`}
      href={navHref(item)}
      onClick={onClick}
    >
      <span>{item}</span>
    </a>
  );
}

export function Dock({ activeCompetition, explorePage, accommodationPage, bookingPage, onNavClick }: NavbarProps) {
  return (
    <>
      {/* ── DESKTOP NAVBAR (min-width: 761px) ── */}
      <header className="topbar desktop-navbar" role="banner">
        <a className="brand-lockup" href="#top" aria-label="ASME EFx India 2027 home" onClick={onNavClick}>
          <img className="asme-logo" src={asmeLogo} alt="ASME EFx" />
          <span className="brand-rule" aria-hidden="true">|</span>
          <span className="sjcet-logo-wrap">
            <img className="sjcet-logo" src={sjcetLogo} alt="SJCET Palai" />
          </span>
        </a>

        <nav className="main-nav" aria-label="Desktop navigation">
          {navItems.map((item, index) => (
            <a
              key={item}
              className={isActive(item, index, activeCompetition, explorePage, accommodationPage, bookingPage) ? 'active' : ''}
              href={navHref(item)}
              onClick={onNavClick}
            >
              {item}
            </a>
          ))}
        </nav>

      </header>

      {/* ── MOBILE MAGIC UI DOCK (max-width: 760px) ── */}
      <div className="mobile-dock-container">
        <nav
          className="mobile-dock-pill"
          aria-label="Mobile Dock navigation"
        >
          {navItems.map((item, index) => (
            <MobileDockIcon
              key={item}
              item={item}
              active={isActive(item, index, activeCompetition, explorePage, accommodationPage, bookingPage)}
              onClick={onNavClick}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
