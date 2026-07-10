import { Hero } from "@/components/sections/Hero";
import { WhatReecoDoes } from "@/components/sections/WhatReecoDoes";
import { JourneyRoadmap } from "@/components/sections/JourneyRoadmap";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
