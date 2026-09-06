import { Moon, Sun, Infinity } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion } from 'motion/react';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div className="pointer-events-auto backdrop-blur-xl rounded-full px-5 py-2.5 flex items-center justify-between gap-4 shadow-2xl transition-all w-full max-w-5xl glass-panel border border-brand-primary/25">
        {/* Restored Older Logo with Infinity SVG vector */}
        <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight hover:opacity-90 transition-all group select-none">
          <div className="text-brand-primary transition-transform duration-300 group-hover:scale-110">
            <Infinity className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-sm font-bold text-heading tracking-tight">BotPlayground</span>
        </a>

        {/* Navigation links - clean hover color, no underline */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide text-muted">
          {['About', 'Themes', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="py-1 hover:text-brand-primary transition-colors select-none"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Theme switcher: Only Moon and Sun icon, no text label */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-brand-primary/30 hover:border-brand-primary/70 transition-all text-xs glass-panel text-heading hover:shadow-sm active:scale-90 flex items-center justify-center"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-brand-primary" />
            ) : (
              <Moon className="w-4 h-4 text-brand-primary" />
            )}
          </button>
          
          <a 
            href="#contact" 
            className="inline-flex items-center gap-1.5 btn-primary text-xs font-extrabold px-4.5 py-1.5 rounded-full tracking-wide select-none"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </motion.header>
  );
}
