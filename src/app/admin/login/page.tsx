"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Server,
  Fingerprint,
} from "lucide-react";

function LoginForm(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin/outbound";

  const [passkey, setPasskey] = useState<string>("");
  const [username, setUsername] = useState<string>("petar");
  const [showUsernameField, setShowUsernameField] = useState<boolean>(false);
  const [showPasskey, setShowPasskey] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if already authenticated on mount
  useEffect(() => {
    async function checkExistingAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          router.replace(redirectTo);
        }
      } catch {
        // Silently continue to login
      }
    }
    checkExistingAuth();
  }, [router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setErrorMsg("Please enter your master studio passkey.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const payload: { passkey: string; username?: string } = {
        passkey: passkey.trim(),
      };
      if (showUsernameField && username.trim()) {
        payload.username = username.trim();
      }

      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to protected desk
        router.replace(redirectTo);
      } else {
        setErrorMsg(data.error || "Authentication failed. Access denied.");
      }
    } catch {
      setErrorMsg("Network error connecting to auth daemon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Sovereign Header Card */}
      <div className="relative rounded-3xl bg-[#090D16] border border-slate-800/80 shadow-2xl shadow-teal-950/20 p-8 sm:p-10 backdrop-blur-xl">
        {/* Glow accent */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-2">
            <Lock className="w-7 h-7" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Sovereign Studio Vault</span>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Administrative Access
          </h1>

          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Restricted to Petar &amp; DukaTrio core engineering. Enter your master studio passkey to unlock the outbound command desk.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {showUsernameField && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Operator Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="petar"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-teal-400 focus:outline-none text-white text-sm font-mono placeholder:text-slate-600 transition"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-teal-400" />
                <span>Master Passkey</span>
              </label>
              <button
                type="button"
                onClick={() => setShowUsernameField(!showUsernameField)}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-400 transition underline underline-offset-2"
              >
                {showUsernameField ? "Use passkey only" : "Specify operator"}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPasskey ? "text" : "password"}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter sovereign studio passkey..."
                autoFocus
                autoComplete="current-password"
                className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 focus:outline-none text-white text-sm font-mono placeholder:text-slate-600 transition tracking-wide"
              />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition p-1"
                title={showPasskey ? "Hide passkey" : "Show passkey"}
              >
                {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 text-sm font-mono font-bold transition shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Unlock Sovereign Desk</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Telemetry Footer */}
        <div className="mt-8 pt-6 border-t border-slate-900 grid grid-cols-2 gap-3 text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <Fingerprint className="w-3.5 h-3.5 text-teal-400/80 shrink-0" />
            <span>Constant-Time HMAC</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Server className="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
            <span>Hetzner Dedicated</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-xs font-mono text-slate-500 hover:text-slate-400 transition"
        >
          &larr; Return to dukatrio.com
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center p-4 selection:bg-teal-500/30">
      <Suspense
        fallback={
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
