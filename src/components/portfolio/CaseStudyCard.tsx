"use client";

import {
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
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
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: "gradiliste_saas",
    badge: "ACTIVE IN-HOUSE SAAS PRODUCT",
    title: "Gradilište Dukatrio — Enterprise Construction OS & Daily Log Platform",
    clientType: "Proprietary B2B SaaS Platform · Regional Enterprise",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "SQLite / PostgreSQL", "Offline PWA"],
    bottleneck:
      "Regional construction contractors lose 12–18% gross margin to untracked worker hours, chaotic paper daily logs, fuel theft, and manual EUR/RSD currency discrepancies. Field supervisors resisted complex multi-screen enterprise software.",
    architecture:
      "Architected a high-speed offline-first Next.js 16 PWA with SQLite/PostgreSQL background synchronization, single-tap daily log workflows, weather-aware concrete curing timers, and 1-click Excel/PDF export pipelines.",
    outcome:
      "Live in active daily field production across hundreds of construction sites with 100% attendance audit accuracy, payroll report generation reduced to <2s, and zero data loss in offline basement/trench conditions.",
    metrics: [
      { label: "Payroll Latency", value: "< 2s" },
      { label: "Attendance Precision", value: "100%" },
      { label: "Production Uptime", value: "99.9%" },
    ],
    liveUrl: "https://gradiliste.dukatrio.com",
  },
  {
    id: "fintech_calc",
    badge: "FINTECH & COMPUTATION KERNEL",
    title: "Commercial Multi-Lender Decisioning & Amortization Engine",
    clientType: "Commercial Capital Desk · Central Europe",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "PostgreSQL", "Caddy HTTP/3"],
    bottleneck:
      "Legacy underwriting operations relied on fragmented 40MB Excel workbooks with 15+ minutes manual calculation latency, frequent formula rounding drift, and zero self-service portal for corporate borrowers.",
    architecture:
      "Engineered an automated computation kernel in TypeScript running sub-50ms amortization math, multi-tier DSCR stress testing, secure client intake, and serverless PDF term sheet rendering.",
    outcome:
      "Reduced underwriting turnaround from 48 hours to under 4 minutes. Handled over €14M in analyzed pipeline volume with zero calculation discrepancies and 100% automated audit logging.",
    metrics: [
      { label: "Turnaround Reduction", value: "98.5%" },
      { label: "Calculation Latency", value: "< 45ms" },
      { label: "Analyzed Pipeline", value: "€14M+" },
    ],
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
  },
];

export default function CaseStudySection(): React.JSX.Element {
  return (
    <section id="case-studies" className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technical Verification &amp; Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Structured Case Studies.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md">
            Direct insight into the technical constraints, architectural blueprints, and measurable results achieved for real-world deployments.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-10 shadow-2xl hover:border-cyan-500/40 transition-all duration-300 space-y-8 group"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-cyan-400 font-bold">{study.badge}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{study.clientType}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {study.title}
                  </h3>
                </div>

                {/* Tech Pills & Live Link */}
                <div className="flex flex-col sm:items-end gap-2.5">
                  <div className="flex flex-wrap gap-1.5 max-w-sm">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {study.liveUrl && (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold transition-colors"
                    >
                      <span>Visit Live SaaS Platform</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* 3-Section Technical Anatomy: Problem / Architecture / Result */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. The Bottleneck (Problem) */}
                <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>01 · The Bottleneck (Problem)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {study.bottleneck}
                  </p>
                </div>

                {/* 2. The Tech Stack & Architecture (Solution) */}
                <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Cpu className="w-4 h-4 shrink-0" />
                    <span>02 · Tech Stack &amp; Architecture (Solution)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {study.architecture}
                  </p>
                </div>

                {/* 3. The Concrete Outcome (Result) */}
                <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>03 · Concrete Outcome (Result)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {study.outcome}
                  </p>
                </div>
              </div>

              {/* Metrics Summary Strip */}
              <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-4 font-mono text-center">
                {study.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/60">
                    <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
