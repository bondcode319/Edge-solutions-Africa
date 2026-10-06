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
        "group relative flex h-full flex-col gap-3 rounded-card border p-6 transition-[box-shadow,border-color,transform] duration-[--duration-base] ease-[--ease-standard]",
        tone === "dark"
          ? "border-white/15 bg-surface/[0.04] text-white"
          : "border-line bg-surface text-ink shadow-[var(--shadow-card)]",
        interactive &&
          (tone === "dark"
            ? "hover:-translate-y-1 hover:border-accent/50"
            : "hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-card-hover)]"),
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
  tone = "brand",
  className,
}: {
  name: string;
  tone?: "brand" | "accent" | "dark";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand/10 text-brand",
    accent: "bg-accent/10 text-brand-700",
    dark: "bg-surface/10 text-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xs",
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
      {icon ? <CardIcon name={icon} tone={tone === "dark" ? "dark" : "brand"} /> : null}
      {badge}
      <h3 className="text-lg font-normal leading-snug tracking-[-0.01em]">
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>
      <p className={cn("text-sm leading-relaxed", tone === "dark" ? "text-white/70" : "text-muted-soft")}>
        {body}
      </p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium transition-transform duration-[--duration-base] ease-[--ease-standard] group-hover:translate-x-1",
            tone === "dark" ? "text-accent" : "text-brand",
          )}
          aria-hidden="true"
        >
          {linkLabel}
          <Icon name="ArrowRight" className="size-4" />
        </span>
        {footer}
      </div>
    </Card>
  );
}
