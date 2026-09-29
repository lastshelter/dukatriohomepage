"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const SCOPE_OPTIONS = [
  "Fintech Platform",
  "Full-Stack Web App",
  "Cloud Infrastructure / VPS",
  "Other Inquiry",
] as const;

type ScopeType = (typeof SCOPE_OPTIONS)[number];

export default function ContactForm(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState<ScopeType>("Fintech Platform");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Anti-spam honeypot

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handlePopulate = (e: Event) => {
      const customEvent = e as CustomEvent<{ scope?: ScopeType; message?: string }>;
      if (customEvent.detail) {
        if (customEvent.detail.scope && SCOPE_OPTIONS.includes(customEvent.detail.scope)) {
          setScope(customEvent.detail.scope);
        }
        if (customEvent.detail.message) {
          setMessage(customEvent.detail.message);
        }
      }
    };

    window.addEventListener("populate-estimator", handlePopulate);
    return () => {
      window.removeEventListener("populate-estimator", handlePopulate);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          scope,
          message: message.trim(),
          website, // Honeypot field
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to transmit inquiry.");
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during transmission.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {isSubmitted ? (
          /* Instant Success State */
          <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 mx-auto flex items-center justify-center shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Transmission Acknowledged
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Inquiry Logged into Engineering Desk
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Transmission received. Engineering desk will review within 12 business hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-400 max-w-md mx-auto text-left space-y-1.5">
              <div className="flex justify-between">
                <span>PROTOCOL:</span>
                <span className="text-cyan-400 font-semibold">ENCRYPTED_INGESTION_V1</span>
              </div>
              <div className="flex justify-between">
                <span>ROUTING:</span>
                <span className="text-zinc-200">Lead Systems Engineer Desk</span>
              </div>
              <div className="flex justify-between">
                <span>SLA WINDOW:</span>
                <span className="text-emerald-400 font-semibold">&lt; 12 Hours</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="py-2.5 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono font-medium transition cursor-pointer"
              >
                Transmit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Contact Form */
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                  Direct Systems Inquiry Terminal
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Zero-Spam Honeypot Protected
              </span>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Anti-spam Honeypot field (hidden from legitimate users) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="website">Leave this field blank</label>
              <input
                id="website"
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="client-name"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold"
                >
                  Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="client-name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner"
                />
              </div>

              {/* Field 2: Client Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="client-email"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold"
                >
                  Corporate Email <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner font-mono"
                />
              </div>
            </div>

            {/* Field 3: Project Scope / Service Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Project Scope / Discipline <span className="text-cyan-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SCOPE_OPTIONS.map((opt) => {
                  const isSelected = scope === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setScope(opt)}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all text-center cursor-pointer ${
                        isSelected
                          ? "bg-cyan-950/60 border-cyan-500/80 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] font-bold"
                          : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 4: Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="client-message"
                className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold"
              >
                Project Requirements &amp; Timeline <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="client-message"
                required
                rows={4}
                placeholder="Briefly outline your architectural requirements or timeline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner resize-none font-sans"
              />
            </div>

            {/* Action Button & Security Micro-Trust */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>Transmitting to Engineering Desk...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Inquiry</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Direct TLS Ingestion · Zero Client-Exposed Recipient
                </span>
                <span>SLA: &lt; 12 Hours</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
