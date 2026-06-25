import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA_HREF } from "@/components/layout/nav";

export function FinalCta() {
  return (
    <Section className="border-t border-border">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-20 text-center sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-1/2 mx-auto h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-3xl"
        />
        <Reveal className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight tracking-tight text-foreground sm:text-5xl">
            Ready to improve your customer journey?
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={CTA_HREF} size="lg">
              Download the Checklist
            </Button>
            <Button href="/#newsletter" variant="secondary" size="lg">
              Join the Newsletter
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
