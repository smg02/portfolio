import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'text' | 'link' | 'button';

export function CustomCursor() {
  const dotWrapperRef = useRef<HTMLDivElement>(null);
  const ringWrapperRef = useRef<HTMLDivElement>(null);

  // Persistent coordinates that survive renders and clicks without jumping to (-100, -100)
  const coordsRef = useRef({
    mouseX: -500,
    mouseY: -500,
    ringX: -500,
    ringY: -500,
    hasMoved: false,
    isVisible: false,
  });

  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisibleState, setIsVisibleState] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const coords = coordsRef.current;

      coords.mouseX = clientX;
      coords.mouseY = clientY;

      if (!coords.hasMoved) {
        coords.ringX = clientX;
        coords.ringY = clientY;
        coords.hasMoved = true;
      }

      if (!coords.isVisible) {
        coords.isVisible = true;
        setIsVisibleState(true);
      }

      // Directly update dot wrapper position immediately for 0ms lag
      if (dotWrapperRef.current) {
        dotWrapperRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Context detection
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

    const onMouseDown = () => {
      setIsClicking(true);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      coordsRef.current.isVisible = false;
      setIsVisibleState(false);
    };

    const onMouseEnter = () => {
      coordsRef.current.isVisible = true;
      setIsVisibleState(true);
    };

    // Smooth trailing ring loop using hardware-accelerated lerp
    const loop = () => {
      const coords = coordsRef.current;
      if (coords.hasMoved) {
        coords.ringX += (coords.mouseX - coords.ringX) * 0.32;
        coords.ringY += (coords.mouseY - coords.ringY) * 0.32;

        if (ringWrapperRef.current) {
          ringWrapperRef.current.style.transform = `translate3d(${coords.ringX}px, ${coords.ringY}px, 0)`;
        }
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
  }, []); // Run once on mount - no resets on click or state changes

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* 1. Precision Center Dot Wrapper */}
      <div
        ref={dotWrapperRef}
        className={`fixed top-0 left-0 transition-opacity duration-150 pointer-events-none ${
          isVisibleState ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Centered container with fixed -50% translate to eliminate any jump */}
        <div 
          className="flex items-center justify-center pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div
            className={`transition-[width,height,background-color] duration-150 ${
              mode === 'text'
                ? 'w-1 h-4 rounded-[1px] bg-border-ink'
                : isClicking
                ? 'w-1.5 h-1.5 rounded-full bg-border-ink'
                : 'w-2 h-2 rounded-full bg-border-ink'
            }`}
          />
        </div>
      </div>

      {/* 2. Fluid Responsive Halo Wrapper */}
      <div
        ref={ringWrapperRef}
        className={`fixed top-0 left-0 transition-opacity duration-150 pointer-events-none ${
          isVisibleState ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Centered container with fixed -50% translate to eliminate any jump */}
        <div 
          className="flex items-center justify-center pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div
            className={`flex items-center justify-center transition-[width,height,border-radius,border-color,background-color,box-shadow] duration-150 ease-out pointer-events-none ${
              mode === 'text'
                ? 'w-5 h-5 rounded-none border border-dashed border-border-ink/30 bg-transparent'
                : mode === 'link'
                ? 'w-10 h-10 rounded-full border-2 border-border-ink bg-page/85 shadow-[2px_2px_0px_var(--border-ink)]'
                : mode === 'button'
                ? 'w-12 h-12 rounded-full border-2 border-border-ink bg-heading text-page shadow-[2px_2px_0px_var(--border-ink)]'
                : isClicking
                ? 'w-6 h-6 rounded-full border border-border-ink bg-border-ink/15'
                : 'w-8 h-8 rounded-full border border-border-ink/50'
            }`}
          >
            {/* Modern Link Direction Indicator */}
            {mode === 'link' && (
              <span className="font-mono text-[11px] font-bold text-heading leading-none select-none">
                ↗
              </span>
            )}

            {/* Tactile Button Label */}
            {mode === 'button' && (
              <span className="font-mono text-[9px] font-black uppercase tracking-tight text-page leading-none select-none">
                GO
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
