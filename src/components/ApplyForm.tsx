"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { submitApplication } from "@/app/apply/actions";
import {
  CREW_SIZES,
  EMPTY_APPLICATION,
  LEADS_PER_MONTH,
  LEAD_SOURCES,
  PROBLEM_MAX,
  PROJECT_SIZES,
  ROLES,
  SERVICES,
  STEPS,
  US_STATES,
  WHAT_SLIPS,
  WHO_ANSWERS,
  validateFields,
  type Application,
  type Errors,
  type Field,
} from "@/lib/application";
import { apply } from "@/content";

type ListField = "services" | "leadSources" | "whatSlips";

const LABELS: Record<Field, string> = {
  name: "Your name",
  role: "Your role",
  email: "Email",
  phone: "Mobile phone",
  company: "Company name",
  city: "City",
  state: "State",
  crewSize: "Crew size",
  services: "What you build",
  projectSize: "Typical project size",
  leadsPerMonth: "New leads per month in season",
  leadSources: "Where your leads come from",
  whoAnswers: "Who answers new leads today",
  whatSlips: "What slips through the cracks",
  problem: "What’s the biggest thing you want fixed?",
};

const REQUIRED: Field[] = ["name", "role", "email", "company", "state", "services", "leadsPerMonth"];

// Answers are kept in this browser tab while someone applies, so a refresh or an interruption on
// the job doesn't wipe them. Cleared once the application is sent.
const DRAFT_KEY = "stringline-application-draft";

function readDraft(): { data: Application; step: number } | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { data: { ...EMPTY_APPLICATION, ...parsed.data }, step: Math.min(Number(parsed.step) || 0, STEPS.length - 1) };
  } catch {
    return null;
  }
}

function writeDraft(data: Application, step: number) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ data, step }));
  } catch {}
}

function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {}
}

const hasAnswers = (a: Application) =>
  Object.values(a).some((v) => (Array.isArray(v) ? v.length > 0 : v !== ""));

export function ApplyForm() {
  const router = useRouter();
  const [data, setData] = useState<Application>(EMPTY_APPLICATION);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [pending, startTransition] = useTransition();
  const [restored, setRestored] = useState(false);
  const [announce, setAnnounce] = useState("");
  const loaded = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const last = step === STEPS.length - 1;

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const draft = readDraft();
      loaded.current = true;
      if (draft && hasAnswers(draft.data)) {
        setData(draft.data);
        setStep(draft.step);
        setRestored(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (loaded.current && hasAnswers(data)) writeDraft(data, step);
  }, [data, step]);

  function startOver() {
    clearDraft();
    setData(EMPTY_APPLICATION);
    setRestored(false);
    goTo(0);
  }

  function announceErrors(errs: Errors) {
    const n = Object.keys(errs).length;
    setAnnounce(n ? `${n === 1 ? "One answer needs" : `${n} answers need`} another look.` : "");
  }

  const set = <K extends Field>(k: K, v: Application[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggle = (k: ListField, v: string) =>
    set(k, data[k].includes(v) ? data[k].filter((x) => x !== v) : [...data[k], v]);

  function goTo(n: number) {
    setStep(n);
    setErrors({});
    setFormError("");
    requestAnimationFrame(() => {
      headingRef.current?.focus();
      headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  function focusFirstError(errs: Errors) {
    const first = STEPS[step].fields.find((f) => errs[f]) ?? (Object.keys(errs)[0] as Field | undefined);
    if (first) requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
  }

  function next() {
    const errs = validateFields(data, STEPS[step].fields);
    setErrors(errs);
    announceErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    goTo(step + 1);
  }

  function submit() {
    const errs = validateFields(data, STEPS.flatMap((s) => s.fields));
    if (Object.keys(errs).length) {
      const bad = STEPS.findIndex((s) => s.fields.some((f) => errs[f]));
      setStep(bad);
      setErrors(errs);
      announceErrors(errs);
      focusFirstError(errs);
      return;
    }
    setFormError("");
    startTransition(async () => {
      const res = await submitApplication(data);
      if (res.ok) {
        clearDraft();
        router.push("/apply/thanks");
        return;
      }
      setFormError(res.message);
      if (Object.keys(res.errors).length) {
        const bad = STEPS.findIndex((s) => s.fields.some((f) => res.errors[f]));
        if (bad >= 0) setStep(bad);
        setErrors(res.errors);
      }
    });
  }

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`e-${f}`} className="error">
        {errors[f]}
      </p>
    ) : null;
  const describedBy = (f: Field, hint?: boolean) =>
    [hint ? `h-${f}` : "", errors[f] ? `e-${f}` : ""].filter(Boolean).join(" ") || undefined;
  const label = (f: Field) => (
    <>
      {LABELS[f]}
      {REQUIRED.includes(f) ? null : <span className="optional"> (optional)</span>}
    </>
  );

  const text = (f: "name" | "email" | "phone" | "company" | "city", type = "text", autoComplete?: string) => (
    <div className="field">
      <label htmlFor={`f-${f}`}>{label(f)}</label>
      <input
        id={`f-${f}`}
        type={type}
        autoComplete={autoComplete}
        value={data[f]}
        onChange={(e) => set(f, e.target.value)}
        aria-invalid={errors[f] ? true : undefined}
        aria-describedby={describedBy(f)}
        aria-required={REQUIRED.includes(f) || undefined}
      />
      {err(f)}
    </div>
  );

  const select = (f: "state", options: readonly string[], placeholder: string) => (
    <div className="field">
      <label htmlFor={`f-${f}`}>{label(f)}</label>
      <select
        id={`f-${f}`}
        value={data[f]}
        onChange={(e) => set(f, e.target.value)}
        aria-invalid={errors[f] ? true : undefined}
        aria-describedby={describedBy(f)}
        aria-required={REQUIRED.includes(f) || undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {err(f)}
    </div>
  );

  const choices = (f: "role" | "crewSize" | "projectSize" | "leadsPerMonth" | "whoAnswers", options: readonly string[]) => (
    <fieldset
      className="field"
      id={`f-${f}`}
      tabIndex={-1}
      role="radiogroup"
      aria-required={REQUIRED.includes(f) || undefined}
      aria-invalid={errors[f] ? true : undefined}
      aria-describedby={describedBy(f)}
    >
      <legend>{label(f)}</legend>
      <div className="chips">
        {options.map((o) => (
          <label key={o} className="chip">
            <input type="radio" name={f} value={o} checked={data[f] === o} onChange={() => set(f, o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {err(f)}
    </fieldset>
  );

  const multi = (f: ListField, options: readonly string[], hint: string) => (
    <fieldset className="field" id={`f-${f}`} tabIndex={-1} aria-invalid={errors[f] ? true : undefined} aria-describedby={describedBy(f, true)}>
      <legend>{label(f)}</legend>
      <p id={`h-${f}`} className="hint">
        {hint}
      </p>
      <div className="chips">
        {options.map((o) => (
          <label key={o} className="chip">
            <input type="checkbox" value={o} checked={data[f].includes(o)} onChange={() => toggle(f, o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {err(f)}
    </fieldset>
  );

  const summary = (f: Field) => {
    const v = data[f];
    const shown = Array.isArray(v) ? v.join(", ") : v;
    return shown ? shown : <span className="muted">Not answered</span>;
  };

  return (
    <div className="apply-form">
      {restored && (
        <p className="draft-note" role="status">
          {apply.draftRestored}{" "}
          <button type="button" className="link-btn" onClick={startOver}>
            {apply.startOver}
          </button>
        </p>
      )}
      <div className="progress" role="group" aria-label={`Progress: step ${step + 1} of ${STEPS.length}`}>
        <div className="progress__line">
          <span style={{ transform: `scaleX(${(step + 1) / STEPS.length})` }} />
        </div>
        <ol className="progress__steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
              {s.title}
            </li>
          ))}
        </ol>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (last) submit();
          else next();
        }}
      >
        <h2 ref={headingRef} tabIndex={-1} className="h3 apply-form__title">
          Step {step + 1} of {STEPS.length}: {STEPS[step].title}
        </h2>

        <div className="apply-form__fields" key={step}>
          {step === 0 && (
            <>
              {text("name", "text", "name")}
              {choices("role", ROLES)}
              {text("email", "email", "email")}
              {text("phone", "tel", "tel")}
            </>
          )}

          {step === 1 && (
            <>
              {text("company", "text", "organization")}
              <div className="field-row">
                {text("city", "text", "address-level2")}
                {select("state", US_STATES, "Choose a state")}
              </div>
              {choices("crewSize", CREW_SIZES)}
            </>
          )}

          {step === 2 && (
            <>
              {multi("services", SERVICES, "Pick all that apply.")}
              {choices("projectSize", PROJECT_SIZES)}
              {choices("leadsPerMonth", LEADS_PER_MONTH)}
            </>
          )}

          {step === 3 && (
            <>
              {multi("leadSources", LEAD_SOURCES, "Pick all that apply.")}
              {choices("whoAnswers", WHO_ANSWERS)}
              {multi("whatSlips", WHAT_SLIPS, "Pick all that apply.")}
            </>
          )}

          {step === 4 && (
            <>
              <div className="field">
                <label htmlFor="f-problem">{label("problem")}</label>
                <textarea
                  id="f-problem"
                  rows={5}
                  maxLength={PROBLEM_MAX}
                  value={data.problem}
                  onChange={(e) => set("problem", e.target.value)}
                  placeholder="For example: we miss calls all spring while we’re on jobs, and half our web leads never get a callback."
                  aria-invalid={errors.problem ? true : undefined}
                  aria-describedby={describedBy("problem", true)}
                />
                <p id="h-problem" className="hint num">
                  {data.problem.length} / {PROBLEM_MAX}
                </p>
                {err("problem")}
              </div>

              <section className="review" aria-labelledby="review-title">
                <h3 id="review-title" className="review__title">
                  {apply.reviewHeading}
                </h3>
                {STEPS.slice(0, STEPS.length - 1).map((s, i) => (
                  <div key={s.title} className="review__group">
                    <div className="review__head">
                      <span>{s.title}</span>
                      <button type="button" className="link-btn" onClick={() => goTo(i)}>
                        {apply.edit} <span className="sr-only">{s.title}</span>
                      </button>
                    </div>
                    <dl>
                      {s.fields.map((f) => (
                        <div key={f}>
                          <dt>{LABELS[f]}</dt>
                          <dd>{summary(f)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </section>
              <p className="hint">
                {apply.free} {apply.consent}
              </p>
            </>
          )}
        </div>

        <div className="sr-only" aria-live="assertive">
          {announce}
        </div>
        <div aria-live="polite">{formError && <p className="error form-error">{formError}</p>}</div>

        <div className="apply-form__nav">
          {step > 0 ? (
            <button type="button" className="btn btn--ghost" onClick={() => goTo(step - 1)} disabled={pending}>
              {apply.back}
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className="btn btn--big" disabled={pending}>
            {last ? (pending ? apply.submitting : apply.submit) : apply.continue}
          </button>
        </div>
      </form>
    </div>
  );
}
