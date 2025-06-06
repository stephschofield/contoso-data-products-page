import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // Path that requires admin role
    if (request.nextUrl.pathname.startsWith("/admin")) {
      const userRoles = token?.roles || []

      if (!userRoles.includes("admin")) {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
