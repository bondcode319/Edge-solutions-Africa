# Deployment

## Build

```bash
npm ci
npm run build
npm run start        # serves the production build
```

The build outputs 33 prerendered pages plus one dynamic route (`/api/contact`). Node 20+ is required; the build was verified on Node 24.18.0.

## Environment variables

See `.env.example` for the full annotated list. None is required for the site to build or run — every unset value degrades to an honest placeholder.

### Public (bundled into the browser — never put a secret here)

| Variable | Effect if unset |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Falls back to `https://www.edgesolutions.africa`. **Set this per environment** or canonicals, Open Graph URLs and the sitemap will point at production from a staging build. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email shows "To be confirmed" |
| `NEXT_PUBLIC_CONTACT_ADDRESS` | Address shows "To be confirmed" |
| `NEXT_PUBLIC_CONTACT_PHONE` | Telephone shows "To be confirmed" |
| `NEXT_PUBLIC_LINKEDIN_URL` | Footer shows "Social profiles to be confirmed" instead of a link |
| `NEXT_PUBLIC_LEGAL_REVIEWED` | Legal pages display an "awaiting legal review" notice |

### Server-only (secrets)

| Variable | Effect if unset |
| --- | --- |
| `RESEND_API_KEY` | Enquiries are validated and logged, not emailed |
| `ENQUIRY_TO_EMAIL` | as above |
| `ENQUIRY_FROM_EMAIL` | as above |

All three must be set together. The form then tells the visitor the enquiry was sent; with any missing, it says plainly that nothing was emailed.

`src/lib/enquiry-config.ts` imports `server-only`, so importing it from a client component fails the build rather than leaking configuration.

## Pre-launch checklist

1. **Set `NEXT_PUBLIC_SITE_URL`** to the real domain for each environment (staging should differ from production).
2. **Configure enquiry delivery** and send a live test enquiry end to end. Verify it arrives and that `reply_to` is the enquirer's address.
3. **Confirm the sending domain** is verified with the mail provider (SPF/DKIM), or enquiries will be filtered.
4. **Replace the rate limiter** if deploying to more than one instance or to serverless — the current one is per-instance in memory (`src/lib/rate-limit.ts`). A shared store (Redis, Upstash, Vercel KV) behind the same `rateLimit(key, options)` interface is a contained change.
5. **Supply the logo** and set `siteConfig.logoSrc`; the wordmark is explicitly temporary.
6. **Complete legal review** of `/privacy`, `/terms`, `/cookies`, then set `NEXT_PUBLIC_LEGAL_REVIEWED=true`. See `docs/LEGAL-REVIEW.md`.
7. **Fill in the outstanding company information** in `docs/INFORMATION-REQUIRED.md`.
8. **Publish or remove the draft articles.** They are `noindex` and excluded from the sitemap while `status: "draft"`.
9. **Decide on analytics.** See `docs/ANALYTICS.md`. If a provider is added, update `/cookies` and add consent handling where required.
10. **Run a Lighthouse and axe audit** against the deployed build — neither has been run (see `docs/TESTING.md`).

## Hosting notes

- Vercel is the lowest-friction target for this stack: static pages served from the edge, `/api/contact` as a function. Replace the rate limiter first (point 4).
- Any Node host works via `npm run build && npm run start`.
- A fully static export is **not** possible without removing the enquiry endpoint, since `/api/contact` requires a server runtime.

## Security headers

None are configured yet. Before launch, add a CSP, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff` and HSTS — either at the CDN/host or via `headers()` in `next.config.ts`. The site loads no third-party scripts, so a strict CSP is realistic (the only inline scripts are the JSON-LD blocks, which need a nonce or hash).
