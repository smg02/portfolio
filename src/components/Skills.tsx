import { motion } from 'motion/react';
import { Terminal, Database, Server, Wrench, Bookmark } from 'lucide-react';

export function Skills() {
  const highlightedInstruments = [
    'Python 3.12+', 'DuckDB', 'Apache Airflow', 'FastAPI', 'PostgreSQL', 'Docker', 'Linux', 'Playwright', 'Redis'
  ];

  const classifiedSections = [
    {
      num: '01',
      category: 'LANGUAGES & RUNTIMES',
      icon: <Terminal className="w-4 h-4 text-heading" />,
      items: [
        { name: 'Python 3.12+', spec: 'AsyncIO, Typing, Pydantic, OOP' },
        { name: 'SQL & Query Engines', spec: 'PostgreSQL, DuckDB, SQLite' },
        { name: 'JavaScript & TypeScript', spec: 'React, Node.js, Next.js' },
        { name: 'Shell / Bash Scripting', spec: 'POSIX, Automation, Cron' },
      ]
    },
    {
      num: '02',
      category: 'DATA & AUTOMATION ENGINES',
      icon: <Database className="w-4 h-4 text-heading" />,
      items: [
        { name: 'Apache Airflow', spec: 'DAG Scheduling, Sensors, Operators' },
        { name: 'Pandas & DuckDB', spec: 'High-throughput vectorized ETL' },
        { name: 'Playwright & Scraping', spec: 'Headless swarms, stealth sessions' },
        { name: 'Apache Parquet / Snappy', spec: 'Columnar formats, partition pruning' },
      ]
    },
    {
      num: '03',
      category: 'BACKEND & CONCURRENCY',
      icon: <Server className="w-4 h-4 text-heading" />,
      items: [
        { name: 'FastAPI & Flask', spec: 'Asynchronous microservices, OpenAPI' },
        { name: 'Redis & Celery', spec: 'Distributed queues, pub/sub caches' },
        { name: 'React & Modern Web', spec: 'High-performance UI, State machines' },
        { name: 'REST & WebSockets', spec: 'Streaming feeds, strict JSON schemas' },
      ]
    },
    {
      num: '04',
      category: 'SYSTEMS & INFRASTRUCTURE',
      icon: <Wrench className="w-4 h-4 text-heading" />,
      items: [
        { name: 'Docker & Swarms', spec: 'Container hardening, compose stacks' },
        { name: 'Linux / Ubuntu Server', spec: 'Systemd, SSH, networking, cron' },
        { name: 'Git & GitHub Actions', spec: 'Trunk-based development, CI/CD' },
        { name: 'AWS Cloud Services', spec: 'S3 Lakehouses, EC2, IAM policies' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Department Section Ribbon */}
      <div className="flex items-center justify-between border-b-2 border-border-ink pb-2 mb-8 font-mono text-xs uppercase tracking-widest text-muted select-none">
        <div className="flex items-center gap-2">
          <span className="bg-heading text-page px-2 py-0.5 font-bold">PAGE 05</span>
          <span className="font-bold text-heading">THE CLASSIFIEDS // INVENTORY</span>
        </div>
        <span className="hidden sm:inline">OFFICIAL HARDWARE & SOFTWARE MANIFEST</span>
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold block mb-1">
          REGISTERED ARSENAL
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-heading tracking-tight">
          Technical Skills // Tools &amp; Runtimes
        </h2>
        <p className="font-editorial italic text-base sm:text-lg text-muted mt-2">
          All equipment certified for continuous autonomous operations and high-load production workloads.
        </p>
      </div>

      {/* Highlighted Classified Notice Board */}
      <div className="p-6 sm:p-8 bg-page-soft border-2 border-border-ink shadow-[4px_4px_0px_var(--border-ink)] mb-12 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-heading mb-4 pb-1 border-b border-border-ink">
          <Bookmark className="w-3.5 h-3.5 text-heading" />
          <span>PRIMARY WEAPONS OF CHOICE</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-4xl mx-auto">
          {highlightedInstruments.map((instrument) => (
            <span
              key={instrument}
              className="font-mono text-xs sm:text-sm font-bold px-3.5 py-1.5 border border-border-ink bg-card text-heading shadow-[2px_2px_0px_var(--border-ink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform select-none"
            >
              {instrument}
            </span>
          ))}
        </div>
      </div>

      {/* Classified Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classifiedSections.map((section, idx) => (
          <div
            key={idx}
            className="broadsheet-card p-5 flex flex-col justify-between"
          >
            <div>
              {/* Classified Header */}
              <div className="flex items-center justify-between border-b border-border-ink pb-2 mb-4 font-mono text-[11px]">
                <span className="font-bold text-heading">CLASSIFIED #{section.num}</span>
                {section.icon}
              </div>

              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-heading mb-4">
                {section.category}
              </h4>

              {/* Items */}
              <div className="space-y-3 font-mono text-xs">
                {section.items.map((item, i) => (
                  <div key={i} className="border-b border-border-subtle pb-2">
                    <div className="font-bold text-heading">{item.name}</div>
                    <div className="text-[11px] text-muted font-normal mt-0.5">{item.spec}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border-subtle text-[10px] font-mono text-muted text-right">
              STATUS: AUDITED ✓
            </div>
          </div>
        ))}
      </div>

      {/* Broadsheet Rule Ending Skills Section */}
      <div className="mt-14 rule-double-bottom"></div>
    </section>
  );
}
