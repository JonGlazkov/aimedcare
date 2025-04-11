import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getConsultDetails } from '@/api/get-consult-detailts'
import { ConsultStatus } from '@/components/consult-status'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ConsultsDetailsProps {
  orderId: string
  open: boolean
}

export default function ConsultsDetails({
  orderId,
  open,
}: ConsultsDetailsProps) {
  const { data: consult } = useQuery({
    queryKey: ['consults', orderId],
    queryFn: () => getConsultDetails({ orderId }),
    enabled: open,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Consulta: {orderId}</DialogTitle>
        <DialogDescription>Detalhes da consulta</DialogDescription>
      </DialogHeader>

      {consult && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <ConsultStatus status={consult.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  <span className="font-medium">{consult.customer.name}</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  <span className="font-medium">
                    {consult.customer.phone ?? 'Não informado'}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Email</TableCell>
                <TableCell className="flex justify-end">
                  <span className="font-medium">{consult.customer.email}</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado em
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(consult.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Médico</TableHead>
                <TableHead className="text-right">Forma de pagamento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Dr Arnóbio Pacheco</TableCell>
                <TableCell className="text-right">Cartão de Crédito</TableCell>
                <TableCell className="text-right text-primary">
                  {(consult.totalInCents / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}
