"use server";

export type JoinState = { ok: boolean; error?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Storage is not chosen yet (Supabase, a form service or a sheet). Until it is, applications are
// only validated and written to the server log.
export async function joinWaitlist(_prev: JoinState, form: FormData): Promise<JoinState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const entry = {
    email: get("email"),
    name: get("name"),
    phone: get("phone"),
    company: get("company"),
    state: get("state"),
    services: form.getAll("services").map(String),
    leads: get("leads"),
    calendar: get("calendar"),
    crm: get("crm"),
    at: new Date().toISOString(),
  };

  if (!EMAIL.test(entry.email)) return { ok: false, error: "Enter an email address like you@company.com." };
  if (!entry.name) return { ok: false, error: "Add your name so we know who to ask for." };
  if (!entry.company) return { ok: false, error: "Add your company name." };
  if (!entry.state) return { ok: false, error: "Choose the state you work in." };

  console.log("[waitlist]", JSON.stringify(entry));
  return { ok: true };
}
