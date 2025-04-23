import { AppointmentStatus } from '../../../prisma/generated'
import { IAppointmentService } from './appointment-service'
import { IClinic } from './clinic'
import { IUser } from './user'

export interface IAppointment {
  id: string
  doctorName: string
  patientName: string
  totalPriceInCents: number
  createdAt: Date
  updatedAt: Date
  status: AppointmentStatus
  clinicId?: string
  userId?: string
  user?: IUser
  clinic?: IClinic
  appointmentService: IAppointmentService[]
}
