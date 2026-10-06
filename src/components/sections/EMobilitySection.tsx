import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Callout } from "@/components/ui/Callout";
import { Reveal } from "@/components/ui/Reveal";
import { SectionArt } from "@/components/ui/SectionArt";
import { eMobilityStart } from "@/content/home";

export async function EMobilitySection() {
  return (
    <Section tone="forest" id="e-mobility" ariaLabelledBy="e-mobility-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="e-mobility-heading"
              eyebrow={eMobilityStart.eyebrow}
              title={eMobilityStart.headline}
              intro={eMobilityStart.body}
              tone="dark"
            />
            <ButtonLink
              href={eMobilityStart.cta.href}
              variant="onDark"
              className="mt-8"
              withArrow
            >
              {eMobilityStart.cta.label}
            </ButtonLink>

            {/* Renders nothing until the image is generated. */}
            <SectionArt
              id="home-e-mobility"
              className="mt-10 w-full max-w-md"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              The intended data journey
            </p>
            <ol className="mt-5 space-y-3">
              {eMobilityStart.journey.map((stage, index) => (
                <Reveal key={stage.label} as="li" delay={index * 70}>
                  <div className="flex items-start gap-4 rounded-card border border-white/10 bg-surface/[0.05] p-4">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xs bg-surface/10 text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{stage.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">{stage.body}</p>
                    </div>
                    {index < eMobilityStart.journey.length - 1 ? (
                      <Icon
                        name="ChevronDown"
                        className="ml-auto size-4 shrink-0 self-center text-white/25"
                      />
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </ol>

            <Callout tone="illustrative" className="mt-5 border-white/15 bg-surface/[0.05] text-white/70">
              <span className="text-white/70">{eMobilityStart.note}</span>
            </Callout>
          </div>
        </div>
      </Container>
    </Section>
  );
}
