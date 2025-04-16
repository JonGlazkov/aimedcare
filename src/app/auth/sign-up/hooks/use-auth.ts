'use client'
// eslint-disable-next-line simple-import-sort/imports
import { signIn } from 'next-auth/react'

import { useToast } from '@/hooks/use-toast'

import { useMutation } from '@tanstack/react-query'
import { AuthProvider } from '../context/form-context'

export function useAuth() {
  const { toast } = useToast()

  const {
    mutateAsync: authenticate,
    isPending: isLoading,
    ...rest
  } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (provider: AuthProvider) =>
      signIn(provider, {
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/sign-up`,
      }),
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
