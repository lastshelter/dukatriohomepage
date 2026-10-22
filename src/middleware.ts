import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "dukatrio_admin_session";

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_KEY ||
    process.env.STUDIO_ADMIN_SECRET ||
    "66168fd11507515feeb11b4ef59b6ed05eca5fee276e000c45120033cd9ae5a0"
  );
}

/**
 * Edge-compatible cryptographic token verification using Web Crypto (SubtleCrypto)
 */
async function verifyEdgeSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(getSessionSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Convert base64url signature to Uint8Array
    const base64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (base64.length % 4)) % 4;
    const padded = base64 + "=".repeat(padLen);
    const binary = atob(padded);
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    const data = enc.encode(encodedPayload);
    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, data);
    if (!isValid) return false;

    // Verify expiry
    const payloadJson = atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);
    if (!payload.exp || Date.now() > payload.exp) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude login page and auth API endpoint
  const isLoginPage = pathname === "/admin/login";
  const isAuthApi = pathname.startsWith("/api/admin/auth");

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyEdgeSessionToken(token);

  // If already authenticated and visiting /admin/login, bounce to /admin/outbound
  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/outbound", request.url), 307);
    }
    return NextResponse.next();
  }

  // Allow auth API endpoint (login, check, logout)
  if (isAuthApi) {
    return NextResponse.next();
  }

  // All other /admin/* and /api/admin/* paths require authenticated session
  if (!isAuthenticated) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Sovereign admin session required." },
        { status: 401 }
      );
    }

    // 307 Redirect to /admin/login with redirect target
    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(loginUrl, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
