/**
 * Demo-grade delivery-ticket parser used by the Gradilište sandbox.
 * It genuinely parses the sample text below (regex extraction, OCR digit
 * clean-up, weight arithmetic), so edits to the samples behave consistently.
 */

export interface TicketSample {
  id: string;
  label: string;
  raw: string;
}

export const TICKET_SAMPLES: TicketSample[] = [
  {
    id: "concrete",
    label: "Concrete pour",
    raw: [
      "BETONARA NOVI SAD d.o.o.",
      "OTPREMNICA / DELIVERY TICKET",
      "No: DT-2026-018834   Date: 14.10.2026 07:42",
      "Supplier: Betonara Novi Sad",
      "Driver ID: DRV-O417   Vehicle: NS 482-KL",
      "Material: C30/37 XC2 S4 Concrete",
      "Batch: B-77219",
      "Gross: 38.42 t   Tare: 14.18 t",
      "Site: Blok 45 - Foundation Slab",
    ].join("\n"),
  },
  {
    id: "aggregate",
    label: "Aggregate haul",
    raw: [
      "KAMENOLOM FRUSKA GORA",
      "DELIVERY NOTE",
      "No: DN-2026-004471   Date: 15.10.2026 06:15",
      "Supplier: Kamenolom Fruska Gora",
      "Driver ID: DRV-0233   Vehicle: SM 119-AB",
      "Material: Crushed Aggregate 0/32",
      "Batch: AG-5530",
      "Gross: 39.80 t   Tare: 15.30 t",
      "Site: Rt 12 - Access Road",
    ].join("\n"),
  },
  {
    id: "asphalt",
    label: "Asphalt (flagged)",
    raw: [
      "ASFALT BANAT",
      "DELIVERY TICKET",
      "No: DT-2026-009120   Date: 16.10.2026 13:05",
      "Supplier: Asfalt Banat",
      "Driver ID: DRV-0I58",
      "Vehicle: ZR 770-QW",
      "Material: AC 16 surf 50/70 Asphalt",
      "Batch: A-20418",
      "Gross: 36.80 t   Tare: 13.90 t   Net: 22.00 t",
      "Site: Obilaznica - Lot 3",
    ].join("\n"),
  },
];

export const GROSS_LIMIT_T = 40;

export interface ParsedTicket {
  ticketNo: string | null;
  issuedAt: string | null;
  supplier: string | null;
  driverId: string | null;
  vehicle: string | null;
  material: string | null;
  batch: string | null;
  site: string | null;
  grossT: number | null;
  tareT: number | null;
  /** Net weight computed as gross − tare. */
  netT: number | null;
  /** Net weight printed on the ticket, when present. */
  printedNetT: number | null;
  corrections: string[];
}

export interface TicketCheck {
  label: string;
  ok: boolean;
  detail: string;
}

const round2 = (n: number): number => Math.round(n * 100) / 100;

function firstGroup(raw: string, pattern: RegExp): string | null {
  const match = pattern.exec(raw);
  return match?.[1]?.trim() ?? null;
}

function toTonnes(value: string | null): number | null {
  if (value === null) return null;
  const parsed = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

/** OCR commonly confuses O→0 and I/l→1 inside numeric tokens. */
function fixDigits(token: string): string {
  return token.replace(/[Oo]/g, "0").replace(/[Il]/g, "1");
}

export function parseTicket(raw: string): ParsedTicket {
  const corrections: string[] = [];

  const ticketNo = firstGroup(raw, /\bNo\s*[:.]\s*([A-Z]{2}-\d{4}-\d{3,})/i);

  const dateMatch = /Date\s*:\s*(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})/i.exec(raw);
  const issuedAt = dateMatch
    ? `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}T${dateMatch[4]}:${dateMatch[5]}`
    : null;

  const driverMatch = /Driver\s*ID\s*:\s*DRV[-\s]?([0-9OIl]{4})/i.exec(raw);
  let driverId: string | null = null;
  if (driverMatch?.[1]) {
    const original = driverMatch[1];
    const fixed = fixDigits(original);
    driverId = `DRV-${fixed}`;
    if (fixed !== original) corrections.push(`DRV-${original} → DRV-${fixed}`);
  }

  const vehicleRaw = firstGroup(raw, /Vehicle\s*:\s*([A-Z]{2}\s?\d{3}-[A-Z]{2})/i);
  const vehicle = vehicleRaw ? vehicleRaw.replace(/\s+/g, " ").toUpperCase() : null;

  const grossT = toTonnes(firstGroup(raw, /Gross\s*:\s*(\d+(?:[.,]\d+)?)\s*t/i));
  const tareT = toTonnes(firstGroup(raw, /Tare\s*:\s*(\d+(?:[.,]\d+)?)\s*t/i));
  const printedNetT = toTonnes(firstGroup(raw, /Net\s*:\s*(\d+(?:[.,]\d+)?)\s*t/i));

  return {
    ticketNo,
    issuedAt,
    supplier: firstGroup(raw, /^\s*Supplier\s*:\s*(.+?)\s*$/im),
    driverId,
    vehicle,
    material: firstGroup(raw, /^\s*Material\s*:\s*(.+?)\s*$/im),
    batch: firstGroup(raw, /Batch\s*:\s*([A-Z]{1,2}-\d+)/i),
    site: firstGroup(raw, /^\s*Site\s*:\s*(.+?)\s*$/im),
    grossT,
    tareT,
    netT: grossT !== null && tareT !== null ? round2(grossT - tareT) : null,
    printedNetT,
    corrections,
  };
}

export function validateTicket(ticket: ParsedTicket): TicketCheck[] {
  const required: Array<[string, unknown]> = [
    ["ticket no", ticket.ticketNo],
    ["date", ticket.issuedAt],
    ["supplier", ticket.supplier],
    ["driver", ticket.driverId],
    ["vehicle", ticket.vehicle],
    ["material", ticket.material],
    ["batch", ticket.batch],
    ["gross", ticket.grossT],
    ["tare", ticket.tareT],
  ];
  const missing = required.filter(([, value]) => value === null).map(([name]) => name);

  const checks: TicketCheck[] = [
    {
      label: "Required fields",
      ok: missing.length === 0,
      detail:
        missing.length === 0
          ? `All ${required.length} required fields extracted`
          : `Missing: ${missing.join(", ")}`,
    },
  ];

  if (ticket.grossT !== null && ticket.tareT !== null && ticket.netT !== null) {
    const arithmetic = `${ticket.grossT.toFixed(2)} − ${ticket.tareT.toFixed(2)} = ${ticket.netT.toFixed(2)} t`;
    if (ticket.printedNetT !== null) {
      const matches = Math.abs(ticket.printedNetT - ticket.netT) < 0.01;
      checks.push({
        label: "Weight arithmetic",
        ok: matches,
        detail: matches
          ? `${arithmetic} matches printed net`
          : `Printed net ${ticket.printedNetT.toFixed(2)} t ≠ computed ${ticket.netT.toFixed(2)} t`,
      });
    } else {
      checks.push({ label: "Weight arithmetic", ok: true, detail: `Net derived: ${arithmetic}` });
    }

    checks.push({
      label: "Gross weight limit",
      ok: ticket.grossT <= GROSS_LIMIT_T,
      detail:
        ticket.grossT <= GROSS_LIMIT_T
          ? `${ticket.grossT.toFixed(2)} t within ${GROSS_LIMIT_T} t configured limit`
          : `${ticket.grossT.toFixed(2)} t exceeds ${GROSS_LIMIT_T} t configured limit`,
    });
  }

  checks.push({
    label: "OCR clean-up",
    ok: true,
    detail:
      ticket.corrections.length > 0
        ? `Auto-corrected ${ticket.corrections.length} character confusion: ${ticket.corrections.join(", ")}`
        : "No character corrections needed",
  });

  return checks;
}
