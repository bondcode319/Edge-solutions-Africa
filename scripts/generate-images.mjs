#!/usr/bin/env node
/**
 * Batch image generation via the Gemini API.
 *
 * Reads the manifest in src/content/images.ts and writes PNGs into /public.
 * Nothing here is imported by the app — the manifest is the shared contract.
 *
 * Usage:
 *   node scripts/generate-images.mjs --list        # table of entries
 *   node scripts/generate-images.mjs --dry-run     # print prompts, write nothing
 *   node scripts/generate-images.mjs               # generate everything missing
 *   node scripts/generate-images.mjs --only hero-field-dark
 *   node scripts/generate-images.mjs --tier brand --force
 *
 * Design notes
 * ------------
 * - The reference anchor is generated first, because everything else chains
 *   its palette off it.
 * - Existing files are skipped unless --force, so the script is resumable.
 * - Prompts come from `buildPrompt`, which appends the style anchor and the
 *   strict exclusions. Edit the manifest, not this file.
 */

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const MANIFEST = path.join(ROOT, "src", "content", "images.ts");
const ENDPOINT = "https://generativablanguage.googleapis.com/v1beta";

/** Flash for speed; Pro only where legible text is the entire point. */
const MODELS = {
  flash: "gemini-3.1-flash-image",
  pro: "gemini-3-pro-image",
};

/* --- argv ---------------------------------------------------------------- */

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const only = value("only");
const tier = value("tier");
const force = flag("force");
const dryRun = flag("dry-run");
const list = flag("list");

/**
 * The manifest is TypeScript but this file is plain ESM. Rather than hand-strip
 * types with regexes — which breaks the moment the manifest gains real syntax —
 * we transpile it with the TypeScript compiler already in devDependencies and
 * import the result as a data URL. Nothing is written to disk.
 */
async function loadManifest() {
  const source = await readFile(MANIFEST, "utf8");

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    reportDiagnostics: true,
    fileName: "images.ts",
  });

  const errors = (transpiled.diagnostics ?? []).filter(
    (d) => d.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length) {
    const first = errors[0];
    throw new Error(
      `Could not read the image manifest: ${
        ts.flattenDiagnosticMessageText(first.messageText, " ")
      }`,
    );
  }

  // `outputText` on TS 5.x, `output` on some earlier builds.
  const code = transpiled.outputText ?? transpiled.output;
  if (typeof code !== "string") {
    throw new Error("TypeScript transpile produced no output for the image manifest");
  }

  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  return import(url);
}

/* --- helpers ------------------------------------------------------------- */

const exists = async (p) => {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Exponential backoff: a 33-image run will occasionally hit a 429. */
async function withRetry(fn, label, attempts = 4) {
  for (let i = 1; i <= attempts; i += 1) {
    try {
      return await fn();
    } catch (error) {
      const status = error?.status ?? 0;
      const retriable = status === 429 || status === 500 || status === 503;
      if (!retriable || i === attempts) throw error;
      const wait = 2 ** i * 1000;
      console.warn(`  ! ${label} failed (${status}); retry ${i}/${attempts - 1} in ${wait}ms`);
      await sleep(wait);
    }
  }
  return undefined;
}

/**
 * One generation call.
 *
 * A reference image is sent as an inline part rather than a hosted URL, so the
 * model inherits palette and lighting without needing public hosting — which
 * matters because the anchor may be generated minutes earlier in the same run.
 */
async function generate(entry, { referencePath, apiKey }) {
  const model = MODELS[entry.model];
  const parts = [];

  if (referencePath) {
    const buf = await readFile(referencePath);
    parts.push({
      inline_data: { mime_type: "image/png", data: buf.toString("base64") },
    });
    parts.push({
      text:
        "Use the attached image only as a visual reference for palette, lighting and " +
        "texture. Do not copy its composition or subject.",
    });
  }
  parts.push({ text: entry.prompt });

  const res = await fetch(`${ENDPOINT}/models/${model}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: entry.ratio, imageSize: entry.size },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const error = new Error(`Gemini ${res.status}: ${text.slice(0, 400)}`);
    error.status = res.status;
    throw error;
  }

  const json = await res.json();
  const partsOut = json?.candidates?.[0]?.content?.parts ?? [];
  const inline = partsOut.find((p) => p.inline_data?.data ?? p.inlineData?.data);
  const data = inline?.inline_data?.data ?? inline?.inlineData?.data;

  if (!data) {
    const reason =
      json?.promptFeedback?.blockReason ??
      json?.candidates?.[0]?.finishReason ??
      "no image in response";
    throw new Error(`Gemini returned no image (${reason})`);
  }

  return Buffer.from(data, "base64");
}

/* --- main ---------------------------------------------------------------- */

async function main() {
  const { imageManifest, buildPrompt, referenceAnchor, REFERENCE_ANCHOR_ID } =
    await loadManifest();

  if (list) {
    console.log("ID".padEnd(42), "TIER".padEnd(11), "RATIO".padEnd(7), "SIZE".padEnd(5), "MODEL");
    for (const e of imageManifest) {
      console.log(e.id.padEnd(42), e.tier.padEnd(11), e.ratio.padEnd(7), e.size.padEnd(5), e.model);
    }
    console.log(`\n${imageManifest.length} entries`);
    return;
  }

  let queue = imageManifest;

  if (only) {
    queue = imageManifest.filter((e) => e.id === only);
    if (queue.length === 0) throw new Error(`No manifest entry with id "${only}"`);
  } else if (tier) {
    queue = imageManifest.filter((e) => e.tier === tier);
    if (queue.length === 0) throw new Error(`No manifest entries in tier "${tier}"`);
  }

  if (dryRun) {
    for (const e of queue) {
      console.log(
        `\n${"=".repeat(72)}\n${e.id}  →  ${e.file}\n${e.ratio} ${e.size} ${MODELS[e.model]}\n${"-".repeat(72)}`,
      );
      console.log(buildPrompt(e));
    }
    console.log(`\n${queue.length} prompts (dry run, nothing written)`);
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error(
      "\nNo API key.\n\n  Set one, then re-run:\n    $env:GEMINI_API_KEY='...'      # PowerShell\n    export GEMINI_API_KEY='...'   # bash/zsh\n\n  To inspect prompts without calling the API, use --dry-run.\n",
    );
    process.exitCode = 1;
    return;
  }

  // The anchor is generated first whenever it is in scope, because every other
  // image may chain its palette off it.
  const anchor = referenceAnchor();
  const anchorPath = path.join(PUBLIC, anchor.file.replace(/^\//, ""));
  const anchorInScope = !only && (!tier || tier === "brand");
  const anchorMissing = !(await exists(anchorPath));

  if (anchorInScope && (force || anchorMissing)) {
    queue = [anchor, ...queue.filter((e) => e.id !== anchor.id)];
  }

  console.log(`\nGemini batch — ${queue.length} image(s)\n`);
  const written = [];
  const skipped = [];
  let failed = 0;

  for (const [index, entry] of queue.entries()) {
    const dest = path.join(PUBLIC, entry.file.replace(/^\//, ""));
    const isAnchor = entry.id === REFERENCE_ANCHOR_ID;

    // Skip work already on disk, unless forced or this is the anchor we need.
    const mustGenerate = force || isAnchor || !(await exists(dest));
    if (!mustGenerate) {
      skipped.push(entry.id);
      console.log(`[${index + 1}/${queue.length}] ${entry.id} — exists, skipped`);
      continue;
    }

    // Only chain a reference once the anchor is actually on disk.
    const referencePath =
      entry.useReference && !isAnchor && (await exists(anchorPath)) ? anchorPath : undefined;

    await mkdir(path.dirname(dest), { recursive: true });

    console.log(
      `[${index + 1}/${queue.length}] ${entry.id} — ${entry.ratio} ${entry.size} ${entry.model}${referencePath ? " +ref" : ""}`,
    );

    try {
      const data = await withRetry(() => generate(entry, { referencePath, apiKey }), entry.id);
      await writeFile(dest, data);
      written.push({ id: entry.id, file: entry.file, size: data.length });
      console.log(`      ok  ${kb(data.length)}  ->  ${entry.file}`);
    } catch (error) {
      failed += 1;
      console.error(`      FAIL  ${entry.id}: ${error.message}`);
      process.exitCode = 1;
    }
  }

  console.log(`\n${"-".repeat(56)}`);
  console.log(
    `written ${written.length}   skipped ${skipped.length}   failed ${failed}`,
  );
  if (written.length) {
    const total = written.reduce((sum, w) => sum + w.size, 0);
    console.log(`\nNew weight: ${kb(total)} across ${written.length} file(s).`);
    console.log("Convert to WebP/AVIF and set explicit dimensions before shipping.");
  }
  console.log("\nReview every image against docs/INFORMATION-REQUIRED.md before it ships.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});