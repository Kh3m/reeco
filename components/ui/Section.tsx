import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Render without the centered Container (for full-bleed sections). */
  bare?: boolean;
};

/** Vertical rhythm wrapper for a page section. */
export function Section({ children, id, className, bare }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 sm:py-32", className)}>
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
