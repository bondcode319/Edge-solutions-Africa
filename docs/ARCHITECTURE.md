# Technical architecture

## Rendering model

Next.js App Router. Every page is a React Server Component and is statically prerendered at build time. Client components are used only where interaction requires them:

| Client component | Why it is a client component |
| --- | --- |
| `layout/SiteHeader` | Dropdown state, mobile panel, scroll state, Escape handling |
| `ui/Reveal` | IntersectionObserver-based scroll reveal |
| `interactive/PlatformArchitecture` | Tablist selection and roving focus |
| `interactive/ActivityJourney` | Step selection |
| `interactive/InsightsBrowser` | Category filter and search |
| `interactive/ShareLinks` | Clipboard copy |
| `forms/ContactForm` | Form state, client validation, fetch |

The only dynamic route is `POST /api/contact`, which is `force-dynamic` and runs on the Node runtime.

## Route inventory

All routes specified in the brief are implemented. None is deferred.

| Route | Rendering | Notes |
| --- | --- | --- |
| `/` | Static | 10 sections + CTA |
| `/about` | Static | Company story; founder/history sections deliberately omitted |
| `/platform` | Static | Architecture explorer, components, illustrative journey, blockchain position, technical notes |
| `/solutions` | Static | Overview grid |
| `/solutions/environmental-mrv` | SSG | |
| `/solutions/e-mobility` | SSG | |
| `/solutions/environmental-data` | SSG | |
| `/solutions/green-rewards` | SSG | |
| `/solutions/project-funding` | SSG | |
| `/solutions/payments-commerce` | SSG | |
| `/industries` | Static | |
| `/industries/e-mobility` | SSG | |
| `/industries/renewable-energy` | SSG | |
| `/industries/waste-recycling` | SSG | |
| `/industries/clean-cooking` | SSG | |
| `/partners` | Static | Includes partnership enquiry form |
| `/insights` | Static | Featured article, filters, search |
| `/insights/[slug]` | SSG | 7 draft articles |
| `/contact` | Static | Enquiry form |
| `/privacy`, `/terms`, `/cookies` | Static | Shared `LegalContent` layout |
| `/api/contact` | Dynamic | Enquiry endpoint |
| `/sitemap.xml`, `/robots.txt` | Static | Generated from the content layer |
| `not-found` | Static | 404 page with suggested routes |

## Content layer

Content is typed TypeScript modules rather than a CMS. For a first release this gives type safety, zero runtime cost and no external dependency; it is straightforward to swap for a CMS later because pages already read from a module boundary rather than inline copy.

Derived automatically from the content layer:

- `generateStaticParams` for solutions, industries and articles
- Navigation dropdown panels and footer columns (`src/config/site.ts`)
- `sitemap.xml` (draft articles excluded, matching their `noindex`)

## Enquiry pipeline

```
ContactForm (client)
  → zod parse (fast feedback)
  → POST /api/contact
      → rate limit by client key (5 per 10 minutes)
      → zod parse again (server is the authority)
      → honeypot check → accept quietly, do not deliver
      → delivery configured?  no → log server-side, respond delivery: "logged"
                              yes → POST to Resend; non-2xx → 502, no success claim
  → success state repeats the server's delivery outcome verbatim
```

The success state is never shown on a client-side assumption: it renders only after the API confirms acceptance, and the message distinguishes "sent" from "recorded but not delivered".

### Security properties

- Secrets (`RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`) are read only in server code. `src/lib/enquiry-config.ts` imports `server-only`, so an accidental client import fails the build.
- Provider error details are logged server-side and never returned to the client.
- The endpoint rejects non-POST with 405 and is disallowed in `robots.txt`.
- Input is length-bounded on every field, so a large body cannot be echoed into an email.
- No personal data is placed in URLs. The only query parameter used is `?interest=`, which carries a category name.

### Rate limiting caveat

`src/lib/rate-limit.ts` is an in-memory fixed-window limiter. It is per-instance: on a multi-instance or serverless deployment it does not limit across instances. Replace the store with Redis/Upstash/Vercel KV before relying on it in production — the interface is a single `rateLimit(key, options)` call, so the change is localised.

## Design tokens

Tailwind v4 CSS-first configuration. All colour, type, radii, shadow, container and motion tokens are declared in one `@theme` block in `src/app/globals.css`; components consume them as utilities (`bg-navy`, `rounded-card`, `shadow-[var(--shadow-card)]`). There is no `tailwind.config.js` to keep in sync.

## Accessibility architecture

- Skip link to `#main-content`; one `<main>`, one `<h1>` per page.
- The architecture explorer is a proper ARIA tablist with roving `tabIndex` and arrow/Home/End keys.
- Status is never colour-only: every `StatusBadge`/`FocusBadge` carries a text label plus a distinct icon, and exposes the fuller meaning to screen readers.
- Motion is additive. `Reveal` toggles a DOM attribute, and `prefers-reduced-motion` disables transitions globally and short-circuits the observer.
- Form errors are tied to inputs with `aria-describedby`/`aria-invalid`, and the error summary is an `aria-live` alert that receives focus.

## Analytics

`src/lib/analytics.ts` is an integration point, not a provider. Events are already instrumented (CTA clicks, enquiry submissions, interest selection, article opens, architecture and journey interactions). With no provider configured, calls are no-ops. No third-party script is bundled.
