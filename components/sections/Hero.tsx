import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CTA_HREF } from "@/components/layout/nav";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16">
      {/* Subtle gold glow anchored top-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
      />

      <Container className="relative py-24 text-center">
        <Reveal>
          <Eyebrow className="justify-center">
            Customer Journeys · Retention · Growth
          </Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-6xl">
            Most businesses don&apos;t have a traffic problem.
            <span className="block text-accent">
              They have a customer journey problem.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted">
            Helping businesses uncover revenue leaks, improve customer journeys,
            increase retention, and build systems that drive long-term growth.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={CTA_HREF} size="lg">
              Get the Customer Journey Audit Checklist
            </Button>
            <Button href="/insights" variant="secondary" size="lg">
              Explore Insights
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
