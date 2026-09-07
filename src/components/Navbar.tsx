import { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full bg-page/95 backdrop-blur-md border-b-2 border-border-ink"
    >
      {/* Top Broadsheet Dateline & Telemetry Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono border-b border-border-subtle tracking-wider uppercase text-muted select-none">
        <div className="flex items-center gap-3">
          <span className="font-bold text-heading">THE BOTPLAYGROUND DISPATCH</span>
          <span className="hidden sm:inline text-border-subtle">|</span>
          <span className="hidden sm:inline">VOL. IV · NO. 42</span>
          <span className="hidden md:inline text-border-subtle">|</span>
          <span className="hidden md:inline">{currentDate || 'MONDAY, SEPTEMBER 7, 2026'}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden lg:flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-heading animate-pulse" />
            <span>SLA: 99.98% UPTIME</span>
          </span>
          <span className="text-border-subtle hidden lg:inline">|</span>
          <span className="font-bold text-heading">CIRCULATION: OPEN SOURCE</span>
        </div>
      </div>

      {/* Main Navigation & Editorial Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Masthead Brand Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-2 select-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-heading uppercase group-hover:opacity-80 transition-opacity">
            BotPlayground
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-extrabold uppercase border border-border-ink bg-card text-heading shadow-[1px_1px_0px_var(--border-ink)]">
            GAZETTE
          </span>
        </a>

        {/* Newspaper Section Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-widest font-bold text-muted">
          {[
            { label: 'Front Page', href: '#' },
            { label: 'Philosophy', href: '#about' },
            { label: 'Pillars', href: '#themes' },
            { label: 'Dispatches', href: '#projects' },
            { label: 'Classifieds', href: '#skills' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-1 hover:text-heading transition-colors relative hover:underline decoration-1 underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Dispatch Button */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="btn-broadsheet px-3.5 sm:px-4 py-1.5 text-xs font-mono font-bold uppercase select-none inline-flex items-center gap-1.5"
          >
            <span>TELEGRAM</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
