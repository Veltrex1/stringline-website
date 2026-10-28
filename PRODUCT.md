# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners and office managers of hardscape and landscape design-build crews in the US. They're on job sites or running the office during the day, so calls go unanswered and web forms sit overnight, and those leads book whichever crew replies first. Owners decide whether to buy; office managers field calls, chase no-shows and would run setup. The first 3–5 pilot crews come from Trevor's network in Indiana; anyone in the US can join the waitlist.

Homeowners also use the product (calls, texts, a photo-upload page, concept renders, booking links), but on the marketing site they appear only as the experience a contractor's customers get.

## Product Purpose

Stringline is an AI front office for design-build contractors. It answers every lead by phone, text and web form in under 60 seconds, 24/7, qualifies it against the contractor's own rules, books an on-site design consult on the contractor's calendar, and before the consult sends the homeowner a concept render of their own yard and a ballpark price range. Success for the MVP: contractors get more qualified, shown consults per month than before, at a cost per consult they will pay.

The marketing site's job is to collect a waitlist of contractors (a longer application form) through winter 2026–27, ahead of pilots going live by April 1, 2027.

## Positioning

The full chain in one flow, billed per result: instant answer, qualification, render plus price range, booked consult, and payment only when a qualified homeowner shows up. An AI receptionist alone is a commodity, and so is a homeowner yard render alone; the combination, and pay-per-shown-consult billing, is the difference.

## Operating Context

- Contractors keep their business number and forward it to a Stringline number (always, or on no-answer, busy or after hours). Staff can still answer first.
- Qualification uses the contractor's service area (ZIPs or radius), budget floor per project type, timeline window and services offered. Not-qualified homeowners get a polite close and an optional referral message.
- Renders use 3–5 presets built from the contractor's own product lines. Every render and range is reviewed by Stringline's team before sending during pilots, and carries the fixed disclaimer "Concept only. Final design set at consult."
- Ranges come from the contractor's price book (Good / Better / Best per unit, minimums, ±20% margin, rounded to $500) and are never a single number.
- Estimators receive a one-page consult brief. Contractors confirm show or no-show the morning after and can dispute a charge within 7 days.
- Dead-lead revival: contractors upload unsold estimates and Stringline re-engages consenting contacts in winter.
- Calendars: Google Calendar and Microsoft 365 / Outlook only. No CRM integration at launch.

## Capabilities and Constraints

- Existing codebase: Next.js (App Router), TypeScript, Tailwind, Motion, in this folder.
- English only; US only; inbound AI voice only (no outbound AI calls).
- The assistant discloses call recording and never claims to be human.
- Texting compliance: carrier registration, consent for revival contacts, instant STOP opt-out, quiet hours 8am–9pm local.
- Pricing model: one-time setup fee plus a charge per billable consult, charged weekly after each dispute window. Dollar amounts are undecided; pilot terms are set per crew.
- Submissions: applications and contact messages go to a Neon Postgres database and are emailed to Aidan through Resend. Undecided: domain. The user handles Vercel manually.

## Brand Commitments

- Name: Stringline (decided Oct 23, 2026). A stringline is the taut line hardscapers set between stakes to mark grade and edges.
- Voice: a peer from the trade. Plain, direct, jobsite language from someone who has done the work. No AI hype.
- Public face: Aidan King, founder, 20, four years working in hardscaping. Trevor is not named on the site.
- Nothing visual is fixed: the earlier logo, palette and site design may be replaced.
- Pilot framing (user, Oct 26, 2026): never put a public date on the pilot. Present it as open now, by application only, with limited spots. Calls to action say "Apply", not "join the waitlist". Do not claim crews are already live or name any.
- Standing preference (user, Oct 26, 2026): the familiar end of the spectrum, closer to a paver idea book or a field-service software site than to an experimental world. Neutral grounds; colour used only as accents, no loud or saturated fields.

## Evidence on Hand

None confirmed. There are no photos of Aidan, job-site photos, pilot crew names or logos, testimonials, customer results, or real product screens or renders yet. Future work must not invent any of these; sample product content must be labeled as an example.

Source document: `Hardscape Booking System — MVP Scope.md` (Oct 23, 2026), copied at `/Users/trevorking/Desktop/`.

## Product Principles

1. Results over features: the contractor pays for shown, qualified consults, so every claim ties back to consults on the calendar.
2. Trade-credible: speak and show the work the way someone from the field would; nothing that reads as a generic software pitch.
3. Honest by default: ranges never a single number, renders always marked as concepts, the assistant never posing as human, no invented proof.
4. The contractor stays in control: their number, their rules, their prices, their calendar.
