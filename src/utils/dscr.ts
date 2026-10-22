import { formatEur } from "@/utils/formatEur";

/** DSCR maths and sample term-sheet content for the Funding Desk sandbox. */

export const DSCR_FLOOR = 1.0;
export const DSCR_PRIME_MIN = 1.25;
export const STRESS_NOI_HAIRCUT = 0.15;
export const ASSUMED_RATE_PCT = 9.5;
export const ASSUMED_TERM_YEARS = 7;

export type RiskTier = "subprime" | "borderline" | "prime";

export const TIER_LABEL: Record<RiskTier, string> = {
  subprime: "Subprime",
  borderline: "Borderline",
  prime: "Prime Qualified",
};

export interface DscrInputs {
  revenue: number;
  noi: number;
  debtService: number;
}

export interface DscrResult {
  dscr: number;
  tier: RiskTier;
  noiMargin: number;
  /** Highest annual debt service that still clears the 1.25x prime threshold. */
  maxDebtService: number;
  /** maxDebtService − requested debt service (negative means over the limit). */
  headroom: number;
  /** Extra NOI needed to reach 1.25x at the requested debt service (0 when already clear). */
  noiGap: number;
  stressDscr: number;
  stressTier: RiskTier;
}

const round2 = (n: number): number => Math.round(n * 100) / 100;

export function classifyDscr(dscr: number): RiskTier {
  const rounded = round2(dscr);
  if (rounded < DSCR_FLOOR) return "subprime";
  if (rounded < DSCR_PRIME_MIN) return "borderline";
  return "prime";
}

export function computeDscr({ revenue, noi, debtService }: DscrInputs): DscrResult {
  const dscr = debtService > 0 ? noi / debtService : 0;
  const stressDscr = debtService > 0 ? (noi * (1 - STRESS_NOI_HAIRCUT)) / debtService : 0;
  const maxDebtService = noi / DSCR_PRIME_MIN;

  return {
    dscr,
    tier: classifyDscr(dscr),
    noiMargin: revenue > 0 ? noi / revenue : 0,
    maxDebtService,
    headroom: maxDebtService - debtService,
    noiGap: Math.max(0, debtService * DSCR_PRIME_MIN - noi),
    stressDscr,
    stressTier: classifyDscr(stressDscr),
  };
}

/** Present value of level annual payments at the assumed rate and term, rounded to €1,000. */
export function supportableFacility(annualDebtService: number): number {
  if (annualDebtService <= 0) return 0;
  const rate = ASSUMED_RATE_PCT / 100;
  const factor = (1 - Math.pow(1 + rate, -ASSUMED_TERM_YEARS)) / rate;
  return Math.round((annualDebtService * factor) / 1000) * 1000;
}

export interface TermSheet {
  decisionTier: RiskTier;
  decision: string;
  rows: Array<{ label: string; value: string }>;
  conditions: string[];
  assumptions: string;
}

export function buildTermSheet(inputs: DscrInputs, result: DscrResult): TermSheet {
  const sizingDebtService = Math.min(inputs.debtService, result.maxDebtService);
  const facility = supportableFacility(sizingDebtService);

  const rows = [
    { label: "Borrower", value: "Demo Borrower LLC (sample)" },
    { label: "Facility type", value: "Senior commercial term loan" },
    { label: "Annual gross revenue", value: formatEur(inputs.revenue) },
    { label: "Net operating income", value: formatEur(inputs.noi) },
    { label: "Requested annual debt service", value: formatEur(inputs.debtService) },
    { label: "DSCR (requested structure)", value: `${result.dscr.toFixed(2)}x` },
    { label: "Minimum DSCR (prime)", value: `${DSCR_PRIME_MIN.toFixed(2)}x` },
    { label: "Max debt service at 1.25x", value: formatEur(result.maxDebtService) },
    { label: "Indicative supportable facility", value: formatEur(facility) },
  ];

  if (result.tier === "prime") {
    return {
      decisionTier: "prime",
      decision: "Prime Qualified · expedited approval path",
      rows,
      conditions: [
        "Financial covenant: DSCR ≥ 1.25x, tested annually.",
        "Bank statements and tax returns verified through the encrypted document vault.",
        "Personal guarantee per credit policy.",
      ],
      assumptions: assumptionsText(),
    };
  }

  if (result.tier === "borderline") {
    return {
      decisionTier: "borderline",
      decision: "Borderline · conditional approval",
      rows,
      conditions: [
        `Reduce annual debt service to ${formatEur(result.maxDebtService)} or less, or evidence ${formatEur(result.noiGap)} more NOI, to reach 1.25x.`,
        "Additional collateral or a guarantor required.",
        "Enhanced reporting: quarterly DSCR test.",
      ],
      assumptions: assumptionsText(),
    };
  }

  return {
    decisionTier: "subprime",
    decision: "Subprime · declined at requested structure",
    rows,
    conditions: [
      "Requested debt service exceeds net operating income (DSCR below 1.00x).",
      `Counter-structure: annual debt service up to ${formatEur(result.maxDebtService)} (1.25x) supports roughly ${formatEur(facility)}.`,
      "Re-submit with covenant-ready financials, or consider an asset-backed structure.",
    ],
    assumptions: assumptionsText(),
  };
}

function assumptionsText(): string {
  return `Illustrative sample generated in your browser from the slider values. Facility sizing assumes ${ASSUMED_RATE_PCT}% interest over ${ASSUMED_TERM_YEARS} years with level annual payments. This is not a lending offer, quote or credit decision.`;
}
