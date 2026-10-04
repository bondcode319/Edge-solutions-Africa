import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { approachSteps } from "@/content/home";

/**
 * Five-step flow: horizontal on large screens, vertical on mobile. The
 * connectors are decorative — the numbered list carries the sequence for
 * screen readers and for anyone with images or CSS unavailable.
 */
export function ApproachFlow() {
  return (
    <Section tone="white" id="approach" ariaLabelledBy="approach-heading">
      <Container>
        <SectionHeading
          id="approach-heading"
          eyebrow="Our approach"
          title="From real-world activity to economic utility."
          intro="Each step exists because the next one depends on it. Skip the evidence and the verification is meaningless; skip the verification and the economic layer has nothing to stand on."
        />

        <ol className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-4">
          {approachSteps.map((step, index) => (
            <Reveal key={step.id} as="li" delay={index * 80} className="relative">
              <div className="flex gap-4 lg:flex-col lg:gap-4">
                <div className="relative flex flex-col items-center lg:w-full lg:flex-row">
                  <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-softgrey bg-white text-emerald-600 shadow-[var(--shadow-card)]">
                    <Icon name={step.icon} className="size-5" />
                  </span>

                  {/* Vertical connector on mobile, horizontal on desktop. */}
                  {index < approachSteps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 bg-gradient-to-b from-softgrey to-transparent lg:mt-0 lg:ml-3 lg:h-px lg:w-full lg:flex-none lg:bg-gradient-to-r lg:from-softgrey lg:to-softgrey/20"
                    />
                  ) : null}
                </div>

                <div className="pb-2 lg:pb-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1.5 text-base font-semibold tracking-[-0.01em] text-navy">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
