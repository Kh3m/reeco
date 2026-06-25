import { Hero } from "@/components/sections/Hero";
import { WhatReecoDoes } from "@/components/sections/WhatReecoDoes";
import { JourneyRoadmap } from "@/components/sections/JourneyRoadmap";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";

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
