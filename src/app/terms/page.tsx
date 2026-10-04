import type { Metadata } from "next";
import { LegalContent } from "@/components/sections/LegalContent";
import { termsPage } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: termsPage.title,
  description: termsPage.summary,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalContent page={termsPage} />;
}
