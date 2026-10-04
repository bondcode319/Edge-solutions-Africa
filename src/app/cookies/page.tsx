import type { Metadata } from "next";
import { LegalContent } from "@/components/sections/LegalContent";
import { cookiesPage } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: cookiesPage.title,
  description: cookiesPage.summary,
  path: "/cookies",
});

export default function CookiesPage() {
  return <LegalContent page={cookiesPage} />;
}
