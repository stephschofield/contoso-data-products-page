import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function requireRole(roles: string[]) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const userRoles = session?.user?.roles || []
  const hasRequiredRole = roles.some((role) => userRoles.includes(role))

  if (!hasRequiredRole) {
    // Redirect to unauthorized page or show error
    redirect("/unauthorized")
  }
}
