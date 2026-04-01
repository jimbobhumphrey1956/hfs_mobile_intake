# HFS_CVMG_CRM.md
# HFS / CVMG Pre-Need Sales CRM
### Humphrey Funeral Service, Inc. & Center Valley Memorial Gardens

**Status:** 🟡 Phase 1 Complete — Phase 2 Backend Build Pending
**Last Updated:** March 2026
**Vercel Project:** hfs-cvmg-crm · `hfs-cvmg-crm.vercel.app`
**HTML Files:** `HFS_CVMG_CRM.html` · `HFS_Mobile_Intake.html`
**GitHub:** jimbobhumphrey1956 / hfs_mobile_intake (index.html = Mobile Intake)

> **ALWAYS UPLOAD THIS FILE** alongside `HFS_CVMG_CRM.html` and `HFS_Mobile_Intake.html` when working on the Pre-Need CRM or Mobile Intake. This is the primary reference document for all AI-assisted sessions on this project.

---

## PROJECT OVERVIEW

A web-based pre-need sales CRM built specifically for Humphrey Funeral Service and Center Valley Memorial Gardens. Manages the full pre-need sales lifecycle: prospect identification, client intake, price quote generation, contract workflow, follow-up scheduling, document collection, referral tracking, letter templates, mail merge prospecting, and post-sale process.

**Primary Users:** Robert Heflin (Pre-Need Counselor), Matthew Myers, James Humphrey, Jim Bob Humphrey
**Hosting:** Vercel — IT administrator account; auto-deploy from GitHub

### UI Standards (Mandatory — Apply to All Builds)
- **Component Library:** Material UI (MUI) — use MUI components throughout (buttons, tables, modals, forms, tabs, badges, etc.)
- **Background Color:** Beige (`#FAF7F2` / `--cream`) — applied to `body` and all page backgrounds; never white or gray as the base
- **Color Palette:** Navy (`#1B3A5C`) + Gold (`#C8A951`) primary branding — carried through all MUI theme overrides
- **Fonts:** Playfair Display (headings) + Source Sans 3 (body) — loaded via Google Fonts, applied via MUI theme typography
- **All body text:** Black (`#000000`) — no gray body text anywhere; maximum contrast enforced
**Design Standard:** Navy/gold branding, all body fonts black (#000), 16px base, maximum contrast throughout

---

## VERCEL DEPLOYMENT

| Field | Value |
|-------|-------|
| Project Name | hfs-cvmg-crm |
| Team | James Humphrey's projects |
| Team ID | team_S7n9FPzvOetEaIRh6nCXEAnc |
| Project ID | prj_D81SiDbNaahj8XC1fAla3ZrRcdUD |
| Framework | Next.js |
| Node Version | 24.x |
| Primary Domain | hfs-cvmg-crm.vercel.app |
| Git Domain | hfs-cvmg-crm-git-main-jim-bob-humphreys-projects.vercel.app |
| Latest Deployment | dpl_HCV6QV6CpriUnQ2ZvtDh1n7xTW9W |

---

## CURRENT BUILD STATUS

### Phase 1 — Desktop CRM (HFS_CVMG_CRM.html) ✅ Complete

Single-file HTML/CSS/JS prototype. No backend required for Phase 1 core UI.

**9 Navigation Pages:**

| Page | Status | Description |
|------|--------|-------------|
| Search & Quick Add | ✅ Complete | Global search bar, 5 stat cards, recent clients table, pipeline counts, overdue follow-up list |
| Follow-Up Dashboard | ✅ Complete | Three-column layout — Overdue / Due Today / This Week |
| All Clients | ✅ Complete | Fully sortable table (7 columns), filter panel, Total Quoted column |
| Quotes | 🟡 Stub | Placeholder — full quote builder Phase 2 |
| Prospecting & Mail Merge | ✅ Complete | Full working merge engine (see Mail Merge section) |
| Referrals | ✅ Complete | Top referral sources, Charlie Case relationship panel |
| Letter Templates | ✅ Complete | File upload UI, pre-loaded sample files, Use in Merge buttons |
| Price Lists | ✅ Complete | File upload UI, pre-loaded sample price lists |
| Settings | 🟡 Stub | Placeholder — Phase 2 |

**Client Detail Modal (5 tabs):**
- Overview — workflow stepper, all contact fields, Total Quoted prominent
- Quotes & Pricing — itemized quote with line items
- Activity Log — call/note/email log with timestamps and staff
- Documents — checklist with DD-214, SSN, photo, signed contract
- Tasks — Microsoft To Do synced tasks with OVERDUE flags

**All Clients Table Features:**
- Sort buttons on every column: Name, Type, Source, Status, Follow-Up, Staff, Total Quoted
- Sort indicators: ▲ ascending / ▼ descending / ⇅ unsorted
- Filter panel: Type (5 options), Status (5 options), Staff (4 options) — checkbox multi-select
- Live record counter: "X of 42 shown" + "N filters active"
- Total Price Quoted column on both Home and All Clients pages

---

### Phase 1 — Mobile Intake Form (HFS_Mobile_Intake.html / index.html) ✅ Live on Vercel

iPhone-optimized 5-step contact entry form.

**5 Steps:**
1. Basic Information — Photo (Camera/Library/Document), Honorific chips, First/Last Name, Company, Title
2. Contact Information — Mobile Phone (auto-format), Home Phone (auto-format), Email, Preferred Contact
3. Address — Street, City, State (defaults AR), ZIP + Add Spouse button
4. Contact Type — 12 multi-select checkboxes (Pre-Need Traditional, Pre-Need Cremation, Cemetery Plot, Cremation Niche, Combination Package, Graveside Only, Veteran/Field of Honor, Global Address List, Referral Source, Attorney Referral, Vendor/Supplier, Community Partner)
5. Notes & Assignment — Notes textarea, Priority selector, Assigned Staff

**On save:** Success screen with confirmation card, sync note, Add Another / Back to Dashboard buttons.
**goHome() link:** Routes to `HFS_CVMG_CRM.html` — must match deployed CRM filename on Vercel.

---

## MAIL MERGE ENGINE

Built entirely in JavaScript — no server, no backend required for current functionality.

### Built-In Letter Templates (5)

All use real HFS voice, address (2801 W. Main St., Russellville AR 72801), and phone (479) 968-2281:

| Template | Use |
|----------|-----|
| Veterans Outreach | Field of Honor introduction — personalized to veteran |
| Retired Teachers | Community appreciation — pre-need planning intro |
| General Senior | Pre-need planning introduction for seniors |
| Follow-Up | Post-contact follow-up after consultation |
| Quote Cover | Accompanies a price quotation |

Custom/Edit option allows any body text. All templates editable in the template textarea.

**Available merge fields:** `{{Date}}` `{{Title}}` `{{FirstName}}` `{{LastName}}` `{{FullName}}` `{{Address}}` `{{City}}` `{{State}}` `{{ZIP}}` `{{Phone}}` `{{Staff}}`

### Data Sources (3)

| Source | How It Works |
|--------|-------------|
| Upload CSV | Parses .csv file in browser; handles quoted fields; normalizes column name variants |
| CRM Clients | Pulls from visible All Clients table rows — filter clients first, then merge |
| Paste CSV | Paste raw CSV text directly; live-parsed as you type |

**Sample CSV column format:** `LastName, FirstName, Title, Address, City, State, ZIP, Phone, Tag`

### Filters
- Tag filter chips: Veteran, Retired Teacher, Senior 65+, Field of Honor, General
- City contains (text filter)
- State (text, default AR)
- ZIP Code (text filter)
- Staff signing (dropdown — Heflin, Myers, Jim Bob, James)
- Live counters: "Records loaded: X" and "After filters: Y"

### Output (2 modes — both work now, no backend needed)

| Mode | How |
|------|-----|
| Print-Ready HTML | Opens new browser window with all letters formatted one-per-page; Print button at top |
| Export Mailing List CSV | Downloads CSV named `HFS_MailingList_YYYY-MM-DD_Nrecords.csv` |

Word .docx merge via Microsoft 365 Mail Merge = Phase 2 (Graph API + `Files.ReadWrite` permission).

---

## FILE UPLOAD UI

### Letter Templates Page
- Pre-loaded samples: Veterans_Outreach_Letter.docx, Quote_Cover_Letter.docx, Charlie_Case_Referral_Thank_You.docx
- Drag-and-drop upload zone + click-to-browse; accepts .docx, .doc
- Per-file: **Download** (works), **Open in Word** (Phase 2), **Use in Merge** (loads into merge editor)

### Price Lists Page
- Pre-loaded samples: HFS General Price List 2026, HFS Casket Price List 2026, CVMG Cemetery Price List 2026, HFS PreNeed Contract Form
- Drag-and-drop upload zone + click-to-browse; accepts .pdf, .xlsx, .docx
- Per-file: **Download** (works), **Send to Client** (Phase 2)

### "Open in Word" — Phase 2 Fix
**Why it doesn't work now:** Browser security sandbox prevents launching desktop apps from web pages.
**Fix:**
1. Add `Files.ReadWrite` to Azure AD app permissions
2. Upload file to OneDrive via Graph API on click
3. Return `webUrl` from OneDrive response
4. Trigger: `window.open('ms-word:ofe|u|' + webUrl)` — launches Word desktop directly
**Estimated effort:** Half-day once app registration is complete.

---

## TECH STACK

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend Phase 1 | Single HTML/CSS/JS file | No framework, no dependencies, opens in any browser |
| Frontend Phase 2 | Next.js + Tailwind CSS | Full build — shared stack with CVMG Monument app |
| Database | Supabase (PostgreSQL) | Shared instance with CVMG Monument app |
| Auth | Supabase Auth + Microsoft OAuth | Phase 2 |
| Hosting | Vercel | IT administrator account; auto-deploy from GitHub |
| Microsoft Integration | Microsoft Graph API | Phase 2 — mail, calendar, tasks, OneDrive, files |
| File Storage | Supabase file storage | Phase 2 — templates, price lists, contracts |

---

## PRICING DATA REQUIRED (FTC Funeral Rule — 5 Price Lists)

Jim Bob to upload actual current price lists. These feed the Phase 2 quote generator.

| Price List | Contents | Status |
|-----------|----------|--------|
| General Price List (GPL) | Professional services, embalming, facilities, transportation, death certificates | 🔴 Not uploaded |
| Casket Price List | All casket options with retail pricing | 🔴 Not uploaded |
| Outer Burial Container Price List | Vaults, grave liners | 🔴 Not uploaded |
| Cremation Merchandise Price List | Urns, cremation packages | 🔴 Not uploaded |
| CVMG Cemetery Price List | Lots, niches, opening/closing | 🔴 Not uploaded |

---

## PHASE ROADMAP

### Phase 1 — Complete ✅
- Single-file HTML desktop CRM prototype
- 9 navigation pages (7 complete, 2 stubs)
- Client detail modal with 5 tabs
- Sortable, filterable All Clients table with Total Quoted column
- Working mail merge engine (CSV → filter → preview → print-ready HTML / CSV export)
- 5 built-in letter templates with real HFS voice and contact info
- File upload UI for templates and price lists with download functionality
- Mobile Intake form live on Vercel
- Phone auto-format on all tel inputs
- All fonts black, 16px base, full contrast throughout

### Phase 2 — Backend + Live Data (James)

**Azure AD / Microsoft 365:**
- [ ] Add `Files.ReadWrite` to existing Azure AD app permissions
- [ ] Wire OAuth 2.0 login (jimbob@humphreyfuneral.com)
- [ ] Connect Mail.Read → live inbox feed
- [ ] Connect Calendars.Read → live follow-up calendar
- [ ] Connect Tasks.ReadWrite → bidirectional Microsoft To Do sync
- [ ] Connect Files.ReadWrite → OneDrive file storage for templates and price lists
- [ ] Enable "Open in Word" via `ms-word:ofe|u|` protocol

**Supabase Database:**
- [ ] Set up project (shared with monument app — one instance)
- [ ] Build schema: clients, spouses, quotes, quote_line_items, activities, documents, tasks, templates, staff, referrals, price_lists
- [ ] Wire client list to live Supabase data
- [ ] Wire quote generator to FTC price lists in database
- [ ] Wire follow-up task creation to Microsoft To Do
- [ ] Wire file uploads to Supabase storage

**Full Build:**
- [ ] Quote builder — pulls from all 5 price lists, generates itemized quote with discount, tax, total
- [ ] Contract generation — PDF output
- [ ] Settings page — staff accounts, workflow timing, email config
- [ ] Word .docx merge via Graph API + OneDrive

### Phase 3 — Future
- [ ] Area.db direct connection for prospecting (20K community records — see DATA_Architecture.md)
- [ ] Pre-need pipeline forecasting and revenue reporting
- [ ] Integration with Smartware AT-Need for full client lifecycle
- [ ] CVMG lot map / plot availability integration

---

## RELATIONSHIP TO OTHER HFE PROJECTS

| Project | Relationship |
|---------|-------------|
| HF_Entities_Command_Post | Phase 3 of Command Post includes HFS_CRM_Dashboard as a connected module |
| CVMG_Monument_App | Shared Supabase instance; cemetery clients overlap significantly with pre-need clients |
| JBH_Photo_Pipeline | Shared Azure AD app registration; shared Microsoft Graph API connection |
| DATA_Architecture | 60% of CVMG lot sales have matching HFS pre-need contract — unified client identity layer required |

**Key business context:**
- 70% of recent HFS pre-need surge clients are also purchasing CVMG cemetery property
- 60% of CVMG lot sales have a matching HFS pre-need contract with the same client
- 48 of 51 CVMG interments were performed by HFS
- Pre-need surge is a 10–14 year leading indicator of HFS at-need volume — pipeline data has forecasting value
- The CRM must treat HFS and CVMG as one integrated client relationship, not two separate systems

---

## KEY CONTACTS

| Name | Role |
|------|------|
| Jim Bob Humphrey | Owner, project lead — (479) 264-1427 · jimbob@humphreyfuneral.com |
| James Humphrey | Technical build lead (Phase 2) — (479) 264-4573 · james@humphreyfuneral.com |
| Robert Heflin | Primary CRM user — Pre-Need Counselor; ~$70K base + commissions |
| Matthew Myers | Secondary CRM user |

---

## OPEN ITEMS & FLAGS

- [ ] Upload actual FTC price lists (5 files) to Price Lists page — required before Phase 2 quote builder
- [ ] Confirm GitHub repo name with James for CRM desktop file (separate repo from Mobile Intake or same?)
- [ ] Confirm Vercel deployment URL for CRM once James deploys Next.js build
- [ ] Decision: keep Mobile Intake as separate deployed file or merge into CRM as a route? **Recommendation: keep separate** — different device (iPhone vs desktop), different workflow, different user context
- [ ] Phase 2 quote builder needs casket catalog — coordinate with CVMG_Monument_App.md
- [ ] Area.db Phase 3 connection — see DATA_Architecture.md for migration plan
- [ ] **Cloudflare cfasync delivery issue (known):** Any HTML file downloaded from claude.ai has a Cloudflare script tag injected that breaks all JavaScript when opened locally. Fix: open file in TextEdit (Mac) or Notepad (Windows), search for `cfasync`, delete the entire `<script data-cfasync="false" src="/cdn-cgi/..."></script>` tag, save. Do this check any time nav buttons stop working after a download from claude.ai.

---

## ARCHITECTURE DECISIONS LOG

| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-03-15 | Single HTML file for Phase 1 | No setup required, opens in any browser, easy to maintain |
| 2026-03-15 | Shared Supabase with monument app | One database, lower cost, unified client records across cemetery and funeral |
| 2026-03-15 | Reuse Azure AD app registration | No new Azure setup — piggybacks on Command Post and photo pipeline |
| 2026-03-17 | Mobile Intake as separate file | Different device (iPhone), different workflow, different user context than desktop CRM |
| 2026-03-22 | All fonts black (#000), 16px base | Contrast and readability — explicit requirement; gray fonts eliminated throughout |
| 2026-03-22 | Sort buttons on all table columns | Usability with large client lists |
| 2026-03-22 | Filter panel with checkboxes | Type/Status/Staff multi-select — faster workflow than dropdown chains |
| 2026-03-22 | Total Quoted column in client table | Critical metric — staff need pipeline value visible at a glance |
| 2026-03-22 | Mail merge built fully in browser JS | CSV parsing, field substitution, preview, print/export — no backend, works today |
| 2026-03-22 | Print-ready HTML as primary merge output | Works now with any printer; Word .docx deferred to Phase 2 |
| 2026-03-22 | Download button for uploaded files | Browser sandbox blocks direct app launch — honest Phase 2 note shown to user |
| 2026-03-22 | "Use in Merge" button on templates | Loads built-in template body into merge editor, navigates to Prospecting page |
| 2026-03-22 | CRM clients as merge data source | Filter All Clients table first, then pull visible rows into merge — no re-entry |
| 2026-03-22 | goHome() → HFS_CVMG_CRM.html | Connection point between Mobile Intake and CRM — must match deployed filename on Vercel |
| 2026-03-31 | Vercel CLI linked via james-humphreys-projects scope | CLI linked to project prj_D81SiDbNaahj8XC1fAla3ZrRcdUD |

---

*Always upload this file alongside HFS_CVMG_CRM.html and HFS_Mobile_Intake.html for any AI-assisted session on this project.*
