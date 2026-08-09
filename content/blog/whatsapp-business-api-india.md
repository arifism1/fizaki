---
title: "WhatsApp Business API in India: The Complete 2026 Guide"
description: "How to get the WhatsApp Business API in India, what it costs, how the 24-hour window and templates work, and whether your business actually needs it."
slug: "whatsapp-business-api-india"
targetKeyword: "WhatsApp Business API India"
cluster: "whatsapp"
isPillar: true
pillarSlug: null
relatedSlugs: ["whatsapp-business-app-vs-api", "automate-instagram-dms", "ai-lead-qualification"]
publishDate: "2026-08-20"
updatedDate: "2026-08-20"
accent: "brandGreen"
schema: ["BlogPosting", "FAQPage", "HowTo"]
---

The WhatsApp Business API is Meta's programmatic messaging platform that lets businesses send and receive WhatsApp messages through software rather than a phone. In India it is accessed through a Business Solution Provider, requires a verified Meta Business account and a dedicated phone number, and is billed by Meta per conversation. It is the foundation for any automated WhatsApp booking, support or lead-response system.

<aside>
⚠️

Meta changes WhatsApp pricing, category definitions and window rules regularly. Verify current rates against Meta's official WhatsApp Business Platform pricing documentation before quoting anything to a customer, and re-check this post every quarter.

</aside>

## Key takeaways

- The **WhatsApp Business app** is free and manual. The **WhatsApp Business API** is paid, programmatic, and required for automation.
- You cannot get the API directly from Meta as a small business — you go through a Business Solution Provider (BSP).
- You need a **dedicated phone number** not currently registered on any WhatsApp account.
- Meta bills **per conversation**, priced by category, with business-initiated messages costing more than user-initiated ones.
- The **24-hour customer service window** is the central rule: free-form replies are allowed within 24 hours of a customer's last message; outside it you must use pre-approved templates.
- The green verified tick is optional, separate, and not required to operate.

---

## WhatsApp Business app vs WhatsApp Business API

|  | Business app | Business API |
| --- | --- | --- |
| Cost | Free | Per-conversation charges + BSP fees |
| How you use it | A phone app, manually | Software integration |
| Automation | Basic away messages and quick replies | Full — AI replies, booking, CRM sync |
| Simultaneous users | Limited devices | Unlimited agents |
| Bulk messaging | No | Yes, via approved templates |
| Chatbots / AI | No | Yes |
| Best for | Sole traders, very low volume | Any business automating lead response |

The short rule: **if a human will personally type every reply, use the free app. If you want a system to reply, you need the API.**

We compare these in more depth in [WhatsApp Business app vs API](https://fizaki.com/blog/whatsapp-business-app-vs-api).

---

## What do you need to get the WhatsApp Business API in India?

Five prerequisites:

1. **A registered business.** A legal entity with documentation — GST registration, incorporation certificate, or equivalent proof.
2. **A Meta Business Manager account**, with Business Verification completed. This is a document-based check by Meta.
3. **A dedicated phone number** that is not currently active on WhatsApp or WhatsApp Business. If your existing number is on the app, you must either delete that account first or use a new number.
4. **A verified display name** that reasonably matches your business name. Meta reviews this.
5. **A Business Solution Provider (BSP)** — the intermediary that actually provisions your API access.

---

## How to set up the WhatsApp Business API: step by step

1. **Choose a BSP.** Options serving India include providers such as 360dialog, Gupshup, Interakt, AiSensy, Wati, Twilio and others. Compare on per-conversation markup, platform fee, integration quality and support responsiveness — not just headline price.
2. **Create and verify your Meta Business Manager account.** Upload your business registration documents. Verification commonly takes a few days but can take longer if documents are inconsistent.
3. **Register your phone number.** Confirm ownership via OTP. Remember it must be free of any existing WhatsApp account.
4. **Submit your display name for approval.** Meta rejects names that are misleading or unrelated to the verified business.
5. **Configure your webhook.** This is where incoming messages are delivered to your system in real time — the piece that makes automated replies possible.
6. **Create and submit message templates.** Any business-initiated message outside the 24-hour window needs a pre-approved template. Submit your core set early: appointment confirmation, reminder, follow-up, review request.
7. **Build the conversation flows.** Qualification questions, booking logic, escalation rules and human handoff.
8. **Test end to end**, then go live.

Realistic timeline: **one to three weeks**, with Meta verification the usual bottleneck.

---

## How does WhatsApp API pricing work in India?

Meta bills **per conversation**, not per message. A conversation is a messaging session that groups messages within a defined period.

Conversations are priced by **category**:

| Category | What it is used for | Relative cost |
| --- | --- | --- |
| Marketing | Promotions, offers, re-engagement | Highest |
| Utility | Order updates, appointment confirmations, reminders | Lower |
| Authentication | OTPs and verification codes | Lower |
| Service | Replies to customer-initiated messages | Lowest / often free within the window |

On top of Meta's per-conversation charges, your **BSP adds its own platform fee**, typically a monthly subscription and sometimes a per-message markup. When comparing providers, always calculate total cost at your expected volume rather than comparing headline prices.

<aside>
💰

**Cost design tip:** structure your automation so most conversations are *user-initiated service* conversations. A missed-call responder that prompts the customer to message you first is materially cheaper to run than one that blasts marketing templates outward — and it performs better, because the customer already wants to talk.

</aside>

*[Verify all current pricing against Meta's official WhatsApp Business Platform pricing page and link it here before publishing.]*

---

## What is the 24-hour window?

The 24-hour customer service window is the period following a customer's most recent message to your business, during which you may send free-form replies without using a pre-approved template.

The rules:

- **Inside the window:** send anything relevant — free text, images, documents, links, location pins.
- **Outside the window:** you may only send **pre-approved message templates**, and these are billed at the higher business-initiated rates.
- **Each new customer message reopens** the 24-hour window.

This single rule shapes every good WhatsApp automation design. It is why systems are built to encourage a customer reply, and why appointment reminders sent three days ahead must be templates rather than casual messages.

---

## What are message templates and how do you get them approved?

A WhatsApp message template is a pre-written message structure, submitted to Meta for approval, used to start conversations outside the 24-hour window. Variables are inserted with placeholders.

Example:

```
Hi VAR_1, this is a reminder of your appointment at VAR_2
on VAR_3 at VAR_4. Reply RESCHEDULE if you need a different time.
```

In Meta's template editor these variables are written as numbered placeholders in double curly braces — VAR_1 above corresponds to variable 1, VAR_2 to variable 2, and so on.

**Approval tips:**

- Keep it transactional and specific. Vague promotional language gets rejected.
- Do not use placeholders at the very start or end of a message.
- Categorise honestly — mislabelling marketing as utility risks account penalties.
- Templates can be rejected and resubmitted; build in a few days of buffer.
- Prepare your core templates before launch, not during it.

---

## Do I need the green tick?

No. The green verified badge (Meta Verified for business) is a separate, optional programme. Your API works fully without it.

What you *do* need is **display name approval**, which is different — that determines the name customers see, and it is mandatory.

The green tick helps with trust for consumer-facing brands at scale. For a local clinic or gym, it is a nice-to-have well after everything else works.

---

## What are the rules you must not break?

Meta enforces quality actively, and account restrictions are real:

- **No unsolicited messaging.** You need opt-in before messaging someone. Buying a phone number list and blasting it is the fastest route to a ban.
- **Maintain a good quality rating.** Block and report rates directly affect your messaging limits.
- **Respect messaging tiers.** New accounts start with limited daily unique-recipient allowances and scale up with good behaviour.
- **Categorise templates honestly.**
- **Provide an obvious opt-out.**

A business that only responds to people who contacted it first — which is exactly what a missed-call responder does — sits comfortably inside every one of these rules.

---

## Frequently asked questions

### How much does the WhatsApp Business API cost in India?

You pay Meta per conversation, priced by category, plus your Business Solution Provider's platform fee. Marketing conversations cost the most and service conversations the least. Because rates change, check Meta's official pricing documentation and model your specific expected volume rather than relying on a headline figure.

### Can I use my existing WhatsApp number for the API?

Only if you first delete the existing WhatsApp or WhatsApp Business account on that number, which erases its chat history. Most businesses keep their existing number on the app for personal or manual use and provision a separate dedicated number for the API.

### How long does WhatsApp Business API approval take in India?

Typically one to three weeks end to end. Meta's Business Verification is the usual delay, especially if submitted documents do not exactly match the registered business details.

### Do I need the WhatsApp Business API to automate replies?

Yes. The free WhatsApp Business app supports only basic away messages and quick replies. Genuine automation — AI responses, qualification, calendar booking, CRM integration — requires the API.

### What happens if I message someone after 24 hours?

You can only send a pre-approved message template, billed at business-initiated rates. Free-form messages outside the window will not be delivered. Once the customer replies to your template, the 24-hour window reopens.

### Is the WhatsApp Business API worth it for a small business?

It is worth it if you are losing leads to slow replies. If you receive a handful of enquiries a week and answer them all personally within minutes, the free app is sufficient. If enquiries arrive at night, during service hours or faster than you can answer, the API pays for itself quickly.

---

## Skip the setup entirely

fizaki handles WhatsApp Business API provisioning, verification, template approval and conversation design as part of every build — typically live in about two weeks.

[**Book a free lead-leak audit →**](https://fizaki.com/#quote)

Related reading: [app vs API compared](https://fizaki.com/blog/whatsapp-business-app-vs-api) and [how to automate Instagram DMs legally](https://fizaki.com/blog/automate-instagram-dms).
