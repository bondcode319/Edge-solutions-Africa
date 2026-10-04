import type { DevelopmentStatus } from "./status";

/**
 * Solution pages. One record per /solutions/[slug] route — page components read
 * from here so copy can change without touching layout code.
 */

export type Solution = {
  slug: string;
  name: string;
  /** Short label for cards and navigation. */
  shortName: string;
  /** Lucide icon name, resolved by components/ui/Icon.tsx. */
  icon: string;
  status: DevelopmentStatus;
  /** One sentence, used on cards and in metadata. */
  summary: string;
  headline: string;
  intro: string;
  /** Long-form metadata description. */
  metaDescription: string;
  capabilities: { title: string; body: string }[];
  /** Ordered workflow the solution supports. */
  workflow?: { step: string; body: string }[];
  /** Things a reader should know before assuming more than we claim. */
  considerations: string[];
  cta: { label: string; interest: string };
  related: string[];
};

export const solutions: Solution[] = [
  {
    slug: "environmental-mrv",
    name: "Environmental MRV",
    shortName: "Environmental MRV",
    icon: "ClipboardCheck",
    status: "in-development",
    summary:
      "Measurement, reporting and verification workflows that turn operational data into defensible environmental records.",
    headline: "Measurement, reporting and verification built for real operations.",
    intro:
      "Environmental claims are only as strong as the evidence behind them. Our MRV infrastructure is designed to collect activity data from the systems an operator already runs, attach the evidence that supports it, apply a methodology consistently, and keep a complete audit trail of every assessment decision.",
    metaDescription:
      "Environmental MRV infrastructure from Edge Solutions Africa: data ingestion, evidence management, methodology-based calculation, verification workflows and audit trails.",
    capabilities: [
      {
        title: "Measurement",
        body: "Activity data is captured from operational systems — telematics, charging infrastructure, meters, operator records — with validation applied on ingestion so gaps and anomalies surface early rather than at review time.",
      },
      {
        title: "Reporting",
        body: "Structured reporting outputs are generated from the underlying records, so a report can always be traced back to the data and evidence that produced it.",
      },
      {
        title: "Verification",
        body: "Verification workflows record who assessed what, against which methodology version, on what date, and with what outcome. Decisions are stored as events, not as overwritten fields.",
      },
      {
        title: "Evidence management",
        body: "Supporting documentation is attached to the specific activity period it supports, so reviewers are not assembling evidence from scattered sources.",
      },
      {
        title: "Methodology-based calculation",
        body: "Calculations are driven by configurable methodologies rather than hardcoded formulas, so a methodology can be versioned and a historical record keeps the version it was assessed under.",
      },
      {
        title: "Audit trails",
        body: "Material changes to a record are appended to an audit trail with actor, timestamp and reason, supporting review by internal teams and external assessors.",
      },
    ],
    workflow: [
      { step: "Ingest", body: "Activity and energy data arrives from connected systems or assisted entry." },
      { step: "Validate", body: "Completeness, range and duplication checks run before the data is usable." },
      { step: "Evidence", body: "Supporting documentation is attached to the relevant activity period." },
      { step: "Calculate", body: "A configured methodology is applied to the validated activity data." },
      { step: "Review", body: "A reviewer assesses the assessment pack and records a decision." },
      { step: "Report", body: "Outputs are produced for internal reporting or external verification processes." },
    ],
    considerations: [
      "Platform records are not independently issued carbon credits. Independent issuance is a separate process run by the relevant standard or registry.",
      "The methodologies applicable to an activity depend on the activity type, the jurisdiction and the standard involved. These are agreed per engagement, not assumed.",
      "Data quality determines what can be claimed. Where evidence is insufficient, the correct outcome is a record that is not verified.",
    ],
    cta: { label: "Discuss an MRV Integration", interest: "Environmental MRV" },
    related: ["e-mobility", "environmental-data"],
  },
  {
    slug: "e-mobility",
    name: "E-mobility infrastructure",
    shortName: "E-mobility",
    icon: "BusFront",
    status: "in-development",
    summary:
      "Fleet, telemetry and charging data integration that turns daily electric mobility operations into structured environmental records.",
    headline: "Digital infrastructure for electric mobility operations.",
    intro:
      "Electric fleets already generate the operational data that environmental reporting needs — trips, distance, energy drawn, charging sessions. The gap is rarely the data itself; it is the infrastructure to collect it consistently, assess it against a methodology, and connect the result to something useful.",
    metaDescription:
      "E-mobility data infrastructure from Edge Solutions Africa: fleet and telemetry integration, charging data, operational activity records and environmental reporting workflows.",
    capabilities: [
      {
        title: "Fleet data integration",
        body: "Integration patterns for telematics platforms, vehicle systems and operator back-office tools, agreed per operator against a documented integration specification.",
      },
      {
        title: "Telemetry and charging data",
        body: "Trip activity, distance, energy consumption and charging sessions are captured as the operational basis for environmental assessment.",
      },
      {
        title: "Operational activity records",
        body: "Activity is organised into periods with explicit boundaries, so an assessment covers a defined window and a record cannot be silently counted twice.",
      },
      {
        title: "Environmental reporting workflows",
        body: "Operators can produce reporting outputs from their own activity data rather than reconstructing it manually each reporting cycle.",
      },
      {
        title: "Operator-facing infrastructure",
        body: "Designed so the people running the fleet can see what data has arrived, what is missing, and what state a record is in.",
      },
      {
        title: "Rewards and funding connections",
        body: "Where a reward or funding programme exists and is funded, verified activity can be connected to it. This is a planned capability, not a live service.",
      },
    ],
    workflow: [
      { step: "Connect", body: "Agree an integration specification with the operator and connect data sources." },
      { step: "Collect", body: "Trip, distance, energy and charging data flows in on an agreed cadence." },
      { step: "Assess", body: "Methodology-based calculation runs against validated activity data." },
      { step: "Verify", body: "The assessment pack goes through the verification workflow." },
      { step: "Use", body: "Records support reporting and, where funded programmes exist, reward and funding connections." },
    ],
    considerations: [
      "Edge Solutions Africa has not announced a formal fleet partnership. Any operator relationship will be described only once it is agreed and approved for publication.",
      "Grid emissions factors, baselines and methodology choices materially affect results and are agreed per jurisdiction and engagement.",
      "Raw location traces and passenger data are not published, and are not required for a partner to understand their own environmental reporting.",
    ],
    cta: { label: "Discuss E-Mobility Integration", interest: "E-mobility" },
    related: ["environmental-mrv", "green-rewards"],
  },
  {
    slug: "environmental-data",
    name: "Environmental data and analytics",
    shortName: "Environmental data",
    icon: "ChartNoAxesCombined",
    status: "in-development",
    summary:
      "Structured environmental activity data, quality controls and reporting outputs for operators and institutions.",
    headline: "Environmental data you can explain, defend and reuse.",
    intro:
      "Environmental data usually fails for boring reasons: it is incomplete, inconsistently structured, or impossible to trace back to a source. Our data layer is built around structure and provenance first, so the analysis sitting on top of it can be defended.",
    metaDescription:
      "Environmental data and analytics from Edge Solutions Africa: structured activity records, data quality controls, performance reporting and aggregated insights.",
    capabilities: [
      {
        title: "Environmental activity data",
        body: "Activity is captured in a consistent structure across sources, so the same question can be answered the same way across an entire portfolio.",
      },
      {
        title: "Structured records",
        body: "Assets, activity periods, evidence and claims are modelled explicitly rather than flattened into spreadsheets.",
      },
      {
        title: "Data quality",
        body: "Completeness, range and duplication checks run on ingestion, and data quality state is visible rather than buried.",
      },
      {
        title: "Performance reporting",
        body: "Reporting outputs at asset, site and portfolio level, each traceable to the records behind them.",
      },
      {
        title: "Aggregated insights",
        body: "Aggregated views across activity categories, designed so no individual can be identified from published aggregates.",
      },
      {
        title: "Institutional reporting",
        body: "Outputs intended to support the reporting obligations of institutions working with environmental project portfolios.",
      },
    ],
    considerations: [
      "Analytics outputs describe measured and assessed activity. They are not a substitute for independent verification.",
      "Any data product involving third-party data requires the relevant permissions and a documented data-sharing basis.",
      "We do not publish figures that we cannot trace to an underlying record.",
    ],
    cta: { label: "Discuss Environmental Data", interest: "Environmental data" },
    related: ["environmental-mrv", "e-mobility"],
  },
  {
    slug: "green-rewards",
    name: "Green rewards",
    shortName: "Green rewards",
    icon: "Gift",
    status: "concept",
    summary:
      "A funded Green Points model that connects verified environmental activity to practical participation.",
    headline: "Rewards that are funded before they are issued.",
    intro:
      "Green Points are a proposed reward mechanism. The design principle is simple and deliberately restrictive: points are issued against verified activity, from a pool that has been funded in advance, under terms that are published before anyone participates.",
    metaDescription:
      "Green rewards infrastructure from Edge Solutions Africa: the proposed funded Green Points model, verification requirements, merchant participation and reward accounting.",
    capabilities: [
      {
        title: "Activity-based rewards",
        body: "Reward issuance is tied to environmental activity that has been assessed and verified — not to self-reported activity or sign-up alone.",
      },
      {
        title: "Verification requirements",
        body: "Activity must pass the verification workflow before it can trigger issuance, so the reward mechanism inherits the integrity of the MRV layer.",
      },
      {
        title: "Funded reward pools",
        body: "A pool is funded before issuance. Where funding for a pool is exhausted, issuance against that pool stops. Rewards are not created without funding behind them.",
      },
      {
        title: "Merchant participation",
        body: "Merchants opt in to accept points for specific goods or services under agreed terms.",
      },
      {
        title: "Redemption workflows",
        body: "Redemption is designed to run through appropriately licensed payment and settlement providers.",
      },
      {
        title: "Reward accounting",
        body: "Issuance, redemption and the funding behind each pool are accounted for so the mechanism can be audited.",
      },
    ],
    considerations: [
      "A Green Point is not a carbon credit and does not represent a fixed quantity of carbon dioxide equivalent.",
      "Points are not cash, and no cash value, transferability or guaranteed redemption should be assumed. Final terms depend on the approved operating model.",
      "Earning points does not mean a participant has offset their emissions.",
      "This capability is at concept stage. Availability, reward rates and terms will be published when the product and its operating model are approved.",
    ],
    cta: { label: "Explore Rewards Partnerships", interest: "Green rewards" },
    related: ["payments-commerce", "project-funding"],
  },
  {
    slug: "project-funding",
    name: "Environmental project funding",
    shortName: "Project funding",
    icon: "HandCoins",
    status: "concept",
    summary:
      "Donation, sponsorship and pre-purchase pathways that connect funders to documented environmental projects.",
    headline: "Funding pathways for projects that can show their work.",
    intro:
      "Small and mid-sized environmental projects are often too small for conventional environmental finance and too under-documented for buyers who need evidence. Our funding infrastructure is designed to address the documentation problem first, then connect documented projects to appropriate funding pathways.",
    metaDescription:
      "Environmental project funding infrastructure from Edge Solutions Africa: donations, corporate sponsorship, pre-purchase pathways, project milestones and funding transparency.",
    capabilities: [
      {
        title: "Donations",
        body: "Direct support for a project with no expectation of a financial return to the donor.",
      },
      {
        title: "Corporate sponsorship",
        body: "An organisation funds a project or a reward pool and receives traceable documentation of what the funding supported.",
      },
      {
        title: "Pre-purchases",
        body: "Forward arrangements for future environmental outcomes, defined in a written agreement with explicit delivery conditions.",
      },
      {
        title: "Project milestones",
        body: "Funding is connected to defined project milestones rather than to open-ended commitments.",
      },
      {
        title: "Project documentation",
        body: "Projects carry structured documentation — activity, evidence, methodology and assessment status — so a funder can see what they are supporting.",
      },
      {
        title: "Funding transparency",
        body: "Funders receive reporting on how funds were applied and what activity has been recorded since.",
      },
    ],
    considerations: [
      "Donations and pre-purchases are not investment products. Edge Solutions Africa does not offer investments and does not promise financial returns.",
      "Pre-purchase arrangements depend on the underlying project delivering, and delivery risk is set out in the relevant agreement.",
      "This capability is at concept stage. Any funding pathway will operate only within the legal and regulatory framework that applies to it.",
    ],
    cta: { label: "Discuss Project Funding", interest: "Project funding" },
    related: ["green-rewards", "environmental-mrv"],
  },
  {
    slug: "payments-commerce",
    name: "Payments and commerce",
    shortName: "Payments and commerce",
    icon: "CreditCard",
    status: "concept",
    summary:
      "Planned integrations with licensed payment providers connecting environmental participation to everyday commerce.",
    headline: "Connecting environmental participation to everyday commerce.",
    intro:
      "Environmental value becomes real to people when it can be used. The payments layer is designed to connect verified environmental participation to ordinary commercial activity through integrations with appropriately licensed providers.",
    metaDescription:
      "Payments and commerce infrastructure from Edge Solutions Africa: planned integrations with licensed payment providers, merchant participation, settlement and reconciliation.",
    capabilities: [
      {
        title: "Payment-provider integrations",
        body: "Payment initiation, collection and settlement are designed to run through appropriately licensed payment providers.",
      },
      {
        title: "Merchant participation",
        body: "Merchants join under agreed terms covering what is accepted, at what value, and how settlement works.",
      },
      {
        title: "Transaction records",
        body: "Platform-side records of participation, kept so activity can be reconciled and audited.",
      },
      {
        title: "Settlement workflows",
        body: "Settlement to merchants is executed by the licensed provider, with the platform maintaining the corresponding records.",
      },
      {
        title: "Payment reconciliation",
        body: "Reconciliation between platform records and provider statements, so discrepancies are detected rather than accumulated.",
      },
      {
        title: "Reward redemption",
        body: "Where a reward programme is live and funded, redemption connects into the same settlement path.",
      },
    ],
    considerations: [
      "Edge Solutions Africa is not a bank, a payment institution or a licensed payment service provider, and does not hold customer funds.",
      "All payment functionality depends on integration with providers that hold the relevant authorisations in each market.",
      "This capability is at concept stage and no payment service is currently offered to the public.",
    ],
    cta: { label: "Discuss Commerce Integration", interest: "Payments and commerce" },
    related: ["green-rewards", "project-funding"],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
