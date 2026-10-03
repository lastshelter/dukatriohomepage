"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

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
  const [teamSeats, setTeamSeats] = useState<number>(10);

  // Dynamic TCO calculation logic
  const saasMonthlyPerSeat = 60; // €40 - €80 average
  const saasAnnual = teamSeats * saasMonthlyPerSeat * 12;
  const saasThreeYear = saasAnnual * 3;

  const vpsMonthly = 15; // €10 - €20 dedicated Hetzner VPS
  const oneTimeBuild = 5800; // Average fixed-scope architecture build
  const dukatrioThreeYear = oneTimeBuild + vpsMonthly * 36;
  const threeYearSavings = Math.max(0, saasThreeYear - dukatrioThreeYear);
  const savingsPercent = Math.min(85, Math.round((threeYearSavings / saasThreeYear) * 100));

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
        {/* 2. SAAS VS. SELF-HOSTED TOTAL COST OF OWNERSHIP (TCO) MATRIX */}
        {/* ========================================================================= */}
        <div id="tco-matrix" className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Total Cost of Ownership (TCO) Matrix</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Recurring SaaS Tax vs. Dukatrio Self-Hosted Economics
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Most businesses pay an escalating per-seat monthly penalty for software they will never own. Here is the financial reality of renting off-the-shelf SaaS versus owning your dedicated infrastructure.
              </p>
            </div>

            {/* Interactive Team Size Selector */}
            <div className="space-y-2 shrink-0">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                Select Active Team Size:
              </span>
              <div className="flex items-center gap-2">
                {[5, 10, 25, 50].map((seats) => (
                  <button
                    key={seats}
                    type="button"
                    onClick={() => setTeamSeats(seats)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      teamSeats === seats
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {seats} Seats
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Commercial Per-Seat SaaS */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                    THE RENTAL MODEL
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    Commercial Multi-Tenant SaaS
                  </h4>
                </div>
                <div className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-400 font-mono text-xs font-bold">
                  Perpetual Expense
                </div>
              </div>

              {/* Price Points */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 font-mono">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-400">Recurring Seat Rate:</span>
                  <span className="text-lg font-bold text-rose-400">€40–€80 / seat / mo</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-400">1-Year Expense ({teamSeats} seats):</span>
                  <span className="text-sm font-bold text-white">€{saasAnnual.toLocaleString()} / yr</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-zinc-800 pt-2">
                  <span className="text-xs text-zinc-400">3-Year Projected TCO:</span>
                  <span className="text-xl font-extrabold text-rose-400">€{saasThreeYear.toLocaleString()}</span>
                </div>
              </div>

              {/* Drawbacks Checklist */}
              <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>€7,200+/yr baseline recurring expense for small teams</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Proprietary data lock-in with restricted export schemas</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Forced UI overhauls and breaking backward compatibility</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Costs continuously escalate as your headcount expands</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Dukatrio Dedicated Architecture */}
            <div className="p-6 sm:p-8 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-6 relative overflow-hidden shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                    THE CAPITAL ASSET MODEL
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    Dukatrio Dedicated Architecture
                  </h4>
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 font-mono text-xs font-bold">
                  Zero Per-Seat Fees
                </div>
              </div>

              {/* Price Points */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-cyan-800/40 space-y-2 font-mono">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-400">Hetzner Dedicated VPS:</span>
                  <span className="text-lg font-bold text-emerald-400">€10–€20 / month</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-400">Per-Seat Licensing:</span>
                  <span className="text-sm font-bold text-cyan-300">€0 / seat forever (Unlimited)</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-zinc-800 pt-2">
                  <span className="text-xs text-zinc-400">3-Year Projected TCO:</span>
                  <span className="text-xl font-extrabold text-emerald-400">
                    €{dukatrioThreeYear.toLocaleString()} <span className="text-xs font-normal text-zinc-500">(Build + Hosting)</span>
                  </span>
                </div>
              </div>

              {/* Benefits Checklist */}
              <ul className="space-y-2.5 text-xs font-mono text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>One-time engineering build; zero recurring per-user licensing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Hosted on dedicated €10–€20/mo Hetzner NVMe cloud instance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% database, Git repository, and Docker code ownership</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero vendor lock-in with hardware AES-256 local control</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3-Year Projected Savings Callout Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-zinc-900/80 to-cyan-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>3-Year Projected Software Economy</span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white">
                Save up to {savingsPercent}% in 3-year operational software costs while keeping proprietary data completely under your control.
              </h4>
              <p className="text-xs text-zinc-400 font-mono">
                Projected 3-year savings for {teamSeats} active seats: <span className="text-emerald-300 font-bold">€{threeYearSavings.toLocaleString()}</span> kept in your corporate treasury.
              </p>
            </div>

            <a
              href="#calculator"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Model Your Cost</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
