# Stringline site

The marketing site and pilot application for Stringline. Next.js 16 (App Router), deployed on Vercel.

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to test with real services. With no env vars set, the site runs normally and form submissions are only written to the server log.

## Where submissions go

- **Applications** (`/apply`) are saved to the Supabase `applications` table and emailed to Aidan.
- **Contact messages** (`/contact`) are emailed to Aidan with reply-to set to the sender, and copied to `contact_messages`.

Each submission succeeds if at least one configured delivery works. Failures are logged with the full submission, prefixed `[application:` or `[contact:`, so nothing is lost.

## Setup checklist

1. **Supabase.** Create a project, open the SQL editor, and run `supabase/schema.sql`. From Project Settings → API Keys, copy the project URL and a secret key into `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. Never use the secret key in browser code.
2. **Resend.** Create an account with the email Aidan wants alerts at, create an API key, and set `RESEND_API_KEY` and `NOTIFY_EMAIL`. Once the domain exists, verify it in Resend and set `EMAIL_FROM`.
3. **Booking link.** Make a 15–20 minute intro-call link (Cal.com, Calendly or Google appointment page) and set `NEXT_PUBLIC_BOOKING_URL`.
4. **Vercel.** Import the GitHub repo, add the env vars above for Production and Preview, and redeploy. Turn on Analytics in the project's Analytics tab.
5. **Domain.** Add it under Settings → Domains, set `NEXT_PUBLIC_SITE_URL`, and redeploy.
6. **Test.** Submit one application and one contact message on the live site and check both the table and the inbox.
