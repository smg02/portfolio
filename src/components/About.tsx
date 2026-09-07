import { Check, Quote, Feather } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Department Section Ribbon */}
      <div className="flex items-center justify-between border-b-2 border-border-ink pb-2 mb-8 font-mono text-xs uppercase tracking-widest text-muted select-none">
        <div className="flex items-center gap-2">
          <span className="bg-heading text-page px-2 py-0.5 font-bold">PAGE 02</span>
          <span className="font-bold text-heading">EDITORIAL & OP-ED</span>
        </div>
        <span className="hidden sm:inline">THE BOTPLAYGROUND EDITORIAL BOARD</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
      >
        {/* Left Column: Columnist Byline & Article Intro (4 cols) */}
        <div className="lg:col-span-4 space-y-4 lg:border-r lg:border-border-subtle lg:pr-8">
          <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block">
            [ESSAY // FIRST PRINCIPLES]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-heading tracking-tight leading-tight">
            Why name it "Bot Playground"?
          </h2>
          <div className="pt-2 flex items-center gap-3 font-mono text-xs text-muted border-t border-border-subtle">
            <Feather className="w-4 h-4 text-heading" />
            <span>ESSAY BY MOHAMMED GHOUSE</span>
          </div>
          <p className="text-sm text-muted font-editorial italic leading-relaxed pt-2">
            "Play isn't triviality. In systems engineering, playful iteration is the only rigorous path toward discovering edge cases before production discovers them for you."
          </p>
        </div>

        {/* Right Columns: The Editorial Piece & Pull Quote (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Ornate Newspaper Pull Quote Box */}
          <div className="p-6 sm:p-8 bg-page-soft border-2 border-border-ink relative shadow-[4px_4px_0px_var(--border-ink)]">
            <Quote className="w-8 h-8 text-border-ink opacity-20 absolute top-4 right-4" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-heading block mb-2">
              CORE DIRECTIVE // THE PHILOSOPHY
            </span>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-heading leading-snug">
              "Because the best way to master systems engineering is to build things, break them intentionally, automate the repairs, and rebuild them resiliently."
            </p>
          </div>

          {/* Two-Column Editorial Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body text-sm sm:text-base leading-relaxed font-editorial">
            <p className="text-justify">
              Software engineering theory rarely survives contact with untamed data streams. Clean API assumptions collapse when an institutional repository silently returns corrupted XML or when rate limits trigger sudden socket timeouts. The "Playground" was founded as an experimental crucible: a place where distributed scrapers, autonomous bots, and high-throughput pipelines are stress-tested against real chaos.
            </p>
            <p className="text-justify">
              From financial market feeds to automated cloud workflows, every pipeline deployed here adheres to strict production engineering: idempotency, zero silent data drops, clear schema validation, and instant telemetry alerts. We don't just write scripts; we construct self-healing data machines.
            </p>
          </div>

          {/* Core Tenets Checklist Stamps */}
          <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-4 text-xs font-mono text-heading">
            {[
              'Fault-Tolerant Pipelines',
              'Zero Silent Data Drops',
              'Strict Schema Contracts',
              'Deterministic Failovers'
            ].map((tenet) => (
              <span 
                key={tenet} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-ink bg-card text-[11px] font-bold shadow-[2px_2px_0px_var(--border-ink)] hover:scale-105 transition-transform"
              >
                <Check className="w-3.5 h-3.5 text-heading" />
                <span>{tenet}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Broadsheet Rule Ending Editorial Section */}
      <div className="mt-14 rule-double-bottom"></div>
    </section>
  );
}
