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

    // Fast, responsive trail duration (soft and snappy)
    const TRAIL_DURATION = 280;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (brushRef.current) {
        brushRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hover context
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest('a, button, [role="button"], input, select, textarea');
      const isText = target?.closest('p, h1, h2, h3, h4, h5, h6, blockquote, .dropcap, li span, code');
      setIsHovered(!!(isInteractive || isText));

      // Calculate speed for dynamic soft stroke width
      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const speed = Math.hypot(dx, dy);
      prevX = mouseX;
      prevY = mouseY;

      const strokeWidth = Math.max(2.2, Math.min(6.5, 7.5 - speed * 0.15));

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

    // Render loop: draws soft, responsive paint wash trail
    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Clean old points
      while (points.length > 0 && now - points[0].time > TRAIL_DURATION) {
        points.shift();
      }

      if (points.length > 1) {
        const isDark = document.documentElement.classList.contains('dark');
        const inkRGB = isDark ? '246, 243, 235' : '18, 19, 20';

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 1. Soft Paint Wash Layer (outer diffuse stroke)
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${inkRGB}, 0.25)`;

        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const life = Math.max(0, 1 - (now - p2.time) / TRAIL_DURATION);

          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);

          // Outer soft paint wash
          ctx.lineWidth = p2.width * (0.8 + life * 0.6);
          ctx.strokeStyle = `rgba(${inkRGB}, ${life * 0.22})`;
          ctx.stroke();

          // Inner rich paint core
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          ctx.lineWidth = p2.width * (0.4 + life * 0.5);
          ctx.strokeStyle = `rgba(${inkRGB}, ${life * 0.65})`;
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
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
      {/* Soft Responsive Paint Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[999997] select-none"
      />

      {/* Artist's Paint Brush Cursor */}
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
                ? 'scale-90 translate-y-0.5 rotate-[-44deg]'
                : isHovered
                ? 'scale-105 rotate-[-38deg] translate-y-[-1px]'
                : 'rotate-[-30deg] scale-100'
            }`}
          >
            {/* Fine Artist Round Paint Brush SVG */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 44 44"
              fill="none"
              className="drop-shadow-[1px_2px_4px_rgba(0,0,0,0.28)]"
            >
              {/* Tapered Wooden Artist Handle */}
              <path
                d="M15 15L36 36C38 38 41 38 43 36C45 34 45 31 43 29L22 8L15 15Z"
                fill="var(--card-bg)"
                stroke="var(--border-ink)"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />

              {/* Handle Contour Grain Line */}
              <path
                d="M23 11L41 29"
                stroke="var(--border-subtle)"
                strokeWidth="1"
              />

              {/* Metallic Ferrule (Nickel / Brass Collar) */}
              <path
                d="M10 10L17 17L14 20L7 13L10 10Z"
                fill="var(--border-ink)"
                stroke="var(--border-ink)"
                strokeWidth="1"
              />
              <line x1="12" y1="12" x2="9" y2="15" stroke="var(--bg-page)" strokeWidth="0.8" opacity="0.7" />

              {/* Soft Pointed Sable Bristles: Tip curves directly to (0,0) */}
              <path
                d="M0 0C2.5 4 6 9.5 10 10L13 7C9.5 3 4 0.5 0 0Z"
                fill="var(--border-ink)"
                stroke="var(--border-ink)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Wet Paint Bead on Bristle Tip */}
              <circle cx="2" cy="2" r="1.5" fill="var(--bg-page)" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
