'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Topbar.module.css'

interface TopbarProps {
  title: string
  subtitle?: string
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [now, setNow] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const d = new Date()
      setNow(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
      setDate(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <div className={styles.subtitle}>{subtitle || date}</div>}
        {!subtitle && <div className={styles.subtitle}>{date}</div>}
      </div>
      <div className={styles.right}>
        <span className={styles.time}>{now}</span>
        <Link href="/clients/new" className={styles.btnPrimary}>
          + New Client
        </Link>
      </div>
    </header>
  )
}
