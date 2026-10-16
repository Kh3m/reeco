/**
 * Content model for a niche landing page. Every niche page renders the same
 * section sequence (components/landing/NichePage.tsx); only this config
 * changes. Adding a niche = adding a config file + a 3-line route.
 */

export type NicheVideo =
  /** Privacy-enhanced YouTube embed, loaded only after the visitor clicks play. */
  | { provider: "youtube"; id: string; poster?: string }
  /** Self-hosted / CDN file. `captions` is a WebVTT file. */
  | { provider: "file"; src: string; poster?: string; captions?: string };

export type NicheConfig = {
  /** URL slug, without slashes. Also the route folder name. */
  slug: string;
  /** Short identifier sent with every analytics event and form submission. */
  analyticsId: string;
  /** Human label for the niche (form routing, Klaviyo properties). */
  label: string;

  meta: {
    /** Page <title> (the root layout appends " — ReeCo"). */
    title: string;
    description: string;
    /** Open Graph / social title. Falls back to `title`. */
    ogTitle?: string;
    ogImageAlt: string;
  };

  hero: {
    eyebrow: string;
    /** H1. `accent` is set on its own line in the accent style. */
    headline: { lead: string; accent?: string };
    supporting: string;
    /** Signals this is about follow-up/journey management, not buying leads. */
    positioning: string;
    /** The niche's core journey, shown as a stepped line under the hero. */
    journey: string[];
    primaryCta: string;
    secondaryCta?: { label: string; href: string };
  };

  vsl: {
    heading: string;
    /** Undefined until the client supplies the final video. */
    video?: NicheVideo;
    /** Client-supplied script — doubles as the on-page transcript. */
    transcript: string[];
  };

  problems: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
  };

  capabilities: {
    heading: string;
    intro: string;
    /** 3–4 cards. */
    items: { title: string; body: string; outcome: string }[];
  };

  process: {
    heading: string;
    /** Exactly three steps: review → identify gaps → implement/recommend. */
    steps: { title: string; body: string }[];
  };

  audience: {
    heading: string;
    intro: string;
    fits: string[];
    expectationsHeading: string;
    expectations: string[];
  };

  faq: { q: string; a: string }[];

  enquiry: {
    heading: string;
    intro: string;
    companyLabel: string;
    challengePlaceholder: string;
    /** Extra guidance under the form (e.g. "don't include health info"). */
    note?: string;
  };

  finalCta: {
    heading: string;
    body: string;
  };
};
