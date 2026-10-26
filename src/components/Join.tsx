"use client";

import { useActionState, useRef, useState } from "react";
import { joinWaitlist, type JoinState } from "@/app/actions";
import { join } from "@/content";

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia",
];

export function Join() {
  const [state, action, pending] = useActionState<JoinState, FormData>(joinWaitlist, { ok: false });
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  function next() {
    const el = emailRef.current;
    if (!el || !el.value || !el.checkValidity()) {
      setEmailError("Enter an email address like you@company.com.");
      el?.focus();
      return;
    }
    setEmailError("");
    setOpen(true);
    requestAnimationFrame(() => nameRef.current?.focus());
  }

  return (
    <section className="join" id="join" aria-labelledby="join-title">
      <div className="join__intro">
        <h2 id="join-title" className="h2">
          {state.ok ? "Application received." : join.heading}
        </h2>
        <p>{state.ok ? join.success : join.lede}</p>
      </div>

      {!state.ok && (
        <form action={action} noValidate className="join__form">
          <div className="field">
            <label htmlFor="email">{join.emailLabel}</label>
            <div className="join__row">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={join.emailPlaceholder}
                aria-describedby={emailError ? "email-error" : undefined}
                aria-invalid={emailError ? true : undefined}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !open) {
                    e.preventDefault();
                    next();
                  }
                }}
              />
              {!open && (
                <button type="button" className="btn btn--big" onClick={next}>
                  {join.continue}
                </button>
              )}
            </div>
            {emailError && (
              <p id="email-error" className="error" role="alert">
                {emailError}
              </p>
            )}
          </div>

          {open && (
            <div className="join__more">
              <h3 className="h3">{join.formHeading}</h3>
              <div className="join__grid">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input ref={nameRef} id="name" name="name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Mobile phone</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" autoComplete="organization" required />
                </div>
                <div className="field">
                  <label htmlFor="state">State you work in</label>
                  <select id="state" name="state" required defaultValue="">
                    <option value="" disabled>
                      Choose a state
                    </option>
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <fieldset className="field field--wide">
                  <legend>What you build</legend>
                  <div className="checks">
                    {join.services.map((s) => (
                      <label key={s}>
                        <input type="checkbox" name="services" value={s} /> {s}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="field">
                  <label htmlFor="leads">New leads in a typical spring month</label>
                  <select id="leads" name="leads" defaultValue="">
                    <option value="">Choose a range</option>
                    {join.leads.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="calendar">Calendar you use</label>
                  <select id="calendar" name="calendar" defaultValue="">
                    <option value="">Choose one</option>
                    {join.calendars.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="field field--wide">
                  <label htmlFor="crm">CRM or job software, if any</label>
                  <input id="crm" name="crm" placeholder="Jobber, LMN, Aspire, a spreadsheet…" />
                </div>
              </div>
              {state.error && (
                <p className="error" role="alert">
                  {state.error}
                </p>
              )}
              <button type="submit" className="btn btn--big" disabled={pending}>
                {pending ? "Sending…" : join.submit}
              </button>
            </div>
          )}
        </form>
      )}
    </section>
  );
}
