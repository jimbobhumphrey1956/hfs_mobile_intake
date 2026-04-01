import { prisma } from '../prisma'

export async function getPipelineByType() {
  const clients = await prisma.client.findMany({
    where: { status: { not: 'lost' } },
    select: { contactType: true, totalQuoted: true },
  })

  const buckets: Record<string, { label: string; value: number; count: number; color: string }> = {
    pre_need_traditional: { label: 'Pre-Need Traditional',    value: 0, count: 0, color: 'navy'  },
    cemetery_plot:        { label: 'Cemetery / CVMG',         value: 0, count: 0, color: 'gold'  },
    pre_need_cremation:   { label: 'Cremation Packages',      value: 0, count: 0, color: 'green' },
    veteran:              { label: 'Veterans / Field of Honor',value: 0, count: 0, color: 'red'   },
    combination:          { label: 'Combination Package',     value: 0, count: 0, color: 'navy'  },
  }

  for (const c of clients) {
    const types = c.contactType ?? []
    const value = Number(c.totalQuoted ?? 0)
    for (const t of types) {
      if (buckets[t]) {
        buckets[t].value += types.length > 0 ? value / types.length : 0
        buckets[t].count += 1
      }
    }
  }

  const total = Object.values(buckets).reduce((s, b) => s + b.value, 0)
  return Object.values(buckets)
    .filter(b => b.count > 0)
    .map(b => ({ ...b, percent: total > 0 ? Math.round((b.value / total) * 100) : 0 }))
    .sort((a, b) => b.value - a.value)
}

export async function getOpenQuotes() {
  return prisma.quote.findMany({
    where: { status: 'sent' },
    include: { client: { select: { id: true, firstName: true, lastName: true } } },
    orderBy: { createdAt: 'desc' },
  })
}
