import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { FocusBadge } from "@/components/ui/StatusBadge";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getIndustry, industriesWithPages } from "@/content/industries";
import { getSolution } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industriesWithPages.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry || !industry.hasDetailPage) {
    return buildMetadata({
      title: "Not found",
      description: "",
      path: `/industries/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: industry.name,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

/** Four-column breakdown shared by every industry page. */
const blocks = [
  { key: "activity", heading: "The real-world activity", icon: "BusFront" },
  { key: "dataSources", heading: "Potential data sources", icon: "Antenna" },
  { key: "verificationConsiderations", heading: "Verification considerations", icon: "ShieldCheck" },
  { key: "platformConnection", heading: "Platform connection", icon: "Layers" },
] as const;

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry || !industry.hasDetailPage) notFound();

  const relatedSolutions = industry.relatedSolutions
    .map((solutionSlug) => getSolution(solutionSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={industry.headline}
        intro={industry.intro}
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ]}
        aside={
          <div className="rounded-panel border border-white/10 bg-white/[0.05] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Where this category stands
            </p>
            <div className="mt-3">
              <FocusBadge focus={industry.focus} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {industry.developmentNote}
            </p>
          </div>
        }
      />

      <Section tone="light" ariaLabelledBy="breakdown-heading">
        <Container>
          <SectionHeading
            id="breakdown-heading"
            eyebrow="Category detail"
            title="Activity, data, verification and platform fit."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {blocks.map((block, index) => (
              <Reveal key={block.key} delay={index * 50}>
                <div className="h-full rounded-card border border-softgrey bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name={block.icon} className="size-5" />
                    </span>
                    <h3 className="text-base font-semibold tracking-[-0.01em] text-navy">
                      {block.heading}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {industry[block.key].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <Icon name="Check" className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Callout tone="caution" className="mt-8 max-w-3xl">
            Nothing here claims a particular environmental outcome for any specific project. What
            can be claimed depends on the operation, the evidence available and the methodology that
            applies.
          </Callout>
        </Container>
      </Section>

      {relatedSolutions.length > 0 ? (
        <Section tone="white" spacing="tight" ariaLabelledBy="industry-solutions-heading">
          <Container>
            <h2
              id="industry-solutions-heading"
              className="text-xl font-semibold tracking-[-0.01em] text-navy"
            >
              Relevant solutions
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSolutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-card border border-softgrey bg-offwhite p-5 transition-colors hover:border-emerald/30"
                  >
                    <span className="text-base font-semibold text-navy">{solution.name}</span>
                    <span className="text-sm text-slate">{solution.summary}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-emerald-600">
                      Read more
                      <Icon
                        name="ArrowRight"
                        className="size-4 transition-transform duration-[--duration-base] group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaSection
        headline={`Working in ${industry.name.toLowerCase()}?`}
        body="Tell us about your operation and the data behind it. If the category is not ready for what you need, we will tell you that rather than sell you a pilot."
      />
    </>
  );
}
