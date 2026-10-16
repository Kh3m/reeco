import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

/** Small uppercase gold label that sits above section headings. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-gold" />
      {children}
    </span>
  );
}
