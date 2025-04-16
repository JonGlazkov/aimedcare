import { Hospital } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

import AuthLoading from '@/components/auth-loading'

export const metadata: Metadata = {
  title: { default: 'Entrar', template: '%s | AI Medcare' },
  description: 'Bem Vindo à AI Medcare',
}

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AuthLoading mutationKey={['validate-clinic-details', 'create-clinic']} />
      <div className="grid min-h-screen grid-cols-2 antialiased">
        <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted text-muted-foreground">
          <div className="relative flex size-full items-center gap-3 bg-background-secondary text-lg font-medium text-foreground">
            <div className="absolute left-8 top-8 flex w-full flex-row items-center gap-3">
              <Hospital className="size-6" />
              <span className="text-xl font-semibold">AI Medcare</span>
            </div>

            <Image
              src="/aimedcare-logo2.png"
              alt="AI Medcare"
              width={1000}
              height={1000}
              className="min-h-full w-full bg-transparent object-contain"
            />
          </div>
          <footer className="absolute bottom-3 left-4 text-sm">
            Painel do parceiro &copy; Xon Clinic - {new Date().getFullYear()}
          </footer>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </>
  )
}
