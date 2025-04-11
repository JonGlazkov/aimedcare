import { api } from '@/lib/axios'

export interface ProcessConsultParams {
  orderId: string
}

export async function processConsult({ orderId }: ProcessConsultParams) {
  await api.patch(`/orders/${orderId}/deliver`)
}
