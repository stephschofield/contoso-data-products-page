"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { signIn } from "next-auth/react"

interface RequestAccessAuthProps {
  onAuthenticated: () => void
  productId: number
}

export function RequestAccessAuth({ productId }: RequestAccessAuthProps) {
  // Create the callback URL
  const callbackUrl = `/request-access/${productId}?auth=success`

  const handleSignIn = () => {
    signIn("azure-ad", { callbackUrl })
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Authentication Required</CardTitle>
        <CardDescription>
          You need to authenticate with your institutional account to request access to this data product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Microsoft Entra ID Authentication</AlertTitle>
          <AlertDescription>
            We use your institutional Microsoft Entra ID account to verify your identity and role within the
            organization.
          </AlertDescription>
        </Alert>

        <div className="rounded-lg border p-4 bg-muted/50">
          <h3 className="font-medium mb-2">What information will be shared?</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Your name and email address</li>
            <li>Your department and role</li>
            <li>Your user ID</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            We do not store your password or have access to your Microsoft Entra ID account.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full flex items-center justify-center gap-2 bg-[#0078d4] hover:bg-[#106ebe]"
          onClick={handleSignIn}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          Sign in with Microsoft Entra ID
        </Button>
      </CardFooter>
    </Card>
  )
}
