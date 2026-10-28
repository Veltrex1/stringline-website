import "server-only";
import type { Application } from "./application";

export type StoredApplication = Application & {
  id: string;
  submittedAt: string;
  source: string;
};

// Where applications go. Not wired yet: this only logs to the server console.
//
// To wire it, replace the body of saveApplication with the real store and keep the signature:
//   - Supabase: insert into an `applications` table (columns match StoredApplication; arrays as text[]).
//   - Email alert: after saving, send a notification (e.g. Resend) to the team.
// The submit action already validates and normalizes the data before calling this.
export async function saveApplication(app: Application, source = "website"): Promise<StoredApplication> {
  const stored: StoredApplication = {
    ...app,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    source,
  };
  console.log("[application:not-wired]", JSON.stringify(stored));
  return stored;
}
