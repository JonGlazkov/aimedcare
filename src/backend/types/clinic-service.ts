import { IAppointmentService } from './appointment-service'
import { IClinic } from './clinic'

export interface IClinicService {
  id: string
  name: string
  description?: string
  priceInCents: number
  clinicId: string
  createdAt: Date
  updatedAt: Date
  clinic: IClinic
  appointmentService: IAppointmentService[]
}
