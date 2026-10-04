"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingDown,
  Users,
  Server,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Sparkles,
  Lock,
  Layers,
  Euro,
  Clock,
  HelpCircle,
} from "lucide-react";

interface SaasTierPreset {
  id: string;
  name: string;
  rate: number;
  examples: string;
}

const SAAS_TIER_PRESETS: SaasTierPreset[] = [
  {
    id: "basic",
    name: "Basic CRM & Forms",
    rate: 25,
    examples: "HubSpot Starter, Airtable Plus, Typeform",
  },
  {
    id: "standard",
    name: "Standard ERP / PM Suite",
    rate: 45,
    examples: "Monday.com, ClickUp Business, Asana, Retool",
  },
  {
    id: "enterprise",
    name: "Enterprise Workflow",
    rate: 75,
    examples: "Salesforce Cloud, SAP ByDesign, ServiceNow",
  },
];

export default function TcoCalculator(): React.JSX.Element {
  // 1. Dynamic Input Controls State
  const [teamSize, setTeamSize] = useState<number>(15);
  const [costPerUser, setCostPerUser] = useState<number>(45);
  const [timeHorizonYears, setTimeHorizonYears] = useState<1 | 2 | 3>(3);

  // 2. Calculations
  const calculations = useMemo(() => {
    const months = timeHorizonYears * 12;

    // SaaS Cost
    const saasMonthly = teamSize * costPerUser;
    const saasTotal = saasMonthly * months;

    // Dukatrio Dedicated Build Cost
    const oneTimeBuild = 5800; // Baseline fixed-scope custom architecture & deployment
    const vpsMonthly = 15; // Dedicated European Hetzner NVMe instance
    const dedicatedHostingTotal = vpsMonthly * months;
    const dedicatedTotal = oneTimeBuild + dedicatedHostingTotal;
    const dedicatedMonthlyAmortized = Math.round(dedicatedTotal / months);

    // Savings & ROI Metrics
    const totalSavings = Math.max(0, saasTotal - dedicatedTotal);
    const savingsPercent =
      saasTotal > 0 ? Math.min(95, Math.round((totalSavings / saasTotal) * 100)) : 0;

    // Payback / Break-even Horizon in Months
    const monthlyNetSavings = saasMonthly - vpsMonthly;
    const breakEvenMonths =
      monthlyNetSavings > 0
        ? Math.max(1, Math.ceil(oneTimeBuild / monthlyNetSavings))
        : 0;

    return {
      months,
      saasMonthly,
      saasTotal,
      oneTimeBuild,
      vpsMonthly,
      dedicatedHostingTotal,
      dedicatedTotal,
      dedicatedMonthlyAmortized,
      totalSavings,
      savingsPercent,
      breakEvenMonths,
    };
  }, [teamSize, costPerUser, timeHorizonYears]);

  // Handle CTA Click: dispatch populate-estimator event and smooth scroll to #contact
  const handleCtaClick = () => {
    const inquiryMessage = `Inquiry regarding Dedicated Self-Hosted System build:
- Team Size: ${teamSize} users
- Estimated SaaS cost replaced: €${costPerUser}/seat/month
- Time Horizon: ${timeHorizonYears} Year${timeHorizonYears > 1 ? "s" : ""}
- Projected TCO Savings: €${calculations.totalSavings.toLocaleString()} (€${calculations.saasTotal.toLocaleString()} SaaS vs. €${calculations.dedicatedTotal.toLocaleString()} Dedicated).`;

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("populate-estimator", {
          detail: {
            scope: "Cloud Infrastructure / VPS",
            message: inquiryMessage,
          },
        })
      );

      const contactElement = document.getElementById("contact");
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      id="tco-calculator"
      className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-zinc-950 p-6 sm:p-10 space-y-10 shadow-2xl relative overflow-hidden"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Interactive TCO Financial Model</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            SaaS Subscription Tax vs. Dedicated Self-Hosted Economics
          </h3>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Most businesses pay an escalating per-seat monthly penalty for software they will never own.
            Model your headcount to see the exact financial advantage of owning a dedicated, high-speed system.
          </p>
        </div>

        {/* Time Horizon Toggle */}
        <div className="space-y-2 shrink-0">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
            Time Horizon:
          </span>
          <div className="inline-flex p-1 bg-zinc-950 rounded-2xl border border-zinc-800 gap-1">
            {([1, 2, 3] as const).map((years) => (
              <button
                key={years}
                type="button"
                onClick={() => setTimeHorizonYears(years)}
                className={`py-2 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  timeHorizonYears === years
                    ? "bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {years} {years === 1 ? "Year" : "Years"} ({years * 12} mo)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Input Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Control 1: Team Size Slider */}
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Active Internal Team Size</span>
            </div>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-2xl font-black text-cyan-400">{teamSize}</span>
              <span className="text-xs text-zinc-400">seats</span>
            </div>
          </div>

          <input
            type="range"
            min={5}
            max={100}
            step={1}
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-zinc-800"
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>5 seats (Boutique)</span>
            <span>50 seats</span>
            <span>100 seats (Scale-up)</span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Presets:
            </span>
            {[10, 15, 25, 50, 100].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTeamSize(preset)}
                className={`py-1 px-2.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  teamSize === preset
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Control 2: Average SaaS Cost per User Slider & Presets */}
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Euro className="w-4 h-4 text-emerald-400" />
              <span>Average SaaS Cost per User / Month</span>
            </div>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-2xl font-black text-emerald-400">€{costPerUser}</span>
              <span className="text-xs text-zinc-400">/ seat / mo</span>
            </div>
          </div>

          <input
            type="range"
            min={15}
            max={120}
            step={5}
            value={costPerUser}
            onChange={(e) => setCostPerUser(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-zinc-800"
          />

          {/* SaaS Tier Presets */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {SAAS_TIER_PRESETS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setCostPerUser(tier.rate)}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  costPerUser === tier.rate
                    ? "bg-emerald-950/60 border-emerald-500/60 text-white shadow-sm"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold block truncate">{tier.name}</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    €{tier.rate}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 block truncate mt-0.5">
                  {tier.examples}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-Side Live Cost Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Card A: The Fragmented SaaS Tax */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-rose-900/40 space-y-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                  THE RENTAL EXPENSE MODEL
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Fragmented SaaS Tax
                </h4>
                <p className="text-xs text-zinc-400">
                  Third-party multi-tenant subscriptions (e.g. CRM, ERP, Portal).
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-400 font-mono text-[11px] font-bold shrink-0">
                Perpetual Drain
              </div>
            </div>

            {/* Live Formula & Calculation Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3 font-mono">
              <div className="flex justify-between items-baseline text-xs text-zinc-400">
                <span>Monthly Burn ({teamSize} seats × €{costPerUser}/mo):</span>
                <span className="text-base font-bold text-rose-400">
                  €{calculations.saasMonthly.toLocaleString()} / mo
                </span>
              </div>

              <div className="flex justify-between items-baseline text-xs text-zinc-400">
                <span>Annual Expense:</span>
                <span className="text-sm font-semibold text-zinc-200">
                  €{(calculations.saasMonthly * 12).toLocaleString()} / yr
                </span>
              </div>

              <div className="flex justify-between items-baseline border-t border-zinc-800 pt-3">
                <span className="text-xs font-bold text-zinc-300">
                  {timeHorizonYears}-Year Total SaaS Cost:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-rose-400">
                  €{calculations.saasTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Critical Drawbacks List */}
            <ul className="space-y-3 text-xs font-mono text-zinc-400">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Recurring Monthly Tax:</strong> Unforgiving overhead that automatically rises whenever you hire.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Arbitrary Price Hikes:</strong> Vulnerable to 15%–30% renewal increases with zero leverage.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Vendor Platform Lock-in:</strong> Proprietary database schemas with export barriers.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Third-Party Cloud Exposure:</strong> Customer records stored on shared multi-tenant clusters.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-rose-400/80 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span>0% Equity Value • Zero intellectual property created</span>
          </div>
        </div>

        {/* Card B: Dukatrio Dedicated Self-Hosted System */}
        <div className="p-6 sm:p-8 rounded-3xl bg-cyan-950/20 border border-cyan-500/40 space-y-6 relative overflow-hidden flex flex-col justify-between shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  THE CAPITAL ASSET MODEL
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Dukatrio Dedicated Self-Hosted System
                </h4>
                <p className="text-xs text-zinc-400">
                  Custom Next.js &amp; PostgreSQL stack deployed on your private VPS.
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 font-mono text-[11px] font-bold shrink-0">
                Zero Per-Seat Fees
              </div>
            </div>

            {/* Live Formula & Calculation Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-cyan-800/40 space-y-3 font-mono">
              <div className="flex justify-between items-baseline text-xs text-zinc-400">
                <span>One-Time Engineering Build:</span>
                <span className="text-base font-bold text-white">
                  €{calculations.oneTimeBuild.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-baseline text-xs text-zinc-400">
                <span>Dedicated VPS ({timeHorizonYears * 12} mo @ €15/mo):</span>
                <span className="text-sm font-semibold text-emerald-400">
                  €{calculations.dedicatedHostingTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-baseline border-t border-zinc-800 pt-3">
                <span className="text-xs font-bold text-zinc-300">
                  {timeHorizonYears}-Year Total Investment:
                </span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                    €{calculations.dedicatedTotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-normal">
                    (Approx. €{calculations.dedicatedMonthlyAmortized}/mo all-in)
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights & Assurance List */}
            <ul className="space-y-3 text-xs font-mono text-zinc-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Fixed One-Time Investment:</strong> Full production deployment with zero recurring per-seat fees.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Code &amp; Asset Ownership:</strong> Full Git repo, Docker compose files, and PostgreSQL handover.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Predictable Infrastructure:</strong> Hosted on a dedicated €15/mo Hetzner NVMe cloud server.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Unrestricted Headcount:</strong> Add 20 or 200 team members without paying a cent more.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-cyan-900/60 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Permanent Balance Sheet Asset • Complete Data Sovereignty</span>
          </div>
        </div>
      </div>

      {/* Visual ROI Callout Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-zinc-900/90 to-cyan-950/70 border border-emerald-500/50 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative z-10">
        <div className="space-y-3 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Verified Capital Efficiency Breakdown</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 justify-center lg:justify-start">
            <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Estimated {timeHorizonYears}-Year Savings:
            </h4>
            <span className="text-3xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              €{calculations.totalSavings.toLocaleString()}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
              {calculations.savingsPercent}% Lower TCO
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {calculations.breakEvenMonths > 0 ? (
              <>
                The custom platform achieves full capital payback in{" "}
                <strong className="text-white font-mono">
                  ~{calculations.breakEvenMonths} months
                </strong>
                . Every month thereafter generates{" "}
                <strong className="text-emerald-400 font-mono">
                  €{(calculations.saasMonthly - calculations.vpsMonthly).toLocaleString()}/month
                </strong>{" "}
                in recurring cash flow kept inside your business.
              </>
            ) : (
              <>
                Save €{calculations.totalSavings.toLocaleString()} over {timeHorizonYears} year
                {timeHorizonYears > 1 ? "s" : ""} by commissioning an owned system instead of leasing SaaS seats.
              </>
            )}
          </p>
        </div>

        {/* High-Intent CTA Button */}
        <div className="shrink-0 flex flex-col items-center sm:items-end gap-2 w-full lg:w-auto">
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:via-teal-300 hover:to-cyan-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Build Your Dedicated System</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span className="text-[10px] font-mono text-zinc-400 text-center sm:text-right">
            Pre-populates team size ({teamSize} seats) into project inquiry
          </span>
        </div>
      </div>
    </div>
  );
}
