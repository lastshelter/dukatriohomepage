"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import type { ScopeType } from "@/components/ContactForm";

export interface SolutionCtaButtonProps {
  label: string;
  scope: ScopeType;
  message: string;
  variant?: "primary" | "secondary";
}

export default function SolutionCtaButton({
  label,
  scope,
  message,
  variant = "primary",
}: SolutionCtaButtonProps): React.JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.dispatchEvent(
      new CustomEvent("populate-estimator", {
        detail: {
          scope,
          message,
        },
      })
    );

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      e.preventDefault();
      contactEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("client-name");
        if (input) input.focus();
      }, 450);
    }
  };

  if (variant === "secondary") {
    return (
      <a
        href="#contact"
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-700/80 hover:border-teal-400/50 text-slate-200 hover:text-white font-semibold text-sm transition-all cursor-pointer"
      >
        <span>{label}</span>
        <ArrowRight className="w-4 h-4 text-teal-400" />
      </a>
    );
  }

  return (
    <a
      href="#contact"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-black/40 hover:-translate-y-0.5 cursor-pointer group"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
}
