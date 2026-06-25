import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Typographic ReeCo wordmark for the dark canvas: "Ree" in white, "Co" in
 * gold — mirroring the brand logo's color split.
 *
 * NOTE: the supplied logo files (public/images/*.jpeg) have solid white
 * backgrounds and can't sit on the black UI. Replace this with transparent
 * SVG/PNG logo assets (a white/gold variant for dark backgrounds) when ready.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ReeCo — home"
      className={cn(
        "text-2xl font-bold tracking-tight transition-opacity hover:opacity-80",
        className,
      )}
    >
      <span className="text-foreground">Ree</span>
      <span className="text-accent">Co</span>
    </Link>
  );
}
