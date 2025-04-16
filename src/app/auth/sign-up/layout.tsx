import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { Button } from '@/components/ui/button'

import { SignUpFormProvider } from './context/form-context'

export const metadata = {
  title: 'Cadastro',
}

export default function SignUpLayout({ children }: PropsWithChildren) {
  return (
    <SignUpFormProvider>
      <div className="p-8">
        <Button asChild variant="outline" className="absolute right-8 top-8">
          <Link href="/auth/sign-in">Login</Link>
        </Button>
      </div>
      {children}
    </SignUpFormProvider>
  )
}
