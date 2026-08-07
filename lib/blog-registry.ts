/**
 * The canonical source of truth for every blog post's metadata. Article
 * bodies live in content/blog/*.md; this registry supplies everything that
 * isn't prose — cluster relationships, accents, schema flags, dates.
 */

export type Cluster = "lead-response" | "whatsapp" | "local-marketing" | "verticals";

export type PostMeta = {
  slug: string;
  order: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  cluster: Cluster;
  isPillar: boolean;
  pillarSlug: string | null;
  relatedSlugs: string[];
  publishDate: string;
  accent: string;
  schema: Array<"BlogPosting" | "FAQPage" | "HowTo">;
};

export const CLUSTER_LABELS: Record<Cluster, string> = {
  "lead-response": "Lead response",
  whatsapp: "WhatsApp",
  "local-marketing": "Local marketing",
  verticals: "Industries",
};

export const POSTS: PostMeta[] = [
  {
    slug: "missed-call-statistics-india",
    order: 1,
    title: "Missed Call Statistics for Indian Small Businesses (2026)",
    metaTitle: "Missed Call Statistics for Small Businesses in India (2026)",
    metaDescription:
      "How many calls do Indian small businesses actually miss, what each one costs, and how to calculate your own number. Data, benchmarks and a simple formula.",
    targetKeyword: "missed call statistics small business",
    secondaryKeywords: [],
    cluster: "lead-response",
    isPillar: true,
    pillarSlug: null,
    relatedSlugs: ["speed-to-lead", "what-is-an-ai-receptionist", "lead-leakage-local-business"],
    publishDate: "2026-08-10",
    accent: "brandBlue",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "speed-to-lead",
    order: 2,
    title: "Speed to Lead: Why Replying in 60 Seconds Beats Everything Else",
    metaTitle: "Speed to Lead: Why 60 Seconds Beats a Bigger Ad Budget",
    metaDescription:
      "Lead response time predicts conversion better than almost any other variable. What the research says, what good looks like, and how to get to 60 seconds.",
    targetKeyword: "speed to lead",
    secondaryKeywords: [],
    cluster: "lead-response",
    isPillar: false,
    pillarSlug: "missed-call-statistics-india",
    relatedSlugs: [
      "missed-call-statistics-india",
      "lead-leakage-local-business",
      "cost-per-booked-appointment",
    ],
    publishDate: "2026-08-13",
    accent: "brandOrange",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "what-is-an-ai-receptionist",
    order: 3,
    title: "What Is an AI Receptionist? A Plain-English Guide",
    metaTitle: "What Is an AI Receptionist? Plain-English Guide for 2026",
    metaDescription:
      "An AI receptionist answers missed calls and messages, qualifies leads and books appointments automatically. How it works, what it costs, and where it fails.",
    targetKeyword: "what is an AI receptionist",
    secondaryKeywords: [],
    cluster: "lead-response",
    isPillar: false,
    pillarSlug: "missed-call-statistics-india",
    relatedSlugs: [
      "how-to-set-up-ai-missed-call-receptionist",
      "whatsapp-business-api-india",
      "missed-call-statistics-india",
    ],
    publishDate: "2026-08-17",
    accent: "brandTeal",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "whatsapp-business-api-india",
    order: 4,
    title: "WhatsApp Business API in India: The Complete 2026 Guide",
    metaTitle: "WhatsApp Business API India: Setup, Pricing and Rules (2026)",
    metaDescription:
      "How to get the WhatsApp Business API in India, what it costs, how the 24-hour window and templates work, and whether your business actually needs it.",
    targetKeyword: "WhatsApp Business API India",
    secondaryKeywords: [],
    cluster: "whatsapp",
    isPillar: true,
    pillarSlug: null,
    relatedSlugs: [
      "whatsapp-business-app-vs-api",
      "automate-instagram-dms",
      "ai-lead-qualification",
    ],
    publishDate: "2026-08-20",
    accent: "brandGreen",
    schema: ["BlogPosting", "FAQPage", "HowTo"],
  },
  {
    slug: "whatsapp-business-app-vs-api",
    order: 5,
    title: "WhatsApp Business App vs API: Which Do You Need?",
    metaTitle: "WhatsApp Business App vs API: Which Does Your Business Need?",
    metaDescription:
      "A direct comparison of the free WhatsApp Business app and the paid Business API, with a decision rule for Indian small businesses.",
    targetKeyword: "WhatsApp Business app vs API",
    secondaryKeywords: [],
    cluster: "whatsapp",
    isPillar: false,
    pillarSlug: "whatsapp-business-api-india",
    relatedSlugs: [
      "whatsapp-business-api-india",
      "what-is-an-ai-receptionist",
      "automate-instagram-dms",
    ],
    publishDate: "2026-08-24",
    accent: "brandGreen",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "how-to-set-up-ai-missed-call-receptionist",
    order: 6,
    title: "How to Set Up an AI Missed-Call Receptionist (Step by Step)",
    metaTitle: "How to Set Up an AI Missed-Call Receptionist (Step by Step)",
    metaDescription:
      "The complete setup: missed-call detection, WhatsApp API, conversation flows, calendar booking, escalation rules and testing before you go live.",
    targetKeyword: "how to set up AI missed call receptionist",
    secondaryKeywords: [],
    cluster: "lead-response",
    isPillar: false,
    pillarSlug: "missed-call-statistics-india",
    relatedSlugs: [
      "what-is-an-ai-receptionist",
      "whatsapp-business-api-india",
      "missed-call-statistics-india",
    ],
    publishDate: "2026-08-27",
    accent: "brandBlue",
    schema: ["BlogPosting", "FAQPage", "HowTo"],
  },
  {
    slug: "automate-instagram-dms",
    order: 7,
    title: "How to Automate Instagram DMs for Lead Generation",
    metaTitle: "How to Automate Instagram DMs for Leads (What Meta Allows)",
    metaDescription:
      "What the Instagram Messaging API actually permits, how the 24-hour window works, and how to hand off to WhatsApp for booking and follow-up.",
    targetKeyword: "automate Instagram DMs",
    secondaryKeywords: [],
    cluster: "whatsapp",
    isPillar: false,
    pillarSlug: "whatsapp-business-api-india",
    relatedSlugs: ["whatsapp-business-api-india", "gym-trial-conversion", "ai-lead-qualification"],
    publishDate: "2026-08-31",
    accent: "brandPink",
    schema: ["BlogPosting", "FAQPage", "HowTo"],
  },
  {
    slug: "lead-leakage-local-business",
    order: 8,
    title: "Lead Leakage: The 7 Places Local Businesses Lose Customers",
    metaTitle: "Lead Leakage: The 7 Places Local Businesses Lose Customers",
    metaDescription:
      "Seven specific points where enquiries disappear between first contact and paying customer, what each one costs, and how to seal them in order.",
    targetKeyword: "lead leakage",
    secondaryKeywords: [],
    cluster: "verticals",
    isPillar: true,
    pillarSlug: null,
    relatedSlugs: [
      "missed-call-statistics-india",
      "speed-to-lead",
      "marketing-automation-local-business-india",
    ],
    publishDate: "2026-09-03",
    accent: "brandPurple",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "get-more-google-reviews",
    order: 9,
    title: "How to Get More Google Reviews on Autopilot",
    metaTitle: "How to Get More Google Reviews on Autopilot (Legally)",
    metaDescription:
      "A repeatable system for collecting Google reviews after every job. Timing, message templates, automation, and the policy rules you must not break.",
    targetKeyword: "how to get more Google reviews",
    secondaryKeywords: [],
    cluster: "local-marketing",
    isPillar: false,
    pillarSlug: "marketing-automation-local-business-india",
    relatedSlugs: [
      "google-business-profile-checklist",
      "marketing-automation-local-business-india",
      "lead-leakage-local-business",
    ],
    publishDate: "2026-09-07",
    accent: "brandOrange",
    schema: ["BlogPosting", "FAQPage", "HowTo"],
  },
  {
    slug: "google-business-profile-checklist",
    order: 10,
    title: "Google Business Profile Optimisation Checklist for India",
    metaTitle: "Google Business Profile Checklist for Indian Businesses (2026)",
    metaDescription:
      "A 20-point checklist to rank higher in the Google map pack. Categories, photos, posts, reviews, Q and A, and the mistakes that suppress local visibility.",
    targetKeyword: "Google Business Profile optimisation",
    secondaryKeywords: [],
    cluster: "local-marketing",
    isPillar: false,
    pillarSlug: "marketing-automation-local-business-india",
    relatedSlugs: [
      "get-more-google-reviews",
      "marketing-automation-local-business-india",
      "local-business-ad-budget-india",
    ],
    publishDate: "2026-09-10",
    accent: "brandBlue",
    schema: ["BlogPosting", "FAQPage", "HowTo"],
  },
  {
    slug: "local-business-ad-budget-india",
    order: 11,
    title: "How Much Should a Local Business Spend on Google and Meta Ads in India?",
    metaTitle: "Google and Meta Ads Budget for Local Businesses in India (2026)",
    metaDescription:
      "How to set an ad budget that works. The minimum viable spend, how to split Google and Meta, what a lead should cost, and when not to advertise at all.",
    targetKeyword: "how much to spend on Google ads India",
    secondaryKeywords: [],
    cluster: "local-marketing",
    isPillar: false,
    pillarSlug: "marketing-automation-local-business-india",
    relatedSlugs: [
      "cost-per-booked-appointment",
      "google-business-profile-checklist",
      "marketing-automation-local-business-india",
    ],
    publishDate: "2026-09-14",
    accent: "brandGreen",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "cost-per-booked-appointment",
    order: 12,
    title: "Cost Per Booked Appointment: The Only Ad Metric That Matters",
    metaTitle: "Cost Per Booked Appointment: The Only Ad Metric That Matters",
    metaDescription:
      "Clicks and leads are vanity metrics. How to track ad spend all the way to a booked appointment, and why most local businesses cannot.",
    targetKeyword: "cost per booked appointment",
    secondaryKeywords: [],
    cluster: "local-marketing",
    isPillar: false,
    pillarSlug: "marketing-automation-local-business-india",
    relatedSlugs: [
      "local-business-ad-budget-india",
      "speed-to-lead",
      "lead-leakage-local-business",
    ],
    publishDate: "2026-09-17",
    accent: "brandPurple",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "dental-clinic-missed-calls",
    order: 13,
    title: "How Dental Clinics in India Can Stop Losing Patients to Missed Calls",
    metaTitle: "Why Dental Clinics Lose Patients to Missed Calls (And the Fix)",
    metaDescription:
      "A dental clinic's phone rings while the dentist is chairside. Exactly how much that costs, and the automation that recovers those patients.",
    targetKeyword: "dental clinic missed calls",
    secondaryKeywords: [],
    cluster: "verticals",
    isPillar: false,
    pillarSlug: "lead-leakage-local-business",
    relatedSlugs: [
      "lead-leakage-local-business",
      "what-is-an-ai-receptionist",
      "missed-call-statistics-india",
    ],
    publishDate: "2026-09-21",
    accent: "brandTeal",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "gym-trial-conversion",
    order: 14,
    title: "How Gyms Convert More Free Trials: The 10-Minute Rule",
    metaTitle: "How Gyms Convert More Free Trials: The 10-Minute Rule",
    metaDescription:
      "A gym enquiry has a shelf life of about ten minutes. How to answer instantly, book the trial, stop the no-shows and convert trials into memberships.",
    targetKeyword: "gym lead conversion",
    secondaryKeywords: [],
    cluster: "verticals",
    isPillar: false,
    pillarSlug: "lead-leakage-local-business",
    relatedSlugs: ["lead-leakage-local-business", "automate-instagram-dms", "speed-to-lead"],
    publishDate: "2026-09-24",
    accent: "brandOrange",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "interior-designer-lead-qualification",
    order: 15,
    title: "How Interior Designers Can Qualify Leads Before Wasting a Consultation",
    metaTitle: "How Interior Designers Qualify Leads Before Wasting a Consultation",
    metaDescription:
      "Most design enquiries have a budget a fraction of your minimum. How to filter them out politely and automatically, before they cost you an afternoon.",
    targetKeyword: "interior designer lead qualification",
    secondaryKeywords: [],
    cluster: "verticals",
    isPillar: false,
    pillarSlug: "lead-leakage-local-business",
    relatedSlugs: ["lead-leakage-local-business", "ai-lead-qualification", "speed-to-lead"],
    publishDate: "2026-09-28",
    accent: "brandPurple",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "solar-site-survey-qualification",
    order: 16,
    title: "How Solar Installers Cut Wasted Site Surveys in Half",
    metaTitle: "How Solar Installers Cut Wasted Site Surveys in Half",
    metaDescription:
      "Half of rooftop solar enquiries come from tenants, shaded roofs or bills too small to justify a system. Qualify them before you send a van.",
    targetKeyword: "solar installer lead qualification",
    secondaryKeywords: [],
    cluster: "verticals",
    isPillar: false,
    pillarSlug: "lead-leakage-local-business",
    relatedSlugs: [
      "lead-leakage-local-business",
      "ai-lead-qualification",
      "cost-per-booked-appointment",
    ],
    publishDate: "2026-10-01",
    accent: "brandOrange",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "real-estate-portal-leads",
    order: 17,
    title: "How Real Estate Brokers Win Portal Leads by Replying First",
    metaTitle: "How Brokers Win Portal Leads by Replying First (India, 2026)",
    metaDescription:
      "Every portal lead goes to three or four brokers at once. The one who replies first usually gets the site visit. How to always be first.",
    targetKeyword: "real estate portal leads",
    secondaryKeywords: [],
    cluster: "verticals",
    isPillar: false,
    pillarSlug: "lead-leakage-local-business",
    relatedSlugs: ["lead-leakage-local-business", "speed-to-lead", "ai-lead-qualification"],
    publishDate: "2026-10-05",
    accent: "brandBlue",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "ca-filing-season-automation",
    order: 18,
    title: "How Chartered Accountants Survive Filing Season Without Hiring",
    metaTitle: "How CAs Survive Filing Season Without Hiring (India, 2026)",
    metaDescription:
      "In filing season a CA's phone becomes a denial-of-service attack. How to automate document chasing, status updates and repetitive queries.",
    targetKeyword: "chartered accountant practice automation",
    secondaryKeywords: [],
    cluster: "verticals",
    isPillar: false,
    pillarSlug: "lead-leakage-local-business",
    relatedSlugs: [
      "lead-leakage-local-business",
      "ai-lead-qualification",
      "whatsapp-business-api-india",
    ],
    publishDate: "2026-10-08",
    accent: "brandGreen",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "ai-lead-qualification",
    order: 19,
    title: "AI Lead Qualification: What to Automate and What to Keep Human",
    metaTitle: "AI Lead Qualification: What to Automate, What to Keep Human",
    metaDescription:
      "A practical framework for deciding which parts of your sales conversation AI should handle, and the four categories it must always hand to a person.",
    targetKeyword: "AI lead qualification",
    secondaryKeywords: [],
    cluster: "lead-response",
    isPillar: false,
    pillarSlug: "missed-call-statistics-india",
    relatedSlugs: [
      "what-is-an-ai-receptionist",
      "how-to-set-up-ai-missed-call-receptionist",
      "whatsapp-business-api-india",
    ],
    publishDate: "2026-10-12",
    accent: "brandTeal",
    schema: ["BlogPosting", "FAQPage"],
  },
  {
    slug: "marketing-automation-local-business-india",
    order: 20,
    title: "Marketing Automation for Local Businesses in India: The 2026 Playbook",
    metaTitle: "Marketing Automation for Local Businesses in India (2026 Playbook)",
    metaDescription:
      "The complete playbook. What to automate, in what order, on what stack, and how to measure it. Written for Indian clinics, gyms, studios and service firms.",
    targetKeyword: "marketing automation for local business India",
    secondaryKeywords: [],
    cluster: "local-marketing",
    isPillar: true,
    pillarSlug: null,
    relatedSlugs: [
      "lead-leakage-local-business",
      "missed-call-statistics-india",
      "google-business-profile-checklist",
    ],
    publishDate: "2026-10-15",
    accent: "brandPurple",
    schema: ["BlogPosting", "FAQPage"],
  },
];

/**
 * How to derive HowTo JSON-LD steps for the 5 posts that carry HowTo schema.
 * The source shape genuinely differs per post (clean ordered list vs. H2
 * steps vs. bold-numbered paragraphs) — this map drives the AST extraction
 * in lib/blog.ts so each post's steps still come from the live content,
 * never from hardcoded text.
 */
export type HowToSource =
  | { mode: "ordered-list"; heading: string }
  | { mode: "h2-steps"; pattern: RegExp }
  | { mode: "bold-numbered"; heading: string };

export const HOWTO_SOURCES: Record<string, HowToSource> = {
  "whatsapp-business-api-india": {
    mode: "ordered-list",
    heading: "How to set up the WhatsApp Business API: step by step",
  },
  "how-to-set-up-ai-missed-call-receptionist": {
    mode: "h2-steps",
    pattern: /^Step \d+:/,
  },
  "automate-instagram-dms": {
    mode: "ordered-list",
    heading: "Step-by-step setup",
  },
  "get-more-google-reviews": {
    mode: "ordered-list",
    heading: "How to automate the whole thing",
  },
  "google-business-profile-checklist": {
    mode: "bold-numbered",
    heading: "The 20-point checklist",
  },
};

export const getPost = (slug: string): PostMeta | undefined =>
  POSTS.find((p) => p.slug === slug);

export const getPillar = (cluster: Cluster): PostMeta | undefined =>
  POSTS.find((p) => p.cluster === cluster && p.isPillar);

export const getSpokes = (pillarSlug: string): PostMeta[] =>
  POSTS.filter((p) => p.pillarSlug === pillarSlug);

export const getRelated = (slug: string): PostMeta[] => {
  const post = getPost(slug);
  if (!post) return [];
  return post.relatedSlugs
    .map((s) => getPost(s))
    .filter((p): p is PostMeta => Boolean(p));
};
