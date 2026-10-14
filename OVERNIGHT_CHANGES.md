# Dukatrio.com — Architectural Upgrade & Enterprise Modernization Report

**Executed by**: Lead Systems Architect & Senior Frontend Engineer  
**Date**: October 10, 2026  
**Target Repository**: `dukatrio.com` (`d:\Win11 bekap 13092026\06_User_Files_Backup\Documents\dukatrio.com`)  
**Deployment Target**: VPS `/var/www/dukatrio` (PM2: `dukatrio-home`)

---

## Executive Summary

A comprehensive architectural overhaul of **dukatrio.com** was executed across 5 core phases without breaking existing routing, standalone deployment scripts, or brand continuity. The site has transitioned into a premier B2B engineering studio positioning with four distinct technical pillars, high-contrast Linear/Raycast dark aesthetics, accessible mobile interactions, and production-grade JSON-LD structured schemas.

---

## Phase Breakdown & Changes Implemented

### Phase 1: Codebase Audit & Build Health
- **ESLint Config & Scripts** (`package.json`): Modernized the `lint` script to `"eslint src"` compatible with Next.js 16 flat configuration (`eslint.config.mjs`).
- **React 19 & Next 16 Ref Compliance** (`src/components/ui/AnimatedNumber.tsx`): Resolved `react-hooks/refs` lint error where `useRef(value).current` was read during render; migrated to pure state initializer `useState<number>(() => value)`.
- **Global Error Boundary Polish** (`src/app/global-error.tsx`): Fixed JSX unescaped text token warning (`jsx-no-comment-textnodes`) and added an intentional client-link lint ignore for hard root reloads.
- **OpenGraph Prerendering** (`src/app/opengraph-image.tsx`): Removed redundant `export const runtime = "edge"` which previously forced edge execution and disabled static generation warnings during `next build`. Updated subtitle copy to reflect the four enterprise pillars.

### Phase 2: Enterprise Service Portfolio Expansion
- **Single Source of Truth** (`src/config/servicePillars.ts`):
  Established four enterprise engineering pillars with rigorous technical specifications:
  1. **Enterprise Next.js & React Platforms** (Multi-tenant B2B SaaS, custom portals, high-security client desks).
  2. **High-Performance Content & SEO Portals** (Astro Islands, 99+ Lighthouse guarantee, zero-JS content delivery).
  3. **Real-Time Data & Operational Desks** (SvelteKit & Nuxt 3, low-latency telemetry, field dispatch consoles).
  4. **Cloud-Native Backend & Headless Infrastructure** (Supabase, PostgreSQL, Dockerized engines, Directus/Payload CMS).
- **Service Pillars Component** (`src/components/services/ServicePillars.tsx`):
  - Built a 2x2 responsive grid under `<section id="solutions">`.
  - Implemented Linear-style spotlight hover cards with subtle ambient glow gradients (`bg-[radial-gradient(...)]`), `border-white/10`, and distinct accent color coding (Cyan, Emerald, Indigo, Amber).
  - Included tech stack badge pills, tangible deliverables, performance metrics, and deep-links directly into `#estimator` and `#contact`.
- **Homepage Integration** (`src/app/page.tsx`): Replaced previous generic solution cards with `<ServicePillars />`, eliminated duplicate `#estimator` anchor tags, and purged unused icon imports.

### Phase 3: Design System & Mobile Polish (Linear/Raycast Aesthetic)
- **Navigation Architecture** (`src/components/layout/Navbar.tsx`):
  - Added direct **Services** anchor link (`#solutions`) to desktop and mobile navigation.
  - Adjusted "ENGINEERING STUDIO" badge pill responsiveness to `hidden sm:inline-flex lg:hidden xl:inline-flex` to prevent menu bar overflow on intermediate desktop viewports (1024px–1280px).
  - Enhanced mobile drawer with `max-h-[calc(100dvh-6rem)]`, vertical momentum scrolling, `border-white/10` styling, `aria-expanded`/`aria-controls` bindings, and automatic Escape key / route-change listeners.
- **Hero Ambient Depth** (`src/components/Hero.tsx`):
  - Adjusted ambient radial drift glow from `-z-10` to `z-0` so the atmospheric glow renders cleanly above the opaque page background without obscuring z-10 interactive typography.
- **Mobile Quick Contact Dock** (`src/components/layout/MobileQuickContact.tsx`):
  - Added keyboard accessibility (Escape to dismiss), backdrop click dismissal, and body scroll lock when open.
  - Updated padding for iOS safe area insets (`env(safe-area-inset-bottom)`).
  - Bound explicit `<label htmlFor="...">` and `autoComplete` attributes.
- **iOS Viewport Zoom Prevention**:
  - Hardened form input text sizes across `ContactForm.tsx`, `InteractiveDemo.tsx`, and `MobileQuickContact.tsx` to `text-base sm:text-sm` (16px base font on mobile), eliminating automatic Safari zoom triggers.

### Phase 4: Local SEO, Metadata & Schema Architecture
- **Production-Grade JSON-LD `@graph`** (`src/app/layout.tsx`):
  - Extended `ProfessionalService` schema with `contactPoint` (sales, English & Serbian, RS/EU/Global coverage).
  - Added localized `areaServed` (`Belgrade`, `Serbia`, `European Union`, `Global`).
  - Dynamically wired `hasOfferCatalog` directly to `SERVICE_PILLARS` (with `@type: "Service"` and exact canonical URLs), while preserving case study software schemas for `Gradilište Dukatrio` and `FundingSolutions`.
  - Enriched `knowsAbout` and SEO `keywords` with modern technology tokens: Astro, SvelteKit, Nuxt 3, Supabase, PostgreSQL, Directus, Payload, Docker.
- **Contact Page Metadata** (`src/app/contact/page.tsx`):
  - Updated metadata titles and descriptions to reflect "Dukatrio Engineering Studio" and the four service offerings.
- **Sitemap & Robots Verification** (`src/app/sitemap.ts`, `src/app/robots.ts`):
  - Verified clean static generation and crawl rules.

### Phase 5: Verification & Quality Assurance
- `npx eslint src`: **0 errors, 0 warnings**.
- `npx tsc --noEmit`: **Clean exit (code 0)**.
- `npm run build`: Production build verified with standalone copy script.

---

## Modified & Created Files Summary

| File | Status | Description |
|---|---|---|
| `src/config/servicePillars.ts` | **New** | Source of truth configuration for 4 core engineering pillars |
| `src/components/services/ServicePillars.tsx` | **New** | High-contrast Linear/Raycast style service showcase |
| `src/app/page.tsx` | Modified | Integrated `<ServicePillars />`, cleaned imports & anchor tags |
| `src/app/layout.tsx` | Modified | Imported pillars, injected schema offer catalog, updated keywords & SEO |
| `src/components/layout/Navbar.tsx` | Modified | Added Services link, drawer Escape/scroll handlers, responsive pill |
| `src/components/Hero.tsx` | Modified | Corrected ambient glow z-index ordering |
| `src/components/layout/MobileQuickContact.tsx` | Modified | Accessible drawer, safe-area dock, iOS input font-size |
| `src/components/ContactForm.tsx` | Modified | Mobile input font-size normalization (16px) |
| `src/components/InteractiveDemo.tsx` | Modified | Input font-size normalization |
| `src/app/contact/page.tsx` | Modified | Updated metadata title and description |
| `src/app/opengraph-image.tsx` | Modified | Prerender optimization, updated pillar subtitle |
| `src/app/global-error.tsx` | Modified | Resolved ESLint comment syntax & link lint rules |
| `src/components/ui/AnimatedNumber.tsx` | Modified | React 19 / Next 16 hook ref safety migration |
| `package.json` | Modified | Updated `lint` script to `eslint src` |
| `OVERNIGHT_CHANGES.md` | **New** | This audit and deployment reference report |

---

## Deployment & Tomorrow's Recommendations

### 1. Review Git Status & Commit
All changes are currently staged cleanly in your local working directory. When ready to commit:
```bash
git add .
git commit -m "feat: upgrade dukatrio.com to enterprise engineering studio with 4 core pillars"
git push origin main
```

### 2. VPS Production Deployment via Termius
Run the standard deployment sequence on VPS host (`dukatrio-core-01`):
```bash
cd /var/www/dukatrio && git pull origin main && npm install && npm run build && cp -ru .next/static .next/standalone/.next/ 2>/dev/null || true && cp -ru .next/server .next/standalone/.next/ 2>/dev/null || true && cp -ru public .next/standalone/ 2>/dev/null || true && cp -u .next/*.json .next/standalone/.next/ 2>/dev/null || true && pm2 restart dukatrio-home --update-env && pm2 status
```

### 3. Recommendations for Petar
1. **Google Search Console**: Resubmit `https://dukatrio.com/sitemap.xml` after deploying so Google crawls the updated `ProfessionalService` OfferCatalog schemas and localized Belgrade data.
2. **Typography Upgrade (Optional)**: If you want to push the Linear aesthetic even further, consider importing `Geist` or `Inter` via `next/font/google` in `layout.tsx` (the project currently uses system font stacks).

---

## Phase 6: High-Conversion Positioning & Bloomberg/Linear Aesthetic Refactor
**Executed on**: October 14, 2026

### 1. Full Project Backup Verification
- Complete mirrored backup created in: `D:\Win11 bekap 13092026\06_User_Files_Backup\Documents\dukatrio foundation`.
- All 165 source files, git configuration, and assets preserved with zero loss.

### 2. High-Conversion Hero Refactor (`src/components/Hero.tsx`)
- Shifted positioning from framework jargons to high-stakes B2B executive value: **"We Build Custom Internal Tools & Portals That Eliminate Monthly SaaS Taxes"**.
- Added live telemetry pulse (`animate-ping` emerald indicator: *"ENGINEERING STUDIO // INTERNAL TOOLS & HIGH-SPEED WEB SYSTEMS"*).
- Clear dual CTAs: **"Request Fixed-Price Scope"** (`#contact`) and **"Calculate SaaS Tax ROI ↓"** (`#estimator`).
- Clean monochrome engineering trust row beneath CTAs: `Next.js App Router` • `PostgreSQL / Prisma` • `Docker & Caddy Edge` • `Private VPS Deployment` • `Offline-First PWA`.

### 3. Transparent Fixed-Milestone Pricing (`src/components/pricing/PricingTiers.tsx`)
- Implemented 3 transparent tiers directly addressing buyer hesitation:
  1. **Core System Sprint** (€4,800 – €5,800 · 2–3 Weeks): Replaces single-tool SaaS or brittle spreadsheets.
  2. **Enterprise Operations & Kernel** (€8,500 – €14,000 · 4–6 Weeks): Multi-tenant RBAC, offline PWAs, calculation engines.
  3. **Managed Infrastructure Care** (€190 – €350/mo): Daily encrypted off-site backups, Linux security updates, 4h SLA channel.
- Integrated fixed price brackets with direct link to the dynamic interactive PDF Scope Estimator.

### 4. Structured Delivery Roadmap (`src/components/home/DeliveryRoadmap.tsx`)
- Added **"How We Work: From Bottleneck to Production in 3 Weeks"** 3-step timeline above the Contact & FAQ desk:
  - **Step 01**: 15-Minute Architecture Audit (Day 1–2).
  - **Step 02**: 48-Hour Technical Specification & Fixed-Price Blueprint (Day 3–5).
  - **Step 03**: Rapid Build, Verification & Private Deployment (Weeks 2–3).

### 5. Case Study ROI & Bloomberg/Linear Cosmetic Polish
- **`src/app/globals.css`**: Deep slate-black base (`#090A0F`), refined dark surfaces (`#12151E`), `tabular-nums` numeric stability for calculators/counters, and tactile button interactions (`.btn-tactile`).
- **`src/components/portfolio/CaseStudyCard.tsx`**: Monospace macOS/Linux header dots, dark panel contrast, and updated case study positioning:
  - *Gradilište*: Field Operations PWA & On-Device Ticket OCR (zero offline data loss, 87% faster dispatch).
  - *FundingSolutions*: Commercial Capital Intake & DSCR Decisioning Terminal (sub-50ms underwriting, 0 per-seat licenses).
- **Navigation Architecture (`src/components/layout/Navbar.tsx`) & Footer**:
  - Replaced legacy `#capabilities` with `#pricing` and `#process`.
  - Clean flow: `Services` -> `Pricing` -> `Process` -> `Case Studies` -> `Cost Estimator`.
- **Page Pruning (`src/app/page.tsx`)**:
  - Purged redundant 4-card capabilities section and unused icon imports.
  - Cleaned layout hierarchy for maximum executive conversion.

### 6. Build & Type Verification
- `npx tsc --noEmit`: Clean exit, **0 errors**.

