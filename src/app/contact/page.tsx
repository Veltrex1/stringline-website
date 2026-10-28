import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { contact } from "@/content";

export const metadata: Metadata = {
  title: "Contact · Stringline",
  description: "Questions about Stringline or the pilot? Send a note straight to Aidan.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact">
        <div className="contact__intro">
          <h1 className="h2">{contact.title}</h1>
          <p className="contact__lede">{contact.lede}</p>
        </div>
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
