'use server'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import type { signUpFormSchema } from './context/form-context'

const clinicDetailsValidationSchema = z.object({
  managerName: z.string().min(3, 'O nome do responsável é obrigatório'),

  clinicName: z.string().min(3, 'O nome da clínica é obrigatório'),
  clinicAddress: z
    .string()
    .min(1, 'O endereço da clínica deve ter mais de 3 caracteres')
    .nullable(),
  clinicPhone: z
    .string()
    .min(9, 'O telefone da clínica é obrigatório')
    .regex(/^\(?\d{2}\)? ?(?:9\d{4}|\d{4})-\d{4}$/),
})

export async function validateClinicDetails(
  data: z.infer<typeof clinicDetailsValidationSchema>,
) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    clinicDetailsValidationSchema.parse(data)
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message || 'Erro na validação dos dados',
      }
    }

    return { success: false, message: 'An unexpected error occurred' }
  }
}

export async function createClinic(formData: z.infer<typeof signUpFormSchema>) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const session = await auth()
  const { managerName, clinicName, clinicAddress, clinicPhone } = formData

  if (!session || !session.user) {
    throw new Error('User not authenticated')
  }

  if (!session.user.email) {
    throw new Error('User email not found')
  }

  const { id: clinicId } = await prisma.clinic.create({
    data: {
      name: clinicName,
      address: clinicAddress ?? null,
      phone: clinicPhone,

      manager: {
        connectOrCreate: {
          where: { name: managerName, email: session.user.email },
          create: { name: managerName, email: session.user.email },
        },
      },
    },
  })

  const { id: userId } = await prisma.user.findFirstOrThrow({
    where: { email: session.user.email },
  })

  await prisma.userClinicAssociation.create({
    data: {
      userId,
      clinicId,
    },
  })
}
