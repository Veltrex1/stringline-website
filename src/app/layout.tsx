import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { RevealRoot } from "@/components/Reveal";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stringline · Every lead answered",
  description:
    "The front office for hardscape and landscape crews: every lead answered in under a minute, booked on your calendar, and shown a concept of their own yard. Pay per shown consult.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={schibsted.variable}>
      <body>
        <RevealRoot />
        {children}
      </body>
    </html>
  );
}
