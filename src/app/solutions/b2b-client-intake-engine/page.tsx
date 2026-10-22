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
  Cpu,
  FileCheck2,
  Lock,
  Server,
  Layers,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/solutions/b2b-client-intake-engine";
const PAGE_TITLE =
  "Bespoke B2B Client Intake & Underwriting Engines | DukaTrio";
const PAGE_DESCRIPTION =
  "Accelerate underwriting decisioning from days to under 60 seconds. Custom qualification engines, algorithmic risk modeling, and secure client vaults.";

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
    question: "How do you isolate sensitive borrower, KYC, and financial documents?",
    answer:
      "Your intake engine and document vault run on a dedicated single-tenant EU Hetzner VPS—never on shared multi-tenant SaaS databases. Uploaded financial statements and KYC files are encrypted at rest (AES-256), validated for MIME/magic-byte integrity, and accessible only via signed, short-lived URLs restricted to authorized underwriters.",
  },
  {
    question: "Can you translate our existing Excel underwriting models into the sub-60-second engine?",
    answer:
      "Yes. We port your exact DSCR, LTV, debt-yield, or risk-scoring formulas from Excel into deterministic TypeScript/Node.js calculation modules with 100% unit-test coverage. Prospects receive instant pre-qualification terms while your credit committee receives a complete, auditable risk breakdown.",
  },
  {
    question: "How do we migrate historical deals and connect our existing CRM or email notifications?",
    answer:
      "We import your historical deal pipeline via validated CSV/JSON migrations and wire real-time webhook and SMTP notifications (Brevo, Slack, HubSpot, or custom REST webhooks) so your deal desk is alerted the second a qualified application clears the underwriting thresholds.",
  },
  {
    question: "Are there ongoing licensing fees or per-application volume charges after launch?",
    answer:
      "Zero. You pay a fixed €4,800 milestone fee for the 10–14 day engineering sprint and own 100% of the source code, underwriting engine, and Docker deployment. You never pay per-application fees, revenue share, or per-seat CRM taxes.",
  },
] as const;

const DEFAULT_INQUIRY_MESSAGE =
  "[Solution Inquiry: B2B Client Intake & Underwriting Engine]\nTarget Scope: Bespoke qualification engine, algorithmic risk modeling, and encrypted KYC client vault (€4,800 flat milestone · 10–14 days delivery).\nCore Requirements: Sub-60-second decisioning, secure document ingestion, and single-tenant VPS data isolation.";

export default function B2BClientIntakeEnginePage(): React.JSX.Element {
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
        name: "B2B Client Intake Engine",
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
        name: "Bespoke B2B Client Intake & Underwriting Engine Development",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        serviceType: "Custom B2B Intake & Algorithmic Underwriting Software",
        category: "Fintech & B2B Software Engineering",
        provider: {
          "@type": "Organization",
          name: "DukaTrio",
          url: "https://dukatrio.com",
        },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          name: "Fixed-Milestone B2B Intake Engine Sprint",
          price: "4800",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: PAGE_URL,
          description:
            "Fixed €4,800 10–14 day engineering sprint delivering a bespoke B2B client intake, algorithmic underwriting engine, and encrypted KYC vault with 100% source code ownership.",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#software`,
        name: "DukaTrio B2B Client Intake & Underwriting Engine",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        applicationCategory: "FinanceApplication",
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
                B2B Client Intake Engine
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
                    <span>€4,800 Flat Milestone · 100% IP Ownership</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Bespoke B2B Client Intake &amp;{" "}
                  <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    Underwriting Engines.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Accelerate underwriting decisioning from days to under 60 seconds. We engineer custom multi-step qualification portals, algorithmic DSCR &amp; risk modeling engines, and encrypted KYC client vaults isolated on your own private VPS.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <SolutionCtaButton
                    label="Scope Your Intake Engine (€4,800)"
                    scope="B2B Client Intake Engine"
                    message={DEFAULT_INQUIRY_MESSAGE}
                    variant="primary"
                  />
                  <Link
                    href="/#case-studies"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800/80 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <span>See Funding Desk Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  </Link>
                </div>
              </div>

              {/* Hero Right: Underwriting Telemetry Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#0D121F] border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                      DECISIONING ARCHITECTURE
                    </span>
                    <span className="text-xs font-mono text-slate-400">ALGORITHMIC RISK ENGINE</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-900/40 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-rose-400 font-bold">
                        BEFORE // STATIC PDF FORMS &amp; EMAIL THREADS
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        72-hour manual underwriting turnaround, unencrypted email attachments, high borrower drop-off, and analysts buried in unqualified leads.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-teal-400 font-bold">
                        AFTER // SUB-60S QUALIFICATION TERMINAL
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Real-time DSCR/LTV computation, instant term-sheet generation, encrypted KYC document vault, and automated deal-desk routing.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">&lt; 60s</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Decisioning
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-white">+310%</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Lead Conversion
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">€0/mo</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        SaaS Volume Tax
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
                Why Manual Intake &amp; Slow Underwriting Lose High-Value B2B Deals
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                In commercial lending, advisory, and B2B underwriting, speed-to-term-sheet determines who wins the mandate. Legacy intake workflows silently erode pipeline value:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                    01 // DEAL ATTRITION FROM LATENCY
                  </span>
                  <span className="text-xl font-mono font-black text-white">62% Drop-Off</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  72-Hour Turnaround Loses Top Borrowers
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  High-intent B2B applicants abandon static PDF applications or sign with faster competitors while waiting days for an analyst to manually run preliminary numbers.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    02 // ANALYST BOTTLENECKS
                  </span>
                  <span className="text-xl font-mono font-black text-white">20+ hrs/wk</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Manual Qualification of Unqualified Leads
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Senior underwriters spend over half their week chasing missing tax returns and manually keying ratios for prospects that should have been filtered algorithmically in 10 seconds.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                    03 // ENTERPRISE FINTECH SAAS RENT
                  </span>
                  <span className="text-xl font-mono font-black text-white">€1,200+ / mo</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Bloated Loan Origination &amp; Portal Subscriptions
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Off-the-shelf portal and LOS vendors lock you into €15,000+/year contracts plus per-seat and per-loan fees while storing your proprietary client book on third-party servers.
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
                Institutional-Grade Decisioning &amp; Private Vault Infrastructure
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Designed for capital markets, commercial brokerages, insurance underwriters, and specialized B2B service firms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Sub-60s Algorithmic Underwriting
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Deterministic server-side execution of DSCR, LTV, NOI, debt-service, and custom scoring matrices—delivering instant indicative term sheets.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Encrypted KYC &amp; Document Vault
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Multi-file drag-and-drop ingestion for P&amp;Ls, balance sheets, and IDs with checklist status tracking, automated reminders, and role-gated analyst review.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Strict Private VPS Data Isolation
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Zero third-party SaaS data sharing. Your entire applicant database and document store reside on your own dedicated, encrypted EU Hetzner cloud server.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  PocketBase &amp; PostgreSQL Deal Ledger
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  ACID-compliant relational storage with full audit logs, state-machine pipeline tracking, and instant CSV/PDF dossier export for credit committees.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Next.js &amp; High-Trust Tailwind UI
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Institutional-grade multi-step intake flows with real-time slider feedback, auto-saved draft states, and sub-100ms step transitions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Docker &amp; Dedicated Hetzner Cloud
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Containerized production deployment with TLS 1.3, rate-limited API endpoints, automated off-site backups, and 100% source code ownership.
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
                    &lt; 60s Decisioning
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Automated DSCR &amp; LTV Structuring
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                    +310% Conversion
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Qualified Borrower Pipeline Growth
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-teal-400">
                    €0 Recurring Fees
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Single-Tenant Private Cloud Deployment
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                    FLAGSHIP CASE STUDY // FUNDING DESK CAPITAL TERMINAL
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    How Funding Desk Replaced 72-Hour Manual Reviews with a Sub-60-Second Underwriting Terminal
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Inspect our live production commercial capital intake and algorithmic DSCR underwriting engine—engineered to pre-qualify borrowers, model risk tiers in real time, and route verified dossiers directly to senior underwriters.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/#case-studies"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>View Case Study on Homepage</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://fundingdesk.dukatrio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-semibold transition-all"
                  >
                    <span>Launch Live Terminal</span>
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
                <span>Data Isolation, Risk Modeling &amp; Licensing FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                B2B Intake &amp; Underwriting Engine Questions
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
                <span>SOLUTION PRE-SELECTED: B2B CLIENT INTAKE ENGINE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Book Your 15-Minute Underwriting Architecture Audit
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Outline your current qualification criteria, intake documents, or scoring rules. Our lead systems engineer will map out your custom decisioning engine and fixed €4,800 milestone plan within 4 business hours.
              </p>
            </div>

            <ContactForm
              defaultTab="rfp"
              defaultScope="B2B Client Intake Engine"
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
                  className="hover:text-teal-400 transition-colors"
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
                  className="text-teal-400 font-semibold"
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
