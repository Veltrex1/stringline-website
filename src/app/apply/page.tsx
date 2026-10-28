import type { Metadata } from "next";
import { ApplyForm } from "@/components/ApplyForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { apply } from "@/content";

export const metadata: Metadata = {
  title: "Apply for the pilot · Stringline",
  description: "Apply to join the Stringline pilot. We take on a small number of hardscape and landscape crews at a time.",
};

export default function ApplyPage() {
  return (
    <>
      <SiteHeader showCta={false} showLinks={false} />
      <main className="apply">
        <aside className="apply__intro">
          <h1 className="h2">{apply.title}</h1>
          <p className="apply__lede">{apply.lede}</p>
          <div className="apply__next">
            <h2 className="apply__next-title">{apply.nextHeading}</h2>
            <ol>
              {apply.next.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ol>
          </div>
        </aside>
        <ApplyForm />
      </main>
      <SiteFooter />
    </>
  );
}
