import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { buttonClassName } from "@/components/ui/Button";
import { TrackedLink } from "./TrackedLink";

/** Minimal landing header: wordmark, one nav link, theme switch, one CTA. */
export function LandingHeader({
  page,
  ctaLabel,
}: {
  page: string;
  ctaLabel: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <Logo />
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#how-it-works"
            className="hidden text-sm text-muted transition-colors hover:text-foreground md:inline"
          >
            How it works
          </a>
          {/* cn() doesn't merge conflicting classes, so hide via a wrapper. */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <TrackedLink
            href="#book"
            page={page}
            location="header"
            className={buttonClassName({ size: "sm" })}
          >
            {ctaLabel}
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
