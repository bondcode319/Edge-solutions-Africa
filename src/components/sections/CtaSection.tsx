import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { partnershipCta } from "@/content/home";

/**
 * Closing call to action, reused at the foot of every content page.
 * Pass overrides to tailor it to a specific solution or industry.
 */
export function CtaSection({
  headline = partnershipCta.headline,
  body = partnershipCta.body,
  primary = partnershipCta.primary,
  secondary = partnershipCta.secondary,
}: {
  headline?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <Section tone="dark" spacing="tight" ariaLabelledBy="cta-heading">
      <Container>
        <div className="relative overflow-hidden rounded-panel border border-white/10 bg-gradient-to-br from-brand-800 to-brand-900 p-8 md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2
              id="cta-heading"
              className="text-balance-heading text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl"
            >
              {headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70">{body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href} variant="onDark" size="lg" withArrow>
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} variant="onDarkGhost" size="lg">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
