import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Database,
  Calculator,
  CheckCircle2,
  Layers,
  Sparkles,
  Server,
  FileText,
  Activity,
  ChevronRight,
  Globe,
  Radio,
} from "lucide-react";

export default function BfsCaseStudyPage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-100px] w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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

          {/* Breadcrumb Status */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-cyan-400 transition">
              Root
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-500">Systems</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-cyan-400 font-semibold">BFS Case Study</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://bfstrial.dukatrio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] flex items-center gap-2"
            >
              <span>Launch Live Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-cyan-400 transition group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to DukaTrio Systems Hub</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PRODUCTION CASE STUDY
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono font-semibold">
              bfstrial.dukatrio.com
            </span>
            <span className="text-xs font-mono text-zinc-500">
              COMMERCIAL FINTECH ENGINE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl">
            Biggs Funding Solutions:{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Automating Institutional Debt Syndication.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-3xl">
            How DukaTrio engineered a real-time underwriting platform for commercial debt brokers—replacing error-prone manual spreadsheets with mathematical compounding engines, instant DSCR stress modeling, and zero-overhead term sheet generation.
          </p>
        </section>

        {/* Key Metrics Strip */}
        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">
                &lt; 65ms
              </span>
              <span className="text-xs uppercase text-zinc-400 font-semibold block">
                Calculation Latency
              </span>
              <span className="text-[11px] text-zinc-500 block">
                Instant Amortization Math
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">
                100%
              </span>
              <span className="text-xs uppercase text-zinc-400 font-semibold block">
                Automated Term Sheets
              </span>
              <span className="text-[11px] text-zinc-500 block">
                Zero Human Calculation Errors
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-indigo-400 block">
                0 MB
              </span>
              <span className="text-xs uppercase text-zinc-400 font-semibold block">
                Server PDF Memory Overhead
              </span>
              <span className="text-[11px] text-zinc-500 block">
                Client CSS Print Engine
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-teal-400 block">
                A+ Rating
              </span>
              <span className="text-xs uppercase text-zinc-400 font-semibold block">
                Qualys SSL Security
              </span>
              <span className="text-[11px] text-zinc-500 block">
                Caddy Automated Edge TLS
              </span>
            </div>
          </div>
        </section>

        {/* Engineering Challenge & Solution Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: The Challenge */}
          <div className="backdrop-blur-md bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-8 space-y-5">
            <div className="w-10 h-10 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-center justify-center text-rose-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              The Operational Bottleneck
            </h3>
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>
                Prior to the BFS platform, debt advisors and loan officers relied on disconnected Excel workbooks to formulate business lines of credit, commercial real estate debt yield, and high-interest MCA debt consolidations.
              </p>
              <ul className="space-y-2 font-mono text-xs text-zinc-400 pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Spreadsheet version drift resulting in misquoted interest rates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Hours spent manually formatting PDF term sheets in desktop word processors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Unencrypted email attachments exposing sensitive business tax returns and EINs.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: The Engineered Solution */}
          <div className="backdrop-blur-md bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-8 space-y-5">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              The DukaTrio Architecture
            </h3>
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>
                DukaTrio engineered a unified, browser-native computational platform built on Next.js 16 (App Router) and React 19, backed by a dual-pool Prisma ORM and hardened Caddy reverse proxy.
              </p>
              <ul className="space-y-2 font-mono text-xs text-zinc-400 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-millisecond amortization modelers executing directly in client memory.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Native browser print-stylesheet generating institutional PDFs with zero server CPU load.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hardware AES-256 encrypted file vault for secure document ingestion.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4 Core Subsystems Detailed */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Functional Subsystems</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Platform Features &amp; Algorithmic Capabilities.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subsystem 1 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  SUBSYSTEM 01
                </span>
                <Calculator className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Business Line of Credit (BLC) Amortizer
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Real-time interactive loan sizing engine supporting draws from $5,000 to $150,000, term lengths from 6 to 24 months, and APR ranges from 5% to 20%. Computes monthly debt service and total interest dynamically with zero UI lag.
              </p>
              <div className="pt-2 font-mono text-[11px] text-zinc-400">
                Formula: <code className="text-cyan-300">M = P · [r(1+r)ⁿ] / [(1+r)ⁿ - 1]</code>
              </div>
            </div>

            {/* Subsystem 2 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  SUBSYSTEM 02
                </span>
                <ShieldCheck className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Commercial Real Estate DSCR Diagnostic
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Net Operating Income (NOI) diagnostic terminal evaluating gross rental receipts against annual debt service obligations. Automatically flags whether a transaction meets institutional Tier-1 (≥1.35x), Tier-2 (1.15x-1.34x), or Stressed threshold status.
              </p>
              <div className="pt-2 font-mono text-[11px] text-zinc-400">
                Classification: <span className="text-emerald-400">Real-Time Risk Categorization</span>
              </div>
            </div>

            {/* Subsystem 3 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  SUBSYSTEM 03
                </span>
                <Zap className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Reverse MCA Debt Consolidation Modeler
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Analyzes predatory daily and weekly merchant cash advance payments. Projects net cash flow recovery when rolling stacked short-term debt into an amortizing term facility, displaying instant weekly liquidity savings.
              </p>
              <div className="pt-2 font-mono text-[11px] text-zinc-400">
                Outcome: <span className="text-cyan-300">Up to 68% Daily Debt Service Relief</span>
              </div>
            </div>

            {/* Subsystem 4 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  SUBSYSTEM 04
                </span>
                <FileText className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Zero-Memory PDF Term Sheet Generator
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Bypasses heavy server-side Chrome headless instances by leveraging an institutional CSS `@media print` stylesheet. Generates pixel-perfect 2-page term sheets directly in the client browser with corporate letterhead, disclaimer locks, and zero VPS memory load.
              </p>
              <div className="pt-2 font-mono text-[11px] text-zinc-400">
                Server RAM Saved: <span className="text-emerald-400">~250MB per concurrent PDF request</span>
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure Topology Diagram Card */}
        <section className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                Production Infrastructure Topology
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-[10px] font-mono text-emerald-400 font-semibold">
              ACTIVE IN PRODUCTION
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <span className="text-cyan-400 font-bold block">1. Edge Layer</span>
              <p className="text-zinc-400 text-[11px] font-sans">
                Cloudflare Anycast routing, DDoS mitigation, and SSL termination.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <span className="text-cyan-400 font-bold block">2. Ingress Gateway</span>
              <p className="text-zinc-400 text-[11px] font-sans">
                Caddy v2 with automated Let&apos;s Encrypt certs &amp; HTTP/3 (QUIC).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <span className="text-cyan-400 font-bold block">3. Standalone Node</span>
              <p className="text-zinc-400 text-[11px] font-sans">
                Next.js 16 standalone server running under PM2 cluster mode.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <span className="text-cyan-400 font-bold block">4. Persistence</span>
              <p className="text-zinc-400 text-[11px] font-sans">
                Prisma ORM with connection pool tuning and AES-256 field encryption.
              </p>
            </div>
          </div>
        </section>

        {/* Live CTA Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-cyan-950/40 via-zinc-900/60 to-zinc-950 border border-cyan-800/40 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Experience the BFS Platform Live
            </h3>
            <p className="text-sm text-zinc-300">
              Test the real-time calculators, inspect the intake drawers, and review the live deployment on our dedicated cluster.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://bfstrial.dukatrio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] flex items-center gap-2"
            >
              <span>Launch bfstrial.dukatrio.com</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href="/#contact"
              className="py-3.5 px-8 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold text-xs uppercase tracking-wider transition flex items-center gap-2"
            >
              <span>Discuss an Equivalent Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>&copy; 2026 DukaTrio Systems. All platforms verified.</span>
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

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
            <a
              href="https://bfstrial.dukatrio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              Live BFS Platform
            </a>
            <Link href="/#contact" className="hover:text-cyan-400 transition">
              Engineering Desk
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
