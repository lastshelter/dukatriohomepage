"use client";

import React, { useEffect, useState } from "react";
import { Server, ShieldCheck } from "lucide-react";

interface TelemetryData {
  node: string;
  region: string;
  transport: string;
  status: string;
  uptimeDays: number;
  appMemoryMb: number;
  uptimeSla: string;
}

const FALLBACK_TELEMETRY: TelemetryData = {
  node: "dukatrio-core-01",
  region: "EU-Central (Falkenstein, DE)",
  transport: "Caddy v2 · HTTP/3 QUIC · TLS 1.3",
  status: "OPTIMAL",
  uptimeDays: 42,
  appMemoryMb: 78,
  uptimeSla: "99.98%",
};

export default function TelemetryStrip(): React.JSX.Element {
  const [data, setData] = useState<TelemetryData>(FALLBACK_TELEMETRY);

  useEffect(() => {
    let active = true;
    fetch("/api/telemetry")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: TelemetryData | null) => {
        if (active && json && json.node) {
          setData(json);
        }
      })
      .catch(() => {
        // Keep fallback silently
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#0D121F] border border-slate-800/90 text-[11px] font-mono text-slate-300 shadow-inner">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
      </span>
      <span className="font-bold text-teal-400">{data.node}</span>
      <span className="text-slate-600">·</span>
      <span className="inline-flex items-center gap-1 text-slate-300">
        <Server className="w-3 h-3 text-teal-400" />
        {data.region}
      </span>
      <span className="hidden sm:inline text-slate-600">·</span>
      <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        {data.transport}
      </span>
      <span className="text-slate-600">·</span>
      <span className="text-emerald-400 font-semibold tabular-nums">
        {data.uptimeSla} SLA ({data.uptimeDays}d up · {data.appMemoryMb}MB RSS)
      </span>
    </div>
  );
}
