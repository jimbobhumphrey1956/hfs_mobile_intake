# HFS / CVMG Pre-Need CRM — Claude Code Instructions

This file is always read by Claude Code at the start of every session.

---

## ⚡ Mandatory Workflow — After Every Significant Code Change

**Always run these steps in order after any major update:**

```bash
# 1. Build — catch TypeScript/compilation errors before committing
npm run build

# 2. Debug — fix any build errors, check browser console for runtime errors

# 3. Prisma migrate — push schema changes to the live database
npx prisma db push

# 4. Commit
git add .
git commit -m "description of changes"

# 5. Push — triggers Vercel auto-deploy
git push origin main
```

**Never skip this sequence.** Build errors must be resolved before committing. Prisma schema changes must be pushed before the app is deployed.

---

## 📱 Mobile-First Design — Always

Every page and component must be designed **mobile-first**:
- Write base CSS for mobile (≤ 480px) first
- Add `@media (min-width: 768px)` for tablet
- Add `@media (min-width: 1024px)` for desktop
- Sidebar collapses to bottom nav or hamburger on mobile
- Touch targets minimum 44px × 44px
- No horizontal scroll on any screen size
- Font sizes readable without zooming (16px body minimum)
- Stack columns vertically on mobile; grid only on desktop

---

## Project Identity

- **App:** HFS / CVMG Pre-Need Sales CRM
- **Companies:** Humphrey Funeral Service, Inc. & Center Valley Memorial Gardens
- **Location:** 2801 W. Main St., Russellville, AR 72801 · (479) 968-2281
- **Vercel Project:** hfs-cvmg-crm · `hfs-cvmg-crm.vercel.app`
- **Framework:** Next.js 14 (App Router) + Prisma + Vercel Postgres (Neon)
- **Branch:** main → auto-deploys to Vercel

---

## Mandatory UI Standards — Apply to Every Build

| Rule | Value |
|------|-------|
| Background | Beige `#FAF7F2` (`--cream`) — ALL page/body backgrounds. Never white or gray as base. |
| Primary | Navy `#1B3A5C` (`--navy`) |
| Accent | Gold `#C8A951` (`--gold`) |
| Body text | Black `#000000` — no gray body text. Maximum contrast everywhere. |
| Heading font | Playfair Display (Google Fonts) |
| Body font | Source Sans 3 (Google Fonts) |
| Base font size | 16px minimum |
| Component library | CSS Modules (scoped per component) — no Tailwind, no inline styles |
| Sidebar width | 230px desktop · collapsed/bottom-nav on mobile |
| Design approach | **Mobile-first** — base styles for mobile, media queries up |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript) |
| ORM | Prisma 5 |
| Database | Vercel Postgres (Neon) |
| File Storage | Vercel Blob |
| Styling | CSS Modules + CSS custom properties (globals.css) |
| Hosting | Vercel — auto-deploy from main branch |
| Auth | Phase 3 — Supabase Auth or NextAuth + Microsoft OAuth |

---

## Project Structure

```
/app                      ← Next.js App Router pages
  /dashboard/page.tsx     ← Operations Hub (root → /dashboard)
  /clients/page.tsx       ← All Clients table
  /clients/[id]/page.tsx  ← Client detail
  /clients/new/page.tsx   ← New client intake
  /follow-up/page.tsx     ← Follow-Up Dashboard (3 columns)
  /quotes/page.tsx        ← Phase 2
  /prospecting/page.tsx   ← Mail merge
  /referrals/page.tsx
  /settings/page.tsx      ← Phase 3
/components/layout/       ← Sidebar, Topbar
/lib/prisma.ts            ← Prisma client singleton
/lib/db/                  ← Data access (clients, activities, quotes, staff)
/prisma/schema.prisma     ← Database schema
/prisma/seed.ts           ← Seed data
/types/index.ts           ← TypeScript types
```

---

## Database (Vercel Postgres / Neon)

**Tables:** staff · clients · spouses · referrals · quotes · quote_line_items · activities · documents · tasks · letter_templates · price_lists

**Env vars in `.env.local`:**
```
POSTGRES_PRISMA_URL=postgresql://...pooler...?channel_binding=require&connect_timeout=15&sslmode=require
DATABASE_URL_UNPOOLED=postgresql://...direct...?sslmode=require
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

**Database commands:**
```bash
npx prisma db push        # push schema changes (use instead of migrate in dev)
npx prisma db seed        # run seed data
npx prisma studio         # visual DB browser
npx prisma generate       # regenerate client after schema changes
```

**Fresh setup:**
1. Copy `.env.local.example` → `.env.local` and fill in credentials
2. `npx prisma db push` — create tables
3. `npx prisma db seed` — load demo data

---

## Key Business Context

- 70% of pre-need surge clients are also purchasing CVMG cemetery property
- 60% of CVMG lot sales have a matching HFS pre-need contract
- Pre-need pipeline = 10–14 year leading indicator of at-need volume
- HFS and CVMG must be treated as **one integrated client relationship**

## Primary Users

| Name | Role |
|------|------|
| Robert Heflin | Primary CRM user — Pre-Need Counselor |
| Matthew Myers | Secondary counselor |
| Jim Bob Humphrey | Owner/CEO |
| James Humphrey | Technical build lead |

---

## Phase Roadmap

- **Phase 1 (done):** Single HTML prototype → archived as `HFS_CVMG_CRM.html`
- **Phase 2 (current):** Next.js + Prisma + Vercel Postgres, live database, no hardcoded data
- **Phase 3:** Auth (NextAuth/Supabase) + Microsoft OAuth + Graph API (mail/calendar/To Do/OneDrive)
