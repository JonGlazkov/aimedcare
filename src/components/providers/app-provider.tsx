'use client'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster as SonnerToaster } from 'sonner'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <HelmetProvider>
        <ThemeProvider storageKey="my-clinic-theme" defaultTheme="light">
          <Helmet titleTemplate="%s | xon.clinic" />
          <SonnerToaster richColors />
          <Toaster />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </SessionProvider>
  )
}
