import { useState, useEffect } from 'react';

export function PageTurn() {
  const [isTurning, setIsTurning] = useState(false);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Intercept internal anchor links
      if (href.startsWith('#')) {
        e.preventDefault();

        // Keep URL bar clean - prevent # from appearing
        window.history.replaceState(null, '', window.location.pathname);

        const targetId = href.length > 1 ? href.substring(1) : '';
        const targetElement = targetId ? document.getElementById(targetId) : null;

        setIsTurning(true);

        // At midpoint of the swift paper curl, scroll to the destination
        setTimeout(() => {
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 180);

        // Finish transition
        setTimeout(() => {
          setIsTurning(false);
        }, 460);
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  if (!isTurning) return null;

  return (
    <div className="fixed inset-0 z-[999990] pointer-events-none overflow-hidden select-none">
      {/* Background shadow layer */}
      <div className="absolute inset-0 bg-border-ink/20 animate-pageTurnShadow" />

      {/* Tactile Broadsheet Paper Leaf Sweeping Across */}
      <div className="absolute inset-y-0 right-0 w-full bg-page border-l-[3px] border-border-ink shadow-[-25px_0_45px_rgba(0,0,0,0.35)] animate-pageTurnSweep">
        {/* Newsprint Crease & Curl Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-border-ink/15 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle broadsheet hairline margin guide on the turning page */}
        <div className="h-full w-full border-r border-border-subtle/50 flex flex-col justify-between p-6 opacity-30">
          <div className="border-b border-border-subtle pb-2 flex justify-between font-mono text-[9px] uppercase">
            <span>THE BOTPLAYGROUND GAZETTE</span>
            <span>SECTION IN TRANSIT</span>
          </div>
          <div className="border-t border-border-subtle pt-2 flex justify-between font-mono text-[9px] uppercase">
            <span>PRINT ARCHIVE</span>
            <span>AUTONOMOUS DISPATCH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
