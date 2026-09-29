"use client";

import React, { useState } from "react";
import {
  Layers,
  Cpu,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  Database,
  Lock,
  Workflow,
  Server,
  Zap,
} from "lucide-react";

interface PlatformOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  formScope: "Fintech Platform" | "Full-Stack Web App" | "Cloud Infrastructure / VPS" | "Other Inquiry";
  icon: React.ComponentType<{ className?: string }>;
}

interface ModuleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TimelineOption {
  id: string;
  name: string;
  duration: string;
  badge: string;
  description: string;
}

const PLATFORMS: PlatformOption[] = [
  {
    id: "fintech",
    name: "Fintech Engine",
    badge: "Algorithmic Underwriting",
    description: "Automated underwriting, loan syndication pipelines, debt modelers, and multi-lender pricers.",
    formScope: "Fintech Platform",
    icon: Calculator,
  },
  {
    id: "webapp",
    name: "Web Application",
    badge: "Next.js & React 19",
    description: "Full-stack SaaS platforms, custom client portals, and reactive operational dashboards.",
    formScope: "Full-Stack Web App",
    icon: Layers,
  },
  {
    id: "cloud",
    name: "Cloud Infrastructure",
    badge: "Bare-Metal & Caddy",
    description: "Hardened Linux VPS deployment, Caddy edge TLS reverse proxy, PM2 clusters, and zero-downtime rollouts.",
    formScope: "Cloud Infrastructure / VPS",
    icon: Server,
  },
  {
    id: "enterprise",
    name: "Enterprise Portal",
    badge: "Strict Compliance",
    description: "Role-based access control (RBAC), multi-tenant data isolation, audit logging, and client document vaults.",
    formScope: "Full-Stack Web App",
    icon: ShieldCheck,
  },
];

const MODULES: ModuleOption[] = [
  {
    id: "auth",
    name: "Auth & RBAC Security",
    description: "Role-based access controls, session management, and encrypted client verification.",
    icon: Lock,
  },
  {
    id: "calcs",
    name: "Underwriting & Math Engines",
    description: "Sub-millisecond amortization modelers, DSCR calculators, and live dynamic term sheet engines.",
    icon: Cpu,
  },
  {
    id: "db",
    name: "Database Architecture",
    description: "Prisma ORM with dual-pool tuning (PostgreSQL / SQLite) and AES-256 field-level encryption.",
    icon: Database,
  },
  {
    id: "admin",
    name: "Custom Admin Panel",
    description: "Internal operations hub, real-time telemetry, lead queues, and audit log inspectors.",
    icon: Workflow,
  },
];

const TIMELINES: TimelineOption[] = [
  {
    id: "sprint",
    name: "2-Week Sprint",
    duration: "10-14 Business Days",
    badge: "Rapid MVP",
    description: "High-velocity delivery focusing on core architecture, MVP deployment, and baseline validation.",
  },
  {
    id: "build",
    name: "1-Month Core Build",
    duration: "4-5 Weeks",
    badge: "Full Production",
    description: "Comprehensive end-to-end platform with automated testing, edge TLS, and hardened database pools.",
  },
  {
    id: "retainer",
    name: "Dedicated Retainer",
    duration: "Ongoing Continuous Sprint",
    badge: "SLA Engineering",
    description: "Dedicated lead engineering bandwidth, feature velocity, continuous security patching, and server management.",
  },
];

export default function Estimator(): React.JSX.Element {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("fintech");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "auth",
    "calcs",
    "db",
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("build");
  const [isAttached, setIsAttached] = useState(false);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const currentPlatform =
    PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];
  const currentTimeline =
    TIMELINES.find((t) => t.id === selectedTimeline) || TIMELINES[1];
  const activeModuleNames = MODULES.filter((m) =>
    selectedModules.includes(m.id)
  ).map((m) => m.name);

  const handleAttachToInquiry = () => {
    const scopeMessage = `[PROJECT SCOPE SPECIFICATION]
Platform Architecture: ${currentPlatform.name} (${currentPlatform.badge})
Core Subsystems: ${activeModuleNames.length > 0 ? activeModuleNames.join(", ") : "Standard Framework Baseline"}
Delivery Timeline: ${currentTimeline.name} (${currentTimeline.duration})
Execution Model: ${currentTimeline.badge}

Requirements & Objectives:
- Deploy institutional-grade ${currentPlatform.name.toLowerCase()} architecture.
- Integrate specified modules with strict TypeScript type safety and zero data leakage.
- Target production delivery window: ${currentTimeline.duration}.`;

    // Dispatch event to ContactForm
    const event = new CustomEvent("populate-estimator", {
      detail: {
        scope: currentPlatform.formScope,
        message: scopeMessage,
      },
    });
    window.dispatchEvent(event);

    setIsAttached(true);

    // Smooth scroll to contact section
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      setIsAttached(false);
    }, 4000);
  };

  return (
    <section id="estimator" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Architecture Planner</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Project Scope &amp; Architecture Estimator.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Model your project requirements, select core subsystems, and attach the exact architectural spec directly into your engineering inquiry.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3-Step Configurator (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Platform Type */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold">
                    STEP 01
                  </span>
                  <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold font-mono">
                    Select Platform Type
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  Target Foundation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLATFORMS.map((platform) => {
                  const isSelected = selectedPlatform === platform.id;
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? "bg-cyan-950/40 border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                              : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">
                            {platform.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 block font-semibold">
                          {platform.badge}
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                          {platform.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Core Modules Multi-Select */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold">
                    STEP 02
                  </span>
                  <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold font-mono">
                    Select Core Subsystems (Multi-Select)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {selectedModules.length} Modules Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  const Icon = mod.icon;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-start gap-3 ${
                        isChecked
                          ? "bg-zinc-900/90 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-cyan-500 text-zinc-950"
                            : "bg-zinc-900 border border-zinc-700 text-transparent"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-white block">
                          {mod.name}
                        </span>
                        <p className="text-[11px] text-zinc-400 leading-snug">
                          {mod.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Timeline */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold">
                    STEP 03
                  </span>
                  <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold font-mono">
                    Delivery Horizon &amp; Velocity
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  Target SLA
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIMELINES.map((timeline) => {
                  const isSelected = selectedTimeline === timeline.id;
                  return (
                    <button
                      key={timeline.id}
                      type="button"
                      onClick={() => setSelectedTimeline(timeline.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? "bg-cyan-950/40 border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                          {timeline.badge}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        )}
                      </div>
                      <span className="font-bold text-sm text-white block">
                        {timeline.name}
                      </span>
                      <span className="text-xs font-mono text-zinc-300 block mt-0.5">
                        {timeline.duration}
                      </span>
                      <p className="text-[11px] text-zinc-400 leading-snug mt-2">
                        {timeline.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Specification Summary (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                    Architectural Summary
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-[10px] font-mono text-cyan-300">
                  READY TO ATTACH
                </span>
              </div>

              {/* Spec Rows */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                    FOUNDATIONAL PATTERN
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm">
                      {currentPlatform.name}
                    </span>
                    <span className="text-cyan-400 text-xs font-semibold">
                      {currentPlatform.badge}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      ACTIVE SUBSYSTEMS
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      {activeModuleNames.length} selected
                    </span>
                  </div>
                  {activeModuleNames.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeModuleNames.map((name) => (
                        <span
                          key={name}
                          className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-[11px]"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-zinc-500 text-xs italic">
                      Standard framework baseline selected
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                    PROJECTED DELIVERY HORIZON
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">
                      {currentTimeline.name}
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {currentTimeline.duration}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] space-y-1.5 text-zinc-400">
                  <div className="flex justify-between">
                    <span>SECURITY BASELINE:</span>
                    <span className="text-zinc-200 font-semibold">AES-256 / Edge TLS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DEPLOYMENT POD:</span>
                    <span className="text-zinc-200 font-semibold">Standalone Node.js 22</span>
                  </div>
                  <div className="flex justify-between">
                    <span>INITIAL REVIEW SLA:</span>
                    <span className="text-cyan-400 font-semibold">&lt; 12 Hours</span>
                  </div>
                </div>
              </div>

              {/* Attach Button */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={handleAttachToInquiry}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Attach to Inquiry Form</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {isAttached && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-center animate-in fade-in">
                    <span className="text-xs font-mono text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Scope attached! Scrolled to inquiry terminal below.
                    </span>
                  </div>
                )}

                <p className="text-[11px] text-center font-mono text-zinc-500">
                  Transfers specifications into the direct engineering desk without page reloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
