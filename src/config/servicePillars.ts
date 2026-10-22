/**
 * Dukatrio 7 Flagship B2B Services & Solutions Catalogue — single source of truth.
 * Consumed by <ServicePillars /> (7-Card Interactive Bento Grid) and by the JSON-LD
 * OfferCatalog in app/layout.tsx so on-page copy and structured data stay synchronized.
 */

export type PillarId =
  | "intake-engines"
  | "field-pwas"
  | "roi-calculators"
  | "document-vaults"
  | "legacy-rebuilds"
  | "data-microtools"
  | "sovereign-vps";

export type PillarAccent = "cyan" | "indigo" | "emerald" | "amber";

export interface ServicePillar {
  id: PillarId;
  /** Display index, e.g. "01" */
  index: string;
  accent: PillarAccent;
  /** Responsive 12-column Bento grid span class */
  bentoSpan: string;
  title: string;
  /** One-line B2B positioning shown under the title */
  tagline: string;
  description: string;
  /** Technology pills */
  stack: string[];
  /** Concrete engineering deliverables */
  bullets: string[];
  /** Headline proof point */
  metric: { value: string; label: string };
  /** Optional deep-dive solution or benchmark link */
  solutionHref?: string;
  solutionLabel?: string;
  /** Plain-text description used in schema.org Service nodes */
  schemaDescription: string;
}

export const LIVE_TELEMETRY_BENCHMARKS = [
  {
    id: "ttfb",
    metric: "Sub-300ms TTFB",
    sublabel: "Edge-cached SSR & zero-bloat payloads",
    badge: "184ms AVG",
    accent: "cyan" as const,
  },
  {
    id: "lighthouse",
    metric: "100% Lighthouse Performance",
    sublabel: "Strict Core Web Vitals & CLS: 0 discipline",
    badge: "100 / 100",
    accent: "emerald" as const,
  },
  {
    id: "zero-saas-tax",
    metric: "Zero Recurring SaaS Seat Fees",
    sublabel: "Unlimited internal staff & external client logins",
    badge: "€0 / SEAT",
    accent: "indigo" as const,
  },
  {
    id: "dedicated-infra",
    metric: "Dedicated Infrastructure",
    sublabel: "Single-tenant EU Linux VPS & Caddy TLS 1.3",
    badge: "100% IP OWNED",
    accent: "amber" as const,
  },
] as const;

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "intake-engines",
    index: "01",
    accent: "cyan",
    bentoSpan: "col-span-12 lg:col-span-7",
    title: "Bespoke B2B Client Intake Engines",
    tagline: "Interactive sliders, multi-step qualification, zero SaaS seat tax.",
    description:
      "Replace rigid Typeform chains and manual PDF applications with deterministic multi-step onboarding engines. Real-time eligibility scoring, conditional branching, and automated CRM/PostgreSQL routing — without paying per-seat or per-response SaaS tolls.",
    stack: ["Next.js 16", "React 19", "Zod Validation", "State Machines", "Zero Seat Tax"],
    bullets: [
      "Interactive parameter sliders with real-time qualification scoring",
      "Conditional multi-step KYC/KYB logic with autosave & resume links",
      "Direct webhook & PostgreSQL persistence with zero per-submission fees",
    ],
    metric: { value: "< 60s", label: "Lead-to-qualification latency" },
    solutionHref: "/solutions/b2b-client-intake-engine",
    solutionLabel: "Intake Architecture",
    schemaDescription:
      "Bespoke B2B client intake engines featuring interactive sliders, multi-step qualification flows, deterministic scoring, and zero recurring SaaS seat fees.",
  },
  {
    id: "field-pwas",
    index: "02",
    accent: "emerald",
    bentoSpan: "col-span-12 lg:col-span-5",
    title: "Field Operations & Offline-First PWAs",
    tagline: "Gradilište OS architecture: real-time attendance, OCR ticket scanning, instant sync.",
    description:
      "Engineered for construction sites, logistics fleets, and remote crews operating on unreliable cellular links. Workers log attendance, scan delivery dockets via camera OCR, and queue mutations locally in IndexedDB with automatic conflict-free sync.",
    stack: ["Offline PWA", "IndexedDB Sync", "Vision OCR", "Service Workers", "EUR/RSD Ledger"],
    bullets: [
      "Zero-data-loss offline mutation queue with background reconnect sync",
      "Mobile camera OCR parsing paper delivery tickets into structured JSON",
      "GPS-stamped crew attendance & automated dual-currency payroll ledgers",
    ],
    metric: { value: "100%", label: "Offline jobsite reliability" },
    solutionHref: "/solutions/offline-field-operations-pwa",
    solutionLabel: "Field PWA Blueprint",
    schemaDescription:
      "Field operations and offline-first Progressive Web Apps (PWAs) built on Gradilište OS architecture with real-time attendance, OCR ticket scanning, and instant IndexedDB synchronization.",
  },
  {
    id: "roi-calculators",
    index: "03",
    accent: "indigo",
    bentoSpan: "col-span-12 lg:col-span-5",
    title: "Interactive Financial & ROI Calculators",
    tagline: "Live underwriting sliders, payment payoff visualizers, instant quote PDF exports.",
    description:
      "Turn passive B2B visitors into high-intent pipeline with institutional-grade financial modeling tools. Prospects manipulate live DSCR, amortization, or TCO sliders and export board-ready vector PDF term sheets on the spot.",
    stack: ["DSCR Engine", "Amortization Math", "Vector PDF Export", "Sub-ms Reactivity"],
    bullets: [
      "Real-time DSCR, loan-to-value, and 36-month TCO payoff curve visualizers",
      "Deterministic client-side calculation matrices with zero server lag",
      "One-click executive PDF brief & term-sheet generator with custom branding",
    ],
    metric: { value: "3.4×", label: "Higher B2B conversion lift" },
    solutionHref: "/case-studies/fundingdesk",
    solutionLabel: "Funding Desk Study",
    schemaDescription:
      "Interactive financial and ROI calculators with live underwriting sliders, payment payoff visualizers, and instant executive PDF quote exports.",
  },
  {
    id: "document-vaults",
    index: "04",
    accent: "cyan",
    bentoSpan: "col-span-12 lg:col-span-7",
    title: "Encrypted Document Drop Vaults",
    tagline: "Private, single-tenant, zero-knowledge client file pipelines.",
    description:
      "Eliminate insecure email attachments and expensive enterprise Box/DocSend subscriptions. Clients upload sensitive financial statements, contracts, and KYC dossiers through AES-256-GCM encrypted pipelines with strict row-level isolation and immutable audit logs.",
    stack: ["AES-256-GCM", "S3 / MinIO", "Presigned Streams", "PostgreSQL RLS", "Audit Trail"],
    bullets: [
      "Single-tenant isolated storage buckets with time-boxed presigned URLs",
      "Cryptographic SHA-256 file integrity hashing & virus/MIME verification",
      "Granular role-based access control (RBAC) with regulator-ready access logs",
    ],
    metric: { value: "AES-256", label: "Zero-knowledge vault isolation" },
    solutionHref: "/solutions/multi-tenant-client-vault",
    solutionLabel: "Vault Security Spec",
    schemaDescription:
      "Encrypted document drop vaults providing private, single-tenant, zero-knowledge client file pipelines with AES-256 encryption and immutable audit logs.",
  },
  {
    id: "legacy-rebuilds",
    index: "05",
    accent: "amber",
    bentoSpan: "col-span-12 lg:col-span-6",
    title: "Legacy Web Scraping & Instant Rebuilds",
    tagline: "Sub-300ms static/SSR delivery replacing slow WordPress/Wix sites.",
    description:
      "We programmatically extract your existing content, product catalogues, and SEO equity from bloated WordPress, Wix, or legacy PHP installations and re-architect them into hardened Next.js / Astro platforms that load in under 300ms.",
    stack: ["Automated Extraction", "Next.js SSR/SSG", "301 SEO Preservation", "Schema.org Graph"],
    bullets: [
      "Automated DOM/database scraping of legacy pages, media, and metadata",
      "Zero-JS static & hybrid SSR delivery eliminating plugin vulnerabilities",
      "1:1 canonical URL mapping and structured JSON-LD schema injection",
    ],
    metric: { value: "< 220ms", label: "Post-migration page load" },
    solutionHref: "/#benchmark",
    solutionLabel: "Compare Speed Benchmark",
    schemaDescription:
      "Legacy web scraping and instant rebuilds delivering sub-300ms static and SSR platforms that replace slow WordPress, Wix, and legacy PHP websites.",
  },
  {
    id: "data-microtools",
    index: "06",
    accent: "indigo",
    bentoSpan: "col-span-12 lg:col-span-6",
    title: "Automated Data Processing & Micro-Tools",
    tagline: "Messy Excel/CSV to clean relational databases and web workflows.",
    description:
      "Decommission fragile 40MB macro-spreadsheets and copy-paste bottlenecks. We build dedicated ingestion pipelines that parse, deduplicate, and normalize messy CSV/XLSX drops into ACID-compliant PostgreSQL tables with instant web dashboards.",
    stack: ["CSV/XLSX Parser", "PostgreSQL ACID", "Prisma ORM", "Background Workers", "REST/JSON"],
    bullets: [
      "Automated schema validation, fuzzy deduplication & error quarantine queues",
      "Concurrent multi-user web grids replacing locked shared spreadsheets",
      "Scheduled ERP/accounting exports & instant executive reporting views",
    ],
    metric: { value: "10,000+", label: "Rows normalized per second" },
    solutionHref: "/solutions/excel-to-custom-portal",
    solutionLabel: "Excel-to-Portal Spec",
    schemaDescription:
      "Automated data processing and custom micro-tools that transform messy Excel and CSV workflows into clean relational PostgreSQL databases and concurrent web applications.",
  },
  {
    id: "sovereign-vps",
    index: "07",
    accent: "emerald",
    bentoSpan: "col-span-12",
    title: "Sovereign Self-Hosted VPS Infrastructure",
    tagline: "Dedicated European cloud architecture, Caddy HTTPS, zero vendor lock-in.",
    description:
      "Own your runtime from bare metal up. We provision and harden dedicated European Linux VPS clusters (Hetzner / Frankfurt / Nuremberg) with Docker Compose isolation, Caddy automatic TLS 1.3, automated encrypted off-site backups, and 100% Git repository handover.",
    stack: [
      "Hetzner EU Cloud",
      "Docker Compose",
      "Caddy TLS 1.3",
      "PostgreSQL 16",
      "Zero Vendor Lock-In",
      "Automated Backups",
    ],
    bullets: [
      "Predictable €25–€60/mo raw server cost instead of runaway cloud bills",
      "Hardened UFW firewall, fail2ban, Caddy reverse proxy & zero-downtime deploys",
      "Full SSH root keys, Dockerfiles, and 100% source code transferred to your team",
    ],
    metric: { value: "99.98%", label: "Sovereign EU uptime SLA" },
    solutionHref: "/solutions/saas-subscription-consolidation",
    solutionLabel: "Sovereign Stack Spec",
    schemaDescription:
      "Sovereign self-hosted VPS infrastructure featuring dedicated European cloud architecture, Docker containerization, Caddy HTTPS, and zero vendor lock-in.",
  },
];
