"use client";

import React, { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, FlaskConical, Gauge, ScanLine } from "lucide-react";
import TicketOcrDemo from "@/components/sandbox/TicketOcrDemo";
import DscrTerminalDemo from "@/components/sandbox/DscrTerminalDemo";

const TABS = [
  {
    id: "ocr",
    label: "Gradilište · Field Ticket OCR",
    blurb: "Scan a delivery ticket and watch raw text become validated, structured records, even with no signal.",
    Icon: ScanLine,
  },
  {
    id: "dscr",
    label: "FundingSolutions · DSCR Terminal",
    blurb: "Move the sliders to see real-time coverage ratio, risk tier and a sample term sheet.",
    Icon: Gauge,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function CaseStudySandbox(): React.JSX.Element {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("ocr");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ ocr: null, dscr: null });

  const activeTab = TABS.find((tab) => tab.id === active) ?? TABS[0];

  const focusTab = (id: TabId) => {
    setActive(id);
    tabRefs.current[id]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = TABS.length - 1;
    let next = index;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    const target = TABS[next];
    if (target) focusTab(target.id);
  };

  return (
    <section
      id="sandbox"
      aria-labelledby="sandbox-heading"
      className="py-28 sm:py-36 relative border-t border-slate-800/80 bg-[#0B0F19]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
              <FlaskConical className="w-3.5 h-3.5 text-teal-400" />
              <span>Interactive Case Study Sandbox</span>
            </div>
            <h2
              id="sandbox-heading"
              className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
            >
              Try the Systems, Don&apos;t Just Read About Them.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            Two production systems from the case studies above, reduced to hands-on demos that run entirely in your browser.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-[#0D121F] shadow-xl overflow-hidden">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Case study sandboxes"
            className="flex flex-col sm:flex-row border-b border-slate-800/80 bg-slate-950/40"
          >
            {TABS.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[tab.id] = node;
                  }}
                  id={`${baseId}-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={`flex-1 inline-flex items-center justify-center sm:justify-start gap-2.5 px-6 py-4 font-mono text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 -mb-px ${
                    selected
                      ? "text-teal-300 border-teal-400 bg-teal-950/20"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  <tab.Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">{activeTab.blurb}</p>

            <div
              role="tabpanel"
              id={`${baseId}-panel-ocr`}
              aria-labelledby={`${baseId}-tab-ocr`}
              hidden={active !== "ocr"}
            >
              <TicketOcrDemo />
            </div>
            <div
              role="tabpanel"
              id={`${baseId}-panel-dscr`}
              aria-labelledby={`${baseId}-tab-dscr`}
              hidden={active !== "dscr"}
            >
              <DscrTerminalDemo />
            </div>

            {active === "ocr" && (
              <Link
                href="/case-studies/gradiliste-os"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              >
                <span>Read the full Gradilište technical case study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
