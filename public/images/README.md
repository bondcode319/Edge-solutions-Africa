# Generated imagery

Files in this tree are **produced by AI**, not photographed or commissioned. The
manifest that defines them is `src/content/images.ts`.

## Generating them

```bash
export GEMINI_API_KEY="..."       # PowerShell: $env:GEMINI_API_KEY="..."

npm run images:list               # what is planned
npm run images:preview            # print the exact prompts, write nothing
npm run images:generate           # generate everything not already on disk
```

Useful flags: `--only <id>`, `--tier brand|home|solutions|industries|insights|company`,
`--force` to redo existing files.

The run is **resumable** — existing files are skipped, so re-running costs
nothing. Start with the anchor:

```bash
npm run images:generate -- --only hero-field-dark
```

Everything else passes that file as a reference image so the whole set shares one
palette. **Review it before running the batch.**

## The site works without these files

`<Figure>` and `<SectionArt>` render nothing when a file is absent. Until this
tree is populated the site is exactly as it was — diagrams only, no broken
images, no empty boxes. Add images one at a time.

## Editorial rules — read before shipping any image

Every prompt is written against `docs/INFORMATION-REQUIRED.md`. Generated imagery
is the easiest way to accidentally assert something the company has not
confirmed. Specifically:

- **No identifiable people, fleets, facilities or operators.** A photo of a bus
  reads as an operator relationship, whether or not that is intended.
- **No readable text, numbers, dashboards or charts.** A plausible figure in an
  image reads as a published result.
- **No currency, tokens, credit instruments or award badges.** The site
  deliberately separates platform records, carbon credits and Green Points.
- **Every content image is labelled "Illustrative"** on the page, automatically.

`src/tests/components.test.tsx` enforces the prompt-level rules. It cannot check
the output — **a human must review each generated image before it ships.**

## Before committing

- Convert PNG to WebP/AVIF. A 33-image batch is 15–25 MB as PNG.
- Confirm dimensions are explicit to avoid layout shift.
- Check the two vehicle images (`home-e-mobility`, `industry-e-mobility`) most
  carefully — they carry the highest risk of implying a customer relationship.

## Not image-generation work

`icon-concept.png` is **art direction, not a deliverable.** A logo must be
hand-drawn vector SVG. Set `siteConfig.logoSrc` once a real mark exists.