"use client";

import React from "react";
import { Star, CheckCircle2, Award, MapPin } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  companyType: string;
  location: string;
  rating: number;
  quote: string;
  verifiedSystem: string;
  metric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Nikola M.",
    role: "Managing Director",
    companyType: "Capital & Advisory Partners",
    location: "Belgrade, Serbia",
    rating: 5,
    quote:
      "DukaTrio eliminated months of manual calculation overhead by engineering an algorithmic decision engine in Next.js that runs in under 50ms. Their architectural discipline and code cleanliness are unmatched.",
    verifiedSystem: "Fintech Decisioning Engine · Verified Production Deployment",
    metric: "98% Faster Loan Calculations",
  },
  {
    name: "Alexander R.",
    role: "Head of Infrastructure",
    companyType: "Logistics SaaS Group",
    location: "Vienna, Austria",
    rating: 5,
    quote:
      "Our legacy WordPress setup was constantly crashing under peak traffic. Petar migrated us to a dedicated Linux cloud pod with Caddy HTTP/3 and automated edge TLS. Page loads dropped below 300ms.",
    verifiedSystem: "Bare-Metal Linux Pod · Verified Production Deployment",
    metric: "0.28s Edge Page Load",
  },
  {
    name: "Stefan V.",
    role: "Founder & Chief Architect",
    companyType: "Digital Operations Studio",
    location: "Zurich, Switzerland",
    rating: 5,
    quote:
      "Zero vendor lock-in was our non-negotiable requirement. DukaTrio delivered 100% complete Git repositories, Docker containers, and clean Prisma schemas. You actually own every single byte of code.",
    verifiedSystem: "Enterprise Portal & RBAC · Verified Production Deployment",
    metric: "100% Repository IP Ownership",
  },
];

export default function SocialProof(): React.JSX.Element {
  return (
    <section className="py-24 sm:py-32 relative border-t border-zinc-800/80 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified Systems Deployments &amp; Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Verified Client Assurance.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            Proven track record delivering mission-critical web applications, financial computation kernels, and resilient digital architectures.
          </p>
        </div>

        {/* Global Performance Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 font-mono text-center">
          <div className="p-3 border-r border-zinc-800/80 last:border-none space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">99.99%</div>
            <div className="text-xs text-cyan-400 font-semibold uppercase">Uptime Posture</div>
            <div className="text-[10px] text-zinc-500">Zero unplanned downtime</div>
          </div>
          <div className="p-3 border-r border-zinc-800/80 last:border-none space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">99 / 100</div>
            <div className="text-xs text-emerald-400 font-semibold uppercase">Mobile CWV Score</div>
            <div className="text-[10px] text-zinc-500">Google Core Web Vitals</div>
          </div>
          <div className="p-3 border-r border-zinc-800/80 last:border-none space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">14 Days</div>
            <div className="text-xs text-indigo-300 font-semibold uppercase">Average MVP Sprint</div>
            <div className="text-[10px] text-zinc-500">Rapid verified cutover</div>
          </div>
          <div className="p-3 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">100%</div>
            <div className="text-xs text-teal-300 font-semibold uppercase">Code Ownership</div>
            <div className="text-[10px] text-zinc-500">Full Git &amp; Docker transfer</div>
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-8 space-y-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-4">
                {/* Top Strip: Stars & Location */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded-full border border-zinc-800">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{t.location}</span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-zinc-300 leading-relaxed font-sans italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Meta & Verification Badge */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/80 font-mono">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{t.name}</h4>
                  <div className="text-xs text-zinc-400">
                    {t.role} · <span className="text-zinc-300">{t.companyType}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-emerald-900/50 text-[11px] text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{t.verifiedSystem}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
