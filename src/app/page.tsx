import { Join } from "@/components/Join";
import { BriefVisual, CalendarVisual, ThreadVisual } from "@/components/StepVisuals";
import { YardReveal } from "@/components/YardReveal";
import { about, faq, footer, hero, moment, nav, pricing, steps } from "@/content";

const VISUALS = [ThreadVisual, CalendarVisual, BriefVisual];

export default function Home() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="wordmark">
          Stringline
        </a>
        <nav aria-label="Main">
          <ul className="nav__links">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--small" href="#join">
          {nav.cta}
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__top">
            <h1 id="hero-title" className="display">
              <span>{hero.title[0]}</span> <span>{hero.title[1]}</span>
            </h1>
            <div className="hero__side">
              <p>{hero.lede}</p>
              <div className="hero__actions">
                <a className="btn" href="#join">
                  {hero.cta}
                </a>
                <span className="hero__note">{hero.note}</span>
              </div>
            </div>
          </div>
          <YardReveal />
        </section>

        <section className="moment" aria-label="An example lead">
          <p className="statement">
            {moment}
          </p>
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
                    <h3 className="h3">
                      {s.title}
                    </h3>
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
          <h2 id="pay-title" className="h2">
            {pricing.heading}
          </h2>
          <div className="pay__body">
            <p>{pricing.body}</p>
            <p className="muted">
              {pricing.note}
            </p>
          </div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <h2 id="about-title" className="h2">
            {about.heading}
          </h2>
          <p className="about__body">
            {about.body}
          </p>
        </section>

        <Join />

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
      </main>

      <footer className="footer">
        <p className="footer__name">Stringline</p>
        <div className="footer__base">
          <span>{footer.copyright}</span>
          <span>{footer.line}</span>
        </div>
      </footer>
    </>
  );
}
