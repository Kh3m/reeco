import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { EmailForm } from "@/components/ui/EmailForm";
import { IconCheck } from "@/components/ui/icons";

const BULLETS = [
  "The 7 most common gaps that quietly drain revenue",
  "Where to look in your own customer journey",
  "What to fix first for the fastest impact",
];

export function LeadMagnet() {
  return (
    <Section id="lead-magnet" className="border-t border-border">
      <div className="overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-b from-surface to-background">
        <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow>Free Checklist</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              7 Customer Journey Gaps Costing Businesses Revenue
            </h2>
            <ul className="mt-8 space-y-3">
              {BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm leading-6 text-muted">{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-background/60 p-6 sm:p-8">
              <p className="text-sm text-muted">
                Get the checklist sent straight to your inbox.
              </p>
              <EmailForm
                variant="lead"
                cta="Download Free Checklist"
                className="mt-5"
              />
              <p className="mt-4 text-xs text-faint">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
