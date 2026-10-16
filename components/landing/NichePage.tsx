import type { NicheConfig } from "@/lib/niches";
import { BOOKING_URL } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClassName } from "@/components/ui/Button";
import { IconArrowRight, IconCheck, IconPlus } from "@/components/ui/icons";
import { LandingHeader } from "./LandingHeader";
import { LandingFooter } from "./LandingFooter";
import { SectionHeading } from "./SectionHeading";
import { TrackedLink } from "./TrackedLink";
import { Vsl } from "./Vsl";
import { EnquiryForm } from "./EnquiryForm";

const pad = (i: number) => String(i + 1).padStart(2, "0");

const CALL_POINTS = [
  "A short, practical conversation",
  "About your current process — no preparation needed",
  "No obligation to go further",
];

/**
 * The shared niche landing-page template. Section order follows the PRD:
 * header → hero → VSL → problems → capabilities → how it works → who it's for
 * → FAQ → final CTA (with the enquiry form) → footer. Everything niche-specific
 * comes from `niche`; layout changes here roll out to every page.
 */
export function NichePage({ niche }: { niche: NicheConfig }) {
  const page = niche.analyticsId;
  const { hero } = niche;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: niche.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <LandingHeader page={page} ctaLabel={hero.primaryCta} />

      <main id="main-content" data-niche={page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Hero + VSL */}
        <section
          aria-labelledby="hero-title"
          className="pb-20 pt-14 sm:pb-28 sm:pt-20"
        >
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {hero.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={60}>
                <h1
                  id="hero-title"
                  className="mt-6 text-balance font-display text-[2.35rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]"
                >
                  {hero.headline.lead}
                  {hero.headline.accent && (
                    <>
                      {" "}
                      <em className="block text-accent">
                        {hero.headline.accent}
                      </em>
                    </>
                  )}
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted">
                  {hero.supporting}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <TrackedLink
                    href="#book"
                    page={page}
                    location="hero"
                    className={buttonClassName({
                      size: "lg",
                      className: "group",
                    })}
                  >
                    {hero.primaryCta}
                    <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </TrackedLink>
                  {hero.secondaryCta && (
                    <TrackedLink
                      href={hero.secondaryCta.href}
                      page={page}
                      location="hero-secondary"
                      className={buttonClassName({
                        variant: "secondary",
                        size: "lg",
                      })}
                    >
                      {hero.secondaryCta.label}
                    </TrackedLink>
                  )}
                </div>
              </Reveal>
              <Reveal delay={220}>
                <p className="mx-auto mt-8 max-w-xl font-display text-lg italic leading-7 text-muted">
                  {hero.positioning}
                </p>
              </Reveal>
            </div>

            {/* The niche's core journey */}
            <Reveal delay={260}>
              <ol
                aria-label="The customer journey ReeCo helps organise"
                className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-3 text-sm"
              >
                {hero.journey.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-foreground">
                      <span className="text-xs font-semibold text-accent">
                        {pad(i)}
                      </span>
                      {step}
                    </span>
                    {i < hero.journey.length - 1 && (
                      <IconArrowRight
                        aria-hidden
                        className="h-3.5 w-3.5 text-faint"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={300}>
              <div id="video" className="mx-auto mt-14 max-w-4xl scroll-mt-24">
                <h2 className="sr-only">{niche.vsl.heading}</h2>
                <Vsl
                  page={page}
                  title={niche.vsl.heading}
                  video={niche.vsl.video}
                  transcript={niche.vsl.transcript}
                />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Problem recognition */}
        <section
          id="where-it-slips"
          aria-labelledby="problems-title"
          className="border-t border-border bg-surface-2/50 py-20 sm:py-28"
        >
          <Container>
            <Reveal>
              <SectionHeading
                id="problems-title"
                eyebrow="Where it slips"
                title={niche.problems.heading}
                intro={niche.problems.intro}
              />
            </Reveal>
            <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {niche.problems.items.map((item, i) => (
                <Reveal as="li" key={item.title} delay={(i % 2) * 80}>
                  <div className="border-t border-foreground/15 pt-6">
                    <span className="font-display text-sm italic text-accent">
                      {pad(i)}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-muted">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* What ReeCo helps organise */}
        <section
          id="what-we-organise"
          aria-labelledby="capabilities-title"
          className="border-t border-border py-20 sm:py-28"
        >
          <Container>
            <Reveal>
              <SectionHeading
                id="capabilities-title"
                eyebrow="Capabilities"
                title={niche.capabilities.heading}
                intro={niche.capabilities.intro}
              />
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {niche.capabilities.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7">
                    <div aria-hidden className="h-px w-8 bg-gold" />
                    <h3 className="mt-6 text-lg font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                      {item.body}
                    </p>
                    <p className="mt-6 border-t border-border pt-4 text-sm leading-6 text-foreground">
                      <span className="block text-xs font-medium uppercase tracking-[0.16em] text-accent">
                        Outcome
                      </span>
                      {item.outcome}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          aria-labelledby="process-title"
          className="border-t border-border bg-surface-2/50 py-20 sm:py-28"
        >
          <Container>
            <Reveal>
              <SectionHeading
                id="process-title"
                eyebrow="Three steps"
                title={niche.process.heading}
              />
            </Reveal>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {niche.process.steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 90}>
                  <span
                    aria-hidden
                    className="font-display text-6xl font-medium leading-none text-accent"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* Who it is for */}
        <section
          id="who-its-for"
          aria-labelledby="audience-title"
          className="border-t border-border py-20 sm:py-28"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <Reveal>
                <SectionHeading
                  id="audience-title"
                  eyebrow="Fit"
                  title={niche.audience.heading}
                  intro={niche.audience.intro}
                />
                <ul className="mt-10 space-y-4">
                  {niche.audience.fits.map((fit) => (
                    <li key={fit} className="flex gap-3">
                      <IconCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <span className="leading-7 text-foreground">{fit}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
                  <h3 className="font-display text-2xl font-medium text-foreground">
                    {niche.audience.expectationsHeading}
                  </h3>
                  <ul className="mt-6 space-y-5">
                    {niche.audience.expectations.map((e) => (
                      <li
                        key={e}
                        className="border-l-2 border-gold pl-4 text-sm leading-6 text-muted"
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="border-t border-border bg-surface-2/50 py-20 sm:py-28"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <Reveal>
                <SectionHeading
                  id="faq-title"
                  eyebrow="FAQ"
                  title="Common questions"
                  className="lg:sticky lg:top-28"
                />
              </Reveal>
              <Reveal delay={80}>
                <div className="divide-y divide-border border-y border-border">
                  {niche.faq.map((f) => (
                    <details key={f.q} className="group">
                      <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left text-base font-medium text-foreground">
                        {f.q}
                        <IconPlus className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
                      </summary>
                      <p className="-mt-1 pb-6 pr-10 leading-7 text-muted">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Final CTA + enquiry / booking */}
        <section
          id="book"
          aria-labelledby="book-title"
          className="bg-ink py-20 sm:py-28"
        >
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal>
                <div aria-hidden className="h-px w-12 bg-gold" />
                <h2
                  id="book-title"
                  className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-on-ink sm:text-5xl"
                >
                  {niche.finalCta.heading}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-8 text-on-ink-muted">
                  {niche.finalCta.body}
                </p>
                <ul className="mt-8 space-y-3 text-sm text-on-ink-muted">
                  {CALL_POINTS.map((t) => (
                    <li key={t} className="flex gap-3">
                      <IconCheck className="h-5 w-5 shrink-0 text-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-2xl border border-border bg-surface p-6 sm:p-9">
                  <h3 className="font-display text-2xl font-medium text-foreground">
                    {niche.enquiry.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {niche.enquiry.intro}
                  </p>
                  <div className="mt-7">
                    <EnquiryForm
                      niche={page}
                      companyLabel={niche.enquiry.companyLabel}
                      challengePlaceholder={niche.enquiry.challengePlaceholder}
                      note={niche.enquiry.note}
                      bookingUrl={BOOKING_URL || undefined}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}
