import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";

// The six Insights Hub categories from the requirements. These will map to
// Sanity `category` documents in Milestone 4; for now they link to /insights.
const CATEGORIES = [
  {
    title: "Customer Journey Audits",
    blurb: "Map the full path and find where revenue leaks out.",
  },
  {
    title: "Revenue Leak Audits",
    blurb: "Spot the silent gaps draining profit after the click.",
  },
  {
    title: "Lifecycle Marketing",
    blurb: "Right message, right moment — from welcome to winback.",
  },
  {
    title: "Growth Systems",
    blurb: "Repeatable systems that make growth compound.",
  },
  {
    title: "Retention Marketing",
    blurb: "Turn first-time buyers into long-term customers.",
  },
  {
    title: "Business Strategy",
    blurb: "The thinking behind durable, profitable growth.",
  },
];

export function InsightsPreview() {
  return (
    <Section id="insights" className="border-t border-border bg-surface/40">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Insights Hub</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              Strategy, frameworks, and field notes on growing customers.
            </h2>
          </div>
          <Button href="/insights" variant="secondary" className="shrink-0">
            Explore all insights
          </Button>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category, i) => (
          <Reveal as="div" key={category.title} delay={(i % 3) * 80}>
            <Link
              href="/insights"
              className="group flex h-full flex-col justify-between gap-8 bg-background p-8 transition-colors duration-300 hover:bg-surface-2"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <div className="flex items-end justify-between gap-4">
                <p className="text-sm leading-6 text-muted">
                  {category.blurb}
                </p>
                <IconArrowRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
