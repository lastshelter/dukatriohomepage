"use client";

import React, { useEffect, useId, useState } from "react";
import {
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  Cpu,
  Download,
  FileCode2,
  Layers,
  Link2,
  Loader2,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  BLUEPRINT_MAX_CHARS,
  BLUEPRINT_MIN_CHARS,
  BLUEPRINT_PRESETS,
  buildBlueprintBrief,
  generateBlueprint,
  type Blueprint,
} from "@/utils/blueprintEngine";
import { generateBlueprintPdf } from "@/utils/generateBlueprintPdf";
import { formatEur } from "@/utils/formatEur";
import { prefillContactAndScroll } from "@/utils/contactBridge";
import { prefersReducedMotion, useTimeouts } from "@/utils/useTimeouts";

const ANALYSIS_STAGES = [
  "Parsing workflow description",
  "Matching against delivery archetypes",
  "Resolving stack & technical modules",
  "Sizing sprint bracket",
] as const;

const STAGE_MS = 340;
const REVEAL_MS = 280;

type Phase = "idle" | "analyzing" | "done";

function revealClass(visible: boolean): string {
  return `transition-all duration-500 motion-reduce:transition-none ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  }`;
}

export default function BlueprintEstimator(): React.JSX.Element {
  const textareaId = useId();
  const errorId = useId();
  const { schedule, clear } = useTimeouts();

  const [input, setInput] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0);
  const [reveal, setReveal] = useState(0);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [submittedText, setSubmittedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [codeTab, setCodeTab] = useState<"schema" | "routes">("schema");
  const [copiedLink, setCopiedLink] = useState(false);

  const runBlueprint = (text: string) => {
    const trimmed = text.trim();
    if (trimmed.length < BLUEPRINT_MIN_CHARS) {
      setError(
        `Describe the bottleneck in a sentence or two (at least ${BLUEPRINT_MIN_CHARS} characters), or pick a preset.`
      );
      return;
    }

    clear();
    setError(null);
    const result = generateBlueprint(trimmed);
    setBlueprint(result);
    setSubmittedText(trimmed);

    if (prefersReducedMotion()) {
      setPhase("done");
      setStage(ANALYSIS_STAGES.length);
      setReveal(4);
      return;
    }

    setPhase("analyzing");
    setStage(0);
    setReveal(0);
    ANALYSIS_STAGES.forEach((_, index) => {
      schedule(() => setStage(index + 1), STAGE_MS * (index + 1));
    });
    const analysisEnd = STAGE_MS * ANALYSIS_STAGES.length;
    schedule(() => setPhase("done"), analysisEnd);
    for (let part = 1; part <= 4; part += 1) {
      schedule(() => setReveal(part), analysisEnd + REVEAL_MS * part);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runBlueprint(input);
  };

  const handlePreset = (id: string, text: string) => {
    setInput(text);
    setActivePreset(id);
    runBlueprint(text);
  };

  const handleReset = () => {
    clear();
    setInput("");
    setActivePreset(null);
    setPhase("idle");
    setStage(0);
    setReveal(0);
    setBlueprint(null);
    setSubmittedText("");
    setError(null);
  };

  const handleBookCall = () => {
    if (!blueprint) return;
    prefillContactAndScroll({
      scope: blueprint.scope,
      message: buildBlueprintBrief(blueprint, submittedText),
    });
  };

  const handleCopyShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.delete("blueprint");
    url.searchParams.delete("q");
    if (activePreset) {
      url.searchParams.set("blueprint", activePreset);
    } else if (submittedText) {
      url.searchParams.set("q", submittedText.slice(0, 220));
    }
    url.hash = "blueprint";
    void navigator.clipboard?.writeText(url.toString());
    setCopiedLink(true);
    schedule(() => setCopiedLink(false), 2400);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const presetParam = params.get("blueprint");
    const queryParam = params.get("q");
    if (presetParam) {
      const matched = BLUEPRINT_PRESETS.find((p) => p.id === presetParam);
      if (matched) {
        setInput(matched.text);
        setActivePreset(matched.id);
        const result = generateBlueprint(matched.text);
        setBlueprint(result);
        setSubmittedText(matched.text);
        setPhase("done");
        setStage(ANALYSIS_STAGES.length);
        setReveal(4);
        return;
      }
    }
    if (queryParam && queryParam.trim().length >= BLUEPRINT_MIN_CHARS) {
      const trimmed = queryParam.trim().slice(0, BLUEPRINT_MAX_CHARS);
      setInput(trimmed);
      const result = generateBlueprint(trimmed);
      setBlueprint(result);
      setSubmittedText(trimmed);
      setPhase("done");
      setStage(ANALYSIS_STAGES.length);
      setReveal(4);
    }
  }, []);

  const isAnalyzing = phase === "analyzing";

  return (
    <section
      id="blueprint"
      aria-labelledby="blueprint-heading"
      className="py-28 sm:py-36 relative border-t border-slate-800/80 bg-[#0B0D13]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121F] border border-slate-800/80 text-teal-400 font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Instant Architecture Blueprint</span>
            </div>
            <h2
              id="blueprint-heading"
              className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
            >
              Describe the Bottleneck. Get a Blueprint.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            Tell us what slows your team down. In seconds you get a recommended stack, the technical modules involved and an indicative fixed-price bracket.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ===================== INPUT PANEL ===================== */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-5 rounded-3xl border border-slate-800/80 bg-[#0D121F] p-6 sm:p-8 shadow-xl space-y-6"
            noValidate
          >
            <div className="space-y-3">
              <span className="block text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Start from a common scenario
              </span>
              <div className="flex flex-wrap gap-2">
                {BLUEPRINT_PRESETS.map((preset) => {
                  const selected = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => handlePreset(preset.id, preset.text)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        selected
                          ? "bg-teal-950/60 border-teal-400/70 text-teal-300 font-bold"
                          : "bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-600"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={textareaId}
                className="block text-sm font-bold text-white"
              >
                Or describe your workflow problem
              </label>
              <textarea
                id={textareaId}
                rows={6}
                maxLength={BLUEPRINT_MAX_CHARS}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setActivePreset(null);
                  if (error) setError(null);
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                placeholder="e.g. Our dispatchers coordinate 40 trucks through Excel and phone calls, and reconciling delivery slips at month-end takes days."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-base sm:text-sm text-zinc-100 placeholder:text-slate-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none transition resize-none font-sans shadow-inner"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Runs in your browser. Nothing is sent until you book a call.
                </span>
                <span className="tabular-nums">
                  {input.length}/{BLUEPRINT_MAX_CHARS}
                </span>
              </div>
              {error && (
                <p id={errorId} role="alert" className="text-xs text-rose-300 font-mono">
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg btn-tactile cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing…</span>
                  </>
                ) : (
                  <>
                    <span>Generate Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              {phase !== "idle" && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-mono transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </form>

          {/* ===================== OUTPUT PANEL ===================== */}
          <div
            className="lg:col-span-7 rounded-3xl border border-slate-800/80 bg-[#0D121F] shadow-xl overflow-hidden relative"
            aria-busy={isAnalyzing}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Screen-reader announcement (kept separate from the staged visuals) */}
            <p className="sr-only" role="status">
              {phase === "done" && blueprint
                ? `Blueprint ready: ${blueprint.headline}. ${blueprint.modules.length} modules, ${formatEur(blueprint.priceLow)} to ${formatEur(blueprint.priceHigh)}.`
                : ""}
            </p>

            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800/80 bg-slate-950/50 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 uppercase tracking-widest">blueprint.engine</span>
              </div>
              <span className="text-teal-400">
                {phase === "idle" ? "STANDBY" : isAnalyzing ? "ANALYZING" : "COMPLETE"}
              </span>
            </div>

            <div className="relative p-6 sm:p-8 min-h-[26rem]">
              {phase === "idle" && (
                <div className="space-y-5">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Your blueprint will appear here, in four parts:
                  </p>
                  <ol className="space-y-3 font-mono text-xs text-slate-500">
                    {[
                      "Recommended architecture & stack",
                      "Key technical modules",
                      "Delivery bracket & timeline",
                      "Book a scope call with this blueprint prefilled",
                    ].map((label, index) => (
                      <li
                        key={label}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-slate-800 bg-slate-950/40"
                      >
                        <span className="text-teal-400/70 font-bold">0{index + 1}</span>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {isAnalyzing && (
                <ul className="space-y-3 font-mono text-xs sm:text-sm" aria-label="Analysis progress">
                  {ANALYSIS_STAGES.map((label, index) => {
                    const complete = stage > index;
                    const active = stage === index;
                    return (
                      <li
                        key={label}
                        className={`flex items-center gap-3 transition-opacity duration-300 ${
                          complete || active ? "opacity-100" : "opacity-30"
                        }`}
                      >
                        {complete ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        ) : active ? (
                          <Loader2 className="w-4 h-4 text-teal-400 animate-spin shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                        )}
                        <span className={complete ? "text-slate-300" : "text-teal-300"}>{label}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {phase === "done" && blueprint && (
                <div className="space-y-6">
                  {/* Blueprint header */}
                  <div className={`space-y-3 ${revealClass(reveal >= 1)}`}>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-950/60 border border-teal-800/60 text-teal-300 font-bold uppercase tracking-wider">
                        {blueprint.matchLabel}
                      </span>
                      <span className="text-slate-500">Matched blueprint</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {blueprint.headline}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{blueprint.rationale}</p>
                  </div>

                  {/* 01 · Architecture & Stack */}
                  <div className={`p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 ${revealClass(reveal >= 1)}`}>
                    <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <Layers className="w-4 h-4 shrink-0" />
                      <span>01 · Recommended Architecture & Stack</span>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-[9.5rem_1fr] gap-x-4 gap-y-2.5 text-sm">
                      {blueprint.stack.map((item) => (
                        <React.Fragment key={item.layer}>
                          <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-500 pt-0.5">
                            {item.layer}
                          </dt>
                          <dd className="text-slate-200 leading-snug">{item.tech}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  </div>

                  {/* 02 · Modules */}
                  <div className={`p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 ${revealClass(reveal >= 2)}`}>
                    <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <Cpu className="w-4 h-4 shrink-0" />
                      <span>02 · Key Technical Modules</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {blueprint.modules.map((module) => (
                        <li key={module.id} className="flex gap-2.5 text-sm">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <span className="block font-semibold text-slate-100">{module.name}</span>
                            <span className="block text-xs text-slate-400 leading-relaxed">{module.detail}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 02b · Prisma Schema & API Route Contract */}
                  <div className={`p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 ${revealClass(reveal >= 2)}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
                        <FileCode2 className="w-4 h-4 shrink-0" />
                        <span>Data Model &amp; API Route Contract</span>
                      </div>
                      <div className="inline-flex items-center p-0.5 rounded-lg bg-[#0D121F] border border-slate-800 font-mono text-[11px]">
                        <button
                          type="button"
                          onClick={() => setCodeTab("schema")}
                          className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                            codeTab === "schema"
                              ? "bg-teal-400 text-slate-950 font-bold"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          schema.prisma
                        </button>
                        <button
                          type="button"
                          onClick={() => setCodeTab("routes")}
                          className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                            codeTab === "routes"
                              ? "bg-teal-400 text-slate-950 font-bold"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          API Endpoints ({blueprint.apiRoutes.length})
                        </button>
                      </div>
                    </div>

                    {codeTab === "schema" ? (
                      <pre className="p-4 rounded-xl bg-[#090C14] border border-slate-800/90 text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed">
                        <code>{blueprint.schemaPreview}</code>
                      </pre>
                    ) : (
                      <div className="space-y-2 font-mono text-xs">
                        {blueprint.apiRoutes.map((route) => (
                          <div
                            key={`${route.method}-${route.path}`}
                            className="p-3 rounded-xl bg-[#090C14] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  route.method === "GET"
                                    ? "bg-cyan-950/80 text-cyan-300 border border-cyan-800/60"
                                    : route.method === "POST"
                                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                                    : "bg-amber-950/80 text-amber-300 border border-amber-800/60"
                                }`}
                              >
                                {route.method}
                              </span>
                              <span className="text-slate-200 font-semibold">{route.path}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-sans">
                              {route.summary}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 03 · Bracket */}
                  <div className={`p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4 ${revealClass(reveal >= 3)}`}>
                    <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <Banknote className="w-4 h-4 shrink-0" />
                      <span>03 · Delivery Bracket & Timeline</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                      <div className="p-4 rounded-xl bg-[#0D121F] border border-slate-800/80">
                        <div className="text-xl sm:text-2xl font-extrabold text-teal-400 tabular-nums">
                          {formatEur(blueprint.priceLow)} – {formatEur(blueprint.priceHigh)}
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-semibold">
                          Fixed-milestone bracket
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0D121F] border border-slate-800/80">
                        <div className="text-xl sm:text-2xl font-extrabold text-teal-400">
                          {blueprint.timelineLabel}
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-semibold">
                          Estimated delivery
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-400 leading-relaxed list-disc pl-4 marker:text-slate-600">
                      {blueprint.assumptions.map((assumption) => (
                        <li key={assumption}>{assumption}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 04 · CTA */}
                  <div className={`p-5 rounded-2xl bg-teal-950/20 border border-teal-800/40 space-y-3 ${revealClass(reveal >= 4)}`}>
                    <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <PhoneCall className="w-4 h-4 shrink-0" />
                      <span>04 · Next Step</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleBookCall}
                        className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg btn-tactile cursor-pointer"
                      >
                        <span>Book 15-Min Scope Call for This Blueprint</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void generateBlueprintPdf(blueprint, submittedText)}
                        className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#0D121F] hover:bg-slate-900 border border-teal-500/40 text-teal-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                      >
                        <Download className="w-4 h-4 shrink-0" />
                        <span>Download Blueprint PDF</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyShareLink}
                        className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-slate-700 hover:border-teal-500/40 text-slate-300 hover:text-teal-300 font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-emerald-300">Link Copied</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4 shrink-0 text-teal-400" />
                            <span>Share Link</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 text-center">
                      Opens the contact desk with this blueprint prefilled, or download a 1-page PDF brief for your team.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
