import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "gold" | "outline-ink";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Light surfaces
  primary: "bg-cta text-on-cta hover:bg-cta-hover",
  secondary:
    "border border-foreground/25 text-foreground hover:border-foreground hover:bg-surface",
  // Dark (ink) surfaces
  gold: "bg-gold text-ink hover:bg-gold-soft focus-visible:ring-offset-ink",
  "outline-ink":
    "border border-on-ink/30 text-on-ink hover:border-on-ink focus-visible:ring-offset-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/** Button styling for elements that can't use <Button> (e.g. tracked links). */
export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Primary/secondary call-to-action. Renders a Next.js <Link> when `href` is
 * provided, otherwise a native <button>.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClassName({ variant, size, className });

  if (rest.href !== undefined) {
    return (
      <Link
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
          href: string;
        })}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
