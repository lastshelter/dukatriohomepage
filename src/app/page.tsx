"use client";

import React, { useState } from "react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import TechStackMatrix from "@/components/TechStackMatrix";
import ArchitectureSnippets from "@/components/ArchitectureSnippets";
import Estimator from "@/components/Estimator";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Layers,
  Globe,
  Server,
  Zap,
  ArrowRight,
  ExternalLink,
  Code2,
  Database,
  Lock,
  CheckCircle2,
  Activity,
  Menu,
  X,
  ChevronRight,
  Radio,
  FileCode2,
  ArrowUpRight,
  Mail,
  Network,
  Gauge,
  Workflow,
  Sparkles,
  Calculator,
} from "lucide-react";

export default function HomePage(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bfsFeatureTab, setBfsFeatureTab] = useState<"underwriting" | "amortization" | "security">("underwriting");

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-100px] w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-all duration-300">
              <span className="font-mono font-black text-lg bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                D
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                DukaTrio
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest -mt-1">
                Systems Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Clean 4 Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#work" className="hover:text-cyan-400 transition-colors">
              Work
            </a>
            <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
              Capabilities
            </a>
            <a href="#estimator" className="hover:text-cyan-400 transition-colors">
              Estimator
            </a>
            <Link
              href="/systems/bfs"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span>BFS Platform</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/50">
                LIVE
              </span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] flex items-center gap-2 group cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-[#09090b]/95 px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 pt-2 text-sm font-medium text-zinc-200">
              <a
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1"
              >
                Work
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1"
              >
                Capabilities
              </a>
              <a
                href="#estimator"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1"
              >
                Estimator
              </a>
              <Link
                href="/systems/bfs"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1 flex items-center justify-between"
              >
                <span>BFS Platform</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                  LIVE
                </span>
              </Link>
            </nav>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Precision Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                <span>Next-Gen Systems Engineering &amp; Platform Architecture</span>
              </div>

              {/* Punchy Hero Title */}
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                Engineering High-Performance Web Applications &amp;{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  Resilient Digital Infrastructure.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl">
                From institutional-grade fintech portals with automated underwriting to high-throughput cloud infrastructure. We build full-stack web platforms engineered for speed, security, and scale.
              </p>

              {/* Dual CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#work"
                  className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>Explore Live Deployments</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#capabilities"
                  className="py-3.5 px-7 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-200 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Technical Capabilities</span>
                </a>
              </div>

              {/* Micro-Trust Telemetry */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 border-t border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Bank-Grade Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Node.js 22 LTS Runtime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>99.99% Uptime Architecture</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Interactive Biggs Funding Solutions Showcase (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl shadow-2xl p-1 overflow-hidden transition-all duration-300 hover:border-cyan-500/40 group">
                {/* Ambient Card Backlight */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-teal-500/15 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Header Bar of Preview Card */}
                <div className="p-4 sm:p-5 bg-zinc-900/90 rounded-t-xl border-b border-zinc-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-950 to-zinc-900 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-bold text-xs font-mono shadow-inner">
                      BFS
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white tracking-tight">Biggs Funding Solutions</span>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">Live Production Deployment</span>
                    </div>
                  </div>

                  <a
                    href="https://bfstrial.dukatrio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-zinc-300 hover:text-cyan-300 font-mono text-[11px] transition-colors"
                  >
                    <span>bfstrial.dukatrio.com</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>

                {/* Interactive Metric Selectors / Tabs */}
                <div className="p-4 sm:p-6 space-y-5 bg-gradient-to-b from-zinc-950/90 to-zinc-900/60 rounded-b-xl">
                  {/* 3 Interactive Tab Selectors */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800/80 text-xs">
                    <button
                      type="button"
                      onClick={() => setBfsFeatureTab("underwriting")}
                      className={`py-2 px-2 rounded-lg text-center font-mono text-[11px] transition-all cursor-pointer ${
                        bfsFeatureTab === "underwriting"
                          ? "bg-cyan-500 text-zinc-950 font-bold shadow-md"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                      }`}
                    >
                      Underwriting
                    </button>
                    <button
                      type="button"
                      onClick={() => setBfsFeatureTab("amortization")}
                      className={`py-2 px-2 rounded-lg text-center font-mono text-[11px] transition-all cursor-pointer ${
                        bfsFeatureTab === "amortization"
                          ? "bg-cyan-500 text-zinc-950 font-bold shadow-md"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                      }`}
                    >
                      Amortization
                    </button>
                    <button
                      type="button"
                      onClick={() => setBfsFeatureTab("security")}
                      className={`py-2 px-2 rounded-lg text-center font-mono text-[11px] transition-all cursor-pointer ${
                        bfsFeatureTab === "security"
                          ? "bg-cyan-500 text-zinc-950 font-bold shadow-md"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                      }`}
                    >
                      A+ Security
                    </button>
                  </div>

                  {/* Tab 1: Automated Underwriting Engine */}
                  {bfsFeatureTab === "underwriting" && (
                    <div className="space-y-4 rounded-xl border border-zinc-800/90 bg-zinc-900/50 p-4 transition-all">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-semibold text-white">Automated Underwriting Engine</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-700/60 text-emerald-400">
                          APPROVED · TIER 1
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/60">
                          <span className="text-[10px] text-zinc-500 block uppercase">Facility Sizing</span>
                          <span className="text-base font-bold text-white">$1,250,000</span>
                          <span className="text-[10px] text-cyan-400 block mt-0.5">DSCR 1.42x Coverage</span>
                        </div>
                        <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/60">
                          <span className="text-[10px] text-zinc-500 block uppercase">Decision Latency</span>
                          <span className="text-base font-bold text-emerald-400">&lt; 380 ms</span>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">Automated Rule Engine</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          6 / 6 Risk Covenants Cleared
                        </span>
                        <span className="text-zinc-500">Max LTV: 68.5%</span>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Instant Amortization Schedules */}
                  {bfsFeatureTab === "amortization" && (
                    <div className="space-y-4 rounded-xl border border-zinc-800/90 bg-zinc-900/50 p-4 transition-all">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-semibold text-white">Instant Amortization Schedules</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
                          DYNAMIC WATERFALL
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/60">
                          <span className="text-[10px] text-zinc-500 block uppercase">Note Rate / Term</span>
                          <span className="text-base font-bold text-white">9.75% <span className="text-xs font-normal text-zinc-400">/ 24 Mo</span></span>
                          <span className="text-[10px] text-cyan-400 block mt-0.5">Interest-Only Balloon</span>
                        </div>
                        <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/60">
                          <span className="text-[10px] text-zinc-500 block uppercase">Monthly Debt Service</span>
                          <span className="text-base font-bold text-indigo-400">$10,156.25</span>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">Automated Remittance</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          Principal Paydown Curve
                        </span>
                        <span className="text-zinc-500">Zero Rounding Drift</span>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: A+ Security */}
                  {bfsFeatureTab === "security" && (
                    <div className="space-y-4 rounded-xl border border-zinc-800/90 bg-zinc-900/50 p-4 transition-all">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                          <Lock className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-semibold text-white">Institutional A+ Security</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-700/60 text-emerald-400">
                          AUDITED &amp; ISOLATED
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/60">
                          <span className="text-[10px] text-zinc-500 block uppercase">Data Protection</span>
                          <span className="text-sm font-bold text-white">AES-256 GCM</span>
                          <span className="text-[10px] text-emerald-400 block mt-0.5">Field-Level Enforced</span>
                        </div>
                        <div className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/60">
                          <span className="text-[10px] text-zinc-500 block uppercase">Access Control</span>
                          <span className="text-sm font-bold text-white">Role-Based RBAC</span>
                          <span className="text-[10px] text-indigo-400 block mt-0.5">Tenant Origin Isolated</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Zero-Trust Architecture
                        </span>
                        <span className="text-zinc-500">Automated Audit Log</span>
                      </div>
                    </div>
                  )}

                  {/* Sleek CTA Button Linking to Live Platform */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href="https://bfstrial.dukatrio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Launch Live Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      href="/systems/bfs"
                      className="w-full sm:w-auto py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>View Case Study</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TECHNICAL METRICS / SYSTEM STATUS BANNER */}
      {/* ========================================================================= */}
      <section className="py-6 border-y border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-zinc-200 font-bold block">Edge TLS Automation</span>
                <span className="text-zinc-500 text-[11px]">Caddy Automated Certs</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-zinc-200 font-bold block">HTTP/3 Protocol</span>
                <span className="text-zinc-500 text-[11px]">QUIC Enabled Transport</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-950/50 border border-indigo-800/50 flex items-center justify-center text-indigo-400 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="text-zinc-200 font-bold block">Node.js 22 Runtime</span>
                <span className="text-zinc-500 text-[11px]">High-Throughput V8</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-950/50 border border-teal-800/50 flex items-center justify-center text-teal-400 shrink-0">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <span className="text-zinc-200 font-bold block">Sub-100ms Routing</span>
                <span className="text-zinc-500 text-[11px]">Global Edge Topology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED WORK / LIVE CASE STUDY */}
      {/* ========================================================================= */}
      <section id="work" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Featured Production Deployments</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Systems Engineered for Commercial Impact.
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md">
              Explore our live production platforms. Every deployment is architected for zero data loss, strict compliance, and instantaneous user feedback.
            </p>
          </div>

          {/* Biggs Funding Solutions (BFS) Major Showcase Card */}
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 to-zinc-950/90 p-8 sm:p-12 shadow-2xl relative overflow-hidden glass-panel hover:border-cyan-500/40 transition-all duration-300">
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Project Overview & Specs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE PRODUCTION DEPLOYMENT
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Institutional FinTech Portal
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Biggs Funding Solutions (BFS Platform)
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-cyan-400 font-semibold">
                      bfstrial.dukatrio.com
                    </span>
                    <a
                      href="https://bfstrial.dukatrio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition"
                    >
                      <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                    </a>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  Institutional commercial debt syndication platform featuring real-time automated underwriting algorithms, complex amortization modelers, Debt Service Coverage Ratio (DSCR) sizing terminals, and client document vaults.
                </p>

                {/* Tech Stack Pills */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">
                    Underlying Engineering Stack:
                  </span>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-200">
                      Next.js 16 (App Router)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-200">
                      TypeScript
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-200">
                      Prisma ORM (PostgreSQL / SQLite)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-200">
                      Reverse MCA Consolidation
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-200">
                      DSCR Diagnostic Terminal
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-200">
                      Client-Side Print PDF Engine
                    </span>
                  </div>
                </div>

                {/* Primary Launch Action */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="https://bfstrial.dukatrio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Launch BFS Platform</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <Link
                    href="/systems/bfs"
                    className="py-3 px-6 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-cyan-500/50 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 group"
                  >
                    <span>Read Technical Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <span className="text-xs text-zinc-400 font-mono">
                    Direct Subdomain Integration
                  </span>
                </div>
              </div>

              {/* Right Column: Platform Architecture Breakdown (5 cols) */}
              <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 space-y-4 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-400">
                  <span className="font-bold text-white uppercase text-[11px]">
                    Subsystem Architecture
                  </span>
                  <span className="text-emerald-400 text-[10px]">VERIFIED OK</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-cyan-400 font-bold block">01 · Amortization Engine</span>
                    <span className="text-zinc-400 text-[11px] block mt-0.5">
                      Real-time principal &amp; interest compounding for business lines of credit.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-cyan-400 font-bold block">02 · DSCR Coverage Terminal</span>
                    <span className="text-zinc-400 text-[11px] block mt-0.5">
                      Net Operating Income modeling with automatic risk tier categorization.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-cyan-400 font-bold block">03 · Encrypted Document Vault</span>
                    <span className="text-zinc-400 text-[11px] block mt-0.5">
                      Zero-knowledge AES-256 encrypted file dropzone for tax packages.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-cyan-400 font-bold block">04 · Zero-Overhead PDF Export</span>
                    <span className="text-zinc-400 text-[11px] block mt-0.5">
                      Native browser print stylesheet generating institutional term sheets.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CORE TECHNICAL CAPABILITIES GRID (4 CARDS) */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-24 sm:py-32 bg-zinc-950/60 border-t border-zinc-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full-Spectrum Engineering Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Core Technical Capabilities.
            </h2>
            <p className="text-base text-zinc-400">
              We focus exclusively on robust, scalable, modern software engineering. No templates or bloated plugins.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Full-Stack Web Architecture */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-sm hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Full-Stack Web Architecture
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Next.js (App Router), React 19, TypeScript, and modern Tailwind CSS. We construct robust component hierarchies, high-security API integrations, and ultra-responsive user experiences.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Next.js App Router &amp; Server Components</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Strict TypeScript Type Safety</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>High-Fidelity Tailwind CSS Design Tokens</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Fintech & Data Systems */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-sm hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Fintech &amp; Data Systems
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Automated decisioning engines, custom underwriting logic, complex financial calculators, and schema-first databases utilizing Prisma ORM with PostgreSQL and SQLite connection pooling.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Algorithmic Underwriting &amp; DSCR Modeler</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prisma ORM with Connection Pool Tuning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AES-256 Hardware Encrypted Data Storage</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Cloud & Infrastructure */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-sm hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/50 border border-indigo-800/50 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Cloud &amp; Infrastructure
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Linux VPS management, modern reverse proxies (Caddy with automated edge TLS and HTTP/3 support), PM2 process clustering, and zero-downtime production deployments.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Bare-Metal Cloud Pod Deployment &amp; Hardening</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Caddy Reverse Proxy with Auto HTTPS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>PM2 Process Management &amp; Standalone Node</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Process Automation & Portals */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-sm hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-teal-950/50 border border-teal-800/50 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Process Automation &amp; Portals
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Bespoke client intake flows, administrative control panels (cPanel), automated email outreach dispatchers, and custom internal operations automation.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Multi-Step Interactive Client Intake Drawers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Custom Administrative Portals &amp; Dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Automated Lead Ingestion &amp; Dispatch Pipeline</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5B. TECH STACK MATRIX */}
      {/* ========================================================================= */}
      <TechStackMatrix />

      {/* ========================================================================= */}
      {/* 6. ARCHITECTURE TOPOLOGY SECTION */}
      {/* ========================================================================= */}
      <section id="architecture" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>Production Infrastructure Topology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              End-to-End Systems Engineering.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              A breakdown of how requests navigate our hardened edge proxy, standalone application server, and isolated data persistence layer.
            </p>
          </div>

          {/* Interactive Topology Pipeline */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 glass-panel">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold">01 · EDGE</span>
                  <Globe className="w-4 h-4 text-zinc-500" />
                </div>
                <h4 className="text-base font-bold text-white">DNS &amp; Cloudflare</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Global Anycast DNS, DDoS mitigation, and edge proxying directing inbound traffic to primary VPS.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold">02 · REVERSE PROXY</span>
                  <Lock className="w-4 h-4 text-zinc-500" />
                </div>
                <h4 className="text-base font-bold text-white">Caddy Edge Gateway</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Automated Let&apos;s Encrypt TLS certificates, HTTP/3 transport, and sub-millisecond local proxying.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold">03 · COMPUTE</span>
                  <Cpu className="w-4 h-4 text-zinc-500" />
                </div>
                <h4 className="text-base font-bold text-white">Node.js 22 &amp; Next.js</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Next.js standalone runtime managed via PM2 cluster mode for zero-downtime rolling deployments.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold">04 · PERSISTENCE</span>
                  <Database className="w-4 h-4 text-zinc-500" />
                </div>
                <h4 className="text-base font-bold text-white">Prisma &amp; PostgreSQL</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Schema-first ORM, connection pool tuning, and hardware AES-256 field-level encrypted storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6B. ARCHITECTURE SNIPPETS VIEWER */}
      {/* ========================================================================= */}
      <ArchitectureSnippets />

      {/* ========================================================================= */}
      {/* 6C. CLIENT ASSURANCE: ZERO VENDOR LOCK-IN & COMPLETE MODIFIABILITY */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative border-t border-zinc-800/80 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client Assurance &amp; Architectural Freedom</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Zero Vendor Lock-In. Complete Modifiability.
            </h2>

            <p className="text-base text-zinc-400 leading-relaxed font-normal">
              Most digital agencies build on proprietary black-box systems or fragile WordPress page builders that trap you forever. DukaTrio engineers modular, enterprise-grade code that you own 100%.
            </p>
          </div>

          {/* 3-Column Frosted Glass Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Modular Component Architecture */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-sm hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Modular Component Architecture
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clean React 19 and TypeScript modular blocks. Swap sections, adjust layouts, or extend backend data schemas without legacy technical debt or spaghetti code.
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-400/90 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Isolated Component Scope</span>
              </div>
            </div>

            {/* Card 2: Optional Headless CMS Integration */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-sm hover:border-emerald-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <FileCode2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Optional Headless CMS Integration
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Non-technical staff can edit articles, market copy, and media in real time through an intuitive dashboard without touching raw code or triggering manual rebuilds.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400/90 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero-Code Publishing Workflow</span>
              </div>
            </div>

            {/* Card 3: 100% Code & Asset Ownership */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-sm hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                100% Code &amp; Asset Ownership
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Complete Git repository, Docker configurations, and Linux server handover upon project delivery. Zero recurring platform tax, zero locked themes, zero royalties.
              </p>
              <div className="pt-2 text-xs font-mono text-indigo-400/90 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Full Intellectual Property Transfer</span>
              </div>
            </div>
          </div>

          {/* DukaTrio Next.js vs. Legacy WordPress / Page Builders Comparison Matrix */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800/80 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  Architectural Benchmark
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                  DukaTrio Next.js Engine vs. Legacy WordPress &amp; Page Builders
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 text-xs font-mono font-semibold w-fit">
                INSTITUTIONAL GRADE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/30 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Performance &amp; Posture Metric</th>
                    <th className="py-4 px-6 text-cyan-400 bg-cyan-950/20 font-bold">
                      DukaTrio Next.js Engine
                    </th>
                    <th className="py-4 px-6 text-zinc-400">Legacy WordPress / Elementor / Wix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans text-xs sm:text-sm">
                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">
                      TTFB &amp; Load Latency
                    </td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-400 bg-cyan-950/10">
                      &lt; 400ms Edge TTFB (Instant)
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      3.5s – 6.2s (Bloated scripts &amp; heavy PHP overhead)
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">
                      Security Posture &amp; Attack Surface
                    </td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-400 bg-cyan-950/10">
                      Isolated origin, static edge cache, zero plugin bloat
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      High attack surface, vulnerable third-party SQL/PHP plugins
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">
                      Google Core Web Vitals
                    </td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-400 bg-cyan-950/10">
                      95–100 Mobile &amp; Desktop (Guaranteed)
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      50–70 average (Severe render-blocking delays)
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">
                      Infrastructure Cost
                    </td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-400 bg-cyan-950/10">
                      High-efficiency Linux VPS ($5–$20/mo)
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      Expensive tiered managed WordPress hosting ($50–$200/mo)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6D. PROJECT SCOPE & COST ESTIMATOR */}
      {/* ========================================================================= */}
      <Estimator />

      {/* ========================================================================= */}
      {/* 7. CONTACT / CALL TO ACTION & FOOTER */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 sm:py-28 border-t border-zinc-800/80 bg-zinc-950/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Engineering Inquiry</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Architect Your Next Platform?
            </h2>

            <p className="text-base text-zinc-400 leading-relaxed">
              Whether you require an institutional fintech portal, custom financial algorithms, or high-throughput Linux cloud infrastructure, connect directly with our engineering desk.
            </p>
          </div>

          {/* Interactive Frosted-Glass Contact Form */}
          <ContactForm />

          {/* Footer Bar */}
          <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>&copy; 2026 DukaTrio. All systems operational.</span>
              </div>
              <span className="hidden sm:inline text-zinc-700">·</span>
              {/* Subtle Status Indicator */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Core-01 · Systems Optimal · 99.9% Uptime</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
              <a href="#work" className="hover:text-cyan-400 transition">
                Work
              </a>
              <a href="#capabilities" className="hover:text-cyan-400 transition">
                Capabilities
              </a>
              <a href="#estimator" className="hover:text-cyan-400 transition">
                Estimator
              </a>
              <Link href="/systems/bfs" className="hover:text-cyan-400 transition">
                BFS Platform
              </Link>
              <a href="#contact" className="hover:text-cyan-400 transition">
                Contact Desk
              </a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
