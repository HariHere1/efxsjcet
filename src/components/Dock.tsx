import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/SJCET NEW LOGO.png';
import { navItems } from '../data/navItems';

type NavbarProps = {
  activeRoute?: string;
  onNavClick: () => void;
};

function navHref(item: string): string {
  if (item === 'Stay') return '#accommodation';
  if (item === 'Updates') return '#updates';
  if (item === 'Home') return '#top';
  return '#top';
}

function isActive(
  item: string,
  activeRoute?: string,
): boolean {
  if (activeRoute) {
    if (item === 'Home') {
      return activeRoute === 'home';
    }
    if (item === 'Updates') return activeRoute === 'updates';
    if (item === 'Stay') return activeRoute === 'booking' || activeRoute === 'accommodation';
    return false;
  }
  if (item === 'Home') return true;
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

export function Dock({
  activeRoute,
  onNavClick,
}: NavbarProps) {
  return (
    <>
      {/* ── DESKTOP NAVBAR (min-width: 761px) ── */}
      <header className="topbar desktop-navbar" role="banner">
        <a className="brand-lockup" href="#top" aria-label="EFx India 2027 home" onClick={onNavClick}>
          <span className="brand-lockup-efx">
            <img className="asme-logo" src={asmeLogo} alt="EFx India 2027" />
          </span>
          <span className="brand-rule" aria-hidden="true" />
          <span className="sjcet-logo-wrap brand-lockup-sjcet">
            <img className="sjcet-logo" src={sjcetLogo} alt="SJCET Palai" />
          </span>
        </a>

        <nav className="main-nav" aria-label="Desktop navigation">
          {navItems.map((item) => (
            <a
              key={item}
              className={isActive(item, activeRoute) ? 'active' : ''}
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
        <nav className="mobile-dock-pill" aria-label="Mobile Dock navigation">
          {navItems.map((item) => (
            <MobileDockIcon
              key={item}
              item={item}
              active={isActive(item, activeRoute)}
              onClick={onNavClick}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
