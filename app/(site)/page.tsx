import { Hero } from "@/components/sections/Hero";
import { WhatReecoDoes } from "@/components/sections/WhatReecoDoes";
import { JourneyRoadmap } from "@/components/sections/JourneyRoadmap";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Metadata } from "next";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatReecoDoes />
      <JourneyRoadmap />
      <LeadMagnet />
      <InsightsPreview />
      <About />
      <FinalCta />
    </main>
  );
}
