import Link from "next/link";
import { Card, CardIcon } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { audiences } from "@/content/home";

/**
 * Audience cards. Each links to the contact form with its area of interest
 * preselected, so the enquiry arrives already routed.
 */
export function AudiencesSection() {
  return (
    <Section tone="white" id="who-we-work-with" ariaLabelledBy="audiences-heading">
      <Container>
        <SectionHeading
          id="audiences-heading"
          eyebrow="Who we work with"
          title="Infrastructure for the people building a more sustainable economy."
          intro="We do not publish partner logos or claim relationships we do not have. What follows is who the infrastructure is designed for, and how a conversation would start."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <Reveal key={audience.name} as="li" delay={index * 50} className="h-full">
              <Card interactive className="group h-full">
                <CardIcon name={audience.icon} />
                <h3 className="text-lg font-semibold tracking-[-0.01em]">
                  <Link
                    href={`/contact?interest=${encodeURIComponent(audience.interest)}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {audience.name}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-slate">{audience.body}</p>
                <p className="mt-auto border-t border-softgrey pt-4 text-sm text-slate-700">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    How to engage
                  </span>
                  <span className="mt-1.5 flex items-start gap-2">
                    <Icon
                      name="ArrowRight"
                      className="mt-0.5 size-4 shrink-0 text-emerald-600 transition-transform duration-[--duration-base] ease-[--ease-out-soft] group-hover:translate-x-1"
                    />
                    {audience.pathway}
                  </span>
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
