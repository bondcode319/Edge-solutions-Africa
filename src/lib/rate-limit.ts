/**
 * In-memory fixed-window rate limiter.
 *
 * Adequate for a single instance and for slowing down casual abuse of the
 * enquiry endpoint. It is NOT shared between instances: on a multi-instance or
 * serverless deployment, replace the store with a shared one (Redis, Upstash,
 * Vercel KV) before relying on it. Documented in docs/DEPLOYMENT.md.
 */

type Window = { count: number; resetAt: number };

const store = new Map<string, Window>();

/** Drop expired windows so the map cannot grow without bound. */
function sweep(now: number) {
  if (store.size < 500) return;
  for (const [key, window] of store) {
    if (window.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > limit) {
    return { allowed: false, remaining: 0, retryAfter };
  }

  return { allowed: true, remaining: limit - existing.count, retryAfter };
}

/**
 * Best-effort client identifier from proxy headers. Falls back to a shared
 * bucket, which is intentionally conservative: if we cannot identify the
 * caller, everyone shares one window rather than nobody being limited.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}

/** Test helper — clears all windows. */
export function resetRateLimits() {
  store.clear();
}
