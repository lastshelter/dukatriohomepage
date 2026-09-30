"use client";

import React, { useState } from "react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import TechStackMatrix from "@/components/TechStackMatrix";
import ScopeEstimator from "@/components/estimator/ScopeEstimator";
import MobileQuickContact from "@/components/layout/MobileQuickContact";
import ServiceComparison from "@/components/services/ServiceComparison";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import CaseStudySection from "@/components/portfolio/CaseStudyCard";
import SocialProof from "@/components/testimonials/SocialProof";
import { motion } from "framer-motion";
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

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans pb-16 md:pb-0">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#solutions" className="hover:text-cyan-400 transition-colors">
              Solutions
            </a>
            <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
              Capabilities
            </a>
            <a href="#case-studies" className="hover:text-cyan-400 transition-colors">
              Case Studies
            </a>
            <a href="#estimator" className="hover:text-cyan-400 transition-colors">
              Estimator
            </a>
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
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1"
              >
                Solutions
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1"
              >
                Capabilities
              </a>
              <a
                href="#case-studies"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1"
              >
                Case Studies
              </a>
              <a
                href="#estimator"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1"
              >
                Estimator
              </a>
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
      {/* 2. HERO SECTION - BALANCED CENTERED HIGH-IMPACT LAYOUT */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 sm:pt-36 sm:pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        >
          {/* Precision Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/60 text-cyan-400 font-mono text-xs font-semibold shadow-inner">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Next-Gen Systems Engineering &amp; Digital Infrastructure</span>
          </div>

          {/* Punchy Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Engineering High-Performance Web Applications &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Resilient Digital Infrastructure.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-400 leading-relaxed font-normal max-w-3xl mx-auto">
            From institutional-grade fintech portals and automated decisioning engines to high-throughput cloud infrastructure. We build full-stack web platforms engineered for speed, security, and scale.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#capabilities"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Explore Capabilities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Start a Project</span>
            </a>
          </div>

          {/* Centered Micro-Trust Telemetry */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-zinc-400 border-t border-zinc-800/80 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Bank-Grade Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Node.js 22 LTS &amp; Next.js 16</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>99.99% Uptime Architecture</span>
            </div>
          </div>
        </motion.div>
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
      {/* 4. CORE ENGINEERED SOLUTIONS ("WHAT WE ARCHITECT") */}
      {/* ========================================================================= */}
      <section id="solutions" className="py-24 sm:py-32 relative border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Commercial Engineering Services</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Core Engineered Solutions.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-400 max-w-md">
              Proprietary full-stack systems, automated financial engines, and resilient cloud architectures tailored for commercial performance.
            </p>
          </div>

          {/* 4-Card Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: B2B Client Portals & Management Desks */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 shadow-xl hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-6 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-zinc-500 font-bold uppercase">
                  SOLUTION // 01
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  B2B Client Portals &amp; Management Desks
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Institutional client dashboards equipped with strict role-based access control (RBAC), multi-tenant isolation, encrypted document upload dropzones, intake workflows, and administrative audit trails.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Role-Based RBAC</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Encrypted Vaults</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Audit Logging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Multi-Tenant Auth</span>
                </div>
              </div>
            </div>

            {/* Card 2: Algorithmic Decision & Diagnostic Engines */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 shadow-xl hover:border-emerald-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-6 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-zinc-500 font-bold uppercase">
                  SOLUTION // 02
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Algorithmic Decision &amp; Diagnostic Engines
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  High-precision computational calculation kernels. Custom debt amortizers, multi-variable risk calculators, dynamic waterfall schedule generators, and automated client-side PDF document exports.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sub-50ms Calculation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Rounding Drift</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dynamic Schedules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PDF Term Sheets</span>
                </div>
              </div>
            </div>

            {/* Card 3: High-Throughput Web Applications */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 shadow-xl hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-6 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-zinc-500 font-bold uppercase">
                  SOLUTION // 03
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  High-Throughput Web Applications
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Next.js App Router, React 19, TypeScript, and Prisma ORM with PostgreSQL or SQLite. Engineered with optimized edge rendering, zero bloat, and sub-400ms time-to-first-byte across mobile and desktop.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Edge SSR &amp; RSC</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Type-Safe API Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Prisma 7 ORM</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Lighthouse 95+ Score</span>
                </div>
              </div>
            </div>

            {/* Card 4: Production Linux Cloud Infrastructure */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 shadow-xl hover:border-teal-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-6 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-800/60 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                  <Server className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-zinc-500 font-bold uppercase">
                  SOLUTION // 04
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Production Linux Cloud Infrastructure
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Dedicated cloud pod deployments on AMD EPYC NVMe compute, automated edge TLS, HTTP/3 transport, Caddy reverse proxy routing, and zero-downtime PM2 cluster process management.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>HTTP/3 &amp; Auto TLS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Zero-Downtime Swaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Bare-Metal VPS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Hardware Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4B. STRUCTURED 3-STAGE DELIVERY PROTOCOL */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative border-t border-zinc-800/80 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Workflow className="w-3.5 h-3.5 text-cyan-400" />
              <span>Execution Methodology</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Structured 3-Stage Delivery Protocol
            </h2>

            <p className="text-base text-zinc-400 leading-relaxed font-normal">
              Transparent, predictable delivery sprints designed to take institutional platforms from architectural scope to live production without delays or scope creep.
            </p>
          </div>

          {/* 3 Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Stage 01 */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-8 space-y-5 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-mono text-cyan-400">01</span>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 uppercase">
                  Discovery &amp; Blueprint
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                System Architecture &amp; Scope
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Interactive UX wireframes, relational database schemas, computational formula specifications, and a fixed-scope delivery plan with zero ambiguity.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Relational Schema Modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>API Contract Specification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Fixed Milestone Roadmap</span>
                </li>
              </ul>
            </div>

            {/* Stage 02 */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-8 space-y-5 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-mono text-emerald-400">02</span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 uppercase">
                  Implementation Sprints
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Rapid Core Build &amp; Preview
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Full-stack TypeScript development, responsive component assembly, algorithmic test suites, and private staging sandbox previews with continuous verification.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Next.js 16 + React 19 Frontend</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Automated Unit &amp; Math Tests</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Live Staging Sandbox Previews</span>
                </li>
              </ul>
            </div>

            {/* Stage 03 */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-8 space-y-5 hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-mono text-indigo-400">03</span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 uppercase">
                  Cutover &amp; Handoff
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Production Handover &amp; Support
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Zero-downtime DNS cutover, automated TLS provisioning, complete Git repository ownership transfer, and a 30-day post-launch warranty with ongoing support.
              </p>
              <ul className="pt-2 space-y-2 text-xs font-mono text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Zero-Downtime Linux Deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>100% Repository IP Transfer</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>30-Day Technical Warranty</span>
                </li>
              </ul>
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
      {/* 6B. PROOF OF CRAFT: BEFORE / AFTER ARCHITECTURAL SLIDER */}
      {/* ========================================================================= */}
      <BeforeAfterSlider />

      {/* ========================================================================= */}
      {/* 6B-2. STRUCTURED CASE STUDIES */}
      {/* ========================================================================= */}
      <CaseStudySection />

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
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6D. SERVICE DELIVERABLES: STANDARD VS. DUKATRIO FLAGSHIP */}
      {/* ========================================================================= */}
      <ServiceComparison />

      {/* ========================================================================= */}
      {/* 6E. VERIFIED SOCIAL PROOF & CLIENT FEEDBACK */}
      {/* ========================================================================= */}
      <SocialProof />

      {/* ========================================================================= */}
      {/* 6F. INTERACTIVE SCOPE & COST ESTIMATOR */}
      {/* ========================================================================= */}
      <ScopeEstimator />

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
              <a href="#solutions" className="hover:text-cyan-400 transition">
                Solutions
              </a>
              <a href="#capabilities" className="hover:text-cyan-400 transition">
                Capabilities
              </a>
              <a href="#case-studies" className="hover:text-cyan-400 transition">
                Case Studies
              </a>
              <a href="#estimator" className="hover:text-cyan-400 transition">
                Estimator
              </a>
              <a href="#contact" className="hover:text-cyan-400 transition">
                Contact Desk
              </a>
            </div>
          </footer>
        </div>
      </section>

      {/* Mobile Quick-Contact Floating Dock (Strictly Mobile md:hidden) */}
      <MobileQuickContact />
    </div>
  );
}
