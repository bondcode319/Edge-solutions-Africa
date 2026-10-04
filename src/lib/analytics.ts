"use client";

/**
 * Analytics integration point.
 *
 * No analytics provider is bundled or loaded. This module is the single place a
 * provider would be wired in, so events are already instrumented across the
 * site and only the transport needs adding. Until a provider is configured,
 * calls are no-ops (and log to the console in development).
 *
 * Never pass personal data into `properties` — see docs/ANALYTICS.md.
 */

export type AnalyticsEvent =
  | "cta_click"
  | "enquiry_submitted"
  | "solution_viewed"
  | "interest_selected"
  | "article_opened"
  | "architecture_layer_selected"
  | "journey_step_selected";

type Properties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    /** Set by a provider snippet if one is ever configured. */
    edgeAnalytics?: (event: string, properties?: Properties) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, properties: Properties = {}) {
  if (typeof window === "undefined") return;

  const sink = window.edgeAnalytics;
  if (typeof sink === "function") {
    sink(event, properties);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics:no-provider]", event, properties);
  }
}
