import Link from "next/link";
import { Card, CardIcon } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { FocusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { industries } from "@/content/industries";

/** Activity categories, each labelled with how far along it actually is. */
export function ExpansionSection() {
  return (
    <Section tone="white" id="expansion" ariaLabelledBy="expansion-heading">
      <Container>
        <SectionHeading
          id="expansion-heading"
          eyebrow="Designed to expand"
          title="One infrastructure. A growing range of environmental activities."
          intro="A new activity category needs a measurable activity, an available evidence source and a methodology appropriate to the claim. Where those exist, the infrastructure is configured rather than rebuilt."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal key={industry.slug} as="li" delay={index * 60} className="h-full">
              <Card interactive={industry.hasDetailPage} className="group h-full">
                <div className="flex items-start justify-between gap-3">
                  <CardIcon name={industry.icon} />
                  <FocusBadge focus={industry.focus} />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.01em]">
                  {industry.hasDetailPage ? (
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {industry.name}
                    </Link>
                  ) : (
                    industry.name
                  )}
                </h3>
                <p className="text-sm leading-relaxed text-slate">{industry.summary}</p>
                {industry.hasDetailPage ? (
                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-emerald-600"
                    aria-hidden="true"
                  >
                    Explore category
                    <Icon
                      name="ArrowRight"
                      className="size-4 transition-transform duration-[--duration-base] ease-[--ease-out-soft] group-hover:translate-x-1"
                    />
                  </span>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
