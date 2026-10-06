import "server-only";
import { access } from "node:fs/promises";
import path from "node:path";
import { getImage, imageManifest, type ImageEntry } from "@/content/images";

/**
 * Resolves a manifest entry only if its file is actually on disk.
 *
 * The manifest describes what *should* exist; it is written before anything is
 * generated. Without this check every placement would emit a `next/image`
 * request for a missing file, producing broken images and console errors on
 * every page until the full batch had been generated.
 *
 * Every page using this is statically generated, so the check runs at build time
 * and costs nothing at runtime. Results are cached per process.
 */

let available: Set<string> | null = null;

async function availableIds(): Promise<Set<string>> {
  if (available) return available;

  const found = new Set<string>();
  await Promise.all(
    imageManifest.map(async (entry) => {
      const relative = entry.file.replace(/^\//, "");
      try {
        await access(path.join(process.cwd(), "public", relative));
        found.add(entry.id);
      } catch {
        // Absent. Intended: the image simply does not render.
      }
    }),
  );

  available = found;
  return found;
}

/** Returns the manifest entry for `id` only when the file has been generated. */
export async function resolveArt(id: string): Promise<ImageEntry | undefined> {
  const entry = getImage(id);
  if (!entry) return undefined;
  return (await availableIds()).has(id) ? entry : undefined;
}

/** Same, but returns a map keyed by id — for passing to client components. */
export async function resolveArtSet(
  ids: readonly string[],
): Promise<Record<string, ImageEntry>> {
  const found = await availableIds();
  const result: Record<string, ImageEntry> = {};
  for (const id of ids) {
    const entry = getImage(id);
    if (entry && found.has(id)) result[id] = entry;
  }
  return result;
}