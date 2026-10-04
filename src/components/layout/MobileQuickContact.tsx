"use client";

import React, { useState } from "react";
import {
  Send,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  Mail,
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
      serviceType: "Mobile Fast Inquiry",
      scopeScale: "Quick Mobile Lead",
      timeline: "Urgent / Fast Callback",
      message: message.trim() || "Immediate callback requested from mobile quick-contact dock.",
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
      {/* Sticky Bottom Dock: Strictly mobile (md:hidden) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/80 px-4 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          {/* 1. Direct Email Desk */}
          <a
            href="mailto:office@dukatrio.com"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 text-zinc-300 hover:text-cyan-400 active:scale-95 transition-all text-center group"
          >
            <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-mono font-semibold">Email Desk</span>
          </a>

          {/* 2. Fast Inquiry Modal Toggle */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 active:scale-95 text-zinc-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all text-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="text-xs font-mono font-bold tracking-tight">Start Inquiry</span>
          </button>
        </div>
      </div>

      {/* Fast Inquiry Modal Bottom Sheet */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Fast Mobile Inquiry
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-400">Direct response within 2 hours</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Transmission Sent!</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Our lead systems engineer has received your alert and will review your specifications shortly.
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
                    <label className="text-[11px] font-mono uppercase text-zinc-400">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marko Markovic"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-zinc-400">
                      Corporate Email or Callback Handle <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="name@company.com or callback handle"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-zinc-400">
                      Brief Note / Project Scope
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What are you looking to build?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        <span>Sending Instant Alert...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Rapid Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
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
