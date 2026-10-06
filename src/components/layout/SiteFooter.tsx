import Link from "next/link";
import {
  contactDetails,
  footerNavigation,
  legalNavigation,
  siteConfig,
  socialLinks,
} from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

/**
 * Site footer.
 *
 * Contact details, addresses and social URLs are rendered only when configured.
 * Nothing here is invented: an unconfigured detail shows "To be confirmed".
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const configuredSocial = socialLinks.filter((link) => Boolean(link.href));

  return (
    <footer className="on-dark bg-brand-900 text-white">
      <div className="container-content py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
            <p className="eyebrow mt-6 text-accent">{siteConfig.brandPhrase}</p>

            <div className="mt-8 space-y-3">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="text-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/50">
                    {detail.label}
                  </p>
                  {detail.value ? (
                    detail.href ? (
                      <a href={detail.href} className="text-white hover:underline">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-white">{detail.value}</p>
                    )
                  ) : (
                    <p className="text-white/50">To be confirmed</p>
                  )}
                </div>
              ))}
            </div>

            {configuredSocial.length > 0 ? (
              <div className="mt-6 flex gap-3">
                {configuredSocial.map((link) => (
                  <a
                    key={link.label}
                    href={link.href as string}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xs border border-white/25 px-3 text-sm text-white/80 hover:border-white hover:bg-surface hover:text-brand-900"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <Icon name="ExternalLink" className="size-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-xs text-white/40">
                Social profiles to be confirmed.
              </p>
            )}
          </div>

          <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNavigation.map((group) => (
              <div key={group.heading}>
                <h2 className="eyebrow text-white/50">{group.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition-colors duration-[--duration-fast] hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNavigation.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-white/60 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/40">
          This website describes infrastructure at different stages of development. Capabilities
          labelled concept, in development or planned are not currently available. Green Points are
          a proposed reward mechanism, are not carbon credits and do not represent a fixed quantity
          of carbon dioxide equivalent. {siteConfig.name} does not issue carbon credits, does not
          offer investments and is not a licensed payment service provider.
        </p>
      </div>
    </footer>
  );
}
