import { NextRequest, NextResponse } from "next/server";
import {
  verifyMasterPasskey,
  createSessionToken,
  isIpRateLimited,
  recordFailedAttempt,
  resetFailedAttempts,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
  isAuthenticated,
} from "@/utils/adminAuth";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (isIpRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many failed attempts. Access locked for 15 minutes to protect sovereign systems.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const passkey = body.passkey || body.password || "";
    const username = body.username ? String(body.username).trim() : undefined;

    if (!passkey) {
      return NextResponse.json(
        { success: false, error: "Master studio passkey is required." },
        { status: 400 }
      );
    }

    const isValid = verifyMasterPasskey(passkey, username);

    if (!isValid) {
      const { remainingAttempts, isBlocked } = recordFailedAttempt(ip);
      const msg = isBlocked
        ? "Access locked for 15 minutes due to multiple failed attempts."
        : `Invalid passkey. ${remainingAttempts} attempts remaining before lockout.`;

      return NextResponse.json({ success: false, error: msg }, { status: 401 });
    }

    // Reset rate limiter on valid login
    resetFailedAttempts(ip);
    const token = createSessionToken(username || "petar");

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful. Access granted to Petar.",
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("[AUTH_API_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Authentication system failure." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session terminated.",
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
