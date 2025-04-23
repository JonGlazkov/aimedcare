import { NextRequest, NextResponse } from 'next/server'

import { FindClinicBySubdomainDTO } from '@/backend/dtos/find-clinic-by-subdomain-dto'
import { ClinicRepository } from '@/backend/repositories/clinic-repository'
import { ClinicUseCase } from '@/backend/usecases/clinic-usecase'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { subdomain: string } },
) {
  const { subdomain } = params
  const parse = FindClinicBySubdomainDTO.safeParse({ subdomain })

  if (!parse.success) {
    return NextResponse.json(
      { message: 'Invalid subdomain' },
      { status: 400, statusText: parse.error.message },
    )
  }

  const clinicRepository = new ClinicRepository(prisma)
  const clinicUseCase = new ClinicUseCase(clinicRepository)

  const clinic = await clinicUseCase.findBySubdomain(subdomain)

  if (!clinic) {
    return NextResponse.json({ message: 'Clinic not found' }, { status: 404 })
  }

  return NextResponse.json(clinic, { status: 200 })
}
