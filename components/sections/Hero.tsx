import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";
import { CTA_HREF } from "@/components/layout/nav";

const TOPICS = [
  "Customer Journey Audits",
  "Lifecycle Marketing",
  "Retention",
  "Growth Systems",
];

// The four arcs of the journey. The post-sale stages (where ReeCo focuses) are
// highlighted to make the value proposition legible at a glance.
const JOURNEY = [
  { label: "Acquire", note: "Ads & landing pages", focus: false },
  { label: "Convert", note: "Email signup & welcome", focus: false },
  { label: "Retain", note: "Post-purchase & replenish", focus: true },
  { label: "Grow", note: "Winback & loyalty", focus: true },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: message */}
          <div>
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Marketing Strategy &amp; Customer Journeys
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 max-w-2xl font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Most businesses don&apos;t have a traffic problem.{" "}
                <em className="text-accent">
                  They have a customer journey problem.
                </em>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
                Helping businesses uncover revenue leaks, improve customer
                journeys, increase retention, and build systems that drive
                long-term growth.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href={CTA_HREF} size="lg" className="group">
                  Get the Audit Checklist
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button href="/insights" variant="secondary" size="lg">
                  Explore Insights
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-6 text-xs uppercase tracking-[0.16em] text-faint">
                {TOPICS.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: customer-journey visual */}
          <Reveal delay={200}>
            <div className="relative mx-auto max-w-md rounded-2xl border border-border bg-surface p-6 shadow-[0_24px_60px_-30px_rgba(17,17,17,0.25)] sm:p-8">
              <div
                aria-hidden
                className="absolute inset-x-8 top-0 h-px bg-gold"
              />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
                The Customer Journey
              </p>

              <ol className="relative mt-8 space-y-6">
                <div
                  aria-hidden
                  className="absolute bottom-5 left-[18px] top-5 w-px bg-border"
                />
                {JOURNEY.map((stage, i) => (
                  <li key={stage.label} className="relative flex items-center gap-4">
                    <span
                      className={
                        stage.focus
                          ? "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-gold"
                          : "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-muted"
                      }
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {stage.label}
                      </p>
                      <p className="text-xs text-muted">{stage.note}</p>
                    </div>
                    {stage.focus && (
                      <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                        Focus
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <p className="mt-8 border-t border-border pt-5 font-display text-lg leading-7 text-muted">
                Most revenue is won — or lost —{" "}
                <em className="text-foreground">after the first sale.</em>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
