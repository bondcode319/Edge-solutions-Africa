# Analytics

No analytics provider is bundled, loaded or configured. `src/lib/analytics.ts` is an integration point: events are already instrumented across the site, and calls are no-ops until a transport exists (in development they log to the console with an `[analytics:no-provider]` prefix).

This was deliberate. Wiring a provider without credentials would either fabricate a working integration or ship a third-party script the company has not chosen.

## Events already instrumented

| Event | Fired from | Properties |
| --- | --- | --- |
| `cta_click` | Header CTA | `location`, `label` |
| `enquiry_submitted` | Contact form, after the server accepts | `interest`, `delivery` (`email` or `logged`) |
| `interest_selected` | Area-of-interest select | `interest` |
| `article_opened` | Insights card links | `slug` |
| `architecture_layer_selected` | Platform architecture explorer | `layer` |
| `journey_step_selected` | Illustrative activity journey | `step` |

`solution_viewed` is declared in the event union for page-level instrumentation but is not yet fired.

## Adding a provider

1. Choose a privacy-conscious provider (cookieless options avoid a consent banner entirely).
2. Load its script in `src/app/layout.tsx`, or in a small client component, and assign a sink:

```ts
window.edgeAnalytics = (event, properties) => provider.track(event, properties);
```

`trackEvent` picks it up automatically — no component changes are needed.

3. Update `/cookies` (`src/content/legal.ts`) to describe what the provider collects.
4. If the provider sets non-essential storage, add consent handling and only assign `window.edgeAnalytics` after consent is given.

## Rules

- Never pass personal data in `properties`. The instrumented events carry category names, slugs and labels only — no names, emails, organisations or message content.
- Never put personal data in a URL, so it cannot reach a provider via the page path or query string.
- Respect `Do Not Track` and any applicable consent requirement before initialising the provider.
