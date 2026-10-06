import Image from "next/image";
import type { ImageEntry } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * Renders a manifest image, or nothing at all when the asset is absent.
 *
 * This component is deliberately free of server-only imports so it can be used
 * from client components as well as server ones. Existence is decided by the
 * caller: `resolveArt` on the server, or a `covers` prop for client trees. See
 * `src/lib/art.server.ts`.
 *
 * It also enforces two things the editorial rules depend on:
 *  - a real `alt`, taken from the manifest, never left empty by accident;
 *  - an "Illustrative" label whenever the entry is marked illustrative, so a
 *    rendered image can never be mistaken for a documented result.
 */
export function Figure({
  image,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  /** Hide the illustrative label, e.g. inside a decorative background. */
  hideLabel = false,
  fill = true,
  style,
}: {
  image: ImageEntry | undefined;
  className?: string;
  imageClassName?: string;
  /** Required by next/image when `fill` is used, to avoid downloading desktop-size art on mobile. */
  sizes?: string;
  priority?: boolean;
  hideLabel?: boolean;
  fill?: boolean;
  style?: React.CSSProperties;
}) {
  // Purely decorative: an empty alt is correct and the label is noise.
  if (!image) return null;
  if (image.alt === "" && !hideLabel) return null;

  const showLabel = image.illustrative === true && !hideLabel;

  return (
    <figure className={cn("relative overflow-hidden rounded-card", className)} style={style}>
      <Image
        src={image.file}
        alt={image.alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
      {showLabel ? (
        <figcaption className="pointer-events-none absolute bottom-3 left-3">
          <span className="inline-flex items-center rounded-xs bg-brand-900/80 px-2 py-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-accent backdrop-blur-sm">
            Illustrative
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}