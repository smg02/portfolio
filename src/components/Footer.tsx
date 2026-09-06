import { Github, Linkedin, Mail, ArrowRight, Infinity } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer id="contact" className="p-4 sm:p-6 lg:p-8 mt-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-card rounded-[2.5rem] px-6 py-20 sm:py-28 flex flex-col items-center justify-between min-h-[580px] relative overflow-hidden text-center border-brand-primary/30"
      >
        <div className="w-full flex items-center justify-between text-xs tracking-wider text-muted font-medium px-4 mb-16">
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
            <a href="#" className="text-heading hover:text-brand-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
            <a href="#themes" className="hover:text-brand-primary transition-colors">Themes</a>
            <a href="#projects" className="hover:text-brand-primary transition-colors">Projects</a>
            <a href="#skills" className="hover:text-brand-primary transition-colors">Skills</a>
          </div>
          {/* Older Logo in Footer */}
          <div className="flex items-center text-brand-primary">
            <Infinity className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </div>

        <div className="max-w-4xl my-auto space-y-8">
          <div>
            <span className="text-xs font-mono text-brand-secondary uppercase tracking-widest font-bold block mb-4">
              [INITIATE WORKFLOW]
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-heading leading-[1.05]">
              Got a problem worth automating?<br/>
              <span className="text-muted">Let's build something.</span>
            </h2>
          </div>

          <div className="pt-4 flex items-center justify-center">
            <a 
              href="mailto:syedmdghouse02@gmail.com" 
              className="group inline-flex flex-col sm:flex-row items-center justify-center gap-3 btn-primary font-extrabold text-xs uppercase tracking-wider px-10 py-4 rounded-full w-full sm:w-auto active:scale-95"
            >
              <span>syedmdghouse02@gmail.com</span>
              <span className="flex items-center gap-1.5 font-bold">
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 font-mono text-xs text-heading">
            <a 
              href="https://github.com/smg02" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 py-1"
            >
              <Github className="w-3.5 h-3.5 text-brand-secondary" /> <span>GitHub</span>
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 hidden sm:block"></span>
            <a 
              href="https://www.linkedin.com/in/ghouse02/" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 py-1"
            >
              <Linkedin className="w-3.5 h-3.5 text-brand-secondary" /> <span>LinkedIn</span>
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 hidden sm:block"></span>
            <a 
              href="mailto:syedmdghouse02@gmail.com" 
              className="hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 py-1"
            >
              <Mail className="w-3.5 h-3.5 text-brand-secondary" /> <span>Email</span>
            </a>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4 mt-16 pt-8 border-t border-brand-primary/20 font-normal">
          <div className="font-mono text-[11px] sm:text-xs">
            © 2026 Ghouse — Built, broken, debugged, and deployed from the playground.
          </div>
          <div className="flex items-center gap-4 sm:gap-5 font-medium font-mono text-[11px] sm:text-xs text-heading">
            <a href="https://github.com/smg02" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/ghouse02/" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
            <a href="mailto:syedmdghouse02@gmail.com" className="hover:text-brand-primary transition-colors">Email</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
