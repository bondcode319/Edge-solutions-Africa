import type { Metadata } from "next";
import { LegalContent } from "@/components/sections/LegalContent";
import { privacyPage } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: privacyPage.title,
  description: privacyPage.summary,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalContent page={privacyPage} />;
}
