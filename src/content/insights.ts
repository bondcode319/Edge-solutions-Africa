/**
 * Insights articles.
 *
 * Every entry is explicitly a draft: `status: "draft"` and `publishedAt: null`.
 * The site renders a "Draft" label and omits publication dates rather than
 * inventing them. No external research findings, statistics or quotations are
 * included, and the author is the company rather than an invented individual.
 *
 * To publish: set status to "published" and supply a publishedAt ISO date.
 */

export const articleCategories = [
  "Environmental MRV",
  "Environmental data",
  "E-mobility",
  "Environmental finance",
  "Rewards and funding",
  "Digital infrastructure",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  /** One-paragraph summary used on cards and in metadata. */
  excerpt: string;
  /** Company byline. No individual author is claimed. */
  author: string;
  status: "draft" | "published";
  publishedAt: string | null;
  readingMinutes: number;
  featured: boolean;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "understanding-environmental-mrv",
    title: "Understanding environmental MRV",
    category: "Environmental MRV",
    excerpt:
      "Measurement, reporting and verification is often described as paperwork. It is better understood as the process that decides whether an environmental claim can be believed.",
    author: "Edge Solutions Africa",
    status: "draft",
    publishedAt: null,
    readingMinutes: 6,
    featured: true,
    sections: [
      {
        heading: "What MRV actually is",
        paragraphs: [
          "MRV stands for measurement, reporting and verification. The three words describe a sequence: you measure what happened, you report it in a structured way, and someone independent assesses whether the report holds up.",
          "The sequence matters more than the acronym. Measurement without reporting produces data nobody can use. Reporting without verification produces claims nobody has checked. Verification without good measurement produces an assessment of the wrong thing.",
        ],
      },
      {
        heading: "Why it is harder than it sounds",
        paragraphs: [
          "The difficulty is rarely the arithmetic. It is that the inputs are scattered, the evidence is incomplete, and the methodology has requirements the operator did not know about when the activity took place.",
          "By the time someone assembles a claim, the operational period is over. Data that was not captured cannot be recovered, and evidence that was not retained cannot be reconstructed.",
        ],
        list: [
          "Activity data sits across several systems that were never designed to talk to each other",
          "Evidence is stored by whoever happened to generate it, in whatever format suited them",
          "Methodology requirements are discovered after the activity rather than before it",
          "Audit trails are reconstructed from memory rather than recorded as events",
        ],
      },
      {
        heading: "The infrastructure view",
        paragraphs: [
          "Treating MRV as an infrastructure problem changes what gets built. Instead of a reporting exercise run at the end of a period, you build a system that captures activity continuously, attaches evidence as it arrives, and applies the methodology as a configured rule rather than a spreadsheet formula.",
          "The output is the same kind of document an assessor expects. The difference is that producing it is no longer a project.",
        ],
      },
    ],
  },
  {
    slug: "why-environmental-data-quality-matters",
    title: "Why environmental data quality matters more than data volume",
    category: "Environmental data",
    excerpt:
      "More data does not produce better environmental claims. Structure, completeness and provenance do.",
    author: "Edge Solutions Africa",
    status: "draft",
    publishedAt: null,
    readingMinutes: 5,
    featured: false,
    sections: [
      {
        heading: "Volume is not the constraint",
        paragraphs: [
          "Connected vehicles, meters and charging infrastructure produce a great deal of data. Very little of it fails because there is not enough of it.",
          "It fails because a reading cannot be attributed to a specific asset, because a period has an unexplained gap, or because nobody can say which version of a calculation produced a number.",
        ],
      },
      {
        heading: "Three properties that decide usefulness",
        paragraphs: [
          "Environmental data tends to be usable when it has three properties, and unusable when it lacks any one of them.",
        ],
        list: [
          "Attribution: every record belongs to a known asset and a defined period",
          "Completeness: gaps are detected and visible, rather than silently averaged over",
          "Provenance: a figure can be traced back to its source data, evidence and methodology version",
        ],
      },
      {
        heading: "Detecting problems early",
        paragraphs: [
          "The cheapest time to find a data quality problem is on ingestion. The most expensive is during an external assessment, when the period has closed and the missing evidence no longer exists.",
          "Validating on arrival is unglamorous work, and it is the difference between a record that survives scrutiny and one that does not.",
        ],
      },
    ],
  },
  {
    slug: "e-mobility-as-environmental-infrastructure",
    title: "The role of e-mobility in environmental infrastructure",
    category: "E-mobility",
    excerpt:
      "Electric fleets are a practical starting point for environmental measurement — not because the activity is more valuable, but because the data already exists.",
    author: "Edge Solutions Africa",
    status: "draft",
    publishedAt: null,
    readingMinutes: 5,
    featured: false,
    sections: [
      {
        heading: "Why start here",
        paragraphs: [
          "Electric mobility operations are continuous, instrumented and repetitive. Vehicles run routes, draw energy and record sessions, every day, in systems the operator already depends on commercially.",
          "That combination is unusual. In many environmental activity categories the first problem is that no data exists at all. In e-mobility, the data exists and the problem is structural.",
        ],
      },
      {
        heading: "What still has to be resolved",
        paragraphs: [
          "Starting with the easiest data source does not make the environmental question easy. Several things still need to be established per market and per operation.",
        ],
        list: [
          "What the electric operation displaced, and on what fuel",
          "Which grid emissions factors apply, and how they change over time",
          "How energy consumption is attributed to specific vehicles and periods",
          "How passenger and location data is minimised and protected",
        ],
      },
      {
        heading: "Proving the infrastructure",
        paragraphs: [
          "The value of starting with e-mobility is that it lets the infrastructure be tested against real operational data before it is extended to categories where evidence is harder to obtain — waste chains, household cooking, distributed generation.",
          "Infrastructure that has never met messy real-world data is not infrastructure. It is a diagram.",
        ],
      },
    ],
  },
  {
    slug: "the-environmental-value-gap",
    title: "The environmental value gap",
    category: "Environmental finance",
    excerpt:
      "The gap is not between environmental activity and environmental benefit. It is between environmental benefit and the infrastructure needed to prove it.",
    author: "Edge Solutions Africa",
    status: "draft",
    publishedAt: null,
    readingMinutes: 4,
    featured: true,
    sections: [
      {
        heading: "Where the gap sits",
        paragraphs: [
          "An operator running electric buses is producing an environmental benefit whether or not anyone documents it. The benefit is not in doubt. What is missing is a path from that benefit to recognition, finance or reward.",
          "That path runs through documentation, and documentation has a cost that does not scale down. A small operation faces broadly the same methodology, evidence and assessment requirements as a large one.",
        ],
      },
      {
        heading: "Why this excludes smaller participants",
        paragraphs: [
          "When the fixed cost of proving an outcome exceeds the value of the outcome, rational operators stop trying. They are not rejected by environmental finance — they never enter it.",
          "The result is a systematic bias towards large projects, which is a poor match for economies where a great deal of environmental activity happens at small scale.",
        ],
      },
      {
        heading: "Closing it with infrastructure",
        paragraphs: [
          "Shared infrastructure is the usual answer to a fixed-cost problem. If measurement, evidence management and reporting are built once and used by many participants, the per-participant cost falls far enough for smaller operations to take part.",
          "That is the gap we are working on.",
        ],
      },
    ],
  },
  {
    slug: "small-projects-and-environmental-finance",
    title: "Environmental finance and small project participation",
    category: "Environmental finance",
    excerpt:
      "Funders are not usually unwilling to fund small environmental projects. They are unable to assess them.",
    author: "Edge Solutions Africa",
    status: "draft",
    publishedAt: null,
    readingMinutes: 5,
    featured: false,
    sections: [
      {
        heading: "The assessment problem",
        paragraphs: [
          "A funder evaluating an environmental project needs to know what activity is taking place, what evidence supports it, what methodology applies, and what happens if delivery falls short.",
          "A project that cannot answer those questions in a structured way is not a bad project. It is an unassessable one, and the outcome is the same either way.",
        ],
      },
      {
        heading: "What documentation has to cover",
        paragraphs: [
          "Most of what a funder asks for is predictable, which means it can be built into the way a project records its activity from the outset.",
        ],
        list: [
          "What the activity is, and over what period",
          "What data supports it, and where that data comes from",
          "What methodology was applied, and which version",
          "What has been independently assessed, and what has not",
          "What milestones define delivery",
        ],
      },
      {
        heading: "Being honest about the boundary",
        paragraphs: [
          "Better documentation improves access to funding. It does not guarantee it, and it does not turn a donation or a pre-purchase into an investment product.",
          "Those distinctions matter both legally and practically, and blurring them tends to harm exactly the participants this infrastructure is meant to include.",
        ],
      },
    ],
  },
  {
    slug: "green-rewards-and-responsible-funding",
    title: "Green rewards and responsible funding",
    category: "Rewards and funding",
    excerpt:
      "A reward programme that issues more value than it holds is not a rewards programme. It is a liability with good branding.",
    author: "Edge Solutions Africa",
    status: "draft",
    publishedAt: null,
    readingMinutes: 4,
    featured: false,
    sections: [
      {
        heading: "Funded before issued",
        paragraphs: [
          "The central design constraint of our proposed Green Points model is that a reward pool is funded before points are issued against it. When a pool is exhausted, issuance against it stops.",
          "This is restrictive by intent. It limits how fast a programme can grow, and it removes the failure mode where participants earn something the programme cannot honour.",
        ],
      },
      {
        heading: "What a point is not",
        paragraphs: [
          "Clarity here is not legal caution for its own sake. Participants make decisions based on what they think they are earning.",
        ],
        list: [
          "A Green Point is not a carbon credit",
          "A Green Point does not represent a fixed quantity of carbon dioxide equivalent",
          "A Green Point is not cash and should not be assumed to be transferable or redeemable for cash",
          "Earning points does not mean a participant has offset their emissions",
        ],
      },
      {
        heading: "Verification as the gate",
        paragraphs: [
          "Tying issuance to verified activity rather than self-reported activity keeps the reward mechanism honest, because it inherits whatever integrity the measurement layer has.",
          "It also means the rewards layer cannot be better than the MRV beneath it — which is a good reason to build the MRV first.",
        ],
      },
    ],
  },
  {
    slug: "digital-infrastructure-for-environmental-reporting",
    title: "Digital infrastructure for environmental reporting",
    category: "Digital infrastructure",
    excerpt:
      "What changes when environmental reporting is treated as a system to be operated rather than a document to be produced.",
    author: "Edge Solutions Africa",
    status: "draft",
    publishedAt: null,
    readingMinutes: 5,
    featured: false,
    sections: [
      {
        heading: "Reporting as a system",
        paragraphs: [
          "Environmental reporting is usually organised as a periodic project: gather data, reconcile it, write it up, submit it, repeat. Each cycle repeats most of the previous cycle's work.",
          "Treating it as a system means the work moves upstream. Data is captured as it is generated, evidence is attached when it exists, and the report becomes a view over records rather than a new artefact.",
        ],
      },
      {
        heading: "Design choices that follow",
        paragraphs: [
          "A few decisions do most of the work in making that shift possible.",
        ],
        list: [
          "Model methodologies as configuration, so they can be versioned rather than rewritten",
          "Store verification decisions as events, so history is not overwritten",
          "Attach evidence to activity periods, not to folders",
          "Validate on ingestion, so problems surface while they are still fixable",
        ],
      },
      {
        heading: "Where blockchain fits",
        paragraphs: [
          "Distributed ledgers can strengthen tamper-evidence for records and may support future regulated economic functionality. That is a useful supporting role.",
          "It is not a foundation. Environmental measurement and verification should work fully without any blockchain network being available, and nothing about the integrity of an environmental assessment should depend on one.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const featuredArticle = articles.find((article) => article.featured) ?? articles[0];

export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return articles.slice(0, limit);
  const sameCategory = articles.filter(
    (article) => article.slug !== slug && article.category === current.category,
  );
  const others = articles.filter(
    (article) => article.slug !== slug && article.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
