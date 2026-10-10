"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronDown, ExternalLink, Building2, Briefcase } from "lucide-react";

export default function Navbar(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";

  // Streamlined Center Navigation
  const navLinks = [
    { label: "Services", href: isHome ? "#solutions" : "/#solutions" },
    { label: "Capabilities", href: isHome ? "#capabilities" : "/#capabilities" },
    { label: "Case Studies", href: isHome ? "#case-studies" : "/#case-studies" },
    { label: "Cost Estimator", href: isHome ? "#estimator" : "/#estimator" },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setEcosystemOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setEcosystemOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setEcosystemOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setEcosystemOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close the drawer whenever the route changes
  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileMenuOpen(false));
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

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Floating Glassmorphic Dock */}
      <div className="h-16 px-4 sm:px-6 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-slate-800/80 shadow-xl shadow-black/40 flex items-center justify-between relative transition-all">
        {/* Brand & Logo Alignment (Left) */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-all duration-300">
            <span className="font-mono font-black text-sm sm:text-base bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              D
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1">
              DukaTrio
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
            </span>
            <span className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-[9px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
              ENGINEERING STUDIO
            </span>
          </div>
        </Link>

        {/* Streamlined Center Navigation Architecture (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
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
                ecosystemOpen ? "text-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Live Ecosystem</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  ecosystemOpen ? "rotate-180 text-cyan-400" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {ecosystemOpen && (
              <div className="absolute top-full -left-12 pt-2.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-2 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-800/90 shadow-2xl shadow-black/80 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold border-b border-slate-800/80">
                    Proprietary Production Platforms
                  </div>

                  {/* FundingSolutions */}
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
                          FundingSolutions
                        </span>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
                          Live SaaS
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Commercial Lending &amp; Intake Syndicate Portal
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/eco:text-emerald-400 transition-colors shrink-0 mt-1" />
                  </a>

                  {/* Gradilište OS */}
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
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Call-to-Action & Contact (Right) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className={`text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium px-2 py-1 ${
              isContact ? "text-cyan-400 font-semibold" : ""
            }`}
          >
            Contact
          </Link>

          <a
            href={isContact ? "#intake" : "#contact"}
            onClick={handleCtaClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Responsive Mobile / Tablet Sheet */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden mt-2 p-5 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 px-3 rounded-lg transition-colors ${
                isContact
                  ? "bg-cyan-950/60 text-cyan-400 font-semibold"
                  : "hover:bg-slate-900 hover:text-cyan-400"
              }`}
            >
              Contact Desk
            </Link>
          </nav>

          {/* Mobile Live Ecosystem Section */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-semibold px-1">
              Live SaaS Ecosystem
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="https://fundingsolutions.dukatrio.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">💼</span>
                  <div>
                    <span className="font-bold block">FundingSolutions</span>
                    <span className="text-[10px] text-slate-400">Commercial Underwriting</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="https://gradiliste.dukatrio.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🏗️</span>
                  <div>
                    <span className="font-bold block">Gradilište OS</span>
                    <span className="text-[10px] text-slate-400">Jobsite &amp; Delivery PWA</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <a
              href={isContact ? "#intake" : "#contact"}
              onClick={handleCtaClick}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
            >
              <span>Start Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
