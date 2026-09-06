import { TerminalSquare, Check } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto border-t border-brand-primary/25">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
      >
        <div className="md:col-span-5 space-y-3">
          <span className="text-xs uppercase tracking-wider text-brand-primary font-mono font-bold">[01 / THE PHILOSOPHY]</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heading tracking-tight leading-tight">
            Why "Bot Playground"?
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl glass-card relative">
            <div className="text-brand-secondary font-mono text-xs mb-3 font-bold flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-brand-secondary" />
              <span>CORE_DIRECTIVE</span>
            </div>
            <p className="font-display text-lg sm:text-xl font-bold text-heading leading-snug">
              "Because the best way to learn engineering is to build things, break things, automate things, and build them better."
            </p>
          </div>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            From financial data and web automation to APIs, databases, and cloud infrastructure, I specialize in solving difficult engineering problems and making them automated, reliable, and scalable.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-heading">
            {['Fault-Tolerant Pipelines', 'Zero Silent Data Drops', 'Automated Failovers'].map(text => (
              <span key={text} className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-playground-a20" />
                <span>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
