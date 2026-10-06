"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Article } from "@/content/insights";
import { articleCategories } from "@/content/insights";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Figure } from "@/components/ui/Figure";
import type { ImageEntry } from "@/content/images";
import { trackEvent } from "@/lib/analytics";

/**
 * Article listing with category filters and search.
 *
 * Filtering happens in the browser over a list that is already server-rendered,
 * so every article is in the initial HTML for crawlers and for anyone without
 * JavaScript. The result count is announced politely for screen readers.
 *
 * `covers` is resolved on the server and keyed by manifest id. Only generated
 * files appear in it, so an article without a cover simply renders without one.
 */
export function InsightsBrowser({
  articles,
  covers,
}: {
  articles: Article[];
  covers: Record<string, ImageEntry>;
}) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;
      return (
        article.title.toLowerCase().includes(needle) ||
        article.excerpt.toLowerCase().includes(needle) ||
        article.category.toLowerCase().includes(needle)
      );
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-soft">
            Filter by category
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {["All", ...articleCategories].map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => setCategory(option)}
                  aria-pressed={category === option}
                  className={cn(
                    "inline-flex min-h-9 items-center rounded-xs border px-3.5 text-sm transition-colors duration-[--duration-fast]",
                    category === option
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-surface text-ink-soft hover:border-ink",
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-72">
          <label htmlFor={searchId} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-soft">
            Search articles
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search by title or topic"
            className="mt-3 min-h-11 w-full rounded-card border border-line bg-surface px-4 text-sm text-ink placeholder:text-muted-soft/60"
          />
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-soft">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {category === "All" ? "" : ` in ${category}`}
        {query.trim() ? ` matching “${query.trim()}”` : ""}.
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-panel border border-line bg-surface p-8 text-center">
          <p className="text-base font-medium text-ink">No articles match that search.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="mt-3 text-sm font-medium text-brand underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <li key={article.slug} className="h-full">
              <Link
                href={`/insights/${article.slug}`}
                onClick={() => trackEvent("article_opened", { slug: article.slug })}
                className="group flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-[--duration-base] ease-[--ease-standard] hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[var(--shadow-card-hover)]"
              >
                {/* Renders nothing until the cover is generated. */}
                <Figure
                  image={covers[`insight-${article.slug}`]}
                  className="-mx-6 -mt-6 mb-1 aspect-16/9 w-[calc(100%+3rem)] rounded-b-xs"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
                <div className="flex items-center gap-2">
                  <span className="rounded-xs bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand">
                    {article.category}
                  </span>
                  {article.status === "draft" ? (
                    <span className="rounded-xs border border-line px-2.5 py-1 text-xs font-medium text-muted-soft">
                      Draft
                    </span>
                  ) : null}
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-soft">{article.excerpt}</p>
                <span className="mt-auto flex items-center justify-between pt-3 text-sm">
                  <span className="text-muted-soft">{article.readingMinutes} min read</span>
                  <Icon
                    name="ArrowRight"
                    className="size-4 text-brand transition-transform duration-[--duration-base] group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
