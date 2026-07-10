import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EmailForm } from "@/components/ui/EmailForm";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav";

const YEAR = 2026; // TODO: derive dynamically once a server timestamp is wired.

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-muted">
              Helping businesses uncover revenue leaks, improve customer
              journeys, and build systems that drive long-term growth.
            </p>
          </div>

          <div
            id="newsletter"
            className="scroll-mt-24 md:justify-self-end md:text-right"
          >
            <p className="text-sm font-medium text-foreground">
              Join the newsletter
            </p>
            <p className="mt-2 text-sm text-muted">
              Strategy on customer journeys, retention, and growth — in your
              inbox.
            </p>
            <EmailForm
              variant="newsletter"
              className="mt-4 md:ml-auto md:max-w-md"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-faint">
            © {YEAR} ReeCo. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
