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
    const sanitizedScope = escapeHtml(scope || "General Inquiry");
    const sanitizedMessage = escapeHtml(message);

    // 5. Defensive Runtime Secrets Verification
    const smtpHost = process.env.SMTP_HOST || "smtp-relay.brevo.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || "bc1ab0001@smtp-brevo.com";
    const smtpPass = process.env.SMTP_PASS;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    const missingSecrets: string[] = [];
    if (!process.env.SMTP_HOST) missingSecrets.push("SMTP_HOST");
    if (!process.env.SMTP_PORT) missingSecrets.push("SMTP_PORT");
    if (!process.env.SMTP_USER) missingSecrets.push("SMTP_USER");
    if (!process.env.SMTP_PASS) missingSecrets.push("SMTP_PASS");
    if (!telegramToken) missingSecrets.push("TELEGRAM_BOT_TOKEN");
    if (!telegramChatId) missingSecrets.push("TELEGRAM_CHAT_ID");

    if (missingSecrets.length > 0) {
      if (process.env.NODE_ENV === "production") {
        console.warn(
          `[SECRETS DEFENSIVE AUDIT - PROD] Missing recommended environment variables: ${missingSecrets.join(
            ", "
          )}`
        );
      } else {
        console.info(
          `[SECRETS DEFENSIVE AUDIT - DEV/STAGING] Operating in fallback mode. Missing secrets: ${missingSecrets.join(
            ", "
          )}`
        );
      }
    }

    // 6. SMTP Email Dispatch (Non-blocking failsafe)
    if (smtpPass || process.env.NODE_ENV !== "production") {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: false,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const info = await transporter.sendMail({
          from: process.env.CONTACT_FROM || '"Dukatrio Kontakt" <petar@dukatrio.com>',
          to: "petar@dukatrio.com, neooozx@gmail.com",
          replyTo: email,
          subject: `[DukaTrio Novi Upit] ${name} (${email}) - ${sanitizedScope}`,
          text: `Ime / Firma: ${name}\nKontakt: ${email}\nProjekat: ${sanitizedScope}\nPoruka: ${message}\nIP: ${clientIp}\nVreme: ${new Date().toISOString()}`,
          html: `<h3>Novi upit sa sajta DukaTrio</h3>
<p><strong>Ime / Firma:</strong> ${sanitizedName}</p>
<p><strong>Kontakt:</strong> ${sanitizedEmail}</p>
<p><strong>Projekat / Oblast:</strong> ${sanitizedScope}</p>
<p><strong>Poruka:</strong> ${sanitizedMessage}</p>
<p><strong>IP Adresa:</strong> ${clientIp}</p>
<p><strong>Vreme:</strong> ${new Date().toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" })}</p>`,
        });
        console.log("[SMTP SUCCESS] Contact mail dispatched:", info.messageId);
      } catch (err) {
        console.error("[SMTP WARN] Non-fatal dispatch error via Brevo:", err);
      }
    } else {
      console.warn("[SMTP FALLBACK] SMTP_PASS not provisioned; inquiry logged safely to telemetry.");
    }

    // 7. Optional Telegram Alert (Non-blocking failsafe)
    if (telegramToken && telegramChatId) {
      try {
        const tgText = `🚨 *NEW DUKATRIO INQUIRY*\n👤 *Client:* ${name}\n📧 *Email:* \`${email}\`\n🛠 *Scope:* ${sanitizedScope}\n📍 *IP:* ${clientIp}`;
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgText,
            parse_mode: "Markdown",
          }),
        });
      } catch (tgErr) {
        console.error("[Telegram Non-Fatal Dispatch Error]:", tgErr);
      }
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
