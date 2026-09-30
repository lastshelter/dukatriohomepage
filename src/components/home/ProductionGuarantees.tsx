"use client";

import React from "react";
import { ShieldCheck, Zap, Smartphone, BadgeEuro, Shield, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";

interface GuaranteeCard {
  id: string;
  title: string;
  badge: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeStyle: string;
}

const GUARANTEES: GuaranteeCard[] = [
  {
    id: "data-sovereignty",
    title: "100% Data Sovereignty",
    badge: "Self-Hosted / ISO Compliant",
    body: "Dedicated European bare-metal hosting with automated 60-day offsite disaster recovery. You own your data and database completely—no vendor lock-in.",
    icon: ShieldCheck,
    accentColor: "text-cyan-400 group-hover:text-cyan-300",
    badgeStyle: "bg-cyan-950/80 border-cyan-800/60 text-cyan-300",
  },
  {
    id: "edge-latency",
    title: "Sub-50ms Edge Latency",
    badge: "99.9% Uptime SLA",
    body: "Lightweight Next.js App Router engine paired with reverse-proxy edge caching. Near-instantaneous page transitions with zero cumulative layout shift.",
    icon: Zap,
    accentColor: "text-emerald-400 group-hover:text-emerald-300",
    badgeStyle: "bg-emerald-950/80 border-emerald-800/60 text-emerald-300",
  },
  {
    id: "jobsite-ux",
    title: "Resilient Jobsite UX",
    badge: "Field-Ready PWA",
    body: "Engineered specifically for low-signal basements, mobile foremen, and field crews. Tap-optimized touch targets that work in real-world conditions.",
    icon: Smartphone,
    accentColor: "text-indigo-400 group-hover:text-indigo-300",
    badgeStyle: "bg-indigo-950/80 border-indigo-800/60 text-indigo-300",
  },
  {
    id: "currency-precision",
    title: "Dual-Currency Precision",
    badge: "Audit-Grade Ledger",
    body: "Strict fixed-point accounting engine for automated EUR and RSD cross-conversions. Zero decimal-rounding drift across payroll, loans, and invoicing.",
    icon: BadgeEuro,
    accentColor: "text-amber-400 group-hover:text-amber-300",
    badgeStyle: "bg-amber-950/80 border-amber-800/60 text-amber-300",
  },
];


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProductionGuarantees(): React.JSX.Element {
  return (
    <section id="guarantees" className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/70">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold shadow-inner">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Operational Rigor &amp; SLA Commitment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Enterprise Engineering &amp; SLA Guarantees
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            Built with rigorous operational discipline. High performance, complete data sovereignty, and zero runtime bloat.
          </p>
        </div>

        {/* 4-Card Responsive Grid with Framer Motion Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-7 shadow-xl hover:border-zinc-700 hover:bg-zinc-900/90 transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                {/* Glow accent highlight on hover */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

                <div className="space-y-4">
                  {/* Icon & Badge Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-zinc-700 transition-all shadow-inner">
                      <Icon className={`w-6 h-6 transition-colors ${item.accentColor}`} />
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border text-right leading-none ${item.badgeStyle}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-normal">
                      {item.body}
                    </p>
                  </div>
                </div>

                {/* Footer Micro-Verification */}
                <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified Contractual SLA</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
