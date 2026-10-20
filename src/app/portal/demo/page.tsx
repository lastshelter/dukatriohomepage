"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  GitBranch,
  GitCommit,
  HardDrive,
  Lock,
  Send,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

interface Milestone {
  day: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  deliverable: string;
}

const MILESTONES: Milestone[] = [
  {
    day: "Day 01–02",
    title: "Data Audit & Relational Schema Contract",
    status: "completed",
    deliverable: "Prisma schema, entity-relationship map & Zod validation rules approved",
  },
  {
    day: "Day 03–05",
    title: "PostgreSQL & Single-Tenant Core Engine",
    status: "completed",
    deliverable: "Postgres 16 local socket, RBAC permissions & encrypted document storage pipeline",
  },
  {
    day: "Day 06–08",
    title: "Client Portal Frontend & OCR / Webhooks",
    status: "in-progress",
    deliverable: "Next.js 16 App Router UI, IndexedDB outbox queue & camera OCR verification",
  },
  {
    day: "Day 09–11",
    title: "Hetzner Cloud VPS Deployment & Caddy Edge",
    status: "pending",
    deliverable: "Docker Compose cluster, automated TLS 1.3 & nightly AES-256 backup cron",
  },
  {
    day: "Day 12–14",
    title: "Sanitized Data Migration & 100% IP Handover",
    status: "pending",
    deliverable: "Root SSH keys, full Git repository transfer & 30-day technical warranty signoff",
  },
];

const COMMITS = [
  {
    hash: "a4f89d1",
    time: "24m ago",
    msg: "feat(ocr): bump vision confidence threshold to 99.4% on crumpled dockets",
    author: "petar@dukatrio.com",
  },
  {
    hash: "8c12b70",
    time: "2h ago",
    msg: "db(migration): add composite index to audit_logs(tenant_id, created_at desc)",
    author: "petar@dukatrio.com",
  },
  {
    hash: "6e901aa",
    time: "5h ago",
    msg: "sec(caddy): configure HTTP/3 QUIC and strict HSTS 63072000 preload header",
    author: "petar@dukatrio.com",
  },
  {
    hash: "3b09dc4",
    time: "Yesterday",
    msg: "perf(cache): wire zero-JS static edge caching for unauthenticated landing routes",
    author: "petar@dukatrio.com",
  },
];

export default function ClientPortalDemoPage(): React.JSX.Element {
  const [messages, setMessages] = useState<
    Array<{ sender: "client" | "architect"; text: string; time: string }>
  >([
    {
      sender: "architect",
      text: "Welcome to your sprint workspace, Marko. We have completed the Prisma schema migration and are currently wiring the IndexedDB offline camera queue. Staging build 409 is available for testing.",
      time: "09:42 CET",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "commits" | "infrastructure">("overview");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText("");
    const newMessages = [
      ...messages,
      { sender: "client" as const, text: userMsg, time: "Just now" },
    ];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "architect" as const,
          text: `Acknowledged: "${userMsg.slice(0, 50)}...". Petar has reviewed this requirement and staged it into Day 09 deploy.`,
          time: "Just now",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#0B0F17]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dukatrio.com</span>
            </Link>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-sm text-white">Acme Logistics DOO</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 font-mono text-[10px] text-cyan-300">
                ACTIVE 14-DAY SPRINT · DAY 08 / 14
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Dedicated Host: <strong className="text-emerald-400">caddy.eu-central.hetzner</strong>
            </span>
            <Link
              href="/#contact"
              className="btn-spring px-3.5 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider"
            >
              Book Your Sprint
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sprint Status Bar */}
        <div className="bento-surface rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                <span>Live Sprint Progress Telemetry // Fixed-Milestone Protocol</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sprint 01: Offline Field Operations &amp; OCR Docket Engine
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://gradiliste.dukatrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-spring inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/35 font-mono text-xs font-bold text-cyan-300"
              >
                <span>Launch Staging Sandbox</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="px-3.5 py-2 rounded-xl bg-[#030712] border border-white/[0.08] font-mono text-xs text-slate-300">
                Fixed Milestone: <strong className="text-emerald-400">€4,800 (50% Staged)</strong>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Sprint Timeline: Day 08 of 14</span>
              <span className="text-cyan-300 font-bold">57% Complete · Staging Verified</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-white/[0.05]">
              <div className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 w-[57%]" />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#030712]/80 border border-white/[0.06] font-mono">
              <span className="text-[10px] text-slate-400 uppercase block">Code Ownership</span>
              <span className="text-base font-bold text-emerald-400">100% Client Org</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#030712]/80 border border-white/[0.06] font-mono">
              <span className="text-[10px] text-slate-400 uppercase block">Monthly SaaS Toll</span>
              <span className="text-base font-bold text-cyan-300">€0 / seat</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#030712]/80 border border-white/[0.06] font-mono">
              <span className="text-[10px] text-slate-400 uppercase block">EU VPS Overhead</span>
              <span className="text-base font-bold text-slate-200">€38 / mo flat</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#030712]/80 border border-white/[0.06] font-mono">
              <span className="text-[10px] text-slate-400 uppercase block">Post-Launch SLA</span>
              <span className="text-base font-bold text-indigo-300">30-Day Warranty</span>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-200 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Milestone Roadmap (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("commits")}
            className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "commits"
                ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-200 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Live Git Feed ({COMMITS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("infrastructure")}
            className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "infrastructure"
                ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-200 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Sovereign VPS Health
          </button>
        </div>

        {/* Tab Contents + Architect Chat Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Active Tab View */}
          <div className="lg:col-span-7 space-y-4">
            {activeTab === "overview" && (
              <div className="space-y-3">
                {MILESTONES.map((m) => (
                  <div
                    key={m.title}
                    className="p-4 rounded-2xl bento-surface border border-white/[0.07] flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{m.day}</span>
                        <span className="text-slate-600">·</span>
                        <h3 className="font-bold text-white text-sm">{m.title}</h3>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {m.deliverable}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold shrink-0 uppercase ${
                        m.status === "completed"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                          : m.status === "in-progress"
                          ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 animate-pulse"
                          : "bg-slate-900 text-slate-500 border border-slate-800"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "commits" && (
              <div className="bento-surface rounded-3xl p-5 border border-white/[0.08] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-slate-400">
                  <span className="flex items-center gap-2">
                    <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                    <span>branch: main (verified CI/CD pipeline)</span>
                  </span>
                  <span>auto-deploy on push</span>
                </div>
                {COMMITS.map((c) => (
                  <div
                    key={c.hash}
                    className="p-3 rounded-xl bg-[#030712] border border-white/[0.05] flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="text-slate-200 font-semibold truncate">{c.msg}</div>
                      <div className="text-[10px] text-slate-500">
                        {c.author} · commit {c.hash}
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-400 shrink-0">{c.time}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "infrastructure" && (
              <div className="bento-surface rounded-3xl p-6 border border-white/[0.08] space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-white font-bold flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>Hetzner Cloud VPS: CPX31 (Falkenstein, DE)</span>
                  </span>
                  <span className="text-emerald-400 font-bold">ALL SERVICES HEALTHY</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#030712] border border-white/[0.05] space-y-1">
                    <span className="text-slate-500 block">CPU USAGE</span>
                    <span className="text-lg font-bold text-white">4.8%</span>
                    <span className="text-[10px] text-slate-400 block">4 vCPU AMD EPYC™</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#030712] border border-white/[0.05] space-y-1">
                    <span className="text-slate-500 block">RAM CONSUMPTION</span>
                    <span className="text-lg font-bold text-white">1.2 GB / 8 GB</span>
                    <span className="text-[10px] text-slate-400 block">Postgres + Node Standalone</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#030712] border border-white/[0.05] space-y-1 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span>Edge TLS Termination:</span>
                    <span className="text-cyan-300">Caddy 2.8 (TLS 1.3 / HTTP/3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nightly AES-256 Off-Site Backup:</span>
                    <span className="text-emerald-300">Verified 03:00 CET</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendor Lock-in Risk:</span>
                    <span className="text-emerald-400">0% (Pure Docker Compose)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Direct Architect Desk Simulation */}
          <div className="lg:col-span-5 bento-surface rounded-3xl p-5 sm:p-6 border border-white/[0.08] flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-xs text-cyan-300 font-mono">
                    PD
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Petar D.</span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      ● Lead Architect Online
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">&lt; 15m Response SLA</span>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === "client"
                        ? "bg-cyan-950/60 border border-cyan-500/30 text-cyan-100 ml-6"
                        : "bg-[#030712] border border-white/[0.06] text-slate-300 mr-6"
                    }`}
                  >
                    <div>{m.text}</div>
                    <div className="text-[9px] font-mono text-slate-500 pt-1 text-right">
                      {m.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="pt-4 border-t border-white/[0.06] flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type requirement or test question to architect..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#030712] border border-white/[0.08] text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 font-sans"
              />
              <button
                type="submit"
                className="btn-spring px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bento-surface rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/[0.08]">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">
              Ready to replace your SaaS bloat with your own 14-day dedicated sprint?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Fixed €4,800 milestone. 100% source code ownership. Zero recurring per-seat fees.
            </p>
          </div>
          <Link
            href="/#contact"
            className="btn-spring px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shrink-0"
          >
            <span>Book 15-Min Feasibility Audit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
