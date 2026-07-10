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

  const profileAttributes: Record<string, unknown> = {
    email: params.email,
    subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
  };
  if (params.firstName) {
    profileAttributes.first_name = params.firstName;
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
          data: [{ type: "profile", attributes: profileAttributes }],
        },
      },
      relationships: {
        list: { data: { type: "list", id: listId } },
      },
    },
  };

  const res = await fetch(
    `${KLAVIYO_API_BASE}/profile-subscription-bulk-create-jobs/`,
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${getApiKey()}`,
        accept: "application/json",
        "content-type": "application/json",
        revision: process.env.KLAVIYO_API_REVISION || DEFAULT_REVISION,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  // The bulk subscribe endpoint returns 202 Accepted on success.
  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.text()).slice(0, 300);
    } catch {
      // ignore body read failures
    }
    throw new KlaviyoRequestError(
      `Klaviyo subscribe failed (${res.status}). ${detail}`,
    );
  }
}
