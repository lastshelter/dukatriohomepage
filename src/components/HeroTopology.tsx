"use client";

import React, { useState } from "react";
import {
  Wifi,
  WifiOff,
  Smartphone,
  ShieldCheck,
  Cpu,
  Database,
  HardDrive,
  Plus,
  RefreshCw,
  CheckCircle2,
  Activity,
} from "lucide-react";

export type BlueprintTopologyId = "portal" | "pwa" | "intake";

interface TopologyNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  latency: string;
  protocol: string;
  runtime: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOPOLOGY_BY_BLUEPRINT: Record<BlueprintTopologyId, TopologyNode[]> = {
  pwa: [
    {
      id: "edge-client",
      step: "01",
      title: "SvelteKit Field PWA",
      subtitle: "IndexedDB Outbox + Wasm OCR",
      latency: "0.4ms local",
      protocol: "ServiceWorker / IndexedDB",
      runtime: "On-Device WebAssembly",
      details:
        "Captures delivery dockets via camera, extracts supplier & net m³ volume in a Web Worker, and commits UUIDv7 records to IndexedDB with zero cellular signal required.",
      icon: Smartphone,
    },
    {
      id: "caddy-edge",
      step: "02",
      title: "Caddy v2 Edge Proxy",
      subtitle: "HTTP/3 QUIC · Auto TLS 1.3",
      latency: "8ms handshake",
      protocol: "HTTP/3 (QUIC) + SSE",
      runtime: "dukatrio-core-01 (EU)",
      details:
        "Terminates TLS 1.3 at the Falkenstein edge, enforces strict rate limits and security headers, and multiplexes Server-Sent Events (SSE) to dispatchers.",
      icon: ShieldCheck,
    },
    {
      id: "app-worker",
      step: "03",
      title: "Next.js 16 Command",
      subtitle: "Idempotent Sync & RBAC",
      latency: "14ms compute",
      protocol: "REST + Server Actions",
      runtime: "Node 22 Alpine Container",
      details:
        "Deduplicates replayed outbox batches by UUIDv7 key, verifies foreman/dispatcher role permissions, and flags 90-minute concrete batch expiry windows.",
      icon: Cpu,
    },
    {
      id: "db-engine",
      step: "04",
      title: "PocketBase SQLite WAL",
      subtitle: "ACID Ledger · Real-Time Stream",
      latency: "1.2ms write",
      protocol: "SQLite WAL (fsync)",
      runtime: "Embedded Go Engine",
      details:
        "Single-tenant embedded SQLite engine in Write-Ahead Logging mode delivering 10,000+ concurrent reads/sec with zero external database network hop.",
      icon: Database,
    },
    {
      id: "backup-vault",
      step: "05",
      title: "AES-256 Off-Site Vault",
      subtitle: "Automated Daily Snapshots",
      latency: "Async cron",
      protocol: "S3-Compatible TLS",
      runtime: "Isolated EU Storage",
      details:
        "Point-in-time WAL snapshots and verified ticket photos are encrypted with AES-256-GCM and replicated to off-site EU storage with 30-day retention.",
      icon: HardDrive,
    },
  ],
  portal: [
    {
      id: "edge-client",
      step: "01",
      title: "Role-Gated Web Client",
      subtitle: "CSV/XLSX Drag & Drop Grid",
      latency: "12ms render",
      protocol: "HTTPS / React 19",
      runtime: "Browser Client",
      details:
        "Replaces fragile shared workbooks with virtualized sub-50ms data grids, instant keyboard filtering, and client-side schema pre-validation before upload.",
      icon: Smartphone,
    },
    {
      id: "caddy-edge",
      step: "02",
      title: "Caddy v2 Edge Proxy",
      subtitle: "HTTP/3 QUIC · Zero-Trust Headers",
      latency: "8ms handshake",
      protocol: "HTTP/3 + HSTS",
      runtime: "dukatrio-core-01 (EU)",
      details:
        "Enforces strict CSP, HSTS, and httpOnly session cookie isolation on your dedicated private VPS with automatic Let's Encrypt certificate rotation.",
      icon: ShieldCheck,
    },
    {
      id: "app-worker",
      step: "03",
      title: "Next.js 16 App Server",
      subtitle: "Zod Validation & RBAC Guard",
      latency: "18ms compute",
      protocol: "Typed Server Actions",
      runtime: "Node 22 Alpine Container",
      details:
        "Executes row-level permission checks (Admin, Manager, Operator, Auditor) and parses 10,000+ spreadsheet rows in streaming transactions.",
      icon: Cpu,
    },
    {
      id: "db-engine",
      step: "04",
      title: "PostgreSQL 17 + Prisma",
      subtitle: "Single-Tenant ACID + Audit Log",
      latency: "2.4ms query",
      protocol: "TCP Local Socket",
      runtime: "Dedicated Postgres 17",
      details:
        "Enforces foreign-key integrity and writes an append-only JSON diff audit record (actor, timestamp, before/after payload) on every mutation.",
      icon: Database,
    },
    {
      id: "backup-vault",
      step: "05",
      title: "Encrypted Snapshot Vault",
      subtitle: "pg_dump + Off-Site Replication",
      latency: "Async cron",
      protocol: "AES-256-GCM",
      runtime: "Isolated EU Storage",
      details:
        "Nightly compressed database dumps encrypted at rest and verified for 1-click disaster recovery with 100% client data sovereignty.",
      icon: HardDrive,
    },
  ],
  intake: [
    {
      id: "edge-client",
      step: "01",
      title: "Guided Borrower Intake",
      subtitle: "Multi-Step Financial Capture",
      latency: "10ms validation",
      protocol: "HTTPS / React 19",
      runtime: "Browser Client",
      details:
        "Captures borrower revenue, debt service, and KYC files with instant field validation and zero page reloads, preventing the 62% manual review drop-off.",
      icon: Smartphone,
    },
    {
      id: "caddy-edge",
      step: "02",
      title: "Caddy v2 Edge Proxy",
      subtitle: "TLS 1.3 · Rate-Limited Intake",
      latency: "8ms handshake",
      protocol: "HTTP/3 (QUIC)",
      runtime: "dukatrio-core-01 (EU)",
      details:
        "Protects sensitive financial endpoints with IP rate-limiting, TLS 1.3 cipher suites, and strict payload size enforcement.",
      icon: ShieldCheck,
    },
    {
      id: "app-worker",
      step: "03",
      title: "DSCR Decisioning Kernel",
      subtitle: "Sub-60s Underwriting + PDF Engine",
      latency: "22ms compute",
      protocol: "Typed TS Kernel",
      runtime: "Node 22 Alpine Container",
      details:
        "Computes Debt Service Coverage Ratio (DSCR), LTV bands, and amortization schedules deterministically, then generates an indicative PDF term sheet on the fly.",
      icon: Cpu,
    },
    {
      id: "db-engine",
      step: "04",
      title: "PostgreSQL 17 + KYC Ledger",
      subtitle: "Column-Level Encrypted PII",
      latency: "2.8ms write",
      protocol: "Prisma ORM",
      runtime: "Dedicated Postgres 17",
      details:
        "Stores structured underwriting decisions, ratio breakdowns, and immutable compliance timestamps in an isolated single-tenant schema.",
      icon: Database,
    },
    {
      id: "backup-vault",
      step: "05",
      title: "AES-256 KYC Document Vault",
      subtitle: "Zero Third-Party SaaS Exposure",
      latency: "4ms stream",
      protocol: "AES-256-GCM",
      runtime: "Private EU VPS Volume",
      details:
        "Tax returns and bank statements are encrypted on disk with signed, expiring underwriter download tokens—never touching public cloud buckets.",
      icon: HardDrive,
    },
  ],
};

export default function HeroTopology({
  blueprintId,
}: {
  blueprintId: BlueprintTopologyId;
}): React.JSX.Element {
  const nodes = TOPOLOGY_BY_BLUEPRINT[blueprintId];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0].id);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [queuedPackets, setQueuedPackets] = useState<number>(0);
  const [syncedTotal, setSyncedTotal] = useState<number>(142);
  const [justSyncedCount, setJustSyncedCount] = useState<number | null>(null);

  const activeNode =
    nodes.find((n) => n.id === selectedNodeId) ?? nodes[0];

  const handleToggleOffline = () => {
    if (!isOffline) {
      setIsOffline(true);
      setQueuedPackets((prev) => (prev === 0 ? 3 : prev));
      setJustSyncedCount(null);
      setSelectedNodeId("edge-client");
    } else {
      const flushed = queuedPackets;
      setIsOffline(false);
      setQueuedPackets(0);
      setSyncedTotal((prev) => prev + flushed);
      if (flushed > 0) {
        setJustSyncedCount(flushed);
      }
    }
  };

  const handleQueuePacket = () => {
    if (isOffline) {
      setQueuedPackets((prev) => prev + 1);
    } else {
      setSyncedTotal((prev) => prev + 1);
      setJustSyncedCount(1);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Control & Simulation Strip */}
      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold border ${
              isOffline
                ? "bg-amber-950/70 border-amber-500/50 text-amber-300"
                : "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>CELLULAR DROP: OFFLINE OUTBOX MODE</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>EDGE STREAM: ONLINE (HTTP/3 QUIC)</span>
              </>
            )}
          </span>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span>
              IndexedDB Outbox:{" "}
              <strong className={isOffline ? "text-amber-300" : "text-slate-200"}>
                {queuedPackets} queued
              </strong>
            </span>
            <span className="text-slate-700">|</span>
            <span>
              ACID Ledger:{" "}
              <strong className="text-teal-300">{syncedTotal} committed</strong>
            </span>
            {justSyncedCount !== null && !isOffline && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />+{justSyncedCount} replayed
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleQueuePacket}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>{isOffline ? "Queue Offline Record" : "Send Test Payload"}</span>
          </button>

          <button
            type="button"
            onClick={handleToggleOffline}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition cursor-pointer border ${
              isOffline
                ? "bg-teal-400 hover:bg-teal-300 text-slate-950 border-teal-300"
                : "bg-amber-950/50 hover:bg-amber-950/80 border-amber-500/50 text-amber-300"
            }`}
          >
            {isOffline ? (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore Signal &amp; Replay Outbox ({queuedPackets})</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulate Cellular Drop</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5-Node Interactive Architecture Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = activeNode.id === node.id;
          const isBlockedByOffline = isOffline && index > 0;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNodeId(node.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between min-h-[136px] ${
                isSelected
                  ? "bg-teal-950/35 border-teal-400/70 shadow-[0_0_25px_-5px_rgba(45,212,191,0.25)]"
                  : isBlockedByOffline
                  ? "bg-slate-950/50 border-slate-800/60 opacity-60 hover:opacity-90"
                  : "bg-slate-950/80 border-slate-800/90 hover:border-slate-700"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-teal-400 font-bold">
                    NODE {node.step}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      isOffline && index === 0
                        ? "bg-amber-950/80 text-amber-300 border border-amber-700/50"
                        : isBlockedByOffline
                        ? "bg-slate-900 text-slate-500"
                        : "bg-slate-900 text-emerald-400"
                    }`}
                  >
                    {isOffline && index === 0
                      ? `BUFFERING (${queuedPackets})`
                      : isBlockedByOffline
                      ? "AWAITING SYNC"
                      : node.latency}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? "bg-teal-400/15 border-teal-400/50 text-teal-300"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {node.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {node.subtitle}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="truncate">{node.protocol}</span>
                <span className="text-teal-400 font-bold shrink-0">
                  {isSelected ? "INSPECTING" : "INSPECT →"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Inspector Card */}
      <div className="p-5 rounded-2xl bg-slate-950/90 border border-teal-500/30 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-teal-400 font-bold uppercase">
              NODE {activeNode.step} SPECIFICATION // {activeNode.title}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">{activeNode.runtime}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeNode.details}
          </p>
        </div>

        <div className="flex sm:flex-row md:flex-col gap-2 shrink-0 font-mono text-xs border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5">
          <div>
            <span className="text-[10px] uppercase text-slate-500 block">
              TRANSPORT PROTOCOL
            </span>
            <span className="text-slate-200 font-bold">{activeNode.protocol}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-500 block">
              BENCHMARK LATENCY
            </span>
            <span className="text-emerald-400 font-bold">{activeNode.latency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
