import { jsPDF } from "jspdf";

export interface ScopeRoiBriefInput {
  monthlySaaS: number;
  seatCount: string;
  bottleneck: string;
  fixedSprintInvestment: number;
  breakEvenMonths: number;
  threeYearSaaS: number;
  netThreeYearSavings: number;
}

export interface TcoBriefInput {
  teamSize: number;
  costPerUser: number;
  timeHorizonYears: 1 | 2 | 3;
  saasMonthly: number;
  saasTotal: number;
  oneTimeBuild: number;
  vpsMonthly: number;
  dedicatedHostingTotal: number;
  dedicatedTotal: number;
  dedicatedMonthlyAmortized: number;
  totalSavings: number;
  savingsPercent: number;
  breakEvenMonths: number;
}

/**
 * Normalizes strings for PDF Standard 14 Helvetica encoding to prevent glyph artifacts.
 */
function pdfSafeText(input: string): string {
  return input
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2022/g, "*")
    .replace(/€/g, "EUR ");
}

function formatEur(amount: number): string {
  return `EUR ${Math.round(amount).toLocaleString("en-US")}`;
}

/**
 * Generates a deterministic intake verification hash from calculator parameters.
 */
export function computeIntakeVerificationHash(payload: string): string {
  let h1 = 0xdeadbeef ^ payload.length;
  let h2 = 0x41c6ce57 ^ payload.length;
  for (let i = 0; i < payload.length; i++) {
    const ch = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex1 = (h1 >>> 0).toString(16).toUpperCase().padStart(8, "0");
  const hex2 = (h2 >>> 0).toString(16).toUpperCase().padStart(8, "0");
  return `DKT-ROI-${hex1}-${hex2}`;
}

/**
 * Generates and downloads a 1-page Executive CFO/Board PDF ROI Brief
 * from the homepage ROI & SaaS Replacement Calculator state.
 */
export function generateScopeRoiPdfBrief(input: ScopeRoiBriefInput): string {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const vpsMonthly = 15;
  const vpsThreeYear = vpsMonthly * 36;
  const totalDedicatedThreeYear = input.fixedSprintInvestment + vpsThreeYear;
  const yearOneSaaS = input.monthlySaaS * 12;
  const yearOneDedicated = input.fixedSprintInvestment + vpsMonthly * 12;
  const roiMultiple =
    input.fixedSprintInvestment > 0
      ? (input.threeYearSaaS / input.fixedSprintInvestment).toFixed(1)
      : "1.0";

  const verificationHash = computeIntakeVerificationHash(
    `${input.monthlySaaS}|${input.seatCount}|${input.bottleneck}|${input.fixedSprintInvestment}|${dateStr}`
  );

  // =========================================================================
  // 1. CORPORATE SLATE / TEAL ENGINEERING HEADER
  // =========================================================================
  // Dark Slate Header Background (#0B0F19)
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, 210, 38, "F");

  // Top Teal Accent Bar (#2DD4BF)
  doc.setFillColor(45, 212, 191);
  doc.rect(0, 0, 210, 2.2, "F");

  // Brand Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text("DUKATRIO", 14, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(45, 212, 191);
  doc.text("ENGINEERING & ARCHITECTURE DESK", 49, 15);

  // Document Subtitle
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(241, 245, 249);
  doc.text(
    "CFO / BOARD EXECUTIVE ROI & TCO FEASIBILITY BRIEF",
    14,
    24
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Fixed-Milestone Custom Software Sprint vs. Recurring Multi-Tenant SaaS Overhead",
    14,
    30.5
  );

  // Right-side Metadata Badge in Header
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(45, 212, 191);
  doc.setLineWidth(0.35);
  doc.roundedRect(142, 9, 54, 21, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(45, 212, 191);
  doc.text("VERIFIED ROI MODEL", 146, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  doc.text(`Date: ${dateStr}`, 146, 20.5);
  doc.text(`Ref: ${verificationHash.slice(0, 16)}`, 146, 25.5);

  // =========================================================================
  // 2. EXECUTIVE KPI SUMMARY CARDS (3 COLUMNS)
  // =========================================================================
  const cardY = 44;
  const cardH = 26;
  const cardW = 58.6;

  // Card 1: Projected 3-Year Savings (Teal Highlight)
  doc.setFillColor(240, 253, 250); // Teal-50
  doc.setDrawColor(20, 184, 166); // Teal-500
  doc.setLineWidth(0.45);
  doc.roundedRect(14, cardY, cardW, cardH, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(15, 118, 110);
  doc.text("PROJECTED 3-YEAR SAVINGS", 18, cardY + 6.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text(formatEur(input.netThreeYearSavings), 18, cardY + 15.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`${roiMultiple}x 36-Month Capital Multiple`, 18, cardY + 22);

  // Card 2: Capital Payback / Break-Even
  doc.setFillColor(248, 250, 252); // Slate-50
  doc.setDrawColor(203, 213, 225); // Slate-300
  doc.setLineWidth(0.35);
  doc.roundedRect(75.7, cardY, cardW, cardH, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("CAPITAL PAYBACK HORIZON", 79.7, cardY + 6.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `${input.breakEvenMonths} ${input.breakEvenMonths === 1 ? "Month" : "Months"}`,
    79.7,
    cardY + 15.5
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Replaces ${formatEur(input.monthlySaaS)}/mo burn`,
    79.7,
    cardY + 22
  );

  // Card 3: Fixed Sprint Investment
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.35);
  doc.roundedRect(137.4, cardY, cardW, cardH, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("FIXED SPRINT INVESTMENT", 141.4, cardY + 6.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text(formatEur(input.fixedSprintInvestment), 141.4, cardY + 15.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(15, 118, 110);
  doc.text("EUR 0 Seat Tax | 100% IP Ownership", 141.4, cardY + 22);

  // =========================================================================
  // 3. CONFIGURED OPERATIONAL INPUTS STRIP
  // =========================================================================
  const stripY = 75;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, stripY, 182, 16, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text("MODEL INPUT PARAMETERS:", 18, stripY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Current SaaS & Spreadsheet Spend: ${formatEur(input.monthlySaaS)}/mo   |   Internal Team Size: ${pdfSafeText(input.seatCount)}`,
    59,
    stripY + 6
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text("PRIMARY BOTTLENECK:", 18, stripY + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 110);
  doc.text(pdfSafeText(input.bottleneck), 53, stripY + 12);

  // =========================================================================
  // 4. COST BREAKDOWN & 3-YEAR FINANCIAL COMPARISON TABLE
  // =========================================================================
  let y = 99;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("1. 36-MONTH COST BREAKDOWN & CASH FLOW ANALYSIS", 14, y);

  y += 3.5;
  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(14, y, 182, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("COST CATEGORY / FINANCIAL METRIC", 17, y + 5.3);
  doc.text("STATUS QUO (SAAS)", 95, y + 5.3);
  doc.text("DUKATRIO CUSTOM BUILD", 132, y + 5.3);
  doc.text("NET IMPACT", 172, y + 5.3);

  const costRows: [string, string, string, string][] = [
    [
      "Initial Engineering & Architecture CapEx",
      "EUR 0 (Rented License)",
      `${formatEur(input.fixedSprintInvestment)} (Fixed)`,
      "100% Owned Asset",
    ],
    [
      `Monthly Software & Seat Licensing (${pdfSafeText(input.seatCount)})`,
      `${formatEur(input.monthlySaaS)} / month`,
      "EUR 0 / month",
      `+${formatEur(input.monthlySaaS)}/mo saved`,
    ],
    [
      "Dedicated European NVMe VPS Hosting",
      "Bundled in SaaS Tax",
      `EUR ${vpsMonthly} / month`,
      "Private Cloud",
    ],
    [
      "Year 1 Cumulative Cash Outflow (12 Months)",
      formatEur(yearOneSaaS),
      formatEur(yearOneDedicated),
      yearOneSaaS >= yearOneDedicated
        ? `+${formatEur(yearOneSaaS - yearOneDedicated)} Yr 1`
        : `Break-even @ ${input.breakEvenMonths} mo`,
    ],
    [
      "3-Year Cumulative Software Spend (36 Months)",
      formatEur(input.threeYearSaaS),
      `${formatEur(totalDedicatedThreeYear)} (incl. VPS)`,
      `+${formatEur(Math.max(0, input.threeYearSaaS - totalDedicatedThreeYear))}`,
    ],
  ];

  y += 8;
  costRows.forEach((row, idx) => {
    const rowH = 8.2;
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(14, y, 182, rowH, "F");
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(14, y + rowH, 196, y + rowH);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(row[0], 17, y + 5.5);

    doc.setTextColor(185, 28, 28); // Rose/Red for SaaS burn
    doc.text(row[1], 95, y + 5.5);

    doc.setTextColor(15, 23, 42);
    doc.text(row[2], 132, y + 5.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 118, 110);
    doc.text(row[3], 172, y + 5.5);

    y += rowH;
  });

  // Total Savings Summary Row
  const totalRowH = 9.5;
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(20, 184, 166);
  doc.setLineWidth(0.4);
  doc.rect(14, y, 182, totalRowH, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    "PROJECTED 3-YEAR NET CAPITAL SAVINGS (VS. FIXED SPRINT)",
    17,
    y + 6.2
  );
  doc.setTextColor(15, 118, 110);
  doc.setFontSize(9.5);
  doc.text(`+${formatEur(input.netThreeYearSavings)}`, 166, y + 6.2);

  // =========================================================================
  // 5. ESTIMATED ENGINEERING TIMELINE & MILESTONE SCHEDULE TABLE
  // =========================================================================
  y += 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("2. ESTIMATED IMPLEMENTATION TIMELINE & FIXED MILESTONES", 14, y);

  y += 3.5;
  doc.setFillColor(15, 23, 42);
  doc.rect(14, y, 182, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("SPRINT PHASE", 17, y + 5.3);
  doc.text("TIMELINE", 63, y + 5.3);
  doc.text("CORE ENGINEERING DELIVERABLES", 92, y + 5.3);
  doc.text("TRANCHE", 173, y + 5.3);

  const timelineRows: [string, string, string, string][] = [
    [
      "Phase 1: Blueprint & Schema",
      "Week 1 (Days 1-5)",
      "PostgreSQL schema, RBAC security model, clickable UI prototype",
      `30% (${formatEur(input.fixedSprintInvestment * 0.3)})`,
    ],
    [
      "Phase 2: Core Sprint Build",
      "Weeks 2-3 (Days 6-18)",
      "Next.js full-stack portal, workflow automation, data migration",
      `40% (${formatEur(input.fixedSprintInvestment * 0.4)})`,
    ],
    [
      "Phase 3: QA & VPS Cutover",
      "Week 4 (Days 19-25)",
      "Production Caddy/TLS setup, team onboarding, 100% Git handover",
      `30% (${formatEur(input.fixedSprintInvestment * 0.3)})`,
    ],
  ];

  y += 8;
  timelineRows.forEach((row, idx) => {
    const rowH = 8.5;
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(14, y, 182, rowH, "F");
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(14, y + rowH, 196, y + rowH);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(row[0], 17, y + 5.6);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 118, 110);
    doc.text(row[1], 63, y + 5.6);

    doc.setTextColor(51, 65, 85);
    doc.text(row[2], 92, y + 5.6);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(row[3], 173, y + 5.6);

    y += rowH;
  });

  // =========================================================================
  // 6. GOVERNANCE GUARANTEES & INTAKE VERIFICATION HASH BLOCK
  // =========================================================================
  y += 8;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.35);
  doc.roundedRect(14, y, 182, 26, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("ARCHITECTURAL & PROCUREMENT GUARANTEES", 18, y + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    "* 100% Intellectual Property Transfer: Complete Git repository, Docker Compose, and database handover upon completion.",
    18,
    y + 12.5
  );
  doc.text(
    "* Zero Per-Seat Licensing Tax: Add unlimited internal staff, field operators, or B2B clients with EUR 0 extra license cost.",
    18,
    y + 17.5
  );
  doc.text(
    "* Fixed-Price Governance: Milestone tranches are tied strictly to verified deliverables with a 30-day warranty window.",
    18,
    y + 22.5
  );

  // Intake Verification Hash Footer Box
  y += 31;
  doc.setFillColor(11, 15, 25);
  doc.setDrawColor(45, 212, 191);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y, 182, 18, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(45, 212, 191);
  doc.text("INTAKE VERIFICATION HASH (REFERENCE DURING 15-MIN AUDIT):", 18, y + 6.5);

  doc.setFont("courier", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text(verificationHash, 18, y + 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Schedule Audit: https://dukatrio.com/#contact  |  engineering@dukatrio.com",
    102,
    y + 13
  );

  // Bottom Page Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `DukaTrio Systems - Confidential CFO/Board ROI Brief - Generated ${dateStr} - Hash: ${verificationHash}`,
    14,
    290
  );
  doc.text("Page 1 of 1", 183, 290);

  doc.save(`DukaTrio-Executive-ROI-Brief-${dateStr}.pdf`);
  return verificationHash;
}

/**
 * Generates and downloads a 1-page Executive CFO/Board PDF ROI Brief
 * from the TcoCalculator component state.
 */
export function generateTcoPdfBrief(input: TcoBriefInput): string {
  return generateScopeRoiPdfBrief({
    monthlySaaS: input.saasMonthly,
    seatCount: `${input.teamSize} seats (@ EUR ${input.costPerUser}/seat)`,
    bottleneck: `Multi-Tenant SaaS Subscription Drain (${input.timeHorizonYears}-Year Horizon)`,
    fixedSprintInvestment: input.oneTimeBuild,
    breakEvenMonths: input.breakEvenMonths,
    threeYearSaaS: input.saasTotal,
    netThreeYearSavings: input.totalSavings,
  });
}
