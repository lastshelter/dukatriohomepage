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
        {/* 1. Precision Badge Pill with Live Status Pulse */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 font-mono text-[11px] sm:text-xs font-semibold shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-500">ENGINEERING STUDIO //</span>
          <span className="text-zinc-200">INTERNAL TOOLS &amp; HIGH-SPEED WEB SYSTEMS</span>
        </motion.div>

        {/* 2. Main Headline: Business Value First */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto text-balance"
        >
          We Build Custom Internal Tools &amp; Portals{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent block sm:inline">
            That Eliminate Monthly SaaS Taxes.
          </span>
        </motion.h1>

        {/* 3. Subtitle Paragraph: SaaS Tax & Spreadsheet Replacement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-xl text-zinc-400 leading-relaxed font-normal max-w-3xl mx-auto"
        >
          Replace bloated €60/seat subscriptions and brittle spreadsheets with dedicated, sub-400ms web systems deployed on private NVMe cloud infrastructure. Zero seat licenses. 100% data and code ownership.
        </motion.p>

        {/* 4. Core Guarantees Micro-Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto pt-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151E] border border-white/10 hover:border-white/20 transition-colors duration-200 text-zinc-200 text-xs font-medium shadow-sm cursor-default">
            <span className="text-cyan-400">⚡</span>
            <span>Sub-400ms Turnaround</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151E] border border-white/10 hover:border-white/20 transition-colors duration-200 text-zinc-200 text-xs font-medium shadow-sm cursor-default">
            <span className="text-emerald-400">🔒</span>
            <span>Self-Hosted &amp; 100% Data Ownership</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151E] border border-white/10 hover:border-white/20 transition-colors duration-200 text-zinc-200 text-xs font-medium shadow-sm cursor-default">
            <span className="text-amber-400">🛡️</span>
            <span>Zero Recurring Seat Tax</span>
          </div>
        </motion.div>

        {/* 5. Primary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Request Fixed-Price Scope</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#estimator"
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#12151E] hover:bg-[#181C28] border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Calculate SaaS Tax ROI ↓</span>
          </a>
        </motion.div>

        {/* 6. Monochrome Engineering Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          className="pt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400 border-t border-white/10 max-w-3xl mx-auto"
        >
          <span className="hover:text-zinc-200 transition-colors">Next.js App Router</span>
          <span className="text-zinc-600">•</span>
          <span className="hover:text-zinc-200 transition-colors">PostgreSQL &amp; Prisma</span>
          <span className="text-zinc-600">•</span>
          <span className="hover:text-zinc-200 transition-colors">Docker &amp; Caddy Edge</span>
          <span className="text-zinc-600">•</span>
          <span className="hover:text-zinc-200 transition-colors">Private VPS Deployment</span>
          <span className="text-zinc-600">•</span>
          <span className="hover:text-zinc-200 transition-colors">Offline-First PWA</span>
        </motion.div>
      </div>
    </section>
  );
}
