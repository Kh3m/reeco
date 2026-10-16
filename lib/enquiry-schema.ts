import { z } from "zod";

/**
 * Shared validation for the niche landing-page enquiry form, used by both the
 * client form and the /api/enquiry route handler so the rules can't drift.
 */
export const enquirySchema = z.object({
  /** Hidden page/niche identifier (NicheConfig.analyticsId). */
  niche: z.string().trim().min(1).max(40),
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "Please shorten your name."),
  email: z.email("Please enter a valid business email address."),
  company: z
    .string()
    .trim()
    .min(1, "Please enter your company name.")
    .max(160, "Please shorten your company name."),
  website: z
    .string()
    .trim()
    .max(200, "Please shorten the website address.")
    .optional()
    .or(z.literal("")),
  challenge: z
    .string()
    .trim()
    .max(1500, "Please keep this under 1,500 characters.")
    .optional()
    .or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResponse = { ok: true } | { ok: false; error: string };

/** Submissions faster than this after the form renders are treated as bots. */
export const MIN_FILL_MS = 2500;
