import { NextResponse } from "next/server";
import os from "os";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const uptimeSeconds = Math.floor(os.uptime());
  const uptimeDays = Math.max(1, Math.floor(uptimeSeconds / 86400));
  const rssMb = Math.round(process.memoryUsage().rss / (1024 * 1024));

  return NextResponse.json(
    {
      node: "dukatrio-core-01",
      region: "EU-Central (Falkenstein, DE)",
      transport: "Caddy v2 · HTTP/3 QUIC · TLS 1.3",
      status: "OPTIMAL",
      uptimeDays,
      appMemoryMb: rssMb,
      uptimeSla: "99.98%",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    }
  );
}
