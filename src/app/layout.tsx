import './globals.css'

import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { AppProvider } from '@/components/providers/app-provider'
import { SubdomainProvider } from '@/context/use-subdomain'
import { useFetchClinic } from '@/hooks/use-fetch-clinic-data'

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'AI Medcare', template: '%s | AI Medcare' },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/apple-touch-icon.png',
  },
  description: 'Bem Vindo à AI Medcare',
  openGraph: {
    type: 'website',
    locale: 'pt-BR',
    title: 'AI Medcare',
    description: 'Bem Vindo à AI Medcare',
    url: 'https://example.com',
    siteName: 'AI Medcare',
    images: [
      {
        url: '/aimedcare-logo.png',
        width: 800,
        height: 600,
        alt: 'AI Medcare',
      },
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const url = (await headers()).get('host') || 'localhost'
  const subdomain = url.split('.')[0]

  if (subdomain === 'localhost') return
  const { dehydratedState, clinic } = await useFetchClinic(subdomain)

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex min-h-svh flex-col" suppressHydrationWarning>
        <main className="flex flex-1 flex-col">
          <AppProvider>
            <SubdomainProvider
              clinic={clinic}
              dehydratedState={dehydratedState}
            >
              {children}
            </SubdomainProvider>
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
