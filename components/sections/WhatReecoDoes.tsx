import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconAudit,
  IconLifecycle,
  IconSystems,
} from "@/components/ui/icons";

const PILLARS = [
  {
    icon: IconAudit,
    title: "Customer Journey Audits",
    description:
      "We map the full path your customers take — from first touch to repeat purchase — and pinpoint exactly where revenue leaks out.",
  },
  {
    icon: IconLifecycle,
    title: "Lifecycle Marketing",
    description:
      "Welcome flows, post-purchase sequences, replenishment and winback — the right message at the right moment in the customer's journey.",
  },
  {
    icon: IconSystems,
    title: "Growth Systems",
    description:
      "Repeatable systems that turn one-time buyers into long-term customers, so growth compounds instead of resetting every month.",
  },
];

export function WhatReecoDoes() {
  return (
    <Section id="what-we-do" className="border-t border-border">
      <Reveal>
        <Eyebrow>What ReeCo Does</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          Three levers for sustainable, compounding growth.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal as="div" key={pillar.title} delay={i * 100}>
            <article className="group h-full rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/40">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <pillar.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {pillar.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
