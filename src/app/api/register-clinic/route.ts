import { api } from '@/lib/axios'

export interface RegisterClinicBody {
  restaurantName: string // change to clinicName when the API is updated
  managerName: string
  email: string
  phone: string
}

export async function registerClinic({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterClinicBody) {
  await api.post('/restaurants', {
    email,
    managerName,
    phone,
    restaurantName,
  })
}
