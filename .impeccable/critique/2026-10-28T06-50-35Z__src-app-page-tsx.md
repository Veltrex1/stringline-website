---
target: the whole Stringline site
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:/Users/trevorking/claude/stringline-site/src/app/page.tsx"
target_fingerprint: "sha256:115ade853150ba1730acab8c3677048935232f338f231fea82ed359b4e3045ed"
target_path: /Users/trevorking/claude/stringline-site/src/app/page.tsx
timestamp: 2026-10-28T06-50-35Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design/persuasion review · B: detector + technical audit)

## Scores
Design (Nielsen): 30/40 Good. 1:3 status (thanks page gives no timeline), 2:3 language ("Your Company" template text), 3:2 control (refresh wipes application, nav leaves form), 4:3 consistency ("Pricing" has no price), 5:3 prevention (no draft), 6:4 recognition (answer review), 7:3, 8:3 (empty half-screens in back half), 9:4 errors, 10:2 help (FAQ misses buyer questions, no contact).
Technical audit: 14/20 Good. A11y 3 (field borders 1.3-1.5:1), Performance 3 (3840w heroes on retina), Theming 3 (hard-coded #b3261e etc.), Responsive 3 (vertical swipe on hero moves the reveal), Integrity 2 (applications not stored; dev note on thanks page).

## Design specificity
First ~1.5 screens authored (before/after reveal, consult brief, stakes mark). Headline is the generic AI-receptionist formula; pricing/about/join/FAQ share one interchangeable headline-left/paragraph-right template with empty halves. Detector: 9 deferred off-system values in globals.css; overlay found stragglers in about body and thanks call text.

## Priority issues
- [P0] Applications are never stored (src/lib/applications-store.ts only logs) while the UI says "we review every application". Wire storage before traffic.
- [P1] /apply/thanks shows a disabled booking button and red dev note "Booking link not set..." in production. Hide when unset; promise a reply to everyone; give a direct contact.
- [P1] Core promise claimed not demonstrated: thread stops at "Sure, go ahead!", voice never shown, "Your Company" placeholder. Build a complete labeled example exchange (disclosure, ZIP/budget/timeline, two slots, booked, concept link, hand-off); consider a live demo number.
- [P1] Buyer objections unanswered and differentiator buried: pay-per-shown first appears ~3,400px down; no FAQ on cost, wrong answers/hand-off, setup effort, contract; no contact anywhere; no CTA after FAQ.
- [P2] About leads with "is 20", no photo; back half is a generic empty template.
- [P2] Application: refresh/nav loses data; step 3 has 6 questions and 37 chips; mobile form starts below fold.
- [P2] Mobile hero: price chip covers the concept; vertical swipe on image moves the reveal.

## Persona red flags
Dale (45, owner, phone in truck): headline reads generic; can't hear the call; can't contact anyone; unexplained setup fee; quits at step 3; ends on broken button. Jordan: Pricing has no price; Concept-left/Today-right reversed; thanks page looks like an error. Casey: no sticky or closing CTA; form below fold; refresh loses answers. Riley: /apply/thanks reachable directly; default unbranded 404; "Every consult booked" contradicts polite-close; chip says patio only but concept adds walkway/fire pit.

## Minor
Hero snaps 84->18 before sweeping; no OG/Twitter/robots/sitemap; 200% text zoom overflows (nowrap buttons, footer wordmark); 19px nav tap targets on tablets; no privacy line; "Example:" prefix and repeated 10:47/38s; vague "limited spots"; leftover create-next-app SVGs; #b3261e not tokenized; choice groups lack aria-invalid/required; motion lib (27KB gz) for one tween.

## Questions
1. Why show a picture of a text exchange instead of a live demo number?
2. Why does pay-per-shown appear seventh instead of in the headline?
3. Would the owner rather fill a 4-step form or text Aidan directly?
