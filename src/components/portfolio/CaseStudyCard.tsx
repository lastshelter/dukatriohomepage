"use client";

import React from "react";
import {
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Server,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export interface CaseStudyData {
  id: string;
  badge: string;
  title: string;
  clientType: string;
  techStack: string[];
  challenge: string;
  execution: string;
  result: string;
  metrics: { label: string; value: string }[];
  liveUrl?: string;
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: "gradiliste_saas",
    badge: "ACTIVE IN-HOUSE SAAS PRODUCT",
    title: "Gradilište Dukatrio - Enterprise Construction OS & Daily Log Platform",
    clientType: "Proprietary B2B SaaS Product · Serbia & Europe",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "SQLite / PostgreSQL", "Offline PWA"],
    challenge:
      "Regional construction contractors lose 12-18% gross margin to untracked worker hours, chaotic paper daily logs, fuel theft, and manual EUR/RSD currency exchange discrepancies.",
    execution:
      "Architected and deployed a multi-tenant enterprise construction OS featuring digital daily logs, real-time worker attendance with multi-trade tracking, weather-based concrete curing telemetry, and 1-click Excel/PDF exports.",
    result:
      "Active production deployment serving construction companies with automated workflows, sub-second query response times, and zero-overhead offline PWA capabilities.",
    metrics: [
      { label: "Payroll Latency", value: "< 2s" },
      { label: "Attendance Precision", value: "100%" },
      { label: "Production Uptime", value: "99.9%" },
    ],
    liveUrl: "https://gradiliste.dukatrio.com",
  },
  {
    id: "fintech_calc",
    badge: "FINTECH & ALGORITHMIC SYSTEMS",
    title: "Commercial Multi-Lender Decisioning & Amortization Engine",
    clientType: "Commercial Capital Desk · Belgrade / Central Europe",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "PostgreSQL", "Caddy HTTP/3"],
    challenge:
      "Legacy workflow relied on fragmented Excel spreadsheets with 15+ minutes manual calculation latency, frequent formula rounding errors, and zero client self-service portal.",
    execution:
      "Engineered an automated Next.js computation engine running sub-millisecond amortization kernels, multi-tier DSCR stress testing, client portal intake, and dynamic server-side PDF term sheet generation.",
    result:
      "Reduced underwriting turnaround from 48 hours to under 4 minutes. Handled over €14M in analyzed pipeline volume with zero calculation discrepancies and 100% data audit compliance.",
    metrics: [
      { label: "Turnaround Reduction", value: "98.5%" },
      { label: "Calculation Latency", value: "< 45ms" },
      { label: "Lighthouse Performance", value: "100/100" },
    ],
  },
  {
    id: "b2b_portal",
    badge: "B2B CLIENT PORTAL & RBAC",
    title: "Enterprise Document Vault & Operations Management Hub",
    clientType: "Institutional Advisory Firm · Vienna / DACH Region",
    techStack: ["React 19", "Tailwind CSS", "AES-256 Storage", "Node.js 22 LTS", "PM2 Cluster"],
    challenge:
      "Client files were transmitted via unsecured email threads, creating severe GDPR liability and lack of document status visibility between external clients and internal managers.",
    execution:
      "Constructed a zero-trust multi-tenant portal with hardware AES-256 field-level encryption, role-based access control (RBAC), drag-and-drop secure upload dropzones, and administrative activity auditing.",
    result:
      "Zero compliance infractions, 4.2x faster client onboarding throughput, and seamless handover with complete Docker and Git repository IP transfer.",
    metrics: [
      { label: "Onboarding Speed", value: "4.2x" },
      { label: "Security Classification", value: "AES-256" },
      { label: "Production Uptime", value: "99.99%" },
    ],
  },
  {
    id: "edge_migration",
    badge: "HIGH-THROUGHPUT INFRASTRUCTURE",
    title: "Bare-Metal Linux Cloud Pod & Edge TLS Modernization",
    clientType: "SaaS Scaleup · Global Traffic",
    techStack: ["Linux Ubuntu 24.04 LTS", "Caddy v2", "HTTP/3 / QUIC", "Docker", "Next.js Standalone"],
    challenge:
      "Suffering from 4-second initial page loads on bloated WordPress hosting, high monthly platform fees ($380/mo), and recurring plugin security compromises.",
    execution:
      "Migrated full architecture to an AMD EPYC dedicated cloud pod running standalone Node.js, Caddy reverse proxy with automated edge certificates, and static asset pre-caching.",
    result:
      "PageSpeed jumped from 48 to 99 on mobile. Hosting overhead reduced from $380/mo to $18/mo. Zero security vulnerabilities detected across all independent penetration tests.",
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
          {CASE_STUDIES.map((study, idx) => (
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

              {/* 3-Section Technical Anatomy: Challenge / Execution / Result */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. The Challenge */}
                <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>01 · The Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {study.challenge}
                  </p>
                </div>

                {/* 2. The Execution */}
                <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Cpu className="w-4 h-4 shrink-0" />
                    <span>02 · The Execution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {study.execution}
                  </p>
                </div>

                {/* 3. The Result */}
                <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>03 · The Result</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {study.result}
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
