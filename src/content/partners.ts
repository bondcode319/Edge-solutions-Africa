/**
 * Partner ecosystem content.
 *
 * No partner logos, testimonials or claims of signed agreements appear on this
 * site. Every entry below describes the kind of conversation we welcome, not a
 * relationship that exists.
 */

export const partnersIntro = {
  headline: "The infrastructure only works as an ecosystem.",
  body: "Environmental economic infrastructure is not something one company builds alone. Measurement needs data sources. Verification needs accredited expertise. Rewards need funding and merchants. Finance needs institutions. We are building the connective layer and we welcome conversations with organisations working across it.",
  disclosure:
    "We do not publish partner logos, testimonials or references to agreements. Where a relationship is formalised and approved for publication, it will be described plainly and with the partner's consent.",
};

export type PartnerCategory = {
  id: string;
  name: string;
  icon: string;
  body: string;
  /** What collaboration could look like for both sides. */
  value: string[];
  interest: string;
};

export const partnerCategories: PartnerCategory[] = [
  {
    id: "e-mobility-operators",
    name: "E-mobility operators",
    icon: "BusFront",
    body: "Operators running electric buses, motorcycles or commercial fleets who want their operational data to support environmental reporting.",
    value: [
      "Structured environmental records built from data you already produce",
      "Reporting outputs without a manual reconstruction each cycle",
      "A route into reward and funding pathways as they become available",
    ],
    interest: "E-mobility",
  },
  {
    id: "project-developers",
    name: "Environmental project developers",
    icon: "Sprout",
    body: "Developers working on environmental projects that need better documentation, evidence management and reporting.",
    value: [
      "Evidence and documentation structured the way assessors expect",
      "A clearer path towards external verification processes",
      "Visibility of data gaps before they become a problem",
    ],
    interest: "Environmental MRV",
  },
  {
    id: "corporate-sponsors",
    name: "Corporate sponsors",
    icon: "Building2",
    body: "Organisations that want to fund measurable environmental activity and receive documentation they can stand behind.",
    value: [
      "Funding connected to specific, documented activity",
      "Reporting traceable to underlying records rather than headline figures",
      "Clear boundaries on what a contribution does and does not claim",
    ],
    interest: "Corporate sponsorship",
  },
  {
    id: "merchants",
    name: "Merchants",
    icon: "Store",
    body: "Businesses interested in participating in reward redemption once a programme is live, funded and operating under published terms.",
    value: [
      "Participation on terms agreed in advance",
      "Settlement through appropriately licensed providers",
      "Connection to a customer base engaged in environmental activity",
    ],
    interest: "Green rewards",
  },
  {
    id: "verifiers",
    name: "Accredited verifiers",
    icon: "BadgeCheck",
    body: "Verification bodies and assessors whose work depends on the quality and completeness of the evidence they receive.",
    value: [
      "Assessment packs assembled with evidence attached to activity periods",
      "Audit trails that answer who decided what, when and on what basis",
      "Methodology versioning that keeps historical assessments intact",
    ],
    interest: "Technology integration",
  },
  {
    id: "technology-providers",
    name: "Technology providers",
    icon: "PlugZap",
    body: "Telematics platforms, charging infrastructure operators, metering providers and payment providers.",
    value: [
      "A documented integration specification per partner",
      "Environmental reporting value added to data you already collect",
      "Clear scope on what data is used and for what purpose",
    ],
    interest: "Technology integration",
  },
  {
    id: "research",
    name: "Research organisations",
    icon: "FlaskConical",
    body: "Researchers working on environmental measurement methodology, data quality and environmental finance in African contexts.",
    value: [
      "Collaboration on methodology and data quality questions",
      "Access to structured, permissioned data for agreed research purposes",
      "Practical feedback loops between research and deployed infrastructure",
    ],
    interest: "Research or institutional collaboration",
  },
  {
    id: "financial-institutions",
    name: "Financial institutions",
    icon: "Landmark",
    body: "Institutions financing environmental projects that need documentation and reporting they can assess.",
    value: [
      "Documented projects with structured activity records",
      "Reporting designed for portfolio-level assessment",
      "Explicit separation between funding pathways and investment products",
    ],
    interest: "Project funding",
  },
  {
    id: "public-sector",
    name: "Public-sector and institutional stakeholders",
    icon: "Scale",
    body: "Public bodies and institutions with an interest in environmental reporting, transport electrification and environmental finance.",
    value: [
      "Aggregated environmental reporting from measurable activity",
      "Infrastructure designed to interoperate with recognised standards",
      "Engagement on regulatory and policy requirements before they are assumed",
    ],
    interest: "Research or institutional collaboration",
  },
];
