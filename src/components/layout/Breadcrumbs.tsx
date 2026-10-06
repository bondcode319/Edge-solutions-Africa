import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; href: string };

/** Breadcrumb trail plus matching structured data. The last item is current. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const jsonLd = breadcrumbJsonLd([{ name: "Home", href: "/" }, ...items]);

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol
          className={`flex flex-wrap items-center gap-1.5 text-sm ${
            tone === "dark" ? "text-white/60" : "text-muted-soft"
          }`}
        >
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                <Icon name="ChevronRight" className="size-3.5 opacity-60" />
                {isLast ? (
                  <span aria-current="page" className={tone === "dark" ? "text-white" : "text-ink"}>
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
