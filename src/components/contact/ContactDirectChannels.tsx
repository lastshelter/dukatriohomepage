"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  Clock,
  Server,
  ArrowRight,
  ExternalLink,
  Zap,
} from "lucide-react";

export default function ContactDirectChannels(): React.JSX.Element {
  const [emailCopied, setEmailCopied] = useState(false);

  const corporateEmail = "office@dukatrio.com";
  const whatsappUrl =
    "https://wa.me/381640232230?text=Hello%20DukaTrio,%20I'd%20like%20to%20request%20an%20architectural%20consultation%20for%20my%20project.";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(corporateEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. DIRECT WHATSAPP ACTION CARD (NO PLAIN TEXT PHONE DISPLAY) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 rounded-3xl bg-zinc-900/60 border border-emerald-500/40 hover:border-emerald-400 hover:bg-zinc-900/90 transition-all duration-300 shadow-[0_0_35px_-10px_rgba(16,185,129,0.15)] group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0 shadow-lg">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Direct Messenger
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                Chat on WhatsApp
              </h3>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all shrink-0">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        <p className="mt-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          Connect immediately with our principal systems engineering desk. Pre-loaded with an initial discovery inquiry prompt.
        </p>

        <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-zinc-400 font-semibold">End-to-End Encrypted</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Open Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </a>

      {/* 2. DIRECT CORPORATE EMAIL CARD */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-cyan-800/40 hover:border-cyan-500/50 transition-all duration-300 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                Official Intake Desk
              </span>
              <h3 className="text-lg font-extrabold text-white">Corporate Email</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/60 text-zinc-300 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              {emailCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          Recommended for formal RFPs, technical specifications, and architectural documentation attachments.
        </p>

        <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <a
            href={`mailto:${corporateEmail}?subject=Architectural%20Inquiry%20-%20DukaTrio`}
            className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 flex items-center gap-1.5"
          >
            <span>{corporateEmail}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-zinc-500 text-[11px]">PGP available upon request</span>
        </div>
      </div>

      {/* 3. BOOK A 15-MINUTE TECHNICAL DISCOVERY CTA */}
      <a
        href="#intake"
        className="block p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-zinc-900/80 to-zinc-950 border border-cyan-800/50 hover:border-cyan-500/60 transition-all duration-300 group shadow-lg"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                Direct Architect Callback
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Book a 15-Minute Technical Discovery
              </h4>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </a>

      {/* 4. RESPONSE GUARANTEE BADGE: 4-HOUR SCOPED RESPONSE SLA */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900/80 to-zinc-950 border border-emerald-500/30 space-y-3.5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>4-Hour Scoped Response SLA</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
            Guaranteed
          </span>
        </div>

        <h4 className="text-base font-extrabold text-white tracking-tight">
          Direct Architect Review. Zero Gatekeepers.
        </h4>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          Every inbound inquiry is evaluated directly by a senior systems architect. You receive an actionable technical blueprint, timeline bracket, and fixed-cost estimate within 4 business hours.
        </p>

        <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-400">
          <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-0.5">
            <span className="text-zinc-500 block uppercase">Operational Window</span>
            <span className="text-zinc-200 font-semibold">08:00 – 18:00 CET</span>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-0.5">
            <span className="text-zinc-500 block uppercase">Critical Response</span>
            <span className="text-emerald-400 font-semibold">24/7 Monitored</span>
          </div>
        </div>
      </div>

      {/* 5. DATA PRIVACY & SECURITY BADGE */}
      <div className="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 space-y-3.5 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>European Hosting Sovereignty</span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
          Hetzner Dedicated Infrastructure • Strict NDA by Default
        </h4>

        <ul className="space-y-2 text-xs font-mono text-zinc-400">
          <li className="flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>Mutual bilateral NDA executed prior to proprietary codebase access.</span>
          </li>
          <li className="flex items-start gap-2">
            <Server className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>100% GDPR-compliant bare-metal compute hosted in ISO 27001 facilities.</span>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>Zero third-party data tracking, zero LLM telemetry leaks, zero vendor lock-in.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
