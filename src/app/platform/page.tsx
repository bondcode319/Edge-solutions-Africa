import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PlatformArchitecture } from "@/components/interactive/PlatformArchitecture";
import { ActivityJourney } from "@/components/interactive/ActivityJourney";
import { blockchainPosition, platformComponents, platformLayers, technicalNotes } from "@/content/platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Platform",
  description:
    "The Edge Solutions Africa platform: a five-layer model connecting real-world environmental activity to data and verification, environmental value, economic utility and a connected environmental economy.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="One connected infrastructure, described layer by layer."
        intro="The platform is organised as five layers. Each one depends on the one beneath it, which is why we build them in order rather than starting with the economic layer."
        crumbs={[{ name: "Platform", href: "/platform" }]}
        aside={
          <ol className="space-y-2">
            {platformLayers.map((layer) => (
              <li key={layer.id}>
                <Link
                  href={`#architecture`}
                  className="flex items-center gap-3 rounded-card border border-white/10 bg-white/[0.05] p-3 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-cyan">
                    {layer.index}
                  </span>
                  {layer.shortName}
                </Link>
              </li>
            ))}
          </ol>
        }
      />

      <Section tone="light" id="architecture" ariaLabelledBy="architecture-heading">
        <Container>
          <SectionHeading
            id="architecture-heading"
            eyebrow="Architecture"
            title="Explore the five layers."
            intro="Select a layer to see what it does, what it handles and how it connects to the next one."
          />
          <div className="mt-10">
            <PlatformArchitecture />
          </div>
        </Container>
      </Section>

      <Section tone="white" id="components" ariaLabelledBy="components-heading">
        <Container>
          <SectionHeading
            id="components-heading"
            eyebrow="Infrastructure components"
            title="What the platform is made of."
            intro="Each component carries an honest development status. Nothing here is offered as a live service today."
          />

          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {platformComponents.map((component, index) => (
              <Reveal key={component.id} as="li" delay={index * 50} className="h-full">
                <Card className="h-full">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">{component.name}</h3>
                    <StatusBadge status={component.status} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate">{component.summary}</p>
                  <ul className="mt-2 space-y-2">
                    {component.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-slate-700">
                        <Icon name="Check" className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {component.href ? (
                    <Link
                      href={component.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-emerald-600 hover:underline"
                    >
                      Read more
                      <Icon name="ArrowRight" className="size-4" />
                    </Link>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" id="journey" ariaLabelledBy="journey-heading">
        <Container>
          <SectionHeading
            id="journey-heading"
            eyebrow="Illustrative example"
            title="How an activity becomes an environmental record."
            intro="A simulated walk-through of the intended journey, from an operating day through to a structured record."
          />
          <div className="mt-10">
            <ActivityJourney />
          </div>
        </Container>
      </Section>

      <Section tone="white" id="blockchain" ariaLabelledBy="blockchain-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <SectionHeading
              id="blockchain-heading"
              eyebrow="Supporting technology"
              title={blockchainPosition.title}
              intro={blockchainPosition.body}
            />
            <ul className="space-y-3 self-center">
              {blockchainPosition.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-card border border-softgrey bg-offwhite p-4 text-sm leading-relaxed text-slate-700"
                >
                  <Icon name="ShieldCheck" className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="light" id="technical" ariaLabelledBy="technical-heading">
        <Container>
          <SectionHeading
            id="technical-heading"
            eyebrow="For technology and institutional partners"
            title="Technical architecture notes."
            intro="Design intent rather than a description of deployed production systems. Integration specifications are agreed per partner."
          />

          <dl className="mt-10 grid gap-5 md:grid-cols-2">
            {technicalNotes.map((note) => (
              <div
                key={note.title}
                className="rounded-card border border-softgrey bg-white p-6"
              >
                <dt className="text-base font-semibold tracking-[-0.01em] text-navy">
                  {note.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate">{note.body}</dd>
              </div>
            ))}
          </dl>

          <Callout tone="caution" className="mt-8 max-w-3xl">
            The platform is not a registry and does not issue carbon credits. Records it holds are
            platform records, which may support documentation prepared for an external verification
            or registry process run by the relevant standard.
          </Callout>
        </Container>
      </Section>

      <CtaSection
        headline="Building something that needs to connect to this?"
        body="If you run environmental activity, verify it, fund it, or build the systems that produce its data, we would like to hear how you would want this infrastructure to work."
      />
    </>
  );
}
