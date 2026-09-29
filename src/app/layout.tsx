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
    "Digital development studio and systems engineering hub. We build full-stack web applications, automated fintech underwriting engines, and resilient cloud infrastructure engineered for speed, security, and scale.",
  metadataBase: new URL("https://dukatrio.com"),
  keywords: [
    "DukaTrio",
    "Full-Stack Engineering",
    "Next.js Development",
    "Fintech Systems",
    "Cloud Infrastructure",
    "Caddy Reverse Proxy",
    "Node.js Systems",
    "Systems Architecture",
  ],
  authors: [{ name: "DukaTrio Systems Engineering" }],
  openGraph: {
    title: "DukaTrio | High-Performance Web Applications & Digital Infrastructure",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
