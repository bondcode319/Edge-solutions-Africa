import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const suggestions = [
  { label: "Platform overview", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="on-dark bg-navy text-white">
      <Container className="py-20 md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">Error 404</p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
          We could not find that page.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
          The link may be out of date, or the page may have moved. Here is where most people are
          heading.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {suggestions.map((suggestion) => (
            <li key={suggestion.href}>
              <Link
                href={suggestion.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-white/20 px-4 text-sm text-white/85 hover:border-white/50 hover:text-white"
              >
                {suggestion.label}
                <Icon name="ArrowRight" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>

        <ButtonLink href="/" variant="onDark" size="lg" className="mt-10">
          Back to the homepage
        </ButtonLink>
      </Container>
    </section>
  );
}
