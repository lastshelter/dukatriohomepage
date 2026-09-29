import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { name, email, scope, message, website } = body;

    // Anti-spam honeypot verification
    // If the hidden 'website' input contains any value, silently accept to fool bots
    if (website && typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Transmission received. Engineering desk will review within 12 business hours.",
        },
        { status: 200 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Message is required." },
        { status: 400 }
      );
    }

    const host = process.env["SMTP_HOST"];
    const port = Number(process.env["SMTP_PORT"]) || 587;
    const user = process.env["SMTP_USER"];
    const pass = process.env["SMTP_PASS"];
    const destinationEmail = "neooozx@gmail.com";

    const subject = `[DukaTrio Inquiry] ${scope || "General"} from ${name.trim()}`;
    const textContent = `
DukaTrio Systems Engineering — New Client Inquiry
-------------------------------------------------
Client Name:    ${name.trim()}
Client Email:   ${email.trim()}
Project Scope:  ${scope || "Unspecified"}
Submitted At:   ${new Date().toUTCString()}

Message:
${message.trim()}
-------------------------------------------------
Replying to this notification sends directly to ${email.trim()} (replyTo header configured).
`;

    const sanitizedMessage = message
      .trim()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #09090b; color: #f4f4f5; padding: 28px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
  <div style="border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 20px;">
    <span style="font-size: 11px; font-family: monospace; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700;">DukaTrio · Systems Engineering Hub</span>
    <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 22px; font-weight: 800;">New Project Transmission</h2>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa; width: 130px;">Client Name:</td>
      <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${name.trim()}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa;">Direct Email:</td>
      <td style="padding: 8px 0; color: #06b6d4; font-family: monospace; font-weight: 600;">${email.trim()}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa;">Project Scope:</td>
      <td style="padding: 8px 0; color: #10b981; font-weight: 600;">${scope || "General Inquiry"}</td>
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
    Direct client reply enabled: Hit <strong>Reply</strong> in your mail client to contact <strong>${email.trim()}</strong>.
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
        replyTo: email.trim(),
        subject,
        text: textContent,
        html: htmlContent,
      });
    } else {
      // Clean fallback logging when SMTP environment variables are not yet populated on the host
      console.log("ℹ [DukaTrio Contact Intake] SMTP not configured. Logged transmission payload:");
      console.log({
        name: name.trim(),
        email: email.trim(),
        scope: scope || "General",
        messageLength: message.trim().length,
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
