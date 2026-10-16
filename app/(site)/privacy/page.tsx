import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ReeCo collects, uses and protects the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

// TODO(client): confirm final wording, business/legal entity details, and any
// consent requirements for the target markets before launch.
const LAST_UPDATED = "16 October 2026";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "What we collect",
    body: (
      <>
        <p>
          When you submit an enquiry, we collect the details you enter: your
          name, business email, company name and, if you choose to share them,
          your website and a short description of your follow-up challenge. We
          also record which page you enquired from, so we know which service
          you’re interested in.
        </p>
        <p>
          If you download a resource or join the newsletter, we collect your
          email address and, where asked, your first name.
        </p>
        <p>
          Please don’t send health, medical or patient information through this
          website. We don’t need it, and our forms aren’t designed to hold it.
        </p>
      </>
    ),
  },
  {
    title: "How we use it",
    body: (
      <>
        <p>
          Enquiry details are used only to respond to your enquiry and arrange
          a conversation. Submitting an enquiry does not sign you up to
          marketing emails.
        </p>
        <p>
          Newsletter and resource sign-ups are used to send what you asked for
          and occasional related emails. Every email includes an unsubscribe
          link.
        </p>
      </>
    ),
  },
  {
    title: "Services we use",
    body: (
      <>
        <p>
          Form submissions are stored in Klaviyo, our customer relationship and
          email platform. The site is hosted on Vercel, which also provides
          privacy-friendly, cookie-free analytics that measure page views and
          interactions such as button clicks, video plays and form
          submissions, without identifying individual visitors.
        </p>
        <p>
          Videos are only loaded when you press play. Where a video is hosted
          on YouTube, it uses YouTube’s privacy-enhanced mode.
        </p>
      </>
    ),
  },
  {
    title: "Retention and your rights",
    body: (
      <p>
        We keep enquiry details for as long as needed to respond and for a
        reasonable period afterwards for our records. You can ask us to access,
        correct or delete your information at any time.
      </p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>
        For any privacy question or request, contact us
        {CONTACT_EMAIL ? (
          <>
            {" "}
            at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </>
        ) : (
          " using the enquiry form on any of our pages"
        )}
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="pt-16">
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Legal
        </p>
        <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-faint">Last updated {LAST_UPDATED}</p>

        <div className="mt-12 space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl font-medium text-foreground">
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 leading-7 text-muted">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
