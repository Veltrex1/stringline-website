import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { RevealRoot } from "@/components/Reveal";
import { siteUrl } from "@/config/site";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const description =
  "The front office for hardscape and landscape crews: every lead answered in under a minute, booked on your calendar, and shown a concept of their own yard. You pay only for consults that show.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Stringline · Every lead answered. You pay when they show.",
  description,
  openGraph: {
    type: "website",
    siteName: "Stringline",
    title: "Every lead answered. You pay when they show.",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Every lead answered. You pay when they show.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
