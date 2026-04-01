import Link from 'next/link'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { getOverdueClients, getDueTodayClients, getDueThisWeekClients, getDashboardStats } from '@/lib/db/clients'
import styles from './followup.module.css'

type ClientRow = Awaited<ReturnType<typeof getOverdueClients>>[number]

function fmt(n: number) {
  return Number(n) > 0
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(n))
    : ''
}

function ClientCard({ c, tag }: { c: ClientRow; tag: 'overdue' | 'today' | 'week' }) {
  const tagClass = tag === 'overdue' ? styles.tagOverdue : tag === 'today' ? styles.tagToday : styles.tagWeek
  const tagLabel = tag === 'overdue' ? 'OVERDUE' : tag === 'today' ? 'TODAY' : 'THIS WEEK'

  return (
    <Link href={`/clients/${c.id}`} className={styles.clientCard}>
      <div className={styles.cardTop}>
        <div className={styles.clientName}>{c.lastName}, {c.firstName}</div>
        <span className={`${styles.tag} ${tagClass}`}>{tagLabel}</span>
      </div>
      <div className={styles.clientNote}>{c.notes?.split('.')[0]}</div>
      <div className={styles.clientMeta}>
        <span>{c.staff?.name ?? 'Unassigned'}</span>
        {Number(c.totalQuoted) > 0 && <span className={styles.amount}>{fmt(Number(c.totalQuoted))}</span>}
      </div>
      {c.followUpDate && (
        <div className={styles.dueDate}>
          📅 {new Date(c.followUpDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      )}
    </Link>
  )
}

export default async function FollowUpPage() {
  const [overdue, today, week, stats] = await Promise.all([
    getOverdueClients(),
    getDueTodayClients(),
    getDueThisWeekClients(),
    getDashboardStats(),
  ])

  return (
    <div className={styles.app}>
      <Sidebar overdueCount={stats.overdue} openQuotesCount={stats.open_quotes} />
      <main className={styles.main}>
        <Topbar title="Follow-Up Dashboard" />
        <div className={styles.body}>
          <div className={styles.grid}>

            <div className={styles.column}>
              <div className={`${styles.colHeader} ${styles.colRed}`}>
                ⚠️ Overdue <span className={styles.count}>{overdue.length}</span>
              </div>
              {overdue.length === 0 && <div className={styles.empty}>No overdue follow-ups 🎉</div>}
              {overdue.map(c => <ClientCard key={c.id} c={c} tag="overdue" />)}
            </div>

            <div className={styles.column}>
              <div className={`${styles.colHeader} ${styles.colAmber}`}>
                📅 Due Today <span className={styles.count}>{today.length}</span>
              </div>
              {today.length === 0 && <div className={styles.empty}>Nothing due today</div>}
              {today.map(c => <ClientCard key={c.id} c={c} tag="today" />)}
            </div>

            <div className={styles.column}>
              <div className={`${styles.colHeader} ${styles.colNavy}`}>
                📆 This Week <span className={styles.count}>{week.length}</span>
              </div>
              {week.length === 0 && <div className={styles.empty}>Nothing due this week</div>}
              {week.map(c => <ClientCard key={c.id} c={c} tag="week" />)}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
