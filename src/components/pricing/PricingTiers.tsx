"use client";

import React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles, Clock } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  price: string;
  billing: string;
  timeline: string;
  description: string;
  highlighted?: boolean;
  accent: "cyan" | "emerald" | "amber";
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "core_sprint",
    name: "Core System Sprint",
    badge: "FIXED PRICE SPRINT",
    price: "€4,800 – €5,800",
    billing: "Single milestone or 50/50 split",
    timeline: "2–3 Weeks to Production",
    description:
      "Engineered for businesses replacing a bottlenecked spreadsheet, fragile Airtable base, or expensive single-tool SaaS with a tailored, self-hosted web system.",
    accent: "cyan",
    deliverables: [
      "Single-tenant Next.js 16 + PostgreSQL operational web application",
      "2 to 3 automated core workflows (intake desks, client dashboards, document generator)",
      "Production deployment on private Hetzner / Linux VPS with Caddy TLS & daily backups",
      "Complete Git repository, Docker configs, and 100% intellectual property transfer",
      "30-day post-launch technical warranty & deployment signoff",
    ],
    ctaLabel: "Scope Core Sprint",
    ctaHref: "#contact",
  },
  {
    id: "enterprise_kernel",
    name: "Enterprise Operations & Kernel",
    badge: "MOST REQUESTED // HIGH-COMPLEXITY",
    price: "€8,500 – €14,000",
    billing: "3-Stage Milestone Protocol",
    timeline: "4–6 Weeks to Production",
    description:
      "Full-scale operational platforms featuring multi-tenant RBAC, offline-first mobile PWAs, high-precision calculation engines, or high-security document vaults.",
    highlighted: true,
    accent: "emerald",
    deliverables: [
      "Complex state architecture: Offline-first PWA, on-device OCR, or real-time telemetry",
      "Algorithmic calculation kernels (amortization, DSCR stress models, payroll engines)",
      "Multi-tier RBAC security (Admin, Supervisor, Worker, Client, Auditor roles)",
      "Custom third-party integrations: ERP, banking endpoints, CRM webhooks, or hardware",
      "Hardened Linux containerization, automated SSL renewals, and penetration-tested auth",
      "Full IP handover + 60-day architectural warranty and documentation",
    ],
    ctaLabel: "Scope Enterprise System",
    ctaHref: "#contact",
  },
  {
    id: "sla_retainer",
    name: "Managed Infrastructure Care",
    badge: "MONTHLY PEACE-OF-MIND SLA",
    price: "€190 – €350",
    billing: "Billed monthly · Cancel anytime",
    timeline: "Continuous Monitoring",
    description:
      "Complete server management and ongoing DevOps for teams that want hands-off reliability without hiring a full-time internal systems engineer.",
    accent: "amber",
    deliverables: [
      "Daily off-site encrypted database snapshots with automated recovery testing",
      "Linux kernel security patching, container updates, and SSL renewal monitoring",
      "Continuous uptime monitoring with sub-15-minute response alerting",
      "2–3 hours included monthly for schema adjustments, minor features, or field config",
      "Direct Priority Telegram / Signal engineer channel with 4-hour SLA",
    ],
    ctaLabel: "Inquire for Retainer",
    ctaHref: "#contact",
  },
];

export default function PricingTiers(): React.JSX.Element {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative border-t border-white/10 bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Predictable Commercial Models</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Fixed-Milestone Pricing.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            No ambiguous hourly billable traps. No per-seat recurring platform taxes. Guaranteed fixed scopes with 100% source code handover upon delivery.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div data-stagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isHighlighted = plan.highlighted;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative group ${
                  isHighlighted
                    ? "bg-[#12151E] border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/15 hover:border-emerald-400"
                    : "bg-[#12151E] border border-white/15 hover:border-white/30 hover:bg-[#181C28] shadow-lg shadow-black/40 hover:-translate-y-1"
                }`}
              >
                {/* Optional Highlight Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-zinc-950 font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    Recommended Architecture
                  </div>
                )}

                <div className="space-y-6">
                  {/* Badge & Timeline */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-4">
                    <span
                      className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                        plan.accent === "emerald"
                          ? "text-emerald-400"
                          : plan.accent === "amber"
                          ? "text-amber-400"
                          : "text-cyan-400"
                      }`}
                    >
                      {plan.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{plan.timeline}</span>
                    </div>
                  </div>

                  {/* Plan Name & Price */}
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                        {plan.price}
                      </span>
                      {plan.id === "sla_retainer" && (
                        <span className="text-xs text-zinc-400 font-mono">/ mo</span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 font-mono block mt-1">{plan.billing}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">{plan.description}</p>

                  {/* Deliverables List */}
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block font-semibold">
                      Included Engineering Deliverables:
                    </span>
                    <ul className="space-y-2.5 text-xs text-zinc-300">
                      {plan.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              plan.accent === "emerald"
                                ? "text-emerald-400"
                                : plan.accent === "amber"
                                ? "text-amber-400"
                                : "text-cyan-400"
                            }`}
                          />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-8">
                  <a
                    href={plan.ctaHref}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 btn-tactile ${
                      isHighlighted
                        ? "bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20"
                        : "bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-white"
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual Funnel Note: Link to Interactive Calculator */}
        <div className="text-center pt-4">
          <p className="text-xs sm:text-sm text-zinc-500 font-mono">
            Need multi-service scaling, custom mathematical algorithms, or expedited delivery?{" "}
            <a
              href="#estimator"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-semibold transition-colors"
            >
              Configure custom parameters in our Interactive Scope Estimator ↓
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
