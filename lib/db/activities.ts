import { prisma } from '../prisma'

export async function getRecentActivities(limit = 10) {
  return prisma.activity.findMany({
    include: {
      client: { select: { id: true, firstName: true, lastName: true } },
      staff:  { select: { id: true, name: true, initials: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

export async function getClientActivities(clientId: string) {
  return prisma.activity.findMany({
    where: { clientId },
    include: { staff: { select: { id: true, name: true, initials: true } } },
    orderBy: { createdAt: 'desc' },
  })
}

export async function logActivity(data: {
  clientId: string
  type: string
  note?: string
  staffId?: string
}) {
  return prisma.activity.create({ data })
}
