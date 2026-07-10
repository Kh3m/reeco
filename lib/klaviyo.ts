/**
 * Klaviyo API client. Server-only — never import into a Client Component
 * (it reads KLAVIYO_PRIVATE_API_KEY).
 * Docs: https://developers.klaviyo.com/en/reference/subscribe_profiles
 *
 * Subscribing a profile to a list sets email marketing consent and adds them
 * to the list. Lead-magnet delivery (and any welcome sequence) is handled by a
 * Klaviyo *Flow* triggered when a profile is added to / subscribes to the list
 * — configured in Klaviyo, not here.
 */

const KLAVIYO_API_BASE = "https://a.klaviyo.com/api";
// Klaviyo pins behavior to a dated API revision. Override via env to upgrade.
const DEFAULT_REVISION = "2026-04-15";

export type KlaviyoListKind = "lead" | "newsletter";

export class KlaviyoConfigError extends Error {}
export class KlaviyoRequestError extends Error {}

function getApiKey(): string {
  const key = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!key) {
    throw new KlaviyoConfigError("KLAVIYO_PRIVATE_API_KEY is not set.");
  }
  return key;
}

function getListId(kind: KlaviyoListKind): string {
  const id =
    kind === "lead"
      ? process.env.KLAVIYO_LEAD_MAGNET_LIST_ID
      : process.env.KLAVIYO_NEWSLETTER_LIST_ID;
  if (!id) {
    throw new KlaviyoConfigError(
      `List ID for "${kind}" is not set (KLAVIYO_${
        kind === "lead" ? "LEAD_MAGNET" : "NEWSLETTER"
      }_LIST_ID).`,
    );
  }
  return id;
}

async function klaviyoPost(path: string, body: unknown): Promise<Response> {
  return fetch(`${KLAVIYO_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${getApiKey()}`,
      accept: "application/json",
      "content-type": "application/json",
      revision: process.env.KLAVIYO_API_REVISION || DEFAULT_REVISION,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

async function throwRequestError(res: Response, action: string): Promise<never> {
  let detail = "";
  try {
    detail = (await res.text()).slice(0, 300);
  } catch {
    // ignore body read failures
  }
  throw new KlaviyoRequestError(
    `Klaviyo ${action} failed (${res.status}). ${detail}`,
  );
}

/**
 * Subscribe an email (and optional first name) to the lead-magnet or
 * newsletter list. Throws KlaviyoConfigError if env is missing,
 * KlaviyoRequestError if Klaviyo rejects the request.
 */
export async function subscribe(params: {
  kind: KlaviyoListKind;
  email: string;
  firstName?: string;
  referrer?: string;
}): Promise<void> {
  const listId = getListId(params.kind);

  // The subscribe job only accepts email/phone/subscriptions on the profile,
  // so name (and any other attributes) must be upserted separately first via
  // profile-import. Non-fatal: a failed upsert shouldn't block the signup.
  if (params.firstName) {
    try {
      const res = await klaviyoPost("/profile-import/", {
        data: {
          type: "profile",
          attributes: { email: params.email, first_name: params.firstName },
        },
      });
      if (!res.ok) {
        console.error(
          `[klaviyo] profile-import failed (${res.status}); continuing with subscribe.`,
        );
      }
    } catch (err) {
      console.error("[klaviyo] profile-import errored; continuing:", err);
    }
  }

  const body = {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        custom_source:
          params.kind === "lead"
            ? "ReeCo — Lead Magnet"
            : "ReeCo — Newsletter",
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: params.email,
                subscriptions: {
                  email: { marketing: { consent: "SUBSCRIBED" } },
                },
              },
            },
          ],
        },
      },
      relationships: {
        list: { data: { type: "list", id: listId } },
      },
    },
  };

  const res = await klaviyoPost(
    "/profile-subscription-bulk-create-jobs/",
    body,
  );

  // The bulk subscribe endpoint returns 202 Accepted on success.
  if (!res.ok) {
    await throwRequestError(res, "subscribe");
  }
}
