import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

const STAGES = [
  "Sales Ad",
  "Landing Page",
  "Email Signup",
  "Welcome Flow",
  "Purchase",
  "Post-Purchase",
  "Replenishment",
  "Winback",
];

export function JourneyRoadmap() {
  return (
    <Section id="roadmap" className="border-t border-border bg-surface/40">
      <Reveal>
        <Eyebrow>The Customer Journey</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
          Every customer travels a path. Most businesses only build the first
          two steps.
        </h2>
      </Reveal>

      {/* Stage flow: horizontal wrapping on desktop, vertical on mobile */}
      <ol className="mt-16 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {STAGES.map((stage, i) => (
          <Reveal
            as="li"
            key={stage}
            delay={i * 70}
            className="flex flex-col items-center gap-3 sm:flex-row"
          >
            <div className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 sm:w-auto sm:justify-start">
              <span className="font-display text-sm font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-foreground">
                {stage}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <IconArrowRight
                className="h-4 w-4 shrink-0 rotate-90 text-faint sm:rotate-0"
                aria-hidden
              />
            )}
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <p className="mt-12 max-w-xl text-lg leading-8 text-muted">
          The goal isn&apos;t just one sale.{" "}
          <span className="text-foreground">
            It&apos;s turning a first-time buyer into a long-term customer.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
