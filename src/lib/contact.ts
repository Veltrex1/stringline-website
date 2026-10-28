// The contact form: its fields and validation, shared by the form and the send action.

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export type ContactField = keyof ContactMessage;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMPTY_MESSAGE: ContactMessage = { name: "", email: "", phone: "", company: "", message: "" };
export const MESSAGE_MAX = 2000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateMessage(m: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  if (!m.name.trim()) errors.name = "Add your name.";
  if (!m.email.trim()) errors.email = "Add your email so Aidan can reply.";
  else if (!EMAIL.test(m.email.trim())) errors.email = "Enter an email like you@company.com.";
  if (m.phone.trim() && m.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "").length !== 10)
    errors.phone = "Enter a 10-digit US number, or leave it blank.";
  if (!m.message.trim()) errors.message = "Write a short message.";
  else if (m.message.length > MESSAGE_MAX) errors.message = `Keep it under ${MESSAGE_MAX} characters.`;
  return errors;
}

export function normalizeMessage(input: Partial<Record<string, unknown>>): ContactMessage {
  const text = (k: ContactField) => (typeof input[k] === "string" ? (input[k] as string).trim() : "");
  return {
    name: text("name"),
    email: text("email").toLowerCase(),
    phone: text("phone"),
    company: text("company"),
    message: text("message"),
  };
}
