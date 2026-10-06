import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroField } from "@/components/ui/SectionArt";
import { primaryCta, secondaryCta, siteConfig } from "@/config/site";
import { HeroVisual } from "./HeroVisual";

/**
 * Homepage hero.
 *
 * No customer counts, partner logos, emissions figures or platform usage
 * statistics appear here — none has been verified, and an unverifiable number
 * in a hero is the fastest way to lose a technical reader.
 */
export async function HeroSection() {
  return (
    <section className="on-dark relative overflow-hidden bg-brand-900 text-white">
      {/* Ambient field: the generated texture, then a hairline grid and a soft
          brand glow beneath it. Each layer is independent, so the hero looks
          complete whether or not the image has been generated yet. */}
      <HeroField id="hero-field-dark" />
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_20%_0%,rgba(0,90,255,0.35),transparent_65%)]"
      />

      <Container className="relative py-20 md:py-28 lg:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="eyebrow text-accent">{siteConfig.brandPhrase}</p>

            <h1 className="mt-7 font-display text-4xl font-light leading-[1.04] tracking-[-0.035em] text-balance-heading sm:text-5xl lg:text-[4rem]">
              Turning Verified Environmental Activity Into Economic Utility.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              {siteConfig.name} is building digital infrastructure that connects real-world
              environmental activity with trusted data, verification, rewards, project funding, and
              commerce.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={secondaryCta.href} variant="onDark" size="lg" withArrow>
                {secondaryCta.label}
              </ButtonLink>
              <ButtonLink href={primaryCta.href} variant="onDarkGhost" size="lg">
                {primaryCta.label}
              </ButtonLink>
            </div>

            <p className="mt-10 max-w-md border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-white/55">
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
