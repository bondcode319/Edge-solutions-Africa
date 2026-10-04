import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { LinkCard } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Callout } from "@/components/ui/Callout";
import { solutions } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description:
    "Environmental MRV, e-mobility infrastructure, environmental data, green rewards, project funding and payments — the solutions Edge Solutions Africa is building.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Six capabilities. One infrastructure."
        intro="Each solution below is part of the same system. They are listed separately because organisations arrive with different problems — but the value comes from how they connect."
        crumbs={[{ name: "Solutions", href: "/solutions" }]}
      />

      <Section tone="light" ariaLabelledBy="solutions-heading">
        <Container>
          <SectionHeading
            id="solutions-heading"
            eyebrow="Explore"
            title="What we build."
            intro="Every solution carries its development status. Where something is at concept stage, we say so rather than describing it as if you could use it today."
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Reveal key={solution.slug} as="li" delay={index * 60} className="h-full">
                <LinkCard
                  href={`/solutions/${solution.slug}`}
                  title={solution.name}
                  body={solution.summary}
                  icon={solution.icon}
                  footer={<StatusBadge status={solution.status} />}
                />
              </Reveal>
            ))}
          </ul>

          <Callout className="mt-10 max-w-3xl">
            Measurement and verification come first by design. The reward, funding and commerce
            capabilities inherit whatever integrity the MRV layer has, which is a good reason not to
            ship them ahead of it.
          </Callout>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
