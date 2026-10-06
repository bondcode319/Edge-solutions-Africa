/**
 * Image manifest — the single source of truth for every image on the site.
 *
 * Two consumers:
 *  - `scripts/generate-images.mjs` reads this to drive Gemini batch generation.
 *  - `<Figure>` and the page components read this to render assets.
 *
 * EDITORIAL CONTRACT
 * ------------------
 * Every prompt here is written against the site's editorial rules (see
 * docs/INFORMATION-REQUIRED.md). Concretely, no prompt may:
 *   - show identifiable people, fleets or facilities, because that would imply
 *     an operator or partnership relationship the company has not confirmed;
 *   - show readable text, numbers, dashboards or charts, because a plausible
 *     figure in an image reads as a result the company has not published;
 *   - show currency, tokens, credit instruments or badges, because the site
 *     deliberately separates platform records, carbon credits and Green Points.
 *
 * `negative` is therefore a hard requirement on every entry, not decoration. If
 * you add an image, add its exclusions too.
 *
 * Style anchors keep a 33-image batch looking like one system. Anchor text is
 * appended to every prompt at generation time; do not inline it here.
 */

/** Shared style anchors. Appending one of these is what makes the set coherent. */
export const styleAnchors = {
  /** Human context, cinematic. Used where a real-world setting grounds a claim. */
  A: "Cinematic editorial photography, cool blue and deep navy palette with cyan #00C9FF accents, soft diffused daylight, modern African urban and industrial setting, minimal composition with generous negative space in the upper third, shallow depth of field, subtle atmospheric haze, high detail, photorealistic. NEGATIVE: no text, no signage, no logos, no brand marks, no licence plates, no people facing camera, no user interface, no charts, no flags.",
  /** Abstract infrastructure. Layered planes, no real-world objects. */
  B: "Abstract conceptual illustration, precise geometric forms, deep navy #001135 background with electric blue #005AFF and cyan #00C9FF luminous accents, thin white hairline grid, soft volumetric light, layered translucent planes suggesting data flow, extremely clean, no objects, no text, no people, no interface elements, high detail, matte finish.",
  /** Systems and data. Must stay clearly non-figurative. */
  C: "Abstract data systems visualisation, isometric geometry, deep navy field, glowing blue and cyan node networks, thin connecting lines, soft bloom, clearly abstract and non-figurative, no readable text, no numbers, no charts with real values, no interface chrome, no people, minimal, high detail.",
} as const;

export type StyleAnchor = keyof typeof styleAnchors;

/** Gemini aspect ratios, from the API's supported set. */
export type AspectRatio =
  | "1:1"
  | "3:2"
  | "2:3"
  | "3:4"
  | "4:3"
  | "4:5"
  | "5:4"
  | "9:16"
  | "16:9"
  | "21:9";

/**
 * Pro vs Flash. Pro is slower but renders legible text, so it is reserved for
 * the social cards where the wordmark must be readable. Everything else uses
 * Flash, which is faster and sufficient for atmospheric and abstract work.
 */
export type GeminiModel = "pro" | "flash";

export type ImageTier =
  | "brand"
  | "home"
  | "solutions"
  | "industries"
  | "insights"
  | "company";

export type ImageEntry = {
  /** Stable identifier, used by the generator for filenames and resume state. */
  id: string;
  /** Path under /public. Extension is added by the generator. */
  file: string;
  /** Where it is used, for a human reading this file. */
  placement: string;
  tier: ImageTier;
  /** Anchor appended to `prompt`. */
  style: StyleAnchor;
  /** Gemini aspect ratio. */
  ratio: AspectRatio;
  /** "1K" | "2K" | "4K" */
  size: "1K" | "2K" | "4K";
  model: GeminiModel;
  /** Scene description only. Never include the anchor text. */
  prompt: string;
  /** Hard exclusions. Required — see the editorial contract above. */
  negative: string;
  /**
   * True only for social cards, where the wordmark is the intended content.
   * Suppresses the blanket "no text" exclusion. Any other image that sets this
   * is asserting a company claim in an image, and the tests will fail.
   */
  allowText?: boolean;
  /**
   * When true the generated image inherits the look of the anchor hero, passed
   * as a reference image. Keeps lighting and palette consistent across a batch.
   */
  useReference?: boolean;
  /** Rendered when the file is missing. See <Figure>. */
  alt: string;
  /**
   * True when the image must be labelled on-page as illustrative, because it
   * depicts something the company has not confirmed. Surfaced by <Figure>.
   */
  illustrative?: boolean;
};

/** Exclusions that apply to every image without exception. */
const ALWAYS = "no logos, no brand marks, no watermarks, no user interface elements, no flags";

/**
 * Additional exclusions for content art. A readable number or a brand mark in an
 * image reads as a published result or an existing relationship, which the site
 * does not assert. Social cards opt out via `allowText`, because the wordmark is
 * the entire point of them.
 */
const NO_TEXT =
  "no text, no lettering, no numbers, no readable signage, no charts or graphs, no faces looking at camera, no distorted anatomy";

/**
 * Extra exclusions for anything depicting a vehicle, facility or place — the
 * images most likely to imply an operator, customer or unconfirmed deployment.
 */
const NO_RELATIONSHIP =
  "no identifiable company, no operator livery, no route numbers, no licence plates, no award badges, no certificates, no location landmarks, no currency";

/**
 * Applies the baseline exclusions to every entry, then appends whatever the entry
 * adds. The baseline is enforced here rather than trusted to each entry, because
 * forgetting one exclusion on one image is exactly the kind of mistake that
 * would ship an unconfirmed claim. `src/tests/components.test.tsx` asserts it.
 */
function def(
  entry: Omit<ImageEntry, "negative"> & { negative?: string },
): ImageEntry {
  const baseline = entry.allowText ? ALWAYS : `${NO_TEXT}, ${ALWAYS}`;
  return {
    ...entry,
    negative: entry.negative ? `${baseline}, ${entry.negative}` : baseline,
  };
}

/**
 * Tier 0 — brand and social.
 *
 * The three OG cards are the only images where text is intended: a social
 * preview has no other place to put the wordmark. They use the Pro model
 * because legible text is the entire point.
 */
const brandImages: ImageEntry[] = [
  def({
    id: "og-default",
    allowText: true,
    file: "/images/brand/og-default.png",
    placement: "Social share fallback — og:image when a page has no specific card",
    tier: "brand",
    style: "B",
    ratio: "16:9",
    size: "2K",
    model: "pro",
    prompt:
      "A premium social share card. Deep navy #001135 background with a subtle electric blue #005AFF gradient glow rising from the lower left, fine white hairline grid overlay at low opacity. On the left third, the wordmark \"Edge Solutions Africa\" set in a light geometric sans-serif, white, generously letter-spaced. Beneath it, smaller cyan #00C9FF uppercase text with wide tracking: \"VERIFY. VALUE. REWARD. FUND. SCALE.\" A single crisp 3px electric blue horizontal rule sits below. The right side holds an abstract isometric node network in blue and cyan suggesting connected infrastructure. Generous empty space. Flat, modern, confident.",
    negative:
      "no spelling errors, no extra words, no lorem ipsum, no stray text beyond the two lines given, no stock-photo people",
    alt: "Edge Solutions Africa — turning verified environmental activity into economic utility",
  }),
  def({
    id: "og-solution",
    allowText: true,
    file: "/images/brand/og-solution.png",
    placement: "Social share for /solutions/[slug] pages",
    tier: "brand",
    style: "B",
    ratio: "16:9",
    size: "2K",
    model: "pro",
    prompt:
      "A premium social share card, same layout and visual system as the primary card: deep navy #001135, electric blue gradient glow lower left, hairline grid, abstract node network on the right. On the left, the smaller uppercase cyan eyebrow \"SOLUTION\" above the wordmark \"Edge Solutions Africa\" in white light geometric sans-serif, with one short electric blue rule beneath.",
    negative:
      "no spelling errors, no extra words, no stray text beyond the eyebrow and wordmark given, no stock-photo people",
    alt: "Edge Solutions Africa — solution overview",
  }),
  def({
    id: "og-article",
    allowText: true,
    file: "/images/brand/og-article.png",
    placement: "Social share for /insights/[slug] articles",
    tier: "brand",
    style: "C",
    ratio: "16:9",
    size: "2K",
    model: "pro",
    prompt:
      "A premium social share card with the same navy and electric blue system: deep navy #001135 background, soft blue glow lower left, hairline grid, faint node network right. On the left, the small uppercase cyan eyebrow \"INSIGHTS\" above the wordmark \"Edge Solutions Africa\" in white light geometric sans-serif, with one short electric blue rule beneath.",
    negative:
      "no spelling errors, no extra words, no stray text beyond the eyebrow and wordmark given, no stock-photo people",
    alt: "Edge Solutions Africa — insights",
  }),
  def({
    id: "icon-concept",
    file: "/images/brand/icon-concept.png",
    placement:
      "CONCEPT ART ONLY — favicon and app-icon direction. A shipped identity asset must be hand-drawn vector SVG; AI output cannot be the final mark.",
    tier: "brand",
    style: "B",
    ratio: "1:1",
    size: "1K",
    model: "pro",
    prompt:
      "A minimal square app-icon concept on a solid deep navy #001135 field: a single simple geometric mark formed from two crisp overlapping rounded rectangles offset diagonally, rendered in electric blue #005AFF with one cyan #00C9FF accent edge. Extremely simple, flat, legible at 32 pixels, centred with generous padding, no text, no letters.",
    negative:
      "no text, no letters, no existing brand marks, no gradients, no drop shadows, no 3D bevel, no photographic elements",
    alt: "Edge Solutions Africa icon concept",
  }),

  /**
   * Tier 1 — hero atmospheric fields.
   *
   * These sit BEHIND the existing HeroVisual diagram. They add depth without
   * replacing a designed element that already communicates the architecture.
   * The reference chain starts here: everything else inherits from this file.
   */
  def({
    id: "hero-field-dark",
    file: "/images/brand/hero-field-dark.png",
    placement: "Background field behind HeroSection and PageHero",
    tier: "brand",
    style: "B",
    ratio: "21:9",
    size: "2K",
    model: "flash",
    prompt:
      "A wide cinematic abstract background field, ultrawide. Very dark navy #001135, nearly black toward the edges, with a soft deep-blue #005AFF glow spreading from the upper left and a faint cyan #00C9FF rim light at the lower right. A fine hairline grid is barely visible and fades toward the centre. Subtle film grain. The left third is kept very dark and empty for text overlay.",
    negative:
      "no objects, no focal subject, no text, no people, no bright highlights above 40% luminance, no vignette frame",
    alt: "",
  }),
  def({
    id: "hero-field-light",
    file: "/images/brand/hero-field-light.png",
    placement: "Background field for light-surface heroes",
    tier: "brand",
    style: "B",
    ratio: "21:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "The same abstract background field concept as the dark variant, but in a pale cool grey-blue #EDF2F5: almost white, with soft white volumetric light and one faint cyan #00C9FF accent bloom in the lower right. Extremely minimal and airy, with the left half left empty for text. Subtle paper-like grain.",
    negative:
      "no objects, no focal subject, no text, no people, no hard shadows, no colour other than pale blue-grey and faint cyan",
    alt: "",
  }),
];

/** Tier 2 — homepage sections, each in the second column of an existing split. */
const homeImages: ImageEntry[] = [
  def({
    id: "home-value-gap",
    file: "/images/home/value-gap.png",
    placement: "Homepage — ValueGapSection, second column",
    tier: "home",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A single luminous cyan node at the lower left dissolving into a scattered cloud of dim disconnected grey-blue fragments toward the right, with a wide empty gap between the two groups. A sense of fragmentation and unrealised potential. Abstract and non-figurative.",
    negative: "no objects, no text, no people, no interface",
    alt: "Abstract illustration: one bright node separated from a scattered cloud of dim fragments by an empty gap",
    illustrative: true,
  }),
  def({
    id: "home-approach",
    file: "/images/home/approach.png",
    placement: "Homepage — ApproachFlow, wide banner under the heading",
    tier: "home",
    style: "C",
    ratio: "21:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Five evenly spaced abstract vertical zones running left to right, each slightly brighter and more connected than the last, joined by a single continuous glowing line that intensifies toward the right. Suggests progression and accumulation. Clearly non-figurative.",
    negative:
      "no numbers, no labels, no step indicators, no text, no icons, no people, no arrows",
    alt: "Abstract illustration: five progressively brighter zones joined by one intensifying line",
    illustrative: true,
  }),
  def({
    id: "home-platform-layers",
    file: "/images/home/platform-layers.png",
    placement: "Homepage — PlatformOverviewSection, second column",
    tier: "home",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Five distinct horizontal translucent planes stacked in depth with clear separation, the lowest dense and bright electric blue, the uppermost faint and almost transparent, suggesting a layered architecture built upward from the ground. Elegant and weightless.",
    negative: "no text, no labels, no numbers, no people, no interface",
    alt: "Abstract illustration: five stacked translucent planes, dense at the base and faint at the top",
    illustrative: true,
  }),
  def({
    id: "home-e-mobility",
    file: "/images/home/e-mobility.png",
    placement: "Homepage — EMobilitySection, dark section",
    tier: "home",
    style: "A",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A modern electric transit bus photographed from a rear three-quarter angle on an empty city street at blue hour, deep blue evening light with cyan LED accents on the vehicle. Completely unbranded: no logo, no badge, no route number, no licence plate and no readable text anywhere. The vehicle is empty and no passengers are visible. Shot with a long lens so the surroundings fall away into soft blue bokeh. Cool, quiet and anticipatory. It must read as generic electric transport rather than any identifiable operator's fleet.",
    negative: NO_RELATIONSHIP,
    alt: "Generic unbranded electric transit bus on an empty street at blue hour",
    illustrative: true,
  }),
  def({
    id: "home-expansion",
    file: "/images/home/expansion.png",
    placement: "Homepage — ExpansionSection, second column",
    tier: "home",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Four soft glowing orbs of varying size drifting apart in dark navy space, each a slightly different hue between blue and cyan, suggesting several separate future domains. Non-figurative, calm and open.",
    negative: "no text, no icons, no people, no planets, no space imagery, no interface",
    alt: "Abstract illustration: four soft glowing orbs drifting apart in dark space",
    illustrative: true,
  }),
  def({
    id: "home-value-flow",
    file: "/images/home/value-flow.png",
    placement: "Homepage — ValueFlowSection, second column",
    tier: "home",
    style: "C",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A dense cluster of small dim nodes on the left converging through a narrow luminous channel into one large bright ordered node on the right. Suggests many small activities consolidating into meaningful economic utility. Clearly abstract.",
    negative:
      "no currency symbols, no percentages, no charts, no numbers, no text, no people",
    alt: "Abstract illustration: many small nodes converging into one larger ordered node",
    illustrative: true,
  }),
];

/**
 * Tier 3 — solutions. One per route. Ids carry the slug so
 * `<SolutionArt slug>` resolves without a second lookup table.
 */
const solutionImages: ImageEntry[] = [
  def({
    id: "solution-environmental-mrv",
    file: "/images/solutions/environmental-mrv.png",
    placement: "/solutions/environmental-mrv — capabilities section",
    tier: "solutions",
    style: "C",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A precise instrument-like abstraction: a luminous blue scanning plane passing over a field of dim nodes, some resolving into bright stable points where the plane touches them while others stay dim. Suggests systematic assessment. Clinical and precise.",
    negative: "no gauges, no dials, no readouts, no numbers, no text, no charts, no people",
    alt: "Abstract illustration: a scanning plane resolving some nodes into bright stable points",
    illustrative: true,
  }),
  def({
    id: "solution-e-mobility",
    file: "/images/solutions/e-mobility.png",
    placement: "/solutions/e-mobility — capabilities section",
    tier: "solutions",
    style: "A",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A close-up architectural detail of an unbranded electric vehicle charge point at dusk, contemporary and minimal, lit by cool blue ambient light with a single cyan indicator glow. Shallow depth of field. The focus is on energy and connection rather than on any identifiable operator.",
    negative: NO_RELATIONSHIP,
    alt: "Abstract architectural detail of an unbranded electric vehicle charge point at dusk",
    illustrative: true,
  }),
  def({
    id: "solution-environmental-data",
    file: "/images/solutions/environmental-data.png",
    placement: "/solutions/environmental-data — capabilities section",
    tier: "solutions",
    style: "C",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Interleaved streams of small dots flowing left to right: one stream tightly ordered and bright cyan, the others loose, noisy and dim blue, gradually converging into the ordered stream. Suggests signal versus noise in data quality. Clearly abstract.",
    negative:
      "no charts, no axes, no graphs, no numbers, no percentages, no text, no dashboards",
    alt: "Abstract illustration: one ordered bright stream converging with several noisy dim streams",
    illustrative: true,
  }),
  def({
    id: "solution-green-rewards",
    file: "/images/solutions/green-rewards.png",
    placement: "/solutions/green-rewards — capabilities section",
    tier: "solutions",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A soft luminous cyan ring of small light points, evenly distributed, glowing gently against deep navy. Suggestive of recognition and return but entirely abstract. It must not read as a financial instrument of any kind.",
    negative:
      "no currency symbols, no coins, no banknotes, no tokens, no percentage values, no badges, no text, no charts, no people",
    alt: "Abstract illustration: a soft glowing ring of small light points",
    illustrative: true,
  }),
  def({
    id: "solution-project-funding",
    file: "/images/solutions/project-funding.png",
    placement: "/solutions/project-funding — capabilities section",
    tier: "solutions",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Several distinct luminous paths converging from scattered origins into one brighter channel that continues forward and upward. Suggests capital being directed toward activity. Entirely abstract.",
    negative:
      "no currency, no bank imagery, no coins, no charts, no numbers, no text, no buildings with logos",
    alt: "Abstract illustration: several luminous paths converging into one brighter channel",
    illustrative: true,
  }),
  def({
    id: "solution-payments-commerce",
    file: "/images/solutions/payments-commerce.png",
    placement: "/solutions/payments-commerce — capabilities section",
    tier: "solutions",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A clean geometric abstraction of value exchange: two luminous blocks passing value between them along a single precise cyan line, in dark navy space. Minimal and neutral.",
    negative:
      "no currency symbols, no payment logos, no cards, no bank imagery, no cheques, no text, no numbers",
    alt: "Abstract illustration: two luminous blocks exchanging value along a single line",
    illustrative: true,
  }),
];

/** Tier 4 — industries. Four have detail pages; the fifth is card-only. */
const industryImages: ImageEntry[] = [
  def({
    id: "industry-e-mobility",
    file: "/images/industries/e-mobility.png",
    placement: "/industries/e-mobility — category detail",
    tier: "industries",
    style: "A",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Rows of modern electric buses in a depot at dawn, photographed from above at a distance so no individual vehicle is identifiable. Cool blue dawn light with soft mist. Entirely unbranded: no logos, no route numbers, no plates, no readable signage. Anonymous and infrastructural, evoking a system rather than a company.",
    negative: NO_RELATIONSHIP,
    alt: "Rows of unbranded electric buses in a depot at dawn, viewed from above at a distance",
    illustrative: true,
  }),
  def({
    id: "industry-renewable-energy",
    file: "/images/industries/renewable-energy.png",
    placement: "/industries/renewable-energy — category detail",
    tier: "industries",
    style: "A",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A wide field of solar panels under a deep blue pre-dawn sky, shot low and close to the panel surface so the repeating geometry dominates and the horizon stays minimal. Cool blue tones with faint cyan reflections. Abstract enough to be any installation anywhere.",
    negative: NO_RELATIONSHIP,
    alt: "Close low-angle view across a solar panel field under a deep blue pre-dawn sky",
    illustrative: true,
  }),
  def({
    id: "industry-waste-recycling",
    file: "/images/industries/waste-recycling.png",
    placement: "/industries/waste-recycling — category detail",
    tier: "industries",
    style: "A",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Neatly stacked recyclable material in a clean modern facility under cool blue industrial lighting, shallow depth of field reducing it to soft geometric forms and repeating texture. No identifiable facility and no workers facing camera.",
    negative: NO_RELATIONSHIP,
    alt: "Neatly stacked recyclable material in a facility under cool blue industrial lighting",
    illustrative: true,
  }),
  def({
    id: "industry-clean-cooking",
    file: "/images/industries/clean-cooking.png",
    placement: "/industries/clean-cooking — category detail",
    tier: "industries",
    style: "A",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A simple modern clean-cooking stove in a domestic interior, graded cool blue overall with only faint cyan light, steam rising gently. No people and no faces. Calm, dignified and contemporary.",
    negative:
      "no packaging, no logos, no brand names, no readable signage, no text, no faces, no children, no unsafe cooking arrangements, no smoke-heavy interiors",
    alt: "A modern clean-cooking stove in a calm domestic interior, graded in cool blue",
    illustrative: true,
  }),
  def({
    id: "industry-future-categories",
    file: "/images/industries/future-categories.png",
    placement: "/industries index — card only, no detail page",
    tier: "industries",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A wide dark navy field with several faint distant glowing points on a horizon-like plane, suggesting unexplored but possible future domains. Non-figurative, deliberately open and uncommitted.",
    negative: "no text, no icons, no planets, no space imagery, no people",
    alt: "Abstract illustration: faint distant glowing points on a dark horizon",
    illustrative: true,
  }),
];

/** Exclusions for article covers, which are the most likely to imply findings. */
const INSIGHT_NEGATIVE =
  "no text, no numbers, no charts with real values, no graphs, no document mockups with legible writing, no newspaper, no report cover, no people, no logos, no currency, no percentage figures";

/** Tier 5 — insights covers. Ids carry the slug from `src/content/insights.ts`. */
const insightImages: ImageEntry[] = [
  def({
    id: "insight-understanding-environmental-mrv",
    file: "/images/insights/understanding-environmental-mrv.png",
    placement: "/insights/understanding-environmental-mrv",
    tier: "insights",
    style: "B",
    ratio: "16:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Layered translucent planes being methodically aligned by a single thin luminous line, order emerging from complexity.",
    negative: INSIGHT_NEGATIVE,
    alt: "Abstract illustration: translucent planes aligned into order by a single luminous line",
    illustrative: true,
  }),
  def({
    id: "insight-why-environmental-data-quality-matters",
    file: "/images/insights/why-data-quality-matters.png",
    placement: "/insights/why-environmental-data-quality-matters",
    tier: "insights",
    style: "C",
    ratio: "16:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "One bright, tightly ordered cyan thread holding its course while loose dim threads scatter around it. Signal integrity.",
    negative: INSIGHT_NEGATIVE,
    alt: "Abstract illustration: one ordered bright thread holding while dim threads scatter around it",
    illustrative: true,
  }),
  def({
    id: "insight-e-mobility-as-environmental-infrastructure",
    file: "/images/insights/e-mobility-as-infrastructure.png",
    placement: "/insights/e-mobility-as-environmental-infrastructure",
    tier: "insights",
    style: "C",
    ratio: "16:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A flowing stream of small nodes rising along a curve from lower left to upper right, mobility expressed as a data source.",
    negative: INSIGHT_NEGATIVE,
    alt: "Abstract illustration: a stream of nodes rising along a curve",
    illustrative: true,
  }),
  def({
    id: "insight-the-environmental-value-gap",
    file: "/images/insights/the-environmental-value-gap.png",
    placement: "/insights/the-environmental-value-gap",
    tier: "insights",
    style: "B",
    ratio: "16:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A wide dark chasm between a dense cluster of dim points and a single unreachable bright point on the far side. The value gap, stated literally.",
    negative: INSIGHT_NEGATIVE,
    alt: "Abstract illustration: a chasm separating a dense cluster of dim points from one bright point",
    illustrative: true,
  }),
  def({
    id: "insight-small-projects-and-environmental-finance",
    file: "/images/insights/small-projects-and-finance.png",
    placement: "/insights/small-projects-and-environmental-finance",
    tier: "insights",
    style: "C",
    ratio: "16:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Many tiny dim nodes, each individually too small, merging together into one larger brighter form. Aggregation enabling participation.",
    negative: INSIGHT_NEGATIVE,
    alt: "Abstract illustration: many small nodes merging into one larger brighter form",
    illustrative: true,
  }),
  def({
    id: "insight-green-rewards-and-responsible-funding",
    file: "/images/insights/green-rewards-and-funding.png",
    placement: "/insights/green-rewards-and-responsible-funding",
    tier: "insights",
    style: "B",
    ratio: "16:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A luminous ring of points with a single open segment, suggesting an incomplete structure being completed. Responsibility rather than speculation.",
    negative: INSIGHT_NEGATIVE,
    alt: "Abstract illustration: a luminous ring of points with one open segment",
    illustrative: true,
  }),
  def({
    id: "insight-digital-infrastructure-for-environmental-reporting",
    file: "/images/insights/digital-infrastructure-reporting.png",
    placement: "/insights/digital-infrastructure-for-environmental-reporting",
    tier: "insights",
    style: "C",
    ratio: "16:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A grid of dim squares with a few brightening into a clean ordered column. Raw data becoming disclosure.",
    negative: INSIGHT_NEGATIVE,
    alt: "Abstract illustration: a grid of dim squares brightening into an ordered column",
    illustrative: true,
  }),
];

/** Tier 6 — company pages. */
const companyImages: ImageEntry[] = [
  def({
    id: "company-about-vision",
    file: "/images/company/about-vision.png",
    placement: "/about — vision and mission panels",
    tier: "company",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A single luminous cyan form at the centre of a vast dark navy space, with faint concentric hairline rings radiating outward. Suggests focus and reach.",
    negative: "no text, no people, no objects, no interface",
    alt: "Abstract illustration: a single luminous form with concentric rings radiating outward",
    illustrative: true,
  }),
  def({
    id: "company-partners-ecosystem",
    file: "/images/company/partners-ecosystem.png",
    placement: "/partners — wide banner above the partner grid",
    tier: "company",
    style: "C",
    ratio: "21:9",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "Nine softly glowing nodes arranged in a loose constellation, each a slightly different size, connected by very faint thin lines, with generous dark space between them. Suggests distinct counterparties in a network without implying any existing relationship.",
    negative:
      "no logos, no text, no icons, no corporate symbols, no handshake imagery, no people",
    alt: "Abstract illustration: nine glowing nodes in a loose constellation connected by faint lines",
    illustrative: true,
  }),
  def({
    id: "company-contact",
    file: "/images/company/contact.png",
    placement: "/contact — beside the enquiry form",
    tier: "company",
    style: "B",
    ratio: "4:3",
    size: "2K",
    model: "flash",
    useReference: true,
    prompt:
      "A soft luminous cyan point in dark navy space emitting a single gentle radiating halo, calm and open, suggesting an open channel.",
    negative:
      "no text, no interface, no devices, no people, no envelopes, no speech bubbles",
    alt: "Abstract illustration: a soft luminous point emitting a gentle halo",
    illustrative: true,
  }),
];

/* ---------------------------------------------------------------------------
   Public surface
   -------------------------------------------------------------------------- */

/** Every image in the manifest, in generation order. The anchor hero is first. */
export const imageManifest: ImageEntry[] = [
  ...brandImages,
  ...homeImages,
  ...solutionImages,
  ...industryImages,
  ...insightImages,
  ...companyImages,
];

const byId = new Map(imageManifest.map((entry) => [entry.id, entry]));

/** Look an entry up by id. */
export function getImage(id: string): ImageEntry | undefined {
  return byId.get(id);
}

/**
 * The hero field that anchors the reference chain. Everything flagged
 * `useReference` inherits its palette and lighting from this file, which is why
 * it must be generated and approved before anything else.
 */
export const REFERENCE_ANCHOR_ID = "hero-field-dark";

export function referenceAnchor(): ImageEntry {
  const entry = byId.get(REFERENCE_ANCHOR_ID);
  if (!entry) throw new Error(`Reference anchor "${REFERENCE_ANCHOR_ID}" is missing`);
  return entry;
}

/**
 * Style anchor for social cards. The abstract anchors all exclude text, which
 * would contradict the wordmark these cards exist to carry, so cards get their
 * own graphic-design treatment instead.
 */
const SHARE_CARD_STYLE =
  "Flat modern editorial graphic design, deep navy #001135 field, electric blue #005AFF gradient glow, fine white hairline grid at low opacity, cyan #00C9FF accents, isometric node network in blue and cyan, light geometric sans-serif typography, wide letter-spacing, generous empty space, crisp and confident.";

/** Composes the full prompt: scene, then style, then hard exclusions. */
export function buildPrompt(entry: ImageEntry): string {
  const style = entry.allowText ? SHARE_CARD_STYLE : styleAnchors[entry.style];
  return [
    entry.prompt,
    `STYLE: ${style}`,
    `STRICTLY AVOID: ${entry.negative}`,
  ].join("\n\n");
}

/** Solution art for a route slug, e.g. "green-rewards". */
export function getSolutionImage(slug: string): ImageEntry | undefined {
  return byId.get(`solution-${slug}`);
}

/** Industry art for a route slug, e.g. "waste-recycling". */
export function getIndustryImage(slug: string): ImageEntry | undefined {
  return byId.get(`industry-${slug}`);
}

/**
 * Insight art for an article. Ids mirror the article slugs one-for-one, so this
 * is a plain lookup — `src/tests/components.test.tsx` fails if that ever drifts.
 */
export function getInsightImage(slug: string): ImageEntry | undefined {
  return byId.get(`insight-${slug}`);
}