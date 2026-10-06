import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";
import { ShareLinks } from "@/components/interactive/ShareLinks";
import { articles, getArticle, relatedArticles } from "@/content/insights";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return buildMetadata({
      title: "Not found",
      description: "",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    // Drafts are kept out of the index until the company publishes them.
    noIndex: article.status === "draft",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article.slug);
  const url = new URL(`/insights/${article.slug}`, siteConfig.url).toString();

  return (
    <>
      <article>
        <section className="on-dark relative overflow-hidden bg-brand-900 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_10%_0%,rgba(21,150,107,0.20),transparent_60%)]"
          />
          <Container width="prose" className="relative py-12 md:py-20">
            <Breadcrumbs
              tone="dark"
              items={[
                { name: "Insights", href: "/insights" },
                { name: article.title, href: `/insights/${article.slug}` },
              ]}
            />

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="rounded-xs bg-surface/10 px-2.5 py-1 text-xs font-medium text-accent">
                {article.category}
              </span>
              {article.status === "draft" ? (
                <span className="rounded-xs border border-white/20 px-2.5 py-1 text-xs font-medium text-white/70">
                  Draft — not yet published
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 text-balance-heading text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{article.excerpt}</p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-white/50">Author</dt>
                <dd className="mt-1 text-white/85">{article.author}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-white/50">Published</dt>
                <dd className="mt-1 text-white/85">
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Not yet published"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-white/50">Reading time</dt>
                <dd className="mt-1 text-white/85">{article.readingMinutes} minutes</dd>
              </div>
            </dl>
          </Container>
        </section>

        <Section tone="light">
          <Container width="prose">
            {article.status === "draft" ? (
              <Callout tone="caution" title="Draft article" className="mb-10">
                This is a draft prepared during website development. It has not been published or
                dated, and it contains no external research findings, statistics or quotations.
              </Callout>
            ) : null}

            <div className="space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-[1.75] text-ink-soft">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.list ? (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-base text-ink-soft">
                          <Icon
                            name="Check"
                            className="mt-1 size-4 shrink-0 text-brand"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-12 border-t border-line pt-6">
              <ShareLinks title={article.title} url={url} />
            </div>
          </Container>
        </Section>
      </article>

      {related.length > 0 ? (
        <Section tone="white" spacing="tight" ariaLabelledBy="related-articles-heading">
          <Container>
            <h2
              id="related-articles-heading"
              className="text-xl font-semibold tracking-[-0.01em] text-ink"
            >
              Related articles
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-card border border-line bg-surface-alt p-5 transition-colors hover:border-brand/30"
                  >
                    <span className="text-xs font-medium text-brand">{item.category}</span>
                    <span className="text-base font-semibold text-ink">{item.title}</span>
                    <span className="text-sm text-muted-soft">{item.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaSection />
    </>
  );
}
