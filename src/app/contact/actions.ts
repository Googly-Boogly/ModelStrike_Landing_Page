"use server";

import { headers } from "next/headers";
import { resolveConfirmation, resolveDelivery } from "@/lib/contact/delivery";
import { isRateLimited } from "@/lib/contact/rate-limit";
import { validateContact, type FieldErrors } from "@/lib/contact/schema";

export type ContactFormState =
  | { status: "idle" }
  | { status: "invalid"; message: string; errors: FieldErrors }
  | { status: "error"; message: string }
  | { status: "unavailable"; message: string }
  | { status: "success"; message: string; booker?: Booker };

/** Echoed back to the visitor's own browser to prefill the Cal.com booking step. */
export type Booker = { name: string; email: string };

type SuccessState = Extract<ContactFormState, { status: "success" }>;

/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_TIME_MS = 3000;

const SUCCESS: SuccessState = {
  status: "success",
  message: "Thanks — your request has been received. We'll follow up at your work email.",
};

const SUCCESS_CONFIRMED: SuccessState = {
  status: "success",
  message: "Thanks — your request has been received. We've sent a confirmation to your work email and will follow up there.",
};

export async function submitContact(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field. Bots get a
  // success response so they have no signal to adapt to.
  if (formData.get("website")) return SUCCESS;

  const elapsed = Number(formData.get("elapsedMs"));
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_TIME_MS) {
    return { status: "error", message: "That was quicker than expected. Please review your details and submit again." };
  }

  const requestHeaders = await headers();
  const clientIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (isRateLimited(clientIp)) {
    return { status: "error", message: "Too many submissions from your network. Please try again in a few minutes." };
  }

  const result = validateContact(formData);
  if (!result.ok) {
    return { status: "invalid", message: "Please correct the highlighted fields.", errors: result.errors };
  }

  const delivery = resolveDelivery();
  if (!delivery) {
    return {
      status: "unavailable",
      message: "Online submissions aren't connected yet, so this request was not sent.",
    };
  }

  try {
    await delivery.send(result.data, { receivedAt: new Date().toISOString() });
  } catch (error) {
    // Log the provider failure without the visitor's personal details.
    console.error(`[contact] delivery via ${delivery.name} failed:`, error instanceof Error ? error.message : error);
    return { status: "error", message: "We couldn't send your request just now. Please try again shortly." };
  }

  // The request itself is delivered at this point, so a failed confirmation
  // is logged but doesn't fail the submission — the visitor just isn't told
  // to expect an email.
  const booker: Booker = { name: result.data.name, email: result.data.email };
  const confirmation = resolveConfirmation();
  if (confirmation) {
    try {
      await confirmation.send(result.data.email);
      return { ...SUCCESS_CONFIRMED, booker };
    } catch (error) {
      console.error(`[contact] confirmation via ${confirmation.name} failed:`, error instanceof Error ? error.message : error);
    }
  }

  return { ...SUCCESS, booker };
}
