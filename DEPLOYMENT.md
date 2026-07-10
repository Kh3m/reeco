# ReeCo — Deployment Runbook (Phase 1)

How to take the site live on **Vercel**, with Sanity (CMS) and Klaviyo (email) connected.

---

## 0. Prerequisites / accounts

| Service | Needed for | Status |
|---|---|---|
| **Vercel** | Hosting | Create a free account |
| **Sanity** | Blog/CMS content | ✅ project `lm9fdofp` exists |
| **Klaviyo** | Email capture + lead-magnet delivery | Account + API key + 2 lists + 1 flow |
| **Domain registrar** | Custom domain + DNS | Have the domain ready |

Also have ready: the **lead-magnet PDF** (a draft ships at `public/reeco-customer-journey-checklist.pdf` — replace/approve it) and ideally **transparent logo assets** for the dark UI (currently a typographic wordmark is used).

---

## 1. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production + Preview). They mirror `.env.example`.

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | **No trailing slash.** Drives canonical URLs, OG tags, sitemap. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `lm9fdofp` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `KLAVIYO_PRIVATE_API_KEY` | `pk_...` | **Server-only secret.** Klaviyo → Settings → API keys |
| `KLAVIYO_LEAD_MAGNET_LIST_ID` | e.g. `abc123` | Lead-magnet list ID |
| `KLAVIYO_NEWSLETTER_LIST_ID` | e.g. `def456` | Newsletter list ID |
| `NEXT_PUBLIC_SANITY_API_VERSION` | _(optional)_ | Defaults in `sanity/env.ts` |
| `KLAVIYO_API_REVISION` | _(optional)_ | Defaults in `lib/klaviyo.ts` |

> Anything prefixed `NEXT_PUBLIC_` is exposed to the browser (fine for IDs/URLs). The Klaviyo key is **not** public — keep it secret.

---

## 2. Deploy to Vercel

1. Push this repo to GitHub/GitLab.
2. Vercel → **Add New → Project** → import the repo. It auto-detects Next.js.
3. Add the environment variables from §1.
4. **Deploy.** Vercel runs `next build` and hosts it.

(No build config needed — defaults work. Analytics + Speed Insights activate automatically on Vercel.)

---

## 3. Post-deploy configuration

### Sanity (so the Studio + content work on the live domain)
- Sanity → manage → project → **API → CORS origins → Add origin** → `https://yourdomain.com` (tick **Allow credentials**).
- The embedded Studio is at `https://yourdomain.com/studio`.
- Keep the `production` dataset **public** (it's read without a token).

### Klaviyo (so signups + the checklist email work)
1. Create two **Lists**: Lead Magnet, Newsletter → copy their IDs into the env vars.
2. Create a **Private API key** (Lists + Profiles access) → `KLAVIYO_PRIVATE_API_KEY`.
3. Build a **Flow**: trigger *"Added to List" = Lead Magnet* → send an email linking the checklist
   (`https://yourdomain.com/reeco-customer-journey-checklist.pdf`) or attach the PDF.
4. (Recommended) Authenticate your **sending domain** in Klaviyo for deliverability.

### Domain
- Vercel → Project → **Domains** → add your domain, follow the DNS instructions.
- Update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

---

## 4. Post-deploy verification checklist

- [ ] Home, `/insights`, an article, and `/studio` all load over HTTPS.
- [ ] Submit the **lead form** → success state + instant PDF download; contact appears in the Klaviyo Lead Magnet list; flow email arrives.
- [ ] Submit the **newsletter form** (footer) → contact appears in the Newsletter list.
- [ ] `https://yourdomain.com/robots.txt` and `/sitemap.xml` resolve and reference the real domain.
- [ ] `https://yourdomain.com/opengraph-image` renders; share a link in Slack/X to confirm the card.
- [ ] Publish a post in `/studio` → it appears on `/insights` and the homepage within ~1 min.
- [ ] Run **Lighthouse** (Chrome DevTools) on home + an article; check performance/SEO/accessibility.

---

## 5. Ongoing

- **Publish content:** `/studio` → write Posts/Categories → Publish. Pages revalidate within ~60s (no redeploy).
- **Edit the lead magnet:** update `scripts/generate-checklist.js`, run `npm run generate:checklist`, commit, redeploy.
- **Editable site copy:** the `siteSettings` singleton exists in Studio (front-end wiring of those fields is a follow-up).
