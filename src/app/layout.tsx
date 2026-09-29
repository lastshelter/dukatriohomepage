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
  "@type": ["ProfessionalService", "Organization"],
  name: "DukaTrio",
  url: "https://dukatrio.com",
  description:
    "Institutional-grade digital engineering studio and systems architecture hub.",
  founder: {
    "@type": "Person",
    name: "Petar D.",
  },
  knowsAbout: [
    "Next.js",
    "Fintech Architecture",
    "Automated Underwriting Engines",
    "Linux VPS Infrastructure",
    "Caddy Edge Proxies",
    "Prisma ORM",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Applications",
          description:
            "High-performance full-stack web applications engineered with Next.js and React.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Financial Decision Engines",
          description:
            "Automated underwriting, loan origination, and debt amortization systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dedicated Cloud Architecture",
          description:
            "Resilient Linux VPS deployments, Caddy HTTP/3 reverse proxies, and automated TLS.",
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
