"use client";

import { Suspense, useId, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  areasOfInterest,
  enquirySchema,
  organisationTypes,
  toFieldErrors,
  type EnquiryFieldErrors,
  type EnquiryResponse,
} from "@/lib/enquiry";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Callout } from "@/components/ui/Callout";
import { trackEvent } from "@/lib/analytics";

/**
 * Partnership enquiry form.
 *
 * Validation runs client-side for fast feedback and again on the server, which
 * is the authority. The success state is only shown after the API confirms the
 * enquiry was accepted, and it repeats what the server said about delivery — so
 * a deployment with no email service configured says exactly that.
 */

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm(props: { formId?: string; deliveryConfigured?: boolean }) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}

function FormSkeleton() {
  return (
    <div
      className="h-[42rem] rounded-panel border border-softgrey bg-white"
      aria-hidden="true"
    />
  );
}

function ContactFormInner({
  formId = "enquiry-form",
  deliveryConfigured = true,
}: {
  formId?: string;
  deliveryConfigured?: boolean;
}) {
  const searchParams = useSearchParams();
  const interestFromUrl = searchParams.get("interest");
  const initialInterest = areasOfInterest.find((area) => area === interestFromUrl) ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<EnquiryFieldErrors>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const candidate = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      organisation: String(formData.get("organisation") ?? ""),
      jobTitle: String(formData.get("jobTitle") ?? ""),
      country: String(formData.get("country") ?? ""),
      organisationType: String(formData.get("organisationType") ?? ""),
      areaOfInterest: String(formData.get("areaOfInterest") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    const parsed = enquirySchema.safeParse(candidate);
    if (!parsed.success) {
      const errors = toFieldErrors(parsed.error);
      setFieldErrors(errors);
      setStatus("error");
      setMessage("Please check the highlighted fields and try again.");
      statusRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setFieldErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as EnquiryResponse;

      if (!result.ok) {
        setStatus("error");
        setMessage(result.message);
        setFieldErrors(result.fieldErrors ?? {});
        statusRef.current?.focus();
        return;
      }

      setStatus("success");
      setMessage(result.message);
      trackEvent("enquiry_submitted", {
        interest: parsed.data.areaOfInterest,
        delivery: result.delivery,
      });
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
      statusRef.current?.focus();
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-panel border border-emerald/30 bg-emerald-50 p-8"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-emerald text-white">
          <Icon name="Check" className="size-6" />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-navy">
          Enquiry received
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700">{message}</p>
      </div>
    );
  }

  return (
    <div>
      {!deliveryConfigured ? (
        <Callout tone="caution" title="Development mode" className="mb-6">
          No email delivery service is configured on this deployment. Submissions are validated and
          recorded in the server log, but they are not emailed to anyone. Set{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs">RESEND_API_KEY</code>,{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs">ENQUIRY_TO_EMAIL</code> and{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs">ENQUIRY_FROM_EMAIL</code> to enable
          delivery.
        </Callout>
      ) : null}

      <div
        ref={statusRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={cn("mb-6", status !== "error" && "hidden")}
      >
        {status === "error" ? (
          <Callout tone="caution" icon="AlertCircle">
            {message}
          </Callout>
        ) : null}
      </div>

      <form
        id={formId}
        onSubmit={onSubmit}
        noValidate
        className="rounded-panel border border-softgrey bg-white p-6 md:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full name"
            name="fullName"
            id={fieldId("fullName")}
            errorId={errorId("fullName")}
            error={fieldErrors.fullName}
            autoComplete="name"
            required
          />
          <Field
            label="Work email"
            name="email"
            type="email"
            id={fieldId("email")}
            errorId={errorId("email")}
            error={fieldErrors.email}
            autoComplete="email"
            required
          />
          <Field
            label="Organisation"
            name="organisation"
            id={fieldId("organisation")}
            errorId={errorId("organisation")}
            error={fieldErrors.organisation}
            autoComplete="organization"
            required
          />
          <Field
            label="Job title"
            name="jobTitle"
            id={fieldId("jobTitle")}
            errorId={errorId("jobTitle")}
            error={fieldErrors.jobTitle}
            autoComplete="organization-title"
            optional
          />
          <Field
            label="Country"
            name="country"
            id={fieldId("country")}
            errorId={errorId("country")}
            error={fieldErrors.country}
            autoComplete="country-name"
            required
          />
          <SelectField
            label="Organisation type"
            name="organisationType"
            id={fieldId("organisationType")}
            errorId={errorId("organisationType")}
            error={fieldErrors.organisationType}
            options={organisationTypes}
            required
          />
          <SelectField
            label="Area of interest"
            name="areaOfInterest"
            id={fieldId("areaOfInterest")}
            errorId={errorId("areaOfInterest")}
            error={fieldErrors.areaOfInterest}
            options={areasOfInterest}
            defaultValue={initialInterest}
            onChange={(value) => trackEvent("interest_selected", { interest: value })}
            required
            className="sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <label
              htmlFor={fieldId("message")}
              className="block text-sm font-medium text-navy"
            >
              Message <span className="text-slate">*</span>
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              rows={6}
              required
              aria-invalid={fieldErrors.message ? true : undefined}
              aria-describedby={fieldErrors.message ? errorId("message") : undefined}
              placeholder="Tell us about your organisation, the activity you run, and what data you already collect."
              className={cn(
                "mt-2 w-full rounded-card border bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/60",
                fieldErrors.message ? "border-amber" : "border-softgrey",
              )}
            />
            <FieldError id={errorId("message")} error={fieldErrors.message} />
          </div>

          {/* Honeypot. Hidden from users and from assistive technology. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={fieldId("website")}>Website</label>
            <input
              id={fieldId("website")}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <input
                id={fieldId("consent")}
                name="consent"
                type="checkbox"
                required
                aria-invalid={fieldErrors.consent ? true : undefined}
                aria-describedby={fieldErrors.consent ? errorId("consent") : undefined}
                className="mt-1 size-5 shrink-0 rounded border-softgrey accent-emerald"
              />
              <label htmlFor={fieldId("consent")} className="text-sm leading-relaxed text-slate-700">
                I am happy for {`Edge Solutions Africa`} to use the details above to respond to this
                enquiry, as described in the{" "}
                <Link href="/privacy" className="font-medium text-emerald-600 underline">
                  privacy notice
                </Link>
                . <span className="text-slate">*</span>
              </label>
            </div>
            <FieldError id={errorId("consent")} error={fieldErrors.consent} />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-softgrey pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-slate">
            Please do not include confidential or personal information beyond what is needed for us
            to respond.
          </p>
          <Button type="submit" size="lg" disabled={status === "submitting"} className="shrink-0">
            {status === "submitting" ? (
              <>
                <Icon name="LoaderCircle" className="size-4 animate-spin" />
                Sending
              </>
            ) : (
              "Send enquiry"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  id,
  errorId,
  error,
  type = "text",
  required = false,
  optional = false,
  autoComplete,
}: {
  label: string;
  name: string;
  id: string;
  errorId: string;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}{" "}
        {required ? (
          <span className="text-slate">*</span>
        ) : optional ? (
          <span className="text-xs font-normal text-slate">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2 min-h-11 w-full rounded-card border bg-white px-4 text-sm text-navy placeholder:text-slate/60",
          error ? "border-amber" : "border-softgrey",
        )}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function SelectField({
  label,
  name,
  id,
  errorId,
  error,
  options,
  defaultValue = "",
  required = false,
  className,
  onChange,
}: {
  label: string;
  name: string;
  id: string;
  errorId: string;
  error?: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label} {required ? <span className="text-slate">*</span> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        onChange={(event) => onChange?.(event.currentTarget.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2 min-h-11 w-full rounded-card border bg-white px-4 text-sm text-navy",
          error ? "border-amber" : "border-softgrey",
        )}
      >
        <option value="" disabled>
          Please select
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-amber">
      <Icon name="AlertCircle" className="size-4 shrink-0" />
      {error}
    </p>
  );
}
