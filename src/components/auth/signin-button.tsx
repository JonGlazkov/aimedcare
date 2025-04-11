'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import { signIn } from '@/lib/auth'

export const SignInButton = (props: ButtonProps) => {
  return (
    <form
      action={async () => {
        await signIn()
      }}
    >
      <Button {...props} />
    </form>
  )
}
