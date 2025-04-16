'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { useAuth } from '../hooks/use-auth'

export default function AuthStep() {
  const { isLoading, handleSocialLogin } = useAuth()

  return (
    <div className=" flex size-full flex-col items-center justify-start space-y-12 py-6 text-center">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold leading-tight">
          Autentique sua conta
        </h1>
        <p className="max-w-lg text-base text-muted-foreground">
          Faça login com sua conta <span className="font-semibold">Google</span>{' '}
          ou <span className="font-semibold">Apple</span>. Você pode usar
          qualquer uma delas, pois ambas são integradas ao nosso sistema.
        </p>
      </div>

      <div className="my-auto flex w-full flex-col items-center space-y-5">
        {/* Botão do Google com ícone correto */}
        <Button
          variant="outline"
          className="flex w-2/3 items-center justify-center gap-2"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        >
          <Image src="/google.png" alt="Apple Logo" width={20} height={20} />
          Continuar com Google
        </Button>

        <div className="flex w-2/3 flex-row items-center justify-center space-x-2">
          <div className="h-px w-full bg-secondary"></div>
          <span className="text-sm text-muted-foreground">OU</span>
          <div className="h-px w-full bg-secondary"></div>
        </div>

        <Button
          variant="outline"
          className="flex w-2/3 items-center justify-center gap-2"
          onClick={() => handleSocialLogin('apple')}
          disabled={isLoading}
        >
          <Image src="/apple.png" alt="Apple Logo" width={20} height={20} />
          Continuar com Apple
        </Button>
      </div>
    </div>
  )
}
