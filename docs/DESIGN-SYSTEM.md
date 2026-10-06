# Design system

All tokens live in one `@theme` block in `src/app/globals.css`. Change them there; components never hardcode a colour, radius or duration.

The visual direction is Nokia-informed: a single decisive blue, one cyan accent, large light display type, crisp 4/8px geometry and short `.3s ease-in-out` motion. The reference values below were taken from nokia.com's own production stylesheet.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `brand` | `#005AFF` | Primary brand accent, primary buttons, active nav |
| `brand-600` | `#004BD6` | Primary hover, on-light brand text |
| `brand-700` | `#124191` | Muted brand text, development statuses |
| `brand-800` | `#052253` | Raised dark surfaces, panels, CTA gradient |
| `brand-900` | `#001135` | Primary dark surfaces — hero, page footer, featured cards |
| `accent` | `#00C9FF` | Cyan accent: on-dark highlights, illustrative labels, links on dark |
| `accent-soft` | `#99C2F8` | Secondary accent on dark surfaces |
| `ink` | `#0A0B0D` | Primary body text |
| `ink-soft` | `#1D1E20` | Strong secondary text |
| `muted` | `#6E6E6E` | De-emphasised text, eyebrows |
| `muted-soft` | `#4D5766` | Body and paragraph copy |
| `line` | `#D4D4D4` | Borders, dividers, control outlines |
| `line-soft` | `#BEC8D2` | Secondary borders |
| `surface` | `#FFFFFF` | Cards, header, content surfaces |
| `surface-alt` | `#EDF2F5` | Alternating section band, tinted callouts |
| `surface-muted` | `#F4F4F4` | Neutral chips, hover fills |
| `positive` / `caution` | `#00875A` / `#B26A00` | Available status; pilot and validation states |

Gradients are used sparingly — only as low-opacity radial ambience behind dark sections.

### Legacy aliases

The former token names (`navy`, `forest`, `emerald`, `cyan`, `offwhite`, `slate`, `softgrey`, `amber`) are retained in `@theme` as aliases onto the new palette, so historical utility classes still resolve. New code should use the semantic names above; the aliases can be deleted once no component references them.

### Contrast

Body text is `muted-soft` (#4D5766) on `surface`/`surface-alt` — above 7:1. Secondary text on dark surfaces is white at 65–75% opacity over `brand-900`, which stays above 4.5:1. `brand-600` is used instead of `brand` for small text on light backgrounds. Status colours are always paired with an icon and a text label, never colour alone.

## Typography

Two families, both via `next/font/google` with `display: swap`, so there is no render-blocking font request and no fallback layout shift:

- **Inter** (`--font-inter`) — body and UI copy.
- **Outfit** (`--font-display`) — headlines. Nokia sets its headlines in Nokia Pure Headline (Light/Ultralight), a proprietary family; Outfit is the closest openly licensed match — geometric with wide apertures and a light weight that holds at large sizes. Swapping in a licensed Nokia Pure is a one-line change in `src/app/layout.tsx`.

Headings default to `font-display` at weight **300** via the base layer, giving the light, airy display treatment. Weight rises to 400–500 only at small sizes, where a light weight would be hard to read.

| Role | Classes |
| --- | --- |
| Hero H1 | `font-display text-4xl font-light sm:text-5xl lg:text-[4rem]`, `tracking-[-0.035em]` |
| Page H1 | `text-4xl sm:text-5xl`, `font-light`, `tracking-[-0.03em]` |
| Section H2 | `text-3xl sm:text-4xl lg:text-[2.75rem]`, `font-light`, `tracking-[-0.028em]` |
| Card H3 | `text-lg font-normal` |
| Body | 18px base (`--text-body`), `leading-[1.65]` |
| Eyebrow | `.eyebrow` utility — 12px, weight 500, `tracking-[0.14em]`, uppercase |

Long-form pages are constrained to `--container-prose` (44rem) for readable line length; everything else uses `--container-content` (86rem / 1376px).

## Spacing, radii, elevation, motion

- Section rhythm: `tight` (py-14/20), `default` (py-20/28), `loose` (py-24/36) via `<Section spacing>`.
- Radii are deliberately small and crisp: `rounded-xs` (4px), `rounded-card` (8px), `rounded-panel` (12px). Pills are reserved for genuinely pill-shaped status chips.
- Elevation is restrained — `--shadow-card`, `--shadow-card-hover`, `--shadow-panel`, `--shadow-nav`. Borders carry most of the structural work; there are no heavy drop shadows or glows on buttons.
- Motion: `--duration-fast` (150ms), `--duration-base` (300ms), `--duration-slow` (500ms) with `--ease-standard` for interaction and `--ease-out-soft` for entrances. `fade-in-up` (32px travel) mirrors the reference motion. Everything is disabled under `prefers-reduced-motion`.

## Components

### Primitives (`src/components/ui/`)

| Component | Notes |
| --- | --- |
| `Container` | `content` or `prose` width |
| `Section` | Tone (`light`/`white`/`dark`/`forest`), spacing, `id`, `aria-labelledby` |
| `SectionHeading` | Eyebrow + brand rule + heading + intro; `level` controls the tag so page outlines stay correct |
| `Eyebrow` | Uppercase section label (`.eyebrow` utility) |
| `Button` / `ButtonLink` | Variants `primary`, `secondary`, `ghost`, `onDark`, `onDarkGhost`; sizes `sm`/`md`/`lg`, all ≥ 44px tall at `md`+ |
| `PrimaryButton` / `SecondaryButton` | Named wrappers from the brief |
| `Card` / `CardIcon` / `LinkCard` | `LinkCard` uses a full-surface overlay link, so the accessible name is the title, not a repeated "learn more" |
| `StatusBadge` / `FocusBadge` | Text + icon + screen-reader description; never colour alone |
| `Callout` / `IllustrativeTag` | Note, caution and illustrative tones |
| `Icon` | Explicit lucide registry keyed by name, so content can reference icons as strings |
| `Reveal` | Scroll reveal via DOM attribute; no-ops under reduced motion |
| `Figure` / `SectionArt` / `HeroField` | Renders an image from the manifest, or **nothing** when the file is absent. Always sets `alt` from the manifest and adds an "Illustrative" label when the entry is marked illustrative. `Figure` is client-safe; `SectionArt`/`HeroField` live in `src/components/ui/SectionArt.tsx` because they check the filesystem at build time |

### Layout (`src/components/layout/`)

`SiteHeader` (desktop dropdowns + mobile accordion panel), `SiteFooter`, `Breadcrumbs` (with structured data), `Logo`.

### Sections (`src/components/sections/`)

`HeroSection`, `HeroVisual`, `ValueGapSection`, `ApproachFlow`, `PlatformOverviewSection`, `EMobilitySection`, `ExpansionSection`, `ValueFlowSection`, `TrustSection`, `AudiencesSection`, `CtaSection`, `PageHero`, `LegalContent`.

`CtaSection` and `PageHero` are parameterised and reused across every inner page, which is why solution and industry pages stay consistent without duplicating layout.

### Diagrams

The hero composition, approach flow, value flow and platform architecture are built from ordinary flow elements rather than fixed-width SVG. They reflow to a vertical stack on small screens and remain readable to screen readers, with connectors marked `aria-hidden`.

## Brand assets

No official logo has been supplied. `Logo` renders a temporary text wordmark; setting `siteConfig.logoSrc` to a file under `/public` switches it to an image with no other change. The site ships with no photography — see `docs/INFORMATION-REQUIRED.md`.
