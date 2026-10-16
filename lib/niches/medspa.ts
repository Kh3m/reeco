import type { NicheConfig } from "./types";
import { IMPLEMENT_STEP } from "./shared";

export const medspa: NicheConfig = {
  slug: "medspa-retention",
  analyticsId: "medspa",
  label: "MedSpa / medical aesthetics",

  meta: {
    title: "MedSpa Enquiry Follow-Up & Patient Retention",
    description:
      "ReeCo helps independent medical aesthetics clinics follow up on new enquiries consistently, turn interest into consultations, and re-engage eligible past clients.",
    ogTitle: "Turn more MedSpa enquiries into consultations",
    ogImageAlt:
      "ReeCo — Turn more MedSpa enquiries into consultations. Bring eligible past clients back.",
  },

  hero: {
    eyebrow: "For independent medical aesthetics clinics",
    headline: {
      lead: "Turn More MedSpa Enquiries Into Consultations.",
      accent: "Bring Eligible Past Clients Back.",
    },
    supporting:
      "ReeCo helps independent aesthetics clinics build a more consistent process for following up with new enquiries, making the next step easier to take, and re-engaging eligible past clients, without relying on staff memory or scattered messages.",
    positioning:
      "Not more leads — a better process for the enquiries and client relationships you already have.",
    journey: [
      "Enquiry",
      "Response",
      "Consultation",
      "Treatment",
      "Follow-up & re-engagement",
    ],
    primaryCta: "Book a Conversation",
    secondaryCta: { label: "See How It Works", href: "#how-it-works" },
  },

  vsl: {
    heading: "A short message for aesthetics clinic owners",
    video: undefined, // TODO: client to supply final MedSpa VSL + poster.
    transcript: [
      "Hi there,",
      "If you run a medical aesthetics clinic, you’re probably already investing in advertising, social media, and content to attract new clients.",
      "But here’s the question: how many people enquire about Botox, fillers, laser treatments, or other services and never actually book?",
      "Some ask about pricing and disappear. Some say they’ll book later. Others book once, but never return for their next treatment.",
      "That doesn’t necessarily mean they weren’t interested. Often, they simply needed faster follow-up, a reminder, or an easier way to take the next step.",
      "I help independent aesthetics clinics create a more consistent process for responding to new enquiries, turning interest into consultations, and re-engaging eligible past clients.",
      "The goal isn’t just to generate more leads. It’s to help you convert more of the opportunities you’re already paying to create and get more value from your existing client database.",
      "If you’re currently relying on manual follow-up, scattered messages, or staff remembering who needs to be contacted, there may be revenue being left on the table.",
      "Click below to learn more or book a conversation, and we can look at where potential clients may be dropping out of your process.",
    ],
  },

  problems: {
    heading: "Where enquiries and past clients tend to slip away",
    intro:
      "Interest rarely disappears all at once. It tends to fade at a few familiar points between the first message and the next appointment.",
    items: [
      {
        title: "A pricing question with no clear next step",
        body: "Someone asks what lip filler or a laser course costs, gets a price, and the conversation ends there. Nobody suggests a consultation or checks back in.",
      },
      {
        title: "Replies that depend on who has a spare moment",
        body: "Enquiries arrive by DM, website form, email and phone. Response times vary with how busy the front desk is, and some messages are missed altogether.",
      },
      {
        title: "“I’ll book later” that never becomes a booking",
        body: "A prospective patient/client is interested but not ready yet. Without a timely reminder, the intention quietly expires.",
      },
      {
        title: "One treatment, then silence",
        body: "A client is happy with their first treatment, but nothing prompts the next appointment when it would be appropriate — so they drift away or book elsewhere.",
      },
    ],
  },

  capabilities: {
    heading: "What ReeCo helps you organise",
    intro:
      "Each area is about making the next step clearer and more consistent, using processes your clinic approves.",
    items: [
      {
        title: "New enquiry follow-up",
        body: "A consistent way to respond to new enquiries and follow up with those who don’t reply, instead of relying on whoever happens to see the message.",
        outcome: "Fewer enquiries left unanswered or forgotten.",
      },
      {
        title: "Enquiry-to-consultation path",
        body: "Clear, simple next steps that make booking a consultation easy once someone has shown interest.",
        outcome: "More interest has an obvious route to a consultation.",
      },
      {
        title: "Eligible past-client re-engagement",
        body: "Reminder and re-engagement processes for eligible past clients, built around your clinic’s own treatment guidance and approval.",
        outcome: "Your existing client list becomes an active part of the business.",
      },
      {
        title: "Visibility into drop-off points",
        body: "A simple view of where people stall — between enquiry, consultation, treatment and return visit.",
        outcome: "Decisions based on where opportunities actually drop out.",
      },
    ],
  },

  process: {
    heading: "How it works",
    steps: [
      {
        title: "Review your current process",
        body: "We look at how enquiries arrive today, who responds, how consultations are booked, and what happens after a treatment.",
      },
      {
        title: "Identify follow-up gaps",
        body: "We pinpoint where new enquiries, consultations and eligible past clients tend to fall through — and which gaps matter most.",
      },
      IMPLEMENT_STEP,
    ],
  },

  audience: {
    heading: "Who this is for",
    intro:
      "ReeCo works best with independent clinics that already have demand and want a more dependable process around it.",
    fits: [
      "Independent medical aesthetics clinics and medspas offering treatments such as Botox, fillers, laser and other aesthetic procedures",
      "Clinics already generating enquiries through advertising, social media, referrals or their website",
      "Teams relying on manual follow-up, scattered messages or staff memory",
      "Owners who want a clearer picture of where enquiries and past clients drop out",
    ],
    expectationsHeading: "Realistic expectations",
    expectations: [
      "ReeCo improves the process between first contact and the next appointment. It doesn’t replace your clinical team or your booking system.",
      "Treatment eligibility and clinical guidance always stay with your clinic. Re-engagement follows clinic-approved processes only.",
      "Results depend on your enquiry volume, team capacity and how consistently the process is followed. We don’t promise a specific number of bookings.",
    ],
  },

  faq: [
    {
      q: "Is this just another lead-generation service?",
      a: "No. The focus is on the enquiries and client relationships you already have: how quickly enquiries get a reply, how interest turns into consultations, and how eligible past clients are re-engaged. If you also need more demand, we can talk about it, but it isn’t the starting point.",
    },
    {
      q: "Do we need to change our booking software or CRM?",
      a: "Not necessarily. We start with the tools you already use. Where they can support a more consistent process, we work with them. If something is missing, we’ll explain the options and you decide.",
    },
    {
      q: "Who decides which past clients are contacted?",
      a: "Your clinic does. ReeCo doesn’t give medical advice or decide treatment eligibility. Re-engagement is based on criteria your clinic sets and approves — we help organise the process around them.",
    },
    {
      q: "Will this add work for our front-desk team?",
      a: "The aim is the opposite: fewer things left to memory and clearer steps for whoever is responding. During setup we’ll need some of your team’s time to understand how things work today.",
    },
    {
      q: "What happens on the initial conversation?",
      a: "It’s a short call about how enquiries come in, how follow-up is handled, and where you think opportunities may be slipping. You’ll come away with a clearer view of possible gaps, with no obligation to go further.",
    },
    {
      q: "Can you guarantee more bookings or better retention?",
      a: "No — and we’d be wary of anyone who does. We help build a more consistent follow-up and re-engagement process and give you visibility into where people drop out. Results depend on your clinic, your clients and how the process is used.",
    },
    {
      q: "Do you need access to patient records?",
      a: "Not to get started. The first conversation is about your process, not individual patients. Please don’t send any patient or health information through this website.",
    },
  ],

  enquiry: {
    heading: "Book a conversation",
    intro:
      "Tell us a little about your clinic and we’ll be in touch to arrange a time.",
    companyLabel: "Clinic name",
    challengePlaceholder:
      "e.g. Replying to Instagram enquiries quickly, or getting past clients to rebook",
    note: "Please don’t include any patient or health information.",
  },

  finalCta: {
    heading: "See where potential clients may be dropping out of your process.",
    body: "Book a short conversation about how your clinic handles new enquiries, consultations and eligible past clients.",
  },
};
