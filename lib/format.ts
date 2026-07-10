/** Format an ISO date string as e.g. "June 25, 2026". Empty string if missing. */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
