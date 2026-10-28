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
  return (
    <>
      <SiteHeader showCta={false} />
      <main className="thanks">
        <div className="thanks__main">
          <h1 className="h2">{thanks.title}</h1>
          <p className="thanks__body">{thanks.body}</p>
          <p className="thanks__questions">
            {thanks.questions}{" "}
            <Link href="/contact" className="link">
              {thanks.contact}
            </Link>
          </p>
          <Link href="/" className="link">
            {thanks.home}
          </Link>
        </div>
        {/* Shown only once a booking link is set (NEXT_PUBLIC_BOOKING_URL). */}
        {bookingUrl && (
          <section className="thanks__call" aria-labelledby="call-title">
            <h2 id="call-title" className="h3">
              {thanks.callHeading}
            </h2>
            <p>{thanks.callBody}</p>
            <a className="btn btn--big" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              {thanks.callCta}
            </a>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
