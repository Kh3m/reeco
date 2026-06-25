"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

type Variant = "lead" | "newsletter";

type EmailFormProps = {
  /** "lead" collects First Name + Email; "newsletter" collects Email only. */
  variant?: Variant;
  className?: string;
  cta?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email capture for the lead magnet and newsletter.
 *
 * NOTE: submission is stubbed for Milestone 1. Milestone 3 wires this to Kit
 * (ConvertKit) via a server route — replace the simulated submit below.
 */
export function EmailForm({
  variant = "lead",
  className,
  cta,
}: EmailFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isLead = variant === "lead";
  const buttonLabel =
    cta ?? (isLead ? "Download Free Checklist" : "Join The Newsletter");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (isLead && firstName.trim().length < 1) {
      setError("Please enter your first name.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    // TODO(M3): POST to /api/subscribe -> Kit (ConvertKit). Tag by `variant`.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
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
            ? "Check your inbox — your checklist is on the way."
            : "Thanks for subscribing. Watch your inbox for the next insight."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-start", className)}
    >
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
            className="w-full rounded-full border border-border bg-surface px-5 py-3 text-sm text-foreground placeholder:text-faint focus:border-accent/60 focus:outline-none"
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

      <Button type="submit" disabled={status === "submitting"}>
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
