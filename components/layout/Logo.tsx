import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * ReeCo brand wordmark. `reeco-logo-dark.png` is derived from the supplied
 * public/images/reeco_logo.jpeg — background removed and the black "Ree"
 * recolored to the site's soft white so it sits on the dark navy canvas
 * (regenerate via the logo processing script if the source art changes).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ReeCo — home"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Image
        src="/images/reeco-logo-dark.png"
        alt="ReeCo"
        width={1081}
        height={274}
        sizes="130px"
        loading="eager"
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  );
}
