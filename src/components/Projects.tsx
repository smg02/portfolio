import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Database, Activity, Cpu } from 'lucide-react';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ETL' | 'AUTOMATION' | 'BACKEND'>('ALL');

  const projects = [
    {
      id: 'bond-engine',
      category: 'ETL',
      type: 'Financial Data & ETL',
      edition: 'DISPATCH #104',
      headline: 'Automated Sovereign Bond & Market Yield Ingestion Engine',
      dateline: 'LONDON / HYDERABAD',
      desc: 'Automated multi-sovereign bond curve harvest and yield parser that consumes heterogeneous central bank APIs and financial repositories. Sanitizes coupon maturities, executes currency basis normalization, and partitions into S3 Parquet tables without missing an order tick.',
      tags: ['Python', 'Apache Airflow', 'DuckDB', 'Pandas', 'AWS S3'],
      telemetry: [
        { label: 'DAILY SECURITIES HARVEST', val: '850,000+', note: 'Zero dropped ticks' },
        { label: 'EXECUTION SLA BENCHMARK', val: '< 42.0 SECONDS', note: 'Airflow DAG automated' },
        { label: 'SINK DESTINATION', val: 'S3 // SNAPPY PARQUET', note: 'Partitioned by maturity' },
        { label: 'BASIS DRIFT TOLERANCE', val: '0.00% DRIFT', note: 'Strict floating precision' },
      ],
      stamp: 'PRODUCTION CERTIFIED'
    },
    {
      id: 'scraping-cluster',
      category: 'AUTOMATION',
      type: 'Automation & Scraping Fleet',
      edition: 'DISPATCH #089',
      headline: 'Headless Web Scraping & DOM Anomaly Monitoring Cluster',
      dateline: 'DISTRIBUTED NODES',
      desc: 'Autonomous, stealth headless browser fleet engineered with distributed proxies and automated circuit breakers. Detects sudden DOM schema mutations, rotates sessions, and dispatches webhook alerts upon price anomaly or anti-bot detection.',
      tags: ['Playwright', 'Celery', 'Redis', 'Docker', 'Python'],
      telemetry: [
        { label: 'PROXY BYPASS RATE', val: '99.4% SUCCESS', note: 'Fingerprint randomized' },
        { label: 'SWARM CONCURRENCY', val: '16 DOCKER WORKERS', note: 'Rate: 450 RPM' },
        { label: 'DOM ANOMALY DETECTION', val: 'SHA-256 HASH VERIFIED', note: '1,200+ target endpoints' },
        { label: 'FAILED RETRY DROPS', val: '0 DROPPED REQUESTS', note: 'Exponential backoff' },
      ],
      stamp: 'BATTLE TESTED'
    },
    {
      id: 'valuation-api',
      category: 'BACKEND',
      type: 'Backend & High-Throughput API',
      edition: 'DISPATCH #067',
      headline: 'Full-Stack Data Catalog & Asset Valuation Engine',
      dateline: 'CLOUD SERVICES',
      desc: 'Unified asset evaluation backend serving high-concurrency requests with FastAPI and PostgreSQL. Features real-time reactive tabular views built in React, caching layer in Redis, and strict Pydantic contract validation enforced across all endpoints.',
      tags: ['FastAPI', 'React', 'PostgreSQL', 'Redis', 'Pydantic'],
      telemetry: [
        { label: 'P99 QUERY LATENCY', val: '14.0 MILLISECONDS', note: 'Strictly indexed SQL' },
        { label: 'ENDPOINT TEST COVERAGE', val: '96.8% AUTOMATED', note: 'Pytest + CI pipeline' },
        { label: 'CONTRACT VALIDATION', val: '100% PYDANTIC', note: 'Strict schema guarantee' },
        { label: 'CACHE HIT RATIO', val: '94.2% IN REDIS', note: 'Sub-millisecond memory' },
      ],
      stamp: 'LOW LATENCY'
    }
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Department Section Ribbon */}
      <div className="flex items-center justify-between border-b-2 border-border-ink pb-2 mb-8 font-mono text-xs uppercase tracking-widest text-muted select-none">
        <div className="flex items-center gap-2">
          <span className="bg-heading text-page px-2 py-0.5 font-bold">PAGE 04</span>
          <span className="font-bold text-heading">FEATURE INVESTIGATIONS // CASE STUDIES</span>
        </div>
        <span className="hidden sm:inline">FIELD LOGS & PIPELINE REPORTS</span>
      </div>

      {/* Headline & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-border-subtle">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold block mb-1">
            VERIFIED CASE LOGS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-heading tracking-tight">
            Projects // Selected Deployments
          </h2>
        </div>

        {/* Interactive Broadsheet Department Filters */}
        <div className="flex flex-wrap gap-2 font-mono text-xs font-bold">
          {(['ALL', 'ETL', 'AUTOMATION', 'BACKEND'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 border border-border-ink transition-all ${
                activeFilter === filter
                  ? 'bg-heading text-page shadow-[2px_2px_0px_var(--border-ink)]'
                  : 'bg-card text-heading hover:bg-page-soft shadow-[1px_1px_0px_var(--border-ink)]'
              }`}
            >
              {filter === 'ALL' ? 'ALL DISPATCHES' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* In-Depth Article Cards */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              className="broadsheet-card p-6 sm:p-8"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-ink pb-3 mb-6 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-heading">{project.edition}</span>
                  <span className="text-border-subtle">|</span>
                  <span className="text-muted">{project.type}</span>
                  <span className="text-border-subtle hidden sm:inline">|</span>
                  <span className="text-muted hidden sm:inline">{project.dateline}</span>
                </div>
                <div className="news-stamp text-[10px]">
                  {project.stamp}
                </div>
              </div>

              {/* Title & Description Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-heading leading-snug">
                    {project.headline}
                  </h3>
                  <p className="font-editorial text-muted text-base sm:text-lg leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Tags */}
                  <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 border border-border-ink bg-page-soft text-heading font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Financial Newspaper Style Telemetry Table */}
                <div className="lg:col-span-5 bg-page-soft border-2 border-border-ink p-4 space-y-3">
                  <div className="font-mono text-[11px] font-bold text-heading uppercase tracking-wider pb-2 border-b border-border-ink flex items-center justify-between">
                    <span>FINANCIAL / TELEMETRY METRICS</span>
                    <span>SLA LOG</span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    {project.telemetry.map((t, tidx) => (
                      <div key={tidx} className="border-b border-border-subtle pb-2">
                        <div className="flex justify-between items-baseline gap-2">
                          <span className="text-[11px] text-muted">{t.label}:</span>
                          <span className="font-bold text-heading text-right">{t.val}</span>
                        </div>
                        <div className="text-[10px] text-muted italic text-right">
                          {t.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Broadsheet Rule Ending Projects Section */}
      <div className="mt-14 rule-double-bottom"></div>
    </section>
  );
}
