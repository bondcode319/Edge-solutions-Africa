import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Callout } from "@/components/ui/Callout";
import { Reveal } from "@/components/ui/Reveal";
import { aboutIntro, longTermDirection, whatWeAreBuilding, whyEMobility } from "@/content/about";
import { valueGap } from "@/content/home";
import { platformLayers } from "@/content/platform";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Edge Solutions Africa builds environmental economic infrastructure: the vision, the mission, the five-layer model, and why we begin with e-mobility.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={aboutIntro.headline}
        intro={aboutIntro.body[0]!}
        crumbs={[{ name: "About", href: "/about" }]}
      />

      <Section tone="light" ariaLabelledBy="intro-heading">
        <Container>
          <SectionHeading
            id="intro-heading"
            eyebrow="The company"
            title="What we are, and what we are not."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {aboutIntro.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <Callout className="mt-10 max-w-3xl">
            This page does not include founder biographies, incorporation details, team size,
            funding announcements or company history. None of that information has been confirmed
            for publication, and we would rather leave a section out than invent one.
          </Callout>
        </Container>
      </Section>

      <Section tone="white" id="value-gap" ariaLabelledBy="about-gap-heading">
        <Container>
          <SectionHeading
            id="about-gap-heading"
            eyebrow={valueGap.eyebrow}
            title={valueGap.headline}
            intro={valueGap.intro}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueGap.problems.map((problem) => (
              <li
                key={problem.title}
                className="rounded-card border border-line bg-surface-alt p-5"
              >
                <h3 className="text-sm font-semibold text-ink">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-soft">{problem.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="forest" ariaLabelledBy="vision-heading">
        <Container>
          <SectionHeading
            id="vision-heading"
            eyebrow="Vision and mission"
            title="Where this is going."
            tone="dark"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-panel border border-white/10 bg-surface/[0.05] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Vision</p>
              <p className="mt-4 text-lg leading-relaxed text-white/85">{siteConfig.vision}</p>
            </div>
            <div className="rounded-panel border border-white/10 bg-surface/[0.05] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Mission</p>
              <p className="mt-4 text-lg leading-relaxed text-white/85">{siteConfig.mission}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light" ariaLabelledBy="building-heading">
        <Container>
          <SectionHeading
            id="building-heading"
            eyebrow="What we are building"
            title={whatWeAreBuilding.headline}
            intro={whatWeAreBuilding.body}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeAreBuilding.items.map((item, index) => (
              <Reveal key={item.title} as="li" delay={index * 50} className="h-full">
                <Card className="h-full">
                  <span className="inline-flex size-9 items-center justify-center rounded-xs bg-brand-50 text-xs font-semibold text-brand">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold tracking-[-0.01em]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-soft">{item.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" ariaLabelledBy="why-emobility-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              id="why-emobility-heading"
              eyebrow="Starting point"
              title={whyEMobility.headline}
            />
            <div className="space-y-4">
              {whyEMobility.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light" ariaLabelledBy="layers-heading">
        <Container>
          <SectionHeading
            id="layers-heading"
            eyebrow="Our model"
            title="The five-layer infrastructure model."
            intro="Each layer depends on the one beneath it. Build the economic layer first and there is nothing underneath it to make it credible."
          />
          <ol className="mt-12 space-y-3">
            {platformLayers.map((layer, index) => (
              <Reveal key={layer.id} as="li" delay={index * 50}>
                <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 sm:flex-row sm:items-start sm:gap-6">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xs bg-brand-900 text-sm font-semibold text-white">
                    {layer.index}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                      {layer.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-soft">{layer.purpose}</p>
                  </div>
                  <Icon
                    name="ArrowRight"
                    className="hidden size-5 shrink-0 self-center text-white/30 sm:block"
                  />
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <TrustSection id="principles" />

      <Section tone="white" ariaLabelledBy="direction-heading">
        <Container width="prose">
          <SectionHeading
            id="direction-heading"
            eyebrow="Long-term direction"
            title={longTermDirection.headline}
          />
          <div className="mt-8 space-y-5">
            {longTermDirection.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
