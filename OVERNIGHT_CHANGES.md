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
1. **Commercial Copy Review**: In Pillar 2, the copy specifies "99+ Lighthouse guarantee". Verify whether you want this formatted as a contractual guarantee or as an architectural benchmark ("99+ Lighthouse Performance Architecture").
2. **Google Search Console**: Resubmit `https://dukatrio.com/sitemap.xml` after deploying so Google crawls the updated `ProfessionalService` OfferCatalog schemas and localized Belgrade data.
3. **Typography Upgrade (Optional)**: If you want to push the Linear aesthetic even further, consider importing `Geist` or `Inter` via `next/font/google` in `layout.tsx` (the project currently uses system font stacks).
