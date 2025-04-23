/* eslint-disable no-useless-constructor */
import { Clinic, PrismaClient } from '../../../prisma/generated'
import { IClinicRepository } from '../interfaces/clinic-interfaces'

export class ClinicRepository implements IClinicRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findBySubdomain(subdomain: string): Promise<Clinic | null> {
    return this.prisma.clinic.findFirstOrThrow({
      where: {
        OR: [
          {
            subdomain,
            customDomain: subdomain,
          },
        ],
      },
    })
  }

  async findById(id: string): Promise<Clinic | null> {
    return this.prisma.clinic.findUnique({
      where: {
        id,
      },
    })
  }

  async getAll(): Promise<Clinic[]> {
    return this.prisma.clinic.findMany({
      include: {
        clinicService: true,
        appointments: true,
        manager: true,
        userClinicAssociation: {
          include: {
            user: true,
          },
        },
      },
    })
  }
}
