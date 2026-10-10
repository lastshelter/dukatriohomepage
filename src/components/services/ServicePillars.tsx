import React from "react";
import Link from "next/link";
import { Activity, ArrowRight, CheckCircle2, Database, Globe, Layers, Sparkles } from "lucide-react";
import {
  SERVICE_PILLARS,
  type PillarAccent,
  type PillarId,
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
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(6,182,212,0.13),transparent_60%)]",
    icon: "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",
    check: "text-cyan-400",
    pill: "bg-cyan-500/10 border-cyan-400/20 text-cyan-200",
    index: "text-cyan-400/80",
    metric: "text-cyan-300",
    hover: "hover:border-cyan-400/30",
  },
  emerald: {
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(16,185,129,0.13),transparent_60%)]",
    icon: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
    check: "text-emerald-400",
    pill: "bg-emerald-500/10 border-emerald-400/20 text-emerald-200",
    index: "text-emerald-400/80",
    metric: "text-emerald-300",
    hover: "hover:border-emerald-400/30",
  },
  indigo: {
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(99,102,241,0.15),transparent_60%)]",
    icon: "bg-indigo-500/10 border-indigo-400/20 text-indigo-300",
    check: "text-indigo-400",
    pill: "bg-indigo-500/10 border-indigo-400/20 text-indigo-200",
    index: "text-indigo-400/80",
    metric: "text-indigo-300",
    hover: "hover:border-indigo-400/30",
  },
  amber: {
    glow: "bg-[radial-gradient(520px_circle_at_100%_0%,rgba(245,158,11,0.12),transparent_60%)]",
    icon: "bg-amber-500/10 border-amber-400/20 text-amber-300",
    check: "text-amber-400",
    pill: "bg-amber-500/10 border-amber-400/20 text-amber-200",
    index: "text-amber-400/80",
    metric: "text-amber-300",
    hover: "hover:border-amber-400/30",
  },
};

export default function ServicePillars(): React.JSX.Element {
  return (
    <section
      id="solutions"
      aria-labelledby="pillars-heading"
      className="py-24 sm:py-32 relative border-t border-white/10"
    >
      {/* Ambient section glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 pointer-events-none bg-[radial-gradient(60%_100%_at_50%_0%,rgba(6,182,212,0.07),transparent)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Services</span>
            </div>
            <h2
              id="pillars-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Four engineering pillars.
              <span className="block text-zinc-500">One accountable studio.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
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
                className={`group spotlight-card flex flex-col rounded-2xl border border-white/10 bg-zinc-950/60 ${accent.glow} p-6 sm:p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-900/50 ${accent.hover}`}
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
                  <p className="text-sm font-medium text-zinc-300 leading-relaxed">{pillar.tagline}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{pillar.description}</p>
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
                <ul className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-[13px] text-zinc-300">
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
                    <div className={`text-lg font-extrabold tracking-tight ${accent.metric}`}>
                      {pillar.metric.value}
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                      {pillar.metric.label}
                    </div>
                  </div>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>Scope this pillar</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            <span className="text-zinc-200 font-semibold">Not sure which pillar fits?</span>{" "}
            Run the scope estimator for an instant range, then we confirm it in a 30-minute call.
          </p>
          <Link
            href="/#estimator"
            className="inline-flex items-center gap-2 shrink-0 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all"
          >
            <span>Open scope estimator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
