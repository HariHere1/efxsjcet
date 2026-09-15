import { useEffect, useState } from 'react';
import asmeLogo from '../assets/images/asme-efx-logo.png';
import sjcetLogo from '../assets/images/SJCET LOGO.png';

interface LoadingScreenProps {
  /** Called once the bar hits 100% and the fade-out finishes. */
  onFinish: () => void;
  /** Floor on how long the screen stays up, so it never just flashes. */
  minDisplayMs?: number;
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // a bad asset shouldn't block loading
    img.src = src;
  });
}

export function LoadingScreen({ onFinish, minDisplayMs = 1400 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let cancelled = false;
    let pageLoaded = document.readyState === 'complete';

    if (!pageLoaded) {
      window.addEventListener('load', () => { pageLoaded = true; }, { once: true });
    }

    // Preloading the two logos gets progress moving quickly and reliably,
    // independent of how long the rest of the page takes to settle.
    let logosReady = false;
    Promise.all([preloadImage(asmeLogo), preloadImage(sjcetLogo)]).then(() => {
      logosReady = true;
    });

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;

      // Target the bar towards: a slow eased crawl by default, jumping ahead
      // once the logos are in and again once the whole page has loaded.
      let target = Math.min(0.85, elapsed / 2800);
      if (logosReady) target = Math.max(target, 0.7);
      if (pageLoaded) target = 1;

      setProgress((current) => current + (target - current) * 0.15);

      if (pageLoaded && elapsed >= minDisplayMs) {
        setProgress(1);
        setFading(true);
        window.setTimeout(() => {
          if (!cancelled) onFinish();
        }, 550); // keep in sync with the CSS fade duration below
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [minDisplayMs, onFinish]);

  return (
    <div className={`loading-screen ${fading ? 'is-fading' : ''}`} role="status" aria-live="polite">
      <div className="loading-content">
        <div className="loading-logos">
          <img className="loading-logo loading-logo-asme" src={asmeLogo} alt="ASME EFx" />
          <span className="loading-divider" aria-hidden="true" />
          <img className="loading-logo loading-logo-sjcet" src={sjcetLogo} alt="SJCET Palai" />
        </div>

        <div className="loading-bar-track" aria-hidden="true">
          <div
            className="loading-bar-fill"
            style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }}
          />
        </div>

        <span className="loading-percent">
          {Math.round(Math.min(Math.max(progress, 0), 1) * 100)}%
        </span>
      </div>
    </div>
  );
}