import type { NicheConfig } from "./types";
import { IMPLEMENT_STEP } from "./shared";

export const generator: NicheConfig = {
  slug: "generator-installation-follow-up",
  analyticsId: "generator",
  label: "Generator installation contractors",

  meta: {
    title: "Quote Follow-Up for Generator Installation Contractors",
    description:
      "ReeCo helps generator installation businesses organise enquiries, track site assessments and quotes, and follow up consistently through to installation.",
    ogTitle: "Turn more generator enquiries into completed installations",
    ogImageAlt:
      "ReeCo — Turn more generator enquiries into completed installations.",
  },

  hero: {
    eyebrow: "For generator installation contractors",
    headline: {
      lead: "Turn More Generator Enquiries Into",
      accent: "Completed Installations.",
    },
    supporting:
      "ReeCo helps generator installation businesses organise enquiries, track site assessments and quotes, and follow up consistently while homeowners work through their decision.",
    positioning:
      "Not just more leads — a better way to manage the opportunities your business already generates.",
    journey: ["Enquiry", "Assessment", "Quote", "Follow-up", "Installation"],
    primaryCta: "Book a Conversation",
    secondaryCta: { label: "See How It Works", href: "#how-it-works" },
  },

  vsl: {
    heading: "A short message for generator installers",
    video: undefined, // TODO: client to supply final generator VSL + poster.
    transcript: [
      "Hi there,",
      "When a homeowner enquires about a standby generator, the opportunity doesn’t end when you send the quote.",
      "They may need a site assessment, clarification on installation requirements, financing information, or simply a follow-up before they’re ready to move forward.",
      "If those next steps aren’t tracked consistently, promising opportunities can sit in the pipeline while your team focuses on the next enquiry.",
      "I help independent generator installers create a more organised process for capturing enquiries, scheduling assessments, following up on estimates, and tracking opportunities through to installation.",
      "Rather than just sending you more leads, the focus is on helping your business manage the opportunities it already generates and identify where prospects are dropping out of the process.",
      "Would you be open to a brief conversation about how you currently manage enquiries and generator installation quotes?",
    ],
  },

  problems: {
    heading: "Where generator opportunities tend to stall",
    intro:
      "A generator is a considered purchase. Between the first enquiry and installation there are several points where momentum can be lost.",
    items: [
      {
        title: "Enquiries that spike, then get buried",
        body: "Enquiries often surge around storms and outages. When the phones are busy, some never get a proper reply or a scheduled assessment.",
      },
      {
        title: "Site assessments that never get booked",
        body: "A homeowner is interested, but the assessment isn’t scheduled on the first call. Days pass, the urgency fades and the opportunity goes quiet.",
      },
      {
        title: "Quotes waiting on unanswered questions",
        body: "After the quote, homeowners often have questions about placement, fuel type, permits or financing. If nobody follows up, the quote just sits.",
      },
      {
        title: "Opportunities nobody is tracking",
        body: "Without a clear view of open quotes, promising opportunities stay in the pipeline while the team moves on to the next enquiry.",
      },
    ],
  },

  capabilities: {
    heading: "What ReeCo helps you organise",
    intro:
      "Each area is about moving interested homeowners to the next step — and making sure nothing promising sits unnoticed.",
    items: [
      {
        title: "Enquiry capture and response",
        body: "A consistent way to capture every enquiry, wherever it comes from, and respond promptly — including during busy periods.",
        outcome: "Fewer enquiries lost when demand spikes.",
      },
      {
        title: "Site assessment scheduling",
        body: "Clear next steps that move interested homeowners to a booked site assessment instead of leaving it open-ended.",
        outcome: "More interest turns into a scheduled assessment.",
      },
      {
        title: "Quote follow-up",
        body: "Timely follow-up after a quote is sent, with room to answer questions about installation requirements or financing.",
        outcome: "Quotes stay active while homeowners decide.",
      },
      {
        title: "Tracking through to installation",
        body: "A simple view of each opportunity from enquiry to assessment, quote and installation.",
        outcome: "You can see where prospects drop out and act on it.",
      },
    ],
  },

  process: {
    heading: "How it works",
    steps: [
      {
        title: "Review your current process",
        body: "We look at how enquiries come in, how site assessments are scheduled, how quotes are sent, and what happens next.",
      },
      {
        title: "Identify follow-up gaps",
        body: "We pinpoint where enquiries, assessments and quotes tend to stall, and which gaps are likely to matter most.",
      },
      IMPLEMENT_STEP,
    ],
  },

  audience: {
    heading: "Who this is for",
    intro:
      "ReeCo works best with installers who already receive enquiries and send quotes regularly.",
    fits: [
      "Independent generator installers working with homeowners on standby and whole-home generators",
      "Businesses receiving enquiries through ads, dealer referrals, their website or word of mouth",
      "Teams that schedule site assessments and send quotes but don’t track follow-up consistently",
      "Owners who want a clear view of opportunities from first enquiry to installation",
    ],
    expectationsHeading: "Realistic expectations",
    expectations: [
      "ReeCo focuses on the process from enquiry to installation. It doesn’t replace your installers, sizing work or scheduling tools.",
      "Some homeowners will decide not to go ahead. The aim is to make sure interested ones aren’t lost for lack of a follow-up.",
      "Results depend on your enquiry volume, pricing, lead times and how consistently follow-up happens. We don’t promise a set number of installations.",
    ],
  },

  faq: [
    {
      q: "Is this a lead-generation service?",
      a: "No. We start with the enquiries, assessments and quotes you already have and look at how they’re followed up, rather than promising a new batch of leads.",
    },
    {
      q: "Can this cope with storm-season spikes?",
      a: "That’s one of the situations where a consistent process helps most. We look at how enquiries are captured and prioritised when volume jumps, so fewer get lost.",
    },
    {
      q: "Do we need to change our CRM or quoting software?",
      a: "Usually not. We start with what you use today and look at whether it can support a more consistent process. If there’s a gap, we’ll explain the options.",
    },
    {
      q: "Do you handle financing or permits?",
      a: "No. Those stay with your business and your partners. We help make sure homeowners with questions about them get a timely follow-up and a clear next step.",
    },
    {
      q: "What happens on the initial conversation?",
      a: "A short call about how you currently manage enquiries, site assessments and installation quotes, and where you think opportunities may be stalling. There’s no obligation to go further.",
    },
    {
      q: "Can you guarantee more installations?",
      a: "No. We help build a more organised follow-up process and give you visibility into where prospects drop out. Outcomes depend on your market, pricing and how the process is used.",
    },
  ],

  enquiry: {
    heading: "Book a conversation",
    intro:
      "Tell us a little about your business and we’ll be in touch to arrange a time.",
    companyLabel: "Company name",
    challengePlaceholder:
      "e.g. Following up on quotes after the site assessment",
  },

  finalCta: {
    heading: "See where generator opportunities are stalling.",
    body: "Book a brief conversation about how you currently manage enquiries, site assessments and installation quotes.",
  },
};
