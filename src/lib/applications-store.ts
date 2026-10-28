import "server-only";
import type { Application } from "./application";
import { deliver, emailEnabled, notifyAidan } from "./email";
import { insertRow, storageEnabled } from "./supabase";

export type StoredApplication = Application & {
  id: string;
  submittedAt: string;
  source: string;
};

// Saves the application to Supabase and emails Aidan, whichever of the two are configured.
// The submit action already validates and normalizes the data before calling this.
export async function saveApplication(app: Application, source = "website"): Promise<StoredApplication> {
  const stored: StoredApplication = {
    ...app,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    source,
  };
  const jobs: (() => Promise<void>)[] = [];
  if (storageEnabled) jobs.push(() => insertRow("applications", toRow(stored)));
  if (emailEnabled) jobs.push(() => notifyAidan(subject(stored), summary(stored), stored.email));
  await deliver("application", stored, jobs);
  return stored;
}

function toRow(a: StoredApplication) {
  return {
    id: a.id,
    submitted_at: a.submittedAt,
    source: a.source,
    name: a.name,
    role: a.role,
    email: a.email,
    phone: a.phone || null,
    company: a.company,
    city: a.city || null,
    state: a.state,
    crew_size: a.crewSize || null,
    services: a.services,
    project_size: a.projectSize || null,
    leads_per_month: a.leadsPerMonth,
    lead_sources: a.leadSources,
    who_answers: a.whoAnswers || null,
    what_slips: a.whatSlips,
    problem: a.problem || null,
  };
}

function subject(a: StoredApplication) {
  return `Pilot application: ${a.company} (${a.state})`;
}

function summary(a: StoredApplication) {
  const line = (label: string, value: string | string[]) => {
    const v = Array.isArray(value) ? value.join(", ") : value;
    return `${label}: ${v || "—"}`;
  };
  return [
    `${a.name} from ${a.company} applied for the pilot. Reply to this email to reach them.`,
    "",
    line("Name", a.name),
    line("Role", a.role),
    line("Email", a.email),
    line("Phone", a.phone),
    line("Company", a.company),
    line("Location", [a.city, a.state].filter(Boolean).join(", ")),
    line("Crew size", a.crewSize),
    line("Services", a.services),
    line("Typical project", a.projectSize),
    line("Leads per month", a.leadsPerMonth),
    line("Lead sources", a.leadSources),
    line("Who answers", a.whoAnswers),
    line("What slips", a.whatSlips),
    "",
    "Anything else:",
    a.problem || "—",
    "",
    `Submitted ${a.submittedAt} · ${a.id}`,
  ].join("\n");
}
