import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'text' | 'link' | 'button';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check context under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isBtn = target.closest('button, [role="button"], input[type="submit"]');
      const isLnk = target.closest('a');
      const isTxt = target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, .dropcap, li span, code');

      if (isBtn) {
        setMode('button');
      } else if (isLnk) {
        setMode('link');
      } else if (isTxt) {
        setMode('text');
      } else {
        setMode('default');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // High-performance hardware accelerated RAF loop with smooth lerp
    const loop = () => {
      // 0.35 lerp factor gives snappy yet fluid modern response
      currentX += (mouseX - currentX) * 0.38;
      currentY += (mouseY - currentY) * 0.38;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

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
      {/* Pleasing Old Style + Modern Editorial Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 flex items-center justify-center ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        {mode === 'text' ? (
          /* Editorial Typographer's Caret: Pleasing vertical serif bar */
          <div 
            className={`flex flex-col items-center transition-transform duration-150 ${
              isClicking ? 'scale-90' : 'scale-100'
            }`}
          >
            {/* Top Serif Bar */}
            <div className="w-2.5 h-[1.5px] bg-border-ink" />
            {/* Vertical Stem */}
            <div className="w-[1.5px] h-3.5 bg-border-ink" />
            {/* Bottom Serif Bar */}
            <div className="w-2.5 h-[1.5px] bg-border-ink" />
          </div>
        ) : mode === 'link' ? (
          /* Modern Editorial Link Lens with arrow indicator */
          <div
            className={`w-7 h-7 rounded-full border border-border-ink bg-page/90 flex items-center justify-center shadow-[2px_2px_0px_var(--border-ink)] transition-transform duration-150 ${
              isClicking ? 'scale-85' : 'scale-100'
            }`}
          >
            <span className="font-mono text-[10px] font-black text-heading leading-none">
              ↗
            </span>
          </div>
        ) : mode === 'button' ? (
          /* Modern Editorial Button Press Capsule */
          <div
            className={`w-8 h-8 rounded-full border border-border-ink bg-heading text-page flex items-center justify-center shadow-[2px_2px_0px_var(--border-ink)] transition-transform duration-150 ${
              isClicking ? 'scale-85' : 'scale-100'
            }`}
          >
            <span className="font-mono text-[8px] font-black uppercase tracking-tighter">
              OK
            </span>
          </div>
        ) : (
          /* Default Mode: Pleasing Minimalist Vintage Printer's Mark */
          <div 
            className={`relative flex items-center justify-center transition-transform duration-150 ${
              isClicking ? 'scale-75' : 'scale-100'
            }`}
          >
            {/* Precision Center Ink Point */}
            <div className="w-2 h-2 rounded-full bg-border-ink" />
            {/* Subtle Crosshair Ticks */}
            <div className="absolute -top-1 w-[1px] h-1 bg-border-ink/60" />
            <div className="absolute -bottom-1 w-[1px] h-1 bg-border-ink/60" />
            <div className="absolute -left-1 w-1 h-[1px] bg-border-ink/60" />
            <div className="absolute -right-1 w-1 h-[1px] bg-border-ink/60" />
          </div>
        )}
      </div>
    </div>
  );
}
