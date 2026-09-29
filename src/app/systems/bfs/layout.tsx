import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biggs Funding Solutions (BFS) Case Study | DukaTrio Systems",
  description:
    "Technical case study on the Biggs Funding Solutions (BFS) commercial debt syndication platform. Architecture breakdown, <65ms calculation latency, and zero-overhead term sheet generation.",
};

export default function BfsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
