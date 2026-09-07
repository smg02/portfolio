import { motion } from 'motion/react';
import { Award, ShieldCheck } from 'lucide-react';

export function Competencies() {
  const pillars = [
    {
      num: '01',
      title: 'Python & Data Engineering',
      desc: 'Fault-tolerant ETL pipelines, Pandas and DuckDB transformations, robust schema validation, and high-throughput data processing engines.',
      tags: ['ETL Pipelines', 'Pandas & DuckDB', 'Schema Contracts', 'Processing'],
      status: 'VERIFIED'
    },
    {
      num: '02',
      title: 'Financial Data Architecture',
      desc: 'Institutional securities modeling, sovereign bond yield curves, high-precision reference data normalization, and continuous market feed parsing.',
      tags: ['Securities', 'Sovereign Bonds', 'Basis Normalization', 'Tick Feeds'],
      status: 'AUDITED'
    },
    {
      num: '03',
      title: 'Autonomous Swarms & Scraping',
      desc: 'Resilient headless scraping, DAG-scheduled jobs, Airflow orchestration, proactive anomaly monitoring, and end-to-end workflow automation.',
      tags: ['Playwright', 'Airflow DAGs', 'DOM Anomaly Engine', 'Webhooks'],
      status: 'ACTIVE'
    },
    {
      num: '04',
      title: 'High-Concurrency Backend Systems',
      desc: 'High-performance asynchronous services with FastAPI and Flask, reactive dashboard interfaces with React, and strictly indexed SQL schemas.',
      tags: ['FastAPI', 'PostgreSQL', 'Redis Queues', 'Strict Pydantic'],
      status: 'SUB-15MS'
    },
    {
      num: '05',
      title: 'Infrastructure, Linux & DevOps',
      desc: 'Production Linux server hardening, containerized worker swarms with Docker, resilient Git trunk-based workflows, automated CI/CD releases, and scalable cloud S3 lakehouse sinks.',
      tags: ['Linux / Ubuntu', 'Docker Swarms', 'GitHub Actions', 'AWS S3 Lakehouse'],
      wide: true,
      status: 'PRODUCTION HARBOR'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
  };

  return (
    <section id="themes" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Department Section Ribbon */}
      <div className="flex items-center justify-between border-b-2 border-border-ink pb-2 mb-8 font-mono text-xs uppercase tracking-widest text-muted select-none">
        <div className="flex items-center gap-2">
          <span className="bg-heading text-page px-2 py-0.5 font-bold">PAGE 03</span>
          <span className="font-bold text-heading">SPECIAL REPORT // PILLARS</span>
        </div>
        <span className="hidden sm:inline">DISCIPLINARY AUDIT</span>
      </div>

      {/* Section Title */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-muted uppercase tracking-widest mb-2">
          <Award className="w-3.5 h-3.5 text-heading" />
          <span>Core Engineering Disciplines</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-heading tracking-tight">
          The Five Architectural Pillars
        </h2>
        <p className="font-editorial italic text-base sm:text-lg text-muted mt-2 max-w-3xl">
          Disciplines engineered to convert fragmented, chaotic ingestion into deterministic pipelines that run autonomously.
        </p>
      </div>

      {/* Broadsheet Columns Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {pillars.map((pillar, i) => (
          <motion.div 
            variants={itemVariants} 
            key={i} 
            className={`broadsheet-card p-6 flex flex-col justify-between ${
              pillar.wide ? 'md:col-span-2 lg:col-span-2' : ''
            }`}
          >
            <div>
              {/* Header inside pillar column */}
              <div className="flex items-center justify-between border-b border-border-ink pb-3 mb-4 font-mono text-xs">
                <span className="font-black text-heading text-sm">
                  DISPATCH // #{pillar.num}
                </span>
                <span className="news-stamp text-[9px] px-1.5 py-0.5">
                  {pillar.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-heading mb-3 leading-snug">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-editorial text-muted text-sm sm:text-base leading-relaxed mb-6">
                {pillar.desc}
              </p>
            </div>

            {/* Tags Ribbon */}
            <div className="pt-4 border-t border-border-subtle flex flex-wrap gap-1.5 font-mono text-[11px]">
              {pillar.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-0.5 border border-border-ink bg-page-soft text-heading font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Broadsheet Rule Ending Competencies Section */}
      <div className="mt-14 rule-double-bottom"></div>
    </section>
  );
}
