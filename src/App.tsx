import { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThemeProvider } from './components/ThemeContext';
import { ClickEffects } from './components/ClickEffects';
import { CustomCursor } from './components/CustomCursor';
import { PageTurn } from './components/PageTurn';
import { BroadsheetScrollbar } from './components/BroadsheetScrollbar';
import { ThemeToggle } from './components/ThemeToggle';

// Production optimization: Lazy load components below the fold for faster initial load
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Competencies = lazy(() => import('./components/Competencies').then(m => ({ default: m.Competencies })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const Skills = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans selection:bg-brand-primary selection:text-white">
        <CustomCursor />
        <BroadsheetScrollbar />
        <ThemeToggle />
        <PageTurn />
        <ClickEffects />
        <Navbar />
        <main id="content-main" className="origin-center transition-filter duration-150 pl-6 sm:pl-10 md:pl-12">
          <Hero />
          <Suspense fallback={<div className="py-24 text-center text-muted font-mono text-xs uppercase tracking-widest">TYPESETTING DISPATCHES...</div>}>
            <About />
            <Competencies />
            <Projects />
            <Skills />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <div className="pl-6 sm:pl-10 md:pl-12">
            <Footer />
          </div>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}
