import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/ContactForm";
import MobileQuickContact from "@/components/layout/MobileQuickContact";
import SolutionCtaButton from "@/components/solutions/SolutionCtaButton";
import {
  ChevronRight,
  ExternalLink,
  Cpu,
  ShieldCheck,
  Database,
  WifiOff,
  Camera,
  Server,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Lock,
  Layers,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/case-studies/gradiliste-os";
const PAGE_TITLE =
  "Gradilište OS Case Study: Offline-First Construction PWA & OCR Architecture | DukaTrio";
const PAGE_DESCRIPTION =
  "Deep-dive architectural case study of Gradilište OS: how a SvelteKit Field PWA, Next.js 16 Command Portal, and PocketBase (Embedded SQLite WAL) cut ticketing delay by 80% with €0 seat licensing.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "DukaTrio",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const OUTBOX_SNIPPET = `interface OutboxEntry {
  id: string;              // UUIDv7, doubles as idempotency key
  collection: "deliveries" | "pours" | "timesheets" | "attachments";
  op: "create" | "update";
  recordId: string;        // Client-generated UUIDv7 before server contact
  payload: Record<string, unknown>;
  createdAt: number;       // Device clock, for display only
  attempts: number;
  lastError?: string;
}`;

const DEFAULT_INQUIRY_MESSAGE =
  "[Case Study Inquiry: Gradilište OS / Offline Field Operations PWA]\nTarget Architecture: SvelteKit (Field PWA) + Next.js 16 (Command Portal) + PocketBase (Embedded SQLite WAL).\nCore Scope: IndexedDB UUIDv7 outbox sync, on-device camera OCR, and single-tenant EU VPS deployment (€4,800 fixed milestone).";

export default function GradilisteOsCaseStudyPage(): React.JSX.Element {
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline:
      "Gradilište OS: Offline-First Construction Operations on a Self-Hosted Stack",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    proficiencyLevel: "Expert",
    author: {
      "@type": "Organization",
      name: "DukaTrio",
      url: "https://dukatrio.com",
    },
    publisher: {
      "@type": "Organization",
      name: "DukaTrio",
      url: "https://dukatrio.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dukatrio.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: "https://dukatrio.com/#case-studies",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gradilište OS",
        item: PAGE_URL,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gradilište OS",
    url: "https://gradiliste.dukatrio.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android, Web",
    description:
      "Offline-first construction operations PWA and back-office command portal engineered with SvelteKit, Next.js 16, PocketBase (Embedded SQLite WAL), IndexedDB UUIDv7 outbox sync, and on-device WebAssembly camera OCR.",
    author: {
      "@type": "Organization",
      name: "DukaTrio",
      url: "https://dukatrio.com",
    },
    offers: {
      "@type": "Offer",
      price: "4800",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: PAGE_URL,
    },
  };

  return (
    <div className="relative min-h-screen bg-[#0B0D13] text-zinc-100 overflow-hidden font-sans pb-16 md:pb-0">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Ambient Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/8 rounded-full blur-[130px] pointer-events-none" />

      {/* 1. NAVBAR */}
      <Navbar />

      <main className="relative z-10">
        {/* 2. HEADER & PROMINENT METRICS CALLOUT BOX */}
        <header className="pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400"
            >
              <Link href="/" className="hover:text-teal-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link
                href="/#case-studies"
                className="hover:text-teal-400 transition-colors"
              >
                Case Studies
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-teal-400 font-semibold" aria-current="page">
                Gradilište OS
              </span>
            </nav>

            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-teal-500/30 text-teal-400 font-bold">
                  ARCHITECTURAL CASE STUDY
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-slate-300">
                  SvelteKit (Field PWA) + Next.js 16 (Command Portal)
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-slate-300">
                  PocketBase (Embedded SQLite WAL)
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                Gradilište OS: Offline-First Construction Operations on a{" "}
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Self-Hosted Stack.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                How we replaced lost paper delivery dockets and cloud-dependent field apps with a split-surface SvelteKit &amp; Next.js 16 architecture, client-side IndexedDB UUIDv7 outbox queuing, on-device WebAssembly camera OCR, and PocketBase (Embedded SQLite WAL) on a single-tenant Hetzner VPS.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://gradiliste.dukatrio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg"
                >
                  <span>Inspect Live System (gradiliste.dukatrio.com)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/solutions/offline-field-operations-pwa"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800 text-slate-200 font-mono text-xs font-semibold transition-all"
                >
                  <span>View €4,800 Field PWA Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                </Link>
              </div>
            </div>

            {/* Prominent Header Callout Box: Core Verified Metrics */}
            <div className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-800 font-mono text-xs">
                <span className="text-teal-400 font-bold uppercase tracking-widest">
                  VERIFIED PRODUCTION TELEMETRY // OUTCOME SUMMARY
                </span>
                <span className="text-slate-400">
                  Domain: Concrete &amp; Materials Logistics · 100% Client IP Ownership
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">
                    −80%
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Administrative Ticketing Delay
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Elapsed time from physical mixer arrival on site to a verified, reconcilable ledger entry in the back office.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    €0
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Recurring User Licensing
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Unlimited drivers, foremen, subcontractors, and back-office staff with zero per-seat SaaS tax or App Store gatekeeping.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">
                    &lt; €15/mo
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Infrastructure Footprint
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Amortized monthly cost for the entire Docker + Caddy v2 + PocketBase stack on a dedicated EU Hetzner Cloud VPS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 3. TWO-COLUMN TECHNICAL DEEP-DIVE WITH STICKY TABLE OF CONTENTS */}
        <section className="py-16 sm:py-24 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Sticky Table of Contents (lg: 3 cols) */}
              <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
                <div className="rounded-2xl bg-[#0D121F] border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400 font-bold border-b border-slate-800 pb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Architecture Index</span>
                  </div>
                  <nav aria-label="Table of contents" className="space-y-2 text-xs font-mono">
                    <a
                      href="#operational-failure"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      01. The Operational Failure
                    </a>
                    <a
                      href="#architectural-blueprint"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      02. Architectural Blueprint
                    </a>
                    <a
                      href="#outbox-sync-queue"
                      className="block py-1 pl-3 text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      ↳ 2.3 IndexedDB UUIDv7 Outbox
                    </a>
                    <a
                      href="#camera-ocr-pipeline"
                      className="block py-1 pl-3 text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      ↳ 2.4 On-Device WASM OCR
                    </a>
                    <a
                      href="#security-sovereignty"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      03. Security &amp; Sovereignty
                    </a>
                    <a
                      href="#operational-tradeoffs"
                      className="block py-1 pl-3 text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      ↳ 3.4 Trade-offs &amp; Failure Modes
                    </a>
                    <a
                      href="#verifiable-roi"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      04. Verifiable ROI &amp; Payoff
                    </a>
                  </nav>
                </div>

                {/* Stack Summary Card */}
                <div className="rounded-2xl bg-[#0D121F] border border-slate-800 p-5 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 uppercase font-bold">
                    Production Stack
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Field UI:</span>
                      <span className="text-teal-400">SvelteKit PWA</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Command UI:</span>
                      <span className="text-white">Next.js 16</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Backend:</span>
                      <span className="text-teal-400">PocketBase (Go)</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Database:</span>
                      <span className="text-white">SQLite WAL</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Client Sync:</span>
                      <span className="text-teal-400">IndexedDB UUIDv7</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Edge / Host:</span>
                      <span className="text-white">Caddy v2 · Hetzner</span>
                    </li>
                  </ul>
                </div>
              </aside>

              {/* Right Main Article Body (lg: 9 cols) */}
              <article className="lg:col-span-9 space-y-16">
                {/* ============================================================= */}
                {/* SECTION 1: THE OPERATIONAL FAILURE */}
                {/* ============================================================= */}
                <section id="operational-failure" className="scroll-mt-24 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-800/50 text-rose-300 font-mono text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>SECTION 01 // THE OPERATIONAL FAILURE</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    1. Why Commercial Cloud SaaS Fails on Construction Sites
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    Construction sites break the assumptions commercial field-management SaaS is built on. Most cloud products assume three things: a continuous network connection, a stable headcount, and data that starts out digital. On an active jobsite, none of those hold.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="text-xs font-mono font-bold text-rose-400 uppercase">
                        1.1 Connectivity Dead Zones
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Blocking Writes &amp; Auth Expiry
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Basements, underground garages, reinforced-concrete cores, and rebar cages routinely drop signal to zero. Cloud-first forms block on API calls, time out, or expire auth tokens while offline—sending foremen back to a login screen and losing whatever was in memory.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                        1.2 Per-Seat Field Taxes
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Seat Rationing Destroys Auditability
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Workforce size swings across foundation, structure, and finishing phases. Per-user pricing (€40–€65/seat/mo) pushes firms to ration accounts and share a single login across multiple foremen—destroying the exact audit trail the software was bought to provide.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="text-xs font-mono font-bold text-teal-400 uppercase">
                        1.3 Paper Delivery Dockets
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Lost Evidence &amp; 90-Min Pour Windows
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Every ready-mix truck arrives with a physical paper docket: supplier, mix design, volume (m³), batch time, departure time, and truck ID. Slips get wet, torn, or sit in jacket pockets for days while fresh concrete faces a strict 90-minute discharge window (ASTM C94).
                      </p>
                    </div>
                  </div>
                </section>

                {/* ============================================================= */}
                {/* SECTION 2: ARCHITECTURAL BLUEPRINT */}
                {/* ============================================================= */}
                <section id="architectural-blueprint" className="scroll-mt-24 space-y-8 pt-8 border-t border-slate-800">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-teal-400 font-mono text-xs font-semibold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>SECTION 02 // ARCHITECTURAL BLUEPRINT</span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      2. Architectural Blueprint: Device as Primary Write Target
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                      The governing design rule throughout Gradilište OS: <strong className="text-white">the field device is the primary write target; the server is the eventual system of record.</strong> Every field action completes locally and deterministically with zero network round-trip.
                    </p>
                  </div>

                  {/* 2.1 Split Front-End Table */}
                  <div className="rounded-2xl bg-[#0D121F] border border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                      <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-teal-400">
                        2.1 Split Front-End Architecture: SvelteKit (Field PWA) + Next.js 16 (Command Portal)
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-400 uppercase">
                            <th className="py-3.5 px-6">Surface</th>
                            <th className="py-3.5 px-6">Framework</th>
                            <th className="py-3.5 px-6">Constraint Optimized For</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80 text-slate-300">
                          <tr>
                            <td className="py-4 px-6 font-mono font-bold text-teal-400 whitespace-nowrap">
                              Field PWA
                            </td>
                            <td className="py-4 px-6 font-mono text-white whitespace-nowrap">
                              SvelteKit (Static PWA + SW)
                            </td>
                            <td className="py-4 px-6 leading-relaxed">
                              Low-end Android devices, intermittent 3G/EDGE, gloved one-handed use. Compiles to tiny, runtime-light bundles with minimal memory pressure alongside the camera and WebAssembly OCR worker.
                            </td>
                          </tr>
                          <tr>
                            <td className="py-4 px-6 font-mono font-bold text-indigo-400 whitespace-nowrap">
                              Command Portal
                            </td>
                            <td className="py-4 px-6 font-mono text-white whitespace-nowrap">
                              Next.js 16 (App Router Standalone)
                            </td>
                            <td className="py-4 px-6 leading-relaxed">
                              Data-dense reconciliation tables, supplier invoice auditing, dual-currency payroll engines, and CSV/PDF exports on office desktops with stable connectivity.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 2.2 PocketBase Embedded SQLite WAL */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2.5 text-teal-400 font-mono text-xs font-bold uppercase">
                      <Database className="w-4 h-4" />
                      <span>2.2 PocketBase (Embedded SQLite WAL) as the Unified Backend</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      PocketBase compiles into a single Go binary bundling <strong className="text-white">SQLite in Write-Ahead Logging (WAL) mode</strong>, JWT authentication, collection-level access rules, local file storage, and real-time subscriptions over Server-Sent Events (SSE). For a single-company operational workload, this eliminates four separate moving parts (external DB server, third-party auth vendor, cloud object bucket, and pub/sub broker):
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-300">
                      <li className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="font-mono font-bold text-white">SQLite WAL Concurrency</div>
                        <p className="text-slate-400 leading-relaxed">
                          Field writes arrive in bursty batches. With WAL enabled, concurrent office readers and the single writer never block each other.
                        </p>
                      </li>
                      <li className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="font-mono font-bold text-white">Declarative RBAC Rules</div>
                        <p className="text-slate-400 leading-relaxed">
                          Server-enforced collection expressions (<code className="text-teal-300">@request.auth.role = &quot;foreman&quot;</code>) isolate site records regardless of client state.
                        </p>
                      </li>
                      <li className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="font-mono font-bold text-white">SSE Realtime Dispatch</div>
                        <p className="text-slate-400 leading-relaxed">
                          The Next.js 16 Command Portal subscribes over SSE; synced field dockets appear on the headquarters ledger within milliseconds.
                        </p>
                      </li>
                    </ul>
                  </div>

                  {/* 2.3 IndexedDB Outbox Queue */}
                  <div id="outbox-sync-queue" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-5">
                    <div className="flex items-center gap-2.5 text-teal-400 font-mono text-xs font-bold uppercase">
                      <WifiOff className="w-4 h-4" />
                      <span>2.3 Client-Side IndexedDB Sync Queue (UUIDv7 Outbox Pattern)</span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      Every field mutation writes to IndexedDB inside a single atomic transaction: the materialized record that the SvelteKit UI reads from immediately, and an <code className="text-teal-300 font-mono">OutboxEntry</code> describing the pending mutation. Record IDs are generated on the client using <strong className="text-white">time-ordered UUIDv7</strong> at the moment of capture, so records and photo attachments can reference each other offline without temporary ID remapping.
                    </p>

                    <pre className="p-5 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs font-mono text-teal-300 leading-relaxed">
                      <code>{OUTBOX_SNIPPET}</code>
                    </pre>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                        <div className="font-mono text-xs font-bold text-teal-400 uppercase">
                          iOS Safari Sync Fallback
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          While Chromium/Android utilizes the Service Worker Background Sync API, <strong className="text-slate-200">iOS Safari does not implement Background Sync</strong>. We engineered deterministic fallback listeners on <code className="text-teal-300">online</code>, <code className="text-teal-300">visibilitychange</code>, and app-launch events so iPhones flush the outbox reliably the second signal returns.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                        <div className="font-mono text-xs font-bold text-teal-400 uppercase">
                          Idempotency &amp; Append-Only Dockets
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Client-generated UUIDv7 keys make <code className="text-teal-300">create</code> operations strictly idempotent across interrupted network flushes. Delivery dockets are modeled as immutable append-only events; corrections link as child audit records rather than overwriting original evidence.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2.4 Camera OCR Pipeline & 2.5 Docker/Caddy */}
                  <div id="camera-ocr-pipeline" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase">
                        <Camera className="w-4 h-4" />
                        <span>2.4 On-Device Web Worker Camera OCR</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        OffscreenCanvas Pre-Processing + WASM OCR
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Thermal and dot-matrix delivery slips photographed in harsh sunlight undergo grayscale conversion, adaptive thresholding, and deskewing on an <code className="text-slate-200">OffscreenCanvas</code> before passing to a WebAssembly OCR engine inside a Web Worker. Supplier, docket number, mix class, volume (m³), and departure time are extracted on-device, starting the 90-minute hydration countdown immediately.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase">
                        <Server className="w-4 h-4" />
                        <span>2.5 Self-Hosted Docker on Hetzner with Caddy v2</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        Zero-Downtime Field Continuity
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        The entire stack runs via <code className="text-slate-200">docker compose</code> on an EU Hetzner Cloud VPS behind Caddy v2 (automatic Let&apos;s Encrypt TLS, HTTP/3 QUIC, reverse proxy). Scheduled off-site S3 backups and volume snapshots protect the SQLite WAL state, and server restarts are completely invisible to field crews working from device cache.
                      </p>
                    </div>
                  </div>
                </section>

                {/* ============================================================= */}
                {/* SECTION 3: SECURITY & SOVEREIGNTY */}
                {/* ============================================================= */}
                <section id="security-sovereignty" className="scroll-mt-24 space-y-8 pt-8 border-t border-slate-800">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-teal-400 font-mono text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SECTION 03 // SECURITY &amp; DATA SOVEREIGNTY</span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      3. Zero-Dependency Private VPS vs. Multi-Tenant Cloud Lock-In
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                      Gradilište OS makes zero runtime calls to external third-party APIs: OCR executes on the phone, while auth, relational storage, and realtime sync run inside PocketBase on the client&apos;s own EU server.
                    </p>
                  </div>

                  {/* 3.1 Comparison Table */}
                  <div className="rounded-2xl bg-[#0D121F] border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-400 uppercase">
                            <th className="py-3.5 px-6">Dimension</th>
                            <th className="py-3.5 px-6">Multi-Tenant Field SaaS</th>
                            <th className="py-3.5 px-6 text-teal-400">Gradilište OS (Single-Tenant VPS)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80 text-slate-300">
                          <tr>
                            <td className="py-3.5 px-6 font-mono font-semibold text-white">Data Location</td>
                            <td className="py-3.5 px-6 text-slate-400">Vendor-chosen region &amp; external sub-processors</td>
                            <td className="py-3.5 px-6 text-teal-300">Single client-selected EU data center (Hetzner)</td>
                          </tr>
                          <tr>
                            <td className="py-3.5 px-6 font-mono font-semibold text-white">Tenancy Isolation</td>
                            <td className="py-3.5 px-6 text-slate-400">Logical (<code className="text-slate-300">tenant_id</code> row filter)</td>
                            <td className="py-3.5 px-6 text-teal-300">Physical VM isolation; zero shared tables</td>
                          </tr>
                          <tr>
                            <td className="py-3.5 px-6 font-mono font-semibold text-white">Data Export</td>
                            <td className="py-3.5 px-6 text-slate-400">Rate-limited REST API or gated CSV tier</td>
                            <td className="py-3.5 px-6 text-teal-300">Raw SQLite file + attachments directory (<code className="text-teal-200">cp</code>)</td>
                          </tr>
                          <tr>
                            <td className="py-3.5 px-6 font-mono font-semibold text-white">Pricing &amp; Code</td>
                            <td className="py-3.5 px-6 text-slate-400">Annual price hikes, seat lock-in, closed source</td>
                            <td className="py-3.5 px-6 text-teal-300">100% source code ownership, €0 license server</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 3.4 Operational Trade-offs & Failure Modes */}
                  <div
                    id="operational-tradeoffs"
                    className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-[#0D121F] border border-amber-500/30 space-y-4"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                        3.4 Operational Trade-Offs &amp; Failure Modes
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        ARCHITECTURAL TRANSPARENCY
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      What a Single-Node Self-Hosted Architecture Accepts—and How We Mitigate It
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      A single VPS is a single point of failure, and self-hosting shifts operational responsibility away from a SaaS vendor. Those trade-offs are accepted deliberately and engineered around across three axes:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-xs font-mono font-bold text-white">
                          1. Availability vs. Field Uptime
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Because the SvelteKit PWA is offline-first, a VPS reboot never blocks jobsite capture. Server availability governs <em>office sync latency</em>, not field uptime.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-xs font-mono font-bold text-white">
                          2. Deterministic Disaster Recovery
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Automated nightly encrypted S3 backups plus Hetzner volume snapshots allow full restoration onto a fresh VPS in under 10 minutes.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-xs font-mono font-bold text-white">
                          3. Single-Tenant Write Ceiling
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          SQLite WAL on one node is sized for a single enterprise&apos;s operational write volume (thousands of daily events), not multi-tenant SaaS scale.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ============================================================= */}
                {/* SECTION 4: VERIFIABLE ROI & 36-MONTH COST TABLE */}
                {/* ============================================================= */}
                <section id="verifiable-roi" className="scroll-mt-24 space-y-8 pt-8 border-t border-slate-800">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-teal-400 font-mono text-xs font-semibold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>SECTION 04 // VERIFIABLE ROI &amp; PAYOFF</span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      4. Verifiable ROI: €4,800 Fixed Milestone vs. €43,200 Commercial SaaS Tax
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                      By moving OCR execution onto the field crews&apos; existing smartphones and eliminating per-seat licensing, Gradilište OS reaches break-even in under 5 months while turning software expenditure into a permanent company-owned asset.
                    </p>
                  </div>

                  {/* 36-Month Cost Comparison Table */}
                  <div className="rounded-2xl bg-[#0D121F] border border-slate-800 overflow-hidden shadow-xl">
                    <div className="px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-teal-400">
                        Illustrative 36-Month Total Cost of Ownership (25 Field + Office Users)
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        Break-Even Horizon: ~4.1 Months
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-400 uppercase">
                            <th className="py-3.5 px-6">Cost Vector</th>
                            <th className="py-3.5 px-6">Commercial Per-Seat Field SaaS</th>
                            <th className="py-3.5 px-6 text-teal-400">Gradilište OS (DukaTrio Build)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
                          <tr>
                            <td className="py-4 px-6 font-sans font-semibold text-white">
                              Baseline Seat Assumption
                            </td>
                            <td className="py-4 px-6 text-slate-400">
                              25 active users × €40/seat/mo
                            </td>
                            <td className="py-4 px-6 text-teal-300">
                              Unlimited seats · €0/user/mo
                            </td>
                          </tr>
                          <tr>
                            <td className="py-4 px-6 font-sans font-semibold text-white">
                              Initial Engineering / Setup
                            </td>
                            <td className="py-4 px-6 text-slate-400">€0</td>
                            <td className="py-4 px-6 text-white font-bold">
                              €4,800 (One-Time Fixed Milestone)
                            </td>
                          </tr>
                          <tr>
                            <td className="py-4 px-6 font-sans font-semibold text-white">
                              36-Month Seat &amp; Module Licensing
                            </td>
                            <td className="py-4 px-6 text-rose-400 font-bold">
                              €43,200 (incl. OCR &amp; API tier add-ons)
                            </td>
                            <td className="py-4 px-6 text-teal-400 font-bold">€0</td>
                          </tr>
                          <tr>
                            <td className="py-4 px-6 font-sans font-semibold text-white">
                              36-Month Infrastructure (Hetzner VPS + Backups)
                            </td>
                            <td className="py-4 px-6 text-slate-400">Bundled in seat tax</td>
                            <td className="py-4 px-6 text-teal-300">
                              &lt; €540 (&lt; €15/mo × 36 mos)
                            </td>
                          </tr>
                          <tr className="bg-slate-950/90">
                            <td className="py-4 px-6 font-sans font-extrabold text-white">
                              36-Month Total Cash Outflow
                            </td>
                            <td className="py-4 px-6 text-rose-400 font-extrabold text-base">
                              €43,200
                            </td>
                            <td className="py-4 px-6 text-teal-400 font-extrabold text-base">
                              &lt; €5,340 (Net Savings: €37,860+)
                            </td>
                          </tr>
                          <tr>
                            <td className="py-4 px-6 font-sans font-semibold text-white">
                              Asset Owned at Month 36
                            </td>
                            <td className="py-4 px-6 text-slate-500">
                              None (Subscription termination = data lockout)
                            </td>
                            <td className="py-4 px-6 text-teal-300 font-bold">
                              100% Source Code, Docker Stack &amp; SQLite Ledger
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </section>

        {/* 4. HIGH-IMPACT BOTTOM CTA BANNER & PRE-SELECTED CONTACT DESK */}
        <section id="contact" className="py-24 sm:py-32 bg-[#0B0F19] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* High-Impact CTA Banner */}
            <div className="rounded-3xl bg-[#0D121F] border border-teal-500/30 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-400/30 text-teal-300 font-mono text-xs font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>DEPLOY THIS ARCHITECTURE IN 10–14 DAYS</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Ready to Replace Paper Field Tickets &amp; Per-Seat SaaS Taxes?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  We engineer bespoke Offline Field Operations PWAs and Command Portals on the exact Gradilište OS blueprint for a flat <strong className="text-white">€4,800 milestone</strong> with 100% source code handover.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <SolutionCtaButton
                  label="Book 15-Min Feasibility Audit"
                  scope="Offline Field Operations PWA"
                  message={DEFAULT_INQUIRY_MESSAGE}
                  variant="primary"
                />
                <Link
                  href="/contact?solution=Offline+Field+Operations+PWA#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-semibold transition-all"
                >
                  <span>Direct Intake (?solution=Offline+Field+Operations+PWA)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                </Link>
              </div>
            </div>

            {/* Embedded Contact Form with Offline Field Operations PWA Pre-Selected */}
            <ContactForm
              defaultTab="rfp"
              defaultScope="Offline Field Operations PWA"
              defaultMessage={DEFAULT_INQUIRY_MESSAGE}
            />

            {/* Contextual Footer */}
            <footer className="pt-12 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>&copy; 2026 DukaTrio Engineering Studio · Gradilište OS Architecture</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
                <Link
                  href="/case-studies/gradiliste-os"
                  className="text-teal-400 font-semibold"
                >
                  Gradilište OS Study
                </Link>
                <Link
                  href="/solutions/offline-field-operations-pwa"
                  className="hover:text-teal-400 transition-colors"
                >
                  Offline Field PWA
                </Link>
                <Link
                  href="/solutions/excel-to-custom-portal"
                  className="hover:text-teal-400 transition-colors"
                >
                  Excel-to-Portal
                </Link>
                <Link
                  href="/solutions/b2b-client-intake-engine"
                  className="hover:text-teal-400 transition-colors"
                >
                  B2B Intake Engine
                </Link>
              </div>
            </footer>
          </div>
        </section>
      </main>

      <MobileQuickContact />
    </div>
  );
}
