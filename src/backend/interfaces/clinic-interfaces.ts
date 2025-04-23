import { Clinic } from '../../../prisma/generated'

export interface IClinicRepository {
  findBySubdomain(subdomain: string): Promise<Clinic | null>
  findById(id: string): Promise<Clinic | null>
  // create(clinic: IClinic): Promise<Clinic>
  // update(clinic: IClinic): Promise<Clinic>
  // delete(id: string): Promise<void>
  getAll(): Promise<Clinic[]>
  // getAllByUserId(userId: string): Promise<Clinic[]>
}
