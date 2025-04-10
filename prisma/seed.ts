import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando o seed...')

  // Criando uma clínica
  const clinic = await prisma.clinic.create({
    data: {
      name: 'Clínica Saúde Total',
      description: 'Uma clínica especializada em cuidados gerais.',
      address: 'Rua das Flores, 123',
      phone: '123456789',
    },
  })

  // Criando serviços da clínica
  const cleaningService = await prisma.clinicService.create({
    data: {
      name: 'Limpeza Dental',
      description: 'Limpeza profissional dos dentes.',
      priceInCents: 5000,
      clinicId: clinic.id,
    },
  })

  const bracesService = await prisma.clinicService.create({
    data: {
      name: 'Troca de Aparelho',
      description: 'Troca de aparelho ortodôntico.',
      priceInCents: 15000,
      clinicId: clinic.id,
    },
  })

  // Criando um usuário
  const user = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      phone: '987654321',
      role: 'USER',
    },
  })

  // Criando um agendamento
  const appointment = await prisma.appointment.create({
    data: {
      doctorName: 'Dr. Carlos',
      patientName: 'João Silva',
      totalPriceInCents: 20000,
      clinicId: clinic.id,
      userId: user.id,
    },
  })

  // Associando serviços ao agendamento
  await prisma.appointmentService.createMany({
    data: [
      {
        priceInCents: cleaningService.priceInCents,
        quantity: 1,
        serviceId: cleaningService.id,
        appointmentId: appointment.id,
      },
      {
        priceInCents: bracesService.priceInCents,
        quantity: 1,
        serviceId: bracesService.id,
        appointmentId: appointment.id,
      },
    ],
  })

  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
