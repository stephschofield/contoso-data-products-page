"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")

  const handleSignIn = async () => {
    setIsLoading(true)

    // Use the simplest form of signIn with redirect: true
    // This avoids client-side JSON parsing issues
    signIn("azure-ad", { callbackUrl })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 max-w-md">
          <Card className="shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Sign in with your institutional Microsoft Entra ID account to access the data platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
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
      </main>
      <Footer />
    </div>
  )
}
