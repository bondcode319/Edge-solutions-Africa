import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Callout } from "@/components/ui/Callout";
import { contactDetails, siteConfig } from "@/config/site";
import { areasOfInterest } from "@/lib/enquiry";
import { isDeliveryConfigured } from "@/lib/enquiry-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Discuss a partnership with Edge Solutions Africa: MRV integration, e-mobility data, environmental data, green rewards, project funding, payments, sponsorship or institutional collaboration.",
  path: "/contact",
});

const contactIcons: Record<string, string> = {
  "General enquiries": "Mail",
  "Registered office": "MapPin",
  Telephone: "Phone",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let us start a conversation."
        intro="Tell us what you are working on. The most useful first message describes the environmental activity you run or fund, and the data that already exists around it."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <Section tone="light" id="enquiry-form" ariaLabelledBy="contact-form-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                id="contact-form-heading"
                eyebrow="Partnership enquiry"
                title="Send us an enquiry."
              />

              <div className="mt-8 space-y-4">
                {contactDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start gap-3 rounded-card border border-softgrey bg-white p-4"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Icon name={contactIcons[detail.label] ?? "Mail"} className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate">
                        {detail.label}
                      </p>
                      {detail.value ? (
                        detail.href ? (
                          <a
                            href={detail.href}
                            className="text-sm font-medium text-navy hover:underline"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-navy">{detail.value}</p>
                        )
                      ) : (
                        <p className="text-sm text-slate">To be confirmed</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Callout className="mt-6">
                {siteConfig.name} has not published direct contact details yet. Until they are
                confirmed, the form is the way to reach us.
              </Callout>

              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate">
                  What you can ask about
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {areasOfInterest.map((area) => (
                    <li
                      key={area}
                      className="rounded-pill border border-softgrey bg-white px-3 py-1.5 text-xs text-slate-700"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ContactForm deliveryConfigured={isDeliveryConfigured()} />
          </div>
        </Container>
      </Section>
    </>
  );
}
