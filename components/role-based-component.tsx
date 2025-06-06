"use client"

import { useSession } from "next-auth/react"
import type { ReactNode } from "react"

interface RoleBasedComponentProps {
  children: ReactNode
  allowedRoles?: string[]
  fallback?: ReactNode
}

export function RoleBasedComponent({ children, allowedRoles = [], fallback = null }: RoleBasedComponentProps) {
  const { data: session } = useSession()

  if (!session) {
    return <>{fallback}</>
  }

  const userRoles = session.user?.roles || []
  const hasAccess = allowedRoles.length === 0 || allowedRoles.some((role) => userRoles.includes(role))

  if (!hasAccess) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
