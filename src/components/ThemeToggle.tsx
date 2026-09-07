import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-border-ink bg-card text-heading flex items-center justify-center shadow-[3px_3px_0px_var(--border-ink)] hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group"
        aria-label="Toggle dark/light theme"
        title={theme === 'dark' ? 'Switch to Morning Broadsheet' : 'Switch to Midnight Edition'}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </button>
    </div>
  );
}
