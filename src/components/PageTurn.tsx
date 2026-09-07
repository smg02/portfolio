import { useState, useEffect } from 'react';

export function PageTurn() {
  const [isFlipping, setIsFlipping] = useState(false);

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

        const targetY = targetElement
          ? Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - 70)
          : 0;

        setIsFlipping(true);

        // At the midpoint of the 3D page turn (when the paper sheet occludes the screen),
        // smoothly transition viewport position to the target destination
        setTimeout(() => {
          window.scrollTo({
            top: targetY,
            behavior: 'auto'
          });

          // Highlight the destination section arrival
          if (targetElement) {
            targetElement.classList.remove('section-target-active');
            void targetElement.offsetWidth;
            targetElement.classList.add('section-target-active');
            setTimeout(() => targetElement.classList.remove('section-target-active'), 800);
          }
        }, 220);

        // Complete the 3D paper flip
        setTimeout(() => {
          setIsFlipping(false);
        }, 560);
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  if (!isFlipping) return null;

  return (
    <div className="fixed inset-0 z-[999990] pointer-events-none overflow-hidden select-none page-turn-perspective">
      {/* Background shadow cast by the turning broadsheet */}
      <div className="absolute inset-0 bg-border-ink/25 animate-pageTurnBackdrop" />

      {/* 3D Curled Broadsheet Paper Leaf (Zero Text - Pure Physical Paper) */}
      <div className="absolute inset-y-0 right-0 w-full h-full bg-page border-l-[3px] border-border-ink shadow-[-30px_0_60px_rgba(0,0,0,0.45)] origin-left animate-broadsheetPageTurn">
        {/* Authentic Newsprint Cylinder Crease & Gradient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-border-ink/30 via-transparent to-border-ink/20 pointer-events-none" />

        {/* Paper Deckle Margin Lines (No text, pure architectural guidelines) */}
        <div className="h-full w-full border-x border-border-subtle/30 flex justify-between opacity-25">
          <div className="w-12 h-full border-r border-border-subtle/40" />
          <div className="w-12 h-full border-l border-border-subtle/40" />
        </div>
      </div>
    </div>
  );
}
