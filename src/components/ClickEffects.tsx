import { useEffect } from 'react';

export function ClickEffects() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Spawn a lightweight vintage letterpress ink wave at click coordinates
      const ripple = document.createElement('div');
      ripple.className = 'ink-press-wave pointer-events-none';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 380);
    };

    window.addEventListener('click', handleGlobalClick, { passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return null;
}
