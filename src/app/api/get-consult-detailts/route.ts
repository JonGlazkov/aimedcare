import { api } from '@/lib/axios'

export interface GetConsultDetailsParams {
  orderId: string
}

export interface GetConsultDetailsResponse {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    quantity: number
    productName: string
    priceInCents: number
  }[]
}

export async function getConsultDetails({ orderId }: GetConsultDetailsParams) {
  const response = await api.get<GetConsultDetailsResponse>(
    `/orders/${orderId}`,
  )

  return response.data
}
