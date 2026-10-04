import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { primaryCta, secondaryCta, siteConfig } from "@/config/site";
import { HeroVisual } from "./HeroVisual";

/**
 * Homepage hero.
 *
 * No customer counts, partner logos, emissions figures or platform usage
 * statistics appear here — none has been verified, and an unverifiable number
 * in a hero is the fastest way to lose a technical reader.
 */
export function HeroSection() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_0%,rgba(21,150,107,0.22),transparent_60%),radial-gradient(45%_45%_at_90%_10%,rgba(76,201,232,0.14),transparent_65%)]"
      />

      <Container className="relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
              {siteConfig.brandPhrase}
            </p>

            <h1 className="mt-6 text-balance-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]">
              Turning Verified Environmental Activity Into Economic Utility.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {siteConfig.name} is building digital infrastructure that connects real-world
              environmental activity with trusted data, verification, rewards, project funding, and
              commerce.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={secondaryCta.href} variant="onDark" size="lg" withArrow>
                {secondaryCta.label}
              </ButtonLink>
              <ButtonLink href={primaryCta.href} variant="onDarkGhost" size="lg">
                {primaryCta.label}
              </ButtonLink>
            </div>

            <p className="mt-9 max-w-md border-l-2 border-emerald/40 pl-4 text-sm leading-relaxed text-white/55">
              Beginning with e-mobility, and designed to extend to other measurable environmental
              activity.
            </p>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
