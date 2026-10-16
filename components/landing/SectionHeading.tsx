import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  /** id for the h2, so the section can use aria-labelledby. */
  id?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-[2.6rem]"
      >
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>}
    </div>
  );
}
