import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── STAFF ────────────────────────────────────────────────
  const heflin = await prisma.staff.upsert({
    where: { email: 'rheflin@humphreyfuneral.com' },
    update: {},
    create: { name: 'Robert Heflin', initials: 'RH', email: 'rheflin@humphreyfuneral.com', role: 'Pre-Need Counselor' },
  })
  const myers = await prisma.staff.upsert({
    where: { email: 'mmyers@humphreyfuneral.com' },
    update: {},
    create: { name: 'Matthew Myers', initials: 'MM', email: 'mmyers@humphreyfuneral.com', role: 'Pre-Need Counselor' },
  })
  await prisma.staff.upsert({
    where: { email: 'jimbob@humphreyfuneral.com' },
    update: {},
    create: { name: 'Jim Bob Humphrey', initials: 'JH', email: 'jimbob@humphreyfuneral.com', role: 'Owner & CEO' },
  })
  await prisma.staff.upsert({
    where: { email: 'james@humphreyfuneral.com' },
    update: {},
    create: { name: 'James Humphrey', initials: 'JA', email: 'james@humphreyfuneral.com', role: 'President' },
  })
  console.log('✅ Staff seeded')

  // ── REFERRALS ────────────────────────────────────────────
  const charlieCase = await prisma.referral.create({
    data: { name: 'Charlie Case', relationship: 'Community partner — insurance agent', referralCount: 8, notes: 'Top referral source.' },
  })
  const veterans = await prisma.referral.create({
    data: { name: 'Pope County Veterans Service Office', relationship: 'Veteran referral partner', referralCount: 5 },
  })
  console.log('✅ Referrals seeded')

  // ── CLIENTS ──────────────────────────────────────────────
  const smith = await prisma.client.create({
    data: {
      firstName: 'Jim', lastName: 'Smith', honorific: 'Mr.',
      status: 'quoted', contactType: ['combination'],
      source: 'referral',
      assignedStaffId: heflin.id, referralSourceId: charlieCase.id,
      mobilePhone: '(479) 555-0101', email: 'jsmith@email.com',
      city: 'Russellville', state: 'AR', zip: '72801',
      followUpDate: new Date(Date.now() - 3 * 86400000),
      priority: 'high', totalQuoted: 18400,
      notes: 'Referred by Charlie Case. Combination package — traditional + cemetery lot. Quote sent 3/29.',
      spouse: { create: { firstName: 'Mary', lastName: 'Smith', honorific: 'Mrs.', mobilePhone: '(479) 555-0110' } },
    },
  })

  const turner = await prisma.client.create({
    data: {
      firstName: 'Patricia', lastName: 'Turner', honorific: 'Mrs.',
      status: 'contacted', contactType: ['pre_need_traditional'],
      source: 'retired_teacher', assignedStaffId: heflin.id,
      mobilePhone: '(479) 555-0202', email: 'pturner@email.com',
      city: 'Russellville', state: 'AR', zip: '72801',
      followUpDate: new Date(Date.now() - 2 * 86400000),
      priority: 'high',
      notes: 'Retired teacher outreach. Left voicemail 3/28. No response yet.',
    },
  })

  const moore = await prisma.client.create({
    data: {
      firstName: 'Gerald', lastName: 'Moore', honorific: 'Mr.',
      status: 'contacted', contactType: ['pre_need_cremation'],
      source: 'phone_inquiry', assignedStaffId: myers.id,
      mobilePhone: '(479) 555-0303',
      city: 'Clarksville', state: 'AR', zip: '72830',
      followUpDate: new Date(Date.now() - 1 * 86400000),
      priority: 'high',
      notes: 'Called in about cremation package pricing. Appointment confirmation still needed.',
    },
  })

  const today = new Date(); today.setHours(0, 0, 0, 0)

  const johnson = await prisma.client.create({
    data: {
      firstName: 'Earl', lastName: 'Johnson', honorific: 'Mr.',
      status: 'contacted', contactType: ['veteran', 'cemetery_plot'],
      source: 'veteran_outreach', assignedStaffId: heflin.id,
      referralSourceId: veterans.id,
      mobilePhone: '(479) 555-0404', email: 'ejohnson@email.com',
      city: 'Russellville', state: 'AR', zip: '72801',
      followUpDate: today, priority: 'normal', totalQuoted: 5295,
      notes: 'Veteran interested in Field of Honor section. 2 spaces + 2 markers + perpetual care = $5,295.',
    },
  })

  await prisma.client.create({
    data: {
      firstName: 'Dorothy', lastName: 'Williams', honorific: 'Mrs.',
      status: 'prospect', contactType: ['pre_need_traditional'],
      source: 'retired_teacher', assignedStaffId: heflin.id,
      mobilePhone: '(479) 555-0505', email: 'dwilliams@email.com',
      city: 'Atkins', state: 'AR', zip: '72823',
      followUpDate: today, priority: 'normal',
      notes: 'Retired teachers outreach letter recipient. Initial contact today.',
    },
  })

  const harrison = await prisma.client.create({
    data: {
      firstName: 'Carl', lastName: 'Harrison', honorific: 'Mr.',
      status: 'signed', contactType: ['combination', 'cemetery_plot'],
      source: 'referral', assignedStaffId: heflin.id,
      referralSourceId: charlieCase.id,
      mobilePhone: '(479) 555-0606', email: 'charrison@email.com',
      city: 'Russellville', state: 'AR', zip: '72801',
      priority: 'normal', totalQuoted: 24100,
      notes: 'Contract signed. Pre-Need Traditional + Cemetery lot. Total $24,100.',
      spouse: { create: { firstName: 'Evelyn', lastName: 'Harrison', honorific: 'Mrs.', mobilePhone: '(479) 555-0660' } },
    },
  })

  await prisma.client.create({
    data: {
      firstName: 'Robert', lastName: 'Davis', honorific: 'Mr.',
      status: 'contacted', contactType: ['veteran', 'pre_need_traditional'],
      source: 'veteran_outreach', assignedStaffId: heflin.id,
      referralSourceId: veterans.id,
      mobilePhone: '(479) 555-0707',
      city: 'Dardanelle', state: 'AR', zip: '72834',
      followUpDate: new Date(Date.now() + 3 * 86400000), priority: 'normal',
      notes: 'Veterans outreach mail merge recipient. Called and expressed interest.',
    },
  })

  const thompson = await prisma.client.create({
    data: {
      firstName: 'James', lastName: 'Thompson', honorific: 'Mr.',
      status: 'quoted', contactType: ['cemetery_plot', 'pre_need_traditional'],
      source: 'walk_in', assignedStaffId: myers.id,
      mobilePhone: '(479) 555-0909', email: 'jthompson@email.com',
      city: 'Russellville', state: 'AR', zip: '72801',
      followUpDate: new Date(Date.now() + 2 * 86400000), priority: 'normal', totalQuoted: 14800,
      notes: 'Walk-in. Cemetery lot + pre-need combo. Quote sent.',
      spouse: { create: { firstName: 'Ruth', lastName: 'Thompson', honorific: 'Mrs.', mobilePhone: '(479) 555-0990' } },
    },
  })

  const clark = await prisma.client.create({
    data: {
      firstName: 'Helen', lastName: 'Clark', honorific: 'Mrs.',
      status: 'signed', contactType: ['pre_need_cremation'],
      source: 'referral', assignedStaffId: heflin.id,
      referralSourceId: charlieCase.id,
      mobilePhone: '(479) 555-1001',
      city: 'Russellville', state: 'AR', zip: '72801',
      priority: 'normal', totalQuoted: 8900,
      notes: 'Contract signed. Cremation package. Referred by Charlie Case.',
    },
  })
  console.log('✅ Clients seeded')

  // ── QUOTES ───────────────────────────────────────────────
  await prisma.quote.create({
    data: {
      clientId: smith.id, status: 'sent', subtotal: 18900, discount: 500, totalAmount: 18400,
      createdById: heflin.id,
      notes: 'Combination package: traditional services + Section 1 cemetery lot + marker.',
      lineItems: {
        create: [
          { description: 'Professional Services',     category: 'services',   quantity: 1, unitPrice: 4500, total: 4500 },
          { description: 'Embalming',                  category: 'services',   quantity: 1, unitPrice: 850,  total: 850  },
          { description: 'Use of Facilities & Staff',  category: 'services',   quantity: 1, unitPrice: 1200, total: 1200 },
          { description: 'Casket — Bronze 20 Gauge',   category: 'merchandise',quantity: 1, unitPrice: 4800, total: 4800 },
          { description: 'Grave Liner',                category: 'merchandise',quantity: 1, unitPrice: 1200, total: 1200 },
          { description: 'Cemetery Lot — Section 1',   category: 'cemetery',   quantity: 1, unitPrice: 2400, total: 2400 },
          { description: 'Perpetual Care',             category: 'cemetery',   quantity: 1, unitPrice: 600,  total: 600  },
          { description: 'Companion Granite Marker',   category: 'cemetery',   quantity: 1, unitPrice: 2850, total: 2850 },
          { description: 'Death Certificates (5)',     category: 'services',   quantity: 5, unitPrice: 30,   total: 150  },
        ],
      },
    },
  })

  await prisma.quote.create({
    data: {
      clientId: johnson.id, status: 'sent', subtotal: 5295, discount: 0, totalAmount: 5295,
      createdById: heflin.id,
      notes: 'Veterans Field of Honor: 2 spaces + 2 markers + perpetual care.',
      lineItems: {
        create: [
          { description: 'Veterans Section — 2 Lots',  category: 'cemetery', quantity: 2, unitPrice: 1800,   total: 3600   },
          { description: 'Perpetual Care (2 lots)',     category: 'cemetery', quantity: 2, unitPrice: 300,    total: 600    },
          { description: 'Flat Granite Markers (2)',    category: 'cemetery', quantity: 2, unitPrice: 547.50, total: 1095   },
        ],
      },
    },
  })

  await prisma.quote.create({
    data: {
      clientId: harrison.id, status: 'accepted', subtotal: 24500, discount: 400, totalAmount: 24100,
      createdById: heflin.id, notes: 'Contract signed.',
    },
  })

  await prisma.quote.create({
    data: {
      clientId: thompson.id, status: 'sent', subtotal: 14800, discount: 0, totalAmount: 14800,
      createdById: myers.id, notes: 'Cemetery lot + Traditional pre-need package.',
    },
  })

  await prisma.quote.create({
    data: {
      clientId: clark.id, status: 'accepted', subtotal: 8900, discount: 0, totalAmount: 8900,
      createdById: heflin.id, notes: 'Cremation package. Contract signed.',
    },
  })
  console.log('✅ Quotes seeded')

  // ── ACTIVITIES ───────────────────────────────────────────
  const activities = [
    { clientId: harrison.id, type: 'contract_signed', note: 'Contract signed. Pre-Need Traditional + Cemetery lot. Total: $24,100.', staffId: heflin.id, hoursAgo: 2 },
    { clientId: johnson.id,  type: 'intake',          note: 'New intake added via Mobile Form. Veteran interest — Field of Honor section.', staffId: heflin.id, hoursAgo: 27 },
    { clientId: smith.id,    type: 'quote_sent',       note: 'Quote sent: $18,400. Combination package — Traditional + Cemetery lot.', staffId: heflin.id, hoursAgo: 54 },
    { clientId: turner.id,   type: 'call',             note: 'No answer on follow-up call. Left voicemail. Marked overdue.', staffId: heflin.id, hoursAgo: 75 },
    { clientId: clark.id,    type: 'contract_signed',  note: 'Contract signed. Cremation package $8,900.', staffId: heflin.id, hoursAgo: 1080 },
  ]
  for (const a of activities) {
    const { hoursAgo, ...data } = a
    await prisma.activity.create({
      data: { ...data, createdAt: new Date(Date.now() - hoursAgo * 3600000) },
    })
  }
  console.log('✅ Activities seeded')

  // ── LETTER TEMPLATES ─────────────────────────────────────
  await prisma.letterTemplate.createMany({
    data: [
      { name: 'Veterans Outreach',  type: 'veterans',         content: '{{Date}}\n\nDear {{Title}} {{LastName}},\n\nOn behalf of Humphrey Funeral Service and Center Valley Memorial Gardens, we want to express our deepest gratitude for your service...\n\n{{Staff}}\nHumphrey Funeral Service, Inc.\n2801 W. Main St., Russellville, AR 72801\n(479) 968-2281' },
      { name: 'Retired Teachers',   type: 'retired_teachers', content: '{{Date}}\n\nDear {{Title}} {{LastName}},\n\nAs a retired educator, you have dedicated your life to shaping futures...\n\n{{Staff}}\nHumphrey Funeral Service, Inc.\n2801 W. Main St., Russellville, AR 72801' },
      { name: 'General Senior',     type: 'senior',           content: '{{Date}}\n\nDear {{Title}} {{LastName}},\n\nHumphrey Funeral Service and Center Valley Memorial Gardens have been honored to serve the families of Pope County for generations...\n\n{{Staff}}\nHumphrey Funeral Service, Inc.' },
      { name: 'Follow-Up',          type: 'follow_up',        content: '{{Date}}\n\nDear {{Title}} {{LastName}},\n\nThank you for taking the time to visit with us recently. We wanted to follow up...\n\n{{Staff}}\nHumphrey Funeral Service, Inc.' },
      { name: 'Quote Cover Letter', type: 'quote_cover',      content: '{{Date}}\n\nDear {{Title}} {{LastName}},\n\nThank you for giving us the opportunity to prepare a personalized pre-need planning proposal...\n\n{{Staff}}\nHumphrey Funeral Service, Inc.' },
    ],
  })
  console.log('✅ Letter templates seeded')

  // ── PRICE LISTS ──────────────────────────────────────────
  await prisma.priceList.createMany({
    data: [
      { name: 'HFS General Price List 2026',                type: 'general'     },
      { name: 'HFS Casket Price List 2026',                 type: 'casket'      },
      { name: 'CVMG Cemetery Price List 2026',              type: 'cemetery'    },
      { name: 'HFS PreNeed Contract Form',                  type: 'general'     },
      { name: 'HFS Outer Burial Container Price List 2026', type: 'outer_burial'},
    ],
  })
  console.log('✅ Price lists seeded')

  console.log('\n🎉 Database seeded successfully!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
