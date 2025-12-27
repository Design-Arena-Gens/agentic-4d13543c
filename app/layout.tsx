import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'সোশ্যাল কমার্স এজেন্ট',
  description: 'WhatsApp, Facebook Messenger এবং Instagram এর জন্য স্বয়ংক্রিয় বিক্রয় এজেন্ট',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  )
}
