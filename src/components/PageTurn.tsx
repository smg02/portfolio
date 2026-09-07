import { useState, useEffect } from 'react';

export function PageTurn() {
  const [isActive, setIsActive] = useState(false);
  const [direction, setDirection] = useState<'down' | 'up'>('down');

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Intercept internal anchor navigation
      if (href.startsWith('#')) {
        e.preventDefault();

        // Keep URL bar clean - strip hash
        window.history.replaceState(null, '', window.location.pathname);

        const targetId = href.length > 1 ? href.substring(1) : '';
        const targetElement = targetId ? document.getElementById(targetId) : null;

        const currentY = window.scrollY;
        const targetY = targetElement 
          ? targetElement.getBoundingClientRect().top + window.scrollY - 70 
          : 0;

        const dir = targetY >= currentY ? 'down' : 'up';
        setDirection(dir);
        setIsActive(true);

        // Apply fast-action anime kinetic motion directly to the page content!
        const mainContent = document.querySelector('main') || document.body;
        const motionClass = dir === 'down' ? 'anime-motion-content-down' : 'anime-motion-content-up';
        mainContent.classList.remove('anime-motion-content-down', 'anime-motion-content-up');
        void (mainContent as HTMLElement).offsetWidth; // trigger reflow
        mainContent.classList.add(motionClass);

        // Immediate fast smooth scroll
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });

        // Clear anime motion classes when scroll reaches target
        setTimeout(() => {
          mainContent.classList.remove('anime-motion-content-down', 'anime-motion-content-up');
          setIsActive(false);
        }, 340);
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="anime-speedlines-overlay">
      {/* Anime Fast-Action Speedlines Canvas Effect */}
      <svg
        className="w-full h-full opacity-60 text-border-ink"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Dynamic vertical speedlines array mimicking high-octane anime acceleration */}
        {[
          { x: 30, w: 2.5, y1: 0, y2: 650, opacity: 0.8 },
          { x: 75, w: 1.2, y1: 150, y2: 900, opacity: 0.5 },
          { x: 120, w: 3, y1: 0, y2: 700, opacity: 0.9 },
          { x: 170, w: 1.5, y1: 300, y2: 1000, opacity: 0.6 },
          { x: 230, w: 2.2, y1: 50, y2: 850, opacity: 0.75 },
          { x: 290, w: 1, y1: 0, y2: 600, opacity: 0.4 },
          { x: 350, w: 3.5, y1: 200, y2: 1000, opacity: 0.95 },
          { x: 420, w: 1.8, y1: 0, y2: 750, opacity: 0.7 },
          { x: 480, w: 2.8, y1: 100, y2: 950, opacity: 0.85 },
          { x: 550, w: 1.4, y1: 0, y2: 800, opacity: 0.5 },
          { x: 610, w: 3.2, y1: 150, y2: 1000, opacity: 0.9 },
          { x: 670, w: 1.6, y1: 0, y2: 650, opacity: 0.6 },
          { x: 730, w: 2.4, y1: 250, y2: 950, opacity: 0.8 },
          { x: 790, w: 1.2, y1: 0, y2: 700, opacity: 0.45 },
          { x: 840, w: 3.8, y1: 80, y2: 1000, opacity: 0.95 },
          { x: 910, w: 1.5, y1: 0, y2: 850, opacity: 0.65 },
          { x: 960, w: 2.6, y1: 180, y2: 980, opacity: 0.85 },
        ].map((line, idx) => (
          <line
            key={idx}
            x1={line.x}
            y1={direction === 'down' ? line.y1 : 1000 - line.y1}
            x2={line.x}
            y2={direction === 'down' ? line.y2 : 1000 - line.y2}
            stroke="currentColor"
            strokeWidth={line.w}
            strokeDasharray="40 15 80 20"
            opacity={line.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
