import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ExpansionSection } from "@/components/sections/ExpansionSection";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "Activity categories for environmental measurement: e-mobility, renewable energy, waste and recycling, clean cooking, and further categories as methodologies allow.",
  path: "/industries",
});

const requirements = [
  {
    icon: "BusFront",
    title: "A measurable activity",
    body: "Something physical that happens repeatedly and can be observed, counted or metered.",
  },
  {
    icon: "Antenna",
    title: "An available evidence source",
    body: "Data that exists or can be captured without imposing an unreasonable burden on the operator.",
  },
  {
    icon: "ClipboardCheck",
    title: "An appropriate methodology",
    body: "A basis for the calculation that is suitable for the claim being made, in the relevant jurisdiction.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Activity categories, and what each one requires."
        intro="We start where the data already exists and extend to categories where the evidence can be obtained. Each category below states plainly where it stands with us today."
        crumbs={[{ name: "Industries", href: "/industries" }]}
      />

      <Section tone="light" ariaLabelledBy="requirements-heading">
        <Container>
          <SectionHeading
            id="requirements-heading"
            eyebrow="How a category qualifies"
            title="Three things have to be true."
            intro="If any one of these is missing, the honest answer is that the category is not ready — not that we will measure it anyway."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {requirements.map((requirement) => (
              <li
                key={requirement.title}
                className="rounded-card border border-line bg-surface p-6"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xs bg-brand-50 text-brand">
                  <Icon name={requirement.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-ink">
                  {requirement.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-soft">{requirement.body}</p>
              </li>
            ))}
          </ul>

          <Callout className="mt-10 max-w-3xl">
            We make no claims about the environmental impact of any specific project. What a
            category can support depends on the operation, the data available and the methodology
            that applies to it.
          </Callout>
        </Container>
      </Section>

      <ExpansionSection />

      <CtaSection
        headline="Working in one of these categories?"
        body="Tell us what activity you run and what data you already collect. The first conversation is usually about evidence, not technology."
      />
    </>
  );
}
