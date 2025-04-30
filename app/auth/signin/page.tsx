"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")

  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn("azure-ad", { callbackUrl })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/university_of_contoso_transparent.png"
              alt="University of Contoso Logo"
              width={200}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Sign in with your Microsoft Entra ID account to access the Cloud Fabric Deployment platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              There was an error signing in. Please try again.
              {error === "Configuration" && " (Server configuration error)"}
              {error === "AccessDenied" && " (Access denied)"}
            </div>
          )}
          <Button
            className="w-full flex items-center justify-center gap-2 bg-[#0078d4] hover:bg-[#106ebe]"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                Sign in with Microsoft Entra ID
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>You will be redirected to Microsoft for authentication.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
