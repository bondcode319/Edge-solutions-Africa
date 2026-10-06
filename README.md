# Edge Solutions Africa — corporate website

Corporate website and environmental technology platform site for **Edge Solutions Africa**, a company building environmental economic infrastructure: digital infrastructure connecting real-world environmental activity with trusted data, verification, rewards, project funding and commerce.

> Turning verified environmental activity into economic utility.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4, CSS-first design tokens in `src/app/globals.css` |
| Icons | lucide-react, via an explicit registry (`src/components/ui/Icon.tsx`) |
| Validation | Zod, one schema shared by client and server |
| Tests | Vitest + Testing Library (jsdom) |
| Content | Typed modules under `src/content/` |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs with no variables set
npm run dev                  # http://localhost:3000
```

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest, watch mode |
| `npm run images:list` | List the images in the manifest |
| `npm run images:preview` | Print the exact generation prompts, write nothing |
| `npm run images:generate` | Generate missing imagery via the Gemini API |

## Imagery

The site is designed to be complete without photography: every visual is a
designed diagram, and the layout degrades cleanly to that if an image is absent.

A set of **33 abstract images** is specified in `src/content/images.ts` — hero
fields, social cards, section art, solution and industry visuals, and article
covers. To generate them:

```bash
export GEMINI_API_KEY="..."     # PowerShell: $env:GEMINI_API_KEY="..."
npm run images:generate
```

Generated files land in `public/images/` and are git-ignored. Prompts are written
against the editorial rules below — no identifiable operators, no readable
figures, no currency — and `src/tests/components.test.tsx` enforces those rules at
the prompt level. **A human must still review every generated image before it
ships.** See `public/images/README.md`.

## Project structure

```
src/
  app/                  Routes (App Router)
    api/contact/        Enquiry endpoint
    [route]/page.tsx    One file per route; pages compose sections
  components/
    ui/                 Primitives: Button, Card, Section, StatusBadge, Callout, Icon, Reveal
    layout/             SiteHeader, SiteFooter, Breadcrumbs, Logo
    sections/           Page sections (hero, value gap, approach flow, CTA, …)
    interactive/        Client components: architecture explorer, activity journey, insights browser, share links
    forms/              ContactForm
  config/site.ts        Company details, navigation, CTAs, footer, legal links
  content/              Typed content: platform, solutions, industries, home, partners, insights, about, legal, status
  lib/                  cn, seo, enquiry schema, rate limiting, analytics integration point
  tests/                Vitest suites
docs/                   Architecture, design system, testing report, deployment, outstanding items
```

## Editing content without touching components

Nearly all copy lives in `src/content/` and `src/config/site.ts`:

- **Company details, navigation, CTAs, contact placeholders** → `src/config/site.ts`
- **Platform layers, components, technical notes, blockchain position** → `src/content/platform.ts`
- **Solution pages** → `src/content/solutions.ts` (adding an entry creates the route and its cards)
- **Activity categories** → `src/content/industries.ts` (`hasDetailPage: true` gives it a route)
- **Homepage narrative, principles, audiences** → `src/content/home.ts`
- **Articles** → `src/content/insights.ts`
- **Legal pages** → `src/content/legal.ts`
- **Development status vocabulary** → `src/content/status.ts`

Adding a solution or an industry requires no layout work: `generateStaticParams` picks up the new slug and the navigation and sitemap follow.

## Editorial rules this site is built to follow

These are enforced by how the content layer is structured, and checked in `src/tests/components.test.tsx`:

- No invented customers, partnerships, logos, testimonials, licences, funding, team details or environmental statistics.
- Every capability carries a development status; nothing at concept stage is described as available.
- Platform records, carbon credits and Green Points are defined separately and never conflated.
- Green Points are never described as cash, transferable, or as an offset.
- No token sale, token price or digital-asset investment content.
- Demonstration data is labelled illustrative or simulated, at every value.
- Unconfirmed contact details render as "To be confirmed" rather than a placeholder that reads as real.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — technical architecture and route inventory
- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) — tokens and components
- [`docs/TESTING.md`](docs/TESTING.md) — what was tested and the actual results
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — build, environment and deployment requirements
- [`docs/INFORMATION-REQUIRED.md`](docs/INFORMATION-REQUIRED.md) — company information and assets still needed
- [`docs/LEGAL-REVIEW.md`](docs/LEGAL-REVIEW.md) — claims and content requiring review before launch
- [`docs/ANALYTICS.md`](docs/ANALYTICS.md) — the analytics integration point
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — known limitations and recommended next phase
