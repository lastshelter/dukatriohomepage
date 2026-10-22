"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Building2,
  Briefcase,
  Search,
  Calculator,
  CalendarClock,
  FileCode2,
  Layers,
  Sparkles,
  ShieldCheck,
  Gauge,
  Globe,
  Copy,
  Check,
  Server,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICE_PILLARS } from "@/config/servicePillars";

interface CommandItem {
  id: string;
  group: string;
  label: string;
  sublabel: string;
  href?: string;
  external?: boolean;
  action?: "copy-email" | "toggle-lang";
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const STATIC_COMMAND_ITEMS: CommandItem[] = [
  {
    id: "audit",
    group: "Quick Actions",
    label: "Book 15-Minute Feasibility Audit",
    sublabel: "Direct engineering intake · Fixed €4,800 milestone scope",
    href: "/#contact",
    icon: CalendarClock,
    badge: "2 SLOTS OPEN",
  },
  {
    id: "action-copy-email",
    group: "Quick Actions",
    label: "Copy Direct Engineering Desk Email (office@dukatrio.com)",
    sublabel: "Instant clipboard copy · Direct to Principal Systems Architect",
    action: "copy-email",
    icon: Copy,
    badge: "CLIPBOARD",
  },
  {
    id: "action-toggle-lang",
    group: "Quick Actions",
    label: "Switch Interface Language (EN ⇄ SR)",
    sublabel: "Toggle between Institutional English and Executive Serbian",
    action: "toggle-lang",
    icon: Globe,
    badge: "EN / SR",
  },
  {
    id: "portal-demo",
    group: "Interactive Engineering Tools",
    label: "Launch 14-Day Sprint Client Portal Demo",
    sublabel: "Simulate live milestone tracking, Git commits, VPS telemetry & architect desk",
    href: "/portal/demo",
    icon: Server,
    badge: "CLIENT DEMO",
  },
  {
    id: "blueprint",
    group: "Interactive Engineering Tools",
    label: "Launch AI Architecture & Blueprint Studio",
    sublabel: "Describe your bottleneck · Get stack, Prisma schema, API routes & PDF brief",
    href: "/#blueprint",
    icon: Sparkles,
    badge: "BLUEPRINT PDF",
  },
  {
    id: "sandbox",
    group: "Interactive Engineering Tools",
    label: "Interactive Case Study Sandbox (OCR & DSCR Terminal)",
    sublabel: "Test live Gradilište ticket OCR extraction & FundingSolutions DSCR underwriting",
    href: "/#sandbox",
    icon: FileCode2,
    badge: "LIVE SANDBOX",
  },
  {
    id: "estimator",
    group: "Interactive Engineering Tools",
    label: "Run 36-Month SaaS vs. Custom ROI Calculator",
    sublabel: "Calculate your exact break-even horizon and export CFO PDF brief",
    href: "/#estimator",
    icon: Calculator,
    badge: "INTERACTIVE",
  },
  {
    id: "benchmark",
    group: "Interactive Engineering Tools",
    label: "Before / After Modernization Delta Slider",
    sublabel: "Compare legacy SaaS & spreadsheet friction vs. single-tenant Next.js 16 engine",
    href: "/#benchmark",
    icon: Gauge,
    badge: "BENCHMARK",
  },
  {
    id: "guarantees",
    group: "Interactive Engineering Tools",
    label: "Production Engineering Guarantees & 100% IP Handover",
    sublabel: "30-day warranty, sub-50ms edge performance, zero per-seat licensing",
    href: "/#guarantees",
    icon: ShieldCheck,
    badge: "SLA & IP",
  },
  ...SERVICE_PILLARS.map((p) => ({
    id: `bento-${p.id}`,
    group: "7 Flagship B2B Catalogue Offerings",
    label: `${p.index} · ${p.title}`,
    sublabel: p.tagline,
    href: p.solutionHref ?? "/#solutions",
    icon: Server,
    badge: p.metric.value,
  })),
  {
    id: "sol-excel",
    group: "€4,800 Solution Blueprints",
    label: "Solution 01 · Excel-to-Custom Internal Portal",
    sublabel: "Role-gated PostgreSQL concurrency, CSV ingestion & audit logs",
    href: "/solutions/excel-to-custom-portal",
    icon: Layers,
    badge: "10–14 DAYS",
  },
  {
    id: "sol-pwa",
    group: "€4,800 Solution Blueprints",
    label: "Solution 02 · Offline-First Field Operations PWA",
    sublabel: "IndexedDB outbox queue, Web Workers camera OCR & auto-sync",
    href: "/solutions/offline-field-operations-pwa",
    icon: Building2,
    badge: "10–14 DAYS",
  },
  {
    id: "sol-intake",
    group: "€4,800 Solution Blueprints",
    label: "Solution 03 · B2B Client Intake & Underwriting Engine",
    sublabel: "Sub-60s algorithmic DSCR decisioning & private VPS KYC vault",
    href: "/solutions/b2b-client-intake-engine",
    icon: Briefcase,
    badge: "10–14 DAYS",
  },
  {
    id: "sol-saas-consolidation",
    group: "€4,800 Solution Blueprints",
    label: "Solution 04 · SaaS Subscription Consolidation Platform",
    sublabel: "Replace 6+ per-seat SaaS tools & Zapier glue with one unified engine",
    href: "/solutions/saas-subscription-consolidation",
    icon: Layers,
    badge: "€0/SEAT",
  },
  {
    id: "sol-client-vault",
    group: "€4,800 Solution Blueprints",
    label: "Solution 05 · Multi-Tenant Client Portal & AES-256 Vault",
    sublabel: "Strict tenant isolation, encrypted document exchange & audit logs",
    href: "/solutions/multi-tenant-client-vault",
    icon: ShieldCheck,
    badge: "AES-256",
  },
  {
    id: "cs-bfs-harvest",
    group: "Architecture & Live Production Systems",
    label: "Case Study · BFS Harvest SvelteKit Fintech Platform",
    sublabel: "Sub-60s underwriting, real-time DSCR kernel & sovereign Hetzner VPS",
    href: "/case-studies/bfs-harvest",
    icon: FileCode2,
    badge: "FLAGSHIP",
  },
  {
    id: "cs-gradiliste",
    group: "Architecture & Live Production Systems",
    label: "Case Study · Gradilište OS Technical Deep-Dive",
    sublabel: "SvelteKit + Next.js 16 + PocketBase (SQLite WAL) blueprint",
    href: "/case-studies/gradiliste-os",
    icon: FileCode2,
    badge: "DEEP DIVE",
  },
  {
    id: "cs-fundingsolutions",
    group: "Architecture & Live Production Systems",
    label: "Case Study · FundingSolutions DSCR & KYC Vault Deep-Dive",
    sublabel: "Sub-60s TypeScript underwriting kernel + PDF term-sheet engine",
    href: "/case-studies/fundingsolutions",
    icon: FileCode2,
    badge: "DEEP DIVE",
  },
  {
    id: "live-funding",
    group: "Architecture & Live Production Systems",
    label: "Launch FundingSolutions Decisioning Terminal",
    sublabel: "https://fundingsolutions.dukatrio.com",
    href: "https://fundingsolutions.dukatrio.com",
    external: true,
    icon: ExternalLink,
    badge: "LIVE SYSTEM",
  },
  {
    id: "live-gradiliste",
    group: "Architecture & Live Production Systems",
    label: "Launch Gradilište OS Production Portal",
    sublabel: "https://gradiliste.dukatrio.com",
    href: "https://gradiliste.dukatrio.com",
    external: true,
    icon: ExternalLink,
    badge: "LIVE SAAS",
  },
];

export default function Navbar(): React.JSX.Element {
  const { lang, setLang, toggleLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";

  const navLinks = [
    { label: lang === "sr" ? "Rešenja" : "Services", href: isHome ? "#solutions" : "/#solutions" },
    { label: lang === "sr" ? "Cene" : "Pricing", href: isHome ? "#pricing" : "/#pricing" },
    { label: lang === "sr" ? "Proces" : "Process", href: isHome ? "#process" : "/#process" },
    {
      label: lang === "sr" ? "Studije Slučaja" : "Case Studies",
      href: isHome ? "#case-studies" : "/#case-studies",
    },
    {
      label: lang === "sr" ? "ROI Kalkulator" : "Cost Estimator",
      href: isHome ? "#estimator" : "/#estimator",
    },
  ];

  const filteredCommands = STATIC_COMMAND_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sublabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setEcosystemOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setEcosystemOpen(false);
    }, 180);
  };

  const handleCommandSelect = (item: CommandItem) => {
    if (item.action === "copy-email") {
      navigator.clipboard?.writeText("office@dukatrio.com").catch(() => {});
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2400);
      setCommandOpen(false);
      return;
    }
    if (item.action === "toggle-lang") {
      toggleLang();
      setCommandOpen(false);
      return;
    }
    setCommandOpen(false);
    if (!item.href) return;
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.href.startsWith("/#") && isHome) {
      const targetId = item.href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(item.href);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setEcosystemOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((prev) => !prev);
        setEcosystemOpen(false);
        setMobileMenuOpen(false);
      } else if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setEcosystemOpen(false);
        setCommandOpen(false);
      }
    };
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    if (commandOpen) {
      const id = requestAnimationFrame(() => searchInputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    } else {
      setSearchQuery("");
      setSelectedIndex(0);
    }
  }, [commandOpen]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setCommandOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    setEcosystemOpen(false);
    if (isContact) {
      e.preventDefault();
      const intakeElement = document.getElementById("intake");
      if (intakeElement) {
        intakeElement.scrollIntoView({ behavior: "smooth" });
        const targetInput = intakeElement.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          "input, textarea"
        );
        targetInput?.focus();
      }
    }
  };

  const handleCommandKeyNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCommands.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredCommands[selectedIndex];
      if (target) {
        handleCommandSelect(target);
      }
    }
  };

  return (
    <>
      <header className="sticky top-3 sm:top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Floating Glassmorphic Dock */}
        <div className="h-16 px-4 sm:px-6 rounded-2xl bg-[#0B0F17]/90 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/50 flex items-center justify-between relative transition-all overflow-visible">
          {/* Bottom Reading Progress Laser Line */}
          <div className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-slate-800/40 overflow-hidden rounded-full pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Brand & Logo Alignment (Left) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center shadow-lg group-hover:border-teal-400/50 transition-all duration-300">
              <span className="font-mono font-black text-sm sm:text-base bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                D
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1">
                DukaTrio
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" />
              </span>
              <span className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center px-2 py-0.5 rounded-full bg-teal-950/60 border border-teal-800/60 text-[9px] font-mono font-bold tracking-wider text-teal-300 uppercase">
                ENGINEERING STUDIO
              </span>
            </div>
          </Link>

          {/* Streamlined Center Navigation Architecture (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-teal-400 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Live Ecosystem Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setEcosystemOpen((prev) => !prev)}
                aria-expanded={ecosystemOpen}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer py-1 ${
                  ecosystemOpen ? "text-teal-400" : "text-slate-300 hover:text-teal-400"
                }`}
              >
                <span>{lang === "sr" ? "Ekosistem" : "Live Ecosystem"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    ecosystemOpen ? "rotate-180 text-teal-400" : ""
                  }`}
                />
              </button>

              {ecosystemOpen && (
                <div className="absolute top-full -left-12 pt-2.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-2 rounded-2xl bg-[#0B0F17]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/80 space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold border-b border-slate-800/80">
                      Engineered Client Platforms
                    </div>

                    <a
                      href="https://fundingsolutions.dukatrio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl hover:bg-slate-900/90 border border-transparent hover:border-emerald-500/30 transition-all flex items-start gap-3 group/eco"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover/eco:scale-105 transition-transform shrink-0 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-200 group-hover/eco:text-emerald-400 transition-colors">
                            BFS Harvest (Fintech Platform)
                          </span>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
                            Deployed
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          SvelteKit Commercial Debt &amp; Underwriting Terminal
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/eco:text-emerald-400 transition-colors shrink-0 mt-1" />
                    </a>

                    <a
                      href="https://gradiliste.dukatrio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl hover:bg-slate-900/90 border border-transparent hover:border-amber-500/30 transition-all flex items-start gap-3 group/eco"
                    >
                      <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 group-hover/eco:scale-105 transition-transform shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-200 group-hover/eco:text-amber-400 transition-colors">
                            Gradilište OS
                          </span>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300">
                            Live SaaS
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Concrete Delivery OCR &amp; Jobsite PWA
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/eco:text-amber-400 transition-colors shrink-0 mt-1" />
                    </a>

                    <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-teal-400 font-semibold border-t border-slate-800/80">
                      B2B Solution Blueprints (€4,800)
                    </div>

                    <Link
                      href="/solutions/excel-to-custom-portal"
                      onClick={() => setEcosystemOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-slate-900/90 text-xs text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      Excel-to-Custom Internal Portal
                    </Link>
                    <Link
                      href="/solutions/offline-field-operations-pwa"
                      onClick={() => setEcosystemOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-slate-900/90 text-xs text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      Offline-First Field Operations PWA
                    </Link>
                    <Link
                      href="/solutions/b2b-client-intake-engine"
                      onClick={() => setEcosystemOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-slate-900/90 text-xs text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      B2B Client Intake &amp; Underwriting Engine
                    </Link>
                    <Link
                      href="/solutions/saas-subscription-consolidation"
                      onClick={() => setEcosystemOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-slate-900/90 text-xs text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      SaaS Subscription Consolidation
                    </Link>
                    <Link
                      href="/solutions/multi-tenant-client-vault"
                      onClick={() => setEcosystemOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-slate-900/90 text-xs text-slate-300 hover:text-teal-400 transition-colors"
                    >
                      Multi-Tenant Client Document Vault
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Call-to-Action, Language Switcher, Command Palette & Contact (Right) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Instant EN / SR Bilingual Toggle */}
            <div
              role="group"
              aria-label="Language Switcher"
              className="inline-flex items-center p-0.5 rounded-xl bg-[#030712]/90 border border-white/[0.08] font-mono text-[11px]"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("sr")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === "sr"
                    ? "bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                SR
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#030712]/90 hover:bg-slate-900 border border-white/[0.08] hover:border-teal-400/40 text-xs font-mono text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden xl:inline text-[11px]">
                {lang === "sr" ? "Pretraga" : "Quick Jump"}
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-[10px] text-slate-300 font-mono">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/contact"
              className={`text-slate-300 hover:text-teal-400 transition-colors duration-200 text-sm font-medium px-2 py-1 ${
                isContact ? "text-teal-400 font-semibold" : ""
              }`}
            >
              {lang === "sr" ? "Kontakt" : "Contact"}
            </Link>

            <a
              href={isContact ? "#intake" : "#contact"}
              onClick={handleCtaClick}
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-xl shadow-md shadow-teal-950/50 transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap btn-tactile"
            >
              <span>{lang === "sr" ? "Zakaži 15-Min Audit" : "Book 15-Min Audit"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Language + Search + Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Switch language EN/SR"
              className="px-2 py-1.5 rounded-xl bg-[#030712]/90 border border-white/[0.08] font-mono text-[11px] font-bold text-cyan-300 cursor-pointer"
            >
              {lang.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Open Command Palette"
              className="p-2 rounded-xl text-slate-400 hover:text-teal-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Clipboard Toast Notification */}
        {copiedToast && (
          <div className="fixed bottom-6 right-6 z-[110] px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-emerald-400/40 text-emerald-300 font-mono text-xs shadow-2xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Copied office@dukatrio.com to clipboard</span>
          </div>
        )}

        {/* Responsive Mobile / Tablet Sheet */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden mt-2 p-5 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl bg-[#0B0F17]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/80 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-teal-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 px-3 rounded-lg transition-colors ${
                  isContact
                    ? "bg-teal-950/60 text-teal-400 font-semibold"
                    : "hover:bg-slate-900 hover:text-teal-400"
                }`}
              >
                {lang === "sr" ? "Kontakt Desk" : "Contact Desk"}
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold px-1">
                Engineered Client Platforms
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://fundingsolutions.dukatrio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold block">BFS Harvest</span>
                      <span className="text-[10px] text-slate-400">SvelteKit Fintech Terminal</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href="https://gradiliste.dukatrio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold block">Gradilište OS</span>
                      <span className="text-[10px] text-slate-400">Jobsite &amp; Delivery PWA</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={isContact ? "#intake" : "#contact"}
                onClick={handleCtaClick}
                className="w-full py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md btn-tactile"
              >
                <span>{lang === "sr" ? "Zakaži 15-Min Audit" : "Book 15-Min Feasibility Audit"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Cmd+K Engineering Command Palette Modal with Arrow-Key Navigation */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-[#0B0F17] border border-white/[0.12] shadow-2xl shadow-black overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#030712]/90">
              <Search className="w-4 h-4 text-teal-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleCommandKeyNav}
                placeholder="Search 7 B2B offerings, ROI calculator, case studies, or press ↑↓ Enter..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setCommandOpen(false)}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Command Items List */}
            <div className="max-h-[65vh] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-10 text-center text-xs font-mono text-slate-500">
                  No matching engineering blueprints found.
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const Icon = item.icon;
                  const isActiveIndex = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => handleCommandSelect(item)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                        isActiveIndex
                          ? "bg-cyan-500/10 border-cyan-400/35"
                          : "hover:bg-slate-900/90 border-transparent hover:border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                            isActiveIndex
                              ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
                              : "bg-slate-950 border-slate-800 text-teal-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-300 transition-colors truncate">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{item.sublabel}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-teal-950/60 border border-teal-800/60 text-[10px] font-mono font-bold text-teal-300">
                            {item.badge}
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/[0.08] bg-[#030712] flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>↑↓ Navigate · ↵ Select · ESC Close</span>
              <span className="text-teal-400">Fixed €4,800 Sprints · 100% IP Ownership</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
