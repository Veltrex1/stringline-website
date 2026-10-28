"use server";

import { normalizeApplication, validateApplication, type Errors } from "@/lib/application";
import { saveApplication } from "@/lib/applications-store";

export type SubmitResult = { ok: true; id: string } | { ok: false; errors: Errors; message: string };

export async function submitApplication(input: Record<string, unknown>): Promise<SubmitResult> {
  const app = normalizeApplication(input);
  const errors = validateApplication(app);
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, message: "Some answers need another look." };
  }
  try {
    const saved = await saveApplication(app);
    return { ok: true, id: saved.id };
  } catch (err) {
    console.error("[application:save-failed]", err);
    return { ok: false, errors: {}, message: "We couldn’t send your application. Please try again in a minute." };
  }
}
