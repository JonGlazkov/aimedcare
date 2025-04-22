'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export type AuthProvider = 'google' | 'apple'

export const signUpFormSchema = z.object({
  clinicName: z
    .string()
    .min(3, 'O nome da clínica deve ter pelo menos 3 caracteres'),
  clinicAddress: z
    .string()
    .min(3, 'O endereço da clínica deve ter pelo menos 3 caracteres'),
  clinicPhone: z
    .string()
    .min(9, 'O telefone da clínica deve ter pelo menos 9 caracteres')
    .max(15, 'O telefone da clínica deve ter no máximo 15 caracteres'),
})

export type SignUpFormValues = z.infer<typeof signUpFormSchema>

interface IFormStepsContext {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export const FormStepsContext = createContext<IFormStepsContext | undefined>(
  undefined,
)

export function SignUpFormProvider({ children }: PropsWithChildren) {
  const [currentStep, setCurrentStep] = useState(0)

  const values = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      clinicName: '',
      clinicAddress: '',
      clinicPhone: '',
    },
    mode: 'onChange',
  })

  return (
    <FormStepsContext.Provider value={{ currentStep, setCurrentStep }}>
      <FormProvider {...values}>{children}</FormProvider>
    </FormStepsContext.Provider>
  )
}

export function useFormSteps() {
  const context = useContext(FormStepsContext)
  if (!context) {
    throw new Error('useFormSteps must be used within a FormStepsProvider')
  }
  return context
}
