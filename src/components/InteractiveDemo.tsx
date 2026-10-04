"use client";

import React, { useState, useMemo } from "react";
import {
  RotateCcw,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Terminal,
  Layers,
  Sparkles,
  Database,
  UserCheck,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type DemoRole = "admin" | "manager" | "client";
export type DemoStatus = "ALL" | "APPROVED" | "PROCESSING" | "REVIEW";

export interface DemoRecord {
  id: string;
  title: string;
  entity: string;
  category: string;
  amountOrVolume: string;
  status: "APPROVED" | "PROCESSING" | "REVIEW";
  latencyMs: number;
  timestamp: string;
  tenantId: string;
}

const INITIAL_RECORDS: DemoRecord[] = [
  {
    id: "REC-9401",
    title: "Subcontractor Structural Steel Acceptance Sign-Off",
    entity: "Alpine Real Estate Group",
    category: "Field Audit",
    amountOrVolume: "€42,850",
    status: "APPROVED",
    latencyMs: 7,
    timestamp: "Just now",
    tenantId: "TENANT-041",
  },
  {
    id: "REC-9400",
    title: "Concrete Curing Sensor Batch Telemetry (Zone 3)",
    entity: "Gradnja Partner d.o.o.",
    category: "IoT Telemetry",
    amountOrVolume: "148 m³",
    status: "PROCESSING",
    latencyMs: 12,
    timestamp: "3m ago",
    tenantId: "TENANT-041",
  },
  {
    id: "REC-9399",
    title: "Multi-Tier DSCR Underwriting Stress Run",
    entity: "Bavaria Capital Partners",
    category: "Fintech Engine",
    amountOrVolume: "€3,200,000",
    status: "APPROVED",
    latencyMs: 9,
    timestamp: "12m ago",
    tenantId: "TENANT-088",
  },
  {
    id: "REC-9398",
    title: "Disputed Overtime Hours Flagged for Supervisor Audit",
    entity: "Delta Inženjering",
    category: "Payroll Rule",
    amountOrVolume: "34.5 hrs",
    status: "REVIEW",
    latencyMs: 14,
    timestamp: "24m ago",
    tenantId: "TENANT-041",
  },
  {
    id: "REC-9397",
    title: "AES-256 Vault Document Key Exchange & Audit Stamp",
    entity: "Zürich Wealth Advisory",
    category: "Client Vault",
    amountOrVolume: "28 Files",
    status: "APPROVED",
    latencyMs: 4,
    timestamp: "45m ago",
    tenantId: "TENANT-012",
  },
  {
    id: "REC-9396",
    title: "Sub-Second Fleet Fuel Dispenser Allocation Verification",
    entity: "Balkan Trans Logistics",
    category: "Fleet Dispatch",
    amountOrVolume: "1,420 L",
    status: "APPROVED",
    latencyMs: 8,
    timestamp: "1h ago",
    tenantId: "TENANT-093",
  },
];

const SIMULATED_POOL: Omit<DemoRecord, "id" | "timestamp" | "latencyMs">[] = [
  {
    title: "Real-Time Biometric Site Entry Sync (Shift B)",
    entity: "Gradnja Partner d.o.o.",
    category: "Workforce",
    amountOrVolume: "18 Workers",
    status: "APPROVED",
    tenantId: "TENANT-041",
  },
  {
    title: "Algorithmic Loan Tier Amortization Export Generated",
    entity: "Nordic Credit Desk",
    category: "Fintech Engine",
    amountOrVolume: "€850,000",
    status: "PROCESSING",
    tenantId: "TENANT-088",
  },
  {
    title: "Concrete Pour Weather Threshold Warning Triggered",
    entity: "Vračar Tower Project",
    category: "Weather IoT",
    amountOrVolume: "32.4°C Alert",
    status: "REVIEW",
    tenantId: "TENANT-041",
  },
  {
    title: "Automated Daily Log PDF Packaged with Caddy TLS Stamp",
    entity: "Alpine Real Estate Group",
    category: "Export Engine",
    amountOrVolume: "14 Pages",
    status: "APPROVED",
    tenantId: "TENANT-041",
  },
];

export default function InteractiveDemo(): React.JSX.Element {
  const [role, setRole] = useState<DemoRole>("admin");
  const [statusFilter, setStatusFilter] = useState<DemoStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState<DemoRecord[]>(INITIAL_RECORDS);
  const [lastIngestedId, setLastIngestedId] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ingestCounter, setIngestCounter] = useState(0);

  // Filter records based on role, statusFilter, and search query
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Role-based visibility isolation simulation
      if (role === "client" && r.status !== "APPROVED") {
        return false;
      }

      // Status filter
      if (statusFilter !== "ALL" && r.status !== statusFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchEntity = r.entity.toLowerCase().includes(q);
        const matchId = r.id.toLowerCase().includes(q);
        const matchCategory = r.category.toLowerCase().includes(q);
        if (!matchTitle && !matchEntity && !matchId && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [records, role, statusFilter, searchQuery]);

  // Simulate real-time ingest
  const handleSimulateIngest = () => {
    const template = SIMULATED_POOL[ingestCounter % SIMULATED_POOL.length];
    const newId = `REC-${9402 + ingestCounter}`;
    const newRecord: DemoRecord = {
      ...template,
      id: newId,
      timestamp: "Just now",
      latencyMs: Math.floor(Math.random() * 8) + 4,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setLastIngestedId(newId);
    setIngestCounter((c) => c + 1);

    setTimeout(() => {
      setLastIngestedId(null);
    }, 2500);
  };

  // Toggle/Approve an item
  const handleApprove = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "APPROVED", latencyMs: 3 } : r))
    );
  };

  // Reset to initial
  const handleReset = () => {
    setRecords(INITIAL_RECORDS);
    setSearchQuery("");
    setStatusFilter("ALL");
    setRole("admin");
  };

  // Copy export JSON
  const exportJsonString = useMemo(() => {
    return JSON.stringify(
      {
        telemetry: {
          runtime: "Node.js 22 LTS Standalone",
          engine: "DukaTrio Reactive In-Memory Engine",
          timestamp: new Date().toISOString(),
          activeRole: role,
          tenantIsolation: "ENFORCED_STRICT",
          recordsCount: filteredRecords.length,
        },
        records: filteredRecords,
      },
      null,
      2
    );
  }, [filteredRecords, role]);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportJsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="demo" className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Operations Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Test Our Architecture Live.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md">
            Zero sign-up required. Toggle role-based access control (RBAC), filter records at sub-millisecond speeds, and simulate live event ingestion directly in your browser.
          </p>
        </div>

        {/* Sandbox Console Container */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Top Control Bar: Role Switcher & Live Engine Telemetry */}
          <div className="p-4 sm:p-6 border-b border-zinc-800 bg-zinc-950/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* RBAC Role Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2 hidden sm:inline">
                Simulated Role:
              </span>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  role === "admin"
                    ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Executive / Admin</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Full CRUD
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("manager")}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  role === "manager"
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Field Lead / Ops</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Field Ops
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("client")}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  role === "client"
                    ? "bg-indigo-950/80 border-indigo-500 text-indigo-300 shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Client Portal</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Read Only
                </span>
              </button>
            </div>

            {/* Telemetry Indicator Badges */}
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-semibold">Engine: Live (0ms)</span>
              </div>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-zinc-400">
                Isolation: <span className="text-cyan-400 font-semibold">Tenant-Safe</span>
              </span>
            </div>
          </div>

          {/* Action Row: Live Ingestion Button, Search & Status Filters */}
          <div className="p-4 sm:p-6 border-b border-zinc-800/80 bg-zinc-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search event, client, or record ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 outline-none transition font-sans"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {(["ALL", "APPROVED", "PROCESSING", "REVIEW"] as DemoStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === st
                      ? "bg-zinc-800 text-cyan-300 font-bold border border-cyan-500/40"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Action Buttons: Ingest & Export */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSimulateIngest}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_-3px_rgba(6,182,212,0.5)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Event</span>
              </button>

              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer"
                title="Export JSON payload"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
                title="Reset Sandbox"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Records List */}
          <div className="p-4 sm:p-6 space-y-3 max-h-[500px] overflow-y-auto">
            {filteredRecords.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Database className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-sm font-mono text-zinc-500">
                  No records match current role or filter criteria.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-mono text-cyan-400 underline underline-offset-4"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredRecords.map((r) => {
                const isNew = r.id === lastIngestedId;
                return (
                  <motion.div
                    key={r.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isNew
                        ? "bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]"
                        : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700"
                    }`}
                  >
                    {/* Left: ID, Title, Entity & Category */}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2.5 font-mono text-xs">
                        <span className="text-cyan-400 font-bold">{r.id}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400 text-[11px]">{r.category}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-500 text-[10px]">{r.tenantId}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {r.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans">{r.entity}</p>
                    </div>

                    {/* Middle: Volume / Metrics */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-2 md:pt-0 border-zinc-800/60">
                      <span className="font-mono text-sm sm:text-base font-extrabold text-white">
                        {r.amountOrVolume}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        Processed in {r.latencyMs}ms
                      </span>
                    </div>

                    {/* Right: Status Pill & Actions */}
                    <div className="flex items-center gap-3 justify-between md:justify-end">
                      {r.status === "APPROVED" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/70 text-emerald-300 font-mono text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Approved</span>
                        </span>
                      )}

                      {r.status === "PROCESSING" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/70 text-amber-300 font-mono text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span>Processing</span>
                        </span>
                      )}

                      {r.status === "REVIEW" && (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/70 text-rose-300 font-mono text-xs font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            <span>Audit Req.</span>
                          </span>

                          {role === "admin" && (
                            <button
                              type="button"
                              onClick={() => handleApprove(r.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950/90 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="space-y-0.5">
              <span className="text-zinc-500 text-[11px] block">TOTAL IN-MEMORY:</span>
              <span className="text-zinc-200 font-bold">{records.length} Verified Records</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-zinc-500 text-[11px] block">AVERAGE LATENCY:</span>
              <span className="text-cyan-400 font-bold">&lt; 8.4ms (Edge V8)</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-zinc-500 text-[11px] block">RBAC INTEGRITY:</span>
              <span className="text-emerald-400 font-bold">100% Isolated</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-zinc-500 text-[11px] block">REACTIVE RENDERING:</span>
              <span className="text-indigo-400 font-bold">React 19 Zero-Jank</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export JSON Modal */}
      <AnimatePresence>
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Structured Audit Payload Export
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setExportModalOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>FORMAT: JSON / AUDIT_TRAIL_V1</span>
                  <span>ENCRYPTION: HARDWARE_AES256</span>
                </div>
                <pre className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[300px]">
                  {exportJsonString}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs font-mono text-zinc-500">
                  {filteredRecords.length} records ready for data pipeline ingestion
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy JSON Payload</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportModalOpen(false)}
                    className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
