import { User } from 'next-auth'

import {
  Appointment,
  ClinicService,
  UserClinicAssociation,
} from '../prisma/generated'

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
  appointments: Appointment[]
  clinicService: ClinicService[]
  userClinicAssociation: UserClinicAssociation[]
}
