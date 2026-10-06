"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Share controls.
 *
 * No third-party share widgets or tracking scripts: these are plain links to
 * each platform's share URL, plus a copy-link button. Nothing is loaded from a
 * third party and no visitor data leaves the page until the visitor acts.
 */
export function ShareLinks({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const targets = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on X",
      href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-ink">Share this article</span>
      <ul className="flex flex-wrap gap-2">
        {targets.map((target) => (
          <li key={target.label}>
            <a
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-xs border border-line bg-surface px-4 text-sm text-ink-soft hover:border-ink"
            >
              {target.label.replace("Share on ", "").replace("Share by ", "")}
              <Icon name="ExternalLink" className="size-3.5" />
              <span className="sr-only">{target.label} (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex min-h-10 items-center gap-2 rounded-xs border border-line bg-surface px-4 text-sm text-ink-soft hover:border-ink"
          >
            {copied ? "Link copied" : "Copy link"}
            <Icon name={copied ? "Check" : "Link2"} className="size-3.5" />
          </button>
        </li>
      </ul>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
