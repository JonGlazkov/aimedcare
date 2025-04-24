'use client'

import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import GlobalLoading from '@/components/auth-loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { queryClient } from '@/lib/react-query'

import { createClinic, validateClinicDetails } from '../actions'
import type { SignUpFormValues } from '../context/form-context'

interface ClinicDetailsStepProps {
  onSuccess: () => void
}

export default function ClinicDetailsStep({
  onSuccess,
}: ClinicDetailsStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SignUpFormValues>()
  const { setValue } = useFormContext<SignUpFormValues>()
  const { toast } = useToast()

  const { mutateAsync: validateFormFn, isPending: isValidating } = useMutation({
    mutationKey: ['validate-clinic-details'],
    mutationFn: validateClinicDetails,
    onError: (error) => {
      toast({
        title: 'Erro de Validação',
        description: error.message,
        variant: 'destructive',
      })

      console.log(error)
    },
  })

  const { mutateAsync: createClinicFn, isPending: isCreating } = useMutation({
    mutationKey: ['create-clinic'],
    mutationFn: createClinic,
    onSuccess: (clinic) => {
      onSuccess()

      toast({
        title: 'Clínica criada com sucesso',
        description: 'Você pode agora acessar o painel da sua clínica',
      })

      queryClient.setQueryData(
        ['clinic-by-subdomain', clinic.subdomain],
        clinic,
      )
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar clínica',
        description: error.message,
        variant: 'destructive',
      })

      console.log(error)
    },
  })

  async function onSubmit(data: SignUpFormValues) {
    try {
      await validateFormFn(data).then(() => {
        toast({
          title: 'Validação bem-sucedida',
          description:
            'Os dados da clínica foram validados com sucesso, aguarde enquanto processamos as informações.',
        })
      })
      await createClinicFn(data)
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Erro ao criar clínica',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Erro inesperado',
          description: 'Ocorreu um erro inesperado. Tente novamente.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <div className="flex flex-col space-y-3 p-4">
      <GlobalLoading
        mutationKey={
          isValidating ? ['validate-clinic-details'] : ['create-clinic']
        }
      />
      <h1 className="text-4xl font-bold leading-tight">
        Informe os dados solicitados
      </h1>

      <p className="text-muted-foreground">Conte-nos sobre sua clínica</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-full grid-cols-1 gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="clinicName">Nome da Clínica</Label>
          <Input
            id="clinicName"
            {...register('clinicName')}
            placeholder="Clínica Saúde"
          />
          {errors.clinicName && (
            <p className="text-sm text-destructive">
              {errors.clinicName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clinicAddress">Endereço da Clínica</Label>
          <Textarea
            id="clinicAddress"
            {...register('clinicAddress')}
            placeholder="Rua da Saúde, 123, Cidade Médica, CM 12345"
            rows={3}
          />
          {errors.clinicAddress && (
            <p className="text-sm text-destructive">
              {errors.clinicAddress.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clinicPhone">Telefone da Clínica</Label>
          <PhoneInput
            id="phone"
            placeholder="Telefone"
            autoCapitalize="none"
            autoComplete="tel"
            autoCorrect="off"
            defaultCountry="BR"
            required
            maxLength={15}
            {...register('clinicPhone')}
            onChange={(value) => setValue('clinicPhone', value)}
          />

          {errors.clinicPhone && (
            <p className="text-sm text-destructive">
              {errors.clinicPhone.message}
            </p>
          )}
        </div>

        <Button
          id="submit-button"
          type="submit"
          className="mt-2 w-full"
          disabled={isValidating || isCreating}
        >
          {isValidating || isCreating ? 'Processando...' : 'Próximo'}
        </Button>
      </form>
    </div>
  )
}
