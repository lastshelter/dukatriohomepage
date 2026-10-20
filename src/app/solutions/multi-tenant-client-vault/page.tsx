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
  KeyRound,
  FileLock2,
  History,
  Server,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Lock,
} from "lucide-react";

const PAGE_URL = "https://dukatrio.com/solutions/multi-tenant-client-vault";
const PAGE_TITLE =
  "Multi-Tenant Client Portal & AES-256 Document Vault Engineering | DukaTrio";
const PAGE_DESCRIPTION =
  "Replace insecure email attachments and generic cloud drives with a branded, single-tenant or multi-tenant client document vault. AES-256 encryption, strict tenant isolation, and immutable audit trails for €4,800 flat.";

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
    question: "How is client data isolated so Tenant A can never access Tenant B's documents?",
    answer:
      "Every database query and storage path is scoped at the middleware and ORM layer by an authenticated tenantId. Files are stored outside the public web root, encrypted at rest with AES-256-GCM, and streamed only via short-lived, cryptographically signed tokens after verifying the user's session and role.",
  },
  {
    question: "Can we invite unlimited external clients without paying per-user SaaS fees?",
    answer:
      "Yes. Unlike commercial client-portal SaaS tools that charge per active client seat or portal workspace, your DukaTrio vault runs on your own dedicated EU VPS with €0 per-seat or per-tenant licensing.",
  },
  {
    question: "Does the vault provide a compliance audit trail for GDPR and financial reviews?",
    answer:
      "Yes. Every login, file upload, document preview, download, and status change is recorded in an append-only PostgreSQL audit table capturing actor ID, tenant ID, IP address, SHA-256 file hash, and timestamp.",
  },
  {
    question: "Can the portal run on our own custom domain with our company branding?",
    answer:
      "100%. The entire portal is deployed under your domain (e.g., portal.yourcompany.com) with your brand identity, custom onboarding checklists, and automated transactional email notifications.",
  },
] as const;

const DEFAULT_INQUIRY_MESSAGE =
  "[Solution Inquiry: Multi-Tenant Client Portal & AES-256 Document Vault]\nTarget Scope: Branded B2B client portal with strict tenant isolation, AES-256-GCM encrypted document uploads, and append-only compliance audit logs (€4,800 flat milestone · 10–14 days delivery).";

export default function MultiTenantClientVaultPage(): React.JSX.Element {
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
        name: "Multi-Tenant Client Vault",
        item: PAGE_URL,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Multi-Tenant Client Portal & Encrypted Document Vault Engineering",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    serviceType: "Custom B2B Client Portal Development",
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
                Multi-Tenant Client Vault
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
                    <span>€4,800 Flat · AES-256 Sovereign Storage</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Branded Multi-Tenant Client Portals &amp;{" "}
                  <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    AES-256 Document Vaults.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Stop exchanging confidential KYC files, tax audits, and contracts over unencrypted email threads. We engineer zero-trust client portals with strict tenant isolation, SHA-256 integrity verification, and immutable compliance logs on your own EU VPS.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <SolutionCtaButton
                    label="Scope Your Client Vault (€4,800)"
                    scope="B2B Client Intake Engine"
                    message={DEFAULT_INQUIRY_MESSAGE}
                    variant="primary"
                  />
                  <Link
                    href="/?blueprint=client-portal#blueprint"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0D121F] hover:bg-slate-800/90 border border-slate-800/80 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <span>Inspect Client-Vault Schema &amp; Routes</span>
                    <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#0D121F] border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                      SECURITY &amp; COMPLIANCE POSTURE
                    </span>
                    <span className="text-xs font-mono text-slate-400">EU DATA RESIDENCY</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-900/40 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-rose-400 font-bold">
                        BEFORE // EMAIL ATTACHMENTS &amp; SHARED LINKS
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Sensitive PDFs scattered across inboxes, public Google Drive links without expiry, and zero visibility into which documents a client still owes.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-1.5">
                      <div className="text-xs font-mono uppercase text-teal-400 font-bold">
                        AFTER // DUKATRIO MULTI-TENANT VAULT
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Per-client isolated workspaces, structured document checklists, AES-256-GCM encryption at rest, and 60-second presigned download tokens.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">AES-256</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        At-Rest Cipher
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-white">100%</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Audit Logged
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-lg font-mono font-black text-teal-400">€0/client</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">
                        Portal Tax
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
                <span>Zero-Trust Vault Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Institutional Security Without Recurring SaaS Lock-In
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <KeyRound className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Strict Tenant Scoping</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Row-level tenant isolation ensures every client organization can only query and view its own files and status checklists.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <FileLock2 className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">AES-256-GCM Storage</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Uploaded documents are encrypted on disk with SHA-256 checksums and served exclusively via single-use signed URLs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <History className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Compliance Audit Ledger</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Immutable activity log recording every upload, review approval, download, and permission change for external auditors.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-3">
                <Server className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Sovereign EU Hosting</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Deployed on your dedicated Hetzner EU VPS behind Caddy v2 HTTP/3 TLS—zero third-party cloud sub-processors.
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
                <span>Client Vault &amp; Security FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Multi-Tenant Security &amp; Deployment Questions
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
                <span>SOLUTION PRE-SELECTED: MULTI-TENANT CLIENT VAULT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Architect Your Sovereign Client Portal &amp; Vault
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Describe your client onboarding and document exchange workflow. Our engineering desk will prepare a tailored database schema and fixed €4,800 delivery plan.
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
