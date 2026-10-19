import type { ScopeType } from "@/components/ContactForm";
import { formatEur } from "@/utils/formatEur";

/**
 * Client-side, deterministic blueprint engine.
 * Scores a free-text workflow description against Dukatrio's delivery
 * archetypes and sizes an indicative sprint. No network calls, no API keys.
 */

export type ArchetypeId =
  | "field-ops"
  | "saas-replacement"
  | "client-portal"
  | "spreadsheet-portal"
  | "intake-underwriting"
  | "custom-internal";

export interface BlueprintStackItem {
  layer: string;
  tech: string;
}

export interface BlueprintModule {
  id: string;
  name: string;
  detail: string;
}

export interface Blueprint {
  archetype: ArchetypeId;
  headline: string;
  matchLabel: "Strong match" | "Good match" | "General fit";
  rationale: string;
  stack: BlueprintStackItem[];
  modules: BlueprintModule[];
  /** Number of add-on modules detected beyond the archetype baseline. */
  extraModuleCount: number;
  priceLow: number;
  priceHigh: number;
  timelineLabel: string;
  scope: ScopeType;
  assumptions: string[];
}

export const BLUEPRINT_MIN_CHARS = 20;
export const BLUEPRINT_MAX_CHARS = 500;
const MAX_STACK_ITEMS = 6;
const MAX_MODULES = 8;

export const BLUEPRINT_PRESETS = [
  {
    id: "field-dispatch",
    label: "Field Dispatch & Receipts",
    text: "Our drivers and site supervisors run on paper delivery tickets, WhatsApp photos and a shared spreadsheet. Signal drops on site, tickets get lost and we end up in billing disputes.",
  },
  {
    id: "saas-bloat",
    label: "B2B SaaS License Bloat",
    text: "We pay for six SaaS tools and about 25 per-seat licenses plus Zapier glue, mostly to track jobs and invoices. The monthly bill keeps growing and we only use a fraction of the features.",
  },
  {
    id: "client-portal",
    label: "Multi-Tenant Client Portal",
    text: "Our clients send confidential documents by email. We need a branded multi-tenant portal where each client has its own login, sees only their files and status, and we keep an audit trail.",
  },
] as const;

// ---------------------------------------------------------------------------
// Module catalogue
// ---------------------------------------------------------------------------

const MODULES: Record<string, BlueprintModule> = {
  rbac: {
    id: "rbac",
    name: "Auth & Role-Based Access (RBAC)",
    detail: "Staff, manager and client roles with per-route and per-record permission checks.",
  },
  "offline-sync": {
    id: "offline-sync",
    name: "Offline-first Sync Engine",
    detail: "IndexedDB outbox with idempotent replay, so nothing is lost in cellular blind spots.",
  },
  ocr: {
    id: "ocr",
    name: "Document & OCR Pipeline",
    detail: "Camera capture, on-device OCR and field extraction with validation rules.",
  },
  "ticket-registry": {
    id: "ticket-registry",
    name: "Ticket & Delivery Registry",
    detail: "Searchable ledger of tickets, loads and drivers with dispute-proof timestamps.",
  },
  "csv-import": {
    id: "csv-import",
    name: "Spreadsheet Import & Migration",
    detail: "Validated CSV/XLSX ingestion that moves your existing sheets into a real database.",
  },
  "tenant-isolation": {
    id: "tenant-isolation",
    name: "Multi-Tenant Isolation",
    detail: "Per-client data scoping so each tenant only ever sees its own records.",
  },
  vault: {
    id: "vault",
    name: "Encrypted Document Vault",
    detail: "Drag-and-drop uploads with AES-256 encryption at rest and download logging.",
  },
  "audit-log": {
    id: "audit-log",
    name: "Audit Log & Compliance Controls",
    detail: "Append-only activity trail of who viewed, changed or exported what, and when.",
  },
  encryption: {
    id: "encryption",
    name: "Field-level Encryption",
    detail: "Sensitive columns (IDs, financials) encrypted individually, not just the disk.",
  },
  "decision-engine": {
    id: "decision-engine",
    name: "Decisioning & Calculation Kernel",
    detail: "Typed rules engine for ratios such as DSCR, scoring and amortisation, with unit tests.",
  },
  "term-sheet-pdf": {
    id: "term-sheet-pdf",
    name: "One-click PDF Generation",
    detail: "Term sheets, quotes or reports generated from live data in a single click.",
  },
  integrations: {
    id: "integrations",
    name: "Integrations Layer",
    detail: "REST endpoints and signed webhooks, plus CSV export, for the tools you keep.",
  },
  notifications: {
    id: "notifications",
    name: "Notifications",
    detail: "Transactional email (and optional SMS) for status changes and reminders.",
  },
  reporting: {
    id: "reporting",
    name: "Reporting & KPI Dashboards",
    detail: "Live dashboards and CSV/PDF exports for the numbers you currently rebuild by hand.",
  },
  sso: {
    id: "sso",
    name: "SSO & Multi-Factor Auth",
    detail: "OIDC single sign-on (Google, Microsoft, Okta) with optional MFA enforcement.",
  },
  payments: {
    id: "payments",
    name: "Payments & Invoicing",
    detail: "Stripe Checkout with signed webhooks, receipts and reconciliation views.",
  },
  gps: {
    id: "gps",
    name: "GPS & Route Tracking",
    detail: "Browser geolocation stamps and map views for vehicles, crews or sites.",
  },
  workflow: {
    id: "workflow",
    name: "Approval Workflow Engine",
    detail: "Multi-step approvals with sign-off capture, escalation and full history.",
  },
  i18n: {
    id: "i18n",
    name: "Localisation (i18n)",
    detail: "Multi-language UI and locale-aware dates, numbers and currency formatting.",
  },
  llm: {
    id: "llm",
    name: "Optional LLM Assistant",
    detail: "Server-side Gemini or Claude calls behind your own API route, never exposed to the browser.",
  },
};

// ---------------------------------------------------------------------------
// Shared stack building blocks
// ---------------------------------------------------------------------------

const CORE_DATA: BlueprintStackItem = {
  layer: "Data",
  tech: "PostgreSQL + Prisma ORM · single-tenant database you own",
};
const CORE_INFRA: BlueprintStackItem = {
  layer: "Infrastructure",
  tech: "Docker + Caddy v2 on a private Hetzner VPS · automatic HTTPS, HTTP/3",
};
const CORE_ACCESS: BlueprintStackItem = {
  layer: "Access",
  tech: "Role-based access control · signed, httpOnly session cookies",
};

interface Archetype {
  id: ArchetypeId;
  headline: string;
  scope: ScopeType;
  rationale: string;
  keywords: ReadonlyArray<readonly [string, number]>;
  stack: BlueprintStackItem[];
  moduleIds: string[];
}

const ARCHETYPES: Archetype[] = [
  {
    id: "field-ops",
    headline: "Offline Field Operations PWA",
    scope: "Offline Field Operations PWA",
    rationale:
      "Your workflow lives on site, where signal is unreliable and paper gets lost. An offline-first PWA captures every ticket on the device and syncs it later, so disputes are settled with timestamped records.",
    keywords: [
      ["dispatch", 2], ["driver", 2], ["deliver", 2], ["ticket", 2], ["receipt", 2],
      ["field", 2], ["site", 1], ["truck", 2], ["fleet", 2], ["concrete", 2],
      ["logistic", 2], ["crew", 1], ["foreman", 1], ["supervisor", 1], ["signal", 1],
      ["offline", 2], ["paper", 1], ["photo", 1], ["whatsapp", 1], ["pour", 1],
      ["haul", 2], ["construction", 2], ["warehouse", 1],
    ],
    stack: [
      { layer: "Field client", tech: "Installable offline-first PWA · IndexedDB outbox with idempotent sync" },
      { layer: "Capture", tech: "Camera capture + on-device WebAssembly OCR in Web Workers" },
      { layer: "Command portal", tech: "Next.js 16 App Router · React 19 · TypeScript (strict)" },
      CORE_DATA,
      CORE_INFRA,
    ],
    moduleIds: ["offline-sync", "ocr", "ticket-registry", "rbac"],
  },
  {
    id: "saas-replacement",
    headline: "SaaS Replacement Platform",
    scope: "Excel-to-Custom Portal",
    rationale:
      "You are renting generic software and paying per seat for features you barely touch. One purpose-built internal platform replaces the stack, removes recurring seat fees and leaves you owning the code and the data.",
    keywords: [
      ["saas", 3], ["licens", 2], ["subscription", 2], ["per seat", 3], ["seat", 2],
      ["zapier", 2], ["airtable", 2], ["notion", 1], ["retool", 2], ["bubble", 1],
      ["hubspot", 1], ["monthly bill", 2], ["monthly cost", 2], ["tool", 1], ["glue", 1],
      ["vendor", 1], ["lock in", 2], ["overpay", 2], ["bloat", 2], ["expensive", 1],
    ],
    stack: [
      { layer: "Application", tech: "Next.js 16 App Router · React 19 · TypeScript (strict)" },
      CORE_DATA,
      CORE_ACCESS,
      { layer: "Migration", tech: "Validated CSV/XLSX import from your current tools" },
      CORE_INFRA,
    ],
    moduleIds: ["rbac", "csv-import", "workflow", "reporting"],
  },
  {
    id: "client-portal",
    headline: "Multi-Tenant Client Portal",
    scope: "B2B Client Intake Engine",
    rationale:
      "Clients need a private, branded place to exchange sensitive documents and see status. Strict tenant isolation, encryption and an audit trail replace email attachments and the compliance risk that comes with them.",
    keywords: [
      ["portal", 3], ["client", 1], ["customer", 1], ["tenant", 3], ["multitenant", 3],
      ["login", 2], ["vault", 2], ["document", 1], ["confidential", 2], ["branded", 2],
      ["white label", 2], ["audit trail", 2], ["secure", 1], ["share files", 2], ["file", 1],
      ["partner", 1], ["onboarding", 1],
    ],
    stack: [
      { layer: "Application", tech: "Next.js 16 App Router · React 19 · TypeScript (strict)" },
      { layer: "Storage", tech: "AES-256 encrypted object storage on your own VPS" },
      CORE_DATA,
      CORE_ACCESS,
      CORE_INFRA,
    ],
    moduleIds: ["tenant-isolation", "vault", "rbac", "audit-log"],
  },
  {
    id: "spreadsheet-portal",
    headline: "Excel-to-Custom Portal",
    scope: "Excel-to-Custom Portal",
    rationale:
      "Critical operations depend on a fragile workbook that breaks under concurrency and has no history. A web portal with real roles, validation and audit trails keeps your process and removes the failure modes.",
    keywords: [
      ["excel", 3], ["spreadsheet", 3], ["google sheets", 3], ["sheets", 2], ["csv", 2],
      ["workbook", 2], ["manual", 1], ["copy paste", 2], ["vlookup", 2], ["macro", 2],
      ["error", 1], ["version", 1],
    ],
    stack: [
      { layer: "Application", tech: "Next.js 16 App Router · React 19 · TypeScript (strict)" },
      CORE_DATA,
      CORE_ACCESS,
      { layer: "Migration", tech: "Validated CSV/XLSX import with row-level error reports" },
      CORE_INFRA,
    ],
    moduleIds: ["csv-import", "rbac", "audit-log", "reporting"],
  },
  {
    id: "intake-underwriting",
    headline: "B2B Intake & Decisioning Engine",
    scope: "B2B Client Intake Engine",
    rationale:
      "Applications arrive as emails and attachments and wait days for a human to crunch numbers. A guided intake with a calculation kernel gives sub-minute first-pass decisions and a clean, encrypted file for your underwriters.",
    keywords: [
      ["underwrit", 3], ["loan", 2], ["lend", 2], ["dscr", 3], ["credit", 1],
      ["kyc", 3], ["intake", 3], ["application", 2], ["apply", 1], ["broker", 2],
      ["approval", 1], ["decision", 2], ["scoring", 2], ["mortgage", 2], ["insurance", 1],
      ["quote", 1], ["onboard", 1], ["compliance", 1], ["bank statement", 3],
    ],
    stack: [
      { layer: "Application", tech: "Next.js 16 App Router · React 19 · TypeScript (strict)" },
      { layer: "Calculation kernel", tech: "Typed decisioning engine (DSCR, scoring, amortisation) with unit tests" },
      CORE_DATA,
      CORE_ACCESS,
      CORE_INFRA,
    ],
    moduleIds: ["decision-engine", "vault", "term-sheet-pdf", "rbac"],
  },
];

const CUSTOM_ARCHETYPE: Archetype = {
  id: "custom-internal",
  headline: "Custom Internal Operations Tool",
  scope: "Excel-to-Custom Portal",
  rationale:
    "Your description does not map cleanly onto one standard pattern, so this is a general-purpose internal tool baseline. A 15-minute call is the fastest way to refine the scope and tighten the estimate.",
  keywords: [],
  stack: [
    { layer: "Application", tech: "Next.js 16 App Router · React 19 · TypeScript (strict)" },
    CORE_DATA,
    CORE_ACCESS,
    CORE_INFRA,
  ],
  moduleIds: ["rbac", "workflow", "reporting", "audit-log"],
};

// ---------------------------------------------------------------------------
// Add-on detection (complexity signals found in the description)
// ---------------------------------------------------------------------------

interface AddOn {
  moduleId: string;
  /** Word-prefix triggers; a trailing "$" means whole-word match. */
  triggers: string[];
  stack?: BlueprintStackItem;
}

const ADD_ONS: AddOn[] = [
  { moduleId: "offline-sync", triggers: ["offline", "no signal", "connectivity", "remote site"] },
  {
    moduleId: "ocr",
    triggers: ["ocr", "scan", "camera", "receipt", "invoice"],
    stack: { layer: "Capture", tech: "Camera capture + on-device WebAssembly OCR" },
  },
  {
    moduleId: "integrations",
    triggers: ["integrat", "erp", "quickbooks", "xero", "sap$", "crm", "hubspot", "salesforce", "api$", "zapier"],
    stack: { layer: "Integrations", tech: "REST + signed webhooks · CSV/XLSX import & export" },
  },
  {
    moduleId: "payments",
    triggers: ["stripe", "payment", "checkout", "paypal"],
    stack: { layer: "Payments", tech: "Stripe Checkout + signed webhooks" },
  },
  {
    moduleId: "sso",
    triggers: ["sso$", "single sign", "ldap", "azure ad", "okta", "mfa$", "2fa$"],
    stack: { layer: "Identity", tech: "OIDC single sign-on (Google / Microsoft / Okta) + optional MFA" },
  },
  { moduleId: "reporting", triggers: ["report", "dashboard", "analytic", "kpi"] },
  {
    moduleId: "notifications",
    triggers: ["notif", "alert", "sms$", "reminder", "email"],
    stack: { layer: "Messaging", tech: "Transactional email via SMTP · optional SMS" },
  },
  { moduleId: "tenant-isolation", triggers: ["tenant", "multitenant", "white label"] },
  { moduleId: "audit-log", triggers: ["audit", "compliance", "gdpr", "hipaa", "soc2"] },
  { moduleId: "encryption", triggers: ["encrypt", "confidential", "sensitive", "kyc$"] },
  {
    moduleId: "gps",
    triggers: ["gps$", "map$", "route", "location", "tracking"],
    stack: { layer: "Geo", tech: "Browser geolocation + MapLibre map views" },
  },
  { moduleId: "workflow", triggers: ["approval", "workflow", "sign off", "signature"] },
  { moduleId: "i18n", triggers: ["multi language", "multilingual", "translat", "serbian", "german"] },
  {
    moduleId: "llm",
    triggers: ["ai$", "llm$", "gpt$", "chatbot", "gemini$", "claude$"],
    stack: { layer: "Assistant", tech: "Server-side LLM calls (Gemini / Claude) behind your own API route" },
  },
];

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

function normalize(input: string): string {
  return ` ${input.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;
}

function matches(text: string, trigger: string): boolean {
  const needle = trigger.endsWith("$") ? ` ${trigger.slice(0, -1)} ` : ` ${trigger}`;
  return text.includes(needle);
}

function scoreArchetype(text: string, archetype: Archetype): number {
  return archetype.keywords.reduce(
    (total, [keyword, weight]) => (matches(text, keyword) ? total + weight : total),
    0
  );
}

interface SizingTier {
  priceLow: number;
  priceHigh: number;
  timelineLabel: string;
}

function sizeSprint(extraModuleCount: number): SizingTier {
  if (extraModuleCount <= 1) {
    return { priceLow: 4800, priceHigh: 5800, timelineLabel: "2 weeks (10–14 days)" };
  }
  if (extraModuleCount <= 3) {
    return { priceLow: 5800, priceHigh: 7200, timelineLabel: "2–3 weeks" };
  }
  return { priceLow: 7200, priceHigh: 8500, timelineLabel: "3 weeks" };
}

export function generateBlueprint(description: string): Blueprint {
  const text = normalize(description);

  let best: Archetype = CUSTOM_ARCHETYPE;
  let bestScore = 0;
  for (const archetype of ARCHETYPES) {
    const score = scoreArchetype(text, archetype);
    if (score > bestScore) {
      best = archetype;
      bestScore = score;
    }
  }

  const matchLabel: Blueprint["matchLabel"] =
    bestScore >= 6 ? "Strong match" : bestScore >= 3 ? "Good match" : "General fit";
  if (bestScore < 2) best = CUSTOM_ARCHETYPE;

  const baselineIds = new Set(best.moduleIds);
  const detectedAddOns = ADD_ONS.filter(
    (addOn) =>
      !baselineIds.has(addOn.moduleId) &&
      addOn.triggers.some((trigger) => matches(text, trigger))
  );

  const moduleIds = [...best.moduleIds, ...detectedAddOns.map((addOn) => addOn.moduleId)];
  const modules = moduleIds
    .map((id) => MODULES[id])
    .filter((m): m is BlueprintModule => Boolean(m))
    .slice(0, MAX_MODULES);

  const stack: BlueprintStackItem[] = [...best.stack];
  for (const addOn of detectedAddOns) {
    if (addOn.stack && !stack.some((item) => item.layer === addOn.stack?.layer)) {
      stack.push(addOn.stack);
    }
  }

  const extraModuleCount = detectedAddOns.length;
  const sizing = sizeSprint(extraModuleCount);

  const assumptions = [
    "Indicative bracket from a rule-based sizing model. The final fixed price is confirmed on the scope call.",
    "Single-tenant deployment on a private VPS, with full source code and database handed over (100% IP ownership).",
  ];
  if (extraModuleCount >= 6) {
    assumptions.push(
      "The surface area is large, so delivery would likely be phased: core workflow first, extras in a second sprint."
    );
  }

  return {
    archetype: best.id,
    headline: best.headline,
    matchLabel: best.id === "custom-internal" ? "General fit" : matchLabel,
    rationale: best.rationale,
    stack: stack.slice(0, MAX_STACK_ITEMS),
    modules,
    extraModuleCount,
    priceLow: sizing.priceLow,
    priceHigh: sizing.priceHigh,
    timelineLabel: sizing.timelineLabel,
    scope: best.scope,
    assumptions,
  };
}

/** Plain-text brief used to prefill the contact desk (kept well under the 2000 char API limit). */
export function buildBlueprintBrief(blueprint: Blueprint, description: string): string {
  const lines = [
    "[Blueprint Scope Call Request]",
    `Problem (as described): ${description.trim().slice(0, BLUEPRINT_MAX_CHARS)}`,
    `Matched blueprint: ${blueprint.headline} (${blueprint.matchLabel})`,
    `Recommended stack: ${blueprint.stack.map((item) => item.tech).join(" | ")}`,
    `Key modules: ${blueprint.modules.map((m) => m.name).join(", ")}`,
    `Indicative bracket: ${formatEur(blueprint.priceLow)} – ${formatEur(blueprint.priceHigh)} · ${blueprint.timelineLabel}`,
  ];
  return lines.join("\n").slice(0, 1900);
}
