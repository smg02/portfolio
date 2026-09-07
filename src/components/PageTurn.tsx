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
          ? targetElement.getBoundingClientRect().top + window.scrollY - 75 
          : 0;

        // Determine if navigating downward or upward
        const dir = targetY >= currentY ? 'down' : 'up';
        setDirection(dir);
        setIsActive(true);

        // Fast-paced kinetic scroll occurs concurrently WITH the motion
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });

        // End motion precisely as scroll completes
        setTimeout(() => {
          setIsActive(false);
        }, 390);
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[999990] pointer-events-none overflow-hidden select-none">
      {/* Dynamic Directional Printing Press Paper Motion Overlay */}
      <div
        className={`absolute inset-x-0 w-full h-[120vh] bg-page border-y-2 border-border-ink shadow-[0_0_50px_rgba(0,0,0,0.3)] ${
          direction === 'down' ? 'animate-pressRollDown' : 'animate-pressRollUp'
        }`}
      >
        {/* Newsprint Crease & Directional Motion Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-border-ink/10 via-transparent to-border-ink/10 pointer-events-none" />

        {/* Directional Broadsheet Guidelines */}
        <div className="max-w-7xl mx-auto h-full px-6 flex flex-col justify-between py-12 border-x border-border-subtle/40 opacity-40">
          <div className="flex justify-between font-mono text-[10px] uppercase text-muted tracking-widest border-b border-border-subtle pb-2">
            <span>THE BOTPLAYGROUND PRESS</span>
            <span>{direction === 'down' ? '▼ ADVANCING DOWNWARD' : '▲ REWINDING UPWARD'}</span>
            <span>ROTARY EDITION</span>
          </div>

          <div className="flex justify-between font-mono text-[10px] uppercase text-muted tracking-widest border-t border-border-subtle pt-2">
            <span>HIGH-SPEED MECHANICAL FEED</span>
            <span>DISPATCH TRANSIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
