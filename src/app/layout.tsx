import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FAQS } from "@/config/faqs";
import { SERVICE_PILLARS } from "@/config/servicePillars";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-loaded",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030712",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dukatrio | Custom Software, SaaS & Client Portal Development",
  description:
    "Belgrade-based Next.js software studio building bespoke web applications, SaaS platforms and B2B client portals — 100% code ownership, sub-300ms speed, fixed-milestone pricing. Izrada namenskog softvera i web aplikacija.",
  metadataBase: new URL("https://dukatrio.com"),
  alternates: {
    canonical: "https://dukatrio.com",
    languages: {
      en: "https://dukatrio.com",
      "x-default": "https://dukatrio.com",
    },
  },
  other: {
    "description:sr":
      "Dukatrio razvija napredna softverska rešenja, prilagođene web platforme i specijalizovane SaaS sisteme za automatizaciju poslovanja.",
    "description:en":
      "Dukatrio builds mission-critical custom software, bespoke web applications, and scalable SaaS platforms.",
  },
  keywords: [
    "Dukatrio",
    "custom software development",
    "bespoke SaaS development studio",
    "custom Next.js web application development",
    "enterprise client portal development",
    "B2B portal software",
    "self-hosted web platforms",
    "full code ownership software agency",
    "software development Belgrade",
    "izrada namenskog softvera Beograd",
    "razvoj custom web aplikacija Srbija",
    "izrada B2B portala",
    "SaaS razvoj Srbija",
    "Gradilište Dukatrio",
    "Funding Desk",
    "Astro SEO Portals",
    "SvelteKit Real-Time Desks",
    "Nuxt 3 Operations",
    "Supabase PostgreSQL Architecture",
    "Headless CMS Directus Payload",
  ],
  authors: [{ name: "Dukatrio Engineering Studio" }, { name: "Petar D." }],
  creator: "Petar D.",
  publisher: "Dukatrio",
  openGraph: {
    title: "Dukatrio | Custom Software, SaaS & Client Portal Development",
    description:
      "Dukatrio builds mission-critical custom software, bespoke web applications, and scalable SaaS platforms. Dukatrio razvija napredna softverska rešenja i SaaS sisteme.",
    url: "https://dukatrio.com",
    siteName: "Dukatrio",
    locale: "en_US",
    alternateLocale: ["sr_RS"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dukatrio | Custom Software, SaaS & Client Portal Development",
    description:
      "Dukatrio builds mission-critical custom software, bespoke web applications, and scalable SaaS platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dukatrio.com/#organization",
      name: "Dukatrio",
      alternateName: "DukaTrio Technology Solutions Studio",
      url: "https://dukatrio.com",
      logo: "https://dukatrio.com/icon",
      image: "https://dukatrio.com/opengraph-image",
      description:
        "Dukatrio builds mission-critical custom software, bespoke web applications, and scalable SaaS platforms. Dukatrio razvija napredna softverska rešenja, prilagođene web platforme i specijalizovane SaaS sisteme za automatizaciju poslovanja.",
      email: "office@dukatrio.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belgrade",
        addressCountry: "RS",
      },
      sameAs: [
        "https://gradiliste.dukatrio.com",
        "https://fundingdesk.dukatrio.com",
        "https://github.com/lastshelter",
      ],
      founder: {
        "@type": "Person",
        name: "Petar D.",
        jobTitle: "Principal Systems Architect",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://dukatrio.com/#service",
      name: "Dukatrio - Software Agency & Technology Solutions Studio",
      url: "https://dukatrio.com",
      priceRange: "€€€",
      provider: {
        "@id": "https://dukatrio.com/#organization",
      },
      description:
        "Elite engineering studio delivering bespoke B2B client intake engines, offline-first field PWAs, interactive financial & ROI calculators, encrypted document vaults, sub-300ms legacy rebuilds, automated data micro-tools, and sovereign European VPS infrastructure.",
      email: "office@dukatrio.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belgrade",
        addressCountry: "RS",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "office@dukatrio.com",
        url: "https://dukatrio.com/contact",
        availableLanguage: ["English", "Serbian"],
        areaServed: ["RS", "EU", "Worldwide"],
      },
      areaServed: [
        { "@type": "Country", name: "Serbia" },
        { "@type": "City", name: "Belgrade" },
        { "@type": "AdministrativeArea", name: "European Union" },
        { "@type": "AdministrativeArea", name: "Global" },
      ],
      availableLanguage: ["English", "Serbian"],
      knowsAbout: [
        "Bespoke B2B Client Intake Engines",
        "Field Operations & Offline-First PWAs",
        "Interactive Financial & ROI Calculators",
        "Encrypted Document Drop Vaults",
        "Legacy Web Scraping & Instant Rebuilds",
        "Automated Data Processing & Micro-Tools",
        "Sovereign Self-Hosted VPS Infrastructure",
        "Next.js 16 App Router",
        "React 19 Server Components",
        "PostgreSQL & Prisma ORM",
        "Caddy TLS 1.3 & Docker Compose",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Enterprise Digital Engineering & B2B Software Catalogue",
        itemListElement: [
          ...SERVICE_PILLARS.map((pillar) => ({
            "@type": "Offer",
            name: pillar.title,
            description: pillar.schemaDescription,
            url: "https://dukatrio.com/#solutions",
            itemOffered: {
              "@type": "Service",
              "@id": `https://dukatrio.com/#service-${pillar.id}`,
              name: pillar.title,
              serviceType: pillar.title,
              description: pillar.schemaDescription,
              provider: { "@id": "https://dukatrio.com/#organization" },
              areaServed: ["RS", "EU", "Worldwide"],
              url: `https://dukatrio.com/#solutions`,
            },
          })),
          {
            "@type": "Offer",
            name: "Flagship Fintech Case Study: Funding Desk Platform",
            description:
              "Flagship production fintech platform engineered and deployed by DukaTrio: Funding Desk (https://dukatrio.com/case-studies/fundingdesk), a high-speed commercial capital intake and algorithmic DSCR underwriting engine built on SvelteKit 2 and hosted on a sovereign Hetzner Linux VPS.",
            url: "https://dukatrio.com/case-studies/fundingdesk",
            itemOffered: {
              "@type": "SoftwareApplication",
              name: "Funding Desk - Fintech Underwriting Platform",
              applicationCategory: "FintechApplication",
              operatingSystem: "Web, macOS, Windows, iOS, Android",
              url: "https://dukatrio.com/case-studies/fundingdesk",
              description:
                "Commercial debt intake and risk decisioning platform featuring deterministic TypeScript DSCR calculation kernels, programmatic PDF term sheets, and single-tenant AES-256 KYC vaults.",
            },
          },
          {
            "@type": "Offer",
            name: "Enterprise SaaS Case Study: Gradilište Dukatrio",
            description:
              "Active in-house enterprise SaaS case study: Gradilište Dukatrio (https://gradiliste.dukatrio.com), a dedicated B2B Construction Management OS with digital daily logs, worker attendance, and fixed EUR/RSD payroll engine.",
            url: "https://gradiliste.dukatrio.com",
            itemOffered: {
              "@type": "SoftwareApplication",
              name: "Gradilište Dukatrio - Construction OS",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, Android, iOS (PWA)",
              url: "https://gradiliste.dukatrio.com",
              description:
                "Sveobuhvatna cloud platforma za digitalno vođenje gradilišta, evidenciju radnika, mehanizacije, građevinskog dnevnika i napredno izveštavanje za građevinske firme.",
            },
          },
          {
            "@type": "Offer",
            name: "B2B Systems Case Study: Funding Desk Decisioning Terminal",
            description:
              "Anonymized B2B client platform custom-built by DukaTrio: Funding Desk (https://fundingdesk.dukatrio.com), a commercial capital intake portal and DSCR underwriting decisioning terminal.",
            url: "https://fundingdesk.dukatrio.com",
            itemOffered: {
              "@type": "SoftwareApplication",
              name: "Funding Desk - Capital Decisioning Terminal",
              applicationCategory: "FintechApplication",
              operatingSystem: "Web",
              url: "https://fundingdesk.dukatrio.com",
              description:
                "Enterprise commercial capital intake and risk decisioning terminal featuring real-time DSCR calculation engines and automated PDF term-sheet generation.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://dukatrio.com/#website",
      url: "https://dukatrio.com",
      name: "Dukatrio",
      description:
        "Belgrade-based Next.js software studio building bespoke web applications, SaaS platforms and B2B client portals.",
      inLanguage: "en",
      publisher: { "@id": "https://dukatrio.com/#organization" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://dukatrio.com/#faq",
      url: "https://dukatrio.com/#faq",
      name: "Dukatrio Engineering Studio FAQs",
      description:
        "Common questions regarding Dukatrio custom software engineering, pricing models, intellectual property ownership, and technical architectures.",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#030712] text-zinc-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
