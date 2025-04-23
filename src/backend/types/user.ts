import { IAppointment } from './appointment'
import { IClinic } from './clinic'
import { IUserClinicAssociation } from './user-association'

export interface IAccount {
  id: string
  provider: string
  providerAccountId: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface ISession {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  id: string
  name: string
  email: string
  image?: string
  phone?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
  appointment: IAppointment[]
  clinic?: IClinic
  account: IAccount[]
  session: ISession[]
  userClinicAssociation: IUserClinicAssociation[]
}
