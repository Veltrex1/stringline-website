"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { sendContact } from "@/app/contact/actions";
import { contact } from "@/content";
import { EMPTY_MESSAGE, MESSAGE_MAX, validateMessage, type ContactErrors, type ContactField, type ContactMessage } from "@/lib/contact";

const FIELDS: { key: ContactField; label: string; type?: string; auto?: string; optional?: boolean }[] = [
  { key: "name", label: "Your name", auto: "name" },
  { key: "email", label: "Email", type: "email", auto: "email" },
  { key: "phone", label: "Mobile phone", type: "tel", auto: "tel", optional: true },
  { key: "company", label: "Company", auto: "organization", optional: true },
];

export function ContactForm() {
  const [data, setData] = useState<ContactMessage>(EMPTY_MESSAGE);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const doneRef = useRef<HTMLHeadingElement>(null);

  const set = (k: ContactField, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateMessage(data);
    setErrors(errs);
    const first = (Object.keys(errs) as ContactField[])[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setFormError("");
    startTransition(async () => {
      const res = await sendContact(data);
      if (res.ok) {
        setSent(true);
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      setFormError(res.message);
      setErrors(res.errors);
    });
  }

  if (sent) {
    return (
      <div className="contact-form contact-form--done" role="status">
        <h2 ref={doneRef} tabIndex={-1} className="h3">
          {contact.successTitle}
        </h2>
        <p>{contact.successBody}</p>
        <Link className="link" href="/">
          {contact.home}
        </Link>
      </div>
    );
  }

  const describedBy = (k: ContactField) => (errors[k] ? `ce-${k}` : undefined);

  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      <div className="field-row">
        {FIELDS.map((f) => (
          <div className="field" key={f.key}>
            <label htmlFor={`c-${f.key}`}>
              {f.label}
              {f.optional && <span className="optional"> (optional)</span>}
            </label>
            <input
              id={`c-${f.key}`}
              type={f.type ?? "text"}
              autoComplete={f.auto}
              value={data[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              aria-invalid={errors[f.key] ? true : undefined}
              aria-describedby={describedBy(f.key)}
              aria-required={f.optional ? undefined : true}
            />
            {errors[f.key] && (
              <p id={`ce-${f.key}`} className="error">
                {errors[f.key]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          rows={6}
          maxLength={MESSAGE_MAX}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
          aria-required
        />
        {errors.message && (
          <p id="ce-message" className="error">
            {errors.message}
          </p>
        )}
      </div>
      <div aria-live="polite">
        {formError && <p className="error form-error">{formError}</p>}
      </div>
      <button type="submit" className="btn btn--big" disabled={pending}>
        {pending ? contact.submitting : contact.submit}
      </button>
    </form>
  );
}
