import { User } from 'next-auth'

import { IAppointment } from './appointment'
import { IClinicService } from './clinic-service'
import { IUserClinicAssociation } from './user-association'

export interface IClinic {
  id: string
  name: string
  description?: string
  address?: string
  phone?: string
  subdomain: string
  customDomain?: string
  managerId?: string
  manager?: User
  createdAt: Date
  updatedAt: Date
  appointments: IAppointment[]
  clinicService: IClinicService[]
  userClinicAssociation: IUserClinicAssociation[]
}
