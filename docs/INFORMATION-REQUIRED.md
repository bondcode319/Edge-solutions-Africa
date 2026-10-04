# Company information and assets still required

Nothing in this list was invented. Where a detail was missing, the site either omits the section or renders an explicit "To be confirmed" state, and this file records what is needed to replace it.

## Blocking for launch

| Item | Where it is used | Current state |
| --- | --- | --- |
| **Official logo** (SVG preferred, plus a light/dark variant) | Header, footer, favicon, Open Graph image | Temporary text wordmark. Set `siteConfig.logoSrc` |
| **Enquiry inbox** | Enquiry delivery | Not configured — form states nothing is emailed |
| **Public contact email** | Footer, contact page | "To be confirmed" |
| **Registered office / postal address** | Footer, contact page | "To be confirmed" |
| **Telephone number** (if the company wants one published) | Footer, contact page | "To be confirmed" |
| **Legal entity name, registration number and jurisdiction** | Footer copyright, legal pages | Not stated |
| **Data controller identity and applicable data protection law** | Privacy notice | Marked to be confirmed |
| **Governing law for the website terms** | Terms | Marked to be confirmed |
| **Production domain** | Canonicals, sitemap, Open Graph | Defaults to `www.edgesolutions.africa` — confirm before launch |

## Needed to strengthen the site

| Item | Why |
| --- | --- |
| **Photography / imagery** — environmental activity, e-mobility, operations | The site ships with designed diagrams and no photography. Stock imagery of an unrelated fleet was deliberately avoided because it implies an operator relationship that does not exist. Licensed or owned imagery would materially lift the hero and industry pages |
| **Open Graph share image** (1200×630) | Social metadata currently has no image |
| **Confirmed development status per capability** | Statuses were set conservatively (`in development` for MRV/data, `concept` for rewards/funding/payments). Confirm or correct in `src/content/platform.ts`, `solutions.ts` |
| **LinkedIn URL** | Footer link is hidden until supplied |
| **Article publication approval, dates and authorship** | All 7 articles are drafts, undated, bylined to the company. No individual author is claimed |
| **Approved Green Points terms** | The rewards page describes a concept. Reward rates, redemption terms and any transferability need approved wording |
| **Payment provider names and markets** | The payments page describes integrations generically because no provider has been confirmed |
| **Methodologies and standards the company intends to work with** | Named standards would strengthen the MRV and industry pages, but none has been confirmed |

## Deliberately omitted (do not add without source material)

These sections are absent because the information does not exist in any supplied material. Adding them would require confirmed facts:

- Founder or team biographies, photographs, team size
- Company history, incorporation date, funding announcements, awards
- Customer names, partner logos, testimonials, case studies
- Any emissions-reduction figure, environmental impact statistic, usage or platform metric
- Any claim of licence, regulatory approval, accreditation or certification
- Any statement that a fleet, operator or institution has partnered with the company

## Where to change each thing

| Item | File |
| --- | --- |
| Contact details, social, domain, legal-review flag | Environment variables — `.env.example` |
| Logo asset | `src/config/site.ts` → `logoSrc` |
| Navigation, CTAs, footer columns | `src/config/site.ts` |
| Capability statuses | `src/content/platform.ts`, `src/content/solutions.ts` |
| Activity category status | `src/content/industries.ts` → `focus`, `developmentNote` |
| Article publication | `src/content/insights.ts` → `status`, `publishedAt` |
| Legal wording | `src/content/legal.ts` |
