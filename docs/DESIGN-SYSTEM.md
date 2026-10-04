# Design system

All tokens live in one `@theme` block in `src/app/globals.css`. Change them there; components never hardcode a colour, radius or duration.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#0B1220` | Primary dark surfaces, hero, footer |
| `navy-800` / `navy-700` | `#111B2E` / `#1A2740` | Raised dark surfaces |
| `forest` | `#123B32` | Environmental identity sections |
| `emerald` | `#15966B` | Primary brand accent, primary buttons |
| `emerald-600` / `emerald-400` / `emerald-50` | | Hover, dark-surface accent, tint |
| `cyan` | `#4CC9E8` | Data, telemetry and digital infrastructure accents |
| `cyan-600` / `cyan-50` | | On-light text, tint |
| `offwhite` | `#F7F8F4` | Page background |
| `white` | `#FFFFFF` | Cards and content surfaces |
| `slate` / `slate-700` | `#536171` / `#3D4957` | Secondary and body text |
| `softgrey` | `#E5EAE7` | Borders and dividers |
| `amber` / `amber-50` | `#B4761A` | Caution callouts, validation errors, pilot statuses |

Gradients are used sparingly — only as low-opacity radial ambience behind dark sections.

### Contrast

Body text is `slate` (#536171) on `offwhite`/white — approximately 6.4:1, above AA for normal text. Secondary text on dark surfaces is white at 65–75% opacity over navy, which stays above 4.5:1. `emerald-600` is used instead of `emerald` for small text on light backgrounds.

## Typography

Single family: **Inter**, via `next/font/google` with `display: swap` and a CSS variable, so there is no render-blocking font request and no layout shift from a fallback swap.

| Role | Classes |
| --- | --- |
| Hero H1 | `text-4xl sm:text-5xl lg:text-[3.6rem]`, `font-semibold`, `tracking-[-0.03em]` |
| Page H1 | `text-4xl sm:text-5xl`, `tracking-[-0.03em]` |
| Section H2 | `text-3xl sm:text-4xl lg:text-[2.75rem]`, `tracking-[-0.02em]` |
| Card H3 | `text-lg`, `font-semibold`, `tracking-[-0.01em]` |
| Body | `text-base leading-relaxed` (`leading-[1.75]` in prose) |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.16em]` |

Long-form pages are constrained to `--container-prose` (44rem) for readable line length; everything else uses `--container-content` (72rem).

## Spacing, radii, elevation, motion

- Section rhythm: `tight` (py-14/16), `default` (py-16/24), `loose` (py-20/32) via `<Section spacing>`.
- Radii: `rounded-card` (1rem), `rounded-panel` (1.5rem), `rounded-pill`.
- Elevation: `--shadow-card`, `--shadow-card-hover`, `--shadow-panel` — soft and low-contrast; no hard drop shadows.
- Motion: `--duration-fast/base/slow` with `--ease-out-soft`. Everything is disabled under `prefers-reduced-motion`.

## Components

### Primitives (`src/components/ui/`)

| Component | Notes |
| --- | --- |
| `Container` | `content` or `prose` width |
| `Section` | Tone (`light`/`white`/`dark`/`forest`), spacing, `id`, `aria-labelledby` |
| `SectionHeading` | Eyebrow + heading + intro; `level` controls the tag so page outlines stay correct |
| `Eyebrow` | Uppercase section label |
| `Button` / `ButtonLink` | Variants `primary`, `secondary`, `ghost`, `onDark`, `onDarkGhost`; sizes `sm`/`md`/`lg`, all ≥ 44px tall at `md`+ |
| `PrimaryButton` / `SecondaryButton` | Named wrappers from the brief |
| `Card` / `CardIcon` / `LinkCard` | `LinkCard` uses a full-surface overlay link, so the accessible name is the title, not a repeated "learn more" |
| `StatusBadge` / `FocusBadge` | Text + icon + screen-reader description; never colour alone |
| `Callout` / `IllustrativeTag` | Note, caution and illustrative tones |
| `Icon` | Explicit lucide registry keyed by name, so content can reference icons as strings |
| `Reveal` | Scroll reveal via DOM attribute; no-ops under reduced motion |

### Layout (`src/components/layout/`)

`SiteHeader` (desktop dropdowns + mobile accordion panel), `SiteFooter`, `Breadcrumbs` (with structured data), `Logo`.

### Sections (`src/components/sections/`)

`HeroSection`, `HeroVisual`, `ValueGapSection`, `ApproachFlow`, `PlatformOverviewSection`, `EMobilitySection`, `ExpansionSection`, `ValueFlowSection`, `TrustSection`, `AudiencesSection`, `CtaSection`, `PageHero`, `LegalContent`.

`CtaSection` and `PageHero` are parameterised and reused across every inner page, which is why solution and industry pages stay consistent without duplicating layout.

### Diagrams

The hero composition, approach flow, value flow and platform architecture are built from ordinary flow elements rather than fixed-width SVG. They reflow to a vertical stack on small screens and remain readable to screen readers, with connectors marked `aria-hidden`.

## Brand assets

No official logo has been supplied. `Logo` renders a temporary text wordmark; setting `siteConfig.logoSrc` to a file under `/public` switches it to an image with no other change. The site ships with no photography — see `docs/INFORMATION-REQUIRED.md`.
