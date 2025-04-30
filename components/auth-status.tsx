"use client"

import { useSession } from "next-auth/react"

export function AuthStatus() {
  const { data: session, status } = useSession()

  return (
    <div className="p-4 bg-gray-100 rounded-md mb-4">
      <h2 className="font-bold mb-2">Auth Status</h2>
      <p>Status: {status}</p>
      {session ? <p>Logged in as: {session.user?.email || "Unknown user"}</p> : <p>Not logged in</p>}
    </div>
  )
}
