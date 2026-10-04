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
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-[--duration-base] " +
  "ease-[--ease-out-soft] active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald text-white shadow-[0_8px_20px_-10px_rgba(21,150,107,0.8)] hover:bg-emerald-600",
  secondary:
    "border border-navy/15 bg-white text-navy hover:border-navy/30 hover:bg-softgrey/60",
  ghost: "text-navy hover:bg-navy/5",
  onDark: "bg-white text-navy hover:bg-offwhite",
  onDarkGhost:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-12 px-6 text-base",
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
