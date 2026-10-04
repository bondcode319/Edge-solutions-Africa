import { LinkCard } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Callout } from "@/components/ui/Callout";
import { platformCapabilities } from "@/content/home";

export function PlatformOverviewSection() {
  return (
    <Section tone="light" id="platform-overview" ariaLabelledBy="platform-overview-heading">
      <Container>
        <SectionHeading
          id="platform-overview-heading"
          eyebrow="Platform"
          title="One connected infrastructure. Multiple environmental use cases."
          intro="The capabilities below are parts of a single system, not separate products. Each carries its current development status, because a capability that is designed is not the same as a capability you can use today."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {platformCapabilities.map((capability, index) => (
            <Reveal key={capability.name} as="li" delay={index * 60} className="h-full">
              <LinkCard
                href={capability.href}
                title={capability.name}
                body={capability.body}
                icon={capability.icon}
                footer={<StatusBadge status={capability.status} />}
              />
            </Reveal>
          ))}
        </ul>

        <Callout className="mt-8 max-w-3xl">
          Nothing on this page is offered as a live service. Capabilities marked in development are
          being built; capabilities marked concept are designed and documented but not yet built.
        </Callout>
      </Container>
    </Section>
  );
}
