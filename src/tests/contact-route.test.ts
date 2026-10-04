import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { resetRateLimits } from "@/lib/rate-limit";

const valid = {
  fullName: "Amina Otieno",
  email: "amina@transitoperator.co.ke",
  organisation: "Transit Operator Ltd",
  jobTitle: "Operations Director",
  country: "Kenya",
  organisationType: "E-mobility operator",
  areaOfInterest: "E-mobility",
  message: "We run 40 electric buses and want to understand our reporting options.",
  consent: true,
  website: "",
};

function post(body: unknown, ip = "203.0.113.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetRateLimits();
    delete process.env.RESEND_API_KEY;
    delete process.env.ENQUIRY_TO_EMAIL;
    delete process.env.ENQUIRY_FROM_EMAIL;
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects an invalid payload with field errors", async () => {
    const response = await POST(post({ ...valid, email: "nope" }));
    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.fieldErrors.email).toBeDefined();
  });

  it("rejects a body that is not JSON", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.2" },
      body: "{oops",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("reports honestly when no delivery service is configured", async () => {
    const response = await POST(post(valid, "203.0.113.3"));
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.delivery).toBe("logged");
    expect(body.message).toContain("no delivery service is configured");
  });

  it("accepts a honeypot submission quietly without delivering it", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.ENQUIRY_TO_EMAIL = "enquiries@example.com";
    process.env.ENQUIRY_FROM_EMAIL = "website@example.com";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const response = await POST(post({ ...valid, website: "spam" }, "203.0.113.4"));

    expect(response.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends the enquiry when delivery is configured", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.ENQUIRY_TO_EMAIL = "enquiries@example.com";
    process.env.ENQUIRY_FROM_EMAIL = "website@example.com";

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    const response = await POST(post(valid, "203.0.113.5"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.delivery).toBe("email");
    expect(fetchSpy).toHaveBeenCalledOnce();

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("https://api.resend.com/emails");
    expect(String((init as RequestInit).body)).toContain("amina@transitoperator.co.ke");
  });

  it("does not claim success when the delivery provider fails", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.ENQUIRY_TO_EMAIL = "enquiries@example.com";
    process.env.ENQUIRY_FROM_EMAIL = "website@example.com";

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("provider down", { status: 500 }),
    );

    const response = await POST(post(valid, "203.0.113.6"));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.ok).toBe(false);
  });

  it("rate limits repeated submissions from the same address", async () => {
    const ip = "203.0.113.20";
    for (let i = 0; i < 5; i += 1) {
      const response = await POST(post(valid, ip));
      expect(response.status).toBe(200);
    }

    const blocked = await POST(post(valid, ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });
});
