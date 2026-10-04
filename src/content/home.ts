/**
 * Homepage and shared narrative content.
 *
 * These blocks are reused on the about page and elsewhere, so the company story
 * stays consistent wherever it appears.
 */

export const valueGap = {
  eyebrow: "The environmental value gap",
  headline: "Environmental activity creates value. But value needs infrastructure.",
  intro:
    "Across Africa, buses run on electricity, solar systems generate power, material is recovered instead of buried, and households cook on cleaner fuel. The environmental benefit is real. What is frequently missing is the infrastructure to measure it consistently, evidence it credibly, and connect it to finance and commerce — which is where smaller operators and projects tend to fall out of the system.",
  problems: [
    {
      title: "Fragmented environmental data",
      icon: "Unplug",
      body: "Activity data sits in separate telematics platforms, charging systems, spreadsheets and paper records. Assembling a coherent picture is manual work that has to be repeated every reporting cycle.",
    },
    {
      title: "Complex measurement and verification",
      icon: "FileSearch",
      body: "MRV requires methodology expertise, structured evidence and an audit trail. The cost of getting this right is close to fixed, which pushes smaller operators out before they start.",
    },
    {
      title: "Limited access to environmental finance",
      icon: "Landmark",
      body: "Funders need documentation before they can act. Projects that cannot produce it are not rejected on their merits — they are simply never assessed.",
    },
    {
      title: "Disconnected rewards and commerce",
      icon: "Link2Off",
      body: "Even where environmental activity is recognised, there is rarely a path from that recognition to something a participant can use in everyday economic life.",
    },
  ],
  cta: { label: "Discover Our Approach", href: "/platform" },
};

export const approachSteps = [
  {
    id: "activity",
    label: "Real-world activity",
    icon: "BusFront",
    body: "Something measurable happens: a route is run, energy is generated, material is recovered.",
  },
  {
    id: "data",
    label: "Data and evidence",
    icon: "Antenna",
    body: "Operational data is captured from connected systems and paired with supporting evidence.",
  },
  {
    id: "verification",
    label: "Measurement and verification",
    icon: "ShieldCheck",
    body: "A methodology is applied and a reviewer records an assessment decision with a full audit trail.",
  },
  {
    id: "value",
    label: "Environmental value",
    icon: "Layers",
    body: "A structured record connects the asset, the activity period, the evidence and the claim status.",
  },
  {
    id: "utility",
    label: "Rewards, funding and commerce",
    icon: "Repeat",
    body: "Verified activity connects to funded rewards, project funding, reporting and commerce.",
  },
];

export const platformCapabilities = [
  {
    name: "Environmental MRV",
    icon: "ClipboardCheck",
    body: "Measurement, reporting and verification workflows with evidence management and audit trails.",
    href: "/solutions/environmental-mrv",
    status: "in-development" as const,
  },
  {
    name: "Activity and asset records",
    icon: "Database",
    body: "Structured records connecting assets, activity periods, evidence and claim status.",
    href: "/platform#components",
    status: "in-development" as const,
  },
  {
    name: "Green rewards",
    icon: "Gift",
    body: "A funded Green Points model that issues against verified activity, not self-reported activity.",
    href: "/solutions/green-rewards",
    status: "concept" as const,
  },
  {
    name: "Project funding",
    icon: "HandCoins",
    body: "Donation, sponsorship and pre-purchase pathways connected to documented projects.",
    href: "/solutions/project-funding",
    status: "concept" as const,
  },
  {
    name: "Payments and commerce",
    icon: "CreditCard",
    body: "Planned integrations with appropriately licensed payment and settlement providers.",
    href: "/solutions/payments-commerce",
    status: "concept" as const,
  },
  {
    name: "Environmental data and analytics",
    icon: "ChartNoAxesCombined",
    body: "Structured data, quality controls and reporting outputs for operators and institutions.",
    href: "/solutions/environmental-data",
    status: "in-development" as const,
  },
];

export const eMobilityStart = {
  eyebrow: "Our starting point",
  headline: "Measurable environmental activity in e-mobility.",
  body: "Electric mobility produces operational data continuously — trips, distance, energy drawn, charging sessions. Collected properly and assessed under an appropriate methodology, that data can support structured environmental monitoring, reporting and verification. It is a practical place to prove the infrastructure before extending it to activity where evidence is harder to obtain.",
  journey: [
    { label: "Vehicle activity", body: "Routes run, distance covered, hours in service." },
    { label: "Telemetry and charging data", body: "Energy drawn, charging sessions, trip records." },
    { label: "Methodology-based calculation", body: "An agreed methodology applied to validated activity data." },
    { label: "Verification workflow", body: "Reviewer assessment with a recorded decision and audit trail." },
    { label: "Records and reports", body: "Structured environmental records and reporting outputs." },
  ],
  note: "Illustrative of the intended data journey. No operator partnership has been announced.",
  cta: { label: "Explore E-Mobility Solutions", href: "/solutions/e-mobility" },
};

export const valueFlow = {
  eyebrow: "How value flows",
  headline: "Connecting environmental evidence to economic participation.",
  intro:
    "Verification alone does not change an operator's economics. What matters is the path from evidence to participation — and the boundaries between the different things that path produces.",
  nodes: [
    {
      id: "activity",
      label: "Environmental activity",
      body: "Measurable activity carried out by an operator or project.",
    },
    {
      id: "verification",
      label: "Verification",
      body: "Methodology applied, evidence assessed, decision recorded.",
    },
    {
      id: "sponsorship",
      label: "Corporate sponsorship",
      body: "An organisation funds a reward pool or an environmental project.",
    },
    {
      id: "points",
      label: "Funded Green Points",
      body: "Points issued against verified activity, from a pool funded in advance.",
    },
    {
      id: "funding",
      label: "Project funding",
      body: "Donations, sponsorship and pre-purchases routed to documented projects.",
    },
    {
      id: "merchants",
      label: "Merchant participation",
      body: "Merchants accept points for agreed goods and services.",
    },
    {
      id: "settlement",
      label: "Payments and settlement",
      body: "Executed by appropriately licensed payment providers.",
    },
  ],
  distinctions: [
    {
      term: "Environmental record",
      body: "A structured platform record of assessed activity, with its evidence and audit trail. Held by us — not issued by a registry.",
    },
    {
      term: "Carbon credit",
      body: "A unit issued independently by a carbon standard or registry through its own process. We do not issue carbon credits.",
    },
    {
      term: "Green Point",
      body: "A proposed reward unit issued from a funded pool against verified activity. Not a carbon credit, not a fixed quantity of CO2e, and not cash.",
    },
  ],
};

export const principles = [
  {
    title: "Evidence before issuance",
    icon: "FileCheck",
    body: "Nothing is issued against activity that has not been evidenced. Where evidence is insufficient, the correct outcome is a record that is not verified.",
  },
  {
    title: "Verification before claims",
    icon: "ShieldCheck",
    body: "An environmental claim follows an assessment. Measured activity and verified claims are kept distinct in the data model and in how we talk about them.",
  },
  {
    title: "Clear provenance and auditability",
    icon: "GitBranch",
    body: "Every record should be traceable back to the data, evidence and methodology version that produced it, with material changes recorded as events.",
  },
  {
    title: "Protection of personal and operational data",
    icon: "Lock",
    body: "Personal and commercially sensitive data is minimised, access is scoped to the organisation that owns it, and raw location traces are not published.",
  },
  {
    title: "Responsible reward funding",
    icon: "Wallet",
    body: "Reward pools are funded before issuance. We do not create reward liabilities without funding behind them.",
  },
  {
    title: "Appropriate legal and regulatory pathways",
    icon: "Scale",
    body: "Payment, funding and any future digital-asset functionality operates within the framework that applies to it, with the relevant licensed providers.",
  },
  {
    title: "Interoperability with environmental standards",
    icon: "Boxes",
    body: "Records are structured so they can support documentation for relevant standards and registry processes rather than sitting in a closed silo.",
  },
];

export const audiences = [
  {
    name: "E-mobility operators",
    icon: "BusFront",
    body: "Turn the data your fleet already produces into structured environmental records and reporting.",
    pathway: "Start with an integration conversation about your telematics and charging data.",
    interest: "E-mobility",
  },
  {
    name: "Environmental project developers",
    icon: "Sprout",
    body: "Build the documentation and evidence chain that funders and verifiers ask for.",
    pathway: "Tell us about your project, its activity data and where documentation gaps sit.",
    interest: "Environmental MRV",
  },
  {
    name: "Renewable energy businesses",
    icon: "Sun",
    body: "Structure generation data into records that support environmental reporting.",
    pathway: "Discuss what generation and meter data you hold today.",
    interest: "Environmental data",
  },
  {
    name: "Corporate sponsors",
    icon: "Building2",
    body: "Fund reward pools or environmental projects and receive traceable documentation of what your funding supported.",
    pathway: "Discuss sponsorship structures and the reporting you need.",
    interest: "Corporate sponsorship",
  },
  {
    name: "Merchants",
    icon: "Store",
    body: "Participate in reward redemption on agreed terms once the programme is live and funded.",
    pathway: "Register interest in merchant participation.",
    interest: "Green rewards",
  },
  {
    name: "Funders and institutions",
    icon: "Landmark",
    body: "Access structured environmental data and documented projects for portfolio reporting.",
    pathway: "Discuss data requirements and institutional reporting needs.",
    interest: "Project funding",
  },
  {
    name: "Verification and technical partners",
    icon: "PlugZap",
    body: "Work with us on methodologies, assessment processes and data integrations.",
    pathway: "Discuss a technical or verification collaboration.",
    interest: "Technology integration",
  },
];

export const partnershipCta = {
  headline: "Let us build the infrastructure for measurable environmental value.",
  body: "Are you operating an electric mobility fleet, developing an environmental project, exploring green finance, or looking for ways to support measurable environmental activity? Let us start a conversation.",
  primary: { label: "Discuss a Partnership", href: "/contact" },
  secondary: { label: "Contact Our Team", href: "/contact#enquiry-form" },
};
