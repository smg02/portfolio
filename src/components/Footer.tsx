import { Github, Linkedin, Mail, Send, Newspaper } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Department Section Ribbon */}
      <div className="flex items-center justify-between border-b-2 border-border-ink pb-2 mb-8 font-mono text-xs uppercase tracking-widest text-muted select-none">
        <div className="flex items-center gap-2">
          <span className="bg-heading text-page px-2 py-0.5 font-bold">BACK PAGE</span>
          <span className="font-bold text-heading">THE TELEGRAPH OFFICE // CORRESPONDENCE</span>
        </div>
        <span className="hidden sm:inline">OFFICIAL CABLEGRAM TERMINAL</span>
      </div>

      {/* Main Telegram Dispatch Box */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="broadsheet-card p-8 sm:p-12 lg:p-16 relative overflow-hidden"
      >
        {/* Telegram Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border-ink pb-4 mb-8 font-mono text-xs">
          <div className="flex items-center gap-2 text-heading font-bold">
            <Newspaper className="w-4 h-4" />
            <span>URGENT DISPATCH WIRE SERVICE</span>
          </div>
          <div className="news-stamp text-[10px]">
            TELEGRAM PRIORITY 1
          </div>
        </div>

        {/* Telegram Center Content */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold block">
            [INITIATE NEW PIPELINE OR CONSULTATION]
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-heading leading-[1.05] tracking-tight">
            Got a complex data problem worth automating?
          </h2>

          <p className="font-editorial italic text-base sm:text-lg md:text-xl text-muted leading-relaxed">
            "Whether harvesting sovereign bond yields, deploying resilient browser fleets, or architecting high-throughput data backends — transmit your coordinates."
          </p>

          {/* Action Button: Transmit via Telegram */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:syedmdghouse02@gmail.com"
              className="btn-broadsheet inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm uppercase tracking-wider w-full sm:w-auto"
            >
              <span>syedmdghouse02@gmail.com</span>
              <Send className="w-4 h-4" />
            </a>
          </div>

          {/* Official Cablegram Channels */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs text-heading">
            <a
              href="https://github.com/smg02"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline decoration-1 underline-offset-4"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB // smg02</span>
            </a>

            <span className="text-border-subtle hidden sm:inline">◆</span>

            <a
              href="https://www.linkedin.com/in/ghouse02/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline decoration-1 underline-offset-4"
            >
              <Linkedin className="w-4 h-4" />
              <span>LINKEDIN // ghouse02</span>
            </a>

            <span className="text-border-subtle hidden sm:inline">◆</span>

            <a
              href="mailto:syedmdghouse02@gmail.com"
              className="inline-flex items-center gap-1.5 hover:underline decoration-1 underline-offset-4"
            >
              <Mail className="w-4 h-4" />
              <span>ELECTRONIC MAIL</span>
            </a>
          </div>
        </div>

        {/* Colophon & Publication Credits */}
        <div className="mt-16 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-muted gap-4">
          <div>
            © 2026 Mohammed Ghouse — Typeset in Playfair Display, Newsreader & Space Grotesk.
          </div>
          <div className="flex items-center gap-4 text-heading font-bold uppercase">
            <a href="#" className="hover:underline">TOP OF EDITION ↑</a>
            <span className="text-border-subtle">|</span>
            <span>CIRCULATION: GLOBAL</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
