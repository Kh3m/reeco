"use client";

import { trackLanding, type LandingEvent } from "@/lib/analytics";

type TrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  page: string;
  /** Where on the page the link sits (hero, header, final-cta…). */
  location: string;
  event?: LandingEvent;
};

/**
 * Anchor that records a landing-page analytics event on click. Used for every
 * CTA so clicks can be compared by page and position. External links open in
 * a new tab.
 */
export function TrackedLink({
  href,
  page,
  location,
  event = "cta_click",
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        trackLanding(event, page, { location, href });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
