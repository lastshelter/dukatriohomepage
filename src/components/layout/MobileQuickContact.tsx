"use client";

import React, { useEffect, useState } from "react";
import {
  Send,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileQuickContact(): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal hygiene: Escape closes the sheet, and the page behind it stops scrolling.
  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen]);

  const handleSubmitFastInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setErrorMessage("Please provide your name and contact info.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const isEmail = contact.includes("@");
    const payload = {
      name: name.trim(),
      email: isEmail ? contact.trim() : `${name.toLowerCase().replace(/\s+/g, "")}@inquiry.dukatrio.com`,
      phone: !isEmail ? contact.trim() : "",
      serviceType: "15-Min Feasibility Audit",
      scopeScale: "Mobile Feasibility Audit",
      timeline: "Urgent / Fast Callback",
      message: message.trim() || "15-Min Feasibility Audit requested from mobile quick-contact dock.",
      source: "mobile_dock",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to transmit message.");
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setModalOpen(false);
        setName("");
        setContact("");
        setMessage("");
      }, 3000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Error submitting. Please contact office@dukatrio.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky Bottom Dock: Strictly mobile (md:hidden) — Single Consolidated CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0D121F]/95 backdrop-blur-xl border-t border-slate-800/80 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-teal-400 hover:bg-teal-300 active:scale-[0.98] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all text-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Book 15-Min Feasibility Audit</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Fast Inquiry Modal Bottom Sheet */}
      <AnimatePresence>
        {modalOpen && (
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 md:hidden flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-inquiry-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0D121F] border-t sm:border border-slate-800/80 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-950/60 border border-teal-800/60 flex items-center justify-center text-teal-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 id="quick-inquiry-title" className="text-base font-bold text-white tracking-tight">
                      Book 15-Min Feasibility Audit
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">Direct engineer response within 2 hours</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close quick inquiry"
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Audit Request Logged!</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Our lead systems engineer has received your alert and will review your feasibility parameters shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitFastInquiry} className="space-y-3.5 pt-4">
                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800 text-xs text-rose-300 font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label htmlFor="quick-name" className="text-[11px] font-mono uppercase text-slate-400">
                      Your Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="quick-name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Marko Markovic"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-base text-white placeholder:text-slate-600 focus:border-teal-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="quick-contact" className="text-[11px] font-mono uppercase text-slate-400">
                      Corporate Email or Callback Handle <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="quick-contact"
                      type="text"
                      autoComplete="email"
                      required
                      placeholder="name@company.com or callback handle"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-base text-white placeholder:text-slate-600 focus:border-teal-400 outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="quick-message" className="text-[11px] font-mono uppercase text-slate-400">
                      Core Bottleneck / Scope Note
                    </label>
                    <textarea
                      id="quick-message"
                      rows={3}
                      placeholder="Which SaaS or spreadsheet workflow are you replacing?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-base text-white placeholder:text-slate-600 focus:border-teal-400 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Booking Audit...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Feasibility Audit</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-slate-500">
                    <span>Direct Desk Routing</span>
                    <span>·</span>
                    <span>Zero Spam Guarantee</span>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
