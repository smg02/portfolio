import { Target, Terminal, Database, Server, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export function Skills() {
  const highlightWeapons = [
    'Python', 'React', 'SQL', 'Airflow', 'Docker', 'Linux', 'APIs', 'Playwright', 'Git'
  ];

  const categories = [
    {
      title: 'Languages',
      icon: <Terminal className="w-3.5 h-3.5 text-brand-primary" />,
      color: 'primary',
      items: ['Python 3.12+', 'SQL (PostgreSQL, DuckDB)', 'JavaScript / TypeScript', 'Bash & Shell Scripting']
    },
    {
      title: 'Data & Automation',
      icon: <Database className="w-3.5 h-3.5 text-brand-secondary" />,
      color: 'secondary',
      items: ['Apache Airflow', 'Pandas & Polars', 'Playwright & Scrapy', 'DuckDB & Parquet']
    },
    {
      title: 'Backend & Frontend',
      icon: <Server className="w-3.5 h-3.5 text-brand-primary" />,
      color: 'primary',
      items: ['FastAPI & Flask', 'React.js & Tailwind', 'REST & WebSockets', 'Celery & Redis Queues']
    },
    {
      title: 'Infrastructure & Tooling',
      icon: <Settings className="w-3.5 h-3.5 text-playground-a10" />,
      color: 'a10',
      items: ['Docker & Containers', 'Linux / Ubuntu Server', 'Git & GitHub Actions CI/CD', 'AWS (S3, ECS, Lambdas)']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto border-t border-brand-primary/25">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="text-xs uppercase tracking-wider text-brand-primary font-mono font-bold">SKILLS & TOOLING</span>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-heading tracking-tight mt-2">
          My toys
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-[2rem] p-8 sm:p-10 mb-12 text-center"
      >
        <p className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-6 font-bold flex items-center justify-center gap-2">
          <Target className="w-3.5 h-3.5 text-brand-primary" />
          <span>Highlighted Weapons of Choice</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-3xl mx-auto">
          {highlightWeapons.map((weapon, idx) => (
            <div key={weapon} className="flex items-center gap-2.5 sm:gap-3.5">
              <span className="font-display text-base sm:text-lg font-bold px-5 py-2.5 rounded-full glass-panel text-heading hover:border-brand-primary hover:text-brand-primary hover:-translate-y-1 hover:shadow-lg transition-all cursor-default">
                {weapon}
              </span>
              {idx < highlightWeapons.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/50 hidden sm:block"></span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
      >
        {categories.map((cat, i) => (
          <motion.div 
            variants={itemVariants} 
            key={i} 
            className="p-6 rounded-2xl glass-panel hover:-translate-y-1 hover:border-brand-primary/60 transition-all"
          >
            <h4 className={`font-mono text-xs font-bold tracking-wider mb-4 uppercase flex items-center gap-2 ${
              cat.color === 'primary' ? 'text-brand-primary' : cat.color === 'secondary' ? 'text-brand-secondary' : 'text-playground-a10'
            }`}>
              {cat.icon}
              <span>{cat.title}</span>
            </h4>
            <ul className="space-y-2 text-sm text-heading font-mono">
              {cat.items.map(item => (
                <li key={item} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand-secondary/60"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
