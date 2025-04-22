'use client'
// eslint-disable-next-line simple-import-sort/imports
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import { getManagedClinic } from '@/app/api/get-managed-clinic/route'

import ClinicProfileDialog from './clinic-profile-dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const { data: session, status } = useSession()

  const isLoadingProfile = status === 'loading'

  const { data: managedClinic, isLoading: isLoadingManagedClinic } = useQuery({
    queryKey: ['managed-clinic'],
    queryFn: getManagedClinic,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: () => signOut({ redirect: true }),
    onSuccess: () => {
      redirect('/auth/sign-in')
    },
  })

  console.log(session)

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedClinic ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedClinic?.name
            )}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="flex flex-row justify-between">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="size-10 animate-pulse rounded-full bg-muted" />
              </div>
            ) : (
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span>{session?.user?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {session?.user?.email}
                  </span>
                </div>

                <Avatar className="size-8">
                  <AvatarImage
                    src={session?.user?.image ?? ''}
                    alt={session?.user?.name ?? ''}
                  />
                  <AvatarFallback>
                    {session?.user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 size-4" />
              <span>Perfil da clínica</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="mr-2 size-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ClinicProfileDialog />
    </Dialog>
  )
}
