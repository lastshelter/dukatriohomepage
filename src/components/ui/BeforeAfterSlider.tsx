"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  ChevronsLeftRight,
  Gauge,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Server,
  Code2,
} from "lucide-react";

export default function BeforeAfterSlider(): React.JSX.Element {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section
      id="benchmark"
      className="py-24 sm:py-32 relative border-t border-slate-800/80 bg-[#0B0D13]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
            <Gauge className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive Architectural Benchmark</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Proof of Craft: The Modernization Delta.
          </h2>

          <p className="text-base text-slate-400 leading-relaxed font-normal">
            Drag the divider (or use left/right arrow keys) to compare bloated legacy SaaS &amp; spreadsheet stacks against a single-tenant DukaTrio production engine.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div
          ref={containerRef}
          role="slider"
          tabIndex={0}
          aria-label="Comparison slider between legacy stack and DukaTrio engine"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
          className="relative w-full max-w-5xl mx-auto min-h-[460px] sm:min-h-[480px] rounded-3xl border border-slate-800/90 overflow-hidden shadow-2xl select-none cursor-ew-resize bg-[#0D121F] focus:outline-none focus:ring-2 focus:ring-teal-400/60"
        >
          {/* 1. AFTER SIDE (Right / Full Base Layer) */}
          <div className="absolute inset-0 bg-[#0D121F] flex flex-col justify-between p-6 sm:p-10 font-mono">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-900/50 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs text-teal-300 font-bold tracking-wider uppercase">
                  AFTER: DukaTrio Single-Tenant Next.js 16 Engine
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold">
                99/100 LIGHTHOUSE · €0 SEAT TAX
              </span>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-auto py-4">
              <div className="p-4 rounded-2xl bg-slate-950/85 border border-teal-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>EDGE TTFB</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">38ms</div>
                <p className="text-[10px] text-teal-400">Hetzner EU Edge SSR</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/85 border border-emerald-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISOLATION</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">AES-256</div>
                <p className="text-[10px] text-emerald-400">Dedicated VPS + RBAC</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/85 border border-cyan-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
                  <Server className="w-3.5 h-3.5" />
                  <span>TRANSPORT</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">HTTP/3</div>
                <p className="text-[10px] text-cyan-300">Caddy v2 QUIC + Auto TLS</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/85 border border-teal-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>LICENSING</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">€0/seat</div>
                <p className="text-[10px] text-teal-300">100% Client IP Ownership</p>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Next.js 16 App Router · PostgreSQL / SQLite WAL · Hardened Caddy v2 Edge</span>
              </span>
              <span className="text-teal-400 font-bold">OPTIMAL POSTURE</span>
            </div>
          </div>

          {/* 2. BEFORE SIDE (Left / Responsive Clip-Path Layer) */}
          <div
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            className="absolute inset-0 bg-[#150C10] flex flex-col justify-between p-6 sm:p-10 font-mono z-10"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/40 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs text-rose-300 font-bold tracking-wider uppercase">
                  BEFORE: Fragile Spreadsheets &amp; Bloated Multi-SaaS Stack
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-semibold">
                54/100 LIGHTHOUSE · HIGH SEAT TAX
              </span>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-auto py-4">
              <div className="p-4 rounded-2xl bg-slate-950/85 border border-rose-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>LATENCY</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">3,850ms</div>
                <p className="text-[10px] text-rose-400">Heavy client-side bloat</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/85 border border-rose-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>DATA RISK</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">SHARED</div>
                <p className="text-[10px] text-rose-400">No row-level audit trail</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/85 border border-rose-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>FIELD SYNC</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">DROPS</div>
                <p className="text-[10px] text-rose-400">Fails in dead zones</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/85 border border-rose-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>SAAS RENT</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">€1,450/m</div>
                <p className="text-[10px] text-rose-400">Per-seat + Zapier tax</p>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="p-3.5 rounded-xl bg-slate-950/85 border border-rose-900/60 flex flex-wrap items-center justify-between text-xs text-rose-300 gap-2">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Silent #REF! Errors · Unencrypted Email Attachments · Vendor Lock-In</span>
              </span>
              <span className="text-rose-400 font-bold">CRITICAL FRICTION</span>
            </div>
          </div>

          {/* 3. CENTER DRAG HANDLE & DIVIDER LINE */}
          <div
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            className="absolute inset-y-0 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="h-full w-0.5 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.9)]" />
            <div className="absolute w-10 h-10 rounded-full bg-teal-400 border-2 border-white shadow-[0_0_25px_rgba(45,212,191,0.8)] flex items-center justify-center text-slate-950 cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
              <ChevronsLeftRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Instructions helper */}
        <div className="text-center font-mono text-xs text-slate-500">
          ← Drag divider or press Arrow Keys to compare Legacy Stack vs. DukaTrio Engine →
        </div>
      </div>
    </section>
  );
}
