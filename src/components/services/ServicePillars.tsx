"use client";

import React from "react";
import Link from "next/link";
import { Activity, ArrowRight, CheckCircle2, Database, Globe, Layers, Sparkles } from "lucide-react";
import {
  SERVICE_PILLARS,
  type PillarAccent,
  type PillarId,
  type ServicePillar,
} from "@/config/servicePillars";

const PILLAR_ICONS: Record<PillarId, React.ComponentType<{ className?: string }>> = {
  platforms: Layers,
  content: Globe,
  realtime: Activity,
  backend: Database,
};

/**
 * Tailwind needs complete class names at build time, so every accent is spelled out.
 * `glow` is painted as the card's own background (not a child element) because
 * `.spotlight-card > *` forces `position: relative` on direct children.
 */
const ACCENTS: Record<
  PillarAccent,
  { glow: string; icon: string; check: string; pill: string; index: string; metric: string; hover: string }
> = {
  cyan: {
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(45,212,191,0.12),transparent_60%)]",
    icon: "bg-teal-500/10 border-teal-400/20 text-teal-300",
    check: "text-teal-400",
    pill: "bg-teal-500/10 border-teal-400/20 text-teal-200",
    index: "text-teal-400/80",
    metric: "text-teal-300",
    hover: "hover:border-teal-400/35",
  },
  emerald: {
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(16,185,129,0.12),transparent_60%)]",
    icon: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
    check: "text-emerald-400",
    pill: "bg-emerald-500/10 border-emerald-400/20 text-emerald-200",
    index: "text-emerald-400/80",
    metric: "text-emerald-300",
    hover: "hover:border-emerald-400/35",
  },
  indigo: {
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(99,102,241,0.14),transparent_60%)]",
    icon: "bg-indigo-500/10 border-indigo-400/20 text-indigo-300",
    check: "text-indigo-400",
    pill: "bg-indigo-500/10 border-indigo-400/20 text-indigo-200",
    index: "text-indigo-400/80",
    metric: "text-indigo-300",
    hover: "hover:border-indigo-400/35",
  },
  amber: {
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(245,158,11,0.12),transparent_60%)]",
    icon: "bg-amber-500/10 border-amber-400/20 text-amber-300",
    check: "text-amber-400",
    pill: "bg-amber-500/10 border-amber-400/20 text-amber-200",
    index: "text-amber-400/80",
    metric: "text-amber-300",
    hover: "hover:border-amber-400/35",
  },
};

export default function ServicePillars(): React.JSX.Element {
  const handleScopePillar = (pillar: ServicePillar) => {
    window.dispatchEvent(
      new CustomEvent("populate-estimator", {
        detail: {
          projectType: `Engineering Pillar: ${pillar.title}`,
          features: [...pillar.stack.slice(0, 4), pillar.metric.value],
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
    <section
      id="solutions"
      aria-labelledby="pillars-heading"
      className="py-28 sm:py-36 relative border-t border-slate-800/80"
    >
      {/* Ambient section glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 pointer-events-none bg-[radial-gradient(60%_100%_at_50%_0%,rgba(45,212,191,0.06),transparent)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Services</span>
            </div>
            <h2
              id="pillars-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Four engineering pillars.
              <span className="block text-slate-400">One accountable studio.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            We pick the framework that fits the workload — not the one we happen to sell. Every
            engagement is fixed-milestone, fully documented, and ends with you owning the code.
          </p>
        </div>

        {/* 2x2 pillar grid */}
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {SERVICE_PILLARS.map((pillar) => {
            const accent = ACCENTS[pillar.accent];
            const Icon = PILLAR_ICONS[pillar.id];
            return (
              <article
                key={pillar.id}
                aria-labelledby={`pillar-${pillar.id}`}
                className={`group spotlight-card flex flex-col rounded-3xl border border-slate-800/80 bg-[#0D121F] ${accent.glow} p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${accent.hover}`}
              >
                {/* Top row: icon + index */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${accent.icon}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`font-mono text-xs font-bold tracking-widest ${accent.index}`}>
                    PILLAR // {pillar.index}
                  </span>
                </div>

                {/* Title + positioning */}
                <div className="mt-6 space-y-2">
                  <h3
                    id={`pillar-${pillar.id}`}
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug"
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">{pillar.tagline}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>

                {/* Stack pills */}
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${pillar.title} technology`}>
                  {pillar.stack.map((tech) => (
                    <li
                      key={tech}
                      className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-semibold ${accent.pill}`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Deliverables */}
                <ul className="mt-6 pt-5 border-t border-slate-800/80 space-y-2.5 text-[13px] text-slate-300">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${accent.check}`} />
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer: metric + CTA */}
                <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                  <div className="leading-tight">
                    <div className={`text-lg font-extrabold font-mono tracking-tight ${accent.metric}`}>
                      {pillar.metric.value}
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                      {pillar.metric.label}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleScopePillar(pillar)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-400/50 text-xs font-mono font-semibold text-slate-200 hover:text-teal-300 transition-all cursor-pointer"
                  >
                    <span>Scope this pillar</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dedicated B2B Solution Blueprints Strip */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
              FIXED €4,800 SPRINT BLUEPRINTS // DEDICATED SOLUTION ARCHITECTURES
            </span>
            <span className="hidden sm:inline text-xs font-mono text-slate-500">
              10–14 Days Delivery · 100% IP Ownership
            </span>
          </div>
          <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/solutions/excel-to-custom-portal"
              className="group spotlight-card p-5 rounded-2xl bg-[#0D121F] border border-slate-800/80 hover:border-teal-400/50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-teal-400 uppercase font-semibold">
                  Solution 01 · Internal Operations
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Excel-to-Custom Internal Portal
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Replace broken spreadsheets with role-gated PostgreSQL concurrency, CSV ingestion, and immutable audit logs.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-400 pt-1">
                <span>Explore Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/solutions/offline-field-operations-pwa"
              className="group spotlight-card p-5 rounded-2xl bg-[#0D121F] border border-slate-800/80 hover:border-teal-400/50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-teal-400 uppercase font-semibold">
                  Solution 02 · Field &amp; Logistics
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Offline-First Field Operations PWA
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Eliminate paper tickets with IndexedDB offline queuing, direct camera receipt OCR, and automatic sync on reconnect.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-400 pt-1">
                <span>Explore Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/solutions/b2b-client-intake-engine"
              className="group spotlight-card p-5 rounded-2xl bg-[#0D121F] border border-slate-800/80 hover:border-teal-400/50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-teal-400 uppercase font-semibold">
                  Solution 03 · Capital &amp; Underwriting
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  B2B Client Intake &amp; Underwriting Engine
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Accelerate underwriting from days to &lt;60 seconds with algorithmic risk modeling and private VPS KYC vaults.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-400 pt-1">
                <span>Explore Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0D121F] px-5 py-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            <span className="text-white font-semibold">Not sure which pillar fits?</span>{" "}
            Run the scope estimator for an instant 36-month savings calculation, then confirm it in a 15-minute audit.
          </p>
          <Link
            href="/#estimator"
            className="inline-flex items-center gap-2 shrink-0 px-4 py-2 rounded-xl border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 hover:border-teal-400/50 text-xs font-mono font-semibold text-teal-300 transition-all"
          >
            <span>Open Scope Estimator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
