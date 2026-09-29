import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, ShieldAlert } from "lucide-react";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Radial Glows & Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-xl w-full text-center space-y-8 z-10">
        {/* Brand Monogram */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 shadow-[0_0_35px_-5px_rgba(6,182,212,0.4)]">
          <span className="font-mono font-black text-2xl bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            D
          </span>
        </div>

        {/* Monospace Error Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 font-mono text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>// ERROR_CODE: 404 · ROUTE_NOT_FOUND</span>
        </div>

        {/* Error Title and Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Subsystem Unavailable or Path Deprecated
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto">
            The requested routing vector does not exist or has been relocated to an updated cluster origin.
          </p>
        </div>

        {/* Diagnostic Panel */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 font-mono text-xs text-left space-y-2 text-zinc-400 max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">ORIGIN STATUS</span>
            <span className="text-rose-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              404_UNRESOLVED
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">CORE NODE</span>
            <span className="text-emerald-400 font-semibold">Node Core-01 Operational</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO SYSTEMS HUB</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
