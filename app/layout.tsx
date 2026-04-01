import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HFS / CVMG — Pre-Need CRM',
  description: 'Humphrey Funeral Service & Center Valley Memorial Gardens — Pre-Need Sales CRM',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
