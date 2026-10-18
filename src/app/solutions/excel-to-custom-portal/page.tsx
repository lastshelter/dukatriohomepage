import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/ContactForm";
import MobileQuickContact from "@/components/layout/MobileQuickContact";
import SolutionCtaButton from "@/components/solutions/SolutionCtaButton";
import {
  ChevronRight,
  Clock,
  ShieldCheck,
  Database,
  FileSpreadsheet,
  Users,
  History,
  Server,
  Layers,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Lock,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/solutions/excel-to-custom-portal";
const PAGE_TITLE =
  "Replace Broken Business Spreadsheets with a Custom Internal Portal | DukaTrio";
const PAGE_DESCRIPTION =
  "Eliminate formula errors and version chaos. We engineer single-tenant, role-gated internal web portals that replace fragile Excel operations for €4,800 flat.";

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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const SOLUTION_FAQS = [
  {
    question: "How do you migrate our existing Excel or Google Sheets data without downtime?",
    answer:
      "We build a deterministic CSV and XLSX ingestion pipeline mapped directly to your historical columns. Before cutover, we run automated schema validation to clean malformed rows, deduplicate records, and import 100% of your legacy data into an ACID-compliant PostgreSQL or PocketBase database over a single weekend.",
  },
  {
    question: "How is sensitive operational and financial data secured compared to shared spreadsheets?",
    answer:
      "Unlike shared spreadsheet links where any editor can copy the entire workbook or accidentally overwrite a VLOOKUP, your portal enforces strict Role-Based Access Control (RBAC). Field staff, analysts, and executives only see the exact rows and actions permitted by their role, backed by an immutable audit trail logging every mutation with user ID, timestamp, and before/after diffs.",
  },
  {
    question: "Are there any recurring per-seat licensing fees after the €4,800 build?",
    answer:
      "Zero. You pay a flat €4,800 milestone fee for the complete 10–14 day engineering sprint and receive 100% source code and Docker container ownership. Whether you onboard 5 users or 250 users, your only ongoing cost is your raw Hetzner EU cloud VPS (~€15–€25/month).",
  },
  {
    question: "Can our team still export reports to Excel or CSV when needed for external accounting?",
    answer:
      "Yes. We engineer one-click filtered CSV/XLSX and PDF export endpoints directly into your portal views, giving your finance and compliance teams clean, pre-formatted spreadsheets on demand without ever exposing the master database to manual formula corruption.",
  },
] as const;

const DEFAULT_INQUIRY_MESSAGE =
  "[Solution Inquiry: Excel-to-Custom Portal]\nTarget Scope: Single-tenant internal web portal replacing fragile business spreadsheets (€4,800 flat milestone · 10–14 days delivery).\nCore Requirements: Role-based access control, multi-user concurrency, instant CSV/XLSX ingestion, and automated audit trails.";

export default function ExcelToCustomPortalPage(): React.JSX.Element {
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
        name: "Solutions",
        item: "https://dukatrio.com/#solutions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Excel-to-Custom Portal",
        item: PAGE_URL,
      },
    ],
  };

  const serviceAndSoftwareSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Excel-to-Custom Internal Portal Engineering",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        serviceType: "Custom B2B Internal Portal Development",
        category: "Enterprise Software Engineering",
        provider: {
          "@type": "Organization",
          name: "DukaTrio",
          url: "https://dukatrio.com",
        },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          name: "Fixed-Milestone Internal Portal Sprint",
          price: "4800",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: PAGE_URL,
          description:
            "Fixed €4,800 10–14 day engineering sprint delivering a single-tenant internal web portal with 100% source code ownership and €0 recurring per-seat fees.",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#software`,
        name: "DukaTrio Single-Tenant Internal Operations Portal",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, macOS, Windows, iOS, Android",
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
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SOLUTION_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="relative min-h-screen bg-[#0B0D13] text-zinc-100 overflow-hidden font-sans pb-16 md:pb-0">
      {/* Structured Data JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAndSoftwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Ambient Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/8 rounded-full blur-[130px] pointer-events-none" />

      {/* 1. NAVBAR */}
      <Navbar />

      <main className="relative z-10">
        {/* 2. BREADCRUMB + HERO SECTION */}
        <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/" className="hover:text-teal-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/#solutions" className="hover:text-teal-400 transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-teal-400 font-semibold" aria-current="page">
                Excel-to-Custom Portal
              </span>
            </nav>

            {/* Hero Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-teal-500/30 text-teal-400 font-mono text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>10–14 Days Delivery</span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/50 border border-teal-400/40 text-teal-300 font-mono text-xs font-bold">
                    <span>€4,800 Flat Milestone · €0/Seat Tax</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Replace Broken Business Spreadsheets with a{" "}
                  <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    Custom Internal Portal.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Eliminate broken <code className="text-teal-300 font-mono text-sm">VLOOKUP</code> formulas, conflicting file versions, and zero-permission chaos. We engineer single-tenant, role-gated web portals with instant CSV ingestion, real-time multi-user concurrency, and immutable audit trails.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <SolutionCtaButton
                    label="Scope Your Portal Migration (€4,800)"
                    scope="Excel-to-Custom Portal"
                    message={DEFAULT_INQUIRY_MESSAGE}
                    variant="primary"
                  />
                  <Link
                    href="/#case-studies"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800/80 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <span>Inspect Live Production Builds</span>
                    <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  </Link>
                </div>
              </div>

              {/* Hero Right: Concrete Telemetry Comparison Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#0D121F] border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                      OPERATIONAL TRANSFORMATION
                    </span>
                    <span className="text-xs font-mono text-slate-400">SINGLE-TENANT VPS</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-900/40 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-rose-400 font-bold">
                        BEFORE // FRAGILE SPREADSHEET OPS
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        12+ conflicting <code className="text-slate-300">_FINAL_v4.xlsx</code> files, silent formula overwrites, zero row-level permissions, and 4-second freezes above 15,000 rows.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-teal-400 font-bold">
                        AFTER // DUKATRIO INTERNAL PORTAL
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        ACID-compliant PostgreSQL/PocketBase persistence, strict RBAC permissions, instant bulk CSV ingestion, and full mutation audit history.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">100%</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Code Ownership
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-white">&lt;50ms</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Query Latency
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">€0/mo</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Per-Seat Tax
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE HIDDEN COST OF INACTION */}
        <section className="py-24 sm:py-32 border-b border-slate-800/80 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-800/50 text-rose-300 font-mono text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>The Hidden Cost of Inaction</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                What Staying on Fragile Spreadsheets Actually Costs Your Business
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Spreadsheets are built for ad-hoc modeling, not multi-user production operations. Every month you delay migration compounds operational leakage across three vectors:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                    01 // WASTED RECONCILIATION HOURS
                  </span>
                  <span className="text-xl font-mono font-black text-white">14+ hrs/wk</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Manual Copy-Paste &amp; Version Merging
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Operations managers spend over 700 hours annually reconciling conflicting spreadsheet tabs across departments instead of executing high-margin decisions.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    02 // SILENT FORMULA CORRUPTION
                  </span>
                  <span className="text-xl font-mono font-black text-white">88% Error Rate</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Unvalidated Inputs &amp; Broken Referential Integrity
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A single accidental cell paste or shifted column silently corrupts pricing, inventory, or payout calculations with zero automated validation or rollback log.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                    03 // PER-SEAT SAAS TAX CREEP
                  </span>
                  <span className="text-xl font-mono font-black text-white">€30,000+ / 3yr</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Punitive No-Code &amp; Per-User Licensing
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Off-the-shelf ERPs and no-code tools charge €45–€90/user/month and lock you into proprietary schemas. A 20-person team burns over €32,000 in 36 months with zero asset equity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ARCHITECTURE & CORE CAPABILITIES GRID */}
        <section className="py-24 sm:py-32 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>Architecture &amp; Core Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineered for Multi-User Concurrency, Speed, and Total Control
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                We replace fragile workbooks with a production-grade stack tailored to your exact operational workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Instant CSV &amp; XLSX Ingestion Engine
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Drag-and-drop legacy spreadsheets with automatic Zod schema validation, duplicate detection, and instant relational normalization.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Multi-User Concurrency &amp; RBAC
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Simultaneous editing across dozens of operators without file locks. Granular role permissions control who can view, edit, approve, or export records.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <History className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Automated Immutable Audit Trails
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every create, update, and status transition is cryptographically timestamped with user identity and full JSON diff history for compliance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  PocketBase &amp; PostgreSQL Persistence
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Strict foreign-key integrity, indexed sub-50ms filtering across millions of rows, and real-time SSE/WebSocket state synchronization.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Next.js &amp; High-Comfort Tailwind UI
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Keyboard-navigable data grids, instant command palettes, and ergonomic dark/light operational views built with Next.js App Router and Tailwind CSS.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Docker &amp; Single-Tenant Hetzner VPS
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Deployed in an isolated Docker environment on dedicated EU Hetzner NVMe servers with automated nightly encrypted backups and full SSH handover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. EMBEDDED CASE STUDY TEASER */}
        <section className="py-24 sm:py-32 border-b border-slate-800/80 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#0D121F] border border-slate-800/80 p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-800/80">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-teal-400">
                    -80% Overhead
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Manual Spreadsheet Reconciliation Eliminated
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                    100% Auditability
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Role-Gated Multi-Site Ledger
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-teal-400">
                    €0 Recurring Fees
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Unlimited Internal Operator Seats
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                    PRODUCTION CASE STUDY // GRADILIŠTE OS &amp; ENTERPRISE LEDGER
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    How We Replaced Fragmented Dispatch &amp; Material Spreadsheets with a Unified Operational Portal
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    See how DukaTrio consolidated disconnected Excel tracking sheets into a real-time, role-gated operational platform with automated reconciliation and instant executive reporting.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/#case-studies"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>View Full Case Study on Homepage</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://gradiliste.dukatrio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-semibold transition-all"
                  >
                    <span>Launch Live Production App</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. DEDICATED FAQ SECTION */}
        <section className="py-24 sm:py-32 border-b border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Security, Migration &amp; Licensing FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Spreadsheet-to-Portal Migration Questions
              </h2>
            </div>

            <div className="space-y-4">
              {SOLUTION_FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 sm:p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2.5"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FOCUSED CTA BLOCK & PRE-SELECTED CONTACT DESK */}
        <section id="contact" className="py-24 sm:py-32 bg-[#0B0F19] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-teal-500/30 text-teal-400 font-mono text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>SOLUTION PRE-SELECTED: EXCEL-TO-CUSTOM PORTAL</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Book Your 15-Minute Spreadsheet Migration Audit
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Send us a sanitized sample or description of your current spreadsheet workflow. Our lead systems architect will map out your database schema and fixed €4,800 delivery plan within 4 business hours.
              </p>
            </div>

            <ContactForm
              defaultTab="rfp"
              defaultScope="Excel-to-Custom Portal"
              defaultMessage={DEFAULT_INQUIRY_MESSAGE}
            />

            {/* Contextual Solutions Footer */}
            <footer className="pt-12 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>&copy; 2026 DukaTrio Engineering Studio · 100% IP Handover</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
                <Link
                  href="/solutions/excel-to-custom-portal"
                  className="text-teal-400 font-semibold"
                >
                  Excel-to-Portal
                </Link>
                <Link
                  href="/solutions/offline-field-operations-pwa"
                  className="hover:text-teal-400 transition-colors"
                >
                  Offline Field PWA
                </Link>
                <Link
                  href="/solutions/b2b-client-intake-engine"
                  className="hover:text-teal-400 transition-colors"
                >
                  B2B Intake Engine
                </Link>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact Desk
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
