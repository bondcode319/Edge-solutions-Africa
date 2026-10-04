import { ButtonLink } from "@/components/ui/Button";
import { Card, CardIcon } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { valueGap } from "@/content/home";

export function ValueGapSection() {
  return (
    <Section tone="light" id="value-gap" ariaLabelledBy="value-gap-heading">
      <Container>
        <SectionHeading
          id="value-gap-heading"
          eyebrow={valueGap.eyebrow}
          title={valueGap.headline}
          intro={valueGap.intro}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueGap.problems.map((problem, index) => (
            <Reveal key={problem.title} as="li" delay={index * 60} className="h-full">
              <Card className="h-full">
                <CardIcon name={problem.icon} />
                <h3 className="text-lg font-semibold tracking-[-0.01em]">{problem.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{problem.body}</p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-5 rounded-panel border border-softgrey bg-white p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <p className="max-w-2xl text-base leading-relaxed text-slate-700">
            None of this is solved by one company, and we do not claim to have solved it. What we
            are building is the missing infrastructure layer — so that measuring, evidencing and
            financing environmental activity stops being a project each participant runs alone.
          </p>
          <ButtonLink href={valueGap.cta.href} variant="secondary" withArrow className="shrink-0">
            {valueGap.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
