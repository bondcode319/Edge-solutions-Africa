import { cn } from "@/lib/cn";
import {
  focusLabels,
  statusDescriptions,
  statusLabels,
  type DevelopmentStatus,
  type FocusLevel,
} from "@/content/status";
import { Icon } from "./Icon";

/**
 * Status is never communicated by colour alone: every badge carries a text
 * label and a distinct icon, and exposes the fuller meaning to screen readers.
 */

const statusStyles: Record<DevelopmentStatus, { className: string; icon: string }> = {
  concept: { className: "border-line bg-surface-muted text-muted-soft", icon: "CircleDot" },
  "in-development": {
    className: "border-brand/30 bg-surface-alt text-brand-700",
    icon: "Layers",
  },
  "pilot-preparation": {
    className: "border-caution/30 bg-caution-soft text-caution",
    icon: "ClipboardCheck",
  },
  pilot: {
    className: "border-caution/30 bg-caution-soft text-caution",
    icon: "FlaskConical",
  },
  available: {
    className: "border-positive/30 bg-positive/10 text-positive",
    icon: "CheckCircle2",
  },
  "to-be-confirmed": {
    className: "border-line bg-surface-muted text-muted-soft",
    icon: "Info",
  },
};

export function StatusBadge({
  status,
  className,
  showDescription = false,
}: {
  status: DevelopmentStatus;
  className?: string;
  showDescription?: boolean;
}) {
  const style = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-xs border px-2.5 py-1 text-xs font-medium",
        style.className,
        className,
      )}
    >
      <Icon name={style.icon} className="size-3.5" />
      <span>{statusLabels[status]}</span>
      <span className="sr-only">
        {". "}
        {statusDescriptions[status]}
      </span>
      {showDescription ? (
        <span className="sr-only" aria-hidden="true">
          {statusDescriptions[status]}
        </span>
      ) : null}
    </span>
  );
}

const focusStyles: Record<FocusLevel, { className: string; icon: string }> = {
  current: {
    className: "border-positive/30 bg-positive/10 text-positive",
    icon: "CheckCircle2",
  },
  planned: { className: "border-brand/30 bg-surface-alt text-brand-700", icon: "Layers" },
  exploratory: {
    className: "border-line bg-surface-muted text-muted-soft",
    icon: "Compass",
  },
};

export function FocusBadge({ focus, className }: { focus: FocusLevel; className?: string }) {
  const style = focusStyles[focus];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-xs border px-2.5 py-1 text-xs font-medium",
        style.className,
        className,
      )}
    >
      <Icon name={style.icon} className="size-3.5" />
      {focusLabels[focus]}
    </span>
  );
}
