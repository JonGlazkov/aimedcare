'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { getManagedClinic } from '@/app/api/get-managed-clinic/route'
import { getProfile } from '@/app/api/get-profile/route'

import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ClinicProfileDialog from './clinic-profile-dialog'
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
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedClinic, isLoading: isLoadingManagedClinic } = useQuery({
    queryKey: ['managed-clinic'],
    queryFn: getManagedClinic,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn:() => signOut({ redirect: true }),
    onSuccess: () => {
      redirect('/auth/sign-in')
    },
  })

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

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-muted-foreground text-xs font-normal">
                  {profile?.email}
                </span>
              </>
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
