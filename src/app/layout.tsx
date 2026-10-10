import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FAQS } from "@/config/faqs";
import { SERVICE_PILLARS } from "@/config/servicePillars";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dukatrio | Custom Software, SaaS & Client Portal Development",
  description:
    "Belgrade-based Next.js software studio building bespoke web applications, SaaS platforms and B2B client portals — 100% code ownership, sub-400ms speed, fixed-milestone pricing. Izrada namenskog softvera i web aplikacija.",
  metadataBase: new URL("https://dukatrio.com"),
  alternates: {
    canonical: "https://dukatrio.com",
    languages: {
      "en-US": "https://dukatrio.com",
      "sr-RS": "https://dukatrio.com",
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
    "FundingSolutions",
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
        "https://fundingsolutions.dukatrio.com",
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
        "Elite engineering studio delivering Enterprise Next.js & React platforms, high-performance Astro SEO portals, real-time SvelteKit/Nuxt operational desks, and cloud-native Supabase/PostgreSQL backends.",
      telephone: undefined,
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
        "Enterprise Next.js & React Platforms",
        "Multi-tenant B2B SaaS",
        "Astro Islands & Zero-JS Content Delivery",
        "Technical SEO & Core Web Vitals",
        "SvelteKit & Nuxt 3 Real-Time Interfaces",
        "Operational Telemetry & Field Dispatch Consoles",
        "Supabase & PostgreSQL",
        "Directus & Payload Headless CMS",
        "Dockerized Self-Hosted Infrastructure",
        "Next.js 16 App Router",
        "React 19 Server Components",
        "Fintech & Computational Calculation Engines",
        "High-Throughput Linux VPS Deployments",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Enterprise Digital Engineering & SaaS Services",
        itemListElement: [
          ...SERVICE_PILLARS.map((pillar) => ({
            "@type": "Offer",
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
            name: "Fintech Platform Case Study: FundingSolutions",
            description:
              "Active in-house commercial capital platform: FundingSolutions (https://fundingsolutions.dukatrio.com), institutional underwriting engine, interactive demo sandbox, and broker lead desk.",
            url: "https://fundingsolutions.dukatrio.com",
            itemOffered: {
              "@type": "SoftwareApplication",
              name: "FundingSolutions - Commercial Capital Desk",
              applicationCategory: "FintechApplication",
              operatingSystem: "Web",
              url: "https://fundingsolutions.dukatrio.com",
              description:
                "Enterprise commercial funding portal featuring multi-tier underwriting sandboxes, DSCR stress-testing engines, and automated deal pipeline tracking.",
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
      inLanguage: ["en", "sr"],
      publisher: { "@id": "https://dukatrio.com/#organization" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://dukatrio.com/#faq",
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
