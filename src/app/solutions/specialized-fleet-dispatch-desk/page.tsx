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
  Truck,
  Server,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  Calendar,
  Send,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/solutions/specialized-fleet-dispatch-desk";
const PAGE_TITLE =
  "Specialized Heavy Equipment & Fleet Dispatch Desk | DukaTrio";
const PAGE_DESCRIPTION =
  "Replace whiteboards and fragile spreadsheets with a real-time dispatch desk for crane hire, concrete pumpers, earthmoving fleets, and specialized transport. Fixed €4,800 – €6,500 milestone.";

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
    question: "What types of heavy equipment fleets is this dispatch desk optimized for?",
    answer:
      "The system is purpose-built for specialized industrial fleets where machines require licensed operators, specialized permits, and precise utilization tracking: mobile and tower cranes, concrete boom pumpers, heavy excavators, vacuum trucks, and lowboy heavy haulage transport.",
  },
  {
    question: "How does the dispatch timeline prevent double-booking machines or certified operators?",
    answer:
      "The visual Gantt dispatch matrix enforces strict relational integrity constraints in PostgreSQL. If a dispatcher attempts to schedule an 80-tonne crane or certified operator while already booked or scheduled for mandatory hydraulic maintenance, the system triggers an instant collision guardrail with suggested alternatives.",
  },
  {
    question: "How are driver briefs and job cards dispatched via WhatsApp or SMS?",
    answer:
      "With a single click on the dispatch timeline, the system renders a clean, mobile-optimized job card and sends it via WhatsApp Business API or SMS. The operator receives GPS pin coordinates, site contact names, required crane boom configuration, and a mandatory pre-trip safety inspection checklist.",
  },
  {
    question: "How does the algorithmic quoting kernel calculate travel, tonnage, and permit fees?",
    answer:
      "Instead of senior dispatchers calculating quotes from memory, the TypeScript pricing kernel dynamically computes round-trip base mobilization travel distance, hourly machine tonnage tiers, operator hazard rates, and municipal oversize escort permits into a binding PDF customer proposal in under 30 seconds.",
  },
  {
    question: "What is the delivery timeline and server infrastructure model?",
    answer:
      "Delivered within 14–21 days for a transparent flat milestone of €4,800 – €6,500. Deployed to a private single-tenant Hetzner Cloud VPS running Next.js 16 and PostgreSQL with automated TLS. You own 100% of the source code with zero ongoing per-seat or per-vehicle SaaS subscription fees.",
  },
] as const;

const DEFAULT_INQUIRY_MESSAGE =
  "[Solution Inquiry: Specialized Fleet & Dispatch Desk]\nTarget Scope: Real-time heavy equipment dispatch console and automated quoting engine (€4,800 – €6,500 flat milestone · 14–21 days delivery).\nCore Requirements: Visual machine Gantt timeline, 30-second algorithmic quoting, driver WhatsApp job cards, and single-tenant Hetzner cloud.";

export default function SpecializedFleetDispatchDeskPage(): React.JSX.Element {
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
        name: "Specialized Fleet & Dispatch Desk",
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
        name: "Specialized Heavy Equipment & Fleet Dispatch Desk Engineering",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        serviceType: "Operational Fleet & Dispatch Software Engineering",
        category: "Industrial Equipment & Logistics Technology",
        provider: {
          "@type": "Organization",
          name: "DukaTrio",
          url: "https://dukatrio.com",
        },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          name: "Fixed-Milestone Fleet Dispatch Desk Sprint",
          price: "4800",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: PAGE_URL,
          description:
            "Fixed €4,800 – €6,500 14–21 day engineering sprint delivering a real-time fleet dispatch console, automated quoting kernel, driver mobile cards, and zero per-seat SaaS taxes.",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#software`,
        name: "DukaTrio Heavy Fleet Dispatch Console",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
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
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-100px] w-[500px] h-[400px] bg-indigo-500/8 rounded-full blur-[150px] pointer-events-none" />

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
              <span className="text-cyan-400 font-semibold" aria-current="page">
                Specialized Fleet &amp; Dispatch Desk
              </span>
            </nav>

            {/* Hero Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>14–21 Days Delivery</span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
                    <span>€4,800 – €6,500 Flat Milestone · Unlimited Fleet Seats</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    SPECIALIZED HEAVY EQUIPMENT &amp; FLEET DISPATCH ENGINE
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                    Replace Whiteboards and Fragile Spreadsheets with a{" "}
                    <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                      Real-Time Dispatch Desk.
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  A dedicated operational console for crane hire, concrete pumpers, earthmoving fleets, and specialized transport. Real-time machine allocation, 30-second automated quoting, and operator dispatch.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <SolutionCtaButton
                    scope="Specialized Fleet & Dispatch Desk"
                    label="Scope Fleet Dispatch Desk"
                    message={DEFAULT_INQUIRY_MESSAGE}
                  />
                  <a
                    href="#capabilities"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/50 text-slate-200 hover:text-white font-semibold text-sm transition-all"
                  >
                    <span>Explore Fleet Modules</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Live Metric Cards Strip */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight font-mono">
                    30s
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Instant Quoting
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Automated rate cards factoring travel, tonnage &amp; operators.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight font-mono">
                    100%
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Utilization Visibility
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Visual Gantt matrix with real-time machine &amp; crew status.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                    €0/mo
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    SaaS Seat Rent
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Replaces €1,200/mo fragmented dispatch SaaS subscriptions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-2">
                  <div className="text-3xl sm:text-4xl font-black text-indigo-400 tracking-tight font-mono">
                    WhatsApp
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Driver Dispatch
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    1-click digital job briefs sent directly to operator phones.
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
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                DISPATCH OPERATIONAL COMPARISON
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                From Chaotic Whiteboards to High-Precision Fleet Scheduling
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Managing specialized heavy equipment requires instant answers to machine availability, road permits, and certified operator schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* BEFORE */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0D121F] border border-rose-900/40 space-y-6 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-300 font-mono text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>BEFORE // WHITEBOARDS, SPREADSHEETS &amp; PHONE CALLS</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Machine Double-Bookings &amp; Memory-Based Quoting
                  </h3>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>Schedule Collisions:</strong> High-value mobile cranes or concrete pumpers accidentally double-booked, forcing emergency third-party hires.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>Memory-Based Rate Quoting:</strong> Dispatchers quote customer rates on the fly without properly adding boom extension extras or road permit fees.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>Single-Point-of-Failure:</strong> When the chief dispatcher is sick or on vacation, junior staff cannot decipher handwritten whiteboard codes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span><strong>Lost Maintenance Windows:</strong> Hydraulic inspection and annual certification dates missed, risking costly jobsite shutdowns and fines.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs font-mono text-rose-300">
                  Total Impact: Lost dispatch mandates &bull; Costly emergency equipment rentals &bull; Dispatcher burnout
                </div>
              </div>

              {/* AFTER */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0D121F] border border-cyan-500/40 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-cyan-500/5">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AFTER // DUKATRIO SPECIALIZED FLEET CONSOLE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Unified Gantt Dispatch Matrix with WhatsApp Operator Push
                  </h3>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <span><strong>Visual Multi-Fleet Timeline:</strong> Live color-coded machine Gantt chart (In Transit, On Site, In Shop, Standby) with drag-and-drop allocation.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <span><strong>Collision Guardrails:</strong> System strictly blocks conflicting bookings and flags operator license expirations or machine service dates.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <span><strong>30s Algorithmic Quoting Kernel:</strong> Instant PDF customer proposals factoring machine tonnage, operator rate, transport distance, and permit fees.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <span><strong>1-Click Driver WhatsApp Briefs:</strong> Operators receive exact location pins, client site phone numbers, and digital safety checklists directly on their phone.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  Total Impact: 100% equipment utilization clarity &bull; Sub-minute client proposals &bull; €0 monthly SaaS fees
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE TECHNICAL CAPABILITIES */}
        <section id="capabilities" className="py-20 sm:py-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">
                SYSTEM CAPABILITIES &amp; MODULES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Designed for High-Tonnage Fleet Operations
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Built on high-performance Next.js 16 and PostgreSQL, engineered for zero downtime and sub-50ms dispatch interaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-cyan-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    01 // VISUAL MULTI-FLEET TIMELINE
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Live Drag-and-Drop Machine &amp; Operator Matrix
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Real-time timeline displaying all fleet assets: cranes, pumpers, transport rigs, and operators. Color-coded status badges, multi-day project lockouts, and automated maintenance blackout dates.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-teal-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-800/60 flex items-center justify-center text-teal-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-400">
                    02 // ALGORITHMIC JOB QUOTING KERNEL
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Sub-30s Binding Vector PDF Proposals
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Automated rate matrix that prices jobs by machine tonnage, mobilization travel mileage, estimated pumping cubic meters, overtime premiums, and municipal permit surcharges with one-click customer email delivery.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-indigo-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                  <Send className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                    03 // DRIVER &amp; OPERATOR MOBILE BRIEFS
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Direct WhatsApp &amp; SMS Dispatch Cards
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Operators do not need to install complex corporate software. Push dispatch job sheets directly to their phones with one click: site contact name, GPS coordinates, arrival window, and digital signature sign-off.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0D121F] border border-slate-800/80 space-y-4 hover:border-emerald-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Server className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    04 // SINGLE-TENANT PRIVATE CLOUD
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Hetzner VPS Isolation &amp; Zero Per-Vehicle SaaS Taxes
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Deployed to an isolated Linux virtual private server in Germany. Your fleet schedules, customer pricing matrices, and driver records are 100% private. Zero monthly per-truck or per-dispatcher subscription taxes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 sm:py-28 border-b border-slate-800/80 bg-[#07090E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                TECHNICAL &amp; COMMERCIAL FAQ
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Frequently Asked Dispatch Engineering Questions
              </h2>
            </div>

            <div className="space-y-6">
              {SOLUTION_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>14–21 DAY SPRINT // €4,800 – €6,500 FIXED MILESTONE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to Upgrade Your Heavy Fleet Dispatch Desk?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
                Schedule a 15-minute operational audit. We review your current machine roster and dispatch workflows, delivering your bespoke dispatch console in under 3 weeks.
              </p>
            </div>

            <div className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-10 shadow-2xl">
              <ContactForm defaultMessage={DEFAULT_INQUIRY_MESSAGE} defaultScope="Specialized Fleet & Dispatch Desk" />
            </div>
          </div>
        </section>
      </main>

      <MobileQuickContact />
    </div>
  );
}
