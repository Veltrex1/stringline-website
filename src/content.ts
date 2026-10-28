// All page copy in one place, for review. Example figures are labeled as examples on the page.

export const images = {
  before: { src: "/images/yard-before.jpg", alt: "An ordinary backyard: lawn, a small back stoop, a fence and a maple tree" },
  concept: { src: "/images/yard-concept.jpg", alt: "The same backyard as a concept with a charcoal paver patio, fire pit and seat wall" },
};

export const nav = {
  links: [
    { href: "/#how", label: "How it works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ],
  cta: "Apply",
};

export const hero = {
  title: ["Every lead answered.", "Every consult booked."],
  lede:
    "Stringline answers your calls, texts and web forms in under a minute, books the consult on your calendar, and shows the homeowner a concept of their own yard before you get there.",
  cta: "Apply for the pilot",
  note: "Pilot open by application · limited spots",
  reveal: {
    label: "Drag to compare the yard today with the concept",
    before: "Today",
    after: "Concept",
    range: "$9,000–$13,500",
    rangeNote: "Patio, 300 sq ft · example range",
    disclaimer: "Concept only. Final design set at consult.",
  },
};

export const moment =
  "Example: 10:47 pm on a Tuesday. A homeowner fills out your form for a patio. Stringline texts back 38 seconds later, and by morning she’s on Thursday’s calendar.";

export const steps = {
  heading: "How a lead becomes a consult",
  items: [
    {
      title: "Answered in under a minute",
      body: "Calls, texts and web forms get an instant reply in your business name, day or night. You keep your number, and your office can still pick up first.",
    },
    {
      title: "Qualified and booked",
      body: "Stringline checks your service area, budget floor and timeline, then offers real open times from your Google or Outlook calendar. Leads that aren’t a fit get a polite close.",
    },
    {
      title: "Shown, with the concept in hand",
      body: "Before the consult, the homeowner sees a concept of their own yard with a range from your price book. Your estimator gets a one-page brief with what they liked.",
    },
  ],
};

export const pricing = {
  heading: "You pay when they show.",
  body:
    "No retainer for answering the phone. A consult counts only when the homeowner is in your area, at or above your budget floor, booked, and shown. You confirm each one the morning after, and you can dispute any charge for 7 days.",
  note: "A one-time setup fee applies. Pilot terms are set with each crew.",
};

export const about = {
  heading: "Built by a hardscaper.",
  body:
    "Aidan King is 20 and has spent four years working in hardscaping. He started Stringline so the office side of the trade keeps up with the work in the field: every lead answered, every consult on the calendar, every estimator prepared.",
};

export const applyCta = {
  heading: "Apply for the pilot",
  lede:
    "We work with a small number of crews at a time, starting in Indiana. Tell us about your business, and if it’s a fit, we’ll reach out to get you set up.",
  cta: "Start your application",
  note: "Four short steps, about 3 minutes.",
};

export const apply = {
  title: "Apply for the pilot",
  lede:
    "We take on a small number of crews at a time and read every application ourselves. Not every crew is a fit yet, and that’s fine. Tell us how your business runs today.",
  nextHeading: "What happens next",
  next: [
    "We review your application, usually within a few business days.",
    "If it looks like a fit, we reach out for a short call about your leads and calendar.",
    "We set Stringline up with your service area, price book and calendar.",
  ],
  back: "Back",
  continue: "Continue",
  submit: "Submit application",
  submitting: "Sending…",
  consent: "By applying, you agree we can contact you about the pilot by email or phone.",
  reviewHeading: "Check your answers",
  edit: "Edit",
};

export const thanks = {
  title: "Thanks for applying.",
  body:
    "We review every application ourselves and will reach out by email if your crew looks like a fit.",
  callHeading: "Want to move faster?",
  callBody: "Book a short intro call and we’ll walk through how Stringline would work for your crew.",
  callCta: "Book an intro call",
  callMissing: "Booking link not set. Add NEXT_PUBLIC_BOOKING_URL to show this button.",
  home: "Back to the homepage",
};

export const faq = {
  heading: "Questions",
  items: [
    {
      q: "Do I keep my business number?",
      a: "Yes. You forward your line to a Stringline number, either always or only on no-answer, busy or after hours. Your office can still answer first.",
    },
    {
      q: "Will homeowners know it’s an assistant?",
      a: "Yes. Every call opens with a recording disclosure, and the assistant never claims to be human.",
    },
    {
      q: "Which calendars does it work with?",
      a: "Google Calendar and Microsoft 365 / Outlook. It reads your open times, so it never double-books.",
    },
    {
      q: "Who checks the concepts and prices?",
      a: "Our team reviews every concept and range before a homeowner sees it. Ranges come from your own price book and are never a single number.",
    },
    {
      q: "How do I get into the pilot?",
      a: "Fill out the short application. We take on a small number of crews at a time, starting in Indiana, and review every application ourselves. Crews anywhere in the US can apply.",
    },
  ],
};

export const footer = {
  copyright: "© 2026 Stringline",
  line: "Indiana",
};
