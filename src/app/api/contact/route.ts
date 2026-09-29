import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const dynamic = "force-dynamic";

// In-Memory IP Rate Limiter Configuration
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function cleanupExpiredRecords(now: number) {
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();

  // Occasional garbage collection
  if (rateLimitMap.size > 1000) {
    cleanupExpiredRecords(now);
  }

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return { allowed: false, retryAfter };
  }

  record.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function getClientIp(req: NextRequest): string {
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}

// Strict Payload Validation Schema with Zod
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(60, "Name must not exceed 60 characters."),
  email: z
    .string()
    .trim()
    .email("A valid email address is required.")
    .max(100, "Email must not exceed 100 characters."),
  scope: z
    .string()
    .max(50, "Scope must not exceed 50 characters.")
    .optional()
    .default("General Inquiry"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must not exceed 2000 characters."),
  website: z.string().optional(),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const clientIp = getClientIp(req);

    // 1. In-Memory IP Rate Limiting (max 3 per 10 mins)
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded. Try again in a few minutes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "600",
          },
        }
      );
    }

    // 2. Parse & Validate Payload
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const firstErrorMessage =
        parseResult.error.issues[0]?.message || "Invalid submission parameters.";
      return NextResponse.json(
        { success: false, message: firstErrorMessage },
        { status: 400 }
      );
    }

    const { name, email, scope, message, website } = parseResult.data;

    // 3. Anti-Bot Honeypot: Silently accept if filled
    if (website && website.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Transmission received. Engineering desk will review within 12 business hours.",
        },
        { status: 200 }
      );
    }

    // 4. Character Escaping for HTML Inbound Email
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedScope = escapeHtml(scope);
    const sanitizedMessage = escapeHtml(message);

    const host = process.env["SMTP_HOST"];
    const port = Number(process.env["SMTP_PORT"]) || 587;
    const user = process.env["SMTP_USER"];
    const pass = process.env["SMTP_PASS"];
    const destinationEmail = "neooozx@gmail.com";

    const subject = `[DukaTrio Inquiry] ${scope} from ${name}`;
    const textContent = `
DukaTrio Systems Engineering — New Client Inquiry
-------------------------------------------------
Client Name:    ${name}
Client Email:   ${email}
Project Scope:  ${scope}
Client IP:      ${clientIp}
Submitted At:   ${new Date().toUTCString()}

Message:
${message}
-------------------------------------------------
Replying to this notification sends directly to ${email} (replyTo header configured).
`;

    const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #09090b; color: #f4f4f5; padding: 28px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
  <div style="border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 20px;">
    <span style="font-size: 11px; font-family: monospace; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700;">DukaTrio · Systems Engineering Hub</span>
    <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 22px; font-weight: 800;">New Project Transmission</h2>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa; width: 130px;">Client Name:</td>
      <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${sanitizedName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa;">Direct Email:</td>
      <td style="padding: 8px 0; color: #06b6d4; font-family: monospace; font-weight: 600;">${sanitizedEmail}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa;">Project Scope:</td>
      <td style="padding: 8px 0; color: #10b981; font-weight: 600;">${sanitizedScope}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa;">Client Source:</td>
      <td style="padding: 8px 0; color: #71717a; font-family: monospace; font-size: 12px;">IP: ${clientIp}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa;">Timestamp:</td>
      <td style="padding: 8px 0; color: #71717a; font-family: monospace; font-size: 12px;">${new Date().toUTCString()}</td>
    </tr>
  </table>

  <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
    <div style="font-size: 11px; font-family: monospace; color: #a1a1aa; margin-bottom: 10px; text-transform: uppercase; font-weight: 700;">Project Scope &amp; Architectural Outline:</div>
    <div style="font-size: 14px; line-height: 1.6; color: #f4f4f5; white-space: pre-wrap;">${sanitizedMessage}</div>
  </div>

  <p style="font-size: 12px; color: #71717a; border-top: 1px solid #27272a; padding-top: 14px; margin: 0; line-height: 1.5;">
    Direct client reply enabled: Hit <strong>Reply</strong> in your mail client to contact <strong>${sanitizedEmail}</strong>.
  </p>
</div>
`;

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"DukaTrio Transmission Desk" <${user}>`,
        to: destinationEmail,
        replyTo: email,
        subject,
        text: textContent,
        html: htmlContent,
      });
    } else {
      console.log("ℹ [DukaTrio Contact Intake] SMTP not configured. Logged transmission payload:");
      console.log({
        clientIp,
        name,
        email,
        scope,
        messageLength: message.length,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Transmission received. Engineering desk will review within 12 business hours.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error processing /api/contact:", error);
    return NextResponse.json(
      { success: false, message: "Transmission failed. Please try again or reach out directly." },
      { status: 500 }
    );
  }
}
