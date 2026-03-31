# 04_PHOTO_PIPELINE.md
# Photo-to-Task Pipeline
# Humphrey Funeral Service, Inc.
**Status:** 🟡 In Progress — Specification delivered, implementation pending
**Last Updated:** March 2026

---

## PROJECT OVERVIEW

Automated pipeline that converts iPhone photographs into Microsoft To Do tasks. Jim Bob photographs items needing action throughout the day, drags them into a dedicated iCloud Shared Album (TASK INBOX), and the pipeline automatically analyzes each photo using Claude Vision AI and creates a properly formatted task in the correct Microsoft To Do list — with no further action required.

**Design principle:** One human step (drag photo to album). Everything else is fully automatic.

---

## ARCHITECTURE

```
iPhone Camera
     ↓
iCloud Shared Album (TASK INBOX)
     ↓  [RSS feed polled by Vercel cron — nightly or every 30 min]
Vercel Serverless Function
     ↓
Vercel Blob Storage (temp photo storage + processed-IDs log)
     ↓
Claude Vision API (claude-sonnet-4-20250514)
     ↓  [analyzes photo, returns structured JSON task]
Microsoft Graph API
     ↓
Microsoft To Do (correct list auto-selected)
```

---

## TASK ROUTING

| What Claude Sees in the Photo | Routes To |
|-------------------------------|-----------|
| Invoices, bills, financial documents, checks | Finance |
| Equipment, vehicles, building issues, HVAC | Facilities & Equipment |
| Cemetery grounds, markers, irrigation, Field of Honor | Cemetery |
| Marketing materials, signage, competitor observations, content ideas | Marketing |
| Anything related to a family or decedent | Client List |
| Staff, paperwork, compliance, office matters | Admin |
| Personal errands, home, family, personal appointments | Personal |
| Ambiguous, unclear, or AI parse failure | Unclassified |

---

## MICROSOFT TO DO LISTS (8)
Finance | Facilities & Equipment | Cemetery | Marketing | Client List | Admin | Personal | **Unclassified** (create this list if not yet exists)

---

## CLAUDE VISION SYSTEM PROMPT

```
You are a task extraction assistant for Jim Bob Humphrey, owner of Humphrey 
Funeral Service, Inc. and Center Valley Memorial Gardens in Russellville, 
Arkansas. He takes photos throughout his day as visual reminders of things 
that need action.

Analyze the photo and respond ONLY with a valid JSON object in this exact format:
{
  "title": "[concise action-oriented task title]",
  "notes": "[2-3 sentences describing what you see and what action is needed]",
  "list": "[one of: Finance | Facilities & Equipment | Cemetery | Marketing | 
            Client List | Admin | Personal | Unclassified]",
  "priority": "[low | medium | high]",
  "confidence": "[high | medium | low]"
}

Routing rules:
- Invoices/bills/financial documents → Finance
- Equipment/vehicles/building/HVAC issues → Facilities & Equipment
- Cemetery grounds/markers/irrigation/Field of Honor → Cemetery
- Marketing materials/signage/competitor observations/content ideas → Marketing
- Anything related to a family or decedent → Client List
- Staff/paperwork/compliance/office matters → Admin
- Personal errands/home/family/personal appointments → Personal
- Ambiguous or unclear → Unclassified

Return ONLY the JSON object. No preamble, no explanation, no markdown.
```

---

## TECHNICAL COMPONENTS

### Hosting: Vercel
- IT administrator's existing Vercel account (or Jim Bob creates separate free Hobby account)
- Vercel Blob store named: **task-inbox-store**
- Blob store holds: temp photo files + processed-ids.json (deduplication log) + run-log.json

### Cron Schedule
```json
{ "crons": [{ "path": "/api/process-photos", "schedule": "0 3 * * *" }] }
```
Runs nightly at 10:00 PM Central (03:00 UTC). Can be changed to every 30 min if needed.

### File Structure
```
/api/process-photos.js     ← main cron function
/lib/icloud.js             ← iCloud RSS feed parser
/lib/claude.js             ← Claude Vision API caller
/lib/graph.js              ← Microsoft Graph API caller
/lib/router.js             ← task category routing logic
/vercel.json               ← cron schedule config
/.env.local                ← secrets — never commit to Git
```

### Environment Variables
| Variable | Description |
|----------|-------------|
| ANTHROPIC_API_KEY | Claude API key from console.anthropic.com |
| MICROSOFT_TENANT_ID | Azure AD tenant ID |
| MICROSOFT_CLIENT_ID | App registration client ID |
| MICROSOFT_CLIENT_SECRET | App registration client secret |
| MICROSOFT_USER_EMAIL | jimbob@humphreyfuneral.com |
| BLOB_READ_WRITE_TOKEN | Vercel Blob token (auto-generated) |
| ICLOUD_ALBUM_TOKEN | Token from TASK INBOX public album URL |
| TODO_LIST_IDS | JSON object mapping list names to Graph API list IDs |

### Microsoft Graph API
- Auth: OAuth 2.0 client credentials flow
- App registration name: **HFS Task Inbox Pipeline**
- Required permissions: Tasks.ReadWrite, User.Read (Delegated)
- Task creation endpoint: POST /me/todo/lists/{listId}/tasks
- Priority mapping: low → low | medium → normal | high → high

### iCloud Shared Album
- Album name: **TASK INBOX**
- Public Website must be enabled (generates RSS feed)
- RSS feed URL format: https://p[XX]-sharedstreams.icloud.com/[TOKEN]/sharedstreams/webstream

---

## PENDING ACTIONS

### Jim Bob
- [ ] Create TASK INBOX iCloud Shared Album on iPhone
- [ ] Enable Public Website in album sharing settings
- [ ] Share public album URL with IT administrator
- [ ] Create **Unclassified** list in Microsoft To Do

### IT Administrator
- [ ] Decide: use existing Vercel account or create separate one for Jim Bob
- [ ] Enable Vercel Blob, create store named task-inbox-store
- [ ] Register Azure AD app (HFS Task Inbox Pipeline) with Tasks.ReadWrite + User.Read permissions
- [ ] Generate client secret, store all credentials as Vercel environment variables
- [ ] Resolve all 8 To Do list IDs via Graph API, store as TODO_LIST_IDS
- [ ] Implement /api/process-photos.js and supporting lib files
- [ ] Set cron schedule in vercel.json
- [ ] Run 10-step testing checklist (see IT spec document)

### Reference Document
Full IT implementation specification: **HFS_PhotoTaskPipeline_ITSpec.docx**
(Delivered March 2026 — contains complete code structure, API call examples, testing checklist)

---

## TESTING CHECKLIST (SUMMARY)
1. Place test photo in TASK INBOX — confirm RSS feed returns it
2. Confirm Vercel Blob read/write works
3. Send test image to Claude Vision API — confirm valid JSON returned
4. Confirm Microsoft Graph API authentication succeeds
5. Resolve all 8 To Do list IDs
6. Create one test task in each list via Graph API
7. Run full pipeline end-to-end with 3–5 test photos
8. Run pipeline second time — confirm no duplicate tasks
9. Confirm Unclassified list receives ambiguous photo
10. Enable cron schedule — confirm it fires at expected time

---

## USER WORKFLOW (POST-LAUNCH)
1. Take photo of anything needing action
2. Open Photos app → drag photo to TASK INBOX album
3. Done — tasks appear in Microsoft To Do by next morning

---

*Upload this file alongside PROJECT.md whenever working on the photo pipeline.*
