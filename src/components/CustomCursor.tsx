import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'text' | 'link' | 'button';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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

      // Snap the precision center ink dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Detect hover target
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

    // High-performance hardware accelerated RAF loop with buttery lerp
    const loop = () => {
      // 0.28 lerp factor provides a smooth, fluid physical trailing feel
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
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
      {/* Precision Center Ink Point (Instant response, zero lag) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          mode === 'text'
            ? 'w-1 h-4 rounded-[1px] bg-border-ink'
            : isClicking
            ? 'w-1.5 h-1.5 bg-border-ink scale-90'
            : 'w-2 h-2 bg-border-ink'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Fluid Responsive Editorial Halo / Lens */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,border-radius,border-color,background-color,opacity,transform] duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          mode === 'text'
            ? 'w-6 h-6 rounded-none border border-dashed border-border-ink/30 bg-transparent'
            : mode === 'link'
            ? 'w-10 h-10 rounded-full border-2 border-border-ink bg-page/85 shadow-[2px_2px_0px_var(--border-ink)]'
            : mode === 'button'
            ? 'w-12 h-12 rounded-full border-2 border-border-ink bg-heading text-page shadow-[2px_2px_0px_var(--border-ink)]'
            : isClicking
            ? 'w-6 h-6 rounded-full border border-border-ink bg-border-ink/15 scale-90'
            : 'w-8 h-8 rounded-full border border-border-ink/50'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Modern Link Direction Indicator */}
        {mode === 'link' && (
          <span className="font-mono text-[11px] font-bold text-heading leading-none animate-fadeIn">
            ↗
          </span>
        )}

        {/* Tactile Button Label */}
        {mode === 'button' && (
          <span className="font-mono text-[9px] font-black uppercase tracking-tight text-page leading-none animate-fadeIn">
            GO
          </span>
        )}
      </div>
    </div>
  );
}
