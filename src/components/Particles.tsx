import { useEffect, useRef } from 'react';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  count?: number; // fallback support
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let hexFormatted = hex.replace('#', '');
  if (hexFormatted.length === 3) {
    hexFormatted = hexFormatted
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const int = parseInt(hexFormatted, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

export function Particles({
  className = '',
  quantity = 100,
  count,
  size = 1.2,
  color = '#ffffff',
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const effectiveCount = count ?? quantity;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const rafID = useRef<number | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener('resize', handleResize);

    // Also use ResizeObserver for container resizing
    let resizeObserver: ResizeObserver | null = null;
    if (canvasContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        initCanvas();
      });
      resizeObserver.observe(canvasContainerRef.current);
    }

    return () => {
      if (rafID.current != null) {
        cancelAnimationFrame(rafID.current);
      }
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [color]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.current.x, mousePosition.current.y]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.current.x - rect.left - w / 2;
      const y = mousePosition.current.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      const w = canvasContainerRef.current.offsetWidth || canvasContainerRef.current.clientWidth || window.innerWidth;
      const h = canvasContainerRef.current.offsetHeight || canvasContainerRef.current.clientHeight || 610;
      canvasSize.current.w = w;
      canvasSize.current.h = h;
      canvasRef.current.width = w * dpr;
      canvasRef.current.height = h * dpr;
      canvasRef.current.style.width = `${w}px`;
      canvasRef.current.style.height = `${h}px`;
      context.current.setTransform(1, 0, 0, 1, 0, 0);
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const w = canvasSize.current.w || window.innerWidth;
    const h = canvasSize.current.h || 610;
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.max(0.6, Math.floor(Math.random() * 2) + size);
    const alpha = parseFloat((Math.random() * 0.4 + 0.3).toFixed(2));
    const targetAlpha = parseFloat((Math.random() * 0.5 + 0.3).toFixed(2));
    const dx = (Math.random() - 0.5) * 0.2 + vx;
    const dy = (Math.random() - 0.5) * 0.2 + vy;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size: cSize, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, cSize, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.max(0.1, alpha)})`;
      context.current.fill();
      context.current.setTransform(1, 0, 0, 1, 0, 0);
      context.current.scale(dpr, dpr);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = effectiveCount;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    const w = canvasSize.current.w || window.innerWidth;
    const h = canvasSize.current.h || 610;

    circles.current.forEach((circle: Circle, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size,
        w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapLogarithm = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapLogarithm > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapLogarithm;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity ?? 20) - circle.translateX) / (ease ?? 50);
      circle.translateY +=
        (mouse.current.y / (staticity ?? 20) - circle.translateY) / (ease ?? 50);

      // circle gets out of the view
      if (
        circle.x < -circle.size ||
        circle.x > w + circle.size ||
        circle.y < -circle.size ||
        circle.y > h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true,
        );
      }
    });
    rafID.current = window.requestAnimationFrame(animate);
  };

  const staticity = 25;
  const ease = 50;

  return (
    <div
      className={`particles-container ${className}`}
      ref={canvasContainerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      onMouseMove={(e) => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <canvas
        ref={canvasRef}
        className="particles-canvas"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
