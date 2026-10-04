import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ContactDirectChannels from "@/components/contact/ContactDirectChannels";
import Navbar from "@/components/layout/Navbar";
import MobileQuickContact from "@/components/layout/MobileQuickContact";
import {
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Server,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Discovery Intake | Dukatrio Web Agency",
  description:
    "Initiate direct architectural consultation for custom web applications, internal tools, and high-performance business portals. 4-hour SLA.",
  alternates: {
    canonical: "https://dukatrio.com/contact",
  },
  openGraph: {
    title: "Contact & Discovery Intake | Dukatrio Web Agency",
    description:
      "Initiate direct architectural consultation for custom web applications, internal tools, and high-performance business portals. 4-hour SLA.",
    url: "https://dukatrio.com/contact",
    siteName: "Dukatrio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Discovery Intake | Dukatrio Web Agency",
    description:
      "Initiate direct architectural consultation for custom web applications, internal tools, and high-performance business portals. 4-hour SLA.",
  },
};

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans pb-16 md:pb-0">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-100px] w-[500px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION HEADER */}
      {/* ========================================================================= */}
      <Navbar />

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>DIRECT ARCHITECTURAL CONSULTATION // ZERO INTERMEDIARIES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Let&apos;s Engineer Your Next Web Application
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Direct architectural consultation. No sales intermediaries. All inquiries receive a scoped response or callback within 4 business hours.
          </p>
        </div>

        {/* Dual-Column Desktop Grid */}
        <div id="intake" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Communication Channels & Trust Signals (lg: 5 cols) */}
          <aside className="lg:col-span-5 w-full">
            <ContactDirectChannels />
          </aside>

          {/* Right Column: Full Scope Intake Form (lg: 7 cols) */}
          <section className="lg:col-span-7 w-full">
            <div className="space-y-4">
              <div className="hidden lg:flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Dual-Path Scoped Ingestion
                </span>
                <span>Immediate 15-Min Callback or Detailed RFP</span>
              </div>

              <ContactForm hideDirectDock />
            </div>
          </section>
        </div>

        {/* Trust Badges Strip */}
        <div className="pt-8 border-t border-zinc-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left font-mono">
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/70 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fixed-Price Milestone SLA</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Transparent delivery agreements with fixed deliverables. Guaranteed zero unexpected scope creep.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/70 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>100% Intellectual Property</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Full Git repository, Docker images, and PostgreSQL root access handed over upon final delivery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/70 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>EU Bare-Metal Isolation</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Dedicated Hetzner NVMe cloud instances in Germany and Finland with AES-256 encrypted persistence.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. FOOTER BAR */}
      {/* ========================================================================= */}
      <footer className="mt-20 border-t border-zinc-900 bg-zinc-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>&copy; 2026 DukaTrio. All systems operational.</span>
            </div>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Core-01 · Direct Intake Active · 99.9% SLA</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <Link href="/#solutions" className="hover:text-cyan-400 transition">
              Solutions
            </Link>
            <Link href="/#capabilities" className="hover:text-cyan-400 transition">
              Capabilities
            </Link>
            <Link href="/#case-studies" className="hover:text-cyan-400 transition">
              Case Studies
            </Link>
            <Link href="/#calculator" className="hover:text-cyan-400 transition">
              Estimator
            </Link>
            <Link href="/contact" className="text-cyan-400 transition font-bold">
              Direct Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Mobile Quick-Contact Floating Dock */}
      <MobileQuickContact />
    </div>
  );
}
