import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

const LIGHT = { src: "/images/reeco-logo-light.png", width: 1065, height: 263 };
const DARK = { src: "/images/reeco-logo-dark.png", width: 1081, height: 274 };

/**
 * ReeCo brand wordmark, derived from the supplied public/images/reeco_logo.jpeg.
 * - `reeco-logo-light.png`: black "Ree" + gold "Co", transparent background.
 * - `reeco-logo-dark.png`: "Ree" recolored to cream for dark backgrounds.
 *
 * `tone="auto"` (default) follows the active colour theme; `tone="dark"` forces
 * the dark-background version (for ink bands, which are dark in both themes).
 */
export function Logo({
  className,
  tone = "auto",
  href = "/",
}: {
  className?: string;
  tone?: "auto" | "dark";
  href?: string;
}) {
  const imageClass = "h-7 w-auto sm:h-8";

  return (
    <Link
      href={href}
      aria-label="ReeCo — home"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-80",
        className,
      )}
    >
      {tone === "dark" ? (
        <Image {...DARK} alt="ReeCo" sizes="130px" className={imageClass} />
      ) : (
        <>
          <Image
            {...LIGHT}
            alt="ReeCo"
            sizes="130px"
            loading="eager"
            className={cn(imageClass, "dark:hidden")}
          />
          <Image
            {...DARK}
            alt="ReeCo"
            sizes="130px"
            loading="eager"
            className={cn(imageClass, "hidden dark:block")}
          />
        </>
      )}
    </Link>
  );
}
