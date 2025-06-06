"use client"

import { useSession } from "next-auth/react"
import type { ReactNode } from "react"

interface RoleBasedProps {
  allowedRoles: string[]
  children: ReactNode
  fallback?: ReactNode
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleBasedProps) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status !== "authenticated") {
    return fallback ? <>{fallback}</> : null
  }

  const userRoles = session?.user?.roles || []
  const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role))

  if (!hasAllowedRole) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}
