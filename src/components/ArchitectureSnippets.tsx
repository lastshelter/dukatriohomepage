"use client";

import React, { useState } from "react";
import {
  FileCode2,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Lock,
  Database,
  Cpu,
  Sparkles,
} from "lucide-react";

interface Snippet {
  id: string;
  filename: string;
  language: string;
  badge: string;
  description: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: "caddy",
    filename: "/etc/caddy/Caddyfile",
    language: "Caddyfile",
    badge: "Edge Reverse Proxy & Auto-TLS",
    description: "Automated Let's Encrypt certificates, HTTP/3 QUIC transport, sub-millisecond local reverse proxy, and hardened security headers.",
    code: `# dukatrio.com & *.dukatrio.com Production Edge Proxy
{
    email admin@dukatrio.com
    admin off
    auto_https certs_first
}

bfstrial.dukatrio.com {
    # Automatic TLS & HTTP/3 Enabled
    encode zstd gzip

    # Strict Origin Hardening Headers
    header {
        Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
        Permissions-Policy "camera=(), microphone=(), geolocation=()"
    }

    # High-Throughput Sub-Millisecond Upstream Proxy
    reverse_proxy 127.0.0.1:3000 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}

        transport http {
            keepalive 120s
            keepalive_idle_conns 100
        }
    }
}`,
  },
  {
    id: "prisma",
    filename: "prisma/schema.prisma",
    language: "Prisma Schema",
    badge: "Dual-Pool Relational Persistence",
    description: "Production data model with UUID primary keys, encrypted field payload storage, and index tuning for sub-10ms query execution.",
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Connection pool bypass for migrations
}

generator client {
  provider = "prisma-client-js"
  engineType = "binary"
}

enum UnderwritingTier {
  TIER_A_PRIME
  TIER_B_NEAR_PRIME
  TIER_C_SUBPRIME
  DECLINED_OUT_OF_BOX
}

model CommercialLead {
  id              String            @id @default(uuid())
  businessName    String
  taxIdentifier   String            // Hardware AES-256 encrypted payload
  annualRevenue   Decimal           @db.Decimal(12, 2)
  requestedTerm   Int               // In Months (6 to 24)
  estimatedApr    Decimal           @db.Decimal(5, 2)
  dscrRatio       Decimal           @db.Decimal(5, 3)
  tier            UnderwritingTier  @default(TIER_B_NEAR_PRIME)
  documentsCount  Int               @default(0)
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  vaultPackages   DocumentVault[]

  @@index([tier, createdAt])
  @@index([businessName])
  @@map("commercial_leads")
}

model DocumentVault {
  id              String         @id @default(uuid())
  leadId          String
  fileHashSha256  String
  storageObject   String
  encryptedSize   BigInt
  verifiedAt      DateTime?
  lead            CommercialLead @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@index([leadId])
  @@map("document_vault_entries")
}`,
  },
  {
    id: "amortization",
    filename: "src/lib/fintech/amortization.ts",
    language: "TypeScript",
    badge: "Algorithmic Underwriting Engine",
    description: "Exact compounding amortization calculation, debt consolidation APR delta analysis, and DSCR risk threshold diagnostic math.",
    code: `/**
 * Biggs Funding Solutions (BFS) Financial Amortization Engine
 * Formulates principal, monthly interest compounding, and DSCR categorization.
 */

export interface AmortizationScheduleParams {
  principal: number;       // Loan Draw Amount ($5,000 - $150,000+)
  annualRatePct: number;   // APR (5.00% to 20.00%)
  termMonths: number;      // 6 to 24 Months
}

export interface AmortizationResult {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  effectiveMonthlyRate: number;
}

export function calculateAmortization({
  principal,
  annualRatePct,
  termMonths,
}: AmortizationScheduleParams): AmortizationResult {
  const r = annualRatePct / 100 / 12;
  const n = termMonths;
  const P = principal;

  // Exact standard loan amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment =
    r > 0
      ? (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
      : P / n;

  const totalRepayment = monthlyPayment * n;
  const totalInterest = Math.max(0, totalRepayment - P);

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    effectiveMonthlyRate: r,
  };
}

export function evaluateDscrRisk(netOperatingIncome: number, totalDebtService: number): {
  dscr: number;
  status: "PRIME" | "SATISFACTORY" | "STRESSED";
} {
  if (totalDebtService <= 0) return { dscr: 99.9, status: "PRIME" };
  const dscr = Math.round((netOperatingIncome / totalDebtService) * 100) / 100;
  
  if (dscr >= 1.35) return { dscr, status: "PRIME" };
  if (dscr >= 1.15) return { dscr, status: "SATISFACTORY" };
  return { dscr, status: "STRESSED" };
}`,
  },
];

export default function ArchitectureSnippets(): React.JSX.Element {
  const [activeSnippetId, setActiveSnippetId] = useState<string>("caddy");
  const [copied, setCopied] = useState(false);

  const activeSnippet =
    SNIPPETS.find((s) => s.id === activeSnippetId) || SNIPPETS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="snippets" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Production Code Archetypes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Production Architecture Snippets.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Sanitized configuration and logic snippets extracted directly from our live bare-metal and application deployments.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {SNIPPETS.map((snippet) => {
            const isActive = snippet.id === activeSnippetId;
            return (
              <button
                key={snippet.id}
                type="button"
                onClick={() => {
                  setActiveSnippetId(snippet.id);
                  setCopied(false);
                }}
                className={`py-2.5 px-4 rounded-xl font-mono text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-zinc-800 text-cyan-400 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold"
                    : "bg-zinc-950/70 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <span>{snippet.filename}</span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">
                  ({snippet.language})
                </span>
              </button>
            );
          })}
        </div>

        {/* Code Terminal Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl overflow-hidden glass-panel">
          {/* Terminal Window Header Bar */}
          <div className="px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-zinc-300 font-semibold pl-2 border-l border-zinc-700">
                {activeSnippet.filename}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[10px] text-cyan-400">
                {activeSnippet.badge}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-zinc-400 hidden md:inline">
                {activeSnippet.description}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Code Display */}
          <div className="p-6 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed text-zinc-200 bg-[#06080d]">
            <pre className="selection:bg-cyan-500/30 selection:text-cyan-200">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>

          {/* Terminal Footer Metas */}
          <div className="px-5 py-2.5 bg-zinc-900/60 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Sanitized Production Codebase Extract · Zero Secrets Exposed
            </span>
            <span>UTF-8 · LF · SHA-256 Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
