/**
 * Dukatrio service pillars — single source of truth.
 * Consumed by <ServicePillars /> (UI) and by the JSON-LD OfferCatalog in
 * app/layout.tsx so on-page copy and structured data can never drift apart.
 */

export type PillarId = "platforms" | "content" | "realtime" | "backend";
export type PillarAccent = "cyan" | "emerald" | "indigo" | "amber";

export interface ServicePillar {
  id: PillarId;
  /** Display index, e.g. "01" */
  index: string;
  accent: PillarAccent;
  title: string;
  /** One-line B2B positioning shown under the title */
  tagline: string;
  description: string;
  /** Technology pills */
  stack: string[];
  /** Concrete deliverables */
  bullets: string[];
  /** Headline proof point */
  metric: { value: string; label: string };
  /** Plain-text description used in schema.org Service nodes */
  schemaDescription: string;
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "platforms",
    index: "01",
    accent: "cyan",
    title: "Enterprise Next.js & React Platforms",
    tagline: "Multi-tenant B2B SaaS, custom portals and high-security client desks.",
    description:
      "Production-grade web platforms for companies that run on software: strict tenant isolation, role-based access, audit trails and encrypted document vaults — architected on Next.js App Router and React Server Components.",
    stack: ["Next.js", "React 19", "TypeScript", "RBAC", "Prisma"],
    bullets: [
      "Multi-tenant B2B SaaS with hard tenant isolation",
      "Custom client portals, intake flows and admin consoles",
      "High-security client desks: audit logs, encrypted vaults",
    ],
    metric: { value: "100%", label: "Source-code ownership" },
    schemaDescription:
      "Multi-tenant B2B SaaS platforms, custom client portals and high-security client desks built with Next.js and React, including role-based access control, audit trails and encrypted document vaults.",
  },
  {
    id: "content",
    index: "02",
    accent: "emerald",
    title: "High-Performance Content & SEO Portals",
    tagline: "Astro Islands architecture with zero-JS content delivery.",
    description:
      "Content-heavy sites and SEO landing portals shipped as static HTML with interactive islands only where they earn their weight — so crawlers, and customers on weak mobile networks, get instant pages.",
    stack: ["Astro Islands", "Static HTML", "Structured Data", "Core Web Vitals"],
    bullets: [
      "Astro Islands: JavaScript only on components that need it",
      "Zero-JS content delivery for articles and landing pages",
      "Schema markup, sitemaps and technical SEO built in",
    ],
    metric: { value: "99+", label: "Lighthouse guarantee" },
    schemaDescription:
      "High-performance content and SEO portals built on Astro Islands architecture with zero-JavaScript content delivery, structured data and a 99+ Lighthouse performance guarantee.",
  },
  {
    id: "realtime",
    index: "03",
    accent: "indigo",
    title: "Real-Time Data & Operational Desks",
    tagline: "Low-latency telemetry and field dispatch consoles on SvelteKit & Nuxt 3.",
    description:
      "Live operational software for teams that cannot wait for a page refresh: streaming telemetry dashboards, dispatch boards and field consoles that stay responsive on site tablets and unreliable connections.",
    stack: ["SvelteKit", "Nuxt 3", "WebSockets", "Server-Sent Events"],
    bullets: [
      "Low-latency telemetry dashboards with live updates",
      "Field dispatch consoles for crews, fleets and deliveries",
      "Offline-tolerant UIs for jobsite and warehouse tablets",
    ],
    metric: { value: "Live", label: "Streaming, not polling" },
    schemaDescription:
      "Real-time data dashboards and operational desks built with SvelteKit and Nuxt 3, including low-latency telemetry views and field dispatch consoles.",
  },
  {
    id: "backend",
    index: "04",
    accent: "amber",
    title: "Cloud-Native Backend & Headless Infrastructure",
    tagline: "Supabase, PostgreSQL, Dockerized local engines, Directus and Payload.",
    description:
      "The data and content layer behind your product: relational schemas, auth, storage and headless CMS — containerised so the whole stack runs identically on a laptop, a VPS or your own cloud.",
    stack: ["Supabase", "PostgreSQL", "Docker", "Directus", "Payload"],
    bullets: [
      "PostgreSQL schema design, row-level security and migrations",
      "Dockerized local engines: reproducible dev and deploy",
      "Headless CMS with Directus or Payload for content teams",
    ],
    metric: { value: "1-command", label: "Reproducible local stack" },
    schemaDescription:
      "Cloud-native backend and headless infrastructure using Supabase, PostgreSQL, Dockerized local engines and headless CMS platforms such as Directus and Payload.",
  },
];
