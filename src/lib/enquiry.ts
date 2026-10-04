import { z } from "zod";

/**
 * Shared enquiry schema.
 *
 * Used by the client form and by the API route, so client-side and server-side
 * validation cannot drift apart. The server never trusts the client result —
 * it re-parses the payload.
 */

export const organisationTypes = [
  "E-mobility operator",
  "Environmental project developer",
  "Renewable energy business",
  "Waste and recycling operator",
  "Corporate sponsor",
  "Merchant",
  "Funder or financial institution",
  "Verification body",
  "Technology provider",
  "Research organisation",
  "Public sector or institution",
  "Other",
] as const;

export const areasOfInterest = [
  "Environmental MRV",
  "E-mobility",
  "Environmental data",
  "Green rewards",
  "Project funding",
  "Payments and commerce",
  "Technology integration",
  "Corporate sponsorship",
  "Research or institutional collaboration",
  "Other",
] as const;

export type AreaOfInterest = (typeof areasOfInterest)[number];

/** Free email domains are rejected because the form asks for a work address. */
const freeEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
];

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email address.")
    .max(200, "Email address must be 200 characters or fewer.")
    .pipe(z.email("Enter a valid email address."))
    .refine(
      (value) => !freeEmailDomains.includes(value.split("@")[1]?.toLowerCase() ?? ""),
      "Please use your work email address.",
    ),
  organisation: z
    .string()
    .trim()
    .min(2, "Enter your organisation.")
    .max(160, "Organisation must be 160 characters or fewer."),
  jobTitle: z
    .string()
    .trim()
    .max(120, "Job title must be 120 characters or fewer.")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .trim()
    .min(2, "Enter your country.")
    .max(80, "Country must be 80 characters or fewer."),
  organisationType: z.enum(organisationTypes, {
    message: "Select an organisation type.",
  }),
  areaOfInterest: z.enum(areasOfInterest, {
    message: "Select an area of interest.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters.")
    .max(4000, "Message must be 4000 characters or fewer."),
  consent: z.literal(true, {
    message: "Please confirm you are happy for us to respond to your enquiry.",
  }),
  /**
   * Honeypot. Hidden from users and from assistive technology, so a real
   * visitor always submits it empty. The schema accepts any value: rejecting it
   * here would tell a bot which field gave it away, and would turn the server's
   * silent-accept path into dead code. The API route inspects it instead.
   */
  website: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export type EnquiryResponse =
  | { ok: true; delivery: "email" | "logged"; message: string }
  | { ok: false; message: string; fieldErrors?: EnquiryFieldErrors };

/** Flatten a Zod error into one message per field, for rendering next to inputs. */
export function toFieldErrors(error: z.ZodError<EnquiryInput>): EnquiryFieldErrors {
  const fieldErrors: EnquiryFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}
