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
  Database,
  Layers,
  Users,
  Webhook,
  Server,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Lock,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/solutions/saas-subscription-consolidation";
const PAGE_TITLE =
  "SaaS Subscription Consolidation: Replace Per-Seat SaaS Bloat with a Single-Tenant Platform | DukaTrio";
const PAGE_DESCRIPTION =
  "Stop paying €1,000–€3,500/month for fragmented per-seat SaaS tools and Zapier glue. We engineer unified, single-tenant internal platforms in 10–14 days for €4,800 flat with €0 recurring seat fees.";

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
    question: "Which SaaS subscriptions and glue tools does a custom DukaTrio platform typically replace?",
    answer:
      "We routinely replace expensive per-seat combinations of Airtable, Retool, Monday.com, Notion workspaces, mid-tier CRM seat licenses, and brittle Zapier/Make webhook chains—consolidating your core job tracking, approvals, reporting, and invoicing into a single Next.js 16 + PostgreSQL system.",
  },
  {
    question: "What happens to the historical records stored inside our current SaaS tools?",
    answer:
      "We build deterministic CSV, XLSX, and REST API migration scripts as part of the €4,800 sprint. All historical customers, work orders, invoices, and activity logs are normalized and imported into your dedicated PostgreSQL database before cutover.",
  },
  {
    question: "Can our new platform still connect to accounting or payment tools we want to keep?",
    answer:
      "Yes. Instead of paying monthly per-task fees to Zapier or Make, we engineer native, signed REST webhooks and direct API integrations (Stripe, Xero, QuickBooks, ERP endpoints, SMTP/Telegram alerts) directly inside your server container.",
  },
  {
    question: "What is our total monthly cost after the €4,800 sprint is delivered?",
    answer:
      "Zero license fees. You own 100% of the source code, Docker configuration, and database. Your only ongoing cost is your private EU Hetzner Cloud VPS (~€15–€25/month) regardless of whether you have 10 users or 250 users.",
  },
] as const;

const DEFAULT_INQUIRY_MESSAGE =
  "[Solution Inquiry: SaaS Subscription Consolidation]\nTarget Scope: Consolidate multiple per-seat SaaS subscriptions and Zapier/Make glue into a unified single-tenant Next.js 16 + PostgreSQL platform (€4,800 flat milestone · 10–14 days delivery).\nCore Requirements: Unlimited user seats (€0/seat), historical data migration, role-based access control, and native webhook integrations.";

export default function SaasSubscriptionConsolidationPage(): React.JSX.Element {
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
        name: "SaaS Subscription Consolidation",
        item: PAGE_URL,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "B2B SaaS Subscription Consolidation & Custom Platform Engineering",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    serviceType: "Custom Internal Software Development",
    provider: {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/8 rounded-full blur-[130px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10">
        {/* HERO */}
        <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
                SaaS Subscription Consolidation
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-teal-500/30 text-teal-400 font-mono text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>10–14 Days Delivery</span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/50 border border-teal-400/40 text-teal-300 font-mono text-xs font-bold">
                    <span>€4,800 Flat · Eliminate Per-Seat SaaS Rent</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Replace 6 SaaS Subscriptions &amp; Zapier Glue with{" "}
                  <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                    One Sovereign Platform.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Stop paying €50–€95 per seat every month across disconnected cloud tools just to use 15% of their features. We consolidate your workflows into a single-tenant Next.js 16 &amp; PostgreSQL platform that you own 100%.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <SolutionCtaButton
                    label="Scope Your SaaS Consolidation (€4,800)"
                    scope="Excel-to-Custom Portal"
                    message={DEFAULT_INQUIRY_MESSAGE}
                    variant="primary"
                  />
                  <Link
                    href="/?blueprint=saas-bloat#blueprint"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800/80 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <span>Open Interactive SaaS-Bloat Blueprint</span>
                    <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#0D121F] border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                      36-MONTH COST DELTA
                    </span>
                    <span className="text-xs font-mono text-slate-400">25 TEAM SEATS</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-900/40 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-rose-400 font-bold">
                        BEFORE // FRAGMENTED SAAS STACK (€1,450/MO)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Airtable/Retool per-seat tiers + CRM licenses + Zapier task overages = €52,200 burned over 36 months with zero IP ownership.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-teal-400 font-bold">
                        AFTER // DUKATRIO UNIFIED ENGINE (€4,800 ONCE)
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        One custom Next.js 16 + PostgreSQL platform on your private EU VPS (~€18/mo). Unlimited internal &amp; partner logins forever.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">3.4 mo</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Payback Period
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-white">€46k+</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        3-Yr Savings
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">€0/seat</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        License Tax
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-24 sm:py-32 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>Consolidation Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                What We Engineer Into Your Unified Platform
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <Users className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Unlimited RBAC Seats</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Add 10 or 500 staff, contractors, and managers with granular role permissions and zero per-seat surcharges.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <Database className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Single Source of Truth</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Eliminate sync drift between CRM, Airtable, and billing sheets with one ACID PostgreSQL 17 schema.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <Webhook className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Native Webhook Engine</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Replace fragile Zapier/Make task limits with deterministic, type-safe background workers and REST hooks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <Server className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Dedicated EU VPS</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Deployed via Docker &amp; Caddy v2 on your own Hetzner server with automated encrypted backups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 sm:py-32 border-b border-slate-800/80 bg-[#0B0F19]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>SaaS Consolidation FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Common Questions on Replacing SaaS Bloat
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

        {/* CONTACT */}
        <section id="contact" className="py-24 sm:py-32 bg-[#0B0D13] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-teal-500/30 text-teal-400 font-mono text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>SOLUTION PRE-SELECTED: SAAS SUBSCRIPTION CONSOLIDATION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Audit Your Monthly SaaS Spend &amp; Consolidation Plan
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Tell us which SaaS tools and glue workflows you want to eliminate. We will reply within 4–12 business hours with a unified data schema and fixed €4,800 sprint plan.
              </p>
            </div>

            <ContactForm
              defaultTab="rfp"
              defaultScope="Excel-to-Custom Portal"
              defaultMessage={DEFAULT_INQUIRY_MESSAGE}
            />
          </div>
        </section>
      </main>

      <MobileQuickContact />
    </div>
  );
}
