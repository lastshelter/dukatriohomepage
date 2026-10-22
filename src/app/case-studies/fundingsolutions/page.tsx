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
  FileText,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Lock,
  Layers,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/case-studies/fundingsolutions";
const PAGE_TITLE =
  "FundingSolutions Case Study: Sub-60s Commercial DSCR Underwriting & KYC Vault | DukaTrio";
const PAGE_DESCRIPTION =
  "Deep-dive architectural case study of FundingSolutions: how a Next.js 16 decisioning terminal, deterministic TypeScript DSCR calculation kernel, programmatic PDF term-sheet engine, and single-tenant PostgreSQL KYC vault cut underwriting turnaround from 72 hours to under 60 seconds.";

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

const DSCR_KERNEL_SNIPPET = `export interface UnderwritingInput {
  grossAnnualRevenueEur: number;
  operatingExpensesEur: number;
  existingAnnualDebtServiceEur: number;
  proposedPrincipalEur: number;
  annualRateBps: number; // e.g., 725 = 7.25%
  termMonths: number;
}

export function evaluateDealKernel(input: UnderwritingInput) {
  const netOperatingIncome = input.grossAnnualRevenueEur - input.operatingExpensesEur;
  const monthlyRate = input.annualRateBps / 10_000 / 12;
  const monthlyPayment =
    (input.proposedPrincipalEur * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -input.termMonths));
  const totalAnnualDebtService =
    input.existingAnnualDebtServiceEur + monthlyPayment * 12;
  const dscr = Number((netOperatingIncome / totalAnnualDebtService).toFixed(2));
  const tier = dscr >= 1.25 ? "PRIME_QUALIFIED" : dscr >= 1.05 ? "BORDERLINE" : "SUBPRIME";
  return { netOperatingIncome, totalAnnualDebtService, dscr, tier };
}`;

const DEFAULT_INQUIRY_MESSAGE =
  "[Case Study Inquiry: FundingSolutions / B2B Client Intake & Underwriting Engine]\nTarget Architecture: Next.js 16 + TypeScript DSCR Decisioning Kernel + PostgreSQL 17 + AES-256 KYC Document Vault.\nCore Scope: Guided borrower/client intake, real-time financial scoring, programmatic PDF term-sheet generation, and single-tenant EU VPS deployment (€4,800 fixed milestone).";

export default function FundingSolutionsCaseStudyPage(): React.JSX.Element {
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline:
      "FundingSolutions: Sub-60s Commercial Debt Underwriting & KYC Vault on a Single-Tenant Stack",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    datePublished: "2026-10-19",
    dateModified: "2026-10-20",
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
        name: "FundingSolutions",
        item: PAGE_URL,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FundingSolutions Decisioning Terminal",
    url: "https://fundingsolutions.dukatrio.com",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, macOS, Windows, iOS, Android",
    description:
      "Commercial capital intake and algorithmic DSCR underwriting engine with one-click indicative PDF term sheet generation and AES-256 encrypted KYC storage.",
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

      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/8 rounded-full blur-[130px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10">
        {/* HEADER & METRICS */}
        <header className="pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
                FundingSolutions Terminal
              </span>
            </nav>

            <div className="space-y-6 max-w-4xl">
              <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                <div className="space-y-0.5">
                  <div className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <span>PRODUCTION UPGRADE: BFS HARVEST DEPLOYED</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    This fintech platform has been expanded and deployed into production as <strong>BFS Harvest</strong> (SvelteKit 2 + Hetzner Cloud VPS).
                  </p>
                </div>
                <Link
                  href="/case-studies/bfs-harvest"
                  className="px-3.5 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                >
                  <span>View BFS Harvest Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-teal-500/30 text-teal-400 font-bold">
                  FINTECH ARCHITECTURAL CASE STUDY
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-slate-300">
                  Next.js 16 + TypeScript DSCR Kernel
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-slate-300">
                  PostgreSQL 17 + AES-256 Vault
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                FundingSolutions: Sub-60s Commercial Underwriting &amp;{" "}
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  Programmatic Term Sheets.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                How we replaced fragile 40MB underwriting workbooks and unencrypted email document threads with a deterministic DSCR decisioning kernel, one-click PDF term-sheet generation, and a single-tenant AES-256 KYC vault on a dedicated EU VPS.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://fundingsolutions.dukatrio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg"
                >
                  <span>Launch Live Terminal (fundingsolutions.dukatrio.com)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/solutions/b2b-client-intake-engine"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800 text-slate-200 font-mono text-xs font-semibold transition-all"
                >
                  <span>View €4,800 Intake &amp; Underwriting Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                </Link>
              </div>
            </div>

            {/* Verified Telemetry Box */}
            <div className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-800 font-mono text-xs">
                <span className="text-teal-400 font-bold uppercase tracking-widest">
                  VERIFIED PRODUCTION TELEMETRY // UNDERWRITING ENGINE
                </span>
                <span className="text-slate-400">
                  Domain: Commercial Debt &amp; Capital Advisory · 100% Client IP Ownership
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">
                    &lt; 60s
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    First-Pass Stress Decisioning
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Compressed borrower qualification and indicative term-sheet issuance from 48–72 hours down to sub-minute execution.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    €14M+
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Structured Deal Pipeline
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Commercial credit, MCA consolidation, and equipment financing scenarios evaluated through the typed calculation kernel.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">
                    €0/seat
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Commercial Lending SaaS Tax
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Replaced €8,400+/year per-seat lending CRM subscriptions with a sovereign single-tenant PostgreSQL deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* BODY WITH STICKY TOC */}
        <section className="py-16 sm:py-24 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Sticky Sidebar */}
              <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
                <div className="rounded-2xl bg-[#0D121F] border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400 font-bold border-b border-slate-800 pb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Architecture Index</span>
                  </div>
                  <nav aria-label="Table of contents" className="space-y-2 text-xs font-mono">
                    <a
                      href="#bottleneck"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      01. The Underwriting Bottleneck
                    </a>
                    <a
                      href="#dscr-kernel"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      02. Deterministic DSCR Kernel
                    </a>
                    <a
                      href="#pdf-engine"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      03. Programmatic PDF Term Sheets
                    </a>
                    <a
                      href="#kyc-vault"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      04. AES-256 KYC Document Vault
                    </a>
                    <a
                      href="#roi-outcome"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      05. 36-Month Financial Payoff
                    </a>
                  </nav>
                </div>

                <div className="rounded-2xl bg-[#0D121F] border border-slate-800 p-5 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 uppercase font-bold">
                    Production Stack
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">App Layer:</span>
                      <span className="text-teal-400">Next.js 16</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Kernel:</span>
                      <span className="text-white">TypeScript Strict</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Database:</span>
                      <span className="text-teal-400">PostgreSQL 17</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">ORM:</span>
                      <span className="text-white">Prisma + Zod</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">KYC Storage:</span>
                      <span className="text-teal-400">AES-256-GCM</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Edge / Host:</span>
                      <span className="text-white">Caddy v2 · Hetzner</span>
                    </li>
                  </ul>
                </div>
              </aside>

              {/* Main Content */}
              <article className="lg:col-span-9 space-y-16">
                {/* 01. Bottleneck */}
                <section id="bottleneck" className="scroll-mt-24 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-800/50 text-rose-300 font-mono text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>SECTION 01 // THE UNDERWRITING BOTTLENECK</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    1. Why Manual Spreadsheet Underwriting Loses High-Intent Borrowers
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    In commercial capital advisory and private credit, speed-to-term-sheet determines who wins the mandate. When borrowers submit financials via email and wait 72 hours while analysts manually copy numbers into a 40MB Excel workbook, <strong className="text-white">62% of prime borrowers drop off or sign with a faster competitor</strong>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-2.5">
                      <div className="text-xs font-mono font-bold text-rose-400 uppercase">
                        1.1 72-Hour Latency
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Manual Cash-Flow Spreading
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Senior underwriters spent hours normalizing gross revenue, operating expenses, and existing MCA/debt obligations before knowing if a deal even cleared the 1.25x DSCR threshold.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-2.5">
                      <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                        1.2 Unencrypted Email KYC
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Compliance &amp; GDPR Exposure
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Bank statements, tax filings, and corporate IDs circulated across unencrypted email chains with zero audit trail of who accessed or downloaded sensitive files.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-2.5">
                      <div className="text-xs font-mono font-bold text-teal-400 uppercase">
                        1.3 Punitive FinTech SaaS Rent
                      </div>
                      <h3 className="text-base font-bold text-white">
                        €700+/Mo Per-Seat Platforms
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Commercial lending portals charge steep per-originator seat fees and lock proprietary underwriting logic inside rigid third-party workflows.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 02. DSCR Kernel */}
                <section id="dscr-kernel" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-teal-400 font-mono text-xs font-semibold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>SECTION 02 // DETERMINISTIC DSCR KERNEL</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    2. Sub-Millisecond DSCR, Debt-Yield &amp; Amortization Kernel
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    We extracted every fragile Excel macro and financial formula into a unit-tested, strictly typed TypeScript computation kernel. As borrowers or brokers adjust revenue, debt service, or facility size, the engine computes <strong className="text-white">Net Operating Income (NOI), Debt Service Coverage Ratio (DSCR), maximum loan capacity, and risk-tier classification</strong> in real time.
                  </p>

                  <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs font-mono text-teal-300 leading-relaxed">
                    <code>{DSCR_KERNEL_SNIPPET}</code>
                  </pre>
                </section>

                {/* 03. PDF Term Sheet & 04. KYC Vault */}
                <section id="pdf-engine" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase">
                        <FileText className="w-4 h-4" />
                        <span>03 // PROGRAMMATIC PDF TERM SHEETS</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        One-Click Indicative Term Sheet Generation
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Once a deal clears the qualification threshold, the terminal renders a branded, timestamped <strong className="text-slate-200">Indicative Term Sheet PDF</strong> complete with facility tranche structure, DSCR covenant summary, monthly debt service schedule, and required closing checklist—ready for executive sign-off in one click.
                      </p>
                    </div>

                    <div id="kyc-vault" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase">
                        <ShieldCheck className="w-4 h-4" />
                        <span>04 // AES-256 SINGLE-TENANT KYC VAULT</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Zero Third-Party Cloud Exposure
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Uploaded bank statements and tax returns are encrypted at rest with <strong className="text-slate-200">AES-256-GCM</strong> on the client&apos;s dedicated Hetzner EU VPS. Every document view and download issues a short-lived signed token and writes an immutable entry to the PostgreSQL compliance ledger.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 05. Verifiable ROI */}
                <section id="roi-outcome" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-teal-400 font-mono text-xs font-semibold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>SECTION 05 // VERIFIABLE ROI</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    5. €4,800 Fixed Sprint vs. €28,800 Commercial Lending SaaS
                  </h2>

                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-950/30 via-[#0D121F] to-[#0D121F] border border-teal-500/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl">
                      <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                        DEPLOY THIS ARCHITECTURE IN 10–14 DAYS
                      </div>
                      <h3 className="text-2xl font-extrabold text-white">
                        Need an Algorithmic Intake, Scoring, or Quote Portal?
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        We engineer and hand over your complete single-tenant intake engine, calculation kernel, and encrypted document vault for a flat €4,800 milestone.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                      <SolutionCtaButton
                        label="Scope This Blueprint (€4,800)"
                        scope="B2B Client Intake Engine"
                        message={DEFAULT_INQUIRY_MESSAGE}
                        variant="primary"
                      />
                    </div>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 sm:py-32 bg-[#0B0F19] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-teal-500/30 text-teal-400 font-mono text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>CASE STUDY BLUEPRINT: FUNDINGSOLUTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Architect Your Custom Intake &amp; Decisioning Engine
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Connect directly with our lead systems engineer to map your underwriting or pricing formulas into a single-tenant web platform.
              </p>
            </div>

            <ContactForm
              defaultTab="rfp"
              defaultScope="B2B Client Intake Engine"
              defaultMessage={DEFAULT_INQUIRY_MESSAGE}
            />
          </div>
        </section>
      </main>

      <MobileQuickContact />
    </div>
  );
}
