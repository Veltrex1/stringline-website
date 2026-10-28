// Settings that differ per deployment. Set them in Vercel (or .env.local) rather than in code.

// The link applicants use to book an intro call (Calendly, Cal.com, Google appointment page...).
// Empty until one exists; the thank-you page then shows a disabled button and a note to set it.
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
