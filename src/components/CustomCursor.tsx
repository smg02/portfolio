import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'link' | 'text' | 'button';

export function CustomCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on coarse touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let haloX = -100;
    let haloY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let angle = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Compute slight mechanical rotation from velocity
      const vx = mouseX - prevMouseX;
      const vy = mouseY - prevMouseY;
      const speed = Math.hypot(vx, vy);
      if (speed > 1) {
        angle = Math.atan2(vy, vx) * (180 / Math.PI) + 45;
      }
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
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
      createLetterpressImpression(e.clientX, e.clientY);
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

    // Smooth mechanical trailing loop
    const loop = () => {
      haloX += (mouseX - haloX) * 0.22;
      haloY += (mouseY - haloY) * 0.22;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // Creates an authentic letterpress ink stamp impression on click
    const createLetterpressImpression = (x: number, y: number) => {
      // 1. Vintage ink seal impression box
      const stamp = document.createElement('div');
      stamp.className = 'letterpress-impression px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-widest text-heading shadow-[2px_2px_0px_var(--border-ink)] select-none';
      stamp.innerText = 'PRESS IMPRINT';
      stamp.style.left = `${x}px`;
      stamp.style.top = `${y}px`;
      document.body.appendChild(stamp);
      setTimeout(() => stamp.remove(), 600);

      // 2. Radial ink shockwave
      const wave = document.createElement('div');
      wave.className = 'ink-press-wave';
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      document.body.appendChild(wave);
      setTimeout(() => wave.remove(), 350);

      // 3. Micro ink spatters
      for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        spark.className = 'ink-spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        const a = (i * (Math.PI * 2) / 6) + (Math.random() * 0.3 - 0.15);
        const dist = 16 + Math.random() * 18;
        spark.style.setProperty('--dx', `${Math.cos(a) * dist}px`);
        spark.style.setProperty('--dy', `${Math.sin(a) * dist}px`);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 320);
      }
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
      {/* Precision Tip: Antique Fountain Pen Nib / Typesetter Mark */}
      <div
        ref={pointerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        {mode === 'text' ? (
          /* Vintage Typesetter's Proofing Gauge */
          <div className="flex items-center gap-1 -translate-x-1/2 -translate-y-1/2 text-heading">
            <span className="font-serif text-sm font-black leading-none select-none">⟦</span>
            <div className="w-[1.5px] h-4 bg-border-ink" />
            <span className="font-serif text-sm font-black leading-none select-none">⟧</span>
          </div>
        ) : (
          /* Vintage Ink Fountain Nib Tip */
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-border-ink -translate-x-1/2 -translate-y-1/2 drop-shadow-[1px_1px_0px_var(--bg-page)]"
          >
            {/* Nib Outline */}
            <path
              d="M12 2L4 14C4 18 7.5 22 12 22C16.5 22 20 18 20 14L12 2Z"
              fill="var(--bg-page)"
              stroke="var(--border-ink)"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            {/* Center Ink Breather Hole & Split Line */}
            <line x1="12" y1="2" x2="12" y2="13" stroke="var(--border-ink)" strokeWidth="1.5" />
            <circle cx="12" cy="13" r="1.5" fill="var(--border-ink)" />
          </svg>
        )}
      </div>

      {/* Trailing Mechanical Registration Loupe & Letterpress Halo */}
      <div
        ref={haloRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,border-radius,border-color,background-color,opacity] duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          mode === 'text'
            ? 'w-8 h-8 rounded-none border border-dashed border-border-ink/40 bg-border-ink/5'
            : mode === 'link'
            ? 'w-14 h-14 rounded-full border-2 border-border-ink bg-page/90 shadow-[3px_3px_0px_var(--border-ink)]'
            : mode === 'button'
            ? 'w-16 h-16 rounded-full border-2 border-dashed border-border-ink bg-page/90 shadow-[3px_3px_0px_var(--border-ink)]'
            : isClicking
            ? 'w-7 h-7 rounded-full border border-border-ink bg-border-ink/20'
            : 'w-9 h-9 rounded-full border border-border-ink/50'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Classical Printer's Cardinal Crosshairs in Default Mode */}
        {mode === 'default' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <span className="absolute top-0 w-[1px] h-1.5 bg-border-ink" />
            <span className="absolute bottom-0 w-[1px] h-1.5 bg-border-ink" />
            <span className="absolute left-0 w-1.5 h-[1px] bg-border-ink" />
            <span className="absolute right-0 w-1.5 h-[1px] bg-border-ink" />
          </div>
        )}

        {/* Vintage Monocle Loupe Crosshair in Link Mode */}
        {mode === 'link' && (
          <div className="flex flex-col items-center justify-center select-none animate-fadeIn">
            <span className="font-mono text-[8.5px] font-black tracking-widest text-heading uppercase">
              INSPECT
            </span>
            <div className="w-4 h-[1px] bg-border-ink/60 mt-0.5" />
          </div>
        )}

        {/* Vintage Letterpress Seal in Button Mode */}
        {mode === 'button' && (
          <div className="flex flex-col items-center justify-center select-none animate-fadeIn">
            <span className="font-mono text-[9px] font-black tracking-widest text-heading uppercase">
              STAMP
            </span>
            <span className="font-mono text-[7px] text-muted uppercase">PRESS</span>
          </div>
        )}
      </div>
    </div>
  );
}
