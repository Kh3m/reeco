import { NextResponse, type NextRequest } from "next/server";
import {
  enquirySchema,
  MIN_FILL_MS,
  type EnquiryResponse,
} from "@/lib/enquiry-schema";
import { getNicheById } from "@/lib/niches";
import {
  KlaviyoConfigError,
  KlaviyoRequestError,
  submitEnquiry,
} from "@/lib/klaviyo";

function json(body: EnquiryResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new Error();
    payload = body as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Anti-spam, invisible to real visitors:
  // 1. Honeypot — a hidden field humans never see or fill.
  // 2. Fill time — bots submit almost instantly after load.
  const honeypot = payload.fax;
  const startedAt = Number(payload.startedAt);
  const tooFast =
    !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof honeypot === "string" && honeypot.length > 0) || tooFast) {
    // Pretend success so bots don't learn they were caught.
    return json({ ok: true }, 200);
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid submission.";
    return json({ ok: false, error: first }, 400);
  }

  const niche = getNicheById(parsed.data.niche);
  if (!niche) {
    return json({ ok: false, error: "Invalid submission." }, 400);
  }

  try {
    await submitEnquiry({
      email: parsed.data.email,
      name: parsed.data.name,
      company: parsed.data.company,
      website: parsed.data.website || undefined,
      challenge: parsed.data.challenge || undefined,
      niche: {
        id: niche.analyticsId,
        label: niche.label,
        path: `/${niche.slug}`,
      },
      referrer: request.headers.get("referer") ?? undefined,
    });
    return json({ ok: true }, 200);
  } catch (err) {
    if (err instanceof KlaviyoConfigError) {
      console.error("[enquiry] Klaviyo not configured:", err.message);
      return json(
        {
          ok: false,
          error:
            "Enquiries are temporarily unavailable. Please try again shortly.",
        },
        503,
      );
    }
    if (err instanceof KlaviyoRequestError) {
      console.error("[enquiry] Klaviyo request failed:", err.message);
    } else {
      console.error("[enquiry] Unexpected error:", err);
    }
    return json(
      { ok: false, error: "Something went wrong. Please try again." },
      502,
    );
  }
}
