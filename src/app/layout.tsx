import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dukatrio | Custom Software Solutions & Enterprise SaaS Development",
  description:
    "Dukatrio builds mission-critical custom software, bespoke web applications, and scalable SaaS platforms. Dukatrio razvija napredna softverska rešenja, prilagođene web platforme i specijalizovane SaaS sisteme za automatizaciju poslovanja.",
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
    "Custom Software Engineering",
    "SaaS Product Development",
    "Enterprise Web Applications",
    "Cloud Architecture",
    "B2B SaaS Systems",
    "Next.js Development",
    "Full-Stack Engineering",
    "Gradilište Dukatrio",
    "High-Performance Web Applications",
  ],
  authors: [{ name: "Dukatrio Engineering Studio" }, { name: "Petar D." }],
  creator: "Petar D.",
  publisher: "Dukatrio",
  openGraph: {
    title: "Dukatrio | Custom Software Solutions & Enterprise SaaS Development",
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
    title: "Dukatrio | Custom Software Solutions & Enterprise SaaS Development",
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
      telephone: "+381652028775",
      email: "contact@dukatrio.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belgrade",
        addressCountry: "RS",
      },
      sameAs: [
        "https://gradiliste.dukatrio.com",
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
        "Professional software agency specializing in Custom Software Engineering, SaaS Product Development, Enterprise Web Applications, and Cloud Systems Architecture.",
      areaServed: [
        { "@type": "Country", name: "Serbia" },
        { "@type": "AdministrativeArea", name: "European Union" },
        { "@type": "AdministrativeArea", name: "Global" },
      ],
      knowsAbout: [
        "Custom Software Engineering",
        "SaaS Product Development",
        "Enterprise Web Applications",
        "Cloud Architecture & Distributed Systems",
        "Next.js 16 App Router",
        "React 19 Server Components",
        "Fintech & Computational Calculation Engines",
        "High-Throughput Linux VPS Deployments",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Enterprise Digital Engineering & SaaS Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Software Engineering",
              description:
                "Bespoke full-stack web applications, mission-critical workflow systems, and role-based client portals.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SaaS Product Development",
              description:
                "End-to-end multi-tenant SaaS architecture, subscription engines, metering, and enterprise integrations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Web Applications",
              description:
                "High-performance institutional portals engineered with Next.js 16, React 19, and rigorous security standards.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cloud Architecture & Infrastructure",
              description:
                "High-throughput Linux cloud pods, Caddy HTTP/3 reverse proxies, automated TLS, and zero-downtime container clusters.",
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
        ],
      },
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
