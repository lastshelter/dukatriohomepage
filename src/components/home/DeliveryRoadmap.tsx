"use client";

import React from "react";
import { Workflow, ArrowRight } from "lucide-react";

export default function DeliveryRoadmap(): React.JSX.Element {
  return (
    <section id="process" className="py-24 sm:py-32 relative border-t border-slate-800/80 bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5 text-teal-400" />
            <span>Structured Delivery Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How We Work: From Bottleneck to Production in 14 Days.
          </h2>

          <p className="text-base text-slate-400 leading-relaxed font-normal">
            No endless discovery meetings. No billable hour traps. A predictable, de-risked delivery protocol taking your team from workflow bottleneck to live, self-hosted deployment.
          </p>
        </div>

        {/* 3-Step Process Grid */}
        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 01 */}
          <div className="spotlight-card rounded-3xl border border-slate-800/80 bg-[#0D121F] p-8 space-y-6 hover:-translate-y-1 hover:border-teal-400/40 transition-all duration-300 relative group">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black font-mono text-teal-400">01</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-teal-950/60 border border-teal-800/60 text-teal-300 uppercase">
                Day 1–2
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                15-Minute Architecture Audit
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                We audit your current spreadsheet, broken workflow, or bloated SaaS subscription stack. No high-pressure sales pitch—just direct engineering feasibility.
              </p>
            </div>

            <ul className="pt-2 space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>Workflow &amp; spreadsheet bottleneck review</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>Hosting &amp; single-tenant database plan</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>Zero sales fluff—pure technical scoping</span>
              </li>
            </ul>
          </div>

          {/* Step 02 */}
          <div className="spotlight-card rounded-3xl border border-slate-800/80 bg-[#0D121F] p-8 space-y-6 hover:-translate-y-1 hover:border-teal-400/40 transition-all duration-300 relative group">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black font-mono text-cyan-400">02</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 uppercase">
                Within 48 Hours
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Relational Schema &amp; Fixed-Price Spec
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                You receive an interactive schema draft, clear milestone deliverables, and a guaranteed fixed-price quote with zero ambiguous billing.
              </p>
            </div>

            <ul className="pt-2 space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>Entity-relationship schema &amp; API contract</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>Clear milestone timeline (10–14 days)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>Contractual fixed-price delivery guarantee</span>
              </li>
            </ul>
          </div>

          {/* Step 03 */}
          <div className="spotlight-card rounded-3xl border border-slate-800/80 bg-[#0D121F] p-8 space-y-6 hover:-translate-y-1 hover:border-indigo-500/40 transition-all duration-300 relative group">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black font-mono text-indigo-400">03</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 uppercase">
                Day 10–14
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Rapid Build &amp; Private Deployment
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                We build in continuous staging increments, test on real data, deploy onto your private VPS, and hand over the keys and full code repository.
              </p>
            </div>

            <ul className="pt-2 space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>Private Hetzner / Linux VPS cutover</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>100% Git repository &amp; Docker IP transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>30-day post-launch technical warranty</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Link into Contact Desk */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Have a bottlenecked workflow or spreadsheet ready to audit?</h4>
            <p className="text-xs text-slate-400">Book your 15-minute architectural feasibility call. We respond within 4 hours.</p>
          </div>
          <a
            href="#contact"
            className="py-3 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 btn-tactile flex items-center gap-2 shrink-0"
          >
            <span>Book 15-Min Audit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
