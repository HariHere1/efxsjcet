import { useEffect, useRef } from 'react';

interface MeteorsProps {
  count?: number;
}

export function Meteors({ count = 18 }: MeteorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing meteors
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const meteor = document.createElement('span');
      meteor.className = 'meteor';

      // Randomise position along the top + right edges
      const startTop = Math.random() * 70 - 20;   // -20% to 50%
      const startLeft = Math.random() * 110 - 10;  // -10% to 100%

      const duration = 2.5 + Math.random() * 4;    // 2.5s – 6.5s
      const delay = Math.random() * 8;              // 0s – 8s

      // Vary height for comet-tail length
      const height = 40 + Math.random() * 80;
      const opacity = 0.3 + Math.random() * 0.35;

      meteor.style.cssText = `
        top: ${startTop}%;
        left: ${startLeft}%;
        height: ${height}px;
        opacity: 0;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        filter: blur(${Math.random() < 0.3 ? 0.5 : 0}px);
        --meteor-opacity: ${opacity};
      `;

      container.appendChild(meteor);
    }
  }, [count]);

  return <div className="meteors-container" ref={containerRef} aria-hidden="true" />;
}
