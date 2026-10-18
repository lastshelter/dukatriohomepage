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
  WifiOff,
  Camera,
  RefreshCw,
  Server,
  Layers,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Lock,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/solutions/offline-field-operations-pwa";
const PAGE_TITLE =
  "Offline-First Field Operations & Ticket Management PWAs | DukaTrio";
const PAGE_DESCRIPTION =
  "Replace paper slips and disconnected field apps with a resilient, offline-first mobile PWA. Direct camera OCR, local storage persistence, and zero monthly SaaS tax.";

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
    question: "How does the PWA function when field crews have zero cellular or Wi-Fi connectivity?",
    answer:
      "We engineer a Service Worker and IndexedDB persistence layer directly into the mobile browser. Field operators can open work orders, capture photos, scan delivery tickets, and record digital signatures inside deep basements, tunnels, or remote jobsites. The moment connectivity returns, the background sync queue deterministically flushes queued mutations to the central server.",
  },
  {
    question: "How do we migrate historical field logs, site directories, and equipment lists?",
    answer:
      "During days 1–4 of the sprint, we ingest your existing CSV/Excel equipment lists, subcontractor directories, and active project codes into PostgreSQL/PocketBase. When field crews install the PWA onto their iOS or Android home screen, their active site catalogs pre-cache locally in seconds.",
  },
  {
    question: "How is device-level and server-level security enforced across field smartphones?",
    answer:
      "All field sessions are protected by short-lived JWT tokens with instant remote revocation if a worker's phone is lost. Photos and OCR receipts are cryptographically hashed with GPS/timestamp metadata and transmitted over TLS 1.3 to your private single-tenant EU Hetzner VPS.",
  },
  {
    question: "Do we have to pay Apple App Store fees or monthly per-driver SaaS licenses?",
    answer:
      "Zero. Because Progressive Web Apps install directly from a secure URL onto any iOS or Android device, you bypass 30% App Store taxes and approval delays. You pay a single €4,800 engineering milestone with €0 ongoing per-user fees, regardless of how many drivers, foremen, or subcontractors you onboard.",
  },
] as const;

const DEFAULT_INQUIRY_MESSAGE =
  "[Solution Inquiry: Offline Field Operations PWA]\nTarget Scope: Resilient offline-first mobile PWA for field operations & ticket management (€4,800 flat milestone · 10–14 days delivery).\nCore Requirements: IndexedDB offline queuing, direct camera receipt/ticket OCR, automatic background sync on reconnect, and unlimited field seats.";

export default function OfflineFieldOperationsPwaPage(): React.JSX.Element {
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
        name: "Offline Field Operations PWA",
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
        name: "Offline-First Field Operations & Ticket Management PWA Engineering",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        serviceType: "Offline-First Mobile PWA Development",
        category: "Field Operations Software Engineering",
        provider: {
          "@type": "Organization",
          name: "DukaTrio",
          url: "https://dukatrio.com",
        },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          name: "Fixed-Milestone Offline Field PWA Sprint",
          price: "4800",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: PAGE_URL,
          description:
            "Fixed €4,800 10–14 day engineering sprint delivering an offline-first mobile PWA with camera OCR, IndexedDB queuing, 100% code ownership, and €0 per-seat fees.",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#software`,
        name: "DukaTrio Offline-First Field Operations PWA",
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
                Offline Field Operations PWA
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
                    <span>€4,800 Flat Milestone · Unlimited Field Seats</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Offline-First Field Operations &amp;{" "}
                  <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    Ticket Management PWAs.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Replace lost paper delivery slips and fragile cellular-dependent apps with a battle-tested, offline-first mobile PWA. Engineered with IndexedDB local queuing, direct camera receipt OCR, and automatic sync on reconnect.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <SolutionCtaButton
                    label="Scope Your Field PWA (€4,800)"
                    scope="Offline Field Operations PWA"
                    message={DEFAULT_INQUIRY_MESSAGE}
                    variant="primary"
                  />
                  <Link
                    href="/#case-studies"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800/80 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <span>See Gradilište OS Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  </Link>
                </div>
              </div>

              {/* Hero Right: Field Telemetry Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#0D121F] border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                      FIELD TELEMETRY ARCHITECTURE
                    </span>
                    <span className="text-xs font-mono text-slate-400">INDEXEDDB + OCR</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-900/40 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-rose-400 font-bold">
                        BEFORE // PAPER TICKETS &amp; WHATSAPP PHOTOS
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Damaged paper dockets, unindexed WhatsApp receipt photos, dead-zone app crashes, and 2-week invoice billing delays.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-teal-400 font-bold">
                        AFTER // RESILIENT OFFLINE-FIRST PWA
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Zero-signal local persistence, instant camera ticket OCR extraction, GPS timestamp verification, and automatic headquarters ledger sync.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">100%</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Offline Capable
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-white">-80%</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Admin Overhead
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">€0/mo</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Per-Driver Fee
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
                How Paper Tickets &amp; Fragile Field Apps Bleed Operational Margin
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Construction, logistics, and field service teams lose thousands of euros monthly when field data capture relies on paper slips or cloud-only mobile apps:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                    01 // DISPUTED &amp; LOST DOCKETS
                  </span>
                  <span className="text-xl font-mono font-black text-white">4–7% Leakage</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Unbilled Deliveries &amp; Missing Signatures
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Lost paper delivery slips, illegible handwriting, and unverified drop-offs directly delay client invoicing and result in unrecoverable material disputes.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    02 // BACK-OFFICE RE-KEYING LATENCY
                  </span>
                  <span className="text-xl font-mono font-black text-white">18+ hrs/wk</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Manual Transcription from Photos to ERP
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Back-office coordinators waste days transcribing crumpled ticket photos from messaging groups into accounting sheets, introducing transcription errors on quantities and batch codes.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                    03 // FIELD SAAS SEAT PENALTIES
                  </span>
                  <span className="text-xl font-mono font-black text-white">€65+ / driver</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Punitive Per-Technician Licensing
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Commercial field management SaaS platforms charge per active technician or subcontractor, penalizing seasonal crew scaling while still failing in zero-signal environments.
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
                Built for Zero-Signal Durability &amp; Instant Field Capture
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Every field PWA is engineered for gloved one-handed operation, sunlight readability, and deterministic offline persistence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <WifiOff className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  IndexedDB Offline Queuing
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Full local database persistence inside the mobile browser. Crews log tickets, photos, and signatures with zero cellular reception and zero data loss.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Direct Camera Receipt &amp; Ticket OCR
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Hardware-accelerated camera capture extracts supplier names, batch volumes, and docket numbers automatically, attaching compressed evidence to the record.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Idempotent Sync on Reconnect
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Automatic background synchronization resolves offline queues with conflict-free idempotency keys the second 4G/5G or Wi-Fi is restored.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  PocketBase &amp; PostgreSQL Core
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Centralized relational ledger with real-time WebSocket dispatch feeds so headquarters sees field completions the instant they sync.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Next.js &amp; High-Contrast Tailwind UI
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Installable iOS/Android home-screen PWA with oversized tap targets, high-luminance outdoor contrast, and instant sub-100ms view transitions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Docker &amp; Dedicated Hetzner VPS
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Single-tenant container deployment on EU bare-metal/NVMe storage for high-volume image retention, automated backups, and 100% IP ownership.
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
                    100% Offline
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    IndexedDB Jobsite Queue &amp; Auto-Sync
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                    -80% Overhead
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Instant Concrete &amp; Material OCR
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-teal-400">
                    €0 Recurring Fees
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Unlimited Foremen &amp; Site Operators
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                    FLAGSHIP CASE STUDY // GRADILIŠTE OS (LIVE PRODUCTION PWA)
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    How Gradilište OS Digitized Jobsite Delivery Tickets &amp; Offline Concrete Tracking
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Explore our flagship offline-first field operations PWA built for heavy construction sites—featuring direct camera delivery-slip OCR, local IndexedDB persistence, and real-time headquarters cost reconciliation.
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
                    href="https://gradiliste.dukatrio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-semibold transition-all"
                  >
                    <span>Inspect Live Gradilište PWA</span>
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
                <span>Offline Sync, Security &amp; Licensing FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Field Operations PWA Questions
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
                <span>SOLUTION PRE-SELECTED: OFFLINE FIELD OPERATIONS PWA</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Book Your 15-Minute Field Operations Audit
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Tell us about your field tickets, delivery slips, or inspection checklists. We will design your offline-first PWA architecture and fixed €4,800 milestone plan within 4 business hours.
              </p>
            </div>

            <ContactForm
              defaultTab="rfp"
              defaultScope="Offline Field Operations PWA"
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
                  className="text-teal-400 font-semibold"
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
