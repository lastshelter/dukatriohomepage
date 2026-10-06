"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    console.error("Critical runtime boundary caught exception:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Ambient Backlight */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-lg w-full text-center space-y-6 z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900/90 border border-rose-500/40 shadow-[0_0_35px_-5px_rgba(244,63,94,0.3)]">
          <AlertTriangle className="w-8 h-8 text-rose-400" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-800/60 text-rose-400 font-mono text-xs font-semibold">
            <span>{"// EXCEPTION_ISOLATED · FAILSAFE_ENGAGED"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            System Self-Healing Protocol Activated
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
            An unexpected runtime condition was trapped safely by the application boundary. No state corruption has occurred.
          </p>
        </div>

        {error.message && (
          <div className="p-3 bg-rose-950/30 border border-rose-800/50 rounded-xl font-mono text-xs text-rose-300 max-w-md mx-auto text-left break-words">
            <span className="text-[10px] text-rose-400 font-bold block uppercase mb-1">Runtime Exception:</span>
            <span>{error.message}</span>
          </div>
        )}

        {error.digest && (
          <div className="p-3 bg-zinc-950/90 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-500 max-w-sm mx-auto">
            <span>DIGEST: {error.digest}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>REINITIALIZE RUNTIME</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RETURN TO HUB</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
