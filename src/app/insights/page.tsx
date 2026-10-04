import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { InsightsBrowser } from "@/components/interactive/InsightsBrowser";
import { articles, featuredArticle } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Articles on environmental MRV, data quality, e-mobility, environmental finance and digital infrastructure for environmental reporting.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Writing about the problems we are building around."
        intro="Explanations of environmental measurement, data quality and environmental finance — written from the perspective of building the infrastructure, not observing it."
        crumbs={[{ name: "Insights", href: "/insights" }]}
      />

      <Section tone="light" spacing="tight">
        <Container>
          <Callout tone="caution" title="Draft content">
            These articles are drafts prepared during website development. They have not been
            published or dated, and they contain no external research findings, statistics or
            quotations. Publication dates and any individual author credits will be added when the
            company confirms them.
          </Callout>

          {featuredArticle ? (
            <Link
              href={`/insights/${featuredArticle.slug}`}
              className="group mt-8 grid gap-8 rounded-panel border border-softgrey bg-white p-6 transition-[border-color,box-shadow] duration-[--duration-base] hover:border-emerald/30 hover:shadow-[var(--shadow-card-hover)] md:grid-cols-[1.3fr_0.7fr] md:p-10"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600">
                  Featured
                </span>
                <h2 className="mt-4 text-balance-heading text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-navy sm:text-4xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
                  {featuredArticle.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
                  Read the article
                  <Icon
                    name="ArrowRight"
                    className="size-4 transition-transform duration-[--duration-base] group-hover:translate-x-1"
                  />
                </span>
              </div>
              <dl className="grid content-start gap-4 border-t border-softgrey pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-slate">Category</dt>
                  <dd className="mt-1 text-sm font-medium text-navy">{featuredArticle.category}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-slate">Reading time</dt>
                  <dd className="mt-1 text-sm font-medium text-navy">
                    {featuredArticle.readingMinutes} minutes
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-slate">Status</dt>
                  <dd className="mt-1 text-sm font-medium text-navy">
                    {featuredArticle.status === "draft" ? "Draft — not yet published" : "Published"}
                  </dd>
                </div>
              </dl>
            </Link>
          ) : null}
        </Container>
      </Section>

      <Section tone="white" ariaLabelledBy="all-articles-heading">
        <Container>
          <SectionHeading id="all-articles-heading" eyebrow="All articles" title="Browse insights." />
          <div className="mt-10">
            <InsightsBrowser articles={articles} />
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
