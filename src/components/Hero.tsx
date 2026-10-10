"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Radio,
  Calculator,
  ArrowRight,
  Layers,
  ShieldCheck,
  Cpu,
  Activity,
} from "lucide-react";

export default function Hero(): React.JSX.Element {
  return (
    <section className="relative pt-24 pb-20 sm:pt-36 sm:pb-32 text-center overflow-hidden">
      {/* Ambient Glow & Canvas Depth: Slow-drifting radial gradient centered behind hero title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[460px] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none blur-2xl z-0 animate-ambient-drift" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* 1. Precision Badge Pill: fade-in + slide-down (duration 400ms, ease-out) */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/60 text-cyan-400 font-mono text-xs font-semibold shadow-inner"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>High-Performance Engineering Studio</span>
        </motion.div>

        {/* 2. Main Headline: fade-in + slide-up (duration 500ms, delay 150ms) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto"
        >
          Custom Web Applications &amp; Portals That{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Streamline Business Operations.
          </span>
        </motion.h1>

        {/* 3. Subtitle Paragraph: fade-in + slide-up (duration 500ms, delay 300ms) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-xl text-zinc-400 leading-relaxed font-normal max-w-3xl mx-auto"
        >
          We build dedicated client portals, field tools, and custom internal systems that replace messy spreadsheets and sluggish off-the-shelf software—fast, self-hosted, and engineered to scale.
        </motion.p>

        {/* 4. Value Prop Pills: fade-in (delay 450ms) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto pt-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-slate-800 hover:border-slate-600 transition-colors duration-200 text-zinc-200 text-xs font-medium shadow-sm hover:scale-[1.02] cursor-default">
            <span className="text-cyan-400">⚡</span>
            <span>Sub-Second Load Times</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-slate-800 hover:border-slate-600 transition-colors duration-200 text-zinc-200 text-xs font-medium shadow-sm hover:scale-[1.02] cursor-default">
            <span className="text-emerald-400">🔒</span>
            <span>Self-Hosted &amp; Full Data Ownership</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-slate-800 hover:border-slate-600 transition-colors duration-200 text-zinc-200 text-xs font-medium shadow-sm hover:scale-[1.02] cursor-default">
            <span className="text-indigo-400">🛠️</span>
            <span>Zero Generic Templates</span>
          </div>
        </motion.div>

        {/* 5. CTA Buttons: fade-in + slight spring-up (delay 600ms) with interactive hover micro-lift & glow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#calculator"
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-zinc-950" />
            <span>Calculate Project Cost</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#case-studies"
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-slate-800 hover:border-slate-600 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>View Case Studies</span>
          </a>
        </motion.div>

        {/* Centered Micro-Trust Telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-zinc-400 border-t border-zinc-800/80 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors duration-200">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Bank-Grade Encryption</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors duration-200">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Node.js 22 LTS &amp; Next.js 16</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors duration-200">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>99.99% Uptime Architecture</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
