import { beforeEach, describe, expect, it, vi } from "vitest";
import { clientKey, rateLimit, resetRateLimits } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    resetRateLimits();
    vi.useRealTimers();
  });

  it("allows requests up to the limit and blocks the next one", () => {
    const options = { limit: 3, windowMs: 60_000 };
    expect(rateLimit("a", options).allowed).toBe(true);
    expect(rateLimit("a", options).allowed).toBe(true);
    expect(rateLimit("a", options).allowed).toBe(true);

    const blocked = rateLimit("a", options);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("tracks keys independently", () => {
    const options = { limit: 1, windowMs: 60_000 };
    expect(rateLimit("a", options).allowed).toBe(true);
    expect(rateLimit("b", options).allowed).toBe(true);
    expect(rateLimit("a", options).allowed).toBe(false);
  });

  it("starts a fresh window once the previous one expires", () => {
    vi.useFakeTimers();
    const options = { limit: 1, windowMs: 1_000 };

    expect(rateLimit("a", options).allowed).toBe(true);
    expect(rateLimit("a", options).allowed).toBe(false);

    vi.advanceTimersByTime(1_500);
    expect(rateLimit("a", options).allowed).toBe(true);
  });
});

describe("clientKey", () => {
  it("uses the first address in x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 198.51.100.2" });
    expect(clientKey(headers)).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip", () => {
    expect(clientKey(new Headers({ "x-real-ip": "203.0.113.9" }))).toBe("203.0.113.9");
  });

  it("falls back to a shared bucket when the caller cannot be identified", () => {
    expect(clientKey(new Headers())).toBe("unknown");
  });
});
