import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { notFound } from "@/content";

export const metadata: Metadata = {
  title: "Page not found · Stringline",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <h1 className="h2">{notFound.title}</h1>
        <p>{notFound.body}</p>
        <div className="not-found__actions">
          <Link className="btn" href="/apply">
            {notFound.apply}
          </Link>
          <Link className="link" href="/">
            {notFound.home}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
