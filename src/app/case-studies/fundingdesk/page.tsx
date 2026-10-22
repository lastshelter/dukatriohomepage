import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/ContactForm";
import MobileQuickContact from "@/components/layout/MobileQuickContact";
import SolutionCtaButton from "@/components/solutions/SolutionCtaButton";
import DscrTerminalDemo from "@/components/sandbox/DscrTerminalDemo";
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
  Server,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/case-studies/fundingdesk";
const PAGE_TITLE =
  "Funding Desk // Institutional Capital Intake & Underwriting Suite | DukaTrio";
const PAGE_DESCRIPTION =
  "Deep-dive architectural case study of Funding Desk: how a bespoke SvelteKit 2 fintech platform, TypeScript algorithmic DSCR decisioning kernel, programmatic PDF term-sheet engine, and single-tenant Hetzner VPS cut debt underwriting from 72 hours to under 60 seconds.";

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

const DSCR_KERNEL_SNIPPET = `// src/lib/server/financialKernel.ts
export interface UnderwritingInput {
  grossAnnualRevenueEur: number;
  operatingExpensesEur: number;
  existingAnnualDebtServiceEur: number;
  proposedPrincipalEur: number;
  annualRateBps: number; // e.g., 725 = 7.25%
  termMonths: number;
}

export interface UnderwritingResult {
  netOperatingIncome: number;
  monthlyDebtService: number;
  totalAnnualDebtService: number;
  dscr: number;
  stressDscr: number;
  tier: "PRIME_QUALIFIED" | "BORDERLINE" | "SUBPRIME";
  maxBorrowingCapacityEur: number;
}

export function evaluateDealKernel(input: UnderwritingInput): UnderwritingResult {
  const netOperatingIncome = input.grossAnnualRevenueEur - input.operatingExpensesEur;
  const monthlyRate = input.annualRateBps / 10_000 / 12;
  const monthlyPayment =
    (input.proposedPrincipalEur * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -input.termMonths));
  
  const totalAnnualDebtService =
    input.existingAnnualDebtServiceEur + monthlyPayment * 12;
    
  const dscr = Number((netOperatingIncome / totalAnnualDebtService).toFixed(2));
  // 15% stress haircut on Net Operating Income for downside resilience
  const stressDscr = Number(((netOperatingIncome * 0.85) / totalAnnualDebtService).toFixed(2));
  
  const tier = dscr >= 1.25 ? "PRIME_QUALIFIED" : dscr >= 1.05 ? "BORDERLINE" : "SUBPRIME";
  // Maximum debt capacity clearance at 1.25x prime threshold
  const maxAnnualDebtAllowance = netOperatingIncome / 1.25;
  const maxBorrowingCapacityEur = Math.max(0, (maxAnnualDebtAllowance - input.existingAnnualDebtServiceEur) / 12 / monthlyRate);

  return { 
    netOperatingIncome, 
    monthlyDebtService: Math.round(monthlyPayment), 
    totalAnnualDebtService: Math.round(totalAnnualDebtService), 
    dscr, 
    stressDscr, 
    tier,
    maxBorrowingCapacityEur: Math.round(maxBorrowingCapacityEur)
  };
}`;

const DEFAULT_INQUIRY_MESSAGE =
  "[Case Study Inquiry: Funding Desk / B2B Fintech & Underwriting Engine]\nTarget Architecture: SvelteKit 2 + TypeScript Financial Kernel + PostgreSQL/SQLite WAL + AES-256 KYC Vault + Hetzner VPS.\nCore Scope: Real-time borrower qualification, automated PDF term-sheet generation, single-tenant data isolation, and €0 recurring per-seat fees (€4,800 – €14,000 fixed milestone).";

export default function FundingDeskCaseStudyPage(): React.JSX.Element {
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline:
      "Funding Desk: Sub-60s Commercial Debt Underwriting & KYC Vault on SvelteKit and Hetzner VPS",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    datePublished: "2026-10-22",
    dateModified: "2026-10-22",
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
        name: "Funding Desk",
        item: PAGE_URL,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Funding Desk Fintech Platform",
    url: "https://fundingdesk.dukatrio.com",
    applicationCategory: "FintechApplication",
    operatingSystem: "Web, macOS, Windows, Linux, iOS, Android",
    description:
      "Enterprise commercial capital intake, real-time DSCR calculation kernel, programmatic PDF term-sheet generator, and AES-256 encrypted KYC vault running on sovereign Hetzner Linux infrastructure.",
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
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-120px] w-[500px] h-[400px] bg-cyan-500/8 rounded-full blur-[150px] pointer-events-none" />

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
                Funding Desk Platform
              </span>
            </nav>

            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-teal-500/40 text-teal-300 font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(20,184,166,0.2)]">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>PRODUCTION FINTECH CASE STUDY</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-slate-300 font-semibold">
                  SvelteKit 2 + TypeScript Kernel
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-slate-300 font-semibold">
                  PostgreSQL / SQLite WAL + AES-256 Vault
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800 text-teal-400 font-semibold">
                  Hetzner VPS · Caddy v2
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                Funding Desk: Sub-60s Underwriting, Algorithmic DSCR &amp;{" "}
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  Sovereign Hetzner VPS.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                How we engineered and deployed a high-speed commercial debt syndication terminal: replacing 40MB spreadsheet spreadsheets and unencrypted email threads with a deterministic TypeScript financial calculation kernel, instant PDF term-sheet generation, and single-tenant AES-256 KYC vaults running on a dedicated Linux VPS.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://fundingdesk.dukatrio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg"
                >
                  <span>Explore Live Terminal (fundingdesk.dukatrio.com)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/solutions/b2b-client-intake-engine"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800 text-slate-200 font-mono text-xs font-semibold transition-all"
                >
                  <span>View €4,800 Intake Engine Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                </Link>
              </div>
            </div>

            {/* Verified Telemetry Box */}
            <div className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-800 font-mono text-xs">
                <span className="text-teal-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span>VERIFIED PRODUCTION TELEMETRY // FUNDING DESK DEPLOYMENT</span>
                </span>
                <span className="text-slate-400">
                  Target: Commercial Debt &amp; Capital Advisory · 100% Client IP Ownership
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 font-mono">
                <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">
                    &lt; 60s
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Deal Decisioning
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Compressed borrower qualification and term-sheet generation from 72 hours to sub-minute execution.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    €14M+
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Structured Pipeline
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Commercial loans, MCA debt consolidation, and working capital lines handled through the calculation engine.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">
                    €0/seat
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Recurring SaaS Tax
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Eliminated €8,400+/year per-user fees from commercial lending platforms with single-tenant data isolation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                    &lt; €15/mo
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Hetzner VPS Footprint
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Single-tenant Ubuntu 24.04 LTS instance with Caddy TLS, automated SQLite WAL/Postgres snapshots, and zero overhead.
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
                      href="#interactive-demo"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      04. Interactive In-Browser Sandbox
                    </a>
                    <a
                      href="#kyc-vault"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      05. AES-256 KYC Vault &amp; Hetzner VPS
                    </a>
                    <a
                      href="#roi-outcome"
                      className="block py-1.5 text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      06. 36-Month Financial Payoff
                    </a>
                  </nav>
                </div>

                <div className="rounded-2xl bg-[#0D121F] border border-slate-800 p-5 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 uppercase font-bold">
                    Production Stack
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Framework:</span>
                      <span className="text-teal-400 font-bold">SvelteKit 2</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Language:</span>
                      <span className="text-white">TypeScript Strict</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Database:</span>
                      <span className="text-teal-400">PostgreSQL / SQLite WAL</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Document Security:</span>
                      <span className="text-white">AES-256-GCM Vault</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Web Server:</span>
                      <span className="text-teal-400">Caddy v2 (Auto-TLS)</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Infrastructure:</span>
                      <span className="text-white">Hetzner Cloud VPS</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-gradient-to-b from-teal-950/30 to-[#0D121F] border border-teal-500/20 p-5 space-y-3 text-xs">
                  <div className="font-bold text-teal-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>Fixed-Scope Delivery</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Have an underwriting bottleneck, complex financial spreadsheet, or client intake delay? We deliver bespoke financial portals in 2–4 weeks.
                  </p>
                  <div className="pt-2">
                    <SolutionCtaButton
                      scope="B2B Client Intake Engine"
                      label="Scope Custom Fintech Terminal"
                      message={DEFAULT_INQUIRY_MESSAGE}
                    />
                  </div>
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
                    In commercial capital advisory, debt syndication, and private credit, <strong className="text-white">speed-to-term-sheet determines who wins the mandate</strong>. When commercial borrowers submit financials via email and wait 72 hours while credit analysts manually copy numbers into a 40MB Excel workbook, over 60% of prime borrowers drop off or sign with a faster private creditor.
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
                        Senior underwriters spent hours normalizing gross revenue, operating expenses, and existing MCA/debt obligations before knowing if a deal even cleared the standard 1.25x DSCR hurdle.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-2.5">
                      <div className="text-xs font-mono font-bold text-rose-400 uppercase">
                        1.2 Document Chaos
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Unencrypted Email PDF Threads
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Sensitive balance sheets, tax returns, and corporate bank statements circulated through unencrypted email inboxes, posing serious GDPR/KYC non-compliance risks and losing file provenance.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-2.5">
                      <div className="text-xs font-mono font-bold text-rose-400 uppercase">
                        1.3 Per-Seat Tax
                      </div>
                      <h3 className="text-base font-bold text-white">
                        €8,400/yr Commercial CRM Taxes
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Commercial lending CRMs charged up to €120/seat/month while locking confidential client deal flow inside third-party multi-tenant US cloud servers.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 02. DSCR Kernel */}
                <section id="dscr-kernel" className="scroll-mt-24 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/40 border border-teal-800/50 text-teal-300 font-mono text-xs font-semibold">
                    <Cpu className="w-3.5 h-3.5 text-teal-400" />
                    <span>SECTION 02 // SVELTEKIT &amp; DETERMINISTIC CALCULATION KERNEL</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    2. SvelteKit 2 &amp; Sub-50ms Algorithmic Ratio Evaluation
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    Rather than relying on asynchronous server round-trips for each ratio adjustment or relying on fragile client spreadsheets, we engineered a deterministic calculation kernel in strict TypeScript. Leveraging SvelteKit&apos;s lightweight reactive stores and server load functions, financial ratios (DSCR, Debt-to-Income, MCA consolidation payoff, and stress testing) calculate in less than 50 milliseconds directly in the browser with dual server verification.
                  </p>

                  <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 space-y-3 font-mono text-xs overflow-x-auto shadow-xl">
                    <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                      <span>src/lib/server/financialKernel.ts</span>
                      <span className="text-teal-400">TypeScript Strict · Deterministic</span>
                    </div>
                    <pre className="text-slate-300 leading-relaxed">
                      <code>{DSCR_KERNEL_SNIPPET}</code>
                    </pre>
                  </div>
                </section>

                {/* 03. PDF Engine */}
                <section id="pdf-engine" className="scroll-mt-24 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 font-mono text-xs font-semibold">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SECTION 03 // PROGRAMMATIC TERM SHEET &amp; INTAKE PIPELINE</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    3. One-Click Vector PDF Generation &amp; Automated Loan Sizing
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    Once a borrower’s financial inputs clear the threshold, the system immediately binds the deal metadata to an in-memory vector PDF generator. Without requiring heavy Chromium/Puppeteer subprocesses that consume hundreds of megabytes of RAM, the platform renders professional, branded, bank-ready indicative term sheets in under 300 milliseconds.
                  </p>

                  <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400" />
                      <span>Term Sheet Automation Breakdown</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-400 font-mono">▸</span>
                        <span>Full amortization schedule table with monthly principal &amp; interest breakdown</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-400 font-mono">▸</span>
                        <span>15% stress test sensitivity matrix demonstrating downside cash coverage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-400 font-mono">▸</span>
                        <span>Cryptographic SHA-256 deal hash on the document footer for audit verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-400 font-mono">▸</span>
                        <span>Zero server-side browser dependencies — runs natively inside Node.js or edge workers</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* 04. Interactive Demo */}
                <section id="interactive-demo" className="scroll-mt-24 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/50 text-amber-300 font-mono text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>SECTION 04 // INTERACTIVE CALCULATION WORKBENCH</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    4. Try the Real Underwriting Calculation Kernel
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    Move the sliders below to test how the underwriting algorithm responds in real-time. Notice the instant ratio re-calculation, risk tier categorization, and sample term sheet output.
                  </p>

                  <div className="rounded-3xl border border-slate-800 bg-[#0D121F] p-6 sm:p-8 shadow-2xl">
                    <DscrTerminalDemo />
                  </div>
                </section>

                {/* 05. KYC Vault & Hetzner */}
                <section id="kyc-vault" className="scroll-mt-24 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 font-mono text-xs font-semibold">
                    <Server className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SECTION 05 // SINGLE-TENANT HETZNER VPS &amp; AES-256 VAULT</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    5. Sovereign European Infrastructure &amp; Zero-Trust Data Isolation
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    Financial advisory firms cannot afford to have borrower tax documents and financial statements stored on shared multi-tenant SaaS clouds where a misconfigured row-level security policy exposes competing deal data. Funding Desk was deployed directly to a sovereign <strong className="text-white">Hetzner Cloud VPS (Nuremberg / Falkenstein, Germany)</strong> running Ubuntu 24.04 LTS behind Caddy v2 with automated TLS encryption.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase">
                        <Lock className="w-4 h-4" />
                        <span>AES-256-GCM Storage</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        At-Rest Field &amp; File Encryption
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Every uploaded bank statement and balance sheet is encrypted with unique initialization vectors before being written to disk. Even with raw disk access, files cannot be decrypted without the host key.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase">
                        <Server className="w-4 h-4" />
                        <span>Sub-€15/Month Linux Pod</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Bare-Metal Efficiency
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        The entire SvelteKit runtime, PostgreSQL/SQLite WAL database, and Caddy reverse proxy comfortably consume less than 1.2GB of RAM, maintaining sub-15ms TTFB across Europe and North America at under €15/month total server cost.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 06. ROI Outcome */}
                <section id="roi-outcome" className="scroll-mt-24 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/40 border border-teal-800/50 text-teal-300 font-mono text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                    <span>SECTION 06 // 36-MONTH FINANCIAL PAYOFF</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    6. The Economics: Eliminating SaaS Seat Taxes &amp; Accelerating Mandates
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    By investing a fixed milestone of €4,800 – €9,500 into their own bespoke software platform, the advisory firm completely eliminated recurring SaaS subscription fees while simultaneously accelerating deal closing velocity.
                  </p>

                  <div className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">
                          Commercial Comparison: 3-Year TCO
                        </h3>
                        <div className="space-y-3 text-xs sm:text-sm">
                          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-slate-300">
                            <span className="font-bold text-rose-400 block mb-1">Commercial Lending SaaS (5 Seats)</span>
                            <span className="font-mono text-white text-lg">€25,200+</span> over 36 months in recurring subscription fees + setup taxes. Zero code ownership.
                          </div>
                          <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40 text-slate-300">
                            <span className="font-bold text-teal-300 block mb-1">Funding Desk Bespoke Platform</span>
                            <span className="font-mono text-white text-lg">€5,340 total</span> (Fixed build + €15/mo Hetzner VPS). 100% intellectual property ownership.
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-3">
                        <div className="text-sm font-mono text-teal-400 uppercase tracking-wider font-semibold">
                          Net 36-Month Savings
                        </div>
                        <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                          €19,860+
                        </div>
                        <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto">
                          Direct cash retained on balance sheet, plus immediate competitive advantage from sub-60s borrower term-sheet delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* BOTTOM CTA INQUIRY FORM */}
                <section className="pt-8 border-t border-slate-800 space-y-8">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-300 font-mono text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>DIRECT ARCHITECTURAL ENGAGEMENT</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      Ready to Build Your Bespoke Operational Platform?
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                      Whether you need to replace complex underwriting spreadsheets, eliminate SaaS seat taxes, or deploy a high-speed B2B intake terminal on your own private server: we deliver production-ready software in 2–4 weeks.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-10 shadow-2xl">
                    <ContactForm defaultMessage={DEFAULT_INQUIRY_MESSAGE} />
                  </div>
                </section>
              </article>
            </div>
          </div>
        </section>
      </main>

      <MobileQuickContact />
    </div>
  );
}
