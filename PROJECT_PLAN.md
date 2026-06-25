# ReeCo Website — Project Plan (Phase 1)

> Source of truth: `resource/ReeCo_Website_Requirements_v1.pdf` (v1.0)
> This plan covers **Phase 1 only**. Phase 2 features are parked at the bottom for reference.

---

## 1. What we're building

A **premium brand platform** — not a sales page, not a portfolio — that positions ReeCo as a modern strategy consultancy. It should feel like *a strategy publication and a consultancy combined*.

**Phase 1 success = email list growth.** Every section funnels toward two conversions:
1. Download the lead magnet (*7 Customer Journey Gaps Costing Businesses Revenue*).
2. Subscribe to the newsletter.

Secondary outcome: establish authority through the **Insights Hub** (blog).

### Phase 1 scope (in)
- One-page marketing **home** with all 7 sections from the requirements.
- **Lead-magnet capture** (First Name + Email) → delivers the checklist → adds subscriber to Kit.
- **Newsletter subscription** → adds subscriber to Kit.
- **Insights Hub**: blog index + article pages, content managed in Sanity (6 categories).
- Responsive (desktop/tablet/mobile), SEO-friendly, fast.
- Brand styling: black / gold / white, minimalist, elegant motion.
- Analytics for the success metrics.

### Phase 1 scope (out — see Phase 2)
Consulting services page, case studies, resources, newsletter archive, booking, audit request form, membership.

---

## 2. Confirmed tech decisions

| Concern | Decision | Notes |
|---|---|---|
| Framework | **Next.js 16.2.9** (App Router) + **React 19** | Already scaffolded. ⚠️ This is a modified Next.js — **read `node_modules/next/dist/docs/` before writing any code** (see AGENTS.md). |
| Language | **TypeScript** | Already configured. |
| Styling | **Tailwind CSS v4** | Already configured via `@import "tailwindcss"` + `@theme`. |
| CMS | **Sanity** (headless) | Hosted Studio for non-technical publishing: rich text, images, drafts, scheduling. |
| Email / Newsletter | **Kit (ConvertKit)** | Lead-magnet automation + newsletter; subscribers tagged by source. |
| Hosting | **Vercel** (recommended) | First-class Next.js support, edge CDN, preview deploys, secure by default. |
| Analytics | **Vercel Analytics + Vercel Speed Insights** (recommended) | Privacy-friendly, zero-config. Swap for Plausible/GA4 if preferred. |
| Forms / validation | **react-hook-form + zod** | Shared schema client + server. |

---

## 3. Brand system (build this first)

Defined once in `app/globals.css` (Tailwind v4 `@theme`) and reused everywhere.

```
Background      #000000  (black)
Accent          #D4AF37  (gold)
Text            #FFFFFF  (white)
Secondary text  light gray (e.g. #A1A1AA / zinc-400)
```

- **Typography:** clean, modern, generous whitespace. One premium display face for headlines + a readable body face (lock exact fonts during design — current scaffold uses Geist).
- **Motion:** subtle, elegant entrance/scroll animations (fade/slide on reveal). Recommend a lightweight lib (e.g. Framer Motion / `motion`) or CSS-only `@starting-style` + IntersectionObserver. Respect `prefers-reduced-motion`.
- **Feel:** data/systems-oriented, minimalist, premium. Avoid agency/freelancer clichés.

**Deliverable:** a small design-tokens + components pass before page assembly:
- Color/spacing/type tokens in `@theme`.
- Reusable primitives: `Button` (primary/secondary CTA), `Section` wrapper, `Container`, `Heading`, `Eyebrow`, `EmailForm`.

---

## 4. Site structure & routes (Phase 1)

```
/                      Home (the 7 sections below)
/insights              Insights Hub — article index, filterable by category
/insights/[slug]       Single article
/checklist (or /thank-you)  Lead-magnet confirmation / download landing (optional)
sitemap.xml, robots.txt, RSS feed for /insights
```

### Home sections (order matters — it's the narrative funnel)
1. **Hero** — headline *"Most Businesses Don't Have a Traffic Problem. They Have a Customer Journey Problem."* + subheadline + two CTAs (*Get The Customer Journey Audit Checklist* → lead form; *Explore Insights* → `/insights`).
2. **What ReeCo Does** — 3 pillars: Customer Journey Audits · Lifecycle Marketing · Growth Systems.
3. **Customer Journey Roadmap** — animated horizontal flow: Sales Ad → Landing Page → Email Signup → Welcome Flow → Purchase → Post-Purchase → Replenishment → Winback. Supporting copy about turning first-time buyers into long-term customers.
4. **Lead Magnet** — *7 Customer Journey Gaps Costing Businesses Revenue*; form (First Name, Email); CTA *Download Free Checklist*.
5. **Insights Hub preview** — 6 categories (Customer Journey Audits, Revenue Leak Audits, Lifecycle Marketing, Growth Systems, Retention Marketing, Business Strategy) + latest articles, linking to `/insights`.
6. **About ReeCo** — short brand statement.
7. **Final CTA** — *Ready To Improve Your Customer Journey?* → Download the Checklist · Join the Newsletter.

Plus persistent **header** (logo + nav + CTA) and **footer** (nav, newsletter signup, legal).

---

## 5. Data & integrations

### Sanity (content)
- **Schemas:** `post` (title, slug, category, excerpt, hero image, body [portable text], author, publishedAt, SEO fields), `category`, optional `author`, and editable **siteSettings** singleton (hero copy, about copy, CTAs) so marketing copy is editable without code.
- Sanity Studio embedded at `/studio` (or hosted separately).
- Next.js fetches via Sanity client with ISR/tag-based revalidation; image handling via Sanity image CDN.

### Kit / ConvertKit (email)
- Two entry points: **lead-magnet form** and **newsletter form** → distinct tags/forms so we can measure each.
- Lead magnet: on submit, subscribe to Kit → Kit automation emails the checklist (PDF asset hosted by us or Kit). Show success state on site.
- Submissions go through a **Next.js server route / server action** (API key stays server-side) with zod validation, honeypot/anti-spam, and graceful error handling.

### Analytics / success metrics
Track: email signups (lead vs newsletter), time on site, content engagement (article reads, scroll depth), CTA clicks. Wire conversion events on both forms.

---

## 6. Cross-cutting requirements

- **Responsive:** mobile-first; verify at mobile / tablet / desktop breakpoints.
- **SEO:** per-route metadata via the App Router metadata API, Open Graph/Twitter cards, JSON-LD (`Organization` + `Article`), semantic headings, `sitemap.xml`, `robots.txt`, canonical URLs, RSS for Insights.
- **Performance:** target strong Core Web Vitals — `next/image`, font optimization, minimal client JS, lazy-load below-fold, check any framework-specific navigation hints in the docs.
- **Accessibility:** semantic HTML, focus states, color-contrast check on gold-on-black, `prefers-reduced-motion`, alt text.
- **Security/hosting:** secrets in env vars only, server-side API calls, security headers, HTTPS (Vercel default).

---

## 7. Phase 1 milestones

| # | Milestone | Output |
|---|---|---|
| 0 | **Project hygiene** | Replace default scaffold (`app/page.tsx`, `layout.tsx`, metadata, favicon, scaffold assets). Set up env-var handling, lint, prettier. |
| 1 | **Brand foundation** | Tokens in `@theme`, typography, motion strategy, core UI primitives (Button, Section, Container, Heading, EmailForm). |
| 2 | **Home page** | All 7 sections assembled with real copy, responsive, animated. Forms stubbed. |
| 3 | **Email integration** | Kit wired for lead magnet + newsletter via server route; checklist delivery automation; success/error states. |
| 4 | **Sanity + Insights Hub** | Schemas, Studio, `/insights` index (category filter) + `/insights/[slug]`, editable site copy. |
| 5 | **SEO + analytics + a11y** | Metadata, sitemap/robots/RSS, JSON-LD, analytics events, accessibility pass. |
| 6 | **QA + launch** | Cross-device/browser QA, Lighthouse/CWV, content load, deploy to Vercel, domain + DNS, smoke test forms in prod. |

Suggested sequencing: 0 → 1 → 2 in series; 3 and 4 can run in parallel after 2; 5 → 6 to close out.

---

## 8. Open items to confirm before/while building

- **Domain name** + DNS access (for Vercel + Kit sending domain auth).
- **Lead-magnet asset**: is the actual *7 Customer Journey Gaps* checklist PDF ready, or do we need it produced?
- **Initial Insights content**: how many launch articles, and who writes them?
- **Logo / wordmark** and final font licenses.
- **Legal**: privacy policy + cookie/consent notice (needed for email capture + analytics — esp. GDPR/CAN-SPAM).
- Confirm **Vercel** + **Vercel Analytics** (or alternative).

---

## 9. Phase 2 (parked — do not build now)

Consulting Services page · Case Studies Library · Resources Page · Newsletter Archive · Client Booking Page · Customer Journey Audit Request Form · Community / Membership Area.

> Architectural note: building the Insights Hub on Sanity now makes the Phase 2 Newsletter Archive, Case Studies, and Resources straightforward additions (new content types reusing the same pipeline).
