-- ============================================================
-- HFS / CVMG Pre-Need CRM — Seed Data
-- Matches the data previously hardcoded in the HTML prototype
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- ── STAFF ──────────────────────────────────────────────────
INSERT INTO staff (id, name, initials, email, role) VALUES
  ('aaaaaaaa-0001-0000-0000-000000000001', 'Robert Heflin',   'RH', 'rheflin@humphreyfuneral.com',  'Pre-Need Counselor'),
  ('aaaaaaaa-0002-0000-0000-000000000002', 'Matthew Myers',   'MM', 'mmyers@humphreyfuneral.com',   'Pre-Need Counselor'),
  ('aaaaaaaa-0003-0000-0000-000000000003', 'Jim Bob Humphrey','JH', 'jimbob@humphreyfuneral.com',   'Owner & CEO'),
  ('aaaaaaaa-0004-0000-0000-000000000004', 'James Humphrey',  'JA', 'james@humphreyfuneral.com',    'President')
ON CONFLICT (id) DO NOTHING;

-- ── REFERRAL SOURCES ───────────────────────────────────────
INSERT INTO referrals (id, name, relationship, referral_count, notes) VALUES
  ('bbbbbbbb-0001-0000-0000-000000000001', 'Charlie Case', 'Community partner — insurance agent', 8, 'Top referral source. Close relationship with Heflin. Refer all veterans outreach.'),
  ('bbbbbbbb-0002-0000-0000-000000000002', 'First Baptist Church Russellville', 'Community partner — church', 3, 'Pastor connection via Jim Bob. Good senior outreach pipeline.'),
  ('bbbbbbbb-0003-0000-0000-000000000003', 'Pope County Veterans Service Office', 'Veteran referral partner', 5, 'Field of Honor section leads.')
ON CONFLICT (id) DO NOTHING;

-- ── CLIENTS ────────────────────────────────────────────────
INSERT INTO clients (
  id, first_name, last_name, honorific, status, contact_type,
  source, assigned_staff_id, referral_source_id,
  mobile_phone, email, city, state, zip,
  follow_up_date, priority, total_quoted, notes, created_at
) VALUES

  -- Smith, Jim & Mary — Couple, Referred by Charlie Case, Quoted $18,400
  ('cccccccc-0001-0000-0000-000000000001',
   'Jim', 'Smith', 'Mr.',
   'quoted', ARRAY['combination'],
   'referral',
   'aaaaaaaa-0001-0000-0000-000000000001',
   'bbbbbbbb-0001-0000-0000-000000000001',
   '(479) 555-0101', 'jsmith@email.com',
   'Russellville', 'AR', '72801',
   CURRENT_DATE - 3, 'high', 18400,
   'Referred by Charlie Case. Interested in combination package — traditional + cemetery lot. Quote sent 3/29.',
   NOW() - INTERVAL '14 days'),

  -- Turner, Patricia — Individual, Pre-Need Traditional, No response
  ('cccccccc-0002-0000-0000-000000000002',
   'Patricia', 'Turner', 'Mrs.',
   'contacted', ARRAY['pre_need_traditional'],
   'retired_teacher',
   'aaaaaaaa-0001-0000-0000-000000000001',
   NULL,
   '(479) 555-0202', 'pturner@email.com',
   'Russellville', 'AR', '72801',
   CURRENT_DATE - 2, 'high', 0,
   'Retired teacher outreach. Left voicemail 3/28. No response yet.',
   NOW() - INTERVAL '10 days'),

  -- Moore, Gerald — Pre-Need Cremation, Appointment needed
  ('cccccccc-0003-0000-0000-000000000003',
   'Gerald', 'Moore', 'Mr.',
   'contacted', ARRAY['pre_need_cremation'],
   'phone_inquiry',
   'aaaaaaaa-0002-0000-0000-000000000002',
   NULL,
   '(479) 555-0303', NULL,
   'Clarksville', 'AR', '72830',
   CURRENT_DATE - 1, 'high', 0,
   'Called in about cremation package pricing. Appointment confirmation still needed.',
   NOW() - INTERVAL '7 days'),

  -- Johnson, Earl — Veteran, Field of Honor
  ('cccccccc-0004-0000-0000-000000000004',
   'Earl', 'Johnson', 'Mr.',
   'contacted', ARRAY['veteran', 'cemetery_plot'],
   'veteran_outreach',
   'aaaaaaaa-0001-0000-0000-000000000001',
   'bbbbbbbb-0003-0000-0000-000000000003',
   '(479) 555-0404', 'ejohnson@email.com',
   'Russellville', 'AR', '72801',
   CURRENT_DATE, 'normal', 5295,
   'Veteran interested in Field of Honor section. 2 spaces + 2 markers + perpetual care = $5,295.',
   NOW() - INTERVAL '3 days'),

  -- Williams, Dorothy — Retired Teacher, Prospect
  ('cccccccc-0005-0000-0000-000000000005',
   'Dorothy', 'Williams', 'Mrs.',
   'prospect', ARRAY['pre_need_traditional'],
   'retired_teacher',
   'aaaaaaaa-0001-0000-0000-000000000001',
   NULL,
   '(479) 555-0505', 'dwilliams@email.com',
   'Atkins', 'AR', '72823',
   CURRENT_DATE, 'normal', 0,
   'Retired teachers outreach letter recipient. Initial contact today.',
   NOW() - INTERVAL '1 day'),

  -- Harrison, Carl & Evelyn — Signed, Combination Package
  ('cccccccc-0006-0000-0000-000000000006',
   'Carl', 'Harrison', 'Mr.',
   'signed', ARRAY['combination', 'cemetery_plot'],
   'referral',
   'aaaaaaaa-0001-0000-0000-000000000001',
   'bbbbbbbb-0001-0000-0000-000000000001',
   '(479) 555-0606', 'charrison@email.com',
   'Russellville', 'AR', '72801',
   NULL, 'normal', 24100,
   'Contract signed today. Pre-Need Traditional + Cemetery lot. Total $24,100.',
   NOW() - INTERVAL '30 days'),

  -- Davis, Robert — Veteran, Contacted
  ('cccccccc-0007-0000-0000-000000000007',
   'Robert', 'Davis', 'Mr.',
   'contacted', ARRAY['veteran', 'pre_need_traditional'],
   'veteran_outreach',
   'aaaaaaaa-0001-0000-0000-000000000001',
   'bbbbbbbb-0003-0000-0000-000000000003',
   '(479) 555-0707', NULL,
   'Dardanelle', 'AR', '72834',
   CURRENT_DATE + 3, 'normal', 0,
   'Veterans outreach mail merge recipient. Called and expressed interest. Follow-up scheduled this week.',
   NOW() - INTERVAL '5 days'),

  -- Anderson, Betty — Prospect, Senior Outreach
  ('cccccccc-0008-0000-0000-000000000008',
   'Betty', 'Anderson', 'Mrs.',
   'prospect', ARRAY['pre_need_cremation'],
   'senior_outreach',
   'aaaaaaaa-0002-0000-0000-000000000002',
   NULL,
   '(479) 555-0808', NULL,
   'Russellville', 'AR', '72801',
   CURRENT_DATE + 5, 'low', 0,
   'Senior outreach list. Interested in cremation package. Needs initial contact.',
   NOW() - INTERVAL '2 days'),

  -- Thompson, James & Ruth — Quoted, Cemetery Focus
  ('cccccccc-0009-0000-0000-000000000009',
   'James', 'Thompson', 'Mr.',
   'quoted', ARRAY['cemetery_plot', 'pre_need_traditional'],
   'walk_in',
   'aaaaaaaa-0002-0000-0000-000000000002',
   NULL,
   '(479) 555-0909', 'jthompson@email.com',
   'Russellville', 'AR', '72801',
   CURRENT_DATE + 2, 'normal', 14800,
   'Walk-in. Interested in cemetery lot + pre-need combo. Quote sent.',
   NOW() - INTERVAL '8 days'),

  -- Clark, Helen — Signed
  ('cccccccc-0010-0000-0000-000000000010',
   'Helen', 'Clark', 'Mrs.',
   'signed', ARRAY['pre_need_cremation'],
   'referral',
   'aaaaaaaa-0001-0000-0000-000000000001',
   'bbbbbbbb-0001-0000-0000-000000000001',
   '(479) 555-1001', NULL,
   'Russellville', 'AR', '72801',
   NULL, 'normal', 8900,
   'Contract signed. Cremation package. Referred by Charlie Case.',
   NOW() - INTERVAL '45 days')

ON CONFLICT (id) DO NOTHING;

-- ── SPOUSES ────────────────────────────────────────────────
INSERT INTO spouses (client_id, first_name, last_name, honorific, mobile_phone) VALUES
  ('cccccccc-0001-0000-0000-000000000001', 'Mary', 'Smith', 'Mrs.', '(479) 555-0110'),
  ('cccccccc-0006-0000-0000-000000000006', 'Evelyn', 'Harrison', 'Mrs.', '(479) 555-0660'),
  ('cccccccc-0009-0000-0000-000000000009', 'Ruth', 'Thompson', 'Mrs.', '(479) 555-0990');

-- ── QUOTES ─────────────────────────────────────────────────
INSERT INTO quotes (id, client_id, status, subtotal, discount, total_amount, notes, created_by) VALUES
  ('dddddddd-0001-0000-0000-000000000001',
   'cccccccc-0001-0000-0000-000000000001',
   'sent', 18900, 500, 18400,
   'Combination package: traditional services + Section 1 cemetery lot + marker.',
   'aaaaaaaa-0001-0000-0000-000000000001'),

  ('dddddddd-0002-0000-0000-000000000002',
   'cccccccc-0004-0000-0000-000000000004',
   'sent', 5295, 0, 5295,
   'Veterans Field of Honor: 2 spaces + 2 markers + perpetual care.',
   'aaaaaaaa-0001-0000-0000-000000000001'),

  ('dddddddd-0003-0000-0000-000000000003',
   'cccccccc-0006-0000-0000-000000000006',
   'accepted', 24500, 400, 24100,
   'Combination: Traditional pre-need + Section 1 cemetery lot. Contract signed.',
   'aaaaaaaa-0001-0000-0000-000000000001'),

  ('dddddddd-0004-0000-0000-000000000004',
   'cccccccc-0009-0000-0000-000000000009',
   'sent', 14800, 0, 14800,
   'Cemetery lot + Traditional pre-need package.',
   'aaaaaaaa-0002-0000-0000-000000000002'),

  ('dddddddd-0005-0000-0000-000000000005',
   'cccccccc-0010-0000-0000-000000000010',
   'accepted', 8900, 0, 8900,
   'Cremation package. Contract signed.',
   'aaaaaaaa-0001-0000-0000-000000000001')

ON CONFLICT (id) DO NOTHING;

-- ── QUOTE LINE ITEMS ───────────────────────────────────────
INSERT INTO quote_line_items (quote_id, description, category, quantity, unit_price, total) VALUES
  -- Smith combination quote
  ('dddddddd-0001-0000-0000-000000000001', 'Professional Services', 'services', 1, 4500, 4500),
  ('dddddddd-0001-0000-0000-000000000001', 'Embalming', 'services', 1, 850, 850),
  ('dddddddd-0001-0000-0000-000000000001', 'Use of Facilities & Staff', 'services', 1, 1200, 1200),
  ('dddddddd-0001-0000-0000-000000000001', 'Casket — Bronze 20 Gauge', 'merchandise', 1, 4800, 4800),
  ('dddddddd-0001-0000-0000-000000000001', 'Grave Liner', 'merchandise', 1, 1200, 1200),
  ('dddddddd-0001-0000-0000-000000000001', 'Cemetery Lot — Section 1', 'cemetery', 1, 2400, 2400),
  ('dddddddd-0001-0000-0000-000000000001', 'Perpetual Care', 'cemetery', 1, 600, 600),
  ('dddddddd-0001-0000-0000-000000000001', 'Companion Granite Marker', 'cemetery', 1, 2850, 2850),
  ('dddddddd-0001-0000-0000-000000000001', 'Death Certificates (5)', 'services', 5, 30, 150),

  -- Johnson veteran quote
  ('dddddddd-0002-0000-0000-000000000002', 'Veterans Section — 2 Lots', 'cemetery', 2, 1800, 3600),
  ('dddddddd-0002-0000-0000-000000000002', 'Perpetual Care (2 lots)', 'cemetery', 2, 300, 600),
  ('dddddddd-0002-0000-0000-000000000002', 'Flat Granite Markers (2)', 'cemetery', 2, 547.50, 1095);

-- ── ACTIVITIES ─────────────────────────────────────────────
INSERT INTO activities (client_id, type, note, staff_id, created_at) VALUES
  -- Harrison signed
  ('cccccccc-0006-0000-0000-000000000006', 'contract_signed',
   'Contract signed. Pre-Need Traditional + Cemetery lot. Total: $24,100.',
   'aaaaaaaa-0001-0000-0000-000000000001', NOW() - INTERVAL '2 hours'),

  -- Johnson intake
  ('cccccccc-0004-0000-0000-000000000004', 'intake',
   'New intake added via Mobile Form. Veteran interest — Field of Honor section.',
   'aaaaaaaa-0001-0000-0000-000000000001', NOW() - INTERVAL '1 day 3 hours'),

  -- Smith quote sent
  ('cccccccc-0001-0000-0000-000000000001', 'quote_sent',
   'Quote sent: $18,400. Combination package — Traditional + Cemetery lot.',
   'aaaaaaaa-0001-0000-0000-000000000001', NOW() - INTERVAL '2 days 6 hours'),

  -- Turner no answer
  ('cccccccc-0002-0000-0000-000000000002', 'call',
   'No answer on follow-up call. Left voicemail. Marked overdue.',
   'aaaaaaaa-0001-0000-0000-000000000001', NOW() - INTERVAL '3 days 3 hours'),

  -- Davis initial call
  ('cccccccc-0007-0000-0000-000000000007', 'call',
   'Called after Veterans outreach mail merge. Expressed strong interest.',
   'aaaaaaaa-0001-0000-0000-000000000001', NOW() - INTERVAL '5 days'),

  -- Clark signed (older)
  ('cccccccc-0010-0000-0000-000000000010', 'contract_signed',
   'Contract signed. Cremation package $8,900.',
   'aaaaaaaa-0001-0000-0000-000000000001', NOW() - INTERVAL '45 days');

-- ── LETTER TEMPLATES ───────────────────────────────────────
INSERT INTO letter_templates (name, type, content) VALUES
  ('Veterans Outreach', 'veterans',
   E'{{Date}}\n\nDear {{Title}} {{LastName}},\n\nOn behalf of Humphrey Funeral Service and Center Valley Memorial Gardens, we want to express our deepest gratitude for your service to our country. As veterans ourselves and proud members of the Russellville community, we hold a special place in our hearts for those who have sacrificed so much.\n\nWe are reaching out to share information about our Field of Honor section at Center Valley Memorial Gardens — a dedicated, beautifully maintained area reserved exclusively for veterans and their spouses. We offer an affordable package designed with dignity and honor in mind.\n\nWe would welcome the opportunity to visit with you at your convenience — no obligation, simply an honest conversation about planning ahead.\n\nWith deepest respect,\n\n{{Staff}}\nHumphrey Funeral Service, Inc.\n2801 W. Main St., Russellville, AR 72801\n(479) 968-2281'),

  ('Retired Teachers', 'retired_teachers',
   E'{{Date}}\n\nDear {{Title}} {{LastName}},\n\nAs a retired educator, you have dedicated your life to shaping the futures of countless young people in our community. Humphrey Funeral Service and Center Valley Memorial Gardens are honored to serve families like yours in Pope County.\n\nWe are reaching out because many families in our community have found peace of mind by planning ahead — ensuring their wishes are clearly documented and that their loved ones are spared the burden of difficult decisions during an already emotional time.\n\nWe would love the opportunity to visit with you and share how our pre-need planning program works.\n\nWarm regards,\n\n{{Staff}}\nHumphrey Funeral Service, Inc.\n2801 W. Main St., Russellville, AR 72801\n(479) 968-2281'),

  ('General Senior', 'senior',
   E'{{Date}}\n\nDear {{Title}} {{LastName}},\n\nHumphrey Funeral Service and Center Valley Memorial Gardens have been honored to serve the families of Pope County for generations. We are writing to share information about our pre-need planning program — a thoughtful way to ensure your wishes are documented and your family is protected.\n\nPlanning ahead is one of the greatest gifts you can give your family. We make the process simple, personal, and completely flexible.\n\nWe would welcome the chance to visit with you at no obligation.\n\nSincerely,\n\n{{Staff}}\nHumphrey Funeral Service, Inc.\n2801 W. Main St., Russellville, AR 72801\n(479) 968-2281'),

  ('Follow-Up', 'follow_up',
   E'{{Date}}\n\nDear {{Title}} {{LastName}},\n\nThank you for taking the time to visit with us recently. We wanted to follow up and see if you have had a chance to review the information we shared.\n\nWe understand this is an important decision, and we are here to answer any questions you may have — at your own pace and with no pressure.\n\nPlease feel free to call us at (479) 968-2281 or simply reply to this letter.\n\nWarm regards,\n\n{{Staff}}\nHumphrey Funeral Service, Inc.\n2801 W. Main St., Russellville, AR 72801'),

  ('Quote Cover', 'quote_cover',
   E'{{Date}}\n\nDear {{Title}} {{LastName}},\n\nThank you for giving us the opportunity to prepare a personalized pre-need planning proposal for you. Enclosed please find your customized quote, which outlines the services and merchandise we discussed.\n\nThis quote is provided for your review and carries no obligation. Prices are guaranteed at today''s rates when the pre-need contract is executed.\n\nPlease call us at (479) 968-2281 with any questions. We look forward to hearing from you.\n\nSincerely,\n\n{{Staff}}\nHumphrey Funeral Service, Inc.\n2801 W. Main St., Russellville, AR 72801');

-- ── PRICE LISTS ────────────────────────────────────────────
INSERT INTO price_lists (name, type) VALUES
  ('HFS General Price List 2026', 'general'),
  ('HFS Casket Price List 2026', 'casket'),
  ('CVMG Cemetery Price List 2026', 'cemetery'),
  ('HFS PreNeed Contract Form', 'general'),
  ('HFS Outer Burial Container Price List 2026', 'outer_burial');
