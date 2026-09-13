import { useEffect, useRef } from 'react';

const WORDS = [
  { text: 'ASME EFx', color: 'white' },
  { text: '×',        color: 'orange'  },
  { text: 'SJCET',    color: 'coral' },
  { text: '×',        color: 'orange'  },
  { text: 'ASME EFx', color: 'white'  },
  { text: '×',        color: 'orange' },
  { text: 'SJCET',    color: 'coral'  },
  { text: '×',        color: 'orange' },
] as const;

/** Renders a single looping marquee row */
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);
  const baseSpeed = reverse ? 0.6 : -0.6; // px/frame

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // Ensure we measure the single set of elements
    const singleSet = row.firstElementChild as HTMLElement;
    if (!singleSet) return;

    let singleSetWidth = singleSet.offsetWidth || 1;

    const wrapPosition = (position: number) => {
      if (singleSetWidth <= 0) return position;
      return ((position % singleSetWidth) + singleSetWidth) % singleSetWidth - singleSetWidth;
    };

    const normalizePosition = () => {
      if (singleSetWidth <= 0) return;
      posRef.current = wrapPosition(posRef.current);
    };

    const updateWidth = () => {
      if (singleSet) {
        singleSetWidth = singleSet.offsetWidth || 1;
        normalizePosition();
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(singleSet);

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let decayTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 8);
      const dy = window.scrollY - lastScrollY;

      if (window.scrollY <= 0) {
        lastScrollY = 0;
        lastTime = now;
        velocityRef.current = 0;
        normalizePosition();
        return;
      }

      const sv = (dy / dt) * 16;
      // Clamp scroll velocity to prevent massive jumps
      const clampedSv = Math.max(Math.min(sv, 30), -30);
      velocityRef.current = (reverse ? clampedSv : -clampedSv) * 2;
      lastScrollY = window.scrollY;
      lastTime = now;

      clearTimeout(decayTimer);
      decayTimer = setTimeout(() => {
        velocityRef.current = 0;
      }, 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      const extra = velocityRef.current;
      velocityRef.current *= 0.85;

      posRef.current += baseSpeed + extra;

      // Wrap continuously within [-singleSetWidth, 0] so it NEVER goes blank
      if (singleSetWidth > 0) {
        posRef.current = wrapPosition(posRef.current);
      }

      row.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      clearTimeout(decayTimer);
    };
  }, [reverse]);

  const items = (
    <div className="marquee-content-set">
      {WORDS.map((w, i) => (
        <span className={`marquee-item ${w.color}`} key={i}>
          {w.text}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-row-wrapper">
      <div className="marquee-row" ref={rowRef}>
        {items}
        {items}
        {items}
        {items}
      </div>
    </div>
  );
}

export function ScrollVelocityMarquee() {
  return (
    <section className="marquee-band" aria-hidden="true">
      <MarqueeRow reverse={false} />
      <MarqueeRow reverse={true} />
    </section>
  );
}
