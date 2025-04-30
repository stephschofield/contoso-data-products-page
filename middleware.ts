import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware that doesn't enforce authentication
export function middleware(request: NextRequest) {
  // Simply allow all requests to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
