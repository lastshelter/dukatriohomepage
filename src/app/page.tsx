"use client";

import React from "react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ScopeEstimator from "@/components/estimator/ScopeEstimator";
import BlueprintEstimator from "@/components/estimator/BlueprintEstimator";
import Navbar from "@/components/layout/Navbar";
import MobileQuickContact from "@/components/layout/MobileQuickContact";
import CaseStudySection from "@/components/portfolio/CaseStudyCard";
import CaseStudySandbox from "@/components/sandbox/CaseStudySandbox";
import SocialProof from "@/components/testimonials/SocialProof";
import Hero from "@/components/Hero";
import ScrollEffects from "@/components/ui/ScrollEffects";
import FaqSection from "@/components/home/FaqSection";
import ServicePillars from "@/components/services/ServicePillars";
import PricingTiers from "@/components/pricing/PricingTiers";
import DeliveryRoadmap from "@/components/home/DeliveryRoadmap";
import ProductionGuarantees from "@/components/home/ProductionGuarantees";
import ServiceComparison from "@/components/services/ServiceComparison";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import TelemetryStrip from "@/components/layout/TelemetryStrip";
import { Mail } from "lucide-react";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen bg-[#030712] text-zinc-100 overflow-hidden font-sans pb-16 md:pb-0">
      <ScrollEffects />

      {/* Background Glows & Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[760px] h-[380px] bg-indigo-500/12 rounded-full blur-[136px] pointer-events-none" />
      <div className="absolute top-[36%] right-[-100px] w-[540px] h-[420px] bg-cyan-500/10 rounded-full blur-[148px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-100px] w-[520px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. NAVBAR */}
      {/* ========================================================================= */}
      <Navbar />

      {/* ========================================================================= */}
      {/* 2. HERO SECTION & INTERACTIVE TOPOLOGY WORKBENCH */}
      {/* ========================================================================= */}
      <Hero />

      {/* ========================================================================= */}
      {/* 3. 4 CORE ENGINEERING PILLARS */}
      {/* ========================================================================= */}
      <ServicePillars />

      {/* ========================================================================= */}
      {/* 3b. INTERACTIVE ARCHITECTURAL BENCHMARK (BEFORE / AFTER SLIDER) */}
      {/* ========================================================================= */}
      <BeforeAfterSlider />

      {/* ========================================================================= */}
      {/* 4. PRODUCTION CASE STUDIES */}
      {/* ========================================================================= */}
      <CaseStudySection />

      {/* ========================================================================= */}
      {/* 4b. INTERACTIVE CASE STUDY SANDBOX */}
      {/* ========================================================================= */}
      <CaseStudySandbox />

      {/* ========================================================================= */}
      {/* 5. TRANSPARENT FIXED-MILESTONE PRICING TIERS */}
      {/* ========================================================================= */}
      <PricingTiers />

      {/* ========================================================================= */}
      {/* 5b. EXECUTIVE DELIVERY COMPARISON & 36-MONTH TCO MATRIX */}
      {/* ========================================================================= */}
      <ServiceComparison />

      {/* ========================================================================= */}
      {/* 6a. ARCHITECTURE & BLUEPRINT ESTIMATOR */}
      {/* ========================================================================= */}
      <BlueprintEstimator />

      {/* ========================================================================= */}
      {/* 6b. INTERACTIVE SCOPE & ROI ESTIMATOR */}
      {/* ========================================================================= */}
      <div id="calculator" className="scroll-mt-24" />
      <ScopeEstimator />

      {/* ========================================================================= */}
      {/* 7. 3-STEP STRUCTURED DELIVERY ROADMAP */}
      {/* ========================================================================= */}
      <DeliveryRoadmap />

      {/* ========================================================================= */}
      {/* 7b. PRODUCTION ENGINEERING GUARANTEES & IP SOVEREIGNTY */}
      {/* ========================================================================= */}
      <ProductionGuarantees />

      {/* ========================================================================= */}
      {/* 8. VERIFIED SOCIAL PROOF & CLIENT REASSURANCE */}
      {/* ========================================================================= */}
      <SocialProof />

      {/* ========================================================================= */}
      {/* 9. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <FaqSection />

      {/* ========================================================================= */}
      {/* 10. DIRECT ENGINEERING INQUIRY DESK & FOOTER */}
      {/* ========================================================================= */}
      <section id="contact" className="py-28 sm:py-36 border-t border-slate-800/80 bg-[#0B0F19] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>Direct Engineering Inquiry</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Architect Your Next Platform?
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              Whether you require a bespoke client intake portal, algorithmic financial computation engine, or high-throughput private cloud infrastructure, connect directly with our engineering desk.
            </p>
          </div>

          {/* Interactive Frosted-Glass Contact Form */}
          <ContactForm />

          {/* Footer Bar */}
          <footer className="mt-16 pt-8 border-t border-slate-800/80 space-y-6 text-xs font-mono text-slate-400">
            {/* Contextual Programmatic Solutions Links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/60">
              <span className="text-[11px] uppercase tracking-widest text-teal-400 font-bold">
                Dedicated B2B Solutions (€4,800 Fixed Sprints):
              </span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href="/solutions/excel-to-custom-portal"
                  className="text-slate-300 hover:text-teal-400 transition"
                >
                  Excel-to-Custom Portal
                </Link>
                <Link
                  href="/solutions/offline-field-operations-pwa"
                  className="text-slate-300 hover:text-teal-400 transition"
                >
                  Offline Field Operations PWA
                </Link>
                <Link
                  href="/solutions/b2b-client-intake-engine"
                  className="text-slate-300 hover:text-teal-400 transition"
                >
                  B2B Client Intake Engine
                </Link>
                <Link
                  href="/solutions/saas-subscription-consolidation"
                  className="text-slate-300 hover:text-teal-400 transition"
                >
                  SaaS Consolidation
                </Link>
                <Link
                  href="/solutions/multi-tenant-client-vault"
                  className="text-slate-300 hover:text-teal-400 transition"
                >
                  Multi-Tenant Client Vault
                </Link>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>&copy; 2026 DukaTrio. All systems operational.</span>
                </div>
                <span className="hidden sm:inline text-slate-700">·</span>
                {/* Live Infrastructure Telemetry Strip */}
                <TelemetryStrip />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                <a href="#solutions" className="hover:text-teal-400 transition">
                  Services
                </a>
                <a href="#benchmark" className="hover:text-teal-400 transition">
                  Benchmark
                </a>
                <a href="#case-studies" className="hover:text-teal-400 transition">
                  Case Studies
                </a>
                <a href="#sandbox" className="hover:text-teal-400 transition">
                  Sandbox
                </a>
                <a href="#pricing" className="hover:text-teal-400 transition">
                  Pricing
                </a>
                <a href="#blueprint" className="hover:text-teal-400 transition">
                  Blueprint
                </a>
                <a href="#estimator" className="hover:text-teal-400 transition">
                  Estimator
                </a>
                <a href="#guarantees" className="hover:text-teal-400 transition">
                  SLA &amp; IP
                </a>
                <a href="#contact" className="hover:text-teal-400 transition">
                  Contact Desk
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* Mobile Quick-Contact Floating Dock (Strictly Mobile md:hidden) */}
      <MobileQuickContact />
    </div>
  );
}
