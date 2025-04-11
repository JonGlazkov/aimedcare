import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveConsult } from '@/app/api/approve-consult/route'
import { cancelConsult } from '@/app/api/cancel-consult/route'
import { finishConsult } from '@/app/api/finish-consult/route'
import { GetConsultsResponse } from '@/app/api/get-consults/route'
import { processConsult } from '@/app/api/process-consult/route'
import { ConsultStatus } from '@/components/consult-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'

import ConsultsDetails from './consults-details'

export interface ConsultsTableRowProps {
  consult: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export default function ConsultsTableRow({ consult }: ConsultsTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  function updateConsultStatusOnCache(orderId: string, status: ConsultStatus) {
    const cachedData = queryClient.getQueriesData<GetConsultsResponse>({
      queryKey: ['consults'],
    })

    cachedData.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetConsultsResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelConsultFn, isPending: isCancelingConsult } =
    useMutation({
      mutationFn: cancelConsult,
      async onSuccess(_, { orderId }) {
        updateConsultStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveConsultFn, isPending: isApprovingConsult } =
    useMutation({
      mutationFn: approveConsult,
      async onSuccess(_, { orderId }) {
        updateConsultStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: finishConsultFn, isPending: isFinishingConsult } =
    useMutation({
      mutationFn: finishConsult,
      async onSuccess(_, { orderId }) {
        updateConsultStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverConsultFn, isPending: isProcessingConsult } =
    useMutation({
      mutationFn: processConsult,
      async onSuccess(_, { orderId }) {
        updateConsultStatusOnCache(orderId, 'delivered')
      },
    })

  // Change the name of mutationFn after change the api call

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes da consulta</span>
            </Button>
          </DialogTrigger>

          <ConsultsDetails orderId={consult.orderId} open={isDetailOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {consult.orderId}
      </TableCell>
      {/* <TableCell className="text-muted-foreground">
                    há 15 minutos
                  </TableCell> */}
      <TableCell>
        <ConsultStatus status={consult.status} />
      </TableCell>
      <TableCell className="text-muted-foreground">12/08/2025</TableCell>
      <TableCell className="font-medium">{consult.customerName}</TableCell>
      <TableCell className="font-medium">Dr Arnóbio Pacheco</TableCell>
      <TableCell className="font-medium text-primary">
        {(consult.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {consult.status === 'pending' && (
          <Button
            onClick={() => approveConsultFn({ orderId: consult.orderId })}
            disabled={isApprovingConsult}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-1 h-3 w-3" />
            Aprovar
          </Button>
        )}
        {consult.status === 'processing' && (
          <Button
            onClick={() => finishConsultFn({ orderId: consult.orderId })}
            disabled={isFinishingConsult}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-1 h-3 w-3" />
            Confirmar
          </Button>
        )}

        {consult.status === 'delivering' && (
          <Button
            onClick={() => deliverConsultFn({ orderId: consult.orderId })}
            disabled={isProcessingConsult}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-1 h-3 w-3" />
            Finalizar
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() =>
            cancelConsultFn({ orderId: consult.orderId }) || isCancelingConsult
          }
          disabled={!['pending', 'processing'].includes(consult.status)}
          variant="ghost"
          size="xs"
        >
          <X className="mr-1 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
