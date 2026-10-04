import type { DevelopmentStatus } from "./status";

/**
 * The five-layer platform model and the infrastructure components that sit
 * inside it. This is the canonical description used by the homepage, the
 * platform page and the interactive architecture explorer.
 */

export type PlatformLayer = {
  id: string;
  index: number;
  name: string;
  shortName: string;
  summary: string;
  purpose: string;
  /** Illustrative examples of what this layer handles. Never live data. */
  examples: string[];
  /** How this layer hands off to the next one. */
  connectsTo: string | null;
  relatedLinks: { label: string; href: string }[];
};

export const platformLayers: PlatformLayer[] = [
  {
    id: "real-world-activity",
    index: 1,
    name: "Real-world activity",
    shortName: "Activity",
    summary:
      "Environmental activity that happens in the physical world and can produce measurable data.",
    purpose:
      "Everything starts with something real: a bus completing a route, a solar system generating energy, waste diverted from a dumpsite, a household cooking on cleaner fuel. If an activity cannot be observed and measured, it cannot be verified, and it should not be claimed.",
    examples: [
      "Electric buses operating scheduled routes",
      "Electric motorcycles in commercial use",
      "Solar generation at a site or household",
      "Clean cooking activity",
      "Waste collection, recovery and recycling",
    ],
    connectsTo:
      "Activity produces operational signals — trips, energy drawn, weights collected, hours run — which flow into the data and verification layer.",
    relatedLinks: [
      { label: "Industries and activity categories", href: "/industries" },
      { label: "E-mobility operators", href: "/industries/e-mobility" },
    ],
  },
  {
    id: "data-and-verification",
    index: 2,
    name: "Data and verification",
    shortName: "Data and MRV",
    summary:
      "Capturing activity data, attaching evidence, applying a methodology and running a verification workflow.",
    purpose:
      "This is where raw operational signals become defensible information. Data is ingested, checked for quality and completeness, linked to supporting evidence, and assessed against a methodology. Verification workflows record who reviewed what, when, and on what basis.",
    examples: [
      "Vehicle telemetry and trip records",
      "Charging session and energy consumption data",
      "Meter readings and site records",
      "Supporting documentation and photographic evidence",
      "Methodology-based calculations and audit trails",
    ],
    connectsTo:
      "Assessed activity, with its evidence and audit trail intact, becomes a structured environmental record.",
    relatedLinks: [
      { label: "Environmental MRV", href: "/solutions/environmental-mrv" },
      { label: "Environmental data and analytics", href: "/solutions/environmental-data" },
    ],
  },
  {
    id: "environmental-value",
    index: 3,
    name: "Environmental value",
    shortName: "Environmental value",
    summary:
      "Structured records of environmental activity, assets and claims, with provenance and traceability.",
    purpose:
      "The platform maintains records that connect an asset to an activity period, the evidence behind it, and the methodology applied. These records are designed to support claims management and to help prepare documentation for relevant verification and registry processes. They are platform records — not independently issued carbon credits.",
    examples: [
      "Asset registry entries with ownership and operating context",
      "Activity periods with start and end boundaries",
      "Claim status and supporting evidence references",
      "Provenance chains showing how a record was derived",
      "Documentation packs prepared for external verification",
    ],
    connectsTo:
      "Records with a verification status can be connected to reward, funding and reporting mechanisms.",
    relatedLinks: [
      { label: "Environmental MRV", href: "/solutions/environmental-mrv" },
      { label: "Platform architecture", href: "/platform#components" },
    ],
  },
  {
    id: "economic-utility",
    index: 4,
    name: "Economic utility",
    shortName: "Economic utility",
    summary:
      "Connecting verified environmental activity to funded rewards, project funding, payments and data products.",
    purpose:
      "Verification on its own does not change an operator's economics. This layer is where verified activity connects to something usable: rewards issued from funded pools, funding routed to environmental projects, payment and settlement integrations, and environmental data products for organisations that need reporting.",
    examples: [
      "Green Points issued against verified activity from a funded pool",
      "Corporate sponsorship of a reward pool or project",
      "Donations and pre-purchase arrangements for project funding",
      "Merchant redemption and settlement through licensed providers",
      "Aggregated environmental data products and reporting outputs",
    ],
    connectsTo:
      "Participants — operators, users, merchants, sponsors and funders — meet in a connected environmental economy.",
    relatedLinks: [
      { label: "Green rewards", href: "/solutions/green-rewards" },
      { label: "Environmental project funding", href: "/solutions/project-funding" },
      { label: "Payments and commerce", href: "/solutions/payments-commerce" },
    ],
  },
  {
    id: "marketplace",
    index: 5,
    name: "Marketplace and environmental economy",
    shortName: "Marketplace",
    summary:
      "The connected ecosystem of operators, users, merchants, sponsors, funders, verifiers and institutions.",
    purpose:
      "The long-term objective is a functioning environmental economy in which measurable activity is easier to finance and participate in. Each participant gets something specific: operators get evidence and access, sponsors get traceable impact, merchants get participation, institutions get reporting they can rely on.",
    examples: [
      "Environmental project operators and developers",
      "Electric mobility operators and their passengers",
      "Merchants accepting reward participation",
      "Corporate sponsors and environmental project funders",
      "Accredited verifiers, institutions and ecosystem partners",
    ],
    connectsTo: null,
    relatedLinks: [
      { label: "Partner ecosystem", href: "/partners" },
      { label: "Industries", href: "/industries" },
    ],
  },
];

export type PlatformComponent = {
  id: string;
  name: string;
  status: DevelopmentStatus;
  summary: string;
  details: string[];
  href?: string;
};

/**
 * Infrastructure components described on the platform page. Statuses are
 * deliberately conservative: nothing is marked available without confirmed
 * company information.
 */
export const platformComponents: PlatformComponent[] = [
  {
    id: "activity-data",
    name: "Activity data capture",
    status: "in-development",
    summary:
      "Ingestion of operational and environmental data from suitable sources, with quality and completeness checks applied on arrival.",
    details: [
      "Integration patterns for telematics providers, charging infrastructure and operator systems",
      "Manual and assisted entry for activity that has no automated data source",
      "Validation on ingestion: range checks, gap detection, duplicate handling",
      "Data lineage from the source system through to the record it supports",
    ],
    href: "/solutions/environmental-mrv",
  },
  {
    id: "mrv-engine",
    name: "MRV engine",
    status: "in-development",
    summary:
      "Methodology-based calculation, evidence management, reporting and verification workflow.",
    details: [
      "Configurable methodologies rather than hardcoded calculations",
      "Evidence attached to the activity period it supports",
      "Reviewer workflow with recorded decisions and timestamps",
      "Reporting outputs prepared for internal and external review",
    ],
    href: "/solutions/environmental-mrv",
  },
  {
    id: "claims-registry",
    name: "Environmental claims registry",
    status: "in-development",
    summary:
      "Structured records connecting an asset to an activity period, its evidence and its claim status.",
    details: [
      "Asset records with operating context and ownership",
      "Activity periods with explicit boundaries to support double-counting controls",
      "Claim status distinct from verification status",
      "Traceability from a claim back to the underlying data and evidence",
    ],
  },
  {
    id: "rewards",
    name: "Rewards infrastructure",
    status: "concept",
    summary:
      "Funded Green Points issued against verified activity, with issuance constrained by available funding.",
    details: [
      "Reward pools funded before points are issued",
      "Issuance rules tied to verified activity rather than self-reported activity",
      "Reward accounting that can be audited against the funding behind it",
      "Merchant participation and redemption workflows",
    ],
    href: "/solutions/green-rewards",
  },
  {
    id: "funding",
    name: "Funding infrastructure",
    status: "concept",
    summary:
      "Donation, sponsorship and pre-purchase pathways for environmental projects, with documentation and milestones.",
    details: [
      "Project documentation and milestone definition",
      "Funding records connected to the project they support",
      "Transparency reporting for funders",
      "Clear separation between funding pathways and investment products",
    ],
    href: "/solutions/project-funding",
  },
  {
    id: "payments",
    name: "Payments and commerce",
    status: "concept",
    summary:
      "Integrations with appropriately licensed payment providers for redemption, settlement and reconciliation.",
    details: [
      "Payment initiation and settlement handled by licensed providers",
      "Transaction records reconciled against platform activity",
      "Merchant settlement workflows",
      "Edge Solutions Africa does not hold customer funds or operate a payment service",
    ],
    href: "/solutions/payments-commerce",
  },
];

/**
 * Technical notes for institutional and technology partners. Written as design
 * intent, not as a description of deployed production systems.
 */
export const technicalNotes = [
  {
    title: "Data model",
    body: "Assets, activity periods, evidence items, methodology versions and claims are modelled as distinct entities. A claim references the methodology version used to derive it, so a later methodology change does not silently rewrite history.",
  },
  {
    title: "Integration surface",
    body: "Designed for API-based ingestion from telematics and charging providers, scheduled batch import where an API is not available, and operator-facing entry for activity without an automated source. Integration specifications are agreed per partner.",
  },
  {
    title: "Evidence and audit trail",
    body: "Every material state change on a record is intended to be appended to an audit trail with an actor, a timestamp and a reason. Verification decisions are stored as events rather than overwritten fields.",
  },
  {
    title: "Interoperability",
    body: "Record structures are designed to support export into the documentation formats used by relevant environmental standards and registries. The platform is not a registry and does not issue carbon credits.",
  },
  {
    title: "Data protection",
    body: "Personal and operational data is minimised by design. Location and telemetry data is processed for environmental measurement purposes and is not published as raw traces. Access is scoped to the organisation that owns the data.",
  },
];

export const blockchainPosition = {
  title: "Where blockchain fits — and where it does not",
  body: "Blockchain may support tamper-evident records and future regulated economic functionality. It is a supporting technology, not the foundation of environmental measurement. The measurement, evidence and verification layers are designed to operate fully without any blockchain network being available, and no part of the environmental integrity of a record depends on one.",
  points: [
    "Environmental measurement and verification do not depend on blockchain availability.",
    "Distributed ledger records, where used, are intended to strengthen tamper-evidence — not to replace evidence or verification.",
    "Transferable digital-asset functionality is a future possibility, subject to the legal and regulatory approvals it would require.",
    "There is no token sale, token price or digital-asset investment offering on this website.",
  ],
};
