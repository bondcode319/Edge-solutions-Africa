/**
 * Legal page content.
 *
 * IMPORTANT: this content is a structured starting point written by the build
 * team. It has NOT been reviewed by a qualified legal adviser, contains no
 * legal opinion, and asserts no licence, approval or certification. Every page
 * renders a visible review notice until the company confirms otherwise by
 * setting NEXT_PUBLIC_LEGAL_REVIEWED=true.
 *
 * See docs/LEGAL-REVIEW.md for the list of items requiring review.
 */

export const legalReviewed = process.env.NEXT_PUBLIC_LEGAL_REVIEWED === "true";

export const legalReviewNotice =
  "This notice is a working draft prepared during website development. It has not yet been reviewed or approved by a qualified legal adviser and should not be relied on. Final wording, the identity of the data controller and the applicable jurisdiction must be confirmed before launch.";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  summary: string;
  sections: LegalSection[];
};

export const privacyPage: LegalPage = {
  slug: "privacy",
  title: "Privacy notice",
  summary:
    "How Edge Solutions Africa handles personal data collected through this website.",
  sections: [
    {
      heading: "Who this notice covers",
      paragraphs: [
        "This notice describes how personal data submitted through this website is handled. The identity and contact details of the data controller, and the jurisdiction whose data protection law applies, are to be confirmed by the company before launch.",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "This website collects personal data only where you choose to submit it through the enquiry form.",
      ],
      list: [
        "Full name",
        "Work email address",
        "Organisation name",
        "Job title, where you choose to provide it",
        "Country",
        "Organisation type and area of interest",
        "The content of your message",
      ],
    },
    {
      heading: "Why we collect it",
      paragraphs: [
        "Enquiry data is used to respond to your enquiry and to assess whether a working relationship is appropriate. It is not used for automated decision-making and is not sold.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "This website does not set advertising cookies and does not embed third-party tracking scripts by default. Where an analytics provider is configured by the company, it will be described on the cookie information page and, where consent is required, requested before any non-essential data is collected.",
      ],
    },
    {
      heading: "Retention",
      paragraphs: [
        "Enquiry data is retained for as long as needed to respond and to maintain a record of the enquiry. A specific retention period is to be confirmed by the company.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Depending on the applicable law, you may have rights to access, correct, delete or restrict the processing of your personal data, and to object to processing. The route for exercising those rights will be published once the company confirms its contact details.",
      ],
    },
    {
      heading: "Platform data",
      paragraphs: [
        "This notice covers the website only. Operational and environmental data processed through the platform for partner organisations is governed by the agreement with that organisation, and personal data within it is minimised by design. Raw location traces and passenger information are not published.",
      ],
    },
  ],
};

export const termsPage: LegalPage = {
  slug: "terms",
  title: "Website terms",
  summary: "The terms on which this website is made available.",
  sections: [
    {
      heading: "About these terms",
      paragraphs: [
        "These terms govern your use of this website. The governing law and the company details to which these terms refer are to be confirmed before launch.",
      ],
    },
    {
      heading: "Informational purpose",
      paragraphs: [
        "The content of this website is provided for general information about Edge Solutions Africa and the infrastructure it is building. It does not constitute an offer, a contract, financial advice, investment advice, or a solicitation to acquire any product, security or digital asset.",
      ],
    },
    {
      heading: "Forward-looking descriptions",
      paragraphs: [
        "This website describes capabilities at different stages of development. Capabilities described as concept, in development, in pilot preparation or planned are not currently available, and no commitment is made that they will become available, or on what timeline or terms.",
      ],
    },
    {
      heading: "No environmental or financial guarantees",
      paragraphs: [
        "Nothing on this website guarantees a particular environmental outcome or financial result. Environmental figures shown in illustrative or simulated examples are labelled as such and do not represent verified results.",
      ],
    },
    {
      heading: "Rewards, funding and payments",
      paragraphs: [
        "Green Points are described as a proposed reward mechanism. They are not carbon credits, do not represent a fixed quantity of carbon dioxide equivalent, and are not cash. Edge Solutions Africa is not a bank, payment institution or licensed payment service provider and does not hold customer funds. Any payment functionality would operate through appropriately licensed providers.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The content and design of this website belong to Edge Solutions Africa unless stated otherwise. You may read and share it, but may not reproduce it commercially without permission.",
      ],
    },
    {
      heading: "External links",
      paragraphs: [
        "Where this website links to external sites, we are not responsible for their content or their handling of your data.",
      ],
    },
  ],
};

export const cookiesPage: LegalPage = {
  slug: "cookies",
  title: "Cookie information",
  summary: "What this website stores in your browser, and why.",
  sections: [
    {
      heading: "Current position",
      paragraphs: [
        "This website does not currently set advertising or cross-site tracking cookies, and does not embed third-party marketing scripts.",
      ],
    },
    {
      heading: "Strictly necessary storage",
      paragraphs: [
        "Basic technical storage may be used to keep the site working correctly — for example rate-limiting protection on the enquiry form, which uses a short-lived server-side record rather than a cookie.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "The website includes an integration point for a privacy-conscious analytics provider. No analytics provider is active unless the company configures one. If one is configured, this page will describe what it collects, and where consent is required it will be requested before any non-essential data is collected.",
      ],
    },
    {
      heading: "Managing storage",
      paragraphs: [
        "You can clear or block browser storage for this site at any time through your browser settings. Doing so will not prevent you from reading the site.",
      ],
    },
  ],
};

export const legalPages = [privacyPage, termsPage, cookiesPage];
