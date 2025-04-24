import { NextRequest, NextResponse } from 'next/server'

import { FindClinicBySubdomainDTO } from '@/backend/dtos/find-clinic-by-subdomain-dto'
import { ClinicRepository } from '@/backend/repositories/clinic-repository'
import { ClinicUseCase } from '@/backend/usecases/clinic-usecase'

import { PrismaClient } from '../../../../../../prisma/generated'

export async function GET(
  req: NextRequest,
  { params }: { params: { subdomain: string } },
) {
  const { subdomain } = await params
  const parse = FindClinicBySubdomainDTO.safeParse({ subdomain })

  console.log(parse)

  if (parse.data?.subdomain.includes('localhost')) {
    return NextResponse.json(
      { message: 'Localhost is not acceptable ' },
      { status: 400 },
    )
  }

  if (!parse.success) {
    return NextResponse.json(
      { message: 'Invalid subdomain' },
      { status: 400, statusText: parse.error.message },
    )
  }

  const clinicRepository = new ClinicRepository(new PrismaClient())
  const clinicUseCase = new ClinicUseCase(clinicRepository)

  const clinic = await clinicUseCase.findBySubdomain(subdomain)

  if (!clinic) {
    return NextResponse.json(
      { message: 'Clinic with not found' },
      { status: 404 },
    )
  }

  return NextResponse.json(clinic, { status: 200 })
}
