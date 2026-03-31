# 08_PRENEED_CRM.md
# HFS/CVMG Pre-Need Sales CRM
# Humphrey Funeral Service, Inc. & Center Valley Memorial Gardens
**Status:** 🟡 In Progress — Phase 1 desktop CRM complete, Mobile Intake live on Vercel, full backend build pending James
**Last Updated:** March 22, 2026
**HTML Files:** HFS_CVMG_CRM.html · HFS_Mobile_Intake.html

---

## PROJECT OVERVIEW

A web-based pre-need sales CRM built specifically for HFS and Center Valley Memorial Gardens. Manages the full pre-need sales lifecycle: prospect identification, client intake, price quote generation, contract workflow, follow-up scheduling, document collection, referral tracking, letter templates, mail merge prospecting, and post-sale process.

**Users:** Robert Heflin (Pre-Need Counselor), Matthew Myers, James Humphrey, Jim Bob Humphrey
**Hosting:** Vercel — IT administrator account
**GitHub:** jimbobhumphrey1956 / hfs_mobile_intake (index.html = Mobile Intake)
**Design standard:** Navy/gold branding, all body fonts black (#000), 16px base, maximum contrast throughout

---

## CURRENT BUILD STATUS

### ✅ Phase 1 — Desktop CRM (HFS_CVMG_CRM.html)
Complete single-file HTML/CSS/JS prototype. No backend required for Phase 1 core UI.

**9 Navigation Pages:**

| Page | Status | Description |
|------|--------|-------------|
| Search & Quick Add | ✅ Complete | Global search bar, 5 stat cards, recent clients table, pipeline counts, overdue follow-up list |
| Follow-Up Dashboard | ✅ Complete | Three-column layout — Overdue / Due Today / This Week |
| All Clients | ✅ Complete | Fully sortable table (7 columns), filter panel, Total Quoted column |
| Quotes | 🟡 Stub | Placeholder — full quote builder Phase 2 |
| Prospecting & Mail Merge | ✅ Complete | Full working merge engine (see below) |
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

### ✅ Mobile Intake Form (HFS_Mobile_Intake.html / index.html)
Live on Vercel. iPhone-optimized 5-step contact entry form.

**5 Steps:**
1. Basic Information — Photo (Camera/Library/Document), Honorific chips, First/Last Name, Company, Title
2. Contact Information — Mobile Phone (auto-format), Home Phone (auto-format), Email, Preferred Contact
3. Address — Street, City, State (defaults AR), ZIP + Add Spouse button
4. Contact Type — 12 multi-select checkboxes (Pre-Need Traditional, Pre-Need Cremation, Cemetery Plot, Cremation Niche, Combination Package, Graveside Only, Veteran/Field of Honor, Global Address List, Referral Source, Attorney Referral, Vendor/Supplier, Community Partner)
5. Notes & Assignment — Notes textarea, Priority selector, Assigned Staff

**On save:** Success screen with confirmation card, sync note, Add Another / Back to Dashboard buttons.
**goHome() link:** Routes to HFS_CVMG_CRM.html — must match deployed CRM filename.

---

## MAIL MERGE ENGINE (Phase 1 — Fully Working in Browser)

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
| Upload CSV | Parses .csv file in browser; handles quoted fields; normalizes column name variants (First Name / FirstName, Zip / ZIP, etc.) |
| CRM Clients | Pulls directly from visible All Clients table rows — filter clients first, then switch to Prospecting to merge |
| Paste CSV | Paste raw CSV text directly; live-parsed as you type |

**Sample CSV download** button provides exact column format:
`LastName, FirstName, Title, Address, City, State, ZIP, Phone, Tag`

### Filters

- Tag filter chips (Veteran, Retired Teacher, Senior 65+, Field of Honor, General) — matches Tag column in uploaded data
- City contains (text filter)
- State (text, default AR)
- ZIP Code (text filter)
- Staff signing (dropdown — Heflin, Myers, Jim Bob, James)
- Live counters: "Records loaded: X" and "After filters: Y"

### Preview

- Shows first 5 matched records one at a time
- Prev / Next navigation
- Full merged letter text displayed exactly as it will print

### Output (2 modes — both work now, no backend needed)

| Mode | How |
|------|-----|
| Print-Ready HTML | Opens new browser window with all letters formatted one-per-page; Print button at top; works with any printer |
| Export Mailing List CSV | Downloads CSV of filtered records named `HFS_MailingList_YYYY-MM-DD_Nrecords.csv` — for mail house or label printing |

**Word .docx merge** via Microsoft 365 Mail Merge = Phase 2 (James — Graph API + `Files.ReadWrite` permission).

---

## FILE UPLOAD UI

### Letter Templates Page

- Pre-loaded sample files: Veterans_Outreach_Letter.docx, Quote_Cover_Letter.docx, Charlie_Case_Referral_Thank_You.docx
- Drag-and-drop upload zone + click-to-browse; accepts .docx, .doc
- Per-file buttons:
  - **⬇ Download** — works now (browser download → double-click → opens in Word)
  - **Open in Word** — Phase 2 (shows honest message)
  - **Use in Merge** — loads template into merge editor and navigates to Prospecting page
- Info banner explains Phase 2 requirement for direct Word launch

### Price Lists Page

- Pre-loaded samples: HFS General Price List 2026, HFS Casket Price List 2026, CVMG Cemetery Price List 2026, HFS PreNeed Contract Form
- Drag-and-drop upload zone + click-to-browse; accepts .pdf, .xlsx, .docx
- Per-file buttons: **⬇ Download** (works now), **Send to Client** (Phase 2)

### "Open in Word" — Phase 2 Fix (James — One Ticket)
**Why it doesn't work now:** Browser security sandbox prevents launching desktop apps from web pages.
**Fix:**
1. Add `Files.ReadWrite` to Azure AD app permissions (same app registration as Command Post)
2. Upload file to OneDrive folder via Graph API on click
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
| General Price List (GPL) | Professional services, embalming, facilities, transportation, death certificates | 🔴 Not yet uploaded |
| Casket Price List | All casket options with retail pricing | 🔴 Not yet uploaded |
| Outer Burial Container Price List | Vaults, grave liners | 🔴 Not yet uploaded |
| Cremation Merchandise Price List | Urns, cremation packages | 🔴 Not yet uploaded |
| CVMG Cemetery Price List | Lots, niches, opening/closing | 🔴 Not yet uploaded |

*Note: Monument/marker pricing already captured in CVMG_Monument_App.md (Memorial Monuments Inc. wholesale catalog).*

---

## PHASE ROADMAP

### Phase 1 — Complete ✅
- Single-file HTML desktop CRM prototype
- 9 navigation pages (7 complete, 2 stubs)
- Client detail modal with 5 tabs
- Sortable, filterable All Clients table with Total Quoted column
- Working mail merge engine (CSV upload → filter → preview → print-ready HTML / CSV export)
- 5 built-in letter templates with real HFS voice and contact info
- File upload UI for templates and price lists with download functionality
- Mobile Intake form live on Vercel
- Phone auto-format on all tel inputs
- All fonts black, 16px base, full contrast throughout

### Phase 2 — James (Backend + Live Data)

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
- The CRM must treat HFS and CVMG as one integrated client relationship, not two separate systems
- Pre-need surge is a 10–14 year leading indicator of HFS at-need volume — pipeline data in this CRM has forecasting value

---

## KEY CONTACTS

| Name | Role |
|------|------|
| Jim Bob Humphrey | Owner, project lead |
| James Humphrey | Technical build lead (Phase 2) |
| Robert Heflin | Primary CRM user — Pre-Need Counselor; ~$70K base + commissions |
| Matthew Myers | Secondary CRM user |
| IT Administrator | Vercel hosting, Azure AD, GitHub |

---

## OPEN ITEMS & FLAGS

- [ ] Upload actual FTC price lists (5 files) to Price Lists page — required before Phase 2 quote builder
- [ ] Confirm GitHub repo name with James for CRM desktop file (separate repo from Mobile Intake or same?)
- [ ] Confirm Vercel deployment URL for CRM once James deploys
- [ ] Decision: keep Mobile Intake as separate deployed file or merge into CRM as a route? **Recommendation: keep separate** — different device (iPhone vs desktop), different workflow, different user context
- [ ] Phase 2 quote builder needs casket catalog — coordinate with CVMG_Monument_App.md (Memorial Monuments Inc. wholesale pricing already captured)
- [ ] Area.db Phase 3 connection — see DATA_Architecture.md for migration plan and three-track database consolidation
- [ ] **Cloudflare cfasync delivery issue (known):** Any HTML file downloaded from claude.ai has a Cloudflare script tag injected before the `<script>` block that breaks all JavaScript when opened locally. Fix: open file in TextEdit (Mac) or Notepad (Windows), search for `cfasync`, delete the entire `<script data-cfasync="false" src="/cdn-cgi/..."></script>` tag, save. Do this check any time nav buttons stop working after a download from claude.ai.

---

## ARCHITECTURE DECISIONS LOG

| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-03-15 | Single HTML file for Phase 1 | No setup required, opens in any browser, easy for James to maintain |
| 2026-03-15 | Shared Supabase with monument app | One database, lower cost, unified client records across cemetery and funeral |
| 2026-03-15 | Reuse Azure AD app registration | No new Azure setup — piggybacks on Command Post and photo pipeline |
| 2026-03-17 | Mobile Intake as separate file | Different device (iPhone), different workflow, different user context than desktop CRM |
| 2026-03-22 | All fonts black (#000), 16px base | Contrast and readability — explicit requirement; gray fonts eliminated throughout |
| 2026-03-22 | Sort buttons on all table columns | Usability with large client lists — Name, Type, Source, Status, Follow-Up, Staff, Quoted |
| 2026-03-22 | Filter panel with checkboxes | Type/Status/Staff multi-select — faster workflow than dropdown chains |
| 2026-03-22 | Total Quoted column in client table | Critical metric — staff need pipeline value visible at a glance |
| 2026-03-22 | Mail merge built fully in browser JS | CSV parsing, field substitution, preview, print/export — no backend, works today |
| 2026-03-22 | Print-ready HTML as primary merge output | Works now with any printer; Word .docx deferred to Phase 2 Graph API |
| 2026-03-22 | Download button for uploaded files | Browser sandbox blocks direct app launch — honest Phase 2 note shown to user |
| 2026-03-22 | "Use in Merge" button on templates | Loads built-in template body into merge editor, navigates to Prospecting page |
| 2026-03-22 | CRM clients as merge data source | Filter All Clients table first, then pull visible rows directly into merge — no re-entry |
| 2026-03-22 | goHome() → HFS_CVMG_CRM.html | Connection point between Mobile Intake and CRM — must match deployed filename on Vercel |

---

*Upload this file alongside HFE_MASTER_AI_PLAN.md whenever working on the Pre-Need CRM or Mobile Intake.*
*Always upload associated HTML files for code work: HFS_CVMG_CRM.html and HFS_Mobile_Intake.html*
