# HFS / ABA Market & Portfolio Analysis

## Project Overview

A comprehensive market and portfolio analysis integrating multiple databases for **Humphrey Funeral Service (HFS)** and the **Arkansas Burial Association (ABA)**. The work spans prepaid funeral contract analysis, at-need sales history, actuarial exposure modeling, and market penetration assessment.

---

## Objectives

- Understand HFS prepaid contract portfolio composition, financial exposure, and demographic risk
- Analyze at-need sales trends (1993–2024) including service mix shifts and pricing
- Quantify the gap between ABA death benefits and actual funeral costs
- Build a unified opportunity/gap model integrating ABA member records and HFS data
- Support strategic planning for the combined prepaid and at-need business

---

## Data Sources

| Source | Format | Description |
|---|---|---|
| ABA Member Records | FoxPro DBF / CSV | Arkansas Burial Association membership and benefit data |
| HFS Prepaid Contracts | FoxPro DBF / CSV | Preneed funeral contracts (full history + July 2022–present detail) |
| HFS At-Need Sales | CSV / Excel | Sales records 1993–2024 by service type and director |
| Area Funeral Market Data | CSV | Competitor and market context |
| CHMBRTBL | DBF | Actuarial mortality table for reserve calculations |

---

## Completed Work

### 1. HFS Prepaid Contract Portfolio Report (Word)
A formatted Word report covering:
- Portfolio status breakdown (active, deceased, lapsed, transferred)
- Contract value inflation over time (significant rise 2022–2024)
- Issue age distribution (active holders avg. 78.6 yrs; 46.5% aged 80+)
- Client city of residence / geography
- Estimated disposition mix (burial vs. cremation — inferred, no explicit field)
- Active book financial exposure
- Deceased contract claims history

> **Note:** The prepaid database lacks an explicit disposition field. Working assumption: post-2015 contracts with face values ~$1,500–$3,000 likely represent cremation services. A companion disposition report is expected to refine this classification.

### 2. HFS At-Need Sales Analysis (Excel — 4 Sheets)
Excel workbook with charts covering:
- Annual volume by service type (1993–2024)
- Cremation rate trend
- Average net sale price by service type
- Director production

---

## Key Findings

| Metric | Value |
|---|---|
| Avg. new prepaid contracts/year | ~64 |
| Avg. prepaid contract value | ~$6,948 |
| Avg. active holder age | 78.6 years |
| Active holders aged 80+ | 46.5% |
| Contract value increase (2022–2024) | ~21% |
| Cremation rate at HFS (2024) | >51% (majority share) |
| Cremation rate at HFS (pre-2018) | Negligible |
| ABA avg. death benefit | ~$330 |
| ABA benefit as % of funeral cost | ~5% |

> **Core strategic insight:** The ABA average death benefit covers only a small fraction (~5%) of actual funeral costs, representing a significant gap relative to prepaid contract averages (~$6,800).

---

## Methods

- **Name matching:** Fuzzy name matching with date-of-birth validation to cross-reference ABA members against HFS prepaid holders
- **Disposition inference:** Face value thresholds and contract date used as proxies for burial vs. cremation where explicit field is absent
- **Actuarial work:** CHMBRTBL mortality table for reserve calculations (pending)

---

## Pending Work

- [ ] Integration of companion disposition report (refine burial/cremation classification)
- [ ] Analysis of detailed prepaid contract file (July 2022–present)
- [ ] Unified opportunity/gap model (ABA members × HFS penetration)
- [ ] Actuarial reserve calculations (CHMBRTBL)
- [ ] Lapse rate analysis
- [ ] Area market competitive analysis

---

## Output Files

| File | Description |
|---|---|
| `HFS_Prepaid_Portfolio_Report.docx` | Formatted Word report — prepaid contract analysis |
| `HFS_AtNeed_Sales_Analysis.xlsx` | Four-sheet Excel workbook — at-need sales 1993–2024 |

---

## Tools & Environment

- FoxPro DBF files, CSV exports, Excel
- Python (pandas, openpyxl, python-docx, fuzzywuzzy)
- Word (formatted reports)
- CHMBRTBL actuarial table

---

*Last updated: March 2026*
