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

  // Loading state
  if (status === "loading") {
    return <div>Loading...</div>
  }

  // Not authenticated
  if (status !== "authenticated") {
    return <>{fallback}</>
  }

  // Check if user has any of the allowed roles
  const userRoles = session?.user?.roles || []
  const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role))

  if (!hasAllowedRole) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
