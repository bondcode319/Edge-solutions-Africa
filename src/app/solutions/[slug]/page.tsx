import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardIcon } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getSolution, solutions } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return buildMetadata({ title: "Not found", description: "", path: `/solutions/${slug}`, noIndex: true });

  return buildMetadata({
    title: solution.name,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = solution.related
    .map((relatedSlug) => getSolution(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <PageHero
        eyebrow={solution.name}
        title={solution.headline}
        intro={solution.intro}
        crumbs={[
          { name: "Solutions", href: "/solutions" },
          { name: solution.name, href: `/solutions/${solution.slug}` },
        ]}
        aside={
          <div className="rounded-panel border border-white/10 bg-white/[0.05] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Development status
            </p>
            <div className="mt-3">
              <StatusBadge status={solution.status} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              We publish a status against every capability so you can tell the difference between
              what is designed and what is built.
            </p>
          </div>
        }
      />

      <Section tone="light" ariaLabelledBy="capabilities-heading">
        <Container>
          <SectionHeading
            id="capabilities-heading"
            eyebrow="Capabilities"
            title="What this covers."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solution.capabilities.map((capability, index) => (
              <Reveal key={capability.title} as="li" delay={index * 50} className="h-full">
                <Card className="h-full">
                  <CardIcon name={solution.icon} />
                  <h3 className="text-base font-semibold tracking-[-0.01em]">{capability.title}</h3>
                  <p className="text-sm leading-relaxed text-slate">{capability.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {solution.workflow ? (
        <Section tone="white" ariaLabelledBy="workflow-heading">
          <Container>
            <SectionHeading
              id="workflow-heading"
              eyebrow="Workflow"
              title="How it runs, end to end."
            />
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {solution.workflow.map((stage, index) => (
                <Reveal key={stage.step} as="li" delay={index * 50}>
                  <div className="flex h-full gap-4 rounded-card border border-softgrey bg-offwhite p-5">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-semibold text-emerald-600 shadow-[var(--shadow-card)]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-navy">{stage.step}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">{stage.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      ) : null}

      <Section tone="light" ariaLabelledBy="considerations-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              id="considerations-heading"
              eyebrow="Before you assume more"
              title="What this does not claim."
              intro="Being precise about the boundaries is part of the product, not a disclaimer bolted on at the end."
            />
            <ul className="space-y-3">
              {solution.considerations.map((consideration) => (
                <li key={consideration}>
                  <Callout tone="caution">{consideration}</Callout>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="white" spacing="tight" ariaLabelledBy="related-heading">
          <Container>
            <h2 id="related-heading" className="text-xl font-semibold tracking-[-0.01em] text-navy">
              Related solutions
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-card border border-softgrey bg-offwhite p-5 transition-colors hover:border-emerald/30"
                  >
                    <span>
                      <span className="block text-base font-semibold text-navy">{item.name}</span>
                      <span className="mt-1 block text-sm text-slate">{item.summary}</span>
                    </span>
                    <Icon
                      name="ArrowRight"
                      className="size-5 shrink-0 text-emerald-600 transition-transform duration-[--duration-base] group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaSection
        headline={solution.cta.label}
        body={`Tell us what you are working on and what data you already hold. If ${solution.name.toLowerCase()} is not the right starting point, we will say so.`}
        primary={{
          label: solution.cta.label,
          href: `/contact?interest=${encodeURIComponent(solution.cta.interest)}`,
        }}
        secondary={{ label: "Explore the Platform", href: "/platform" }}
      />
    </>
  );
}
