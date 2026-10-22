import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "dukatrio_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// IP-based brute-force defense in-memory store
interface RateLimitRecord {
  attempts: number;
  blockedUntil: number;
}

const rateLimits = new Map<string, RateLimitRecord>();

/**
 * Master passkey resolution with support for ADMIN_KEY, STUDIO_ADMIN_SECRET, ADMIN_PASSWORD
 */
export function getMasterPasskey(): string {
  return (
    process.env.ADMIN_KEY ||
    process.env.STUDIO_ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "DukaTrio-Ultra-7x9qB2m!"
  );
}

export function getExpectedUsername(): string {
  return process.env.ADMIN_USERNAME || "petar";
}

export function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_KEY ||
    process.env.STUDIO_ADMIN_SECRET ||
    "66168fd11507515feeb11b4ef59b6ed05eca5fee276e000c45120033cd9ae5a0"
  );
}

/**
 * Constant-time comparison using SHA-256 digest + timingSafeEqual
 * Hashes inputs first so length difference cannot leak timing or crash timingSafeEqual.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(String(a)).digest();
  const hashB = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Check if the provided IP is currently blocked due to repeated failed attempts
 */
export function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);
  if (!record) return false;

  if (record.blockedUntil > now) {
    return true;
  }

  // Lock has expired; clear record
  if (record.blockedUntil <= now && record.attempts >= 5) {
    rateLimits.delete(ip);
    return false;
  }

  return false;
}

/**
 * Records a failed attempt for an IP. Max 5 attempts per 15 minutes.
 */
export function recordFailedAttempt(ip: string): { remainingAttempts: number; isBlocked: boolean } {
  const now = Date.now();
  const record = rateLimits.get(ip) || { attempts: 0, blockedUntil: 0 };
  record.attempts += 1;

  if (record.attempts >= 5) {
    record.blockedUntil = now + 15 * 60 * 1000; // 15-minute lockout
    rateLimits.set(ip, record);
    return { remainingAttempts: 0, isBlocked: true };
  }

  rateLimits.set(ip, record);
  return { remainingAttempts: 5 - record.attempts, isBlocked: false };
}

/**
 * Resets failed attempts after a successful login
 */
export function resetFailedAttempts(ip: string): void {
  rateLimits.delete(ip);
}

/**
 * Timing-safe passkey and credential verification
 */
export function verifyMasterPasskey(providedPasskey: string, providedUser?: string): boolean {
  if (!providedPasskey) return false;

  const masterPass = getMasterPasskey();
  const passMatches = timingSafeCompare(providedPasskey.trim(), masterPass.trim());

  if (providedUser && providedUser.trim().length > 0) {
    const expectedUser = getExpectedUsername();
    const userMatches = timingSafeCompare(
      providedUser.trim().toLowerCase(),
      expectedUser.toLowerCase()
    );
    return passMatches && userMatches;
  }

  return passMatches;
}

/**
 * Backward-compatible helper for username + password checks
 */
export function verifyAdminCredentials(user: string, pass: string): boolean {
  return verifyMasterPasskey(pass, user);
}

/**
 * Generates an encrypted/signed HMAC session token
 */
export function createSessionToken(username: string = "petar"): string {
  const expiresAt = Date.now() + ADMIN_COOKIE_MAX_AGE * 1000;
  const payload = JSON.stringify({ user: username, exp: expiresAt });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies the HMAC session token signature and expiry
 */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");

  if (!timingSafeCompare(signature, expectedSignature)) {
    return false;
  }

  try {
    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload = JSON.parse(payloadJson);
    if (!payload.exp || Date.now() > payload.exp) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Server-side check using incoming cookie store
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  return verifySessionToken(sessionCookie?.value);
}
