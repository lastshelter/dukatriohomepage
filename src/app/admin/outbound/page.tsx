"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Calendar,
  ExternalLink,
  Trash2,
  Edit2,
  Sparkles,
  TrendingUp,
  Building2,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Send,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  AlertCircle,
  X,
} from "lucide-react";
import type { OutboundLead, OutboundMetrics, NewOutboundLead } from "@/utils/outboundDb";

const WEDGE_OPTIONS = [
  "Field Ticket & Material OCR Pipeline",
  "Specialized Fleet & Dispatch Desk",
  "B2B Underwriting / BFS Harvest",
  "Excel-to-Custom Portal",
  "SaaS Subscription Consolidation",
  "Multi-Tenant Client Vault",
] as const;

const STATUS_CONFIG: Record<
  OutboundLead["status"],
  { label: string; badge: string; dot: string }
> = {
  contacted: {
    label: "Contacted",
    badge: "bg-slate-900 border-slate-700 text-slate-300",
    dot: "bg-slate-400",
  },
  replied: {
    label: "Replied / Dialogue",
    badge: "bg-cyan-950/70 border-cyan-700/60 text-cyan-300",
    dot: "bg-cyan-400",
  },
  meeting_booked: {
    label: "Demo Booked",
    badge: "bg-teal-950/70 border-teal-700/60 text-teal-300",
    dot: "bg-teal-400 animate-pulse",
  },
  negotiation: {
    label: "In Scope / Proposal",
    badge: "bg-amber-950/70 border-amber-700/60 text-amber-300",
    dot: "bg-amber-400",
  },
  won: {
    label: "Closed Won (€4.8k+)",
    badge: "bg-emerald-950/80 border-emerald-500 text-emerald-300",
    dot: "bg-emerald-400",
  },
  lost: {
    label: "Closed Lost",
    badge: "bg-rose-950/60 border-rose-800 text-rose-400",
    dot: "bg-rose-500",
  },
};

export default function OutboundLeadsAdminPage(): React.JSX.Element {
  const [leads, setLeads] = useState<OutboundLead[]>([]);
  const [metrics, setMetrics] = useState<OutboundMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [wedgeFilter, setWedgeFilter] = useState<string>("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingLead, setEditingLead] = useState<OutboundLead | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<Partial<NewOutboundLead>>({
    company_name: "",
    contact_name: "",
    role: "",
    channel: "linkedin",
    profile_url: "",
    wedge_type: WEDGE_OPTIONS[0],
    status: "contacted",
    last_followup_at: "",
    notes: "",
  });

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (wedgeFilter !== "all") params.set("wedge", wedgeFilter);

      const res = await fetch(`/api/admin/outbound?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setLeads(json.data.leads);
        setMetrics(json.data.metrics);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, wedgeFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleOpenAdd = () => {
    setEditingLead(null);
    setFormData({
      company_name: "",
      contact_name: "",
      role: "",
      channel: "linkedin",
      profile_url: "",
      wedge_type: WEDGE_OPTIONS[0],
      status: "contacted",
      last_followup_at: "",
      notes: "",
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (lead: OutboundLead) => {
    setEditingLead(lead);
    setFormData({
      company_name: lead.company_name,
      contact_name: lead.contact_name,
      role: lead.role || "",
      channel: lead.channel,
      profile_url: lead.profile_url || "",
      wedge_type: lead.wedge_type,
      status: lead.status,
      last_followup_at: lead.last_followup_at || "",
      notes: lead.notes || "",
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleQuickStatusChange = async (id: number, nextStatus: OutboundLead["status"]) => {
    try {
      const res = await fetch("/api/admin/outbound", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l))
        );
        if (json.data.metrics) {
          setMetrics(json.data.metrics);
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this prospect?")) return;
    try {
      const res = await fetch(`/api/admin/outbound?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (json.data.metrics) {
          setMetrics(json.data.metrics);
        }
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      if (!formData.company_name || !formData.contact_name) {
        setErrorMsg("Company Name and Contact Name are required.");
        setSubmitting(false);
        return;
      }

      if (editingLead) {
        // Update
        const res = await fetch("/api/admin/outbound", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingLead.id,
            ...formData,
          }),
        });
        const json = await res.json();
        if (json.success) {
          setModalOpen(false);
          fetchLeads();
        } else {
          setErrorMsg(json.error || "Update failed.");
        }
      } else {
        // Create
        const res = await fetch("/api/admin/outbound", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setModalOpen(false);
          fetchLeads();
        } else {
          setErrorMsg(json.error || "Creation failed.");
        }
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = [
      "ID",
      "Company",
      "Contact",
      "Role",
      "Channel",
      "Profile URL",
      "Wedge Type",
      "Status",
      "Contacted At",
      "Last Follow-up",
      "Notes",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${(l.company_name || "").replace(/"/g, '""')}"`,
      `"${(l.contact_name || "").replace(/"/g, '""')}"`,
      `"${(l.role || "").replace(/"/g, '""')}"`,
      l.channel,
      `"${l.profile_url || ""}"`,
      `"${l.wedge_type}"`,
      l.status,
      l.contacted_at,
      l.last_followup_at || "",
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `dukatrio_outbound_leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const channelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "linkedin":
        return <Globe className="w-3.5 h-3.5 text-sky-400" />;
      case "email":
        return <Mail className="w-3.5 h-3.5 text-amber-400" />;
      case "whatsapp":
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
      case "phone":
        return <Phone className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Send className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-zinc-100 font-sans antialiased selection:bg-teal-500 selection:text-slate-950 pb-20">
      {/* Top Sovereign Header */}
      <header className="border-b border-slate-800/80 bg-[#0B0D13]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-bold text-white tracking-tight flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-400 text-slate-950 flex items-center justify-center font-black text-xs font-mono">
                D3
              </div>
              <span>DukaTrio</span>
            </Link>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Outbound Command Desk</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-mono font-bold transition shadow-lg shadow-teal-500/10 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Prospect</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Total Prospects
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              {metrics?.totalLeads ?? 0}
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Contacted: {metrics?.contactedCount ?? 0}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              In Active Dialogue
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
              {metrics?.repliedCount ?? 0}
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Positive replies awaiting call
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold">
              Demos Booked
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono tabular-nums">
              {metrics?.meetingBookedCount ?? 0}
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Discovery / Feasibility audits
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D121F] border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Active Pipeline
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              €{(metrics?.estimatedPipelineEur ?? 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Won: {metrics?.wonCount ?? 0} (€4.8k baseline)
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0D121F] border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by company, contact name, or notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-400/60"
            >
              <option value="all">All Statuses</option>
              <option value="contacted">Contacted</option>
              <option value="replied">Replied / Dialogue</option>
              <option value="meeting_booked">Demo Booked</option>
              <option value="negotiation">In Negotiation</option>
              <option value="won">Closed Won</option>
              <option value="lost">Closed Lost</option>
            </select>

            <select
              value={wedgeFilter}
              onChange={(e) => setWedgeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-400/60"
            >
              <option value="all">All Wedge Types</option>
              {WEDGE_OPTIONS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0D121F] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="py-3.5 px-4">Company &amp; Contact</th>
                  <th className="py-3.5 px-4">Solution Wedge</th>
                  <th className="py-3.5 px-4">Channel</th>
                  <th className="py-3.5 px-4">Status (Click to change)</th>
                  <th className="py-3.5 px-4">Notes / Pitch Context</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-sans">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                      {loading ? "Loading prospects..." : "No outbound leads matching criteria."}
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.contacted;
                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-900/40 transition-colors group"
                      >
                        {/* Company & Contact */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>{lead.company_name}</span>
                              {lead.profile_url && (
                                <a
                                  href={lead.profile_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-500 hover:text-teal-400 transition"
                                  title="Open Profile"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <div className="text-slate-400 text-xs">
                              <span className="text-slate-200">{lead.contact_name}</span>
                              {lead.role && <span className="text-slate-500"> &bull; {lead.role}</span>}
                            </div>
                          </div>
                        </td>

                        {/* Wedge */}
                        <td className="py-4 px-4 font-mono text-[11px]">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium inline-block">
                            {lead.wedge_type}
                          </span>
                        </td>

                        {/* Channel */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300 capitalize">
                            {channelIcon(lead.channel)}
                            <span>{lead.channel}</span>
                          </div>
                        </td>

                        {/* Status (Live Selector) */}
                        <td className="py-4 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleQuickStatusChange(
                                lead.id,
                                e.target.value as OutboundLead["status"]
                              )
                            }
                            className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border cursor-pointer focus:outline-none ${statusInfo.badge}`}
                          >
                            <option value="contacted">Contacted</option>
                            <option value="replied">Replied</option>
                            <option value="meeting_booked">Demo Booked</option>
                            <option value="negotiation">Negotiation</option>
                            <option value="won">Closed Won</option>
                            <option value="lost">Closed Lost</option>
                          </select>
                        </td>

                        {/* Notes */}
                        <td className="py-4 px-4 max-w-xs">
                          <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                            {lead.notes || <span className="text-slate-600 italic">No notes</span>}
                          </p>
                          {lead.last_followup_at && (
                            <span className="text-[10px] font-mono text-amber-400 mt-1 block">
                              Follow-up: {lead.last_followup_at}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(lead)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                              title="Edit Lead"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0D121F] border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>{editingLead ? "Edit Prospect Details" : "Add New Outbound Prospect"}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold font-mono">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alpine Haulage Ltd"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold font-mono">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold font-mono">Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Operations Director"
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold font-mono">Channel</label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-400"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="email">Cold Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Direct Call</option>
                    <option value="in_person">In-Person / Referral</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold font-mono">Profile / Website URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/prospect"
                  value={formData.profile_url || ""}
                  onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold font-mono">Solution Wedge *</label>
                  <select
                    value={formData.wedge_type}
                    onChange={(e) => setFormData({ ...formData, wedge_type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-400 text-xs"
                  >
                    {WEDGE_OPTIONS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold font-mono">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as OutboundLead["status"],
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-400 text-xs"
                  >
                    <option value="contacted">Contacted</option>
                    <option value="replied">Replied / Dialogue</option>
                    <option value="meeting_booked">Demo Booked</option>
                    <option value="negotiation">In Negotiation</option>
                    <option value="won">Closed Won</option>
                    <option value="lost">Closed Lost</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold font-mono">Follow-up Target</label>
                <input
                  type="text"
                  placeholder="e.g. Next Monday 10:00 or 2026-10-26"
                  value={formData.last_followup_at || ""}
                  onChange={(e) => setFormData({ ...formData, last_followup_at: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold font-mono">Notes &amp; Specific Angle</label>
                <textarea
                  rows={3}
                  placeholder="Mentioned pain around 40-hr Excel reconciliation every Friday night..."
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono font-bold text-xs transition shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingLead ? "Save Changes" : "Create Prospect"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
