import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * Callout used wherever the site needs to be explicit about a limit: what is
 * illustrative, what is not claimed, what still needs review. These appear
 * frequently by design.
 */
export function Callout({
  tone = "note",
  title,
  children,
  className,
  icon,
}: {
  tone?: "note" | "caution" | "illustrative";
  title?: string;
  children: ReactNode;
  className?: string;
  icon?: string;
}) {
  const tones = {
    note: { wrapper: "border-line bg-surface text-muted-soft", icon: "Info" },
    caution: {
      wrapper: "border-caution/30 bg-caution-soft text-muted-soft",
      icon: "AlertCircle",
    },
    illustrative: {
      wrapper: "border-brand/25 bg-surface-alt text-muted-soft",
      icon: "FlaskConical",
    },
  }[tone];

  return (
    <div
      className={cn(
        "flex gap-3 rounded-card border-l-2 border p-4 text-sm leading-relaxed",
        tone === "note"
          ? "border-l-line"
          : tone === "caution"
            ? "border-l-caution"
            : "border-l-brand",
        tones.wrapper,
        className,
      )}
    >
      <Icon name={icon ?? tones.icon} className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-1">
        {title ? <p className="font-medium text-ink">{title}</p> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}

/** Inline label for figures and states that are simulated rather than real. */
export function IllustrativeTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-xs border border-brand/30 bg-surface-alt px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-brand",
        className,
      )}
    >
      <Icon name="FlaskConical" className="size-3" />
      Illustrative
    </span>
  );
}
