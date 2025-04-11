// type ConsultStatus = 'pending' | 'confirmed' | 'canceled' | 'completed'
export type ConsultStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface ConsultStatusProps {
  status: ConsultStatus
}

const consultStatusMap: Record<ConsultStatus, string> = {
  pending: 'Pendente',
  // confirmed: 'Confirmado',
  canceled: 'Cancelado',
  // completed: 'Concluído',
  processing: 'Processando',
  delivering: 'Confirmado',
  delivered: 'Finalizado',
}

// Change status to the status of the consults

export function ConsultStatus({ status }: ConsultStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {['delivering', 'processing'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {consultStatusMap[status]}
      </span>
    </div>
  )
}
