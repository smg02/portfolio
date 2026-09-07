import { useEffect } from 'react';

export function ClickEffects() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Check if clicked element or its parent is a link or button
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest('a, button');

      if (!clickable) return;

      // Spawn an ink press ripple particle at the click coordinates
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple-particle';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.background = 'radial-gradient(circle, color-mix(in oklab, var(--border-ink) 35%, transparent) 0%, transparent 70%)';
      ripple.style.border = '1px solid color-mix(in oklab, var(--border-ink) 40%, transparent)';

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      // If it's an internal anchor link, trigger target section highlight animation
      const href = clickable.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);
        if (section) {
          section.classList.remove('section-target-active');
          // Trigger reflow to restart CSS animation
          void section.offsetWidth;
          section.classList.add('section-target-active');
          setTimeout(() => {
            section.classList.remove('section-target-active');
          }, 1400);
        }
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
