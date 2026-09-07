import { useEffect } from 'react';

export function PageTurn() {
  useEffect(() => {
    let currentRaf: number | null = null;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Intercept internal anchor navigation
      if (href.startsWith('#')) {
        e.preventDefault();

        // Keep URL bar clean - never show #contact or #hash in the address bar
        window.history.replaceState(null, '', window.location.pathname);

        const targetId = href.length > 1 ? href.substring(1) : '';
        const targetElement = targetId ? document.getElementById(targetId) : null;

        const startY = window.scrollY;
        const targetY = targetElement
          ? Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - 70)
          : 0;

        const distance = targetY - startY;
        if (Math.abs(distance) < 2) return;

        if (currentRaf) {
          cancelAnimationFrame(currentRaf);
        }

        // Real, responsive physics-based momentum scroll
        // Duration scales dynamically with distance (320ms to 580ms max)
        const duration = Math.min(580, Math.max(300, Math.abs(distance) * 0.35));
        const startTime = performance.now();

        // Natural physics easing: Starts with immediate velocity, decelerates with authentic weight
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const scrollStep = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const eased = easeOutQuart(progress);

          window.scrollTo(0, startY + distance * eased);

          if (progress < 1) {
            currentRaf = requestAnimationFrame(scrollStep);
          } else {
            currentRaf = null;

            // Subtle target arrival highlight
            if (targetElement) {
              targetElement.classList.remove('section-target-active');
              void targetElement.offsetWidth;
              targetElement.classList.add('section-target-active');
              setTimeout(() => targetElement.classList.remove('section-target-active'), 800);
            }
          }
        };

        currentRaf = requestAnimationFrame(scrollStep);
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });
    return () => {
      if (currentRaf) cancelAnimationFrame(currentRaf);
      window.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  return null;
}
