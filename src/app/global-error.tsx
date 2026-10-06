"use client";

import React, { useEffect } from "react";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    console.error("[CRITICAL_GLOBAL_RUNTIME_ERROR]:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 antialiased font-sans">
        <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 mx-auto shadow-inner">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-800/60 text-rose-400 font-mono text-xs font-semibold">
              <span>// GLOBAL_ROOT_BOUNDARY_ENGAGED</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Platform Interface Interrupted
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              A root-level layout condition occurred. Client state has been preserved safely.
            </p>
          </div>

          {error?.message && (
            <div className="p-3 bg-rose-950/30 border border-rose-800/50 rounded-xl font-mono text-xs text-rose-300 max-w-sm mx-auto text-left break-words">
              <span className="text-[10px] text-rose-400 font-bold block uppercase mb-1">
                Root Exception:
              </span>
              <span>{error.message}</span>
            </div>
          )}

          {error?.digest && (
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-500 max-w-sm mx-auto">
              <span>DIGEST: {error.digest}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Session</span>
            </button>

            <a
              href="/"
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
