import { api } from '@/lib/axios'

export interface FinishConsultParams {
  orderId: string
}

export async function finishConsult({ orderId }: FinishConsultParams) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
