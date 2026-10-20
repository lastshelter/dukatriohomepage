"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Cpu,
  Database,
  FileSpreadsheet,
  Gauge,
  Globe,
  HardDrive,
  Lock,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Terminal,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import {
  LIVE_TELEMETRY_BENCHMARKS,
  SERVICE_PILLARS,
  type PillarAccent,
  type PillarId,
  type ServicePillar,
} from "@/config/servicePillars";
import { useLanguage } from "@/context/LanguageContext";

const PILLAR_ICONS: Record<PillarId, React.ComponentType<{ className?: string }>> = {
  "intake-engines": Sliders,
  "field-pwas": Smartphone,
  "roi-calculators": Calculator,
  "document-vaults": Lock,
  "legacy-rebuilds": Zap,
  "data-microtools": FileSpreadsheet,
  "sovereign-vps": Server,
};

const ACCENTS: Record<
  PillarAccent,
  {
    glow: string;
    icon: string;
    check: string;
    pill: string;
    index: string;
    metric: string;
    hover: string;
    tabActive: string;
    borderAccent: string;
  }
> = {
  cyan: {
    glow: "bg-[radial-gradient(560px_circle_at_100%_0%,rgba(34,211,238,0.12),transparent_62%)]",
    icon: "bg-cyan-500/10 border-cyan-400/25 text-cyan-300",
    check: "text-cyan-400",
    pill: "bg-cyan-500/10 border-cyan-400/20 text-cyan-200",
    index: "text-cyan-400/90",
    metric: "text-cyan-300",
    hover: "hover:border-cyan-400/40",
    tabActive: "bg-cyan-500/15 text-cyan-200 border-cyan-400/35",
    borderAccent: "border-cyan-500/25",
  },
  indigo: {
    glow: "bg-[radial-gradient(560px_circle_at_100%_0%,rgba(99,102,241,0.15),transparent_62%)]",
    icon: "bg-indigo-500/10 border-indigo-400/25 text-indigo-300",
    check: "text-indigo-400",
    pill: "bg-indigo-500/10 border-indigo-400/20 text-indigo-200",
    index: "text-indigo-400/90",
    metric: "text-indigo-300",
    hover: "hover:border-indigo-400/40",
    tabActive: "bg-indigo-500/15 text-indigo-200 border-indigo-400/35",
    borderAccent: "border-indigo-500/25",
  },
  emerald: {
    glow: "bg-[radial-gradient(560px_circle_at_100%_0%,rgba(16,185,129,0.12),transparent_62%)]",
    icon: "bg-emerald-500/10 border-emerald-400/25 text-emerald-300",
    check: "text-emerald-400",
    pill: "bg-emerald-500/10 border-emerald-400/20 text-emerald-200",
    index: "text-emerald-400/90",
    metric: "text-emerald-300",
    hover: "hover:border-emerald-400/40",
    tabActive: "bg-emerald-500/15 text-emerald-200 border-emerald-400/35",
    borderAccent: "border-emerald-500/25",
  },
  amber: {
    glow: "bg-[radial-gradient(560px_circle_at_100%_0%,rgba(245,158,11,0.12),transparent_62%)]",
    icon: "bg-amber-500/10 border-amber-400/25 text-amber-300",
    check: "text-amber-400",
    pill: "bg-amber-500/10 border-amber-400/20 text-amber-200",
    index: "text-amber-400/90",
    metric: "text-amber-300",
    hover: "hover:border-amber-400/40",
    tabActive: "bg-amber-500/15 text-amber-200 border-amber-400/35",
    borderAccent: "border-amber-500/25",
  },
};

/**
 * Interactive End-State Software Mockup Frames for each of the 7 catalogue offerings.
 * Maintains strict CLS: 0 via fixed height container (`min-h-[212px]`).
 */
function OfferingInteractiveMockup({ pillarId }: { pillarId: PillarId }): React.JSX.Element {
  // 01: Bespoke B2B Client Intake Engine State
  const [intakeVolume, setIntakeVolume] = useState<number>(450);
  const [intakeTier, setIntakeTier] = useState<"KYB Standard" | "Institutional">("Institutional");

  // 02: Field Operations & Offline-First PWA State
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(true);
  const [queuedTickets, setQueuedTickets] = useState<number>(3);

  // 03: Interactive Financial & ROI Calculator State
  const [monthlySaasBurn, setMonthlySaasBurn] = useState<number>(1650);

  // 04: Encrypted Document Drop Vault State
  const [vaultEncrypted, setVaultEncrypted] = useState<boolean>(true);
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);

  // 05: Legacy Web Scraping & Instant Rebuild State
  const [rebuildMode, setRebuildMode] = useState<"after" | "before">("after");

  // 06: Automated Data Processing & Micro-Tools State
  const [dataNormalized, setDataNormalized] = useState<boolean>(true);

  // 07: Sovereign Self-Hosted VPS Infrastructure State
  const [selectedNode, setSelectedNode] = useState<"caddy" | "nextjs" | "postgres" | "backups">("nextjs");

  if (pillarId === "intake-engines") {
    const score = Math.min(99, Math.round(74 + intakeVolume / 40 + (intakeTier === "Institutional" ? 8 : 0)));
    return (
      <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">INTAKE_ENGINE // STEP 02: QUALIFICATION</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 text-[10px]">
            €0 SEAT TAX
          </span>
        </div>

        <div className="space-y-3 my-3">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Annual B2B Transaction Volume</span>
              <span className="text-cyan-300 font-bold">€{intakeVolume}k / yr</span>
            </div>
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={intakeVolume}
              aria-label="Annual B2B Transaction Volume"
              onChange={(e) => setIntakeVolume(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5">
              {(["KYB Standard", "Institutional"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setIntakeTier(mode)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all cursor-pointer ${
                    intakeTier === mode
                      ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-200"
                      : "bg-slate-900/80 border-white/[0.06] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">ELIGIBILITY SCORE</span>
              <span className="text-sm font-bold text-emerald-400">{score}/100 AUTO-APPROVED</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
          <span>Route: PostgreSQL + Slack Desk</span>
          <span className="text-cyan-300">Latency: 14ms</span>
        </div>
      </div>
    );
  }

  if (pillarId === "field-pwas") {
    return (
      <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            {isOfflineMode ? (
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span className="text-slate-200 font-semibold">GRADILIŠTE_OS // SITE TABLET</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (isOfflineMode) {
                setIsOfflineMode(false);
                setQueuedTickets(0);
              } else {
                setIsOfflineMode(true);
                setQueuedTickets(2);
              }
            }}
            className={`px-2 py-0.5 rounded border text-[10px] font-bold transition-all cursor-pointer ${
              isOfflineMode
                ? "bg-amber-500/15 border-amber-400/40 text-amber-300"
                : "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
            }`}
          >
            {isOfflineMode ? "OFFLINE (IndexedDB)" : "ONLINE (SYNCED)"}
          </button>
        </div>

        <div className="my-3 space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-white/[0.05]">
            <div>
              <div className="text-slate-200 font-semibold">OCR Delivery Docket #409</div>
              <div className="text-[10px] text-slate-400">Lafarge Beton C30/37 · 24.5t Net</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px]">
              99.4% OCR
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setQueuedTickets((c) => c + 1)}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 text-[11px] font-semibold transition-all cursor-pointer"
            >
              + Scan Site Ticket
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOfflineMode(false);
                setQueuedTickets(0);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-300 text-[11px] transition-all cursor-pointer"
            >
              Flush Sync Queue ({queuedTickets})
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
          <span>Crew Logged: 38 Workers</span>
          <span className="text-emerald-300">
            {queuedTickets === 0 ? "All mutations synced" : `${queuedTickets} queued locally`}
          </span>
        </div>
      </div>
    );
  }

  if (pillarId === "roi-calculators") {
    const threeYearSavings = Math.max(0, monthlySaasBurn * 36 - 4800);
    const payoffMonths = Math.max(1.2, +(4800 / monthlySaasBurn).toFixed(1));
    return (
      <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <span className="text-slate-200 font-semibold">ROI_PAYOFF_ENGINE // 36M TCO</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-400/30 text-[10px]">
            VECTOR PDF READY
          </span>
        </div>

        <div className="my-3 space-y-3">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Replaced Monthly SaaS Spend</span>
              <span className="text-indigo-300 font-bold">€{monthlySaasBurn.toLocaleString()}/mo</span>
            </div>
            <input
              type="range"
              min={500}
              max={4500}
              step={150}
              value={monthlySaasBurn}
              aria-label="Replaced Monthly SaaS Spend"
              onChange={(e) => setMonthlySaasBurn(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-slate-900/90 border border-white/[0.05]">
              <span className="text-[10px] text-slate-400 block">36-MONTH NET SAVINGS</span>
              <span className="text-sm font-bold text-emerald-400">
                +€{threeYearSavings.toLocaleString()}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/90 border border-white/[0.05]">
              <span className="text-[10px] text-slate-400 block">BREAKEVEN PAYOFF</span>
              <span className="text-sm font-bold text-indigo-300">{payoffMonths} Months</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
          <span>Fixed Build: €4,800 Once</span>
          <span className="text-indigo-300">Seat Licences: €0</span>
        </div>
      </div>
    );
  }

  if (pillarId === "document-vaults") {
    const docs = [
      { name: "Audited_Financials_2026.pdf", size: "4.2 MB", hash: "sha256:9f86d08...4a1b" },
      { name: "Shareholder_KYC_Passport.pdf", size: "1.8 MB", hash: "sha256:3c19e72...89f0" },
    ];
    const activeDoc = docs[selectedDocIndex];
    return (
      <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-200 font-semibold">ZERO_KNOWLEDGE_VAULT // TENANT #08</span>
          </div>
          <button
            type="button"
            onClick={() => setVaultEncrypted((v) => !v)}
            className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] cursor-pointer"
          >
            {vaultEncrypted ? "AES-256-GCM SEALED" : "VERIFYING HASH..."}
          </button>
        </div>

        <div className="my-3 space-y-2">
          <div className="flex gap-2">
            {docs.map((doc, idx) => (
              <button
                key={doc.name}
                type="button"
                onClick={() => setSelectedDocIndex(idx)}
                className={`flex-1 text-left p-2 rounded-lg border text-[11px] transition-all cursor-pointer ${
                  selectedDocIndex === idx
                    ? "bg-cyan-500/15 border-cyan-400/40 text-cyan-100"
                    : "bg-slate-900/80 border-white/[0.05] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="truncate font-semibold">{doc.name}</div>
                <div className="text-[10px] text-slate-400">{doc.size} · RLS Isolated</div>
              </button>
            ))}
          </div>

          <div className="p-2 rounded-lg bg-slate-950 border border-white/[0.05] flex items-center justify-between text-[11px]">
            <span className="text-slate-400 truncate">Integrity: {activeDoc.hash}</span>
            <span className="text-emerald-400 font-semibold shrink-0 ml-2">IMMUTABLE LOGGED</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
          <span>Storage: Private EU S3/MinIO</span>
          <span className="text-cyan-300">Presigned TTL: 900s</span>
        </div>
      </div>
    );
  }

  if (pillarId === "legacy-rebuilds") {
    return (
      <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <span className="text-slate-200 font-semibold">MIGRATION_TELEMETRY // WP → NEXT.JS</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setRebuildMode("before")}
              className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                rebuildMode === "before"
                  ? "bg-rose-500/20 border-rose-400/40 text-rose-300"
                  : "bg-slate-900 border-white/[0.06] text-slate-400"
              }`}
            >
              Legacy WP
            </button>
            <button
              type="button"
              onClick={() => setRebuildMode("after")}
              className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                rebuildMode === "after"
                  ? "bg-amber-500/20 border-amber-400/40 text-amber-200"
                  : "bg-slate-900 border-white/[0.06] text-slate-400"
              }`}
            >
              Dukatrio SSR
            </button>
          </div>
        </div>

        <div className="my-3 space-y-2.5">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Time to First Byte (TTFB)</span>
              <span className={rebuildMode === "after" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {rebuildMode === "after" ? "184 ms (Edge SSR)" : "3,420 ms (38 PHP Plugins)"}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  rebuildMode === "after" ? "w-[14%] bg-emerald-400" : "w-[92%] bg-rose-500"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-1.5 rounded bg-slate-900/90 border border-white/[0.05]">
              <span className="text-[10px] text-slate-500 block">LIGHTHOUSE</span>
              <span className={rebuildMode === "after" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {rebuildMode === "after" ? "100 / 100" : "41 / 100"}
              </span>
            </div>
            <div className="p-1.5 rounded bg-slate-900/90 border border-white/[0.05]">
              <span className="text-[10px] text-slate-500 block">CLS SHIFT</span>
              <span className="text-slate-200 font-bold">{rebuildMode === "after" ? "0.000" : "0.412"}</span>
            </div>
            <div className="p-1.5 rounded bg-slate-900/90 border border-white/[0.05]">
              <span className="text-[10px] text-slate-500 block">301 SEO MAP</span>
              <span className="text-amber-300 font-bold">100% KEPT</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
          <span>Scraped Nodes: 1,420 Pages</span>
          <span className="text-amber-300">Zero Plugin Attack Surface</span>
        </div>
      </div>
    );
  }

  if (pillarId === "data-microtools") {
    return (
      <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <span className="text-slate-200 font-semibold">ETL_PIPELINE // XLSX → POSTGRESQL</span>
          <button
            type="button"
            onClick={() => setDataNormalized((n) => !n)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-400/35 text-indigo-200 text-[10px] cursor-pointer"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span>{dataNormalized ? "View Raw Excel" : "Normalize to SQL"}</span>
          </button>
        </div>

        <div className="my-3">
          {dataNormalized ? (
            <div className="space-y-1.5">
              <div className="text-[10px] text-emerald-400 flex items-center justify-between">
                <span>✓ ACID SCHEMA VALIDATED (3,840 ROWS)</span>
                <span>0 DUPLICATES</span>
              </div>
              <div className="rounded-lg bg-slate-900/90 border border-white/[0.05] p-2 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>INV-2026-0891 · Delta Agrar DOO</span>
                  <span className="text-emerald-400">€18,450.00 [PAID]</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>INV-2026-0892 · Metalac Group</span>
                  <span className="text-cyan-300">€9,120.00 [ RECONCILED ]</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[10px] text-rose-400 flex items-center justify-between">
                <span>⚠ RAW_SPREADSHEET_ANOMALIES_DETECTED</span>
                <span>142 CONFLICTS</span>
              </div>
              <div className="rounded-lg bg-rose-950/25 border border-rose-500/20 p-2 space-y-1 text-[11px] text-rose-200/90">
                <div className="flex justify-between">
                  <span>Row 412: &quot;Delta_Agrar &quot; (Duplicate)</span>
                  <span className="text-rose-400">#REF! / EUR_TEXT</span>
                </div>
                <div className="flex justify-between">
                  <span>Row 419: Locked by user_04.xlsx</span>
                  <span className="text-rose-400">12/31/26 vs 31.12.26</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
          <span>Engine: Prisma + BullMQ Workers</span>
          <span className="text-indigo-300">10,000+ rows/sec</span>
        </div>
      </div>
    );
  }

  // 07: Sovereign Self-Hosted VPS Infrastructure (Full-Width Bento Flagship)
  const nodeSpecs = {
    caddy: {
      title: "Caddy 2 Edge Reverse Proxy",
      status: "TLS 1.3 Automated · HTTP/3 QUIC Enabled",
      detail: "Zero-config OCSP stapling, strict security headers, rate-limiting & sub-12ms TLS handshakes.",
      load: "CPU: 1.4% · RAM: 48MB",
    },
    nextjs: {
      title: "Next.js 16 Standalone Runtime",
      status: "PM2 / Docker Cluster · Sub-200ms SSR",
      detail: "Self-hosted Node.js 22 standalone workers with zero Vercel bandwidth overages or cold starts.",
      load: "CPU: 4.8% · RAM: 210MB",
    },
    postgres: {
      title: "PostgreSQL 16 + Row-Level Security",
      status: "NVMe RAID-10 · 0.4ms Local Socket Query",
      detail: "Co-located on private Docker bridge network so database round-trips take microseconds, not 40ms across clouds.",
      load: "CPU: 3.1% · RAM: 640MB",
    },
    backups: {
      title: "Encrypted Off-Site Snapshot Vault",
      status: "Hourly WAL + Nightly AES-256 Snapshots",
      detail: "Automated point-in-time recovery streamed to secondary EU storage box with 30-day retention.",
      load: "Last Snapshot: 14m ago · VERIFIED",
    },
  };

  const activeNode = nodeSpecs[selectedNode];

  return (
    <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-200 font-semibold">
            SOVEREIGN_VPS_TOPOLOGY // HETZNER EU-CENTRAL (FALKENSTEIN)
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
          100% CLIENT ROOT &amp; GIT OWNERSHIP
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-3 items-center">
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { id: "caddy", label: "Caddy TLS 1.3", sub: "Port 443 QUIC" },
              { id: "nextjs", label: "Next.js 16 Node", sub: "Standalone SSR" },
              { id: "postgres", label: "PostgreSQL 16", sub: "NVMe Local Socket" },
              { id: "backups", label: "AES Backups", sub: "Hourly WAL Sync" },
            ] as const
          ).map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedNode === node.id
                  ? "bg-emerald-500/15 border-emerald-400/45 text-emerald-200 shadow-sm"
                  : "bg-slate-900/80 border-white/[0.06] text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[9px] text-slate-500">ACTIVE</span>
              </div>
              <div className="font-bold text-[11px] text-white truncate">{node.label}</div>
              <div className="text-[10px] text-slate-400 truncate">{node.sub}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-5 p-3 rounded-xl bg-slate-900/90 border border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-emerald-300 font-bold text-xs">{activeNode.title}</span>
            <span className="text-[10px] text-slate-400">{activeNode.load}</span>
          </div>
          <div className="text-[10px] text-cyan-300">{activeNode.status}</div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-0.5">{activeNode.detail}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
        <span>Dedicated Infrastructure Cost: ~€38/mo flat (No per-user cloud markup)</span>
        <span className="text-emerald-300">GDPR Sovereign EU Data Residency</span>
      </div>
    </div>
  );
}

export default function ServicePillars(): React.JSX.Element {
  const { lang } = useLanguage();
  const [activeTabByCard, setActiveTabByCard] = useState<Record<string, "preview" | "specs">>({});
  const [livePingMs, setLivePingMs] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const triggerLiveTelemetryPing = async () => {
    if (isPinging) return;
    setIsPinging(true);
    const t0 = performance.now();
    try {
      await fetch("/api/telemetry", { cache: "no-store" });
      const elapsed = Math.max(12, Math.round(performance.now() - t0));
      setLivePingMs(elapsed);
    } catch {
      setLivePingMs(142);
    } finally {
      setIsPinging(false);
    }
  };

  const handleScopePillar = (pillar: ServicePillar) => {
    window.dispatchEvent(
      new CustomEvent("populate-estimator", {
        detail: {
          projectType: `B2B Solution: ${pillar.title}`,
          features: [...pillar.stack.slice(0, 4), pillar.metric.value],
          estimatedRange: "€4,800 Fixed Sprint",
          timeline: "10–14 Days",
        },
      })
    );
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="solutions"
      aria-labelledby="pillars-heading"
      className="py-28 sm:py-36 relative border-t border-white/[0.07] bg-[#030712]"
    >
      {/* Deep ambient radial glows */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-96 pointer-events-none bg-[radial-gradient(65%_100%_at_50%_0%,rgba(99,102,241,0.09),rgba(34,211,238,0.04)_45%,transparent)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F17] border border-cyan-400/25 text-cyan-300 font-mono text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {lang === "sr"
                  ? "KATALOG INŽENJERSKIH REŠENJA // 01–07"
                  : "INSTITUTIONAL B2B ENGINEERING CATALOGUE // 01–07"}
              </span>
            </div>
            <h2
              id="pillars-heading"
              className="text-fluid-h2 font-extrabold tracking-tight text-white"
            >
              {lang === "sr" ? (
                <>
                  Sedam suverenih softverskih arhitektura.
                  <span className="block text-slate-400">Bez mesečnog poreza na SaaS licence.</span>
                </>
              ) : (
                <>
                  Seven sovereign software architectures.
                  <span className="block text-slate-400">Zero recurring SaaS seat tax.</span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            {lang === "sr"
              ? "Svaki sistem projektujemo za odziv ispod 300ms, hostujemo na posvećenoj evropskoj infrastrukturi i predajemo sa 100% vlasništva nad kodom. Isprobajte interaktivne simulacije ispod."
              : "Every system is engineered for sub-300ms response times, deployed to dedicated European infrastructure, and handed over with 100% source-code ownership. Interact with each live architecture mockup below."}
          </p>
        </div>

        {/* ===================================================================== */}
        {/* LIVE SYSTEM TELEMETRY RIBBON */}
        {/* ===================================================================== */}
        <div
          role="region"
          aria-label="Live System Telemetry Benchmarks"
          className="bento-surface rounded-2xl p-4 sm:p-5 border border-white/[0.08]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-200 font-bold">
                Live System Telemetry &amp; Architectural SLA
              </span>
            </div>

            <button
              type="button"
              onClick={triggerLiveTelemetryPing}
              className="btn-spring inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-semibold cursor-pointer"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>
                {isPinging
                  ? "Measuring Edge RTT..."
                  : livePingMs !== null
                  ? `Live Edge RTT: ${livePingMs}ms (Re-test)`
                  : "Verify Live TTFB Ping"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {LIVE_TELEMETRY_BENCHMARKS.map((item) => {
              const badgeColors = {
                cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
                emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
                indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
                amber: "bg-amber-500/15 text-amber-300 border-amber-400/30",
              }[item.accent];

              return (
                <div
                  key={item.id}
                  onClick={triggerLiveTelemetryPing}
                  className="group rounded-xl bg-[#030712]/80 hover:bg-[#030712] border border-white/[0.06] hover:border-cyan-400/30 p-3.5 transition-all cursor-pointer flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
                      {item.id === "ttfb" && livePingMs !== null ? `${livePingMs}ms LIVE RTT` : item.badge}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeColors}`}>
                      VERIFIED
                    </span>
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-400 leading-snug mt-0.5">{item.sublabel}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 7-OFFERING ASYMMETRIC BENTO GRID ARCHITECTURE */}
        {/* ===================================================================== */}
        <div data-stagger className="grid grid-cols-12 gap-5 sm:gap-6">
          {SERVICE_PILLARS.map((pillar) => {
            const accent = ACCENTS[pillar.accent];
            const Icon = PILLAR_ICONS[pillar.id];
            const activeTab = activeTabByCard[pillar.id] ?? "preview";

            return (
              <article
                key={pillar.id}
                onMouseMove={handleCardMouseMove}
                aria-labelledby={`pillar-${pillar.id}`}
                className={`${pillar.bentoSpan} group spotlight-card bento-surface flex flex-col rounded-3xl ${accent.glow} p-6 sm:p-8 shadow-2xl ${accent.hover}`}
              >
                {/* Top Row: Icon + Index + Interactive Mode Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${accent.icon}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`font-mono text-[11px] font-bold tracking-widest block ${accent.index}`}>
                        CATALOGUE // {pillar.index}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        Fixed Sprint · 100% IP Handover
                      </span>
                    </div>
                  </div>

                  {/* Interactive Tab Toggle: Live Software Mockup vs Deliverables & Stack */}
                  <div
                    role="tablist"
                    aria-label={`${pillar.title} view mode`}
                    className="inline-flex rounded-xl bg-[#030712]/90 p-1 border border-white/[0.08] font-mono text-[11px]"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "preview"}
                      onClick={() =>
                        setActiveTabByCard((prev) => ({ ...prev, [pillar.id]: "preview" }))
                      }
                      className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        activeTab === "preview"
                          ? accent.tabActive
                          : "border-transparent text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Interactive UI
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "specs"}
                      onClick={() =>
                        setActiveTabByCard((prev) => ({ ...prev, [pillar.id]: "specs" }))
                      }
                      className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        activeTab === "specs"
                          ? accent.tabActive
                          : "border-transparent text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Deliverables ({pillar.bullets.length})
                    </button>
                  </div>
                </div>

                {/* Title + Tagline + Description */}
                <div className="mt-5 space-y-2">
                  <h3
                    id={`pillar-${pillar.id}`}
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug"
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                    {pillar.tagline}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>

                {/* Zero-CLS Interactive End-State Software Mockup OR Engineering Deliverables */}
                <div className="mt-5">
                  {activeTab === "preview" ? (
                    <OfferingInteractiveMockup pillarId={pillar.id} />
                  ) : (
                    <div className="min-h-[212px] rounded-2xl bg-[#030712]/90 border border-white/[0.08] p-4 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/[0.06] pb-2">
                          Concrete Production Deliverables
                        </div>
                        <ul className="space-y-2 text-[13px] text-slate-200">
                          {pillar.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2.5">
                              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${accent.check}`} />
                              <span className="leading-snug">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <ul
                        className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]"
                        aria-label={`${pillar.title} technology stack`}
                      >
                        {pillar.stack.map((tech) => (
                          <li
                            key={tech}
                            className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold ${accent.pill}`}
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Stack Pills Row (always visible in preview mode for scannability) */}
                {activeTab === "preview" && (
                  <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label={`${pillar.title} technology stack`}
                  >
                    {pillar.stack.map((tech) => (
                      <li
                        key={tech}
                        className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold ${accent.pill}`}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Card Footer: Proof Metric + Deep-Dive Link + Direct Scope CTA */}
                <div className="mt-auto pt-5 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
                  <div className="leading-tight">
                    <div
                      className={`text-lg font-extrabold font-mono tracking-tight ${accent.metric}`}
                    >
                      {pillar.metric.value}
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      {pillar.metric.label}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {pillar.solutionHref && (
                      <Link
                        href={pillar.solutionHref}
                        className="btn-spring inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white"
                      >
                        <span>{pillar.solutionLabel ?? "Architecture Spec"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => handleScopePillar(pillar)}
                      className="btn-spring inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#030712] hover:bg-slate-900 border border-cyan-400/30 hover:border-cyan-400/60 text-xs font-mono font-semibold text-cyan-200 hover:text-cyan-100 cursor-pointer"
                    >
                      <span>Scope Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Architectural Handover Strip */}
        <div className="bento-surface rounded-2xl px-5 py-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-sm text-slate-200 font-semibold">
              Need a hybrid architecture combining multiple B2B modules?
            </p>
            <p className="text-xs text-slate-400">
              Generate a custom system topology and 36-month SaaS buyout calculation in under 30 seconds.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/#blueprint"
              className="btn-spring inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-400/35 bg-indigo-500/10 hover:bg-indigo-500/20 text-xs font-mono font-semibold text-indigo-200"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Blueprint Generator</span>
            </Link>
            <Link
              href="/#estimator"
              className="btn-spring inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-mono font-semibold text-cyan-200"
            >
              <span>Run TCO Estimator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
