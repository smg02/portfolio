import { motion } from 'motion/react';

export function Competencies() {
  const pillars = [
    {
      num: '01',
      title: 'Python & Data Engineering',
      desc: 'Fault-tolerant ETL pipelines, Pandas transformations, robust schema validation, and high-throughput data processing engines.',
      tags: ['ETL Pipelines', 'Pandas', 'APIs', 'Processing'],
      color: 'primary'
    },
    {
      num: '02',
      title: 'Financial Data',
      desc: 'Institutional securities modeling, sovereign bonds yields, high-precision reference data normalization, and continuous market feed parsing.',
      tags: ['Securities', 'Sovereign Bonds', 'Reference Data', 'Market Sources'],
      color: 'secondary'
    },
    {
      num: '03',
      title: 'Automation',
      desc: 'Resilient headless scraping, DAG-scheduled jobs, Airflow orchestration, proactive anomaly monitoring, and end-to-end workflow automation.',
      tags: ['Scraping', 'Scheduled Jobs', 'Airflow', 'Monitoring'],
      color: 'a20'
    },
    {
      num: '04',
      title: 'Backend & Full-Stack',
      desc: 'High-performance asynchronous services with Flask and Node.js, reactive dashboard interfaces with React, and strictly indexed SQL schemas.',
      tags: ['Flask', 'Node.js', 'React', 'SQL & REST'],
      color: 'primary'
    },
    {
      num: '05',
      title: 'Infrastructure & DevOps',
      desc: 'Production Linux server hardening, containerized worker swarms with Docker, resilient Git trunk-based workflows, automated CI/CD releases, and scalable cloud object storage sinks.',
      tags: ['Linux', 'Docker', 'Git', 'CI/CD', 'Cloud / S3 Storage'],
      color: 'secondary',
      wide: true,
      status: 'PRODUCTION READY'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="themes" className="py-20 px-6 max-w-6xl mx-auto space-y-10 border-t border-brand-primary/25">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="px-4 py-1.5 rounded-full glass-panel text-xs font-mono text-brand-primary uppercase tracking-wider font-bold border border-brand-primary/30">
          Core Competencies
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-heading tracking-tight mt-6">
          Five Engineering Pillars
        </h2>
        <p className="text-muted text-sm sm:text-base mt-4">
          Disciplines engineered to convert chaotic ingestion into deterministic pipelines.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {pillars.map((p, i) => (
          <motion.div 
            variants={itemVariants} 
            key={i} 
            className={`glass-card rounded-2xl p-7 flex flex-col justify-between ${p.wide ? 'md:col-span-2 lg:col-span-2' : ''}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-xs font-bold ${
                  p.color === 'primary' ? 'text-brand-primary' : p.color === 'secondary' ? 'text-brand-secondary' : 'text-playground-a20'
                }`}>
                  [{p.num}]
                </span>
                {p.status ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-playground-a20 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-playground-a20 pulse-a20"></span> {p.status}
                  </span>
                ) : (
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    p.color === 'primary' ? 'bg-brand-primary pulse-primary' : p.color === 'secondary' ? 'bg-brand-secondary pulse-secondary' : 'bg-playground-a20 pulse-a20'
                  }`}></span>
                )}
              </div>
              <h3 className="font-display text-xl font-bold text-heading mb-3">
                {p.title}
              </h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                {p.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-primary/20">
              {p.tags.map(tag => (
                <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full glass-pill text-heading hover:border-brand-primary/60 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
