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
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="animate-float-a absolute left-1/2 top-[-20%] h-[55rem] w-[55rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="animate-float-b absolute right-[-10%] top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#7a5c12]/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <Container className="relative z-10 py-24 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: message */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Marketing Strategy &amp; Customer Journeys
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mx-auto mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:mx-0 lg:text-6xl">
                Most businesses don&apos;t have a traffic problem.
                <span className="text-shine mt-2 block">
                  They have a customer journey problem.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-muted lg:mx-0">
                Helping businesses uncover revenue leaks, improve customer
                journeys, increase retention, and build systems that drive
                long-term growth.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
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
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-faint sm:gap-x-5 lg:justify-start">
                {TOPICS.map((topic, i) => (
                  <span
                    key={topic}
                    className="flex items-center gap-x-3 sm:gap-x-5"
                  >
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-faint"
                      />
                    )}
                    {topic}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: customer-journey visual */}
          <Reveal delay={200} className="lg:pl-4">
            <div className="relative mx-auto max-w-md">
              {/* Glow behind the card */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] bg-accent/5 blur-2xl"
              />
              <div className="relative rounded-3xl border border-border bg-surface/50 p-6 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8">
                {/* Top accent hairline */}
                <div
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
                    The Customer Journey
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Mapped
                  </span>
                </div>

                <ol className="relative mt-8 space-y-6">
                  {/* Connector spine */}
                  <div
                    aria-hidden
                    className="absolute left-[18px] top-5 bottom-5 w-px bg-gradient-to-b from-border via-accent/40 to-accent"
                  />
                  {JOURNEY.map((stage, i) => (
                    <li
                      key={stage.label}
                      className="relative flex items-center gap-4"
                    >
                      <span
                        className={
                          stage.focus
                            ? "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-background shadow-[0_0_20px_-2px_var(--color-accent)]"
                            : "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted"
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
                        <span className="rounded-full border border-accent/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                          Focus
                        </span>
                      )}
                    </li>
                  ))}
                </ol>

                <p className="mt-8 border-t border-border pt-5 text-sm leading-6 text-muted">
                  Most revenue is won — or lost —{" "}
                  <span className="text-foreground">after the first sale.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#what-we-do"
        aria-label="Scroll to what we do"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-faint transition-colors hover:text-accent"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-scroll-cue"
          aria-hidden
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
