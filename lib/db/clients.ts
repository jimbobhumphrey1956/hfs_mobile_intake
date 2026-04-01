import { prisma } from '../prisma'

const clientSelect = {
  id: true, firstName: true, lastName: true, honorific: true,
  status: true, contactType: true, source: true,
  followUpDate: true, priority: true, totalQuoted: true,
  notes: true, city: true, state: true,
  staff: { select: { id: true, name: true, initials: true } },
  referral: { select: { id: true, name: true } },
} as const

export async function getClients() {
  return prisma.client.findMany({
    select: {
      ...clientSelect,
      email: true, mobilePhone: true, street: true, zip: true,
      createdAt: true, updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  })
}

export async function getClientById(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      staff: true,
      referral: true,
      spouse: true,
      quotes: { include: { lineItems: true }, orderBy: { createdAt: 'desc' } },
      activities: {
        include: { staff: { select: { id: true, name: true, initials: true } } },
        orderBy: { createdAt: 'desc' },
      },
      documents: { orderBy: { uploadedAt: 'desc' } },
      tasks: { orderBy: { dueDate: 'asc' } },
    },
  })
}

export async function searchClients(query: string) {
  return prisma.client.findMany({
    where: {
      OR: [
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName:  { contains: query, mode: 'insensitive' } },
        { email:     { contains: query, mode: 'insensitive' } },
        { mobilePhone: { contains: query } },
      ],
    },
    select: clientSelect,
    orderBy: { lastName: 'asc' },
    take: 20,
  })
}

export async function getOverdueClients() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return prisma.client.findMany({
    where: {
      followUpDate: { lt: today },
      status: { notIn: ['signed', 'lost'] },
    },
    select: clientSelect,
    orderBy: { followUpDate: 'asc' },
  })
}

export async function getDueTodayClients() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return prisma.client.findMany({
    where: { followUpDate: { gte: today, lt: tomorrow } },
    select: clientSelect,
    orderBy: { priority: 'desc' },
  })
}

export async function getDueThisWeekClients() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 8)
  return prisma.client.findMany({
    where: { followUpDate: { gte: tomorrow, lt: nextWeek } },
    select: clientSelect,
    orderBy: { followUpDate: 'asc' },
  })
}

export async function getRecentClients(limit = 8) {
  return prisma.client.findMany({
    select: clientSelect,
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

export async function getDashboardStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [overdue, dueToday, activeClients, openQuotes, pipelineAgg] = await Promise.all([
    prisma.client.count({
      where: { followUpDate: { lt: today }, status: { notIn: ['signed', 'lost'] } },
    }),
    prisma.client.count({
      where: { followUpDate: { gte: today, lt: tomorrow } },
    }),
    prisma.client.count({
      where: { status: { not: 'lost' } },
    }),
    prisma.quote.count({
      where: { status: 'sent' },
    }),
    prisma.client.aggregate({
      where: { status: { not: 'lost' } },
      _sum: { totalQuoted: true },
    }),
  ])

  return {
    overdue,
    due_today: dueToday,
    active_clients: activeClients,
    open_quotes: openQuotes,
    pipeline_value: Number(pipelineAgg._sum.totalQuoted ?? 0),
  }
}

export async function createClient(data: Parameters<typeof prisma.client.create>[0]['data']) {
  return prisma.client.create({ data })
}

export async function updateClient(id: string, data: Parameters<typeof prisma.client.update>[0]['data']) {
  return prisma.client.update({ where: { id }, data })
}
