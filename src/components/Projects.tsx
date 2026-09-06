import { Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function Projects() {
  const projects = [
    {
      type: 'Financial Data & ETL',
      status: 'ACTIVE PIPELINE',
      statusColor: 'primary',
      title: 'Automated Sovereign Bond & Market Yield Ingestion Engine',
      desc: 'Automated multi-sovereign bond curve harvest and yield parser that consumes heterogeneous central bank APIs and financial repositories. Sanitizes coupon maturities, executes currency basis normalization, and partitions into S3 Parquet tables without missing an order tick.',
      tags: ['Python', 'Apache Airflow', 'DuckDB', 'Pandas', 'AWS S3'],
      metrics: {
        title: 'YIELD_HARVEST_DAG',
        drift: '0.00% DRIFT',
        stat1Label: 'Daily Securities',
        stat1Value: '850k+',
        stat2Label: 'Execution SLA',
        stat2Value: '< 42.0s',
        stat2Color: 'text-brand-primary',
        infoLabel: 'sink:',
        infoDesc: 'Parquet snappy partitions wrote to s3://market-lakehouse/yields',
        color: 'primary'
      }
    },
    {
      type: 'Automation & Scraping',
      status: 'DISTRIBUTED',
      statusColor: 'secondary',
      title: 'Headless Web Scraping & Anomaly Monitoring Cluster',
      desc: 'Autonomous, stealth headless browser fleet engineered with distributed proxies and automated circuit breakers. Detects sudden DOM schema mutations, rotates sessions, and notifies Discord/Slack webhooks upon price anomaly detection.',
      tags: ['Playwright', 'Celery', 'Redis', 'Docker', 'Python'],
      metrics: {
        title: 'WORKER_SWARM // 16 NODES',
        drift: 'RATE: 450 RPM',
        driftColor: 'text-muted',
        stat1Label: 'Proxy Bypass Rate',
        stat1Value: '99.4%',
        stat1Color: 'text-brand-secondary',
        stat2Label: 'Failed Retries',
        stat2Value: '0 Dropped',
        infoLabel: 'health:',
        infoDesc: 'DOM hash verified across 1,200 commercial endpoints.',
        color: 'secondary'
      }
    },
    {
      type: 'Backend & Full-Stack',
      status: 'REST + WEBSOCKETS',
      statusColor: 'a20',
      title: 'Full-Stack Data Catalog & Asset Valuation API',
      desc: 'Unified asset evaluation backend serving high-concurrency requests with FastAPI and PostgreSQL. Features real-time reactive tabular views built in React, caching layer in Redis, and strict Pydantic contract validation.',
      tags: ['FastAPI', 'React', 'PostgreSQL', 'SQL', 'CI/CD'],
      metrics: {
        title: 'ENDPOINT_BENCHMARK',
        drift: 'P99: 14ms',
        stat1Label: 'Query Latency',
        stat1Value: '8.2ms',
        stat1Color: 'text-brand-secondary',
        stat2Label: 'Test Coverage',
        stat2Value: '96.8%',
        infoLabel: 'contracts:',
        infoDesc: '100% Pydantic typing enforced across 48 API routes.',
        color: 'primary'
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-brand-primary/25">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center md:text-left"
      >
        <span className="text-xs uppercase tracking-wider text-brand-primary font-mono font-bold">PROJECTS</span>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-heading tracking-tight mt-2 mb-3">
          Things I've built in the playground
        </h2>
        <p className="text-muted text-sm sm:text-base font-normal tracking-wide">
          Real projects. Real data. Real problems. No "Hello World" required.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-8"
      >
        {projects.map((proj, idx) => (
          <motion.article 
            variants={itemVariants} 
            key={idx} 
            className="glass-card rounded-[2rem] p-7 lg:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full glass-pill text-brand-primary font-mono text-[11px] font-bold border border-brand-primary/30">
                    {proj.type}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border ${
                    proj.statusColor === 'primary' 
                      ? 'bg-brand-primary/15 text-brand-primary border-brand-primary/40' 
                      : proj.statusColor === 'secondary'
                      ? 'bg-brand-secondary/15 text-brand-secondary border-brand-secondary/40'
                      : 'bg-playground-a20/15 text-playground-a20 border-playground-a20/40'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-heading tracking-tight">
                  {proj.title}
                </h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full glass-pill text-heading hover:border-brand-primary/60 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 glass-panel rounded-2xl p-5 font-mono text-xs shadow-inner space-y-3 border border-brand-primary/25">
                <div className="flex items-center justify-between pb-3 border-b border-brand-primary/20 text-[11px] text-muted">
                  <span className="flex items-center gap-2 text-heading font-bold">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      proj.metrics.color === 'primary' ? 'bg-brand-primary pulse-primary' : 'bg-brand-secondary pulse-secondary'
                    }`}></span> 
                    {proj.metrics.title}
                  </span>
                  <span className={`font-bold ${proj.metrics.driftColor || 'text-brand-secondary'}`}>{proj.metrics.drift}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-center">
                  <div className="glass-pill p-3 rounded-xl border-brand-primary/20">
                    <div className="text-muted text-[10px] uppercase font-bold">{proj.metrics.stat1Label}</div>
                    <div className={`text-base font-bold mt-0.5 ${proj.metrics.stat1Color || 'text-heading'}`}>{proj.metrics.stat1Value}</div>
                  </div>
                  <div className="glass-pill p-3 rounded-xl border-brand-primary/20">
                    <div className="text-muted text-[10px] uppercase font-bold">{proj.metrics.stat2Label}</div>
                    <div className={`text-base font-bold mt-0.5 ${proj.metrics.stat2Color || 'text-heading'}`}>{proj.metrics.stat2Value}</div>
                  </div>
                </div>
                <div className="p-2.5 glass-pill rounded-xl border-brand-primary/20 text-[11px] text-muted flex items-start gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-secondary shrink-0 mt-0.5" />
                  <div><span className="text-brand-secondary font-bold">{proj.metrics.infoLabel}</span> {proj.metrics.infoDesc}</div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
