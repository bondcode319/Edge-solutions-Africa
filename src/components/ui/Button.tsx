import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * Button system. Variants are defined once here; pages never restyle buttons
 * inline. Every variant meets a 44px minimum touch target at default size.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-medium tracking-[0.01em] " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-[--duration-base] " +
  "ease-[--ease-standard] active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  // Flat, saturated blocks. No gradient or glow — the colour does the work.
  primary: "bg-brand text-white hover:bg-brand-600",
  secondary:
    "border border-line bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:bg-surface-muted",
  onDark: "bg-surface text-brand-900 hover:bg-accent hover:text-brand-900",
  onDarkGhost:
    "border border-white/35 text-white hover:border-white hover:bg-surface hover:text-brand-900",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-13 px-7 text-base",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow, used for forward navigation. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: SharedProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {withArrow ? <Icon name="ArrowRight" className="size-4" /> : null}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  href,
  ...props
}: SharedProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {withArrow ? <Icon name="ArrowRight" className="size-4" /> : null}
    </Link>
  );
}

/** Convenience wrappers matching the named components in the brief. */
export function PrimaryButton(props: Omit<ComponentProps<typeof ButtonLink>, "variant">) {
  return <ButtonLink variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ComponentProps<typeof ButtonLink>, "variant">) {
  return <ButtonLink variant="secondary" {...props} />;
}
