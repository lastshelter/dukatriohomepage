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
  Camera,
  Server,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  FileSpreadsheet,
  ScanLine,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Lock,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/solutions/field-ticket-material-ocr";
const PAGE_TITLE =
  "Field Ticket & Material OCR Pipeline | DukaTrio";
const PAGE_DESCRIPTION =
  "Eliminate paper ticket leakage and automate month-end material invoicing with an offline-capable mobile OCR scanner connected to an automated billing office ledger. Fixed €4,800 sprint on private Hetzner VPS.";

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
    question: "How does the mobile OCR scanner handle crumpled, dirty, or low-light delivery tickets?",
    answer:
      "We utilize an on-device WebAssembly image preprocessing pipeline that automatically deskews, normalizes contrast, and crops edges before running multi-pass OCR. If the camera captures a blurry or heavily smeared slip, the interface prompts the foreman with an instant high-contrast visual crop while flagging the ticket for quick one-tap verification at the office.",
  },
  {
    question: "Does the scanner require constant cellular connectivity on remote job sites or basements?",
    answer:
      "No. The mobile scanner is an offline-first PWA backed by an IndexedDB outbox queue. Foremen and truck drivers can snap dozens of tickets in remote quarries, concrete pits, and underground levels with zero bars of signal. As soon as the device reconnects to 4G/5G or site Wi-Fi, records automatically synchronize to your central server.",
  },
  {
    question: "How does automated Purchase Order matching and variance detection work?",
    answer:
      "The ingestion pipeline matches each scanned slip's job site code, supplier, and material grade against open POs in your PostgreSQL database. If cumulative delivered volume exceeds ordered quantity by >5%, or if an incorrect concrete compressive strength is detected, an automated variance alert flags the line item before payment release.",
  },
  {
    question: "Can we export verified ticket ledgers directly into QuickBooks, Xero, or custom ERPs?",
    answer:
      "Yes. The billing ledger provides one-click structured CSV/JSON exports formatted specifically for QuickBooks, Xero, Sage, or SAP, as well as direct webhook pushes to your accounting API. You eliminate the 40+ hours per month office staff spend manually keying paper slips.",
  },
  {
    question: "What is the delivery model and are there recurring per-seat software fees?",
    answer:
      "We deliver the complete custom OCR pipeline within 10–14 days for a fixed €4,800 milestone. You receive 100% intellectual property ownership, source code, and deployment to a sovereign Hetzner VPS (<€15/month). You pay €0 recurring per-seat fees forever.",
  },
] as const;

const DEFAULT_INQUIRY_MESSAGE =
  "[Solution Inquiry: Field Ticket & Material OCR Pipeline]\nTarget Scope: Mobile PWA OCR scanner and automated PO reconciliation ledger (€4,800 flat milestone · 10–14 days delivery).\nCore Requirements: On-device ticket scanning, IndexedDB offline durability, automated PO variance alerts, and 1-click accounting export.";

export default function FieldTicketMaterialOcrPage(): React.JSX.Element {
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
        name: "Field Ticket & Material OCR Pipeline",
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
        name: "Field Ticket & Delivery Slip OCR Pipeline Engineering",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        serviceType: "Operational Software & Computer Vision Pipeline",
        category: "Construction & Logistics Technology",
        provider: {
          "@type": "Organization",
          name: "DukaTrio",
          url: "https://dukatrio.com",
        },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          name: "Fixed-Milestone Field Ticket OCR Sprint",
          price: "4800",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: PAGE_URL,
          description:
            "Fixed €4,800 10–14 day engineering sprint delivering an offline-first mobile ticket OCR pipeline, PO reconciliation ledger, 100% code ownership, and €0 per-seat SaaS taxes.",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#software`,
        name: "DukaTrio Field Ticket & Material OCR Ingestion Pipeline",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "iOS, Android, Web",
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
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-100px] w-[500px] h-[400px] bg-teal-500/8 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10">
        {/* HERO SECTION */}
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
              <span className="text-amber-400 font-semibold" aria-current="page">
                Field Ticket &amp; Material OCR
              </span>
            </nav>

            {/* Hero Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>10–14 Days Delivery</span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/50 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
                    <span>€4,800 Flat Milestone · Unlimited Users</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    FIELD TICKET &amp; DELIVERY SLIP OCR INGESTION PIPELINE
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                    Eliminate Paper Ticket Leakage &amp;{" "}
                    <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-teal-300 bg-clip-text text-transparent">
                      Automate Month-End Invoicing.
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Replace lost delivery slips, unreadable truck cab receipts, and 40 hours of manual Excel typing with an offline-capable mobile OCR scanner connected to an automated billing office ledger.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <SolutionCtaButton
                    scope="Field Ticket & Material OCR Pipeline"
                    label="Scope Ticket OCR Sprint (€4,800)"
                    message={DEFAULT_INQUIRY_MESSAGE}
                  />
                  <Link
                    href="/case-studies/gradiliste-os"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-700/80 hover:border-amber-400/50 text-slate-200 hover:text-white font-semibold text-sm transition-all"
                  >
                    <span>Read Production Case Study</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                </div>
              </div>

              {/* Live Metric Cards Strip */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">
                    100%
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Ticket Recovery
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Zero lost carbon slips or unbilled materials across jobsites.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight font-mono">
                    85%
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Faster Invoicing
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Auto-reconciles materials against open POs in seconds.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                    €0/mo
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    Per-Seat Rent
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Unlimited field foremen, haulers, and office billing clerks.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight font-mono">
                    Offline
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Mobile Durability
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Captures slips in basements, quarries, and dead zones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STRUCTURAL BEFORE VS AFTER TRANSFORMATION */}
        <section className="py-20 sm:py-28 border-b border-slate-800/80 bg-[#07090E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                OPERATIONAL BOTTLENECK VS. ENGINEERED PIPELINE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                From Mud-Stained Paper Slips to Instant Digital Reconciliation
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Construction and bulk material logistics suffer when delivery validation relies on fragile physical slips. Here is the operational transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* BEFORE */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0D121F] border border-rose-900/40 space-y-6 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-300 font-mono text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>BEFORE // PAPER CLIPBOARDS &amp; MANUAL RECONCILIATION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Disputed Quantities &amp; 40-Hour Friday Data Entry
                  </h3>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>Lost Carbon Copies:</strong> Slips blown away by wind, damaged in rain, or crumpled in truck cabs, causing unbilled deliveries.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>Unreadable Handwriting:</strong> Office clerks guessing handwritten slump tests, aggregate volumes, or supplier batch codes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>30-Day Billing Delays:</strong> Invoices held up because three missing delivery dockets cannot be reconciled with site manager signatures.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>€10k+ Margin Leakage:</strong> Supplier over-billing or volume shortfalls slipping through undetected due to lack of real-time PO verification.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs font-mono text-rose-300">
                  Total Impact: 40+ hours/month clerical overhead &bull; Recurrent supplier disputes &bull; High unbilled revenue
                </div>
              </div>

              {/* AFTER */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0D121F] border border-amber-500/40 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-amber-500/5">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>AFTER // DUKATRIO OCR INGESTION ENGINE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Sub-3s Photo Ingestion with Automated PO Matching
                  </h3>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span><strong>On-Device Camera OCR:</strong> Foreman snaps ticket on site; edge OCR instantly extracts ticket number, supplier, material grade, and m³ volume.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span><strong>Automated PO Variance Checks:</strong> Real-time validation checks volume against purchase order tolerances; flags overages &gt;5% automatically.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span><strong>Zero-Signal IndexedDB Persistence:</strong> Photos and OCR records queue offline and flush deterministically the moment signal is detected.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span><strong>1-Click Accounting Sync:</strong> Verified material entries push to QuickBooks, Xero, or custom enterprise ERP CSV exports with 1 click.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-300">
                  Total Impact: Sub-60s month-end reconciliation &bull; 100% audit proofing &bull; €0/month recurring seat licensing
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE TECHNICAL CAPABILITIES */}
        <section className="py-20 sm:py-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">
                SYSTEM ARCHITECTURE &amp; CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineered for Dirty Boots &amp; Fast Accounting
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                A purpose-built operational pipeline combining mobile computer vision with strict database relational integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    01 // FIELD-OPTIMIZED MOBILE OCR
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Low-Light &amp; Skewed Angle WebAssembly Engine
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Runs directly inside mobile Safari and Chrome without native App Store app downloads. Features edge detection, auto-perspective rectification, contrast enhancement for smudged carbon prints, and offline local caching.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-teal-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-800/60 flex items-center justify-center text-teal-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-400">
                    02 // AUTOMATED PO MATCHING &amp; VARIANCE ALERTS
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Instant Tolerance &amp; Specification Guardrails
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Cross-references ticket items against open purchase orders. If delivered concrete class or gravel volume differs from contracted specifications or exceeds the 5% buffer, warning alerts flag the item before finance pays the invoice.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-cyan-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    03 // 1-CLICK ACCOUNTING &amp; ERP EXPORT
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Structured QuickBooks, Xero &amp; Custom CSV Feeds
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  No manual typing. Single-click batch export transforms hundreds of field tickets into validated journal entries mapped to exact cost codes, subcontractors, and job site billing categories.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-emerald-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Server className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    04 // SOVEREIGN EU HOSTING &amp; ZERO SEAT FEES
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Dedicated Hetzner VPS &amp; PostgreSQL 17
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Deployed to a private, dedicated Linux VPS in Nuremberg or Falkenstein, Germany. Automated TLS with Caddy v2, AES-256 encrypted ticket image storage, daily offsite snapshots, and 100% intellectual property handover upon delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 sm:py-28 border-b border-slate-800/80 bg-[#07090E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                TECHNICAL &amp; COMMERCIAL FAQ
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Everything You Need to Know Before Sponsoring a Sprint
              </h2>
            </div>

            <div className="space-y-6">
              {SOLUTION_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pl-6.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FIXED MILESTONE INQUIRY FORM */}
        <section id="contact" className="py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>10–14 DAY SPRINT // €4,800 FIXED MILESTONE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to Stop Paper Ticket Leakage on Your Job Sites?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
                Schedule a 15-minute technical audit. We inspect your existing ticket formats and deliver your custom mobile OCR pipeline in two weeks.
              </p>
            </div>

            <div className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-10 shadow-2xl">
              <ContactForm defaultMessage={DEFAULT_INQUIRY_MESSAGE} defaultScope="Field Ticket & Material OCR Pipeline" />
            </div>
          </div>
        </section>
      </main>

      <MobileQuickContact />
    </div>
  );
}
