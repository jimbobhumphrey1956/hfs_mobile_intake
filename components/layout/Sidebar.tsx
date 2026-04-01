'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

const navItems = [
  { section: 'OVERVIEW' },
  { href: '/dashboard', icon: '🏠', label: 'Operations Hub' },
  { href: '/crm',       icon: '📋', label: 'Pre-Need CRM',     badge: 'overdue' },
  { href: '/follow-up', icon: '📅', label: 'Follow-Up Dashboard' },
  { href: '/clients',   icon: '👥', label: 'All Clients' },
  { href: '/quotes',    icon: '💰', label: 'Quotes',            badge: 'quotes' },

  { section: 'TOOLS' },
  { href: '/prospecting',    icon: '🎯', label: 'Prospecting' },
  { href: '/referrals',      icon: '🤝', label: 'Referrals' },
  { href: '/letter-templates', icon: '✉️', label: 'Letter Templates' },
  { href: '/price-lists',    icon: '📄', label: 'Price Lists' },

  { section: 'ACCOUNT' },
  { href: '/settings', icon: '⚙️', label: 'Settings' },
]

interface SidebarProps {
  overdueCount?: number
  openQuotesCount?: number
}

export default function Sidebar({ overdueCount = 0, openQuotesCount = 0 }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoTitle}>Humphrey Funeral Service<br />&amp; Center Valley Gardens</div>
        <div className={styles.logoSub}>Pre-Need CRM</div>
      </div>

      <div className={styles.user}>
        <div className={styles.avatar}>RH</div>
        <div>
          <div className={styles.userName}>Robert Heflin</div>
          <div className={styles.userRole}>Pre-Need Counselor</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item, i) => {
          if ('section' in item) {
            return <div key={i} className={styles.sectionLabel}>{item.section}</div>
          }
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const badge = item.badge === 'overdue' ? overdueCount : item.badge === 'quotes' ? openQuotesCount : 0
          return (
            <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
              {badge > 0 && <span className={styles.badge}>{badge}</span>}
            </Link>
          )
        })}
      </nav>

      <div className={styles.bottom}>
        <button className={styles.signOut}>Sign Out</button>
      </div>
    </aside>
  )
}
