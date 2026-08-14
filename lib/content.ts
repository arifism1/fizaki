/**
 * Every string on the site lives here. No copy is hardcoded inside components.
 *
 * Serif headings carry italic emphasis on 2–4 words for editorial rhythm, so a
 * heading is modelled as an ordered list of segments rather than a plain string;
 * <SectionHeading> turns `italic: true` segments into <em>.
 */

export type HeadingSegment = { text: string; italic?: boolean };
export type Heading = readonly HeadingSegment[];

export type BrandColor =
  | "brandBlue"
  | "brandGreen"
  | "brandOrange"
  | "brandPink"
  | "brandPurple"
  | "brandTeal";

/** Lucide icon names, resolved through the registry in components/ui/icon-badge. */
export type IconName =
  | "phone-missed"
  | "message-circle"
  | "star"
  | "trending-up"
  | "calendar-check"
  | "zap"
  | "search"
  | "clock"
  | "wallet"
  | "users"
  | "bot"
  | "megaphone"
  | "globe"
  | "shield-check"
  | "headset"
  | "map-pin"
  | "bar-chart"
  | "handshake"
  | "rocket"
  | "wrench"
  | "sparkles";

export const site = {
  name: "fizaki",
  wordmark: "fizaki",
  tagline: "We make sure no lead slips through.",
  email: "arif@fizaki.com",
  phone: "9101776379",
  url: "https://fizaki.com",
  description:
    "fizaki builds AI systems that answer, qualify and book your leads in under 60 seconds — for clinics, gyms, solar, interiors, brokers and CAs across India.",
} as const;

export const nav = {
  links: [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Industries", href: "#industries" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Book a Demo",
  menuOpen: "Open menu",
  menuClose: "Close menu",
} as const;

export const hero = {
  badge: "AI + Marketing for Local Businesses",
  headingLineOne: "Every missed call is",
  headingLineTwo: "money walking out the door.",
  subline:
    "fizaki builds AI systems that answer, qualify, and book your leads in under 60 seconds — then floods your pipeline with more of them.",
  primaryCta: "See the 60-Second Demo",
  secondaryCta: "Book a free lead audit",
  trustLine: "For clinics · gyms · solar · interiors · brokers · CAs",
} as const;

export const problem = {
  id: "problem",
  eyebrow: "The lead-leak problem",
  heading: [
    { text: "Your leads deserve a system that " },
    { text: "answers", italic: true },
    { text: ", not another missed call." },
  ] satisfies Heading,
  body: [
    "Most local businesses in India don't have a demand problem. The phone does ring — during a consultation, on a site visit, at 9pm on a Sunday. It just rings out.",
    "By the time anyone calls back the next morning, that customer has already booked with whoever answered first. The lead was never lost to a competitor's marketing. It leaked out of a gap in the follow-up.",
  ],
  stats: [
    {
      value: 62,
      suffix: "%",
      label: "of calls to small businesses go unanswered",
      icon: "phone-missed" as IconName,
      color: "brandOrange" as BrandColor,
    },
    {
      value: 78,
      suffix: "%",
      label: "buy from whoever responds first",
      icon: "zap" as IconName,
      color: "brandBlue" as BrandColor,
    },
    {
      value: 5,
      suffix: " min",
      label: "the window where conversions multiply",
      icon: "clock" as IconName,
      color: "brandPurple" as BrandColor,
    },
    {
      value: 0,
      prefix: "₹",
      suffix: "",
      label: "earned from a lead that never got a reply",
      icon: "wallet" as IconName,
      color: "brandPink" as BrandColor,
    },
  ],
  funnelLabels: ["missed call", "no reply", "after hours"],
} as const;

export const twoJobs = {
  id: "system",
  eyebrow: "One system, two jobs",
  heading: [
    { text: "One system. Two jobs. We " },
    { text: "fill your funnel", italic: true },
    { text: ", then we stop it from leaking." },
  ] satisfies Heading,
  body: "Most agencies sell you traffic. Most software sells you a tool. Neither fixes the gap between the two — which is exactly where the money goes missing.",
  panels: [
    {
      title: "Get Leads",
      icon: "megaphone" as IconName,
      color: "brandOrange" as BrandColor,
      items: [
        "Local lead generation",
        "Google & Meta ads",
        "Reviews engine",
      ],
      tagline: "We fill your funnel.",
    },
    {
      title: "Convert Leads",
      icon: "shield-check" as IconName,
      color: "brandGreen" as BrandColor,
      items: [
        "Website + booking",
        "AI missed-call receptionist",
        "WhatsApp CRM",
        "AI qualifier",
        "AI support desk",
      ],
      tagline: "We stop it from leaking.",
    },
  ],
} as const;

export const services = {
  id: "services",
  eyebrow: "Services",
  heading: [
    { text: "A toolkit that works whether you're asleep, in surgery, or on a site visit. " },
    { text: "Everything runs itself", italic: true },
    { text: "." },
  ] satisfies Heading,
  body: "Eight pieces, one system. You can start with the leak and add the growth side later — most people do.",
  list: [
    { name: "Local lead generation", icon: "map-pin" as IconName, color: "brandOrange" as BrandColor },
    { name: "Google & Meta ads", icon: "bar-chart" as IconName, color: "brandBlue" as BrandColor },
    { name: "Reviews & reputation", icon: "star" as IconName, color: "brandPink" as BrandColor },
    { name: "Website + booking", icon: "globe" as IconName, color: "brandTeal" as BrandColor },
    { name: "AI missed-call receptionist", icon: "phone-missed" as IconName, color: "brandGreen" as BrandColor },
    { name: "WhatsApp CRM", icon: "message-circle" as IconName, color: "brandGreen" as BrandColor },
    { name: "AI lead qualifier", icon: "bot" as IconName, color: "brandPurple" as BrandColor },
    { name: "AI support desk", icon: "headset" as IconName, color: "brandBlue" as BrandColor },
  ],
  rows: [
    {
      key: "receptionist",
      badge: "Most Loved",
      title: "AI Missed-Call Receptionist",
      body: "Every missed call gets a WhatsApp reply and a booking link in under 60 seconds. Your phone stays the same number, your staff learn nothing new, and the lead never sits waiting.",
    },
    {
      key: "whatsapp",
      title: "WhatsApp CRM & Automation",
      body: "Lead → qualify → book → remind → human handoff, all inside WhatsApp. Where your customers already are, in the app they already have open.",
    },
    {
      key: "ads",
      title: "Google & Meta Ads Management",
      body: "Every rupee tracked from click to booked appointment. You see which campaign paid for which patient, not a vanity dashboard of impressions.",
    },
    {
      key: "reviews",
      title: "Reviews & Reputation Engine",
      body: "Automatic Google review requests after every job, on autopilot. Happy customers rarely think to leave a review — so we ask them at the exact moment they're happiest.",
    },
    {
      key: "qualifier",
      title: "AI Lead Qualifier + Support Desk",
      body: "AI screens new leads so your team only talks to hot ones, and resolves 60–80% of the repetitive questions — timings, pricing bands, directions, availability — before a human is ever pulled in.",
    },
  ],
} as const;

export const outcomes = {
  id: "outcomes",
  eyebrow: "What changes",
  heading: [
    { text: "The difference isn't more effort. It's a system that " },
    { text: "never sleeps", italic: true },
    { text: "." },
  ] satisfies Heading,
  cells: [
    {
      title: "Answer every lead in under 60 seconds",
      body: "Missed call, form fill, WhatsApp message or ad click — all of it gets a real reply while the customer is still deciding.",
      icon: "zap" as IconName,
      color: "brandGreen" as BrandColor,
    },
    {
      title: "Book appointments without picking up the phone",
      body: "The AI offers real slots from your calendar, confirms them, and sends the reminder. You just show up.",
      icon: "calendar-check" as IconName,
      color: "brandBlue" as BrandColor,
    },
    {
      title: "Turn happy customers into Google reviews",
      body: "A request goes out after every completed job, so your ranking and your walk-ins compound quietly in the background.",
      icon: "star" as IconName,
      color: "brandPink" as BrandColor,
    },
    {
      title: "Know exactly which ad brought which booking",
      body: "End-to-end tracking from the click to the chair. Spend more on what works, switch off what doesn't.",
      icon: "trending-up" as IconName,
      color: "brandPurple" as BrandColor,
    },
  ],
  caption: "Let your leads simply tap and book, easy as that.",
} as const;

export const howItWorks = {
  id: "how-it-works",
  eyebrow: "How it works",
  heading: [
    { text: "Go from leaking leads to " },
    { text: "booked calendar", italic: true },
    { text: ". Here's how." },
  ] satisfies Heading,
  body: "It takes three steps and about two weeks. Smooth like butter.",
  steps: [
    {
      title: "Audit",
      body: "We map exactly where your leads are leaking — missed calls, slow replies, dead forms. Free, takes 20 minutes.",
    },
    {
      title: "Install",
      body: "Your AI receptionist, WhatsApp flows, booking page and tracking go live in about two weeks. No number change, no new app for your staff.",
    },
    {
      title: "Grow",
      body: "Once the funnel is watertight, we pour in more leads with ads, local SEO and a review engine that compounds.",
    },
  ],
} as const;

export const industries = {
  id: "industries",
  eyebrow: "Industries",
  heading: [
    { text: "Built for the businesses that " },
    { text: "live and die by the phone", italic: true },
    { text: "." },
  ] satisfies Heading,
  body: "The leak looks different in every trade. The fix is the same shape.",
  tabs: [
    {
      key: "clinics",
      label: "Clinics & Dental",
      pain: "Never lose a patient to a busy phone line again.",
      outcome:
        "Your front desk is with a patient, not the phone. Every unanswered call gets a WhatsApp reply with real appointment slots, so the enquiry converts instead of calling the clinic down the road.",
      bullets: [
        "Missed calls answered during consultations",
        "Slot booking without a receptionist",
        "Automatic recall and follow-up reminders",
      ],
    },
    {
      key: "gyms",
      label: "Gyms",
      pain: "Trial enquiries booked before they cool off.",
      outcome:
        "Fitness intent has a half-life of about an hour. We reply instantly, book the free trial while motivation is still high, and nudge no-shows back onto the floor.",
      bullets: [
        "Instant reply to trial enquiries",
        "Trial-to-membership follow-up sequence",
        "Win-back messages for lapsed members",
      ],
    },
    {
      key: "interiors",
      label: "Interior Designers",
      pain: "Qualify budget before you spend an hour on a call.",
      outcome:
        "Stop giving free consultations to people shopping on price. The AI asks about scope, timeline and budget band first, so only serious projects reach your calendar.",
      bullets: [
        "Budget and scope qualified up front",
        "Project brief collected before the call",
        "Portfolio sent automatically on enquiry",
      ],
    },
    {
      key: "solar",
      label: "Solar",
      pain: "Screen roof type and bill size automatically.",
      outcome:
        "Half of solar enquiries can't actually be served — wrong roof, rented home, tiny bill. The AI finds that out in four messages and books site surveys only for the ones that qualify.",
      bullets: [
        "Monthly bill and roof type captured",
        "System size estimated in chat",
        "Free site survey booked automatically",
      ],
    },
    {
      key: "brokers",
      label: "Brokers",
      pain: "Every site-visit request answered in seconds.",
      outcome:
        "Property buyers enquire on five listings at once. The first agent to reply gets the viewing — so yours replies in seconds, day or night, with the details already attached.",
      bullets: [
        "Instant reply on every listing enquiry",
        "Requirement and budget captured first",
        "Site visits booked around your day",
      ],
    },
    {
      key: "cas",
      label: "CAs",
      pain: "Filing-season enquiries handled without hiring.",
      outcome:
        "For eight weeks a year your phone is unusable. The AI handles document checklists, deadline questions and fee-range enquiries, and routes only real engagements to you.",
      bullets: [
        "Repetitive filing questions auto-answered",
        "Document checklists sent instantly",
        "Consultations booked into free slots",
      ],
    },
  ],
  cards: [
    { key: "clinics", label: "Clinic", blurb: "Book patients, not callbacks" },
    { key: "gyms", label: "Gym", blurb: "Trials booked in minutes" },
    { key: "interiors", label: "Interiors", blurb: "Qualified briefs only" },
    { key: "solar", label: "Solar", blurb: "Surveys that convert" },
    { key: "brokers", label: "Broker", blurb: "First to reply, every time" },
    { key: "cas", label: "CA", blurb: "Filing season, handled" },
  ],
} as const;

export const results = {
  id: "results",
  eyebrow: "Results",
  heading: [
    { text: "Built to deliver " },
    { text: "numbers like these", italic: true },
    { text: "." },
  ] satisfies Heading,
  stats: [
    {
      value: "<60s",
      label: "response to every missed call",
      detail: "Day, night, Sunday, festival — the reply goes out the same way every time.",
    },
    {
      value: "60–80%",
      label: "of support tickets auto-resolved",
      detail: "Timings, pricing bands, directions and availability handled before a human sees them.",
    },
    {
      value: "24/7",
      label: "lead capture, including Sundays",
      detail: "The hours you're closed are the hours your competitors are closed too.",
    },
  ],
  disclaimer:
    "Pilot results published soon — we'd rather show you real numbers than borrowed ones.",
  testimonials: [
    {
      quote:
        "We stopped hearing 'I called yesterday and nobody picked up.' That sentence used to cost us three patients a week.",
      name: "Pilot client",
      role: "Dental clinic, Guwahati",
      from: "#2563EB",
      to: "#8B5CF6",
    },
    {
      quote:
        "Enquiries at 11pm now get an answer at 11pm. We book the site survey before the customer has finished comparing quotes.",
      name: "Pilot client",
      role: "Solar installer, Assam",
      from: "#F97316",
      to: "#EC4899",
    },
  ],
} as const;

export const quote = {
  id: "quote",
  eyebrow: "Get a quote",
  heading: [
    { text: "Pricing? Glad you asked. Built around " },
    { text: "your business", italic: true },
    { text: ", not a template." },
  ] satisfies Heading,
  body: "Every business leaks leads differently. Tell us what's broken and we'll send a custom quote within 24 hours. No upfront fees, no lock-in, no hidden costs.",
  packages: [
    {
      key: "launch",
      name: "Launch",
      tagline: "Go digital, stop the leaks.",
      featured: false,
      features: [
        "Website + booking page",
        "AI missed-call receptionist",
        "WhatsApp Business setup",
        "Google Business profile tune-up",
      ],
      cta: "Request a Quote",
    },
    {
      key: "grow",
      name: "Grow",
      tagline: "Fill the funnel you just sealed.",
      featured: true,
      badge: "Most Popular",
      features: [
        "Everything in Launch",
        "Google & Meta ads management",
        "Reviews & reputation engine",
        "Click-to-booking tracking",
      ],
      cta: "Request a Quote",
    },
    {
      key: "scale",
      name: "Scale",
      tagline: "Let the system run the front desk.",
      featured: false,
      features: [
        "Everything in Grow",
        "WhatsApp CRM & automation",
        "AI lead qualifier",
        "AI support desk",
      ],
      cta: "Request a Quote",
    },
  ],
  footnote: "Every engagement starts with a free lead-leak audit.",
  dialog: {
    title: "Request a quote",
    description:
      "Tell us what's leaking. We'll send a custom quote within 24 hours — this opens WhatsApp with your details filled in.",
    fields: {
      name: "Your name",
      business: "Business type",
      phone: "Phone / WhatsApp",
      packageInterest: "Package interest",
      message: "What's broken right now?",
    },
    placeholders: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      message: "We miss about 20 calls a week and never call them back…",
    },
    businessOptions: [
      "Clinic / Dental",
      "Gym",
      "Interior Design",
      "Solar",
      "Real Estate Broker",
      "Chartered Accountant",
      "Something else",
    ],
    submit: "Send on WhatsApp",
    errors: {
      name: "Please enter your name.",
      business: "Please choose a business type.",
      phone: "Please enter a valid phone number.",
    },
  },
} as const;

export const founderMemo = {
  id: "founder-memo",
  eyebrow: "Team memo",
  paragraphs: [
    "I kept noticing the same thing about the businesses I admired most. The dentist whose patients drive across the city for her. The solar guy who actually returns to fix what he installed. Brilliant at the work, and quietly losing customers every single week.",
    "Not to better competitors. To a phone that rang while they were busy being good at their job. A form nobody checked. A WhatsApp message seen at midnight and forgotten by morning. The craft was never the problem — the follow-up was.",
    "So fizaki exists to handle the boring part. The AI answers, asks the obvious questions, offers a slot, and steps aside the moment a real conversation is needed. You keep doing the thing you're actually great at, and nothing slips through while you do it.",
  ],
  signature: "",
  role: "Team, fizaki",
} as const;

export const faq = {
  id: "faq",
  eyebrow: "FAQ",
  heading: [
    { text: "Questions people ask " },
    { text: "before saying yes", italic: true },
    { text: "." },
  ] satisfies Heading,
  items: [
    {
      q: "How fast can you set this up?",
      a: "About two weeks from the audit to going live. The audit itself takes 20 minutes and costs nothing. Most of the two weeks is us configuring flows around how your business actually works, not you filling in forms.",
    },
    {
      q: "Do I need to change my phone number?",
      a: "No. Your existing number stays exactly as it is — we set up call forwarding so that when a call goes unanswered, the system picks up the thread on WhatsApp. Nothing changes for the customers who already have your number saved.",
    },
    {
      q: "Will the AI sound robotic?",
      a: "It's scoped deliberately narrowly: fresh inbound enquiries and frequently asked questions. It doesn't improvise about medical advice or pricing it hasn't been given. A human on your team can take over mid-chat at any point, and the handoff is invisible to the customer.",
    },
    {
      q: "What if I already run ads?",
      a: "We plug into your existing Google and Meta accounts rather than rebuilding them. You keep ownership of the accounts, the data and the history — if we ever part ways, none of it leaves with us.",
    },
    {
      q: "Is there a contract?",
      a: "Monthly rolling to start. We'd rather earn the next month than lock you into twelve of them. If the system isn't paying for itself, you shouldn't be tied to it.",
    },
    {
      q: "What if I don't use WhatsApp for business?",
      a: "We set up and verify the WhatsApp Business API for you, including the display name and green-tick application where you qualify. If you're currently running things off a personal WhatsApp, this is usually the single biggest upgrade of the whole project.",
    },
  ],
} as const;

export const finalCta = {
  id: "book",
  heading: "Stop losing leads this week.",
  subline:
    "Book a free 20-minute lead-leak audit — we'll show you exactly how many leads you lost last month, and what they were worth.",
  primaryCta: "Book My Free Audit",
  secondaryCta: "WhatsApp Us",
  robotBubble: "Answered in 9s",
} as const;

export const footer = {
  tagline: site.tagline,
  links: [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Industries", href: "#industries" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "#quote" },
    { label: "FAQ", href: "#faq" },
  ],
  note: "Built for Indian local businesses. With much love from India.",
  rights: "All rights reserved, 2026",
} as const;

export const fab = {
  label: "Chat with us on WhatsApp",
  tooltip: "Chat with us",
  message:
    "Hi _fizaki_ — I'd like to know more about the AI lead system for my business.",
} as const;

/** Pre-filled WhatsApp copy for the CTAs that don't go through the quote dialog. */
export const whatsappMessages = {
  audit:
    "Hi _fizaki_ — I'd like to book a free 20-minute lead-leak audit for my business.",
  demo: "Hi _fizaki_ — I'd like to see the 60-second missed-call demo.",
  general: fab.message,
} as const;
