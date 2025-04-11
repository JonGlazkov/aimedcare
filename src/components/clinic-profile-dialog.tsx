import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedClinic,
  GetManagedClinicResponse,
} from '@/app/api/get-managed-clinic/route'
import { updateProfile } from '@/app/api/update-profile/route'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const clinicProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable(),
})

type ClinicProfileSchema = z.infer<typeof clinicProfileSchema>

export default function ClinicProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedClinic } = useQuery({
    queryKey: ['managed-clinic'],
    queryFn: getManagedClinic,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ClinicProfileSchema>({
    resolver: zodResolver(clinicProfileSchema),
    values: {
      name: managedClinic?.name ?? '',
      description: managedClinic?.description ?? '',
    },
  })

  function updateManagedClinicCache({
    name,
    description,
  }: ClinicProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedClinicResponse>([
      'managed-clinic',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedClinicResponse>(['managed-clinic'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedClinicCache({ name, description })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedClinicCache(context.previousProfile)
      }
    },
  })

  async function handleUpdateProfile(data: ClinicProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil, tente novamente')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Clínica</DialogTitle>
        <DialogDescription>
          Atualize as informações da sua clínica visiveis para os pacientes
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              type="text"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
