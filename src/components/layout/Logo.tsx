import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Brand identity.
 *
 * No official logo asset has been supplied, so this renders a temporary
 * text-based wordmark. Set `siteConfig.logoSrc` to a file under /public and the
 * image is used instead — no other change is required anywhere in the site.
 */
export function Logo({
  tone = "light",
  className,
  asLink = true,
}: {
  tone?: "light" | "dark";
  className?: string;
  asLink?: boolean;
}) {
  const content = siteConfig.logoSrc ? (
    <Image
      src={siteConfig.logoSrc}
      alt={siteConfig.name}
      width={180}
      height={36}
      priority
      className="h-8 w-auto"
    />
  ) : (
    <span
      className={cn(
        "text-[1.05rem] font-semibold tracking-[-0.02em] sm:text-[1.15rem]",
        tone === "dark" ? "text-white" : "text-navy",
      )}
    >
      <span className={tone === "dark" ? "text-cyan" : "text-emerald"}>Edge</span> Solutions
      Africa
    </span>
  );

  if (!asLink) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center rounded-sm", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      {content}
    </Link>
  );
}
