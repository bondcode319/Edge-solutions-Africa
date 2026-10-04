import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { mainNavigation, footerNavigation } from "@/config/site";

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
