/**
 * Company-level configuration.
 *
 * Everything an editor may need to change without touching components lives
 * here. Values that have not been confirmed by the company resolve to null and
 * render as an honest "to be confirmed" state — see docs/INFORMATION-REQUIRED.md.
 */

export type ContactDetail = {
  label: string;
  value: string | null;
  href: string | null;
  /** True when no confirmed company value is configured yet. */
  placeholder: boolean;
};

export const siteConfig = {
  name: "Edge Solutions Africa",
  shortName: "Edge Solutions",
  /** The environmental infrastructure initiative described in company strategy. */
  initiativeName: "Edge Tech",
  tagline: "Turning verified environmental activity into economic utility.",
  brandPhrase: "VERIFY. VALUE. REWARD. FUND. SCALE.",
  positioning:
    "We build digital infrastructure connecting real-world environmental activity with trusted data, verification, rewards, project funding, and commerce.",
  description:
    "Edge Solutions Africa builds environmental economic infrastructure — connecting real-world environmental activity with trusted data, verification, rewards, project funding, and commerce.",
  vision:
    "Build infrastructure that makes measurable environmental activity easier to verify, value, finance, and use — beginning in Africa and designed for broader global relevance.",
  mission:
    "Build trusted digital infrastructure that measures and verifies real-world environmental activity and connects it to rewards, finance, and commerce.",
  /** Public base URL. Override with NEXT_PUBLIC_SITE_URL per environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.edgesolutions.africa",
  locale: "en_GB",
  /**
   * Logo asset. Set to a path under /public once an approved brand asset is
   * supplied; while null, the header and footer render a clearly temporary
   * text identity treatment.
   */
  logoSrc: null as string | null,
} as const;

/**
 * Contact details. No address, phone number or inbox has been confirmed, so
 * these read from environment variables and stay null until supplied.
 */
export const contactDetails: ContactDetail[] = [
  {
    label: "General enquiries",
    value: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
    href: process.env.NEXT_PUBLIC_CONTACT_EMAIL
      ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`
      : null,
    placeholder: !process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },
  {
    label: "Registered office",
    value: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? null,
    href: null,
    placeholder: !process.env.NEXT_PUBLIC_CONTACT_ADDRESS,
  },
  {
    label: "Telephone",
    value: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? null,
    href: process.env.NEXT_PUBLIC_CONTACT_PHONE
      ? `tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE.replace(/[^+\d]/g, "")}`
      : null,
    placeholder: !process.env.NEXT_PUBLIC_CONTACT_PHONE,
  },
];

/** Social profiles. Only rendered once a confirmed URL is configured. */
export const socialLinks = [
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? null,
  },
] as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Present when the item opens a dropdown panel. */
  sections?: { heading: string; links: NavLink[] }[];
  featured?: { title: string; body: string; href: string; cta: string };
};

/**
 * Primary navigation. Detail routes are grouped into dropdown panels so the
 * top level stays at six items.
 */
export const mainNavigation: NavItem[] = [
  {
    label: "Platform",
    href: "/platform",
    sections: [
      {
        heading: "The platform",
        links: [
          {
            label: "Platform overview",
            href: "/platform",
            description: "The five-layer infrastructure model, end to end.",
          },
          {
            label: "Architecture explorer",
            href: "/platform#architecture",
            description: "Select a layer to see what it does and what it connects to.",
          },
          {
            label: "Illustrative activity journey",
            href: "/platform#journey",
            description: "A simulated walk-through from activity to environmental record.",
          },
          {
            label: "Technical architecture",
            href: "/platform#technical",
            description: "For technology and institutional partners.",
          },
        ],
      },
    ],
    featured: {
      title: "Built to be understood",
      body: "Environmental measurement and verification are designed to work independently of any blockchain network.",
      href: "/platform#blockchain",
      cta: "How we treat blockchain",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    sections: [
      {
        heading: "Measure and verify",
        links: [
          {
            label: "Environmental MRV",
            href: "/solutions/environmental-mrv",
            description: "Measurement, reporting and verification workflows.",
          },
          {
            label: "E-mobility infrastructure",
            href: "/solutions/e-mobility",
            description: "Fleet, telemetry and charging data integration.",
          },
          {
            label: "Environmental data and analytics",
            href: "/solutions/environmental-data",
            description: "Structured records, data quality and reporting.",
          },
        ],
      },
      {
        heading: "Value and commerce",
        links: [
          {
            label: "Green rewards",
            href: "/solutions/green-rewards",
            description: "Funded Green Points and merchant participation.",
          },
          {
            label: "Environmental project funding",
            href: "/solutions/project-funding",
            description: "Donations, sponsorship and pre-purchase pathways.",
          },
          {
            label: "Payments and commerce",
            href: "/solutions/payments-commerce",
            description: "Integrations with licensed payment providers.",
          },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    sections: [
      {
        heading: "Activity categories",
        links: [
          {
            label: "E-mobility operators",
            href: "/industries/e-mobility",
            description: "Electric buses, motorcycles and fleet operations.",
          },
          {
            label: "Renewable energy",
            href: "/industries/renewable-energy",
            description: "Solar and other measurable generation activity.",
          },
          {
            label: "Waste and recycling",
            href: "/industries/waste-recycling",
            description: "Collection, recovery and diversion activity.",
          },
          {
            label: "Clean cooking",
            href: "/industries/clean-cooking",
            description: "Fuel and stove activity with suitable evidence.",
          },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    sections: [
      {
        heading: "The company",
        links: [
          {
            label: "About Edge Solutions Africa",
            href: "/about",
            description: "Who we are and what we are building.",
          },
          {
            label: "Our principles",
            href: "/about#principles",
            description: "How we treat evidence, claims and data.",
          },
          {
            label: "Partner ecosystem",
            href: "/partners",
            description: "The organisations the infrastructure is designed to connect.",
          },
        ],
      },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = {
  label: "Discuss a Partnership",
  href: "/contact",
} as const;

export const secondaryCta = {
  label: "Explore the Platform",
  href: "/platform",
} as const;

export const footerNavigation = [
  {
    heading: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Architecture explorer", href: "/platform#architecture" },
      { label: "Activity journey", href: "/platform#journey" },
      { label: "Technical architecture", href: "/platform#technical" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Environmental MRV", href: "/solutions/environmental-mrv" },
      { label: "E-mobility infrastructure", href: "/solutions/e-mobility" },
      { label: "Environmental data", href: "/solutions/environmental-data" },
      { label: "Green rewards", href: "/solutions/green-rewards" },
      { label: "Project funding", href: "/solutions/project-funding" },
      { label: "Payments and commerce", href: "/solutions/payments-commerce" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "E-mobility operators", href: "/industries/e-mobility" },
      { label: "Renewable energy", href: "/industries/renewable-energy" },
      { label: "Waste and recycling", href: "/industries/waste-recycling" },
      { label: "Clean cooking", href: "/industries/clean-cooking" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const legalNavigation = [
  { label: "Privacy notice", href: "/privacy" },
  { label: "Website terms", href: "/terms" },
  { label: "Cookie information", href: "/cookies" },
] as const;
