import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page width wrapper. Gutters are defined once in globals.css. */
export function Container({
  children,
  className,
  width = "content",
}: {
  children: ReactNode;
  className?: string;
  width?: "content" | "prose";
}) {
  return (
    <div
      className={cn(
        "container-content",
        width === "prose" && "max-w-[var(--container-prose)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type SectionTone = "light" | "white" | "dark" | "forest";

const toneStyles: Record<SectionTone, string> = {
  light: "bg-offwhite text-navy",
  white: "bg-white text-navy",
  dark: "on-dark bg-navy text-white",
  forest: "on-dark bg-forest text-white",
};

/** Vertical rhythm and surface tone for a page section. */
export function Section({
  children,
  className,
  tone = "light",
  id,
  spacing = "default",
  as: Tag = "section",
  ariaLabelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
  spacing?: "default" | "tight" | "loose";
  as?: "section" | "div" | "article";
  ariaLabelledBy?: string;
}) {
  const spacingStyles = {
    tight: "py-14 md:py-16",
    default: "py-16 md:py-24",
    loose: "py-20 md:py-32",
  }[spacing];

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(toneStyles[tone], spacingStyles, className)}
    >
      {children}
    </Tag>
  );
}

/** Small uppercase label that introduces a section. */
export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-cyan" : "text-emerald-600",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Section heading block. `level` controls the heading element so pages keep a
 * correct outline rather than choosing tags for their size.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  level = 2,
  align = "left",
  tone = "light",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  level?: 1 | 2 | 3;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
}) {
  const Heading = `h${level}` as "h1" | "h2" | "h3";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "text-balance-heading font-semibold tracking-[-0.02em]",
          level === 1
            ? "text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
            : "text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <div
          className={cn(
            "max-w-[46rem] text-lg leading-relaxed",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-white/75" : "text-slate",
          )}
        >
          {intro}
        </div>
      ) : null}
      {children}
    </div>
  );
}
