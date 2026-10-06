import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Figure } from "@/components/ui/Figure";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { mainNavigation, footerNavigation } from "@/config/site";
import {
  buildPrompt,
  getImage,
  getIndustryImage,
  getInsightImage,
  getSolutionImage,
  imageManifest,
  referenceAnchor,
  REFERENCE_ANCHOR_ID,
} from "@/content/images";

describe("StatusBadge", () => {
  it("communicates status with text, not colour alone", () => {
    render(<StatusBadge status="concept" />);
    expect(screen.getByText("Concept")).toBeInTheDocument();
  });

  it("renders an explicit label when a status is unconfirmed", () => {
    render(<StatusBadge status="to-be-confirmed" />);
    expect(screen.getByText("Status to be confirmed")).toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("shows 'To be confirmed' rather than inventing contact details", () => {
    render(<SiteFooter />);
    expect(screen.getAllByText("To be confirmed").length).toBeGreaterThan(0);
  });

  it("states the reward, credit and payment boundaries", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText(/are not carbon credits/i)).toBeInTheDocument();
    expect(
      within(footer).getByText(/is not a licensed payment service provider/i),
    ).toBeInTheDocument();
  });
});

describe("image manifest", () => {
  it("gives every image a unique id and file path", () => {
    const ids = imageManifest.map((image) => image.id);
    expect(new Set(ids).size).toBe(ids.length);

    const files = imageManifest.map((image) => image.file);
    expect(new Set(files).size).toBe(files.length);
  });

  it("requires every image to declare exclusions, not just a scene", () => {
    // An entry without `negative` could quietly generate readable text or an
    // identifiable subject, which would assert something unconfirmed.
    for (const image of imageManifest) {
      expect(image.negative.length, `${image.id} has no exclusions`).toBeGreaterThan(20);
      expect(image.prompt.length, `${image.id} has no prompt`).toBeGreaterThan(20);
    }
  });

  it("excludes readable text and logos from every content image", () => {
    for (const image of imageManifest) {
      expect(image.negative, `${image.id} allows logos`).toMatch(/no logo/i);

      // Social cards are the deliberate exception: they exist to carry the
      // wordmark. Any other image claiming that exception is asserting a
      // company claim in an image, which is not allowed.
      if (image.allowText) {
        expect(image.file, `${image.id} opts out of the no-text rule`).toMatch(
          /\/brand\/og-/,
        );
        expect(image.negative, `${image.id} allows stray text`).toMatch(/no stray text/i);
      } else {
        expect(image.negative, `${image.id} allows text`).toMatch(/no text|no lettering/i);
        expect(image.negative, `${image.id} allows numbers`).toMatch(/no numbers/i);
      }
    }
  });

  it("keeps the social cards, the only images that may contain text", () => {
    const withTextIntent = imageManifest.filter(
      (image) => !/no text|no lettering/i.test(image.negative),
    );
    for (const image of withTextIntent) {
      expect(
        image.file,
        `${image.id} omits text exclusions but is not a social card`,
      ).toMatch(/\/brand\/og-/);
    }
  });

  it("excludes figures that would imply an operator or deployment", () => {
    const photographic = imageManifest.filter((image) => image.style === "A");
    expect(photographic.length).toBeGreaterThan(0);
    for (const image of photographic) {
      expect(image.negative, `${image.id} may imply a relationship`).toMatch(
        /no logos|no readable signage|no identifiable/i,
      );
    }
  });

  it("requires alt text unless the image is decorative", () => {
    for (const image of imageManifest) {
      const decorative = image.alt === "";
      if (decorative) {
        expect(image.file, `${image.id} is decorative but is content art`).toMatch(
          /hero-field|og-/,
        );
      } else {
        expect(image.alt.length, `${image.id} has a placeholder alt`).toBeGreaterThan(15);
      }
    }
  });

  it("composes prompts with the style anchor and the exclusions", () => {
    const prompt = buildPrompt(referenceAnchor());
    expect(referenceAnchor().id).toBe(REFERENCE_ANCHOR_ID);
    expect(prompt).toContain("STYLE:");
    expect(prompt).toContain("STRICTLY AVOID:");
    expect(prompt).toContain(referenceAnchor().prompt);
  });

  it("never produces a prompt that contradicts itself", () => {
    for (const image of imageManifest) {
      const prompt = buildPrompt(image);

      // A style anchor that bans text on an image whose whole purpose is text
      // produces a worse image than no prompt at all. Catch it here.
      if (image.allowText) {
        expect(
          prompt,
          `${image.id} asks for a wordmark but its style bans text`,
        ).not.toMatch(/STYLE:[^]*\bno text\b/);
      }

      // Conversely, content art must never be asked to render words.
      if (!image.allowText) {
        expect(prompt, `${image.id} style bans text but prompt lacks exclusions`).toMatch(
          /no text|no lettering/i,
        );
      }
    }
  });

  it("resolves art for every solution and industry that has a route", () => {
    for (const solution of solutions) {
      expect(getSolutionImage(solution.slug), `no art for ${solution.slug}`).toBeDefined();
    }
    for (const industry of industries.filter((item) => item.hasDetailPage)) {
      expect(getIndustryImage(industry.slug), `no art for ${industry.slug}`).toBeDefined();
    }
  });

  it("resolves a cover for every article", () => {
    for (const article of articles) {
      expect(getInsightImage(article.slug), `no cover for ${article.slug}`).toBeDefined();
    }
  });

  it("generates the reference anchor before anything that depends on it", () => {
    // The anchor must not chain a reference to itself, or generation deadlocks.
    expect(referenceAnchor().id).toBe(REFERENCE_ANCHOR_ID);
    expect(referenceAnchor().useReference).toBeUndefined();
  });
});

describe("Figure", () => {
  it("renders nothing when the image is absent", () => {
    const { container } = render(<Figure image={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("labels illustrative artwork so it cannot read as a result", () => {
    const image = getImage("home-value-gap");
    expect(image?.illustrative).toBe(true);

    render(<Figure image={image} />);
    const figure = screen.getByRole("figure");
    expect(within(figure).getByText(/illustrative/i)).toBeInTheDocument();
  });

  it("never renders a placeholder for decorative art", () => {
    const field = getImage("hero-field-dark");
    expect(field?.alt).toBe("");
    const { container } = render(<Figure image={field} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("content integrity", () => {
  it("gives every solution a unique slug", () => {
    const slugs = solutions.map((solution) => solution.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("points every solution at related solutions that exist", () => {
    const slugs = new Set(solutions.map((solution) => solution.slug));
    for (const solution of solutions) {
      for (const related of solution.related) {
        expect(slugs.has(related), `${solution.slug} -> ${related}`).toBe(true);
      }
    }
  });

  it("points every industry at solutions that exist", () => {
    const slugs = new Set(solutions.map((solution) => solution.slug));
    for (const industry of industries) {
      for (const related of industry.relatedSolutions) {
        expect(slugs.has(related), `${industry.slug} -> ${related}`).toBe(true);
      }
    }
  });

  it("keeps every article a dated-free draft until the company publishes it", () => {
    for (const article of articles) {
      if (article.status === "draft") {
        expect(article.publishedAt).toBeNull();
      }
    }
  });

  it("keeps the top-level navigation to six items", () => {
    expect(mainNavigation).toHaveLength(6);
  });

  it("links only to routes that exist in the app", () => {
    const known = new Set([
      "/",
      "/about",
      "/platform",
      "/solutions",
      "/industries",
      "/partners",
      "/insights",
      "/contact",
      "/privacy",
      "/terms",
      "/cookies",
      ...solutions.map((solution) => `/solutions/${solution.slug}`),
      ...industries
        .filter((industry) => industry.hasDetailPage)
        .map((industry) => `/industries/${industry.slug}`),
    ]);

    const hrefs = [
      ...mainNavigation.flatMap((item) => [
        item.href,
        ...(item.sections?.flatMap((section) => section.links.map((link) => link.href)) ?? []),
        ...(item.featured ? [item.featured.href] : []),
      ]),
      ...footerNavigation.flatMap((group) => group.links.map((link) => link.href)),
    ];

    for (const href of hrefs) {
      const path = href.split("#")[0]!;
      expect(known.has(path), `unknown route: ${href}`).toBe(true);
    }
  });
});
