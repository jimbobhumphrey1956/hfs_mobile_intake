import { prisma } from '../prisma'

export async function getAllStaff() {
  return prisma.staff.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  })
}
