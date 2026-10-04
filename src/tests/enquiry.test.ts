import { describe, expect, it } from "vitest";
import { enquirySchema, toFieldErrors } from "@/lib/enquiry";

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
} as const;

describe("enquirySchema", () => {
  it("accepts a complete, valid enquiry", () => {
    const result = enquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("accepts an enquiry with no job title", () => {
    const result = enquirySchema.safeParse({ ...valid, jobTitle: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a free email provider, because the form asks for a work address", () => {
    const result = enquirySchema.safeParse({ ...valid, email: "someone@gmail.com" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(toFieldErrors(result.error).email).toBe("Please use your work email address.");
    }
  });

  it("rejects a malformed email", () => {
    const result = enquirySchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("requires consent to be explicitly true", () => {
    const result = enquirySchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(toFieldErrors(result.error).consent).toBeDefined();
    }
  });

  it("rejects a message that is too short to act on", () => {
    const result = enquirySchema.safeParse({ ...valid, message: "Hello" });
    expect(result.success).toBe(false);
  });

  it("rejects an organisation type outside the published list", () => {
    const result = enquirySchema.safeParse({ ...valid, organisationType: "Something else" });
    expect(result.success).toBe(false);
  });

  it("reports one error per field", () => {
    const result = enquirySchema.safeParse({
      ...valid,
      fullName: "",
      email: "",
      message: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      expect(Object.keys(errors).sort()).toEqual(["email", "fullName", "message"]);
    }
  });

  it("trims surrounding whitespace on text fields", () => {
    const result = enquirySchema.safeParse({ ...valid, fullName: "  Amina Otieno  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Amina Otieno");
    }
  });
});
