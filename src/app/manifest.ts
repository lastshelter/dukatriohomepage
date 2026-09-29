import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DukaTrio Engineering",
    short_name: "DukaTrio",
    description:
      "Institutional-grade digital engineering studio and systems architecture hub.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#06b6d4",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
