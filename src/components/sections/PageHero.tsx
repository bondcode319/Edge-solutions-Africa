import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

/** Standard hero for every inner page: breadcrumbs, eyebrow, H1, intro, slot. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_10%_0%,rgba(21,150,107,0.20),transparent_60%)]"
      />
      <Container className="relative py-12 md:py-20">
        <Breadcrumbs items={crumbs} tone="dark" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-4 text-balance-heading text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</p>
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
