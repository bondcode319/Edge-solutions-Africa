import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { HeroField } from "@/components/ui/SectionArt";

/** Standard hero for every inner page: breadcrumbs, eyebrow, H1, intro, slot. */
export async function PageHero({
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
    <section className="on-dark relative overflow-hidden bg-brand-900 text-white">
      <HeroField id="hero-field-dark" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_10%_0%,rgba(0,90,255,0.28),transparent_60%)]"
      />
      <Container className="relative py-12 md:py-20">
        <Breadcrumbs items={crumbs} tone="dark" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}
            <h1 className="mt-4 font-display text-4xl font-light leading-[1.06] tracking-[-0.03em] text-balance-heading sm:text-5xl">
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
