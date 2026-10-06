# Known limitations and recommended next phase

## Known limitations

| Limitation | Impact | Where |
| --- | --- | --- |
| In-memory rate limiter | Does not limit across instances; ineffective on serverless or multi-instance deployments | `src/lib/rate-limit.ts` |
| No security headers configured | No CSP, HSTS or referrer policy yet | `next.config.ts` / host |
| No Lighthouse or axe audit run | Performance and full a11y conformance unmeasured | see `docs/TESTING.md` |
| Chrome-only browser testing | Safari and Firefox unverified | see `docs/TESTING.md` |
| No end-to-end test suite | Interaction coverage is manual and recorded, not automated | — |
| No photography | Visual identity rests entirely on designed diagrams | `docs/INFORMATION-REQUIRED.md` |
| AI imagery prepared but not generated | 33 images are specified and tested in `src/content/images.ts`; none generated. Needs an API key and human review | `public/images/README.md` |
| No Open Graph image | Social shares render without an image | `docs/INFORMATION-REQUIRED.md` |
| Content layer is code, not a CMS | Non-technical editors need a developer to publish | `src/content/` |
| Articles are drafts | `noindex` and excluded from the sitemap until published | `src/content/insights.ts` |
| Enquiries are not stored | Delivery is by email only; no CRM or database record | `src/app/api/contact/route.ts` |
| Single language | No i18n scaffolding | — |

## Recommended next phase

In the order I would do them.

### 1. Make the site launch-ready (days)
Supply the logo, contact details and legal entity; configure enquiry delivery and send a live test; set `NEXT_PUBLIC_SITE_URL`; add security headers; replace the rate limiter if deploying to serverless; run Lighthouse and axe and fix what they surface.

### 2. Complete the legal pass (days, in parallel)
Work through `docs/LEGAL-REVIEW.md`, particularly the Green Points, project funding and payments positions. Set `NEXT_PUBLIC_LEGAL_REVIEWED=true` once approved.

### 3. Make content editable without a deploy (1–2 weeks)
Move `src/content/` behind a CMS (Sanity, Contentful or a git-based option such as Keystatic). Pages already read from a module boundary, so this is a data-source swap rather than a rewrite. Start with insights and status labels, which change most often.

### 4. Add the proof layer (2–4 weeks)
The site currently explains the infrastructure well but shows no evidence of it working. As soon as company-approved material exists: a first pilot write-up, a named methodology or standard the company works with, and — if any operator relationship is agreed and approved — a case study. This is the single biggest credibility gain available.

### 5. Automate interaction testing (1 week)
Add Playwright covering the enquiry form (including the honeypot and failure paths), the architecture explorer keyboard flow, mobile navigation, and axe-core assertions per route. Run in CI alongside typecheck, lint, tests and build.

### 6. Prepare for the product surface (later)
When operator-facing functionality exists, the marketing site and the application should be separated at the routing layer before `/platform` starts to imply a login. Plan an auth boundary and a `/docs` or partner-portal area rather than growing this site into one.
