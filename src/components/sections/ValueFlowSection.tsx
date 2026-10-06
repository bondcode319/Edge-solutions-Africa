import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { valueFlow } from "@/content/home";

/**
 * How value flows.
 *
 * The diagram is built from ordinary elements rather than a fixed-width SVG, so
 * it reflows on small screens and remains readable to screen readers. The
 * distinctions table below it is the important part: it is where we state
 * plainly what a record, a credit and a point each are.
 */
export function ValueFlowSection() {
  return (
    <Section tone="light" id="value-flow" ariaLabelledBy="value-flow-heading">
      <Container>
        <SectionHeading
          id="value-flow-heading"
          eyebrow={valueFlow.eyebrow}
          title={valueFlow.headline}
          intro={valueFlow.intro}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="rounded-panel border border-line bg-surface p-6 md:p-8">
            <ol className="space-y-2">
              {valueFlow.nodes.map((node, index) => (
                <Reveal key={node.id} as="li" delay={index * 50}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center self-stretch">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand-50 text-xs font-semibold text-brand">
                        {index + 1}
                      </span>
                      {index < valueFlow.nodes.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="my-1 w-px flex-1 bg-gradient-to-b from-line to-line/30"
                        />
                      ) : null}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-semibold text-ink">{node.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-soft">{node.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
              Three things that are often confused
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-soft">
              These are not interchangeable, and treating them as if they were is how environmental
              claims lose credibility.
            </p>

            <dl className="mt-6 space-y-4">
              {valueFlow.distinctions.map((item) => (
                <div
                  key={item.term}
                  className="rounded-card border border-line bg-surface p-5"
                >
                  <dt className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Icon name="CircleDot" className="size-4 text-brand" />
                    {item.term}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-soft">{item.body}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-muted-soft">
              Earning Green Points does not mean a participant has offset their emissions. Points
              are not cash, and no transferability, cash value or guaranteed redemption should be
              assumed.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
