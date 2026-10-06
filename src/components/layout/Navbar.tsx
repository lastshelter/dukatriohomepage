"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";

  const navLinks = [
    { label: "Solutions", href: isHome ? "#solutions" : "/#solutions" },
    { label: "Live Demo", href: isHome ? "#demo" : "/#demo" },
    { label: "Capabilities", href: isHome ? "#capabilities" : "/#capabilities" },
    { label: "Case Studies", href: isHome ? "#case-studies" : "/#case-studies" },
    { label: "Cost Estimator", href: isHome ? "#calculator" : "/#calculator" },
  ];

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Ecosystem Pill */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-all duration-300">
              <span className="font-mono font-black text-lg bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                D
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                DukaTrio
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest -mt-1">
                Systems Studio
              </span>
            </div>
          </Link>

          {/* SaaS Ecosystem Switcher Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-medium text-zinc-300">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold pr-1.5 border-r border-zinc-800">
              SaaS Ecosystem
            </span>
            <a
              href="https://gradiliste.dukatrio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-zinc-800/60"
            >
              <span>🏗️</span> Gradilište OS
            </a>
            <span className="text-zinc-600">•</span>
            <a
              href="https://fundingsolutions.dukatrio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-zinc-800/60"
            >
              <span>💼</span> FundingSolutions
            </a>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`transition-colors ${
              isContact
                ? "text-cyan-400 font-bold"
                : "text-zinc-300 hover:text-cyan-400"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center">
          <a
            href={isContact ? "#intake" : "#contact"}
            onClick={handleCtaClick}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] flex items-center gap-2 group cursor-pointer"
          >
            <span>INTAKE FORM</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b]/95 px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 pt-2 text-sm font-medium text-zinc-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400 py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 transition-colors ${
                isContact ? "text-cyan-400 font-bold" : "hover:text-cyan-400 text-zinc-200"
              }`}
            >
              Contact
            </Link>
          </nav>
          <div className="pt-2">
            <a
              href={isContact ? "#intake" : "#contact"}
              onClick={handleCtaClick}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]"
            >
              <span>INTAKE FORM</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile SaaS Ecosystem */}
          <div className="pt-3 border-t border-zinc-800">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2 font-semibold">
              Our Live SaaS Platforms
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://gradiliste.dukatrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
              >
                <span>🏗️</span>
                <span className="truncate">Gradilište OS</span>
              </a>
              <a
                href="https://fundingsolutions.dukatrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              >
                <span>💼</span>
                <span className="truncate">FundingSolutions</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
