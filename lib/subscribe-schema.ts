import { z } from "zod";

/**
 * Shared validation for email capture, used by both the client form and the
 * /api/subscribe route handler so the rules can't drift apart.
 */
export const subscribeSchema = z
  .object({
    variant: z.enum(["lead", "newsletter"]),
    email: z.email("Please enter a valid email address."),
    firstName: z.string().trim().max(100).optional(),
  })
  .refine(
    (data) => data.variant !== "lead" || (data.firstName ?? "").length >= 1,
    { message: "Please enter your first name.", path: ["firstName"] },
  );

export type SubscribeInput = z.infer<typeof subscribeSchema>;

export type SubscribeResponse =
  | { ok: true }
  | { ok: false; error: string };
