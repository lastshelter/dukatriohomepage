"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  FileSpreadsheet,
  WifiOff,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Network,
  Columns,
} from "lucide-react";
import HeroTopology from "@/components/HeroTopology";

interface BlueprintPreview {
  id: "portal" | "pwa" | "intake";
  label: string;
  badge: string;
  route: string;
  liveDemoUrl?: string;
  beforeTitle: string;
  beforePain: string[];
  beforeCost: string;
  afterTitle: string;
  afterSpecs: string[];
  afterMetric: string;
  scopeType: "Excel-to-Custom Portal" | "Offline Field Operations PWA" | "B2B Client Intake Engine";
}

const BLUEPRINTS: BlueprintPreview[] = [
  {
    id: "portal",
    label: "01 · Excel → Custom Portal",
    badge: "INTERNAL OPERATIONS",
    route: "/solutions/excel-to-custom-portal",
    beforeTitle: "Fragile Multi-Tab Spreadsheets & SaaS Seat Tax",
    beforePain: [
      "Silent #REF! & VLOOKUP corruption across 12+ shared files",
      "Zero row-level RBAC — any editor can export or overwrite master data",
      "€850–€2,400/mo burned on per-seat SaaS & no-code subscriptions",
    ],
    beforeCost: "14+ hrs/wk lost reconciling versions",
    afterTitle: "Single-Tenant Role-Gated Operations Portal",
    afterSpecs: [
      "Deterministic CSV/XLSX drag-and-drop ingestion with Zod validation",
      "Granular RBAC permissions (Admin, Manager, Operator, Read-Only Auditor)",
      "Immutable JSON diff audit trail + sub-50ms filtered data grids",
    ],
    afterMetric: "€4,800 Flat · €0/mo Seat Licensing",
    scopeType: "Excel-to-Custom Portal",
  },
  {
    id: "pwa",
    label: "02 · Offline Field OCR PWA",
    badge: "FIELD & LOGISTICS (GRADILIŠTE OS)",
    route: "/solutions/offline-field-operations-pwa",
    liveDemoUrl: "/case-studies/gradiliste-os",
    beforeTitle: "Lost Paper Delivery Slips & Dead-Zone App Crashes",
    beforePain: [
      "Cloud-only mobile apps hang or log out inside basements & trenches",
      "Rain-damaged paper dockets & unindexed WhatsApp receipt photos",
      "Unmonitored 90-minute concrete batch setting cutoffs",
    ],
    beforeCost: "4–7% billing leakage on disputed deliveries",
    afterTitle: "SvelteKit Field PWA + On-Device Camera OCR",
    afterSpecs: [
      "Client-side IndexedDB UUIDv7 outbox queue with zero-signal durability",
      "On-device WebAssembly camera OCR extracts supplier, m³ volume & timestamp",
      "Next.js 16 Command Portal + PocketBase (SQLite WAL) real-time SSE sync",
    ],
    afterMetric: "−80% Ticketing Delay · <€15/mo VPS",
    scopeType: "Offline Field Operations PWA",
  },
  {
    id: "intake",
    label: "03 · B2B Underwriting Engine",
    badge: "CAPITAL & FINTECH (FUNDINGSOLUTIONS)",
    route: "/solutions/b2b-client-intake-engine",
    liveDemoUrl: "https://fundingsolutions.dukatrio.com",
    beforeTitle: "72-Hour Manual Underwriting & Email Attachments",
    beforePain: [
      "62% high-intent borrower drop-off during multi-day manual review",
      "Sensitive KYC & tax documents passed over unencrypted email threads",
      "Senior analysts buried in manually spreading unqualified deals",
    ],
    beforeCost: "72h turnaround · High deal attrition",
    afterTitle: "Sub-60s Algorithmic Qualification & KYC Vault",
    afterSpecs: [
      "Real-time DSCR, LTV & amortization calculation kernel in TypeScript",
      "Instant programmatic PDF indicative term-sheet generation",
      "AES-256 encrypted KYC document vault on isolated EU Hetzner VPS",
    ],
    afterMetric: "< 60s Decisioning · +310% Conversion",
    scopeType: "B2B Client Intake Engine",
  },
];

export default function Hero(): React.JSX.Element {
  const [activeId, setActiveId] = useState<BlueprintPreview["id"]>("pwa");
  const [viewMode, setViewMode] = useState<"comparison" | "topology">("comparison");
  const activeBlueprint = BLUEPRINTS.find((b) => b.id === activeId) ?? BLUEPRINTS[0];

  const handleScopeBlueprint = (bp: BlueprintPreview) => {
    window.dispatchEvent(
      new CustomEvent("populate-estimator", {
        detail: {
          scope: bp.scopeType,
          message: `[Hero Blueprint Selected: ${bp.afterTitle}]\nTarget Delivery: 10–14 Day Fixed Sprint (€4,800 flat · 100% IP ownership).\nReplacing: ${bp.beforeTitle}`,
        },
      })
    );
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("client-name");
        if (input) input.focus();
      }, 450);
    }
  };

  return (
    <section className="relative pt-24 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
      {/* Ambient Glow & Canvas Depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(45,212,191,0.12),rgba(255,255,255,0))] pointer-events-none blur-2xl z-0 animate-ambient-drift" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Top Centered Hero Copy */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* 1. Live Sprint Capacity & Engineering Badge */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/90 text-slate-300 font-mono text-[11px] sm:text-xs font-semibold shadow-lg shadow-black/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
            </span>
            <span className="text-teal-400 font-bold">2 SPRINT SLOTS OPEN</span>
            <span className="text-slate-600">//</span>
            <span className="text-slate-200">10–14 DAY FIXED-PRICE DELIVERY (€4,800)</span>
          </motion.div>

          {/* 2. Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06] text-balance"
          >
            We Engineer Custom Internal Portals &amp; Field PWAs{" "}
            <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-300 bg-clip-text text-transparent block sm:inline">
              That Eliminate SaaS Rent.
            </span>
          </motion.h1>

          {/* 3. Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-xl text-slate-400 leading-relaxed font-normal max-w-3xl mx-auto"
          >
            Replace fragile spreadsheets, paper delivery tickets, and €60+/seat cloud subscriptions with a single-tenant system deployed on your own private EU VPS in 14 days.{" "}
            <span className="text-slate-200 font-medium">
              €4,800 flat milestone. 100% source code ownership.
            </span>
          </motion.p>

          {/* 4. Primary Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto py-4 px-8 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(45,212,191,0.5)] flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Book 15-Minute Feasibility Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#estimator"
              className="w-full sm:w-auto py-4 px-7 rounded-xl bg-[#0D121F] hover:bg-slate-900 border border-slate-800/90 hover:border-teal-400/40 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-teal-400" />
              <span>Calculate 3-Year SaaS Savings ↓</span>
            </a>
          </motion.div>
        </div>

        {/* 5. INTERACTIVE ARCHITECTURE TRANSFORMATION WORKBENCH */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="max-w-6xl mx-auto rounded-3xl bg-[#0D121F]/95 border border-slate-800/90 shadow-2xl shadow-black/60 overflow-hidden spotlight-card"
        >
          {/* Workbench Top Bar: Interactive Blueprint Selector */}
          <div className="px-4 sm:px-6 py-4 bg-slate-950/80 border-b border-slate-800/90 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="uppercase tracking-wider font-bold text-slate-300">
                  Interactive System Blueprint Inspector
                </span>
              </div>

              {/* View Mode Switcher: Before/After vs. 5-Node Live Topology */}
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setViewMode("comparison")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    viewMode === "comparison"
                      ? "bg-teal-400 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Columns className="w-3 h-3" />
                  <span>Before / After</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("topology")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    viewMode === "topology"
                      ? "bg-teal-400 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Network className="w-3 h-3" />
                  <span>Live 5-Node Topology</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="System Blueprints">
              {BLUEPRINTS.map((bp) => {
                const isActive = bp.id === activeId;
                const Icon =
                  bp.id === "portal"
                    ? FileSpreadsheet
                    : bp.id === "pwa"
                    ? WifiOff
                    : Cpu;
                return (
                  <button
                    key={bp.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(bp.id)}
                    className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 cursor-pointer border ${
                      isActive
                        ? "bg-teal-950/60 border-teal-400/60 text-teal-300 font-bold shadow-sm"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{bp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workbench Body: Animated Before vs. After Comparison OR Live 5-Node Topology */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeBlueprint.id}-${viewMode}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="p-6 sm:p-8 space-y-6"
            >
              {viewMode === "topology" ? (
                <HeroTopology blueprintId={activeBlueprint.id} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Column: BEFORE (Legacy Bottleneck) */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-rose-900/40 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>BEFORE // LEGACY BOTTLENECK</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">STATUS: FRAGILE</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {activeBlueprint.beforeTitle}
                    </h2>

                    <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-400">
                      {activeBlueprint.beforePain.map((pain) => (
                        <li key={pain} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                          <span className="leading-relaxed">{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-500">OPERATIONAL DRAIN:</span>
                    <span className="text-rose-400 font-bold">{activeBlueprint.beforeCost}</span>
                  </div>
                </div>

                {/* Right Column: AFTER (DukaTrio Engineered System) */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-teal-950/25 via-slate-950/90 to-slate-950/90 border border-teal-500/40 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>AFTER // DUKATRIO ENGINEERED SYSTEM</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-[10px] font-mono text-teal-300 font-bold">
                        {activeBlueprint.badge}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      {activeBlueprint.afterTitle}
                    </h2>

                    <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-200">
                      {activeBlueprint.afterSpecs.map((spec) => (
                        <li key={spec} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Bar inside Workbench */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-400">
                        VERIFIED OUTCOME &amp; TERMS
                      </div>
                      <div className="text-sm sm:text-base font-mono font-black text-teal-400">
                        {activeBlueprint.afterMetric}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {activeBlueprint.liveDemoUrl && (
                        activeBlueprint.liveDemoUrl.startsWith("/") ? (
                          <Link
                            href={activeBlueprint.liveDemoUrl}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 transition-colors"
                          >
                            <span>Read Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                          </Link>
                        ) : (
                          <a
                            href={activeBlueprint.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 transition-colors"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                          </a>
                        )
                      )}

                      <Link
                        href={activeBlueprint.route}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 transition-colors"
                      >
                        <span>Full Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleScopeBlueprint(activeBlueprint)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <span>Deploy This Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 6. Monochrome Engineering Trust Strip */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
          <span className="text-slate-300 font-semibold">SvelteKit Field PWA</span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-300 font-semibold">Next.js 16 Command Portals</span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-300 font-semibold">PocketBase (SQLite WAL) &amp; PostgreSQL</span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-300 font-semibold">Docker &amp; Caddy v2 Edge</span>
          <span className="text-slate-700">•</span>
          <span className="text-teal-400 font-semibold">100% Client IP Ownership</span>
        </div>
      </div>
    </section>
  );
}
