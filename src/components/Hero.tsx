"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  ArrowRight,
} from "lucide-react";

export default function Hero(): React.JSX.Element {
  return (
    <section className="relative pt-28 pb-24 sm:pt-40 sm:pb-36 text-center overflow-hidden">
      {/* Ambient Glow & Canvas Depth: Subtle soft teal radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[460px] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(45,212,191,0.10),rgba(255,255,255,0))] pointer-events-none blur-2xl z-0 animate-ambient-drift" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9 relative z-10">
        {/* 1. Precision Badge Pill with Live Status Pulse */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-slate-300 font-mono text-[11px] sm:text-xs font-semibold"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          <span className="text-slate-500">ENGINEERING STUDIO //</span>
          <span className="text-slate-200">INTERNAL TOOLS &amp; HIGH-SPEED WEB SYSTEMS</span>
        </motion.div>

        {/* 2. Main Headline: Business Value First */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto text-balance"
        >
          We Build Custom Internal Tools &amp; Portals{" "}
          <span className="text-teal-400 block sm:inline">
            That Eliminate Monthly SaaS Taxes.
          </span>
        </motion.h1>

        {/* 3. Subtitle Paragraph: SaaS Tax & Spreadsheet Replacement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-xl text-slate-400 leading-relaxed font-normal max-w-3xl mx-auto"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-slate-200 text-xs font-medium cursor-default">
            <span className="text-teal-400">⚡</span>
            <span>Sub-400ms Turnaround</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-slate-200 text-xs font-medium cursor-default">
            <span className="text-teal-400">🔒</span>
            <span>Self-Hosted &amp; 100% Data Ownership</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-slate-200 text-xs font-medium cursor-default">
            <span className="text-teal-400">🛡️</span>
            <span>Zero Recurring Seat Tax</span>
          </div>
        </motion.div>

        {/* 5. Primary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Request Fixed-Price Scope</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#estimator"
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#0D121F] hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4 text-teal-400" />
            <span>Calculate SaaS Tax ROI ↓</span>
          </a>
        </motion.div>

        {/* 6. Monochrome Engineering Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          className="pt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400 border-t border-slate-800/80 max-w-3xl mx-auto"
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
