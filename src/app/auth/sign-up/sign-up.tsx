'use client'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { registerClinic } from '@/app/api/register-clinic/route'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

const signUpForm = z.object({
  clinicName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export default function SignUp() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerClinicFn } = useMutation({
    mutationFn: registerClinic,
  })

  const handleSignUp = async (data: SignUpForm) => {
    try {
      await registerClinicFn({
        email: data.email,
        managerName: data.managerName,
        phone: data.phone,
        restaurantName: data.clinicName, // change to clinicName when the API is updated
      })

      toast({
        title: 'Clínica cadastrada com sucesso!',
        // description: 'Cheque seu e-mail para acessar o painel',
        variant: 'success',
        action: (
          <ToastAction
            altText="Login"
            onClick={() => redirect(`/sign-in?email=${data.email}`)}
          >
            Login
          </ToastAction>
        ),
      })
    } catch (e) {
      toast({
        title: 'Erro ao criar nova clinica',
        // description: 'Tente novamente mais tarde',
        variant: 'destructive',
        action: (
          <ToastAction
            altText="Tentar novamente"
            onClick={() => handleSignUp(data)}
          >
            Tentar novamente
          </ToastAction>
        ),
      })
    }
  }

  return (
    <>
      <div className="p-8">
        <Button asChild variant="outline" className="absolute right-8 top-8">
          <Link href="/auth/sign-in">Login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie sua conta gratuitamente
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas consultas online!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="clinicName">Nome da Clínica</Label>
              <Input id="clinicName" type="text" {...register('clinicName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="managerName"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              {' '}
              Ao continuar, você concorda com nossos{' '}
              <a className="underline underline-offset-4" href="">
                termos de serviço
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
