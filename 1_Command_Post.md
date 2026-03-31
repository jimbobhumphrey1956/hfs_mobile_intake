# Jim Bob Humphrey Command Post
### Total Life Dashboard - All Entities & Personal life
**Owner:** Jim Bob Humphrey · jimbob@humphreyfuneral.com  
**Technical Partner:** James Humphrey  
**Built:** March 2026  
**Status:** Phase 1 Complete · Phase 2 In Progress

---

## Overview

The JBH Command Post is a lightweight, cross-platform operations dashboard for Jim Bob Humphrey, CEO of Humphrey Funeral Service, Inc. Located at 2801 W Main St in Russellville, Arkansas. The command Post includes full over sight of all Entities under the direction and or ownership of Jim Bob Humphrey including but not limited to 
Humphrey Funeral Service, Inc, Center Valley Memorial Gardens, West Main Realty, LLC, Salute to Freedom Task Force, Arkansas Burial Association, Agency Relationship with Funeral 
Director Life Insurance Company in Abilene, Texas. Additionally, the command post is designed to assist Jim Bob Humphrey, DOB 03-30-1956, age 70, with the full scope of his
Life including Health, Business succession, Personal relationships, and all scheduling of his daily life to persist 24 hours each day, 7 days per week, 365 days per year.
It is built as a single HTML/CSS/JavaScript file — no framework, no backend, no dependencies — designed to be easy to use on any device and easy for James to maintain.

The dashboard is intentionally lean. One file. Opens in any browser. Hosts for free on Netlify. Scales to full live O365 data integration in Phase 2.

---

## Live URL (After James Deploys)

```
https://dashboard.humphreyfuneral.com
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 with CSS Variables |
| Logic | Vanilla JavaScript |
| Fonts | Google Fonts — Bebas Neue + IBM Plex Mono + IBM Plex Sans |
| AI Briefing | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| Voice Input | Web Speech API (Chrome) |
| Auth (Phase 2) | Microsoft MSAL.js + OAuth 2.0 |
| Live Data (Phase 2) | Microsoft Graph API |
| Hosting | Netlify (free tier) |
| Domain | dashboard.humphreyfuneral.com (CNAME → Netlify) |

---

## Files

```
HFS-Command-Post/
├── hfs-dashboard.html    ← The entire app
└── README.txt            ← Quick reference
```

---

## Agent Modes

The dashboard has 7 agent contexts. Each has its own task list and briefing.

| Agent | Focus Area |
|---|---|
| 👑 Owner | Top-level priorities, vendor decisions, staff oversight, Other Owner Controlled Business and Non-Profit Entities |
| 💰 Finance | AR/AP, payroll, P&L, tax filings, Investments |
| ⛪ Cemetery | Plot inventory, interment schedule, grounds maintenance |
| 📡 Marketing | Social media, Google Business, newsletters |
| 🏠 JBH Personal | Family, health, personal appointments |
| 🔧 Facilities | HVAC, chapel, equipment, maintenance |
| 🤖 Security·AI | A.I. Administration, All Digital Network Management, Access codes, cameras, backup systems |

---

## What Works Now (Phase 1)

- Live clock and date display
- All 7 agent buttons with context switching
- Task lists pre-seeded with real priorities per agent
- Quick Add tasks with priority and agent selector
- Voice input (Chrome — Web Speech API)
- 7-day calendar strip with today highlighted
- Email feed with real contacts as placeholders
- Activity log tracking every action
- Animated gauges (Email / Tasks / Events)
- AI Morning Briefing — live call to Claude API per active agent
- Connector status panel showing James's Phase 2 checklist

---

## Email Contacts (Placeholder — Live in Phase 2)

| Contact | Context |
|---|---|
| Sarah Patterson | Estate Documents |
| James Humphrey | Azure App Registration |
| John Shoptaw | Investment Portfolio / Finance |
| Aristides Ortiz | Personal / Church / Cemetery |
| Center Valley Grounds | Facilities / Cemetery |

---

## Phase Roadmap

### Phase 1 — Shell (Complete)
- Single-file dashboard
- All 7 agent modes
- Task management
- AI briefing via Claude API
- Placeholder email and calendar data

### Phase 2 — Live O365 Data (James)
- Microsoft Azure AD app registration
- OAuth 2.0 login (jimbob@humphreyfuneral.com)
- Live inbox via Mail.Read
- Live calendar via Calendars.Read
- Live tasks via Tasks.ReadWrite (bidirectional sync with Microsoft To-Do)
- Deploy to Netlify
- Custom domain: dashboard.humphreyfuneral.com
- Installable on iPhone, iPad, Windows, iMac
- Recognize that Jim Bob's Daily life and workflows live on his iPhone 

### Phase 3 — Future
- iMessage scan
- iPhone photo scan (receipts, documents, photo recognition to Office 365 To Do )
- HFS_CRM_Dashboard with HFS_Mobile_intake.html
- Push notifications to iPhone for high-priority email
- Offline mode with sync

---

## James — Phase 2 Checklist

### Azure AD App Registration
- [ ] Go to portal.azure.com → Azure Active Directory → App Registrations → New Registration
- [ ] Name: `HFS Command Post`
- [ ] Account type: Single tenant
- [ ] Redirect URI: `https://dashboard.humphreyfuneral.com/auth`
- [ ] Click Register — copy **Client ID** and **Tenant ID** → send to Jim Bob
- [ ] API Permissions → Microsoft Graph → Delegated:
  - [ ] `Mail.Read`
  - [ ] `Calendars.Read`
  - [ ] `Tasks.ReadWrite`
  - [ ] `User.Read`
- [ ] Grant Admin Consent for all permissions
- [ ] Certificates & Secrets → New Client Secret → 24 months → copy **Secret Value immediately**

### Netlify Hosting
- [ ] Go to netlify.com → Sign up free
- [ ] Drag and drop `hfs-dashboard.html` to deploy
- [ ] Copy the Netlify URL (e.g. `hfs-command-post.netlify.app`) → send to Jim Bob
- [ ] Site Settings → Environment Variables → add `AZURE_CLIENT_SECRET`
- [ ] Domain Settings → add custom domain `dashboard.humphreyfuneral.com`
- [ ] Update Azure Redirect URI with real Netlify URL

### DNS (CNAME Record)
- [ ] Check nameservers at whatsmydns.net → search `humphreyfuneral.com` → NS
- [ ] Log into DNS host (GoDaddy / Wix / Cloudflare / other)
- [ ] Add record:

| Field | Value |
|---|---|
| Type | CNAME |
| Name | `dashboard` |
| Value | `your-site.netlify.app` |
| TTL | 3600 |

### O365 Data Wiring
- [ ] Add MSAL.js `<script>` tag to dashboard header
- [ ] Wire OAuth login flow → Sign in with Microsoft button
- [ ] Connect Mail.Read → replace placeholder email feed with live inbox
- [ ] Connect Calendars.Read → replace calendar strip with real events
- [ ] Connect Tasks.ReadWrite → replace task list with Microsoft To-Do (bidirectional)
- [ ] Wire gauge counters to live counts
- [ ] Test on Chrome desktop, iPhone Safari, iPad

### Device Installation
- [ ] iPhone: Safari → Share → Add to Home Screen
- [ ] iPad: Safari → Share → Add to Home Screen
- [ ] Windows: Chrome → address bar install icon
- [ ] iMac: Chrome → address bar install icon

---

## What James Sends Jim Bob

| After Step | James Sends | How |
|---|---|---|
| App Registration | Client ID + Tenant ID | Email or iMessage — safe |
| Client Secret | Secret Value | iMessage or 1Password — **never email** |
| Netlify deploy | Live URL | Email or iMessage |
| Phase 2 complete | Confirmation all 3 data sources tested | Call or message |

---

## Security Rules

- The **Client Secret** must be stored as a Netlify environment variable only
- The Client Secret must **never** be placed in the HTML file
- The Client Secret must **never** be sent over email
- Use iMessage, in person, or a password manager (1Password / Bitwarden) to share it
- The dashboard uses Jim Bob's standard O365 credentials — no new passwords

---

## How to Run Locally (Before Hosting)

1. Download `hfs-dashboard.html`
2. Move to `Documents/HFS Command Post/`
3. Double-click → opens in Chrome
4. Right-click tab → Pin Tab
5. Chrome Settings → On startup → Continue where you left off

---

## Cross-Device Access

| Device | How | When |
|---|---|---|
| Mac (work) | Pinned Chrome tab — local file | Now |
| iPhone | Safari → dashboard URL → Add to Home Screen | After Phase 2 |
| iPad | Safari → dashboard URL → Add to Home Screen | After Phase 2 |
| Windows workstation | Chrome → dashboard URL | After Phase 2 |
| iMac at home | Chrome → dashboard URL | After Phase 2 |

---

## Key Contacts

| Name | Role | Contact |
|---|---|---|
| Jim Bob Humphrey | 60% HFS Owner, HFS CEO | jimbob@humphreyfuneral.com | Cell (479) 264-1427 |
| James Humphrey | 13.3% HFS Owner, HFS President | Technical Partner | James@humphreyfuneral.com | Cell (479) 264-4573 |
| Jennifer Walker | 13.3% HFS Owner, HFS Treasurer | jennifer@annhenryfarms.com | Cell (202) 701-9236 |
| Elizabeth Humphrey | 13.4% HFS Owner, HFS | lizzie3339@gmail.com | Cell (504) 616-3857 |
| Brandy Humphrey | HFS Exec VP | brandy@humphreyfuneral.com | Cell (479) 236-7363 |
| John Shoptaw | Accountant — Finance | john@shoptaw-labahn.com | Office Phone (479) 967-3600 | — |

---

## Notes

- Code does not persist between Claude sessions — paste the HTML file at the start of new build sessions
- The single-file architecture is intentional — minimizes complexity, keeps it maintainable by James
- Tasks reset on page reload until localStorage is wired in Phase 2
- The AI briefing works immediately — no connectors needed
- Voice input requires Chrome browser
