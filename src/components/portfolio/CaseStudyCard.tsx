"use client";

import Link from "next/link";
import {
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export interface CaseStudyData {
  id: string;
  badge: string;
  title: string;
  clientType: string;
  techStack: string[];
  bottleneck: string;
  architecture: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  ctaLabel?: string;
  externalUrl?: string;
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: "field_operations_ocr",
    badge: "FIELD OPERATIONS & EMBEDDED OCR",
    title: "Gradilište OS: Field Operations PWA & On-Device Ticket OCR",
    clientType: "Heavy Construction & Concrete Pour Logistics",
    techStack: [
      "SvelteKit (Field PWA) + Next.js 16 (Command Portal)",
      "PocketBase (Embedded SQLite WAL)",
      "IndexedDB Outbox",
      "Web Workers OCR",
      "Docker + Caddy v2",
    ],
    bottleneck:
      "90-minute batch hydration cutoffs on site and cellular blindspots caused lost delivery tickets, chaotic handwritten daily logs, and recurrent contractor billing disputes. Supervisors refused cumbersome enterprise desktop software.",
    architecture:
      "Engineered a split-surface architecture: a runtime-light SvelteKit Field PWA with on-device WebAssembly camera OCR and an IndexedDB UUIDv7 outbox queue, paired with a Next.js 16 Command Portal backed by PocketBase (Embedded SQLite WAL) on a single-tenant Hetzner VPS.",
    outcome:
      "Zero batch rejection disputes across hundreds of continuous pours. 80% reduction in administrative ticketing delay, €0 recurring per-seat licensing, and an amortized infrastructure footprint under €15/month.",
    metrics: [
      { label: "Ticketing Delay", value: "-80%" },
      { label: "Recurring Seat Fees", value: "€0" },
      { label: "Infra Footprint", value: "< €15/mo" },
    ],
    liveUrl: "/case-studies/gradiliste-os",
    ctaLabel: "Read Technical Case Study",
    externalUrl: "https://gradiliste.dukatrio.com",
  },
  {
    id: "capital_syndication_terminal",
    badge: "FINTECH & ALGORITHMIC UNDERWRITING",
    title: "Funding Desk: SvelteKit Commercial Debt & DSCR Underwriting Terminal",
    clientType: "Commercial Capital Advisory & Private Debt Underwriting",
    techStack: [
      "SvelteKit 2",
      "TypeScript Kernel",
      "PostgreSQL / SQLite WAL",
      "AES-256 KYC Vault",
      "Caddy v2",
      "Hetzner Cloud VPS",
    ],
    bottleneck:
      "Legacy underwriting operations relied on fragile 40MB multi-tab Excel workbooks, unencrypted borrower email attachments, and 72-hour calculation turnarounds on multi-million dollar commercial loan applications.",
    architecture:
      "Constructed a high-speed SvelteKit 2 client intake platform on a single-tenant Hetzner VPS, featuring a deterministic TypeScript ratio kernel (DSCR, MCA debt consolidation, stress haircuts), automated vector PDF term-sheet generation, and AES-256 encrypted KYC storage.",
    outcome:
      "Reduced borrower stress-decisioning from 72 hours to under 60 seconds. Eliminated recurring €8.4k/yr commercial lending SaaS fees with 100% sovereign database ownership and <€15/mo server costs.",
    metrics: [
      { label: "Stress Decisioning", value: "< 60s" },
      { label: "Recurring Seat Fees", value: "€0" },
      { label: "Analyzed Pipeline", value: "€14M+" },
    ],
    liveUrl: "/case-studies/fundingdesk",
    ctaLabel: "Read Funding Desk Study",
    externalUrl: "https://fundingdesk.dukatrio.com",
  },
  {
    id: "b2b_portal",
    badge: "B2B CLIENT PORTAL & RBAC",
    title: "Enterprise Document Vault & Operations Management Hub",
    clientType: "Institutional Advisory Firm · Vienna / DACH Region",
    techStack: ["React 19", "Tailwind CSS", "AES-256 Storage", "Node.js 22 LTS", "PM2 Cluster"],
    bottleneck:
      "Confidential client financials and tax audits were transmitted via unencrypted email attachments, creating severe GDPR liability and giving management zero visibility into client onboarding status.",
    architecture:
      "Constructed a zero-trust multi-tenant portal with hardware AES-256 field-level encryption, role-based access control (RBAC), drag-and-drop secure upload dropzones, and real-time audit logging.",
    outcome:
      "Zero compliance infractions across independent security audits, 4.2x faster client onboarding throughput, and complete Docker/Git repository IP transfer upon delivery.",
    metrics: [
      { label: "Onboarding Speed", value: "4.2x Faster" },
      { label: "Security Classification", value: "AES-256" },
      { label: "Compliance Pass", value: "100%" },
    ],
    liveUrl: "#contact",
    ctaLabel: "Request Demo Access",
  },
  {
    id: "edge_migration",
    badge: "HIGH-THROUGHPUT CLOUD INFRASTRUCTURE",
    title: "Bare-Metal Linux Cloud Pod & Edge TLS Modernization",
    clientType: "SaaS Scaleup · Global Traffic",
    techStack: ["Linux Ubuntu 24.04 LTS", "Caddy v2", "HTTP/3 / QUIC", "Docker", "Next.js Standalone"],
    bottleneck:
      "Suffering from sluggish 4-second initial page loads on bloated WordPress hosting, high monthly platform fees ($380/mo), and recurring security vulnerabilities.",
    architecture:
      "Migrated full architecture to an AMD EPYC dedicated cloud pod running standalone Node.js, Caddy reverse proxy with automated edge certificates, and static asset edge pre-caching.",
    outcome:
      "Mobile PageSpeed score soared from 48 to 99. Hosting overhead slashed by 95% from $380/mo to $18/mo with zero vulnerabilities recorded across penetration tests.",
    metrics: [
      { label: "Page Load Time", value: "0.28s" },
      { label: "Cost Reduction", value: "-95%" },
      { label: "Core Web Vitals", value: "99/100" },
    ],
    liveUrl: "#contact",
    ctaLabel: "Audit Your Infrastructure",
  },
];

export default function CaseStudySection(): React.JSX.Element {
  const handleRequestBlueprint = (study: CaseStudyData) => {
    window.dispatchEvent(
      new CustomEvent("populate-estimator", {
        detail: {
          projectType: `Case Study Blueprint: ${study.title}`,
          features: study.techStack.slice(0, 4),
          estimatedRange: "€4,800 Fixed Sprint",
          timeline: "10–14 Days",
        },
      })
    );
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="case-studies" className="py-28 sm:py-36 relative border-t border-slate-800/80 bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Verified Production Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Structured Case Studies.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            Measurable operational returns first — backed by the underlying architectural blueprints and production stacks.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div data-stagger className="space-y-10">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="spotlight-card rounded-3xl border border-slate-800/80 bg-[#0D121F] p-6 sm:p-10 shadow-xl hover:border-slate-700/90 transition-all duration-300 space-y-8 group"
            >
              {/* 1. Prominent Outcome Metrics Strip (Top of Card Hierarchy) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-800/80 font-mono">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-center"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 tracking-tight tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider mt-1 font-semibold">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Card Title, Context & Action Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-teal-400 font-bold">{study.badge}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{study.clientType}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {study.title}
                  </h3>
                </div>

                {/* Tech Pills & Live Link */}
                <div className="flex flex-col sm:items-end gap-3">
                  <div className="flex flex-wrap gap-1.5 max-w-sm">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {study.liveUrl && (
                      study.liveUrl.startsWith("/") ? (
                        <Link
                          href={study.liveUrl}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-mono font-bold transition-colors btn-tactile"
                        >
                          <span>{study.ctaLabel || "Read Case Study"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : study.liveUrl === "#contact" ? (
                        <button
                          type="button"
                          onClick={() => handleRequestBlueprint(study)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-950/40 hover:bg-teal-950/70 text-teal-300 border border-teal-800/60 hover:border-teal-500/50 text-xs font-mono font-semibold transition-colors btn-tactile cursor-pointer"
                        >
                          <span>{study.ctaLabel || "Request Blueprint"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <a
                          href={study.liveUrl}
                          {...(study.liveUrl.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-950/40 hover:bg-teal-950/70 text-teal-300 border border-teal-800/60 text-xs font-mono font-semibold transition-colors btn-tactile"
                        >
                          <span>{study.ctaLabel || "Explore Live System"}</span>
                          {study.liveUrl.startsWith("http") ? (
                            <ExternalLink className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5" />
                          )}
                        </a>
                      )
                    )}
                    {study.externalUrl && (
                      <a
                        href={study.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono font-semibold transition-colors"
                      >
                        <span>Live PWA</span>
                        <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Technical Anatomy: Problem / Architecture / Result */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 01. The Bottleneck (Problem) */}
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>01 · The Bottleneck</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {study.bottleneck}
                  </p>
                </div>

                {/* 02. Tech Stack & Architecture (Solution) */}
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Cpu className="w-4 h-4 shrink-0" />
                    <span>02 · System Architecture</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {study.architecture}
                  </p>
                </div>

                {/* 03. Concrete Outcome (Result) */}
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>03 · Production Impact</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {study.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
