"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/cn";
import { LEAD_MAGNET_PDF } from "@/lib/site";
import { Button } from "./Button";
import {
  subscribeSchema,
  type SubscribeResponse,
} from "@/lib/subscribe-schema";

type Variant = "lead" | "newsletter";

type EmailFormProps = {
  /** "lead" collects First Name + Email; "newsletter" collects Email only. */
  variant?: Variant;
  className?: string;
  cta?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

/** Email capture for the lead magnet and newsletter, backed by /api/subscribe (Klaviyo). */
export function EmailForm({
  variant = "lead",
  className,
  cta,
}: EmailFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isLead = variant === "lead";
  const buttonLabel =
    cta ?? (isLead ? "Download Free Checklist" : "Join The Newsletter");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const input = {
      variant,
      email: email.trim(),
      firstName: isLead ? firstName : undefined,
    };

    const parsed = subscribeSchema.safeParse(input);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, company }),
      });
      const data = (await res.json()) as SubscribeResponse;

      if (res.ok && data.ok) {
        // Conversion event for the success metrics (email signups by source).
        track("subscribe", { variant });
        setStatus("success");
      } else {
        setStatus("idle");
        setError(
          (!data.ok && data.error) || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("idle");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-accent/30 bg-surface px-6 py-5 text-sm text-foreground",
          className,
        )}
        role="status"
      >
        <p className="font-medium text-accent">You&apos;re in.</p>
        <p className="mt-1 text-muted">
          {isLead
            ? "Your checklist is ready — download it below, and we've also sent a copy to your inbox."
            : "Thanks for subscribing. Watch your inbox for the next insight."}
        </p>
        {isLead && (
          <a
            href={LEAD_MAGNET_PDF}
            download
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-accent-soft"
          >
            Download the Checklist
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "flex w-full flex-col gap-3",
        // Lead form stacks (name → email → button); newsletter is a row.
        !isLead && "sm:flex-row sm:items-center",
        className,
      )}
    >
      {/* Honeypot: hidden from users, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {isLead && (
        <div className="flex-1">
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-full border border-border bg-surface px-5 py-3.5 text-base text-foreground placeholder:text-faint focus:border-accent/60 focus:outline-none"
          />
        </div>
      )}

      <div className="flex-1">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-border bg-surface px-5 py-3 text-sm text-foreground placeholder:text-faint focus:border-accent/60 focus:outline-none"
        />
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className={isLead ? "w-full" : "shrink-0"}
      >
        {status === "submitting" ? "Sending…" : buttonLabel}
      </Button>

      {error && (
        <p
          className="w-full text-sm text-red-400 sm:order-last sm:basis-full"
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
}
