import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/layout/Logo";
import { CONTACT_EMAIL } from "@/lib/site";

const YEAR = 2026; // TODO: derive dynamically once a server timestamp is wired.

export function LandingFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-muted">
              ReeCo helps businesses make better use of the enquiries and
              customer relationships they already have.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {CONTACT_EMAIL ? (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition-colors hover:text-foreground"
              >
                {CONTACT_EMAIL}
              </a>
            ) : (
              <a
                href="#book"
                className="transition-colors hover:text-foreground"
              >
                Contact
              </a>
            )}
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy policy
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              ReeCo home
            </Link>
          </nav>
        </div>
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-faint">
            © {YEAR} ReeCo. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
