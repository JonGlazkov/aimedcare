'use client'

import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

import { validateClinicDetails } from '../actions'
import type { SignUpFormValues } from '../context/form-context'

interface ClinicDetailsStepProps {
  onSuccess: () => void
}

export default function ClinicDetailsStep({
  onSuccess,
}: ClinicDetailsStepProps) {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SignUpFormValues>()

  const { mutateAsync: validateForm, isPending } = useMutation({
    mutationKey: ['validate-clinic-details'],
    mutationFn: validateClinicDetails,
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: 'Validação Completa',
        })
        onSuccess()
      } else {
        toast({
          title: 'Erro de Validação',
          description: data.message,
          variant: 'destructive',
        })
      }
    },
  })

  async function onSubmit(data: SignUpFormValues) {
    await validateForm(data)
    console.log(data)
    // try {
    //   // Get current form values for this step
    //   const data = {
    //     managerName: getValues('managerName'),
    //     clinicName: getValues('clinicName'),
    //     clinicAddress: getValues('clinicAddress'),
    //     clinicPhone: getValues('clinicPhone'),
    //   }

    //   // Validate with server action
    //   const result = await validateClinicDetails(data)

    //   if (result.success) {
    //     onSuccess()
    //   } else {
    //     toast({
    //       title: 'Erro de Validação',
    //       description: result.message,
    //       variant: 'destructive',
    //     })
    //   }
    // } catch (error) {
    //   toast({
    //     title: 'Erro',
    //     description: 'Algo deu errado. Por favor, tente novamente.',
    //     variant: 'destructive',
    //   })
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <div className="flex flex-col space-y-3 p-4">
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
          <Input
            id="clinicPhone"
            type="tel"
            {...register('clinicPhone')}
            placeholder="(11) 98765-4321"
          />
          {errors.clinicPhone && (
            <p className="text-sm text-destructive">
              {errors.clinicPhone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome do Responsável</Label>
          <Input
            id="name"
            {...register('managerName')}
            placeholder="Dr. João Silva"
          />
          {errors.managerName && (
            <p className="text-sm text-destructive">
              {errors.managerName.message}
            </p>
          )}
        </div>

        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? 'Processando...' : 'Próximo'}
        </Button>
      </form>
    </div>
  )
}
