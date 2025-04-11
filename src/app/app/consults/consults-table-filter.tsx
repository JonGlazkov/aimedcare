import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const consultsFilterSchema = z.object({
  orderId: z.string().nullable(),
  customerName: z.string().nullable(),
  // doctorName: z.string().nullable(),
  status: z.string().optional(),
})

type ConsultsFilterSchema = z.infer<typeof consultsFilterSchema>

export default function ConsultsTableFilter() {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } =
    useForm<ConsultsFilterSchema>({
      resolver: zodResolver(consultsFilterSchema),
      defaultValues: {
        orderId,
        customerName,
        status: status ?? 'all',
      },
    })

  function handleFilter({
    customerName,
    orderId,
    status,
  }: ConsultsFilterSchema) {
    if (orderId) {
      params.set('orderId', orderId)
    } else {
      params.delete('orderId')
    }

    if (customerName) {
      params.set('customerName', customerName)
    } else {
      params.delete('customerName')
    }

    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    params.set('page', '1')

    router.prefetch(pathname + '?' + params.toString())
    router.push(pathname + '?' + params.toString())
    return params.toString()
  }

  function handleClearFilters() {
    params.delete('orderId')
    params.delete('customerName')
    params.delete('status')
    params.set('page', '1')

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })

    router.prefetch(pathname + '?' + params.toString())
    router.push(pathname + '?' + params.toString())
    return params.toString()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID da Consulta"
        className="h-8 w-auto"
        {...register('orderId')}
      />

      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      {/* <Input placeholder="Nome do médico" className="h-8 w-[320px]" {...register('doctorName')}/> */}
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              value={value}
              onValueChange={onChange}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em consulta</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="size-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="size-4" />
        Remover filtros
      </Button>
    </form>
  )
}
