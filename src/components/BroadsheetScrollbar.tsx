import { useState, useEffect, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

export function BroadsheetScrollbar() {
  const [progress, setProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(72);
  const [thumbTop, setThumbTop] = useState(6);
  const [headerHeight, setHeaderHeight] = useState(88);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Clearance padding within the sub-header track
  const TOP_PADDING = 6;
  const BOTTOM_PADDING = 16;

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        setThumbTop(TOP_PADDING);
        return;
      }

      const p = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
      setProgress(p);

      const h = document.querySelector('header')?.offsetHeight || headerHeight;
      const trackHeight = window.innerHeight - h;
      const usableHeight = trackHeight - TOP_PADDING - BOTTOM_PADDING;

      // Calculate proportional thumb height (min 48px, max 130px)
      const calcThumbHeight = Math.max(48, Math.min(130, (window.innerHeight / (totalHeight + window.innerHeight)) * usableHeight));
      setThumbHeight(calcThumbHeight);

      const maxTop = usableHeight - calcThumbHeight;
      const currentTop = TOP_PADDING + (p / 100) * maxTop;
      setThumbTop(currentTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [headerHeight]);

  // Click anywhere on the typesetter track to jump-scroll smoothly
  const handleTrackClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top - TOP_PADDING;
    const availableTrack = rect.height - TOP_PADDING - BOTTOM_PADDING;
    const ratio = Math.max(0, Math.min(1, clickY / availableTrack));
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: ratio * totalScroll,
      behavior: 'smooth',
    });
  };

  const handleThumbMouseDown = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);

    const startY = e.clientY;
    const startScroll = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const trackHeight = window.innerHeight - headerHeight;
    const usableHeight = trackHeight - TOP_PADDING - BOTTOM_PADDING;
    const maxTop = usableHeight - thumbHeight;

    document.body.style.userSelect = 'none';

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      if (maxTop <= 0) return;
      const deltaScroll = (deltaY / maxTop) * totalHeight;
      window.scrollTo(0, startScroll + deltaScroll);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      {/* 1. Vintage Broadsheet Column Rule / Typesetter Scrollbar
          - Positioned BEHIND the header (z-40, header is z-50)
          - Maxed AT the header: top starts at headerHeight, never goes beyond the header
      */}
      <aside
        ref={trackRef}
        onClick={handleTrackClick}
        style={{ top: `${headerHeight}px` }}
        className="fixed bottom-0 left-0 w-4 sm:w-5 z-40 bg-page/95 backdrop-blur-md border-r-2 border-border-ink cursor-pointer select-none group"
        aria-label="Newspaper typesetter column scrollbar"
        title="Column navigation"
      >
        {/* Top Pica Header Glyph: Pilcrow */}
        <div className="absolute top-1 left-0 right-0 flex items-center justify-center text-[8px] font-mono font-bold text-muted pointer-events-none select-none opacity-60">
          ¶
        </div>

        {/* Typesetter Pica Measurement Ticks along the vertical rule */}
        <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-35">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between px-0.5">
              <span className="w-1 h-[1px] bg-border-ink" />
              {i % 3 === 0 && <span className="w-1.5 h-[1px] bg-border-ink" />}
            </div>
          ))}
        </div>

        {/* Bottom Column Terminal Mark */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center text-[7px] font-mono font-black text-muted pointer-events-none select-none opacity-60">
          §
        </div>

        {/* Vintage Letterpress Lead Slug / Linotype Thumb (Stops directly at header) */}
        <div
          onMouseDown={handleThumbMouseDown}
          className={`absolute left-[2px] right-[2px] rounded-[1px] border-2 border-border-ink bg-card text-heading shadow-[2px_2px_0px_var(--border-ink)] transition-[box-shadow,background-color] duration-150 flex flex-col items-center justify-between py-1.5 ${
            isDragging 
              ? 'bg-border-ink text-page shadow-[3px_3px_0px_var(--border-ink)] scale-x-105' 
              : 'hover:scale-x-105 hover:shadow-[3px_3px_0px_var(--border-ink)]'
          }`}
          style={{
            height: `${thumbHeight}px`,
            top: `${thumbTop}px`,
            willChange: 'top',
          }}
        >
          {/* Top Brass Notch */}
          <div className="w-2 h-[1.5px] bg-border-ink opacity-75" />

          {/* Central Typesetter Lead Grooves */}
          <div className="flex flex-col items-center gap-[2.5px] my-auto pointer-events-none">
            <span className="w-2.5 h-[1.5px] bg-border-ink rounded-[0.5px]" />
            <span className="w-2.5 h-[1.5px] bg-border-ink rounded-[0.5px]" />
            <span className="w-2.5 h-[1.5px] bg-border-ink rounded-[0.5px]" />
          </div>

          {/* Bottom Brass Notch */}
          <div className="w-2 h-[1.5px] bg-border-ink opacity-75" />
        </div>
      </aside>

      {/* 2. Bottom Reading Progress Bar (Color matching site: var(--border-ink)) */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-[3px] sm:h-[3.5px] z-40 bg-border-subtle/30 pointer-events-none select-none"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-border-ink transition-[width] duration-75 ease-out shadow-[0_0_8px_var(--border-ink)]"
          style={{
            width: `${progress}%`,
            willChange: 'width',
          }}
        />

        {/* Subtle broadsheet progress percentage badge on bottom left */}
        <div className="absolute bottom-2 left-8 sm:left-10 px-1.5 py-0.5 bg-card border border-border-ink text-[9px] font-mono font-bold text-heading uppercase tracking-wider shadow-[1px_1px_0px_var(--border-ink)] hidden sm:block">
          DISPATCH: {Math.round(progress)}% READ
        </div>
      </div>
    </>
  );
}
