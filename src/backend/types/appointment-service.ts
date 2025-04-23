import { Appointment, ClinicService } from '../../../prisma/generated'

export interface IAppointmentService {
  id: string
  priceInCents: number
  quantity: number
  serviceId?: string
  appointmentId: string
  service?: ClinicService
  appointment: Appointment
}
