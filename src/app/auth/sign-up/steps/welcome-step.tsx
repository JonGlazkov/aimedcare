import Image from 'next/image'

export default function WelcomeStep() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6 text-center">
      <h1 className="text-4xl font-bold leading-tight">
        Bem vindo à Clínica Inteligente
      </h1>
      <p className="max-w-lg text-base text-muted-foreground">
        Crie sua conta em apenas alguns passos. Iremos guiá-lo durante o
        processo de cadastro e configuração da sua clínica.
      </p>
      <div className="flex size-40 items-center justify-center overflow-hidden">
        <Image src="/logo.png" alt="AI Medcare Logo" width={160} height={160} />
      </div>
    </div>
  )
}
