import Link from "next/link";
import { footer, nav } from "@/content";
import { Mark } from "./Mark";

export function SiteHeader({ showCta = true }: { showCta?: boolean }) {
  return (
    <header className="nav">
      <Link href="/" className="wordmark">
        <Mark size={30} />
        Stringline
      </Link>
      <nav aria-label="Main">
        <ul className="nav__links">
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {showCta ? (
        <Link className="btn btn--small" href="/apply">
          {nav.cta}
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <p className="footer__name">
        <Mark size={120} />
        Stringline
      </p>
      <div className="footer__base">
        <span>{footer.copyright}</span>
        <span>{footer.line}</span>
      </div>
    </footer>
  );
}
