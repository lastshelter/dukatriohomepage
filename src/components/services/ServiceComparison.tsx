"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import TcoCalculator from "./TcoCalculator";

interface ComparisonRow {
  dimension: string;
  category: string;
  standardAgency: string;
  dukatrioBuild: string;
  dukatrioHighlight: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: "Core Web Vitals & Speed",
    category: "PERFORMANCE",
    standardAgency: "50–70 average. Bloated render-blocking scripts, unoptimized CSS, 3.5s+ TTFB.",
    dukatrioBuild: "95–100 guaranteed. Sub-400ms edge TTFB, zero runtime bloat, React 19 Server Components.",
    dukatrioHighlight: "Sub-400ms TTFB",
  },
  {
    dimension: "Frontend & Code Architecture",
    category: "ENGINEERING",
    standardAgency: "Pre-made WordPress templates, brittle Elementor/Wix builders, unmaintained third-party plugins.",
    dukatrioBuild: "Bespoke Next.js 16 App Router, TypeScript with 100% strict type safety, modular Tailwind design tokens.",
    dukatrioHighlight: "Strict TypeScript",
  },
  {
    dimension: "Security & Attack Surface",
    category: "RESILIENCE",
    standardAgency: "Vulnerable PHP endpoints, unpatched WordPress plugins, exposed wp-admin login vectors.",
    dukatrioBuild: "Hardened Linux compute, Caddy edge reverse proxy, automated Let's Encrypt TLS, zero exposed admin surface.",
    dukatrioHighlight: "Edge TLS + Caddy",
  },
  {
    dimension: "Data Layer & Persistence",
    category: "DATABASE",
    standardAgency: "Shared MySQL server instances, slow unindexed joins, lack of connection pooling.",
    dukatrioBuild: "Prisma ORM with tuned connection pools, PostgreSQL / SQLite isolation, AES-256 field encryption.",
    dukatrioHighlight: "Prisma + Pool Tuning",
  },
  {
    dimension: "Asset & IP Ownership",
    category: "GOVERNANCE",
    standardAgency: "Locked in proprietary SaaS/agency licenses, theme dependency traps, recurring plugin taxes.",
    dukatrioBuild: "100% complete intellectual property handover: full Git repository, Docker containers, and root VPS access.",
    dukatrioHighlight: "100% Code Ownership",
  },
  {
    dimension: "Delivery Process & Previews",
    category: "VELOCITY",
    standardAgency: "Vague timelines, communication blackouts, unexpected budget creep, broken launch schedules.",
    dukatrioBuild: "Fixed 3-Stage Delivery Protocol, live staging sandboxes, continuous CI verification, zero surprises.",
    dukatrioHighlight: "Fixed-Scope Protocol",
  },
  {
    dimension: "Post-Launch Assurance",
    category: "WARRANTY",
    standardAgency: "Immediate billable hourly rates for bug fixes, unsupported after handover.",
    dukatrioBuild: "30-day comprehensive technical warranty included with rapid SLA emergency patch response.",
    dukatrioHighlight: "30-Day Full Warranty",
  },
];

export default function ServiceComparison(): React.JSX.Element {
  return (
    <section className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Institutional Engineering Standard</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Standard Execution vs. Flagship Dukatrio Build.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            A transparent architectural breakdown of why enterprise engineering outclasses generic agency templates in security, latency, and longevity.
          </p>
        </div>

        {/* Tabular Matrix */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/90 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <th className="py-5 px-6 sm:w-1/4">Engineering Dimension</th>
                  <th className="py-5 px-6 sm:w-3/8 text-zinc-400 border-l border-zinc-800/80">
                    Typical Agency / Freelancer
                  </th>
                  <th className="py-5 px-6 sm:w-3/8 text-cyan-400 bg-cyan-950/20 border-l border-cyan-800/40 font-bold">
                    <div className="flex items-center justify-between">
                      <span>Flagship Dukatrio Build</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                        GOLD STANDARD
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                {COMPARISON_DATA.map((row) => (
                  <tr
                    key={row.dimension}
                    className="hover:bg-zinc-900/30 transition-colors group"
                  >
                    {/* Dimension Name */}
                    <td className="py-5 px-6 align-top">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                        {row.category}
                      </span>
                      <span className="font-bold text-white block">{row.dimension}</span>
                    </td>

                    {/* Standard Execution */}
                    <td className="py-5 px-6 text-zinc-400 border-l border-zinc-800/80 align-top leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-rose-500/80 shrink-0 mt-0.5" />
                        <span>{row.standardAgency}</span>
                      </div>
                    </td>

                    {/* Dukatrio Build */}
                    <td className="py-5 px-6 bg-cyan-950/10 border-l border-cyan-800/30 align-top leading-relaxed text-zinc-200">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span>{row.dukatrioBuild}</span>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-[10px] font-mono text-cyan-300 font-semibold">
                            ✓ {row.dukatrioHighlight}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Matrix Footer Badge */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Zero bloatware. Clean TypeScript codebases delivered with full intellectual property transfer.</span>
            </div>
            <a
              href="#calculator"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-semibold"
            >
              Calculate your project estimate →
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SAAS VS. SELF-HOSTED TOTAL COST OF OWNERSHIP (TCO) CALCULATOR */}
        {/* ========================================================================= */}
        <TcoCalculator />
      </div>
    </section>
  );
}
