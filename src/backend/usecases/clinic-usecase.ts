/* eslint-disable no-useless-constructor */
import { IClinicRepository } from '../interfaces/clinic-interfaces'

export class ClinicUseCase implements IClinicRepository {
  constructor(private readonly clinicRepository: IClinicRepository) {}

  async findBySubdomain(subdomain: string) {
    return this.clinicRepository.findBySubdomain(subdomain)
  }

  async findById(id: string) {
    return this.clinicRepository.findById(id)
  }

  async getAll() {
    return this.clinicRepository.getAll()
  }
}
