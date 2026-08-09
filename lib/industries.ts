/**
 * Every industry vertical page is rendered by one template from this one file.
 * Build the template once, fill the data six times. No copy is hardcoded in a
 * component — strings, colours, icon names and scripts all live here.
 *
 * Icon fields hold Lucide names in PascalCase (e.g. "PhoneMissed"), resolved to
 * components by the industry icon registry in components/ui/icon-badge.
 */

export type Industry = {
  slug: string;
  name: string; // "Clinics & Dental"
  shortName: string; // "clinic"
  navLabel: string;
  accent: string; // hex, primary
  accentAlt: string; // hex, secondary
  skyTint: string; // hex used to tint the hero sky
  glyph: string; // Lucide icon name for the switcher
  meta: { title: string; description: string };
  eyebrow: string;
  h1: { lead: string; emphasis: string }; // emphasis renders in italic serif
  sub: string;
  chips: [string, string, string];
  leaks: { time: string; title: string; body: string }[]; // exactly 4
  calculator: {
    heading: string;
    inputALabel: string;
    inputADefault: number;
    inputAMax: number;
    inputBLabel: string;
    inputBDefault: number;
    inputBMax: number;
    resultPrefix: string;
    resultSuffix: string;
    footnote: string;
    // Result = inputA * inputB * multiplier. Kept in data so the template stays
    // pure — the rupee/hours split differs per vertical.
    multiplier: number;
    unit: "inr" | "hours";
  };
  installs: { icon: string; title: string; body: string }[]; // exactly 6
  script: {
    heading: string;
    contactName: string;
    turns: { from: "lead" | "ai"; text: string; delay: number }[];
    outcome: string;
  };
  day: { time: string; event: string }[]; // exactly 5
  integrations: string[]; // exactly 5
  stats: { value: string; label: string }[]; // exactly 3
  faqs: { q: string; a: string }[]; // exactly 4
  testimonial: { quote: string; name: string; role: string };
  cta: { heading: string; emphasis: string; sub: string };
};

export const INDUSTRIES: Industry[] = [
  // ─────────────────────────────────────────────────────────── Clinics & Dental
  {
    slug: "clinics-dental",
    name: "Clinics & Dental",
    shortName: "clinic",
    navLabel: "Clinics & Dental",
    accent: "#06B6D4",
    accentAlt: "#2563EB",
    skyTint: "#0E7490",
    glyph: "Stethoscope",
    meta: {
      title:
        "AI Receptionist & Booking for Clinics and Dental Practices | fizaki",
      description:
        "Every missed patient call answered on WhatsApp in under 60 seconds, with booking, reminders and recalls. Built for Indian clinics and dental practices.",
    },
    eyebrow: "FOR CLINICS & DENTAL PRACTICES",
    h1: {
      lead: "Your receptionist is with a patient.",
      emphasis: "Your next patient just called someone else.",
    },
    sub: "fizaki answers every missed call, sends the patient a WhatsApp booking link within 60 seconds, and fills the chair — while you're still finishing the root canal.",
    chips: [
      "Keeps your existing number",
      "Nothing new for your front desk to learn",
      "Live in about 2 weeks",
    ],
    leaks: [
      {
        time: "9:40 AM",
        title: "The chairside blackout",
        body: "Your front desk is assisting you, gloved and inside someone's mouth. The phone rings out. That caller does not call back — they call the clinic two blocks away.",
      },
      {
        time: "2:15 PM",
        title: "The lunch-hour gap",
        body: "Working patients call precisely when your staff is on break. Ninety minutes of silence, every single day, is where your highest-intent enquiries land.",
      },
      {
        time: "8:50 PM",
        title: "After-hours pain",
        body: "Toothache does not respect clinic timings. Evening and Sunday callers get a dead line, then find an emergency dentist on Google.",
      },
      {
        time: "Every week",
        title: "No-shows and forgotten recalls",
        body: "No reminder means empty chairs. No six-month recall means a cleaning patient you already earned quietly becomes someone else's.",
      },
    ],
    calculator: {
      heading: "What is a ringing phone actually costing you?",
      inputALabel: "Calls you miss in a week",
      inputADefault: 18,
      inputAMax: 60,
      inputBLabel: "Average value of one treatment",
      inputBDefault: 4500,
      inputBMax: 50000,
      resultPrefix: "You're leaving roughly ",
      resultSuffix: " on the table every month.",
      footnote:
        "Assumes a conservative 30% of missed callers would have booked. Most clinics we audit are worse.",
      multiplier: 1.3, // weekly → monthly (×4.33) × 30% booked
      unit: "inr",
    },
    installs: [
      {
        icon: "PhoneMissed",
        title: "AI Missed-Call Receptionist",
        body: "Every unanswered call gets a WhatsApp reply with a booking link in under 60 seconds.",
      },
      {
        icon: "CalendarCheck",
        title: "WhatsApp Appointment Booking",
        body: "Patients pick a real open slot themselves. It lands in your calendar, no call-back needed.",
      },
      {
        icon: "BellRing",
        title: "No-Show Reminder Sequence",
        body: "Automatic nudges 24 hours and 2 hours before. Empty chairs drop sharply.",
      },
      {
        icon: "RefreshCw",
        title: "Six-Month Recall Engine",
        body: "Cleaning and check-up recalls go out on their own, forever, to every past patient.",
      },
      {
        icon: "Star",
        title: "Google Review Engine",
        body: "A review request goes out the moment a treatment is marked complete.",
      },
      {
        icon: "Target",
        title: "High-Value Treatment Ads",
        body: "Targeted local campaigns for implants, aligners and RCT — tracked to the booked appointment.",
      },
    ],
    script: {
      heading: "A missed call at 9:47 PM, handled without you.",
      contactName: "Dr. Mehta Dental · fizaki",
      outcome: "Appointment booked · Thu 11:30 AM · Dr. Mehta",
      turns: [
        {
          from: "ai",
          text: "Hi! This is Dr. Mehta Dental. Sorry we missed your call just now — the clinic is closed for the evening. Can I help you here on WhatsApp?",
          delay: 0,
        },
        {
          from: "lead",
          text: "yes my molar is paining badly since morning",
          delay: 1400,
        },
        {
          from: "ai",
          text: "That sounds painful, I'm sorry. Is the pain constant, or only when you bite or drink something cold?",
          delay: 1200,
        },
        {
          from: "lead",
          text: "constant, and the gum is swollen",
          delay: 1300,
        },
        {
          from: "ai",
          text: "Understood — that usually needs to be seen quickly. Dr. Mehta has an emergency slot tomorrow at 11:30 AM and another at 4:15 PM. Which suits you?",
          delay: 1500,
        },
        { from: "lead", text: "11:30 works", delay: 900 },
        {
          from: "ai",
          text: "Booked. You'll get a reminder tomorrow morning. Address: 2nd Floor, Sona Complex, Indiranagar. Until then, a cold compress on the outside of the cheek helps. See you at 11:30.",
          delay: 1400,
        },
      ],
    },
    day: [
      {
        time: "8:12 AM",
        event:
          "Three overnight callers already have appointments in today's calendar.",
      },
      {
        time: "1:30 PM",
        event:
          "Lunch-hour enquiry qualified and booked while the front desk eats.",
      },
      {
        time: "4:05 PM",
        event: "Tomorrow's patients get their 24-hour reminders automatically.",
      },
      {
        time: "7:45 PM",
        event: "A completed implant patient receives a Google review request.",
      },
      {
        time: "Sunday 11:00 AM",
        event:
          "An emergency caller is triaged and slotted into Monday's first opening.",
      },
    ],
    integrations: [
      "Your existing landline or mobile",
      "Google Calendar",
      "Google Business Profile",
      "Practo",
      "Any clinic management software with export",
    ],
    stats: [
      { value: "<60s", label: "reply to every missed patient call" },
      { value: "24/7", label: "including Sundays and after clinic hours" },
      { value: "60–80%", label: "of routine patient questions answered without staff" },
    ],
    faqs: [
      {
        q: "Will patients realise they are talking to an AI?",
        a: "It introduces itself as your clinic and stays strictly within scheduling, directions, timings and basic triage. It never gives clinical advice. Your staff can take over any chat mid-conversation with one tap.",
      },
      {
        q: "Is patient information safe?",
        a: "Conversations run on WhatsApp Business API with data stored in India. We collect only name, phone, reason for visit and preferred slot — nothing clinical, and nothing you don't already write in a register.",
      },
      {
        q: "We already use Practo. Does this replace it?",
        a: "No. Practo brings you some patients; fizaki makes sure the ones who call you directly, at any hour, actually get booked. The two run side by side.",
      },
      {
        q: "Our front desk is worried about being replaced.",
        a: "Nobody gets replaced. The AI handles the calls your team physically cannot pick up — the ones currently going to voicemail. Your staff spend their time with the patients in front of them.",
      },
    ],
    testimonial: {
      quote:
        "We were losing four or five callers a day and had no idea. The number that changed fastest was Sunday bookings.",
      name: "Dr. A. Mehta",
      role: "Dental Surgeon, Bengaluru",
    },
    cta: {
      heading: "Fill the chair you're losing",
      emphasis: "every single afternoon.",
      sub: "Book a free 20-minute audit. We'll pull your call logs and show you exactly how many patients rang out last month.",
    },
  },

  // ───────────────────────────────────────────────────────── Gyms & Fitness
  {
    slug: "gyms",
    name: "Gyms & Fitness Studios",
    shortName: "gym",
    navLabel: "Gyms",
    accent: "#F97316",
    accentAlt: "#EC4899",
    skyTint: "#C2410C",
    glyph: "Dumbbell",
    meta: {
      title: "Instant Lead Response & Trial Booking for Gyms | fizaki",
      description:
        "Reply to every trial enquiry in seconds, book the trial, make sure they show up, and win back lapsed members. Built for Indian gyms and fitness studios.",
    },
    eyebrow: "FOR GYMS & FITNESS STUDIOS",
    h1: {
      lead: "A trial enquiry has a shelf life of",
      emphasis: "about ten minutes.",
    },
    sub: "fizaki replies the second someone asks, books the free trial, reminds them to actually turn up, and chases the ones who ghost — so your floor stays full.",
    chips: [
      "Instagram DMs, calls and walk-in forms in one place",
      "Your trainers stay on the floor",
      "Live in about 2 weeks",
    ],
    leaks: [
      {
        time: "11:20 PM",
        title: "The midnight motivation window",
        body: "People decide to join a gym at night, alone, scrolling. Your Instagram DM sits unread until 10 AM, by which time the feeling has passed.",
      },
      {
        time: "6:30 PM",
        title: "Peak-hour blindness",
        body: "Your busiest floor hours are your busiest enquiry hours. Trainers are spotting, not answering, and nobody is manning the phone.",
      },
      {
        time: "Trial day",
        title: "The no-show",
        body: "Roughly half of booked free trials never walk in. Without a reminder and a nudge, a booked trial is just a hopeful entry in a notebook.",
      },
      {
        time: "Month 4",
        title: "Silent lapse",
        body: "A member stops coming. Nobody notices for six weeks. By then they've already joined the studio near their new office.",
      },
    ],
    calculator: {
      heading: "What are unanswered enquiries costing your floor?",
      inputALabel: "Trial enquiries you get in a month",
      inputADefault: 60,
      inputAMax: 300,
      inputBLabel: "Value of one annual membership",
      inputBDefault: 18000,
      inputBMax: 120000,
      resultPrefix: "Slow replies are costing you around ",
      resultSuffix: " a month.",
      footnote:
        "Assumes a 22% swing in conversion between a reply in minutes and a reply the next day.",
      multiplier: 0.22,
      unit: "inr",
    },
    installs: [
      {
        icon: "MessageCircle",
        title: "Instant Enquiry Responder",
        body: "Instagram DMs, missed calls and form fills all get a reply within seconds, day or night.",
      },
      {
        icon: "CalendarCheck",
        title: "Free Trial Booking",
        body: "The lead picks a trial slot and a trainer without a single phone call.",
      },
      {
        icon: "BellRing",
        title: "Show-Up Reminder Sequence",
        body: "A nudge the evening before and the morning of. Trial attendance climbs immediately.",
      },
      {
        icon: "TrendingUp",
        title: "Post-Trial Conversion Flow",
        body: "An automatic follow-up two hours after the trial, while the endorphins are still working.",
      },
      {
        icon: "RotateCcw",
        title: "Lapsed Member Win-Back",
        body: "Members who stop scanning in get a personal-feeling message before they're gone for good.",
      },
      {
        icon: "Share2",
        title: "Referral & Review Engine",
        body: "Happy members are asked for a Google review and a friend's number at the right moment.",
      },
    ],
    script: {
      heading: "An Instagram DM at 11:41 PM, converted before breakfast.",
      contactName: "Iron Yard Fitness · fizaki",
      outcome: "Free trial booked · Sat 7:00 AM · Coach Rahul",
      turns: [
        { from: "lead", text: "hi is there any trial session?", delay: 0 },
        {
          from: "ai",
          text: "Hey! Yes — a free 1-day trial, no card needed. Are you looking at general fitness, weight loss, or strength training?",
          delay: 1100,
        },
        { from: "lead", text: "weight loss mainly", delay: 1200 },
        {
          from: "ai",
          text: "Perfect, that's our most popular track. What time usually works for you — early morning, evening after work, or weekend?",
          delay: 1200,
        },
        { from: "lead", text: "weekend morning", delay: 1000 },
        {
          from: "ai",
          text: "Saturday 7:00 AM with Coach Rahul, or Sunday 8:30 AM with Coach Neha. Which one?",
          delay: 1300,
        },
        { from: "lead", text: "saturday 7", delay: 800 },
        {
          from: "ai",
          text: "Locked in. Bring a towel and a water bottle, we've got the rest. I'll remind you Friday evening. Location pin coming through now — see you Saturday!",
          delay: 1400,
        },
      ],
    },
    day: [
      {
        time: "7:05 AM",
        event: "Two overnight DMs already have Saturday trial slots.",
      },
      {
        time: "12:40 PM",
        event: "A lapsed member from March gets a win-back message and replies.",
      },
      {
        time: "6:30 PM",
        event:
          "Peak-hour walk-in enquiry captured while every trainer is on the floor.",
      },
      { time: "9:15 PM", event: "Tomorrow's trial attendees get their reminder." },
      {
        time: "Sunday 8:00 PM",
        event: "Weekend joiners are asked for a Google review.",
      },
    ],
    integrations: [
      "Instagram & Facebook DMs",
      "Google Business Profile",
      "Google Calendar",
      "Your existing gym management software",
      "Razorpay payment links",
    ],
    stats: [
      { value: "<60s", label: "reply to every DM, call and form" },
      { value: "2×", label: "typical lift in trial show-up rate" },
      { value: "24/7", label: "capture, including the 11 PM scroll" },
    ],
    faqs: [
      {
        q: "Will it reply to Instagram DMs too?",
        a: "Yes. Instagram DMs, Facebook messages, missed calls and website form fills all funnel into the same WhatsApp-based flow, so nothing sits unread overnight.",
      },
      {
        q: "Can it handle questions about pricing?",
        a: "It shares whatever you tell it to share — and for anything sensitive it books a call with you instead of quoting. You control exactly what it can and cannot say.",
      },
      {
        q: "We already have a CRM.",
        a: "Good. We push every qualified lead into it with the trial slot, source and full conversation attached, so your existing process doesn't change.",
      },
      {
        q: "What about walk-ins who never message us?",
        a: "We add a QR code at your desk that opens a pre-filled WhatsApp chat. The walk-in enters your follow-up system before they leave the building.",
      },
    ],
    testimonial: {
      quote:
        "The win-back messages alone paid for the whole thing in the first month. We had no idea how many people had just drifted off.",
      name: "K. Suresh",
      role: "Owner, Iron Yard Fitness, Hyderabad",
    },
    cta: {
      heading: "Stop losing the people who",
      emphasis: "already decided to join.",
      sub: "Book a free 20-minute audit. We'll count the enquiries that went unanswered last month and what they were worth.",
    },
  },

  // ─────────────────────────────────────────────────────── Interior Designers
  {
    slug: "interior-designers",
    name: "Interior Designers",
    shortName: "studio",
    navLabel: "Interior Designers",
    accent: "#8B5CF6",
    accentAlt: "#EC4899",
    skyTint: "#6D28D9",
    glyph: "Sofa",
    meta: {
      title: "AI Lead Qualification for Interior Design Studios | fizaki",
      description:
        "Qualify budget, property size, city and timeline before the call reaches you. Built for Indian interior design studios and turnkey contractors.",
    },
    eyebrow: "FOR INTERIOR DESIGN STUDIOS",
    h1: {
      lead: "You just spent an hour on a call with someone whose budget was",
      emphasis: "a tenth of your minimum.",
    },
    sub: "fizaki qualifies budget, property size, possession date and city before anything reaches your calendar — so you only have conversations worth having.",
    chips: [
      "Filters out tyre-kickers automatically",
      "Sends your portfolio instantly",
      "Live in about 2 weeks",
    ],
    leaks: [
      {
        time: "Every week",
        title: "The unqualified hour",
        body: "A polite, enthusiastic enquiry turns out to want a full 3BHK done for the price of a wardrobe. You've already lost ninety minutes and a site visit.",
      },
      {
        time: "2 hours in",
        title: "The portfolio delay",
        body: "By the time someone manually sends the deck, the client has already seen three other studios' work and mentally shortlisted them.",
      },
      {
        time: "Day 3",
        title: "The quote black hole",
        body: "You send a detailed quote. Silence. Nobody follows up because following up feels desperate, so a warm lead goes cold on its own.",
      },
      {
        time: "Always",
        title: "The invisible pipeline",
        body: "Leads live in a WhatsApp scroll, a notebook and someone's memory. You cannot see who is close and who is gone.",
      },
    ],
    calculator: {
      heading: "What is unqualified work costing your studio?",
      inputALabel: "Enquiry calls you take in a month",
      inputADefault: 25,
      inputAMax: 120,
      inputBLabel: "Hours you lose on each unqualified one",
      inputBDefault: 3,
      inputBMax: 12,
      resultPrefix: "You're burning about ",
      resultSuffix: " of billable design time every month.",
      footnote:
        "Assumes 55% of raw enquiries fall below your minimum project size. Shown in hours, not rupees.",
      multiplier: 0.55,
      unit: "hours",
    },
    installs: [
      {
        icon: "Filter",
        title: "AI Budget & Scope Qualifier",
        body: "Budget band, carpet area, possession date and city captured before you ever pick up.",
      },
      {
        icon: "Images",
        title: "Instant Portfolio Delivery",
        body: "The right project gallery goes out within seconds of an enquiry, matched to their property type.",
      },
      {
        icon: "CalendarCheck",
        title: "Consultation Booking",
        body: "Only qualified leads see your calendar. Everyone else gets a polite, useful redirect.",
      },
      {
        icon: "FileText",
        title: "Quote Follow-Up Sequence",
        body: "Three well-spaced, non-pushy nudges after every quote. This alone recovers deals you'd written off.",
      },
      {
        icon: "Kanban",
        title: "Visible Lead Pipeline",
        body: "Every enquiry with its budget, stage and last contact, in one board you can actually read.",
      },
      {
        icon: "Star",
        title: "Reviews & Referral Engine",
        body: "Handover-day review requests, plus a referral ask when the client is happiest.",
      },
    ],
    script: {
      heading: "An enquiry qualified in four minutes, without you.",
      contactName: "Studio Verge Interiors · fizaki",
      outcome: "Consultation booked · Qualified · 3BHK, ₹18L+ band",
      turns: [
        {
          from: "lead",
          text: "Hi, saw your work on Instagram. Interested in getting my flat done.",
          delay: 0,
        },
        {
          from: "ai",
          text: "Thank you! Lovely to hear. Is it a new possession or a renovation, and how many bedrooms?",
          delay: 1200,
        },
        {
          from: "lead",
          text: "new flat, 3bhk in Kharadi, possession next month",
          delay: 1400,
        },
        {
          from: "ai",
          text: "Congratulations. For a 3BHK turnkey in Pune our projects typically start in the ₹15–18 lakh range and go up depending on finishes. Does that sit within what you had in mind?",
          delay: 1600,
        },
        { from: "lead", text: "yes we budgeted around 20L", delay: 1100 },
        {
          from: "ai",
          text: "Perfect fit. Sending you three recent 3BHK Kharadi projects now so you can see the style. Would Thursday 6 PM or Saturday 11 AM suit for a call with our principal designer?",
          delay: 1500,
        },
        { from: "lead", text: "saturday 11", delay: 800 },
        {
          from: "ai",
          text: "Booked for Saturday 11 AM. You'll get the gallery link in a moment and a reminder Friday. Looking forward to it.",
          delay: 1300,
        },
      ],
    },
    day: [
      {
        time: "9:20 AM",
        event: "Overnight Instagram enquiry qualified and portfolio sent.",
      },
      {
        time: "11:00 AM",
        event:
          "A below-minimum lead is politely redirected without costing you a call.",
      },
      {
        time: "3:30 PM",
        event: "Day-3 nudge goes out on last week's quote; client replies.",
      },
      {
        time: "6:00 PM",
        event:
          "Only pre-qualified consultations appear on tomorrow's calendar.",
      },
      {
        time: "Friday 5:00 PM",
        event:
          "A handover client is asked for a Google review and a referral.",
      },
    ],
    integrations: [
      "Instagram & Facebook",
      "Google Calendar",
      "Google Business Profile",
      "Houzz and Justdial enquiries",
      "Your existing spreadsheet or CRM",
    ],
    stats: [
      { value: "<60s", label: "portfolio in the client's hands" },
      {
        value: "55%",
        label: "of unqualified enquiries filtered before they reach you",
      },
      { value: "3×", label: "follow-ups on every quote, automatically" },
    ],
    faqs: [
      {
        q: "Won't asking about budget upfront scare people off?",
        a: "It's framed as a range, not an interrogation, and it happens after the AI has shown warmth and relevant work. Serious clients appreciate the honesty; the ones it loses were never going to sign.",
      },
      {
        q: "Our work is bespoke. Can an AI represent it?",
        a: "It never designs or quotes. It gathers facts, sends your actual portfolio and books the call. Every creative conversation stays with you.",
      },
      {
        q: "Can it send different portfolios for different property types?",
        a: "Yes. We map galleries to property type, city and budget band, so a 2BHK renovation lead and a villa lead see completely different work.",
      },
      {
        q: "What if a big lead gets filtered out by mistake?",
        a: "Nothing is deleted. Every conversation lands in your pipeline with a flag, and you can jump into any chat and take over instantly.",
      },
    ],
    testimonial: {
      quote:
        "I stopped doing free consultations for people who were never going to hire us. That's the whole product, honestly.",
      name: "R. Iyer",
      role: "Principal Designer, Pune",
    },
    cta: {
      heading: "Protect your calendar from",
      emphasis: "conversations that go nowhere.",
      sub: "Book a free 20-minute audit. We'll review last month's enquiries and show you how many were never a fit.",
    },
  },

  // ─────────────────────────────────────────────────────────── Solar Installers
  {
    slug: "solar",
    name: "Solar Installers",
    shortName: "solar business",
    navLabel: "Solar",
    accent: "#F59E0B",
    accentAlt: "#22C55E",
    skyTint: "#B45309",
    glyph: "Sun",
    meta: {
      title:
        "Lead Qualification & Site Survey Booking for Solar Installers | fizaki",
      description:
        "Screen roof ownership, bill size and city before your team drives anywhere. Built for Indian rooftop solar installers and EPC companies.",
    },
    eyebrow: "FOR ROOFTOP SOLAR INSTALLERS",
    h1: {
      lead: "Half your enquiries live in",
      emphasis: "a rented flat with no roof.",
    },
    sub: "fizaki checks roof ownership, monthly bill and location before your team drives anywhere — so every site survey on the calendar is a real one.",
    chips: [
      "Screens tenants and tiny bills automatically",
      "Answers subsidy questions on its own",
      "Live in about 2 weeks",
    ],
    leaks: [
      {
        time: "Day 1",
        title: "The impossible lead",
        body: "An enthusiastic caller in a rented second-floor flat with a shared terrace. Your surveyor drives forty kilometres to find that out.",
      },
      {
        time: "Hour 1",
        title: "The comparison window",
        body: "Solar buyers enquire with four companies in one sitting. The one who replies first frames the entire decision.",
      },
      {
        time: "Survey day",
        title: "The empty rooftop",
        body: "No reminder, no confirmation, and your two-person survey team spends a morning outside a locked gate.",
      },
      {
        time: "Week 3",
        title: "The subsidy spiral",
        body: "Every lead asks the same eight questions about subsidy, net metering and payback. Your sales engineer answers them by hand, forever.",
      },
    ],
    calculator: {
      heading: "What are wasted site surveys costing you?",
      inputALabel: "Site surveys your team does in a month",
      inputADefault: 30,
      inputAMax: 150,
      inputBLabel: "Cost of sending a team on one survey",
      inputBDefault: 1200,
      inputBMax: 8000,
      resultPrefix: "Unqualified surveys are burning roughly ",
      resultSuffix: " a month in fuel and field time.",
      footnote:
        "Assumes 45% of surveys are for leads who could never have been installed. Most installers we audit are near 50%.",
      multiplier: 0.45,
      unit: "inr",
    },
    installs: [
      {
        icon: "Filter",
        title: "Roof & Bill Qualifier",
        body: "Ownership, roof type, shading, city and monthly bill captured before anyone is dispatched.",
      },
      {
        icon: "Calculator",
        title: "Instant System-Size Estimate",
        body: "The lead gets an indicative kW size and payback range on WhatsApp within a minute.",
      },
      {
        icon: "CalendarCheck",
        title: "Site Survey Scheduling",
        body: "Confirmed slots with a location pin, plus reminders the evening before and the morning of.",
      },
      {
        icon: "HelpCircle",
        title: "Subsidy & Net-Metering Auto-Answers",
        body: "The eight questions everybody asks, answered accurately and instantly, forever.",
      },
      {
        icon: "Clock",
        title: "Long-Cycle Nurture",
        body: "Solar decisions take weeks. A paced sequence keeps you present without anyone chasing.",
      },
      {
        icon: "Star",
        title: "Post-Installation Review Engine",
        body: "A review and referral request the week after commissioning, when delight peaks.",
      },
    ],
    script: {
      heading: "A lead qualified before anyone starts the car.",
      contactName: "Suryodaya Solar · fizaki",
      outcome:
        "Site survey booked · Sat 10 AM · Qualified: owned roof, ₹7,200 bill",
      turns: [
        { from: "lead", text: "want to know about solar for home", delay: 0 },
        {
          from: "ai",
          text: "Happy to help! Quick question first — is the roof yours, or is it a shared or rented terrace?",
          delay: 1200,
        },
        { from: "lead", text: "own house, independent terrace", delay: 1200 },
        {
          from: "ai",
          text: "Perfect, that's ideal. What's your average monthly electricity bill?",
          delay: 1100,
        },
        { from: "lead", text: "around 7000-7500", delay: 1000 },
        {
          from: "ai",
          text: "That points to roughly a 5 kW system. In your area that typically covers most of the bill and pays back in about four years, with the central subsidy applied. Which city or area is the house in?",
          delay: 1700,
        },
        { from: "lead", text: "Nashik, Gangapur road", delay: 900 },
        {
          from: "ai",
          text: "We install there regularly. Our engineer can do a free rooftop survey Saturday 10 AM or Sunday 4 PM — takes about thirty minutes. Which works?",
          delay: 1500,
        },
        { from: "lead", text: "saturday 10", delay: 800 },
        {
          from: "ai",
          text: "Booked. You'll get a confirmation with the engineer's name and a reminder Friday evening. Keep your last electricity bill handy — it makes the estimate exact.",
          delay: 1400,
        },
      ],
    },
    day: [
      {
        time: "8:30 AM",
        event:
          "Overnight leads sorted into qualified and not, before the team briefing.",
      },
      {
        time: "11:15 AM",
        event:
          "Three subsidy questions answered without your engineer touching the phone.",
      },
      {
        time: "2:00 PM",
        event: "A tenant enquiry is politely closed out, saving a wasted drive.",
      },
      {
        time: "7:00 PM",
        event: "Tomorrow's survey gets its reminder and location pin.",
      },
      {
        time: "Week 6",
        event: "A nurture message reaches a lead who went quiet; they book.",
      },
    ],
    integrations: [
      "Google Business Profile",
      "Google Calendar",
      "Meta and Google ad leads",
      "IndiaMART enquiries",
      "Your existing CRM or sheet",
    ],
    stats: [
      { value: "<60s", label: "reply with an indicative system size" },
      { value: "45%", label: "of pointless site surveys eliminated" },
      { value: "24/7", label: "subsidy and payback questions answered" },
    ],
    faqs: [
      {
        q: "Will it give wrong technical estimates?",
        a: "It gives an indicative range only, from a table you approve, and always says the survey confirms the final number. It never commits you to a design or a price.",
      },
      {
        q: "Subsidy rules keep changing.",
        a: "The subsidy answers live in one content file we update for you. Change it once and every future conversation is correct.",
      },
      {
        q: "Can it handle commercial and industrial enquiries too?",
        a: "Yes. It branches on connection type and routes C&I leads straight to a human with the load details already captured.",
      },
      {
        q: "Most of our leads come from IndiaMART.",
        a: "We connect that feed directly, so IndiaMART enquiries get a WhatsApp reply within seconds instead of a callback the next day.",
      },
    ],
    testimonial: {
      quote:
        "We cut our survey count by nearly half and closed more systems. Every survey is a real roof now.",
      name: "P. Deshmukh",
      role: "Director, Suryodaya Solar, Nashik",
    },
    cta: {
      heading: "Stop driving out to roofs",
      emphasis: "that were never yours to install.",
      sub: "Book a free 20-minute audit. We'll look at last month's surveys and show you how many were avoidable.",
    },
  },

  // ────────────────────────────────────────────────────── Real Estate Brokers
  {
    slug: "brokers",
    name: "Real Estate Brokers",
    shortName: "brokerage",
    navLabel: "Brokers",
    accent: "#2563EB",
    accentAlt: "#06B6D4",
    skyTint: "#1D4ED8",
    glyph: "KeyRound",
    meta: {
      title:
        "Instant Portal Lead Response & Site Visit Booking for Brokers | fizaki",
      description:
        "Answer 99acres, Housing and MagicBricks leads in seconds, qualify budget and configuration, and book the site visit. Built for Indian real estate brokers.",
    },
    eyebrow: "FOR REAL ESTATE BROKERS",
    h1: {
      lead: "The buyer who called during your site visit",
      emphasis: "called three other brokers too.",
    },
    sub: "fizaki answers instantly, captures budget, configuration and possession timeline, and puts the site visit in your calendar before your competitor picks up.",
    chips: [
      "Answers portal leads in seconds",
      "Sends matching listings automatically",
      "Live in about 2 weeks",
    ],
    leaks: [
      {
        time: "Minute 1",
        title: "The four-broker race",
        body: "A portal lead is sold to several brokers simultaneously. Whoever replies first usually owns the buyer. Right now that is rarely you.",
      },
      {
        time: "During a visit",
        title: "The unreachable hour",
        body: "You are inside a flat with one client while three others try to reach you. Every one of them moves on.",
      },
      {
        time: "Saturday",
        title: "The mismatched walkthrough",
        body: "You block a full afternoon for a buyer whose budget, configuration or possession need never matched the property.",
      },
      {
        time: "Day 4",
        title: "The post-visit silence",
        body: "They saw it, they liked it, nobody followed up in a structured way, and the deal quietly evaporated.",
      },
    ],
    calculator: {
      heading: "What is a slow first reply costing you?",
      inputALabel: "Portal leads you receive in a month",
      inputADefault: 80,
      inputAMax: 400,
      inputBLabel: "Your average brokerage on one closing",
      inputBDefault: 150000,
      inputBMax: 1500000,
      resultPrefix: "Being second to reply is costing you around ",
      resultSuffix: " a month.",
      footnote:
        "Assumes one additional closing per month from first-responder advantage. Conservative for most brokerages.",
      multiplier: 0.0125, // ~one extra closing per 80 leads
      unit: "inr",
    },
    installs: [
      {
        icon: "Zap",
        title: "Instant Portal Lead Responder",
        body: "99acres, Housing, MagicBricks and website leads answered within seconds of arriving.",
      },
      {
        icon: "Filter",
        title: "Budget & Configuration Qualifier",
        body: "Budget band, BHK, locality, possession timeline and loan status captured up front.",
      },
      {
        icon: "Home",
        title: "Automatic Listing Match",
        body: "Two or three genuinely matching properties sent on WhatsApp with photos and a location pin.",
      },
      {
        icon: "CalendarCheck",
        title: "Site Visit Scheduler",
        body: "Confirmed slots, address pin, and reminders that dramatically cut no-shows.",
      },
      {
        icon: "MessageSquare",
        title: "Post-Visit Follow-Up Sequence",
        body: "Structured, well-timed follow-ups after every visit instead of a hopeful WhatsApp forward.",
      },
      {
        icon: "Star",
        title: "Reviews & Referral Engine",
        body: "A Google review request after registration, when the buyer is happiest.",
      },
    ],
    script: {
      heading: "A 99acres lead, answered in eleven seconds.",
      contactName: "Skyline Realty · fizaki",
      outcome: "Site visit booked · Sun 11 AM · 3BHK, Whitefield",
      turns: [
        {
          from: "ai",
          text: "Hi Anand, this is Skyline Realty — you just enquired about the 3BHK in Whitefield. I can help right away. Are you looking to buy for yourself or as an investment?",
          delay: 0,
        },
        { from: "lead", text: "for own use, shifting in dec", delay: 1300 },
        {
          from: "ai",
          text: "Got it. What budget range are you working with, and is a home loan involved?",
          delay: 1200,
        },
        {
          from: "lead",
          text: "1.4 to 1.6 cr, yes loan, pre-approved",
          delay: 1400,
        },
        {
          from: "ai",
          text: "That's a strong position. Besides Whitefield, would you consider Varthur or Sarjapur Road at that budget? There are two ready-to-move options I can show you.",
          delay: 1600,
        },
        { from: "lead", text: "whitefield preferred but open", delay: 1000 },
        {
          from: "ai",
          text: "Sending you three options now — all ready possession, all in range. Our director is doing site visits Sunday. 11 AM or 3 PM?",
          delay: 1500,
        },
        { from: "lead", text: "11 am", delay: 700 },
        {
          from: "ai",
          text: "Confirmed for Sunday 11 AM. Location pin and the three listings are coming through now. Carry an ID for the society gate. See you Sunday.",
          delay: 1400,
        },
      ],
    },
    day: [
      {
        time: "10:02 AM",
        event:
          "A portal lead is answered and qualified while you're inside another flat.",
      },
      {
        time: "1:20 PM",
        event:
          "Three matching listings go out without you opening your laptop.",
      },
      {
        time: "4:45 PM",
        event: "A budget mismatch is caught before Saturday is wasted on it.",
      },
      {
        time: "8:00 PM",
        event: "Sunday's visitors get reminders and location pins.",
      },
      {
        time: "Tuesday",
        event: "A post-visit follow-up revives a buyer who had gone quiet.",
      },
    ],
    integrations: [
      "99acres, Housing.com, MagicBricks",
      "Google Calendar",
      "Google Business Profile",
      "Meta lead ads",
      "Your existing CRM or sheet",
    ],
    stats: [
      { value: "<15s", label: "reply to every portal lead" },
      { value: "24/7", label: "including during site visits and Sundays" },
      { value: "3×", label: "structured follow-ups after every visit" },
    ],
    faqs: [
      {
        q: "Portal leads come by email and SMS. Can you catch those?",
        a: "Yes. We connect the feed directly so the reply goes out in seconds, long before you've seen the notification.",
      },
      {
        q: "Buyers want to talk to a person, not a bot.",
        a: "They do — and they will, with you, at the site visit. The AI's only job is to hold the buyer's attention in the first critical minutes and get the meeting booked.",
      },
      {
        q: "Will it quote prices or negotiate?",
        a: "Never. It shares listed prices from your inventory only and routes every negotiation straight to you.",
      },
      {
        q: "I work alone. Is this overkill?",
        a: "Solo brokers benefit most. You are the one person who genuinely cannot answer the phone during a site visit, and this is exactly that gap.",
      },
    ],
    testimonial: {
      quote:
        "I used to see the portal lead two hours later. Now the buyer already has three listings and a Sunday slot.",
      name: "S. Anand",
      role: "Skyline Realty, Bengaluru",
    },
    cta: {
      heading: "Be the broker who",
      emphasis: "replied first.",
      sub: "Book a free 20-minute audit. We'll measure your current response time on portal leads and show you what it's costing.",
    },
  },

  // ─────────────────────────────────────────────────────── Chartered Accountants
  {
    slug: "chartered-accountants",
    name: "Chartered Accountants",
    shortName: "practice",
    navLabel: "CAs",
    accent: "#0F766E",
    accentAlt: "#22C55E",
    skyTint: "#115E59",
    glyph: "FileSpreadsheet",
    meta: {
      title: "AI Support Desk & Client Intake for Chartered Accountants | fizaki",
      description:
        "Answer repetitive filing questions, collect documents, screen enquiries and book consultations — without hiring for two months. Built for Indian CA practices.",
    },
    eyebrow: "FOR CHARTERED ACCOUNTANTS",
    h1: {
      lead: "In filing season your phone becomes",
      emphasis: "a denial-of-service attack.",
    },
    sub: "fizaki answers the repetitive questions, collects the documents, screens which enquiries deserve your time, and books the ones that do — without you hiring for two months.",
    chips: [
      "Handles the same forty questions forever",
      "Chases documents so you don't",
      "Live in about 2 weeks",
    ],
    leaks: [
      {
        time: "July",
        title: "The question avalanche",
        body: "The same forty questions about deadlines, documents, regimes and refunds, asked by three hundred people, answered by hand.",
      },
      {
        time: "Every file",
        title: "The document chase",
        body: "Four reminders for one Form 16. Multiply by every client and your team is a collections department, not a practice.",
      },
      {
        time: "Any month",
        title: "The wrong-fit enquiry",
        body: "A twenty-minute call to discover the enquiry is a single salaried return you were never going to take on profitably.",
      },
      {
        time: "Deadline week",
        title: "The reminder scramble",
        body: "Advance tax, GST, TDS — every deadline needs a broadcast, and someone has to remember to send it.",
      },
    ],
    calculator: {
      heading: "What is the repetition costing your practice?",
      inputALabel: "Client queries your team handles in a week",
      inputADefault: 120,
      inputAMax: 600,
      inputBLabel: "Minutes spent on an average query",
      inputBDefault: 6,
      inputBMax: 30,
      resultPrefix: "Your team is spending about ",
      resultSuffix: " a month on questions an AI can answer.",
      footnote:
        "Shown in hours. Assumes 70% of queries are repetitive and fully automatable.",
      multiplier: 0.0505, // 70% repetitive × 4.33 weeks ÷ 60 minutes
      unit: "hours",
    },
    installs: [
      {
        icon: "HelpCircle",
        title: "AI Support Desk",
        body: "Deadlines, document lists, regime comparisons and status questions answered instantly, correctly, at 11 PM.",
      },
      {
        icon: "FolderUp",
        title: "Document Collection Flow",
        body: "Structured requests and automatic reminders until every document is in, with a live checklist per client.",
      },
      {
        icon: "Filter",
        title: "Engagement Qualifier",
        body: "Entity type, turnover, services needed and urgency captured before a partner spends a minute.",
      },
      {
        icon: "CalendarCheck",
        title: "Consultation Booking",
        body: "Only qualified enquiries reach your calendar, with context already attached.",
      },
      {
        icon: "Megaphone",
        title: "Deadline Broadcast Engine",
        body: "Advance tax, GST and TDS reminders go out to the right client segments on schedule.",
      },
      {
        icon: "Star",
        title: "Review & Referral Engine",
        body: "A review request after a successful filing, when the client is most grateful.",
      },
    ],
    script: {
      heading: "A 10:15 PM query in filing season, resolved without you.",
      contactName: "Rao & Associates · fizaki",
      outcome: "Documents received · Consultation booked · Fri 5 PM",
      turns: [
        {
          from: "lead",
          text: "what all documents do I need for ITR this year",
          delay: 0,
        },
        {
          from: "ai",
          text: "Happy to help. Are you salaried, a freelancer or consultant, or do you run a business?",
          delay: 1200,
        },
        {
          from: "lead",
          text: "salaried but also some freelance income",
          delay: 1300,
        },
        {
          from: "ai",
          text: "Understood — that's ITR-3 or ITR-4 territory. You'll need: Form 16, Form 26AS and AIS, bank statements for the freelance receipts, any 80C and 80D proofs, and details of any capital gains. Shall I open a secure upload link for you?",
          delay: 1900,
        },
        { from: "lead", text: "yes please", delay: 900 },
        {
          from: "ai",
          text: "Link sent. Upload whatever you have now and I'll remind you about the rest — no need to gather everything at once. One question: is your freelance income above fifty lakh?",
          delay: 1600,
        },
        { from: "lead", text: "no, around 8L", delay: 900 },
        {
          from: "ai",
          text: "Then presumptive taxation under 44ADA may save you a fair amount. That's worth ten minutes with CA Rao — Friday 5 PM or Monday 11 AM?",
          delay: 1600,
        },
        { from: "lead", text: "friday 5", delay: 700 },
        {
          from: "ai",
          text: "Booked. You'll get a reminder Thursday, and I'll nudge you about any missing documents before then.",
          delay: 1300,
        },
      ],
    },
    day: [
      {
        time: "9:00 AM",
        event:
          "Overnight queries already answered; your team starts on actual work.",
      },
      {
        time: "12:30 PM",
        event: "Eleven clients get automatic reminders for missing Form 16s.",
      },
      {
        time: "3:00 PM",
        event:
          "A single-salaried-return enquiry is handled end to end without a partner call.",
      },
      {
        time: "6:00 PM",
        event: "An advance tax reminder goes out to the right client segment.",
      },
      {
        time: "10:15 PM",
        event: "A filing-season question is answered while the office is closed.",
      },
    ],
    integrations: [
      "Google Calendar",
      "Google Business Profile",
      "Google Drive document collection",
      "Your existing practice management software",
      "Justdial and website enquiries",
    ],
    stats: [
      { value: "60–80%", label: "of repetitive queries resolved without a human" },
      { value: "24/7", label: "answers during filing season" },
      { value: "<60s", label: "response to every new enquiry" },
    ],
    faqs: [
      {
        q: "Client data is confidential. How is that handled?",
        a: "Documents go into your own Google Drive or storage through a secure link. The AI never stores financial documents and never sees content it doesn't need. Chat data sits on WhatsApp Business API with Indian residency.",
      },
      {
        q: "Can it give tax advice?",
        a: "No, and it is explicitly instructed not to. It handles deadlines, document lists, process and status. Anything advisory becomes a booked consultation with you.",
      },
      {
        q: "Rules change every budget.",
        a: "Your answer library lives in one file we maintain with you. Update it once each budget and every conversation is current.",
      },
      {
        q: "Will clients accept a bot from their CA?",
        a: "They accept an instant answer at 10 PM in July far more warmly than a callback in three days. It introduces itself as your practice's assistant and hands off to a human on request.",
      },
    ],
    testimonial: {
      quote:
        "July used to be a war. This year my team actually did filings instead of answering the same question three hundred times.",
      name: "CA V. Rao",
      role: "Rao & Associates, Chennai",
    },
    cta: {
      heading: "Take your filing season back",
      emphasis: "without hiring for it.",
      sub: "Book a free 20-minute audit. We'll count the repetitive queries your team handled last month and what they cost in hours.",
    },
  },
];

export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);
