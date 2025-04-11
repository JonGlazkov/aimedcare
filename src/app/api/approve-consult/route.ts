import { api } from '@/lib/axios'

export interface ApproveConsultParams {
  orderId: string
}

export async function approveConsult({ orderId }: ApproveConsultParams) {
  await api.patch(`/orders/${orderId}/approve`)
}
