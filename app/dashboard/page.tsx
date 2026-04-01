import Link from 'next/link'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { getDashboardStats, getOverdueClients, getDueTodayClients, getRecentClients } from '@/lib/db/clients'
import { getRecentActivities } from '@/lib/db/activities'
import { getPipelineByType } from '@/lib/db/quotes'
import styles from './dashboard.module.css'

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function initials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()
}

function statusLabel(s: string) {
  return ({ prospect: 'Prospect', contacted: 'Contacted', quoted: 'Quoted', signed: 'Signed', lost: 'Lost' } as Record<string, string>)[s] ?? s
}

function activityIcon(type: string) {
  const map: Record<string, string> = {
    call: '📞', note: '📝', email: '✉️', meeting: '🤝',
    quote_sent: '💰', contract_signed: '✅', intake: '📱',
    mail_merge: '📬', follow_up_scheduled: '📅',
  }
  return map[type] ?? '📌'
}

function relativeTime(date: Date) {
  const diff = Date.now() - date.getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default async function DashboardPage() {
  const [stats, overdue, dueToday, recent, activities, pipeline] = await Promise.all([
    getDashboardStats(),
    getOverdueClients(),
    getDueTodayClients(),
    getRecentClients(6),
    getRecentActivities(5),
    getPipelineByType(),
  ])

  const pipelineMax = pipeline[0]?.value ?? 1

  return (
    <div className={styles.app}>
      <Sidebar overdueCount={stats.overdue} openQuotesCount={stats.open_quotes} />

      <main className={styles.main}>
        <Topbar title="Operations Hub" />

        <div className={styles.body}>

          {/* Alert banner */}
          {stats.overdue > 0 && (
            <div className={styles.alertBanner}>
              ⚠️ <strong>{stats.overdue} overdue follow-up{stats.overdue !== 1 ? 's' : ''}</strong>
              {' '}require immediate attention
              {overdue.slice(0, 3).map(c => ` — ${c.lastName}, ${c.firstName}`).join('')}
              <Link href="/follow-up" className={styles.alertLink}>View All →</Link>
            </div>
          )}

          {/* Welcome */}
          <div className={styles.welcome}>
            <div className={styles.welcomeText}>
              <h2 className={styles.welcomeHeading}>Operations Hub</h2>
              <p className={styles.welcomeSub}>
                {stats.active_clients} active clients · {fmt(stats.pipeline_value)} quoted pipeline · {stats.due_today} follow-ups due today
              </p>
            </div>
            <div className={styles.welcomeActions}>
              <Link href="/clients" className={styles.btnGold}>Open Pre-Need CRM →</Link>
              <Link href="/follow-up" className={styles.btnOutline}>📅 Follow-Up Dashboard</Link>
            </div>
          </div>

          {/* KPI cards */}
          <div className={styles.sectionLabel}>KEY METRICS — TODAY</div>
          <div className={styles.kpiRow}>
            <div className={`${styles.kpiCard} ${styles.red}`}>
              <div className={styles.kpiLabel}>Overdue</div>
              <div className={styles.kpiValue}>{stats.overdue}</div>
              <div className={styles.kpiSub}>Need immediate follow-up</div>
            </div>
            <div className={`${styles.kpiCard} ${styles.gold}`}>
              <div className={styles.kpiLabel}>Due Today</div>
              <div className={styles.kpiValue}>{stats.due_today}</div>
              <div className={styles.kpiSub}>Follow-ups scheduled</div>
            </div>
            <div className={`${styles.kpiCard} ${styles.navy}`}>
              <div className={styles.kpiLabel}>Active Clients</div>
              <div className={styles.kpiValue}>{stats.active_clients}</div>
              <div className={styles.kpiSub}>In pre-need pipeline</div>
            </div>
            <div className={`${styles.kpiCard} ${styles.gold}`}>
              <div className={styles.kpiLabel}>Open Quotes</div>
              <div className={styles.kpiValue}>{stats.open_quotes}</div>
              <div className={styles.kpiSub}>Awaiting response</div>
            </div>
            <div className={`${styles.kpiCard} ${styles.green}`}>
              <div className={styles.kpiLabel}>Pipeline Value</div>
              <div className={`${styles.kpiValue} ${styles.kpiValueSm}`}>{fmt(stats.pipeline_value)}</div>
              <div className={styles.kpiSub}>Total quoted this quarter</div>
            </div>
          </div>

          {/* Module tiles */}
          <div className={styles.sectionLabel}>APPLICATIONS</div>
          <div className={styles.modulesGrid}>
            <Link href="/clients" className={`${styles.moduleTile} ${styles.tileNavy}`}>
              <div className={styles.moduleIcon}>📋</div>
              <div className={styles.moduleName}>Pre-Need CRM</div>
              <div className={styles.moduleDesc}>Client pipeline, follow-ups, quotes, mail merge, referrals, letter templates</div>
              <div className={`${styles.moduleStatus} ${styles.live}`}>● Live</div>
            </Link>
            <Link href="/clients/new" className={`${styles.moduleTile} ${styles.tileGold}`}>
              <div className={styles.moduleIcon}>📱</div>
              <div className={styles.moduleName}>New Client Intake</div>
              <div className={styles.moduleDesc}>Add a new prospect — contact info, type, source, assignment, notes</div>
              <div className={`${styles.moduleStatus} ${styles.live}`}>● Live</div>
            </Link>
            <div className={`${styles.moduleTile} ${styles.tileGreen} ${styles.disabled}`}>
              <div className={styles.moduleIcon}>👑</div>
              <div className={styles.moduleName}>JBH Command Post</div>
              <div className={styles.moduleDesc}>7-agent personal &amp; business dashboard — Owner, Finance, Cemetery, Marketing, Personal, Facilities, AI</div>
              <div className={`${styles.moduleStatus} ${styles.phase2}`}>⏳ Phase 2</div>
            </div>
            <div className={`${styles.moduleTile} ${styles.tileNavy} ${styles.disabled}`}>
              <div className={styles.moduleIcon}>⛪</div>
              <div className={styles.moduleName}>CVMG App</div>
              <div className={styles.moduleDesc}>Cemetery lot inventory, plot mapping, monument design, interment schedule</div>
              <div className={`${styles.moduleStatus} ${styles.phase2}`}>⏳ Phase 2</div>
            </div>
          </div>

          {/* Main content grid */}
          <div className={styles.contentGrid}>

            {/* Follow-ups */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>📅 Today&apos;s Follow-Ups</div>
                <Link href="/follow-up" className={styles.cardLink}>View All →</Link>
              </div>
              <div>
                {overdue.length === 0 && dueToday.length === 0 && (
                  <div className={styles.empty}>No follow-ups due — great work! 🎉</div>
                )}
                {overdue.map(c => (
                  <Link href={`/clients/${c.id}`} key={c.id} className={styles.followupItem}>
                    <div className={`${styles.dot} ${styles.dotRed}`} />
                    <div className={styles.followupInfo}>
                      <div className={styles.followupName}>{c.lastName}, {c.firstName}</div>
                      <div className={styles.followupNote}>{c.notes?.split('.')[0]}</div>
                      <div className={styles.followupMeta}>
                        {c.staff?.name ?? 'Unassigned'}
                        {Number(c.totalQuoted) > 0 ? ` · ${fmt(Number(c.totalQuoted))} quoted` : ''}
                      </div>
                    </div>
                    <span className={`${styles.tag} ${styles.tagOverdue}`}>OVERDUE</span>
                  </Link>
                ))}
                {dueToday.map(c => (
                  <Link href={`/clients/${c.id}`} key={c.id} className={styles.followupItem}>
                    <div className={`${styles.dot} ${styles.dotAmber}`} />
                    <div className={styles.followupInfo}>
                      <div className={styles.followupName}>{c.lastName}, {c.firstName}</div>
                      <div className={styles.followupNote}>{c.notes?.split('.')[0]}</div>
                      <div className={styles.followupMeta}>{c.staff?.name ?? 'Unassigned'}</div>
                    </div>
                    <span className={`${styles.tag} ${styles.tagToday}`}>TODAY</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className={styles.rightCol}>

              {/* Recent clients */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>👥 Recent Clients</div>
                  <Link href="/clients" className={styles.cardLink}>All {stats.active_clients} →</Link>
                </div>
                <div>
                  {recent.map(c => (
                    <Link href={`/clients/${c.id}`} key={c.id} className={styles.clientRow}>
                      <div className={styles.clientInitials}>{initials(c.firstName, c.lastName)}</div>
                      <div className={styles.clientInfo}>
                        <div className={styles.clientName}>{c.lastName}, {c.firstName}</div>
                        <div className={styles.clientMeta}>
                          {c.contactType.join(', ').replace(/_/g, ' ')}
                        </div>
                      </div>
                      <div className={styles.clientRight}>
                        {Number(c.totalQuoted) > 0 && (
                          <div className={styles.clientAmount}>{fmt(Number(c.totalQuoted))}</div>
                        )}
                        <div className={`${styles.clientStatus} ${styles[`status_${c.status}`]}`}>
                          {statusLabel(c.status)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pipeline */}
              {pipeline.length > 0 && (
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>📊 Pipeline by Type</div>
                  </div>
                  <div>
                    {pipeline.map(p => (
                      <div key={p.label} className={styles.pipelineItem}>
                        <div className={styles.pipelineRow}>
                          <span className={styles.pipelineLabel}>{p.label}</span>
                          <span className={styles.pipelineValue}>{fmt(p.value)}</span>
                        </div>
                        <div className={styles.barTrack}>
                          <div
                            className={`${styles.barFill} ${styles[`bar_${p.color}`]}`}
                            style={{ width: `${Math.round((p.value / pipelineMax) * 100)}%` }}
                          />
                        </div>
                        <div className={styles.pipelineSub}>
                          <span>{p.count} client{p.count !== 1 ? 's' : ''}</span>
                          <span>{p.percent}% of pipeline</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity feed */}
          <div className={styles.sectionLabel}>RECENT ACTIVITY</div>
          <div className={styles.card}>
            {activities.length === 0 && <div className={styles.empty}>No recent activity.</div>}
            {activities.map(a => (
              <div key={a.id} className={styles.activityItem}>
                <div className={styles.activityIcon}>{activityIcon(a.type)}</div>
                <div>
                  <div className={styles.activityText}>
                    {a.client && (
                      <Link href={`/clients/${a.clientId}`} className={styles.activityClientLink}>
                        {a.client.lastName}, {a.client.firstName}
                      </Link>
                    )}
                    {' — '}{a.note}
                  </div>
                  <div className={styles.activityMeta}>
                    {relativeTime(a.createdAt)}
                    {a.staff ? ` · ${a.staff.name}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
