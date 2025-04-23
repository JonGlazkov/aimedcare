'use client'
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster as SonnerToaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { SubdomainProvider } from '@/context/use-subdomain'
import { useFetchClinic } from '@/hooks/use-fetch-clinic-data'
import { queryClient } from '@/lib/react-query'

export function AppProvider({ children }: PropsWithChildren) {
  const subdomain =
    typeof window === 'undefined'
      ? 'localhost' // Substitua pelo subdomínio padrão
      : window.location.hostname.split('.')[0]

  const { dehydratedState, clinic } = useFetchClinic(subdomain)

  return (
    <SessionProvider>
      <HelmetProvider>
        <ThemeProvider storageKey="my-clinic-theme" defaultTheme="light">
          <SonnerToaster richColors />
          <Toaster />
          <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
              <SubdomainProvider clinic={clinic ?? null}>
                {children}
              </SubdomainProvider>
            </HydrationBoundary>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </SessionProvider>
  )
}
