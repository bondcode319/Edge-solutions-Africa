import Image from "next/image";
import { Figure } from "@/components/ui/Figure";
import { resolveArt } from "@/lib/art.server";
import { cn } from "@/lib/cn";

/**
 * Server-side image placement.
 *
 * These wrappers exist because deciding whether a file exists needs the
 * filesystem, which is server-only. Keeping them here means `<Figure>` stays
 * importable from client components (see `src/components/interactive`).
 *
 * All three render nothing when the asset is absent, so the site is unchanged
 * until images are actually generated.
 */

/**
 * Decorative background layer for dark sections. A hero without its field still
 * looks correct because the grid and gradient layers sit beneath it.
 */
export async function HeroField({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const image = await resolveArt(id);
  if (!image) return null;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <Image
        src={image.file}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
    </div>
  );
}

/**
 * Section art by manifest id.
 *
 * The common case: a page knows the id and nothing else. Because the image may
 * not have been generated yet, this renders nothing in that case — the caller
 * does not need to check, and a missing asset never leaves a gap in the layout.
 */
export async function SectionArt({
  id,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  ratio = "4 / 3",
}: {
  id: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  /** Reserves height before the file loads, preventing layout shift. */
  ratio?: string;
}) {
  const image = await resolveArt(id);
  if (!image) return null;

  return (
    <Figure
      image={image}
      className={cn("aspect-(--art-ratio)", className)}
      imageClassName={imageClassName}
      sizes={sizes}
      style={{ "--art-ratio": ratio } as React.CSSProperties}
    />
  );
}