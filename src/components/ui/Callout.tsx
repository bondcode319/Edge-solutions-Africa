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
    note: { wrapper: "border-softgrey bg-white text-slate-700", icon: "Info" },
    caution: { wrapper: "border-amber/30 bg-amber-50 text-slate-700", icon: "AlertCircle" },
    illustrative: {
      wrapper: "border-cyan-600/25 bg-cyan-50 text-slate-700",
      icon: "FlaskConical",
    },
  }[tone];

  return (
    <div
      className={cn(
        "flex gap-3 rounded-card border p-4 text-sm leading-relaxed",
        tones.wrapper,
        className,
      )}
    >
      <Icon name={icon ?? tones.icon} className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-1">
        {title ? <p className="font-semibold text-navy">{title}</p> : null}
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
        "inline-flex items-center gap-1 rounded-pill border border-cyan-600/30 bg-cyan-50 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-cyan-600",
        className,
      )}
    >
      <Icon name="FlaskConical" className="size-3" />
      Illustrative
    </span>
  );
}
