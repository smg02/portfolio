import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  time: number;
  width: number;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brushRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const points: TrailPoint[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let prevX = -100;
    let prevY = -100;
    let rafId: number;

    const TRAIL_DURATION = 520; // milliseconds ink trail lasts before fully soaking into paper

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (brushRef.current) {
        brushRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check context under cursor
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, select, textarea');
      const text = target?.closest('p, h1, h2, h3, h4, h5, h6, blockquote, .dropcap, li span, code');
      setIsHovered(!!(interactive || text));

      // Calculate speed for dynamic calligraphic line width
      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const speed = Math.hypot(dx, dy);
      prevX = mouseX;
      prevY = mouseY;

      // Faster speed = thinner dynamic stroke; slower = rich fuller ink
      const strokeWidth = Math.max(1.8, Math.min(6.5, 7.0 - speed * 0.12));

      points.push({
        x: mouseX,
        y: mouseY,
        time: performance.now(),
        width: strokeWidth
      });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Render loop: draws calligraphic brush strokes and smoothly dissolves them
    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Remove expired trail points
      while (points.length > 0 && now - points[0].time > TRAIL_DURATION) {
        points.shift();
      }

      if (points.length > 1) {
        // Read theme ink color dynamically
        const isDark = document.documentElement.classList.contains('dark');
        const inkBase = isDark ? '246, 243, 235' : '18, 19, 20';

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw calligraphic curves using midpoint bezier interpolation
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const age = now - p2.time;
          const life = Math.max(0, 1 - age / TRAIL_DURATION);

          // Quadratic midpoints for organic, silky smooth ink lines
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);

          ctx.lineWidth = p2.width * (0.4 + life * 0.6);
          ctx.strokeStyle = `rgba(${inkBase}, ${life * 0.75})`;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Calligraphic Ink Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[999997] select-none"
      />

      {/* Realistic Calligraphy Brush / Dipping Pen */}
      <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
        <div
          ref={brushRef}
          className={`fixed top-0 left-0 transition-opacity duration-150 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform' }}
        >
          <div
            className={`transition-transform duration-150 ease-out origin-top-left ${
              isClicking
                ? 'scale-90 translate-y-1 rotate-[-48deg]'
                : isHovered
                ? 'scale-105 rotate-[-44deg] translate-y-[-1px]'
                : 'rotate-[-36deg] scale-100'
            }`}
          >
            {/* SVG Calligraphy Brush: Precision Bristle Tip touches (0,0) exactly */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              fill="none"
              className="drop-shadow-[1px_2px_3px_rgba(0,0,0,0.3)]"
            >
              {/* Brush Handle: Vintage Tapered Bamboo / Wood */}
              <path
                d="M16 16L38 38C40 40 43 40 45 38C47 36 47 33 45 31L23 9L16 16Z"
                fill="var(--card-bg)"
                stroke="var(--border-ink)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Decorative Handle Rings */}
              <line x1="25" y1="11" x2="32" y2="18" stroke="var(--border-ink)" strokeWidth="1.2" opacity="0.6" />
              <line x1="33" y1="19" x2="40" y2="26" stroke="var(--border-ink)" strokeWidth="1.2" opacity="0.6" />

              {/* Ferrule: Antique Brass / Metal Collar */}
              <path
                d="M11 11L18 18L15 21L8 14L11 11Z"
                fill="var(--border-ink)"
                stroke="var(--border-ink)"
                strokeWidth="1"
              />

              {/* Bristle Tip: Pointed Calligraphy Horsehair / Sumi Bristles */}
              <path
                d="M0 0C3 5 7 11 11 11L14 8C11 4 5 1 0 0Z"
                fill="var(--border-ink)"
                stroke="var(--border-ink)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Wet Ink Highlight on Bristle Tip */}
              <circle cx="2" cy="2" r="1.5" fill="var(--bg-page)" opacity="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
