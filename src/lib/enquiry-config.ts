import "server-only";

/**
 * Whether this deployment can actually deliver an enquiry.
 *
 * Server-only: these variables must never be bundled for the client. Pages read
 * this and pass the boolean result into the form, so the UI can tell visitors
 * the truth about what happens to their submission.
 */
export function isDeliveryConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL && process.env.ENQUIRY_FROM_EMAIL,
  );
}
