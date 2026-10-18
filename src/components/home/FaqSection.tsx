"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/config/faqs";

export default function FaqSection(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-28 sm:py-36 relative border-t border-slate-800/80 bg-[#0B0D13]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Straight Answers</span>
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Frequently Asked Questions.
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Everything buyers ask before commissioning custom software, web applications, and client portals.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div
                key={item.question}
                className={`spotlight-card rounded-2xl border bg-[#0D121F] transition-colors duration-300 ${
                  isOpen
                    ? "border-teal-400/40"
                    : "border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-teal-400" : "text-slate-500"
                      }`}
                    />
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  role="region"
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="px-5 sm:px-6 pb-5 text-sm text-slate-300 leading-relaxed font-sans">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
