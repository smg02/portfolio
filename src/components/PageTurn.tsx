import { useEffect } from 'react';

export function PageTurn() {
  useEffect(() => {
    let scrollRaf: number | null = null;
    let kineticRaf: number | null = null;

    let currentSkew = 0;
    let targetSkew = 0;
    let currentBlur = 0;
    let targetBlur = 0;
    let currentScale = 1;
    let targetScale = 1;

    let lastScrollY = window.scrollY;
    let isHighMotion = false;

    const mainEl = document.getElementById('content-main');

    // Continuous 60fps RAF loop to apply smooth kinetic momentum to content
    const updateMotion = () => {
      // Lerp skew, blur, and scale
      currentSkew += (targetSkew - currentSkew) * 0.18;
      currentBlur += (targetBlur - currentBlur) * 0.22;
      currentScale += (targetScale - currentScale) * 0.18;

      if (mainEl) {
        // Only apply transform if there's active motion
        if (Math.abs(currentSkew) > 0.02 || Math.abs(currentScale - 1) > 0.005 || currentBlur > 0.05) {
          mainEl.style.transform = `skewY(${currentSkew.toFixed(3)}deg) scaleY(${currentScale.toFixed(3)})`;
          mainEl.style.filter = currentBlur > 0.2 ? `blur(${currentBlur.toFixed(2)}px)` : 'none';
        } else {
          mainEl.style.transform = 'none';
          mainEl.style.filter = 'none';
        }
      }

      // Smoothly return target to neutral if not in high motion
      if (!isHighMotion) {
        targetSkew *= 0.82;
        targetBlur *= 0.8;
        targetScale = 1;
      }

      kineticRaf = requestAnimationFrame(updateMotion);
    };

    kineticRaf = requestAnimationFrame(updateMotion);

    // Track standard user scroll velocity for fluid continuous motion
    const onScroll = () => {
      if (isHighMotion) return; // Don't override high motion during link transit

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // Normal scroll velocity creates subtle, tactile newspaper paper flex
      // Clamped to subtle values (-1.4deg to +1.4deg)
      const clampedDelta = Math.max(-18, Math.min(18, delta));
      targetSkew = clampedDelta * 0.08;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle Link Clicks with HIGHEST MOTION
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Intercept internal navigation links
      if (href.startsWith('#')) {
        e.preventDefault();

        // Strip hash from address bar (clean URL)
        window.history.replaceState(null, '', window.location.pathname);

        const targetId = href.length > 1 ? href.substring(1) : '';
        const targetElement = targetId ? document.getElementById(targetId) : null;

        const startY = window.scrollY;
        const targetY = targetElement
          ? Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - 70)
          : 0;

        const distance = targetY - startY;
        if (Math.abs(distance) < 2) return;

        if (scrollRaf) cancelAnimationFrame(scrollRaf);

        // TRIGGER HIGHEST MOTION
        isHighMotion = true;
        const dir = distance > 0 ? 1 : -1;

        // Peak warp velocity: high skew, vertical stretch, and speed blur
        targetSkew = dir * 3.8; // Highest motion skew angle
        targetScale = 1.035;    // Kinetic vertical stretch
        targetBlur = 1.8;       // High-speed motion blur

        // Fast physics-based momentum scroll
        const duration = Math.min(520, Math.max(280, Math.abs(distance) * 0.32));
        const startTime = performance.now();

        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const scrollStep = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const eased = easeOutQuart(progress);

          window.scrollTo(0, startY + distance * eased);

          // Ease down the motion as approaching the destination
          if (progress > 0.45) {
            targetSkew *= 0.88;
            targetBlur *= 0.85;
            targetScale = 1 + (targetScale - 1) * 0.85;
          }

          if (progress < 1) {
            scrollRaf = requestAnimationFrame(scrollStep);
          } else {
            scrollRaf = null;
            isHighMotion = false;
            targetSkew = 0;
            targetBlur = 0;
            targetScale = 1;

            // Highlight target section arrival
            if (targetElement) {
              targetElement.classList.remove('section-target-active');
              void targetElement.offsetWidth;
              targetElement.classList.add('section-target-active');
              setTimeout(() => targetElement.classList.remove('section-target-active'), 800);
            }
          }
        };

        scrollRaf = requestAnimationFrame(scrollStep);
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });

    return () => {
      if (kineticRaf) cancelAnimationFrame(kineticRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  return null;
}
