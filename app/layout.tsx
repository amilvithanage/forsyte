import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forsyte - Policy Builder',
  description: 'Policy versioning and template management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

