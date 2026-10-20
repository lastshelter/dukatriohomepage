"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Flame,
  ArrowRight,
  Users,
} from "lucide-react";
import TcoCalculator from "./TcoCalculator";

interface ComparisonRow {
  dimension: string;
  category: string;
  standardAgency: string;
  dukatrioBuild: string;
  dukatrioHighlight: string;
}

interface SaasKillItem {
  id: string;
  name: string;
  category: string;
  pricingMode: "per-seat" | "flat";
  monthlyCost: number;
  replacedBy: string;
}

const SAAS_KILL_LIST: SaasKillItem[] = [
  {
    id: "crm",
    name: "HubSpot / Salesforce CRM",
    category: "Client Intake & Pipeline",
    pricingMode: "per-seat",
    monthlyCost: 75,
    replacedBy: "Bespoke B2B Client Intake & Pipeline Portal",
  },
  {
    id: "pm",
    name: "Monday.com / Asana Pro",
    category: "Operations & Task Boards",
    pricingMode: "per-seat",
    monthlyCost: 24,
    replacedBy: "Role-Gated Operations & Dispatch Console",
  },
  {
    id: "forms",
    name: "Typeform + DocSend Business",
    category: "Onboarding & Deal Rooms",
    pricingMode: "flat",
    monthlyCost: 190,
    replacedBy: "Multi-Step Qualification + PDF Term-Sheet Engine",
  },
  {
    id: "zapier",
    name: "Zapier / Make Webhook Glue",
    category: "Automation Tasks",
    pricingMode: "flat",
    monthlyCost: 280,
    replacedBy: "Native PostgreSQL Triggers & BullMQ Workers",
  },
  {
    id: "vault",
    name: "Box / Dropbox Enterprise",
    category: "Client Document Sharing",
    pricingMode: "per-seat",
    monthlyCost: 32,
    replacedBy: "AES-256 Zero-Knowledge S3/MinIO Client Vault",
  },
  {
    id: "airtable",
    name: "Airtable / Retool Team",
    category: "Internal Database Grids",
    pricingMode: "per-seat",
    monthlyCost: 45,
    replacedBy: "Prisma + PostgreSQL 16 High-Speed Web Grid",
  },
];

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: "Core Web Vitals & Speed",
    category: "PERFORMANCE",
    standardAgency: "50–70 average. Bloated render-blocking scripts, unoptimized CSS, 3.5s+ TTFB.",
    dukatrioBuild: "95–100 guaranteed. Sub-300ms edge TTFB, zero runtime bloat, React 19 Server Components.",
    dukatrioHighlight: "Sub-300ms TTFB",
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
  const [selectedSaasIds, setSelectedSaasIds] = useState<string[]>([
    "pm",
    "forms",
    "zapier",
    "airtable",
  ]);
  const [teamSeats, setTeamSeats] = useState<number>(18);

  const toggleSaasTool = (id: string) => {
    setSelectedSaasIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const monthlySaasBleed = SAAS_KILL_LIST.reduce((acc, item) => {
    if (!selectedSaasIds.includes(item.id)) return acc;
    return acc + (item.pricingMode === "per-seat" ? item.monthlyCost * teamSeats : item.monthlyCost);
  }, 0);

  const threeYearSaasBleed = monthlySaasBleed * 36;
  const dukatrioThreeYearTotal = 4800 + 38 * 36; // €4,800 sprint + €38/mo EU VPS
  const netThreeYearSavings = Math.max(0, threeYearSaasBleed - dukatrioThreeYearTotal);

  const handleDecommissionCta = () => {
    const killedNames = SAAS_KILL_LIST.filter((i) => selectedSaasIds.includes(i.id))
      .map((i) => i.name)
      .join(", ");
    window.dispatchEvent(
      new CustomEvent("populate-estimator", {
        detail: {
          projectType: "SaaS Stack Consolidation Buyout (€4,800)",
          features: [`Team Size: ${teamSeats} seats`, `Decommissioning: ${killedNames}`],
          estimatedRange: `Saves €${netThreeYearSavings.toLocaleString()} over 36m`,
          timeline: "10–14 Days",
          message: `[SaaS Kill-Switch Audit]\nTeam Size: ${teamSeats} staff\nReplacing: ${killedNames}\nCurrent Burn: €${monthlySaasBleed.toLocaleString()}/mo (€${threeYearSaasBleed.toLocaleString()} over 36m)\nTarget: €4,800 Single-Tenant Custom Platform.`,
        },
      })
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32 relative border-t border-white/[0.07] bg-[#030712]">
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

        {/* ===================================================================== */}
        {/* INTERACTIVE SAAS STACK KILL-SWITCH BUILDER */}
        {/* ===================================================================== */}
        <div className="bento-surface rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>Interactive SaaS Stack Kill-Switch // Decommission Per-Seat Rent</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Select the SaaS subscriptions currently taxing your operations:
              </h3>
            </div>

            <div className="flex items-center gap-4 bg-[#030712]/90 px-4 py-3 rounded-2xl border border-white/[0.08]">
              <Users className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="min-w-[180px]">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-slate-400">Active Team Seats:</span>
                  <span className="text-cyan-300 font-bold">{teamSeats} users</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={teamSeats}
                  aria-label="Active Team Seats"
                  onChange={(e) => setTeamSeats(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SAAS_KILL_LIST.map((tool) => {
              const isSelected = selectedSaasIds.includes(tool.id);
              const toolMonthly =
                tool.pricingMode === "per-seat" ? tool.monthlyCost * teamSeats : tool.monthlyCost;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => toggleSaasTool(tool.id)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? "bg-rose-950/20 border-rose-500/40 shadow-lg"
                      : "bg-[#030712]/70 border-white/[0.06] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        {tool.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                          isSelected
                            ? "bg-rose-500/20 text-rose-300 border border-rose-400/30"
                            : "bg-slate-900 text-slate-500"
                        }`}
                      >
                        {isSelected ? `−€${toolMonthly.toLocaleString()}/mo` : "CLICK TO ADD"}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-bold ${
                        isSelected ? "line-through text-rose-200" : "text-white"
                      }`}
                    >
                      {tool.name}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] text-[11px] font-mono text-emerald-300">
                    ✓ Replaced by: {tool.replacedBy}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-[#030712] border border-cyan-500/30 p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 w-full lg:w-auto font-mono">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">
                  36-MONTH SAAS DRAIN
                </span>
                <span className="text-lg sm:text-xl font-black text-rose-400">
                  €{threeYearSaasBleed.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">
                  DUKATRIO BUYOUT + 3YR VPS
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-200">
                  €{dukatrioThreeYearTotal.toLocaleString()}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase text-emerald-400 font-bold block">
                  NET 3-YEAR CAPITAL RETAINED
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">
                  +€{netThreeYearSavings.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDecommissionCta}
              className="btn-spring w-full lg:w-auto px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Decommission Selected Stack (€4,800)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
                    <td className="py-5 px-6 align-top">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                        {row.category}
                      </span>
                      <span className="font-bold text-white block">{row.dimension}</span>
                    </td>

                    <td className="py-5 px-6 text-zinc-400 border-l border-zinc-800/80 align-top leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-rose-500/80 shrink-0 mt-0.5" />
                        <span>{row.standardAgency}</span>
                      </div>
                    </td>

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

        {/* SAAS VS. SELF-HOSTED TOTAL COST OF OWNERSHIP (TCO) CALCULATOR */}
        <TcoCalculator />
      </div>
    </section>
  );
}
