// Settings that differ per deployment. Set them in Vercel (or .env.local) rather than in code.

// The link applicants use to book an intro call (Calendly, Cal.com, Google appointment page...).
// Empty until one exists; the thank-you page hides the booking box until it is set.
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

// The site's public address, used for share previews, the sitemap and robots.txt.
// Set NEXT_PUBLIC_SITE_URL once the domain exists; on Vercel the production URL is used until then.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
