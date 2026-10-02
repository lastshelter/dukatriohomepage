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

    // 4. Dispatch Telegram Notification
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const telegramText = [
        "🚨 *NEW DUKATRIO LEAD RECEIVED*",
        "------------------------------------",
        `👤 *Client:* ${name}`,
        `📧 *Email:* \`${email}\``,
        phone ? `📱 *Phone:* \`${phone}\`` : null,
        `🛠 *Service:* ${serviceType}`,
        `📐 *Scope / Scale:* ${scopeScale}`,
        `⏱ *Timeline:* ${timeline}`,
        estimatedBudget ? `💰 *Est. Budget:* ${estimatedBudget}` : null,
        `📍 *Source:* ${source} (IP: ${clientIp})`,
        "------------------------------------",
        message ? `📝 *Notes:* \n${message}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${telegramToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramText,
              parse_mode: "Markdown",
            }),
          }
        );

        if (!tgRes.ok) {
          const errBody = await tgRes.text();
          console.warn("[Telegram Dispatch Warning] Failed to send lead:", errBody);
        }
      } catch (tgErr) {
        console.error("[Telegram Dispatch Error]:", tgErr);
      }
    } else {
      console.log(
        "ℹ [DukaTrio Lead Intake] Telegram webhook not configured. Lead recorded:",
        {
          name,
          email,
          phone,
          serviceType,
          scopeScale,
          timeline,
          estimatedBudget,
          clientIp,
          timestamp: new Date().toISOString(),
        }
      );
    }

    // 5. Dispatch Email to petar@dukatrio.com
    const host = process.env["SMTP_HOST"];
    const port = Number(process.env["SMTP_PORT"]) || 587;
    const user = process.env["SMTP_USER"];
    const pass = process.env["SMTP_PASS"];
    const destinationEmail = "petar@dukatrio.com";

    if (host && user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"DukaTrio Lead Intake" <${user}>`,
          to: destinationEmail,
          replyTo: email,
          subject: `[DukaTrio Lead] ${name} - ${serviceType}`,
          text: `
New Lead from dukatrio.com:
------------------------------------
Name:         ${name}
Email:        ${email}
Phone:        ${phone || "N/A"}
Service:      ${serviceType}
Scope:        ${scopeScale}
Timeline:     ${timeline}
Source:       ${source} (IP: ${clientIp})

Message:
${message || "N/A"}
`,
          html: `
<div style="font-family: sans-serif; background-color: #09090b; color: #f4f4f5; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
  <h2 style="color: #38bdf8; margin: 0 0 16px 0;">New Lead Received (dukatrio.com)</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
    <tr><td style="color: #a1a1aa; padding: 6px 0; width: 120px;">Name:</td><td style="color: #fff; font-weight: bold;">${name}</td></tr>
    <tr><td style="color: #a1a1aa; padding: 6px 0;">Email:</td><td><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
    <tr><td style="color: #a1a1aa; padding: 6px 0;">Phone:</td><td style="color: #fff;">${phone || "N/A"}</td></tr>
    <tr><td style="color: #a1a1aa; padding: 6px 0;">Service:</td><td style="color: #10b981;">${serviceType}</td></tr>
    <tr><td style="color: #a1a1aa; padding: 6px 0;">Source:</td><td style="color: #71717a;">${source} (IP: ${clientIp})</td></tr>
  </table>
  <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 14px; margin-top: 10px;">
    <div style="color: #a1a1aa; font-size: 11px; text-transform: uppercase; margin-bottom: 6px;">Message / Scope:</div>
    <div style="color: #fff; font-size: 14px; white-space: pre-wrap;">${message || "N/A"}</div>
  </div>
</div>
`,
        });
      } catch (mailErr) {
        console.error("[Email Dispatch Error in /api/lead]:", mailErr);
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
