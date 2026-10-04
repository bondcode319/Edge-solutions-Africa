import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardIcon } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { isDeliveryConfigured } from "@/lib/enquiry-config";
import { partnerCategories, partnersIntro } from "@/content/partners";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Partners",
  description:
    "The partner ecosystem Edge Solutions Africa is building: operators, project developers, sponsors, merchants, verifiers, technology providers, researchers and institutions.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner ecosystem"
        title={partnersIntro.headline}
        intro={partnersIntro.body}
        crumbs={[{ name: "Partners", href: "/partners" }]}
      />

      <Section tone="light" ariaLabelledBy="partners-heading">
        <Container>
          <SectionHeading
            id="partners-heading"
            eyebrow="Who we want to talk to"
            title="Nine kinds of conversation we welcome."
            intro="We welcome conversations with organisations working across these areas. Where a relationship is formalised and approved for publication, we will describe it plainly."
          />

          <Callout tone="caution" className="mt-8 max-w-3xl">
            {partnersIntro.disclosure}
          </Callout>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partnerCategories.map((category, index) => (
              <Reveal key={category.id} as="li" delay={index * 50} className="h-full">
                <Card className="h-full">
                  <CardIcon name={category.icon} />
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">{category.name}</h3>
                  <p className="text-sm leading-relaxed text-slate">{category.body}</p>
                  <ul className="mt-2 space-y-2 border-t border-softgrey pt-4">
                    {category.value.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <Icon name="Check" className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" id="partnership-enquiry" ariaLabelledBy="partner-form-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              id="partner-form-heading"
              eyebrow="Partnership enquiry"
              title="Start a conversation."
              intro="Tell us what you work on and what you would want this infrastructure to do. We read every enquiry."
            />
            <ContactForm formId="partner-enquiry-form" deliveryConfigured={isDeliveryConfigured()} />
          </div>
        </Container>
      </Section>
    </>
  );
}
