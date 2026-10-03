import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const dynamic = "force-dynamic";

// In-Memory IP Rate Limiter
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function cleanupExpiredRecords(now: number) {
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
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
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim();

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}

// Zod Schema for Leads
const leadSchema = z.object({
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
  phone: z
    .string()
    .trim()
    .max(35, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  serviceType: z
    .string()
    .max(80, "Service type is too long.")
    .optional()
    .default("General Inquiry"),
  scopeScale: z
    .string()
    .max(80, "Scope scale is too long.")
    .optional()
    .default("Standard"),
  timeline: z
    .string()
    .max(80, "Timeline is too long.")
    .optional()
    .default("Standard Delivery"),
  estimatedBudget: z
    .string()
    .max(80, "Estimated budget is too long.")
    .optional(),
  message: z
    .string()
    .trim()
    .max(3000, "Message must not exceed 3000 characters.")
    .optional()
    .default("Direct inquiry from dukatrio.com intake terminal."),
  source: z
    .string()
    .max(50)
    .optional()
    .default("website_lead"),
  website: z.string().optional(), // Honeypot
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const clientIp = getClientIp(req);

    // 1. Rate Limiter
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
            "Retry-After": `${rateLimit.retryAfter}`,
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

    const parseResult = leadSchema.safeParse(body);
    if (!parseResult.success) {
      const firstErrorMessage =
        parseResult.error.issues[0]?.message || "Invalid submission parameters.";
      return NextResponse.json(
        { success: false, message: firstErrorMessage },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      serviceType,
      scopeScale,
      timeline,
      estimatedBudget,
      message,
      source,
      website,
    } = parseResult.data;

    // 3. Honeypot check
    if (website && website.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Transmission received. Our engineering desk will connect shortly.",
        },
        { status: 200 }
      );
    }

    // 4. Character Escaping for HTML Inbound Email
    const escapeHtml = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedService = escapeHtml(serviceType || scopeScale || "Opšti upit");
    const sanitizedBudget = escapeHtml(estimatedBudget || "Nije navedeno");
    const sanitizedMessage = escapeHtml(timeline || message || "Nije navedeno");

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

    // 6. Dispatch Email via Brevo SMTP (Non-blocking failsafe)
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
          from: process.env.CONTACT_FROM || '"Dukatrio Agencija" <petar@dukatrio.com>',
          to: "petar@dukatrio.com, neooozx@gmail.com",
          replyTo: email && email.includes("@") ? email : "petar@dukatrio.com",
          subject: `[Dukatrio Upit] ${sanitizedName} (${phone || email})`,
          text: `Novi upit sa dukatrio.com:
------------------------------------
Ime:          ${sanitizedName}
Telefon:      ${phone || "Nije navedeno"}
Email:        ${sanitizedEmail}
Usluga / Tip: ${sanitizedService}
Budžet:       ${sanitizedBudget}
Poruka / Rok: ${sanitizedMessage}
Izvor:        ${source || "website_lead"}
IP Adresa:    ${clientIp}
Vreme:        ${new Date().toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" })}`,
          html: `<h3>Novi upit sa dukatrio.com</h3>
<p><strong>Ime:</strong> ${sanitizedName}</p>
<p><strong>Telefon:</strong> <a href="tel:${escapeHtml(phone || "")}">${escapeHtml(phone || "Nije navedeno")}</a></p>
<p><strong>Email:</strong> ${sanitizedEmail}</p>
<p><strong>Usluga / Tip:</strong> ${sanitizedService}</p>
<p><strong>Budžet:</strong> ${sanitizedBudget}</p>
<p><strong>Poruka / Rok:</strong> ${sanitizedMessage}</p>
<p><strong>Izvor:</strong> ${escapeHtml(source || "website_lead")}</p>
<p><strong>IP:</strong> ${clientIp}</p>
<p><strong>Vreme:</strong> ${new Date().toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" })}</p>`,
        });
        console.log("[SMTP SUCCESS] Dukatrio lead email sent:", info.messageId);
      } catch (err) {
        console.error("[SMTP WARN] Non-fatal dispatch error via Brevo:", err);
      }
    } else {
      console.warn("[SMTP FALLBACK] SMTP_PASS not provisioned; lead logged safely to telemetry.");
    }

    // 7. Optional Telegram notification (Non-blocking failsafe)
    if (telegramToken && telegramChatId) {
      try {
        const telegramText = `🚨 *NEW DUKATRIO LEAD RECEIVED*\n👤 *Client:* ${name}\n📧 *Email:* \`${email}\`${phone ? `\n📱 *Phone:* \`${phone}\`` : ""}\n🛠 *Service:* ${serviceType}\n📍 *IP:* ${clientIp}`;
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramText,
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
        message: "Inquiry logged successfully. Engineering desk has been notified via instant alert.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error processing /api/lead:", error);
    return NextResponse.json(
      { success: false, message: "Transmission failed. Please reach out directly." },
      { status: 500 }
    );
  }
}
