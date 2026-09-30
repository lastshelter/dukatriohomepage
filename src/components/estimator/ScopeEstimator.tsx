"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Server,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Send,
  Loader2,
  ShieldCheck,
  Cpu,
  BadgeEuro,
  Calendar,
  Building2,
  Flame,
  Check,
} from "lucide-react";

interface ServiceType {
  id: string;
  name: string;
  badge: string;
  description: string;
  baseMin: number;
  baseMax: number;
  weeksMin: number;
  weeksMax: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface ScopeScale {
  id: string;
  name: string;
  badge: string;
  description: string;
  costMultiplier: number;
  timeMultiplier: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface PriorityTimeline {
  id: string;
  name: string;
  badge: string;
  description: string;
  costMultiplier: number;
  timeDiscount: number;
  slaTag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICE_TYPES: ServiceType[] = [
  {
    id: "saas_platform",
    name: "Full Web / SaaS Platform",
    badge: "Next.js 16 & React 19",
    description: "End-to-end web applications, automated client onboarding, RBAC permissions, and reactive dashboards.",
    baseMin: 2800,
    baseMax: 4800,
    weeksMin: 3,
    weeksMax: 5,
    icon: Layers,
  },
  {
    id: "ops_portal",
    name: "Custom Operational Portal",
    badge: "Underwriting & Calculations",
    description: "Algorithmic decision engines, high-precision calculation logic, data pipelines, and internal tools.",
    baseMin: 3200,
    baseMax: 5600,
    weeksMin: 3,
    weeksMax: 6,
    icon: Cpu,
  },
  {
    id: "infrastructure",
    name: "Digital Infrastructure & VPS",
    badge: "Caddy HTTP/3 & Node.js",
    description: "Bare-metal Linux cloud pod setup, automated edge TLS reverse proxy, PM2 clusters, and load optimization.",
    baseMin: 1600,
    baseMax: 3000,
    weeksMin: 1,
    weeksMax: 3,
    icon: Server,
  },
];

const SCOPE_SCALES: ScopeScale[] = [
  {
    id: "mvp",
    name: "MVP / Single Target Platform",
    badge: "Lean Foundation",
    description: "Core features, essential authentication, single database instance, and high-conversion UI.",
    costMultiplier: 1.0,
    timeMultiplier: 1.0,
    icon: Zap,
  },
  {
    id: "multisite",
    name: "Multi-Service / Subsystem Array",
    badge: "Expanding Architecture",
    description: "Multiple isolated services, multi-tenant databases, custom APIs, and background job queues.",
    costMultiplier: 1.5,
    timeMultiplier: 1.4,
    icon: Building2,
  },
  {
    id: "enterprise",
    name: "Full Enterprise Suite",
    badge: "High-Throughput SLA",
    description: "Institutional compliance, zero-downtime clustering, automated backups, and 24/7 priority SLA.",
    costMultiplier: 2.2,
    timeMultiplier: 1.8,
    icon: ShieldCheck,
  },
];

const TIMELINES: PriorityTimeline[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    badge: "Balanced Velocity",
    description: "Thorough multi-stage milestones with regular staging previews and architectural code reviews.",
    costMultiplier: 1.0,
    timeDiscount: 1.0,
    slaTag: "Standard SLA (24h response)",
    icon: Clock,
  },
  {
    id: "expedited",
    name: "Expedited Priority Sprint",
    badge: "High Velocity",
    description: "Dedicated daily engineering bandwidth, compressed QA cycles, and rapid production handover.",
    costMultiplier: 1.25,
    timeDiscount: 0.65,
    slaTag: "Priority SLA (< 6h response)",
    icon: Flame,
  },
  {
    id: "turnkey",
    name: "Turnkey Autonomous Deployment",
    badge: "Zero Friction",
    description: "Full end-to-end ownership: architecture, compute provisioning, DNS cutover, and 60-day launch warranty.",
    costMultiplier: 1.4,
    timeDiscount: 0.8,
    slaTag: "Executive SLA (< 2h response)",
    icon: Sparkles,
  },
];

export default function ScopeEstimator(): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>("saas_platform");
  const [selectedScale, setSelectedScale] = useState<string>("mvp");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");

  // Lead capture form state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const activeService = SERVICE_TYPES.find((s) => s.id === selectedService) || SERVICE_TYPES[0];
  const activeScale = SCOPE_SCALES.find((s) => s.id === selectedScale) || SCOPE_SCALES[0];
  const activeTimeline = TIMELINES.find((t) => t.id === selectedTimeline) || TIMELINES[0];

  // Dynamic calculations
  const calculatedMinCost = Math.round(
    activeService.baseMin * activeScale.costMultiplier * activeTimeline.costMultiplier
  );
  const calculatedMaxCost = Math.round(
    activeService.baseMax * activeScale.costMultiplier * activeTimeline.costMultiplier
  );

  const calculatedMinWeeks = Math.max(
    1,
    Math.round(activeService.weeksMin * activeScale.timeMultiplier * activeTimeline.timeDiscount)
  );
  const calculatedMaxWeeks = Math.max(
    calculatedMinWeeks + 1,
    Math.round(activeService.weeksMax * activeScale.timeMultiplier * activeTimeline.timeDiscount)
  );

  const handleCaptureLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      setStatusMessage("Please provide your name and email.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const estimatedBudgetStr = `€${calculatedMinCost.toLocaleString()} - €${calculatedMaxCost.toLocaleString()}`;
    const deliveryTimelineStr = `${calculatedMinWeeks} - ${calculatedMaxWeeks} Weeks (${activeTimeline.name})`;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName.trim(),
          email: clientEmail.trim(),
          phone: clientPhone.trim(),
          serviceType: activeService.name,
          scopeScale: activeScale.name,
          timeline: deliveryTimelineStr,
          estimatedBudget: estimatedBudgetStr,
          message: projectNotes.trim() || `Instant Scope Estimate: ${activeService.name} | ${activeScale.name} | ${activeTimeline.name}`,
          source: "interactive_estimator",
        }),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to submit estimate.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setStatusMessage(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time Architecture &amp; Cost Estimator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Scope &amp; Investment Estimator.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md">
            Configure your technical scope, scale, and delivery velocity to calculate transparent investment brackets in real time.
          </p>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl">
          {[
            { step: 1, label: "01. Service Type" },
            { step: 2, label: "02. Scope Scale" },
            { step: 3, label: "03. Timeline & SLA" },
          ].map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setCurrentStep(item.step)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${
                currentStep === item.step
                  ? "bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                  : currentStep > item.step
                  ? "bg-zinc-900/80 border-emerald-500/50 text-emerald-400"
                  : "bg-zinc-900/30 border-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span>{item.label}</span>
              {currentStep > item.step && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>

        {/* Estimator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Step Selector (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md shadow-xl min-h-[460px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                          Step 01 / 03
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          Select Primary Service Discipline
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">Core Pattern</span>
                    </div>

                    <div className="space-y-3">
                      {SERVICE_TYPES.map((service) => {
                        const isSelected = selectedService === service.id;
                        const Icon = service.icon;
                        return (
                          <div
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                              isSelected
                                ? "bg-cyan-950/40 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                                : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                  isSelected
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                                    : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h4 className="text-base font-bold text-white tracking-tight">
                                    {service.name}
                                  </h4>
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                                    {service.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                          Step 02 / 03
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          Select Project Scale &amp; Footprint
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">System Depth</span>
                    </div>

                    <div className="space-y-3">
                      {SCOPE_SCALES.map((scale) => {
                        const isSelected = selectedScale === scale.id;
                        const Icon = scale.icon;
                        return (
                          <div
                            key={scale.id}
                            onClick={() => setSelectedScale(scale.id)}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                              isSelected
                                ? "bg-cyan-950/40 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                                : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                  isSelected
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                                    : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h4 className="text-base font-bold text-white tracking-tight">
                                    {scale.name}
                                  </h4>
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300">
                                    {scale.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                                  {scale.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                          Step 03 / 03
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          Select Delivery Timeline &amp; Priority
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">Velocity Model</span>
                    </div>

                    <div className="space-y-3">
                      {TIMELINES.map((timeline) => {
                        const isSelected = selectedTimeline === timeline.id;
                        const Icon = timeline.icon;
                        return (
                          <div
                            key={timeline.id}
                            onClick={() => setSelectedTimeline(timeline.id)}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                              isSelected
                                ? "bg-cyan-950/40 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                                : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                  isSelected
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                                    : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h4 className="text-base font-bold text-white tracking-tight">
                                    {timeline.name}
                                  </h4>
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300">
                                    {timeline.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                                  {timeline.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Navigation Controls */}
              <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  className="py-2.5 px-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 text-xs font-mono font-semibold hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
                    className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Configuration Complete
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Output & Instant Intake (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    Real-Time Bracket Estimate
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-[10px] font-mono text-cyan-300">
                  DYNAMIC CALC
                </span>
              </div>

              {/* Dynamic Cost Bracket Display */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  <BadgeEuro className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Projected Investment Bracket</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-2">
                  <span className="text-cyan-400">€{calculatedMinCost.toLocaleString()}</span>
                  <span className="text-zinc-500 text-lg font-normal">—</span>
                  <span>€{calculatedMaxCost.toLocaleString()}</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-400">
                  Fixed milestone pricing with zero hidden surcharges or surprise billing.
                </p>
              </div>

              {/* Dynamic Timeline Bracket Display */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Delivery Horizon</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight flex items-baseline gap-2">
                  <span className="text-emerald-400">
                    {calculatedMinWeeks} – {calculatedMaxWeeks} Weeks
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                  <span>SLA GUARANTEE:</span>
                  <span className="text-zinc-200 font-semibold">{activeTimeline.slaTag}</span>
                </div>
              </div>

              {/* Instant Lead Capture Drawer */}
              {isSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-800/80 space-y-3 text-center animate-in fade-in">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Estimate Logged &amp; Transmitted</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Your customized scope estimate has been routed directly to our engineering desk via instant push alert. We will respond within 12 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300 pt-1 block mx-auto cursor-pointer"
                  >
                    Adjust parameters &amp; recalculate
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCaptureLead} className="space-y-3 pt-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center justify-between">
                    <span>Lock In Estimate &amp; Request Spec</span>
                    <span className="text-cyan-400 text-[10px]">Zero Obligation</span>
                  </div>

                  {statusMessage && (
                    <p className="text-xs text-rose-400 font-mono bg-rose-950/40 p-2 rounded-lg border border-rose-900">
                      {statusMessage}
                    </p>
                  )}

                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none transition font-sans"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email Address *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none transition font-mono"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp / Telegram (Optional)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none transition font-mono"
                    />
                    <textarea
                      rows={2}
                      placeholder="Specific architectural features or notes (Optional)..."
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none transition resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        <span>Transmitting Specification...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Architecture Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center font-mono text-zinc-500">
                    Encrypted intake · Direct engineer routing · 100% IP confidentiality
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
