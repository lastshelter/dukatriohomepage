"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Camera,
  WifiOff,
  Sparkles,
} from "lucide-react";

export default function FlagshipCaseStudy(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<"ocr" | "timer" | "offline">("ocr");

  return (
    <section id="flagship-case-study" className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/90 overflow-hidden">
      {/* Background ambient glow highlights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Flagship In-House SaaS Production Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Gradilište Dukatrio: Construction OS &amp; Offline PWA.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed">
            A real-world deep dive into how bespoke full-stack systems engineering eliminated lost paper delivery notes, signal-dead concrete trenches, and catastrophic concrete hydration deadlines.
          </p>
        </div>

        {/* Hero Showcase Container */}
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-12">
          {/* Top Row: Executive Summary & Live CTAs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-zinc-800">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <span className="text-amber-400 font-bold">FIELD HARDENED</span>
                <span>·</span>
                <span>Proprietary Next.js PWA Architecture</span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">Live in Active Production</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                From Muddy Jobsite Pits to Zero-Loss Digital Infrastructure
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Construction sites are the ultimate stress test for software: dust, rain, spotty cellular networks, and non-technical crews. We engineered Gradilište Dukatrio from the foundation up to run flawlessly on zero bars of signal.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="https://gradiliste.dukatrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_-5px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Live Application</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#architecture"
                className="py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>View Engineering Specs</span>
              </a>
            </div>
          </div>

          {/* 3-Part Deep Dive Anatomy: Problem, Execution, Result */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Physical Bottlenecks (Problem) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-4 relative overflow-hidden group hover:-translate-y-1 hover:border-rose-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                  01 · PHYSICAL OPERATIONAL BOTTLENECK
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Lost Tickets &amp; 90-Min Concrete Deadlines
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Paper delivery dispatch tickets were frequently dropped in transit, ruined by rainwater, or filled with unreadable handwriting. Most critically: ready-mix concrete has a strict <strong>90-minute initial setting threshold</strong> from the plant batching timestamp. Unmonitored mixer delays led to premature cement hydration and catastrophic structural batch rejections costing thousands of Euros per incident.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-400 border-t border-zinc-800/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Stained &amp; lost paper delivery notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Strict 90-minute pour cutoff risk</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Disputed concrete m³ invoices</span>
                </li>
              </ul>
            </div>

            {/* 2. Technical Execution */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-4 relative overflow-hidden group hover:-translate-y-1 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  02 · HIGH-SPEED TECHNICAL EXECUTION
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Offline-First PWA &amp; On-Device Camera OCR
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Engineered as a high-performance <strong>Progressive Web App (PWA)</strong> with full Service Worker asset and API caching for underground trenches and signal dead-zones. Integrated an on-device camera OCR scanning engine that instantaneously extracts supplier details, batch volumes (m³), and departure timestamps from physical tickets, coupled with an automated real-time chemical countdown timer.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-400 border-t border-zinc-800/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Zero-signal SQLite local sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Instant camera OCR ticket parser</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Real-time pour countdown alerts</span>
                </li>
              </ul>
            </div>

            {/* 3. Concrete Result */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-4 relative overflow-hidden group hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  03 · QUANTIFIABLE PRODUCTION OUTCOME
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  80% Re-Entry Cut &amp; Zero Gatekeeper Friction
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Achieved an <strong>80% reduction in manual data re-entry</strong> for site engineers and back-office bookkeeping. Maintained <strong>100% adherence to concrete slump and pour limits</strong> with zero discarded mixer batches. Delivered directly over the open web as an installable PWA with zero App Store submission delays, 30% platform taxes, or mandatory approval queues.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-400 border-t border-zinc-800/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>80% administrative time saved</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Zero batch rejects across hundreds of pours</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>100% bypass of App Store tax &amp; friction</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Feature Simulation Preview */}
          <div className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Field Architecture In Action
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Field Tooling Telemetry Simulation
                </h4>
              </div>

              {/* Feature Preview Tabs */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("ocr")}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "ocr"
                      ? "bg-amber-950/70 border-amber-500 text-amber-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera OCR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("timer")}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "timer"
                      ? "bg-amber-950/70 border-amber-500 text-amber-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>90m Setting Timer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("offline")}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "offline"
                      ? "bg-amber-950/70 border-amber-500 text-amber-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline PWA Sync</span>
                </button>
              </div>
            </div>

            {/* Tab Views */}
            {activeTab === "ocr" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-zinc-400 pb-1 border-b border-zinc-800">
                    <span>OCR SCANNER TELEMETRY</span>
                    <span className="text-emerald-400 font-bold">PARSED: 100% CONFIDENCE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">SUPPLIER:</span>
                    <span className="text-zinc-200 font-bold">Lafarge Holcim (Baza Pančevo)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CONCRETE CLASS:</span>
                    <span className="text-amber-400 font-bold">C25/30 (MB 30) - XC2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">BATCH VOLUME:</span>
                    <span className="text-white font-bold">9.5 m³ (Truck Mixer #BG-892-KT)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DEPARTURE TIME:</span>
                    <span className="text-cyan-400 font-bold">10:14 AM (Auto-synced)</span>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant Extraction Without Cloud Latency</span>
                  </div>
                  <p>
                    Field supervisors point the smartphone camera at physical paper tickets. On-device edge processing runs locally in WebAssembly, parsing Romanian/Serbian delivery notes without needing a cloud roundtrip.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "timer" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span>90-MIN INITIAL HYDRATION COUNTDOWN</span>
                    <span className="animate-pulse">ACTIVE POUR</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    01:14:28 <span className="text-xs text-amber-400 font-normal">REMAINING</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full w-[78%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Batch Departure: 10:14 AM</span>
                    <span className="text-amber-400">Pour Cutoff: 11:44 AM</span>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Predictive Chemical Quality Safeguard</span>
                  </div>
                  <p>
                    Ambient temperature and elapsed traffic time are continuously correlated. If the mixer approaches the 75-minute warning mark without site arrival, visual and audio alarms notify the site manager to re-route or prioritize the pour.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "offline" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-zinc-400 pb-1 border-b border-zinc-800">
                    <span>PWA OFFLINE QUEUE</span>
                    <span className="text-cyan-400 font-bold">QUEUE: 3 EVENTS PENDING</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>[LOCAL] 18 Worker Check-ins Stored</span>
                    <span>✓ CACHED</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>[LOCAL] Daily Log Concrete Ticket Attached</span>
                    <span>✓ CACHED</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-400">
                    <span>[NETWORK] Signal Lost (Basement Trench)</span>
                    <span className="animate-pulse">POLLING</span>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <WifiOff className="w-4 h-4 text-cyan-400" />
                    <span>Zero Data Loss in Cellular Dead-Zones</span>
                  </div>
                  <p>
                    All attendance entries, worker advances, machine fuel hours, and delivery tickets write immediately to local indexed storage. As soon as the device reconnects to Wi-Fi or cellular network, background sync flushes the queue to the server.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Metrics Summary Strip */}
          <div className="pt-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                -80%
              </div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                Data Re-Entry Time
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                90 Min
              </div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                Curing Timer Protection
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                100%
              </div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                Offline Trench PWA Sync
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                0 Days
              </div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                App Store Review Friction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
