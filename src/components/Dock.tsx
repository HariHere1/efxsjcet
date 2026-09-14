import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Home, Calendar, MapPin, Newspaper } from 'lucide-react';
import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/SJCET LOGO.png';
import { navItems } from '../data/navItems';

type NavbarProps = {
  activeCompetition: boolean;
  explorePage: boolean;
  accommodationPage: boolean;
  onNavClick: () => void;
};

const NAV_ICONS: Record<string, React.ReactNode> = {
  'Home': <Home size={18} />,
  'Events': <Calendar size={18} />,
  'Schedule': <Calendar size={18} />,
  'Stay & Payment': <MapPin size={18} />,
  'Explore Kerala': <MapPin size={18} />,
  'Updates': <Newspaper size={18} />,
};

function navHref(item: string): string {
  if (item === 'Explore Kerala') return '#explore-kerala';
  if (item === 'Stay & Payment') return '#accommodation';
  if (item == 'Home') return '#top';
  return `#competition/${item.toLowerCase().replace(/ /g, '-')}`;
}

function isActive(
  item: string,
  index: number,
  activeCompetition: boolean,
  explorePage: boolean,
  accommodationPage: boolean,
): boolean {
  if (item === 'Explore Kerala') return explorePage;
  if (item === 'Stay & Payment') return accommodationPage;
  if (item === 'Home') return !activeCompetition && !explorePage && !accommodationPage;
  if (index === 0) return !activeCompetition && !explorePage && !accommodationPage;
  return false;
}

interface MobileDockIconProps {
  mouseX: any;
  item: string;
  index: number;
  active: boolean;
  onClick: () => void;
}

function MobileDockIcon({ mouseX, item, index, active, onClick }: MobileDockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [42, 58, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

  return (
    <motion.a
      ref={ref}
      style={{ width }}
      className={`mobile-dock-icon ${active ? 'active' : ''}`}
      href={navHref(item)}
      onClick={onClick}
      title={item}
    >
      <div className="mobile-dock-svg">{NAV_ICONS[item] ?? <Home size={18} />}</div>
      <span className="mobile-dock-tooltip">{item}</span>
    </motion.a>
  );
}

export function Dock({ activeCompetition, explorePage, accommodationPage, onNavClick }: NavbarProps) {
  const mouseX = useMotionValue(Infinity);

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
              className={isActive(item, index, activeCompetition, explorePage, accommodationPage) ? 'active' : ''}
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
        <motion.nav
          className="mobile-dock-pill"
          aria-label="Mobile Dock navigation"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {navItems.map((item, index) => (
            <MobileDockIcon
              key={item}
              mouseX={mouseX}
              item={item}
              index={index}
              active={isActive(item, index, activeCompetition, explorePage, accommodationPage)}
              onClick={onNavClick}
            />
          ))}
        </motion.nav>
      </div>
    </>
  );
}
