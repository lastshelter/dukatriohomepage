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
  Lock,
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

  return (
    <section className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Architectural Benchmark</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Proof of Craft: The Modernization Delta.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            Drag the divider to observe how we transform bloated, insecure legacy codebases into sub-millisecond, institutional-grade digital engines.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div
          ref={containerRef}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
          className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[520px] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl select-none cursor-ew-resize bg-zinc-950"
        >
          {/* 1. AFTER SIDE (Right / Background Layer) */}
          <div className="absolute inset-0 bg-[#0c121e] flex flex-col justify-between p-6 sm:p-10 font-mono">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-cyan-900/50 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-cyan-300 font-bold tracking-wider uppercase">
                  AFTER: Dukatrio Flagship Next.js Engine
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                99/100 LIGHTHOUSE
              </span>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-cyan-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>EDGE TTFB</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">280ms</div>
                <p className="text-[10px] text-emerald-400">Sub-millisecond Edge SSR</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ENCRYPTION</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">AES-256</div>
                <p className="text-[10px] text-emerald-400">Hardware-level field storage</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-indigo-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold">
                  <Server className="w-3.5 h-3.5" />
                  <span>PROTOCOL</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">HTTP/3</div>
                <p className="text-[10px] text-indigo-300">QUIC Transport + Auto TLS</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-teal-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>BUNDLE</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">42 kB</div>
                <p className="text-[10px] text-teal-300">Zero bloat tree-shaken JS</p>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-300 gap-2">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Next.js 16 App Router · Prisma ORM · Hardened Caddy Edge</span>
              </span>
              <span className="text-cyan-400 font-bold">OPTIMAL POSTURE</span>
            </div>
          </div>

          {/* 2. BEFORE SIDE (Left / Clipped Overlay Layer) */}
          <div
            style={{ width: `${sliderPosition}%` }}
            className="absolute inset-y-0 left-0 bg-[#160d0d] border-r-2 border-cyan-400 overflow-hidden flex flex-col justify-between p-6 sm:p-10 font-mono shadow-2xl z-10"
          >
            <div className="w-[1000px] h-full flex flex-col justify-between">
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-4 max-w-4xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs text-rose-300 font-bold tracking-wider uppercase">
                    BEFORE: Bloated Legacy PHP Monolith / Page Builder
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-semibold">
                  54/100 LIGHTHOUSE
                </span>
              </div>

              {/* Core Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto max-w-4xl">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-900/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>EDGE TTFB</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">3,850ms</div>
                  <p className="text-[10px] text-rose-400">Severe render blocking</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-900/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>SECURITY</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">4 VULNS</div>
                  <p className="text-[10px] text-rose-400">Outdated plugins &amp; SQL leak</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-900/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>PROTOCOL</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">HTTP/1.1</div>
                  <p className="text-[10px] text-rose-400">Head-of-line TCP stalling</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-900/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>BUNDLE</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">2.8 MB</div>
                  <p className="text-[10px] text-rose-400">Heavy JS &amp; unused CSS</p>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-rose-900/60 flex flex-wrap items-center justify-between text-xs text-rose-300 gap-2 max-w-4xl">
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Uncached Database Joins · Fragile WordPress Plugins · High Server Tax</span>
                </span>
                <span className="text-rose-400 font-bold">CRITICAL FRICTION</span>
              </div>
            </div>
          </div>

          {/* 3. CENTER DRAG HANDLE */}
          <div
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            className="absolute inset-y-0 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_25px_rgba(6,182,212,0.8)] flex items-center justify-center text-zinc-950 cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
              <ChevronsLeftRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Instructions helper */}
        <div className="text-center font-mono text-xs text-zinc-500">
          ← Drag or click divider to compare Legacy Stack vs. Dukatrio Engine →
        </div>
      </div>
    </section>
  );
}
