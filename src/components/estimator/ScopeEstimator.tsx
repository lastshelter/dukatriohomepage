"use client";

import React, { useEffect, useState } from "react";
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Clock,
  CheckCircle2,
  Users,
  AlertTriangle,
  Sparkles,
  FileDown,
  Link2,
  Check,
} from "lucide-react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { generateScopeRoiPdfBrief } from "@/utils/generateRoiPdfBrief";

const SEAT_OPTIONS = [
  "1–5 seats",
  "6–15 seats",
  "16–35 seats",
  "35+ seats",
] as const;

const BOTTLENECK_OPTIONS = [
  "Fragile Excel / Google Sheets with high error rate",
  "Paper Field Tickets & Delivery Slips",
  "High Per-Seat SaaS Tax (€60+/user)",
  "Manual Intake & Underwriting Latency",
] as const;

const FIXED_SPRINT_INVESTMENT = 4800;

export default function ScopeEstimator(): React.JSX.Element {
  const [monthlySaaS, setMonthlySaaS] = useState<number>(850);
  const [seatCount, setSeatCount] = useState<string>("6–15 seats");
  const [bottleneck, setBottleneck] = useState<string>(BOTTLENECK_OPTIONS[0]);
  const [lastBriefHash, setLastBriefHash] = useState<string | null>(null);
  const [copiedRoiLink, setCopiedRoiLink] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const saasParam = Number(params.get("saas"));
    const seatsParam = params.get("seats");
    const bottleneckParam = params.get("bottleneck");
    if (!Number.isNaN(saasParam) && saasParam >= 200 && saasParam <= 3500) {
      setMonthlySaaS(Math.round(saasParam / 50) * 50);
    }
    if (seatsParam && (SEAT_OPTIONS as readonly string[]).includes(seatsParam)) {
      setSeatCount(seatsParam);
    }
    if (bottleneckParam && (BOTTLENECK_OPTIONS as readonly string[]).includes(bottleneckParam)) {
      setBottleneck(bottleneckParam);
    }
  }, []);

  const handleCopyRoiLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("saas", String(monthlySaaS));
    url.searchParams.set("seats", seatCount);
    url.searchParams.set("bottleneck", bottleneck);
    url.hash = "estimator";
    void navigator.clipboard?.writeText(url.toString());
    setCopiedRoiLink(true);
    setTimeout(() => setCopiedRoiLink(false), 2400);
  };

  // Dynamic ROI Calculations
  const breakEvenMonths = Math.ceil(FIXED_SPRINT_INVESTMENT / monthlySaaS);
  const threeYearSaaS = monthlySaaS * 36;
  const netThreeYearSavings = Math.max(0, threeYearSaaS - FIXED_SPRINT_INVESTMENT);

  const handleDownloadBrief = () => {
    const hash = generateScopeRoiPdfBrief({
      monthlySaaS,
      seatCount,
      bottleneck,
      fixedSprintInvestment: FIXED_SPRINT_INVESTMENT,
      breakEvenMonths,
      threeYearSaaS,
      netThreeYearSavings,
    });
    setLastBriefHash(hash);
  };

  const handleBookAudit = () => {
    const summaryMessage = [
      `[15-Minute Feasibility Audit Request]`,
      `• Current Monthly SaaS & Spreadsheet Spend: €${monthlySaaS.toLocaleString()}/mo`,
      `• Internal Team / Seat Count: ${seatCount}`,
      `• Core Operational Bottleneck: ${bottleneck}`,
      `• 3-Year SaaS Burn Projection: €${threeYearSaaS.toLocaleString()}`,
      `• Fixed Sprint Investment: €${FIXED_SPRINT_INVESTMENT.toLocaleString()} (€0 recurring seat fees, 100% IP ownership)`,
      `• Break-Even Horizon: ${breakEvenMonths} ${breakEvenMonths === 1 ? "month" : "months"}`,
      `• Net 3-Year Savings: €${netThreeYearSavings.toLocaleString()}`,
    ].join("\n");

    window.dispatchEvent(
      new CustomEvent("populate-estimator", {
        detail: {
          scope: "Full-Stack Web App",
          budget: `€${FIXED_SPRINT_INVESTMENT.toLocaleString()} Fixed Sprint`,
          timeline: `${breakEvenMonths} mo break-even`,
          message: summaryMessage,
        },
      })
    );

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const nameInput = document.getElementById("client-name") as HTMLInputElement | null;
        nameInput?.focus();
      }, 450);
    } else {
      window.location.href = "/contact#intake";
    }
  };

  const sliderPercentage = Math.round(((monthlySaaS - 200) / (3500 - 200)) * 100);

  return (
    <section
      id="estimator"
      className="py-28 sm:py-36 relative border-t border-slate-800/80 bg-[#0B0F19]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-teal-400" />
              <span>ROI &amp; SaaS Replacement Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Calculate Your SaaS Tax Savings.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            Model your current monthly subscription and manual spreadsheet overhead against a single fixed-milestone custom software sprint.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Concrete Business Pain Inputs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-[#0D121F] p-6 sm:p-10 shadow-xl space-y-8">
            <div className="space-y-8">
              {/* Input 1: Current Monthly SaaS & Spreadsheet Spend */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <label
                    htmlFor="monthly-saas-slider"
                    className="text-sm sm:text-base font-bold text-white flex items-center gap-2"
                  >
                    <TrendingDown className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>1. Current Monthly SaaS &amp; Spreadsheet Spend</span>
                  </label>
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800/80 font-mono text-lg sm:text-xl font-extrabold text-teal-400 tabular-nums">
                    €{monthlySaaS.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Include combined per-seat software licenses, Zapier/Make glue subscriptions, and hours lost reconciling fragile spreadsheets.
                </p>

                <div className="pt-2 space-y-2">
                  <input
                    id="monthly-saas-slider"
                    type="range"
                    min={200}
                    max={3500}
                    step={50}
                    value={monthlySaaS}
                    onChange={(e) => setMonthlySaaS(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #2dd4bf 0%, #2dd4bf ${sliderPercentage}%, #1e293b ${sliderPercentage}%, #1e293b 100%)`,
                    }}
                    className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-teal-400 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>€200/mo</span>
                    <span>€850/mo (Avg SMB)</span>
                    <span>€2,000/mo</span>
                    <span>€3,500/mo</span>
                  </div>
                </div>
              </div>

              {/* Input 2: Internal Team / Seat Count */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <label className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>2. Internal Team / Seat Count</span>
                </label>
                <p className="text-xs sm:text-sm text-slate-400">
                  Every custom Dukatrio deployment includes unlimited internal &amp; client seats with €0 per-user fees.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {SEAT_OPTIONS.map((option) => {
                    const isSelected = seatCount === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSeatCount(option)}
                        className={`py-3 px-3.5 rounded-xl border font-mono text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-teal-950/50 border-teal-500/60 text-teal-300"
                            : "bg-slate-950/70 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 3: Core Operational Bottleneck */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <label
                  htmlFor="operational-bottleneck"
                  className="text-sm sm:text-base font-bold text-white flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>3. Core Operational Bottleneck</span>
                </label>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select the primary workflow friction slowing down your daily operations.
                </p>
                <div className="relative pt-1">
                  <select
                    id="operational-bottleneck"
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80 text-sm sm:text-base text-slate-100 font-sans focus:border-teal-400 focus:outline-none transition-colors cursor-pointer"
                  >
                    {BOTTLENECK_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-[#0D121F] text-slate-100">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Assurance Strip */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>100% Source Code &amp; Database Handover</span>
              </span>
              <span>Private EU NVMe Cloud Ready</span>
            </div>
          </div>

          {/* Right Column: Dynamic ROI Output & Single Primary CTA (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-[#0D121F] p-6 sm:p-10 shadow-xl space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
                    3-Year Financial Comparison
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-950/60 border border-teal-800/60 text-[10px] font-mono text-teal-300 font-semibold">
                  LIVE ROI MODEL
                </span>
              </div>

              {/* Net 3-Year Savings Hero Callout */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold">
                  Net 3-Year Savings
                </div>
                <div className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  €<AnimatedNumber value={netThreeYearSavings} />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  Retained capital over 36 months after fully paying off your custom system build.
                </p>
              </div>

              {/* Key Comparison Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Break-Even Horizon */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Break-Even</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    <AnimatedNumber value={breakEvenMonths} />{" "}
                    <span className="text-sm font-normal text-slate-400">
                      {breakEvenMonths === 1 ? "Month" : "Months"}
                    </span>
                  </div>
                </div>

                {/* 3-Year SaaS Projection */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    3-Yr SaaS Burn
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-rose-400 font-mono tabular-nums line-through decoration-rose-500/60">
                    €<AnimatedNumber value={threeYearSaaS} />
                  </div>
                </div>
              </div>

              {/* Fixed Sprint Investment Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    Fixed Sprint Investment
                  </span>
                  <span className="text-xl font-extrabold text-teal-400 font-mono tabular-nums">
                    €4,800
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-sans pt-1 border-t border-slate-800/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Flat milestone pricing — zero surprise billing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>€0 recurring seat fees for {seatCount}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>100% source code &amp; Git repository ownership</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Primary Action CTAs */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-col gap-3 w-full">
                <button
                  type="button"
                  onClick={handleBookAudit}
                  className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider leading-tight text-center transition-all flex items-center justify-center gap-2 cursor-pointer btn-tactile shadow-md"
                >
                  <span className="min-w-0 text-center">Book 15-Minute Feasibility Audit</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={handleDownloadBrief}
                  className="w-full py-4 px-5 rounded-xl bg-slate-950/90 hover:bg-teal-950/50 border border-slate-700 hover:border-teal-400 text-teal-300 hover:text-teal-200 font-bold text-xs sm:text-sm uppercase tracking-wider leading-tight text-center transition-all flex items-center justify-center gap-2 cursor-pointer btn-tactile shadow-sm hover:shadow-[0_0_20px_-5px_rgba(45,212,191,0.35)]"
                >
                  <FileDown className="w-4 h-4 shrink-0 text-teal-400" />
                  <span className="min-w-0 text-center">Download Executive Brief (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyRoiLink}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-teal-300 font-mono font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedRoiLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-300">Shareable ROI Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Copy Shareable ROI Link for This Scenario</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-center font-mono text-slate-400">
                {lastBriefHash
                  ? `Executive PDF generated • Verification Hash: ${lastBriefHash}`
                  : "Pre-populates your ROI parameters or exports a 1-page CFO/Board PDF brief"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
