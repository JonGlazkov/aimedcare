'use client'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'

const signUpForm = z.object({
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export default function SignIn() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: async (data: SignUpForm) => {
      signIn('credentials', {
        email: data.email,
        redirect: false,
      }).then((response) => {
        if (response?.error) {
          throw new Error(response.error)
        }
        if (response?.ok) {
          toast({
            title: 'E-mail enviado com sucesso',
            description: 'Cheque seu e-mail para acessar o painel',
            variant: 'success',
            action: (
              <ToastAction
                altText="Acessar painel"
                onClick={() => redirect('/dashboard')}
              >
                Acessar painel
              </ToastAction>
            ),
          })
        }
      })
    },
  })

  const handleSignUp = async (data: SignUpForm) => {
    try {
      await authenticate({ email: data.email })

      toast({
        title: 'Enviamos um link de autenticação para o seu e-mail',
        // description: 'Cheque seu e-mail para acessar o painel',
        variant: 'success',
        action: (
          <ToastAction altText="Reenviar" onClick={() => handleSignUp(data)}>
            Reenviar
          </ToastAction>
        ),
      })
    } catch (e) {
      toast({
        title: 'Erro ao enviar link de autenticação',
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
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild variant="outline" className="absolute right-8 top-8">
          <Link href="/auth/sign-up">Nova clínica</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas consultas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
