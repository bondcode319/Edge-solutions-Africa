import { Container, Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { legalReviewed, legalReviewNotice, type LegalPage } from "@/content/legal";

/** Shared layout for the privacy, terms and cookie pages. */
export function LegalContent({ page }: { page: LegalPage }) {
  return (
    <>
      <section className="on-dark bg-brand-900 text-white">
        <Container width="prose" className="py-12 md:py-16">
          <Breadcrumbs tone="dark" items={[{ name: page.title, href: `/${page.slug}` }]} />
          <h1 className="mt-8 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">{page.summary}</p>
        </Container>
      </section>

      <Section tone="light">
        <Container width="prose">
          {!legalReviewed ? (
            <Callout tone="caution" title="Awaiting legal review" className="mb-10">
              {legalReviewNotice}
            </Callout>
          ) : null}

          <div className="space-y-10">
            {page.sections.map((section) => (
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
                        <Icon name="Check" className="mt-1 size-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
