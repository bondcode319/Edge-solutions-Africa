import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValueGapSection } from "@/components/sections/ValueGapSection";
import { ApproachFlow } from "@/components/sections/ApproachFlow";
import { PlatformOverviewSection } from "@/components/sections/PlatformOverviewSection";
import { EMobilitySection } from "@/components/sections/EMobilitySection";
import { ExpansionSection } from "@/components/sections/ExpansionSection";
import { ValueFlowSection } from "@/components/sections/ValueFlowSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { AudiencesSection } from "@/components/sections/AudiencesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueGapSection />
      <ApproachFlow />
      <PlatformOverviewSection />
      <EMobilitySection />
      <ExpansionSection />
      <ValueFlowSection />
      <TrustSection />
      <AudiencesSection />
      <CtaSection />
    </>
  );
}
