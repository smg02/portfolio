import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'text' | 'interactive';

export function CustomCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check context under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea');
      const isText = target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, .dropcap, li span, code');

      if (isInteractive) {
        setMode('interactive');
      } else if (isText) {
        setMode('text');
      } else {
        setMode('default');
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      createInkFlecks(e.clientX, e.clientY);
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

    // Subtle micro ink flecks on letterpress press
    const createInkFlecks = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        const spark = document.createElement('div');
        spark.className = 'ink-spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        const a = (i * (Math.PI * 2) / 3) + (Math.random() * 0.4 - 0.2);
        const dist = 10 + Math.random() * 12;
        spark.style.setProperty('--dx', `${Math.cos(a) * dist}px`);
        spark.style.setProperty('--dy', `${Math.sin(a) * dist}px`);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 280);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Precision Vintage Fountain Pen Nib (No Circle underneath) */}
      <div
        ref={pointerRef}
        className={`fixed top-0 left-0 transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        <div
          className={`transition-transform duration-200 ease-out origin-top-left ${
            isClicking
              ? 'scale-90 translate-y-0.5'
              : mode === 'text'
              ? '-rotate-[32deg] translate-x-[-2px] translate-y-[-2px] scale-105'
              : mode === 'interactive'
              ? 'scale-115 -rotate-[12deg] translate-y-[-2px]'
              : 'rotate-0 scale-100'
          }`}
        >
          {/* Authentic Antique Fountain Pen Nib SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="text-border-ink drop-shadow-[1px_1px_1px_rgba(0,0,0,0.25)]"
          >
            {/* Nib Body with metallic taper */}
            <path
              d="M3 21L6 14L12 2L18 14L21 21C18 22 15 20 12 20C9 20 6 22 3 21Z"
              fill="var(--bg-page)"
              stroke="var(--border-ink)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Center ink feed slit */}
            <line x1="12" y1="2" x2="12" y2="12" stroke="var(--border-ink)" strokeWidth="1.3" />
            {/* Breather hole */}
            <circle cx="12" cy="12" r="1.4" fill="var(--border-ink)" />
            {/* Nib shoulder accents */}
            <line x1="8" y1="15" x2="16" y2="15" stroke="var(--border-ink)" strokeWidth="0.9" opacity="0.6" />
          </svg>

          {/* Active Ink Bead on Interactive or Writing state */}
          <div
            className={`absolute top-0 left-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
              mode === 'interactive'
                ? 'w-1.5 h-1.5 bg-border-ink shadow-[0_0_4px_var(--border-ink)] scale-110'
                : mode === 'text'
                ? 'w-1 h-1 bg-border-ink opacity-80'
                : 'w-0.5 h-0.5 bg-border-ink opacity-40'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
