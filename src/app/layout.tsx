import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <SessionProvider>
        <body className="flex min-h-svh flex-col" suppressHydrationWarning>
          <main className="flex flex-1 flex-col">{children}</main>
        </body>
      </SessionProvider>
    </html>
  )
}
