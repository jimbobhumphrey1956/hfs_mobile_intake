# 07_MONUMENT_DESIGN.md
# Monument Design & Pricing Application
# Center Valley Memorial Gardens
**Status:** 🟡 In Progress — Tech stack confirmed, wireframe complete, catalog data partially captured, build not started
**Last Updated:** March 2026

---

## PROJECT OVERVIEW

Full-stack web application for Center Valley Memorial Gardens. Allows cemetery sales staff and/or clients to configure monument orders across a tabbed workflow, see retail pricing, and generate a completed purchase contract or price quote.

**Supplier:** Memorial Monuments Inc. (Legacy Retail 2026 Pricing)
- Phone: 1-800-658-3813
- Web: www.memorialmonumentsinc.com
- All catalog prices are WHOLESALE — customer never sees wholesale prices

**Technical Lead:** James Humphrey (implementation setup)

---

## TECH STACK (CONFIRMED)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (React) + Tailwind CSS |
| State | React useState / useContext |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL + file storage) |
| Auth | Supabase Auth (admin settings only) |
| Hosting | Vercel (free tier, auto-deploy from GitHub) |
| CI/CD | Vercel auto-deploy on git push |
| Repo | GitHub (edited via VS Code Web) |
| Package manager | npm, Node 20.x LTS |

---

## PRICING MODEL

### Formula
```
Retail Price = Wholesale Price × Markup Multiplier (1.5x or 1.6x — configurable)

Line Items (all at retail):
  + Marker (base + tablet combined)
  + Vases
  + Customizations (border art, symbols, etching, photo etching, etc.)
  + Surcharge
  + Shipping
  + Installation (Foundation & Setting, or Setting Only)

Subtotal = Sum of all line items
Discount = Applied BEFORE sales tax
Discounted Subtotal = Subtotal − Discount
Sales Tax = Discounted Subtotal × Tax Rate (default 7.5%)
Pre-Endowment Total = Discounted Subtotal + Sales Tax
Endowment = Pre-Endowment Total × Endowment % (default 20%)
  ** Endowment calculated on FINAL TOTAL price of marker installed **
Grand Total = Pre-Endowment Total + Endowment
```

### Commission (Internal Only — Never Shown to Customer)
```
Margin = Retail Price − Wholesale Price
Commission = Margin × Commission % (configurable in Admin Settings)
```

---

## ADMIN SETTINGS PAGE

| Setting | Description | Default |
|---------|-------------|---------|
| Markup multiplier | Wholesale × multiplier = retail | 1.5x or 1.6x |
| Sales tax rate | Applied after discount | 7.5% |
| Commission % | % of margin paid as commission | TBD |
| Endowment % | % of final installed marker price | 20% |

---

## UI LAYOUT

### Persistent Elements (Always Visible)

**Top Left — Client Information**
- First name, last name, phone, address, email

**Top Right — Engraving Details**
- Monument type: Single, Double (Companion), Triple
- Per-person fields (shown dynamically by type):
  - Last name, first name, middle name, maiden name, prefix, suffix
  - Date of birth, date of death

**Right Column — Running Price Total**
- Always visible across all tabs
- Shows retail prices (wholesale × markup)
- Line items added per tab; running total displayed

### Tab 0 — Monument Basics (Educational / Reference)
Photos and descriptions of:
- Marker types: Flat, Bevel, Slant, Full Face Slant, Upright, Winged Upright
- Bench types: Harp Leg, Park, Pedestal, Monu-Bench
- **LARGE granite color selection pane** — substantial visual swatches showing real texture/color. Critical client decision point. Swatches must be large enough to see texture detail.
- Upright tops: Serpentine, Apex, Flat Top, Oval Top, Corner Rounds
- Tablet styles: Flat Top, Oval Top, Serpentine (Serp) Top
- Monument anatomy: Die, Base, Foundation, Mow Strip, Grade
- Finishes: Polish, Sanded/Flashed/Steeled/Honed/Sawn, BRP, Chamfer, Polish Margin

### Tab 1 — Marker Selection
- Series name, marker type, size (tablet + base), granite color
- Each row = combined wholesale price × markup
- Vases NOT here — in Tab 2

### Tab 2 — Customization & Personalization
- Border art, symbols, font selection
- Vase selection (type, quantity)
- Photo upload for etching
- Scripture/epitaph with profile-based suggestions (Outdoorsman, Military, Christian, Teacher, etc.)

### Tab 3 — Mockup Preview
- Visual mockup with all selected options
- Cemetery section placement: place marker in specific section based on marker type selected

### Tab 4 — Final Pricing & Contract
- Full breakdown: discount, tax, endowment
- Purchase contract or price quote
- Delivery: Print, Email, or Text

---

## CATALOG DATA

### Monument Types
Flat, Bevel, Slant, Full Face Slant, Upright, Winged Upright, Harp Leg Bench, Park Bench, Pedestal Bench, Monu-Bench

### Upright Tops
Serpentine, Apex, Flat Top, Oval Top, Corner Rounds

### Tablet Styles
Flat Top, Oval Top, Serpentine (Serp) Top

### Monument Anatomy
Die (tablet — vertical engraved piece), Base, Foundation (flush at grade), Mow Strip, Grade

### Finishes
Polish, Sanded/Flashed/Steeled/Honed/Sawn, BRP (Balanced Rock Pitch), Chamfer, Polish Margin

### Standard Sizes with Foundation Recommendations

| Tablet | Base | Foundation |
|--------|------|------------|
| 18x6x24" | 26x12x6" | 32x20x4" |
| 20x6x18" | 26x12x6" | 32x20x4" |
| 20x6x28" | 26x12x6" | 32x20x4" |
| 20x8x28" | 28x14x8" | 32x20x4" |
| 24x6x26" | 32x12x6" | 40x24x4" |
| 36x6x24" | 48x12x6" | 60x20x4" |
| 36x8x24" | 48x14x8" | 60x26x4" |
| 48x8x28" | 60x14x8" | 72x26x4" |

### Granite Colors — 30 Colors
American Bouquet, Bahama Blue, Barre/Vermont Barre, Bengal Black, Black, Blue Pearl, Chestnut Brown, Dakota Mahogany, Ebony Mist, Emerald Pearl, Galaxy Black, Georgia Gray, Impala Grey, Imperial Black, Imperial Red, Light Grey, Mahogany, Misty Black, Morning Rose, Multi Red, Nuberry, Paradiso, Rainbow, Regal Black, Sentinel Red, Sierra White, St. Cloud Grey, Tropical Green, Twilight Red, White Marble

**Standard Colors (pg. 34):** Light Grey, Nuberry, Bahama Blue, Imperial Black, Imperial Red, Mahogany, Paradiso, Morning Rose

---

## PRICING DATA — UPRIGHTS WHOLESALE (pg. 9)

Specs: Polish front & back (P2), serp top, sides and top rock pitch. Standard Bases polished top (P1) with rock pitch sides.

### Standard Uprights — 6" Thick

| Tablet | Base | Wt | Galaxy Black | White Marble | St. Cloud Grey | Regal Black | Impala Grey | Blue Pearl | Dakota Mahogany | Emerald Pearl | Multi Red | Misty Black | Rainbow | Vermont Barre | F&S | Set Only |
|--------|------|----|-------------|-------------|---------------|------------|------------|-----------|----------------|--------------|-----------|------------|---------|--------------|-----|----------|
| 24x6x18 | 36x12x6 | 561 | $3,040 | $2,634 | $4,512 | $2,417 | $2,417 | $3,121 | $3,015 | $3,230 | $2,336 | $3,960 | $4,512 | $3,333 | $425 | $213 |
| 24x6x20 | 36x12x6 | 592 | $3,044 | $2,658 | $4,308 | $2,401 | $2,401 | $3,069 | $3,204 | $3,069 | $2,273 | $3,957 | $4,308 | $3,570 | $425 | $213 |
| 24x6x24 | 36x12x6 | 654 | $3,437 | $3,011 | $4,871 | $2,727 | $2,727 | $3,465 | $3,586 | $3,465 | $2,585 | $4,446 | $4,871 | $4,046 | $425 | $213 |
| 30x6x20 | 42x12x6 | 716 | $3,959 | $3,441 | $5,805 | $3,164 | $3,164 | $4,063 | $3,853 | $4,201 | $3,061 | $5,134 | $5,805 | $4,367 | $425 | $213 |
| 36x6x20 | 48x12x6 | 841 | $4,674 | $4,065 | $6,830 | $3,740 | $3,740 | $4,795 | $4,501 | $4,958 | $3,619 | $6,053 | $6,830 | $5,161 | $483 | $242 |
| 42x6x20 | 54x12x6 | 966 | $5,388 | $4,689 | $7,840 | $4,316 | $4,316 | $5,528 | $5,146 | $5,714 | $4,176 | $6,972 | $7,840 | $5,951 | $483 | $242 |
| 48x6x24 | 60x12x6 | 1215 | $6,515 | $5,724 | $9,239 | $5,196 | $5,196 | $6,568 | $6,527 | $6,568 | $4,933 | $8,389 | $9,239 | $7,693 | $570 | $285 |
| 60x6x24 | 72x12x6 | 1495 | $8,055 | $7,081 | $11,419 | $6,431 | $6,431 | $8,120 | $8,001 | $8,120 | $6,107 | $10,361 | $11,419 | $9,513 | $702 | $351 |

### 8" Thick Uprights

| Tablet | Base | Wt | Galaxy Black | White Marble | St. Cloud Grey | Regal Black | Impala Grey | Blue Pearl | Dakota Mahogany | Emerald Pearl | Multi Red | Misty Black | Rainbow | Vermont Barre | F&S | Set Only |
|--------|------|----|-------------|-------------|---------------|------------|------------|-----------|----------------|--------------|-----------|------------|---------|--------------|-----|----------|
| 36x8x24 | 48x14x8 | 1329 | $6,947 | $5,985 | $9,180 | $5,472 | $5,472 | $7,139 | $6,046 | $7,396 | $5,279 | $9,128 | $9,180 | $6,824 | $483 | $242 |
| 42x8x24 | 54x14x8 | 1526 | $8,004 | $6,899 | $10,549 | $6,309 | $6,309 | $8,225 | $6,908 | $8,519 | $6,457 | $10,508 | $10,549 | $8,424 | $483 | $242 |
| 48x8x24 | 60x14x8 | 1724 | $9,058 | $7,811 | $11,921 | $7,145 | $7,145 | $9,307 | $7,766 | $9,640 | $6,896 | $11,885 | $11,921 | $8,916 | $570 | $285 |
| 60x8x30 | 72x14x8 | 2430 | $12,221 | $10,638 | $15,565 | $9,583 | $9,583 | $12,326 | $11,002 | $12,326 | $9,055 | $15,969 | $15,565 | $12,958 | $702 | $351 |

### Pricing Pages Still Needed
- Flat markers, Bevel markers, Slant markers, Benches
- Vases pricing
- Customization charges (pg. 30 — polish, lettering, artwork, photo etching)

---

## ARCHITECTURE DECISIONS LOG

| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-03-13 | Next.js + Supabase + Vercel | Single codebase, free tiers, GitHub auto-deploy, file storage |
| 2026-03-13 | James helping with tech stack setup | Strong technical background |
| 2026-03-13 | 5-tab layout | Basics → Marker → Customize → Mockup → Contract |
| 2026-03-13 | Persistent top panels + running total | Client info & engraving always visible; price always visible |
| 2026-03-13 | Wholesale × markup pricing | Configurable in admin; customer sees retail only |
| 2026-03-13 | Endowment on final installed price | Calculated after all charges + tax |
| 2026-03-13 | Discount before sales tax | Applied on contract/quote before tax |
| 2026-03-13 | Separate admin settings page | Markup, tax, commission %, endowment % |
| 2026-03-13 | Photo etching via file upload | Tab 2 supports photo upload |
| 2026-03-13 | Profile-based epitaph suggestions | Military, Christian, Outdoorsman, Teacher tags |
| 2026-03-13 | Large granite color pane | Texture-visible swatches — critical for client decisions |
| 2026-03-13 | Cemetery section placement in mockup | Tab 3 reflects where selected marker can be placed |

---

## TASK LIST

### Completed
- [x] Define UI layout and wireframe
- [x] Capture upright pricing data (pg. 9)
- [x] Define pricing model (wholesale × markup)
- [x] Define admin settings requirements
- [x] Extract 30 granite colors
- [x] Extract monument types, anatomy, finishes reference
- [x] Clarify endowment calculation
- [x] Confirm tech stack
- [x] Draft interactive wireframe mockup

### Pending — Next Session
- [ ] Upload remaining catalog pages (flats, bevels, slants, benches, vases, pg. 30 charges)
- [ ] OR provide pointer to catalog folder with all pricing images

### Pending — James
- [ ] Set up GitHub repo and Next.js project
- [ ] Set up Supabase project and database schema

### Pending — Full Build
- [ ] Large granite color selection pane with texture-visible swatches (PRIORITY)
- [ ] Implement tabbed form with dynamic filtering
- [ ] Cemetery section placement feature (Tab 3)
- [ ] Epitaph/scripture suggestion engine
- [ ] Photo upload and etching workflow
- [ ] Font selection system
- [ ] Mockup preview feature
- [ ] Contract/quote generation with discount support
- [ ] Admin settings page
- [ ] Print/email/text delivery

---

*Upload this file alongside PROJECT.md whenever working on the monument application.*
