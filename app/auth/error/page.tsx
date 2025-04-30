"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-red-100">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Authentication Error</CardTitle>
          <CardDescription>There was a problem signing you in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error === "Configuration" && (
              <p>There is a problem with the server configuration. Please contact support.</p>
            )}
            {error === "AccessDenied" && <p>You do not have permission to sign in.</p>}
            {error === "Verification" && (
              <p>The sign in link is no longer valid. It may have been used already or it may have expired.</p>
            )}
            {error === "OAuthSignin" && <p>Error in the OAuth sign in process. Please try again.</p>}
            {error === "OAuthCallback" && (
              <p>Error in the OAuth callback process. This could be due to a misconfiguration.</p>
            )}
            {error === "OAuthCreateAccount" && (
              <p>Could not create an OAuth account. You may not have permission to sign in.</p>
            )}
            {error === "EmailCreateAccount" && (
              <p>Could not create an email account. You may not have permission to sign in.</p>
            )}
            {error === "Callback" && <p>Error in the OAuth callback. This is likely a configuration issue.</p>}
            {error === "OAuthAccountNotLinked" && (
              <p>This email is already associated with another account. Please sign in with the original provider.</p>
            )}
            {error === "EmailSignin" && <p>The email could not be sent. Please try again.</p>}
            {error === "CredentialsSignin" && <p>The sign in details you provided were invalid. Please try again.</p>}
            {error === "SessionRequired" && <p>You must be signed in to access this page.</p>}
            {!error && <p>An unknown error occurred. Please try again.</p>}
          </div>

          <div className="text-sm text-gray-600">
            <p>If this problem persists, please contact your system administrator with the following information:</p>
            <p className="mt-1">Error code: {error || "Unknown"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
