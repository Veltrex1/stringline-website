// The pilot application: its fields, the choices for each, and validation.
// Shared by the form (client) and the submit action (server), so both check the same rules.

export const ROLES = ["Owner", "Office manager", "Estimator or designer", "Other"] as const;
export const CREW_SIZES = ["Just me", "2–5", "6–15", "16–30", "Over 30"] as const;
export const SERVICES = [
  "Patios",
  "Walkways",
  "Retaining walls",
  "Fire features",
  "Outdoor kitchens",
  "Full design-build",
  "Landscape installs",
  "Other",
] as const;
export const PROJECT_SIZES = ["Under $10k", "$10k–$25k", "$25k–$50k", "$50k–$100k", "Over $100k"] as const;
export const LEADS_PER_MONTH = ["Under 10", "10–25", "26–50", "51–100", "Over 100"] as const;
export const LEAD_SOURCES = [
  "Phone calls",
  "Website form",
  "Referrals",
  "Houzz, Angi or HomeAdvisor",
  "Google search or Maps",
  "Social media",
  "Yard signs or trucks",
  "Other",
] as const;
export const WHO_ANSWERS = [
  "I do (the owner)",
  "Office staff",
  "Whoever is free",
  "Voicemail, we call back",
  "An answering service",
] as const;
export const WHAT_SLIPS = [
  "Missed calls while we’re on jobs",
  "Slow follow-up on web forms",
  "No-shows to consults",
  "Leads that aren’t a fit",
  "Old estimates never followed up",
  "Nothing major",
] as const;

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

export type Application = {
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  state: string;
  crewSize: string;
  services: string[];
  projectSize: string;
  leadsPerMonth: string;
  leadSources: string[];
  whoAnswers: string;
  whatSlips: string[];
  problem: string;
};

export const EMPTY_APPLICATION: Application = {
  name: "",
  role: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  state: "",
  crewSize: "",
  services: [],
  projectSize: "",
  leadsPerMonth: "",
  leadSources: [],
  whoAnswers: "",
  whatSlips: [],
  problem: "",
};

export type Field = keyof Application;
export type Errors = Partial<Record<Field, string>>;

export const STEPS: { title: string; fields: Field[] }[] = [
  { title: "You", fields: ["name", "role", "email", "phone"] },
  { title: "Your business", fields: ["company", "city", "state", "crewSize"] },
  { title: "Your leads", fields: ["services", "projectSize", "leadsPerMonth", "leadSources", "whoAnswers", "whatSlips"] },
  { title: "Anything else", fields: ["problem"] },
];

export const PROBLEM_MAX = 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const oneOf = (value: string, list: readonly string[]) => value === "" || list.includes(value);
const allOf = (values: string[], list: readonly string[]) => values.every((v) => list.includes(v));

export function phoneDigits(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

function check(a: Application, field: Field): string | undefined {
  switch (field) {
    case "name":
      return a.name.trim() ? undefined : "Add your name.";
    case "role":
      if (!a.role) return "Choose your role.";
      return oneOf(a.role, ROLES) ? undefined : "Choose one of the listed roles.";
    case "email":
      if (!a.email.trim()) return "Add your email so we can reply.";
      return EMAIL.test(a.email.trim()) ? undefined : "Enter an email like you@company.com.";
    case "phone":
      if (!a.phone.trim()) return undefined;
      return phoneDigits(a.phone).length === 10 ? undefined : "Enter a 10-digit US number, or leave it blank.";
    case "company":
      return a.company.trim() ? undefined : "Add your company name.";
    case "city":
      return undefined;
    case "state":
      if (!a.state) return "Choose the state you work in.";
      return oneOf(a.state, US_STATES) ? undefined : "Choose a state from the list.";
    case "crewSize":
      return oneOf(a.crewSize, CREW_SIZES) ? undefined : "Choose a crew size from the list.";
    case "services":
      if (a.services.length === 0) return "Pick at least one service you offer.";
      return allOf(a.services, SERVICES) ? undefined : "Pick services from the list.";
    case "projectSize":
      return oneOf(a.projectSize, PROJECT_SIZES) ? undefined : "Choose a project size from the list.";
    case "leadsPerMonth":
      if (!a.leadsPerMonth) return "Choose roughly how many leads you get.";
      return oneOf(a.leadsPerMonth, LEADS_PER_MONTH) ? undefined : "Choose a range from the list.";
    case "leadSources":
      return allOf(a.leadSources, LEAD_SOURCES) ? undefined : "Pick sources from the list.";
    case "whoAnswers":
      return oneOf(a.whoAnswers, WHO_ANSWERS) ? undefined : "Choose one of the listed options.";
    case "whatSlips":
      return allOf(a.whatSlips, WHAT_SLIPS) ? undefined : "Pick from the list.";
    case "problem":
      return a.problem.length <= PROBLEM_MAX ? undefined : `Keep it under ${PROBLEM_MAX} characters.`;
  }
}

export function validateFields(a: Application, fields: Field[]): Errors {
  const errors: Errors = {};
  for (const f of fields) {
    const msg = check(a, f);
    if (msg) errors[f] = msg;
  }
  return errors;
}

export function validateApplication(a: Application): Errors {
  return validateFields(a, STEPS.flatMap((s) => s.fields));
}

// Trims text and drops anything that isn't a known field, so only clean data reaches storage.
export function normalizeApplication(input: Partial<Record<string, unknown>>): Application {
  const text = (k: Field) => (typeof input[k] === "string" ? (input[k] as string).trim() : "");
  const list = (k: Field) => (Array.isArray(input[k]) ? (input[k] as unknown[]).filter((v): v is string => typeof v === "string") : []);
  return {
    name: text("name"),
    role: text("role"),
    email: text("email").toLowerCase(),
    phone: text("phone"),
    company: text("company"),
    city: text("city"),
    state: text("state"),
    crewSize: text("crewSize"),
    services: list("services"),
    projectSize: text("projectSize"),
    leadsPerMonth: text("leadsPerMonth"),
    leadSources: list("leadSources"),
    whoAnswers: text("whoAnswers"),
    whatSlips: list("whatSlips"),
    problem: text("problem"),
  };
}
