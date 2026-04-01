import Link from 'next/link'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { getClients, getDashboardStats } from '@/lib/db/clients'
import styles from './clients.module.css'

function fmt(n: number) {
  return Number(n) > 0
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(n))
    : '—'
}

const STATUS_COLORS: Record<string, string> = {
  prospect: styles.sProspect,
  contacted: styles.sContacted,
  quoted: styles.sQuoted,
  signed: styles.sSigned,
  lost: styles.sLost,
}

const STATUS_LABELS: Record<string, string> = {
  prospect: 'Prospect', contacted: 'Contacted', quoted: 'Quoted', signed: 'Signed', lost: 'Lost',
}

export default async function ClientsPage() {
  const [clients, stats] = await Promise.all([getClients(), getDashboardStats()])

  return (
    <div className={styles.app}>
      <Sidebar overdueCount={stats.overdue} openQuotesCount={stats.open_quotes} />
      <main className={styles.main}>
        <Topbar title="All Clients" subtitle={`${clients.length} clients in pipeline`} />
        <div className={styles.body}>

          <div className={styles.toolbar}>
            <input className={styles.search} type="text" placeholder="Search clients..." />
            <Link href="/clients/new" className={styles.btnPrimary}>+ Add Client</Link>
          </div>

          <div className={styles.card}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Follow-Up</th>
                  <th>Staff</th>
                  <th>Total Quoted</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(c => (
                  <tr key={c.id}>
                    <td>
                      <Link href={`/clients/${c.id}`} className={styles.clientLink}>
                        <span className={styles.avatar}>
                          {`${c.firstName[0] ?? ''}${c.lastName[0] ?? ''}`.toUpperCase()}
                        </span>
                        <div>
                          <div className={styles.clientName}>{c.lastName}, {c.firstName}</div>
                          <div className={styles.clientCity}>{c.city}, {c.state}</div>
                        </div>
                      </Link>
                    </td>
                    <td className={styles.typeCell}>
                      {c.contactType.slice(0, 2).map(t => (
                        <span key={t} className={styles.typeChip}>
                          {t.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </td>
                    <td className={styles.sourceCell}>{c.source?.replace(/_/g, ' ') ?? '—'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${STATUS_COLORS[c.status] ?? ''}`}>
                        {STATUS_LABELS[c.status] ?? c.status}
                      </span>
                    </td>
                    <td className={styles.dateCell}>
                      {c.followUpDate
                        ? new Date(c.followUpDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : '—'}
                    </td>
                    <td className={styles.staffCell}>{c.staff?.initials ?? '—'}</td>
                    <td className={styles.amountCell}>{fmt(Number(c.totalQuoted))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  )
}
