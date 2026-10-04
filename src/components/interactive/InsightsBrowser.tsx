"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Article } from "@/content/insights";
import { articleCategories } from "@/content/insights";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { trackEvent } from "@/lib/analytics";

/**
 * Article listing with category filters and search.
 *
 * Filtering happens in the browser over a list that is already server-rendered,
 * so every article is in the initial HTML for crawlers and for anyone without
 * JavaScript. The result count is announced politely for screen readers.
 */
export function InsightsBrowser({ articles }: { articles: Article[] }) {
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
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
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
                    "inline-flex min-h-9 items-center rounded-pill border px-3.5 text-sm transition-colors duration-[--duration-fast]",
                    category === option
                      ? "border-emerald bg-emerald text-white"
                      : "border-softgrey bg-white text-slate-700 hover:border-slate/40",
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-72">
          <label htmlFor={searchId} className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
            Search articles
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search by title or topic"
            className="mt-3 min-h-11 w-full rounded-card border border-softgrey bg-white px-4 text-sm text-navy placeholder:text-slate/60"
          />
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-slate">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {category === "All" ? "" : ` in ${category}`}
        {query.trim() ? ` matching “${query.trim()}”` : ""}.
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-panel border border-softgrey bg-white p-8 text-center">
          <p className="text-base font-medium text-navy">No articles match that search.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="mt-3 text-sm font-medium text-emerald-600 underline"
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
                className="group flex h-full flex-col gap-3 rounded-card border border-softgrey bg-white p-6 transition-[border-color,box-shadow,transform] duration-[--duration-base] ease-[--ease-out-soft] hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-pill bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    {article.category}
                  </span>
                  {article.status === "draft" ? (
                    <span className="rounded-pill border border-softgrey px-2.5 py-1 text-xs font-medium text-slate">
                      Draft
                    </span>
                  ) : null}
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-navy">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate">{article.excerpt}</p>
                <span className="mt-auto flex items-center justify-between pt-3 text-sm">
                  <span className="text-slate">{article.readingMinutes} min read</span>
                  <Icon
                    name="ArrowRight"
                    className="size-4 text-emerald-600 transition-transform duration-[--duration-base] group-hover:translate-x-1"
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
