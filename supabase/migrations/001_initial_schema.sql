-- ============================================================
-- HFS / CVMG Pre-Need CRM — Initial Database Schema
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── STAFF ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS staff (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  initials    TEXT NOT NULL,
  email       TEXT UNIQUE,
  role        TEXT,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── REFERRAL SOURCES ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS referrals (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT NOT NULL,
  relationship   TEXT,
  referral_count INTEGER DEFAULT 0,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── CLIENTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name          TEXT NOT NULL,
  last_name           TEXT NOT NULL,
  honorific           TEXT,
  company             TEXT,
  title               TEXT,
  email               TEXT,
  mobile_phone        TEXT,
  home_phone          TEXT,
  preferred_contact   TEXT DEFAULT 'mobile',
  street              TEXT,
  city                TEXT,
  state               TEXT DEFAULT 'AR',
  zip                 TEXT,
  status              TEXT DEFAULT 'prospect',
    -- prospect | contacted | quoted | signed | lost
  contact_type        TEXT[] DEFAULT '{}',
    -- pre_need_traditional | pre_need_cremation | cemetery_plot |
    -- cremation_niche | combination | graveside | veteran |
    -- global_address | referral_source | attorney | vendor | community
  source              TEXT,
    -- referral | veteran_outreach | retired_teacher | senior_outreach |
    -- walk_in | website | phone_inquiry
  assigned_staff_id   UUID REFERENCES staff(id),
  referral_source_id  UUID REFERENCES referrals(id),
  follow_up_date      DATE,
  priority            TEXT DEFAULT 'normal',  -- low | normal | high
  total_quoted        DECIMAL(10,2) DEFAULT 0,
  notes               TEXT,
  photo_url           TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ── SPOUSES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS spouses (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id     UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  first_name    TEXT,
  last_name     TEXT,
  honorific     TEXT,
  mobile_phone  TEXT,
  home_phone    TEXT,
  email         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── QUOTES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quotes (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  status          TEXT DEFAULT 'draft',  -- draft | sent | accepted | declined
  subtotal        DECIMAL(10,2) DEFAULT 0,
  discount        DECIMAL(10,2) DEFAULT 0,
  total_amount    DECIMAL(10,2) DEFAULT 0,
  notes           TEXT,
  created_by      UUID REFERENCES staff(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── QUOTE LINE ITEMS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS quote_line_items (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id     UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  description  TEXT NOT NULL,
  category     TEXT,  -- services | merchandise | cemetery | cremation
  quantity     INTEGER DEFAULT 1,
  unit_price   DECIMAL(10,2) DEFAULT 0,
  total        DECIMAL(10,2) DEFAULT 0
);

-- ── ACTIVITIES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activities (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id   UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
    -- call | note | email | meeting | quote_sent | contract_signed |
    -- intake | mail_merge | follow_up_scheduled
  note        TEXT,
  staff_id    UUID REFERENCES staff(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── DOCUMENTS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id    UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type         TEXT,  -- dd214 | ssn | photo | contract | other
  name         TEXT NOT NULL,
  status       TEXT DEFAULT 'pending',  -- pending | received | verified
  file_url     TEXT,
  uploaded_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── TASKS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id         UUID REFERENCES clients(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  due_date          DATE,
  completed         BOOLEAN DEFAULT FALSE,
  priority          TEXT DEFAULT 'normal',  -- low | normal | high
  assigned_staff_id UUID REFERENCES staff(id),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── LETTER TEMPLATES ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS letter_templates (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  type        TEXT,
    -- veterans | retired_teachers | senior | follow_up | quote_cover | custom
  content     TEXT,
  file_url    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── PRICE LISTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS price_lists (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  type         TEXT,
    -- general | casket | outer_burial | cremation | cemetery
  file_url     TEXT,
  uploaded_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── TRIGGERS: updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── TRIGGER: sync total_quoted on clients ──────────────────
CREATE OR REPLACE FUNCTION sync_client_total_quoted()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE clients
  SET total_quoted = (
    SELECT COALESCE(SUM(total_amount), 0)
    FROM quotes
    WHERE client_id = COALESCE(NEW.client_id, OLD.client_id)
      AND status IN ('sent', 'accepted')
  )
  WHERE id = COALESCE(NEW.client_id, OLD.client_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quotes_sync_total
  AFTER INSERT OR UPDATE OR DELETE ON quotes
  FOR EACH ROW EXECUTE FUNCTION sync_client_total_quoted();

-- ── INDEXES ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_clients_status        ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_follow_up     ON clients(follow_up_date);
CREATE INDEX IF NOT EXISTS idx_clients_staff         ON clients(assigned_staff_id);
CREATE INDEX IF NOT EXISTS idx_activities_client     ON activities(client_id);
CREATE INDEX IF NOT EXISTS idx_activities_created    ON activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_client         ON quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due             ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_staff           ON tasks(assigned_staff_id);

-- ── ROW LEVEL SECURITY (enable but allow all for now) ──────
ALTER TABLE staff            ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients          ENABLE ROW LEVEL SECURITY;
ALTER TABLE spouses          ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals        ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities       ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents        ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks            ENABLE ROW LEVEL SECURITY;
ALTER TABLE letter_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_lists      ENABLE ROW LEVEL SECURITY;

-- Permissive policies (tighten when auth is wired up)
CREATE POLICY "allow_all_staff"            ON staff            FOR ALL USING (true);
CREATE POLICY "allow_all_clients"          ON clients          FOR ALL USING (true);
CREATE POLICY "allow_all_spouses"          ON spouses          FOR ALL USING (true);
CREATE POLICY "allow_all_referrals"        ON referrals        FOR ALL USING (true);
CREATE POLICY "allow_all_quotes"           ON quotes           FOR ALL USING (true);
CREATE POLICY "allow_all_quote_items"      ON quote_line_items FOR ALL USING (true);
CREATE POLICY "allow_all_activities"       ON activities       FOR ALL USING (true);
CREATE POLICY "allow_all_documents"        ON documents        FOR ALL USING (true);
CREATE POLICY "allow_all_tasks"            ON tasks            FOR ALL USING (true);
CREATE POLICY "allow_all_letter_templates" ON letter_templates FOR ALL USING (true);
CREATE POLICY "allow_all_price_lists"      ON price_lists      FOR ALL USING (true);
