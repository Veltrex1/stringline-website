import "server-only";
import { Client } from "pg";

// Writes rows to the Neon Postgres database. Set DATABASE_URL to turn it on (the Vercel Neon integration
// adds it for you); the tables are in db/schema.sql. Submissions are rare, so each insert opens its own
// connection and closes it, rather than holding a pool open between requests.

const connectionString = process.env.DATABASE_URL;

export const storageEnabled = Boolean(connectionString);

export async function insertRow(table: "applications" | "contact_messages", row: Record<string, unknown>): Promise<void> {
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const columns = Object.keys(row);
  const placeholders = columns.map((_, i) => `$${i + 1}`);
  const client = new Client({ connectionString, connectionTimeoutMillis: 8000, query_timeout: 8000 });
  await client.connect();
  try {
    await client.query(
      `insert into ${table} (${columns.join(", ")}) values (${placeholders.join(", ")})`,
      Object.values(row),
    );
  } finally {
    await client.end().catch(() => {});
  }
}
