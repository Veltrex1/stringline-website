import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { BriefVisual, CalendarVisual, CallVisual } from "@/components/StepVisuals";
import { YardReveal } from "@/components/YardReveal";
import { about, applyCta, faq, hero, moment, pricing, steps } from "@/content";

const VISUALS = [CallVisual, CalendarVisual, BriefVisual];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__top">
            <h1 id="hero-title" className="display">
              <span>{hero.title[0]}</span> <span>{hero.title[1]}</span>
            </h1>
            <div className="hero__side">
              <p>{hero.lede}</p>
              <div className="hero__actions">
                <Link className="btn" href="/apply">
                  {hero.cta}
                </Link>
                <span className="hero__note">{hero.note}</span>
              </div>
            </div>
          </div>
          <YardReveal />
        </section>

        <section className="moment" aria-label="An example lead">
          <p className="statement">{moment.line}</p>
          <p className="moment__caption">{moment.caption}</p>
        </section>

        <section className="steps" id="how" aria-labelledby="steps-title">
          <h2 id="steps-title" className="h2">
            {steps.heading}
          </h2>
          <ol className="steps__list">
            {steps.items.map((s, i) => {
              const Visual = VISUALS[i];
              return (
                <li key={s.title} className="step">
                  <div className="step__text">
                    <h3 className="h3">{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                  <div className={`step__visual${i === 2 ? " step__visual--photo" : ""}`} data-reveal>
                    <Visual />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="pay" id="pricing" aria-labelledby="pay-title">
          <div className="pay__text">
            <h2 id="pay-title" className="h2">
              {pricing.heading}
            </h2>
            <p>{pricing.body}</p>
            <p className="muted">{pricing.note}</p>
          </div>
          <figure className="ledger" data-ui>
            <figcaption className="ledger__title">{pricing.ledger.title}</figcaption>
            <dl>
              {pricing.ledger.rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd className="num">{r.value}</dd>
                </div>
              ))}
              <div className="ledger__total">
                <dt>{pricing.ledger.total.label}</dt>
                <dd className="num">{pricing.ledger.total.value}</dd>
              </div>
            </dl>
            <p className="ledger__note">{pricing.ledger.note}</p>
          </figure>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <h2 id="about-title" className="h2">
            {about.heading}
          </h2>
          <div className="about__text">
            <p className="about__body">{about.body}</p>
            <Link className="link" href="/contact">
              {about.cta}
            </Link>
          </div>
        </section>

        <section className="faq" id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className="h2">
            {faq.heading}
          </h2>
          <div className="faq__list">
            {faq.items.map((f) => (
              <details key={f.q} name="faq">
                <summary>
                  <span>{f.q}</span>
                  <svg className="faq__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 7l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <div className="join__intro">
            <h2 id="join-title" className="h2">
              {applyCta.heading}
            </h2>
            <p>{applyCta.lede}</p>
          </div>
          <div className="join__action">
            <Link className="btn btn--big" href="/apply">
              {hero.cta}
            </Link>
            <p className="muted">{applyCta.note}</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
