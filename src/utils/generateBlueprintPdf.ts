import type { Blueprint } from "@/utils/blueprintEngine";
import { formatEur } from "@/utils/formatEur";

export async function generateBlueprintPdf(
  blueprint: Blueprint,
  description: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Header Banner
  doc.setFillColor(11, 13, 19);
  doc.rect(0, 0, 210, 36, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(45, 212, 191);
  doc.text("DUKATRIO ENGINEERING STUDIO", 16, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(203, 213, 225);
  doc.text(
    "Technical Architecture Blueprint & Indicative Fixed-Milestone Brief",
    16,
    22
  );

  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  const dateStr = new Date().toISOString().slice(0, 10);
  doc.text(
    `Generated: ${dateStr}  |  Single-Tenant EU VPS  |  100% Client IP Ownership`,
    16,
    29
  );

  let y = 46;

  // Matched Archetype & Bracket Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(16, y, 178, 24, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 110);
  doc.text(`MATCHED ARCHITECTURE (${blueprint.matchLabel.toUpperCase()})`, 21, y + 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(blueprint.headline, 21, y + 14.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 118, 110);
  const bracketStr = `${formatEur(blueprint.priceLow)} - ${formatEur(blueprint.priceHigh)} (${blueprint.timelineLabel})`;
  doc.text(bracketStr, 189, y + 14.5, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Fixed-Milestone Sprint · Zero Per-Seat Licensing", 189, y + 20, {
    align: "right",
  });

  y += 32;

  // Problem Statement
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("1. WORKFLOW BOTTLENECK & RATIONALE", 16, y);
  y += 5;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const problemLines = doc.splitTextToSize(
    `"${description.trim().slice(0, 500)}"`,
    178
  ) as string[];
  doc.text(problemLines, 16, y);
  y += problemLines.length * 4.2 + 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  const rationaleLines = doc.splitTextToSize(blueprint.rationale, 178) as string[];
  doc.text(rationaleLines, 16, y);
  y += rationaleLines.length * 4.2 + 6;

  // Recommended Stack
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("2. RECOMMENDED PRODUCTION STACK", 16, y);
  y += 5;

  blueprint.stack.forEach((item) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 118, 110);
    doc.text(`${item.layer.toUpperCase()}:`, 18, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 41, 59);
    const techLines = doc.splitTextToSize(item.tech, 138) as string[];
    doc.text(techLines, 54, y);
    y += Math.max(1, techLines.length) * 4.5 + 1;
  });

  y += 4;

  // Key Technical Modules
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("3. KEY TECHNICAL MODULES INCLUDED", 16, y);
  y += 5;

  blueprint.modules.forEach((mod) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${mod.name}`, 18, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const detailLines = doc.splitTextToSize(mod.detail, 170) as string[];
    doc.text(detailLines, 22, y);
    y += detailLines.length * 3.8 + 2;
  });

  y += 3;

  // Core API Route Contract & Schema Preview
  if (y < 235) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text("4. PRIMARY API ENDPOINTS & DATA CONTRACT", 16, y);
    y += 5;

    blueprint.apiRoutes.forEach((route) => {
      doc.setFont("courier", "bold");
      doc.setFontSize(8);
      doc.setTextColor(15, 118, 110);
      doc.text(`${route.method} ${route.path}`, 18, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const sumLines = doc.splitTextToSize(route.summary, 105) as string[];
      doc.text(sumLines, 88, y);
      y += Math.max(1, sumLines.length) * 4.2 + 1;
    });
  }

  // Footer Bar
  doc.setDrawColor(203, 213, 225);
  doc.line(16, 274, 194, 274);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    "Next Step: Book a 15-Minute Engineering Scope Call at https://dukatrio.com/#contact",
    16,
    280
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "DukaTrio Engineering Studio · Fixed 50/50 Milestone Sprints · Dedicated Hetzner EU Infrastructure · Full Git & DB Handover",
    16,
    285
  );

  const safeSlug = blueprint.archetype.replace(/[^a-z0-9-]/gi, "-");
  doc.save(`DukaTrio-Blueprint-${safeSlug}.pdf`);
}
