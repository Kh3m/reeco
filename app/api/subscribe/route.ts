import { NextResponse, type NextRequest } from "next/server";
import { subscribeSchema, type SubscribeResponse } from "@/lib/subscribe-schema";
import {
  KlaviyoConfigError,
  KlaviyoRequestError,
  subscribe,
} from "@/lib/klaviyo";

function json(body: SubscribeResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real users leave this hidden field empty.
  if (
    payload &&
    typeof payload === "object" &&
    "company" in payload &&
    typeof (payload as { company: unknown }).company === "string" &&
    (payload as { company: string }).company.length > 0
  ) {
    // Pretend success so bots don't learn they were caught.
    return json({ ok: true }, 200);
  }

  const parsed = subscribeSchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid submission.";
    return json({ ok: false, error: first }, 400);
  }

  const { variant, email, firstName } = parsed.data;
  const referrer = request.headers.get("referer") ?? undefined;

  try {
    await subscribe({ kind: variant, email, firstName, referrer });
    return json({ ok: true }, 200);
  } catch (err) {
    if (err instanceof KlaviyoConfigError) {
      // Misconfiguration — log server-side, don't leak details to the client.
      console.error("[subscribe] Klaviyo not configured:", err.message);
      return json(
        { ok: false, error: "Email signup is temporarily unavailable." },
        503,
      );
    }
    if (err instanceof KlaviyoRequestError) {
      console.error("[subscribe] Klaviyo request failed:", err.message);
      return json(
        { ok: false, error: "Something went wrong. Please try again." },
        502,
      );
    }
    console.error("[subscribe] Unexpected error:", err);
    return json(
      { ok: false, error: "Something went wrong. Please try again." },
      500,
    );
  }
}
