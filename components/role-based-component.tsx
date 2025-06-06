"use client"

import { useSession } from "next-auth/react"
import type { ReactNode } from "react"

interface RoleBasedComponentProps {
  allowedRoles: string[]
  children: ReactNode
  fallback?: ReactNode
}

export function RoleBasedComponent({ allowedRoles, children, fallback = null }: RoleBasedComponentProps) {
  const { data: session } = useSession()

  if (!session) {
    return <>{fallback}</>
  }

  const userRole = (session.user as any)?.role || "user"

  if (!allowedRoles.includes(userRole)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
