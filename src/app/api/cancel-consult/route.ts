import { api } from '@/lib/axios'

export interface CancelConsultParams {
  orderId: string
}

export async function cancelConsult({ orderId }: CancelConsultParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
