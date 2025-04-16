'use client'
// eslint-disable-next-line simple-import-sort/imports
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'

import { useMutation } from '@tanstack/react-query'
import { AuthProvider, SignUpFormValues } from '../context/form-context'

export function useAuth() {
  const { setValue } = useFormContext<SignUpFormValues>()
  const { toast } = useToast()
  const router = useRouter()

  const {
    mutateAsync: authenticate,
    isPending: isLoading,
    ...rest
  } = useMutation({
    mutationFn: (provider: AuthProvider) =>
      signIn(provider, {
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/sign-up?step=clinic-details`,
      }),
    mutationKey: ['auth'],
    onSuccess: (_, provider) => {
      console.log(provider)
      setValue('authProvider', provider)
      router.push('/auth/sign-up?step=clinic-details')
    },
    onError: (error, provider) => {
      toast({
        title: 'Erro ao autenticar',
        description: `Houve um erro ao autenticar com o ${provider}.`,
        variant: 'destructive',
      })
      console.error('Error signing in:', error)
    },
  })

  const handleSocialLogin = async (provider: AuthProvider) => {
    authenticate(provider)
  }

  return {
    isLoading,
    handleSocialLogin,
    ...rest,
  }
}
