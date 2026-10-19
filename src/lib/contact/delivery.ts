import "server-only";
import { createHmac } from "node:crypto";
import { site } from "@/content/site";
import type { ContactSubmission } from "./schema";

/**
 * Where contact submissions go. Select a provider with CONTACT_DELIVERY:
 *
 *   webhook — POSTs JSON to CONTACT_WEBHOOK_URL (Slack/Zapier/n8n/your CRM/
 *             a serverless function). If CONTACT_WEBHOOK_SECRET is set, the
 *             body is signed: `X-ModelStrike-Signature: sha256=<hex hmac>`.
 *   resend  — Sends a plain-text email through the Resend HTTP API using
 *             RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.
 *
 * With no provider configured, the form tells visitors honestly that online
 * submissions are not enabled yet instead of pretending to send.
 *
 * To add another provider (Postmark, SES, HubSpot…), implement
 * `ContactDelivery` and register it in `resolveDelivery`.
 *
 * Separately, when RESEND_API_KEY and CONTACT_FROM_EMAIL are set, the visitor
 * gets a confirmation email (see `resolveConfirmation`), whichever provider
 * delivers the request itself.
 */

export type ContactDelivery = {
  name: string;
  send(submission: ContactSubmission, meta: SubmissionMeta): Promise<void>;
};

export type SubmissionMeta = { receivedAt: string };

const TIMEOUT_MS = 8000;

function formatPlainText(s: ContactSubmission, meta: SubmissionMeta): string {
  return [
    `New assessment request — ${meta.receivedAt}`,
    "",
    `Name: ${s.name}`,
    `Work email: ${s.email}`,
    `Company: ${s.company}`,
    `Role: ${s.role}`,
    `Company size: ${s.companySize}`,
    `Stage: ${s.stage}`,
    "",
    "What are you building?",
    s.building,
    "",
    "What systems can the AI access?",
    s.systems,
    "",
    "What would you like us to test?",
    s.testScope || "(not provided)",
  ].join("\n");
}

/**
 * Deliberately contains nothing the visitor typed: the recipient address is
 * unverified, so echoing submitted text would let anyone use the form to send
 * their own content to an arbitrary inbox under our name.
 */
function formatConfirmationText(): string {
  return [
    "Hello,",
    "",
    `Thanks for requesting an AI security assessment from ${site.name}. This email confirms we've received your request.`,
    "",
    "We'll review what you've shared and follow up from a team address to schedule a short scoping call.",
    "",
    "If you didn't submit this request, you can ignore this email — nothing further will happen.",
    "",
    `— The ${site.name} team`,
    site.url,
  ].join("\n");
}

function webhookDelivery(url: string, secret: string | undefined): ContactDelivery {
  return {
    name: "webhook",
    async send(submission, meta) {
      const body = JSON.stringify({ type: "assessment_request", ...meta, submission });
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (secret) {
        headers["X-ModelStrike-Signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
      }
      const response = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    },
  };
}

function resendDelivery(apiKey: string, to: string, from: string): ContactDelivery {
  return {
    name: "resend",
    async send(submission, meta) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: submission.email,
          subject: `Assessment request: ${submission.company}`,
          text: formatPlainText(submission, meta),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`Resend responded with ${response.status}`);
    },
  };
}

export type ConfirmationSender = {
  name: string;
  send(to: string): Promise<void>;
};

function resendConfirmation(apiKey: string, from: string, replyTo: string | undefined): ConfirmationSender {
  return {
    name: "resend",
    async send(to) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          ...(replyTo ? { reply_to: replyTo } : {}),
          subject: `We've received your ${site.name} assessment request`,
          text: formatConfirmationText(),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`Resend responded with ${response.status}`);
    },
  };
}

/** Sender for the visitor's confirmation email, or null when Resend isn't configured. */
export function resolveConfirmation(): ConfirmationSender | null {
  const env = process.env;
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) return null;
  return resendConfirmation(env.RESEND_API_KEY, env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL || site.contactEmail || undefined);
}

export function resolveDelivery(): ContactDelivery | null {
  const env = process.env;
  switch (env.CONTACT_DELIVERY) {
    case "webhook":
      return env.CONTACT_WEBHOOK_URL ? webhookDelivery(env.CONTACT_WEBHOOK_URL, env.CONTACT_WEBHOOK_SECRET) : null;
    case "resend":
      return env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL
        ? resendDelivery(env.RESEND_API_KEY, env.CONTACT_TO_EMAIL, env.CONTACT_FROM_EMAIL)
        : null;
    default:
      return null;
  }
}

export function isDeliveryConfigured(): boolean {
  return resolveDelivery() !== null;
}
