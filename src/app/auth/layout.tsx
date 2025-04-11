import { Hospital } from 'lucide-react'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted text-muted-foreground">
        <div className="relative flex h-full w-full items-center gap-3 text-lg font-medium text-foreground">
          <div className="absolute left-8 top-8 flex w-full flex-row items-center gap-3">
            <Hospital className="h-6 w-6" />
            <span className="text-xl font-semibold">AI Medcare</span>
          </div>

          <Image
            src="/hospital-background2.jpeg"
            alt="AI Medcare"
            width={1500}
            height={1500}
            className="min-h-full w-full object-cover"
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
  )
}
