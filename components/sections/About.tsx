import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" className="border-t border-border">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">About ReeCo</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-8 font-display text-2xl font-medium leading-relaxed tracking-tight text-foreground sm:text-3xl">
            ReeCo explores how businesses attract, convert, retain, and grow
            customers.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 text-lg leading-8 text-muted">
            The focus is on building better customer journeys, stronger systems,
            and sustainable growth.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
