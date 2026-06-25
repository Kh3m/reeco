/**
 * Minimal inline stroke icons (24×24, currentColor). Dependency-free so the
 * bundle stays lean. Size/color via className (e.g. "h-6 w-6 text-accent").
 */
type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Magnifier over a bar chart — audits. */
export function IconAudit(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V10M9 19v-5M14 19V7" />
      <circle cx="17.5" cy="14.5" r="3" />
      <path d="m22 19-2.3-2.3" />
    </svg>
  );
}

/** Circular arrows — lifecycle marketing. */
export function IconLifecycle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v4h-4" />
    </svg>
  );
}

/** Connected nodes — growth systems. */
export function IconSystems(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 7.5 11 16M16 7.5 13 16M8 6h8" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
