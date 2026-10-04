# Testing report

All results below were produced by actually running the checks on this codebase. Anything not verified is listed under "Not tested".

Environment: Windows 11, Node v24.18.0, npm 11.16.0, Next.js 16.3.6, React 19.2.8.

## Automated checks

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npx tsc --noEmit` | Clean — no errors |
| Lint | `npx eslint .` | Clean — 0 errors, 0 warnings |
| Unit/component tests | `npx vitest run` | **4 files, 32 tests, all passing** (5.4s) |
| Production build | `npx next build` (clean `.next`) | Succeeded — 33 pages prerendered, TypeScript checked during build |

### Test coverage by suite

**`src/tests/enquiry.test.ts` (9 tests)** — shared validation schema
accepts a complete enquiry; accepts a missing optional job title; rejects free email providers; rejects malformed email; requires explicit consent; rejects an over-short message; rejects an organisation type outside the published list; reports one error per field; trims whitespace.

**`src/tests/rate-limit.test.ts` (6 tests)** — allows up to the limit then blocks with a retry-after; tracks keys independently; opens a fresh window after expiry (fake timers); derives the client key from `x-forwarded-for`, `x-real-ip`, and falls back to a shared bucket.

**`src/tests/contact-route.test.ts` (7 tests)** — the API route, exercised directly
rejects invalid payloads with per-field errors; rejects non-JSON bodies; reports honestly when no delivery service is configured; accepts a honeypot submission quietly *without* calling the provider; sends via the provider when configured and includes the sender address; returns 502 and does **not** claim success when the provider fails; rate limits the sixth submission from one address with a `Retry-After` header.

**`src/tests/components.test.tsx` (10 tests)** — components and content integrity
status is conveyed as text not colour; unconfirmed status renders "Status to be confirmed"; the footer renders "To be confirmed" rather than inventing contact details; the footer states the carbon-credit and payment-licence boundaries; solution slugs are unique; every solution→solution and industry→solution reference resolves; draft articles carry no publication date; top-level navigation is six items; **every navigation and footer link points at a route that exists**.

## Manual browser testing (Chrome, dev server)

### Functional

| Check | Result |
| --- | --- |
| All internal links resolve | **35 unique internal URLs crawled from every top-level page — 0 broken** (all HTTP 200) |
| Unknown route | `/this-route-does-not-exist` → HTTP 404 with the custom not-found page |
| `GET /api/contact` | 405, as intended |
| `sitemap.xml` | 200, 21 URLs, draft articles correctly excluded |
| `robots.txt` | 200, disallows `/api/`, points at the sitemap |
| Desktop dropdown navigation | Opens on hover and on click, closes on Escape, outside click and route change |
| Mobile navigation | Hamburger toggles `aria-expanded`, panel unhides, background scroll locks, accordions expand |
| Architecture explorer | Click selects; **ArrowDown twice moved layer 1 → 3 with focus following selection and the panel updating** |
| Insights filters | Category filter → "1 article in E-mobility"; search "zzzz" → "0 articles…" plus the empty state with a clear-filters action |
| Contact form — empty submit | Blocked client-side; 7 fields marked `aria-invalid` with per-field messages and a focused alert summary |
| Contact form — valid submit | Accepted; success panel read: *"Your enquiry was validated and recorded on the server, but no delivery service is configured on this deployment, so it has not been emailed to anyone yet."* — i.e. it did not claim delivery |
| `?interest=` deep link | `/contact?interest=Green%20rewards` preselected "Green rewards" in the area-of-interest select |
| Honeypot | Rendered `display: none` |
| Console | No errors or warnings on a clean page load and navigation |

### Responsive

Measured in same-origin iframes at fixed widths (the Chrome window could not be resized while maximised), checking `scrollWidth − clientWidth` and any element wider than the viewport.

| Width | Routes | Result |
| --- | --- | --- |
| 360px | `/`, `/platform`, `/solutions/green-rewards`, `/contact` | **0px overflow, no oversized elements** |
| 390px | `/`, `/about`, `/industries/e-mobility`, `/insights`, article, `/partners`, `/privacy` | 0px overflow |
| 768px | same 7 routes | 0px overflow |
| 1024px | same 7 routes | 0px overflow |

Visual check at 390px: hamburger replaces the desktop nav, CTAs stack full width, hero diagram reflows vertically, type scale steps down correctly.

### Accessibility

Automated sweep across 12 routes (`/`, `/platform`, `/about`, `/solutions`, a solution page, `/industries`, an industry page, `/insights`, an article, `/partners`, `/contact`, `/terms`):

| Check | Result across all 12 routes |
| --- | --- |
| Exactly one `<h1>` | ✅ 1 per page |
| Heading-level skips | ✅ none |
| Images without `alt` | ✅ 0 |
| Form controls without a label | ✅ 0 |
| Buttons without an accessible name | ✅ 0 |
| Links without an accessible name | ✅ 0 |
| `<main>` / `<footer>` landmarks | ✅ 1 each |
| Unique title, meta description, canonical | ✅ all present and distinct |

Also verified by inspection and interaction: skip link to `#main-content`; visible focus ring on every interactive element (light ring on dark surfaces); roving `tabIndex` on the tablist; status badges carry text and an icon plus a screen-reader description; form errors linked via `aria-describedby`; live regions on the error summary, the insights result count and the copy-link confirmation; `prefers-reduced-motion` disables transitions and short-circuits the reveal observer.

## Not tested

Stated plainly so nothing here is over-claimed:

- **No axe-core or Lighthouse run.** The accessibility sweep above is a custom structural check, not a full automated audit, and no performance score has been measured. Both should be run against a deployed build.
- **No end-to-end test runner** (Playwright/Cypress). Browser testing was performed interactively and is recorded above, not automated.
- **No real email delivery test.** The Resend path is covered by unit tests with a mocked `fetch`; it has never run against the live API because no credentials exist.
- **No cross-browser testing.** Chrome only. Safari and Firefox have not been checked.
- **No testing on physical devices**; responsive results come from iframe viewport measurement.
- **No visual regression baseline.**
- **Rate limiting is not tested across instances**, because the in-memory limiter does not work across instances (see `docs/DEPLOYMENT.md`).

## Reproducing

```bash
npm run typecheck && npm run lint && npm test && npm run build
```
