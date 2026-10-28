import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { bookingUrl } from "@/config/site";
import { thanks } from "@/content";

export const metadata: Metadata = {
  title: "Application received · Stringline",
  robots: { index: false },
};

export default function ThanksPage() {
  // Until a booking link is set, show the button disabled with a note, so the gap is visible before launch.
  const showMissing = !bookingUrl;
  return (
    <>
      <SiteHeader showCta={false} />
      <main className="thanks">
        <div className="thanks__main">
          <h1 className="h2">{thanks.title}</h1>
          <p className="thanks__body">{thanks.body}</p>
          <Link href="/" className="link">
            {thanks.home}
          </Link>
        </div>
        {(bookingUrl || showMissing) && (
          <section className="thanks__call" aria-labelledby="call-title">
            <h2 id="call-title" className="h3">
              {thanks.callHeading}
            </h2>
            <p>{thanks.callBody}</p>
            {bookingUrl ? (
              <a className="btn btn--big" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                {thanks.callCta}
              </a>
            ) : (
              <>
                <span className="btn btn--big" aria-disabled="true" data-disabled>
                  {thanks.callCta}
                </span>
                <p className="dev-note">{thanks.callMissing}</p>
              </>
            )}
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
