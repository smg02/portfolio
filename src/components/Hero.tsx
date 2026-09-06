import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 hero-radial-glow bg-subtle-grid pb-20 pt-32 transition-colors duration-300">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center w-full max-w-5xl"
      >
        <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full glass-panel border border-brand-primary/25 text-xs shadow-sm hover:border-brand-primary/60 transition-all">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-primary pulse-primary"></span>
          <span className="font-mono uppercase text-[11px] tracking-wider font-bold text-heading">MOHAMMED GHOUSE // PYTHON DEVELOPER</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="font-display max-w-5xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-heading leading-[1.06] mb-8">
          We build resilient systems that turn complex, chaotic data into autonomous, production-ready engines.
        </motion.h1>
        
        <motion.div variants={itemVariants} className="max-w-3xl mb-10 space-y-3">
          <p className="font-mono text-xs sm:text-sm text-brand-secondary font-bold tracking-wide uppercase flex items-center justify-center flex-wrap gap-2.5">
            <span>Python Developer</span><span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/50"></span>
            <span>Data Engineering</span><span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/50"></span>
            <span>ETL Automation</span><span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/50"></span>
            <span>Backend Systems</span>
          </p>
          <p className="text-muted text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            I build automated data pipelines, backend systems, and intelligent tools that turn complex data sources into reliable, production-ready solutions.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#projects" className="group inline-flex items-center gap-2.5 btn-primary font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full">
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 glass-panel border border-brand-primary/30 text-heading font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/20 active:scale-95"
          >
            Get in Touch
          </a>
        </motion.div>
        
        <motion.div variants={itemVariants} className="w-full max-w-4xl border-y border-brand-primary/25 py-4 px-6 flex items-center justify-center text-center glass-panel rounded-xl">
          <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base text-heading font-semibold tracking-tight font-display">
            <ChevronRight className="w-4 h-4 text-brand-primary" />
            <span>"This isn't just a playground. It's where ideas become working systems."</span>
            <ChevronRight className="w-4 h-4 text-brand-primary" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
