import "server-only";
import type { ContactMessage } from "./contact";
import { deliver, emailEnabled, notifyAidan } from "./email";
import { insertRow, storageEnabled } from "./supabase";

// Emails the message to Aidan (reply-to set to the sender, so he answers from his inbox)
// and keeps a copy in Supabase, whichever of the two are configured.
export async function sendContactMessage(message: ContactMessage): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const jobs: (() => Promise<void>)[] = [];
  if (storageEnabled) {
    jobs.push(() =>
      insertRow("contact_messages", {
        id,
        received_at: receivedAt,
        name: message.name,
        email: message.email,
        phone: message.phone || null,
        company: message.company || null,
        message: message.message,
      }),
    );
  }
  if (emailEnabled) {
    const text = [
      message.message,
      "",
      "—",
      `${message.name}${message.company ? `, ${message.company}` : ""}`,
      message.email,
      message.phone,
      "",
      `Sent from the Stringline contact form · ${receivedAt}`,
    ]
      .filter((l, i, all) => l !== "" || all[i - 1] !== "")
      .join("\n");
    jobs.push(() => notifyAidan(`Message from ${message.name}${message.company ? ` (${message.company})` : ""}`, text, message.email));
  }
  await deliver("contact", { id, receivedAt, ...message }, jobs);
  return { id };
}
