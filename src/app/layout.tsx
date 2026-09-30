import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DukaTrio | High-Performance Web Applications & Resilient Digital Infrastructure",
  description:
    "Institutional-grade digital engineering studio and systems architecture hub. We build full-stack web applications, automated fintech underwriting engines, and resilient cloud infrastructure engineered for speed, security, and scale.",
  metadataBase: new URL("https://dukatrio.com"),
  alternates: {
    canonical: "https://dukatrio.com",
  },
  keywords: [
    "DukaTrio",
    "Full-Stack Engineering",
    "Next.js Development",
    "Fintech Systems",
    "Cloud Infrastructure",
    "Caddy Reverse Proxy",
    "Node.js Systems",
    "Systems Architecture",
    "Automated Underwriting Engines",
    "Institutional Web Portals",
    "High-Performance Web Applications",
  ],
  authors: [{ name: "DukaTrio Systems Engineering" }, { name: "Petar D." }],
  creator: "Petar D.",
  publisher: "DukaTrio",
  openGraph: {
    title: "DukaTrio | High-Performance Web Applications & Resilient Digital Infrastructure",
    description:
      "Full-stack engineering studio specializing in institutional web portals, automated financial decisioning engines, and resilient Linux VPS deployments.",
    url: "https://dukatrio.com",
    siteName: "DukaTrio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DukaTrio | Systems Engineering & Web Applications",
    description:
      "Engineering institutional web portals, automated financial decisioning engines, and high-throughput cloud infrastructure.",
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
  "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
  name: "DukaTrio",
  url: "https://dukatrio.com",
  logo: "https://dukatrio.com/icon",
  image: "https://dukatrio.com/opengraph-image",
  description:
    "Institutional-grade digital engineering studio and systems architecture hub specializing in Next.js web applications, automated fintech calculation engines, and resilient Linux cloud infrastructure.",
  telephone: "+381652028775",
  email: "contact@dukatrio.com",
  priceRange: "€€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgrade",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.8176,
    longitude: 20.4633,
  },
  areaServed: [
    { "@type": "Country", name: "Serbia" },
    { "@type": "AdministrativeArea", name: "European Union" },
    { "@type": "AdministrativeArea", name: "Global" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Petar D.",
    jobTitle: "Principal Systems Architect",
  },
  knowsAbout: [
    "Next.js 16 App Router",
    "React 19 Server Components",
    "Fintech Systems Architecture",
    "Automated Underwriting Engines",
    "Linux VPS Infrastructure",
    "Caddy HTTP/3 Reverse Proxies",
    "Prisma ORM & PostgreSQL",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Commercial Digital Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "B2B Client Portals & Web Platforms",
          description:
            "High-performance full-stack web applications engineered with Next.js 16, React 19, and role-based access control.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Algorithmic Decision & Diagnostic Engines",
          description:
            "Automated financial underwriting, loan origination, debt amortization, and sub-50ms computational calculators.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Production Linux Cloud Infrastructure",
          description:
            "Dedicated cloud pod deployments, Caddy HTTP/3 reverse proxies, edge TLS certificates, and zero-downtime clustering.",
        },
      },
    ],
  },
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
