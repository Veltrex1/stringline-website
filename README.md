# Stringline site

The marketing site and pilot application for Stringline. Next.js 16 (App Router), deployed on Vercel.

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to test with real services. With no env vars set, the site runs normally and form submissions are only written to the server log.

## Where submissions go

- **Applications** (`/apply`) are saved to the `applications` table in Neon and emailed to Aidan.
- **Contact messages** (`/contact`) are emailed to Aidan with reply-to set to the sender, and copied to `contact_messages`.

Each submission succeeds if at least one configured delivery works. Failures are logged with the full submission, prefixed `[application:` or `[contact:`, so nothing is lost.

## Setup checklist

1. **Vercel.** Import the GitHub repo as a new project.
2. **Neon.** In that Vercel project, open Storage and add Neon (from the Marketplace). It creates the database and sets `DATABASE_URL` for you. Then open Neon's SQL Editor and run `db/schema.sql`. Submissions show up in Neon's Tables view.
3. **Resend.** Create an account with the email Aidan wants alerts at, create an API key, and add `RESEND_API_KEY` and `NOTIFY_EMAIL` in Vercel. Once the domain exists, verify it in Resend and set `EMAIL_FROM`.
4. **Booking link.** Make a 15–20 minute intro-call link (Cal.com, Calendly or Google appointment page) and add it as `NEXT_PUBLIC_BOOKING_URL`.
5. **Redeploy** so the new env vars take effect, and turn on Analytics in the project's Analytics tab.
6. **Domain.** Add it under Settings → Domains, set `NEXT_PUBLIC_SITE_URL`, and redeploy.
7. **Test.** Submit one application and one contact message on the live site and check both the Neon table and the inbox.
