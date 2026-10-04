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
  Copy,
  Check,
  MessageCircle,
  Phone,
  MessageSquare,
  Mail,
  Zap,
} from "lucide-react";

const SCOPE_OPTIONS = [
  "Fintech Platform",
  "Full-Stack Web App",
  "Cloud Infrastructure / VPS",
  "Other Inquiry",
] as const;

type ScopeType = (typeof SCOPE_OPTIONS)[number];

interface PopulateEstimatorDetail {
  scope?: ScopeType;
  message?: string;
  budget?: string;
  timeline?: string;
}

export interface ContactFormProps {
  hideDirectDock?: boolean;
}

export default function ContactForm({
  hideDirectDock = false,
}: ContactFormProps = {}): React.JSX.Element {
  // Tab mode: 'quick' (1-field callback) vs 'rfp' (detailed project form)
  const [activeTab, setActiveTab] = useState<"quick" | "rfp">("quick");

  // 1-Field Quick Callback State
  const [quickContact, setQuickContact] = useState("");
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);
  const [quickSuccess, setQuickSuccess] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

  // Detailed Scope Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState<ScopeType>("Fintech Platform");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Anti-spam honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("petar@dukatrio.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    const handlePopulate = (e: Event) => {
      const customEvent = e as CustomEvent<PopulateEstimatorDetail>;
      if (customEvent.detail) {
        setActiveTab("rfp");
        if (customEvent.detail.scope && SCOPE_OPTIONS.includes(customEvent.detail.scope)) {
          setScope(customEvent.detail.scope);
        }
        if (customEvent.detail.message) {
          setMessage(customEvent.detail.message);
        } else if (customEvent.detail.budget || customEvent.detail.timeline) {
          setMessage(
            `Estimated Budget: ${customEvent.detail.budget || "N/A"}\nTimeline: ${customEvent.detail.timeline || "N/A"}`
          );
        }
      }
    };

    window.addEventListener("populate-estimator", handlePopulate);
    return () => {
      window.removeEventListener("populate-estimator", handlePopulate);
    };
  }, []);

  // Quick 1-Field Callback Submission
  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuickError(null);

    const contactVal = quickContact.trim();
    if (!contactVal) {
      setQuickError("Please enter your phone number or email address.");
      return;
    }

    setIsQuickSubmitting(true);

    const isEmail = contactVal.includes("@");
    const cleanNumber = contactVal.replace(/\D/g, "");

    const payload = {
      name: isEmail ? `Direct Lead (${contactVal})` : `Callback Request (${contactVal})`,
      email: isEmail
        ? contactVal
        : `callback+${cleanNumber || "lead"}@inquiry.dukatrio.com`,
      phone: !isEmail ? contactVal : "",
      serviceType: "15-Min Quick Callback",
      scopeScale: "Quick Mobile/Web Inquiry",
      timeline: "Immediate (< 15 mins)",
      message: `User requested an immediate 15-minute callback via dukatrio.com quick inquiry intake. Provided Contact: ${contactVal}`,
      source: "website_dualpath_quick",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to transmit callback request.");
      }

      setQuickSuccess(true);
      setQuickContact("");
    } catch (err: unknown) {
      setQuickError(
        err instanceof Error ? err.message : "Error submitting. Please try WhatsApp or direct call."
      );
    } finally {
      setIsQuickSubmitting(false);
    }
  };

  // Detailed Form Submission
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* ========================================================================= */}
      {/* PATH 1: DIRECT MESSAGING & INSTANT CONNECT DOCK */}
      {/* ========================================================================= */}
      {!hideDirectDock && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/38166258258?text=Hi%20DukaTrio,%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900/90 transition-all duration-300 group flex items-start gap-3.5 shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                Fastest Response
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Chat on WhatsApp
              </h4>
              <p className="text-xs text-zinc-400">Typically replies in &lt; 15 mins</p>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:+38166258258"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900/90 transition-all duration-300 group flex items-start gap-3.5 shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                Direct Engineering Desk
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                +381 66 258 258
              </h4>
              <p className="text-xs text-zinc-400">Mon-Fri 08:00 - 18:00 CET</p>
            </div>
          </a>

          {/* Viber / Email Direct */}
          <a
            href="viber://chat?number=%2B38166258258"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-900/90 transition-all duration-300 group flex items-start gap-3.5 shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                Direct Viber Chat
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                Viber Messenger
              </h4>
              <p className="text-xs text-zinc-400">+381 66 258 258</p>
            </div>
          </a>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PATH 2: TABBED INTAKE TERMINAL (1-FIELD CALLBACK vs. DETAILED RFP) */}
      {/* ========================================================================= */}
      <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 pb-6 border-b border-zinc-800/80 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("quick")}
            className={`py-2 px-4 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "quick"
                ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]"
                : "bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>15-Min Quick Callback</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rfp")}
            className={`py-2 px-4 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "rfp"
                ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]"
                : "bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Detailed Project RFP</span>
          </button>
        </div>

        {/* TAB 1: 1-FIELD QUICK CALLBACK */}
        {activeTab === "quick" && (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Request an Immediate 15-Minute Callback
              </h3>
              <p className="text-sm text-zinc-400 max-w-xl">
                Leave your direct phone number or email. A senior systems engineer will connect with you to review your technical scope or estimate.
              </p>
            </div>

            {quickSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2.5 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Callback Request Logged Successfully!</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Our engineering desk has received your contact details via secure Brevo SMTP dispatch. Expect our outreach within 15 minutes during standard operational hours.
                </p>
                <button
                  type="button"
                  onClick={() => setQuickSuccess(false)}
                  className="text-xs font-mono text-cyan-400 underline underline-offset-4 pt-1 block"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-4">
                {quickError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{quickError}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      required
                      placeholder="Enter phone number or email (e.g. +381... or petar@company.com)"
                      value={quickContact}
                      onChange={(e) => setQuickContact(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition font-sans shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isQuickSubmitting}
                    className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
                  >
                    {isQuickSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Callback</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 pt-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Encrypted SMTP Dispatch · Zero Spam Commitment
                  </span>
                  <span className="text-emerald-400 font-semibold">Response: &lt; 15 Mins</span>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: COMPREHENSIVE PROJECT RFP */}
        {activeTab === "rfp" && (
          <div>
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
                        <span>Transmit Full Scope</span>
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
        )}
      </div>

      {/* 1-Click Direct Email Clipboard Utility */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleCopyEmail}
          className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
            copied
              ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_20px_-3px_rgba(6,182,212,0.5)] animate-pulse"
              : "bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-cyan-300">✓ COPIED TO CLIPBOARD (petar@dukatrio.com)</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                Prefer direct email?{" "}
                <span className="text-cyan-400 underline underline-offset-2">
                  Copy Direct Engineering Desk (petar@dukatrio.com)
                </span>
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
