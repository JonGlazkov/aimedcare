'use client'

import { Check } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useFormContext } from 'react-hook-form'

import { SignUpFormValues } from '../context/form-context'

export default function SuccessStep() {
  const { data: session } = useSession()
  const { getValues } = useFormContext<SignUpFormValues>()

  const formData = getValues()

  return (
    <div className=" flex size-full flex-col items-center justify-between space-y-12 text-center">
      <div className="rounded-full bg-primary/10 p-3">
        <Check className="size-10 text-primary" />
      </div>
      <div className="space-y-3">
        <h2 className="text-4xl font-bold leading-tight">
          Cadastro Finalizado!
        </h2>
        <p className="text-sm text-muted-foreground">
          Parabéns! Você se registrou com sucesso. <br /> Agora você pode
          acessar o painel da sua clínica e começar a usá-lo.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-col gap-4 text-left">
          <h4 className="text-lg font-semibold">Detalhes da Clínica</h4>
          <p className="text-sm">
            <strong>Nome:</strong> {formData.clinicName || 'N/A'}
          </p>
          <p className="text-sm">
            <strong>Endereço:</strong> {formData.clinicAddress || 'N/A'}
          </p>
          <p className="text-sm">
            <strong>Telefone:</strong> {formData.clinicPhone || 'N/A'}
          </p>
          <p className="text-sm">
            <strong>Nome do Proprietário:</strong>{' '}
            {formData.managerName || 'N/A'}
          </p>
          <p className="text-sm">
            <strong>Email do Proprietário:</strong>{' '}
            {session?.user?.email || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}
