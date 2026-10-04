"use client";

import React, { useState } from "react";
import {
  Code2,
  Database,
  Server,
  Cpu,
} from "lucide-react";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "devops";
  version: string;
  role: string;
  metric: string;
  useCase: string;
  tags: string[];
}

const TECH_ITEMS: TechItem[] = [
  // Frontend
  {
    name: "Next.js 16 (App Router)",
    category: "frontend",
    version: "v16.2.7",
    role: "Hybrid React Server Components & Streaming UI",
    metric: "< 24ms TTFB at Edge",
    useCase: "Used across all client-facing platforms for instant page transitions and server-side pre-rendering.",
    tags: ["RSC Architecture", "Dynamic Streaming", "Standalone Output"],
  },
  {
    name: "React 19 & TypeScript 5",
    category: "frontend",
    version: "v19.2 / TS 5.8",
    role: "Type-Strict Component Tree & Concurrent Primitives",
    metric: "100% Compile-Time Safety",
    useCase: "Powers mission-critical financial calculations without floating-point visual errors or client runtime crashes.",
    tags: ["Strict Null Checks", "Zero Unsafe Any", "Optimistic Actions"],
  },
  {
    name: "Tailwind CSS v4 & Lucide",
    category: "frontend",
    version: "v4.0 Engine",
    role: "Utility-First Institutional Design Tokens",
    metric: "0kb Runtime Overhead",
    useCase: "Enforces frosted-glass cards, high-contrast typography, and adaptive layouts across all viewports.",
    tags: ["CSS Variables", "Modern Backdrop Blur", "Hardware Acceleration"],
  },

  // Backend & Data
  {
    name: "Prisma ORM & Connection Pools",
    category: "backend",
    version: "v7.0 Engine",
    role: "Type-Safe Relational Data Layer & Migrations",
    metric: "Sub-12ms Prepared Queries",
    useCase: "Dual-pool configuration supporting high-concurrency PostgreSQL alongside embedded SQLite test fixtures.",
    tags: ["Connection Pool Tuning", "ACID Transactions", "Type-Generated Client"],
  },
  {
    name: "Node.js 22 LTS Runtime",
    category: "backend",
    version: "v22.x LTS",
    role: "High-Throughput Asynchronous Server Engine",
    metric: "12,000+ Req/Sec Pod Throughput",
    useCase: "Executes financial amortization math, PDF rendering streams, and encrypted webhook dispatchers.",
    tags: ["V8 JIT Optimization", "Native Crypto APIs", "Event Loop Resiliency"],
  },
  {
    name: "AES-256 Field-Level Encryption",
    category: "backend",
    version: "GCM Mode",
    role: "Zero-Knowledge Data Vault & Secure Ingestion",
    metric: "Bank-Grade Cryptography",
    useCase: "Protects borrower financial statements and tax documents both at rest and during transit.",
    tags: ["Hardware Accelerated AES", "HMAC Verification", "Strict Nonces"],
  },

  // Systems & DevOps
  {
    name: "Caddy v2 Edge Reverse Proxy",
    category: "devops",
    version: "v2.8+",
    role: "Automated Edge TLS & HTTP/3 Transport",
    metric: "A+ Qualys SSL Rating",
    useCase: "Terminates TLS with automated Let's Encrypt certificates and reverse proxies traffic to local standalone Node instances.",
    tags: ["HTTP/3 (QUIC)", "Zero-Config Certs", "Sub-1ms Reverse Proxy"],
  },
  {
    name: "PM2 Process Orchestration",
    category: "devops",
    version: "Cluster Mode",
    role: "Multi-Core CPU Clustering & Zero-Downtime Reloads",
    metric: "99.99% Node Availability",
    useCase: "Monitors memory limits, restarts unhealthy threads automatically, and performs seamless hot deploys.",
    tags: ["Zero-Downtime Reloads", "Memory Threshold Watch", "Core Affinity"],
  },
  {
    name: "Bare-Metal Cloud Pods",
    category: "devops",
    version: "AMD EPYC™ NVMe",
    role: "Dedicated High-IOPS Compute Architecture",
    metric: "> 650,000 IOPS Read/Write",
    useCase: "Runs database pools and compute threads on isolated Linux kernels without noisy-neighbor degradation.",
    tags: ["NVMe Gen4 Storage", "Dedicated vCPUs", "Isolated Pod Network"],
  },
];

export default function TechStackMatrix(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "devops">("frontend");

  const filteredItems = TECH_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="tech-matrix" className="py-24 sm:py-32 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Production Systems Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Verified Technical Stack.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Our engineering stack is chosen strictly for mathematical accuracy, zero memory bloat, high IOPS, and unbreakable uptime.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-start sm:justify-center">
          <div className="p-1.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("frontend")}
              className={`py-2 px-4 sm:px-6 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "frontend"
                  ? "bg-cyan-950/70 border border-cyan-500/80 text-cyan-300 font-bold shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Frontend Architecture</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("backend")}
              className={`py-2 px-4 sm:px-6 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "backend"
                  ? "bg-cyan-950/70 border border-cyan-500/80 text-cyan-300 font-bold shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Backend &amp; Data Persistence</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("devops")}
              className={`py-2 px-4 sm:px-6 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "devops"
                  ? "bg-cyan-950/70 border border-cyan-500/80 text-cyan-300 font-bold shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Systems &amp; DevOps</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-xl hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <span className="font-mono text-[11px] text-cyan-400/90 font-bold uppercase tracking-wider">
                    {item.version}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-[10px] font-semibold">
                    {item.metric}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 block font-medium">
                    {item.role}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {item.useCase}
                </p>
              </div>

              <div className="pt-6 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
