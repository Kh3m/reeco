import type { NicheConfig } from "./types";
import { IMPLEMENT_STEP } from "./shared";

export const waterproofing: NicheConfig = {
  slug: "waterproofing-follow-up",
  analyticsId: "waterproofing",
  label: "Waterproofing contractors",

  meta: {
    title: "Estimate Follow-Up for Waterproofing Contractors",
    description:
      "ReeCo helps waterproofing contractors follow up on inspection requests and outstanding estimates, keep opportunities visible, and track which ones become booked jobs.",
    ogTitle: "Stop letting waterproofing estimates go cold",
    ogImageAlt: "ReeCo — Stop letting waterproofing estimates go cold.",
  },

  hero: {
    eyebrow: "For waterproofing contractors",
    headline: {
      lead: "Stop Letting Waterproofing Estimates",
      accent: "Go Cold.",
    },
    supporting:
      "ReeCo helps waterproofing contractors organise enquiry follow-up, keep outstanding estimates visible, and make the next step clear for homeowners who are not ready to decide immediately.",
    positioning:
      "Not another batch of leads — a better process for the enquiries and estimates already in your pipeline.",
    journey: ["Enquiry", "Inspection", "Estimate", "Follow-up", "Booked job"],
    primaryCta: "Book a Conversation",
    secondaryCta: { label: "See How It Works", href: "#how-it-works" },
  },

  vsl: {
    heading: "A short message for waterproofing contractors",
    video: undefined, // TODO: client to supply final waterproofing VSL + poster.
    transcript: [
      "Hi there,",
      "Let me ask you something. When a homeowner requests an inspection or receives a waterproofing estimate but doesn’t make a decision immediately, what happens next?",
      "For contractors, winning the job doesn’t always come down to getting more enquiries. Sometimes, the opportunity is already in the pipeline, but the homeowner needs a follow-up, a reminder, or a clearer next step.",
      "Without a consistent process, your team can spend money generating enquiries and time preparing estimates without knowing which prospects still need attention.",
      "I help waterproofing contractors organise their enquiry-to-estimate process, follow up with prospects who haven’t decided, and track which opportunities turn into booked inspections and completed jobs.",
      "The objective is to help you make better use of the demand you’re already generating, rather than simply promising you another batch of leads.",
      "Would you be open to a short conversation about how your team currently manages enquiries and outstanding estimates?",
    ],
  },

  problems: {
    heading: "Where waterproofing opportunities tend to stall",
    intro:
      "Most jobs aren’t lost in one moment. They stall somewhere between the first call and the homeowner’s decision.",
    items: [
      {
        title: "Inspection requests that wait too long",
        body: "A homeowner with a damp basement contacts two or three contractors. If the inspection isn’t arranged promptly, someone else often gets there first.",
      },
      {
        title: "Estimates sent, then nothing",
        body: "The estimate goes out after the inspection, and the next contact depends on the homeowner calling back. Many don’t — even when they’re still interested.",
      },
      {
        title: "Homeowners who need time to decide",
        body: "Waterproofing is a significant expense. Homeowners compare quotes, talk it over, or wait for the next heavy rain. Without follow-up, the decision drifts.",
      },
      {
        title: "No clear view of what’s outstanding",
        body: "Open estimates live in inboxes, spreadsheets and someone’s memory. It’s hard to say which still need attention and which are lost.",
      },
    ],
  },

  capabilities: {
    heading: "What ReeCo helps you organise",
    intro:
      "Each area is about keeping opportunities visible and making the next step clear — for your team and for the homeowner.",
    items: [
      {
        title: "Enquiry and inspection follow-up",
        body: "A consistent process for responding to new enquiries and confirming inspections, so requests don’t sit waiting for a call back.",
        outcome: "Fewer inspection requests left without a response.",
      },
      {
        title: "Outstanding estimate follow-up",
        body: "Planned, timely follow-up with homeowners who have an estimate but haven’t decided, with a clear next step each time.",
        outcome: "Estimates stay active instead of quietly going cold.",
      },
      {
        title: "Clear next steps for homeowners",
        body: "Simple ways for homeowners to ask questions, reschedule or go ahead when they’re ready, without having to chase your team.",
        outcome: "Less friction between “maybe” and a booked job.",
      },
      {
        title: "Pipeline visibility",
        body: "A simple view of which opportunities are at inspection, estimate or follow-up stage, and which have become booked jobs.",
        outcome: "You can see where jobs are won and where they drop out.",
      },
    ],
  },

  process: {
    heading: "How it works",
    steps: [
      {
        title: "Review your current process",
        body: "We look at how enquiries arrive, how inspections are scheduled, how estimates are sent, and what happens afterwards.",
      },
      {
        title: "Identify follow-up gaps",
        body: "We pinpoint where inspection requests and outstanding estimates tend to stall, and which gaps are likely to matter most.",
      },
      IMPLEMENT_STEP,
    ],
  },

  audience: {
    heading: "Who this is for",
    intro:
      "ReeCo works best with contractors who already receive enquiries and send estimates regularly.",
    fits: [
      "Independent waterproofing contractors serving homeowners — basements, foundations, crawl spaces and more",
      "Businesses already generating enquiries through ads, referrals, directories or their website",
      "Teams that send estimates regularly but don’t have a consistent follow-up routine",
      "Owners who want to know which estimates are still open and which became jobs",
    ],
    expectationsHeading: "Realistic expectations",
    expectations: [
      "ReeCo focuses on the process between enquiry and booked job. It doesn’t replace your estimators or your scheduling.",
      "Not every outstanding estimate can be won. The aim is to make sure the ones that could be aren’t lost to silence.",
      "Results depend on your enquiry volume, pricing, capacity and how consistently follow-up happens. We don’t promise a set number of jobs.",
    ],
  },

  faq: [
    {
      q: "Is this a lead-generation service?",
      a: "No. The starting point is the enquiries and estimates you already have. We look at how they’re followed up and where they drop out before thinking about generating more demand.",
    },
    {
      q: "We already use a CRM or job-management tool. Do we need to switch?",
      a: "Usually not. We start with what you have and look at whether it can support a more consistent follow-up process. If there’s a gap, we’ll explain the options.",
    },
    {
      q: "Won’t follow-up feel pushy to homeowners?",
      a: "Good follow-up is helpful, not pushy: answering questions, confirming next steps and checking in at sensible intervals. Tone and timing are agreed with you.",
    },
    {
      q: "How much of my team’s time will this take?",
      a: "Some time up front to walk us through how enquiries and estimates are handled today. After that, the goal is less chasing and fewer things left to memory.",
    },
    {
      q: "What happens on the initial conversation?",
      a: "A short call about how your team manages enquiries, inspections and outstanding estimates, and where you think jobs might be slipping. There’s no obligation to go further.",
    },
    {
      q: "Can you guarantee more booked jobs?",
      a: "No. We help build a more consistent follow-up process and make it easier to see where opportunities drop out. Outcomes depend on your market, pricing and how the process is used.",
    },
  ],

  enquiry: {
    heading: "Book a conversation",
    intro:
      "Tell us a little about your business and we’ll be in touch to arrange a time.",
    companyLabel: "Company name",
    challengePlaceholder:
      "e.g. Following up on estimates after the inspection",
  },

  finalCta: {
    heading: "Find out which estimates still need attention.",
    body: "Book a short conversation about how your team currently manages enquiries, inspections and outstanding estimates.",
  },
};
