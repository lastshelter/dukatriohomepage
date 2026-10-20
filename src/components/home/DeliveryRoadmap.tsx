"use client";

import React, { useState } from "react";
import { Workflow, ArrowRight, FileCode2, Copy, Check, Terminal } from "lucide-react";

interface HandoverFile {
  filename: string;
  badge: string;
  description: string;
  code: string;
}

const HANDOVER_FILES: HandoverFile[] = [
  {
    filename: "docker-compose.prod.yml",
    badge: "SOVEREIGN RUNTIME",
    description:
      "Reproducible single-command production stack running on your private European Linux VPS with zero vendor lock-in.",
    code: `services:
  caddy:
    image: caddy:2.8-alpine
    restart: unless-stopped
    ports: ["80:80", "443:443", "443:443/udp"]
    volumes: ["./Caddyfile:/etc/caddy/Caddyfile:ro", "caddy_data:/data"]
  app:
    build: { context: ., dockerfile: Dockerfile.standalone }
    restart: unless-stopped
    env_file: .env.production
    depends_on: [postgres]
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    volumes: ["pg_data:/var/lib/postgresql/data"]`,
  },
  {
    filename: "Caddyfile",
    badge: "TLS 1.3 + HTTP/3 QUIC",
    description:
      "Automated Let's Encrypt TLS 1.3 certificates, strict zero-trust security headers, and Zstandard/Gzip edge compression.",
    code: `portal.yourcompany.com {
  encode zstd gzip
  header {
    Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    X-Content-Type-Options "nosniff"
    X-Frame-Options "DENY"
    -Server
  }
  reverse_proxy app:3000
}`,
  },
  {
    filename: "prisma/schema.prisma",
    badge: "ACID + AUDIT LEDGER",
    description:
      "Strict relational integrity with role-based access control (RBAC) and an immutable JSON diff audit trail on every record change.",
    code: `model AuditLog {
  id          String   @id @default(uuid())
  actorId     String
  actorRole   Role     @default(OPERATOR)
  entityTable String
  beforeJson  Json?
  afterJson   Json
  ipAddress   String
  createdAt   DateTime @default(now())
  @@index([entityTable, createdAt(sort: Desc)])
}`,
  },
  {
    filename: "HANDOVER_SLA.md",
    badge: "100% IP TRANSFER",
    description:
      "Contractual assignment of 100% source code, SSH root keys, database credentials, and 30-day warranty coverage.",
    code: `# DUKATRIO DAY-14 SOVEREIGN HANDOVER MANIFEST
- [x] 100% Git Repository & Commit History Transferred to Client Org
- [x] Root SSH Keys & Hetzner Cloud Firewall Ownership Assigned
- [x] Automated Nightly AES-256 Database Snapshot Cron Verified
- [x] Zero Recurring Seat Licences or Proprietary Agency Dependencies
- [x] 30-Day Post-Launch Engineering Warranty Active`,
  },
];

export default function DeliveryRoadmap(): React.JSX.Element {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const activeFile = HANDOVER_FILES[selectedFileIndex];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(activeFile.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="process" className="py-24 sm:py-32 relative border-t border-white/[0.07] bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F17] border border-white/[0.08] text-teal-400 font-mono text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5 text-teal-400" />
            <span>Structured Delivery Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How We Work: From Bottleneck to Production in 14 Days.
          </h2>

          <p className="text-base text-slate-400 leading-relaxed font-normal">
            No endless discovery meetings. No billable hour traps. A predictable, de-risked delivery protocol taking your team from workflow bottleneck to live, self-hosted deployment.
          </p>
        </div>

        {/* 3-Step Process Grid */}
        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 01 */}
          <div className="spotlight-card bento-surface rounded-3xl p-8 space-y-6 relative group">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black font-mono text-teal-400">01</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-teal-950/60 border border-teal-800/60 text-teal-300 uppercase">
                Day 1–2
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                15-Minute Architecture Audit
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                We audit your current spreadsheet, broken workflow, or bloated SaaS subscription stack. No high-pressure sales pitch—just direct engineering feasibility.
              </p>
            </div>

            <ul className="pt-2 space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>Workflow &amp; spreadsheet bottleneck review</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>Hosting &amp; single-tenant database plan</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>Zero sales fluff—pure technical scoping</span>
              </li>
            </ul>
          </div>

          {/* Step 02 */}
          <div className="spotlight-card bento-surface rounded-3xl p-8 space-y-6 relative group">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black font-mono text-cyan-400">02</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 uppercase">
                Within 48 Hours
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Relational Schema &amp; Fixed-Price Spec
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                You receive an interactive schema draft, clear milestone deliverables, and a guaranteed fixed-price quote with zero ambiguous billing.
              </p>
            </div>

            <ul className="pt-2 space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>Entity-relationship schema &amp; API contract</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>Clear milestone timeline (10–14 days)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>Contractual fixed-price delivery guarantee</span>
              </li>
            </ul>
          </div>

          {/* Step 03 */}
          <div className="spotlight-card bento-surface rounded-3xl p-8 space-y-6 relative group">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black font-mono text-indigo-400">03</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 uppercase">
                Day 10–14
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Rapid Build &amp; Private Deployment
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                We build in continuous staging increments, test on real data, deploy onto your private VPS, and hand over the keys and full code repository.
              </p>
            </div>

            <ul className="pt-2 space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>Private Hetzner / Linux VPS cutover</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>100% Git repository &amp; Docker IP transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>30-day post-launch technical warranty</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* INTERACTIVE DAY-14 GIT & INFRASTRUCTURE HANDOVER EXPLORER */}
        {/* ===================================================================== */}
        <div className="bento-surface rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl">
          <div className="px-5 py-4 bg-[#030712]/90 border-b border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-bold">
                DAY-14 GIT REPOSITORY &amp; INFRASTRUCTURE HANDOVER INSPECTOR
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[10px] font-bold text-emerald-300">
              ZERO VENDOR LOCK-IN · FULL ROOT ACCESS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left File Tree */}
            <div className="lg:col-span-4 p-4 border-b lg:border-b-0 lg:border-r border-white/[0.07] bg-[#030712]/50 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 pb-1">
                Delivered Production Artifacts
              </div>
              {HANDOVER_FILES.map((file, idx) => {
                const isSelected = idx === selectedFileIndex;
                return (
                  <button
                    key={file.filename}
                    type="button"
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400/40 text-white"
                        : "bg-slate-950/60 border-white/[0.05] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileCode2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-mono text-xs font-semibold truncate">
                        {file.filename}
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[9px] font-mono text-cyan-300 shrink-0">
                      {file.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Code Preview */}
            <div className="lg:col-span-8 p-5 sm:p-6 bg-[#030712]/90 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs font-bold text-cyan-300">
                    /{activeFile.filename}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{activeFile.description}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] font-mono text-xs text-slate-300 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-[#0B0F17] border border-white/[0.07] font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                <code>{activeFile.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Action Link into Contact Desk */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bento-surface">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Have a bottlenecked workflow or spreadsheet ready to audit?</h4>
            <p className="text-xs text-slate-400">Book your 15-minute architectural feasibility call. We respond within 4 hours.</p>
          </div>
          <a
            href="#contact"
            className="py-3 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 btn-tactile flex items-center gap-2 shrink-0"
          >
            <span>Book 15-Min Audit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
