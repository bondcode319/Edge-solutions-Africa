import type { FocusLevel } from "./status";

/**
 * Activity categories. Adding a category here creates its card everywhere it
 * appears; a category only needs a detail page when `hasDetailPage` is true.
 */

export type Industry = {
  slug: string;
  name: string;
  icon: string;
  focus: FocusLevel;
  hasDetailPage: boolean;
  summary: string;
  headline: string;
  intro: string;
  metaDescription: string;
  /** The physical activity being measured. */
  activity: string[];
  /** Where data could come from. */
  dataSources: string[];
  /** What makes verification hard or conditional for this category. */
  verificationConsiderations: string[];
  /** How the platform is intended to connect to it. */
  platformConnection: string[];
  /** Plain statement of where this category currently stands for us. */
  developmentNote: string;
  relatedSolutions: string[];
};

export const industries: Industry[] = [
  {
    slug: "e-mobility",
    name: "E-mobility",
    icon: "BusFront",
    focus: "current",
    hasDetailPage: true,
    summary:
      "Electric buses, motorcycles and commercial fleets — our initial focus, because operations already generate usable data.",
    headline: "E-mobility operators",
    intro:
      "Electric mobility is our starting point because the activity is continuous, the data already exists inside operational systems, and the environmental question — what was displaced, and by how much — can be approached with established methodology work.",
    metaDescription:
      "E-mobility environmental infrastructure: telemetry, charging data, activity records and environmental reporting for electric bus and motorcycle operators.",
    activity: [
      "Electric buses running scheduled passenger routes",
      "Electric motorcycles in commercial and ride-hailing use",
      "Commercial and municipal electric fleets",
      "Depot and public charging operations",
    ],
    dataSources: [
      "Telematics platforms and vehicle systems",
      "Charging sessions and energy meter data",
      "Trip, route and distance records",
      "Maintenance and availability records",
    ],
    verificationConsiderations: [
      "The displaced baseline matters: what would have run this route otherwise, and on what fuel",
      "Grid emissions factors vary by market and change over time",
      "Energy data needs to be attributable to specific vehicles and periods",
      "Passenger and location data must be minimised and protected",
    ],
    platformConnection: [
      "Fleet and charging data integration into the MRV engine",
      "Activity periods recorded with explicit boundaries",
      "Operator-facing reporting on data completeness and record status",
      "Planned connection to funded reward and project funding pathways",
    ],
    developmentNote:
      "Current focus. Integration patterns are in development and no operator partnership has been announced.",
    relatedSolutions: ["e-mobility", "environmental-mrv", "green-rewards"],
  },
  {
    slug: "renewable-energy",
    name: "Renewable energy",
    icon: "Sun",
    focus: "planned",
    hasDetailPage: true,
    summary:
      "Solar and other measurable generation activity, where meter data can support structured environmental reporting.",
    headline: "Renewable energy",
    intro:
      "Generation activity is among the most directly measurable environmental activity there is. The infrastructure question is less about whether data exists and more about whether it is structured, attributable and evidenced well enough to support a claim.",
    metaDescription:
      "Renewable energy environmental infrastructure: generation data, meter records and structured environmental reporting for solar and other measurable activity.",
    activity: [
      "Commercial and industrial solar generation",
      "Household and community solar systems",
      "Productive-use energy applications",
      "Other measurable renewable generation with suitable methodology support",
    ],
    dataSources: [
      "Inverter and generation meter data",
      "Consumption and export records",
      "Site commissioning and asset documentation",
      "Maintenance and performance records",
    ],
    verificationConsiderations: [
      "Generation must be attributable to a specific asset and period",
      "Displacement claims depend on what the energy replaced",
      "Double-counting controls matter where other schemes already cover the asset",
      "Metering quality varies widely across distributed systems",
    ],
    platformConnection: [
      "Generation data ingestion with quality checks",
      "Asset records linked to site documentation",
      "Reporting outputs at asset and portfolio level",
      "Potential connection to project funding pathways",
    ],
    developmentNote:
      "Planned expansion. Not yet in development as a distinct platform module.",
    relatedSolutions: ["environmental-mrv", "environmental-data", "project-funding"],
  },
  {
    slug: "waste-recycling",
    name: "Waste and recycling",
    icon: "Recycle",
    focus: "planned",
    hasDetailPage: true,
    summary:
      "Collection, recovery, recycling and diversion activity, where weights and chain-of-custody evidence are available.",
    headline: "Waste and recycling",
    intro:
      "Waste activity can produce meaningful environmental outcomes, but the evidence chain is harder: material moves between hands, weights are recorded inconsistently, and the destination of a load determines whether a claim holds.",
    metaDescription:
      "Waste and recycling environmental infrastructure: collection and diversion records, chain-of-custody evidence and structured environmental reporting.",
    activity: [
      "Collection and aggregation of recoverable material",
      "Sorting, recovery and recycling operations",
      "Diversion from disposal sites",
      "Organic waste processing where methodologies support it",
    ],
    dataSources: [
      "Weighbridge and weighing records",
      "Collection route and load records",
      "Processing facility intake and output records",
      "Chain-of-custody documentation",
    ],
    verificationConsiderations: [
      "Chain of custody from collection through to final processing",
      "Weight measurement quality and consistency between parties",
      "Establishing the counterfactual destination of the material",
      "Informal-sector participation is significant and often poorly documented",
    ],
    platformConnection: [
      "Structured activity records for collection and processing events",
      "Evidence management for chain-of-custody documentation",
      "Reporting for operators and funders",
      "Potential connection to funded reward pathways for participants",
    ],
    developmentNote:
      "Planned expansion, subject to suitable methodologies and evidence being available for a given operation.",
    relatedSolutions: ["environmental-mrv", "environmental-data", "green-rewards"],
  },
  {
    slug: "clean-cooking",
    name: "Clean cooking",
    icon: "Flame",
    focus: "planned",
    hasDetailPage: true,
    summary:
      "Cooking fuel and stove activity, where usage data and evidence can support environmental monitoring.",
    headline: "Clean cooking",
    intro:
      "Clean cooking is one of the most scrutinised areas of environmental measurement, and for good reason: usage assumptions have historically carried more weight than usage evidence. That makes it a category where better data infrastructure has a clear contribution to make.",
    metaDescription:
      "Clean cooking environmental infrastructure: usage data, stove and fuel records, and evidence-led environmental monitoring and reporting.",
    activity: [
      "Improved and clean cookstove deployment and use",
      "Fuel switching to lower-emission alternatives",
      "Fuel supply and distribution activity",
      "Household and institutional cooking",
    ],
    dataSources: [
      "Metered or sensor-based stove usage data where available",
      "Fuel purchase and distribution records",
      "Household survey and monitoring data",
      "Device registration and maintenance records",
    ],
    verificationConsiderations: [
      "Usage assumptions are a known weakness — evidence of actual use matters more than deployment counts",
      "Fuel stacking, where households use several fuels, complicates claims",
      "Household-level data raises meaningful personal data protection obligations",
      "Methodology scrutiny in this category is high and still evolving",
    ],
    platformConnection: [
      "Usage and distribution activity records",
      "Evidence management for monitoring data",
      "Data minimisation controls for household-level information",
      "Reporting for project developers and funders",
    ],
    developmentNote:
      "Planned expansion. Category-specific methodology and data protection work would precede any implementation.",
    relatedSolutions: ["environmental-mrv", "environmental-data", "project-funding"],
  },
  {
    slug: "future-categories",
    name: "Further activity categories",
    icon: "Compass",
    focus: "exploratory",
    hasDetailPage: false,
    summary:
      "Other measurable environmental activities, added as suitable methodologies and evidence sources allow.",
    headline: "Further activity categories",
    intro:
      "The infrastructure is category-agnostic by design. A new activity category needs three things before it becomes viable: a measurable activity, an available evidence source, and a methodology appropriate to the claim being made.",
    metaDescription:
      "Further environmental activity categories under consideration by Edge Solutions Africa.",
    activity: ["Measurable environmental activity with suitable methodology support"],
    dataSources: ["Determined per category"],
    verificationConsiderations: ["Determined per category and jurisdiction"],
    platformConnection: [
      "Categories are configured rather than hardcoded, so adding one does not require rebuilding the platform",
    ],
    developmentNote: "Exploratory. No commitment to a timeline.",
    relatedSolutions: ["environmental-mrv"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

/** Categories that have their own route. */
export const industriesWithPages = industries.filter((industry) => industry.hasDetailPage);
