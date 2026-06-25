import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Strategy, frameworks, and field notes on customer journeys, lifecycle marketing, retention, and growth.",
};

/**
 * Insights Hub — placeholder.
 * Milestone 4 replaces this with a Sanity-backed article index (category
 * filtering) and dynamic [slug] article pages.
 */
export default function InsightsPage() {
  return (
    <main className="pt-16">
      <Section>
        <Eyebrow>Insights Hub</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
          Insights are on the way.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          We&apos;re building the Insights Hub — strategy and field notes on
          customer journeys, lifecycle marketing, retention, and growth.
          Subscribe to the newsletter to get them first.
        </p>
      </Section>
    </main>
  );
}
