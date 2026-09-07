import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'link' | 'text' | 'button';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check context under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isButton = target.closest('button, [role="button"], input[type="submit"]');
      const isLink = target.closest('a, nav a');
      const isText = target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, .dropcap, li span, code');

      if (isButton) {
        setMode('button');
      } else if (isLink) {
        setMode('link');
      } else if (isText) {
        setMode('text');
      } else {
        setMode('default');
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      createInkPress(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Hardware accelerated lerp loop
    const loop = () => {
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // Letterpress ink impression effect on click
    const createInkPress = (x: number, y: number) => {
      const wave = document.createElement('div');
      wave.className = 'ink-press-wave';
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      document.body.appendChild(wave);

      for (let i = 0; i < 5; i++) {
        const spark = document.createElement('div');
        spark.className = 'ink-spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        const angle = (i * (Math.PI * 2) / 5) + (Math.random() * 0.4 - 0.2);
        const dist = 18 + Math.random() * 16;
        spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 320);
      }

      setTimeout(() => wave.remove(), 360);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Precision Center Nib / Focus Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          mode === 'text'
            ? 'w-1 h-5 rounded-[1px] bg-border-ink'
            : mode === 'link' || mode === 'button'
            ? 'w-1.5 h-1.5 bg-btn-bg'
            : isClicking
            ? 'w-1.5 h-1.5 bg-border-ink'
            : 'w-2 h-2 bg-border-ink'
        }`}
        style={{
          willChange: 'transform',
        }}
      />

      {/* Trailing Fluid Responsive Broadsheet Halo */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,border-radius,border-color,background-color,opacity] duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          mode === 'text'
            ? 'w-7 h-7 rounded-sm border border-dashed border-border-ink/50 bg-border-ink/5'
            : mode === 'link'
            ? 'w-12 h-12 rounded-full border border-border-ink bg-bg-page/85 shadow-md shadow-border-ink/10'
            : mode === 'button'
            ? 'w-14 h-14 rounded-full border-2 border-border-ink bg-bg-page/90 shadow-md shadow-border-ink/15'
            : isClicking
            ? 'w-6 h-6 rounded-full border border-border-ink bg-border-ink/20'
            : 'w-9 h-9 rounded-full border border-border-ink/60'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        {/* Context Label badge when hovering links or buttons */}
        {(mode === 'link' || mode === 'button') && (
          <span
            ref={labelRef}
            className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-text-heading select-none animate-fadeIn"
          >
            {mode === 'button' ? 'PRESS' : 'READ'}
          </span>
        )}
      </div>
    </div>
  );
}
