import "server-only";

// Sends plain-text emails to Aidan through Resend.
// Set RESEND_API_KEY and NOTIFY_EMAIL to turn it on. Until a Stringline domain is verified in Resend,
// leave EMAIL_FROM unset: the default sender can only deliver to the email the Resend account was made with.

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.NOTIFY_EMAIL;
const from = process.env.EMAIL_FROM || "Stringline <onboarding@resend.dev>";

export const emailEnabled = Boolean(apiKey && to);

export async function notifyAidan(subject: string, text: string, replyTo?: string): Promise<void> {
  if (!apiKey || !to) throw new Error("Email is not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend send failed: ${res.status} ${await res.text()}`);
}

// Runs each configured delivery and succeeds if at least one of them did, so one outage doesn't lose a submission.
// With nothing configured it logs the submission so it can still be recovered from the server logs.
export async function deliver(label: string, record: unknown, jobs: (() => Promise<void>)[]): Promise<void> {
  if (jobs.length === 0) {
    const log = process.env.NODE_ENV === "production" ? console.error : console.log;
    log(`[${label}:not-wired] Set DATABASE_URL or the Resend env vars to deliver this.`, JSON.stringify(record));
    return;
  }
  const results = await Promise.allSettled(jobs.map((job) => job()));
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  for (const f of failures) console.error(`[${label}:delivery-failed]`, f.reason);
  if (failures.length === results.length) throw new Error(`Every delivery for ${label} failed`);
  if (failures.length > 0) console.error(`[${label}:partial]`, JSON.stringify(record));
}
