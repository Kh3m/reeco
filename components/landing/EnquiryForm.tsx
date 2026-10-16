"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { trackLanding } from "@/lib/analytics";
import {
  enquirySchema,
  type EnquiryInput,
  type EnquiryResponse,
} from "@/lib/enquiry-schema";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "./TrackedLink";

type Field = "name" | "email" | "company" | "website" | "challenge";

type EnquiryFormProps = {
  /** NicheConfig.analyticsId — sent as the hidden page/niche identifier. */
  niche: string;
  companyLabel: string;
  challengePlaceholder: string;
  note?: string;
  bookingUrl?: string;
};

type Status = "idle" | "submitting" | "success";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-faint focus:border-foreground focus:outline-none aria-[invalid=true]:border-danger";

/**
 * Short enquiry form for the niche landing pages, backed by /api/enquiry.
 * Success is only shown once the server confirms the enquiry was routed.
 */
export function EnquiryForm({
  niche,
  companyLabel,
  challengePlaceholder,
  note,
  bookingUrl,
}: EnquiryFormProps) {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    company: "",
    website: "",
    challenge: "",
  });
  const [fax, setFax] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>(
    {},
  );
  const startedAt = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function markStarted() {
    if (startedAt.current === null) {
      startedAt.current = Date.now();
      trackLanding("form_start", niche);
    }
  }

  function update(field: Field) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (fieldErrors[field]) {
        setFieldErrors((f) => ({ ...f, [field]: undefined }));
      }
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const input: EnquiryInput = { niche, ...values };
    const parsed = enquirySchema.safeParse(input);
    if (!parsed.success) {
      const errs: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      setError("Please check the highlighted fields.");
      // Move focus to the first invalid field.
      const first = Object.keys(errs)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          fax,
          startedAt: startedAt.current ?? Date.now(),
        }),
      });
      const data = (await res.json()) as EnquiryResponse;

      if (res.ok && data.ok) {
        trackLanding("form_submit_success", niche);
        setStatus("success");
      } else {
        trackLanding("form_submit_error", niche, { status: res.status });
        setStatus("idle");
        setError(
          (!data.ok && data.error) || "Something went wrong. Please try again.",
        );
      }
    } catch {
      trackLanding("form_submit_error", niche, { status: 0 });
      setStatus("idle");
      setError("We couldn’t reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="py-4">
        <p className="font-display text-2xl text-foreground">
          Thank you — your enquiry has been received.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          We’ll be in touch at{" "}
          <span className="font-medium text-foreground">{values.email}</span>{" "}
          to arrange a time to talk.
        </p>
        {bookingUrl && (
          <TrackedLink
            href={bookingUrl}
            page={niche}
            location="form-success"
            event="booking_click"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Prefer to pick a time now? Open the booking calendar →
          </TrackedLink>
        )}
      </div>
    );
  }

  const fields: {
    id: Field;
    label: string;
    type?: string;
    autoComplete?: string;
    optional?: boolean;
    placeholder?: string;
  }[] = [
    { id: "name", label: "Your name", autoComplete: "name" },
    {
      id: "email",
      label: "Business email",
      type: "email",
      autoComplete: "email",
    },
    { id: "company", label: companyLabel, autoComplete: "organization" },
    {
      id: "website",
      label: "Website",
      type: "url",
      autoComplete: "url",
      optional: true,
      placeholder: "yourbusiness.com",
    },
  ];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate
      className="space-y-4"
    >
      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${niche}-fax`}>Fax</label>
        <input
          id={`${niche}-fax`}
          name="fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fax}
          onChange={(e) => setFax(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${niche}-${f.id}`;
          const err = fieldErrors[f.id];
          return (
            <div key={f.id}>
              <label htmlFor={id} className="text-sm font-medium text-foreground">
                {f.label}
                {f.optional && (
                  <span className="font-normal text-faint"> (optional)</span>
                )}
              </label>
              <input
                id={id}
                name={f.id}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                required={!f.optional}
                value={values[f.id]}
                onChange={update(f.id)}
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? `${id}-error` : undefined}
                className={inputClass}
              />
              {err && (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <label
          htmlFor={`${niche}-challenge`}
          className="text-sm font-medium text-foreground"
        >
          Where does follow-up feel hardest right now?
          <span className="font-normal text-faint"> (optional)</span>
        </label>
        <textarea
          id={`${niche}-challenge`}
          name="challenge"
          rows={3}
          placeholder={challengePlaceholder}
          value={values.challenge}
          onChange={update("challenge")}
          aria-invalid={fieldErrors.challenge ? true : undefined}
          aria-describedby={
            fieldErrors.challenge ? `${niche}-challenge-error` : undefined
          }
          className={cn(inputClass, "resize-y")}
        />
        {fieldErrors.challenge && (
          <p id={`${niche}-challenge-error`} className="mt-1.5 text-sm text-danger">
            {fieldErrors.challenge}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-danger/40 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? "Sending…" : "Request a Conversation"}
      </Button>

      <p className="text-xs leading-5 text-faint">
        {note && <>{note} </>}
        We’ll only use these details to respond to your enquiry. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy policy
        </Link>
        .
      </p>

      {bookingUrl && (
        <p className="border-t border-border pt-4 text-sm text-muted">
          Prefer to choose a time yourself?{" "}
          <TrackedLink
            href={bookingUrl}
            page={niche}
            location="form"
            event="booking_click"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Open the booking calendar
          </TrackedLink>
        </p>
      )}
    </form>
  );
}
