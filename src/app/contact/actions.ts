"use server";

import { normalizeMessage, validateMessage, type ContactErrors } from "@/lib/contact";
import { sendContactMessage } from "@/lib/contact-store";

export type ContactResult = { ok: true } | { ok: false; errors: ContactErrors; message: string };

export async function sendContact(input: Record<string, unknown>): Promise<ContactResult> {
  const msg = normalizeMessage(input);
  const errors = validateMessage(msg);
  if (Object.keys(errors).length > 0) return { ok: false, errors, message: "Some fields need another look." };
  try {
    await sendContactMessage(msg);
    return { ok: true };
  } catch (err) {
    console.error("[contact:send-failed]", err);
    return { ok: false, errors: {}, message: "We couldn’t send your message. Please try again in a minute." };
  }
}
