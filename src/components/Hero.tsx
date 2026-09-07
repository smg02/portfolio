import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const tickerItems = [
    'WIRE DISPATCH: Sovereign bond pipeline processed 850k+ daily instruments without tick drops',
    'SYSTEM TELEMETRY: Headless scraping cluster running across 16 worker nodes at 99.4% proxy bypass',
    'PIPELINE STATUS: Apache Airflow DAGs executing with sub-42s SLA latency',
    'CATALOG BENCHMARK: FastAPI & PostgreSQL data catalog API returning P99 14ms query responses',
    'ENGINEERING PRINCIPLE: Fault-tolerant architecture over silent data drops',
  ];

  return (
    <section className="relative pt-6 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Front Page Broadsheet Masthead */}
      <div className="text-center pb-6">
        <div className="flex items-center justify-between border-y border-border-subtle py-1.5 px-2 mb-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted select-none">
          <span>THE LEADING DISPATCH ON DATA ENGINEERING & SYSTEM ARCHITECTURE</span>
          <span className="hidden md:inline">PRICE: OPEN TO COLLABORATION</span>
          <span>EST. 2024</span>
        </div>

        {/* Grand Newspaper Masthead Title */}
        <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-heading leading-[0.92] my-3">
          BotPlayground
          <span className="sr-only"> — Mohammed Ghouse (Syed Mohammed Ghouse) | Python Developer & Data Engineer</span>
        </h1>

        {/* Publisher Credit & Name Anchor */}
        <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-heading mt-1 mb-2">
          THE ENGINEERING DISPATCHES OF MOHAMMED GHOUSE <span className="text-muted font-normal">(SYED MOHAMMED GHOUSE)</span>
        </div>

        {/* Motto / Sub-masthead */}
        <p className="font-serif italic text-sm sm:text-base md:text-lg text-muted mt-1 mb-4">
          "All the code that's fit to run — Architectural rigor, autonomous engines, and deterministic pipelines."
        </p>

        {/* Double Rule separating Masthead from Front Page Stories */}
        <div className="rule-double pt-1 pb-1">
          <div className="border-t border-border-ink"></div>
        </div>
      </div>

      {/* Live Breaking News Wire Ticker */}
      <div className="border-y-2 border-border-ink bg-page-soft py-2 px-3 mb-8 flex items-center gap-3 overflow-hidden select-none">
        <div className="flex items-center gap-2 bg-heading text-page px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider shrink-0">
          <span>WIRE TICKER</span>
        </div>
        <div className="ticker-wrap font-mono text-xs text-heading font-medium tracking-wide">
          <div className="ticker-move space-x-12">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-3">
                <span>{item}</span>
                <span className="text-muted font-bold">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Front Page Main Content Grid: Broadsheet Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Main Lead Story (Left & Center: 8 cols) */}
        <div className="lg:col-span-8 space-y-6 lg:border-r lg:border-border-subtle lg:pr-10">
          {/* Dateline & Byline */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-3">
            <div className="font-mono text-xs text-muted uppercase tracking-wider">
              <span className="font-bold text-heading">BY MOHAMMED GHOUSE</span>
              <span className="mx-2">/</span>
              <span>SPECIAL DISPATCH FROM VELLORE</span>
            </div>
            <div className="news-stamp text-[10px]">
              VERIFIED ARCHITECTURE
            </div>
          </div>

          {/* Lead Headline */}
          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.05]">
              We build resilient systems that turn complex, chaotic data into autonomous engines.
            </h2>
            <p className="font-sans text-base sm:text-lg text-muted font-medium leading-relaxed">
              Specializing in fault-tolerant data pipelines, automated ETL infrastructure, high-concurrency backend services, and scalable scrapers engineered never to drop a tick.
            </p>
          </div>

          {/* Editorial Lead Paragraph with Classical Drop-Cap */}
          <div className="text-body text-sm sm:text-base leading-relaxed space-y-4 pt-2 font-editorial">
            <p className="dropcap text-justify sm:text-left">
              Data pipelines exist in hostile environments where third-party APIs mutate without warning, distributed worker fleets face silent rate limits, and market feeds swing violently in volume. Building resilient infrastructure requires defensive programming, immutable ledger models, automated circuit breakers, and deterministic state transitions.
            </p>
            <p className="text-justify sm:text-left">
              From harvesting institutional securities curves across fragmented central bank repositories to coordinating distributed headless browser swarms that bypass anti-bot protections, my focus is singular: architecting systems that execute with mechanical certainty.
            </p>
          </div>

          {/* Front Page Interactive Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="btn-broadsheet inline-flex items-center gap-2.5 px-6 py-3 text-xs uppercase"
            >
              <span>Inspect Dispatches</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#about"
              className="btn-broadsheet-outline inline-flex items-center gap-2 px-6 py-3 text-xs uppercase"
            >
              <span>Read Op-Ed Philosophy</span>
            </a>
          </div>
        </div>

        {/* Right Broadsheet Column / Front Page Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Feature Box 1: Field Spec Dispatch */}
          <div className="broadsheet-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border-ink pb-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-heading">
                DOSSIER // SPECIFICATION
              </span>
              <span className="font-mono text-[10px] text-muted">REF #01</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                <span className="text-muted">PRIMARY ROLE</span>
                <span className="font-bold text-heading">Python & Data Engineer</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                <span className="text-muted">CORE CORE</span>
                <span className="font-bold text-heading">Python 3.12 · DuckDB · Airflow</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                <span className="text-muted">BACKEND INFRA</span>
                <span className="font-bold text-heading">FastAPI · PostgreSQL · Redis</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border-subtle">
                <span className="text-muted">STATUS</span>
                <span className="font-bold text-heading inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-heading animate-ping"></span>
                  ACTIVE PIPELINES
                </span>
              </div>
            </div>

            <div className="p-3 bg-page-soft border border-border-subtle font-serif italic text-xs leading-relaxed text-muted">
              "This isn't just a playground. It's where ideas become working systems."
            </div>
          </div>

          {/* Feature Box 2: Guarantees */}
          <div className="p-5 border-2 border-border-ink bg-page space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-heading flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Operational Guarantees</span>
            </h3>

            <ul className="space-y-2.5 font-mono text-xs text-body">
              {[
                'Zero silent data drops under peak volume',
                'Schema contracts validated via Pydantic & SQL',
                'Fault-tolerant retry exponential backoffs',
                'Automated webhook anomaly alerts'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-heading shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Heavy Broadsheet Rule Ending Front Page Hero */}
      <div className="mt-12 rule-double-bottom"></div>
    </section>
  );
}
