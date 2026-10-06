import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { principles } from "@/content/home";

export function TrustSection({ id = "trust" }: { id?: string }) {
  return (
    <Section tone="dark" id={id} ariaLabelledBy="trust-heading">
      <Container>
        <SectionHeading
          id="trust-heading"
          eyebrow="Built around trust"
          title="Trust is not a feature. It is the foundation."
          intro="These principles constrain what we build and what we are willing to claim. Several of them deliberately slow the product down."
          tone="dark"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} as="li" delay={index * 50} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-card border border-white/10 bg-surface/[0.04] p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-xs bg-surface/10 text-accent">
                  <Icon name={principle.icon} className="size-5" />
                </span>
                <h3 className="text-base font-semibold tracking-[-0.01em] text-white">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
