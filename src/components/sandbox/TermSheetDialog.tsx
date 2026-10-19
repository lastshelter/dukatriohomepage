"use client";

import React, { useEffect, useId, useRef } from "react";
import { ArrowRight, FileText, X } from "lucide-react";
import { TIER_LABEL, type TermSheet } from "@/utils/dscr";

interface TermSheetDialogProps {
  open: boolean;
  sheet: TermSheet;
  onClose: () => void;
  onBuild: () => void;
}

const TONE_CLASS: Record<TermSheet["decisionTier"], string> = {
  prime: "bg-emerald-950/50 border-emerald-700/60 text-emerald-300",
  borderline: "bg-amber-950/40 border-amber-700/60 text-amber-300",
  subprime: "bg-rose-950/40 border-rose-700/60 text-rose-300",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function TermSheetDialog({
  open,
  sheet,
  onClose,
  onBuild,
}: TermSheetDialogProps): React.JSX.Element | null {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-slate-950/80 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="h-full w-full max-w-xl overflow-y-auto bg-[#0D121F] border-l border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-teal-400 font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>Sample Term Sheet · Preview</span>
            </div>
            <h3 id={titleId} className="font-display text-2xl font-extrabold text-white tracking-tight">
              Indicative Proposal
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close term sheet preview"
            className="p-2 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white hover:border-slate-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className={`px-4 py-3 rounded-xl border font-mono text-sm font-bold ${TONE_CLASS[sheet.decisionTier]}`}
        >
          <span className="sr-only">{TIER_LABEL[sheet.decisionTier]}: </span>
          {sheet.decision}
        </div>

        <dl className="divide-y divide-slate-800/80 rounded-2xl border border-slate-800/80 bg-slate-950/60">
          {sheet.rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
              <dt className="text-xs font-mono uppercase tracking-wider text-slate-400">{row.label}</dt>
              <dd className="text-sm font-mono font-semibold text-slate-100 text-right tabular-nums">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold">
            Conditions & Next Steps
          </h4>
          <ul className="space-y-2 text-sm text-slate-300 leading-relaxed list-disc pl-5 marker:text-teal-400">
            {sheet.conditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </div>

        <p className="text-[11px] font-mono text-slate-500 leading-relaxed border-t border-slate-800/80 pt-4">
          {sheet.assumptions}
        </p>

        <button
          type="button"
          onClick={onBuild}
          className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg btn-tactile cursor-pointer"
        >
          <span>Build This Terminal for My Business</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
