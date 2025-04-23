enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DOCTOR = 'DOCTOR',
}

export interface IUserClinicAssociation {
  id: string
  createdAt: Date
  updatedAt: Date
  clinicId: string
  userId: string
  role: UserRole
}
