import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA_HREF } from "@/components/layout/nav";

export function FinalCta() {
  return (
    <Section className="border-t border-border">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-20 text-center sm:px-12">
        <div aria-hidden className="absolute inset-x-1/4 top-0 h-px bg-gold" />
        <Reveal className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-on-ink sm:text-5xl">
            Ready to improve your customer journey?
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={CTA_HREF} size="lg" variant="gold">
              Download the Checklist
            </Button>
            <Button href="/#newsletter" variant="outline-ink" size="lg">
              Join the Newsletter
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
