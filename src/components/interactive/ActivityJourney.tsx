"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Callout, IllustrativeTag } from "@/components/ui/Callout";
import { trackEvent } from "@/lib/analytics";

/**
 * Illustrative environmental activity journey.
 *
 * SIMULATED DATA. Every value below is invented for demonstration and is
 * labelled as such in the UI. It is not connected to a vehicle, an operator, a
 * customer or a registry, and no figure here should be read as a result. The
 * reference is deliberately fictional ("ILLUS-..."), and the emissions line is
 * phrased as a placeholder rather than a computed number.
 */

type Step = {
  id: string;
  label: string;
  icon: string;
  status: string;
  body: string;
  fields: { label: string; value: string }[];
};

const steps: Step[] = [
  {
    id: "activity",
    label: "Activity recorded",
    icon: "BusFront",
    status: "Recorded",
    body: "An electric bus completes a day of scheduled service. The operator's systems record the trips that ran and the distance covered.",
    fields: [
      { label: "Asset reference", value: "ILLUS-BUS-014 (simulated)" },
      { label: "Activity period", value: "One operating day (simulated)" },
      { label: "Trips recorded", value: "Simulated value" },
    ],
  },
  {
    id: "data",
    label: "Data collected",
    icon: "Antenna",
    status: "Collected",
    body: "Telemetry and charging data arrive from the connected systems. Validation runs on ingestion: are there gaps, duplicates or values outside a plausible range?",
    fields: [
      { label: "Telemetry records", value: "Simulated value" },
      { label: "Charging sessions", value: "Simulated value" },
      { label: "Ingestion checks", value: "Completeness, range, duplication" },
    ],
  },
  {
    id: "evidence",
    label: "Evidence reviewed",
    icon: "FileSearch",
    status: "Under review",
    body: "Supporting evidence is attached to the activity period and assessed against the configured methodology. Gaps are flagged rather than filled with assumptions.",
    fields: [
      { label: "Evidence items", value: "Simulated value" },
      { label: "Methodology", value: "Configured per engagement" },
      { label: "Open queries", value: "Simulated value" },
    ],
  },
  {
    id: "verification",
    label: "Verification status",
    icon: "ShieldCheck",
    status: "Decision recorded",
    body: "A reviewer records a decision. The decision, the reviewer, the timestamp and the methodology version are stored as an event on the audit trail.",
    fields: [
      { label: "Decision", value: "Simulated outcome" },
      { label: "Audit trail", value: "Actor, timestamp, reason recorded" },
      { label: "Methodology version", value: "Recorded with the decision" },
    ],
  },
  {
    id: "record",
    label: "Environmental record prepared",
    icon: "Layers",
    status: "Prepared",
    body: "A structured record connects the asset, the activity period, the evidence and the claim status — with provenance back to the source data.",
    fields: [
      { label: "Record reference", value: "ILLUS-REC-0091 (simulated)" },
      { label: "Environmental result", value: "Placeholder — no figure is claimed" },
      { label: "Claim status", value: "Platform record, not a carbon credit" },
    ],
  },
  {
    id: "connection",
    label: "Reward or reporting connection",
    icon: "Repeat",
    status: "Potential connection",
    body: "Where a funded reward programme or reporting requirement exists, the verified record can connect to it. This connection is a planned capability.",
    fields: [
      { label: "Reward connection", value: "Only where a funded pool exists" },
      { label: "Reporting output", value: "Generated from the record" },
      { label: "Availability", value: "Planned, not currently live" },
    ],
  },
];

export function ActivityJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex]!;

  const select = (index: number) => {
    setActiveIndex(index);
    trackEvent("journey_step_selected", { step: steps[index]!.id });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <IllustrativeTag />
        <p className="text-sm text-muted-soft">
          Illustrative electric bus activity record — simulated throughout.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        <ol className="flex flex-col gap-2">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-card border p-3.5 text-left transition-[border-color,background-color] duration-[--duration-base]",
                    isActive
                      ? "border-brand bg-surface shadow-[var(--shadow-card)]"
                      : "border-line bg-surface/60 hover:border-line hover:bg-surface",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-9 shrink-0 items-center justify-center rounded-xs",
                      isActive ? "bg-brand text-white" : "bg-surface-muted text-ink-soft",
                    )}
                  >
                    <Icon name={step.icon} className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.12em] text-muted-soft">
                      Step {index + 1}
                    </span>
                    <span className="block text-sm font-medium text-ink">{step.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="rounded-panel border border-line bg-surface p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{active.label}</h3>
            <span className="inline-flex items-center gap-1.5 rounded-xs border border-brand/30 bg-surface-alt px-2.5 py-1 text-xs font-medium text-brand">
              <Icon name="CircleDot" className="size-3.5" />
              {active.status} (simulated)
            </span>
          </div>

          <p className="mt-4 text-base leading-relaxed text-ink-soft">{active.body}</p>

          <dl className="mt-6 divide-y divide-line border-t border-line">
            {active.fields.map((field) => (
              <div key={field.label} className="flex flex-wrap justify-between gap-2 py-3">
                <dt className="text-sm text-muted-soft">{field.label}</dt>
                <dd className="text-sm font-medium text-ink">{field.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => select(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xs border border-ink/15 px-4 text-sm font-medium text-ink disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-xs text-muted-soft">
              Step {activeIndex + 1} of {steps.length}
            </span>
            <button
              type="button"
              onClick={() => select(Math.min(steps.length - 1, activeIndex + 1))}
              disabled={activeIndex === steps.length - 1}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xs border border-ink/15 px-4 text-sm font-medium text-ink disabled:opacity-40"
            >
              Next
              <Icon name="ArrowRight" className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <Callout tone="illustrative" className="mt-6">
        This demonstration is simulated. It is not connected to a real vehicle, a real operator, a
        customer, or any environmental registry, and the values shown are placeholders rather than
        measured or verified results.
      </Callout>
    </div>
  );
}
