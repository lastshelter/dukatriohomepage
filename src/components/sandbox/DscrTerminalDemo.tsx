"use client";

import React, { useCallback, useId, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import {
  DSCR_FLOOR,
  DSCR_PRIME_MIN,
  STRESS_NOI_HAIRCUT,
  TIER_LABEL,
  buildTermSheet,
  computeDscr,
  type RiskTier,
} from "@/utils/dscr";
import { formatEur, formatEurCompact } from "@/utils/formatEur";
import { prefillContactAndScroll } from "@/utils/contactBridge";
import TermSheetDialog from "@/components/sandbox/TermSheetDialog";

const GAUGE_MAX = 2;

const TIER_STYLE: Record<RiskTier, { badge: string; bar: string; text: string }> = {
  prime: {
    badge: "bg-emerald-950/50 border-emerald-700/60 text-emerald-300",
    bar: "bg-emerald-400",
    text: "text-emerald-300",
  },
  borderline: {
    badge: "bg-amber-950/40 border-amber-700/60 text-amber-300",
    bar: "bg-amber-400",
    text: "text-amber-300",
  },
  subprime: {
    badge: "bg-rose-950/40 border-rose-700/60 text-rose-300",
    bar: "bg-rose-400",
    text: "text-rose-300",
  },
};

interface SliderFieldProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function SliderField({ label, hint, value, min, max, step, onChange }: SliderFieldProps) {
  const id = useId();
  const percent = max > min ? Math.round(((value - min) / (max - min)) * 100) : 0;

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-bold text-white">
          {label}
        </label>
        <output
          htmlFor={id}
          className="px-3 py-1 rounded-lg bg-slate-950/90 border border-slate-800/80 font-mono text-base font-extrabold text-teal-400 tabular-nums"
        >
          {formatEur(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={formatEur(value)}
        style={{
          background: `linear-gradient(to right, #2dd4bf 0%, #2dd4bf ${percent}%, #1e293b ${percent}%, #1e293b 100%)`,
        }}
        className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/70"
      />
      <div className="flex justify-between text-[11px] font-mono text-slate-500">
        <span>{formatEurCompact(min)}</span>
        <span className="text-slate-500">{hint}</span>
        <span>{formatEurCompact(max)}</span>
      </div>
    </div>
  );
}

export default function DscrTerminalDemo(): React.JSX.Element {
  const [revenue, setRevenue] = useState(2_400_000);
  const [noi, setNoi] = useState(540_000);
  const [debtService, setDebtService] = useState(380_000);
  const [sheetOpen, setSheetOpen] = useState(false);

  const inputs = useMemo(() => ({ revenue, noi, debtService }), [revenue, noi, debtService]);
  const result = useMemo(() => computeDscr(inputs), [inputs]);
  const sheet = useMemo(() => buildTermSheet(inputs, result), [inputs, result]);

  const handleRevenue = (value: number) => {
    setRevenue(value);
    // NOI can never exceed gross revenue.
    setNoi((current) => Math.min(current, value));
  };

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const handleBuild = () => {
    setSheetOpen(false);
    prefillContactAndScroll({
      scope: "B2B Client Intake Engine",
      message: [
        "[Sandbox Follow-up: DSCR & Capital Decision Terminal]",
        `I tried the demo with revenue ${formatEur(revenue)}, NOI ${formatEur(noi)} and debt service ${formatEur(debtService)}, which gave ${result.dscr.toFixed(2)}x (${TIER_LABEL[result.tier]}).`,
        "I would like a decisioning and intake terminal like this for my own underwriting process.",
      ].join("\n"),
    });
  };

  const style = TIER_STYLE[result.tier];
  const gaugePercent = Math.min(result.dscr / GAUGE_MAX, 1) * 100;
  const TierIcon = result.tier === "prime" ? ShieldCheck : result.tier === "borderline" ? AlertTriangle : ShieldAlert;
  const marginHigh = result.noiMargin > 0.6;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Inputs */}
      <div className="lg:col-span-6 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-6 sm:p-8 space-y-7">
        <SliderField
          label="Annual Gross Revenue"
          hint="drag to model"
          value={revenue}
          min={250_000}
          max={10_000_000}
          step={50_000}
          onChange={handleRevenue}
        />
        <SliderField
          label="Net Operating Income (NOI)"
          hint={`${Math.round(result.noiMargin * 100)}% of revenue`}
          value={noi}
          min={0}
          max={revenue}
          step={10_000}
          onChange={setNoi}
        />
        <SliderField
          label="Annual Debt Service"
          hint="principal + interest"
          value={debtService}
          min={20_000}
          max={2_000_000}
          step={10_000}
          onChange={setDebtService}
        />
        {marginHigh && (
          <p className="flex items-start gap-2 text-xs text-amber-300 font-mono leading-relaxed">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>NOI above 60% of revenue is unusually high. Underwriters normally adjust it down.</span>
          </p>
        )}
      </div>

      {/* Decision output */}
      <div className="lg:col-span-6 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
              Debt Service Coverage Ratio
            </div>
            <div className={`font-mono text-5xl font-extrabold tabular-nums ${style.text}`}>
              {result.dscr.toFixed(2)}x
            </div>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-sm font-bold ${style.badge}`}
          >
            <TierIcon className="w-4 h-4" aria-hidden="true" />
            <span>{TIER_LABEL[result.tier]}</span>
          </div>
        </div>

        {/* Gauge */}
        <div className="space-y-2">
          <div
            role="meter"
            aria-label="DSCR"
            aria-valuemin={0}
            aria-valuemax={GAUGE_MAX}
            aria-valuenow={Number(Math.min(result.dscr, GAUGE_MAX).toFixed(2))}
            aria-valuetext={`${result.dscr.toFixed(2)}x, ${TIER_LABEL[result.tier]}`}
            className="relative h-3 rounded-full bg-slate-800 overflow-hidden"
          >
            <div
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 motion-reduce:transition-none ${style.bar}`}
              style={{ width: `${gaugePercent}%` }}
            />
            <span
              className="absolute inset-y-0 w-px bg-slate-300/70"
              style={{ left: `${(DSCR_FLOOR / GAUGE_MAX) * 100}%` }}
            />
            <span
              className="absolute inset-y-0 w-px bg-slate-300/70"
              style={{ left: `${(DSCR_PRIME_MIN / GAUGE_MAX) * 100}%` }}
            />
          </div>
          <div className="relative h-4 font-mono text-[10px] text-slate-500">
            <span className="absolute left-0">0.00x</span>
            <span className="absolute -translate-x-1/2" style={{ left: `${(DSCR_FLOOR / GAUGE_MAX) * 100}%` }}>
              1.00x
            </span>
            <span className="absolute -translate-x-1/2" style={{ left: `${(DSCR_PRIME_MIN / GAUGE_MAX) * 100}%` }}>
              1.25x
            </span>
            <span className="absolute right-0">2.00x+</span>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
          <div className="p-3.5 rounded-xl bg-[#0D121F] border border-slate-800/80">
            <dt className="text-[11px] uppercase tracking-wider text-slate-400">
              {result.headroom >= 0 ? "Headroom at 1.25x" : "Over the 1.25x limit"}
            </dt>
            <dd className={`text-lg font-extrabold tabular-nums ${result.headroom >= 0 ? "text-teal-400" : "text-rose-300"}`}>
              {formatEur(Math.abs(result.headroom))}
              <span className="text-[11px] font-normal text-slate-500"> /yr debt service</span>
            </dd>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0D121F] border border-slate-800/80">
            <dt className="text-[11px] uppercase tracking-wider text-slate-400">
              Stress test (NOI −{Math.round(STRESS_NOI_HAIRCUT * 100)}%)
            </dt>
            <dd className={`text-lg font-extrabold tabular-nums ${TIER_STYLE[result.stressTier].text}`}>
              {result.stressDscr.toFixed(2)}x
              <span className="text-[11px] font-normal text-slate-500"> · {TIER_LABEL[result.stressTier]}</span>
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg btn-tactile cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Preview Term Sheet</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
          Calculated live in your browser. The production terminal runs the same kernel server-side.
        </p>
      </div>

      <TermSheetDialog open={sheetOpen} sheet={sheet} onClose={closeSheet} onBuild={handleBuild} />
    </div>
  );
}
