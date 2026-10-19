"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ScanLine,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  TICKET_SAMPLES,
  parseTicket,
  validateTicket,
  type ParsedTicket,
} from "@/utils/ticketParser";
import { prefersReducedMotion, useTimeouts } from "@/utils/useTimeouts";

const STEP_MS = 520;

const BASE_STEPS = [
  "Capturing frame & deskew",
  "Binarize & denoise",
  "On-device OCR (WASM · Web Worker)",
  "Field extraction & validation",
] as const;

type Phase = "idle" | "scanning" | "done";

function fieldRows(ticket: ParsedTicket): Array<[string, string]> {
  const dash = "—";
  return [
    ["Ticket no.", ticket.ticketNo ?? dash],
    ["Issued at", ticket.issuedAt ?? dash],
    ["Supplier", ticket.supplier ?? dash],
    ["Driver ID", ticket.driverId ?? dash],
    ["Vehicle", ticket.vehicle ?? dash],
    ["Material", ticket.material ?? dash],
    ["Batch", ticket.batch ?? dash],
    ["Site", ticket.site ?? dash],
    ["Gross", ticket.grossT !== null ? `${ticket.grossT.toFixed(2)} t` : dash],
    ["Tare", ticket.tareT !== null ? `${ticket.tareT.toFixed(2)} t` : dash],
    ["Net tonnage", ticket.netT !== null ? `${ticket.netT.toFixed(2)} t` : dash],
  ];
}

export default function TicketOcrDemo(): React.JSX.Element {
  const { schedule, clear } = useTimeouts();
  const [sampleId, setSampleId] = useState<string>(TICKET_SAMPLES[0]?.id ?? "");
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [online, setOnline] = useState(true);
  const [view, setView] = useState<"table" | "json">("table");

  const sample = TICKET_SAMPLES.find((s) => s.id === sampleId) ?? TICKET_SAMPLES[0];
  const raw = sample?.raw ?? "";
  const lines = useMemo(() => raw.split("\n"), [raw]);
  const parsed = useMemo(() => parseTicket(raw), [raw]);
  const checks = useMemo(() => validateTicket(parsed), [parsed]);

  const flagged = checks.some((check) => !check.ok);
  const status = flagged ? "REVIEW_REQUIRED" : online ? "SYNCED" : "QUEUED_OFFLINE";

  const steps = [
    ...BASE_STEPS,
    online ? "Syncing to command portal" : "Saving to IndexedDB outbox (no signal)",
  ];

  const payload = useMemo(
    () => ({
      ticket_no: parsed.ticketNo,
      issued_at: parsed.issuedAt,
      supplier: parsed.supplier,
      driver_id: parsed.driverId,
      vehicle: parsed.vehicle,
      material: parsed.material,
      batch: parsed.batch,
      site: parsed.site,
      gross_t: parsed.grossT,
      tare_t: parsed.tareT,
      net_t: parsed.netT,
      review_required: flagged,
      status,
    }),
    [parsed, flagged, status]
  );

  const startScan = () => {
    clear();
    if (prefersReducedMotion()) {
      setStep(steps.length);
      setPhase("done");
      return;
    }
    setPhase("scanning");
    setStep(0);
    steps.forEach((_, index) => {
      schedule(() => setStep(index + 1), STEP_MS * (index + 1));
    });
    schedule(() => setPhase("done"), STEP_MS * steps.length);
  };

  const reset = () => {
    clear();
    setPhase("idle");
    setStep(0);
  };

  const selectSample = (id: string) => {
    if (id === sampleId) return;
    clear();
    setSampleId(id);
    setPhase("idle");
    setStep(0);
  };

  const scanning = phase === "scanning";
  const done = phase === "done";
  const revealedLines = done ? lines.length : Math.ceil((lines.length * step) / steps.length);
  const progressPercent = done ? 100 : Math.round((step / steps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Sample picker + signal toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Sample delivery ticket">
          {TICKET_SAMPLES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === sampleId}
              onClick={() => selectSample(s.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                s.id === sampleId
                  ? "bg-teal-950/60 border-teal-400/70 text-teal-300 font-bold"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-600"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={online}
          onClick={() => setOnline((value) => !value)}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
            online
              ? "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600"
              : "bg-amber-950/30 border-amber-700/60 text-amber-300"
          }`}
        >
          {online ? <Wifi className="w-3.5 h-3.5 text-teal-400" /> : <WifiOff className="w-3.5 h-3.5" />}
          <span>Signal: {online ? "ON" : "OFF (site blind spot)"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raw OCR text */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/80 font-mono text-[11px] uppercase tracking-widest text-slate-400">
            <span>Raw ticket text · unstructured</span>
            <span className="text-slate-500">{lines.length} lines</span>
          </div>
          <pre
            className="flex-1 p-5 text-xs sm:text-[13px] leading-relaxed font-mono text-slate-300 overflow-x-auto whitespace-pre"
            aria-label="Raw delivery ticket text"
          >
            {lines.map((line, index) => (
              <span
                key={`${sampleId}-${index}`}
                className={`block transition-opacity duration-300 motion-reduce:transition-none ${
                  phase === "idle" || index < revealedLines ? "opacity-100" : "opacity-25"
                } ${scanning && index === revealedLines - 1 ? "text-teal-300" : ""}`}
              >
                {line}
              </span>
            ))}
          </pre>
          <div className="p-4 border-t border-slate-800/80">
            {phase === "idle" && (
              <button
                type="button"
                onClick={startScan}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg btn-tactile cursor-pointer"
              >
                <ScanLine className="w-4 h-4" />
                <span>Simulate Ticket Scan</span>
              </button>
            )}
            {scanning && (
              <div className="space-y-2.5" role="status" aria-live="polite">
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-teal-400 transition-all duration-500 motion-reduce:transition-none"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <ul className="space-y-1.5 font-mono text-xs">
                  {steps.map((label, index) => {
                    const complete = step > index;
                    const active = step === index;
                    return (
                      <li
                        key={label}
                        className={`flex items-center gap-2.5 transition-opacity ${
                          complete || active ? "opacity-100" : "opacity-30"
                        }`}
                      >
                        {complete ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        ) : active ? (
                          <Loader2 className="w-3.5 h-3.5 text-teal-400 animate-spin shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                        )}
                        <span className={complete ? "text-slate-300" : "text-teal-300"}>{label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {done && (
              <button
                type="button"
                onClick={reset}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-mono transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan again</span>
              </button>
            )}
          </div>
        </div>

        {/* Structured output */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 overflow-hidden flex flex-col min-h-[22rem]">
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-800/80 font-mono text-[11px] uppercase tracking-widest text-slate-400">
            <span>Structured output</span>
            {done && (
              <div className="flex items-center gap-1" role="group" aria-label="Output format">
                {(["table", "json"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={view === mode}
                    onClick={() => setView(mode)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] uppercase cursor-pointer ${
                      view === mode
                        ? "bg-teal-950/60 border-teal-400/60 text-teal-300"
                        : "border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!done && (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-sm text-slate-500 font-mono leading-relaxed">
              {scanning
                ? "Extracting fields…"
                : "Run the scan to parse the raw text into driver, supplier and net tonnage, with validation."}
            </div>
          )}

          {done && (
            <div className="flex-1 p-5 space-y-5">
              <div
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border font-mono text-xs font-bold ${
                  flagged
                    ? "bg-amber-950/40 border-amber-700/60 text-amber-300"
                    : online
                      ? "bg-emerald-950/50 border-emerald-700/60 text-emerald-300"
                      : "bg-sky-950/40 border-sky-700/60 text-sky-300"
                }`}
              >
                {flagged ? (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                <span>
                  {status}
                  {!flagged && !online && " · will sync on reconnect"}
                  {flagged && " · routed to supervisor"}
                </span>
              </div>

              {view === "table" ? (
                <dl className="divide-y divide-slate-800/80 rounded-xl border border-slate-800/80">
                  {fieldRows(parsed).map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                      <dt className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{label}</dt>
                      <dd
                        className={`text-sm font-mono text-right tabular-nums ${
                          label === "Net tonnage" ? "text-teal-400 font-extrabold" : "text-slate-100"
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <pre
                  className="p-4 rounded-xl border border-slate-800/80 bg-[#0D121F] text-xs font-mono text-teal-200 overflow-x-auto"
                  aria-label="Structured JSON output"
                >
                  {JSON.stringify(payload, null, 2)}
                </pre>
              )}

              <ul className="space-y-2" aria-label="Validation checks">
                {checks.map((check) => (
                  <li key={check.label} className="flex items-start gap-2.5 text-xs leading-relaxed">
                    {check.ok ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <span>
                      <span className="font-mono font-bold text-slate-200">{check.label}:</span>{" "}
                      <span className={check.ok ? "text-slate-400" : "text-amber-300"}>{check.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
        Demo: simulated scan of sample ticket text. Parsing and validation run locally in your browser. The production PWA runs OCR on-device from the camera and queues records in IndexedDB.
      </p>
    </div>
  );
}
