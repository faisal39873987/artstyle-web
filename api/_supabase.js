import { createHash } from "node:crypto";

export const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_SERVER_KEY =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
export const SUPABASE_PUBLIC_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function json(res, status, body, headers = {}) {
  Object.entries({
    "content-type": "application/json; charset=utf-8",
    ...headers,
  }).forEach(([key, value]) => res.setHeader(key, value));
  res.status(status).json(body);
}

export function getHeader(req, name) {
  const value = req.headers?.[name.toLowerCase()] ?? req.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

export function cleanString(value, max = 4000) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export function isEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getClientIp(req) {
  const forwarded = getHeader(req, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return getHeader(req, "x-real-ip") || req.socket?.remoteAddress || null;
}

export function hashValue(value) {
  if (!value) return null;
  const salt = process.env.SUGGESTION_HASH_SALT || SUPABASE_SERVER_KEY || "artstyle-local";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return req.body ? JSON.parse(req.body) : {};

  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export function hasSupabaseConfig({ requireServerKey = true } = {}) {
  return Boolean(SUPABASE_URL && (requireServerKey ? SUPABASE_SERVER_KEY : SUPABASE_SERVER_KEY || SUPABASE_PUBLIC_KEY));
}

export async function supabaseFetch(path, init = {}, { requireServerKey = true } = {}) {
  const key = requireServerKey ? SUPABASE_SERVER_KEY : SUPABASE_SERVER_KEY || SUPABASE_PUBLIC_KEY;
  if (!SUPABASE_URL || !key) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: key,
      ...init.headers,
    },
  });
}

export async function parseSupabaseError(response, fallback = "Supabase request failed.") {
  try {
    const error = await response.json();
    return error.message || error.details || fallback;
  } catch {
    try {
      return (await response.text()) || fallback;
    } catch {
      return fallback;
    }
  }
}
