import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { solutions } from "@/content/solutions";
import { industriesWithPages } from "@/content/industries";
import { articles } from "@/content/insights";

/**
 * XML sitemap. Draft articles are excluded, matching the noindex they carry, so
 * the sitemap never advertises a page we are asking not to be indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/platform"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/solutions"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/industries"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/partners"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/cookies"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: url(`/solutions/${solution.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industriesWithPages.map((industry) => ({
    url: url(`/industries/${industry.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: url(`/insights/${article.slug}`),
      lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  return [...core, ...solutionPages, ...industryPages, ...articlePages];
}
