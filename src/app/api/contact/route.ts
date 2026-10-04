import { NextResponse } from "next/server";
import { enquirySchema, toFieldErrors, type EnquiryResponse } from "@/lib/enquiry";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * Enquiry endpoint.
 *
 * Delivery is honest by design:
 *  - If RESEND_API_KEY and ENQUIRY_TO_EMAIL are configured, the enquiry is sent
 *    and only a confirmed 2xx from the provider produces a success response.
 *  - If they are not configured, the enquiry is logged server-side and the
 *    response says so. The UI then tells the visitor plainly that no delivery
 *    service is configured, rather than claiming the message was sent.
 *
 * Secrets are read from server-only environment variables and never reach the
 * client bundle. See .env.example and docs/DEPLOYMENT.md.
 */

export const runtime = "nodejs";
/** Never cache an endpoint that accepts submissions. */
export const dynamic = "force-dynamic";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientKey(request.headers)}`, RATE_LIMIT);

  if (!limit.allowed) {
    return NextResponse.json<EnquiryResponse>(
      {
        ok: false,
        message: "Too many enquiries from this connection. Please try again shortly.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<EnquiryResponse>(
      { ok: false, message: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json<EnquiryResponse>(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const enquiry = parsed.data;

  // Honeypot: a filled hidden field means a bot. Accept quietly without
  // delivering, so the bot learns nothing from the response.
  if (enquiry.website) {
    return NextResponse.json<EnquiryResponse>(
      { ok: true, delivery: "logged", message: "Thank you — your enquiry has been received." },
      { status: 200 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.info("[enquiry:no-delivery-configured]", {
      organisation: enquiry.organisation,
      organisationType: enquiry.organisationType,
      areaOfInterest: enquiry.areaOfInterest,
      country: enquiry.country,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json<EnquiryResponse>(
      {
        ok: true,
        delivery: "logged",
        message:
          "Your enquiry was validated and recorded on the server, but no delivery service is configured on this deployment, so it has not been emailed to anyone yet.",
      },
      { status: 200 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: enquiry.email,
        subject: `Enquiry: ${enquiry.areaOfInterest} — ${enquiry.organisation}`,
        text: [
          `Name: ${enquiry.fullName}`,
          `Email: ${enquiry.email}`,
          `Organisation: ${enquiry.organisation}`,
          `Job title: ${enquiry.jobTitle || "Not provided"}`,
          `Country: ${enquiry.country}`,
          `Organisation type: ${enquiry.organisationType}`,
          `Area of interest: ${enquiry.areaOfInterest}`,
          "",
          "Message:",
          enquiry.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      // Log the provider's reason server-side; do not expose it to the client.
      console.error("[enquiry:delivery-failed]", response.status, await response.text());
      return NextResponse.json<EnquiryResponse>(
        {
          ok: false,
          message:
            "We could not deliver your enquiry just now. Please try again in a few minutes.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[enquiry:delivery-error]", error);
    return NextResponse.json<EnquiryResponse>(
      {
        ok: false,
        message: "We could not deliver your enquiry just now. Please try again in a few minutes.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json<EnquiryResponse>(
    {
      ok: true,
      delivery: "email",
      message: "Thank you — your enquiry has been sent and we will be in touch.",
    },
    { status: 200 },
  );
}

/** Anything other than POST is not supported. */
export function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
