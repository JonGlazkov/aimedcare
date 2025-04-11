'use client'
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"

export interface NavLinkProps extends LinkProps {
  children: React.ReactNode
}

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      data-pathname={pathname === props.href}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[pathname=true]:text-foreground"
      {...props}
    >
      {props.children}
    </Link>
  )
}
