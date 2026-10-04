/**
 * Development status vocabulary.
 *
 * A status is only assigned where company-approved information supports it.
 * Anything else stays "to-be-confirmed", which renders as "Status to be
 * confirmed" rather than implying progress that has not been verified.
 */

export const developmentStatuses = [
  "concept",
  "in-development",
  "pilot-preparation",
  "pilot",
  "available",
  "to-be-confirmed",
] as const;

export type DevelopmentStatus = (typeof developmentStatuses)[number];

export const statusLabels: Record<DevelopmentStatus, string> = {
  concept: "Concept",
  "in-development": "In development",
  "pilot-preparation": "Pilot preparation",
  pilot: "Pilot",
  available: "Available",
  "to-be-confirmed": "Status to be confirmed",
};

export const statusDescriptions: Record<DevelopmentStatus, string> = {
  concept: "Designed and documented. Not yet built.",
  "in-development": "Being built. Not yet available to external organisations.",
  "pilot-preparation": "Preparing for a controlled pilot with partner organisations.",
  pilot: "Running as a controlled pilot with a limited set of participants.",
  available: "Available to organisations working with us.",
  "to-be-confirmed": "Not yet confirmed by the company.",
};

/**
 * Focus labels for activity categories — distinct from build status, because a
 * category can be well understood without any platform module being built.
 */
export const focusLabels = {
  current: "Current focus",
  planned: "Planned expansion",
  exploratory: "Exploratory",
} as const;

export type FocusLevel = keyof typeof focusLabels;
