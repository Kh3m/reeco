"use client";

import { track } from "@vercel/analytics";

/**
 * Landing-page conversion events. Every event carries `page` (the niche's
 * analyticsId) so results can be split per landing page. Page views are
 * recorded automatically by <Analytics /> in the root layout.
 */
export type LandingEvent =
  | "cta_click"
  | "booking_click"
  | "video_play"
  | "video_progress"
  | "video_complete"
  | "transcript_open"
  | "form_start"
  | "form_submit_success"
  | "form_submit_error";

type Props = Record<string, string | number | boolean | null>;

export function trackLanding(event: LandingEvent, page: string, props: Props = {}) {
  try {
    track(event, { page, ...props });
  } catch {
    // Analytics must never break the page.
  }
}
