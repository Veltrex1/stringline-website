import "server-only";
import type { ContactMessage } from "./contact";

// Where contact messages go. Not wired yet: this only logs to the server console.
//
// To wire it, send an email to Aidan with a transactional email service (e.g. Resend) and keep the signature:
//   - to: process.env.CONTACT_TO_EMAIL (Aidan's address; never sent to the browser)
//   - from: a sending address on the Stringline domain once it exists
//   - reply-to: message.email, so Aidan can answer straight from his inbox
export async function sendContactMessage(message: ContactMessage): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const to = process.env.CONTACT_TO_EMAIL || "(CONTACT_TO_EMAIL not set)";
  console.log("[contact:not-wired]", JSON.stringify({ id, to, receivedAt: new Date().toISOString(), ...message }));
  return { id };
}
