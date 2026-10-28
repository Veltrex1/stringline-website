import "server-only";

// Writes rows to Supabase through its REST API, using the server-only secret key.
// Set SUPABASE_URL and SUPABASE_SECRET_KEY to turn it on; the tables are in supabase/schema.sql.

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SECRET_KEY;

export const storageEnabled = Boolean(url && key);

export async function insertRow(table: string, row: Record<string, unknown>): Promise<void> {
  if (!url || !key) throw new Error("Supabase is not configured");
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
  // Legacy service_role keys are JWTs and also go in Authorization; the newer sb_secret_ keys go in apikey only.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers,
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert into ${table} failed: ${res.status} ${await res.text()}`);
}
