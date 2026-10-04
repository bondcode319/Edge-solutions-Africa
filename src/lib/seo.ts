import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Page metadata helper. Every route calls this so titles, canonicals and social
 * metadata stay consistent.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  /** Route path beginning with "/". */
  path: string;
  noIndex?: boolean;
  /** Skip the "| Edge Solutions Africa" suffix — used by the homepage. */
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Organisation structured data. Deliberately minimal: no address, telephone,
 * founding date, employee count or social profile is asserted, because none has
 * been confirmed. Contact details are included only when configured.
 */
export function organisationJsonLd() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN_URL;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    ...(email ? { email } : {}),
    ...(linkedIn ? { sameAs: [linkedIn] } : {}),
  };
}

/** Breadcrumb structured data for detail pages. */
export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.href, siteConfig.url).toString(),
    })),
  };
}
