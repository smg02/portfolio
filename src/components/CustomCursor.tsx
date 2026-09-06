import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest('a, button, [role="button"], input, textarea, select');
      setIsHovered(!!clickable);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      createClickBurst(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth trailing ring loop using hardware-accelerated lerp
    const loop = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // Fast, lightweight click shockwave + micro particles
    const createClickBurst = (x: number, y: number) => {
      const wave = document.createElement('div');
      wave.className = 'cursor-click-wave';
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      document.body.appendChild(wave);

      for (let i = 0; i < 4; i++) {
        const spark = document.createElement('div');
        spark.className = 'cursor-click-spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        const angle = (i * Math.PI) / 2 + (Math.random() * 0.4 - 0.2);
        const dist = 22 + Math.random() * 12;
        spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 320);
      }

      setTimeout(() => wave.remove(), 350);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Precision Center Dot (Replaces OS cursor tip) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'w-2.5 h-2.5' : isClicking ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
        style={{
          backgroundColor: 'var(--primary-accent)',
          boxShadow: '0 0 10px var(--primary-accent)',
          willChange: 'transform',
        }}
      />

      {/* Trailing Fluid Outer Halo Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,opacity,border-color,background-color] duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'w-10 h-10 bg-brand-primary/10 border-brand-primary'
            : isClicking
            ? 'w-6 h-6 border-brand-secondary bg-brand-secondary/20'
            : 'w-8 h-8 border-brand-primary/50'
        }`}
        style={{
          borderColor: isHovered
            ? 'var(--primary-accent)'
            : 'color-mix(in oklab, var(--primary-accent) 55%, transparent)',
          boxShadow: isHovered
            ? '0 0 16px color-mix(in oklab, var(--primary-accent) 35%, transparent)'
            : 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
