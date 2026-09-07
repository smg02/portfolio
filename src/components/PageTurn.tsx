import { useState, useEffect } from 'react';

export function PageTurn() {
  const [isTurning, setIsTurning] = useState(false);
  const [targetName, setTargetName] = useState('');

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Handle internal anchor links (starting with #)
      if (href.startsWith('#')) {
        e.preventDefault();

        // Ensure hash is NEVER added to URL bar
        window.history.replaceState(null, '', window.location.pathname);

        const targetId = href.length > 1 ? href.substring(1) : '';
        const targetElement = targetId ? document.getElementById(targetId) : document.body;

        // Extract friendly label for the page turn banner
        const friendlyTitle = anchor.textContent?.trim() || targetId || 'FRONT PAGE';
        setTargetName(friendlyTitle);
        setIsTurning(true);

        // At the midpoint of the page-turning animation, scroll smoothly to the target
        setTimeout(() => {
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 220);

        // Complete the page turn
        setTimeout(() => {
          setIsTurning(false);
        }, 650);
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  if (!isTurning) return null;

  return (
    <div className="fixed inset-0 z-[999990] pointer-events-none overflow-hidden select-none perspective-[2000px]">
      {/* Background shadow layer cast by the turning sheet */}
      <div className="absolute inset-0 bg-border-ink/15 animate-pageTurnBackdrop" />

      {/* 3D Flipping Broadsheet Leaf */}
      <div className="absolute inset-y-0 right-0 w-full max-w-5xl bg-page border-l-2 border-border-ink shadow-[-25px_0_40px_rgba(0,0,0,0.35)] origin-left animate-pageTurnSheet flex flex-col justify-between p-8 sm:p-12">
        {/* Paper crease / fold shadow gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-border-ink/25 via-transparent to-transparent pointer-events-none" />

        {/* Top ribbon on the turning sheet */}
        <div className="relative z-10 flex items-center justify-between border-b-2 border-border-ink pb-3 font-mono text-xs uppercase tracking-widest text-muted">
          <span>THE BOTPLAYGROUND DISPATCH</span>
          <span className="font-bold text-heading">TURNING EDITION PAGE ◆</span>
          <span>VOL. IV · NO. 42</span>
        </div>

        {/* Center Headline on the turning page */}
        <div className="relative z-10 my-auto text-center space-y-4">
          <div className="inline-block news-stamp text-xs px-3 py-1">
            DISPATCH IN TRANSIT
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase text-heading tracking-tight">
            Turning to: {targetName}
          </h2>
          <div className="rule-double pt-1 pb-1 max-w-md mx-auto">
            <div className="border-t border-border-ink"></div>
          </div>
          <p className="font-editorial italic text-muted text-sm sm:text-base">
            "Composing next broadsheet department..."
          </p>
        </div>

        {/* Bottom broadsheet rule on turning sheet */}
        <div className="relative z-10 flex items-center justify-between border-t border-border-subtle pt-3 font-mono text-[10px] text-muted uppercase">
          <span>PRESS RUN: MECHANICAL</span>
          <span>© 2026 BOTPLAYGROUND</span>
        </div>
      </div>
    </div>
  );
}
