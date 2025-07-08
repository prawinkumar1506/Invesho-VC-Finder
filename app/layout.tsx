import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Invesho-VC-Finder',
  description: 'Created by Prawin Kumar S',
  generator: 'spk',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
      <body>{children}</body>
      </html>
  )
}
