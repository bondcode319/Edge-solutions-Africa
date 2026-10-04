import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/** Base surface used by every card on the site. */
export function Card({
  children,
  className,
  tone = "light",
  interactive = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  interactive?: boolean;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={cn(
        "relative flex h-full flex-col gap-3 rounded-card p-6 shadow-[var(--shadow-card)] transition-[box-shadow,border-color,transform] duration-[--duration-base] ease-[--ease-out-soft]",
        tone === "dark"
          ? "border border-white/10 bg-white/[0.04] text-white"
          : "border border-softgrey bg-white text-navy",
        interactive &&
          (tone === "dark"
            ? "hover:-translate-y-0.5 hover:border-white/25"
            : "hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-[var(--shadow-card-hover)]"),
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Icon treatment shared by feature, solution and audience cards. */
export function CardIcon({
  name,
  tone = "emerald",
  className,
}: {
  name: string;
  tone?: "emerald" | "cyan" | "dark";
  className?: string;
}) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-600",
    cyan: "bg-cyan-50 text-cyan-600",
    dark: "bg-white/10 text-cyan",
  };

  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl",
        tones[tone],
        className,
      )}
    >
      <Icon name={name} className="size-5" />
    </span>
  );
}

/**
 * Card whose whole surface is clickable. The link covers the card with an
 * overlay, so the accessible name comes from the title link rather than from a
 * duplicated "learn more" link.
 */
export function LinkCard({
  href,
  title,
  body,
  icon,
  footer,
  badge,
  tone = "light",
  className,
  linkLabel = "Learn more",
  as = "div",
}: {
  href: string;
  title: string;
  body: string;
  icon?: string;
  footer?: ReactNode;
  badge?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  linkLabel?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Card tone={tone} interactive className={cn("group", className)} as={as}>
      {icon ? <CardIcon name={icon} tone={tone === "dark" ? "dark" : "emerald"} /> : null}
      {badge}
      <h3 className="text-lg font-semibold tracking-[-0.01em]">
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>
      <p className={cn("text-sm leading-relaxed", tone === "dark" ? "text-white/70" : "text-slate")}>
        {body}
      </p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            tone === "dark" ? "text-cyan" : "text-emerald-600",
          )}
          aria-hidden="true"
        >
          {linkLabel}
          <Icon
            name="ArrowRight"
            className="size-4 transition-transform duration-[--duration-base] ease-[--ease-out-soft] group-hover:translate-x-1"
          />
        </span>
        {footer}
      </div>
    </Card>
  );
}
