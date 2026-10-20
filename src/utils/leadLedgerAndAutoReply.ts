import { mkdir, appendFile } from "fs/promises";
import path from "path";
import type { Transporter } from "nodemailer";

export interface LeadLedgerEntry {
  timestamp: string;
  endpoint: "/api/contact" | "/api/lead";
  name: string;
  email: string;
  phone?: string;
  scope: string;
  budget?: string;
  message: string;
  ip: string;
}

export async function appendLeadToLocalLedger(entry: LeadLedgerEntry): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "leads.jsonl");
    await appendFile(filePath, `${JSON.stringify(entry)}\n`, "utf8");
  } catch (err) {
    console.warn("[LEAD LEDGER WARN] Could not append to local leads.jsonl:", err);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendProspectAutoReply(
  transporter: Transporter,
  entry: LeadLedgerEntry
): Promise<void> {
  if (!entry.email || !entry.email.includes("@")) return;

  const safeName = escapeHtml(entry.name);
  const safeScope = escapeHtml(entry.scope);
  const safeMessage = escapeHtml(entry.message);
  const refId = `DKT-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const subject = `[DukaTrio Engineering Desk] Intake Confirmed (${refId}) — ${entry.scope}`;

  const textBody = [
    `Hello ${entry.name},`,
    ``,
    `Your engineering inquiry (${refId}) has been logged at the DukaTrio Systems Architecture Desk.`,
    ``,
    `--- INTAKE SUMMARY ---`,
    `Reference ID: ${refId}`,
    `Target Scope: ${entry.scope}`,
    entry.budget ? `Indicative Bracket: ${entry.budget}` : null,
    `Submitted Context:`,
    `${entry.message}`,
    ``,
    `--- WHAT HAPPENS NEXT (WITHIN 4–12 BUSINESS HOURS) ---`,
    `1. Our lead systems architect reviews your workflow bottleneck and data model requirements.`,
    `2. We prepare a concrete single-tenant architecture recommendation (Next.js 16 / SvelteKit / PostgreSQL / PocketBase on dedicated EU VPS).`,
    `3. We reply directly to this thread with available 15-minute scope call slots and a fixed-milestone delivery plan (€4,800 baseline · 100% IP ownership · €0 per-seat fees).`,
    ``,
    `Need to share a sample spreadsheet, docket photo, or additional specs ahead of our review? Simply reply directly to this email.`,
    ``,
    `Best regards,`,
    `Petar — Lead Systems Engineer`,
    `DukaTrio Engineering Studio`,
    `https://dukatrio.com`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #0B0D13; color: #E2E8F0; border: 1px solid #1E293B; border-radius: 16px; overflow: hidden;">
  <div style="padding: 24px 28px; background-color: #0D121F; border-bottom: 1px solid #1E293B;">
    <div style="font-family: monospace; font-size: 11px; color: #2DD4BF; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">
      DUKATRIO ENGINEERING STUDIO // INTAKE RECEIPT ${refId}
    </div>
    <h2 style="margin: 8px 0 0 0; font-size: 20px; color: #FFFFFF; font-weight: 800;">
      Your Architecture Inquiry is Confirmed
    </h2>
  </div>

  <div style="padding: 28px; font-size: 14px; line-height: 1.6; color: #CBD5E1;">
    <p style="margin-top: 0;">Hello <strong style="color: #FFFFFF;">${safeName}</strong>,</p>
    <p>
      We have received your project brief and assigned it reference <strong style="color: #2DD4BF; font-family: monospace;">${refId}</strong>. Our engineering desk reviews all technical intakes directly—no sales middlemen.
    </p>

    <div style="margin: 20px 0; padding: 18px; background-color: #0D121F; border: 1px solid #1E293B; border-radius: 12px;">
      <div style="font-family: monospace; font-size: 11px; color: #94A3B8; text-transform: uppercase; margin-bottom: 8px;">
        LOGGED SPECIFICATION BRIEF
      </div>
      <p style="margin: 4px 0; font-size: 13px;"><strong style="color: #FFFFFF;">Target Scope:</strong> <span style="color: #2DD4BF;">${safeScope}</span></p>
      ${
        entry.budget
          ? `<p style="margin: 4px 0; font-size: 13px;"><strong style="color: #FFFFFF;">Indicative Bracket:</strong> ${escapeHtml(entry.budget)}</p>`
          : ""
      }
      <pre style="margin: 12px 0 0 0; padding: 12px; background-color: #07090E; border: 1px solid #1E293B; border-radius: 8px; font-family: monospace; font-size: 12px; color: #CBD5E1; white-space: pre-wrap; word-wrap: break-word;">${safeMessage}</pre>
    </div>

    <h3 style="font-size: 14px; color: #FFFFFF; text-transform: uppercase; font-family: monospace; letter-spacing: 0.5px; margin-top: 24px;">
      What Happens Next (4–12 Business Hours):
    </h3>
    <ol style="padding-left: 20px; color: #CBD5E1; font-size: 13px;">
      <li style="margin-bottom: 6px;"><strong style="color: #FFFFFF;">Architectural Review:</strong> We map your workflow against our single-tenant Next.js 16 / SvelteKit / PostgreSQL / PocketBase blueprints.</li>
      <li style="margin-bottom: 6px;"><strong style="color: #FFFFFF;">Fixed-Milestone Scope:</strong> We confirm your exact 10–14 day sprint deliverables (50/50 milestone billing · €0 per-seat fees · 100% IP handover).</li>
      <li style="margin-bottom: 6px;"><strong style="color: #FFFFFF;">Direct Engineering Call:</strong> We reply to this email with times for a focused 15-minute technical walkthrough.</li>
    </ol>

    <p style="font-size: 13px; color: #94A3B8; margin-top: 20px;">
      <em>Tip: Have a sanitized spreadsheet sample, delivery ticket photo, or schema requirement? Reply directly to this email and it will attach to your intake file.</em>
    </p>
  </div>

  <div style="padding: 16px 28px; background-color: #07090E; border-top: 1px solid #1E293B; font-family: monospace; font-size: 11px; color: #64748B;">
    DukaTrio Engineering Studio · Single-Tenant EU Cloud Infrastructure · <a href="https://dukatrio.com" style="color: #2DD4BF; text-decoration: none;">dukatrio.com</a>
  </div>
</div>`;

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM || '"DukaTrio Engineering Desk" <petar@dukatrio.com>',
      to: entry.email,
      replyTo: "petar@dukatrio.com",
      subject,
      text: textBody,
      html: htmlBody,
    });
  } catch (err) {
    console.warn("[AUTO-REPLY WARN] Non-fatal error sending prospect confirmation:", err);
  }
}
